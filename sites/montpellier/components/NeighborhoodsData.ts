export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "antigone",      title: "Antigone" },
  { slug: "beaux-arts",      title: "Beaux-Arts" },
  { slug: "comedie",      title: "Comédie" },
  { slug: "ecusson",      title: "Écusson" },
  { slug: "port-marianne",      title: "Port Marianne" },
];

export const COMMUNES: Item[] = [];
// Communes satellites à créer ultérieurement

export function urlForQuartier(slug: string) {
  return `/montpellier/${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
