import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("strasbourg/petite-france-strasbourg", "Petite France");

const petite-france-strasbourgData = {
  zone: "strasbourg/petite-france-strasbourg",
  zoneDisplay: "Petite France",
  description: "Service professionnel de déménagement dans le quartier Petite France",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "160+",
    demenageurs: "9+",
    delai: "8 jours"
  },
  pourquoiMoverz: "Quartier pittoresque avec maisons à colombages sur canaux. Anciennes tanneries, écluses, ponts couverts. Très touristique et photogénique.",
  accesStationnement: "Ruelles très étroites, ponts bas, canaux, zone piétonne, impossible d'accéder en véhicule",
  destinationsFrequentes: [
    {
      href: "/strasbourg-vers-paris",
      title: "Petite France → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Petite France ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Petite FrancePage() {
  return <LocalPage {...petite-france-strasbourgData} />;
}