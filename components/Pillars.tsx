import { Separator } from "@/components/ui/separator";

interface Pillar {
  index: string;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    index: "01",
    title: "Land & Development",
    description:
      "We acquire, develop, and sell premium land across Lagos's fastest-growing corridors. All titles verified, all documentation clean.",
  },
  {
    index: "02",
    title: "Renovation & Flipping",
    description:
      "We take underperforming properties, transform them with premium finishes, and sell them as move-in ready homes that exceed expectations.",
  },
  {
    index: "03",
    title: "Property Sales",
    description:
      "From plots to completed developments, we match the right buyer to the right property with honesty, speed, and professional excellence.",
  },
];

export default function Pillars() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="font-serif text-[10px] font-medium uppercase tracking-widest text-neutral-500">
          Core Services
        </span>

        <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-tight text-neutral-900 md:text-5xl">
          Three pillars, one vision.
        </h2>

        <p className="mx-auto mt-4 max-w-xl font-serif text-sm leading-relaxed text-neutral-600 md:text-base">
          Constrally operates across land, development, and sales, covering the
          entire real estate value chain. From start to finish, we provide
          everything you need in one place, so you never have to look elsewhere.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {pillars.map((pillar) => (
          <div key={pillar.index} className="flex flex-col">
            <span className="font-serif text-xs uppercase tracking-wider text-neutral-400">
              Service / {pillar.index}
            </span>

            <h3 className="mt-2 font-serif text-base font-medium uppercase tracking-wide text-neutral-900 md:text-lg">
              {pillar.title}
            </h3>

            <Separator className="my-3 bg-neutral-400" />

            <p className="font-serif text-sm leading-relaxed text-neutral-500">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
