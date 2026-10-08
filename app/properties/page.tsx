import { createClient } from "@/lib/supabase/server";
import {
  EmptyState,
  ListingCard,
  PropertiesHeader,
} from "@/app/properties/PropertyList";

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
        <PropertiesHeader count={list.length} />

        {list.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((item, i) => {
              const cover = [...(item.property_images ?? [])].sort(
                (a, b) => a.display_order - b.display_order,
              )[0]?.image_url;

              return (
                <ListingCard
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
        )}
      </div>
    </section>
  );
}
