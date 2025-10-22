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
    { name: "Bordeaux", href: "/bordeaux" },
    { name: "Lyon", href: "/lyon" },
    { name: "Toulouse", href: "/toulouse" },
    { name: "Nantes", href: "/nantes" },
    { name: "Lille", href: "/lille" },
    { name: "Marseille", href: "/marseille" },
    { name: "Strasbourg", href: "/strasbourg" },
    { name: "Rennes", href: "/rennes" },
    { name: "Nice", href: "/nice" },
    { name: "Montpellier", href: "/montpellier" }
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
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Zones couvertes Nationales
        </h2>
        <p className="text-center text-white/80 mb-12 text-lg">
          Chaque ville possède son site dédié avec des informations localisées
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {nationalCities.map((city) => (
            <Link
              key={city.href}
              href={city.href}
              className="card-glass rounded-xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
            >
              <div className="text-3xl mb-3">🏙️</div>
              <p className="text-white font-semibold text-lg group-hover:text-[#6bcfcf] transition-colors">
                {city.name}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full bg-white/10 border border-white/20 px-6 py-3 text-white font-medium hover:bg-white/20 transition-all duration-300"
          >
            Voir toutes les zones
          </Link>
        </div>
      </div>
    </div>
  );
}

