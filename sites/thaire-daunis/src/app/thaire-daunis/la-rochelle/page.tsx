import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("thaire-daunis/la-rochelle", "La Rochelle");

const larochelleData = {
  zone: "thaire-daunis/la-rochelle",
  zoneDisplay: "La Rochelle",
  description: "Service professionnel de déménagement dans le quartier La Rochelle",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "500+",
    demenageurs: "25+",
    delai: "5-7 jours"
  },
  pourquoiMoverz: "Grande ville proche, port historique, centre-ville dynamique",
  accesStationnement: "Trafic dense, zones piétonnes, stationnement payant",
  destinationsFrequentes: [
    {
      href: "/thaire-daunis-vers-paris",
      title: "La Rochelle → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à La Rochelle ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function LaRochellePage() {
  return <LocalPage {...larochelleData} />;
}