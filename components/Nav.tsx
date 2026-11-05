"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Properties", href: "/#properties" },
  { label: "About Us", href: "/#about" },
  { label: "Our People", href: "/people" },
  { label: "Engineering", href: "/engineering" },
  { label: "Partners", href: "https://partners.constrally.com/" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact Us", href: "/#contact" },
];

const NAV_HEIGHT = 72;

export default function Nav() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

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

    update();
    updateHash();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", updateHash);
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

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
  const light = overHero && !open;

  const navBg = !glass
    ? "border-transparent bg-transparent"
    : light
      ? "border-white/10 bg-black/45 backdrop-blur-xl"
      : "border-black/10 bg-white/70 shadow-sm backdrop-blur-xl";

  const textStrong = light ? "text-white" : "text-neutral-900";

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-500 ${navBg}`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/#home"
            onClick={() => setOpen(false)}
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
              className={`font-serif text-2xl font-medium tracking-tight ${textStrong}`}
            >
              Constrally
            </span>
          </Link>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`flex items-center gap-3 ${textStrong}`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-current/20 transition-colors hover:bg-current/10">
              {open ? <X size={20} /> : <Menu size={20} />}
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-60 bg-black/40 backdrop-blur-[2px]"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 240,
              }}
              className="fixed right-0 top-0 z-70 flex h-dvh w-full max-w-120 flex-col bg-[#faf9f6] shadow-[-20px_0_60px_rgba(0,0,0,0.2)]"
            >
              <div className="flex items-end justify-end px-8 py-6">
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-neutral-900 transition-colors hover:bg-black/5"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-1 flex-col justify-center px-8 sm:px-12">
                <ul className="flex flex-col">
                  {links.map((link, index) => {
                    const active = isLinkActive(link.href);

                    return (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.06,
                          duration: 0.3,
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => handleLinkClick(link.href)}
                          className={`group flex items-center justify-between border-b border-black/10 py-4 font-serif text-2xl transition-colors sm:text-3xl ${
                            active
                              ? "text-neutral-950"
                              : "text-neutral-500 hover:text-neutral-950"
                          }`}
                        >
                          <span>{link.label}</span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
