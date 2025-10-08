import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("marseille/endoume-marseille", "Endoume");

const endoume-marseilleData = {
  zone: "marseille/endoume-marseille",
  zoneDisplay: "Endoume",
  description: "Service professionnel de déménagement dans le quartier Endoume",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "180+",
    demenageurs: "10+",
    delai: "7 jours"
  },
  pourquoiMoverz: "Quartier résidentiel du 7ème arrondissement, proche du bord de mer et des Calanques. Immeubles bourgeois et petites maisons. Cadre de vie privilégié.",
  accesStationnement: "Rues étroites, relief important, accès limité au littoral, stationnement résidentiel",
  destinationsFrequentes: [
    {
      href: "/marseille-vers-paris",
      title: "Endoume → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Endoume ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function EndoumePage() {
  return <LocalPage {...endoume-marseilleData} />;
}