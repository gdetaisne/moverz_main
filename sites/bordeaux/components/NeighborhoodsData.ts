export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "chartrons",      title: "Chartrons" },
  { slug: "cauderan",      title: "Caudéran" },
  { slug: "bastide",      title: "Bastide" },
  { slug: "merignac",      title: "Mérignac" },
  { slug: "pessac",      title: "Pessac" },
];

export const COMMUNES: Item[] = [];
// Communes satellites format /devis-demenagement-{commune}/ à créer ultérieurement

export function urlForQuartier(slug: string) {
  return `/bordeaux/${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/bordeaux/${slug}/`;
}


