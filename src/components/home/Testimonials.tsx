"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { home, testimonialNote, testimonials, ui } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderTag } from "@/components/ui/Placeholder";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { TestimonialCard } from "./TestimonialCard";

const INTERVAL = 7000;

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = testimonials.length;

  const go = (next: number, d: number) => setState([(next + count) % count, d]);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setTimeout(() => setState(([i]) => [(i + 1) % count, 1]), INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused, reduce, count]);

  return (
    <section
      className="relative py-24 sm:py-32"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow={home.testimonials.eyebrow} title={home.testimonials.title} id="testimonials-title" />

        <div className="glass relative mt-14 overflow-hidden rounded-[2rem] px-6 py-14 sm:px-16 sm:py-20" aria-roledescription="carousel">
          <div className="relative min-h-[22rem] sm:min-h-[19rem]" aria-live="polite">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(index + 1, 1);
                  else if (info.offset.x > 60) go(index - 1, -1);
                }}
                className="cursor-grab active:cursor-grabbing"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} / ${count}`}
              >
                <TestimonialCard t={testimonials[index]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => go(index - 1, -1)}
              aria-label={ui.prevTestimonial}
              className="grid size-11 place-items-center rounded-full border border-gold/35 text-gold-soft transition-colors hover:bg-gold/10"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex gap-1">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i, i > index ? 1 : -1)}
                  aria-label={`${ui.goToTestimonial} ${i + 1}`}
                  aria-current={i === index}
                  className="grid h-11 w-7 place-items-center"
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-6 bg-gold" : "w-1.5 bg-line"}`} />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(index + 1, 1)}
              aria-label={ui.nextTestimonial}
              className="grid size-11 place-items-center rounded-full border border-gold/35 text-gold-soft transition-colors hover:bg-gold/10"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <p className="mt-5 flex flex-wrap items-center justify-center gap-3 text-center text-xs text-faint">
          <PlaceholderTag />
          {testimonialNote}
        </p>
      </div>
    </section>
  );
}
