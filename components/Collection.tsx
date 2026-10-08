import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Reveal, { DrawLine } from "@/components/Reveal";
import PropertyCard from "@/components/PropertyCard";

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

export default async function Collection() {
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
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    return (
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl text-red-600 font-serif">
          Failed to load listings.
        </div>
      </section>
    );
  }

  const collections: Property[] = properties || [];

  return (
    <section id="properties" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-8 flex flex-col items-start justify-between sm:mb-0 sm:flex-row sm:items-center">
          <h3 className="text-left font-serif text-3xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-center md:text-5xl">
            Curated Collection
          </h3>
          <Link
            href="/properties"
            className="mt-4 inline-block border-b-2 border-black/50 font-serif text-sm font-medium uppercase text-neutral-500 hover:text-neutral-900"
          >
            View All Properties
          </Link>
        </Reveal>

        <DrawLine className="mt-2">
          <Separator className="bg-neutral-900" />
        </DrawLine>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-x-7 gap-y-9 md:grid-cols-3 md:gap-8">
          {collections.map((item, i) => {
            const cover = [...(item.property_images ?? [])].sort(
              (a, b) => a.display_order - b.display_order,
            )[0]?.image_url;

            return (
              <PropertyCard
                key={item.id}
                index={i}
                slug={item.slug}
                title={item.title}
                location={item.location}
                price={`₦${item.price.toLocaleString("en-NG")}`}
                image={cover}
                sold={item.is_sold}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
