import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';
import { generateLocalPageMetadata } from '@/app/_templates/LocalPage';

export const metadata: Metadata = generateLocalPageMetadata('ecusson', 'Écusson');


const montpellierEcussonData = {
  zone: "ecusson",
  zoneDisplay: "Écusson",
  description: `Centre historique médiéval, ruelles pavées et hôtels particuliers. Cœur patrimonial de la ville.`,
  coverImage: "/images/quartiers/montpellier/ecusson.jpg",
  accessInfo: "Ruelles très étroites, zone piétonne, accès impossible pour gros véhicules, manutention manuelle nécessaire",
  pricing: {
    studio: { min: 750, max: 1300 },
    t2: { min: 1300, max: 1900 },
    t3: { min: 1900, max: 2800 },
    t4: { min: 2800, max: 3800 },
    t5: { min: 3800, max: 4800 }
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
      specialties: ["Déménagements centre historique", "Manutention difficile"]
    },
    {
      name: "Hérault Déménagements",
      rating: 4.6,
      reviews: 48,
      specialties: ["Quartiers historiques", "Expertise ruelles étroites"]
    }
  ]
};

export default function MontpellierEcussonPage() {
  return <LocalPage {...montpellierEcussonData} />;
}

