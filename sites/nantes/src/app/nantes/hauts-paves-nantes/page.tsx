import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("nantes/hauts-paves-nantes", "Hauts-Pavés");

const hauts-paves-nantesData = {
  zone: "nantes/hauts-paves-nantes",
  zoneDisplay: "Hauts-Pavés",
  description: "Service professionnel de déménagement dans le quartier Hauts-Pavés",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "170+",
    demenageurs: "10+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier étudiant et branché. Bars, restaurants, boutiques. Proche du campus universitaire. Ambiance jeune et dynamique.",
  accesStationnement: "Circulation dense, stationnement limité, rues étroites, forte affluence étudiante",
  destinationsFrequentes: [
    {
      href: "/nantes-vers-paris",
      title: "Hauts-Pavés → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Hauts-Pavés ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Hauts-PavésPage() {
  return <LocalPage {...hauts-paves-nantesData} />;
}