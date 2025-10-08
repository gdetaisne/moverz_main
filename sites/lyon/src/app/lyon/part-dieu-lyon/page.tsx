import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("lyon/part-dieu-lyon", "Part-Dieu");

const part-dieu-lyonData = {
  zone: "lyon/part-dieu-lyon",
  zoneDisplay: "Part-Dieu",
  description: "Service professionnel de déménagement dans le quartier Part-Dieu",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "240+",
    demenageurs: "15+",
    delai: "5 jours"
  },
  pourquoiMoverz: "Quartier d'affaires moderne avec gratte-ciels, centre commercial, gare TGV. Résidences modernes et bureaux. En pleine transformation urbaine.",
  accesStationnement: "Circulation dense en semaine, accès gare réglementé, travaux fréquents, stationnement payant",
  destinationsFrequentes: [
    {
      href: "/lyon-vers-paris",
      title: "Part-Dieu → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Part-Dieu ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Part-DieuPage() {
  return <LocalPage {...part-dieu-lyonData} />;
}