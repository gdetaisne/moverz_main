import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("rennes/cleunay-rennes", "Cleunay");

const cleunay-rennesData = {
  zone: "rennes/cleunay-rennes",
  zoneDisplay: "Cleunay",
  description: "Service professionnel de déménagement dans le quartier Cleunay",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "120+",
    demenageurs: "7+",
    delai: "5 jours"
  },
  pourquoiMoverz: "Grand quartier résidentiel de l'ouest de Rennes. Mix de pavillons et résidences. Espaces verts, commerces de proximité. Quartier familial.",
  accesStationnement: "Circulation modérée, stationnement généralement disponible, accès facile",
  destinationsFrequentes: [
    {
      href: "/rennes-vers-paris",
      title: "Cleunay → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Cleunay ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function CleunayPage() {
  return <LocalPage {...cleunay-rennesData} />;
}