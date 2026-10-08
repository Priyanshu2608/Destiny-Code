import { home } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { HelpIcon } from "@/components/ui/Icons";

/** Bento layout: one feature tile, two small, one wide, two half. */
const layout = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "sm:col-span-2 lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

export function HelpAreas() {
  const { eyebrow, title, intro, items } = home.help;
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="help-title">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} id="help-title" />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const feature = i === 0;
            return (
              <Reveal key={item.title} delay={i * 0.06} className={layout[i]}>
                <Spotlight
                  className={`glass group relative h-full overflow-hidden rounded-[1.75rem] p-7 transition-colors duration-500 hover:border-gold/40 ${
                    feature ? "flex flex-col justify-end sm:p-10 lg:min-h-[26rem]" : ""
                  }`}
                >
                  {feature && (
                    <svg aria-hidden viewBox="0 0 200 200" className="pointer-events-none absolute -right-16 -top-16 w-80 text-gold/25 transition-transform duration-[2s] group-hover:rotate-45">
                      <g fill="none" stroke="currentColor" strokeWidth="0.5">
                        {[90, 70, 50, 30].map((r) => (
                          <circle key={r} cx="100" cy="100" r={r} strokeDasharray={r === 70 ? "1 3" : undefined} />
                        ))}
                        {Array.from({ length: 12 }, (_, k) => (
                          <line key={k} x1="100" y1="100" x2={100 + 90 * Math.cos((k * Math.PI) / 6)} y2={100 + 90 * Math.sin((k * Math.PI) / 6)} />
                        ))}
                      </g>
                    </svg>
                  )}
                  <div className="flex items-start justify-between">
                    <span className={`grid place-items-center rounded-full border border-gold/35 bg-night-deep/50 text-gold-soft ${feature ? "size-16" : "size-12"}`}>
                      <HelpIcon name={item.icon} size={feature ? 30 : 22} />
                    </span>
                    {!feature && <span className="font-display text-sm italic text-faint">0{i + 1}</span>}
                  </div>
                  <h3 className={`mt-6 text-cream ${feature ? "text-4xl sm:text-5xl" : "text-2xl"}`}>{item.title}</h3>
                  <p className={`mt-3 leading-relaxed text-muted ${feature ? "max-w-sm text-lg" : "text-[0.95rem]"}`}>{item.text}</p>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
