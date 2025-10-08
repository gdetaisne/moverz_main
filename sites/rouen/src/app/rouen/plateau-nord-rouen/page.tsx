import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("rouen/plateau-nord-rouen", "Plateau Nord");

const plateau-nord-rouenData = {
  zone: "rouen/plateau-nord-rouen",
  zoneDisplay: "Plateau Nord",
  description: "Service professionnel de déménagement dans le quartier Plateau Nord",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "80+",
    demenageurs: "4+",
    delai: "5 jours"
  },
  pourquoiMoverz: "Quartier résidentiel sur les hauteurs de Rouen. Mix de pavillons et résidences. Vue sur la ville. Quartier familial et calme.",
  accesStationnement: "Relief avec pentes, accès facile, stationnement disponible",
  destinationsFrequentes: [
    {
      href: "/rouen-vers-paris",
      title: "Plateau Nord → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Plateau Nord ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Plateau NordPage() {
  return <LocalPage {...plateau-nord-rouenData} />;
}