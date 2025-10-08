import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("strasbourg/quartier-europeen-strasbourg", "Quartier Européen");

const quartier-europeen-strasbourgData = {
  zone: "strasbourg/quartier-europeen-strasbourg",
  zoneDisplay: "Quartier Européen",
  description: "Service professionnel de déménagement dans le quartier Quartier Européen",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "130+",
    demenageurs: "7+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier institutionnel avec Parlement européen, Conseil de l'Europe. Architecture moderne, espaces verts. Cadre international.",
  accesStationnement: "Sécurité renforcée certains jours, circulation réglementée, stationnement limité",
  destinationsFrequentes: [
    {
      href: "/strasbourg-vers-paris",
      title: "Quartier Européen → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Quartier Européen ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Quartier EuropéenPage() {
  return <LocalPage {...quartier-europeen-strasbourgData} />;
}