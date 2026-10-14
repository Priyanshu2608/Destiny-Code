"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { PointerEvent } from "react";
import { ctas, home, site } from "@/content/site";
import { Astrolabe } from "@/components/ui/Astrolabe";
import { LinkButton } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const shiftX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const shiftY = useTransform(sy, [-0.5, 0.5], [-14, 14]);

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  const [l1, l2, l3] = home.hero.title;

  return (
    <section
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:min-h-[100svh] lg:pb-24"
      aria-labelledby="hero-title"
    >
      {/* Wheel: background on mobile, right column on desktop */}
      <motion.div
        aria-hidden
        style={{ rotateX, rotateY, x: shiftX, y: shiftY, transformPerspective: 1200 }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease }}
        className="pointer-events-none absolute -right-44 top-10 w-[520px] sm:-right-24 sm:w-[640px] lg:right-[-4%] lg:top-1/2 lg:w-[min(52vw,760px)] lg:-translate-y-1/2"
      >
        {/* Dimmed behind the text on small screens, full strength beside it on desktop */}
        <div className="opacity-[0.22] sm:opacity-30 lg:opacity-100">
          <Astrolabe className="h-auto w-full drop-shadow-[0_0_40px_rgb(217_182_108/0.15)]" />
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="max-w-2xl lg:max-w-[34rem] xl:max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.28em] text-gold"
          >
            <span>{site.businessName}</span>
            <span aria-hidden className="h-px w-6 bg-gold/60" />
            <span className="font-display text-base normal-case italic tracking-normal text-gold-soft">{site.tagline}</span>
          </motion.p>

          <h1 id="hero-title" className="mt-7 text-[3.1rem] leading-[0.98] sm:text-7xl lg:text-[5.4rem]">
            {[l1, l2].map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.15 + i * 0.15, ease }}
              >
                {line}
              </motion.span>
            ))}
            <motion.span
              className="text-gilded block pb-2 italic"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.45, ease }}
            >
              {l3}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="mt-7 max-w-lg text-lg leading-relaxed text-muted"
          >
            {home.hero.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <LinkButton href="/booking" arrow className="px-8! py-4! text-base!">
              {ctas.primary}
            </LinkButton>
            <LinkButton href="/services" variant="ghost" className="px-8! py-4! text-base!">
              {home.hero.secondaryCta}
            </LinkButton>
          </motion.div>

         
        </div>
      </div>
    </section>
  );
}
