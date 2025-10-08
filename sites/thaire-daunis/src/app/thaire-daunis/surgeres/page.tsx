import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("thaire-daunis/surgeres", "Surgères");

const surgeresData = {
  zone: "thaire-daunis/surgeres",
  zoneDisplay: "Surgères",
  description: "Service professionnel de déménagement dans le quartier Surgères",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "80+",
    demenageurs: "10+",
    delai: "4-6 jours"
  },
  pourquoiMoverz: "Ville dynamique de Charente-Maritime",
  accesStationnement: "Accès facile, stationnement disponible",
  destinationsFrequentes: [
    {
      href: "/thaire-daunis-vers-paris",
      title: "Surgères → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Surgères ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function SurgresPage() {
  return <LocalPage {...surgeresData} />;
}