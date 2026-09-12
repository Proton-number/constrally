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
    <section className="bg-neutral-950 px-6 py-24 text-white">
      <div className="mx-auto flex max-w-6xl flex-col lg:flex-row">
        <div className="flex flex-col lg:w-1/2 lg:pr-14">
          <span className="mb-4 inline-block font-serif text-[10px] font-medium uppercase tracking-widest text-neutral-400">
            Why Constrally
          </span>

          <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-white md:text-5xl">
            The Constrally Difference.
          </h2>

          <Separator className="my-6 bg-white/20" />

          <p className="max-w-xl font-serif text-base leading-relaxed text-neutral-300">
            In a market dominated by informal operators, we stand apart as a
            registered, trusted, and professional brand, deeply committed to
            delivering an exceptional experience for every client we serve.
          </p>

          <div className="mt-8 flex items-stretch gap-4">
            <Separator orientation="vertical" className="bg-white/30" />

            <p className="max-w-lg font-serif text-sm italic leading-relaxed text-neutral-300 md:text-base">
              “We see every client as a person with a dream, and we’re committed
              to helping make that dream a reality.”
            </p>
          </div>
        </div>

        <Separator
          orientation="vertical"
          className="mx-8 hidden bg-white/20 lg:block"
        />

        <Separator className="my-10 bg-white/20 lg:hidden" />

        <div className="grid w-full gap-x-8 gap-y-12 sm:grid-cols-2 lg:w-1/2 lg:pl-6">
          {difference.map((diff) => (
            <div key={diff.title} className="flex flex-col">
              <h3 className="font-serif text-base font-medium uppercase tracking-wide text-white md:text-lg">
                {diff.title}
              </h3>

              <Separator className="my-3 bg-white/20" />

              <p className="font-serif text-sm leading-relaxed text-neutral-400">
                {diff.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
