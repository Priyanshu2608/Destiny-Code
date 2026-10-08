import { r2 } from "@/lib/random";
import type { Discipline } from "@/content/site";

/** Small emblem per discipline: an enneagram for numerology, a 12-spoke wheel for astrology. */
export function DisciplineMark({ discipline, className = "" }: { discipline: Discipline; className?: string }) {
  const pt = (r: number, deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${r2(50 + r * Math.cos(a))} ${r2(50 + r * Math.sin(a))}`;
  };
  const ang = (n: number) => (n % 9) * 40 - 90;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false" fill="none" stroke="currentColor">
      <circle cx="50" cy="50" r="46" strokeWidth="0.8" />
      {discipline !== "astrology" && (
        <>
          <path d={"M" + [1, 4, 2, 8, 5, 7, 1].map((n) => pt(38, ang(n))).join(" L")} strokeWidth="0.8" />
          <path d={"M" + [3, 6, 9, 3].map((n) => pt(38, ang(n))).join(" L")} strokeWidth="1" />
        </>
      )}
      {discipline !== "numerology" && (
        <>
          <circle cx="50" cy="50" r={discipline === "combo" ? 20 : 30} strokeWidth="0.8" />
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d={`M${pt(discipline === "combo" ? 20 : 30, i * 30)} L${pt(46, i * 30)}`} strokeWidth="0.6" />
          ))}
          <circle cx="50" cy="50" r="5" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}
