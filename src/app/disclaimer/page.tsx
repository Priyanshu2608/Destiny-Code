import type { Metadata } from "next";
import { disclaimer } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderTag } from "@/components/ui/Placeholder";

export const metadata: Metadata = {
  title: disclaimer.title,
  description: disclaimer.short,
};

export default function DisclaimerPage() {
  return (
    <section className="px-5 pb-24 pt-32 sm:pb-32 sm:pt-40">
      <SectionHeading as="h1" title={disclaimer.title} intro={disclaimer.short} />
      <Reveal className="glass mx-auto mt-14 max-w-3xl rounded-[2rem] p-8 sm:p-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-line/70 pb-6">
          <p className="text-sm text-faint">{disclaimer.updated}</p>
          <PlaceholderTag>{disclaimer.pendingTag}</PlaceholderTag>
        </div>
        <ol className="space-y-6">
          {disclaimer.paragraphs.map((p, i) => (
            <li key={i} className="flex gap-5 leading-relaxed text-muted">
              <span className="font-display text-lg italic text-gold">{i + 1}.</span>
              <p>{p}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
