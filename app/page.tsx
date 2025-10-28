import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PricingPreview from "@/components/PricingPreview";
import StickyCTA from "@/components/StickyCTA";
import ValueTriad from "@/components/ValueTriad";
import ProofStrip from "@/components/ProofStrip";
import PhotoGuidelines from "@/components/PhotoGuidelines";
import Testimonials from "@/components/Testimonials";
import NeighborhoodsTeaser from "@/components/NeighborhoodsTeaser";

export default function Home() {
  return (
    <main className="bg-hero">
      <div className="halo" />
      <Hero />
      <section className="section">
        <div className="container">
          <ValueTriad />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <HowItWorks />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <NeighborhoodsTeaser />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ProofStrip />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <PhotoGuidelines className="my-12 md:my-16" />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <PricingPreview />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Testimonials />
        </div>
      </section>
      <StickyCTA />
    </main>
  );
}


