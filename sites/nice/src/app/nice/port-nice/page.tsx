import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("nice/port-nice", "Port");

const port-niceData = {
  zone: "nice/port-nice",
  zoneDisplay: "Port",
  description: "Service professionnel de déménagement dans le quartier Port",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "170+",
    demenageurs: "9+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier du port avec marina et marché. Restaurants de poissons, immeubles colorés. Ambiance méditerranéenne authentique.",
  accesStationnement: "Accès port réglementé, circulation dense, stationnement très limité, rues étroites",
  destinationsFrequentes: [
    {
      href: "/nice-vers-paris",
      title: "Port → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Port ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function PortPage() {
  return <LocalPage {...port-niceData} />;
}