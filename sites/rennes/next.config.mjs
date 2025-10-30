/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  
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

  // Redirections 404 - Nettoyage indexation
  async redirects() {
    return [
      // SATELLITES : Articles sans -rennes → avec -rennes
      { source: '/blog/satellites/location-camion-pas-cher', destination: '/blog/satellites/location-camion-pas-cher-rennes', permanent: true },
      { source: '/blog/satellites/budget-demenagement-complet', destination: '/blog/satellites/budget-demenagement-complet-rennes', permanent: true },
      { source: '/blog/satellites/tarif-horaire-demenageur', destination: '/blog/satellites/tarif-horaire-demenageur-rennes', permanent: true },
      { source: '/blog/satellites/demenagement-hiver', destination: '/blog/satellites/demenagement-hiver-rennes', permanent: true },
      { source: '/blog/satellites/checklist-demenagement', destination: '/blog/satellites/checklist-demenagement-rennes', permanent: true },
      { source: '/blog/satellites/devis-demenagement-gratuit', destination: '/blog/satellites/devis-demenagement-gratuit-rennes', permanent: true },
      { source: '/blog/satellites/risques-demenagement-piano-seul', destination: '/blog/satellites/risques-demenagement-piano-seul-rennes', permanent: true },
      { source: '/blog/satellites/assurance-demenagement-international', destination: '/blog/satellites/assurance-demenagement-international-rennes', permanent: true },
      { source: '/blog/satellites/aides-financieres-demenagement-caf', destination: '/blog/satellites/aides-financieres-demenagement-caf-rennes', permanent: true },
      { source: '/blog/satellites/restitution-camion-horaires', destination: '/blog/satellites/restitution-camion-horaires-rennes', permanent: true },
      { source: '/blog/satellites/demenagement-uk-angleterre', destination: '/blog/satellites/demenagement-uk-angleterre-rennes', permanent: true },
      { source: '/blog/satellites/demenagement-centre-ville-autorisations', destination: '/blog/satellites/demenagement-centre-ville-autorisations-rennes', permanent: true },
      { source: '/blog/satellites/demenagement-urgent-express', destination: '/blog/satellites/demenagement-urgent-express-rennes', permanent: true },
      { source: '/blog/satellites/delais-demenagement-international', destination: '/blog/satellites/delais-demenagement-international-rennes', permanent: true },
      { source: '/blog/satellites/caution-location-camion', destination: '/blog/satellites/caution-location-camion-rennes', permanent: true },
      { source: '/blog/satellites/assurance-location-camion', destination: '/blog/satellites/assurance-location-camion-rennes', permanent: true },
      { source: '/blog/satellites/formalites-douane-demenagement-international', destination: '/blog/satellites/formalites-douane-demenagement-international-rennes', permanent: true },
      { source: '/blog/satellites/calculer-volume-stockage', destination: '/blog/satellites/calculer-volume-stockage-rennes', permanent: true },
      { source: '/blog/satellites/demarches-administratives-demenagement', destination: '/blog/satellites/demarches-administratives-demenagement-rennes', permanent: true },
      { source: '/blog/satellites/location-utilitaire-demenagement', destination: '/blog/satellites/location-utilitaire-demenagement-rennes', permanent: true },
      { source: '/blog/satellites/garde-meuble-international', destination: '/blog/satellites/garde-meuble-international-rennes', permanent: true },
      { source: '/blog/satellites/demenagement-seniors', destination: '/blog/satellites/demenagement-seniors-rennes', permanent: true },
      { source: '/blog/satellites/prix-garde-meuble-2025', destination: '/blog/satellites/prix-garde-meuble-2025-rennes', permanent: true },
      { source: '/blog/satellites/prix-demenagement-international', destination: '/blog/satellites/prix-demenagement-international-rennes', permanent: true },
      { source: '/blog/satellites/protection-piano-transport', destination: '/blog/satellites/protection-piano-transport-rennes', permanent: true },
      { source: '/blog/satellites/changement-adresse', destination: '/blog/satellites/changement-adresse-rennes', permanent: true },
      { source: '/blog/satellites/comparatif-prix-demenageurs', destination: '/blog/satellites/comparatif-prix-demenageurs-rennes', permanent: true },
      { source: '/blog/satellites/devis-demenagement-ligne', destination: '/blog/satellites/devis-demenagement-ligne-rennes', permanent: true },
      { source: '/blog/satellites/prix-location-camion-20m3', destination: '/blog/satellites/prix-location-camion-20m3-rennes', permanent: true },
      { source: '/blog/satellites/demenagement-longue-distance', destination: '/blog/satellites/demenagement-longue-distance-rennes', permanent: true },
      { source: '/blog/satellites/prix-demenageur-t2-t3-2025', destination: '/blog/satellites/prix-demenageur-t2-t3-2025-rennes', permanent: true },

      // Quartiers Rennes spécifiques
      { source: '/blog/satellites/demenagement-francisco-ferrer-poterie', destination: '/blog/satellites/demenagement-francisco-ferrer-poterie-rennes', permanent: true },
      { source: '/blog/satellites/demenageur-le-rheu', destination: '/blog/satellites/demenageur-le-rheu-rennes', permanent: true },
      { source: '/blog/satellites/demenagement-vern-sur-seiche', destination: '/blog/satellites/demenagement-vern-sur-seiche-rennes', permanent: true },
      { source: '/blog/satellites/demenagement-piano-thabor-sans-ascenseur', destination: '/blog/satellites/demenagement-piano-thabor-sans-ascenseur-rennes', permanent: true },

      // MAUVAIS DOSSIER /blog/demenagement/ → correct
      { source: '/blog/demenagement/demenageur', destination: '/blog/demenageur-rennes/demenageur-rennes-guide-complet', permanent: true },
      { source: '/blog/demenagement/location-camion-demenagement', destination: '/blog/location-camion-demenagement-rennes/location-camion-demenagement-rennes-guide-complet', permanent: true },

      // MAUVAIS DOSSIERS CATÉGORIES → Satellites ou Piliers corrects
      { source: '/blog/piano/preparation-piano-demenagement-rennes', destination: '/blog/satellites/preparation-piano-demenagement-rennes', permanent: true },
      { source: '/blog/piano/piano-droit-vs-queue-demenagement-rennes', destination: '/blog/satellites/piano-droit-vs-queue-demenagement-rennes', permanent: true },
      { source: '/blog/piano/demenagement-piano-thabor-sans-ascenseur-rennes', destination: '/blog/satellites/demenagement-piano-thabor-sans-ascenseur-rennes', permanent: true },
      { source: '/blog/piano/demenageur-specialise-piano-rennes', destination: '/blog/satellites/demenageur-specialise-piano-rennes', permanent: true },
      { source: '/blog/petit-demenagement-rennes', destination: '/blog/petit-demenagement-rennes/petit-demenagement-rennes-guide-complet', permanent: true },
      { source: '/blog/petit-demenagement-rennes/petit-demenagement-auto-rennes', destination: '/blog/satellites/petit-demenagement-auto-rennes', permanent: true },
      { source: '/blog/pas-cher/entraide-demenagement-rennes-plateformes', destination: '/blog/satellites/entraide-demenagement-rennes-plateformes', permanent: true },
      { source: '/blog/international/conteneur-maritime-demenagement-rennes', destination: '/blog/satellites/conteneur-maritime-demenagement-rennes', permanent: true },
      { source: '/blog/garde-meuble/calculer-volume-stockage-rennes', destination: '/blog/satellites/calculer-volume-stockage-rennes', permanent: true },
      { source: '/blog/demenageur-rennes', destination: '/blog/demenageur-rennes/demenageur-rennes-guide-complet', permanent: true },
      { source: '/blog/location-camion-rennes/location-camion-demenagement-rennes-guide', destination: '/blog/location-camion-demenagement-rennes/location-camion-demenagement-rennes-guide-complet', permanent: true },

      // URLS TOULOUSE sur site RENNES (erreur indexation massive)
      { source: '/toulouse', destination: '/', permanent: true },
      { source: '/quartiers-Toulouse', destination: '/quartiers-rennes', permanent: true },
      { source: '/prix-demenagement-toulouse/', destination: '/blog/prix-demenagement-rennes/prix-demenagement-rennes-guide-complet', permanent: true },
      { source: '/devis-demenagement-toulouse-saint-pierre/', destination: '/quartiers-rennes', permanent: true },
      { source: '/devis-demenagement-toulouse-cauderan/', destination: '/quartiers-rennes', permanent: true },
      { source: '/Toulouse-vers-Toulouse', destination: '/', permanent: true },
      { source: '/devis-demenagement-toulouse/', destination: '/estimation-rapide', permanent: true },
      { source: '/Toulouse-vers-paris', destination: '/rennes-vers-paris', permanent: true },
      { source: '/Toulouse-vers-lyon', destination: '/rennes-vers-lyon', permanent: true },
      { source: '/Toulouse-vers-nantes', destination: '/rennes-vers-nantes', permanent: true },
      { source: '/devis-demenagement-toulouse-chartrons/', destination: '/quartiers-rennes', permanent: true },
      { source: '/Toulouse/compans', destination: '/quartiers-rennes', permanent: true },

      // QUARTIERS BORDEAUX sur site Rennes
      { source: '/rennes/bastide', destination: '/quartiers-rennes', permanent: true },
      { source: '/rennes/cauderan', destination: '/quartiers-rennes', permanent: true },
      { source: '/rennes/pessac', destination: '/quartiers-rennes', permanent: true },
      { source: '/rennes/merignac', destination: '/quartiers-rennes', permanent: true },
      { source: '/rennes/chartrons', destination: '/quartiers-rennes', permanent: true },
      { source: '/devis-demenagement-rennes-chartrons/', destination: '/quartiers-rennes', permanent: true },
      { source: '/devis-demenagement-rennes-cauderan/', destination: '/quartiers-rennes', permanent: true },
      { source: '/devis-demenagement-rennes-saint-pierre/', destination: '/quartiers-rennes', permanent: true },

      // MAJUSCULES : Rennes → rennes
      { source: '/Rennes-vers-paris', destination: '/rennes-vers-paris', permanent: true },
      { source: '/Rennes-vers-lyon', destination: '/rennes-vers-lyon', permanent: true },
      { source: '/Rennes-vers-nantes', destination: '/rennes-vers-nantes', permanent: true },
      { source: '/quartiers-Rennes', destination: '/quartiers-rennes', permanent: true },

      // SERVICES : Majuscules
      { source: '/services/demenagement-standard-Rennes', destination: '/services/demenagement-standard-rennes', permanent: true },

      // PAGES LÉGALES : Trailing slash
      { source: '/mentions-legales/', destination: '/mentions-legales', permanent: true },
      { source: '/cgv/', destination: '/cgv', permanent: true },
      { source: '/politique-confidentialite/', destination: '/politique-confidentialite', permanent: true },

      // ANCIENNES URLs
      { source: '/estimation-demenagement-rennes/', destination: '/estimation-rapide', permanent: true },
      { source: '/estimation-demenagement-toulouse/', destination: '/estimation-rapide', permanent: true },
      { source: '/prix-demenagement-rennes/', destination: '/blog/prix-demenagement-rennes/prix-demenagement-rennes-guide-complet', permanent: true },
      { source: '/devis-demenagement-rennes/', destination: '/estimation-rapide', permanent: true },

      // MAJUSCULES QUARTIERS → minuscules (Fix CSV 30/10/2025)
      { source: '/Rennes/centre-ville', destination: '/rennes/centre-ville', permanent: true },
      { source: '/Rennes/thabor', destination: '/rennes/thabor', permanent: true },
      { source: '/Rennes/villejean', destination: '/rennes/villejean', permanent: true },
      { source: '/Rennes/beaulieu', destination: '/rennes/beaulieu', permanent: true },
      { source: '/Rennes/cleunay', destination: '/rennes/cleunay', permanent: true },

      // CATÉGORIES BLOG VIDES → /blog (Fix CSV 30/10/2025)
      { source: '/blog/etudiant', destination: '/blog', permanent: true },
      { source: '/blog/urgent', destination: '/blog', permanent: true },
      { source: '/blog/devis', destination: '/blog', permanent: true },
      { source: '/blog/longue-distance', destination: '/blog', permanent: true },

      // ARTICLE SATELLITE SPÉCIFIQUE cassé
      { source: '/blog/pas-cher/entraide-demenagement-rennes-plateformes', destination: '/blog', permanent: true },
      { source: '/blog/petit-demenagement-rennes/petit-demenagement-auto-rennes', destination: '/blog/petit-demenagement-rennes/petit-demenagement-rennes-guide', permanent: true },
    ];
  }
};

export default nextConfig;