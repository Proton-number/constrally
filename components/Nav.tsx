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

const NAV_HEIGHT = 72;

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [overHero, setOverHero] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 20);

      if (pathname === "/") {
        const hero = document.getElementById("home");
        const heroBottom = hero
          ? hero.getBoundingClientRect().bottom
          : window.innerHeight;
        setOverHero(heroBottom > NAV_HEIGHT);
      } else {
        setOverHero(false);
      }
    };
    const updateHash = () => setActiveHash(window.location.hash);

    updateHash();
    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", updateHash);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", updateHash);
    };
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (href.startsWith("/#")) {
      const targetHash = href.replace("/", "");
      return pathname === "/" && activeHash === targetHash;
    }
    return pathname === href;
  };

  const handleLinkClick = (href: string) => {
    setActiveHash(href.startsWith("/#") ? href.replace("/", "") : "");
    setOpen(false);
  };

  const glass = scrolled || open;
  const light = overHero;

  const navBg = !glass
    ? "border-transparent bg-transparent"
    : light
      ? "border-white/10 bg-black/45 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150"
      : "border-black/10 bg-white/70 shadow-sm backdrop-blur-xl backdrop-saturate-150";

  const textStrong = light
    ? "text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)]"
    : "text-neutral-900";
  const textMuted = light
    ? "text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] hover:text-white"
    : "text-neutral-600 hover:text-neutral-900";
  const activeLine = light ? "border-white" : "border-neutral-900";

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500 ${navBg}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/#home"
          onClick={() => {
            setActiveHash("");
            setOpen(false);
          }}
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
          <span
            className={`font-serif text-2xl font-medium tracking-tight transition-colors duration-500 ${textStrong}`}
          >
            Constrally
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`font-serif text-xs uppercase tracking-wider transition-colors duration-500 ${
                    active
                      ? `border-b pb-1 font-semibold ${activeLine} ${textStrong}`
                      : textMuted
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`inline-flex items-center justify-center p-2 transition-colors duration-500 md:hidden ${textStrong}`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:hidden ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <ul
          className={`flex flex-col gap-1 border-t px-6 py-4 ${
            light ? "border-white/10" : "border-black/10"
          }`}
        >
          {links.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`block px-3 py-2.5 font-serif text-xs uppercase tracking-wider transition-colors ${
                    light
                      ? active
                        ? "bg-white/15 font-semibold text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                      : active
                        ? "bg-black/5 font-semibold text-neutral-900"
                        : "text-neutral-600 hover:bg-black/5 hover:text-neutral-900"
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
