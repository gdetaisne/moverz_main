export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "chartrons",      title: "Chartrons" },
  { slug: "cauderan",       title: "Caudéran" },
  { slug: "bastide",        title: "Bastide" },
  { slug: "saint-pierre",   title: "Saint-Pierre" },
  { slug: "meriadeck",      title: "Mériadeck" },
  { slug: "nansouty",       title: "Nansouty" },
  { slug: "saint-augustin", title: "Saint-Augustin" },
  { slug: "victoire",       title: "Victoire" },
  { slug: "lac",            title: "Lac" },
  { slug: "saint-seurin",   title: "Saint-Seurin" },
];

export const COMMUNES: Item[] = [
  { slug: "merignac",           title: "Mérignac" },
  { slug: "pessac",             title: "Pessac" },
  { slug: "talence",            title: "Talence" },
  { slug: "begles",             title: "Bègles" },
  { slug: "villenave-d-ornon",  title: "Villenave-d’Ornon" },
];

export function urlForQuartier(slug: string) {
  return `/devis-demenagement-bordeaux-${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}


