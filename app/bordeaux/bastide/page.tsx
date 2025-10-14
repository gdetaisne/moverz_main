import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("bordeaux/bastide", "Bastide");

const bastideData = {
  zone: "bordeaux/bastide",
  zoneDisplay: "Bastide",
  description: "Service professionnel de déménagement dans le quartier en développement de la Bastide",
  stats: {
    dossiers: "+25",
    demenageurs: "10",
    delai: "3-5"
  },
  pourquoiMoverz: "La Bastide, quartier en plein développement sur la rive droite de la Garonne, offre un cadre de vie moderne avec ses nouveaux logements, ses espaces verts et sa proximité avec la gare Saint-Jean. Ce quartier en mutation présente des avantages pour les déménagements : accès facilité, logements modernes, stationnement plus aisé. Nos déménageurs spécialisés connaissent parfaitement les spécificités de ce quartier en développement.",
  accesStationnement: "La Bastide offre de bonnes conditions d'accès : rues modernes, stationnement facilité, logements récents avec ascenseurs. Nos partenaires déménageurs peuvent optimiser les créneaux de chargement et utiliser des véhicules adaptés. La proximité de la gare Saint-Jean facilite les déménagements longue distance.",
  destinationsFrequentes: [
    {
      href: "/bordeaux-vers-paris",
      title: "Bastide → Paris",
      description: "Proximité gare Saint-Jean, accès facilité pour les déménagements longue distance."
    },
    {
      href: "/bordeaux-vers-lyon",
      title: "Bastide → Lyon",
      description: "Axe fréquent, conditions d'accès optimales depuis la gare."
    }
  ],
  partenaires: [
    {
      name: "Déménageur bordeaux",
      rating: 4.8,
      reviews: 69,
      specialties: ["Nouveaux logements", "Résidences modernes"]
    },
    {
      name: "Alex Déménagement",
      rating: 4.7,
      reviews: 45,
      specialties: ["Logements modernes", "Ascenseurs"]
    },
    {
      name: "SAM'DÉMÉNAGE",
      rating: 4.6,
      reviews: 28,
      specialties: ["Proximité gare Saint-Jean", "Déménagements longue distance"]
    },
    {
      name: "Burdigala Déménagement",
      rating: 4.3,
      reviews: 6,
      specialties: ["Quartier en développement", "Services adaptés"]
    }
  ],
  faq: [
    {
      question: "Quels sont les avantages de déménager à la Bastide ?",
      answer: "La Bastide offre de bonnes conditions d'accès : rues modernes, logements récents avec ascenseurs, stationnement facilité. La proximité de la gare Saint-Jean facilite les déménagements longue distance."
    },
    {
      question: "Comment se déroule un déménagement dans un logement moderne ?",
      answer: "Nos déménageurs s'adaptent aux spécificités des logements modernes : ascenseurs, accès facilité, espaces de stockage. Les conditions sont généralement optimales."
    },
    {
      question: "Quels sont les tarifs pour la Bastide ?",
      answer: "Les tarifs sont compétitifs grâce aux bonnes conditions d'accès. Comptez 280-480€ pour un studio, 480-780€ pour un T2/T3, 780-1400€ pour une maison."
    },
    {
      question: "Peut-on déménager le week-end à la Bastide ?",
      answer: "Oui, les conditions d'accès facilitent les créneaux week-end. Les tarifs sont majorés de 15-20% selon les prestations."
    },
    {
      question: "Comment préparer un déménagement à la Bastide ?",
      answer: "Préparez votre inventaire en ligne. Nos déménageurs vous conseilleront sur l'optimisation des créneaux et l'utilisation des équipements modernes (ascenseurs, espaces de stockage)."
    },
    {
      question: "Les déménageurs connaissent-ils la Bastide ?",
      answer: "Tous nos partenaires ont une excellente connaissance de la Bastide : nouveaux logements, conditions d'accès, proximité gare. Ils s'adaptent aux spécificités de ce quartier en développement."
    }
  ]
};

export default function BastidePage() {
  return <LocalPage {...bastideData} />;
}