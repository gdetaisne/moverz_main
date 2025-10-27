import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("bordeaux/cauderan", "Caudéran");

const cauderanData = {
  zone: "bordeaux/cauderan",
  zoneDisplay: "Caudéran",
  description: "Service professionnel de déménagement dans le quartier résidentiel de Caudéran",
  stats: {
    dossiers: "+35",
    demenageurs: "12",
    delai: "3-5"
  },
  pourquoiMoverz: "Caudéran, quartier résidentiel prisé de bordeaux, offre un cadre de vie familial exceptionnel avec ses maisons individuelles, ses espaces verts et sa tranquillité. Ce quartier présente des avantages pour les déménagements : accès facilité, stationnement plus aisé, maisons avec jardins. Nos déménageurs spécialisés connaissent parfaitement les spécificités de ce quartier résidentiel et s'adaptent aux différents types d'habitations.",
  accesStationnement: "Caudéran offre de meilleures conditions d'accès que le centre-ville : rues plus larges, stationnement plus aisé, maisons individuelles avec accès direct. Nos partenaires déménageurs peuvent utiliser des véhicules plus grands et optimiser les créneaux de chargement. Les maisons avec jardins facilitent les manœuvres et le stockage temporaire.",
  destinationsFrequentes: [
    {
      href: "/bordeaux-vers-paris",
      title: "Caudéran → Paris",
      description: "Flux régulier depuis ce quartier résidentiel, accès facilité."
    },
    {
      href: "/bordeaux-vers-toulouse",
      title: "Caudéran → Toulouse",
      description: "Axe fréquent, conditions d'accès optimales."
    }
  ],
  partenaires: [
    {
      name: "Déménageur bordeaux",
      rating: 4.8,
      reviews: 69,
      specialties: ["Quartiers résidentiels", "Maisons individuelles"]
    },
    {
      name: "Alex Déménagement",
      rating: 4.7,
      reviews: 45,
      specialties: ["Maisons avec jardins", "Accès facilité"]
    },
    {
      name: "SAM'DÉMÉNAGE",
      rating: 4.6,
      reviews: 28,
      specialties: ["Déménagements familiaux", "Sécurité"]
    },
    {
      name: "Larnaudie Déménagements",
      rating: 4.7,
      reviews: 5,
      specialties: ["Déménagements familiaux", "Garde-meuble"]
    }
  ],
  faq: [
    {
      question: "Quels sont les avantages de déménager à Caudéran ?",
      answer: "Caudéran offre de meilleures conditions d'accès : rues plus larges, stationnement plus aisé, maisons avec jardins. Les déménagements sont généralement plus faciles qu'en centre-ville."
    },
    {
      question: "Comment se déroule un déménagement de maison à Caudéran ?",
      answer: "Nos déménageurs peuvent utiliser des véhicules plus grands et optimiser les créneaux. Les maisons avec jardins facilitent les manœuvres et le stockage temporaire."
    },
    {
      question: "Quels sont les tarifs pour Caudéran ?",
      answer: "Les tarifs sont généralement 10-15% moins chers qu'en centre-ville grâce aux meilleures conditions d'accès. Comptez 270-450€ pour un studio, 450-720€ pour un T2/T3."
    },
    {
      question: "Peut-on déménager le week-end à Caudéran ?",
      answer: "Oui, les conditions d'accès facilitent les créneaux week-end. Les tarifs sont majorés de 15-20% selon les prestations."
    },
    {
      question: "Comment préparer un déménagement à Caudéran ?",
      answer: "Préparez votre inventaire en ligne. Nos déménageurs vous conseilleront sur l'optimisation des créneaux et l'utilisation de l'espace extérieur si disponible."
    },
    {
      question: "Les déménageurs connaissent-ils Caudéran ?",
      answer: "Tous nos partenaires ont une excellente connaissance de Caudéran : rues, types d'habitations, conditions d'accès. Ils s'adaptent aux spécificités de ce quartier résidentiel."
    }
  ]
};

export default function CauderanPage() {
  return <LocalPage {...cauderanData} />;
}