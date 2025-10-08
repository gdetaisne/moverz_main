import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("Bordeaux");

const toulouse-vers-bordeauxData = {
  destination: "Bordeaux",
  distance: "245 km",
  tempsMoyen: "2-3h",
  periodeConseillee: "Mai-Sept",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "800-1200€",
      description: "Volume : 10-15 m³"
    }
  ],
  accesArrivee: "Contraintes spécifiques à Bordeaux",
  conseils: [
    "Anticipez les créneaux de livraison",
    "Prévoyez des protections renforcées",
    "Vérifiez les contraintes d'accès"
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement undefined → Bordeaux ?",
      answer: "Nos partenaires déménageurs peuvent généralement intervenir sous 7 jours."
    }
  ]
};

export default function BordeauxPage() {
  return <CorridorPage {...toulouse-vers-bordeauxData} />;
}