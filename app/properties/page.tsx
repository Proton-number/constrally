import Link from "next/link";
import { MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

interface PropertyImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface Property {
  id: string;
  slug: string;
  title: string;
  is_sold: boolean;
  location: string;
  price: number;
  property_images: PropertyImage[];
}

export default async function PublicPropertiesPage() {
  const supabase = await createClient();

  const { data: properties, error } = await supabase
    .from("properties")
    .select(
      `
      id,
      slug,
      is_sold,
      title,
      location,
      price,
      property_images (
        id,
        image_url,
        display_order
      )
    `,
    )
    .order("is_sold", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl text-red-600 font-serif">
          Failed to load listings.
        </div>
      </section>
    );
  }

  const list: Property[] = properties || [];

  return (
    <section className="px-6 py-24 md:py-8 min-h-screen">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl">
            All Properties
          </h1>
          <p className="mt-2 text-sm text-neutral-500 font-serif">
            Explore our complete portfolio of architectural residences.
          </p>
        </div>

        <Separator className="bg-neutral-900 mt-2" />

        {list.length === 0 ? (
          <div className="mt-16 text-center text-neutral-500 font-serif">
            No properties currently available.
          </div>
        ) : (
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 md:grid-cols-3 md:gap-8 gap-x-7 gap-y-12">
            {list.map((item) => {
              const sortedImages = item.property_images?.sort(
                (a, b) => a.display_order - b.display_order,
              );
              const coverImage = sortedImages?.[0]?.image_url;

              return (
                <Link
                  key={item.id}
                  href={`/properties/${item.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
                    {coverImage ? (
                      <Image
                        src={coverImage}
                        alt={item.title}
                        width={1200}
                        height={900}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={`h-full w-full object-cover transition duration-300 group-hover:scale-105 ${
                          item.is_sold ? "opacity-60 grayscale" : ""
                        }`}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                        No image
                      </div>
                    )}
                    {item.is_sold && (
                      <span className="absolute left-3 top-3 bg-red-600 px-3 py-1 font-serif text-[11px] font-medium uppercase tracking-wider text-white">
                        Sold
                      </span>
                    )}
                  </div>

                  <p className="mb-2 mt-3 font-serif text-base font-medium uppercase tracking-wide text-neutral-900 md:text-lg">
                    {item.title}
                  </p>

                  <Separator className="bg-neutral-400" />

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm leading-relaxed text-neutral-500">
                      <MapPin className="mr-1 inline h-4 w-4" />
                      {item.location}
                    </p>
                    <p
                      className={`text-sm font-medium leading-relaxed text-neutral-500 ${
                        item.is_sold ? "line-through" : ""
                      }`}
                    >
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
