import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

interface PropertyImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  property_images: PropertyImage[];
}

export default async function Collection() {
  const supabase = await createClient();

  const { data: properties } = await supabase
    .from("properties")
    .select(
      `
      id,
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
    .order("created_at", { ascending: false })
    .limit(3);

  const collections: Property[] = properties || [];

  return (
    <section id="properties" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-0">
          <h3 className="text-left sm:text-center font-serif text-3xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl">
            Curated Collection
          </h3>
          <Link
            href="/properties"
            className="inline-block border-b-2 border-black/50 text-sm font-serif font-medium uppercase text-neutral-500 hover:text-neutral-900 mt-4"
          >
            View All Properties
          </Link>
        </div>
        <Separator className="bg-neutral-900 mt-2" />
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 md:grid-cols-3 md:gap-8 gap-x-7 gap-y-9">
          {collections.map((item) => {
            const sortedImages = item.property_images?.sort(
              (a, b) => a.display_order - b.display_order,
            );
            const coverImage = sortedImages?.[0]?.image_url;

            return (
              <Link
                key={item.id}
                href={`/properties/${item.id}`}
                className="group block"
              >
                <div key={item.id}>
                  <div className="aspect-video w-full overflow-hidden bg-neutral-100">
                    {coverImage ? (
                      <img
                        src={coverImage}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                        No image
                      </div>
                    )}
                  </div>

                  <p className="mb-2 mt-3 font-serif text-base font-medium uppercase tracking-wide text-neutral-900 md:text-lg">
                    {item.title}
                  </p>
                  <Separator className="bg-neutral-400" />
                  <div className="mt-2 flex items-center justify-between">
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                      <MapPin className="mr-1 inline h-4 w-4" />
                      {item.location}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
