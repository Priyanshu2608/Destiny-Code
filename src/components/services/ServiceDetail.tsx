"use client";

import { useState } from "react";
import { ctas, servicesPage, type Service } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Check, Clock, Tag, Video, ChevronDown } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

/** Full service block on /services, anchored by its slug with interactive inclusions. */
export function ServiceDetail({ service, index }: { service: Service; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { labels } = servicesPage;
  const featured = service.discipline === "combo";
  const specs = [
    { icon: Tag, label: labels.price, value: service.price },
    { icon: Clock, label: labels.duration, value: service.duration },
    { icon: Video, label: labels.format, value: service.format.join(" · ") },
  ];

  // Show first 2 inclusions by default, expand on interaction
  const visibleIncluded = expanded ? service.included : service.included.slice(0, 2);

  return (
    <Reveal>
      <article
        id={service.slug}
        aria-labelledby={`${service.slug}-title`}
        className={`group relative scroll-mt-44 overflow-hidden rounded-[2rem] p-7 transition-all duration-500 target:border-gold target:shadow-[0_0_0_1px_var(--palette-gold),0_30px_80px_-30px_rgb(217_182_108/0.5)] sm:p-9 hover:border-gold/40 ${
          featured ? "border border-gold/40 bg-linear-to-br from-raised via-surface to-night-deep shadow-[0_20px_50px_-20px_rgb(217_182_108/0.25)]" : "glass"
        }`}
      >
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div>
            <p className="font-display text-lg italic text-gold">{String(index + 1).padStart(2, "0")}</p>
            <h3 id={`${service.slug}-title`} className="mt-2 text-2xl sm:text-3xl lg:text-4xl leading-tight text-cream">
              {service.name}
            </h3>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted">{service.description}</p>
            <div className="mt-6 rounded-2xl border-l-2 border-gold/60 bg-gold/[0.05] py-3.5 pl-4 pr-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{labels.whoFor}</p>
              <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-cream">{service.whoFor}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/80 bg-line/80 sm:grid-cols-3">
                {specs.map(({ icon: Icon, label, value }, i) => (
                  <div key={label} className={`bg-night-deep/80 p-3.5 sm:p-4 ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}>
                    <dt className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-faint">
                      <Icon size={12} className="text-gold" /> {label}
                    </dt>
                    <dd className={`mt-1 ${i === 0 ? "font-display text-xl sm:text-2xl text-gold-soft" : "text-xs sm:text-sm text-cream"}`}>{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold">{labels.included}</h4>
                  {service.included.length > 2 && (
                    <button
                      type="button"
                      onClick={() => setExpanded(!expanded)}
                      className="inline-flex items-center gap-1 text-xs text-gold-soft hover:text-cream transition-colors cursor-pointer"
                    >
                      <span>{expanded ? "Show less" : `+${service.included.length - 2} more`}</span>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>

                <ul className="mt-3 space-y-2.5">
                  {visibleIncluded.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                      <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-7">
              <LinkButton href={`/booking?service=${service.slug}`} arrow className="w-full sm:w-auto text-sm py-2.5 px-6">
                {ctas.short}
              </LinkButton>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
