import type { Metadata } from "next";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes | Moverz",
  description:
    "Toutes les réponses aux questions sur Moverz : tarifs, processus, confidentialité, délais, support. Comparateur de devis de déménageurs 100% gratuit.",
  alternates: {
    canonical: 'https://moverz.fr/faq/',
  },
};

export default function FAQPage() {
  const faqCategories = [
    {
      category: "Général",
      questions: [
        {
          q: "Est-ce vraiment gratuit ?",
          a: "Oui, 100% gratuit pour vous. Moverz est rémunéré par les déménageurs partenaires uniquement si vous choisissez l'un d'eux. Aucun frais caché, aucune obligation.",
        },
        {
          q: "Comment Moverz gagne-t-il de l'argent ?",
          a: "Nous recevons une commission du déménageur que vous choisissez, uniquement si le déménagement a lieu. C'est le déménageur qui paie, jamais vous.",
        },
        {
          q: "Quelles villes couvrez-vous ?",
          a: "Nous couvrons 11 grandes villes françaises : Nice, Lyon, Marseille, Toulouse, Bordeaux, Lille, Strasbourg, Nantes, Rennes, Rouen et Montpellier. D'autres villes seront ajoutées prochainement.",
        },
        {
          q: "Puis-je utiliser Moverz pour un déménagement à l'étranger ?",
          a: "Actuellement, Moverz se concentre sur les déménagements nationaux en France. Nous travaillons sur une offre internationale pour 2025.",
        },
      ],
    },
    {
      category: "Processus & Délais",
      questions: [
        {
          q: "Combien de temps prend la création du dossier ?",
          a: "5 à 10 minutes maximum. Vous renseignez vos adresses, dates, services souhaités et envoyez 4-6 photos de vos pièces. C'est tout !",
        },
        {
          q: "Combien de temps pour recevoir les devis ?",
          a: "La plupart des devis arrivent sous 48h. Vous recevez généralement 5 à 8 devis sous une semaine maximum.",
        },
        {
          q: "Dois-je faire des visites techniques avec chaque déménageur ?",
          a: "Non ! C'est tout l'intérêt de Moverz. L'IA analyse vos photos une seule fois, et tous les déménageurs chiffrent sur cette base. Fini les visites répétées.",
        },
        {
          q: "Puis-je modifier mon dossier après l'avoir créé ?",
          a: "Oui, jusqu'à ce que les déménageurs aient commencé à chiffrer (environ 24h). Contactez notre support pour toute modification.",
        },
      ],
    },
    {
      category: "Déménageurs & Qualité",
      questions: [
        {
          q: "Comment les déménageurs sont-ils sélectionnés ?",
          a: "Nous vérifions : solidité financière (Altares/Infogreffe), assurances professionnelles à jour, historique de litiges (0 litige récent), et avis clients. Seuls les pros fiables passent nos filtres.",
        },
        {
          q: "Combien de devis vais-je recevoir ?",
          a: "Entre 5 et 8 devis en moyenne. Tous chiffrent sur le MÊME volume, garantissant des devis vraiment comparables.",
        },
        {
          q: "Les déménageurs sont-ils assurés ?",
          a: "Oui, tous nos partenaires ont une assurance responsabilité civile professionnelle à jour, vérifiée par nos soins.",
        },
        {
          q: "Puis-je voir les avis clients sur les déménageurs ?",
          a: "Oui, chaque devis est accompagné des avis clients vérifiés (note moyenne, commentaires). Vous pouvez comparer prix ET qualité.",
        },
      ],
    },
    {
      category: "Confidentialité & Spam",
      questions: [
        {
          q: "Mon dossier est-il vraiment anonyme ?",
          a: "Oui. Les déménageurs reçoivent uniquement : volume (ex: 28 m³), adresses, dates, services souhaités. Vos nom, téléphone et email restent cachés jusqu'à ce que vous choisissiez un pro.",
        },
        {
          q: "Vais-je être harcelé par téléphone ?",
          a: "Non. C'est notre garantie : 0 spam téléphonique. Les déménageurs ne peuvent pas vous appeler. Vous recevez tout par email et vous choisissez qui contacter.",
        },
        {
          q: "Que deviennent mes données personnelles ?",
          a: "Elles sont stockées de manière sécurisée (RGPD), uniquement en France. Nous ne les vendons jamais à des tiers. Vous pouvez les supprimer à tout moment.",
        },
        {
          q: "Puis-je supprimer mon dossier ?",
          a: "Oui, à tout moment via votre espace client ou en contactant notre support. Suppression sous 48h.",
        },
      ],
    },
    {
      category: "Tarifs & Paiement",
      questions: [
        {
          q: "Y a-t-il des frais cachés ?",
          a: "Non. Moverz est 100% gratuit pour vous. Les prix affichés dans les devis sont ceux que vous paierez au déménageur (aucun supplément Moverz).",
        },
        {
          q: "Quand dois-je payer le déménageur ?",
          a: "Le paiement se fait directement avec le déménageur que vous choisissez, selon les conditions qu'il propose (acompte + solde, paiement en 3 fois, etc.).",
        },
        {
          q: "Puis-je négocier les prix ?",
          a: "Oui ! Une fois que vous avez reçu les devis, vous êtes libre de contacter le(s) déménageur(s) de votre choix pour négocier.",
        },
        {
          q: "Les devis incluent-ils tout (cartons, monte-meubles, etc.) ?",
          a: "Cela dépend des options que vous cochez. Chaque devis détaille ligne par ligne ce qui est inclus. Vous comparez facilement.",
        },
      ],
    },
    {
      category: "Support & Litiges",
      questions: [
        {
          q: "Que faire si j'ai un problème avec un déménageur ?",
          a: "Contactez immédiatement notre support. Nous intervenons pour résoudre le conflit. En cas de litige grave, nous avons une assurance médiation.",
        },
        {
          q: "Êtes-vous joignables par téléphone ?",
          a: "Oui, notre support est disponible par email (réponse sous 24h) et par téléphone du lundi au vendredi, 9h-18h.",
        },
        {
          q: "Puis-je annuler mon déménagement ?",
          a: "Oui, mais les conditions d'annulation dépendent du déménageur choisi (généralement : remboursement intégral si annulation > 7 jours avant).",
        },
        {
          q: "Que se passe-t-il si un déménageur ne respecte pas le devis ?",
          a: "C'est rare (grâce à notre sélection stricte), mais si cela arrive, contactez notre support. Nous faisons jouer les assurances si nécessaire.",
        },
      ],
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
              Toutes vos questions, nos réponses
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Questions{" "}
              <span className="bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] bg-clip-text text-transparent">
                fréquentes
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur Moverz, de la création de dossier au choix du déménageur.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ par catégories */}
      {faqCategories.map((category, idx) => (
        <section
          key={category.category}
          className={`py-12 md:py-16 ${idx % 2 === 0 ? "bg-[#04141f]" : "bg-[#0A1929]"}`}
        >
          <div className="mx-auto max-w-4xl px-4 md:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 pb-4 border-b border-white/10">
              {category.category}
            </h2>
            <FAQAccordion items={category.questions} />
          </div>
        </section>
      ))}

      {/* CTA final */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#04163A] via-[#05243f] to-[#0b3b46] p-8 md:p-12 text-center shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
            <div className="relative space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Une autre question ?
              </h2>
              <p className="text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
                Notre équipe est là pour vous répondre par email ou téléphone.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="/contact/" 
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#6BCFCF] via-[#4FB8B8] to-[#3DA5A5] px-6 py-3 text-base font-semibold text-[#04141f] hover:scale-105 transition-transform duration-300"
                >
                  <span>Nous contacter</span>
                  <span className="text-lg">→</span>
                </a>
                <a 
                  href="/choisir-ville/" 
                  className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-sm px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-all duration-300"
                >
                  <span>Comparer des devis</span>
                  <span className="text-lg">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

