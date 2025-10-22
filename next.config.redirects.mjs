// ==========================================
// MOVERZ - Next.js Redirections 301
// Génération automatique basée sur GA4 404 Monitor
// Date: 2025-10-22
// ==========================================

/**
 * Redirections SEO-friendly pour toutes les villes Moverz
 * À intégrer dans next.config.mjs
 */

export const moverz404Redirects = [
  // ==========================================
  // 1. Redirections /blog → /actualites
  // ==========================================
  {
    source: '/blog',
    destination: '/actualites',
    permanent: true, // 301 redirect
  },
  {
    source: '/blog/:path*',
    destination: '/actualites/:path*',
    permanent: true,
  },

  // ==========================================
  // 2. Redirection /estimation-rapide → /devis
  // ==========================================
  {
    source: '/estimation-rapide',
    destination: '/devis',
    permanent: true,
  },

  // ==========================================
  // 3. Redirection /inventaire-ia → /analyse-ia
  // ==========================================
  {
    source: '/inventaire-ia',
    destination: '/analyse-ia',
    permanent: true,
  },

  // ==========================================
  // 4. Variantes avec/sans trailing slash
  // ==========================================
  {
    source: '/estimation-rapide/',
    destination: '/devis',
    permanent: true,
  },
  {
    source: '/inventaire-ia/',
    destination: '/analyse-ia',
    permanent: true,
  },

  // ==========================================
  // 5. Anciennes pages de services (exemple)
  // ==========================================
  {
    source: '/services/demenagement-international',
    destination: '/services/international',
    permanent: true,
  },
  {
    source: '/services/garde-meuble',
    destination: '/services/stockage',
    permanent: true,
  },

  // ==========================================
  // 6. Redirections spécifiques par ville
  // ==========================================
  // Toulouse
  {
    source: '/toulouse/quartiers',
    destination: '/quartiers-toulouse',
    permanent: true,
  },
  
  // Nice
  {
    source: '/nice/devis-gratuit',
    destination: '/devis',
    permanent: true,
  },

  // ==========================================
  // 7. Gestion des anciennes URLs de blog
  // ==========================================
  {
    source: '/articles/:slug',
    destination: '/actualites/:slug',
    permanent: true,
  },
  {
    source: '/news/:slug',
    destination: '/actualites/:slug',
    permanent: true,
  },
];

// ==========================================
// À intégrer dans next.config.mjs :
// ==========================================
/*
import { moverz404Redirects } from './next.config.redirects.mjs';

export default {
  // ... autres configurations
  async redirects() {
    return [
      ...moverz404Redirects,
      // Ajoutez d'autres redirections personnalisées ici
    ];
  },
};
*/

