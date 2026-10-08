import type { Testimonial } from "@/content/site";

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="mx-auto max-w-3xl text-center">
      <svg aria-hidden viewBox="0 0 48 36" className="mx-auto h-9 w-12 text-gold">
        <path fill="currentColor" d="M0 36V22C0 9.6 6.2 2.3 18.6 0l1.9 4.4C13.6 6.5 10.1 10.6 9.7 16.6H19V36Zm27 0V22c0-12.4 6.2-19.7 18.6-22l1.9 4.4c-6.9 2.1-10.4 6.2-10.8 12.2H46V36Z" />
      </svg>
      <blockquote className="mt-8 font-display text-2xl leading-snug text-cream sm:text-[2.1rem] sm:leading-[1.3]">
        <p>{t.quote}</p>
      </blockquote>
      <figcaption className="mt-8">
        <span className="block font-semibold text-gold-soft">{t.name}</span>
        <span className="mt-1 block text-sm text-faint">
          {t.detail} · {t.service}
        </span>
      </figcaption>
    </figure>
  );
}
