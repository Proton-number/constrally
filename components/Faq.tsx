"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Constrally a registered company?",
    answer:
      "Yes. Constrally is registered with Nigeria’s Corporate Affairs Commission (CAC) under RC 9284769 and is a registered trademark. You can verify our details through the CAC public search portal. We are committed to transparent, professional, and compliant real estate transactions.",
  },
  {
    question: "Which title documents come with your properties?",
    answer:
      "Every property we offer is carefully documented and verified. Depending on the property, documents may include a Certificate of Occupancy (C of O), Governor’s Consent, or a Registered Deed of Assignment, alongside the relevant survey documents. We do not promote undocumented properties.",
  },
  {
    question: "Do you offer flexible payment plans?",
    answer:
      "Yes. Our standard plan requires a 30% deposit to secure the property, with the remaining 70% spread over an agreed period of 3–12 months. Your agreement will clearly outline all payment terms, and additional flexibility may be available for qualifying purchases.",
  },
  {
    question: "Can I buy a property from outside Nigeria?",
    answer:
      "Yes. We support clients living abroad with a convenient remote buying process. Depending on your needs, we can arrange virtual inspections, remote documentation, and representation where appropriate. Our team will guide you through every stage.",
  },
  {
    question: "How can I verify a Constrally agent?",
    answer:
      "Our agents operate under Constrally and carry official company identification. For your security, always make property payments directly to Constrally’s official company account—not to an agent’s personal account. If you have any concerns, contact us for verification before proceeding.",
  },
  {
    question: "What happens after I pay the deposit?",
    answer:
      "Once your deposit is confirmed, we prepare the necessary agreements for signing and reserve the property according to your purchase terms. You will receive official payment documentation and regular updates. After full payment, we complete the relevant title transfer and handover procedures as outlined in your agreement.",
  },
];

const ease = [0.2, 0.7, 0.2, 1] as const;
const viewport = { once: false, margin: "0px 0px -8% 0px" } as const;

const slide = {
  hidden: { opacity: 0, x: -40, transition: { duration: 0.3 } },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
};
const rise = {
  hidden: { opacity: 0, y: 24, transition: { duration: 0.3 } },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const draw = {
  hidden: { scaleX: 0, transition: { duration: 0.3 } },
  show: { scaleX: 1, transition: { duration: 1, delay: 0.2, ease } },
};

export default function Faq() {
  return (
    <section id="faq" className="bg-neutral-100 px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        {/* left: pinned on desktop */}
        <motion.div
          variants={slide}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl">
            Got questions?
          </h2>

          <p className="mt-4 max-w-sm font-serif text-sm leading-relaxed text-neutral-600 md:text-base">
            Can’t find what you’re looking for? Our team is happy to answer
            directly, with no pressure.
          </p>

          <Link
            href="/#contact"
            className="group mt-8 inline-flex items-center gap-2 border-b border-neutral-900 pb-0.5 font-serif text-xs font-semibold uppercase tracking-wider text-neutral-900"
          >
            Ask us directly
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* right: numbered list */}
        <Accordion className="w-full border-0">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="group/faq relative"
            >
              <motion.span
                aria-hidden
                variants={draw}
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-neutral-300"
              />

              <AccordionItem
                value={`item-${index + 1}`}
                className="border-b-0 px-4 transition-colors duration-500 data-open:bg-white data-[state=open]:bg-white"
              >
                <AccordionTrigger className="cursor-pointer py-6 text-left font-serif text-base font-medium tracking-wide text-neutral-900 hover:no-underline sm:text-lg">
                  <span className="transition-transform duration-300 group-hover/faq:translate-x-1">
                    {faq.question}
                  </span>
                </AccordionTrigger>

                <AccordionContent className="text-left font-serif text-sm leading-relaxed text-neutral-600 sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
