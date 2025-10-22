"use client";
import Link from "next/link";

export default function ZonesCovered() {
  const localZones = [
    { name: "Capitole", href: "/toulouse/capitole", city: "Toulouse" },
    { name: "Saint-Cyprien", href: "/toulouse/saint-cyprien", city: "Toulouse" },
    { name: "Carmes", href: "/toulouse/carmes", city: "Toulouse" },
    { name: "Jean Jaurès", href: "/toulouse/jean-jaures", city: "Toulouse" },
    { name: "Compans", href: "/toulouse/compans", city: "Toulouse" }
  ];

  const nationalCities = [
    { name: "Bordeaux", href: "https://www.bordeaux-demenageur.fr" },
    { name: "Lille", href: "https://devis-demenageur-lille.fr" },
    { name: "Lyon", href: "https://devis-demenageur-lyon.fr" },
    { name: "Marseille", href: "https://devis-demenageur-marseille.fr" },
    { name: "Montpellier", href: "https://devis-demenageur-montpellier.fr" },
    { name: "Nantes", href: "https://devis-demenageur-nantes.fr" },
    { name: "Nice", href: "https://devis-demenageur-nice.fr" },
    { name: "Rennes", href: "https://devis-demenageur-rennes.fr" },
    { name: "Rouen", href: "https://devis-demenageur-rouen.fr" },
    { name: "Strasbourg", href: "https://devis-demenageur-strasbourg.fr" },
    { name: "Toulouse", href: "https://devis-demenageur-toulousain.fr" }
  ];

  return (
    <div className="space-y-16">
      {/* Local Zones Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Zones couvertes
          </h2>
          <Link
            href="/toulouse"
            className="text-white hover:text-[#6bcfcf] transition-colors underline"
          >
            Voir tous les quartiers
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {localZones.map((zone) => (
            <Link
              key={zone.href}
              href={zone.href}
              className="card-glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
            >
              <p className="text-white font-semibold text-lg group-hover:text-[#6bcfcf] transition-colors">
                {zone.name}
              </p>
              <p className="text-white/70 text-sm mt-1">
                Déménageurs locaux
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* National Zones Section */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nos sites dédiés par ville
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Chaque ville a son propre site avec des informations localisées, 
            des déménageurs locaux et des tarifs adaptés à votre région.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nationalCities.map((city) => (
            <Link
              key={city.href}
              href={city.href}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-[#6bcfcf]/50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2b7a78]/10 to-[#6bcfcf]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-6">
                {/* City icon with gradient */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#6bcfcf] to-[#2b7a78] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <span className="text-2xl">🏙️</span>
                </div>
                
                {/* City name */}
                <h3 className="text-xl font-bold text-white text-center mb-2 group-hover:text-[#6bcfcf] transition-colors">
                  {city.name}
                </h3>
                
                {/* Description */}
                <p className="text-white/70 text-sm text-center mb-4">
                  Déménageurs certifiés
                </p>
                
                {/* Arrow indicator */}
                <div className="flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#6bcfcf] group-hover:text-[#04163a] transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-[#2b7a78] px-8 py-4 text-white font-semibold hover:bg-[#2b7a78]/90 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Découvrir tous nos services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

