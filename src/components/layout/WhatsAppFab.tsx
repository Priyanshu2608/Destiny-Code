import { ctas, whatsappLink } from "@/content/site";
import { WhatsApp } from "@/components/ui/Icons";

/** Floating WhatsApp button, mobile only. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ctas.whatsapp}
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-linear-to-b from-gold-soft to-gold text-night-deep shadow-[0_12px_30px_-8px_var(--palette-gold)] transition-transform active:scale-95 md:hidden"
    >
      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-gold/30 [animation-duration:3s]" />
      <WhatsApp size={26} className="relative" />
    </a>
  );
}
