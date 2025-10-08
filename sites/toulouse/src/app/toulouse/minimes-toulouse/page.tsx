import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("toulouse/minimes-toulouse", "Minimes");

const minimes-toulouseData = {
  zone: "toulouse/minimes-toulouse",
  zoneDisplay: "Minimes",
  description: "Service professionnel de déménagement dans le quartier Minimes",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "160+",
    demenageurs: "9+",
    delai: "5 jours"
  },
  pourquoiMoverz: "Grand quartier résidentiel du nord de Toulouse. Mix de pavillons et résidences. Espaces commerciaux, écoles, espaces verts. Quartier familial.",
  accesStationnement: "Accès plus facile, stationnement généralement disponible, quelques rues étroites dans l'ancien",
  destinationsFrequentes: [
    {
      href: "/toulouse-vers-paris",
      title: "Minimes → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Minimes ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function MinimesPage() {
  return <LocalPage {...minimes-toulouseData} />;
}