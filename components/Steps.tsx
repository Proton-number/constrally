import { Separator } from "@/components/ui/separator";

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
      "Our agent takes time to understand your investment goals, lifestyle needs, and timeline",
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
      "A format Property Sale Agreement is prepared. Your 30% deposit secures the property immediately.",
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

export default function Steps() {
  return (
    <section className="px-6 py-24 bg-neutral-100 ">
      <div className="mx-auto max-w-6xl">
        <h3 className="mx-auto max-w-xl text-center font-serif text-3xl font-medium leading-tight  tracking-tight text-neutral-900 md:text-5xl">
          Simple steps to your dream property.
        </h3>
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 sm:grid-cols-2  md:grid-cols-3 md:gap-8 gap-x-7 gap-y-9">
          {steps.map((step) => (
            <div key={step.index} className="text-left ">
              <Separator className="bg-neutral-300 mb-4 " />
              <h4 className="mb-2 text-[12px] font-semibold tracking-[0.12em] text-neutral-700">
                {step.index}
              </h4>
              <p className="mb-2 uppercase font-serif text-xl font-medium text-neutral-900">
                {step.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
