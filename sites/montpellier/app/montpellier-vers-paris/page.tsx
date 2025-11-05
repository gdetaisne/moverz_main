import CorridorPage from "@/app/_templates/CorridorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déménagement Montpellier → Paris | Devis gratuit & IA",
  description: "Déménagement de Montpellier vers Paris. Distance 750 km, 7-8h de route. Prix indicatifs : Studio 1000-1800€, T2/T3 1500-2500€. Devis gratuit avec estimation IA.",
  keywords: "déménagement Montpellier Paris, déménageur Montpellier Paris, devis déménagement longue distance",
};

const corridorData = {
  destination: "Paris",
  distance: "750 km",
  tempsMoyen: "7-8h",
  periodeConseillee: "Toute l'année (éviter juillet-août pour Paris)",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "1000-1800€",
      description: "Déménagement Montpellier → Paris : 750 km, 7h00. Studio/T1 (10-15 m³) dès 1000-1800€. Devis gratuit sous 7j. Équipe pro, emballage inclus."
    },
    { type: "T2/T3", prix: "1500-2500€", description: "Volume : 20-35 m³" },
    { type: "T4/Maison", prix: "2500-4500€", description: "Volume : 40-80 m³" }
  ],
  accesArrivee: "Contraintes à Paris : zones de livraison réglementées, créneaux horaires stricts, autorisations de stationnement obligatoires, accès difficile dans le centre. Nos déménageurs connaissent les procédures.",
  conseils: [
    "Planifier 2-3 semaines à l'avance minimum",
    "Demander les autorisations de stationnement à Paris",
    "Optimiser le volume pour réduire les coûts",
    "Prévoir un créneau de 2 jours pour la sécurité"
  ],
  faq: [
    {
      question: "Combien de temps prend un déménagement Montpellier-Paris ?",
      answer: "Le trajet dure 7-8h. Le déménagement complet prend généralement 2 jours : chargement à Montpellier J, transport et déchargement à Paris J+1."
    },
    {
      question: "Quelles sont les contraintes à l'arrivée à Paris ?",
      answer: "Paris impose des contraintes strictes : zones de livraison, créneaux horaires, autorisations de stationnement. Nos déménageurs gèrent toutes les démarches."
    },
    {
      question: "Quel est le meilleur moment pour déménager à Paris ?",
      answer: "Éviter juillet-août (pics de déménagement) et les premiers jours du mois. Privilégier mi-septembre à mi-juin, en semaine si possible."
    }
  ]
};

export default function MontpellierVersParisPage() {
  return <CorridorPage {...corridorData} />;
}

