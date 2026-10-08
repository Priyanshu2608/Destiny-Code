/** Placeholder logo mark: a star inside two rings with a number orbit. Swap for the client's logo. */
export function Emblem({ size = 36, className = "", uid = "emblem" }: { size?: number; className?: string; uid?: string }) {
  const g = `${uid}-gold`;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="var(--palette-gold-soft)" />
          <stop offset="1" stopColor="var(--palette-gold-deep)" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18.5" stroke={`url(#${g})`} strokeWidth="1" />
      <circle cx="20" cy="20" r="13" stroke={`url(#${g})`} strokeWidth="0.75" strokeDasharray="1.5 2.5" />
      <path d="M20 8.5c.9 6.4 2.3 9 8.5 11.5-6.2 2.5-7.6 5.1-8.5 11.5-.9-6.4-2.3-9-8.5-11.5 6.2-2.5 7.6-5.1 8.5-11.5Z" fill={`url(#${g})`} />
      <circle cx="33.1" cy="11" r="1.4" fill="var(--palette-gold-soft)" />
    </svg>
  );
}
