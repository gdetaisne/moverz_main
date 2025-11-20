import type { Metadata } from "next";
import { getFullMetadata } from "@/lib/canonical-helper";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CITIES, getUniqueRegions, getCitiesByRegion } from "@/lib/cities";

export const metadata: Metadata = getFullMetadata(
  'villes',
  "Nos 11 villes couvertes — Moverz",
  "Découvrez les 11 villes françaises où Moverz est présent : Nice, Lyon, Marseille, Toulouse, Bordeaux, Lille, Strasbourg, Nantes, Rennes, Rouen, Montpellier."
);

export default function VillesPage() {
  const citiesByRegion = getCitiesByRegion();
  const regions = getUniqueRegions();

  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2000&auto=format&fit=crop"
            alt="Villes de France"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/92"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Nos villes", href: "/villes/" }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-bold mt-6">
            11 villes couvertes en France
          </h1>
          <p className="text-white/85 mt-3 max-w-3xl">
            Sélectionnez votre ville pour comparer 5+ devis de déménageurs contrôlés.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container max-w-6xl">
          <div className="space-y-16">
            {regions.map((region) => {
              const cities = citiesByRegion[region];
              return (
                <div key={region}>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#04163a] mb-8">
                    {region}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cities.map((city) => (
                      <a
                        key={city.slug}
                        href={`${city.url}/devis-gratuits/`}
                        className="group relative overflow-hidden rounded-3xl border border-[#E3E5E8] bg-white p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-[#6BCFCF]/40 transition-all duration-300"
                      >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6BCFCF]/0 to-[#4FB8B8]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                        
                        <div className="relative">
                          {/* Icon */}
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6BCFCF]/20 to-[#4FB8B8]/30 border-2 border-[#6BCFCF]/30 text-[#2B7A78] mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>

                          {/* Content */}
                          <h3 className="text-2xl font-bold text-[#04163a] mb-2 group-hover:text-[#2B7A78] transition-colors">
                            {city.nameCapitalized}
                          </h3>
                          <p className="text-sm text-[#4b5c6b] leading-relaxed mb-4">
                            {city.description}
                          </p>

                          {/* CTA */}
                          <div className="flex items-center text-[#2B7A78] font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
                            <span>Voir les devis</span>
                            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-contrast">
        <div className="container max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Votre ville n'est pas encore couverte ?
          </h2>
          <p className="text-lg text-white/75 max-w-2xl mx-auto">
            Nous sommes en constante expansion. Contactez-nous pour être informé de l'ouverture dans votre ville.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact/"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg font-semibold text-[#04141f] shadow-[0_8px_30px_rgba(107,207,207,0.35)] hover:shadow-[0_12px_50px_rgba(107,207,207,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative">Contactez-nous</span>
              <span className="relative text-xl leading-none group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 text-base font-medium text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
            >
              <span>Retour à l'accueil</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
