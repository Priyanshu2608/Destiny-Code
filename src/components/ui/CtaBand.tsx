import { ctas } from "@/content/site";
import { LinkButton } from "./Button";
import { Constellation } from "./Constellation";
import { Reveal } from "./Reveal";

export function CtaBand({ title, text }: { title: string; text: string }) {
  return (
    <section className="px-5 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <Constellation className="mx-auto mb-10 w-full max-w-md" />
        <h2 className="text-4xl sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">{text}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href="/booking" arrow className="px-8! py-4!">
            {ctas.primary}
          </LinkButton>
          <LinkButton href="/services" variant="ghost" className="px-8! py-4!">
            {ctas.explore}
          </LinkButton>
        </div>
      </Reveal>
    </section>
  );
}
