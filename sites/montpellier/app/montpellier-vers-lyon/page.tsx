import CorridorPage from "@/app/_templates/CorridorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déménagement Montpellier → Lyon | Devis gratuit & IA",
  description: "Déménagement de Montpellier vers Lyon. Distance 300 km, 3-4h de route. Prix indicatifs : Studio 600-1200€, T2/T3 1000-1800€. Devis gratuit avec estimation IA.",
  keywords: "déménagement Montpellier Lyon, déménageur Montpellier Lyon, devis déménagement",
};

const corridorData = {
  destination: "Lyon",
  distance: "300 km",
  tempsMoyen: "3-4h",
  periodeConseillee: "Toute l'année",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "600-1200€",
      description: "Déménagement Montpellier → Lyon : 300 km, 3h00. Studio/T1 (10-15 m³) dès 600-1200€. Devis gratuit sous 7j. Équipe pro, emballage inclus."
    },
    { type: "T2/T3", prix: "1000-1800€", description: "Volume : 20-35 m³" },
    { type: "T4/Maison", prix: "1800-3200€", description: "Volume : 40-80 m³" }
  ],
  accesArrivee: "Contraintes à Lyon : relief (collines), rues étroites dans le Vieux-Lyon, stationnement limité en Presqu'île, autorisations nécessaires dans le centre historique. Nos déménageurs connaissent les spécificités lyonnaises.",
  conseils: [
    "Distance moyenne, peut se faire en 1 journée",
    "Anticiper les contraintes d'accès selon le quartier d'arrivée",
    "Demander les autorisations si centre-ville de Lyon",
    "Optimiser le chargement pour éviter les allers-retours"
  ],
  faq: [
    {
      question: "Combien de temps prend un déménagement Montpellier-Lyon ?",
      answer: "Le trajet dure 3-4h. Le déménagement complet peut se faire en 1 journée pour les petits volumes, ou 2 jours pour les volumes importants."
    },
    {
      question: "Quelles sont les contraintes à l'arrivée à Lyon ?",
      answer: "Lyon présente des contraintes de relief (collines) et d'accès dans le Vieux-Lyon et la Presqu'île. Nos déménageurs connaissent les créneaux et les zones de déchargement."
    },
    {
      question: "Quel est le tarif moyen pour ce trajet ?",
      answer: "Pour un T2/T3, comptez 1000-1800€ selon le volume exact et les contraintes d'accès aux deux adresses."
    }
  ]
};

export default function MontpellierVersLyonPage() {
  return <CorridorPage {...corridorData} />;
}

