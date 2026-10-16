import Link from "next/link";
import type { Service } from "@/content/site";
import { ArrowRight } from "@/components/ui/Icons";
import { Astrolabe } from "@/components/ui/Astrolabe";

type Props = {
  service: Service;
  numeral?: string;
  badgeLabel?: string;
  tags?: string[];
  isFeatured?: boolean;
};

/** Elegant card used for major services on the home-page overview — no prices shown. */
export function ServiceCard({
  service,
  numeral,
  badgeLabel,
  tags,
  isFeatured = false,
}: Props) {
  const cleanDuration = service.duration.replace(/\[|\]/g, "");

  return (
    <Link
      href={`/services#${service.slug}`}
      className={`glass group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 transition-all duration-300 hover:border-gold/50 hover:bg-gold/[0.04] sm:p-8 ${
        isFeatured
          ? "border-gold/40 bg-linear-to-br from-raised via-surface to-night-deep shadow-[0_20px_50px_-20px_rgb(217_182_108/0.25)]"
          : "border-line/70"
      }`}
    >
      {isFeatured && (
        <Astrolabe
          uid={`card-${service.slug}`}
          className="pointer-events-none absolute -bottom-16 -right-16 w-60 opacity-15 transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-12"
        />
      )}

      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {numeral && <span className="font-display italic text-sm">{numeral}.</span>}
            {badgeLabel && <span>{badgeLabel}</span>}
          </span>
          {isFeatured ? (
            <span className="rounded-full bg-gold-soft px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-night-deep">
              Most Complete
            </span>
          ) : (
            <span className="text-xs text-faint">{cleanDuration}</span>
          )}
        </div>

        <div className="mt-5">
          <h3 className="font-display text-2xl text-cream transition-colors duration-300 group-hover:text-gold-soft sm:text-[1.65rem]">
            {service.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">
            {service.tagline}
          </p>
        </div>

        {tags && tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line/60 bg-surface/50 px-2.5 py-0.5 text-[0.7rem] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line/40 pt-4">
        <span className="text-xs font-medium text-gold-soft transition-colors duration-300 group-hover:text-gold">
          Consultation Structure & Details
        </span>
        <ArrowRight
          size={16}
          className="text-gold transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
