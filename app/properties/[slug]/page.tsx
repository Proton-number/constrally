import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import PropertyDetailView from "@/components/PropertyDetailView";

const DEFAULT_PHONE = "0912 639 3650";

function parsePropertyDescription(raw: string | null) {
  if (!raw) {
    return { overview: "", features: [], titleDoc: "", phone: DEFAULT_PHONE };
  }

  const sections = raw.split("\n\n");

  let overview = "";
  const features: string[] = [];
  let titleDoc = "";
  let phone = DEFAULT_PHONE;

  for (const section of sections) {
    const trimmed = section.trim();

    if (trimmed.startsWith("PROPERTY FEATURES")) {
      for (const line of trimmed.split("\n").slice(1)) {
        const cleaned = line.replace(/^[•*-]\s*/, "").trim();
        if (cleaned) features.push(cleaned);
      }
    } else if (trimmed.startsWith("TITLE:")) {
      titleDoc = trimmed.replace(/^TITLE:\s*/i, "").trim();
    } else if (trimmed.includes("call or WhatsApp us today:")) {
      const parts = trimmed.split("call or WhatsApp us today:");
      if (parts[1]) phone = parts[1].trim();
    } else if (!overview) {
      overview = trimmed;
    }
  }

  return { overview, features, titleDoc, phone };
}


function toWhatsappNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("234")) return digits;
  if (digits.startsWith("0")) return `234${digits.slice(1)}`;
  if (digits.length === 10) return `234${digits}`;
  return digits;
}

const getProperty = cache(async (slug: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select(
      `
      id,
      slug,
      title,
      description,
      location,
      price,
      is_sold,
      created_at,
      property_images (
        id,
        image_url,
        display_order
      )
    `,
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(decodeURIComponent(slug));
  if (!property) return { title: "Property not found" };

  const { overview } = parsePropertyDescription(property.description);
  const description = (
    overview || `${property.title} in ${property.location}`
  ).slice(0, 160);
  const cover = [...(property.property_images ?? [])].sort(
    (a, b) => a.display_order - b.display_order,
  )[0]?.image_url;

  return {
    title: property.title,
    description,
    openGraph: {
      title: property.title,
      description,
      images: cover ? [{ url: cover }] : undefined,
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getProperty(decodeURIComponent(slug));

  if (!property) notFound();

  const images = [...(property.property_images ?? [])].sort(
    (a, b) => a.display_order - b.display_order,
  );

  const { overview, features, titleDoc, phone } = parsePropertyDescription(
    property.description,
  );

  const wa = toWhatsappNumber(phone);
  const text = property.is_sold
    ? `Hello, I saw that ${property.title} has been sold. Do you have similar properties?`
    : `Hello, I am interested in ${property.title}`;

  return (
    <PropertyDetailView
      title={property.title}
      location={property.location}
      price={`₦${property.price.toLocaleString("en-NG")}`}
      sold={Boolean(property.is_sold)}
      images={images}
      overview={
        overview ||
        property.description ||
        "No overview available for this listing."
      }
      features={features}
      titleDoc={titleDoc}
      phone={phone}
      whatsappHref={`https://wa.me/${wa}?text=${encodeURIComponent(text)}`}
      telHref={`tel:+${wa}`}
    />
  );
}
