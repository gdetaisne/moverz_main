import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("nantes/bouffay-nantes", "Bouffay");

const bouffay-nantesData = {
  zone: "nantes/bouffay-nantes",
  zoneDisplay: "Bouffay",
  description: "Service professionnel de déménagement dans le quartier Bouffay",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "200+",
    demenageurs: "12+",
    delai: "7 jours"
  },
  pourquoiMoverz: "Quartier médiéval historique avec ruelles pavées, maisons à colombages, nombreux bars et restaurants. Cœur nocturne de Nantes. Très animé.",
  accesStationnement: "Rues étroites et piétonnes, pavés, accès véhicules limité, stationnement impossible, forte affluence le soir",
  destinationsFrequentes: [
    {
      href: "/nantes-vers-paris",
      title: "Bouffay → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Bouffay ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function BouffayPage() {
  return <LocalPage {...bouffay-nantesData} />;
}