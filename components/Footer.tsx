import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getYear } from "date-fns";

const explore = [
  { label: "Properties", href: "/#properties" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/#about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/#contact" },
];

const socials = [
  { label: "WhatsApp", href: "https://wa.me/message/VC4XY56ZPVCVO1" },
  { label: "YouTube", href: "http://www.youtube.com/@Constrally" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/constrally?stkn=OWp6dTQ3MXRpNmF4",
  },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden text-white">
  
      <Image
        src="/hero.png"
        alt=""
        fill
        className="-z-20 object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-[#091e3c]/90" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#091e3c] via-transparent to-[#050f20]" />
      <div className="pointer-events-none absolute -right-40 top-20 -z-10 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 pt-20 sm:pt-28">

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <div>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Your next address <br className="hidden sm:block" />
              starts with a{" "}
              <span className="italic text-amber-300">conversation.</span>
            </h2>
          </div>

          <div className="lg:justify-self-end">
            <a
              href="https://wa.me/message/VC4XY56ZPVCVO1"
              target="_blank"
              rel="noreferrer"
              className="group flex h-28 w-full items-center justify-between rounded-sm bg-amber-300 px-8 font-serif text-sm font-semibold uppercase tracking-wider text-neutral-950 transition-colors duration-300 hover:bg-white lg:w-80"
            >
              Enquire now
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950 text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={20} />
              </span>
            </a>
          </div>
        </div>

     
        <div className="mt-20 grid gap-14 border-t border-white/15 pt-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Link href="/#home" className="inline-flex items-center gap-3">
              <Image
                src="/logo.jpeg"
                alt="Constrally"
                width={40}
                height={40}
                className="h-9 w-9 rounded-sm object-contain"
              />
              <span className="font-serif text-2xl font-medium tracking-tight">
                Constrally
              </span>
            </Link>
            <p className="mt-5 max-w-xs font-serif text-lg leading-relaxed text-neutral-300">
              We Build. We Develop. We Deliver.
            </p>
            <p className="mt-6 font-serif text-xs uppercase tracking-wider text-neutral-400">
              Lagos, Nigeria
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <nav aria-label="Footer">
              <h4 className="font-serif text-[10px] uppercase tracking-widest text-neutral-400">
                Explore
              </h4>
              <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {explore.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group flex items-center justify-between py-3 font-serif text-lg text-neutral-200 transition-all duration-300 hover:pl-2 hover:text-amber-300"
                    >
                      {l.label}
                      <ArrowUpRight
                        size={16}
                        className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h4 className="font-serif text-[10px] uppercase tracking-widest text-neutral-400">
                Connect
              </h4>
              <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between py-3 font-serif text-lg text-neutral-200 transition-all duration-300 hover:pl-2 hover:text-amber-300"
                    >
                      {s.label}
                      <ArrowUpRight
                        size={16}
                        className="opacity-60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/15 py-6 sm:flex-row sm:items-center">
          <p className="font-serif text-xs uppercase tracking-wider text-neutral-400">
            &copy; {getYear(new Date())} Constrally. All rights reserved.
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none mb-[3vw] select-none text-center font-serif text-[20vw] font-medium leading-[0.85] tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.18)]"
      >
        Constrally
      </div>
    </footer>
  );
}
