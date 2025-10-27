import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';

export const metadata: Metadata = {
  title: `Déménagement à Cronenbourg (Strasbourg) | Devis gratuit & IA`,
  description: `Déménagement à Cronenbourg (Strasbourg). Quartier populaire de Strasbourg avec mixité sociale. Logements variés et accès généralement facilité. Accès: Rues normales, parkings de rue, immeubles et maisons individuelles. Devis gratuit avec estimation IA.`,
  keywords: `déménagement Cronenbourg Strasbourg, déménageurs Strasbourg, devis déménagement Strasbourg, Rues normales, parkings de rue, immeubles et maisons individuelles`,
};

const strasbourgCronenbourgData = {
  zone: "cronenbourg",
  zoneDisplay: "Cronenbourg",
  description: `Quartier populaire de Strasbourg avec mixité sociale. Logements variés et accès généralement facilité.`,
  coverImage: "/images/quartiers/strasbourg/cronenbourg.jpg",
  accessInfo: "Rues normales, parkings de rue, immeubles et maisons individuelles",
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

export default function StrasbourgCronenbourgPage() {
  return <LocalPage {...strasbourgCronenbourgData} />;
}
