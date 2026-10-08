import type { Metadata } from "next";
import { about, site, ui } from "@/content/site";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { PlaceholderTag } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { ProcessSteps } from "@/components/about/ProcessSteps";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description: `Meet ${site.consultantName}: the story, approach and training behind every numerology and astrology reading.`,
};

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="pb-16 pt-32 sm:pt-40">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div aria-hidden className="absolute -inset-6 rounded-t-full border border-dashed border-gold/25 sm:-inset-8" />
            <div aria-hidden className="absolute -inset-3 rounded-t-full border border-gold/15" />
            <PhotoPlaceholder label={`[${ui.photoPlaceholder.toUpperCase()}] 4:5`} alt={about.photoAlt} arch className="aspect-[4/5] w-full" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              <span aria-hidden className="h-px w-8 bg-gold/60" />
              {about.eyebrow}
            </p>
            <h1 className="mt-5 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">{about.title}</h1>
            <p className="mt-6 font-display text-2xl italic leading-snug text-gold-soft">{about.intro}</p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-20" aria-labelledby="story-title">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Reveal>
            <h2 id="story-title" className="text-4xl sm:text-5xl lg:sticky lg:top-32">
              {about.story.title}
            </h2>
          </Reveal>
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            {about.story.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-gold" : ""}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20" aria-labelledby="approach-title">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="glass relative overflow-hidden rounded-[2rem] p-8 sm:p-14">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
              <div>
                <h2 id="approach-title" className="text-4xl sm:text-5xl">
                  {about.approach.title}
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-muted">{about.approach.intro}</p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {about.approach.points.map((pt, i) => (
                  <li key={pt.title}>
                    <Spotlight className="h-full rounded-2xl border border-line/80 bg-night-deep/40 p-6 transition-colors hover:border-gold/40">
                      <p className="font-display text-sm italic text-gold">0{i + 1}</p>
                      <h3 className="mt-2 text-2xl text-cream">{pt.title}</h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{pt.text}</p>
                    </Spotlight>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-20" aria-labelledby="quals-title">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="quals-title" className="text-4xl sm:text-5xl">
              {about.qualifications.title}
            </h2>
            <PlaceholderTag />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {about.qualifications.groups.map((g, gi) => (
              <Reveal key={g.discipline} delay={gi * 0.1} className="rounded-[1.75rem] border border-line/80 p-7 sm:p-9">
                <h3 className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  {g.discipline}
                  <span aria-hidden className="h-px flex-1 bg-linear-to-r from-gold/50 to-transparent" />
                </h3>
                <ul className="mt-6 space-y-1">
                  {g.items.map((q, qi) => (
                    <li key={qi} className="flex gap-4 border-b border-line/50 py-4 last:border-0">
                      <span aria-hidden className="mt-2 size-2 shrink-0 rotate-45 border border-gold" />
                      <div>
                        <p className="font-display text-xl text-cream">{q.title}</p>
                        <p className="mt-1 text-sm text-faint">{q.meta}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps />
      <CtaBand title={about.cta.title} text={about.cta.text} />
    </>
  );
}
