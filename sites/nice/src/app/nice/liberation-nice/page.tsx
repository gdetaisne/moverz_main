import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("nice/liberation-nice", "Libération");

const liberation-niceData = {
  zone: "nice/liberation-nice",
  zoneDisplay: "Libération",
  description: "Service professionnel de déménagement dans le quartier Libération",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "210+",
    demenageurs: "12+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier dynamique autour de l'avenue Jean Médecin. Centre commercial, tramway, nombreux commerces. Quartier commerçant et résidentiel.",
  accesStationnement: "Tramway, circulation dense, zones piétonnes, stationnement payant et limité",
  destinationsFrequentes: [
    {
      href: "/nice-vers-paris",
      title: "Libération → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Libération ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function LibérationPage() {
  return <LocalPage {...liberation-niceData} />;
}