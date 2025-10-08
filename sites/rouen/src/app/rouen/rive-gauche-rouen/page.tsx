import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("rouen/rive-gauche-rouen", "Rive Gauche");

const rive-gauche-rouenData = {
  zone: "rouen/rive-gauche-rouen",
  zoneDisplay: "Rive Gauche",
  description: "Service professionnel de déménagement dans le quartier Rive Gauche",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "100+",
    demenageurs: "6+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier dynamique rive gauche de la Seine avec commerces, restaurants. En développement avec nouveaux projets immobiliers. Bien desservi.",
  accesStationnement: "Accès par ponts, circulation modérée, travaux de développement, stationnement plus facile",
  destinationsFrequentes: [
    {
      href: "/rouen-vers-paris",
      title: "Rive Gauche → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Rive Gauche ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Rive GauchePage() {
  return <LocalPage {...rive-gauche-rouenData} />;
}