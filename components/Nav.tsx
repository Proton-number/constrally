"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { label: "Properties", href: "/#properties" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/#about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const updateHash = () => {
      setActiveHash(window.location.hash);
    };

    updateHash();

    window.addEventListener("scroll", handleScroll);
    // Listening for any hash changes
    window.addEventListener("hashchange", updateHash);

    // To clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  const isLinkActive = (href: string) => {
    if (href.startsWith("/#")) {
      const targetHash = href.replace("/", "");
      return pathname === "/" && activeHash === targetHash;
    }
    return pathname === href;
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      } border-b border-neutral-200`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          onClick={() => setActiveHash("")}
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.jpeg"
            alt="Constrally"
            width={40}
            height={40}
            priority
            className="h-8 w-8 object-contain"
          />
          <span className="font-serif text-2xl font-medium tracking-tight text-neutral-900">
            Constrally
          </span>
        </Link>

        <ul className="hidden md:flex md:items-center md:gap-8">
          {links.map((link) => {
            const active = isLinkActive(link.href);

            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() =>
                    setActiveHash(
                      link.href.startsWith("/#")
                        ? link.href.replace("/", "")
                        : "",
                    )
                  }
                  className={`font-serif text-xs uppercase tracking-wider transition-colors ${
                    active
                      ? "border-b border-neutral-900 pb-1 font-semibold text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex items-center justify-center p-2 text-neutral-900 hover:bg-neutral-100 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 border-t border-neutral-200 px-6 py-4">
          {links.map((link) => {
            const active = isLinkActive(link.href);

            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() =>
                    setActiveHash(
                      link.href.startsWith("/#")
                        ? link.href.replace("/", "")
                        : "",
                    )
                  }
                  className={`block px-3 py-2.5 font-serif text-xs uppercase tracking-wider ${
                    active
                      ? "bg-neutral-50 font-semibold text-neutral-900"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
