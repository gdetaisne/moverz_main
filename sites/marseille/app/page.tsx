import type { Metadata } from "next";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";
import Hero from "@/components/Hero";
import ValueTriad from "@/components/ValueTriad";
import HowItWorks from "@/components/HowItWorks";
import PhotoGuidelines from "@/components/PhotoGuidelines";
import PricingPreview from "@/components/PricingPreview";
import Testimonials from "@/components/Testimonials";
import NeighborhoodsTeaser from "@/components/NeighborhoodsTeaser";
import StickyCTA from "@/components/StickyCTA";
import LocalMoneyFAQ from "@/components/LocalMoneyFAQ";

export const metadata: Metadata = (() => {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    title: `Déménagement ${city.nameCapitalized} — 5 Devis IA Comparables Gratuits`,
    description:
      `Déménagez à ${city.nameCapitalized} dès 280€. IA analyse vos photos → 5 devis comparables sous 7j. Gratuit, sans appels. 1200+ clients ⭐4.9/5`,
  };
})();

export default function Home() {
  const city = getCityDataFromUrl(env.SITE_URL);
  
  return (
    <main className="bg-hero">
      <div className="halo" />
      
      {/* 1. Hero (inclut déjà social proof) */}
      <Hero />

      {/* 2. Comment ça marche */}
      <section className="section py-16 md:py-20">
        <div className="container">
          <HowItWorks />
        </div>
      </section>
      
      {/* 3. Testimonials - Preuve sociale */}
      <section className="section py-16 md:py-20 bg-gradient-to-br from-[#2b7a78]/15 to-[#04163a]/30 border-y border-white/20">
        <div className="container">
          <Testimonials />
        </div>
      </section>

      {/* 4. Pourquoi Moverz - Différenciation + Garanties */}
      <section className="section py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
              Pourquoi choisir Moverz ?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg">
              La première plateforme qui compare vraiment les devis de déménagement
            </p>
          </div>

          {/* Différenciation */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="card-glass rounded-2xl p-8 md:p-10 border-2 border-[#6bcfcf]/30 bg-gradient-to-br from-[#6bcfcf]/5 to-transparent">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6bcfcf]/20 to-[#2b7a78]/20 mb-4">
                  <span className="text-5xl">💡</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  La différence Moverz
                </h3>
                <p className="text-[#6bcfcf] font-medium">
                  Enfin des devis vraiment comparables
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">✗</div>
                  <div>
                    <div className="text-white/60 font-medium text-sm mb-1">Comparateurs classiques</div>
                    <div className="text-white/50 text-sm">Chaque déménageur estime son propre volume</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#6bcfcf]/20 flex items-center justify-center text-[#6bcfcf]">✓</div>
                  <div>
                    <div className="text-white font-medium text-sm mb-1">Avec Moverz IA</div>
                    <div className="text-white/80 text-sm">Tous chiffrent le <strong className="text-[#6bcfcf]">même volume exact</strong></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-white/70 text-sm">
                  🎯 Résultat : <span className="text-white font-semibold">Comparaison fiable à 100%</span>, plus de pommes vs oranges
                </p>
              </div>
            </div>
          </div>

          {/* Chiffres clés - AMPLIFIÉS */}
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            <div className="card-glass rounded-3xl p-8 text-center border-2 border-[#6bcfcf]/30 bg-gradient-to-br from-[#6bcfcf]/10 to-transparent hover:border-[#6bcfcf]/50 hover:scale-105 transition-all duration-300">
              <div className="text-5xl md:text-6xl font-black text-[#6bcfcf] mb-3 drop-shadow-[0_0_10px_rgba(107,207,207,0.5)]">90%</div>
              <div className="text-white font-medium text-sm md:text-base">Précision estimation IA</div>
            </div>
            <div className="card-glass rounded-3xl p-8 text-center border-2 border-[#6bcfcf]/30 bg-gradient-to-br from-[#6bcfcf]/10 to-transparent hover:border-[#6bcfcf]/50 hover:scale-105 transition-all duration-300">
              <div className="text-5xl md:text-6xl font-black text-[#6bcfcf] mb-3 drop-shadow-[0_0_10px_rgba(107,207,207,0.5)]">5</div>
              <div className="text-white font-medium text-sm md:text-base">Devis comparables</div>
            </div>
            <div className="card-glass rounded-3xl p-8 text-center border-2 border-[#6bcfcf]/30 bg-gradient-to-br from-[#6bcfcf]/10 to-transparent hover:border-[#6bcfcf]/50 hover:scale-105 transition-all duration-300">
              <div className="text-5xl md:text-6xl font-black text-[#6bcfcf] mb-3 drop-shadow-[0_0_10px_rgba(107,207,207,0.5)]">7j</div>
              <div className="text-white font-medium text-sm md:text-base">Délai de réponse</div>
            </div>
            <div className="card-glass rounded-3xl p-8 text-center border-2 border-[#6bcfcf]/30 bg-gradient-to-br from-[#6bcfcf]/10 to-transparent hover:border-[#6bcfcf]/50 hover:scale-105 transition-all duration-300">
              <div className="text-5xl md:text-6xl font-black text-[#6bcfcf] mb-3 drop-shadow-[0_0_10px_rgba(107,207,207,0.5)]">0€</div>
              <div className="text-white font-medium text-sm md:text-base">Service 100% gratuit</div>
            </div>
          </div>

          {/* Garanties intégrées */}
          <div>
            <ValueTriad />
          </div>
        </div>
      </section>

      {/* 5. Tarifs indicatifs */}
      <section className="section py-16 md:py-20 bg-gradient-to-br from-[#2b7a78]/25 to-[#6bcfcf]/10 border-y border-[#6bcfcf]/20">
        <div className="container">
          <PricingPreview />
        </div>
      </section>

      {/* 6. Objection Handling */}
      <section className="section py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
              Pourquoi ne pas déménager seul ?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg">
              Comparez les avantages avant de décider
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* DIY */}
            <div className="card-glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">🚗</span>
                Déménagement seul
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-green-400 text-xl mt-1">✓</div>
                  <div>
                    <div className="text-white font-medium">Économie apparente</div>
                    <div className="text-white/70 text-sm">Location camion ~150€</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-red-400 text-xl mt-1">✗</div>
                  <div>
                    <div className="text-white font-medium">Risques élevés</div>
                    <div className="text-white/70 text-sm">Blessures, casse, fatigue</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-red-400 text-xl mt-1">✗</div>
                  <div>
                    <div className="text-white font-medium">Temps important</div>
                    <div className="text-white/70 text-sm">2-3 jours minimum</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-red-400 text-xl mt-1">✗</div>
                  <div>
                    <div className="text-white font-medium">Aucune assurance pro</div>
                    <div className="text-white/70 text-sm">Casse à vos frais</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro avec Moverz */}
            <div className="card-glass rounded-2xl p-8 border-2 border-[#6bcfcf]">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">🚚</span>
                Avec Moverz (dès 280€)
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-[#6bcfcf] text-xl mt-1">✓</div>
                  <div>
                    <div className="text-white font-medium">Prix transparent</div>
                    <div className="text-white/70 text-sm">5 devis comparables</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[#6bcfcf] text-xl mt-1">✓</div>
                  <div>
                    <div className="text-white font-medium">Zéro risque</div>
                    <div className="text-white/70 text-sm">Pros assurés + formés</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[#6bcfcf] text-xl mt-1">✓</div>
                  <div>
                    <div className="text-white font-medium">Gain de temps</div>
                    <div className="text-white/70 text-sm">Fini en 1 journée</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[#6bcfcf] text-xl mt-1">✓</div>
                  <div>
                    <div className="text-white font-medium">Assurance tous risques</div>
                    <div className="text-white/70 text-sm">Casse couverte</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a href="/inventaire-ia/" className="btn-primary">
              Comparer 5 devis maintenant
            </a>
            <p className="text-white/60 text-sm mt-4">
              ou <a href="/estimation-rapide/" className="text-[#6bcfcf] underline hover:text-[#6bcfcf]/80">estimation rapide sans photos</a> (30 secondes)
            </p>
          </div>
        </div>
      </section>

      {/* 7. FAQ locales */}
      <section className="py-12 md:py-16">
        <LocalMoneyFAQ citySlug="nice" cityName="Nice" />
      </section>

      {/* 8. Guides photos */}
      <section className="section py-16 md:py-20 bg-gradient-to-br from-[#04163a]/60 to-[#2b7a78]/20 border-y border-white/20">
        <div className="container">
          <PhotoGuidelines />
        </div>
      </section>

      {/* 9. Zones couvertes */}
      <section className="section py-16 md:py-20">
        <div className="container">
          <NeighborhoodsTeaser />
        </div>
      </section>

      {/* 10. Ressources SEO - Maillage interne */}
      <section className="section py-16 md:py-20 bg-gradient-to-br from-[#2b7a78]/15 to-[#6bcfcf]/10 border-y border-white/20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
              Tout pour préparer votre déménagement
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-base md:text-lg">
              Guides pratiques, informations tarifaires et conseils d'experts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Services */}
            <div className="card-glass rounded-2xl p-8 hover:border-[#6bcfcf]/50 transition-colors">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-white mb-4">Nos formules</h3>
              <p className="text-white/70 text-sm mb-6">
                Comparez nos 3 formules de déménagement adaptées à tous les budgets
              </p>
              <div className="space-y-3">
                <a href="/services/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors text-sm font-medium">
                  → Comparer les formules
                </a>
                <a href={`/services/demenagement-economique-${city.slug}/`} className="block text-white/70 hover:text-white transition-colors text-sm">
                  Économique (dès 280€)
                </a>
                <a href={`/services/demenagement-standard-${city.slug}/`} className="block text-white/70 hover:text-white transition-colors text-sm">
                  Standard (dès 600€)
                </a>
              </div>
            </div>

            {/* Guides */}
            <div className="card-glass rounded-2xl p-8 hover:border-[#6bcfcf]/50 transition-colors">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-white mb-4">Guides & conseils</h3>
              <p className="text-white/70 text-sm mb-6">
                Tous nos articles pour bien préparer et organiser votre déménagement
              </p>
              <div className="space-y-3">
                <a href="/blog/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors text-sm font-medium">
                  → Voir tous les guides
                </a>
                <a href="/blog/cartons-demenagement/" className="block text-white/70 hover:text-white transition-colors text-sm">
                  Combien de cartons ?
                </a>
                <a href="/blog/prix-demenagement-2025/" className="block text-white/70 hover:text-white transition-colors text-sm">
                  Prix 2025
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="card-glass rounded-2xl p-8 hover:border-[#6bcfcf]/50 transition-colors">
              <div className="text-4xl mb-4">❓</div>
              <h3 className="text-xl font-semibold text-white mb-4">Questions fréquentes</h3>
              <p className="text-white/70 text-sm mb-6">
                Toutes les réponses aux questions que vous vous posez
              </p>
              <div className="space-y-3">
                <a href="/faq/" className="block text-[#6bcfcf] hover:text-[#6bcfcf]/80 transition-colors text-sm font-medium">
                  → Voir toutes les FAQ
                </a>
                <a href="/estimation-rapide/" className="block text-white/70 hover:text-white transition-colors text-sm">
                  Estimation rapide
                </a>
                <a href={`/quartiers-${city.slug}/`} className="block text-white/70 hover:text-white transition-colors text-sm">
                  Quartiers {city.nameCapitalized}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StickyCTA />
    </main>
  );
}


