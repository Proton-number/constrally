import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "lucide-react";

interface COLLECTION {
  img: string;
  title: string;
  location: string;
  price: number;
}

const collections: COLLECTION[] = [
  {
    img: "",
    title: "Villa Serenity",
    location: "Coastal Riviera",
    price: 450000,
  },
  {
    img: "",
    title: "Metropolis Center",
    location: "Coastal Riviera",
    price: 950000,
  },
  {
    img: "",
    title: "Highland Estate",
    location: "Coastal Riviera",
    price: 550000,
  },
];

export default function Collection() {
  return (
    <section id="properties" className="px-6 py-24 ">
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
        <Separator className="bg-neutral-900 mt-2 " />
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1   md:grid-cols-3 md:gap-8 gap-x-7 gap-y-9">
          {collections.map((collection) => (
            <div key={collection.price}>
              <Skeleton className="aspect-video w-full" />
              <p className="mb-2 mt-3 font-serif text-base font-medium uppercase tracking-wide text-neutral-900 md:text-lg">
                {collection.title}
              </p>
              <Separator className="bg-neutral-400" />
              <div className="mt-2 flex items-center justify-between">
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  <MapPin className="mr-1 inline h-4 w-4" />
                  {collection.location}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  ${collection.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
