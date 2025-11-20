"use client";

import { useState } from "react";
import { CITIES, getUniqueRegions, getCitiesByRegion } from "@/lib/cities";

export default function ChoisirVillePage() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const citiesByRegion = getCitiesByRegion();
  const regions = getUniqueRegions();

  const handleCitySelect = (citySlug: string) => {
    const city = CITIES.find((c) => c.slug === citySlug);
    if (city) {
      setSelectedCity(citySlug);
      // Redirection vers le site local
      setTimeout(() => {
        window.location.href = `${city.url}/devis-gratuits/`;
      }, 300);
    }
  };

  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2000&auto=format&fit=crop"
            alt="Choisissez votre ville"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/92"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm shadow-lg mb-6">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              Sélectionnez votre ville
            </div>
            <h1 className="text-3xl md:text-5xl font-bold">
              Dans quelle ville déménagez-vous ?
            </h1>
            <p className="text-white/85 mt-4 max-w-2xl mx-auto text-lg">
              Choisissez votre ville pour recevoir jusqu'à 5 devis de déménageurs contrôlés.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container max-w-6xl">
          {/* Recherche rapide alphabétique */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#04163a] mb-6 text-center">
              Recherche rapide
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {CITIES.sort((a, b) => a.nameCapitalized.localeCompare(b.nameCapitalized)).map((city) => (
                <button
                  key={city.slug}
                  onClick={() => handleCitySelect(city.slug)}
                  disabled={selectedCity === city.slug}
                  className={`group relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 ${
                    selectedCity === city.slug
                      ? 'border-[#6BCFCF] bg-[#6BCFCF]/10 cursor-wait'
                      : 'border-[#E3E5E8] bg-white hover:border-[#6BCFCF]/40 hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold transition-colors ${
                      selectedCity === city.slug ? 'text-[#2B7A78]' : 'text-[#04163a] group-hover:text-[#2B7A78]'
                    }`}>
                      {city.nameCapitalized}
                    </span>
                    {selectedCity === city.slug ? (
                      <svg className="h-5 w-5 text-[#2B7A78] animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-[#4b5c6b] group-hover:text-[#2B7A78] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Par région */}
          <div className="space-y-12">
            <h2 className="text-2xl font-bold text-[#04163a] text-center">
              Ou parcourez par région
            </h2>
            
            {regions.map((region) => {
              const cities = citiesByRegion[region];
              return (
                <div key={region} className="space-y-6">
                  <h3 className="text-xl font-semibold text-[#04163a] border-b-2 border-[#6BCFCF]/30 pb-2">
                    {region}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cities.map((city) => (
                      <button
                        key={city.slug}
                        onClick={() => handleCitySelect(city.slug)}
                        disabled={selectedCity === city.slug}
                        className={`group relative overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300 ${
                          selectedCity === city.slug
                            ? 'border-[#6BCFCF] bg-[#6BCFCF]/10 cursor-wait'
                            : 'border-[#E3E5E8] bg-white hover:border-[#6BCFCF]/40 hover:shadow-xl hover:-translate-y-2'
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6BCFCF]/0 to-[#4FB8B8]/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                        
                        <div className="relative flex items-start gap-4">
                          <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
                            selectedCity === city.slug
                              ? 'bg-[#6BCFCF]/20 border-[#6BCFCF] text-[#2B7A78]'
                              : 'bg-gradient-to-br from-[#6BCFCF]/20 to-[#4FB8B8]/30 border-[#6BCFCF]/30 text-[#2B7A78] group-hover:scale-110 group-hover:rotate-3'
                          }`}>
                            {selectedCity === city.slug ? (
                              <svg className="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            )}
                          </div>

                          <div className="flex-1">
                            <h4 className={`text-xl font-bold mb-1 transition-colors ${
                              selectedCity === city.slug ? 'text-[#2B7A78]' : 'text-[#04163a] group-hover:text-[#2B7A78]'
                            }`}>
                              {city.nameCapitalized}
                            </h4>
                            <p className="text-sm text-[#4b5c6b] leading-relaxed">
                              {city.description}
                            </p>
                          </div>

                          {selectedCity !== city.slug && (
                            <svg className="h-6 w-6 text-[#4b5c6b] group-hover:text-[#2B7A78] group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </div>
                      </button>
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
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            Votre ville n'est pas dans la liste ?
          </h2>
          <p className="text-base text-white/75 max-w-2xl mx-auto">
            Nous ajoutons régulièrement de nouvelles villes. Contactez-nous pour être informé de l'ouverture dans votre région.
          </p>
          <a
            href="/contact/"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 text-base font-medium text-white hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            <span>Nous contacter</span>
            <span className="text-lg">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
