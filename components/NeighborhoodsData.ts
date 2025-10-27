export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "centre-ville",      title: "Centre-ville" },
  { slug: "ile-nantes",      title: "Ile de Nantes" },
  { slug: "malakoff",      title: "Malakoff" },
  { slug: "dervallieres",      title: "Dervallières" },
  { slug: "beaulieu",      title: "Beaulieu" },
  { slug: "chantenay",      title: "Chantenay" },
  { slug: "breil",      title: "Breil" },
  { slug: "doulon",      title: "Doulon" },
  { slug: "saint-donatien",      title: "Saint-Donatien" },
  { slug: "proce",     title: "Procé" },
];

export const COMMUNES: Item[] = [
  { slug: "saint-herblain",       title: "Saint-Herblain" },
  { slug: "reze",       title: "Rezé" },
  { slug: "vertou",       title: "Vertou" },
  { slug: "orvault",       title: "Orvault" },
  { slug: "carquefou",       title: "Carquefou" },
];

export function urlForQuartier(slug: string) {
  return `/devis-demenagement-Nantes-${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
