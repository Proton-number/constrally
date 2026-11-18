"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const labelClass =
  "block font-serif text-xs uppercase tracking-wider text-neutral-700";
const inputClass =
  "mt-2 h-11 w-full border border-neutral-300 px-3 font-serif text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none";
const textareaClass =
  "mt-2 w-full border border-neutral-300 p-3 font-serif text-sm leading-relaxed text-neutral-900 focus:border-neutral-900 focus:outline-none";
const hintClass = "font-serif text-[11px] text-neutral-400";

const MAX_IMAGES = 6;

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

export default function NewShortletPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [headline, setHeadline] = useState("");
  const [units, setUnits] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [apartmentType, setApartmentType] = useState("");
  const [amenities, setAmenities] = useState("");
  const [contactPhone, setContactPhone] = useState("09061429601");

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    const remainingSlots = MAX_IMAGES - files.length;

    if (remainingSlots <= 0) {
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

    setFiles((prev) => [...prev, ...filesToAdd]);
    setPreviews((prev) => [
      ...prev,
      ...filesToAdd.map((file) => URL.createObjectURL(file)),
    ]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const amenitiesList = amenities
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    try {
      const { data: shortlet, error: shortletError } = await supabase
        .from("shortlets")
        .insert({
          name: name.trim(),
          slug: generateSlug(name),
          headline: headline.trim(),
          location: location.trim(),
          units: Number(units),
          bedrooms: bedrooms.trim(),
          apartment_type: apartmentType,
          amenities: amenitiesList,
          contact_phone: contactPhone.trim() || null,
        })
        .select()
        .single();

      if (shortletError || !shortlet) {
        throw new Error(shortletError?.message || "Failed to create shortlet.");
      }

      // 2. Upload images
      const imageRecords = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split(".").pop();
        const filePath = `${shortlet.id}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("shortlet-images")
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(
            `Upload failed for ${file.name}: ${uploadError.message}`,
          );
        }

        const { data: publicUrlData } = supabase.storage
          .from("shortlet-images")
          .getPublicUrl(filePath);

        imageRecords.push({
          shortlet_id: shortlet.id,
          image_url: publicUrlData.publicUrl,
          display_order: i,
        });
      }

      // 3. Save image rows
      if (imageRecords.length > 0) {
        const { error: imgInsertError } = await supabase
          .from("shortlet_images")
          .insert(imageRecords);

        if (imgInsertError) {
          throw new Error(imgInsertError.message);
        }
      }

      toast.add({
        type: "success",
        description: "Shortlet listing created successfully!",
      });

      router.push("/admin/shortlets");
      router.refresh();
    } catch (err: any) {
      const message = err.message || "An unexpected error occurred.";
      toast.add({
        type: "error",
        description: message,
        priority: "high",
      });
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
          Create Shortlet Listing
        </h1>

        <Separator className="my-6 bg-neutral-900" />

        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 p-4 font-serif text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name + Location */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Apartment Name</label>
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Emerald"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <Input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Lekki Phase 1"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Bedrooms</label>
              <Input
                type="text"
                required
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                placeholder="e.g. 1/2"
                className={inputClass}
              />
            </div>
          </div>

          {/* Apartment type */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Apartment Type</label>
              <select
                required
                value={apartmentType}
                onChange={(e) => setApartmentType(e.target.value)}
                className={inputClass}
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="maisonette">Maisonette</option>
                <option value="apartment">Apartment</option>
                <option value="studio">Studio</option>
                <option value="penthouse">Penthouse</option>
                <option value="duplex">Duplex</option>
              </select>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <div className="flex items-center justify-between">
              <label className={labelClass}>Amenities & Highlights</label>
              <span className={hintClass}>
                Enter each amenity on a separate line
              </span>
            </div>
            <textarea
              rows={6}
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              placeholder={
                "Beautiful City View\nElevator\nPS5 Console\nOther Amenities"
              }
              className={textareaClass}
            />
          </div>

          {/* Contact */}
          <div>
            <label className={labelClass}>Contact Phone</label>
            <Input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Gallery */}
          <div>
            <label className={labelClass}>Gallery Media</label>
            <span className={`${hintClass} block`}>
              {files.length}/{MAX_IMAGES} images selected
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
                    key={url}
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
            className="h-12 cursor-pointer rounded-none bg-[#091e3c] px-8 font-serif text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#163b68] disabled:bg-neutral-400"
          >
            {loading ? "Publishing listing..." : "Publish Shortlet Listing"}
          </Button>
        </form>
      </div>
    </section>
  );
}
