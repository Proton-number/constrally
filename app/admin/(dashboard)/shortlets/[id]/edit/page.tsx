"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
const BUCKET = "shortlet-images";

interface ExistingImage {
  id: string;
  image_url: string;
  display_order: number;
}

function getStoragePath(url: string): string | null {
  const marker = `/${BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

export default function EditShortletPage() {
  const router = useRouter();
  const params = useParams();
  const shortletId = params.id as string;
  const supabase = createClient();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [apartmentType, setApartmentType] = useState("");
  const [amenities, setAmenities] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [deletedImages, setDeletedImages] = useState<ExistingImage[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalImages = existingImages.length + newFiles.length;

  useEffect(() => {
    async function loadShortlet() {
      const { data, error } = await supabase
        .from("shortlets")
        .select(
          `
          *,
          shortlet_images (
            id,
            image_url,
            display_order
          )
        `,
        )
        .eq("id", shortletId)
        .single();

      if (error || !data) {
        setError(error?.message || "Shortlet not found.");
      } else {
        setName(data.name || "");
        setLocation(data.location || "");
        setBedrooms(data.bedrooms || "");
        setApartmentType(data.apartment_type || "");
        setAmenities((data.amenities || []).join("\n"));
        setContactPhone(data.contact_phone || "");

        setExistingImages(
          [...(data.shortlet_images || [])].sort(
            (a: ExistingImage, b: ExistingImage) =>
              a.display_order - b.display_order,
          ),
        );
      }
      setLoading(false);
    }

    if (shortletId) loadShortlet();
  }, [shortletId]);

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    const remainingSlots = MAX_IMAGES - totalImages;

    if (remainingSlots <= 0) {
      toast.add({
        type: "error",
        description: `You can only have up to ${MAX_IMAGES} images.`,
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

    setNewFiles((prev) => [...prev, ...filesToAdd]);
    setNewPreviews((prev) => [
      ...prev,
      ...filesToAdd.map((file) => URL.createObjectURL(file)),
    ]);
    e.target.value = "";
  };

  const removeExistingImage = (img: ExistingImage) => {
    setExistingImages((prev) => prev.filter((i) => i.id !== img.id));
    setDeletedImages((prev) => [...prev, img]);
  };

  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(newPreviews[index]);
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const amenitiesList = amenities
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    try {
      // 1. Update the shortlet details
      const { error: updateError } = await supabase
        .from("shortlets")
        .update({
          name: name.trim(),
          location: location.trim(),
          bedrooms: bedrooms.trim(),
          apartment_type: apartmentType,
          amenities: amenitiesList,
          contact_phone: contactPhone.trim() || null,
        })
        .eq("id", shortletId);

      if (updateError) throw new Error(updateError.message);

      // 2. Delete removed images (rows first, then files in Storage)
      if (deletedImages.length > 0) {
        const { error: delError } = await supabase
          .from("shortlet_images")
          .delete()
          .in(
            "id",
            deletedImages.map((img) => img.id),
          );

        if (delError) throw new Error(delError.message);

        const pathsToRemove = deletedImages
          .map((img) => getStoragePath(img.image_url))
          .filter((path): path is string => Boolean(path));

        if (pathsToRemove.length > 0) {
          await supabase.storage.from(BUCKET).remove(pathsToRemove);
        }
      }

      // 3. Upload new images
      if (newFiles.length > 0) {
        const baseOrder =
          existingImages.length > 0
            ? Math.max(...existingImages.map((img) => img.display_order)) + 1
            : 0;
        const newImageRecords = [];

        for (let i = 0; i < newFiles.length; i++) {
          const file = newFiles[i];
          const fileExt = file.name.split(".").pop();
          const filePath = `${shortletId}/${crypto.randomUUID()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from(BUCKET)
            .upload(filePath, file);

          if (uploadError) {
            throw new Error(
              `Upload failed for ${file.name}: ${uploadError.message}`,
            );
          }

          const { data: publicUrlData } = supabase.storage
            .from(BUCKET)
            .getPublicUrl(filePath);

          newImageRecords.push({
            shortlet_id: shortletId,
            image_url: publicUrlData.publicUrl,
            display_order: baseOrder + i,
          });
        }

        const { error: imgInsertError } = await supabase
          .from("shortlet_images")
          .insert(newImageRecords);

        if (imgInsertError) throw new Error(imgInsertError.message);
      }

      toast.add({
        type: "success",
        description: "Shortlet updated successfully!",
      });

      router.push("/admin/shortlets");
      router.refresh();
    } catch (err: any) {
      const message = err.message || "Failed to update shortlet.";
      toast.add({
        type: "error",
        description: message,
        priority: "high",
      });
      setError(message);
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
        <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
          Edit Shortlet Listing
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

          {/* Bedrooms */}
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

          {/* Current images */}
          <div>
            <label className={labelClass}>Current Gallery Images</label>
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
                    <Button
                      type="button"
                      onClick={() => removeExistingImage(img)}
                      className="absolute top-1 right-1 bg-neutral-900 p-1 font-serif text-[10px] text-white transition hover:bg-neutral-700"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upload additional */}
          <div>
            <label className={labelClass}>Upload Additional Images</label>
            <span className={`${hintClass} block`}>
              {totalImages}/{MAX_IMAGES} images
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleNewImageChange}
              disabled={totalImages >= MAX_IMAGES}
              className="mt-2 block w-full font-serif text-xs text-neutral-500 file:mr-4 file:border-0 file:bg-[#091e3c] file:px-4 file:py-2 file:font-serif file:text-xs file:uppercase file:tracking-wider file:text-white hover:file:bg-[#163b68]"
            />

            {newPreviews.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {newPreviews.map((url, idx) => (
                  <div
                    key={url}
                    className="relative aspect-video w-full overflow-hidden border border-neutral-200 bg-neutral-100"
                  >
                    <img
                      src={url}
                      alt={`New media preview ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <Button
                      type="button"
                      onClick={() => removeNewImage(idx)}
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
            disabled={saving}
            className="h-12 cursor-pointer rounded-none bg-[#091e3c] px-8 font-serif text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#163b68] disabled:bg-neutral-400"
          >
            {saving ? "Saving Changes..." : "Save Listing Changes"}
          </Button>
        </form>
      </div>
    </section>
  );
}
