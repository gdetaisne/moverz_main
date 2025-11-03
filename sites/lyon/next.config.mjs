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

  // Redirections 404 - URLs sans -lyon vers avec -lyon
  async redirects() {
    return [
      // PILIERS : Catégories sans -lyon → avec -lyon (10 redirects)
      { source: '/blog/aide-au-demenagement/aide-au-demenagement-guide-complet', destination: '/blog/aide-au-demenagement-lyon/aide-au-demenagement-lyon-guide-complet', permanent: true },
      { source: '/blog/demenagement-entreprise/demenagement-entreprise-guide-complet', destination: '/blog/demenagement-entreprise-lyon/demenagement-entreprise-lyon-guide-complet', permanent: true },
      { source: '/blog/demenagement-international/demenagement-international-guide-complet', destination: '/blog/demenagement-international-lyon/demenagement-international-lyon-guide-complet', permanent: true },
      { source: '/blog/demenagement-pas-cher/demenagement-pas-cher-guide-complet', destination: '/blog/demenagement-lyon-pas-cher/demenagement-lyon-pas-cher-guide-complet', permanent: true },
      { source: '/blog/demenagement-petit-volume/demenagement-petit-volume-guide-complet', destination: '/blog/demenagement-petit-volume-lyon/demenagement-petit-volume-lyon-guide-complet', permanent: true },
      { source: '/blog/demenagement-piano/demenagement-piano-guide-complet', destination: '/blog/demenagement-piano-lyon/demenagement-piano-lyon-guide-complet', permanent: true },
      { source: '/blog/demenageur/demenageur-guide-complet', destination: '/blog/demenageur-lyon/demenageur-lyon-guide-complet', permanent: true },
      { source: '/blog/garde-meuble/garde-meuble-guide-complet', destination: '/blog/garde-meuble-lyon/garde-meuble-lyon-guide-complet', permanent: true },
      { source: '/blog/location-camion-demenagement/location-camion-demenagement-guide-complet', destination: '/blog/location-camion-demenagement-lyon/location-camion-demenagement-lyon-guide-complet', permanent: true },
      { source: '/blog/prix-demenagement/prix-demenagement-guide-complet', destination: '/blog/prix-demenagement-lyon/prix-demenagement-lyon-guide-complet', permanent: true },

      // SATELLITES : Articles sans -lyon → avec -lyon (74 redirects)
      { source: '/blog/satellites/accordage-piano-apres-demenagement', destination: '/blog/satellites/accordage-piano-apres-demenagement-lyon', permanent: true },
      { source: '/blog/satellites/aide-chargement-camion', destination: '/blog/satellites/aide-chargement-camion-lyon', permanent: true },
      { source: '/blog/satellites/aide-demenagement-entre-particuliers', destination: '/blog/satellites/aide-demenagement-entre-particuliers-lyon', permanent: true },
      { source: '/blog/satellites/aide-financiere-demenagement', destination: '/blog/satellites/aide-financiere-demenagement-lyon', permanent: true },
      { source: '/blog/satellites/aide-portage-escaliers', destination: '/blog/satellites/aide-portage-escaliers-lyon', permanent: true },
      { source: '/blog/satellites/amenagement-nouveaux-bureaux', destination: '/blog/satellites/amenagement-nouveaux-bureaux-lyon', permanent: true },
      { source: '/blog/satellites/archives-entreprise-demenagement', destination: '/blog/satellites/archives-entreprise-demenagement-lyon', permanent: true },
      { source: '/blog/satellites/avis-demenageurs', destination: '/blog/satellites/avis-demenageurs-lyon', permanent: true },
      { source: '/blog/satellites/calcul-volume-demenagement', destination: '/blog/satellites/calcul-volume-demenagement-lyon', permanent: true },
      { source: '/blog/satellites/camionnette-chauffeur', destination: '/blog/satellites/camionnette-chauffeur-lyon', permanent: true },
      { source: '/blog/satellites/cartons-demenagement-gratuits', destination: '/blog/satellites/cartons-demenagement-gratuits-lyon', permanent: true },
      { source: '/blog/satellites/choisir-demenageur-fiable-pas-cher', destination: '/blog/satellites/choisir-demenageur-fiable-pas-cher-lyon', permanent: true },
      { source: '/blog/satellites/choisir-demenageur-international', destination: '/blog/satellites/choisir-demenageur-international-lyon', permanent: true },
      { source: '/blog/satellites/communication-interne-demenagement-entreprise', destination: '/blog/satellites/communication-interne-demenagement-entreprise-lyon', permanent: true },
      { source: '/blog/satellites/comparaison-prix-demenageurs', destination: '/blog/satellites/comparaison-prix-demenageurs-lyon', permanent: true },
      { source: '/blog/satellites/delais-demenagement-international', destination: '/blog/satellites/delais-demenagement-international-lyon', permanent: true },
      { source: '/blog/satellites/demenagement-amis-remuneration', destination: '/blog/satellites/demenagement-amis-remuneration-lyon', permanent: true },
      { source: '/blog/satellites/demenagement-avec-aide-vs-sans-aide', destination: '/blog/satellites/demenagement-avec-aide-vs-sans-aide-lyon', permanent: true },
      { source: '/blog/satellites/demenagement-chambre-etudiant', destination: '/blog/satellites/demenagement-chambre-etudiant-lyon', permanent: true },
      { source: '/blog/satellites/demenagement-europe', destination: '/blog/satellites/demenagement-europe-lyon', permanent: true },
      { source: '/blog/satellites/demenagement-senior-adapte', destination: '/blog/satellites/demenagement-senior-adapte-lyon', permanent: true },
      { source: '/blog/satellites/demenagement-week-end-entreprise', destination: '/blog/satellites/demenagement-week-end-entreprise-lyon', permanent: true },
      { source: '/blog/satellites/demenageur-agree-certifie', destination: '/blog/satellites/demenageur-agree-certifie-lyon', permanent: true },
      { source: '/blog/satellites/demenageur-dimanche', destination: '/blog/satellites/demenageur-dimanche-lyon', permanent: true },
      { source: '/blog/satellites/demenageur-pas-cher', destination: '/blog/satellites/demenageur-pas-cher-lyon', permanent: true },
      { source: '/blog/satellites/demenageur-specialiste-piano', destination: '/blog/satellites/demenageur-specialiste-piano-lyon', permanent: true },
      { source: '/blog/satellites/devis-demenagement-gratuit', destination: '/blog/satellites/devis-demenagement-gratuit-lyon', permanent: true },
      { source: '/blog/satellites/devis-estimation-demenagement', destination: '/blog/satellites/devis-estimation-demenagement-lyon', permanent: true },
      { source: '/blog/satellites/diy-vs-pro-petit-volume', destination: '/blog/satellites/diy-vs-pro-petit-volume-lyon', permanent: true },
      { source: '/blog/satellites/documents-demenagement-international', destination: '/blog/satellites/documents-demenagement-international-lyon', permanent: true },
      { source: '/blog/satellites/duree-minimum-location-box', destination: '/blog/satellites/duree-minimum-location-box-lyon', permanent: true },
      { source: '/blog/satellites/economiser-prix-demenagement', destination: '/blog/satellites/economiser-prix-demenagement-lyon', permanent: true },
      { source: '/blog/satellites/embaucher-manutentionnaire-freelance', destination: '/blog/satellites/embaucher-manutentionnaire-freelance-lyon', permanent: true },
      { source: '/blog/satellites/etapes-transport-piano', destination: '/blog/satellites/etapes-transport-piano-lyon', permanent: true },
      { source: '/blog/satellites/facteurs-prix-demenagement', destination: '/blog/satellites/facteurs-prix-demenagement-lyon', permanent: true },
      { source: '/blog/satellites/faq-aide-demenagement', destination: '/blog/satellites/faq-aide-demenagement-lyon', permanent: true },
      { source: '/blog/satellites/faq-demenagement-economique', destination: '/blog/satellites/faq-demenagement-economique-lyon', permanent: true },
      { source: '/blog/satellites/faq-demenagement-entreprise', destination: '/blog/satellites/faq-demenagement-entreprise-lyon', permanent: true },
      { source: '/blog/satellites/faq-demenagement-international', destination: '/blog/satellites/faq-demenagement-international-lyon', permanent: true },
      { source: '/blog/satellites/faq-demenagement-piano', destination: '/blog/satellites/faq-demenagement-piano-lyon', permanent: true },
      { source: '/blog/satellites/faq-demenageur', destination: '/blog/satellites/faq-demenageur-lyon', permanent: true },
      { source: '/blog/satellites/faq-garde-meuble', destination: '/blog/satellites/faq-garde-meuble-lyon', permanent: true },
      { source: '/blog/satellites/faq-petit-volume', destination: '/blog/satellites/faq-petit-volume-lyon', permanent: true },
      { source: '/blog/satellites/faq-prix-demenagement', destination: '/blog/satellites/faq-prix-demenagement-lyon', permanent: true },
      { source: '/blog/satellites/formalites-douanieres-international', destination: '/blog/satellites/formalites-douanieres-international-lyon', permanent: true },
      { source: '/blog/satellites/formule-economique-petit-volume', destination: '/blog/satellites/formule-economique-petit-volume-lyon', permanent: true },
      { source: '/blog/satellites/formule-economique-vs-standard', destination: '/blog/satellites/formule-economique-vs-standard-lyon', permanent: true },
      { source: '/blog/satellites/garde-meuble-entreprise', destination: '/blog/satellites/garde-meuble-entreprise-lyon', permanent: true },
      { source: '/blog/satellites/garde-meuble-professionnel-entreprise', destination: '/blog/satellites/garde-meuble-professionnel-entreprise-lyon', permanent: true },
      { source: '/blog/satellites/location-camion-demenagement', destination: '/blog/satellites/location-camion-demenagement-lyon', permanent: true },
      { source: '/blog/satellites/manutention-escaliers-specifique', destination: '/blog/satellites/manutention-escaliers-specifique-lyon', permanent: true },
      { source: '/blog/satellites/manutentionnaire-demenagement', destination: '/blog/satellites/manutentionnaire-demenagement-lyon', permanent: true },
      { source: '/blog/satellites/materiel-demenagement-piano', destination: '/blog/satellites/materiel-demenagement-piano-lyon', permanent: true },
      { source: '/blog/satellites/meilleure-periode-demenager', destination: '/blog/satellites/meilleure-periode-demenager-lyon', permanent: true },
      { source: '/blog/satellites/meilleurs-demenageurs', destination: '/blog/satellites/meilleurs-demenageurs-lyon', permanent: true },
      { source: '/blog/satellites/monte-meuble-piano', destination: '/blog/satellites/monte-meuble-piano-lyon', permanent: true },
      { source: '/blog/satellites/petit-demenagement-express', destination: '/blog/satellites/petit-demenagement-express-lyon', permanent: true },
      { source: '/blog/satellites/planification-demenagement-bureaux', destination: '/blog/satellites/planification-demenagement-bureaux-lyon', permanent: true },
      { source: '/blog/satellites/prix-demenagement-entreprise', destination: '/blog/satellites/prix-demenagement-entreprise-lyon', permanent: true },
      { source: '/blog/satellites/prix-demenagement-international', destination: '/blog/satellites/prix-demenagement-international-lyon', permanent: true },
      { source: '/blog/satellites/prix-demenagement-maison', destination: '/blog/satellites/prix-demenagement-maison-lyon', permanent: true },
      { source: '/blog/satellites/prix-demenagement-piano-queue', destination: '/blog/satellites/prix-demenagement-piano-queue-lyon', permanent: true },
      { source: '/blog/satellites/prix-demenagement-studio', destination: '/blog/satellites/prix-demenagement-studio-lyon', permanent: true },
      { source: '/blog/satellites/prix-demenagement-t3', destination: '/blog/satellites/prix-demenagement-t3-lyon', permanent: true },
      { source: '/blog/satellites/prix-petit-demenagement', destination: '/blog/satellites/prix-petit-demenagement-lyon', permanent: true },
      { source: '/blog/satellites/securite-garde-meuble', destination: '/blog/satellites/securite-garde-meuble-lyon', permanent: true },
      { source: '/blog/satellites/self-stockage-vs-garde-meuble-traditionnel', destination: '/blog/satellites/self-stockage-vs-garde-meuble-traditionnel-lyon', permanent: true },
      { source: '/blog/satellites/stockage-pendant-demenagement', destination: '/blog/satellites/stockage-pendant-demenagement-lyon', permanent: true },
      { source: '/blog/satellites/taille-box-choisir', destination: '/blog/satellites/taille-box-choisir-lyon', permanent: true },
      { source: '/blog/satellites/tarifs-demenageur', destination: '/blog/satellites/tarifs-demenageur-lyon', permanent: true },
      { source: '/blog/satellites/transfert-informatique-entreprise', destination: '/blog/satellites/transfert-informatique-entreprise-lyon', permanent: true },
      { source: '/blog/satellites/transparence-prix-demenagement', destination: '/blog/satellites/transparence-prix-demenagement-lyon', permanent: true },
      { source: '/blog/satellites/transport-cartons-uniquement', destination: '/blog/satellites/transport-cartons-uniquement-lyon', permanent: true },
      { source: '/blog/satellites/transport-maritime-container', destination: '/blog/satellites/transport-maritime-container-lyon', permanent: true },
      { source: '/blog/satellites/transport-quelques-meubles', destination: '/blog/satellites/transport-quelques-meubles-lyon', permanent: true },

      
      // SERVICES : Majuscules
      { source: '/services/demenagement-economique-Lyon', destination: '/services/demenagement-economique-lyon', permanent: true },
      { source: '/services/demenagement-standard-Lyon', destination: '/services/demenagement-standard-lyon', permanent: true },
      { source: '/services/demenagement-premium-Lyon', destination: '/services/demenagement-premium-lyon', permanent: true },
      
      // PAGES LÉGALES : Trailing slash
      { source: '/mentions-legales/', destination: '/mentions-legales', permanent: true },
      { source: '/cgv/', destination: '/cgv', permanent: true },
      { source: '/politique-confidentialite/', destination: '/politique-confidentialite', permanent: true },
      
      // PAGES QUARTIERS : Majuscules
      { source: '/quartiers-Lyon', destination: '/quartiers-lyon', permanent: true },
      
      // ANCIENNES URLs
      { source: '/estimation-demenagement-lyon/', destination: '/estimation-rapide', permanent: true },
      { source: '/prix-demenagement-lyon/', destination: '/blog/prix-demenagement-lyon/prix-demenagement-lyon-guide-complet', permanent: true },
      { source: '/devis-demenagement-lyon/', destination: '/estimation-rapide', permanent: true },
    ];
  }
};

export default nextConfig;