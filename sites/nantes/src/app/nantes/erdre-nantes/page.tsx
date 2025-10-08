import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("nantes/erdre-nantes", "Erdre");

const erdre-nantesData = {
  zone: "nantes/erdre-nantes",
  zoneDisplay: "Erdre",
  description: "Service professionnel de déménagement dans le quartier Erdre",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "160+",
    demenageurs: "9+",
    delai: "5 jours"
  },
  pourquoiMoverz: "Quartiers le long de l'Erdre ("la plus belle rivière de France"). Espaces verts, bords de rivière aménagés. Cadre de vie très agréable.",
  accesStationnement: "Accès par quelques ponts, stationnement résidentiel, rues calmes, peu de contraintes",
  destinationsFrequentes: [
    {
      href: "/nantes-vers-paris",
      title: "Erdre → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Erdre ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function ErdrePage() {
  return <LocalPage {...erdre-nantesData} />;
}