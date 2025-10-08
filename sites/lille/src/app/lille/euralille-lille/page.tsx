import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("lille/euralille-lille", "Euralille");

const euralille-lilleData = {
  zone: "lille/euralille-lille",
  zoneDisplay: "Euralille",
  description: "Service professionnel de déménagement dans le quartier Euralille",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "160+",
    demenageurs: "9+",
    delai: "5 jours"
  },
  pourquoiMoverz: "Quartier d'affaires moderne autour de la gare Lille Europe. Gratte-ciels, centre commercial, bureaux. Très bien desservi (TGV, métro).",
  accesStationnement: "Zone gare très fréquentée, circulation dense, stationnement payant, accès réglementé",
  destinationsFrequentes: [
    {
      href: "/lille-vers-paris",
      title: "Euralille → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Euralille ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function EuralillePage() {
  return <LocalPage {...euralille-lilleData} />;
}