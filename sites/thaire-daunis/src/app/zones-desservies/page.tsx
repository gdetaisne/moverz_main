"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/Section";

// Les données seront injectées depuis le JSON
const quartiers = [
  {
    nom: "Centre-Bourg",
    slug: "centre-bourg-thaire",
    codePostal: "17290",
    description: "Cœur du village, commerces et services de proximité",
    contraintes: "Rues étroites dans le centre historique",
    stats: {
      dossiers: "30+",
      demenageurs: "5+",
      delai: "3-5 jours"
    }
  },
  {
    nom: "La Rochelle",
    slug: "la-rochelle",
    codePostal: "17000",
    description: "Grande ville proche, port historique, centre-ville dynamique",
    contraintes: "Trafic dense, zones piétonnes, stationnement payant",
    stats: {
      dossiers: "500+",
      demenageurs: "25+",
      delai: "5-7 jours"
    }
  },
  {
    nom: "Aigrefeuille-d'Aunis",
    slug: "aigrefeuille-daunis",
    codePostal: "17290",
    description: "Commune voisine, cadre résidentiel calme",
    contraintes: "Accès facile, peu de contraintes",
    stats: {
      dossiers: "40+",
      demenageurs: "6+",
      delai: "3-5 jours"
    }
  },
  {
    nom: "Surgères",
    slug: "surgeres",
    codePostal: "17700",
    description: "Ville dynamique de Charente-Maritime",
    contraintes: "Accès facile, stationnement disponible",
    stats: {
      dossiers: "80+",
      demenageurs: "10+",
      delai: "4-6 jours"
    }
  },
  {
    nom: "Rochefort",
    slug: "rochefort",
    codePostal: "17300",
    description: "Ville historique maritime",
    contraintes: "Centre-ville dense, zones piétonnes",
    stats: {
      dossiers: "200+",
      demenageurs: "15+",
      delai: "5-7 jours"
    }
  },
  {
    nom: "Saintes",
    slug: "saintes",
    codePostal: "17100",
    description: "Ville d'art et d'histoire",
    contraintes: "Centre historique avec rues étroites",
    stats: {
      dossiers: "250+",
      demenageurs: "18+",
      delai: "5-7 jours"
    }
  },
];

const destinations = [
  {
    nom: "Thairé d'Aunis vers La Rochelle",
    slug: "thaire-daunis-vers-la-rochelle",
    distance: "15 km",
    duree: "20-30 min",
    prix_moyen: "300-500€"
  },
  {
    nom: "Thairé d'Aunis vers Bordeaux",
    slug: "thaire-daunis-vers-bordeaux",
    distance: "180 km",
    duree: "2-3h",
    prix_moyen: "600-1000€"
  },
  {
    nom: "Thairé d'Aunis vers Nantes",
    slug: "thaire-daunis-vers-nantes",
    distance: "150 km",
    duree: "1h45-2h30",
    prix_moyen: "550-900€"
  },
];

export default function ZonesDesserviesPage() {
  const [activeTab, setActiveTab] = useState<"quartiers" | "destinations">("quartiers");

  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=2000&auto=format&fit=crop"
            alt="Zones desservies à Thairé d'Aunis"
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
                { label: "Zones desservies", href: "/zones-desservies" }
              ]}
            />
            <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Zones desservies depuis Thairé d'Aunis
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Découvrez tous les quartiers et destinations que nous couvrons pour vos déménagements.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <Section>
        <div className="container">
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("quartiers")}
              className={`px-6 py-3 rounded-2xl font-medium transition duration-300 ${
                activeTab === "quartiers"
                  ? "bg-[#6bcfcf] text-[#04163a]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              Quartiers locaux
            </button>
            <button
              onClick={() => setActiveTab("destinations")}
              className={`px-6 py-3 rounded-2xl font-medium transition duration-300 ${
                activeTab === "destinations"
                  ? "bg-[#6bcfcf] text-[#04163a]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              Destinations longue distance
            </button>
          </div>

          {/* Quartiers */}
          {activeTab === "quartiers" && (
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 text-center">
                Quartiers de Thairé d'Aunis et environs
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quartiers.map((quartier) => (
                  <div
                    key={quartier.slug}
                    id={quartier.slug}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#6bcfcf]/50 transition duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {quartier.nom}
                        </h3>
                        <p className="text-[#6bcfcf] text-sm">{quartier.codePostal}</p>
                      </div>
                    </div>

                    <p className="text-white/80 text-sm mb-4">
                      {quartier.description}
                    </p>

                    {quartier.contraintes && (
                      <div className="mb-4 p-3 bg-white/5 rounded-xl">
                        <p className="text-white/70 text-xs">
                          <span className="font-medium text-white">Contraintes :</span> {quartier.contraintes}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white/5 rounded-xl p-2">
                        <div className="text-[#6bcfcf] font-bold text-lg">
                          {quartier.stats.dossiers}
                        </div>
                        <div className="text-white/60 text-xs">Dossiers</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-2">
                        <div className="text-[#6bcfcf] font-bold text-lg">
                          {quartier.stats.demenageurs}
                        </div>
                        <div className="text-white/60 text-xs">Déménageurs</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-2">
                        <div className="text-[#6bcfcf] font-bold text-lg">
                          {quartier.stats.delai}
                        </div>
                        <div className="text-white/60 text-xs">Délai</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Destinations */}
          {activeTab === "destinations" && (
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 text-center">
                Destinations longue distance depuis Thairé d'Aunis
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((destination) => (
                  <div
                    key={destination.slug}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#6bcfcf]/50 transition duration-300"
                  >
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {destination.nom}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#2b7a78]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-[#6bcfcf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-white/60 text-xs">Distance</div>
                          <div className="text-white font-medium">{destination.distance}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#2b7a78]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-[#6bcfcf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-white/60 text-xs">Durée</div>
                          <div className="text-white font-medium">{destination.duree}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#2b7a78]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-[#6bcfcf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-white/60 text-xs">Prix moyen</div>
                          <div className="text-white font-medium">{destination.prix_moyen}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-white/5">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Votre zone n'est pas listée ?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Contactez-nous pour vérifier si nous pouvons couvrir votre déménagement.
          </p>
          <a
            href="/inventaire-ia/"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#2b7a78] px-6 text-sm font-medium text-white shadow-marketing-xl hover:brightness-110 transition duration-300"
          >
            3+ devis gratuis
          </a>
        </div>
      </Section>
    </main>
  );
}

