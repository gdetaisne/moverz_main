import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';

export const metadata: Metadata = {
  title: `Déménagement à Wazemmes (Lille) | Devis gratuit & IA`,
  description: `Déménagement à Wazemmes (Lille). Quartier populaire de Lille, marché et mixité sociale. Accès varié selon les secteurs. Accès: Rues normales, parkings limités, mixité ancien/moderne. Devis gratuit avec estimation IA.`,
  keywords: `déménagement Wazemmes Lille, déménageurs Lille, devis déménagement Lille, Rues normales, parkings limités, mixité ancien/moderne`,
};

const lilleWazemmesData = {
  zone: "wazemmes",
  zoneDisplay: "Wazemmes",
  description: `Quartier populaire de Lille, marché et mixité sociale. Accès varié selon les secteurs.`,
  coverImage: "/images/quartiers/lille/wazemmes.jpg",
  accessInfo: "Rues normales, parkings limités, mixité ancien/moderne",
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

export default function LilleWazemmesPage() {
  return <LocalPage {...lilleWazemmesData} />;
}
