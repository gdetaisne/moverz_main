import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("marseille/bonneveine-marseille", "Bonneveine");

const bonneveine-marseilleData = {
  zone: "marseille/bonneveine-marseille",
  zoneDisplay: "Bonneveine",
  description: "Service professionnel de déménagement dans le quartier Bonneveine",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "160+",
    demenageurs: "9+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier balnéaire du 8ème arrondissement avec la plage du Prado. Résidences modernes et espaces verts. Proche du Parc Borély.",
  accesStationnement: "Accès plage réglementé l'été, circulation dense le week-end, stationnement limité près du bord de mer",
  destinationsFrequentes: [
    {
      href: "/marseille-vers-paris",
      title: "Bonneveine → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Bonneveine ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function BonneveinePage() {
  return <LocalPage {...bonneveine-marseilleData} />;
}