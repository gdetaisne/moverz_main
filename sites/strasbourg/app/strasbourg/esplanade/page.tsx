import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';

export const metadata: Metadata = {
  title: `Déménagement à Esplanade (Strasbourg) | Devis gratuit & IA`,
  description: `Déménagement à Esplanade (Strasbourg). Quartier universitaire de Strasbourg, proche du campus et des résidences étudiantes. Accès varié selon les secteurs. Accès: Avenues principales, parkings limités, mixité immeubles/maisons. Devis gratuit avec estimation IA.`,
  keywords: `déménagement Esplanade Strasbourg, déménageurs Strasbourg, devis déménagement Strasbourg, Avenues principales, parkings limités, mixité immeubles/maisons`,
};

const strasbourgEsplanadeData = {
  zone: "esplanade",
  zoneDisplay: "Esplanade",
  description: `Quartier universitaire de Strasbourg, proche du campus et des résidences étudiantes. Accès varié selon les secteurs.`,
  coverImage: "/images/quartiers/strasbourg/esplanade.jpg",
  accessInfo: "Avenues principales, parkings limités, mixité immeubles/maisons",
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

export default function StrasbourgEsplanadePage() {
  return <LocalPage {...strasbourgEsplanadeData} />;
}
