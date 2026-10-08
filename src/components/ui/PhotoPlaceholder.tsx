import { PlaceholderTag } from "./Placeholder";

type Props = { label: string; alt: string; className?: string; arch?: boolean };

/** Reserved image slot with the final aspect ratio; replace with next/image in Phase 2. */
export function PhotoPlaceholder({ label, alt, className = "", arch = false }: Props) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden border border-gold/30 bg-linear-to-b from-raised via-surface to-night-deep ${arch ? "rounded-t-full rounded-b-3xl" : "rounded-3xl"} ${className}`}
    >
      <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full text-gold/25" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <g fill="none" stroke="currentColor" strokeWidth="0.6">
          <circle cx="100" cy="110" r="70" />
          <circle cx="100" cy="110" r="50" strokeDasharray="2 3" />
          <circle cx="100" cy="92" r="22" />
          <path d="M55 200c6-34 26-52 45-52s39 18 45 52" />
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <PlaceholderTag>{label}</PlaceholderTag>
      </div>
    </div>
  );
}
