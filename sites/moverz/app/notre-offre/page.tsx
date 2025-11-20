import type { Metadata } from "next";
import ComparisonSection from "@/components/ComparisonSection";

export const metadata: Metadata = {
  title: "Notre offre — Moverz",
  description:
    "Découvrez les 4 garanties Moverz : devis comparables, pros contrôlés, dossier anonyme, 100% gratuit. Le comparateur anti-arnaque pour votre déménagement.",
  alternates: {
    canonical: 'https://moverz.fr/notre-offre/',
  },
};

export default function NotreOffrePage() {
  return (
    <main className="bg-hero min-h-screen">
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
            Le comparateur anti-arnaque
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Notre{" "}
            <span className="bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] bg-clip-text text-transparent">
              promesse
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
            Un seul dossier, des déménageurs contrôlés, des devis vraiment comparables.
          </p>
        </div>

        {/* Les 4 garanties */}
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              Nos 4 garanties
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Ce qui nous différencie
            </h2>
          </div>

          <ComparisonSection />
        </div>

        {/* Section détaillée */}
        <div className="mt-24 space-y-16">
          {/* Garantie 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#6BCFCF]/30 bg-[#6BCFCF]/10 px-4 py-1 text-sm font-medium text-[#6BCFCF]">
                Garantie #1
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                5+ déménageurs contrôlés
              </h3>
              <p className="text-lg text-white/75 leading-relaxed">
                Nous vérifions la solidité financière de chaque déménageur : assurances à jour, 
                historique de litiges, avis clients vérifiés. Seuls les pros fiables reçoivent votre dossier.
              </p>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-[#6BCFCF] mt-1">✓</span>
                  <span>Solvabilité vérifiée (BODACC, Infogreffe)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6BCFCF] mt-1">✓</span>
                  <span>Assurances professionnelles à jour</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6BCFCF] mt-1">✓</span>
                  <span>Historique de litiges analysé (0 litige toléré)</span>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 h-full flex items-center justify-center">
              <div className="text-6xl">🛡️</div>
            </div>
          </div>

          {/* Garantie 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 h-full flex items-center justify-center order-2 md:order-1">
              <div className="text-6xl">🎯</div>
            </div>
            <div className="space-y-4 order-1 md:order-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#6BCFCF]/30 bg-[#6BCFCF]/10 px-4 py-1 text-sm font-medium text-[#6BCFCF]">
                Garantie #2
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Devis vraiment comparables
              </h3>
              <p className="text-lg text-white/75 leading-relaxed">
                Notre IA crée UN inventaire unique à partir de vos photos ou infos. 
                Tous les déménageurs chiffrent le MÊME volume et les MÊMES options. 
                Vous comparez enfin ce qui est comparable.
              </p>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-[#6BCFCF] mt-1">✓</span>
                  <span>Volume figé (ex: 28 m³) pour tous les pros</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6BCFCF] mt-1">✓</span>
                  <span>Options standardisées (emballage, déballage, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6BCFCF] mt-1">✓</span>
                  <span>Pas de différence cachée entre les devis</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Garantie 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#6BCFCF]/30 bg-[#6BCFCF]/10 px-4 py-1 text-sm font-medium text-[#6BCFCF]">
                Garantie #3
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                100% gratuit, sans engagement
              </h3>
              <p className="text-lg text-white/75 leading-relaxed">
                Le comparateur est entièrement gratuit pour vous. Aucuns frais cachés, 
                aucune obligation. Comparez en toute liberté, décidez sans pression.
              </p>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-[#6BCFCF] mt-1">✓</span>
                  <span>Créer un dossier : gratuit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6BCFCF] mt-1">✓</span>
                  <span>Recevoir 5+ devis : gratuit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6BCFCF] mt-1">✓</span>
                  <span>Comparer et choisir : gratuit</span>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 h-full flex items-center justify-center">
              <div className="text-6xl">🆓</div>
            </div>
          </div>

          {/* Garantie 4 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 h-full flex items-center justify-center order-2 md:order-1">
              <div className="text-6xl">🚫</div>
            </div>
            <div className="space-y-4 order-1 md:order-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#6BCFCF]/30 bg-[#6BCFCF]/10 px-4 py-1 text-sm font-medium text-[#6BCFCF]">
                Garantie #4
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Sans harcèlement téléphonique
              </h3>
              <p className="text-lg text-white/75 leading-relaxed">
                Votre dossier reste anonyme jusqu'à ce que vous décidiez de donner votre contact. 
                Zéro appel intempestif, tout se passe par email.
              </p>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-[#6BCFCF] mt-1">✓</span>
                  <span>Dossier anonyme par défaut</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6BCFCF] mt-1">✓</span>
                  <span>Vous choisissez qui peut vous contacter</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#6BCFCF] mt-1">✓</span>
                  <span>Aucun numéro partagé sans votre accord</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#04163A] via-[#05243f] to-[#0b3b46] p-8 md:p-12 text-center shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
            <div className="relative space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Prêt à comparer sereinement ?
              </h2>
              <p className="text-lg text-white/75 max-w-2xl mx-auto">
                Créez votre dossier en 5 minutes et recevez 5+ devis fiables sous 7 jours.
              </p>
              <a 
                href="/choisir-ville/" 
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg font-semibold text-[#04141f] hover:scale-105 transition-transform duration-300"
              >
                <span>Comparez 5+ devis gratuitement</span>
                <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

