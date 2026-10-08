import { ctas, servicesPage, type Service } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Check, Clock, Tag, Video } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

/** Full service block on /services, anchored by its slug. */
export function ServiceDetail({ service, index }: { service: Service; index: number }) {
  const { labels } = servicesPage;
  const featured = service.discipline === "combo";
  const specs = [
    { icon: Tag, label: labels.price, value: service.price },
    { icon: Clock, label: labels.duration, value: service.duration },
    { icon: Video, label: labels.format, value: service.format.join(" · ") },
  ];

  return (
    <Reveal>
      <article
        id={service.slug}
        aria-labelledby={`${service.slug}-title`}
        className={`group relative scroll-mt-44 overflow-hidden rounded-[2rem] p-7 transition-[border-color,box-shadow] duration-700 target:border-gold target:shadow-[0_0_0_1px_var(--palette-gold),0_30px_80px_-30px_rgb(217_182_108/0.5)] sm:p-10 ${
          featured ? "border border-gold/40 bg-linear-to-br from-raised via-surface to-night-deep" : "glass"
        }`}
      >
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div>
            <p className="font-display text-lg italic text-gold">{String(index + 1).padStart(2, "0")}</p>
            <h3 id={`${service.slug}-title`} className="mt-2 text-3xl leading-tight text-cream sm:text-4xl">
              {service.name}
            </h3>
            <p className="mt-5 text-lg leading-relaxed text-muted">{service.description}</p>
            <div className="mt-8 rounded-2xl border-l-2 border-gold/60 bg-gold/[0.05] py-4 pl-5 pr-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{labels.whoFor}</p>
              <p className="mt-2 leading-relaxed text-cream">{service.whoFor}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/80 bg-line/80 sm:grid-cols-3">
              {specs.map(({ icon: Icon, label, value }, i) => (
                <div key={label} className={`bg-night-deep/80 p-4 ${i === 2 ? "col-span-2 sm:col-span-1" : ""}`}>
                  <dt className="flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-faint">
                    <Icon size={13} className="text-gold" /> {label}
                  </dt>
                  <dd className={`mt-1.5 ${i === 0 ? "font-display text-2xl text-gold-soft" : "text-sm text-cream"}`}>{value}</dd>
                </div>
              ))}
            </dl>

            <h4 className="mt-8 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold">{labels.included}</h4>
            <ul className="mt-4 space-y-3">
              {service.included.map((item) => (
                <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                  <Check size={18} className="mt-0.5 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>

            <LinkButton href={`/booking?service=${service.slug}`} arrow className="mt-9 w-full sm:w-auto sm:self-start">
              {ctas.short}
            </LinkButton>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
