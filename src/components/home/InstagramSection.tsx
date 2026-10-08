import { ctas, home, site, ui } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Instagram, ZodiacIcon } from "@/components/ui/Icons";
import { PlaceholderTag } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";

const tiles = [
  { kind: "number", value: "7" },
  { kind: "zodiac", value: 4 },
  { kind: "number", value: "3" },
  { kind: "zodiac", value: 11 },
  { kind: "number", value: "9" },
  { kind: "zodiac", value: 0 },
] as const;

export function InstagramSection() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="instagram-title">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            <span aria-hidden className="h-px w-8 bg-gold/60" />
            {home.instagram.eyebrow}
          </p>
          <h2 id="instagram-title" className="mt-4 text-4xl leading-[1.05] sm:text-5xl">
            {home.instagram.title}
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{home.instagram.text}</p>
          <p className="mt-6 font-display text-2xl italic text-gold-soft">{site.instagramHandle}</p>
          <LinkButton href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-8">
            <span className="flex items-center gap-2.5">
              <Instagram size={18} /> {ctas.instagram}
            </span>
          </LinkButton>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5" aria-hidden>
            {tiles.map((t, i) => (
              <div
                key={i}
                className={`group relative aspect-square overflow-hidden rounded-2xl border border-line/80 sm:rounded-3xl ${
                  i % 2 ? "bg-linear-to-br from-raised to-night-deep" : "bg-linear-to-tr from-surface via-raised to-aura/40"
                }`}
              >
                <div className="absolute inset-0 grid place-items-center text-gold-soft/80 transition-transform duration-700 group-hover:scale-110">
                  {t.kind === "number" ? (
                    <span className="font-display text-6xl italic sm:text-7xl">{t.value}</span>
                  ) : (
                    <ZodiacIcon index={t.value} size={56} />
                  )}
                </div>
                <div className="absolute inset-2 rounded-xl border border-gold/15 sm:rounded-2xl" />
              </div>
            ))}
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
            <PlaceholderTag>{ui.instagramPost}</PlaceholderTag>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
