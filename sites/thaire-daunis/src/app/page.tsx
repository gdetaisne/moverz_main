import Hero from "@/components/Hero";
import ValueTriad from "@/components/ValueTriad";
import Testimonials from "@/components/Testimonials";
import NeighborhoodsTeaser from "@/components/NeighborhoodsTeaser";
import HowItWorks from "@/components/HowItWorks";
import ProofStrip from "@/components/ProofStrip";
import PhotoGuidelines from "@/components/PhotoGuidelines";
import PricingPreview from "@/components/PricingPreview";
import StickyCTA from "@/components/StickyCTA";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      
      <Hero />
      <ValueTriad />
      <Testimonials />
      <NeighborhoodsTeaser />
      <HowItWorks />
      <ProofStrip />
      <PhotoGuidelines />
      <PricingPreview />
      <StickyCTA />
      <FAQ />
    </main>
  );
}

