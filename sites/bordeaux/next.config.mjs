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
