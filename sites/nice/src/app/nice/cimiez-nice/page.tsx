import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("nice/cimiez-nice", "Cimiez");

const cimiez-niceData = {
  zone: "nice/cimiez-nice",
  zoneDisplay: "Cimiez",
  description: "Service professionnel de déménagement dans le quartier Cimiez",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "150+",
    demenageurs: "8+",
    delai: "7 jours"
  },
  pourquoiMoverz: "Quartier résidentiel sur les hauteurs, jardins romains, musée Matisse. Immeubles bourgeois, calme et verdoyant. Vue panoramique sur Nice.",
  accesStationnement: "Colline avec pentes raides, rues étroites, accès difficile pour gros véhicules",
  destinationsFrequentes: [
    {
      href: "/nice-vers-paris",
      title: "Cimiez → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Cimiez ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function CimiezPage() {
  return <LocalPage {...cimiez-niceData} />;
}