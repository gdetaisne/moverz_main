import type { Metadata } from "next";
import HowItWorks from "@/components/HowItWorks";
import ValueTriad from "@/components/ValueTriad";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Comment ça marche — Comparateur Déménagement | Moverz",
  description:
    "Découvrez le fonctionnement de Moverz : créez votre dossier unique, nous filtrons les déménageurs, vous comparez 5+ devis fiables. Simple, rapide et gratuit.",
  alternates: {
    canonical: 'https://moverz.fr/comment-ca-marche/',
  },
};

export default function CommentCaMarchePage() {
  const detailedFaq = [
    {
      q: "Comment l'IA analyse-t-elle mon volume ?",
      a: "Notre IA analyse les photos de vos pièces et meubles pour estimer précisément votre volume en m³. Ce volume figé est ensuite transmis à tous les déménageurs, garantissant des devis comparables.",
    },
    {
      q: "Comment les déménageurs sont-ils contrôlés ?",
      a: "Nous vérifions leur solidité financière (Altares, Infogreffe), leurs assurances professionnelles, et analysons leur historique de litiges. Seuls les pros fiables reçoivent les dossiers.",
    },
    {
      q: "Combien de temps pour recevoir les devis ?",
      a: "La plupart des devis arrivent sous 48h. Vous recevez généralement 5 à 8 devis comparables sous une semaine maximum.",
    },
    {
      q: "Puis-je vraiment rester anonyme ?",
      a: "Oui. Les déménageurs reçoivent uniquement votre dossier (volume, dates, services). Vos coordonnées restent cachées jusqu'à ce que vous choisissiez de les contacter.",
    },
    {
      q: "Que se passe-t-il si j'ai un litige ?",
      a: "Notre équipe support vous accompagne pour résoudre tout conflit avec un déménageur. Nous avons également une assurance médiation en cas de besoin.",
    },
  ];

  return (
    <main className="bg-hero min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-sm shadow-lg">
              <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
              Processus simple et transparent
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Comment fonctionne{" "}
              <span className="bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] bg-clip-text text-transparent">
                Moverz ?
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
              Un processus en 3 étapes pour obtenir des devis de déménageurs vraiment comparables, sans spam.
            </p>
          </div>
        </div>
      </section>

      {/* Process en 3 étapes */}
      <section className="section section-light">
        <div className="container">
          <HowItWorks />
        </div>
      </section>

      {/* Nos 4 garanties */}
      <section className="section section-contrast">
        <div className="container">
          <ValueTriad />
        </div>
      </section>

      {/* Processus détaillé */}
      <section className="section section-light">
        <div className="container space-y-10">
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2B7A78]">
              Processus détaillé
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#04163a] leading-tight">
              Étape par étape
            </h2>
            <p className="text-base md:text-lg text-[#4b5c6b] leading-relaxed max-w-2xl mx-auto font-light">
              Ce qui se passe vraiment derrière les coulisses.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                step: "1",
                title: "Vous créez votre dossier",
                description: "En 5 minutes, renseignez : adresses, dates, services souhaités (monte-meubles, cartons, etc.). Envoyez 4-6 photos de vos pièces pour l'analyse IA.",
                details: ["Photos de vos pièces", "Adresses départ/arrivée", "Dates souhaitées", "Services optionnels"],
              },
              {
                step: "2",
                title: "L'IA analyse votre volume",
                description: "Notre algorithme analyse vos photos et estime votre volume en m³. Ce volume figé (ex: 28 m³) est identique pour tous les déménageurs.",
                details: ["Analyse des meubles", "Calcul du volume", "Détection des objets fragiles", "Validation humaine si nécessaire"],
              },
              {
                step: "3",
                title: "Nous filtrons les déménageurs",
                description: "Seuls les pros avec solvabilité vérifiée, assurances à jour et 0 litige récent reçoivent votre dossier anonyme.",
                details: ["Vérification Altares/Infogreffe", "Contrôle des assurances", "Analyse historique litiges", "Disponibilité sur vos dates"],
              },
              {
                step: "4",
                title: "Les déménageurs chiffrent",
                description: "5 à 8 déménageurs reçoivent votre dossier avec le MÊME volume. Ils chiffrent en 48h sans vous contacter (dossier anonyme).",
                details: ["Dossier standardisé", "Volume figé", "Pas de contact direct", "Chiffrage sous 48h"],
              },
              {
                step: "5",
                title: "Vous recevez les devis par email",
                description: "Tous les devis arrivent par email, sur la même base. Vous comparez en toute sérénité, sans pression.",
                details: ["Format standardisé", "Détail des prestations", "Prix ligne par ligne", "Avis clients pour chaque pro"],
              },
              {
                step: "6",
                title: "Vous choisissez en toute liberté",
                description: "Sélectionnez le déménageur qui vous convient. Vos coordonnées ne sont révélées qu'à celui-ci. Pas de spam.",
                details: ["Comparaison facile", "Choix libre", "Coordonnées transmises uniquement au pro choisi", "Support en cas de besoin"],
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group relative rounded-3xl border border-[#E3E5E8] bg-white p-6 md:p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6BCFCF]/20 to-[#4FB8B8]/30 border-2 border-[#6BCFCF]/30 text-2xl font-bold text-[#2B7A78] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {item.step}
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-[#04163a]">
                      {item.title}
                    </h3>
                    <p className="text-base text-[#4b5c6b] leading-relaxed">
                      {item.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {item.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-sm text-[#4b5c6b]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#6BCFCF]" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ détaillée */}
      <section className="section section-contrast">
        <div className="container space-y-8">
          <div className="text-center space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6BCFCF]">
              FAQ Détaillée
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Questions fréquentes
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto font-light">
              Toutes les réponses sur le fonctionnement de Moverz.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <FAQAccordion items={detailedFaq} />
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section section-light">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-[#E3E5E8] bg-gradient-to-br from-white via-[#F8F9FA] to-[#F0F4F8] p-8 md:p-12 text-center shadow-xl">
              <div className="relative space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-[#04163a]">
                  Prêt à comparer des devis fiables ?
                </h2>
                <p className="text-base md:text-lg text-[#4b5c6b] max-w-xl mx-auto leading-relaxed">
                  Créez votre dossier en 5 minutes et recevez 5+ devis de déménageurs contrôlés, sans spam.
                </p>
                <a 
                  href="/choisir-ville/" 
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-8 py-4 text-lg font-semibold text-[#04141f] hover:scale-105 transition-transform duration-300 shadow-xl"
                >
                  <span>Comparer 5+ devis gratuitement</span>
                  <span className="text-xl">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

