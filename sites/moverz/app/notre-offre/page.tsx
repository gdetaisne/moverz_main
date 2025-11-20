import type { Metadata } from "next";
import { getFullMetadata } from "@/lib/canonical-helper";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = getFullMetadata(
  'notre-offre',
  "Notre offre — Moverz",
  "Découvrez les 4 garanties Moverz : déménageurs contrôlés, devis comparables, service gratuit et sans harcèlement téléphonique."
);

export default function NotreOffrePage() {
  const guarantees = [
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "5+ déménageurs contrôlés",
      description:
        "Solidité financière vérifiée + Historique litiges analysé. Seuls les pros fiables reçoivent votre dossier.",
      details: [
        "Vérification de la solvabilité financière",
        "Analyse de l'historique des litiges",
        "Contrôle des assurances professionnelles",
        "Validation des avis clients authentiques"
      ]
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Devis vraiment comparables",
      description:
        "L'IA crée UN inventaire unique → tous chiffrent le même volume. Fini les devis incomparables.",
      details: [
        "Un seul inventaire standardisé pour tous",
        "Même volume et mêmes options à chiffrer",
        "Élimination des variations d'interprétation",
        "Comparaison directe prix/prestations"
      ]
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "100% gratuit, sans engagement",
      description:
        "Comparez en toute liberté, décidez sans pression. Pas de frais cachés, pas de piège.",
      details: [
        "Service totalement gratuit pour vous",
        "Aucun frais caché",
        "Aucun engagement requis",
        "Vous décidez librement"
      ]
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
      title: "Sans harcèlement téléphonique",
      description:
        "Zéro appel intempestif, vous recevez tout par email. Vous gardez le contrôle total de vos échanges.",
      details: [
        "Dossier anonyme jusqu'à votre choix",
        "Communication par email uniquement",
        "Vous décidez qui contacter et quand",
        "Pas de relances téléphoniques"
      ]
    },
  ];

  return (
    <main className="bg-hero min-h-screen">
      <div className="halo" />
      
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516542076529-1ea3854896e1?q=80&w=2000&auto=format&fit=crop"
            alt="Notre offre"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#04163a]/95 via-[#2b7a78]/88 to-[#04163a]/92"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Notre offre", href: "/notre-offre/" }
            ]}
          />
          <h1 className="text-3xl md:text-5xl font-bold mt-6">Notre offre</h1>
          <p className="text-white/85 mt-3 max-w-3xl">
            4 garanties pour comparer vos devis de déménagement en toute sérénité.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container max-w-6xl">
          <div className="space-y-12">
            {guarantees.map((guarantee, index) => (
              <div
                key={guarantee.title}
                className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white via-[#F8F9FA] to-[#F0F4F8] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-500 ${
                  index % 2 === 0 ? 'hover:-translate-y-2' : 'hover:translate-y-2'
                }`}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6BCFCF]/5 to-[#4FB8B8]/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6BCFCF]/20 to-[#4FB8B8]/30 border-2 border-[#6BCFCF]/30 text-[#2B7A78] transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-[0_0_30px_rgba(107,207,207,0.4)]">
                        {guarantee.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <h2 className="text-2xl md:text-3xl font-bold text-[#04163a]">
                        {guarantee.title}
                      </h2>
                      <p className="text-lg text-[#4b5c6b] leading-relaxed">
                        {guarantee.description}
                      </p>

                      {/* Details list */}
                      <ul className="space-y-3 mt-6">
                        {guarantee.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-3">
                            <svg 
                              className="h-6 w-6 flex-shrink-0 text-[#2B7A78] mt-0.5" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-[#04163a] leading-relaxed">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-contrast">
        <div className="container max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Prêt à comparer vos devis ?
          </h2>
          <p className="text-lg text-white/75 max-w-2xl mx-auto">
            Lancez le comparateur en quelques clics et recevez des offres fiables, sans engagement.
          </p>
          <a
            href="/choisir-ville/"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg font-semibold text-[#04141f] shadow-[0_8px_30px_rgba(107,207,207,0.35)] hover:shadow-[0_12px_50px_rgba(107,207,207,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <span className="relative">Comparez 5+ devis gratuitement</span>
            <span className="relative text-xl leading-none group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
