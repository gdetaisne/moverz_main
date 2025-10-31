import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';
import { generateLocalPageMetadata } from '@/app/_templates/LocalPage';

export const metadata: Metadata = generateLocalPageMetadata('hautepierre', 'Hautepierre');


const strasbourgHautepierreData = {
  zone: "hautepierre",
  zoneDisplay: "Hautepierre",
  description: `Grand ensemble moderne de Strasbourg, architecture des années 70. Accès facilité par les grandes avenues.`,
  coverImage: "/images/quartiers/strasbourg/hautepierre.jpg",
  accessInfo: "Boulevards larges, parkings nombreux, immeubles avec ascenseurs",
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

export default function StrasbourgHautepierrePage() {
  return <LocalPage {...strasbourgHautepierreData} />;
}
