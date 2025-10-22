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

  return (
    <div>
      {/* Local Zones Section */}
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
  );
}