import type { Metadata } from "next";
import { CITIES, getCitiesByRegion } from '@/lib/cities';

export const metadata: Metadata = {
  title: "Choisissez votre ville — Moverz",
  description:
    "Sélectionnez votre ville pour comparer 5+ devis de déménageurs contrôlés. 11 villes couvertes en France.",
  alternates: {
    canonical: 'https://moverz.fr/choisir-ville/',
  },
};

export default function ChoisirVillePage() {
  const citiesByRegion = getCitiesByRegion();
  const regions = Object.keys(citiesByRegion).sort();

  return (
    <main className="bg-hero min-h-screen">
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
            11 villes couvertes en France
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Choisissez votre ville de{" "}
            <span className="bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] bg-clip-text text-transparent">
              déménagement
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
            Sélectionnez votre ville pour recevoir 5+ devis de déménageurs contrôlés, sans spam.
          </p>
        </div>

        {/* Grille des villes groupées par région */}
        <div className="space-y-12">
          {regions.map((region) => (
            <div key={region} className="space-y-6">
              <h2 className="text-2xl font-bold text-white/90 border-b border-white/10 pb-3">
                {region}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {citiesByRegion[region].map((city) => (
                  <a
                    key={city.slug}
                    href={`${city.url}/devis-gratuits/`}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                  >
                    {/* Glow effect au hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6BCFCF]/0 to-[#4FB8B8]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
                    
                    <div className="relative space-y-3">
                      {/* Ville */}
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#6BCFCF] transition-colors">
                        {city.nameCapitalized}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm md:text-base text-white/70 leading-relaxed">
                        {city.description}
                      </p>

                      {/* CTA subtil */}
                      <div className="flex items-center gap-2 text-[#6BCFCF] text-sm font-semibold group-hover:text-white transition-colors">
                        <span>Comparer les devis</span>
                        <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Liste alphabétique simple en bas */}
        <div className="mt-16 text-center space-y-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-4">
            {CITIES.map((city) => (
              <a
                key={city.slug}
                href={`${city.url}/devis-gratuits/`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
              >
                <span>{city.nameCapitalized}</span>
                <span className="text-xs text-white/50">→</span>
              </a>
            ))}
          </div>

          {/* CTA alternatif */}
          <div className="pt-8">
            <p className="text-sm text-white/60 mb-4">
              Vous ne trouvez pas votre ville ?
            </p>
            <a
              href="/contact/"
              className="inline-flex items-center gap-2 text-[#6BCFCF] hover:text-white transition-colors duration-300 font-medium"
            >
              <span>Contactez-nous</span>
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

