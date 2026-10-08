"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { disciplines, ui, type Discipline } from "@/content/site";

const order: Discipline[] = ["numerology", "astrology", "combo"];

/** Sticky discipline switcher that follows the scroll position. */
export function ServiceTabs() {
  const [active, setActive] = useState<Discipline>("numerology");

  useEffect(() => {
    const sections = order.map((d) => document.getElementById(d)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id as Discipline);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label={ui.serviceCategories} className="sticky top-[5.25rem] z-30 flex justify-center px-3 sm:top-24">
      <ul className="glass flex gap-1 rounded-full bg-night-deep/80 p-1.5">
        {order.map((d) => (
          <li key={d}>
            <a
              href={`#${d}`}
              onClick={() => setActive(d)}
              aria-current={active === d ? "true" : undefined}
              className={`relative block rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-6 ${
                active === d ? "text-night-deep" : "text-muted hover:text-cream"
              }`}
            >
              {active === d && (
                <motion.span
                  layoutId="service-tab"
                  className="absolute inset-0 rounded-full bg-linear-to-b from-gold-soft to-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{disciplines[d].label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
