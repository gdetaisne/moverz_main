import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("marseille/vieux-port-marseille", "Vieux-Port");

const vieux-port-marseilleData = {
  zone: "marseille/vieux-port-marseille",
  zoneDisplay: "Vieux-Port",
  description: "Service professionnel de déménagement dans le quartier Vieux-Port",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "250+",
    demenageurs: "15+",
    delai: "7 jours"
  },
  pourquoiMoverz: "Cœur historique de Marseille autour du port antique. Zone touristique et résidentielle avec immeubles anciens et commerces. Vue imprenable sur Notre-Dame de la Garde.",
  accesStationnement: "Accès très limité pour véhicules, zones piétonnes, stationnement quasi-impossible, forte affluence touristique",
  destinationsFrequentes: [
    {
      href: "/marseille-vers-paris",
      title: "Vieux-Port → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Vieux-Port ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Vieux-PortPage() {
  return <LocalPage {...vieux-port-marseilleData} />;
}