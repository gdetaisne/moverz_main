import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("lyon/guillotiere-lyon", "Guillotière");

const guillotiere-lyonData = {
  zone: "lyon/guillotiere-lyon",
  zoneDisplay: "Guillotière",
  description: "Service professionnel de déménagement dans le quartier Guillotière",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "200+",
    demenageurs: "12+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier multiculturel et étudiant proche des universités. Marché alimentaire, commerces variés. Ambiance cosmopolite et animée.",
  accesStationnement: "Circulation dense, stationnement difficile, rues étroites, forte affluence commerciale",
  destinationsFrequentes: [
    {
      href: "/lyon-vers-paris",
      title: "Guillotière → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Guillotière ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function GuillotièrePage() {
  return <LocalPage {...guillotiere-lyonData} />;
}