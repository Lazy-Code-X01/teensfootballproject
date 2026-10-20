import Hero from "@/components/sections/Hero";
import StatsSection from "@/components/sections/StatsSection";
import AboutSnippet from "@/components/sections/AboutSnippet";
import Programs from "@/components/sections/Programs";
import Coaches from "@/components/sections/Coaches";
import Testimonials from "@/components/sections/Testimonials";
import AcademyFeatures from "@/components/sections/AcademyFeatures";
import Partners from "@/components/sections/Partners";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsSection />
      <AboutSnippet />
      <Programs />
      <Coaches />
      <Testimonials />
      <AcademyFeatures />
      <Partners />
      <CTABanner />
    </main>
  );
}
