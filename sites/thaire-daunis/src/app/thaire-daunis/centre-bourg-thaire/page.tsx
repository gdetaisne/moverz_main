import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("thaire-daunis/centre-bourg-thaire", "Centre-Bourg");

const centrebourgthaireData = {
  zone: "thaire-daunis/centre-bourg-thaire",
  zoneDisplay: "Centre-Bourg",
  description: "Service professionnel de déménagement dans le quartier Centre-Bourg",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "30+",
    demenageurs: "5+",
    delai: "3-5 jours"
  },
  pourquoiMoverz: "Cœur du village, commerces et services de proximité",
  accesStationnement: "Rues étroites dans le centre historique",
  destinationsFrequentes: [
    {
      href: "/thaire-daunis-vers-paris",
      title: "Centre-Bourg → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Centre-Bourg ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function CentreBourgPage() {
  return <LocalPage {...centrebourgthaireData} />;
}