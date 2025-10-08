import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("rouen/beauvoisine-rouen", "Quartier Beauvoisine");

const beauvoisine-rouenData = {
  zone: "rouen/beauvoisine-rouen",
  zoneDisplay: "Quartier Beauvoisine",
  description: "Service professionnel de déménagement dans le quartier Quartier Beauvoisine",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "85+",
    demenageurs: "5+",
    delai: "5 jours"
  },
  pourquoiMoverz: "Quartier résidentiel calme au nord du centre-ville. Immeubles anciens, commerces de proximité. Proche du jardin des Plantes.",
  accesStationnement: "Rues étroites, stationnement résidentiel, circulation modérée",
  destinationsFrequentes: [
    {
      href: "/rouen-vers-paris",
      title: "Quartier Beauvoisine → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Quartier Beauvoisine ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Quartier BeauvoisinePage() {
  return <LocalPage {...beauvoisine-rouenData} />;
}