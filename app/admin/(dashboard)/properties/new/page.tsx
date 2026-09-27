"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function generateSlug(text: string): string {
  const baseSlug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const uniqueSuffix = Math.random().toString(36).substring(2, 6);
  return `${baseSlug}-${uniqueSuffix}`;
}

export default function NewPropertyPage() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [overview, setOverview] = useState("");
  const [features, setFeatures] = useState("");
  const [titleDoc, setTitleDoc] = useState("");
  const [price, setPrice] = useState("");
  const [contactPhone, setContactPhone] = useState("0912 639 3650");

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const MAX_IMAGES = 6;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    const remainingSlots = MAX_IMAGES - files.length;

    if (remainingSlots < 0) {
      toast.add({
        type: "error",
        description: `You can only upload up to ${MAX_IMAGES} images.`,
        priority: "high",
      });
      e.target.value = "";
      return;
    }

    const filesToAdd = selectedFiles.slice(0, remainingSlots);

    if (selectedFiles.length > remainingSlots) {
      toast.add({
        type: "error",
        description: `Only ${remainingSlots} more image${
          remainingSlots === 1 ? "" : "s"
        } can be added (max ${MAX_IMAGES}).`,
        priority: "high",
      });
    }

    setFiles((prev) => [...prev, ...selectedFiles]);
    const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const generatedSlug = generateSlug(title);

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
      const { data: property, error: propError } = await supabase
        .from("properties")
        .insert({
          title: title.trim(),
          slug: generatedSlug,
          description: compiledDescription,
          location: location.trim(),
          price: Number(price),
        })
        .select()
        .single();

      if (propError || !property) {
        throw new Error(propError?.message || "Failed to create property.");
      }

      const imageRecords = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split(".").pop();
        const filePath = `${property.id}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(
            `Upload failed for ${file.name}: ${uploadError.message}`,
          );
        }

        const { data: publicUrlData } = supabase.storage
          .from("property-images")
          .getPublicUrl(filePath);

        imageRecords.push({
          property_id: property.id,
          image_url: publicUrlData.publicUrl,
          display_order: i,
        });
      }

      if (imageRecords.length > 0) {
        const { error: imgInsertError } = await supabase
          .from("property_images")
          .insert(imageRecords);

        if (imgInsertError) {
          throw new Error(imgInsertError.message);
        }
      }

      router.push("/admin/properties");
      router.refresh();
    } catch (err: any) {
      toast.add({
        type: "error",
        description: err.message || "An unexpected error occurred.",
        priority: "high",
      });
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
      toast.add({
        type: "success",
        description: "Property listing created successfully!",
      });
    }
  };

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <span className="font-serif text-[10px] font-medium uppercase tracking-widest text-neutral-500">
          Listing Builder
        </span>

        <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
          Create Property Listing
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
              <Input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 5 Bedroom Fully Detached Duplex"
                className="mt-2 h-11 w-full border border-neutral-300 px-3 font-serif text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none"
              />
              {title && (
                <p className="mt-1 font-mono text-[11px] text-neutral-400 truncate">
                  Slug preview: /properties/
                  {title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")}
                </p>
              )}
            </div>

            <div>
              <label className="block font-serif text-xs uppercase tracking-wider text-neutral-700">
                Location
              </label>
              <Input
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
              <Input
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
              <Input
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
              <Input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="mt-2 h-11 w-full border border-neutral-300 px-3 font-serif text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-serif text-xs uppercase tracking-wider text-neutral-700">
              Gallery Media
            </label>
            <span className="font-serif text-[11px] text-neutral-400">
              {Math.min(files.length, MAX_IMAGES)}/{MAX_IMAGES} images selected
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              disabled={files.length >= MAX_IMAGES}
              className="mt-2 block w-full font-serif text-xs text-neutral-500 file:mr-4 file:border-0 file:bg-[#091e3c] file:px-4 file:py-2 file:font-serif file:text-xs file:uppercase file:tracking-wider file:text-white hover:file:bg-[#163b68]"
            />

            {previews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {previews.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video w-full overflow-hidden border border-neutral-200 bg-neutral-100"
                  >
                    <img
                      src={url}
                      alt={`Preview ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <Button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-neutral-900 p-1 font-serif text-[10px] text-white transition hover:bg-neutral-700"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator className="bg-neutral-200" />

          <Button
            type="submit"
            disabled={loading}
            className="h-12 px-8 bg-[#091e3c] font-serif text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#163b68] disabled:bg-neutral-400 rounded-non cursor-pointer"
          >
            {loading ? "Publishing listing..." : "Publish Property Listing"}
          </Button>
        </form>
      </div>
    </section>
  );
}
