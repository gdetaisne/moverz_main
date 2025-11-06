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

  // Redirections 404 - Nettoyage indexation Nantes
  async redirects() {
    return [
      // SATELLITES : Articles sans -nantes → avec -nantes
      { source: '/blog/satellites/demenagement-meuble-seul', destination: '/blog/satellites/demenagement-meuble-seul-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-piano-etages-sans-ascenseur', destination: '/blog/satellites/demenagement-piano-etages-sans-ascenseur-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-usa-canada', destination: '/blog/satellites/demenagement-usa-canada-nantes', permanent: true },
      { source: '/blog/satellites/accordage-piano-apres-demenagement', destination: '/blog/satellites/accordage-piano-apres-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/basse-saison-demenagement', destination: '/blog/satellites/basse-saison-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/assurance-demenagement-international', destination: '/blog/satellites/assurance-demenagement-international-nantes', permanent: true },
      { source: '/blog/satellites/garde-meuble-courte-duree', destination: '/blog/satellites/garde-meuble-courte-duree-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-economique-vs-standard', destination: '/blog/satellites/demenagement-economique-vs-standard-nantes', permanent: true },
      { source: '/blog/satellites/acces-garde-meuble-horaires', destination: '/blog/satellites/acces-garde-meuble-nantes-horaires', permanent: true },
      { source: '/blog/satellites/aide-demenagement-amis-famille', destination: '/blog/satellites/aide-demenagement-amis-famille-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-piano-queue', destination: '/blog/satellites/demenagement-piano-queue-nantes', permanent: true },
      { source: '/blog/satellites/garde-meuble-etudiant', destination: '/blog/satellites/garde-meuble-etudiant-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-derniere-minute', destination: '/blog/satellites/demenagement-derniere-minute-nantes', permanent: true },
      { source: '/blog/satellites/aide-demenagement-famille-amis', destination: '/blog/satellites/aide-demenagement-famille-amis-nantes', permanent: true },
      { source: '/blog/satellites/garde-meuble-centre-peripherie', destination: '/blog/satellites/garde-meuble-centre-peripherie-nantes', permanent: true },
      { source: '/blog/satellites/groupage-international-demenagement', destination: '/blog/satellites/groupage-international-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/trouver-aide-demenagement-dernier-moment', destination: '/blog/satellites/trouver-aide-demenagement-dernier-moment-nantes', permanent: true },
      { source: '/blog/satellites/comparatif-diy-vs-professionnel-petit-demenagement', destination: '/blog/satellites/comparatif-diy-vs-professionnel-petit-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/aide-ponctuelle-chargement-dechargement', destination: '/blog/satellites/aide-ponctuelle-chargement-dechargement-nantes', permanent: true },
      { source: '/blog/satellites/vehicule-demenagement-international', destination: '/blog/satellites/vehicule-demenagement-international-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-piano-prix', destination: '/blog/satellites/demenagement-piano-prix-nantes', permanent: true },
      { source: '/blog/satellites/preparation-piano-avant-demenagement', destination: '/blog/satellites/preparation-piano-avant-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/assurance-garde-meuble', destination: '/blog/satellites/assurance-garde-meuble-nantes', permanent: true },
      { source: '/blog/satellites/garde-meuble-vs-self-stockage', destination: '/blog/satellites/garde-meuble-vs-self-stockage-nantes', permanent: true },
      { source: '/blog/satellites/piano-ancien-collection-demenagement', destination: '/blog/satellites/piano-ancien-collection-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/assurances-aide-demenagement-particuliers', destination: '/blog/satellites/assurances-aide-demenagement-particuliers-nantes', permanent: true },
      { source: '/blog/satellites/location-camion-demenagement', destination: '/blog/satellites/location-camion-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-asie', destination: '/blog/satellites/demenagement-asie-nantes', permanent: true },
      { source: '/blog/satellites/monte-meuble-demenagement', destination: '/blog/satellites/monte-meuble-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/assurance-piano-demenagement', destination: '/blog/satellites/assurance-piano-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-equipement-bebe', destination: '/blog/satellites/demenagement-equipement-bebe-nantes', permanent: true },
      { source: '/blog/satellites/tarif-horaire-porteur-demenagement', destination: '/blog/satellites/tarif-horaire-porteur-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-colocation', destination: '/blog/satellites/demenagement-colocation-nantes', permanent: true },
      { source: '/blog/satellites/demenager-soi-meme-location-utilitaire', destination: '/blog/satellites/demenager-soi-meme-location-utilitaire-nantes', permanent: true },
      { source: '/blog/satellites/erreurs-eviter-demenagement-piano', destination: '/blog/satellites/erreurs-eviter-demenagement-piano-nantes', permanent: true },
      { source: '/blog/satellites/garde-meuble-pas-cher', destination: '/blog/satellites/garde-meuble-pas-cher-nantes', permanent: true },
      { source: '/blog/satellites/emballage-diy-demenagement', destination: '/blog/satellites/emballage-diy-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/delais-demenagement-international', destination: '/blog/satellites/delais-demenagement-international-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-studio-prix', destination: '/blog/satellites/demenagement-studio-prix-nantes', permanent: true },
      { source: '/blog/satellites/etudiants-aide-demenagement', destination: '/blog/satellites/etudiants-aide-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-uk-post-brexit', destination: '/blog/satellites/demenagement-uk-post-brexit-nantes', permanent: true },
      { source: '/blog/satellites/budget-complet-demenagement-piano', destination: '/blog/satellites/budget-complet-demenagement-piano-nantes', permanent: true },
      { source: '/blog/satellites/plateformes-aide-demenagement', destination: '/blog/satellites/plateformes-aide-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/outils-utiles-petit-demenagement', destination: '/blog/satellites/outils-utiles-petit-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/astuces-reduire-cout-demenagement', destination: '/blog/satellites/astuces-reduire-cout-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/formalites-douanes-demenagement-international', destination: '/blog/satellites/formalites-douanes-demenagement-international-nantes', permanent: true },
      { source: '/blog/satellites/prix-demenagement-pas-cher-2025', destination: '/blog/satellites/prix-demenagement-pas-cher-2025-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-objets-lourds', destination: '/blog/satellites/demenagement-objets-lourds-nantes', permanent: true },
      { source: '/blog/satellites/transport-maritime-vs-aerien-demenagement', destination: '/blog/satellites/transport-maritime-vs-aerien-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/prix-garde-meuble-2025', destination: '/blog/satellites/prix-garde-meuble-2025-nantes', permanent: true },
      { source: '/blog/satellites/transport-piano-longue-distance', destination: '/blog/satellites/transport-piano-longue-distance-nantes', permanent: true },
      { source: '/blog/satellites/duree-minimum-garde-meuble', destination: '/blog/satellites/duree-minimum-garde-meuble-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-petites-distances', destination: '/blog/satellites/demenagement-petites-distances-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-etudiant-astuces', destination: '/blog/satellites/demenagement-etudiant-astuces-nantes', permanent: true },
      { source: '/blog/satellites/comparatif-formules-economiques', destination: '/blog/satellites/comparatif-formules-economiques-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-etudiant-pas-cher', destination: '/blog/satellites/demenagement-etudiant-pas-cher-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-sans-carton', destination: '/blog/satellites/demenagement-sans-carton-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-t1-prix', destination: '/blog/satellites/demenagement-t1-prix-nantes', permanent: true },
      { source: '/blog/satellites/prix-demenagement-international', destination: '/blog/satellites/prix-demenagement-international-nantes', permanent: true },
      { source: '/blog/satellites/choisir-taille-box-stockage', destination: '/blog/satellites/choisir-taille-box-stockage-nantes', permanent: true },
      { source: '/blog/satellites/cartons-gratuits-demenagement', destination: '/blog/satellites/cartons-gratuits-demenagement-nantes', permanent: true },
      { source: '/blog/satellites/demenagement-semaine-vs-weekend', destination: '/blog/satellites/demenagement-semaine-vs-weekend-nantes', permanent: true },

      // PILIERS : Mauvais dossiers → corrects
      { source: '/blog/prix-demenagement/prix-demenagement-guide', destination: '/blog/prix-demenagement-nantes/prix-demenagement-nantes-guide', permanent: true },
      { source: '/blog/petit-demenagement/petit-demenagement-guide', destination: '/blog/petit-demenagement-nantes/petit-demenagement-nantes-guide', permanent: true },
      { source: '/blog/location-camion-demenagement/location-camion-demenagement-guide', destination: '/blog/location-camion-demenagement-nantes/location-camion-demenagement-nantes-guide', permanent: true },
      { source: '/blog/demenagement-piano/demenagement-piano-guide', destination: '/blog/demenagement-piano-nantes/demenagement-piano-nantes-guide', permanent: true },
      { source: '/blog/demenagement-entreprise/demenagement-entreprise-guide', destination: '/blog/demenagement-entreprise-nantes/demenagement-entreprise-nantes-guide', permanent: true },
      { source: '/blog/demenagement-international/demenagement-international-guide', destination: '/blog/demenagement-international-nantes/demenagement-international-nantes-guide', permanent: true },
      { source: '/blog/aide-demenagement/aide-demenagement-guide', destination: '/blog/aide-demenagement-nantes/aide-demenagement-nantes-guide', permanent: true },
      { source: '/blog/demenagement-pas-cher/demenagement-pas-cher-guide', destination: '/blog/demenagement-pas-cher-nantes/demenagement-pas-cher-nantes-guide', permanent: true },
      { source: '/blog/demenageur/demenageur-guide-complet', destination: '/blog/demenageur-nantes/demenageur-nantes-guide-complet', permanent: true },
      { source: '/blog/garde-meuble/garde-meuble-guide-complet', destination: '/blog/garde-meuble-nantes/garde-meuble-nantes-guide-complet', permanent: true },

      // REDIRECTIONS SUPPRIMÉES (04/11/2025) - Créaient des 404s
      // Les articles sont dans leurs vraies catégories, pas dans /blog/satellites/
      // Voir: TASK-404-blog-nantes

      // QUARTIERS : Majuscules Nantes → nantes

      // MAJUSCULES : Nantes → nantes
      { source: '/nantes-vers-nantes', destination: '/', permanent: true },
      { source: '/quartiers-Nantes', destination: '/quartiers-nantes', permanent: true },

      // SERVICES : Majuscules
      { source: '/services/demenagement-premium-Nantes', destination: '/services/demenagement-premium-nantes', permanent: true },
      { source: '/services/demenagement-economique-Nantes', destination: '/services/demenagement-economique-nantes', permanent: true },
      { source: '/services/demenagement-standard-Nantes', destination: '/services/demenagement-standard-nantes', permanent: true },

      // PAGES LÉGALES : Trailing slash
      { source: '/mentions-legales/', destination: '/mentions-legales', permanent: true },
      { source: '/cgv/', destination: '/cgv', permanent: true },
      { source: '/politique-confidentialite/', destination: '/politique-confidentialite', permanent: true },

      // ANCIENNES URLs
      { source: '/estimation-demenagement-nantes/', destination: '/estimation-rapide', permanent: true },
      { source: '/prix-demenagement-nantes/', destination: '/blog/prix-demenagement-nantes/prix-demenagement-nantes-guide', permanent: true },
      { source: '/devis-demenagement-nantes/', destination: '/estimation-rapide', permanent: true },

      // CATÉGORIES BLOG VIDES → /blog (Fix CSV 30/10/2025)
      { source: '/blog/etudiant', destination: '/blog', permanent: true },
      { source: '/blog/urgent', destination: '/blog', permanent: true },
      { source: '/blog/devis', destination: '/blog', permanent: true },
      { source: '/blog/longue-distance', destination: '/blog', permanent: true },
      
      // TOP PRIORITÉ (URLs 404 → fallback /blog)
      { source: '/blog/piano/accordage-piano-apres-demenagement-nantes', destination: '/blog', permanent: true },
      { source: '/blog/pas-cher/comparatif-formules-economiques-demenagement-nantes', destination: '/blog', permanent: true },
      { source: '/blog/international/prix-demenagement-international-nantes', destination: '/blog', permanent: true },
      { source: '/blog/international/transport-maritime-aerien-demenagement-international-nantes', destination: '/blog', permanent: true },
      { source: '/blog/garde-meuble/garde-meuble-pas-cher-nantes', destination: '/blog', permanent: true },
      { source: '/blog/international/demenagement-nantes-usa-canada', destination: '/blog', permanent: true },
      { source: '/blog/garde-meuble/prix-garde-meuble-nantes-2025', destination: '/blog', permanent: true },
      { source: '/blog/garde-meuble/garde-meuble-vs-self-stockage-nantes', destination: '/blog', permanent: true },
      { source: '/blog/garde-meuble/duree-minimum-garde-meuble-nantes', destination: '/blog', permanent: true },
      // LEADGEN-02: Redirections 404 prioritaires (Nantes - 06/11/2025)
      { source: '/blog/demenagement-nantes/guide', destination: '/blog/demenagement-nantes/guide-complet/', permanent: true },
      { source: '/blog/demenagement-nantes/guide-complet', destination: '/blog/demenagement-nantes/guide-complet/', permanent: true },

      // WILDCARDS CATCH-ALL (TASK-LEADGEN-02 - COMPLETS)
      { source: '/blog/garde-meuble/:slug*', destination: '/blog/garde-meuble-nantes/:slug*', permanent: true },
      { source: '/blog/pas-cher/:slug*', destination: '/blog/demenagement-pas-cher-nantes/:slug*', permanent: true },
      { source: '/blog/international/:slug*', destination: '/blog/demenagement-international-nantes/:slug*', permanent: true },
      { source: '/blog/piano/:slug*', destination: '/blog/demenagement-piano-nantes/:slug*', permanent: true },
      { source: '/blog/demenageur/:slug*', destination: '/blog/demenageur-nantes/:slug*', permanent: true },
      { source: '/blog/aide/:slug*', destination: '/blog/aide-demenagement-nantes/:slug*', permanent: true },
      { source: '/blog/demenagement/:slug*', destination: '/blog/demenagement-nantes/:slug*', permanent: true },
      { source: '/blog/prix/:slug*', destination: '/blog/prix-demenagement-nantes/:slug*', permanent: true },
      { source: '/blog/satellites/:slug*', destination: '/blog/satellites/:slug*', permanent: true },
    ];
  }
};

export default nextConfig;