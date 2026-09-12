"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Separator } from "@/components/ui/separator";

interface ExistingImage {
  id: string;
  image_url: string;
  display_order: number;
}

function parsePropertyDescription(raw: string | null) {
  if (!raw) {
    return {
      overview: "",
      features: "",
      titleDoc: "",
      phone: "0912 639 3650",
    };
  }

  const sections = raw.split("\n\n");
  let overview = "";
  let features = "";
  let titleDoc = "";
  let phone = "0912 639 3650";

  for (const block of sections) {
    const trimmed = block.trim();
    if (trimmed.startsWith("PROPERTY FEATURES")) {
      features = trimmed
        .split("\n")
        .slice(1)
        .map((line) => line.replace(/^[•\-\*]\s*/, "").trim())
        .filter(Boolean)
        .join("\n");
    } else if (
      trimmed.startsWith("📑 TITLE:") ||
      trimmed.startsWith("TITLE:")
    ) {
      titleDoc = trimmed.replace(/^📑?\s*TITLE:\s*/i, "").trim();
    } else if (trimmed.includes("call or WhatsApp us today:")) {
      const parts = trimmed.split("call or WhatsApp us today:");
      if (parts[1]) phone = parts[1].trim();
    } else if (!overview) {
      overview = trimmed;
    }
  }

  return { overview, features, titleDoc, phone };
}

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id as string;
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [overview, setOverview] = useState("");
  const [features, setFeatures] = useState("");
  const [titleDoc, setTitleDoc] = useState("");
  const [price, setPrice] = useState("");
  const [contactPhone, setContactPhone] = useState("0912 639 3650");

  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProperty() {
      const { data, error } = await supabase
        .from("properties")
        .select(
          `
          *,
          property_images (
            id,
            image_url,
            display_order
          )
        `,
        )
        .eq("id", propertyId)
        .single();

      if (error || !data) {
        setError(error?.message || "Property not found.");
      } else {
        setTitle(data.title || "");
        setLocation(data.location || "");
        setPrice(String(data.price || ""));

        const parsed = parsePropertyDescription(data.description);
        setOverview(parsed.overview);
        setFeatures(parsed.features);
        setTitleDoc(parsed.titleDoc);
        setContactPhone(parsed.phone);

        setExistingImages(
          (data.property_images || []).sort(
            (a: ExistingImage, b: ExistingImage) =>
              a.display_order - b.display_order,
          ),
        );
      }
      setLoading(false);
    }

    if (propertyId) loadProperty();
  }, [propertyId]);

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setNewFiles((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setNewPreviews((prev) => [...prev, ...previews]);
  };

  const removeExistingImage = (id: string) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
    setDeletedImageIds((prev) => [...prev, id]);
  };

  const removeNewImage = (index: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const formattedFeatures = features
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => (line.startsWith("•") ? line : `• ${line}`))
      .join("\n");

    const compiledDescription = [
      overview.trim(),
      formattedFeatures ? `PROPERTY FEATURES\n${formattedFeatures}` : "",
      titleDoc.trim() ? `📑 TITLE: ${titleDoc.trim()}` : "",
      contactPhone.trim()
        ? `📲 For viewing & enquiries, call or WhatsApp us today: ${contactPhone.trim()}`
        : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const { error: propUpdateError } = await supabase
        .from("properties")
        .update({
          title: title.trim(),
          description: compiledDescription,
          location: location.trim(),
          price: Number(price),
        })
        .eq("id", propertyId);

      if (propUpdateError) throw new Error(propUpdateError.message);

      if (deletedImageIds.length > 0) {
        const { error: delError } = await supabase
          .from("property_images")
          .delete()
          .in("id", deletedImageIds);

        if (delError) throw new Error(delError.message);
      }

      if (newFiles.length > 0) {
        const baseOrder = existingImages.length;
        const newImageRecords = [];

        for (let i = 0; i < newFiles.length; i++) {
          const file = newFiles[i];
          const fileExt = file.name.split(".").pop();
          const filePath = `${propertyId}/${crypto.randomUUID()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("property-images")
            .upload(filePath, file);

          if (uploadError) throw new Error(uploadError.message);

          const { data: publicUrlData } = supabase.storage
            .from("property-images")
            .getPublicUrl(filePath);

          newImageRecords.push({
            property_id: propertyId,
            image_url: publicUrlData.publicUrl,
            display_order: baseOrder + i,
          });
        }

        const { error: imgInsertError } = await supabase
          .from("property_images")
          .insert(newImageRecords);

        if (imgInsertError) throw new Error(imgInsertError.message);
      }

      router.push("/admin/properties");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to update property.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl font-serif text-sm text-neutral-500">
          Loading listing details...
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <span className="font-serif text-[10px] font-medium uppercase tracking-widest text-neutral-500">
          CMS Management
        </span>

        <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
          Edit Property Listing
        </h1>

        <Separator className="my-6 bg-neutral-900" />

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 p-4 font-serif text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block font-serif text-xs uppercase tracking-wider text-neutral-700">
                Headline / Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 h-11 w-full border border-neutral-300 px-3 font-serif text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-serif text-xs uppercase tracking-wider text-neutral-700">
                Location
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 h-11 w-full border border-neutral-300 px-3 font-serif text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-serif text-xs uppercase tracking-wider text-neutral-700">
              Overview Summary
            </label>
            <textarea
              rows={3}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="mt-2 w-full border border-neutral-300 p-3 font-serif text-sm leading-relaxed text-neutral-900 focus:border-neutral-900 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block font-serif text-xs uppercase tracking-wider text-neutral-700">
                Property Features
              </label>
              <span className="font-serif text-[11px] text-neutral-400">
                Enter each amenity on a separate line
              </span>
            </div>
            <textarea
              rows={6}
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="mt-2 w-full border border-neutral-300 p-3 font-serif text-sm leading-relaxed text-neutral-900 focus:border-neutral-900 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className="block font-serif text-xs uppercase tracking-wider text-neutral-700">
                Title Document
              </label>
              <input
                type="text"
                value={titleDoc}
                onChange={(e) => setTitleDoc(e.target.value)}
                className="mt-2 h-11 w-full border border-neutral-300 px-3 font-serif text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-serif text-xs uppercase tracking-wider text-neutral-700">
                Price (₦ Figures Only)
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-2 h-11 w-full border border-neutral-300 px-3 font-serif text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-serif text-xs uppercase tracking-wider text-neutral-700">
                Contact Phone
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="mt-2 h-11 w-full border border-neutral-300 px-3 font-serif text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-serif text-xs uppercase tracking-wider text-neutral-700">
              Current Gallery Images
            </label>
            {existingImages.length === 0 ? (
              <p className="mt-2 font-serif text-xs text-neutral-400">
                No existing images remaining.
              </p>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {existingImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative aspect-video w-full overflow-hidden border border-neutral-200 bg-neutral-100"
                  >
                    <img
                      src={img.image_url}
                      alt="Current media"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(img.id)}
                      className="absolute top-1 right-1 bg-neutral-900 p-1 font-serif text-[10px] text-white transition hover:bg-neutral-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block font-serif text-xs uppercase tracking-wider text-neutral-700">
              Upload Additional Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleNewImageChange}
              className="mt-2 block w-full font-serif text-xs text-neutral-500 file:mr-4 file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:font-serif file:text-xs file:uppercase file:tracking-wider file:text-white hover:file:bg-neutral-800"
            />

            {newPreviews.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {newPreviews.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video w-full overflow-hidden border border-neutral-200 bg-neutral-100"
                  >
                    <img
                      src={url}
                      alt={`New media preview ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(idx)}
                      className="absolute top-1 right-1 bg-neutral-900 p-1 font-serif text-[10px] text-white transition hover:bg-neutral-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator className="bg-neutral-200" />

          <button
            type="submit"
            disabled={saving}
            className="h-12 px-8 bg-neutral-900 font-serif text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-800 disabled:bg-neutral-400"
          >
            {saving ? "Saving Changes..." : "Save Listing Changes"}
          </button>
        </form>
      </div>
    </section>
  );
}
