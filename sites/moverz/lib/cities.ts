/**
 * Liste des 11 villes Moverz avec leurs URLs de production
 * Source unique de vérité pour le hub moverz.fr
 */

export interface CityInfo {
  slug: string;
  name: string;
  nameCapitalized: string;
  url: string;
  description: string;
  region: string;
}

export const CITIES: CityInfo[] = [
  {
    slug: 'nice',
    name: 'nice',
    nameCapitalized: 'Nice',
    url: 'https://devis-demenageur-nice.fr',
    description: 'Comparez 5+ devis de déménageurs à Nice',
    region: 'Provence-Alpes-Côte d\'Azur',
  },
  {
    slug: 'lyon',
    name: 'lyon',
    nameCapitalized: 'Lyon',
    url: 'https://devis-demenageur-lyon.fr',
    description: 'Comparez 5+ devis de déménageurs à Lyon',
    region: 'Auvergne-Rhône-Alpes',
  },
  {
    slug: 'marseille',
    name: 'marseille',
    nameCapitalized: 'Marseille',
    url: 'https://devis-demenageur-marseille.fr',
    description: 'Comparez 5+ devis de déménageurs à Marseille',
    region: 'Provence-Alpes-Côte d\'Azur',
  },
  {
    slug: 'toulouse',
    name: 'toulouse',
    nameCapitalized: 'Toulouse',
    url: 'https://devis-demenageur-toulousain.fr', // ⚠️ Exception
    description: 'Comparez 5+ devis de déménageurs à Toulouse',
    region: 'Occitanie',
  },
  {
    slug: 'bordeaux',
    name: 'bordeaux',
    nameCapitalized: 'Bordeaux',
    url: 'https://www.bordeaux-demenageur.fr', // ⚠️ Exception
    description: 'Comparez 5+ devis de déménageurs à Bordeaux',
    region: 'Nouvelle-Aquitaine',
  },
  {
    slug: 'lille',
    name: 'lille',
    nameCapitalized: 'Lille',
    url: 'https://devis-demenageur-lille.fr',
    description: 'Comparez 5+ devis de déménageurs à Lille',
    region: 'Hauts-de-France',
  },
  {
    slug: 'strasbourg',
    name: 'strasbourg',
    nameCapitalized: 'Strasbourg',
    url: 'https://devis-demenageur-strasbourg.fr',
    description: 'Comparez 5+ devis de déménageurs à Strasbourg',
    region: 'Grand Est',
  },
  {
    slug: 'nantes',
    name: 'nantes',
    nameCapitalized: 'Nantes',
    url: 'https://devis-demenageur-nantes.fr',
    description: 'Comparez 5+ devis de déménageurs à Nantes',
    region: 'Pays de la Loire',
  },
  {
    slug: 'rennes',
    name: 'rennes',
    nameCapitalized: 'Rennes',
    url: 'https://devis-demenageur-rennes.fr',
    description: 'Comparez 5+ devis de déménageurs à Rennes',
    region: 'Bretagne',
  },
  {
    slug: 'rouen',
    name: 'rouen',
    nameCapitalized: 'Rouen',
    url: 'https://devis-demenageur-rouen.fr',
    description: 'Comparez 5+ devis de déménageurs à Rouen',
    region: 'Normandie',
  },
  {
    slug: 'montpellier',
    name: 'montpellier',
    nameCapitalized: 'Montpellier',
    url: 'https://devis-demenageur-montpellier.fr',
    description: 'Comparez 5+ devis de déménageurs à Montpellier',
    region: 'Occitanie',
  },
];

/**
 * Helper pour trouver une ville par slug
 */
export function getCityBySlug(slug: string): CityInfo | undefined {
  return CITIES.find(city => city.slug === slug);
}

/**
 * Helper pour obtenir toutes les régions uniques
 */
export function getUniqueRegions(): string[] {
  return [...new Set(CITIES.map(city => city.region))].sort();
}

/**
 * Helper pour grouper les villes par région
 */
export function getCitiesByRegion(): Record<string, CityInfo[]> {
  const grouped: Record<string, CityInfo[]> = {};
  
  CITIES.forEach(city => {
    if (!grouped[city.region]) {
      grouped[city.region] = [];
    }
    grouped[city.region].push(city);
  });
  
  return grouped;
}

