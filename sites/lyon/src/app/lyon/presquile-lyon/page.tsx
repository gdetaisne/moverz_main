import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("lyon/presquile-lyon", "Presqu'île");

const presquile-lyonData = {
  zone: "lyon/presquile-lyon",
  zoneDisplay: "Presqu'île",
  description: "Service professionnel de déménagement dans le quartier Presqu'île",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "260+",
    demenageurs: "16+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Cœur de Lyon entre Rhône et Saône, Place Bellecour, rue de la République. Quartier commerçant et résidentiel avec immeubles haussmanniens.",
  accesStationnement: "Circulation très dense, tramway, zones piétonnes, stationnement payant et limité, livraisons réglementées",
  destinationsFrequentes: [
    {
      href: "/lyon-vers-paris",
      title: "Presqu'île → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Presqu'île ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Presqu'îlePage() {
  return <LocalPage {...presquile-lyonData} />;
}