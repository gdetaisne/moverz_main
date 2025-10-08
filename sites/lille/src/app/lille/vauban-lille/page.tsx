import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("lille/vauban-lille", "Vauban");

const vauban-lilleData = {
  zone: "lille/vauban-lille",
  zoneDisplay: "Vauban",
  description: "Service professionnel de déménagement dans le quartier Vauban",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "140+",
    demenageurs: "8+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier résidentiel avec citadelle Vauban, parc, et université catholique. Immeubles bourgeois, calme et verdoyant. Cadre de vie agréable.",
  accesStationnement: "Circulation modérée, stationnement résidentiel, accès citadelle réglementé",
  destinationsFrequentes: [
    {
      href: "/lille-vers-paris",
      title: "Vauban → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Vauban ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function VaubanPage() {
  return <LocalPage {...vauban-lilleData} />;
}