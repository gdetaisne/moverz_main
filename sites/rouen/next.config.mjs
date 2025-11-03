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
  
  // Configuration des images (si utilisées)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Redirections 404 - URLs sans -rouen vers avec -rouen
  async redirects() {
    return [
      // SATELLITES : Articles sans -rouen → avec -rouen
      { source: '/blog/satellites/self-stockage-acces-24-7', destination: '/blog/satellites/self-stockage-acces-24-7-rouen', permanent: true },
      { source: '/blog/satellites/autorisation-stationnement-demenagement-mairie', destination: '/blog/satellites/autorisation-stationnement-demenagement-rouen-mairie', permanent: true },
      { source: '/blog/satellites/prix-demenageur-2025', destination: '/blog/satellites/prix-demenageur-rouen-2025', permanent: true },
      { source: '/blog/satellites/formules-demenagement-comparatif', destination: '/blog/satellites/formules-demenagement-rouen-comparatif', permanent: true },
      { source: '/blog/satellites/demenageur-pas-cher-economique', destination: '/blog/satellites/demenageur-pas-cher-rouen-economique', permanent: true },
      { source: '/blog/satellites/meilleurs-garde-meubles-avis', destination: '/blog/satellites/meilleurs-garde-meubles-rouen-avis', permanent: true },
      { source: '/blog/satellites/monte-meuble-demenagement-prix', destination: '/blog/satellites/monte-meuble-demenagement-rouen-prix', permanent: true },
      { source: '/blog/satellites/demenagement-longue-distance', destination: '/blog/satellites/demenagement-longue-distance-rouen', permanent: true },
      { source: '/blog/satellites/stockage-pendant-demenagement-duree', destination: '/blog/satellites/stockage-pendant-demenagement-duree-rouen', permanent: true },
      { source: '/blog/satellites/demenagement-etudiant-solutions', destination: '/blog/satellites/demenagement-etudiant-rouen-solutions', permanent: true },
      { source: '/blog/satellites/duree-minimum-garde-meuble', destination: '/blog/satellites/duree-minimum-garde-meuble-rouen', permanent: true },
      { source: '/blog/satellites/meilleurs-demenageurs-avis-2025', destination: '/blog/satellites/meilleurs-demenageurs-rouen-avis-2025', permanent: true },
      { source: '/blog/satellites/prix-garde-meuble-2025', destination: '/blog/satellites/prix-garde-meuble-rouen-2025', permanent: true },
      { source: '/blog/satellites/assurance-garde-meuble-obligatoire', destination: '/blog/satellites/assurance-garde-meuble-rouen-obligatoire', permanent: true },
      { source: '/blog/satellites/garde-meuble-pas-cher', destination: '/blog/satellites/garde-meuble-pas-cher-rouen', permanent: true },
      { source: '/blog/satellites/demenageur-centre-historique', destination: '/blog/satellites/demenageur-centre-historique-rouen', permanent: true },
      { source: '/blog/satellites/taille-box-stockage', destination: '/blog/satellites/taille-box-stockage-rouen', permanent: true },
      { source: '/blog/satellites/garde-meuble-etudiant', destination: '/blog/satellites/garde-meuble-etudiant-rouen', permanent: true },
      { source: '/blog/satellites/self-stockage-vs-garde-meuble-traditionnel', destination: '/blog/satellites/self-stockage-vs-garde-meuble-traditionnel-rouen', permanent: true },

      // PILIERS : Catégories sans -rouen → avec -rouen
      { source: '/blog/aide-demenagement/aide-demenagement-guide-complet', destination: '/blog/aide-demenagement-rouen/aide-demenagement-rouen-guide-complet', permanent: true },
      { source: '/blog/demenagement-international/demenagement-international-guide-complet', destination: '/blog/demenagement-international-rouen/demenagement-international-rouen-guide-complet', permanent: true },
      { source: '/blog/demenageur-pas-cher/demenageur-pas-cher-guide', destination: '/blog/demenageur-rouen-pas-cher/demenageur-rouen-pas-cher-guide', permanent: true },
      
      // ORDRE INCORRECT : demenageur-pas-cher-rouen → demenageur-rouen-pas-cher
      { source: '/blog/demenageur-pas-cher-rouen/:path*', destination: '/blog/demenageur-rouen-pas-cher/:path*', permanent: true },
      { source: '/blog/demenagement-entreprise/demenagement-entreprise-guide-complet', destination: '/blog/demenagement-entreprise-rouen/demenagement-entreprise-rouen-guide-complet', permanent: true },
      { source: '/blog/prix-demenagement/prix-demenagement-guide-complet', destination: '/blog/prix-demenagement-rouen/prix-demenagement-rouen-guide-complet', permanent: true },
      { source: '/blog/petit-demenagement/petit-demenagement-guide-complet', destination: '/blog/petit-demenagement-rouen/petit-demenagement-rouen-guide-complet', permanent: true },
      { source: '/blog/location-camion-demenagement/location-camion-demenagement-guide-complet', destination: '/blog/location-camion-demenagement-rouen/location-camion-demenagement-rouen-guide-complet', permanent: true },
      { source: '/blog/demenagement-piano/demenagement-piano-guide-complet', destination: '/blog/demenagement-piano-rouen/demenagement-piano-rouen-guide-complet', permanent: true },
      { source: '/blog/demenageur/demenageur-guide-complet', destination: '/blog/demenageur-rouen/demenageur-rouen-guide-complet', permanent: true },
      { source: '/blog/garde-meuble/garde-meuble-guide-complet', destination: '/blog/garde-meuble-rouen/garde-meuble-rouen-guide-complet', permanent: true },

      // ARTICLES dans mauvais dossier (demenagement-rouen/ → satellites/ ou piliers/)
      { source: '/blog/demenagement-rouen/demenageur-pas-cher', destination: '/blog/demenageur-pas-cher-rouen/demenageur-pas-cher-rouen-guide', permanent: true },
      { source: '/blog/demenagement-rouen/taille-box-stockage-rouen', destination: '/blog/satellites/taille-box-stockage-rouen', permanent: true },
      { source: '/blog/demenagement-rouen/garde-meuble-etudiant-rouen', destination: '/blog/satellites/garde-meuble-etudiant-rouen', permanent: true },
      { source: '/blog/demenagement-rouen/demenageur', destination: '/blog/demenageur-rouen/demenageur-rouen-guide-complet', permanent: true },
      { source: '/blog/demenagement-rouen/location-camion-demenagement', destination: '/blog/location-camion-demenagement-rouen/location-camion-demenagement-rouen-guide-complet', permanent: true },
      { source: '/blog/prix/prix-demenageur-rouen-2025', destination: '/blog/prix-demenagement-rouen/prix-demenagement-rouen-guide-complet', permanent: true },
      { source: '/blog/garde-meuble/garde-meuble-rouen-guide-complet', destination: '/blog/garde-meuble-rouen/garde-meuble-rouen-guide-complet', permanent: true },
      { source: '/blog/garde-meuble-rouen/garde-meuble-pas-cher-rouen', destination: '/blog/satellites/garde-meuble-pas-cher-rouen', permanent: true },
      { source: '/blog/garde-meuble-rouen/meilleurs-garde-meubles-rouen-avis', destination: '/blog/satellites/meilleurs-garde-meubles-rouen-avis', permanent: true },
      { source: '/blog/garde-meuble-rouen/assurance-garde-meuble-rouen-obligatoire', destination: '/blog/satellites/assurance-garde-meuble-rouen-obligatoire', permanent: true },

      // CATÉGORIES VIDES (rediriger vers page blog)
      { source: '/blog/etudiant', destination: '/blog', permanent: true },
      { source: '/blog/international', destination: '/blog', permanent: true },

      // MAJUSCULES : Rouen → rouen
      { source: '/Rouen', destination: '/', permanent: true },
      { source: '/quartiers-Rouen', destination: '/quartiers-rouen', permanent: true },
      
      // SERVICES : Majuscules
      { source: '/services/demenagement-economique-Rouen', destination: '/services/demenagement-economique-rouen', permanent: true },
      { source: '/services/demenagement-premium-Rouen', destination: '/services/demenagement-premium-rouen', permanent: true },
      { source: '/services/demenagement-standard-Rouen', destination: '/services/demenagement-standard-rouen', permanent: true },

      // QUARTIERS BORDEAUX sur site Rouen (erreur indexation)
      { source: '/rouen/merignac', destination: '/quartiers-rouen', permanent: true },
      { source: '/rouen/pessac', destination: '/quartiers-rouen', permanent: true },
      { source: '/rouen/bastide', destination: '/quartiers-rouen', permanent: true },
      { source: '/devis-demenagement-rouen-saint-marc/', destination: '/rouen/saint-marc', permanent: true },
      { source: '/devis-demenagement-rouen-coteaux-sud/', destination: '/rouen/coteaux-sud', permanent: true },

      // PAGES LÉGALES : Trailing slash
      { source: '/mentions-legales/', destination: '/mentions-legales', permanent: true },
      { source: '/cgv/', destination: '/cgv', permanent: true },
      { source: '/politique-confidentialite/', destination: '/politique-confidentialite', permanent: true },

      // ANCIENNES URLs
      { source: '/estimation-demenagement-rouen/', destination: '/estimation-rapide', permanent: true },
      { source: '/prix-demenagement-rouen/', destination: '/blog/prix-demenagement-rouen/prix-demenagement-rouen-guide-complet', permanent: true },
      { source: '/devis-demenagement-rouen/', destination: '/estimation-rapide', permanent: true },

      // CATÉGORIES BLOG VIDES → /blog (Fix CSV 30/10/2025)
      { source: '/blog/etudiant', destination: '/blog', permanent: true },
      { source: '/blog/urgent', destination: '/blog', permanent: true },
      { source: '/blog/devis', destination: '/blog', permanent: true },
      { source: '/blog/longue-distance', destination: '/blog', permanent: true },
      { source: '/blog/entreprise', destination: '/blog', permanent: true },
      { source: '/blog/prix', destination: '/blog', permanent: true },
    ];
  }
};

export default nextConfig;