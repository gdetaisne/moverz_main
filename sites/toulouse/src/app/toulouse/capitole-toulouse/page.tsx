import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("toulouse/capitole-toulouse", "Capitole");

const capitole-toulouseData = {
  zone: "toulouse/capitole-toulouse",
  zoneDisplay: "Capitole",
  description: "Service professionnel de déménagement dans le quartier Capitole",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "240+",
    demenageurs: "14+",
    delai: "7 jours"
  },
  pourquoiMoverz: "Cœur de Toulouse autour de la place du Capitole. Zone piétonne, immeubles en brique rose, nombreux commerces et restaurants. Centre névralgique de la ville.",
  accesStationnement: "Zone 100% piétonne, accès véhicules très réglementé, livraisons en horaires restreints, stationnement impossible",
  destinationsFrequentes: [
    {
      href: "/toulouse-vers-paris",
      title: "Capitole → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Capitole ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function CapitolePage() {
  return <LocalPage {...capitole-toulouseData} />;
}