import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("Thairé d'Aunis vers La Rochelle");

const thairedaunisverslarochelleData = {
  destination: "Thairé d'Aunis vers La Rochelle",
  distance: "15 km",
  tempsMoyen: "20-30 min",
  periodeConseillee: "Mai-Sept",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "300-500€",
      description: "Volume : 10-15 m³"
    }
  ],
  accesArrivee: "Contraintes spécifiques à Thairé d'Aunis vers La Rochelle",
  conseils: [
    "Anticipez les créneaux de livraison",
    "Prévoyez des protections renforcées",
    "Vérifiez les contraintes d'accès"
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement Thairé d'Aunis → Thairé d'Aunis vers La Rochelle ?",
      answer: "Nos partenaires déménageurs peuvent généralement intervenir sous 7 jours."
    }
  ]
};

export default function ThairdAunisversLaRochellePage() {
  return <CorridorPage {...thairedaunisverslarochelleData} />;
}