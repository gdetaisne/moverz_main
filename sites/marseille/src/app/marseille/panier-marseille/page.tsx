import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("marseille/panier-marseille", "Le Panier");

const panier-marseilleData = {
  zone: "marseille/panier-marseille",
  zoneDisplay: "Le Panier",
  description: "Service professionnel de déménagement dans le quartier Le Panier",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "200+",
    demenageurs: "12+",
    delai: "8 jours"
  },
  pourquoiMoverz: "Plus ancien quartier de Marseille, ruelles étroites pavées, immeubles colorés du XVIIIe siècle. Quartier bohème et artistique en pleine rénovation.",
  accesStationnement: "Rues très étroites et pentues, impossible d'accéder en gros véhicule, nombreux escaliers, stationnement inexistant",
  destinationsFrequentes: [
    {
      href: "/marseille-vers-paris",
      title: "Le Panier → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à Le Panier ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function Le PanierPage() {
  return <LocalPage {...panier-marseilleData} />;
}