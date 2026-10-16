import Link from "next/link";
import { disclaimer, footer, nav, site, whatsappLink } from "@/content/site";
import { Emblem } from "@/components/ui/Emblem";
import { Instagram, Mail, WhatsApp } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-linear-to-b from-transparent via-night-deep/80 to-night-deep">
      {/* Soft merging hairline at the top that blends smoothly into the page background */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-gold/25 to-transparent" />

      {/* Atmospheric ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[260px] w-[700px] rounded-full bg-gold/5 blur-[120px]"
      />

      {/* Main Footer Directory */}
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-16 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.1fr_1fr]">
        {/* Brand Column */}
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Emblem size={38} uid="emblem-footer" />
            <span className="font-display text-2xl font-semibold text-cream">
              {site.businessName}
            </span>
          </Link>
          <p className="mt-2 font-display text-base italic text-gold-soft">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Personal numerology and astrology consultations, conducted online with rigor, discretion, and confidentiality.
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer Navigation">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {footer.navTitle}
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted transition-colors hover:text-gold-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Direct Advisory & Contact */}
        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {footer.contactTitle}
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 hover:text-cream transition-colors"
              >
                <Mail size={15} className="text-gold group-hover:scale-110 transition-transform" />
                <span>{site.email}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 hover:text-cream transition-colors"
              >
                <WhatsApp size={15} className="text-gold group-hover:scale-110 transition-transform" />
                <span>{site.phoneDisplay}</span>
              </a>
            </li>
            <li className="pt-1 text-xs text-faint leading-relaxed">
              {site.location}
            </li>
          </ul>
        </div>

        {/* Updates & Dispatches */}
        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {footer.socialTitle}
          </h2>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Weekly analytical transit notes and personal-year reflections.
          </p>
          <div className="mt-4">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-line/80 bg-surface/50 px-4 py-2 text-xs text-cream transition-all duration-300 hover:border-gold/50 hover:bg-gold/10"
            >
              <Instagram size={15} className="text-gold group-hover:scale-110 transition-transform" />
              <span>{site.instagramHandle}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Discreet Legal & Disclaimer at the very last */}
      <div className="border-t border-line/40 bg-night-deep/40 pt-7 pb-10">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs leading-relaxed text-faint">
            {disclaimer.short}{" "}
            <Link
              href="/disclaimer"
              className="text-gold-soft/80 underline underline-offset-4 hover:text-cream transition-colors"
            >
              Full Legal Disclaimer
            </Link>
          </p>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-line/20 pt-4 text-xs text-faint">
            <p>© {site.copyrightYear} {site.businessName}. All rights reserved.</p>
            <p className="text-[0.7rem] uppercase tracking-wider text-faint">
              Strictly Confidential & Private Advisory
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
