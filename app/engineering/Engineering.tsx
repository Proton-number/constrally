"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, MotionConfig, type Variants } from "motion/react";

type Service = {
  id: string;
  title: string;
  summary: string;
  items: string[];
};

const services: Service[] = [
  {
    id: "structural",
    title: "Structural Design & Analysis",
    summary: "Safe, efficient structures, designed with rigour.",
    items: [
      "Structural assessment and design of buildings",
      "Foundation design and engineering solutions",
      "Structural integrity evaluation and recommendations",
      "Review and interpretation of structural drawings",
    ],
  },
  {
    id: "civil",
    title: "Civil & Construction Engineering",
    summary: "From site preparation to finished structure.",
    items: [
      "Building construction and development",
      "Site preparation and infrastructure development",
      "Concrete works, masonry, and structural installations",
      "Drainage systems and external works",
    ],
  },
  {
    id: "planning",
    title: "Project Planning & Management",
    summary: "Careful planning and supervision, start to finish.",
    items: [
      "Construction planning and scheduling",
      "Project coordination and technical supervision",
      "Resource allocation and construction monitoring",
      "Cost estimation and quantity assessment",
    ],
  },
  {
    id: "qaqc",
    title: "Quality Assurance & Quality Control",
    summary: "Standards verified at every stage of execution.",
    items: [
      "Material inspection and testing",
      "Monitoring of construction activities and workmanship",
      "Compliance with engineering specifications and standards",
      "Quality checks at various stages of project execution",
    ],
  },
  {
    id: "inspection",
    title: "Engineering Inspection & Maintenance",
    summary: "Keeping buildings sound long after handover.",
    items: [
      "Building condition assessments",
      "Structural inspections and technical evaluations",
      "Identification of defects and recommendations for corrective measures",
      "Preventive and corrective maintenance solutions",
    ],
  },
];

/* ---------- Motion helpers ---------- */

const ease = [0.16, 1, 0.3, 1] as const;
const viewport = { once: true, margin: "0px 0px -5% 0px" } as const;

const MotionLink = motion.create(Link);

/** Shared hover fill: slides in from the left. */
const fill: Variants = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.5, ease } },
};

/** Fades and lifts content into place when scrolled into view. */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A headline line that slides up from behind a mask. */
function MaskLine({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={viewport}
        transition={{ duration: 1.1, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** A horizontal rule that draws itself from left to right. */
function DrawLine({
  className = "bg-neutral-900",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`h-px w-full ${className}`}
      style={{ originX: 0 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.4, ease, delay }}
    />
  );
}

/** Text link: navy fill sweeps in on hover and the text turns white. */
function SweepLink({
  href,
  children,
  dark = false,
}: {
  href: string;
  children: ReactNode;
  dark?: boolean;
}) {
  const label: Variants = {
    rest: { x: 0, color: dark ? "#ffffff" : "#171717" },
    hover: { x: 6, color: "#ffffff", transition: { duration: 0.5, ease } },
  };

  return (
    <MotionLink
      href={href}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      className={`relative inline-block w-fit overflow-hidden border-b px-5 py-3 text-xs uppercase tracking-widest ${
        dark ? "border-white/30" : "border-neutral-300"
      }`}
    >
      <motion.span
        variants={fill}
        style={{ originX: 0 }}
        className="absolute inset-0 bg-[#091e3c]"
      />
      <motion.span variants={label} className="relative inline-block">
        {children}
      </motion.span>
    </MotionLink>
  );
}

/** Service index tile: navy fill sweeps in and the title turns white. */
function IndexTile({ href, title }: { href: string; title: string }) {
  const text: Variants = {
    rest: { x: 0, color: "#525252" },
    hover: { x: 8, color: "#ffffff", transition: { duration: 0.5, ease } },
  };

  return (
    <MotionLink
      href={href}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      className="relative block overflow-hidden border-t border-neutral-200 px-4 py-6"
    >
      <motion.span
        variants={fill}
        style={{ originX: 0 }}
        className="absolute inset-0 bg-[#091e3c]"
      />
      <motion.span
        variants={text}
        className="relative block font-serif text-xl leading-snug"
      >
        {title}
      </motion.span>
    </MotionLink>
  );
}

/** Scope row: navy fill sweeps across and the content slides right on hover. */
function ScopeRow({ item, index }: { item: string; index: number }) {
  const content: Variants = {
    rest: { x: 0, color: "#171717" },
    hover: { x: 12, color: "#ffffff", transition: { duration: 0.5, ease } },
  };

  return (
    <motion.li
      initial="rest"
      whileHover="hover"
      className="relative overflow-hidden border-b border-neutral-200"
    >
      <motion.span
        variants={fill}
        style={{ originX: 0 }}
        className="absolute inset-0 bg-[#091e3c]"
      />

      <Reveal delay={index * 0.09} className="relative">
        <motion.div variants={content} className="px-4 py-5 sm:py-6">
          <span className="text-lg leading-snug sm:text-xl">{item}</span>
        </motion.div>
      </Reveal>
    </motion.li>
  );
}

export default function Engineering() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen overflow-x-clip bg-neutral-50 text-neutral-900">
        <section className="px-6 pb-16 pt-32 sm:pt-40">
          <div className="mx-auto max-w-6xl">
            <h1 className="max-w-5xl font-serif text-5xl font-light leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
              <MaskLine delay={0.1}>Building excellence</MaskLine>
              <MaskLine delay={0.25} className="text-neutral-400">
                through precision.
              </MaskLine>
            </h1>

            <div className="mt-12">
              <DrawLine className="bg-neutral-200" delay={0.4} />
              <div className="flex flex-col justify-between gap-8 pt-8 sm:flex-row sm:items-end">
                <Reveal delay={0.5}>
                  <p className="max-w-xl text-lg leading-relaxed text-neutral-600">
                    Innovative, sustainable, and structurally sound building
                    solutions, delivered to the highest standards of safety,
                    functionality, durability, and aesthetics.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 px-6 py-24 sm:py-32">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl">
                <MaskLine>Expertise. Planning.</MaskLine>
                <MaskLine delay={0.15} className="text-neutral-400">
                  Quality control.
                </MaskLine>
              </h2>
            </div>

            <div className="flex flex-col justify-center gap-5 text-neutral-600">
              <Reveal delay={0.2}>
                <p className="leading-relaxed">
                  Our Engineering Department combines engineering expertise,
                  modern construction techniques, and strict quality control
                  measures to ensure that every project meets the highest
                  standards.
                </p>
              </Reveal>
              <Reveal delay={0.35}>
                <p className="leading-relaxed">
                  We integrate technical knowledge, careful planning, effective
                  project supervision, and quality assurance to transform
                  architectural concepts into functional and lasting structures.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="scroll-mt-8 border-t border-neutral-200 px-6 py-20 sm:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-14">
              <Reveal>
                <h2 className="font-serif text-4xl font-light sm:text-5xl">
                  Our engineering services
                </h2>
              </Reveal>
            </div>

            <div>
              {services.map((service) => (
                <article
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-8"
                >
                  <DrawLine />

                  <div className="grid gap-8 py-10 md:grid-cols-[1fr_2fr] md:gap-12 md:py-14">
                    {/* Title */}
                    <div className="md:sticky md:top-8 md:self-start">
                      <Reveal>
                        <h3 className="font-serif text-3xl font-light leading-tight sm:text-4xl">
                          {service.title}
                        </h3>
                        <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-500">
                          {service.summary}
                        </p>
                      </Reveal>
                    </div>

                    <ul>
                      {service.items.map((item, i) => (
                        <ScopeRow key={item} item={item} index={i} />
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
              <DrawLine />
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
