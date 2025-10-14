import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';

export const metadata: Metadata = {
  title: `Déménagement à Ile de Nantes (Nantes) | Devis gratuit & IA`,
  description: `Déménagement à Ile de Nantes (Nantes). Quartier en reconversion de Nantes, Loire et créativité. Logements modernes et accès facilité. Accès: Boulevards larges, parkings souterrains, immeubles récents. Devis gratuit avec estimation IA.`,
  keywords: `déménagement Ile de Nantes Nantes, déménageurs Nantes, devis déménagement Nantes, Boulevards larges, parkings souterrains, immeubles récents`,
};

const nantesIledeNantesData = {
  zone: "ile-nantes",
  zoneDisplay: "Ile de Nantes",
  description: `Quartier en reconversion de Nantes, Loire et créativité. Logements modernes et accès facilité.`,
  coverImage: "/images/quartiers/nantes/ile-nantes.jpg",
  accessInfo: "Boulevards larges, parkings souterrains, immeubles récents",
  pricing: {
    studio: { min: 800, max: 1200 },
    t2: { min: 1200, max: 1800 },
    t3: { min: 1800, max: 2500 },
    t4: { min: 2500, max: 3500 },
    t5: { min: 3500, max: 4500 }
  },
  destinations: [
    { name: "Nantes intra-muros", slug: "nantes" },
    { name: "Paris", slug: "paris" },
    { name: "Lyon", slug: "lyon" },
    { name: "Toulouse", slug: "toulouse" },
    { name: "France entière", slug: "france" }
  ],
  partners: [
    {
      name: "Déménageur Nantes",
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

export default function NantesIledeNantesPage() {
  return <LocalPage {...nantesIledeNantesData} />;
}
