export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "centre-ville",      title: "Centre-ville" },
  { slug: "ile-nantes",      title: "Ile de Nantes" },
  { slug: "malakoff",      title: "Malakoff" },
  { slug: "dervallieres",      title: "Dervallières" },
  { slug: "beaulieu",      title: "Beaulieu" },
];

export const COMMUNES: Item[] = [];
// Communes satellites à créer ultérieurement

export function urlForQuartier(slug: string) {
  return `/nantes/${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
