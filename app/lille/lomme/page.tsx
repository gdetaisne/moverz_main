import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';

export const metadata: Metadata = {
  title: `Déménagement à Lomme (Lille) | Devis gratuit & IA`,
  description: `Déménagement à Lomme (Lille). Quartier résidentiel moderne de Lille, proche des zones d'activité. Accès facilité. Accès: Boulevards larges, parkings nombreux, immeubles récents. Devis gratuit avec estimation IA.`,
  keywords: `déménagement Lomme Lille, déménageurs Lille, devis déménagement Lille, Boulevards larges, parkings nombreux, immeubles récents`,
};

const lilleLommeData = {
  zone: "lomme",
  zoneDisplay: "Lomme",
  description: `Quartier résidentiel moderne de Lille, proche des zones d'activité. Accès facilité.`,
  coverImage: "/images/quartiers/lille/lomme.jpg",
  accessInfo: "Boulevards larges, parkings nombreux, immeubles récents",
  pricing: {
    studio: { min: 800, max: 1200 },
    t2: { min: 1200, max: 1800 },
    t3: { min: 1800, max: 2500 },
    t4: { min: 2500, max: 3500 },
    t5: { min: 3500, max: 4500 }
  },
  destinations: [
    { name: "Lille intra-muros", slug: "lille" },
    { name: "Paris", slug: "paris" },
    { name: "Lyon", slug: "lyon" },
    { name: "Toulouse", slug: "toulouse" },
    { name: "France entière", slug: "france" }
  ],
  partners: [
    {
      name: "Déménageur Lille",
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

export default function LilleLommePage() {
  return <LocalPage {...lilleLommeData} />;
}
