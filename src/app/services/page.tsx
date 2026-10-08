import type { Metadata } from "next";
import { about, disciplines, servicesBy, servicesPage, ui, type Discipline } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DisciplineMark } from "@/components/ui/DisciplineMark";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceTabs } from "@/components/services/ServiceTabs";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  title: "Services & Prices",
  description:
    "Numerology and astrology readings: personal, compatibility, career, name, yearly forecast and combined readings, with prices, durations and what's included.",
};

const order: Discipline[] = ["numerology", "astrology", "combo"];

export default function ServicesPage() {
  return (
    <>
      <section className="pb-14 pt-32 sm:pt-40">
        <div className="px-5">
          <SectionHeading as="h1" eyebrow={servicesPage.eyebrow} title={servicesPage.title} intro={servicesPage.intro} />
        </div>
      </section>

      <ServiceTabs />

      <div className="mx-auto max-w-6xl space-y-24 px-5 pb-10 pt-14 sm:space-y-32">
        {order.map((d) => {
          const list = servicesBy(d);
          return (
            <section key={d} id={d} aria-labelledby={`${d}-heading`} className="scroll-mt-40">
              <Reveal className="relative mb-10 flex flex-col gap-6 border-b border-line/70 pb-10 md:flex-row md:items-end md:justify-between">
                <div className="flex items-center gap-6">
                  <DisciplineMark discipline={d} className="w-20 shrink-0 text-gold sm:w-24" />
                  <div>
                    <p className="font-display text-sm italic text-gold">{disciplines[d].numeral}.</p>
                    <h2 id={`${d}-heading`} className="text-4xl sm:text-5xl">
                      {disciplines[d].title}
                    </h2>
                  </div>
                </div>
                <p className="max-w-md leading-relaxed text-muted">{disciplines[d].intro}</p>
              </Reveal>

              {list.length > 1 && (
                <nav aria-label={`${ui.jumpTo}: ${disciplines[d].title}`} className="-mx-5 mb-8 overflow-x-auto px-5 [scrollbar-width:none]">
                  <ul className="flex gap-2">
                    {list.map((s) => (
                      <li key={s.slug} className="shrink-0">
                        <a href={`#${s.slug}`} className="block rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-gold/60 hover:text-cream">
                          {s.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className="space-y-6">
                {list.map((s, i) => (
                  <ServiceDetail key={s.slug} service={s} index={i} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <CtaBand title={about.cta.title} text={about.cta.text} />
    </>
  );
}
