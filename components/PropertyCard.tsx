"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";

interface PropertyCardProps {
  index: number;
  slug: string;
  title: string;
  location: string;
  price: string;
  image?: string;
  sold: boolean;
}

const ease = [0.2, 0.7, 0.2, 1] as const;

const container = {
  hidden: {},
  show: (i: number) => ({
    transition: { staggerChildren: 0.14, delayChildren: i * 0.15 },
  }),
};
const wipe = {
  hidden: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.4 },
  },
  show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1, ease } },
};
const settle = {
  hidden: { scale: 1.3, transition: { duration: 0.4 } },
  show: { scale: 1, transition: { duration: 1.5, ease } },
};
const rise = {
  hidden: { opacity: 0, y: 16, transition: { duration: 0.3 } },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const draw = {
  hidden: { scaleX: 0, transition: { duration: 0.3 } },
  show: { scaleX: 1, transition: { duration: 0.9, ease } },
};

export default function PropertyCard({
  index,
  slug,
  title,
  location,
  price,
  image,
  sold,
}: PropertyCardProps) {
  return (
    <motion.div
      variants={container}
      custom={index % 3}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "0px 0px -12% 0px" }}
      className={index % 3 === 1 ? "md:mt-14" : ""}
    >
      <Link href={`/properties/${slug}`} className="group block">
        <motion.div
          variants={wipe}
          className="relative h-65 w-full overflow-hidden bg-neutral-100 sm:h-72.5 md:h-80"
        >
          {image ? (
            <motion.div variants={settle} className="h-full w-full">
              <div className="relative h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`object-cover ${sold ? "opacity-60 grayscale" : ""}`}
                />
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
              No image
            </div>
          )}

          {sold && (
            <span className="absolute left-3 top-3 bg-red-600 px-3 py-1 font-serif text-[11px] font-medium uppercase tracking-wider text-white">
              Sold
            </span>
          )}

          <span className="absolute bottom-3 right-3 flex translate-y-2 items-center gap-1 bg-white px-3 py-1.5 font-serif text-[11px] font-semibold uppercase tracking-wider text-neutral-900 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </motion.div>

        <motion.p
          variants={rise}
          className="mb-2 mt-3 font-serif text-base font-medium uppercase tracking-wide text-neutral-900 md:text-lg"
        >
          {title}
        </motion.p>

        <motion.div variants={draw} className="origin-left">
          <Separator className="bg-neutral-400" />
        </motion.div>

        <motion.div
          variants={rise}
          className="mt-2 flex items-center justify-between"
        >
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            <MapPin className="mr-1 inline h-4 w-4" />
            {location}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            {price}
          </p>
        </motion.div>
      </Link>
    </motion.div>
  );
}
