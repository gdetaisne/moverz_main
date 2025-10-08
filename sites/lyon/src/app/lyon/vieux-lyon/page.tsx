import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("lyon/vieux-lyon", "Vieux-Lyon");

const vieux-lyonData = {
  zone: "lyon/vieux-lyon",
  zoneDisplay: "Vieux-Lyon",
  description: "Service professionnel de déménagement dans le quartier Vieux-Lyon",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "210+",
    demenageurs: "13+",
    delai: "8 jours"
  },
  pourquoiMoverz: "Quartier Renaissance classé UNESCO, traboules historiques, cathédrale Saint-Jean. Rues pavées médiévales et immeubles du XVIe siècle. Très touristique.",
  accesStationnement: "Rues très étroites et pentues, pavés, impossible d'accéder en gros véhicule, nombreux escaliers, traboules, stationnement inexistant",
  destinationsFrequentes: [
    {
      href: "/lyon-vers-paris",
      title: "Vieux-Lyon → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Vieux-Lyon ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Vieux-LyonPage() {
  return <LocalPage {...vieux-lyonData} />;
}