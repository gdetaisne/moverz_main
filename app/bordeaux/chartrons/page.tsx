import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("bordeaux/chartrons", "Chartrons");

const chartronsData = {
  zone: "bordeaux/chartrons",
  zoneDisplay: "Chartrons",
  description: "Service professionnel de déménagement dans le quartier historique des Chartrons",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "+45",
    demenageurs: "15",
    delai: "3-5"
  },
  pourquoiMoverz: "Les Chartrons, quartier historique de bordeaux, offrent un cadre de vie exceptionnel avec ses rues pavées, ses antiquaires et sa proximité avec la Garonne. Ce quartier prisé présente des défis spécifiques pour les déménagements : rues étroites, immeubles anciens, stationnement limité. Nos déménageurs spécialisés connaissent parfaitement ces contraintes et s'adaptent aux particularités architecturales du quartier.",
  accesStationnement: "Les Chartrons présentent des contraintes d'accès spécifiques : rues étroites et pavées, stationnement très limité, immeubles anciens avec escaliers étroits. Nos partenaires déménageurs maîtrisent les créneaux autorisés, les zones de déchargement temporaire et optimisent les horaires pour éviter les heures de pointe. Ils utilisent des véhicules adaptés aux gabarits des rues historiques.",
  destinationsFrequentes: [
    {
      href: "/bordeaux-vers-paris",
      title: "Chartrons → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    },
    {
      href: "/bordeaux-vers-toulouse",
      title: "Chartrons → Toulouse",
      description: "Axe fréquent, optimisation des créneaux de sortie."
    }
  ],
  partenaires: [
    {
      name: "Déménageur bordeaux",
      rating: 4.8,
      reviews: 69,
      specialties: ["Expertise des rues étroites", "Immeubles anciens"]
    },
    {
      name: "Alex Déménagement",
      rating: 4.7,
      reviews: 45,
      specialties: ["Adaptation aux contraintes d'accès", "Quartier historique"]
    },
    {
      name: "SAM'DÉMÉNAGE",
      rating: 4.6,
      reviews: 28,
      specialties: ["Gestion du stationnement limité", "Rues pavées"]
    },
    {
      name: "Burdigala Déménagement",
      rating: 4.3,
      reviews: 6,
      specialties: ["Bâtiments historiques", "Services adaptés"]
    }
  ],
  faq: [
    {
      question: "Comment gérer le stationnement aux Chartrons ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues étroites."
    },
    {
      question: "Quelles sont les contraintes des immeubles anciens ?",
      answer: "Les immeubles des Chartrons ont souvent des escaliers étroits et des contraintes d'accès. Nos déménageurs s'adaptent avec du matériel spécialisé et des techniques appropriées."
    },
    {
      question: "Peut-on déménager en semaine aux Chartrons ?",
      answer: "Oui, mais il faut anticiper les créneaux autorisés et éviter les heures de pointe. Nos partenaires connaissent les meilleurs horaires pour ce quartier."
    },
    {
      question: "Quels sont les tarifs pour les Chartrons ?",
      answer: "Les tarifs sont majorés de 15-20% en raison des contraintes d'accès. Comptez 350-600€ pour un studio, 600-950€ pour un T2/T3."
    },
    {
      question: "Comment préparer un déménagement aux Chartrons ?",
      answer: "Préparez votre inventaire en ligne et mentionnez les contraintes d'accès. Nos déménageurs vous conseilleront sur l'optimisation des créneaux et du matériel."
    },
    {
      question: "Les déménageurs connaissent-ils le quartier ?",
      answer: "Tous nos partenaires ont une excellente connaissance des Chartrons : rues, contraintes, créneaux autorisés. Ils s'adaptent aux spécificités de ce quartier historique."
    }
  ]
};

export default function ChartronsPage() {
  return <LocalPage {...chartronsData} />;
}