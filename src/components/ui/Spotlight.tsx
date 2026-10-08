"use client";

import type { ComponentProps, PointerEvent } from "react";

/** A surface whose gold glow follows the pointer (see .spotlight in globals.css). */
export function Spotlight({ className = "", children, ...props }: ComponentProps<"div">) {
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <div onPointerMove={onPointerMove} className={`spotlight ${className}`} {...props}>
      {children}
    </div>
  );
}
