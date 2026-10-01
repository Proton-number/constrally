import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";

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
      <section className="min-h-screen bg-neutral-50 px-6 pb-24 pt-32 sm:pt-40">
        <div className="mx-auto max-w-6xl font-serif text-red-600">
          Failed to load listings.
        </div>
      </section>
    );
  }

  const list: Property[] = properties || [];

  return (
    <section className="min-h-screen bg-neutral-50 px-6 pb-24 pt-32 sm:pt-40 lg:pt-20">
      <div className="mx-auto max-w-6xl">
      
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-neutral-900 md:text-6xl">
              All <span className="italic text-[#091e3c]">Properties</span>
            </h1>
            <p className="mt-4 max-w-md font-serif text-lg leading-relaxed text-neutral-600">
              Explore our complete portfolio of architectural residences.
            </p>
          </div>

          {list.length > 0 && (
            <p className="font-serif text-xs uppercase tracking-wider text-neutral-500">
              {list.length} {list.length === 1 ? "property" : "properties"}
            </p>
          )}
        </div>

        <Separator className="mt-10 bg-neutral-900" />

        {list.length === 0 ? (
          <div className="mt-20 flex flex-col items-center gap-3 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#091e3c]/5 text-[#091e3c]">
              <MapPin size={22} />
            </span>
            <p className="font-serif text-xl text-neutral-900">
              No properties currently available.
            </p>
            <p className="font-serif text-sm text-neutral-500">
              New listings are added regularly, so please check back soon.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((item) => {
              const sortedImages = [...(item.property_images ?? [])].sort(
                (a, b) => a.display_order - b.display_order,
              );
              const coverImage = sortedImages[0]?.image_url;

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
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                          item.is_sold ? "opacity-60 grayscale" : ""
                        }`}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-serif text-xs uppercase tracking-wider text-neutral-400">
                        No image
                      </div>
                    )}

                    {item.is_sold ? (
                      <span className="absolute left-3 top-3 rounded-sm bg-red-600 px-3 py-1 font-serif text-[10px] font-semibold uppercase tracking-widest text-white">
                        Sold
                      </span>
                    ) : (
                      <span className="absolute left-3 top-3 rounded-sm bg-white/75 px-3 py-1 font-serif text-[10px] font-semibold uppercase tracking-widest text-[#091e3c] backdrop-blur-sm">
                        Available
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="pt-4">
                    <h2 className="font-serif text-lg font-medium uppercase tracking-wide text-neutral-900 transition-colors group-hover:text-[#091e3c]">
                      {item.title}
                    </h2>

                    <p className="mt-2 flex items-center gap-1.5 font-serif text-sm text-neutral-500">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </p>

                    <Separator className="my-4 bg-neutral-200" />

                    <div className="flex items-end justify-between">
                      <span className="font-serif text-[10px] uppercase tracking-widest text-neutral-400">
                        {item.is_sold ? "Sold at" : "Price"}
                      </span>
                      <p
                        className={`font-serif text-xl font-medium tracking-tight ${
                          item.is_sold
                            ? "text-neutral-400 line-through"
                            : "text-[#091e3c]"
                        }`}
                      >
                        ₦{item.price.toLocaleString()}
                      </p>
                    </div>
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
