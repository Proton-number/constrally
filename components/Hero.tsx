import Image from "next/image";
import { Button } from "./ui/button";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen sm:min-h-[92vh] items-center overflow-hidden">
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-neutral-900/95 via-neutral-900/60 to-neutral-900/30" />

      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 sm:px-6 text-center py-8 sm:py-0">
        <span className="mb-4 sm:mb-5 inline-flex items-center rounded-full border border-white/30 px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-medium uppercase tracking-widest text-white">
          Lagos, Nigeria
        </span>

        <h1 className="max-w-2xl font-serif text-3xl sm:text-4xl md:text-6xl font-medium tracking-tight text-white leading-tight">
          Premium real estate, built on trust.
        </h1>

        <p className="mt-3 sm:mt-4 max-w-lg text-base sm:text-lg text-neutral-200 px-2">
          We build, we develop, and we sell — delivering exceptional property
          experiences across Lagos. From raw land to finished homes, Constrally
          is your partner at every stage.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 w-full sm:w-auto sm:flex-row px-2">
          <Button className="inline-flex items-center justify-center gap-1.5 rounded-sm bg-white px-6 py-3 sm:py-6 text-xs font-semibold uppercase tracking-widest text-neutral-900 hover:bg-neutral-200 w-full sm:w-auto">
            Enquire now
          </Button>
          <Button
            variant="outline"
            className="rounded-sm border-white/40 bg-transparent px-6 py-3 sm:py-6 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white/10 w-full sm:w-auto"
          >
            View properties
          </Button>
        </div>

        <dl className="mt-10 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 border-t border-white/20 pt-6 sm:pt-8 w-full px-2">
          <div>
            <dt className="font-serif text-xl sm:text-2xl md:text-3xl text-white">
              100+
            </dt>
            <dd className="mt-1 text-xs uppercase tracking-widest text-neutral-300 line-clamp-2">
              Properties delivered
            </dd>
          </div>
          <div>
            <dt className="font-serif text-xl sm:text-2xl md:text-3xl text-white">
              50+
            </dt>
            <dd className="mt-1 text-xs uppercase tracking-widest text-neutral-300 line-clamp-2">
              Happy Clients
            </dd>
          </div>
          <div>
            <dt className="font-serif text-xl sm:text-2xl md:text-3xl text-white">
              5+
            </dt>
            <dd className="mt-1 text-xs uppercase tracking-widest text-neutral-300 line-clamp-2">
              Active Locations
            </dd>
          </div>
          <div>
            <dt className="font-serif text-xl sm:text-2xl md:text-3xl text-white">
              ₦2B+
            </dt>
            <dd className="mt-1 text-xs uppercase tracking-widest text-neutral-300 line-clamp-2">
              In developments
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
