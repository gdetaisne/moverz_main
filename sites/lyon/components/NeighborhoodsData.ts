export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "presquile",      title: "La Presqu'île" },
  { slug: "croix-rousse",      title: "La Croix-Rousse" },
  { slug: "vieux-lyon",      title: "Vieux Lyon" },
  { slug: "part-dieu",      title: "Part-Dieu" },
  { slug: "confluence",      title: "Confluence" },
];

export const COMMUNES: Item[] = [];
// Communes satellites à créer ultérieurement

export function urlForQuartier(slug: string) {
  return `/lyon/${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
