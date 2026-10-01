"use client";

import { Separator } from "@/components/ui/separator";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

interface DIFFERENCE {
  title: string;
  description: string;
}

const difference: DIFFERENCE[] = [
  {
    title: "CAC Registered & Trademarked",
    description:
      "RC 9284769. Verify our registration at search.cac.gov.ng. No informal operations. No shortcuts. Just a registered, professional business committed to doing things the right way.",
  },
  {
    title: "Clean Title Documents Always",
    description:
      "We deal exclusively in verified properties with proper documentation, including Certificates of Occupancy (C of O), Governor’s Consent, and Registered Deeds of Assignment.",
  },
  {
    title: "Professionalism",
    description:
      "Our trained agents listen first, advise second, and never pressure you into a decision.",
  },
  {
    title: "Flexible Payment Plans",
    description:
      "Secure your property with a 30% deposit and spread the balance over 3–12 months. We make property ownership more achievable.",
  },
];

const ease = [0.2, 0.7, 0.2, 1] as const;

const variants = {
  enter: (d: number) => ({ opacity: 0, y: 48 * d }),
  center: { opacity: 1, y: 0 },
  exit: (d: number) => ({ opacity: 0, y: -48 * d }),
};

export default function Difference() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const dir = useRef(1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(
      difference.length - 1,
      Math.max(0, Math.floor(v * difference.length)),
    );
    if (i !== activeRef.current) {
      dir.current = i > activeRef.current ? 1 : -1;
      activeRef.current = i;
      setActive(i);
    }
  });

  const current = difference[active];
  const num = String(active + 1).padStart(2, "0");

  return (
    <section ref={ref} className="relative h-[380vh] bg-[#091e3c] text-white">
      <div className="sticky top-0 flex h-svh items-center px-6 pt-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col">
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              The Constrally Difference.
            </h2>

            <Separator className="my-6 bg-white/20" />

            <p className="max-w-xl font-serif text-base leading-relaxed text-neutral-300">
              In a market dominated by informal operators, we stand apart as a
              registered, trusted, and professional brand, deeply committed to
              delivering an exceptional experience for every client we serve.
            </p>

            <div className="mt-8 hidden items-stretch gap-4 md:flex">
              <Separator orientation="vertical" className="bg-white/30" />
              <p className="max-w-lg font-serif text-base italic leading-relaxed text-neutral-300">
                “We see every client as a person with a dream, and we’re
                committed to helping make that dream a reality.”
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="relative min-h-72 md:min-h-96">
              <AnimatePresence mode="wait" custom={dir.current} initial={false}>
                <motion.div
                  key={active}
                  custom={dir.current}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease }}
                  className="relative"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-4 right-0 select-none font-serif text-[9rem] leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] md:-top-10 md:text-[15rem]"
                  >
                    {num}
                  </span>

                  <h3 className="relative max-w-md pt-24 font-serif text-3xl font-medium leading-tight md:pt-40 md:text-5xl">
                    {current.title}
                  </h3>

                  <p className="relative mt-5 max-w-md font-serif text-base leading-relaxed text-neutral-300 md:text-lg">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="font-serif text-sm tabular-nums text-neutral-400">
                {num} / {String(difference.length).padStart(2, "0")}
              </span>
              <div className="flex flex-1 gap-2">
                {difference.map((d, i) => (
                  <span
                    key={d.title}
                    className={`h-0.5 flex-1 transition-colors duration-500 ${
                      i <= active ? "bg-white" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <ul className="sr-only">
          {difference.map((d) => (
            <li key={d.title}>
              {d.title}. {d.description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
