import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("thaire-daunis/saintes", "Saintes");

const saintesData = {
  zone: "thaire-daunis/saintes",
  zoneDisplay: "Saintes",
  description: "Service professionnel de déménagement dans le quartier Saintes",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "250+",
    demenageurs: "18+",
    delai: "5-7 jours"
  },
  pourquoiMoverz: "Ville d'art et d'histoire",
  accesStationnement: "Centre historique avec rues étroites",
  destinationsFrequentes: [
    {
      href: "/thaire-daunis-vers-paris",
      title: "Saintes → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Saintes ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function SaintesPage() {
  return <LocalPage {...saintesData} />;
}