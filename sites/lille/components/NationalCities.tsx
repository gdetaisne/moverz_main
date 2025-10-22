"use client";
import Link from "next/link";

export default function NationalCities() {
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
    <section className="py-20 bg-gradient-to-br from-[#04163a] via-[#2b7a78]/10 to-[#04163a]">
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Nos sites dédiés par ville
          </h2>
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Chaque ville a son propre site avec des informations localisées, 
            des déménageurs locaux et des tarifs adaptés à votre région.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {nationalCities.map((city) => (
            <a
              key={city.href}
              href={city.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-[#6bcfcf]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6bcfcf]/10 to-[#2b7a78]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-4 text-center">
                {/* City icon */}
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#6bcfcf] to-[#2b7a78] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <span className="text-lg">🏙️</span>
                </div>
                
                {/* City name */}
                <h3 className="text-base font-semibold text-white group-hover:text-[#6bcfcf] transition-colors">
                  {city.name}
                </h3>
                
                {/* Subtle indicator */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-1 h-1 bg-[#6bcfcf] rounded-full mx-auto"></div>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-[#2b7a78] px-6 py-3 text-white font-semibold hover:bg-[#2b7a78]/90 hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Découvrir tous nos services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
