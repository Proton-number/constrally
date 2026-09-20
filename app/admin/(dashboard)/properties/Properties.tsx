"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Separator } from "@/components/ui/separator";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PropertyImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  is_sold: boolean;
  created_at: string;
  property_images: PropertyImage[];
}

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(
    null,
  );
  const [deleting, setDeleting] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
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
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setProperties(data || []);
      }
      setLoading(false);
    }

    fetchProperties();
  }, []);

  const handleDelete = async () => {
    if (!propertyToDelete) return;

    setDeleting(true);
    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", propertyToDelete.id);
    setDeleting(false);

    if (error) {
      alert(`Delete failed: ${error.message}`);
      return;
    }

    setProperties((prev) => prev.filter((p) => p.id !== propertyToDelete.id));
    setPropertyToDelete(null);
  };

  const handleToggleSold = async (id: string, currentValue: boolean) => {
    const { error } = await supabase
      .from("properties")
      .update({ is_sold: !currentValue })
      .eq("id", id);

    if (error) {
      alert(`Update failed: ${error.message}`);
    } else {
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_sold: !currentValue } : p)),
      );
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl p-8 font-serif text-sm text-neutral-500">
        Loading properties...
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
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-neutral-900 md:text-5xl">
            Properties
          </h1>
          <p className="mt-3 font-serif text-sm text-neutral-500">
            Manage all the real estate listings and gallery media.
          </p>
        </div>

        <Link
          href="/admin/properties/new"
          className="inline-block border-b-2 border-black/50 font-serif text-xs font-medium uppercase tracking-wider text-neutral-500 transition hover:text-neutral-900"
        >
          + Add Property
        </Link>
      </div>

      <Separator className="mb-12 bg-neutral-900" />

      {properties.length === 0 ? (
        <div className="border border-dashed border-neutral-300 p-12 text-center">
          <p className="font-serif text-sm text-neutral-500">
            No properties listed yet.
          </p>
          <Link
            href="/admin/properties/new"
            className="mt-4 inline-block font-serif text-xs uppercase tracking-wider text-neutral-900 underline underline-offset-4"
          >
            Create your first listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-start gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => {
            const sortedImages = property.property_images?.sort(
              (a, b) => a.display_order - b.display_order,
            );

            const coverImage = sortedImages?.[0]?.image_url;

            return (
              <div
                key={property.id}
                className="flex flex-col border border-neutral-200 bg-white"
              >
                <div className="relative h-72 w-full overflow-hidden bg-neutral-100 md:h-80">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={property.title}
                      width={1200}
                      height={800}
                      className={`absolute inset-0 h-full w-full object-cover object-center transition duration-300 hover:scale-105 ${
                        property.is_sold ? "opacity-60 grayscale" : ""
                      }`}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-serif text-xs text-neutral-400">
                      No image available
                    </div>
                  )}
                  {property.is_sold && (
                    <span className="absolute left-2 top-2 bg-red-600 px-2 py-0.5 font-serif text-[10px] uppercase tracking-wider text-white">
                      Sold
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 bg-neutral-900/80 px-2 py-0.5 font-serif text-[10px] uppercase tracking-wider text-white">
                    {property.property_images?.length || 0} photos
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h2 className="line-clamp-1 font-serif text-base font-medium uppercase tracking-wide text-neutral-900">
                      {property.title}
                    </h2>

                    <Separator className="my-3 bg-neutral-200" />

                    <div className="flex items-center justify-between font-serif text-sm text-neutral-500">
                      <p className="flex items-center">
                        <MapPin className="mr-1 inline h-3.5 w-3.5 text-neutral-400" />
                        {property.location}
                      </p>
                      <p className="font-medium text-neutral-900">
                        ₦{property.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-3 font-serif text-xs uppercase tracking-wider">
                    <Link
                      href={`/admin/properties/${property.id}/edit`}
                      className="text-neutral-600 transition hover:text-neutral-900 bg-accent border border-neutral-300 px-2 py-1 rounded hover:bg-neutral-100 "
                    >
                      Edit
                    </Link>
                    <Button
                      onClick={() =>
                        handleToggleSold(property.id, property.is_sold)
                      }
                      className="text-neutral-600 transition hover:text-neutral-900 bg-transparent border border-neutral-300 px-2 py-1 rounded hover:bg-neutral-100"
                    >
                      {property.is_sold ? "Mark Available" : "Mark Sold"}
                    </Button>
                    <Button
                      onClick={() => setPropertyToDelete(property)}
                      className="text-red-500 transition hover:text-red-700 bg-accent border border-red-500 px-2 py-1 rounded hover:bg-neutral-100"
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
        open={!!propertyToDelete}
        onOpenChange={(open) => {
          if (!open && !deleting) setPropertyToDelete(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif">Delete property?</DialogTitle>
            <DialogDescription className="font-serif">
              This will permanently delete{" "}
              <span className="font-medium text-neutral-900">
                {propertyToDelete?.title}
              </span>{" "}
              and all of its photos. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPropertyToDelete(null)}
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
    </div>
  );
}
