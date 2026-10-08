"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";

const ease = [0.2, 0.7, 0.2, 1] as const;

const stagger = (gap: number, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};
const word = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease } },
};
const draw = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease } },
};

function Word({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className="-mb-[0.15em] -mr-[0.08em] inline-block overflow-hidden pb-[0.15em] pr-[0.08em] align-bottom">
      <motion.span variants={word} className={`inline-block ${className}`}>
        {children}
      </motion.span>
    </span>
  );
}

/* ---------- page header: plays on load ---------- */
export function PropertiesHeader({ count }: { count: number }) {
  return (
    <motion.div variants={stagger(0.08, 0.1)} initial="hidden" animate="show">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-neutral-900 md:text-6xl">
            <Word>All</Word>{" "}
            <Word className="italic text-[#091e3c]">Properties</Word>
          </h1>
          <motion.p
            variants={rise}
            className="mt-4 max-w-md font-serif text-lg leading-relaxed text-neutral-600"
          >
            Explore our complete portfolio of architectural residences.
          </motion.p>
        </div>

        {count > 0 && (
          <motion.p
            variants={rise}
            className="font-serif text-xs uppercase tracking-wider text-neutral-500"
          >
            {count} {count === 1 ? "property" : "properties"}
          </motion.p>
        )}
      </div>

      <motion.div variants={draw} className="mt-10 origin-left">
        <Separator className="bg-neutral-900" />
      </motion.div>
    </motion.div>
  );
}

/* ---------- empty state ---------- */
export function EmptyState() {
  return (
    <motion.div
      variants={stagger(0.12, 0.5)}
      initial="hidden"
      animate="show"
      className="mt-20 flex flex-col items-center gap-3 text-center"
    >
      <motion.span
        variants={rise}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#091e3c]/5 text-[#091e3c]"
      >
        <MapPin size={22} />
      </motion.span>
      <motion.p variants={rise} className="font-serif text-xl text-neutral-900">
        No properties currently available.
      </motion.p>
      <motion.p variants={rise} className="font-serif text-sm text-neutral-500">
        New listings are added regularly, so please check back soon.
      </motion.p>
    </motion.div>
  );
}

/* ---------- listing card: replays when scrolled into view ---------- */
const card = {
  hidden: {},
  show: (col: number) => ({
    transition: { staggerChildren: 0.12, delayChildren: col * 0.12 },
  }),
};
const wipe = {
  hidden: { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.4 } },
  show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1, ease } },
};
const settle = {
  hidden: { scale: 1.3, transition: { duration: 0.4 } },
  show: { scale: 1, transition: { duration: 1.5, ease } },
};
const cardRise = {
  hidden: { opacity: 0, y: 16, transition: { duration: 0.3 } },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const cardDraw = {
  hidden: { scaleX: 0, transition: { duration: 0.3 } },
  show: { scaleX: 1, transition: { duration: 0.9, ease } },
};

interface ListingCardProps {
  index: number;
  slug: string;
  title: string;
  location: string;
  price: string; // formatted on the server
  image?: string;
  sold: boolean;
}

export function ListingCard({
  index,
  slug,
  title,
  location,
  price,
  image,
  sold,
}: ListingCardProps) {
  return (
    <motion.div
      variants={card}
      custom={index % 3}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "0px 0px -10% 0px" }}
    >
      <Link href={`/properties/${slug}`} className="group block">
        <motion.div
          variants={wipe}
          className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100"
        >
          {image ? (
            <motion.div variants={settle} className="h-full w-full">
              <div className="relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover ${sold ? "opacity-60 grayscale" : ""}`}
                />
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full w-full items-center justify-center font-serif text-xs uppercase tracking-wider text-neutral-400">
              No image
            </div>
          )}

          {sold ? (
            <span className="absolute left-3 top-3 rounded-sm bg-red-600 px-3 py-1 font-serif text-[10px] font-semibold uppercase tracking-widest text-white">
              Sold
            </span>
          ) : (
            <span className="absolute left-3 top-3 rounded-sm bg-white/75 px-3 py-1 font-serif text-[10px] font-semibold uppercase tracking-widest text-[#091e3c] backdrop-blur-sm">
              Available
            </span>
          )}

          {/* appears on hover (desktop) */}
          <span className="absolute bottom-3 right-3 flex translate-y-2 items-center gap-1 bg-white px-3 py-1.5 font-serif text-[11px] font-semibold uppercase tracking-wider text-neutral-900 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </motion.div>

        <div className="pt-4">
          <motion.h2
            variants={cardRise}
            className="font-serif text-lg font-medium uppercase tracking-wide text-neutral-900 transition-colors group-hover:text-[#091e3c]"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={cardRise}
            className="mt-2 flex items-center gap-1.5 font-serif text-sm text-neutral-500"
          >
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{location}</span>
          </motion.p>

          <motion.div variants={cardDraw} className="my-4 origin-left">
            <Separator className="bg-neutral-200" />
          </motion.div>

          <motion.div
            variants={cardRise}
            className="flex items-end justify-between"
          >
            <span className="font-serif text-[10px] uppercase tracking-widest text-neutral-400">
              {sold ? "Sold at" : "Price"}
            </span>
            <p
              className={`font-serif text-xl font-medium tracking-tight ${
                sold ? "text-neutral-400 line-through" : "text-[#091e3c]"
              }`}
            >
              {price}
            </p>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
