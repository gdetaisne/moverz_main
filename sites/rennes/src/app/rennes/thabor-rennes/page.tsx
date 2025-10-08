import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("rennes/thabor-rennes", "Thabor");

const thabor-rennesData = {
  zone: "rennes/thabor-rennes",
  zoneDisplay: "Thabor",
  description: "Service professionnel de déménagement dans le quartier Thabor",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "150+",
    demenageurs: "9+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier résidentiel chic autour du parc du Thabor. Immeubles bourgeois, calme et verdoyant. Proche du centre. Très recherché.",
  accesStationnement: "Stationnement résidentiel, rues étroites, circulation modérée",
  destinationsFrequentes: [
    {
      href: "/rennes-vers-paris",
      title: "Thabor → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Thabor ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function ThaborPage() {
  return <LocalPage {...thabor-rennesData} />;
}