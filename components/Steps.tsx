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

export default function Steps() {
  return (
    <section className="bg-neutral-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-serif text-[10px] font-medium uppercase tracking-widest text-neutral-500">
            Process
          </span>

          <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl">
            Simple steps to your dream property.
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.index} className="flex flex-col text-left">
              <span className="font-serif text-xs uppercase tracking-wider text-neutral-400">
                Step / {step.index}
              </span>

              <h3 className="mt-2 font-serif text-base font-medium uppercase tracking-wide text-neutral-900 md:text-lg">
                {step.title}
              </h3>

              <Separator className="my-3 bg-neutral-300" />

              <p className="font-serif text-sm leading-relaxed text-neutral-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
