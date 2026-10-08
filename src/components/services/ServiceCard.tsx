import Link from "next/link";
import { home, type Service } from "@/content/site";
import { ArrowRight } from "@/components/ui/Icons";

/** Compact row used in the home-page overview: name, one line, starting price, link. */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative flex items-start gap-4 rounded-2xl px-4 py-5 transition-colors duration-300 hover:bg-gold/[0.06] sm:gap-5 sm:px-5"
    >
      <span className="mt-1 font-display text-sm italic text-gold">{String(index + 1).padStart(2, "0")}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[1.4rem] leading-tight text-cream transition-colors group-hover:text-gold-soft">
          {service.name}
        </span>
        <span className="mt-1.5 block text-sm leading-relaxed text-muted">{service.tagline}</span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-2 pt-1">
        <span className="text-right">
          <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-faint">{home.services.fromLabel}</span>
          <span className="block font-semibold text-gold-soft">{service.price}</span>
        </span>
        <ArrowRight size={18} className="text-gold transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
