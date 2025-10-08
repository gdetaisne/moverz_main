import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("lyon/croix-rousse-lyon", "Croix-Rousse");

const croix-rousse-lyonData = {
  zone: "lyon/croix-rousse-lyon",
  zoneDisplay: "Croix-Rousse",
  description: "Service professionnel de déménagement dans le quartier Croix-Rousse",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "230+",
    demenageurs: "14+",
    delai: "7 jours"
  },
  pourquoiMoverz: "Quartier des canuts sur la colline, ambiance village avec marché quotidien, traboules, pentes raides (montée de la Grande-Côte). Quartier artistique et populaire.",
  accesStationnement: "Pentes très raides (certaines à 15%), rues étroites, traboules, accès limité pour gros véhicules, stationnement difficile",
  destinationsFrequentes: [
    {
      href: "/lyon-vers-paris",
      title: "Croix-Rousse → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Croix-Rousse ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Croix-RoussePage() {
  return <LocalPage {...croix-rousse-lyonData} />;
}