"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface TESTIMONIALS {
  testimony: string;
  name: string;
  purchase: string;
  fallback: string;
}

const testimonials: Array<TESTIMONIALS> = [
  {
    testimony:
      "Constrally made buying my first plot of land completely stress-free. Everything was properly documented, the title was clean, and my agent was always available whenever I had a question.",
    name: "Adebayo O.",
    purchase: "Land Buyer · Ibeju Lekki",
    fallback: "A",
  },
  {
    testimony:
      "I was skeptical at first because I’ve been burned by fake agents before. But Constrally walked me through their registration, took me to the site, and provided all the necessary documents. I bought with complete confidence.",
    name: "Funke A.",
    purchase: "Property Buyer · Epe",
    fallback: "F",
  },
  {
    testimony:
      "The renovation they did on the property was exceptional. Every detail was carefully handled, and when I moved in, it felt brand new. Constrally delivered exactly what they promised.",
    name: "Chukwuemeka N.",
    purchase: "Renovation Client · Surulere",
    fallback: "C",
  },
];

const DURATION = 8000; 
const ease = [0.2, 0.7, 0.2, 1] as const;


const variants = {
  enter: (d: number) => ({ opacity: 0, y: 24 * d, filter: "blur(6px)" }),
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: (d: number) => ({ opacity: 0, y: -24 * d, filter: "blur(6px)" }),
};

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const dir = useRef(1);
  const reduce = useReducedMotion();
  const count = testimonials.length;

  const goTo = (i: number) => {
    dir.current = i >= active ? 1 : -1;
    setActive(i);
  };
  const next = () => {
    dir.current = 1;
    setActive((a) => (a + 1) % count);
  };
  const prev = () => {
    dir.current = -1;
    setActive((a) => (a - 1 + count) % count);
  };

  
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => {
      dir.current = 1;
      setActive((a) => (a + 1) % count);
    }, DURATION);
    return () => clearTimeout(t);
  }, [active, reduce, count]);

  const t = testimonials[active];

  return (
    <section className="overflow-x-clip px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl">
          What our clients say.
        </h2>
      </div>

      <div className="mx-auto mt-16 max-w-4xl">
    
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) next();
            else if (info.offset.x > 60) prev();
          }}
          className="relative min-h-80 text-center md:min-h-72"
        >
          <AnimatePresence mode="wait" custom={dir.current} initial={false}>
            <motion.figure
              key={active}
              custom={dir.current}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease }}
              className="relative"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none font-serif text-[7rem] leading-none text-neutral-200 md:-top-10 md:text-[10rem]"
              >
                “
              </span>

              <blockquote className="relative pt-14 font-serif text-xl leading-snug text-neutral-800 md:pt-20 md:text-3xl">
                {t.testimony}
              </blockquote>

              <figcaption className="relative mt-8">
                <p className="font-serif text-xs font-semibold uppercase tracking-wider text-neutral-900">
                  {t.name}
                </p>
                <p className="mt-1 font-serif text-xs tracking-wide text-neutral-500">
                  {t.purchase}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </motion.div>

  
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4 md:gap-8">
          {testimonials.map((item, i) => {
            const on = i === active;

            return (
              <button
                key={item.purchase}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show testimonial from ${item.name}`}
                aria-current={on}
                className={`relative flex items-center justify-center gap-3 pt-5 text-left transition-opacity duration-500 md:justify-start ${
                  on ? "opacity-100" : "opacity-45 hover:opacity-100"
                }`}
              >
                <span className="absolute inset-x-0 top-0 h-0.5 bg-neutral-200" />
                {on && (
                  <motion.span
                    initial={{ scaleX: reduce ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: reduce ? 0 : DURATION / 1000,
                      ease: "linear",
                    }}
                    className="absolute inset-x-0 top-0 h-0.5 origin-left bg-neutral-900"
                  />
                )}

                <Avatar className="h-10 w-10 shrink-0 rounded-full border border-neutral-200">
                  <AvatarFallback
                    className={`font-serif text-xs font-medium transition-colors duration-500 ${
                      on
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {item.fallback}
                  </AvatarFallback>
                </Avatar>

                <span className="hidden md:block">
                  <span className="block font-serif text-xs font-semibold uppercase tracking-wider text-neutral-900">
                    {item.name}
                  </span>
                  <span className="block font-serif text-xs tracking-wide text-neutral-500">
                    {item.purchase}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
