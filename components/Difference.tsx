import { Separator } from "@/components/ui/separator";

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

export default function Difference() {
  return (
    <section className="px-6 py-24 bg-black text-white">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-1/2 lg:pr-14">
          <h3 className="font-serif text-3xl font-medium leading-tight tracking-tight md:text-5xl">
            The Constrally Difference.
          </h3>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-200 md:text-base">
            In a market dominated by informal operators, we stand apart as a
            registered, trusted, and professional brand, deeply committed to
            delivering an exceptional experience for every client we serve.
          </p>

          <div className="mt-8 flex items-stretch gap-4">
            <Separator orientation="vertical" className="bg-white/40" />

            <p className="max-w-lg text-base italic leading-relaxed text-neutral-200">
              “We see every client as a person with a dream, and we’re committed
              to helping make that dream a reality.”
            </p>
          </div>
        </div>

        <Separator
          orientation="vertical"
          className="mx-8 hidden bg-white/40 lg:block"
        />

        <Separator className="my-10 bg-white/40 lg:hidden" />

        <div className="grid w-full gap-x-8 gap-y-10 sm:grid-cols-2 lg:w-1/2 lg:pl-6">
          {difference.map((diff) => (
            <div key={diff.title}>
              <h4 className="font-serif text-xl font-medium leading-tight">
                {diff.title}
              </h4>

              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                {diff.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
