"use client";

import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { motion } from "motion/react";

interface Pillar {
  index: string;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    index: "01",
    title: "Land & Development",
    description:
      "We acquire, develop, and sell premium land across Lagos's fastest-growing corridors. All titles verified, all documentation clean.",
  },
  {
    index: "02",
    title: "Renovation & Flipping",
    description:
      "We take underperforming properties, transform them with premium finishes, and sell them as move-in ready homes that exceed expectations.",
  },
  {
    index: "03",
    title: "Property Sales",
    description:
      "From plots to completed developments, we match the right buyer to the right property with honesty, speed, and professional excellence.",
  },
];

const ease = [0.2, 0.7, 0.2, 1] as const;

export default function Pillars() {
  const [active, setActive] = useState(0);

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl">
          Three pillars, one vision.
        </h2>

        <p className="mx-auto mt-4 max-w-xl font-serif text-sm leading-relaxed text-neutral-600 md:text-base">
          Constrally operates across land, development, and sales, covering the
          entire real estate value chain. From start to finish, we provide
          everything you need in one place, so you never have to look elsewhere.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease }}
        className="mx-auto mt-16 flex h-144 max-w-6xl flex-col gap-2 md:h-120 md:flex-row"
      >
        {pillars.map((pillar, i) => {
          const on = i === active;

          return (
            <motion.div
              key={pillar.index}
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              initial={false}
              animate={{
                flexGrow: on ? 3 : 1,
                backgroundColor: on ? "#091e3c" : "#efeeea",
              }}
              transition={{ duration: 0.7, ease }}
              className="relative min-h-0 min-w-0 basis-0 cursor-pointer overflow-hidden rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
            >
        
              <span
                className={`absolute left-6 top-6 font-serif text-xs uppercase tracking-wider transition-colors duration-500 md:left-8 md:top-8 ${
                  on ? "text-white/60" : "text-neutral-400"
                }`}
              >
                {pillar.index}
              </span>

            
              <span
                aria-hidden
                className={`absolute left-16 top-5.5 font-serif text-base font-medium uppercase tracking-wide text-neutral-900 transition-opacity md:bottom-8 md:left-8 md:top-auto md:rotate-180 md:text-lg md:[writing-mode:vertical-rl] ${
                  on
                    ? "pointer-events-none opacity-0 duration-200"
                    : "opacity-100 delay-300 duration-500"
                }`}
              >
                {pillar.title}
              </span>

            
              <div
                className={`absolute bottom-6 left-6 right-6 text-white transition-opacity md:bottom-8 md:left-8 md:right-auto md:w-96 ${
                  on
                    ? "opacity-100 delay-300 duration-500"
                    : "pointer-events-none opacity-0 duration-200"
                }`}
              >
                <h3 className="font-serif text-2xl font-medium leading-tight md:text-4xl">
                  {pillar.title}
                </h3>

                <Separator className="my-4 bg-white/20" />

                <p className="font-serif text-sm leading-relaxed text-neutral-300 md:text-base">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
