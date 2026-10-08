import Link from "next/link";
import { disclaimer, footer, nav, site, ui, whatsappLink } from "@/content/site";
import { Emblem } from "@/components/ui/Emblem";
import { Instagram, Mail, WhatsApp } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-line/70 bg-night-deep/80">
      {/* Disclaimer strip */}
      <div className="border-b border-line/70 bg-surface/40">
        <p className="mx-auto max-w-6xl px-5 py-4 text-center text-sm leading-relaxed text-muted">
          <span className="font-semibold text-gold-soft">{ui.disclaimerLead} </span>
          {disclaimer.short}{" "}
          <Link href="/disclaimer" className="text-gold-soft underline underline-offset-4 hover:text-cream">
            {ui.disclaimerLink}
          </Link>
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Emblem size={40} uid="emblem-footer" />
            <span className="font-display text-2xl font-semibold">{site.businessName}</span>
          </Link>
          <p className="mt-2 font-display text-lg italic text-gold-soft">{site.tagline}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{footer.blurb}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">{footer.navTitle}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {[...nav, ...footer.legal].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">{footer.contactTitle}</h2>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-cream">
                <Mail size={16} className="text-gold" /> {site.email}
              </a>
            </li>
            <li>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-cream">
                <WhatsApp size={16} className="text-gold" /> {site.phoneDisplay}
              </a>
            </li>
            <li className="leading-relaxed">{site.location}</li>
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold">{footer.socialTitle}</h2>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-muted hover:text-cream"
          >
            <Instagram size={16} className="text-gold" /> {site.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-line/60">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-faint">
          © {site.copyrightYear} {site.businessName}. {ui.rights}
        </p>
      </div>
    </footer>
  );
}
