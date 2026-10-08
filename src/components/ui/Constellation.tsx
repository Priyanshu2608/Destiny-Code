/** Thin decorative constellation used as a section divider. */
export function Constellation({ className = "" }: { className?: string }) {
  const pts: [number, number][] = [
    [10, 38], [70, 22], [128, 44], [190, 14], [252, 34], [300, 30], [348, 34], [410, 14], [472, 44], [530, 22], [590, 38],
  ];
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  return (
    <svg viewBox="0 0 600 60" className={className} aria-hidden="true" focusable="false">
      <path d={d} fill="none" stroke="var(--palette-gold)" strokeWidth="0.6" opacity="0.45" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 5 ? 3.2 : i % 3 === 0 ? 2 : 1.4} fill="var(--palette-gold-soft)" />
      ))}
    </svg>
  );
}
