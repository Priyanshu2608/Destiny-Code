import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { HelpAreas } from "@/components/home/HelpAreas";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramSection } from "@/components/home/InstagramSection";
import { Constellation } from "@/components/ui/Constellation";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Constellation className="mx-auto w-full max-w-xl px-5" />
      <ServicesOverview />
      <HelpAreas />
      <Testimonials />
      <InstagramSection />
    </>
  );
}
