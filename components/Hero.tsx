"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { TextScramble } from "./motion-primitives/text-scramble";

const HEADLINE = "Premium real estate, built on trust.";

const stats = [
  { value: "100+", label: "Properties" },
  { value: "50+", label: "Clients" },
  { value: "5+", label: "Locations" },
  { value: "₦2B+", label: "Developments" },
];

const ease = [0.2, 0.7, 0.2, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 20, transition: { duration: 0.4 } },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease },
  }),
};

const word = {
  hidden: { y: "110%", transition: { duration: 0.4 } },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.25 + i * 0.09, ease },
  }),
};

const line = {
  hidden: { scaleX: 0, transition: { duration: 0.3 } },
  visible: { scaleX: 1, transition: { duration: 1.1, delay: 1.2, ease } },
};

// This is the zoom effect on the background image. 
const zoom = {
  hidden: { scale: 1.15, transition: { duration: 0.4 } },
  visible: { scale: 1, transition: { duration: 2.4, ease } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const show = useInView(ref, { amount: 0.5 });
  const state = show ? "visible" : "hidden";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const [scramble, setScramble] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setScramble(show), show ? 1300 : 0);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden sm:min-h-screen md:items-start"
    >
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-x-0 bottom-0 top-[-20%] -z-10"
      >
        <motion.div
          variants={zoom}
          initial="hidden"
          animate={state}
          className="relative h-full w-full"
        >
          <Image
            src="/hero.png"
            alt="Lagos real estate"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-linear-to-t from-neutral-950/95 via-neutral-900/60 to-neutral-900/30" />

      <motion.div
        initial="hidden"
        animate={state}
        className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center sm:px-8 justify-center md:items-start md:py-32 md:text-left lg:py-40"
      >
        <h1
          aria-label={HEADLINE}
          className="max-w-3xl font-serif text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl md:text-7xl"
        >
          {HEADLINE.split(" ").map((w, i) => (
            <span key={i} aria-hidden>
              <span className="mb-[-0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.span
                  variants={word}
                  custom={i}
                  className="inline-block"
                >
                  {w}
                </motion.span>
              </span>{" "}
            </span>
          ))}
        </h1>

        <motion.p
          variants={rise}
          custom={0.9}
          className="mt-6 max-w-xl font-serif text-base leading-relaxed text-neutral-300 sm:mt-7 sm:text-lg"
        >
          We build, develop, and sell exceptional properties across Lagos.
        </motion.p>

        <motion.div
          variants={rise}
          custom={1.05}
          className="mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row"
        >
          <Link href="/#contact" className="w-full sm:w-auto">
            <Button className="h-12 w-full rounded-sm border border-white/40 bg-white/90 px-7 font-serif text-xs font-semibold uppercase tracking-wider text-neutral-950 backdrop-blur-sm transition-colors duration-300 hover:bg-white sm:w-auto">
              Enquire now
            </Button>
          </Link>

          <Link href="/properties" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="h-12 w-full rounded-sm border-white/40 bg-transparent px-7 font-serif text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              View properties
            </Button>
          </Link>
        </motion.div>

        <div className="mt-16 w-full max-w-3xl sm:mt-20">
          <motion.div variants={line} className="mb-8 origin-left">
            <Separator className="bg-white/20" />
          </motion.div>

          <motion.dl
            variants={rise}
            custom={1.3}
            className="grid w-full grid-cols-2 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="border-r border-white/10 px-4 first:pl-0 last:border-r-0 sm:px-6"
              >
                <TextScramble
                  trigger={scramble}
                  className="font-serif text-2xl font-medium tracking-tight text-white sm:text-3xl"
                >
                  {s.value}
                </TextScramble>
                <dd className="mt-1 font-serif text-xs uppercase tracking-wider text-neutral-400">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>
    </section>
  );
}
