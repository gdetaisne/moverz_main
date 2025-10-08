import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("marseille/plaine-marseille", "La Plaine");

const plaine-marseilleData = {
  zone: "marseille/plaine-marseille",
  zoneDisplay: "La Plaine",
  description: "Service professionnel de déménagement dans le quartier La Plaine",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "190+",
    demenageurs: "11+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier étudiant et branché du 5ème arrondissement. Marché quotidien, nombreux bars et restaurants. Ambiance jeune et dynamique.",
  accesStationnement: "Marché sur la place (attention aux horaires), circulation dense, stationnement difficile",
  destinationsFrequentes: [
    {
      href: "/marseille-vers-paris",
      title: "La Plaine → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à La Plaine ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function La PlainePage() {
  return <LocalPage {...plaine-marseilleData} />;
}