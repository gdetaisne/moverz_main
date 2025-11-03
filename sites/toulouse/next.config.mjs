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

  // Redirections 404
  async redirects() {
    return [
      // Fichiers BATCH/PILIER/PLACEHOLDER supprimés (cache Google)
      { source: '/blog/satellites/article-satellite-:number-placeholder', destination: '/blog', permanent: true },
      { source: '/blog/satellites/BATCH-:path*', destination: '/blog', permanent: true },
      { source: '/blog/satellites/PILIER-:path*', destination: '/blog', permanent: true },
      { source: '/blog/satellites/LISTE-:path*', destination: '/blog', permanent: true },
      { source: '/blog/satellites/RAPPORT-:path*', destination: '/blog', permanent: true },
      { source: '/blog/satellites/ARTICLES-:path*', destination: '/blog', permanent: true },
      { source: '/blog/piliers/:path*', destination: '/blog', permanent: true },
      
      // QUARTIERS BORDEAUX sur Toulouse (cross-ville)
      { source: '/toulouse/pessac', destination: '/quartiers-toulouse', permanent: true },
      { source: '/toulouse/bastide', destination: '/quartiers-toulouse', permanent: true },
      { source: '/toulouse/merignac', destination: '/quartiers-toulouse', permanent: true },
      { source: '/toulouse/cauderan', destination: '/quartiers-toulouse', permanent: true },
      { source: '/toulouse/chartrons', destination: '/quartiers-toulouse', permanent: true },
      { source: '/devis-demenagement-toulouse-chartrons/', destination: '/quartiers-toulouse', permanent: true },
      { source: '/devis-demenagement-toulouse-saint-pierre/', destination: '/quartiers-toulouse', permanent: true },
      { source: '/devis-demenagement-toulouse-cauderan/', destination: '/quartiers-toulouse', permanent: true },
      
      // PAGES LÉGALES : Trailing slash
      { source: '/mentions-legales/', destination: '/mentions-legales', permanent: true },
      { source: '/cgv/', destination: '/cgv', permanent: true },
      { source: '/politique-confidentialite/', destination: '/politique-confidentialite', permanent: true },
      
      // ANCIENNES URLs
      { source: '/estimation-demenagement-toulouse/', destination: '/estimation-rapide', permanent: true },
      { source: '/prix-demenagement-toulouse/', destination: '/blog', permanent: true },
      { source: '/devis-demenagement-toulouse/', destination: '/estimation-rapide', permanent: true },

      // CATÉGORIES BLOG RÉELLEMENT VIDES → /blog (Fix CSV 30/10/2025)
      { source: '/blog/devis', destination: '/blog', permanent: true },

      // CATÉGORIES ACCENTUÉES → SANS ACCENTS (Pattern #7 - Fix 404s accents)
      { source: '/blog/déménagement-economique/:slug*', destination: '/blog/demenagement-economique/:slug*', permanent: true },
      { source: '/blog/dem%C3%A9nagement-economique/:slug*', destination: '/blog/demenagement-economique/:slug*', permanent: true },
      { source: '/blog/déménagement-entreprise/:slug*', destination: '/blog/demenagement-entreprise/:slug*', permanent: true },
      { source: '/blog/dem%C3%A9nagement-entreprise/:slug*', destination: '/blog/demenagement-entreprise/:slug*', permanent: true },
      { source: '/blog/déménageur-professionnel/:slug*', destination: '/blog/demenageur-professionnel/:slug*', permanent: true },
      { source: '/blog/dem%C3%A9nageur-professionnel/:slug*', destination: '/blog/demenageur-professionnel/:slug*', permanent: true },
      { source: '/blog/prix-déménagement/:slug*', destination: '/blog/prix-demenagement/:slug*', permanent: true },
      { source: '/blog/prix-dem%C3%A9nagement/:slug*', destination: '/blog/prix-demenagement/:slug*', permanent: true },
      { source: '/blog/aide-déménagement/:slug*', destination: '/blog/aide-demenagement/:slug*', permanent: true },
      { source: '/blog/aide-dem%C3%A9nagement/:slug*', destination: '/blog/aide-demenagement/:slug*', permanent: true },
      { source: '/blog/assurance-déménagement/:slug*', destination: '/blog/assurance-demenagement/:slug*', permanent: true },
      { source: '/blog/assurance-dem%C3%A9nagement/:slug*', destination: '/blog/assurance-demenagement/:slug*', permanent: true },
      { source: '/blog/avis-déménagement/:slug*', destination: '/blog/avis-demenagement/:slug*', permanent: true },
      { source: '/blog/avis-dem%C3%A9nagement/:slug*', destination: '/blog/avis-demenagement/:slug*', permanent: true },
      { source: '/blog/déménagement-ascenseur/:slug*', destination: '/blog/demenagement-ascenseur/:slug*', permanent: true },
      { source: '/blog/dem%C3%A9nagement-ascenseur/:slug*', destination: '/blog/demenagement-ascenseur/:slug*', permanent: true },
      { source: '/blog/déménagement-avion/:slug*', destination: '/blog/demenagement-avion/:slug*', permanent: true },
      { source: '/blog/dem%C3%A9nagement-avion/:slug*', destination: '/blog/demenagement-avion/:slug*', permanent: true },
      { source: '/blog/déménagement-bateau/:slug*', destination: '/blog/demenagement-bateau/:slug*', permanent: true },
      { source: '/blog/dem%C3%A9nagement-bateau/:slug*', destination: '/blog/demenagement-bateau/:slug*', permanent: true },
      { source: '/blog/déménagement-etudiant/:slug*', destination: '/blog/demenagement-etudiant/:slug*', permanent: true },
      { source: '/blog/dem%C3%A9nagement-etudiant/:slug*', destination: '/blog/demenagement-etudiant/:slug*', permanent: true },
    ];
  }
};


export default nextConfig;