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
  
  // Configuration des images - DÉSACTIVÉE pour éviter erreurs 400
  images: {
    // Désactiver l'optimisation d'images pour éviter les erreurs Unsplash
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;