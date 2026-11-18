"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShortletImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface Shortlet {
  id: string;
  name: string;
  slug: string;
  headline: string;
  location: string;
  units: number;
  bedrooms: string;
  apartment_type: string;
  amenities: string[];
  contact_phone: string | null;
  created_at: string;
  shortlet_images: ShortletImage[];
}

export default function Shortlets() {
  const [shortlets, setShortlets] = useState<Shortlet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shortletToDelete, setShortletToDelete] = useState<Shortlet | null>(
    null,
  );
  const [deleting, setDeleting] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function fetchShortlets() {
      setLoading(true);
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
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setShortlets(data || []);
      }
      setLoading(false);
    }

    fetchShortlets();
  }, []);

  const handleDelete = async () => {
    if (!shortletToDelete) return;

    setDeleting(true);
    const { error } = await supabase
      .from("shortlets")
      .delete()
      .eq("id", shortletToDelete.id);
    setDeleting(false);

    if (error) {
      toast.add({
        type: "error",
        description: `Delete failed: ${error.message}`,
        priority: "high",
      });
      return;
    }

    setShortlets((prev) => prev.filter((s) => s.id !== shortletToDelete.id));
    setShortletToDelete(null);
    toast.add({
      type: "success",
      description: "Shortlet deleted successfully.",
    });
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl p-8 font-serif text-sm text-neutral-500">
        Loading shortlets...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl p-8 font-serif text-sm text-red-600">
        Failed to load: {error}
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-neutral-900 md:text-5xl">
            Shortlets
          </h1>
          <p className="mt-3 font-serif text-sm text-neutral-500">
            Manage all the shortlet apartments and gallery media.
          </p>
        </div>

        <Link
          href="/admin/shortlets/new"
          className="inline-block border-b-2 border-black/50 font-serif text-xs font-medium uppercase tracking-wider text-neutral-500 transition hover:text-neutral-900"
        >
          + Add Shortlet
        </Link>
      </div>

      <Separator className="mb-12 bg-neutral-900" />

      {shortlets.length === 0 ? (
        <div className="border border-dashed border-neutral-300 p-12 text-center">
          <p className="font-serif text-sm text-neutral-500">
            No shortlets listed yet.
          </p>
          <Link
            href="/admin/shortlets/new"
            className="mt-4 inline-block font-serif text-xs uppercase tracking-wider text-neutral-900 underline underline-offset-4"
          >
            Create your first listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {shortlets.map((shortlet) => {
            const sortedImages = [...(shortlet.shortlet_images ?? [])].sort(
              (a, b) => a.display_order - b.display_order,
            );

            const coverImage = sortedImages[0]?.image_url;

            return (
              <div
                key={shortlet.id}
                className="flex flex-col border border-neutral-200 bg-white"
              >
                <div className="relative h-72 w-full overflow-hidden bg-neutral-100 md:h-80">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={shortlet.name}
                      width={1200}
                      height={800}
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-serif text-xs text-neutral-400">
                      No image available
                    </div>
                  )}
                  <span className="absolute bottom-2 right-2 bg-neutral-900/80 px-2 py-0.5 font-serif text-[10px] uppercase tracking-wider text-white">
                    {shortlet.shortlet_images?.length || 0} photos
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h2 className="line-clamp-1 font-serif text-base font-medium uppercase tracking-wide text-neutral-900">
                      {shortlet.name}
                    </h2>
                    <p className="mt-1 line-clamp-2 font-serif text-sm text-neutral-500">
                      {shortlet.headline}
                    </p>

                    <Separator className="my-3 bg-neutral-200" />

                    <div className="flex items-center justify-between font-serif text-sm text-neutral-500">
                      <p className="flex items-center">
                        <MapPin className="mr-1 inline h-3.5 w-3.5 text-neutral-400" />
                        {shortlet.location}
                      </p>
                      <p className="font-medium capitalize text-neutral-900">
                        {shortlet.apartment_type}
                      </p>
                    </div>

                    <p className="mt-2 font-serif text-xs text-neutral-500">
                      {shortlet.bedrooms} bedroom · {shortlet.units} unit
                      {shortlet.units === 1 ? "" : "s"}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-3 font-serif text-xs uppercase tracking-wider">
                    <Link
                      href={`/admin/shortlets/${shortlet.id}/edit`}
                      className="rounded border border-neutral-300 bg-accent px-2 py-1 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
                    >
                      Edit
                    </Link>
                    <Button
                      onClick={() => setShortletToDelete(shortlet)}
                      className="rounded border border-red-500 bg-accent px-2 py-1 text-red-500 transition hover:bg-neutral-100 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog
        open={!!shortletToDelete}
        onOpenChange={(open) => {
          if (!open && !deleting) setShortletToDelete(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif">Delete shortlet?</DialogTitle>
            <DialogDescription className="font-serif">
              This will permanently delete{" "}
              <span className="font-medium text-neutral-900">
                {shortletToDelete?.name}
              </span>{" "}
              and all of its photos. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShortletToDelete(null)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
