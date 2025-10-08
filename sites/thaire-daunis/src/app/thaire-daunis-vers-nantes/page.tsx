import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("Thairé d'Aunis vers Nantes");

const thairedaunisversnantesData = {
  destination: "Thairé d'Aunis vers Nantes",
  distance: "150 km",
  tempsMoyen: "1h45-2h30",
  periodeConseillee: "Mai-Sept",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "550-900€",
      description: "Volume : 10-15 m³"
    }
  ],
  accesArrivee: "Contraintes spécifiques à Thairé d'Aunis vers Nantes",
  conseils: [
    "Anticipez les créneaux de livraison",
    "Prévoyez des protections renforcées",
    "Vérifiez les contraintes d'accès"
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement Thairé d'Aunis → Thairé d'Aunis vers Nantes ?",
      answer: "Nos partenaires déménageurs peuvent généralement intervenir sous 7 jours."
    }
  ]
};

export default function ThairdAunisversNantesPage() {
  return <CorridorPage {...thairedaunisversnantesData} />;
}