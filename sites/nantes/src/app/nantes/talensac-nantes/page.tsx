import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("nantes/talensac-nantes", "Talensac");

const talensac-nantesData = {
  zone: "nantes/talensac-nantes",
  zoneDisplay: "Talensac",
  description: "Service professionnel de déménagement dans le quartier Talensac",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "190+",
    demenageurs: "11+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier résidentiel avec marché couvert réputé. Immeubles bourgeois, commerces de proximité. Ambiance conviviale et familiale.",
  accesStationnement: "Marché quotidien (attention aux horaires), rues étroites, stationnement résidentiel, circulation modérée",
  destinationsFrequentes: [
    {
      href: "/nantes-vers-paris",
      title: "Talensac → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Talensac ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function TalensacPage() {
  return <LocalPage {...talensac-nantesData} />;
}