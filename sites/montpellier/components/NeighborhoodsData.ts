export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "antigone",        title: "Antigone" },
  { slug: "beaux-arts",      title: "Beaux-Arts" },
  { slug: "comedie",         title: "Comédie" },
  { slug: "ecusson",         title: "Écusson" },
  { slug: "port-marianne",   title: "Port Marianne" },
  { slug: "hopitaux-facultes", title: "Hôpitaux-Facultés" },
  { slug: "pres-d-arenes",     title: "Près d'Arènes" },
  { slug: "croix-d-argent",    title: "Croix d'Argent" },
  { slug: "figuerolles",       title: "Figuerolles" },
  { slug: "celleneuve",        title: "Celleneuve" },
];

export const COMMUNES: Item[] = [
  { slug: "lattes",              title: "Lattes" },
  { slug: "perols",              title: "Pérols" },
  { slug: "castelnau-le-lez",    title: "Castelnau-le-Lez" },
  { slug: "juvignac",            title: "Juvignac" },
  { slug: "saint-jean-de-vedas", title: "Saint-Jean-de-Védas" },
];

export function urlForQuartier(slug: string) {
  return `/montpellier/${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
