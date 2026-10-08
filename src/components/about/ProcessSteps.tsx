import { about } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Book → share details → session → follow-up, joined like a constellation. */
export function ProcessSteps() {
  const { eyebrow, title, steps } = about.process;
  return (
    <section className="py-24 sm:py-32" aria-labelledby="process-title">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow={eyebrow} title={title} id="process-title" />
        <div className="relative mt-16">
          {/* connecting line: vertical on mobile, horizontal on desktop */}
          <span aria-hidden className="absolute bottom-8 left-8 top-8 w-px bg-linear-to-b from-gold/60 via-gold/30 to-transparent md:hidden" />
          <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-linear-to-r from-gold/20 via-gold/70 to-gold/20 md:block" />
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.12} className="relative flex gap-6 md:flex-col md:items-center md:text-center">
                <span className="relative grid size-16 shrink-0 place-items-center rounded-full border border-gold/50 bg-night font-display text-2xl italic text-gold-soft shadow-[0_0_30px_-6px_rgb(217_182_108/0.5)]">
                  {i + 1}
                  <span aria-hidden className="absolute -right-1 -top-1 size-2 rounded-full bg-gold-soft shadow-[0_0_10px_var(--palette-gold)]" />
                </span>
                <div className="pt-2 md:pt-6">
                  <h3 className="text-2xl text-cream">{step.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.text}</p>
                </div>
            </Reveal>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
