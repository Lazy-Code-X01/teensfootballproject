import Hero from "@/components/sections/Hero";
import AboutSnippet from "@/components/sections/AboutSnippet";
import Programs from "@/components/sections/Programs";
import Coaches from "@/components/sections/Coaches";
import Testimonials from "@/components/sections/Testimonials";
import AcademyFeatures from "@/components/sections/AcademyFeatures";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutSnippet />
      <Programs />
      <Coaches />
      <Testimonials />
      <AcademyFeatures />
      <CTABanner />
    </main>
  );
}
