"use client";

import { ctas, home, site } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Instagram, ZodiacIcon, Sparkle } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

const tiles = [
  { kind: "number", value: "7", label: "Intuition & Truth" },
  { kind: "zodiac", value: 4, label: "Leo · Solar Heart" },
  { kind: "number", value: "3", label: "Creative Spark" },
  { kind: "zodiac", value: 11, label: "Pisces · Mystic Depth" },
  { kind: "number", value: "9", label: "Universal Wisdom" },
  { kind: "zodiac", value: 0, label: "Aries · Pioneer Flame" },
] as const;

export function InstagramSection() {
  return (
    <section className="relative py-16 sm:py-24" aria-labelledby="instagram-title">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            <span aria-hidden className="h-px w-8 bg-gold/60" />
            {home.instagram.eyebrow}
          </p>
          <h2 id="instagram-title" className="mt-4 text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">
            {home.instagram.title}
          </h2>
          <p className="mt-4 max-w-md text-base sm:text-lg leading-relaxed text-muted">
            Weekly personal-year themes, planetary transits, and reflections for conscious living.
          </p>
          <p className="mt-5 font-display text-xl sm:text-2xl italic text-gold-soft">
            {site.instagramHandle}
          </p>
          <div className="mt-7">
            <LinkButton href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
              <span className="flex items-center gap-2.5">
                <Instagram size={18} /> {ctas.instagram}
              </span>
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
