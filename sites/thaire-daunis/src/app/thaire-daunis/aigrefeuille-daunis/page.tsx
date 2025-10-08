import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("thaire-daunis/aigrefeuille-daunis", "Aigrefeuille-d'Aunis");

const aigrefeuilledaunisData = {
  zone: "thaire-daunis/aigrefeuille-daunis",
  zoneDisplay: "Aigrefeuille-d'Aunis",
  description: "Service professionnel de déménagement dans le quartier Aigrefeuille-d'Aunis",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "40+",
    demenageurs: "6+",
    delai: "3-5 jours"
  },
  pourquoiMoverz: "Commune voisine, cadre résidentiel calme",
  accesStationnement: "Accès facile, peu de contraintes",
  destinationsFrequentes: [
    {
      href: "/thaire-daunis-vers-paris",
      title: "Aigrefeuille-d'Aunis → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Aigrefeuille-d'Aunis ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function AigrefeuilledAunisPage() {
  return <LocalPage {...aigrefeuilledaunisData} />;
}