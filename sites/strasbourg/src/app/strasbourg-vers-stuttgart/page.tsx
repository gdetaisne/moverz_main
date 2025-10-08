import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("Stuttgart (Allemagne)");

const strasbourg-vers-stuttgartData = {
  destination: "Stuttgart (Allemagne)",
  distance: "155 km",
  tempsMoyen: "2h",
  periodeConseillee: "Mai-Sept",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "800-1200€",
      description: "Volume : 10-15 m³"
    }
  ],
  accesArrivee: "Contraintes spécifiques à Stuttgart (Allemagne)",
  conseils: [
    "Anticipez les créneaux de livraison",
    "Prévoyez des protections renforcées",
    "Vérifiez les contraintes d'accès"
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement undefined → Stuttgart (Allemagne) ?",
      answer: "Nos partenaires déménageurs peuvent généralement intervenir sous 7 jours."
    }
  ]
};

export default function Stuttgart (Allemagne)Page() {
  return <CorridorPage {...strasbourg-vers-stuttgartData} />;
}