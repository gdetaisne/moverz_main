import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("lille/wazemmes-lille", "Wazemmes");

const wazemmes-lilleData = {
  zone: "lille/wazemmes-lille",
  zoneDisplay: "Wazemmes",
  description: "Service professionnel de déménagement dans le quartier Wazemmes",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "170+",
    demenageurs: "10+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier populaire et multiculturel avec grand marché (marché de Wazemmes). Ambiance cosmopolite, commerces variés. Très animé.",
  accesStationnement: "Marché dominical (attention aux horaires), circulation dense, stationnement difficile",
  destinationsFrequentes: [
    {
      href: "/lille-vers-paris",
      title: "Wazemmes → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Wazemmes ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function WazemmesPage() {
  return <LocalPage {...wazemmes-lilleData} />;
}