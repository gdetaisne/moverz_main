import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("lille/vieux-lille", "Vieux-Lille");

const vieux-lilleData = {
  zone: "lille/vieux-lille",
  zoneDisplay: "Vieux-Lille",
  description: "Service professionnel de déménagement dans le quartier Vieux-Lille",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "150+",
    demenageurs: "9+",
    delai: "7 jours"
  },
  pourquoiMoverz: "Quartier historique avec ruelles pavées et maisons flamandes colorées. Boutiques de luxe, restaurants gastronomiques. Très chic et touristique.",
  accesStationnement: "Ruelles pavées étroites, accès véhicules difficile, stationnement quasi-impossible, pavés",
  destinationsFrequentes: [
    {
      href: "/lille-vers-paris",
      title: "Vieux-Lille → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Vieux-Lille ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Vieux-LillePage() {
  return <LocalPage {...vieux-lilleData} />;
}