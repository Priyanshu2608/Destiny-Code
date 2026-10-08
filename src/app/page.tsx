import { Hero } from "@/components/home/Hero";
import { HelpAreas } from "@/components/home/HelpAreas";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramSection } from "@/components/home/InstagramSection";
import { Constellation } from "@/components/ui/Constellation";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Constellation className="mx-auto w-full max-w-xl px-5" />
      <HelpAreas />
      <ServicesOverview />
      <Testimonials />
      <InstagramSection />
    </>
  );
}
