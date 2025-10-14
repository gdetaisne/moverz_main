export type Item = { slug: string; title: string };

export const QUARTIERS: Item[] = [
  { slug: "vieux-lille",      title: "Vieux Lille" },
  { slug: "centre",      title: "Centre" },
  { slug: "wazemmes",      title: "Wazemmes" },
  { slug: "moulins",      title: "Moulins" },
  { slug: "lomme",      title: "Lomme" },
  { slug: "saint-maurice",      title: "Saint-Maurice" },
  { slug: "fives",      title: "Fives" },
  { slug: "hellemmes",      title: "Hellemmes" },
  { slug: "faubourg-bethune",      title: "Faubourg de Béthune" },
  { slug: "vauban",     title: "Vauban" },
];

export const COMMUNES: Item[] = [
  { slug: "roubaix",       title: "Roubaix" },
  { slug: "tourcoing",       title: "Tourcoing" },
  { slug: "villeneuve-d-ascq",       title: "Villeneuve-d'Ascq" },
  { slug: "lambersart",       title: "Lambersart" },
  { slug: "marcq-en-baroeul",       title: "Marcq-en-Barœul" },
];

export function urlForQuartier(slug: string) {
  return `/devis-demenagement-Lille-${slug}/`;
}
export function urlForCommune(slug: string) {
  return `/devis-demenagement-${slug}/`;
}
