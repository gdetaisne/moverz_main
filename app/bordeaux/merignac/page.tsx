import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("bordeaux/merignac", "Mérignac");

const merignacData = {
  zone: "bordeaux/merignac",
  zoneDisplay: "Mérignac",
  description: "Service professionnel de déménagement à Mérignac, 2ème commune de Gironde",
  stats: {
    dossiers: "+40",
    demenageurs: "15",
    delai: "3-5"
  },
  pourquoiMoverz: "Mérignac, 2ème commune la plus peuplée de Gironde, offre un cadre de vie dynamique avec son aéroport international, ses zones d'activité et ses quartiers résidentiels modernes. Cette ville de l'agglomération bordelaise présente des avantages pour les déménagements : accès facilité, stationnement aisé, logements variés. Nos déménageurs spécialisés connaissent parfaitement les spécificités de Mérignac et s'adaptent aux différents types d'habitations.",
  accesStationnement: "Mérignac offre d'excellentes conditions d'accès : rues larges, stationnement facilité, logements variés (appartements, maisons, résidences). Nos partenaires déménageurs peuvent utiliser des véhicules de toutes tailles et optimiser les créneaux de chargement. La proximité de l'aéroport facilite les déménagements longue distance.",
  destinationsFrequentes: [
    {
      href: "/bordeaux-vers-paris",
      title: "Mérignac → Paris",
      description: "Proximité aéroport, accès facilité pour les déménagements longue distance."
    },
    {
      href: "/bordeaux-vers-lyon",
      title: "Mérignac → Lyon",
      description: "Axe fréquent, conditions d'accès optimales depuis l'aéroport."
    },
    {
      href: "/bordeaux-vers-marseille",
      title: "Mérignac → Marseille",
      description: "Trajets longs, prévoir protections renforcées."
    }
  ],
  partenaires: [
    {
      name: "Les Déménageurs Bretons",
      rating: 4.5,
      reviews: 50,
      specialties: ["Déménagements nationaux", "Réseau national"]
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
      specialties: ["Proximité aéroport", "Zones d'activité"]
    },
    {
      name: "SAM'DÉMÉNAGE",
      rating: 4.6,
      reviews: 28,
      specialties: ["Quartiers résidentiels modernes", "Logements variés"]
    }
  ],
  faq: [
    {
      question: "Quels sont les avantages de déménager à Mérignac ?",
      answer: "Mérignac offre d'excellentes conditions d'accès : rues larges, stationnement facilité, logements variés. La proximité de l'aéroport facilite les déménagements longue distance."
    },
    {
      question: "Comment se déroule un déménagement près de l'aéroport ?",
      answer: "Nos déménageurs connaissent parfaitement les contraintes aéroportuaires et optimisent les créneaux. La proximité facilite les déménagements longue distance."
    },
    {
      question: "Quels sont les tarifs pour Mérignac ?",
      answer: "Les tarifs sont compétitifs grâce aux excellentes conditions d'accès. Comptez 270-450€ pour un studio, 450-720€ pour un T2/T3, 720-1350€ pour une maison."
    },
    {
      question: "Peut-on déménager le week-end à Mérignac ?",
      answer: "Oui, les conditions d'accès facilitent les créneaux week-end. Les tarifs sont majorés de 15-20% selon les prestations."
    },
    {
      question: "Comment préparer un déménagement à Mérignac ?",
      answer: "Préparez votre inventaire en ligne. Nos déménageurs vous conseilleront sur l'optimisation des créneaux et l'utilisation des équipements disponibles."
    },
    {
      question: "Les déménageurs connaissent-ils Mérignac ?",
      answer: "Tous nos partenaires ont une excellente connaissance de Mérignac : aéroport, zones d'activité, quartiers résidentiels. Ils s'adaptent aux spécificités de cette ville dynamique."
    }
  ]
};

export default function MerignacPage() {
  return <LocalPage {...merignacData} />;
}