"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

const tags = { div: motion.div, li: motion.li };

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: keyof typeof tags };

/** Fades and lifts its children into view once, as they scroll in. */
export function Reveal({ delay = 0, y = 18, as = "div", children, ...props }: Props) {
  const Tag = tags[as] as typeof motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Tag>
  );
}
