import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("strasbourg/krutenau-strasbourg", "Krutenau");

const krutenau-strasbourgData = {
  zone: "strasbourg/krutenau-strasbourg",
  zoneDisplay: "Krutenau",
  description: "Service professionnel de déménagement dans le quartier Krutenau",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "150+",
    demenageurs: "8+",
    delai: "6 jours"
  },
  pourquoiMoverz: "Quartier étudiant animé près de l'université. Bars, restaurants, petits commerces. Ambiance jeune et dynamique. Proche des quais.",
  accesStationnement: "Rues étroites, circulation dense, stationnement difficile, forte affluence étudiante",
  destinationsFrequentes: [
    {
      href: "/strasbourg-vers-paris",
      title: "Krutenau → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Krutenau ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function KrutenauPage() {
  return <LocalPage {...krutenau-strasbourgData} />;
}