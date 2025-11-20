/**
 * Helper centralisé pour la génération des URLs canoniques
 * Version HUB moverz.fr (sans cityData)
 * 
 * Règles :
 * - Toujours ajouter un slash final
 * - Utiliser le domaine moverz.fr
 * - Une seule source de vérité
 */

import { env } from '@/lib/env';

/**
 * Génère une URL canonique avec slash final
 * 
 * @param path - Chemin relatif (ex: 'villes', 'notre-offre')
 * @returns URL canonique complète avec slash final
 * 
 * @example
 * getCanonicalUrl() 
 * // → "https://moverz.fr/"
 * 
 * getCanonicalUrl('villes')
 * // → "https://moverz.fr/villes/"
 */
export function getCanonicalUrl(path: string = ''): string {
  // S'assurer que siteUrl a un slash final
  const baseUrl = env.SITE_URL.endsWith('/') 
    ? env.SITE_URL 
    : `${env.SITE_URL}/`;
  
  // Si pas de path, retourner la homepage
  if (!path) {
    return baseUrl;
  }
  
  // Nettoyer le path
  let cleanPath = path.trim();
  
  // Retirer le slash initial si présent
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1);
  }
  
  // Retirer le slash final si présent (on le rajoutera)
  if (cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  
  // Construire l'URL finale avec slash final
  return `${baseUrl}${cleanPath}/`;
}

/**
 * Génère les métadonnées alternates avec canonical
 * 
 * @param path - Chemin relatif
 * @returns Objet alternates pour Next.js metadata
 */
export function getCanonicalAlternates(path: string = '') {
  return {
    alternates: {
      canonical: getCanonicalUrl(path),
    },
  };
}

/**
 * Génère les métadonnées Open Graph avec URL
 */
export function getOpenGraphMetadata(
  path: string,
  title: string,
  description: string
) {
  const url = getCanonicalUrl(path);
  
  return {
    openGraph: {
      title,
      description,
      url,
      type: 'website' as const,
      locale: 'fr_FR',
      siteName: 'Moverz — Comparateur Déménagement',
      images: [
        {
          url: `${env.SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

/**
 * Génère les métadonnées complètes (canonical + OG)
 */
export function getFullMetadata(
  path: string,
  title: string,
  description: string
) {
  return {
    title,
    description,
    ...getCanonicalAlternates(path),
    ...getOpenGraphMetadata(path, title, description),
  };
}

