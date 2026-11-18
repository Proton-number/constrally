import { createClient } from "@/lib/supabase/server";
import { ShortletCard, ShortletsEmptyState } from "./Shortlet";

interface ShortletImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface ShortletItem {
  id: string;
  slug: string;
  name: string;
  location: string;
  bedrooms: string;
  apartment_type: string;
  shortlet_images: ShortletImage[];
}

export default async function PublicShortletPage() {
  const supabase = await createClient();

  const { data: shortlets, error } = await supabase
    .from("shortlets")
    .select(
      `
      id,
      slug,
      name,
      location,
      bedrooms,
      apartment_type,
      shortlet_images (
        id,
        image_url,
        display_order
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <section className="min-h-screen bg-neutral-50 px-6 pb-24 pt-32 sm:pt-40">
        <div className="mx-auto max-w-6xl font-serif text-red-600">
          Failed to load shortlets.
        </div>
      </section>
    );
  }

  const list: ShortletItem[] = shortlets || [];

  return (
    <section className="min-h-screen bg-neutral-50 px-6 pb-24 pt-32 sm:pt-40 lg:pt-20">
      <div className="mx-auto max-w-6xl">
        {list.length === 0 ? (
          <ShortletsEmptyState />
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((item, i) => {
              const cover = [...(item.shortlet_images ?? [])].sort(
                (a, b) => a.display_order - b.display_order,
              )[0]?.image_url;

              return (
                <ShortletCard
                  key={item.id}
                  index={i}
                  slug={item.slug}
                  name={item.name}
                  location={item.location}
                  bedrooms={item.bedrooms}
                  apartmentType={item.apartment_type}
                  image={cover}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
