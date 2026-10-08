/** Small tag marking demo content that the client still needs to supply. */
export function PlaceholderTag({ children = "Placeholder" }: { children?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-gold/50 bg-night-deep/80 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold">
      <span aria-hidden className="size-1 rounded-full bg-gold" />
      {children}
    </span>
  );
}
