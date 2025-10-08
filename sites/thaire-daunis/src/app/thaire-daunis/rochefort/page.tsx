import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("thaire-daunis/rochefort", "Rochefort");

const rochefortData = {
  zone: "thaire-daunis/rochefort",
  zoneDisplay: "Rochefort",
  description: "Service professionnel de déménagement dans le quartier Rochefort",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "200+",
    demenageurs: "15+",
    delai: "5-7 jours"
  },
  pourquoiMoverz: "Ville historique maritime",
  accesStationnement: "Centre-ville dense, zones piétonnes",
  destinationsFrequentes: [
    {
      href: "/thaire-daunis-vers-paris",
      title: "Rochefort → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Rochefort ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function RochefortPage() {
  return <LocalPage {...rochefortData} />;
}