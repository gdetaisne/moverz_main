import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("rouen/vieux-rouen", "Vieux-Rouen");

const vieux-rouenData = {
  zone: "rouen/vieux-rouen",
  zoneDisplay: "Vieux-Rouen",
  description: "Service professionnel de déménagement dans le quartier Vieux-Rouen",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "110+",
    demenageurs: "6+",
    delai: "7 jours"
  },
  pourquoiMoverz: "Centre historique médiéval avec cathédrale Notre-Dame, Gros-Horloge, maisons à colombages. Ruelles pavées, places animées. Très touristique.",
  accesStationnement: "Ruelles pavées étroites, zones piétonnes, accès véhicules très limité, stationnement impossible",
  destinationsFrequentes: [
    {
      href: "/rouen-vers-paris",
      title: "Vieux-Rouen → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Vieux-Rouen ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Vieux-RouenPage() {
  return <LocalPage {...vieux-rouenData} />;
}