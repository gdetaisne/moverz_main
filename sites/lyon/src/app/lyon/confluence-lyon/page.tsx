import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("lyon/confluence-lyon", "Confluence");

const confluence-lyonData = {
  zone: "lyon/confluence-lyon",
  zoneDisplay: "Confluence",
  description: "Service professionnel de déménagement dans le quartier Confluence",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "180+",
    demenageurs: "11+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Nouveau quartier éco-responsable au confluent du Rhône et de la Saône. Architecture contemporaine, musée des Confluences, espaces verts. Quartier moderne et en développement.",
  accesStationnement: "Travaux en cours, accès réglementé, zones de livraison spécifiques, stationnement limité",
  destinationsFrequentes: [
    {
      href: "/lyon-vers-paris",
      title: "Confluence → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Confluence ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function ConfluencePage() {
  return <LocalPage {...confluence-lyonData} />;
}