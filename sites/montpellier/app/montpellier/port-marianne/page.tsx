import { Metadata } from 'next';
import LocalPage from '@/app/_templates/LocalPage';

export const metadata: Metadata = {
  title: `Déménagement à Port Marianne (Montpellier) | Devis gratuit & IA`,
  description: `Déménagement à Port Marianne (Montpellier). Nouveau quartier moderne au bord du Lez, architecture contemporaine. Résidences récentes et espaces verts. Accès: Larges avenues, stationnement facile, accès aisé pour tous véhicules. Devis gratuit avec estimation IA.`,
  keywords: `déménagement Port Marianne Montpellier, déménageurs Montpellier, devis déménagement Montpellier, quartier moderne`,
};

const montpellierPortMarianneData = {
  zone: "port-marianne",
  zoneDisplay: "Port Marianne",
  description: `Nouveau quartier moderne au bord du Lez, architecture contemporaine. Résidences récentes et espaces verts.`,
  coverImage: "/images/quartiers/montpellier/port-marianne.jpg",
  accessInfo: "Larges avenues, stationnement facile, accès aisé pour tous véhicules",
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
      specialties: ["Déménagements quartiers modernes", "Service rapide"]
    },
    {
      name: "Montpellier Déménagement Services",
      rating: 4.5,
      reviews: 38,
      specialties: ["Déménagements résidences neuves", "Emballage professionnel"]
    }
  ]
};

export default function MontpellierPortMariannePage() {
  return <LocalPage {...montpellierPortMarianneData} />;
}

