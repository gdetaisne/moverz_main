import type { Metadata } from "next";
import CitiesGrid from "@/components/CitiesGrid";

export const metadata: Metadata = {
  title: "Nos 11 villes couvertes en France — Moverz",
  description:
    "Moverz couvre 11 grandes villes françaises : Nice, Lyon, Marseille, Toulouse, Bordeaux, Lille, Strasbourg, Nantes, Rennes, Rouen, Montpellier. Comparez 5+ devis de déménageurs contrôlés.",
  alternates: {
    canonical: 'https://moverz.fr/villes/',
  },
};

export default function VillesPage() {
  return (
    <main className="bg-hero">
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
            Expansion progressive en France
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            11 grandes villes{" "}
            <span className="bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] bg-clip-text text-transparent">
              couvertes
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
            Moverz vous permet de comparer des devis de déménageurs contrôlés dans 11 grandes villes françaises. 
            D'autres villes seront ajoutées prochainement.
          </p>
        </div>
      </div>

      {/* Grille des villes */}
      <CitiesGrid />

      {/* Section d'expansion future */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
            <div className="relative space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Votre ville n'est pas encore couverte ?
              </h2>
              <p className="text-white/75 max-w-xl mx-auto leading-relaxed">
                Nous ajoutons régulièrement de nouvelles villes. Contactez-nous pour nous faire part de votre intérêt.
              </p>
              <a 
                href="/contact/" 
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-6 py-3 text-base font-semibold text-[#04141f] hover:scale-105 transition-transform duration-300"
              >
                <span>Contactez-nous</span>
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

