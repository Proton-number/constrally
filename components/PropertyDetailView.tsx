"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import PropertyGallery from "@/components/PropertyGallery";

export interface PropertyImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface PropertyDetailViewProps {
  title: string;
  location: string;
  price: string;
  sold: boolean;
  images: PropertyImage[];
  overview: string;
  features: string[];
  titleDoc: string;
  phone: string;
  whatsappHref: string;
  telHref: string;
}

const ease = [0.2, 0.7, 0.2, 1] as const;

const vp = { once: true, margin: "0px 0px -8% 0px" } as const;

const stagger = (gap: number, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
const rise = {
  hidden: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};
const slideX = {
  hidden: { opacity: 0, x: -16, transition: { duration: 0.3 } },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};
const fromRight = {
  hidden: { opacity: 0, x: 40, transition: { duration: 0.3 } },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
};
const word = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease } },
};
const draw = {
  hidden: { scaleX: 0, transition: { duration: 0.3 } },
  show: { scaleX: 1, transition: { duration: 1.1, ease } },
};

const primaryBtn =
  "flex h-11 w-full items-center justify-center gap-2 bg-[#091e3c] font-serif text-xs font-semibold uppercase tracking-wider text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0d2c58]";
const outlineBtn =
  "flex h-11 w-full items-center justify-center gap-2 border border-neutral-300 font-serif text-xs font-medium uppercase tracking-wider text-neutral-900 transition duration-300 hover:-translate-y-0.5 hover:border-neutral-900 hover:bg-neutral-50";

function Word({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-[-0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
      <motion.span variants={word} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.h2
        variants={rise}
        className="font-serif text-base font-medium uppercase tracking-wide text-neutral-900 md:text-lg"
      >
        {children}
      </motion.h2>
      <motion.div variants={draw} className="my-4 origin-left">
        <Separator className="bg-neutral-300" />
      </motion.div>
    </>
  );
}

export default function PropertyDetailView({
  title,
  location,
  price,
  sold,
  images,
  overview,
  features,
  titleDoc,
  phone,
  whatsappHref,
  telHref,
}: PropertyDetailViewProps) {
  return (
    <article className="min-h-screen overflow-x-clip px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {/* header: plays on load */}
        <motion.div
          variants={stagger(0.08, 0.05)}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={rise}>
            <Link
              href="/properties"
              className="group mb-8 inline-flex items-center font-serif text-xs uppercase tracking-wider text-neutral-500 transition hover:text-neutral-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to all properties
            </Link>
          </motion.div>

          <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <motion.div variants={rise} className="flex items-center gap-3">
                <span className="font-serif text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                  Listing Details
                </span>
                {sold && (
                  <span className="rounded-sm bg-red-600 px-2.5 py-0.5 font-serif text-[10px] font-semibold uppercase tracking-widest text-white">
                    Sold
                  </span>
                )}
              </motion.div>

              <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-neutral-900 md:text-5xl">
                {title
                  .split(" ")
                  .filter(Boolean)
                  .map((w, i) => (
                    <span key={i}>
                      <Word>{w}</Word>{" "}
                    </span>
                  ))}
              </h1>

              <motion.p
                variants={rise}
                className="mt-2 flex items-center font-serif text-sm text-neutral-500"
              >
                <MapPin className="mr-1.5 h-4 w-4" />
                {location}
              </motion.p>
            </div>

            <motion.div
              variants={rise}
              className="border-l border-neutral-200 pl-4 md:border-l-0 md:pl-0 md:text-right"
            >
              <p className="font-serif text-xs uppercase tracking-wider text-neutral-400">
                {sold ? "Sold at" : "Price"}
              </p>
              <p
                className={`font-serif text-2xl font-medium md:text-4xl ${
                  sold ? "text-neutral-400 line-through" : "text-neutral-900"
                }`}
              >
                {price}
              </p>
            </motion.div>
          </div>

          <motion.div variants={draw} className="mb-8 origin-left">
            <Separator className="bg-neutral-900" />
          </motion.div>
        </motion.div>

        {/* gallery: rise + fade on load (no clip-path, so a lightbox won't be cropped) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
        >
          <PropertyGallery images={images} title={title} />
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="space-y-12 lg:col-span-2">
            <motion.div
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={vp}
            >
              <SectionHead>Overview</SectionHead>
              <motion.p
                variants={rise}
                className="font-serif text-base leading-relaxed text-neutral-700"
              >
                {overview}
              </motion.p>
            </motion.div>

            {features.length > 0 && (
              <motion.div
                variants={stagger(0.06)}
                initial="hidden"
                whileInView="show"
                viewport={vp}
              >
                <SectionHead>Property Features</SectionHead>
                <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-8">
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      variants={slideX}
                      className="flex items-center gap-2.5 font-serif text-sm text-neutral-700"
                    >
                      <Check className="h-4 w-4 shrink-0 text-neutral-900" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* sidebar: slides in, stays in view on desktop */}
          <motion.aside
            variants={fromRight}
            initial="hidden"
            whileInView="show"
            viewport={vp}
            className="lg:sticky lg:top-28 lg:self-start"
          >
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
                    {location}
                  </p>
                </div>
              </div>

              <Separator className="my-6 bg-neutral-200" />

              {sold ? (
                <div className="space-y-3">
                  <p className="font-serif text-sm leading-relaxed text-neutral-600">
                    This property has been sold. See what&apos;s still
                    available.
                  </p>
                  <Link href="/properties" className={primaryBtn}>
                    View available properties
                  </Link>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className={outlineBtn}
                  >
                    Ask about similar properties
                  </a>
                </div>
              ) : (
                <div className="space-y-3">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className={primaryBtn}
                  >
                    WhatsApp Enquiry
                  </a>
                  <a href={telHref} className={outlineBtn}>
                    <Phone className="h-3.5 w-3.5" />
                    Call {phone}
                  </a>
                </div>
              )}
            </div>
          </motion.aside>
        </div>

        {/* phones: enquiry bar that follows you down the page, then rests at the end */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease }}
          className="sticky bottom-0 z-30 -mx-6 mt-12 border-t border-neutral-200 bg-white/95 px-6 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-serif text-[10px] uppercase tracking-widest text-neutral-400">
                {sold ? "Sold at" : "Price"}
              </p>
              <p
                className={`truncate font-serif text-lg font-medium ${
                  sold ? "text-neutral-400 line-through" : "text-neutral-900"
                }`}
              >
                {price}
              </p>
            </div>

            {sold ? (
              <Link href="/properties" className={`${primaryBtn} w-auto px-5`}>
                View available
              </Link>
            ) : (
              <>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className={`${primaryBtn} w-auto px-5`}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={telHref}
                  aria-label={`Call ${phone}`}
                  className={`${outlineBtn} w-11 shrink-0 px-0`}
                >
                  <Phone className="h-4 w-4" />
                </a>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </article>
  );
}
