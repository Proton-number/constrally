import Image from "next/image";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden sm:min-h-[92vh]">
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        className="-z-10 object-cover"
      />

      <div className="absolute inset-0 -z-10 bg-linear-to-t from-neutral-950/95 via-neutral-900/60 to-neutral-900/30" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center sm:px-8">
        <span className="mb-6 inline-flex items-center rounded-full border border-white/30 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white sm:mb-7">
          Lagos, Nigeria
        </span>

        <h1 className="max-w-3xl font-serif text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-7xl">
          Premium real estate, built on trust.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-neutral-200 sm:mt-7 sm:text-lg">
          We build, develop, and sell exceptional properties across Lagos.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row">
          <Link href="/#properties" className="w-full sm:w-auto">
            <Button className="h-12 w-full rounded-sm bg-white px-7 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-900 hover:bg-neutral-200 sm:w-auto">
              Enquire now
            </Button>
          </Link>

          <Link href="/properties" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="h-12 w-full rounded-sm border-white/40 bg-transparent px-7 text-xs font-semibold uppercase tracking-[0.15em] text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              View properties
            </Button>
          </Link>
        </div>

        <dl className="mt-16 grid w-full max-w-3xl grid-cols-2 border-t border-white/20 pt-7 sm:mt-20 sm:grid-cols-4 sm:pt-8">
          <div className="border-r border-white/10 px-4 first:pl-0 last:border-r-0 sm:px-6">
            <dt className="font-serif text-2xl text-white sm:text-3xl">100+</dt>
            <dd className="mt-1 text-[10px] uppercase tracking-[0.15em] text-neutral-400">
              Properties
            </dd>
          </div>

          <div className="border-r border-white/10 px-4 sm:px-6">
            <dt className="font-serif text-2xl text-white sm:text-3xl">50+</dt>
            <dd className="mt-1 text-[10px] uppercase tracking-[0.15em] text-neutral-400">
              Clients
            </dd>
          </div>

          <div className="border-r border-white/10 px-4 sm:px-6">
            <dt className="font-serif text-2xl text-white sm:text-3xl">5+</dt>
            <dd className="mt-1 text-[10px] uppercase tracking-[0.15em] text-neutral-400">
              Locations
            </dd>
          </div>

          <div className="px-4 sm:px-6">
            <dt className="font-serif text-2xl text-white sm:text-3xl">₦2B+</dt>
            <dd className="mt-1 text-[10px] uppercase tracking-[0.15em] text-neutral-400">
              Developments
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
