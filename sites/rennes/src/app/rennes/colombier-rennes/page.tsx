import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("rennes/colombier-rennes", "Colombier");

const colombier-rennesData = {
  zone: "rennes/colombier-rennes",
  zoneDisplay: "Colombier",
  description: "Service professionnel de déménagement dans le quartier Colombier",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "130+",
    demenageurs: "7+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier étudiant animé proche de l'université Rennes 2. Bars, restaurants, commerces. Ambiance jeune et festive. Marché hebdomadaire.",
  accesStationnement: "Circulation dense, stationnement difficile, forte affluence étudiante, marché le samedi",
  destinationsFrequentes: [
    {
      href: "/rennes-vers-paris",
      title: "Colombier → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Colombier ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function ColombierPage() {
  return <LocalPage {...colombier-rennesData} />;
}