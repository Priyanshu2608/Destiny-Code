import type { Metadata } from "next";
import { notFound } from "@/content/site";
import { LinkButton } from "@/components/ui/Button";
import { Astrolabe } from "@/components/ui/Astrolabe";

export const metadata: Metadata = { title: notFound.metaTitle };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden px-5 pb-20 pt-32 text-center">
      <Astrolabe uid="nf-wheel" className="pointer-events-none absolute left-1/2 top-1/2 w-[720px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-15" />
      <div className="relative">
        <p className="text-gilded font-display text-[7rem] italic leading-none sm:text-[10rem]">404</p>
        <h1 className="mt-4 text-4xl sm:text-5xl">{notFound.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">{notFound.text}</p>
        <LinkButton href="/" arrow className="mt-10">
          {notFound.cta}
        </LinkButton>
      </div>
    </section>
  );
}
