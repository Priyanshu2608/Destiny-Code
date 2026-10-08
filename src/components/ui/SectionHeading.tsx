import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
};

export function SectionHeading({ eyebrow, title, intro, align = "center", as: Tag = "h2", id }: Props) {
  const centered = align === "center";
  return (
    <Reveal className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold ${centered ? "justify-center" : ""}`}>
          <span aria-hidden className="h-px w-8 bg-gold/60" />
          {eyebrow}
          {centered && <span aria-hidden className="h-px w-8 bg-gold/60" />}
        </p>
      )}
      <Tag id={id} className={`${Tag === "h1" ? "text-5xl sm:text-6xl lg:text-7xl" : "text-4xl sm:text-5xl"} leading-[1.05] text-cream`}>
        {title}
      </Tag>
      {intro && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </Reveal>
  );
}
