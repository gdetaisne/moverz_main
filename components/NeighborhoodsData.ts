export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "grande-ile",      title: "Grande Île" },
  { slug: "neudorf",      title: "Neudorf" },
  { slug: "cronenbourg",      title: "Cronenbourg" },
  { slug: "hautepierre",      title: "Hautepierre" },
  { slug: "esplanade",      title: "Esplanade" },
  { slug: "orangerie",      title: "Orangerie" },
  { slug: "contades",      title: "Contades" },
  { slug: "gare",      title: "Gare" },
  { slug: "robertsau",      title: "Robertsau" },
  { slug: "koenigshoffen",     title: "Koenigshoffen" },
];

export const COMMUNES: Item[] = [
  { slug: "illkirch-graffenstaden",       title: "Illkirch-Graffenstaden" },
  { slug: "schiltigheim",       title: "Schiltigheim" },
  { slug: "bischheim",       title: "Bischheim" },
  { slug: "hoenheim",       title: "Hoenheim" },
  { slug: "ostwald",       title: "Ostwald" },
];

export function urlForQuartier(slug: string) {
  return `/devis-demenagement-Strasbourg-${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
