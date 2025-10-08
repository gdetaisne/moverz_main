import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("nice/vieux-nice", "Vieux-Nice");

const vieux-niceData = {
  zone: "nice/vieux-nice",
  zoneDisplay: "Vieux-Nice",
  description: "Service professionnel de déménagement dans le quartier Vieux-Nice",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "190+",
    demenageurs: "11+",
    delai: "8 jours"
  },
  pourquoiMoverz: "Cœur historique de Nice avec ruelles étroites colorées, cours Saleya et son marché aux fleurs. Architecture baroque, immeubles hauts et étroits. Très touristique.",
  accesStationnement: "Ruelles piétonnes très étroites, impossible d'accéder en véhicule, nombreux escaliers, pas de stationnement",
  destinationsFrequentes: [
    {
      href: "/nice-vers-paris",
      title: "Vieux-Nice → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Vieux-Nice ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Vieux-NicePage() {
  return <LocalPage {...vieux-niceData} />;
}