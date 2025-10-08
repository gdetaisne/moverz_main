import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("rouen/saint-sever-rouen", "Saint-Sever");

const saint-sever-rouenData = {
  zone: "rouen/saint-sever-rouen",
  zoneDisplay: "Saint-Sever",
  description: "Service professionnel de déménagement dans le quartier Saint-Sever",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "95+",
    demenageurs: "5+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier commerçant rive gauche avec grand centre commercial. Mix de résidences et commerces. Animé et familial.",
  accesStationnement: "Centre commercial (affluence week-end), circulation dense, stationnement payant",
  destinationsFrequentes: [
    {
      href: "/rouen-vers-paris",
      title: "Saint-Sever → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Saint-Sever ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Saint-SeverPage() {
  return <LocalPage {...saint-sever-rouenData} />;
}