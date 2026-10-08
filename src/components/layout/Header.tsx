"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ctas, nav, site, ui } from "@/content/site";
import { Emblem } from "@/components/ui/Emblem";
import { LinkButton } from "@/components/ui/Button";
import { Close, Menu } from "@/components/ui/Icons";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile menu whenever the route changes
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-night-deep"
      >
        {ui.skipToContent}
      </a>

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`glass mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full py-2 pl-3 pr-2 transition-all duration-500 sm:pl-5 ${
            scrolled ? "bg-night-deep/70 shadow-[0_18px_50px_-20px_rgb(0_0_0/0.9)]" : ""
          }`}
        >
          <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${site.businessName}, ${ui.homeLabel}`}>
            <Emblem size={34} className="shrink-0" />
            <span className="truncate font-display text-lg font-semibold tracking-wide text-cream sm:text-xl">
              {site.businessName}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        active ? "text-night-deep" : "text-muted hover:text-cream"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-gold-soft"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <LinkButton href="/booking" className="px-4! py-2.5! text-sm! sm:px-5!">
              {ctas.short}
            </LinkButton>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={ui.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full border border-gold/30 text-gold-soft md:hidden"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside the glass header: backdrop-filter would trap a fixed overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[70] flex flex-col bg-night-deep/95 px-6 pb-10 pt-5 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 font-display text-lg font-semibold">
                <Emblem size={34} uid="emblem-menu" /> {site.businessName}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={ui.closeMenu}
                autoFocus
                className="grid size-11 place-items-center rounded-full border border-gold/30 text-gold-soft"
              >
                <Close />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-14 flex-1">
              <ul className="space-y-2">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className="flex items-baseline gap-4 border-b border-line/60 py-4 font-display text-4xl text-cream aria-[current=page]:text-gold-soft"
                    >
                      <span className="font-sans text-xs tracking-[0.2em] text-gold">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <LinkButton href="/booking" onClick={() => setOpen(false)} arrow className="w-full py-4!">
              {ctas.primary}
            </LinkButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
