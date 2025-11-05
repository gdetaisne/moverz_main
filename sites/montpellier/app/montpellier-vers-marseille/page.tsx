import CorridorPage from "@/app/_templates/CorridorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Déménagement Montpellier → Marseille | Devis gratuit & IA",
  description: "Déménagement de Montpellier vers Marseille. Distance 170 km, 1h45-2h de route. Prix indicatifs : Studio 450-900€, T2/T3 700-1300€. Devis gratuit avec estimation IA.",
  keywords: "déménagement Montpellier Marseille, déménageur Montpellier Marseille, devis déménagement",
};

const corridorData = {
  destination: "Marseille",
  distance: "170 km",
  tempsMoyen: "1h45-2h",
  periodeConseillee: "Toute l'année",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "450-900€",
      description: "Déménagement Montpellier → Marseille : 170 km, 1h45. Studio/T1 (10-15 m³) dès 450-900€. Devis gratuit sous 7j. Équipe pro, emballage inclus."
    },
    { type: "T2/T3", prix: "700-1300€", description: "Volume : 20-35 m³" },
    { type: "T4/Maison", prix: "1300-2500€", description: "Volume : 40-80 m³" }
  ],
  accesArrivee: "Contraintes à Marseille : relief important (collines), rues très étroites dans le Vieux-Port et le Panier, stationnement très limité, zones piétonnes nombreuses. Nos déménageurs marseillais connaissent parfaitement ces contraintes.",
  conseils: [
    "Distance courte, déménagement faisable en 1 journée",
    "Anticiper les contraintes d'accès à Marseille (relief, ruelles)",
    "Demander les autorisations pour le centre historique",
    "Trajet rapide sur autoroute A9"
  ],
  faq: [
    {
      question: "Combien de temps prend un déménagement Montpellier-Montpellier ?",
      answer: "Le trajet dure 1h45-2h. Le déménagement complet se fait généralement en 1 journée pour tous les volumes standards."
    },
    {
      question: "Quelles sont les contraintes à l'arrivée à Montpellier ?",
      answer: "Montpellier présente des contraintes importantes : relief, rues très étroites (Vieux-Port, Panier), stationnement très limité. Nos déménageurs marseillais sont experts de ces contraintes."
    },
    {
      question: "Quel est le tarif moyen pour ce trajet ?",
      answer: "Pour un T2/T3, comptez 700-1300€ selon le volume exact et les contraintes d'accès. C'est un trajet court et économique."
    }
  ]
};

export default function MontpellierVersMarseilPage() {
  return <CorridorPage {...corridorData} />;
}

