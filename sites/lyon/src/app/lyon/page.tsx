import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("lyon", "undefined");

const lyonData = {
  zone: "lyon",
  zoneDisplay: "undefined",
  description: "Service professionnel de déménagement dans le centre de undefined",
  stats: {
    dossiers: "1800+",
    demenageurs: "28+",
    delai: "undefined"
  },
  pourquoiMoverz: "undefined se classe en tête des villes françaises où il fait bon vivre. Notre équipe d'experts déménageurs connaît parfaitement les spécificités de la ville.",
  accesStationnement: "Contraintes spécifiques à undefined",
  destinationsFrequentes: [
    {
      href: "/lyon-vers-paris",
      title: "undefined → Paris",
      description: "Flux régulier, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement à undefined ?",
      answer: "Nos partenaires déménageurs à undefined peuvent généralement intervenir sous 7 jours."
    }
  ]
};

export default function undefinedPage() {
  return <LocalPage {...lyonData} />;
}