import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "ghost" | "quiet";

const styles: Record<Variant, string> = {
  primary:
    "shine bg-linear-to-b from-gold-soft via-gold to-gold-deep text-night-deep shadow-[0_10px_30px_-10px_var(--palette-gold),inset_0_1px_0_rgb(255_255_255/0.5)] hover:shadow-[0_14px_40px_-8px_var(--palette-gold),inset_0_1px_0_rgb(255_255_255/0.5)]",
  ghost:
    "border border-gold/40 text-gold-soft bg-night-deep/30 hover:border-gold hover:bg-gold/10 backdrop-blur",
  quiet: "text-gold-soft hover:text-cream underline-offset-4 hover:underline px-0!",
};

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[0.95rem] font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0";

type Props = {
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

export function LinkButton({
  variant = "primary",
  arrow = false,
  children,
  className = "",
  ...props
}: Props & ComponentProps<typeof Link>) {
  return (
    <Link className={`${base} ${styles[variant]} ${className}`} {...props}>
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight size={18} className="relative transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}

export function Button({
  variant = "primary",
  arrow = false,
  children,
  className = "",
  ...props
}: Props & ComponentProps<"button">) {
  return (
    <button className={`${base} ${styles[variant]} disabled:opacity-60 disabled:pointer-events-none ${className}`} {...props}>
      <span className="relative">{children}</span>
      {arrow && (
        <ArrowRight size={18} className="relative transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </button>
  );
}
