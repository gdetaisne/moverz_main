import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("Mulhouse");

const strasbourg-vers-mulhouseData = {
  destination: "Mulhouse",
  distance: "110 km",
  tempsMoyen: "1-2h",
  periodeConseillee: "Mai-Sept",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "800-1200€",
      description: "Volume : 10-15 m³"
    }
  ],
  accesArrivee: "Contraintes spécifiques à Mulhouse",
  conseils: [
    "Anticipez les créneaux de livraison",
    "Prévoyez des protections renforcées",
    "Vérifiez les contraintes d'accès"
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement undefined → Mulhouse ?",
      answer: "Nos partenaires déménageurs peuvent généralement intervenir sous 7 jours."
    }
  ]
};

export default function MulhousePage() {
  return <CorridorPage {...strasbourg-vers-mulhouseData} />;
}