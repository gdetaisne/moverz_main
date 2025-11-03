export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "vieux-lille",      title: "Vieux Lille" },
  { slug: "centre",      title: "Centre" },
  { slug: "wazemmes",      title: "Wazemmes" },
  { slug: "moulins",      title: "Moulins" },
  { slug: "lomme",      title: "Lomme" },
];

export const COMMUNES: Item[] = [];
// Communes satellites à créer ultérieurement

export function urlForQuartier(slug: string) {
  return `/lille/${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
