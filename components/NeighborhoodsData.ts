export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "presquile",      title: "La Presqu'île" },
  { slug: "croix-rousse",      title: "La Croix-Rousse" },
  { slug: "vieux-lyon",      title: "Vieux Lyon" },
  { slug: "part-dieu",      title: "Part-Dieu" },
  { slug: "confluence",      title: "Confluence" },
  { slug: "brotteaux",      title: "Brotteaux" },
  { slug: "montchat",      title: "Montchat" },
  { slug: "guillotiere",      title: "Guillotière" },
  { slug: "gerland",      title: "Gerland" },
  { slug: "tete-dor",     title: "Tête d'Or" },
];

export const COMMUNES: Item[] = [
  { slug: "villeurbanne",       title: "Villeurbanne" },
  { slug: "venissieux",       title: "Vénissieux" },
  { slug: "saint-fons",       title: "Saint-Fons" },
  { slug: "oullins",       title: "Oullins" },
  { slug: "caluire-et-cuire",       title: "Caluire-et-Cuire" },
];

export function urlForQuartier(slug: string) {
  return `/devis-demenagement-Lyon-${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
