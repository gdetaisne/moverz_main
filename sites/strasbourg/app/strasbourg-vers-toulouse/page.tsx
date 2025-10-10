import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("Toulouse");

const toulouseData = {
  destination: "Toulouse",
  distance: "250 km",
  tempsMoyen: "2h30",
  periodeConseillee: "Toute l'année",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "400-600€",
      description: "Déménagement strasbourg → Toulouse : 245 km, 2h30. Studio/T1 (10-15 m³) dès 400-600€. Devis gratuit sous 7j. Équipe pro, emballage inclus."
    },
    {
      type: "T2/T3",
      prix: "600-900€",
      description: "Volume : 20-35 m³"
    },
    {
      type: "Maison",
      prix: "900-1500€",
      description: "Volume : 40-80 m³"
    }
  ],
  accesArrivee: "Toulouse présente des défis spécifiques pour les déménagements : rues étroites dans le centre historique, stationnement limité, immeubles anciens avec escaliers, contraintes de circulation. Nos partenaires déménageurs connaissent parfaitement les créneaux autorisés, les zones de déchargement et les contraintes de circulation toulousaines. Ils s'adaptent aux gabarits de camions selon les quartiers et optimisent les horaires pour éviter les embouteillages.",
  conseils: [
    "Anticipez les créneaux de livraison toulousains (généralement 8h-12h et 14h-18h)",
    "Vérifiez les contraintes d'accès de votre nouveau quartier",
    "Planifiez le stationnement temporaire avec votre déménageur",
    "Considérez un déménagement en semaine pour éviter les embouteillages",
    "Stationnement à l'arrivée à planifier selon les zones",
    "Axe fréquent, conditions généralement bonnes"
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement strasbourg → Toulouse ?",
      answer: "Nos partenaires déménageurs peuvent généralement intervenir sous 7 jours. Pour les déménagements urgents, certains peuvent se libérer en 48h selon la période."
    },
    {
      question: "Comment gérer les contraintes toulousaines ?",
      answer: "Nos déménageurs connaissent parfaitement les contraintes toulousaines : créneaux autorisés, zones de déchargement, contraintes de circulation. Ils s'adaptent aux spécificités de chaque quartier."
    },
    {
      question: "Quels sont les tarifs pour strasbourg → Toulouse ?",
      answer: "Les tarifs varient selon le volume et les contraintes d'accès toulousaines. Comptez 400-600€ pour un studio, 600-900€ pour un T2/T3, 900-1500€ pour une maison."
    },
    {
      question: "Peut-on déménager le week-end vers Toulouse ?",
      answer: "Oui, les créneaux sont généralement disponibles et les tarifs majorés de 15-20%. L'axe est fréquent, les conditions sont bonnes."
    }
  ]
};

export default function ToulousePage() {
  return <CorridorPage {...toulouseData} />;
}
