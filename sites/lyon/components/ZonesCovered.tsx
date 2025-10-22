"use client";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function ZonesCovered() {
  const localZones = [
    { name: "Capitole", href: "/toulouse/capitole", city: "Toulouse" },
    { name: "Saint-Cyprien", href: "/toulouse/saint-cyprien", city: "Toulouse" },
    { name: "Carmes", href: "/toulouse/carmes", city: "Toulouse" },
    { name: "Jean Jaurès", href: "/toulouse/jean-jaures", city: "Toulouse" },
    { name: "Compans", href: "/toulouse/compans", city: "Toulouse" }
  ];

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2b7a78]/5 to-transparent rounded-3xl -z-10" />
      
      {/* Header with improved layout */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Zones couvertes à Toulouse
          </h2>
          <p className="text-white/70 text-lg">
            Des déménageurs locaux certifiés dans votre quartier
          </p>
        </div>
        <Link
          href="/toulouse"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#2b7a78] hover:border-[#2b7a78] transition-all duration-300 hover:scale-105 group whitespace-nowrap"
        >
          <span className="font-semibold">Voir tous les quartiers</span>
          <svg 
            className="w-4 h-4 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Zone cards with enhanced design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {localZones.map((zone, index) => (
          <Link
            key={zone.href}
            href={zone.href}
            className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-[#6bcfcf]/50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6bcfcf]/10 to-[#2b7a78]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative p-5">
              {/* Icon */}
              <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#6bcfcf]/20 to-[#2b7a78]/20 group-hover:from-[#6bcfcf]/30 group-hover:to-[#2b7a78]/30 transition-all duration-300">
                <MapPin className="w-5 h-5 text-[#6bcfcf]" />
              </div>
              
              {/* Zone name */}
              <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#6bcfcf] transition-colors">
                {zone.name}
              </h3>
              
              {/* Subtitle */}
              <p className="text-white/60 text-sm">
                Déménageurs locaux
              </p>

              {/* Arrow indicator */}
              <div className="mt-3 flex items-center text-[#6bcfcf] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                <span className="text-sm font-medium">Voir les prix</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}