import CorridorPage from "@/app/_templates/CorridorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déménagement Montpellier → Toulouse | Devis gratuit & IA",
  description: "Déménagement de Montpellier vers Toulouse. Distance 240 km, 2h30-3h de route. Prix indicatifs : Studio 500-1000€, T2/T3 800-1500€. Devis gratuit avec estimation IA.",
  keywords: "déménagement Montpellier Toulouse, déménageur Montpellier Toulouse, devis déménagement",
};

const corridorData = {
  destination: "Toulouse",
  distance: "240 km",
  tempsMoyen: "2h30-3h",
  periodeConseillee: "Toute l'année",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "500-1000€",
      description: "Déménagement montpellier → Toulouse : 245 km, 2h30. Studio/T1 (10-15 m³) dès 500-1000€. Devis gratuit sous 7j. Équipe pro, emballage inclus."
    },
    { type: "T2/T3", prix: "800-1500€", description: "Volume : 20-35 m³" },
    { type: "T4/Maison", prix: "1500-2800€", description: "Volume : 40-80 m³" }
  ],
  accesArrivee: "Contraintes à Toulouse : centre-ville dense, stationnement limité dans le centre historique (Capitole, Saint-Cyprien), autorisations nécessaires dans certaines zones. Nos déménageurs connaissent bien Toulouse.",
  conseils: [
    "Distance courte, déménagement souvent faisable en 1 journée",
    "Anticiper les autorisations si centre-ville de Toulouse",
    "Trajet rapide, idéal pour optimiser les coûts",
    "Prévoir les contraintes d'accès selon le quartier"
  ],
  faq: [
    {
      question: "Combien de temps prend un déménagement Montpellier-Toulouse ?",
      answer: "Le trajet dure 2h30-3h. Le déménagement complet se fait généralement en 1 journée, sauf pour les très gros volumes."
    },
    {
      question: "Quelles sont les contraintes à l'arrivée à Toulouse ?",
      answer: "Le centre-ville de Toulouse (Capitole, Saint-Cyprien) présente des contraintes de stationnement et d'accès. Nos déménageurs connaissent les créneaux et les zones de déchargement."
    },
    {
      question: "Quel est le tarif moyen pour ce trajet ?",
      answer: "Pour un T2/T3, comptez 800-1500€ selon le volume exact et les contraintes d'accès aux deux adresses. C'est l'un des trajets les plus économiques."
    }
  ]
};

export default function MontpellierVersToulousePage() {
  return <CorridorPage {...corridorData} />;
}

