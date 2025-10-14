export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "centre-ville",      title: "Centre-ville" },
  { slug: "thabor",      title: "Thabor" },
  { slug: "villejean",      title: "Villejean" },
  { slug: "beaulieu",      title: "Beaulieu" },
  { slug: "cleunay",      title: "Cleunay" },
  { slug: "saint-helier",      title: "Saint-Hélier" },
  { slug: "brequigny",      title: "Bréquigny" },
  { slug: "blosne",      title: "Le Blosne" },
  { slug: "maurepas",      title: "Maurepas" },
  { slug: "longchamp",     title: "Longchamp" },
];

export const COMMUNES: Item[] = [
  { slug: "saint-gregoire",       title: "Saint-Grégoire" },
  { slug: "cesson-sevigne",       title: "Cesson-Sévigné" },
  { slug: "pace",       title: "Pacé" },
  { slug: "betton",       title: "Betton" },
  { slug: "montgermont",       title: "Montgermont" },
];

export function urlForQuartier(slug: string) {
  return `/devis-demenagement-Rennes-${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
