/**
 * Obtenir le nom de ville depuis l'URL du site
 * Supporte les formats:
 *   - ville-demenageur.fr (marseille-demenageur.fr)
 *   - devis-demenageur-ville.fr (devis-demenageur-bordeaux.fr)
 */
export function getCityDataFromUrl(siteUrl: string): CityData {
  // Cas spéciaux d'abord
  if (siteUrl.includes('toulousain')) return cityData.toulouse;
  
  // Format: demenageur-ville (ex: devis-demenageur-bordeaux.fr)
  let match = siteUrl.match(/demenageur[s]?[-_]([a-z]+)/i);
  if (match && match[1] !== 'fr') {
    const citySlug = match[1];
    return getCityData(citySlug);
  }
  
  // Format: ville-demenageur (ex: marseille-demenageur.fr)
  match = siteUrl.match(/([a-z]+)[-_]demenageur/i);
  if (match) {
    const citySlug = match[1];
    // Exclure les mots qui ne sont pas des villes
    if (!['www', 'devis', 'http', 'https'].includes(citySlug)) {
      return getCityData(citySlug);
    }
  }
  
  // Fallback par défaut
  console.warn(`⚠️ Impossible d'extraire la ville depuis l'URL: ${siteUrl}, utilisation de toulouse par défaut`);
  return cityData.toulouse;
}

