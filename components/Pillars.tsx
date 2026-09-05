interface Pillar {
  index: string;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    index: "01",
    title: "Land & development",
    description:
      "We acquire, develop and sell premium land across Lagos's fastest-growing corridors. All titles verified, all documentation clean.",
  },
  {
    index: "02",
    title: "Renovation & flipping",
    description:
      "We take underperforming properties, transform them with premium finishes, and sell them as move-in ready homes that exceed expectations.",
  },
  {
    index: "03",
    title: "Property sales",
    description:
      "From plots to completed developments, we match the right buyer to the right property with honesty, speed, and professional excellence.",
  },
];

export default function Pillars() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-neutral-900 md:text-5xl">
          Three pillars, one vision.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-neutral-500">
          Constrally operates across land, development, and sales, covering the
          entire real estate value chain. From start to finish, we provide
          everything you need in one place, so you never have to look elsewhere.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {pillars.map((pillar) => (
          <div key={pillar.index} className="border-t border-neutral-300 pt-6">
            <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
              Service / {pillar.index}
            </span>
            <h4 className="mt-3 font-serif text-xl font-medium text-neutral-900">
              {pillar.title}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-neutral-500">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
