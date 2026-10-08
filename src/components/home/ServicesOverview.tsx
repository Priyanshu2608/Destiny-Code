import { ctas, disciplines, home, servicesBy, ui } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DisciplineMark } from "@/components/ui/DisciplineMark";
import { LinkButton } from "@/components/ui/Button";
import { Astrolabe } from "@/components/ui/Astrolabe";
import { ServiceCard } from "@/components/services/ServiceCard";

export function ServicesOverview() {
  const [combo] = servicesBy("combo");
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="services-title">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow={home.services.eyebrow} title={home.services.title} intro={home.services.intro} id="services-title" />

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {(["numerology", "astrology"] as const).map((d, i) => (
            <Reveal key={d} delay={i * 0.1} className="glass relative overflow-hidden rounded-[2rem] p-3 sm:p-5">
              <header className="relative px-4 pb-6 pt-5 sm:px-5">
                <DisciplineMark discipline={d} className="absolute -right-6 -top-6 w-40 text-gold/20" />
                <p className="font-display text-sm italic text-gold">{disciplines[d].numeral}.</p>
                <h3 className="mt-1 text-4xl text-cream">{disciplines[d].title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{disciplines[d].intro}</p>
              </header>
              <div className="rule-gold mx-4" />
              <ul className="mt-2 divide-y divide-line/50">
                {servicesBy(d).map((s, idx) => (
                  <li key={s.slug}>
                    <ServiceCard service={s} index={idx} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {combo && (
          <Reveal className="relative mt-5 overflow-hidden rounded-[2rem] border border-gold/40 bg-linear-to-br from-raised via-surface to-night-deep p-8 shadow-[0_30px_80px_-30px_rgb(217_182_108/0.35)] sm:p-12">
            <Astrolabe uid="combo-wheel" className="pointer-events-none absolute -bottom-1/2 -right-40 w-[560px] opacity-25 sm:-right-24 sm:w-[640px] sm:opacity-45" />
            <div className="relative max-w-xl">
              <span className="inline-flex rounded-full bg-gold-soft px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-night-deep">
                {ui.mostComplete}
              </span>
              <p className="mt-6 font-display text-sm italic text-gold">{disciplines.combo.numeral}.</p>
              <h3 className="mt-1 text-4xl text-cream sm:text-5xl">{combo.name}</h3>
              <p className="mt-4 text-lg leading-relaxed text-muted">{combo.tagline}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                <p>
                  <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-faint">{home.services.fromLabel}</span>
                  <span className="font-display text-3xl text-gold-soft">{combo.price}</span>
                </p>
                <LinkButton href={`/services#${combo.slug}`} variant="ghost" arrow>
                  {ui.viewDetails}
                </LinkButton>
                <LinkButton href={`/booking?service=${combo.slug}`}>{ctas.short}</LinkButton>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
