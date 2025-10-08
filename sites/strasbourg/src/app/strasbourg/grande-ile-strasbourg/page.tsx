import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("strasbourg/grande-ile-strasbourg", "Grande Île");

const grande-ile-strasbourgData = {
  zone: "strasbourg/grande-ile-strasbourg",
  zoneDisplay: "Grande Île",
  description: "Service professionnel de déménagement dans le quartier Grande Île",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "180+",
    demenageurs: "10+",
    delai: "8 jours"
  },
  pourquoiMoverz: "Cœur historique de Strasbourg classé UNESCO. Cathédrale, maisons à colombages, canaux. Centre touristique et administratif. Architecture médiévale préservée.",
  accesStationnement: "Zone piétonne étendue, ruelles étroites, accès véhicules très réglementé, canaux, stationnement impossible",
  destinationsFrequentes: [
    {
      href: "/strasbourg-vers-paris",
      title: "Grande Île → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Grande Île ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Grande ÎlePage() {
  return <LocalPage {...grande-ile-strasbourgData} />;
}