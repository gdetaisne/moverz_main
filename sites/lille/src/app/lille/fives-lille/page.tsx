import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("lille/fives-lille", "Fives");

const fives-lilleData = {
  zone: "lille/fives-lille",
  zoneDisplay: "Fives",
  description: "Service professionnel de déménagement dans le quartier Fives",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "130+",
    demenageurs: "7+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier populaire en reconversion, ancienne zone industrielle. Ateliers d'artistes, espaces culturels. En pleine mutation.",
  accesStationnement: "Travaux de rénovation, circulation modérée, stationnement généralement disponible",
  destinationsFrequentes: [
    {
      href: "/lille-vers-paris",
      title: "Fives → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Fives ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function FivesPage() {
  return <LocalPage {...fives-lilleData} />;
}