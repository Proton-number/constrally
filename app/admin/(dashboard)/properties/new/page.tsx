"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Separator } from "@/components/ui/separator";

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    setFiles((prev) => [...prev, ...selectedFiles]);
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Format features lines into clean bullet points
    const formattedFeatures = features
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => (line.startsWith("•") ? line : `• ${line}`))
      .join("\n");

    // Construct the structured description block matching your listing format
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
      // 1. Insert property row
      const { data: property, error: propError } = await supabase
        .from("properties")
        .insert({
          title: title.trim(),
          description: compiledDescription,
          location: location.trim(),
          price: Number(price),
        })
        .select()
        .single();

      if (propError || !property) {
        throw new Error(propError?.message || "Failed to create property.");
      }

      // 2. Upload images to Supabase storage bucket
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

      // 3. Save images in property_images table
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
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
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
          {/* Header Specs */}
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

          {/* Intro description */}
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

          {/* Features list */}
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

          {/* Legal Document, Pricing & Contact */}
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

          {/* Uploads */}
          <div>
            <label className="block font-serif text-xs uppercase tracking-wider text-neutral-700">
              Gallery Media
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-2 block w-full font-serif text-xs text-neutral-500 file:mr-4 file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:font-serif file:text-xs file:uppercase file:tracking-wider file:text-white hover:file:bg-neutral-800"
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
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
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
            disabled={loading}
            className="h-12 px-8 bg-neutral-900 font-serif text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-800 disabled:bg-neutral-400"
          >
            {loading ? "Publishing listing..." : "Publish Property Listing"}
          </button>
        </form>
      </div>
    </section>
  );
}
