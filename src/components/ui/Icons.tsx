import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ── Zodiac line glyphs ─────────────────────────────────────── */

export const zodiacPaths: { name: string; d: string }[] = [
  { name: "Aries", d: "M12 21V10M12 10c0-4-2.5-7-5.5-7S3 5 3 7.5 4.8 11 6.5 11M12 10c0-4 2.5-7 5.5-7S21 5 21 7.5 19.2 11 17.5 11" },
  { name: "Taurus", d: "M4 4c0 4 3.5 6 8 6s8-2 8-6M17 15a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" },
  { name: "Gemini", d: "M5 4c4 1.6 10 1.6 14 0M5 20c4-1.6 10-1.6 14 0M9 5.2v13.6M15 5.2v13.6" },
  { name: "Cancer", d: "M9.5 9A2.5 2.5 0 1 1 4.5 9a2.5 2.5 0 0 1 5 0Zm0 0C10 5.5 15 4 20 6.5M14.5 15a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Zm0 0C14 18.5 9 20 4 17.5" },
  { name: "Leo", d: "M10 15a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm0 0c0-3-2-5-2-8a4 4 0 0 1 8 0c0 4-3 7-3 11a2.5 2.5 0 0 0 5 0" },
  { name: "Virgo", d: "M3 6c1.5 0 2 1 2 2.5V18M5 8.5C5 7 6 6 7.5 6S10 7 10 8.5V18m0-9.5C10 7 11 6 12.5 6S15 7 15 8.5V16c0 2 1.2 3 3 3m-3-7c2.5 0 5 1 5 3s-2 3.5-4 4.5" },
  { name: "Libra", d: "M3 20h18M3 16h5a4.5 4.5 0 1 1 8 0h5" },
  { name: "Scorpio", d: "M3 6c1.5 0 2 1 2 2.5V18M5 8.5C5 7 6 6 7.5 6S10 7 10 8.5V18m0-9.5C10 7 11 6 12.5 6S15 7 15 8.5V17c0 1.4.8 2 2.2 2H21m-2-2 2 2-2 2" },
  { name: "Sagittarius", d: "M4 20 20 4m-8 0h8v8M7 11l6 6" },
  { name: "Capricorn", d: "M3 5c2 0 3 2 3 4v10m0-10c0-3 1.8-4 3.4-4S13 6.2 13 9v6c0 3 1.5 5 4 5a3 3 0 0 0 0-6c-2.2 0-4 2-5 5" },
  { name: "Aquarius", d: "m3 10 3-3 3 3 3-3 3 3 3-3 3 3M3 17l3-3 3 3 3-3 3 3 3-3 3 3" },
  { name: "Pisces", d: "M5 3c4 4 4 14 0 18M19 3c-4 4-4 14 0 18M4 12h16" },
];

/* ── Help-area icons ────────────────────────────────────────── */

const helpIcons: Record<string, React.ReactNode> = {
  self: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="m12 8 1.4 2.6L16 12l-2.6 1.4L12 16l-1.4-2.6L8 12l2.6-1.4Z" />
    </>
  ),
  relationships: (
    <>
      <circle cx="9" cy="12" r="5.5" />
      <circle cx="15" cy="12" r="5.5" />
    </>
  ),
  career: (
    <>
      <path d="M4 20h16" />
      <path d="M6 20v-5h3v5M10.5 20v-9h3v9M15 20V7h3v13" />
      <path d="m16.5 3 .6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z" />
    </>
  ),
  timing: (
    <>
      <path d="M7 3h10M7 21h10" />
      <path d="M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9" />
    </>
  ),
  names: (
    <>
      <path d="m4 19 5-14 5 14M5.8 14h6.4" />
      <path d="M17 9.5c0-1.4 1-2.5 2-2.5s2 .9 2 2.2c0 2.3-4 4.3-4 6.8h4" />
    </>
  ),
  yearly: (
    <>
      <circle cx="12" cy="12" r="8.5" strokeDasharray="2 2.6" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="12" cy="3.5" r="1.2" fill="currentColor" />
    </>
  ),
};

export function HelpIcon({ name, ...props }: IconProps & { name: string }) {
  return <Svg {...props}>{helpIcons[name] ?? helpIcons.self}</Svg>;
}

export function ZodiacIcon({ index, ...props }: IconProps & { index: number }) {
  return (
    <Svg strokeWidth={1.25} {...props}>
      <path d={zodiacPaths[index % 12].d} />
    </Svg>
  );
}

/* ── UI icons ───────────────────────────────────────────────── */

export const ArrowRight = (p: IconProps) => (
  <Svg {...p}><path d="M4 12h15m-5-5 5 5-5 5" /></Svg>
);
export const ArrowLeft = (p: IconProps) => (
  <Svg {...p}><path d="M20 12H5m5-5-5 5 5 5" /></Svg>
);
export const ChevronDown = (p: IconProps) => (
  <Svg {...p}><path d="m6 9 6 6 6-6" /></Svg>
);
export const Plus = (p: IconProps) => (
  <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
);
export const Check = (p: IconProps) => (
  <Svg {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Svg>
);
export const Close = (p: IconProps) => (
  <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>
);
export const Menu = (p: IconProps) => (
  <Svg {...p}><path d="M4 8h16M4 16h10" /></Svg>
);
export const Clock = (p: IconProps) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>
);
export const Video = (p: IconProps) => (
  <Svg {...p}><rect x="3" y="6" width="13" height="12" rx="2.5" /><path d="m16 10 5-3v10l-5-3" /></Svg>
);
export const Tag = (p: IconProps) => (
  <Svg {...p}><path d="M3 12V4.5A1.5 1.5 0 0 1 4.5 3H12l9 9-9 9Z" /><circle cx="7.5" cy="7.5" r="1.3" /></Svg>
);
export const Mail = (p: IconProps) => (
  <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></Svg>
);
export const Sparkle = (p: IconProps) => (
  <Svg {...p}><path d="M12 3c.6 4.6 1.9 6.9 6 9-4.1 2.1-5.4 4.4-6 9-.6-4.6-1.9-6.9-6-9 4.1-2.1 5.4-4.4 6-9Z" /></Svg>
);
export const Shield = (p: IconProps) => (
  <Svg {...p}><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6Z" /><path d="m9 12 2 2 4-4" /></Svg>
);
export const Card = (p: IconProps) => (
  <Svg {...p}><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="M3 10h18M7 15h3" /></Svg>
);

export const Instagram = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
  </Svg>
);

export function WhatsApp({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01Zm-7.01 15.24h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.23 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}
