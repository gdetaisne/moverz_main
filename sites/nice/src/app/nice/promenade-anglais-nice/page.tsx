import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("nice/promenade-anglais-nice", "Promenade des Anglais");

const promenade-anglais-niceData = {
  zone: "nice/promenade-anglais-nice",
  zoneDisplay: "Promenade des Anglais",
  description: "Service professionnel de déménagement dans le quartier Promenade des Anglais",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "180+",
    demenageurs: "10+",
    delai: "7 jours"
  },
  pourquoiMoverz: "Front de mer emblématique avec immeubles Belle Époque. Vue mer, restaurants, hôtels. Quartier prisé et prestigieux.",
  accesStationnement: "Circulation dense, stationnement quasi-impossible, accès réglementé, forte affluence touristique",
  destinationsFrequentes: [
    {
      href: "/nice-vers-paris",
      title: "Promenade des Anglais → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Promenade des Anglais ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Promenade des AnglaisPage() {
  return <LocalPage {...promenade-anglais-niceData} />;
}