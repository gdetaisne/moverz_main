import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import cityData from "@/lib/city-data";
import CtaPrimary from "@/components/CtaPrimary";
import Section from "@/components/Section";
import PartnerCard from "@/components/PartnerCard";
import PartnersList from "@/components/PartnersList";

export const metadata: Metadata = {
  title: "Nos Partenaires Déménageurs",
  description: "Découvrez nos partenaires déménageurs certifiés. Qualité garantie, tarifs transparents, service client premium.",
};

// Charger les partenaires depuis les données de la ville
const partners = cityData.partners || [];

export default function PartenairesPage() {
  return (
    <main className="bg-hero">
      <div className="halo" />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=2000&auto=format&fit=crop"
            alt="Nos partenaires déménageurs à {cityData.city_name}"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/90 to-[#04163a]/90"></div>
        </div>

        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:py-32">
          <div className="text-center">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: "Partenaires", href: "/partenaires" }
              ]}
            />
            <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Nos partenaires déménageurs à {cityData.city_name}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Découvrez notre réseau de déménageurs professionnels certifiés et qualifiés.
            </p>
          </div>
        </div>
      </section>

      {/* Partners List */}
      <Section>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              {partners.length} partenaires certifiés
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Tous nos partenaires sont sélectionnés pour leur professionnalisme, leur expertise et leurs tarifs compétitifs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#2b7a78]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-[#6bcfcf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {partner.name}
                    </h3>
                    {partner.description && (
                      <p className="text-white/70 text-sm">
                        {partner.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-3">
              Vous êtes déménageur à {cityData.city_name} et souhaitez rejoindre notre réseau ? 
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Nous recherchons constamment des partenaires qualifiés pour enrichir notre offre.
            </p>
            <a
              href="mailto:{cityData.contactEmail}"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#2b7a78] px-6 text-sm font-medium text-white shadow-marketing-xl hover:brightness-110 transition duration-300"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-white/5">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Obtenez des devis de nos partenaires
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Comparez les offres de nos déménageurs certifiés et choisissez la meilleure pour votre projet.
          </p>
          <CtaPrimary placement="inline" />
        </div>
      </Section>
    </main>
  );
}
