/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRITICAL: Standalone output pour Docker/CapRover
  output: 'standalone',
  
  // Optimisations pour build CapRover
  typescript: {
    ignoreBuildErrors: true, // Skip type-check en production (fait en dev)
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint en production (fait en dev)
  },
  
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
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

  // ==========================================
  // Redirections 301 pour corriger les 404s
  // Basé sur l'analyse GA4 du 22/10/2025 (508 vues 404/semaine)
  // ==========================================
  async redirects() {
    return [
      // 1. /blog → /actualites (150 vues 404)
      {
        source: '/blog',
        destination: '/actualites',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/actualites/:path*',
        permanent: true,
      },

      // 2. /estimation-rapide → /devis (20 vues 404)
      {
        source: '/estimation-rapide',
        destination: '/devis',
        permanent: true,
      },

      // 3. Inversion: /analyse-ia → /inventaire-ia (corrige 404)
      {
        source: '/analyse-ia',
        destination: '/inventaire-ia',
        permanent: true,
      },

      // Variantes avec trailing slash
      {
        source: '/estimation-rapide/',
        destination: '/devis',
        permanent: true,
      },
      {
        source: '/analyse-ia/',
        destination: '/inventaire-ia',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
