import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("rennes/villejean-rennes", "Villejean");

const villejean-rennesData = {
  zone: "rennes/villejean-rennes",
  zoneDisplay: "Villejean",
  description: "Service professionnel de déménagement dans le quartier Villejean",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "110+",
    demenageurs: "6+",
    delai: "5 jours"
  },
  pourquoiMoverz: "Quartier nord avec campus universitaire Beaulieu, CHU. Mix de résidences étudiantes et familiales. Bien desservi par le métro.",
  accesStationnement: "Circulation modérée, métro, stationnement campus réglementé",
  destinationsFrequentes: [
    {
      href: "/rennes-vers-paris",
      title: "Villejean → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Villejean ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function VillejeanPage() {
  return <LocalPage {...villejean-rennesData} />;
}