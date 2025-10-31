import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';
import { generateLocalPageMetadata } from '@/app/_templates/LocalPage';

export const metadata: Metadata = generateLocalPageMetadata('comedie', 'Comédie');


const montpellierComedieData = {
  zone: "comedie",
  zoneDisplay: "Comédie",
  description: `Cœur névralgique de Montpellier, place emblématique et zone commerçante. Immeubles du XIXe siècle.`,
  coverImage: "/images/quartiers/montpellier/comedie.jpg",
  accessInfo: "Zone piétonne, accès très limité, autorisations nécessaires, horaires stricts",
  pricing: {
    studio: { min: 700, max: 1200 },
    t2: { min: 1200, max: 1800 },
    t3: { min: 1800, max: 2600 },
    t4: { min: 2600, max: 3600 },
    t5: { min: 3600, max: 4600 }
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
      specialties: ["Déménagements centre-ville", "Gestion des contraintes"]
    },
    {
      name: "Hérault Déménagements",
      rating: 4.6,
      reviews: 48,
      specialties: ["Autorisations de stationnement", "Emballage professionnel"]
    }
  ]
};

export default function MontpellierComediePage() {
  return <LocalPage {...montpellierComedieData} />;
}

