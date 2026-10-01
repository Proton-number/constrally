"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "motion/react";

interface STEPS {
  index: string;
  title: string;
  description: string;
}

const steps: STEPS[] = [
  {
    index: "01",
    title: "Reach Out",
    description:
      "Contact us via live chat, phone, or our contact form. Tell us what you’re looking for, including your budget, preferred location, and property type.",
  },
  {
    index: "02",
    title: "Goals",
    description:
      "Our agent takes time to understand your investment goals, lifestyle needs, and timeline.",
  },
  {
    index: "03",
    title: "Site Visit",
    description:
      "We arrange an accompanied site visit at your convenience. See the property, ask every question.",
  },
  {
    index: "04",
    title: "Agreement and Deposit",
    description:
      "A formal Property Sale Agreement is prepared. Your 30% deposit secures the property immediately.",
  },
  {
    index: "05",
    title: "Complete Payment",
    description:
      "Pay the balance within your agreed timeline, typically between 3 and 12 months. All payments are secure and protected.",
  },
  {
    index: "06",
    title: "Handover",
    description:
      "Receive your title document, with the keys in hand and the deed in your name. Your property journey is complete.",
  },
];

function Step({ step, last }: { step: STEPS; last: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const on = useInView(ref, { margin: "0px 0px -45% 0px" });

  return (
    <li ref={ref} className={`relative ${last ? "pb-0" : "pb-28 md:pb-40"}`}>
      <span
        className={`absolute -left-15 top-0 z-10 grid size-9 place-items-center rounded-full border-2 font-serif text-xs font-medium transition-colors duration-700 ${
          on
            ? "border-neutral-900 bg-neutral-900 text-white"
            : "border-neutral-300 bg-neutral-50 text-neutral-400"
        }`}
      >
        {step.index}
      </span>

      <div
        className={`transition-opacity duration-700 ${
          on ? "opacity-100" : "opacity-40"
        }`}
      >
        <h3 className="font-serif text-base font-medium uppercase tracking-wide text-neutral-900 md:text-lg">
          {step.title}
        </h3>

        <p className="mt-2 max-w-prose font-serif text-sm leading-relaxed text-neutral-600">
          {step.description}
        </p>
      </div>
    </li>
  );
}

export default function Steps() {
  const box = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: box,
    offset: ["start 0.7", "end 0.5"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    mass: 2.2,
  });

  return (
    <section className="bg-neutral-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl">
            Simple steps to your dream property.
          </h2>
        </div>

        <div ref={box} className="relative mx-auto mt-16 max-w-2xl">
          <span
            aria-hidden
            className="absolute bottom-0 left-4.25 top-4.5 w-0.5 bg-neutral-300"
          />
          <motion.span
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-0 left-4.25 top-4.5 w-0.5 origin-top bg-neutral-900"
          />

          <ol className="pl-15">
            {steps.map((step, i) => (
              <Step
                key={step.index}
                step={step}
                last={i === steps.length - 1}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
