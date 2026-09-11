"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const links = [
  { label: "Properties", href: "#properties" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Careers", href: "/careers" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      } border-b border-neutral-200`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center">
            <span className="absolute inset-0 rotate-45 rounded-[6px] border-2 border-amber-400 transition-transform duration-300 group-hover:rotate-55" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          </span>
          <span className="font-serif text-2xl tracking-tight text-neutral-900">
            Constrally
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex md:items-center md:gap-10">
          {links.map((link, i) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`text-xs font-medium uppercase tracking-widest text-neutral-500 transition-colors hover:text-neutral-900 ${
                  i === 0
                    ? "border-b border-neutral-900 pb-1 text-neutral-900"
                    : ""
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex items-center justify-center rounded-md p-2 text-neutral-900 hover:bg-neutral-100 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile panel */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 border-t border-neutral-200 px-6 py-4">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm font-medium uppercase tracking-widest text-neutral-700 hover:bg-neutral-100"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <Button
              onClick={() => setOpen(false)}
              className="flex items-center justify-center rounded-sm bg-neutral-900 w-full py-6 text-xs font-semibold uppercase tracking-widest text-white"
            >
              Get a quote
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
