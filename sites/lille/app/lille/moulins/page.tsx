import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';
import { generateLocalPageMetadata } from '@/app/_templates/LocalPage';

export const metadata: Metadata = generateLocalPageMetadata('moulins', 'Moulins');

const lilleMoulinsData = {
  zone: "moulins",
  zoneDisplay: "Moulins",
  description: `Quartier résidentiel de Lille, proche du centre. Logements variés et accès facilité.`,
  coverImage: "/images/quartiers/lille/moulins.jpg",
  accessInfo: "Avenues principales, parkings disponibles, immeubles modernes",
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

export default function LilleMoulinsPage() {
  return <LocalPage {...lilleMoulinsData} />;
}
