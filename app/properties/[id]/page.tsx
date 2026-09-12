import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowLeft, Phone, ShieldCheck, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import PropertyGallery from "@/components/PropertyGallery";

interface PropertyImage {
  id: string;
  image_url: string;
  display_order: number;
}

function parsePropertyDescription(raw: string | null) {
  if (!raw) {
    return {
      overview: "",
      features: [] as string[],
      titleDoc: "",
      phone: "0912 639 3650",
    };
  }

  const sections = raw.split("\n\n");
  let overview = "";
  const features: string[] = [];
  let titleDoc = "";
  let phone = "0912 639 3650";

  for (const block of sections) {
    const trimmed = block.trim();
    if (trimmed.startsWith("PROPERTY FEATURES")) {
      const lines = trimmed.split("\n").slice(1);
      lines.forEach((line) => {
        const cleaned = line.replace(/^[•\-\*]\s*/, "").trim();
        if (cleaned) features.push(cleaned);
      });
    } else if (
      trimmed.startsWith("📑 TITLE:") ||
      trimmed.startsWith("TITLE:")
    ) {
      titleDoc = trimmed.replace(/^📑?\s*TITLE:\s*/i, "").trim();
    } else if (trimmed.includes("call or WhatsApp us today:")) {
      const parts = trimmed.split("call or WhatsApp us today:");
      if (parts[1]) phone = parts[1].trim();
    } else if (!overview) {
      overview = trimmed;
    }
  }

  return { overview, features, titleDoc, phone };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: property, error } = await supabase
    .from("properties")
    .select(
      `
      id,
      title,
      description,
      location,
      price,
      created_at,
      property_images (
        id,
        image_url,
        display_order
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error || !property) {
    notFound();
  }

  const sortedImages = (property.property_images || []).sort(
    (a, b) => a.display_order - b.display_order,
  );

  const { overview, features, titleDoc, phone } = parsePropertyDescription(
    property.description,
  );

  const cleanPhoneNumber = phone.replace(/[^0-9+]/g, "");

  return (
    <article className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/properties"
          className="mb-8 inline-flex items-center font-serif text-xs uppercase tracking-wider text-neutral-500 transition hover:text-neutral-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all properties
        </Link>

        {/* Header Title & Pricing Block */}
        <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-serif text-[10px] font-medium uppercase tracking-widest text-neutral-400">
              Listing Details
            </span>
            <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-neutral-900 md:text-5xl">
              {property.title}
            </h1>
            <p className="mt-2 flex items-center font-serif text-sm text-neutral-500">
              <MapPin className="mr-1.5 h-4 w-4" />
              {property.location}
            </p>
          </div>

          <div className="border-l border-neutral-200 pl-4 md:border-l-0 md:pl-0 md:text-right">
            <p className="font-serif text-xs uppercase tracking-wider text-neutral-400">
              Price
            </p>
            <p className="font-serif text-2xl font-medium text-neutral-900 md:text-4xl">
              ₦{property.price.toLocaleString()}
            </p>
          </div>
        </div>

        <Separator className="mb-8 bg-neutral-900" />

        {/* Interactive Rotating Carousel Gallery */}
        <PropertyGallery images={sortedImages} title={property.title} />

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="space-y-12 lg:col-span-2">
            <div>
              <h2 className="font-serif text-base font-medium uppercase tracking-wide text-neutral-900 md:text-lg">
                Overview
              </h2>
              <Separator className="my-4 bg-neutral-300" />
              <p className="font-serif text-base leading-relaxed text-neutral-700">
                {overview ||
                  property.description ||
                  "No overview available for this listing."}
              </p>
            </div>

            {features.length > 0 && (
              <div>
                <h2 className="font-serif text-base font-medium uppercase tracking-wide text-neutral-900 md:text-lg">
                  Property Features
                </h2>
                <Separator className="my-4 bg-neutral-300" />
                <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-8">
                  {features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 font-serif text-sm text-neutral-700"
                    >
                      <Check className="h-4 w-4 shrink-0 text-neutral-900" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="border border-neutral-200 bg-white p-6">
              <h3 className="font-serif text-sm font-medium uppercase tracking-wider text-neutral-900">
                Property Verification
              </h3>
              <Separator className="my-4 bg-neutral-300" />

              <div className="space-y-4">
                <div>
                  <p className="font-serif text-xs uppercase tracking-wider text-neutral-400">
                    Title Document
                  </p>
                  <p className="mt-1 flex items-center font-serif text-sm font-medium text-neutral-900">
                    <ShieldCheck className="mr-1.5 h-4 w-4 text-neutral-900" />
                    {titleDoc || "Verified Documentation"}
                  </p>
                </div>

                <div>
                  <p className="font-serif text-xs uppercase tracking-wider text-neutral-400">
                    Location Area
                  </p>
                  <p className="mt-1 font-serif text-sm text-neutral-800">
                    {property.location}
                  </p>
                </div>
              </div>

              <Separator className="my-6 bg-neutral-200" />

              <div className="space-y-3">
                <a
                  href={`https://wa.me/${cleanPhoneNumber.replace("+", "")}?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(property.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 w-full items-center justify-center bg-neutral-900 font-serif text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-800"
                >
                  WhatsApp Enquiry
                </a>

                <a
                  href={`tel:${cleanPhoneNumber}`}
                  className="flex h-11 w-full items-center justify-center border border-neutral-300 font-serif text-xs font-medium uppercase tracking-wider text-neutral-900 transition hover:bg-neutral-100"
                >
                  <Phone className="mr-2 h-3.5 w-3.5" />
                  Call {phone}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
