import { r2 } from "@/lib/random";
import { zodiacPaths } from "./Icons";

const C = 300;
const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: r2(C + r * Math.cos(a)), y: r2(C + r * Math.sin(a)) };
};

/** Angle of number n (1–9) on the enneagram: 9 at the top, then clockwise. */
const numAngle = (n: number) => (n % 9) * 40 - 90;

const hexad = [1, 4, 2, 8, 5, 7, 1];
const triad = [3, 6, 9, 3];

const pathThrough = (nums: number[], r: number) =>
  nums
    .map((n, i) => {
      const p = polar(r, numAngle(n));
      return `${i ? "L" : "M"}${p.x} ${p.y}`;
    })
    .join(" ");

/**
 * The hero wheel: an outer zodiac ring (astrology) around an inner ring of
 * the numbers 1–9 joined by enneagram lines (numerology), with a seed-of-life
 * at the centre. Rings turn very slowly in opposite directions.
 */
export function Astrolabe({ className = "", uid = "astro" }: { className?: string; uid?: string }) {
  const gold = `${uid}-gold`;
  const core = `${uid}-core`;
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
  const seed = [0, 60, 120, 180, 240, 300].map((d) => polar(34, d));

  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gold} x1="0" y1="0" x2="600" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--palette-gold-soft)" />
          <stop offset="0.5" stopColor="var(--palette-gold)" />
          <stop offset="1" stopColor="var(--palette-gold-deep)" />
        </linearGradient>
        <radialGradient id={core} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--palette-gold)" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="var(--palette-aura)" stopOpacity="0.12" />
          <stop offset="1" stopColor="var(--palette-night)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={C} cy={C} r="300" fill={`url(#${core})`} />

      {/* Outer zodiac ring */}
      <g className="animate-spin-slow" style={{ transformOrigin: "300px 300px" }} stroke={`url(#${gold})`} fill="none">
        <circle cx={C} cy={C} r="292" strokeWidth="0.8" />
        <circle cx={C} cy={C} r="286" strokeWidth="0.4" opacity="0.6" />
        <circle cx={C} cy={C} r="252" strokeWidth="0.8" />
        {ticks.map((d) => {
          const long = d % 30 === 0;
          const a = polar(252, d);
          const b = polar(long ? 286 : 259, d);
          return <line key={d} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth={long ? 0.8 : 0.5} opacity={long ? 0.9 : 0.5} />;
        })}
        {zodiacPaths.map((z, i) => {
          const deg = i * 30 + 15 - 90;
          const p = polar(270, deg);
          return (
            <g key={z.name} transform={`translate(${p.x} ${p.y}) rotate(${deg + 90}) translate(-9 -9) scale(0.75)`}>
              <path d={z.d} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          );
        })}
      </g>

      {/* Middle number ring */}
      <g className="animate-spin-slower" style={{ transformOrigin: "300px 300px" }}>
        <circle cx={C} cy={C} r="222" fill="none" stroke={`url(#${gold})`} strokeWidth="0.6" strokeDasharray="1 5" />
        <circle cx={C} cy={C} r="176" fill="none" stroke={`url(#${gold})`} strokeWidth="0.7" opacity="0.8" />
        <path d={pathThrough(hexad, 176)} fill="none" stroke={`url(#${gold})`} strokeWidth="0.7" opacity="0.75" />
        <path d={pathThrough(triad, 176)} fill="none" stroke={`url(#${gold})`} strokeWidth="0.9" />
        {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => {
          const dot = polar(176, numAngle(n));
          const label = polar(199, numAngle(n));
          return (
            <g key={n}>
              <circle cx={dot.x} cy={dot.y} r="3" fill="var(--palette-gold-soft)" />
              <text
                x={label.x}
                y={label.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="animate-counter font-display"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                fill="var(--palette-gold-soft)"
                fontSize="22"
                fontStyle="italic"
              >
                {n}
              </text>
            </g>
          );
        })}
      </g>

      {/* Static centre: seed of life */}
      <g fill="none" stroke={`url(#${gold})`} strokeWidth="0.7">
        <circle cx={C} cy={C} r="102" opacity="0.5" />
        <circle cx={C} cy={C} r="68" opacity="0.8" />
        <circle cx={C} cy={C} r="34" />
        {seed.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="34" opacity="0.85" />
        ))}
      </g>
      <path
        d="M300 276c1.6 11.5 4.1 16.4 15.5 24-11.4 7.6-13.9 12.5-15.5 24-1.6-11.5-4.1-16.4-15.5-24 11.4-7.6 13.9-12.5 15.5-24Z"
        fill={`url(#${gold})`}
      />
    </svg>
  );
}
