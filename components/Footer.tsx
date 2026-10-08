"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Phone } from "lucide-react";
import { getYear } from "date-fns";
import { motion } from "motion/react";

const explore = [
  { label: "Properties", href: "/#properties" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/#about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/#contact" },
];

const socials = [
  { label: "WhatsApp", href: "https://wa.me/message/VC4XY56ZPVCVO1" },
  { label: "YouTube", href: "http://www.youtube.com/@Constrally" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/constrally?stkn=OWp6dTQ3MXRpNmF4",
  },
];

const ease = [0.2, 0.7, 0.2, 1] as const;
const vp = { once: false, margin: "0px 0px -8% 0px" } as const;

// every variant has a fast "hidden" reset so it replays on scroll back
const stagger = (gap: number, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
const rise = {
  hidden: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};
const word = {
  hidden: { y: "110%", transition: { duration: 0.4 } },
  show: { y: "0%", transition: { duration: 0.9, ease } },
};
const draw = {
  hidden: { scaleX: 0, transition: { duration: 0.3 } },
  show: { scaleX: 1, transition: { duration: 1.2, ease } },
};
const letter = {
  hidden: { y: "135%", transition: { duration: 0.4 } },
  show: { y: "0%", transition: { duration: 1, ease } },
};

// big tap area on phones (about 44px tall), underline draws in on hover
const linkCls =
  "relative inline-block py-2.5 font-serif text-base text-neutral-300 transition-colors duration-300 hover:text-white sm:py-1 after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-500 hover:after:scale-x-100 sm:after:bottom-0";

function Word({ children }: { children: React.ReactNode }) {
  return (
    <span className="-mb-[0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
      <motion.span variants={word} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#091e3c] pb-[env(safe-area-inset-bottom)] text-white">
      <div className="mx-auto max-w-6xl px-6 pt-14 sm:pt-20">
        {/* statement + actions */}
        <motion.div
          variants={stagger(0.07, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <h2 className="max-w-2xl font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            <Word>Your</Word> <Word>next</Word> <Word>address</Word>{" "}
            <Word>starts</Word> <Word>with</Word> <Word>a</Word>{" "}
            <Word>conversation.</Word>
          </h2>

          {/* two equal buttons on phones, natural width on desktop */}
          <motion.div variants={rise} className="flex w-full gap-3 md:w-auto">
            <a
              href="https://wa.me/message/VC4XY56ZPVCVO1"
              target="_blank"
              rel="noreferrer"
              className="group flex h-12 flex-1 items-center justify-center gap-2 rounded-sm bg-white px-5 font-serif text-xs font-semibold uppercase tracking-wider text-neutral-950 transition-colors duration-300 hover:bg-neutral-200 md:flex-none md:px-6"
            >
              <span className="sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">Chat on WhatsApp</span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <a
              href="tel:+2349126393650"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-sm border border-white/40 px-5 font-serif text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-white/10 md:flex-none md:px-6"
            >
              <Phone size={14} />
              Call us
            </a>
          </motion.div>
        </motion.div>

        {/* brand on top, then Explore and Connect side by side */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          className="relative mt-12 grid grid-cols-2 gap-x-6 gap-y-10 pt-10 sm:mt-14 sm:pt-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-x-12"
        >
          <motion.span
            aria-hidden
            variants={draw}
            className="absolute inset-x-0 top-0 h-px origin-left bg-white/15"
          />

          <motion.div variants={rise} className="col-span-2 md:col-span-1">
            <Link href="/#home" className="inline-flex items-center gap-3">
              <Image
                src="/logo.jpeg"
                alt="Constrally"
                width={40}
                height={40}
                className="h-9 w-9 rounded-sm object-contain"
              />
              <span className="font-serif text-2xl font-medium tracking-tight">
                Constrally
              </span>
            </Link>
            <p className="mt-4 max-w-xs font-serif text-lg leading-relaxed text-neutral-300">
              We Build. We Develop. We Deliver.
            </p>
            <p className="mt-4 font-serif text-xs uppercase tracking-wider text-neutral-400">
              Lagos, Nigeria
            </p>
          </motion.div>

          <motion.nav variants={rise} aria-label="Footer">
            <h4 className="font-serif text-[10px] uppercase tracking-widest text-neutral-400">
              Explore
            </h4>
            <ul className="mt-3 space-y-0.5 sm:mt-4 sm:space-y-2">
              {explore.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div variants={rise}>
            <h4 className="font-serif text-[10px] uppercase tracking-widest text-neutral-400">
              Connect
            </h4>
            <ul className="mt-3 space-y-0.5 sm:mt-4 sm:space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={linkCls}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* bottom bar */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={vp}
          className="relative mt-10 grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-4 py-6 sm:mt-14 sm:flex sm:justify-between"
        >
          <motion.span
            aria-hidden
            variants={draw}
            className="absolute inset-x-0 top-0 h-px origin-left bg-white/15"
          />

          {/* CAC line first on phones, middle on desktop */}
          <motion.p
            variants={rise}
            className="order-1 col-span-2 font-serif text-xs uppercase leading-relaxed tracking-wider text-neutral-400 sm:order-2 sm:col-span-1"
          >
            Registered with CAC, RC 9284769.{" "}
            <a
              href="https://search.cac.gov.ng"
              target="_blank"
              rel="noreferrer"
              className="inline-block border-b border-neutral-500 py-1 text-neutral-200 transition-colors hover:border-white hover:text-white"
            >
              Verify
            </a>
          </motion.p>

          <motion.p
            variants={rise}
            className="order-2 font-serif text-xs uppercase leading-relaxed tracking-wider text-neutral-400 sm:order-1"
          >
            &copy; {getYear(new Date())} Constrally. All rights reserved.
          </motion.p>

       
        </motion.div>
      </div>

      {/* decorative wordmark: larger on phones so it spans the width */}
      <motion.div
        aria-hidden
        variants={stagger(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={vp}
        className="pointer-events-none flex select-none justify-center overflow-hidden pb-[0.18em] font-serif text-[18vw] font-medium leading-[0.85] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.18)] sm:text-[15vw]"
      >
        {"Constrally".split("").map((c, i) => (
          <motion.span key={i} variants={letter} className="inline-block">
            {c}
          </motion.span>
        ))}
      </motion.div>
    </footer>
  );
}
