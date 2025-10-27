import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("bordeaux/pessac", "Pessac");

const pessacData = {
  zone: "bordeaux/pessac",
  zoneDisplay: "Pessac",
  description: "Service professionnel de déménagement à Pessac, 3ème commune de Gironde",
  stats: {
    dossiers: "+30",
    demenageurs: "12",
    delai: "3-5"
  },
  pourquoiMoverz: "Pessac, 3ème commune la plus peuplée de Gironde, offre un cadre de vie universitaire et résidentiel avec son campus de bordeaux I, ses quartiers résidentiels et sa proximité avec le tramway. Cette ville de l'agglomération bordelaise présente des avantages pour les déménagements : accès facilité, stationnement aisé, logements variés. Nos déménageurs spécialisés connaissent parfaitement les spécificités de Pessac et s'adaptent aux différents types d'habitations.",
  accesStationnement: "Pessac offre de bonnes conditions d'accès : rues larges, stationnement facilité, logements variés (appartements, maisons, résidences étudiantes). Nos partenaires déménageurs peuvent utiliser des véhicules de toutes tailles et optimiser les créneaux de chargement. La proximité du tramway facilite les déplacements.",
  destinationsFrequentes: [
    {
      href: "/bordeaux-vers-paris",
      title: "Pessac → Paris",
      description: "Flux régulier depuis le campus universitaire, accès facilité."
    },
    {
      href: "/bordeaux-vers-toulouse",
      title: "Pessac → Toulouse",
      description: "Axe fréquent, conditions d'accès optimales."
    }
  ],
  partenaires: [
    {
      name: "Les Déménageurs Girondins",
      rating: 4.4,
      reviews: 8,
      specialties: ["Spécialistes de Pessac", "Environs"]
    },
    {
      name: "Déménageur bordeaux",
      rating: 4.8,
      reviews: 69,
      specialties: ["Agglomération bordelaise", "Services locaux"]
    },
    {
      name: "Alex Déménagement",
      rating: 4.7,
      reviews: 45,
      specialties: ["Proximité campus universitaire", "Résidences étudiantes"]
    },
    {
      name: "SAM'DÉMÉNAGE",
      rating: 4.6,
      reviews: 28,
      specialties: ["Quartiers résidentiels", "Logements variés"]
    }
  ],
  faq: [
    {
      question: "Quels sont les avantages de déménager à Pessac ?",
      answer: "Pessac offre de bonnes conditions d'accès : rues larges, stationnement facilité, logements variés. La proximité du campus universitaire et du tramway facilite les déplacements."
    },
    {
      question: "Comment se déroule un déménagement près du campus ?",
      answer: "Nos déménageurs connaissent parfaitement les contraintes du campus et optimisent les créneaux. La proximité du tramway facilite les déplacements."
    },
    {
      question: "Quels sont les tarifs pour Pessac ?",
      answer: "Les tarifs sont compétitifs grâce aux bonnes conditions d'accès. Comptez 280-480€ pour un studio, 480-780€ pour un T2/T3, 780-1400€ pour une maison."
    },
    {
      question: "Peut-on déménager le week-end à Pessac ?",
      answer: "Oui, les conditions d'accès facilitent les créneaux week-end. Les tarifs sont majorés de 15-20% selon les prestations."
    },
    {
      question: "Comment préparer un déménagement à Pessac ?",
      answer: "Préparez votre inventaire en ligne. Nos déménageurs vous conseilleront sur l'optimisation des créneaux et l'utilisation des équipements disponibles."
    },
    {
      question: "Les déménageurs connaissent-ils Pessac ?",
      answer: "Tous nos partenaires ont une excellente connaissance de Pessac : campus universitaire, quartiers résidentiels, proximité tramway. Ils s'adaptent aux spécificités de cette ville universitaire."
    }
  ]
};

export default function PessacPage() {
  return <LocalPage {...pessacData} />;
}