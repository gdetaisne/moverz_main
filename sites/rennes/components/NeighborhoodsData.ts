export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "centre-ville",      title: "Centre-ville" },
  { slug: "thabor",      title: "Thabor" },
  { slug: "villejean",      title: "Villejean" },
  { slug: "beaulieu",      title: "Beaulieu" },
  { slug: "cleunay",      title: "Cleunay" },
];

export const COMMUNES: Item[] = [];
// Communes satellites à créer ultérieurement

export function urlForQuartier(slug: string) {
  return `/rennes/${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
