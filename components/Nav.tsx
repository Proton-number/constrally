"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Properties", href: "/#properties" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/#about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

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
              <Link
                onClick={() => {
                  setActiveIndex(i);
                }}
                href={link.href}
                className={`text-xs font-medium uppercase tracking-widest transition-colors ${
                  activeIndex === i
                    ? "border-b border-neutral-900 pb-1 text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {link.label}
              </Link>
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
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-sm font-medium uppercase tracking-widest text-neutral-700 hover:bg-neutral-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
