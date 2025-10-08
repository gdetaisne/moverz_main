import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("Paris");

const toulouse-vers-parisData = {
  destination: "Paris",
  distance: "680 km",
  tempsMoyen: "6-7h",
  periodeConseillee: "Mai-Sept",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "800-1200€",
      description: "Volume : 10-15 m³"
    }
  ],
  accesArrivee: "Contraintes spécifiques à Paris",
  conseils: [
    "Anticipez les créneaux de livraison",
    "Prévoyez des protections renforcées",
    "Vérifiez les contraintes d'accès"
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement undefined → Paris ?",
      answer: "Nos partenaires déménageurs peuvent généralement intervenir sous 7 jours."
    }
  ]
};

export default function ParisPage() {
  return <CorridorPage {...toulouse-vers-parisData} />;
}