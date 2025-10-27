import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';

export const metadata: Metadata = {
  title: `Déménagement à Neudorf (Strasbourg) | Devis gratuit & IA`,
  description: `Déménagement à Neudorf (Strasbourg). Quartier résidentiel moderne de Strasbourg, proche du centre-ville et des transports. Accès facilité pour les déménagements. Accès: Avenues larges, parkings disponibles, immeubles récents avec ascenseurs. Devis gratuit avec estimation IA.`,
  keywords: `déménagement Neudorf Strasbourg, déménageurs Strasbourg, devis déménagement Strasbourg, Avenues larges, parkings disponibles, immeubles récents avec ascenseurs`,
};

const strasbourgNeudorfData = {
  zone: "neudorf",
  zoneDisplay: "Neudorf",
  description: `Quartier résidentiel moderne de Strasbourg, proche du centre-ville et des transports. Accès facilité pour les déménagements.`,
  coverImage: "/images/quartiers/strasbourg/neudorf.jpg",
  accessInfo: "Avenues larges, parkings disponibles, immeubles récents avec ascenseurs",
  pricing: {
    studio: { min: 800, max: 1200 },
    t2: { min: 1200, max: 1800 },
    t3: { min: 1800, max: 2500 },
    t4: { min: 2500, max: 3500 },
    t5: { min: 3500, max: 4500 }
  },
  destinations: [
    { name: "Strasbourg intra-muros", slug: "strasbourg" },
    { name: "Paris", slug: "paris" },
    { name: "Lyon", slug: "lyon" },
    { name: "Toulouse", slug: "toulouse" },
    { name: "France entière", slug: "france" }
  ],
  partners: [
    {
      name: "Déménageur Strasbourg",
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

export default function StrasbourgNeudorfPage() {
  return <LocalPage {...strasbourgNeudorfData} />;
}
