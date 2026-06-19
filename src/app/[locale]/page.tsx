import Hero         from "@/components/sections/Hero";
import Stats        from "@/components/sections/Stats";
import Services     from "@/components/sections/Services";
import WhyUs        from "@/components/sections/WhyUs";
import Destinations from "@/components/sections/Destinations";
import Process      from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA          from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <Destinations />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}