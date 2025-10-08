import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("marseille/castellane-marseille", "Castellane");

const castellane-marseilleData = {
  zone: "marseille/castellane-marseille",
  zoneDisplay: "Castellane",
  description: "Service professionnel de déménagement dans le quartier Castellane",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "220+",
    demenageurs: "14+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier résidentiel et commercial du 6ème arrondissement. Place centrale avec fontaine, nombreux commerces et restaurants. Bien desservi par le métro.",
  accesStationnement: "Circulation dense, stationnement payant et limité, livraisons réglementées",
  destinationsFrequentes: [
    {
      href: "/marseille-vers-paris",
      title: "Castellane → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Castellane ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function CastellanePage() {
  return <LocalPage {...castellane-marseilleData} />;
}