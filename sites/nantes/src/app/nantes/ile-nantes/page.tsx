import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("nantes/ile-nantes", "Île de Nantes");

const ile-nantesData = {
  zone: "nantes/ile-nantes",
  zoneDisplay: "Île de Nantes",
  description: "Service professionnel de déménagement dans le quartier Île de Nantes",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "180+",
    demenageurs: "11+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Ancien quartier industriel en pleine mutation. Architecture contemporaine, Machines de l'Île, espaces culturels. Quartier moderne et innovant.",
  accesStationnement: "Travaux fréquents, accès par ponts, zones en développement, circulation parfois perturbée",
  destinationsFrequentes: [
    {
      href: "/nantes-vers-paris",
      title: "Île de Nantes → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Île de Nantes ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Île de NantesPage() {
  return <LocalPage {...ile-nantesData} />;
}