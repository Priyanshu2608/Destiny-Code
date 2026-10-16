import type { Metadata } from "next";
import { booking, ctas, faqs, site, whatsappLink } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BookingForm } from "@/components/booking/BookingForm";
import { FAQItem } from "@/components/booking/FAQItem";
import { Card, Instagram, Mail, Shield, Video, WhatsApp } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Book a Reading",
  description: `Book a personal numerology or astrology reading with ${site.consultantName}. Online sessions by video, audio or WhatsApp call.`,
};

export default function BookingPage() {
  return (
    <>
      <section className="pb-12 pt-32 sm:pt-40">
        <div className="px-5">
          <SectionHeading as="h1" eyebrow={booking.eyebrow} title={booking.title} intro={booking.intro} />
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <BookingForm />

        <aside className="space-y-6 lg:sticky lg:top-28">
          <InfoCard icon={<Video size={20} />} title={booking.consultation.title}>
            <dl className="space-y-4">
              {booking.consultation.items.map((it) => (
                <div key={it.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{it.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{it.text}</dd>
                </div>
              ))}
            </dl>
          </InfoCard>


          <InfoCard icon={<Mail size={20} />} title={booking.contact.title}>
            <p className="text-sm leading-relaxed text-muted">{booking.contact.text}</p>
            <div className="mt-5 space-y-2.5">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-full bg-linear-to-b from-gold-soft to-gold px-5 py-3 text-sm font-semibold text-night-deep transition-transform hover:-translate-y-0.5"
              >
                <WhatsApp size={18} /> {ctas.whatsapp}
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-full border border-line px-5 py-3 text-sm text-muted transition-colors hover:border-gold/50 hover:text-cream">
                <Mail size={16} className="text-gold" /> {site.email}
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-full border border-line px-5 py-3 text-sm text-muted transition-colors hover:border-gold/50 hover:text-cream"
              >
                <Instagram size={16} className="text-gold" /> {site.instagramHandle}
              </a>
            </div>
          </InfoCard>
        </aside>
      </div>

      <section id="faq" className="py-24 sm:py-32" aria-labelledby="faq-title">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <h2 id="faq-title" className="text-4xl sm:text-5xl lg:sticky lg:top-32">
              {booking.faqTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="border-t border-line/70">
            {faqs.map((f, i) => (
              <FAQItem key={f.question} faq={f} defaultOpen={i === 0} />
            ))}
          </Reveal>
        </div>
      </section>

      <section id="policy" className="pb-24 sm:pb-32" aria-labelledby="policy-title">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="rounded-[2rem] border border-dashed border-gold/35 p-8 sm:p-12">
            <h2 id="policy-title" className="flex items-center gap-4 text-3xl sm:text-4xl">
              <Shield size={28} className="shrink-0 text-gold" /> {booking.policy.title}
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {booking.policy.items.map((p) => (
                <li key={p} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-gold" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-[1.75rem] p-6 sm:p-7">
      <h2 className="mb-5 flex items-center gap-3 text-2xl text-cream">
        <span className="grid size-10 place-items-center rounded-full border border-gold/35 text-gold-soft">{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}
