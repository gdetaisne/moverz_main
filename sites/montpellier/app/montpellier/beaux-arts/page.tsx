import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';
import { generateLocalPageMetadata } from '@/app/_templates/LocalPage';

export const metadata: Metadata = generateLocalPageMetadata('beaux-arts', 'Beaux-Arts');


const montpellierBeauxArtsData = {
  zone: "beaux-arts",
  zoneDisplay: "Beaux-Arts",
  description: `Quartier historique et culturel, proche du musée Fabre. Immeubles haussmanniens et commerces de proximité.`,
  coverImage: "/images/quartiers/montpellier/beaux-arts.jpg",
  accessInfo: "Rues moyennement larges, stationnement limité, circulation modérée",
  pricing: {
    studio: { min: 650, max: 1100 },
    t2: { min: 1100, max: 1600 },
    t3: { min: 1600, max: 2400 },
    t4: { min: 2400, max: 3400 },
    t5: { min: 3400, max: 4400 }
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
      specialties: ["Déménagements locaux", "Quartiers historiques"]
    },
    {
      name: "Montpellier Déménagement Services",
      rating: 4.5,
      reviews: 38,
      specialties: ["Emballage professionnel", "Service personnalisé"]
    }
  ]
};

export default function MontpellierBeauxArtsPage() {
  return <LocalPage {...montpellierBeauxArtsData} />;
}

