/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRITICAL: Standalone output pour Docker/CapRover
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
  
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  async redirects() {
    return [
      // TOP PRIORITÉ (URLs 404 → pilier blog Bordeaux)
      { source: '/blog/entreprise/checklist-demenagement-entreprise', destination: '/blog/', permanent: true },
      { source: '/blog/entreprise/checklist-demenagement-entreprise/', destination: '/blog/', permanent: true },
      { source: '/blog/entreprise/transfert-bureaux', destination: '/blog/', permanent: true },
      { source: '/blog/entreprise/transfert-bureaux/', destination: '/blog/', permanent: true },
      // LEADGEN-02: Redirections 404 prioritaires (Bordeaux - 06/11/2025)
      { source: '/blog/devis/contenu-obligatoire-devis-demenagement', destination: '/blog/', permanent: true },
      { source: '/blog/prix/frais-caches-demenagement', destination: '/blog/', permanent: true },

      // WILDCARDS CATCH-ALL (LEADGEN-02 - COMPLETS)
      { source: '/blog/garde-meuble/:slug*', destination: '/blog/garde-meuble-bordeaux/:slug*', permanent: true },
      { source: '/blog/pas-cher/:slug*', destination: '/blog/demenagement-pas-cher-bordeaux/:slug*', permanent: true },
      { source: '/blog/international/:slug*', destination: '/blog/demenagement-international-bordeaux/:slug*', permanent: true },
      { source: '/blog/piano/:slug*', destination: '/blog/demenagement-piano-bordeaux/:slug*', permanent: true },
      { source: '/blog/demenageur/:slug*', destination: '/blog/demenageur-bordeaux/:slug*', permanent: true },
      { source: '/blog/aide/:slug*', destination: '/blog/aide-demenagement-bordeaux/:slug*', permanent: true },
      { source: '/blog/demenagement/:slug*', destination: '/blog/demenagement-bordeaux/:slug*', permanent: true },
      { source: '/blog/prix/:slug*', destination: '/blog/prix-demenagement-bordeaux/:slug*', permanent: true },
      { source: '/blog/satellites/:slug*', destination: '/blog/satellites/:slug*', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
