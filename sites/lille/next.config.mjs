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

  // Redirections 404 - Articles satellites sans -lille vers avec -lille
  async redirects() {
    return [
      // Satellites génériques → Lille-spécifiques
      { source: '/blog/satellites/transfert-materiel-informatique-entreprise', destination: '/blog/satellites/transfert-materiel-informatique-entreprise-lille', permanent: true },
      { source: '/blog/satellites/prix-demenagement-saison', destination: '/blog/satellites/prix-demenagement-saison-lille', permanent: true },
      { source: '/blog/satellites/demenagement-basse-saison-economie', destination: '/blog/satellites/demenagement-basse-saison-economie-lille', permanent: true },
      { source: '/blog/satellites/formalites-administratives-demenagement-entreprise', destination: '/blog/satellites/formalites-administratives-demenagement-entreprise-lille', permanent: true },
      { source: '/blog/satellites/main-oeuvre-demenagement-location', destination: '/blog/satellites/main-oeuvre-demenagement-location-lille', permanent: true },
      { source: '/blog/satellites/changement-adresse-demarches-demenagement', destination: '/blog/satellites/changement-adresse-demarches-demenagement-lille', permanent: true },
      { source: '/blog/satellites/demenagement-m3-calcul-tarif', destination: '/blog/satellites/demenagement-m3-calcul-tarif-lille', permanent: true },
      { source: '/blog/satellites/aide-emballage-demenagement', destination: '/blog/satellites/aide-emballage-demenagement-lille', permanent: true },
      { source: '/blog/satellites/delais-demenagement-international', destination: '/blog/satellites/delais-demenagement-international-lille', permanent: true },
      { source: '/blog/satellites/materiel-demenagement-pas-cher-location', destination: '/blog/satellites/materiel-demenagement-pas-cher-location-lille', permanent: true },
      { source: '/blog/satellites/aide-demenagement-personnes-agees', destination: '/blog/satellites/aide-demenagement-personnes-agees-lille', permanent: true },
      { source: '/blog/satellites/prix-demenagement-longue-distance-paris', destination: '/blog/satellites/prix-demenagement-longue-distance-paris-lille', permanent: true },
      { source: '/blog/satellites/formule-economique-vs-standard-demenagement', destination: '/blog/satellites/formule-economique-vs-standard-demenagement-lille', permanent: true },
      { source: '/blog/satellites/assurance-garde-meuble-obligatoire', destination: '/blog/satellites/assurance-garde-meuble-lille-obligatoire', permanent: true },
      { source: '/blog/satellites/demenagement-dimanche-surcout', destination: '/blog/satellites/demenagement-dimanche-lille-surcout', permanent: true },
      { source: '/blog/satellites/demenageur-vieux-acces-difficiles', destination: '/blog/satellites/demenageur-vieux-lille-acces-difficiles', permanent: true },
      { source: '/blog/satellites/demenagement-urgence-express', destination: '/blog/satellites/demenagement-urgence-lille-express', permanent: true },
      { source: '/blog/satellites/prix-demenagement-garde-meuble', destination: '/blog/satellites/prix-demenagement-garde-meuble-lille', permanent: true },
      { source: '/blog/satellites/prix-location-camion-20m3', destination: '/blog/satellites/prix-location-camion-20m3-lille', permanent: true },
      { source: '/blog/satellites/protection-piano-transport-materiaux', destination: '/blog/satellites/protection-piano-transport-materiaux-lille', permanent: true },
      { source: '/blog/satellites/garde-meuble-etudiant-pas-cher', destination: '/blog/satellites/garde-meuble-lille-etudiant-pas-cher', permanent: true },
      { source: '/blog/satellites/porteurs-pro-vs-amis-demenagement', destination: '/blog/satellites/porteurs-pro-vs-amis-demenagement-lille', permanent: true },
      { source: '/blog/satellites/stockage-piano-demenagement-temporaire', destination: '/blog/satellites/stockage-piano-demenagement-temporaire-lille', permanent: true },
      { source: '/blog/satellites/tarifs-petit-demenagement-volume', destination: '/blog/satellites/tarifs-petit-demenagement-lille-volume', permanent: true },
      { source: '/blog/satellites/location-camion-aller-simple-paris', destination: '/blog/satellites/location-camion-aller-simple-paris-lille', permanent: true },
      { source: '/blog/satellites/demenagement-usa-formalites', destination: '/blog/satellites/demenagement-usa-lille-formalites', permanent: true },
      { source: '/blog/satellites/transport-conteneur-demenagement-international', destination: '/blog/satellites/transport-conteneur-demenagement-international-lille', permanent: true },
      { source: '/blog/satellites/garde-meuble-court-terme-long-terme', destination: '/blog/satellites/garde-meuble-lille-court-terme-long-terme', permanent: true },
      { source: '/blog/satellites/demenagement-piano-prix', destination: '/blog/satellites/demenagement-piano-lille-prix', permanent: true },
      { source: '/blog/satellites/diy-demenagement-budget-mini', destination: '/blog/satellites/diy-demenagement-lille-budget-mini', permanent: true },
      { source: '/blog/satellites/demenagement-chambre-etudiant', destination: '/blog/satellites/demenagement-chambre-etudiant-lille', permanent: true },
      { source: '/blog/satellites/quelle-taille-box-t2-t3', destination: '/blog/satellites/quelle-taille-box-lille-t2-t3', permanent: true },
      { source: '/blog/satellites/demenagement-bureaux-weekend', destination: '/blog/satellites/demenagement-bureaux-lille-weekend', permanent: true },
      { source: '/blog/satellites/demenagement-europe-belgique-allemagne', destination: '/blog/satellites/demenagement-europe-lille-belgique-allemagne', permanent: true },
      { source: '/blog/satellites/demenagement-londres-post-brexit', destination: '/blog/satellites/demenagement-londres-post-brexit-lille', permanent: true },
      { source: '/blog/satellites/permis-b-camion-demenagement-limites', destination: '/blog/satellites/permis-b-camion-demenagement-lille-limites', permanent: true },
      { source: '/blog/satellites/economiser-prix-demenagement-astuces', destination: '/blog/satellites/economiser-prix-demenagement-lille-astuces', permanent: true },
      { source: '/blog/satellites/demenageur-monte-meuble-quand-necessaire', destination: '/blog/satellites/demenageur-lille-monte-meuble-quand-necessaire', permanent: true },
      { source: '/blog/satellites/formule-economique-cle-en-main', destination: '/blog/satellites/formule-economique-lille-cle-en-main', permanent: true },
      { source: '/blog/satellites/duree-minimum-garde-meuble', destination: '/blog/satellites/duree-minimum-garde-meuble-lille', permanent: true },
      { source: '/blog/satellites/assurance-piano-demenagement', destination: '/blog/satellites/assurance-piano-demenagement-lille', permanent: true },
      { source: '/blog/satellites/desencombrement-avant-demenagement-economie', destination: '/blog/satellites/desencombrement-avant-demenagement-lille-economie', permanent: true },
      { source: '/blog/satellites/prix-demenagement-t2-detaille', destination: '/blog/satellites/prix-demenagement-lille-t2-detaille', permanent: true },
      { source: '/blog/satellites/agences-location-camion-comparatif', destination: '/blog/satellites/agences-location-camion-lille-comparatif', permanent: true },
      { source: '/blog/satellites/self-stockage-vs-garde-meuble', destination: '/blog/satellites/self-stockage-vs-garde-meuble-lille', permanent: true },
      { source: '/blog/satellites/conduire-camion-demenagement-conseils', destination: '/blog/satellites/conduire-camion-demenagement-lille-conseils', permanent: true },
      { source: '/blog/satellites/piano-vieux-acces-difficiles', destination: '/blog/satellites/piano-vieux-lille-acces-difficiles', permanent: true },
      { source: '/blog/satellites/demenagement-bureaux-nuit', destination: '/blog/satellites/demenagement-bureaux-lille-nuit', permanent: true },
      { source: '/blog/satellites/demenagement-forfait-horaire', destination: '/blog/satellites/demenagement-lille-forfait-horaire', permanent: true },
      { source: '/blog/satellites/cartons-gratuits-recuperer', destination: '/blog/satellites/cartons-gratuits-lille-recuperer', permanent: true },

      // Pages légales avec trailing slash → sans trailing slash  
      { source: '/mentions-legales/', destination: '/mentions-legales', permanent: true },
      { source: '/cgv/', destination: '/cgv', permanent: true },

      // Quartiers Bordeaux indexés à tort → Quartiers Lille
      { source: '/lille/pessac', destination: '/quartiers-lille', permanent: true },
      { source: '/lille/chartrons', destination: '/quartiers-lille', permanent: true },
      { source: '/lille/bastide', destination: '/quartiers-lille', permanent: true },
      { source: '/lille/cauderan', destination: '/quartiers-lille', permanent: true },
      { source: '/lille/merignac', destination: '/quartiers-lille', permanent: true },
      
      // Ville incorrecte
      { source: '/toulouse', destination: '/', permanent: true },
      
      // Ancienne URL estimation
      { source: '/estimation-demenagement-lille/', destination: '/estimation-rapide', permanent: true },

      // MAJUSCULES QUARTIERS → minuscules (Fix CSV 30/10/2025)
      { source: '/quartiers-Lille', destination: '/quartiers-lille', permanent: true },
      { source: '/Lille/vieux-Lille', destination: '/lille/vieux-lille', permanent: true },
      { source: '/Lille/centre', destination: '/lille/centre', permanent: true },
      { source: '/Lille/wazemmes', destination: '/lille/wazemmes', permanent: true },
      { source: '/Lille/moulins', destination: '/lille/moulins', permanent: true },
      { source: '/Lille/lomme', destination: '/lille/lomme', permanent: true },

      // CATÉGORIES BLOG VIDES → /blog (Fix CSV 30/10/2025)
      { source: '/blog/etudiant', destination: '/blog', permanent: true },
      { source: '/blog/urgent', destination: '/blog', permanent: true },
      { source: '/blog/devis', destination: '/blog', permanent: true },
      { source: '/blog/longue-distance', destination: '/blog', permanent: true },
    ];
  }
};

export default nextConfig;