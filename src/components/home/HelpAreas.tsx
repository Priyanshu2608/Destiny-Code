import { home } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { HelpIcon } from "@/components/ui/Icons";

export function HelpAreas() {
  const { eyebrow, title, intro, items } = home.help;
  // Display the 4 primary life areas for a cleaner, less content-heavy overview
  const primaryItems = items.slice(0, 4);

  return (
    <section className="relative py-16 sm:py-24" aria-labelledby="help-title">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} id="help-title" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {primaryItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07} className="h-full">
              <Spotlight className="glass group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] p-6 transition-colors duration-500 hover:border-gold/40 sm:p-7">
                <div>
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-full border border-gold/35 bg-night-deep/50 text-gold-soft">
                      <HelpIcon name={item.icon} size={22} />
                    </span>
                    <span className="font-display text-sm italic text-faint">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
