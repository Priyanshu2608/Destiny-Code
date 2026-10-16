"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, ArrowRight } from "@/components/ui/Icons";
import { LinkButton } from "@/components/ui/Button";

type BlueprintResult = {
  lifePath: number;
  archetype: string;
  element: string;
  zodiac: {
    name: string;
    symbol: string;
    element: string;
  };
  keywords: string[];
  insight: string;
  recommendedService: {
    slug: string;
    name: string;
  };
};

function calculateLifePath(year: number, month: number, day: number): number {
  const sumDigits = (num: number): number => {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    return sum;
  };

  const reduceNumber = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = sumDigits(num);
    }
    return num;
  };

  const m = reduceNumber(month);
  const d = reduceNumber(day);
  const y = reduceNumber(year);

  return reduceNumber(m + d + y);
}

function getZodiacSign(month: number, day: number) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { name: "Aries", symbol: "♈", element: "Fire" };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { name: "Taurus", symbol: "♉", element: "Earth" };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { name: "Gemini", symbol: "♊", element: "Air" };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { name: "Cancer", symbol: "♋", element: "Water" };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { name: "Leo", symbol: "♌", element: "Fire" };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { name: "Virgo", symbol: "♍", element: "Earth" };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { name: "Libra", symbol: "♎", element: "Air" };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { name: "Scorpio", symbol: "♏", element: "Water" };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { name: "Sagittarius", symbol: "♐", element: "Fire" };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { name: "Capricorn", symbol: "♑", element: "Earth" };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { name: "Aquarius", symbol: "♒", element: "Air" };
  return { name: "Pisces", symbol: "♓", element: "Water" };
}

const archetypes: Record<number, { archetype: string; keywords: string[]; insight: string }> = {
  1: { archetype: "The Pioneer & Initiator", keywords: ["Leadership", "Independence", "Originality"], insight: "You carry a fierce inner spark to carve untrodden paths and lead with unyielding self-reliance." },
  2: { archetype: "The Intuitive Harmonizer", keywords: ["Diplomacy", "Empathy", "Partnership"], insight: "Your gift lies in sensitivity and deep connection, reading between the lines to unite and heal." },
  3: { archetype: "The Creative Catalyst", keywords: ["Self-Expression", "Optimism", "Magnetism"], insight: "You radiate joyful expression, bringing inspiration and uplifting energy wherever you communicate." },
  4: { archetype: "The Master Architect", keywords: ["Stability", "Discipline", "Endurance"], insight: "Grounded and trustworthy, your mission is building enduring structures and lasting security." },
  5: { archetype: "The Visionary Explorer", keywords: ["Freedom", "Adaptability", "Curiosity"], insight: "A seeker of dynamic evolution, you thrive at the crossroads of change, travel, and adventure." },
  6: { archetype: "The Nurturing Guardian", keywords: ["Compassion", "Community", "Responsibility"], insight: "Guided by love and balance, you are the pillar who creates harmony, refuge, and beauty for others." },
  7: { archetype: "The Mystic & Truth Seeker", keywords: ["Wisdom", "Intuition", "Contemplation"], insight: "A contemplative philosopher with an analytical yet mystical mind, seeking the deep truths beneath life." },
  8: { archetype: "The Empowered Manifestor", keywords: ["Authority", "Abundance", "Execution"], insight: "You possess executive vision and strength, bridging material accomplishment with higher purpose." },
  9: { archetype: "The Universal Humanitarian", keywords: ["Altruism", "Wisdom", "Transcendence"], insight: "An old soul with broad vision, your journey centers on compassion and guiding collective awareness." },
  11: { archetype: "The Master Intuitive", keywords: ["Illumination", "Visionary", "Inspiration"], insight: "A rare master vibration that acts as an intuitive antenna, channeling profound spiritual clarity." },
  22: { archetype: "The Master Builder", keywords: ["Practical Vision", "Legacy", "Global Impact"], insight: "Capable of turning vast metaphysical ideals into tangible, world-changing structures." },
  33: { archetype: "The Master Teacher", keywords: ["Universal Love", "Devotion", "Healing"], insight: "The embodiment of compassionate wisdom, dedicated to uplifting humanity's consciousness." },
};

export function CosmicBlueprintCalculator() {
  const [dateStr, setDateStr] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BlueprintResult | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateStr) return;

    setLoading(true);

    setTimeout(() => {
      const [yearStr, monthStr, dayStr] = dateStr.split("-");
      const year = parseInt(yearStr, 10);
      const month = parseInt(monthStr, 10);
      const day = parseInt(dayStr, 10);

      const lifePath = calculateLifePath(year, month, day);
      const zodiac = getZodiacSign(month, day);
      const profile = archetypes[lifePath] || archetypes[1];

      setResult({
        lifePath,
        archetype: profile.archetype,
        element: zodiac.element,
        zodiac,
        keywords: profile.keywords,
        insight: profile.insight,
        recommendedService: {
          slug: lifePath % 2 === 0 ? "birth-chart-reading" : "personal-numerology",
          name: lifePath % 2 === 0 ? "Birth Chart Reading" : "Personal Numerology Reading",
        },
      });
      setLoading(false);
    }, 600);
  };

  return (
    <section className="relative py-14 sm:py-20" aria-label="Interactive Cosmic Blueprint Calculator">
      <div className="mx-auto max-w-4xl px-5">
        <div className="glass relative overflow-hidden rounded-[2.5rem] border border-gold/30 p-7 sm:p-12 shadow-[0_20px_60px_-20px_rgb(217_182_108/0.2)]">
          {/* Subtle background glow */}
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-gold/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -left-24 -bottom-24 size-80 rounded-full bg-aura/15 blur-3xl" />

          <div className="relative text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-night-deep/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
              <Sparkle size={13} className="text-gold" />
              Interactive Cosmic Tool
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl text-cream">
              Discover Your Core Blueprint
            </h2>
            <p className="mx-auto mt-2.5 max-w-lg text-sm sm:text-base text-muted">
              Enter your birth date to instantly calculate your Life Path Number & Sun Sign.
            </p>

            <form onSubmit={handleCalculate} className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <input
                type="date"
                required
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                className="w-full sm:w-auto rounded-full border border-gold/30 bg-night-deep/80 px-5 py-3 text-sm text-cream shadow-inner focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                aria-label="Birth Date"
              />
              <button
                type="submit"
                disabled={loading || !dateStr}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-gold-soft via-gold to-gold-deep px-6 py-3 text-sm font-semibold text-night-deep shadow-md transition-all duration-300 hover:shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-night-deep border-t-transparent" />
                    Calculating...
                  </span>
                ) : (
                  <>
                    <span>Reveal My Blueprint</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Interactive Result Card */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result.lifePath + result.zodiac.name}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative mt-8 rounded-2xl border border-gold/40 bg-surface/70 p-6 sm:p-8 backdrop-blur"
              >
                <div className="grid gap-6 sm:grid-cols-2 items-center">
                  {/* Left Column: Numbers & Signs */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="grid size-16 shrink-0 place-items-center rounded-2xl border border-gold/40 bg-night-deep text-gold-soft shadow-inner">
                        <span className="font-display text-3xl font-bold">{result.lifePath}</span>
                      </div>
                      <div>
                        <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold">Life Path Number</span>
                        <h3 className="font-display text-xl text-cream">{result.archetype}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="grid size-16 shrink-0 place-items-center rounded-2xl border border-line bg-night-deep text-cream text-2xl shadow-inner">
                        <span>{result.zodiac.symbol}</span>
                      </div>
                      <div>
                        <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-faint">Zodiac Sun Sign</span>
                        <h4 className="font-display text-xl text-cream">
                          {result.zodiac.name} <span className="text-sm font-sans text-muted">({result.zodiac.element} Sign)</span>
                        </h4>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {result.keywords.map((kw) => (
                        <span key={kw} className="rounded-full border border-gold/30 bg-gold/10 px-3 py-0.5 text-xs text-gold-soft">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Custom Insight & CTA */}
                  <div className="flex flex-col justify-between border-t border-line/50 pt-5 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0">
                    <div>
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold-soft">Cosmic Reflection</span>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{result.insight}</p>
                    </div>

                    <div className="mt-6 rounded-xl border border-gold/20 bg-night-deep/60 p-4">
                      <p className="text-xs text-faint">Recommended Deep Dive:</p>
                      <p className="font-display text-base text-cream">{result.recommendedService.name}</p>
                      <div className="mt-3">
                        <LinkButton href={`/services#${result.recommendedService.slug}`} variant="ghost" arrow className="text-xs py-2 px-4">
                          Explore Full Reading
                        </LinkButton>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
