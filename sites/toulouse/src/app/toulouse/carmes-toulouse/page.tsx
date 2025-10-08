import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("toulouse/carmes-toulouse", "Carmes");

const carmes-toulouseData = {
  zone: "toulouse/carmes-toulouse",
  zoneDisplay: "Carmes",
  description: "Service professionnel de déménagement dans le quartier Carmes",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "220+",
    demenageurs: "13+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier résidentiel historique avec marché couvert Victor Hugo. Immeubles anciens en brique, rues étroites, ambiance authentique et conviviale.",
  accesStationnement: "Rues étroites, marché quotidien (horaires à éviter), circulation limitée, stationnement résidentiel",
  destinationsFrequentes: [
    {
      href: "/toulouse-vers-paris",
      title: "Carmes → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Carmes ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function CarmesPage() {
  return <LocalPage {...carmes-toulouseData} />;
}