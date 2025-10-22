import Hero from "@/components/Hero";
import Guarantees from "@/components/Guarantees";
import HowItWorks from "@/components/HowItWorks";
import ZonesCovered from "@/components/ZonesCovered";
import KeyStats from "@/components/KeyStats";
import PhotoGuidelines from "@/components/PhotoGuidelines";
import PricingPreview from "@/components/PricingPreview";
import Testimonials from "@/components/Testimonials";
import PartnerCTA from "@/components/PartnerCTA";
import NationalCities from "@/components/NationalCities";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  return (
    <main className="bg-hero">
      <div className="halo" />
      
      {/* 1. Hero Section */}
      <Hero />
      
      {/* 2. Nos garanties */}
      <Guarantees />
      
      {/* 3. Comment ça marche */}
      <section className="section">
        <div className="container">
          <HowItWorks />
        </div>
      </section>
      
      {/* 4. Zones couvertes - Locales */}
      <section className="section">
        <div className="container">
          <ZonesCovered />
        </div>
      </section>
      
      {/* 5. Chiffres clés */}
      <section className="section">
        <div className="container">
          <KeyStats />
        </div>
      </section>
      
      {/* 6. Bien préparer vos photos */}
      <section className="section">
        <div className="container">
          <PhotoGuidelines className="my-12 md:my-16" />
        </div>
      </section>
      
      {/* 7. Tarifs indicatifs */}
      <section className="section">
        <div className="container">
          <PricingPreview />
        </div>
      </section>
      
      {/* 8. Témoignages */}
      <section className="section">
        <div className="container">
          <Testimonials />
        </div>
      </section>
      
      {/* 9. Devenir partenaire */}
      <section className="section">
        <div className="container">
          <PartnerCTA />
        </div>
      </section>
      
          {/* 10. Sites nationaux */}
          <NationalCities />
      
      <StickyCTA />
    </main>
  );
}


