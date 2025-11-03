export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "grande-ile",      title: "Grande Île" },
  { slug: "neudorf",      title: "Neudorf" },
  { slug: "cronenbourg",      title: "Cronenbourg" },
  { slug: "hautepierre",      title: "Hautepierre" },
  { slug: "esplanade",      title: "Esplanade" },
];

export const COMMUNES: Item[] = [];
// Communes satellites à créer ultérieurement

export function urlForQuartier(slug: string) {
  return `/strasbourg/${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
