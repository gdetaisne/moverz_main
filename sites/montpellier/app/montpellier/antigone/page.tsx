import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';
import { generateLocalPageMetadata } from '@/app/_templates/LocalPage';

export const metadata: Metadata = generateLocalPageMetadata('antigone', 'Antigone');


const montpellierAntigoneData = {
  zone: "antigone",
  zoneDisplay: "Antigone",
  description: `Quartier néo-classique des années 80, architecture monumentale signée Ricardo Bofill. Larges avenues et immeubles modernes.`,
  coverImage: "/images/quartiers/montpellier/antigone.jpg",
  accessInfo: "Avenues larges, stationnement aisé, accès facile pour gros véhicules",
  pricing: {
    studio: { min: 600, max: 1000 },
    t2: { min: 1000, max: 1500 },
    t3: { min: 1500, max: 2200 },
    t4: { min: 2200, max: 3200 },
    t5: { min: 3200, max: 4200 }
  },
  destinations: [
    { name: "Montpellier centre", slug: "montpellier" },
    { name: "Paris", slug: "paris" },
    { name: "Lyon", slug: "lyon" },
    { name: "Toulouse", slug: "toulouse" },
    { name: "France entière", slug: "france" }
  ],
  partners: [
    {
      name: "Déménageur Montpellier Express",
      rating: 4.7,
      reviews: 54,
      specialties: ["Déménagements locaux", "Quartiers modernes"]
    },
    {
      name: "Hérault Déménagements",
      rating: 4.6,
      reviews: 48,
      specialties: ["Déménagements express", "Service personnalisé"]
    }
  ]
};

export default function MontpellierAntigonePage() {
  return <LocalPage {...montpellierAntigoneData} />;
}

