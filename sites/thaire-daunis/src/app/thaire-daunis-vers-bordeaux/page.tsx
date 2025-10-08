import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("Thairé d'Aunis vers Bordeaux");

const thairedaunisversbordeauxData = {
  destination: "Thairé d'Aunis vers Bordeaux",
  distance: "180 km",
  tempsMoyen: "2-3h",
  periodeConseillee: "Mai-Sept",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "600-1000€",
      description: "Volume : 10-15 m³"
    }
  ],
  accesArrivee: "Contraintes spécifiques à Thairé d'Aunis vers Bordeaux",
  conseils: [
    "Anticipez les créneaux de livraison",
    "Prévoyez des protections renforcées",
    "Vérifiez les contraintes d'accès"
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement Thairé d'Aunis → Thairé d'Aunis vers Bordeaux ?",
      answer: "Nos partenaires déménageurs peuvent généralement intervenir sous 7 jours."
    }
  ]
};

export default function ThairdAunisversBordeauxPage() {
  return <CorridorPage {...thairedaunisversbordeauxData} />;
}