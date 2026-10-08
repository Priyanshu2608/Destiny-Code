"use client";

import { MotionConfig } from "framer-motion";

/** Respects the visitor's "reduce motion" setting for every animation. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
