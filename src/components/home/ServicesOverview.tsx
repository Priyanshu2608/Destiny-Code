import { home, services } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { ServiceCard } from "@/components/services/ServiceCard";

// The 4 major foundational & signature services to feature on the homepage
const majorServiceSlugs = [
  "personal-numerology",
  "birth-chart-reading",
  "numerology-compatibility",
  "numerology-astrology-combo",
] as const;

const majorMeta: Record<
  string,
  { numeral: string; badge: string; tags: string[]; isFeatured?: boolean }
> = {
  "personal-numerology": {
    numeral: "I",
    badge: "Numerology Advisory",
    tags: ["Life Path Analysis", "Core Strengths", "Personal Year Cycle"],
  },
  "birth-chart-reading": {
    numeral: "II",
    badge: "Natal Astrology",
    tags: ["Natal Sky Analysis", "Planetary Periods", "Strategic Timing"],
  },
  "numerology-compatibility": {
    numeral: "✦",
    badge: "Partnership Advisory",
    tags: ["Interpersonal Dynamics", "Communication", "Shared Cycles"],
  },
  "numerology-astrology-combo": {
    numeral: "III",
    badge: "Dual-System Executive Session",
    tags: ["Comprehensive Synthesis", "Written Dossier", "1-on-1 Consultation"],
    isFeatured: true,
  },
};

export function ServicesOverview() {
  const majorServices = majorServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean);

  return (
    <section className="relative py-16 sm:py-24" aria-labelledby="services-title">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow={home.services.eyebrow}
          title={home.services.title}
          intro={home.services.intro}
          id="services-title"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {majorServices.map((s, idx) => {
            if (!s) return null;
            const meta = majorMeta[s.slug];
            return (
              <Reveal key={s.slug} delay={idx * 0.08} className="h-full">
                <ServiceCard
                  service={s}
                  numeral={meta?.numeral}
                  badgeLabel={meta?.badge}
                  tags={meta?.tags}
                  isFeatured={meta?.isFeatured}
                />
              </Reveal>
            );
          })}
        </div>

        {/* Minimal exploration strip to view full catalog & pricing without cluttering the homepage */}
        <Reveal delay={0.3} className="mt-8">
          <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-line/60 bg-surface/40 p-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-display text-lg text-cream">
                Looking for Career Astrology, Name Vibrations, or Specific Inquiries?
              </p>
              <p className="mt-0.5 text-xs text-muted">
                Explore all 11 detailed consultation structures, durations, and pricing in our full catalog.
              </p>
            </div>
            <LinkButton href="/services" variant="ghost" arrow className="shrink-0 text-sm">
              View All Consultations & Schedules
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
