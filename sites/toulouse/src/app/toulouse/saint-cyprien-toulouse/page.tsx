import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("toulouse/saint-cyprien-toulouse", "Saint-Cyprien");

const saint-cyprien-toulouseData = {
  zone: "toulouse/saint-cyprien-toulouse",
  zoneDisplay: "Saint-Cyprien",
  description: "Service professionnel de déménagement dans le quartier Saint-Cyprien",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "200+",
    demenageurs: "12+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier rive gauche de la Garonne, proche des quais. Mix d'immeubles anciens et modernes. Marché dominical réputé, espaces verts (Prairie des Filtres).",
  accesStationnement: "Accès par ponts, circulation dense, marché le dimanche, stationnement limité",
  destinationsFrequentes: [
    {
      href: "/toulouse-vers-paris",
      title: "Saint-Cyprien → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Saint-Cyprien ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Saint-CyprienPage() {
  return <LocalPage {...saint-cyprien-toulouseData} />;
}