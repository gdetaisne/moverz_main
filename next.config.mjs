/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  experimental: {
    serverComponentsExternalPackages: []
  },

  compress: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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

      // 3. /inventaire-ia → /analyse-ia (10 vues 404)
      {
        source: '/inventaire-ia',
        destination: '/analyse-ia',
        permanent: true,
      },

      // Variantes avec trailing slash
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
    ];
  },
};

export default nextConfig;

