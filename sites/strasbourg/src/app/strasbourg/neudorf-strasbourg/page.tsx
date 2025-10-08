import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("strasbourg/neudorf-strasbourg", "Neudorf");

const neudorf-strasbourgData = {
  zone: "strasbourg/neudorf-strasbourg",
  zoneDisplay: "Neudorf",
  description: "Service professionnel de déménagement dans le quartier Neudorf",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "170+",
    demenageurs: "10+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Grand quartier résidentiel à l'est de Strasbourg. Mix de pavillons et immeubles. Bien desservi par le tramway. Quartier familial et cosmopolite.",
  accesStationnement: "Circulation modérée, tramway, stationnement généralement disponible, accès plus facile",
  destinationsFrequentes: [
    {
      href: "/strasbourg-vers-paris",
      title: "Neudorf → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Neudorf ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function NeudorfPage() {
  return <LocalPage {...neudorf-strasbourgData} />;
}