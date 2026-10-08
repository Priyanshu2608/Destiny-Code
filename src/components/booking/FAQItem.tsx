"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import type { FAQ } from "@/content/site";
import { Plus } from "@/components/ui/Icons";

export function FAQItem({ faq, defaultOpen = false }: { faq: FAQ; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-b border-line/70">
      <h3 className="font-sans">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          onClick={() => setOpen((o) => !o)}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left"
        >
          <span className={`font-display text-xl leading-snug transition-colors sm:text-2xl ${open ? "text-gold-soft" : "text-cream group-hover:text-gold-soft"}`}>
            {faq.question}
          </span>
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
              open ? "rotate-45 border-gold bg-gold text-night-deep" : "border-gold/40 text-gold"
            }`}
          >
            <Plus size={16} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-muted">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
