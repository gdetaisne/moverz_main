import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';

export const metadata: Metadata = {
  title: `Déménagement à Villejean (Rennes) | Devis gratuit & IA`,
  description: `Déménagement à Villejean (Rennes). Quartier populaire de Rennes, universités et logements sociaux. Accès généralement facilité. Accès: Boulevards larges, parkings disponibles, immeubles avec ascenseurs. Devis gratuit avec estimation IA.`,
  keywords: `déménagement Villejean Rennes, déménageurs Rennes, devis déménagement Rennes, Boulevards larges, parkings disponibles, immeubles avec ascenseurs`,
};

const rennesVillejeanData = {
  zone: "villejean",
  zoneDisplay: "Villejean",
  description: `Quartier populaire de Rennes, universités et logements sociaux. Accès généralement facilité.`,
  coverImage: "/images/quartiers/rennes/villejean.jpg",
  accessInfo: "Boulevards larges, parkings disponibles, immeubles avec ascenseurs",
  pricing: {
    studio: { min: 800, max: 1200 },
    t2: { min: 1200, max: 1800 },
    t3: { min: 1800, max: 2500 },
    t4: { min: 2500, max: 3500 },
    t5: { min: 3500, max: 4500 }
  },
  destinations: [
    { name: "Rennes intra-muros", slug: "rennes" },
    { name: "Paris", slug: "paris" },
    { name: "Lyon", slug: "lyon" },
    { name: "Toulouse", slug: "toulouse" },
    { name: "France entière", slug: "france" }
  ],
  partners: [
    {
      name: "Déménageur Rennes",
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

export default function RennesVillejeanPage() {
  return <LocalPage {...rennesVillejeanData} />;
}
