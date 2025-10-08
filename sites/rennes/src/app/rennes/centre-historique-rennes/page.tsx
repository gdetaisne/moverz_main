import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("rennes/centre-historique-rennes", "Centre Historique");

const centre-historique-rennesData = {
  zone: "rennes/centre-historique-rennes",
  zoneDisplay: "Centre Historique",
  description: "Service professionnel de déménagement dans le quartier Centre Historique",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "140+",
    demenageurs: "8+",
    delai: "7 jours"
  },
  pourquoiMoverz: "Cœur médiéval de Rennes avec maisons à colombages colorées, place du Parlement. Rues piétonnes, commerces, restaurants. Très touristique et animé.",
  accesStationnement: "Zones piétonnes étendues, ruelles étroites, accès véhicules limité, stationnement impossible",
  destinationsFrequentes: [
    {
      href: "/rennes-vers-paris",
      title: "Centre Historique → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Centre Historique ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Centre HistoriquePage() {
  return <LocalPage {...centre-historique-rennesData} />;
}