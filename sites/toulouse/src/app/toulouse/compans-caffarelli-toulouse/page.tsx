import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("toulouse/compans-caffarelli-toulouse", "Compans-Caffarelli");

const compans-caffarelli-toulouseData = {
  zone: "toulouse/compans-caffarelli-toulouse",
  zoneDisplay: "Compans-Caffarelli",
  description: "Service professionnel de déménagement dans le quartier Compans-Caffarelli",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "180+",
    demenageurs: "11+",
    delai: "5 jours"
  },
  pourquoiMoverz: "Quartier d'affaires moderne proche de la gare Matabiau. Bureaux, résidences récentes, jardin japonais. Bien desservi par les transports.",
  accesStationnement: "Circulation dense en semaine, zone gare réglementée, stationnement payant",
  destinationsFrequentes: [
    {
      href: "/toulouse-vers-paris",
      title: "Compans-Caffarelli → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Compans-Caffarelli ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Compans-CaffarelliPage() {
  return <LocalPage {...compans-caffarelli-toulouseData} />;
}