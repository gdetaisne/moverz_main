/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',

  // SEO: Force trailing slash sur toutes les URLs (y compris homepage)
  trailingSlash: true,
  
  // Optimisations pour build CapRover
  typescript: {
    ignoreBuildErrors: true, // Skip type-check en production (fait en dev)
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint en production (fait en dev)
  },  
  // Headers de sécurité gérés par middleware.js

  // Configuration de sécurité supplémentaire
  experimental: {
    serverComponentsExternalPackages: []
  },

  // Optimisations de sécurité
  compress: true,
  
  // Configuration des images - DÉSACTIVÉE pour éviter erreurs 400
  images: {
    // Désactiver l'optimisation d'images pour éviter les erreurs Unsplash
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ]
  },

  // Redirections pour corriger les 404s
  async redirects() {
    return [
      // ========================================
      // 1. CORRECTION MAJUSCULES (Case-sensitivity)
      // ========================================
      {
        source: '/quartiers-Strasbourg',
        destination: '/quartiers-strasbourg',
        permanent: true,
      },
      {
        source: '/services/demenagement-premium-Strasbourg',
        destination: '/services/demenagement-premium-strasbourg',
        permanent: true,
      },
      {
        source: '/services/demenagement-standard-Strasbourg',
        destination: '/services/demenagement-standard-strasbourg',
        permanent: true,
      },
      {
        source: '/services/demenagement-economique-Strasbourg',
        destination: '/services/demenagement-economique-strasbourg',
        permanent: true,
      },

      {
        source: '/strasbourg/saint-pierre',
        destination: '/quartiers-strasbourg',
        permanent: true,
      },
      {
        source: '/devis-demenagement-strasbourg-:quartier',
        destination: '/quartiers-strasbourg',
        permanent: true,
      },

      // ========================================
      // 3. PAGES ANCIENNES → NOUVELLES
      // ========================================
      {
        source: '/devis-demenagement-strasbourg',
        destination: '/estimation-rapide',
        permanent: true,
      },
      {
        source: '/devis-demenagement-strasbourg/',
        destination: '/estimation-rapide',
        permanent: true,
      },
      {
        source: '/prix-demenagement-strasbourg',
        destination: '/blog/demenagement-strasbourg/prix-demenagement-strasbourg',
        permanent: true,
      },
      {
        source: '/prix-demenagement-strasbourg/',
        destination: '/blog/demenagement-strasbourg/prix-demenagement-strasbourg',
        permanent: true,
      },
      {
        source: '/estimation-demenagement-strasbourg',
        destination: '/estimation-rapide',
        permanent: true,
      },
      {
        source: '/estimation-demenagement-strasbourg/',
        destination: '/estimation-rapide',
        permanent: true,
      },

      // ========================================
      // 4. BLOG - CORRECTIONS SLUGS
      // ========================================
      {
        source: '/blog/demenagement-strasbourg/prix-demenagement',
        destination: '/blog/demenagement-strasbourg/prix-demenagement-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/demenagement-strasbourg/aide-demenagement',
        destination: '/blog/demenagement-strasbourg/aide-demenagement-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/demenagement/location-camion-demenagement',
        destination: '/blog/demenagement-strasbourg/location-camion-demenagement-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/demenagement/demenagement-petit-volume',
        destination: '/blog/demenagement-strasbourg/demenagement-petit-volume-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/demenagement/prix-demenagement',
        destination: '/blog/demenagement-strasbourg/prix-demenagement-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/demenagement/demenagement-piano',
        destination: '/blog/demenagement-strasbourg/demenagement-piano-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/demenagement/demenagement-pas-cher',
        destination: '/blog/demenagement-strasbourg/demenagement-strasbourg-pas-cher',
        permanent: true,
      },
      {
        source: '/blog/demenagement/demenagement-international',
        destination: '/blog/demenagement-strasbourg/demenagement-international-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/demenagement/demenagement-d-entreprise',
        destination: '/blog/demenagement-strasbourg/demenagement-d-entreprise-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/garde-meuble/garde-meuble-guide-complet',
        destination: '/blog/garde-meuble-strasbourg/garde-meuble-strasbourg-guide-complet',
        permanent: true,
      },
      {
        source: '/blog/demenagement/aide-demenagement',
        destination: '/blog/demenagement-strasbourg/aide-demenagement-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/demenagement/demenageur',
        destination: '/blog/demenagement-strasbourg/demenageur-strasbourg',
        permanent: true,
      },

      // ========================================
      // 5. ARTICLES SATELLITES (sans suffixe -strasbourg)
      // ========================================
      {
        source: '/blog/satellites/stockage-pendant-demenagement',
        destination: '/blog/satellites/stockage-pendant-demenagement-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/formule-economique-cle-en-main',
        destination: '/blog/satellites/formule-economique-cle-en-main-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/acces-24-7-self-stockage',
        destination: '/blog/satellites/acces-24-7-self-stockage-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/garde-meuble-temperature',
        destination: '/blog/satellites/garde-meuble-temperature-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/prix-demenageur-2025',
        destination: '/blog/satellites/prix-demenageur-strasbourg-2025',
        permanent: true,
      },
      {
        source: '/blog/satellites/prix-garde-meuble-2025',
        destination: '/blog/satellites/prix-garde-meuble-strasbourg-2025',
        permanent: true,
      },
      {
        source: '/blog/satellites/self-stockage-vs-garde-meuble',
        destination: '/blog/satellites/self-stockage-vs-garde-meuble-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/duree-location-garde-meuble',
        destination: '/blog/satellites/duree-location-garde-meuble-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/demenagement-dimanche',
        destination: '/blog/satellites/demenagement-dimanche-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/faq-garde-meuble',
        destination: '/blog/satellites/faq-garde-meuble-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/faq-demenageur',
        destination: '/blog/satellites/faq-demenageur-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/autorisation-stationnement',
        destination: '/blog/satellites/autorisation-stationnement-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/assurance-garde-meuble',
        destination: '/blog/satellites/assurance-garde-meuble-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/pourboire-demenageurs',
        destination: '/blog/satellites/pourboire-demenageurs-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/demenageur-grande-ile',
        destination: '/blog/satellites/demenageur-grande-ile-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/choisir-demenageur',
        destination: '/blog/satellites/choisir-demenageur-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/garde-meuble-etudiant',
        destination: '/blog/satellites/garde-meuble-etudiant-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/demenageur-monte-meuble',
        destination: '/blog/satellites/demenageur-monte-meuble-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/taille-box-garde-meuble',
        destination: '/blog/satellites/taille-box-garde-meuble-strasbourg',
        permanent: true,
      },
      {
        source: '/blog/satellites/assurance-demenageur',
        destination: '/blog/satellites/assurance-demenageur-strasbourg',
        permanent: true,
      },

      // ========================================
      // 6. CATÉGORIES BLOG VIDES → /blog
      // ========================================
      {
        source: '/blog/etudiant',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/urgent',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/devis',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/longue-distance',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/prix',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/entreprise',
        destination: '/blog',
        permanent: true,
      },


      // ========================================
      // 8. FICHIERS PLACEHOLDER/BATCH (cache Google)
      // ========================================
      {
        source: '/blog/satellites/PILIER-:number',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/satellites/PILIER-:number-:rest*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/satellites',
        destination: '/blog',
        permanent: true,
      },
      // WILDCARDS CATCH-ALL (TASK-LEADGEN-02 - COMPLETS)
      { source: '/blog/garde-meuble/:slug*', destination: '/blog/garde-meuble-strasbourg/:slug*', permanent: true },
      { source: '/blog/pas-cher/:slug*', destination: '/blog/demenagement-pas-cher-strasbourg/:slug*', permanent: true },
      { source: '/blog/international/:slug*', destination: '/blog/demenagement-international-strasbourg/:slug*', permanent: true },
      { source: '/blog/piano/:slug*', destination: '/blog/demenagement-piano-strasbourg/:slug*', permanent: true },
      { source: '/blog/demenageur/:slug*', destination: '/blog/demenageur-strasbourg/:slug*', permanent: true },
      { source: '/blog/aide/:slug*', destination: '/blog/aide-demenagement-strasbourg/:slug*', permanent: true },
      { source: '/blog/demenagement/:slug*', destination: '/blog/demenagement-strasbourg/:slug*', permanent: true },
      { source: '/blog/prix/:slug*', destination: '/blog/prix-demenagement-strasbourg/:slug*', permanent: true },
      { source: '/blog/satellites/:slug*', destination: '/blog/satellites/:slug*', permanent: true },
    ];
  },
};

export default nextConfig;