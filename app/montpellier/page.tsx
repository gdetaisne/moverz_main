import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("Montpellier", "Montpellier");

const MontpellierData = {
  zone: "Montpellier",
  zoneDisplay: "Montpellier",
  description: "Service professionnel de déménagement dans le centre de Montpellier",
  stats: {
    dossiers: "+140",
    demenageurs: "22",
    delai: "3-5"
  },
  pourquoiMoverz: "Montpellier, capitale de l'Occitanie, offre un cadre de vie exceptionnel entre mer et garrigue. Notre équipe d'experts déménageurs connaît parfaitement les spécificités de la ville : ruelles étroites du centre historique (Écusson), tramway moderne (4 lignes), quartiers en pleine expansion comme Port Marianne ou Antigone. Nous vous accompagnons dans votre projet de déménagement avec des déménageurs locaux certifiés qui maîtrisent les accès et les particularités de chaque quartier montpelliérain.",
  accesStationnement: "Montpellier présente des défis spécifiques pour les déménagements : centre historique (Écusson) avec ruelles médiévales très étroites, tramway (4 lignes) qui traverse toute la ville, stationnement limité dans le centre, zones piétonnes nombreuses. Nos partenaires déménageurs connaissent parfaitement les créneaux autorisés, les zones de déchargement et les contraintes de circulation. Ils s'adaptent aux gabarits de camions selon les quartiers et optimisent les horaires pour éviter les embouteillages.",
  destinationsFrequentes: [
    {
      href: "/montpellier-vers-paris",
      title: "Montpellier → Paris",
      description: "Longue distance, planification optimale recommandée."
    },
    {
      href: "/montpellier-vers-lyon",
      title: "Montpellier → Lyon",
      description: "Axe fréquent, optimisation du volume conseillée."
    },
    {
      href: "/montpellier-vers-toulouse",
      title: "Montpellier → Toulouse",
      description: "Distance moyenne, stationnement à planifier."
    },
    {
      href: "/montpellier-vers-marseille",
      title: "Montpellier → Marseille",
      description: "Axe méditerranéen, contraintes similaires à l'arrivée."
    }
  ],
  partenaires: [
    {
      name: "Déménageur Montpellier Express",
      rating: 4.7,
      reviews: 54,
      specialties: ["Déménagements particuliers", "Déménagements professionnels"]
    },
    {
      name: "Hérault Déménagements",
      rating: 4.6,
      reviews: 48,
      specialties: ["Garde-meuble", "Stockage sécurisé"]
    },
    {
      name: "Montpellier Déménagement Services",
      rating: 4.5,
      reviews: 38,
      specialties: ["Déménagements express", "Emballage professionnel"]
    }
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement à Montpellier ?",
      answer: "Nos partenaires déménageurs à Montpellier peuvent généralement intervenir sous 7 jours. Pour les déménagements urgents, certains peuvent se libérer en 48h selon la période."
    },
    {
      question: "Comment se déroule l'accès au logement à Montpellier ?",
      answer: "Nos déménageurs connaissent parfaitement les contraintes montpelliéraines : ruelles de l'Écusson, tramway, stationnement limité. Ils s'adaptent aux créneaux autorisés et optimisent les horaires."
    },
    {
      question: "Quels sont les tarifs pour un déménagement à Montpellier ?",
      answer: "Les tarifs varient selon le volume, la distance et les contraintes d'accès. Comptez 300-500€ pour un studio, 500-800€ pour un T2/T3, 800-1500€ pour une maison."
    },
    {
      question: "Les déménageurs sont-ils assurés ?",
      answer: "Tous nos partenaires déménageurs à Montpellier sont certifiés et assurés. Nous vérifions régulièrement leur couverture d'assurance et leur qualité de service."
    },
    {
      question: "Peut-on déménager le week-end à Montpellier ?",
      answer: "Oui, la plupart de nos partenaires proposent des créneaux week-end. Les tarifs peuvent être majorés de 20-30% selon les prestations."
    },
    {
      question: "Comment préparer mon déménagement à Montpellier ?",
      answer: "Préparez votre inventaire en ligne en 30 minutes. Nos déménageurs vous conseilleront sur l'emballage, les créneaux optimaux et les contraintes spécifiques à votre quartier."
    }
  ]
};

export default function MontpellierPage() {
  return <LocalPage {...MontpellierData} />;
}

