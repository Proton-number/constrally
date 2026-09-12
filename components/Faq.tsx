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

export default function Faq() {
  return (
    <section id="faq" className="bg-neutral-100 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-10 text-center font-serif text-3xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl">
          Got questions?
        </h2>

        <Accordion className="w-full border-0">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index + 1}`}>
              <AccordionTrigger className="mt-4 cursor-pointer text-left font-serif text-base font-medium tracking-wide text-neutral-900 hover:no-underline sm:text-lg">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="text-left font-serif text-sm leading-relaxed text-neutral-600 sm:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
