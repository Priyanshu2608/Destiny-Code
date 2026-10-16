import { r2, seeded } from "@/lib/random";
import { ShootingStars } from "./ShootingStars";

/** Fixed, decorative star field behind every page. Deterministic so it hydrates cleanly. */
export function StarField() {
  const rand = seeded(42);
  const stars = Array.from({ length: 150 }, (_, i) => ({
    x: r2(rand() * 100),
    y: r2(rand() * 100),
    r: r2(rand() < 0.88 ? 0.4 + rand() * 0.6 : 1.1 + rand() * 0.6),
    twinkle: i % 5 === 0,
    delay: r2(rand() * 6),
    o: r2(0.25 + rand() * 0.55),
  }));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <ShootingStars />
      <svg className="h-full w-full">
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill={i % 9 === 0 ? "var(--palette-gold-soft)" : "var(--palette-cream)"}
            opacity={s.o}
            className={s.twinkle ? "animate-twinkle" : undefined}
            style={s.twinkle ? { animationDelay: `${s.delay}s` } : undefined}
          />
        ))}
      </svg>
    </div>
  );
}
