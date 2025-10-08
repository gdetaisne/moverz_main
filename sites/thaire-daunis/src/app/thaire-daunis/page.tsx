import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("thaire-daunis", "Thairé d'Aunis");

const thaire-daunisData = {
  zone: "thaire-daunis",
  zoneDisplay: "Thairé d'Aunis",
  description: "Service professionnel de déménagement dans le centre de Thairé d'Aunis",
  stats: {
    dossiers: "150+",
    demenageurs: "8+",
    delai: "undefined"
  },
  pourquoiMoverz: "Thairé d'Aunis se classe en tête des villes françaises où il fait bon vivre. Notre équipe d'experts déménageurs connaît parfaitement les spécificités de la ville.",
  accesStationnement: "Commune rurale, accès facile, stationnement aisé, proximité La Rochelle",
  destinationsFrequentes: [
    {
      href: "/thaire-daunis-vers-paris",
      title: "Thairé d'Aunis → Paris",
      description: "Flux régulier, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement à Thairé d'Aunis ?",
      answer: "Nos partenaires déménageurs à Thairé d'Aunis peuvent généralement intervenir sous 7 jours."
    }
  ]
};

export default function ThairdAunisPage() {
  return <LocalPage {...thaire-daunisData} />;
}