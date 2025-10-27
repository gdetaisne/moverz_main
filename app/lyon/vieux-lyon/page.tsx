import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';

export const metadata: Metadata = {
  title: `Déménagement à Vieux Lyon (Lyon) | Devis gratuit & IA`,
  description: `Déménagement à Vieux Lyon (Lyon). Quartier Renaissance de Lyon, patrimoine UNESCO. Rues pavées et traboules. Accès très délicat. Accès: Rues piétonnes, traboules étroites, parkings inexistants, escaliers anciens. Devis gratuit avec estimation IA.`,
  keywords: `déménagement Vieux Lyon Lyon, déménageurs Lyon, devis déménagement Lyon, Rues piétonnes, traboules étroites, parkings inexistants, escaliers anciens`,
};

const lyonVieuxLyonData = {
  zone: "vieux-lyon",
  zoneDisplay: "Vieux Lyon",
  description: `Quartier Renaissance de Lyon, patrimoine UNESCO. Rues pavées et traboules. Accès très délicat.`,
  coverImage: "/images/quartiers/lyon/vieux-lyon.jpg",
  accessInfo: "Rues piétonnes, traboules étroites, parkings inexistants, escaliers anciens",
  pricing: {
    studio: { min: 800, max: 1200 },
    t2: { min: 1200, max: 1800 },
    t3: { min: 1800, max: 2500 },
    t4: { min: 2500, max: 3500 },
    t5: { min: 3500, max: 4500 }
  },
  destinations: [
    { name: "Lyon intra-muros", slug: "lyon" },
    { name: "Paris", slug: "paris" },
    { name: "Lyon", slug: "lyon" },
    { name: "Toulouse", slug: "toulouse" },
    { name: "France entière", slug: "france" }
  ],
  partners: [
    {
      name: "Déménageur Lyon",
      rating: 4.8,
      reviews: 69,
      specialties: ["Déménagements locaux", "Gestion des contraintes d'accès"]
    },
    {
      name: "Alex Déménagement",
      rating: 4.7,
      reviews: 45,
      specialties: ["Déménagements express", "Emballage professionnel"]
    },
    {
      name: "SAM'DÉMÉNAGE",
      rating: 4.6,
      reviews: 28,
      specialties: ["Déménagements économiques", "Service personnalisé"]
    }
  ]
};

export default function LyonVieuxLyonPage() {
  return <LocalPage {...lyonVieuxLyonData} />;
}
