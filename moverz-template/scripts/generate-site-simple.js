#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';

// ============================================================================
// GÉNÉRATEUR DE SITE MULTI-VILLES (VERSION SIMPLIFIÉE)
// ============================================================================

class SiteGenerator {
  constructor(cityData) {
    this.cityData = cityData;
    this.templateDir = process.cwd();
    this.outputDir = path.join(process.cwd(), '..', 'sites', cityData.citySlug);
  }

  async generate() {
    console.log(chalk.blue(`🚀 Génération du site pour ${this.cityData.city}...`));
    
    try {
      // 1. Créer la structure du site
      await this.createSiteStructure();
      
      // 2. Copier les fichiers statiques
      await this.copyStaticFiles();
      
      // 3. Générer les fichiers avec variables
      await this.generateVariableFiles();
      
      // 4. Générer le package.json
      await this.generatePackageJson();
      
      // 5. Générer la configuration Next.js
      await this.generateNextConfig();
      
      // 6. Générer la configuration PostCSS
      await this.generatePostCSSConfig();
      
      // 7. Générer la configuration Tailwind
      await this.generateTailwindConfig();
      
      // 8. Générer les métadonnées
      await this.generateMetadata();
      
      // 7. Générer le sitemap
      await this.generateSitemap();
      
      // 8. Générer robots.txt
      await this.generateRobots();
      
      // 9. Installer les dépendances
      await this.installDependencies();
      
      console.log(chalk.green(`✅ Site généré avec succès pour ${this.cityData.city}!`));
      console.log(chalk.yellow(`📁 Dossier: ${this.outputDir}`));
      console.log(chalk.cyan(`🌐 URL: ${this.cityData.domain}`));
      
    } catch (error) {
      console.error(chalk.red(`❌ Erreur lors de la génération: ${error.message}`));
      throw error;
    }
  }

  async createSiteStructure() {
    console.log(chalk.blue('📁 Création de la structure...'));
    
    const dirs = [
      'src/app',
      'src/app/blog',
      'src/app/blog/[category]',
      'src/app/blog/[category]/[slug]',
      'src/app/comment-ca-marche',
      'src/app/faq',
      'src/app/partenaires',
      'src/app/inventaire-ia',
      'src/app/estimation-rapide',
      'src/app/contact',
      'src/app/services',
      'src/app/notre-offre',
      `src/app/${this.cityData.citySlug}`,
      'src/components',
      'src/lib',
      'content/blog',
      'public/images',
      'scripts',
      'data'
    ];

    for (const dir of dirs) {
      await fs.ensureDir(path.join(this.outputDir, dir));
    }
  }

  async copyStaticFiles() {
    console.log(chalk.blue('📋 Copie des fichiers statiques...'));
    
    // Copier les composants
    await fs.copy(
      path.join(this.templateDir, 'src/components'),
      path.join(this.outputDir, 'src/components')
    );
    
    // Copier les libs
    await fs.copy(
      path.join(this.templateDir, 'src/lib'),
      path.join(this.outputDir, 'src/lib')
    );
    
    // Copier les images
    await fs.copy(
      path.join(this.templateDir, 'public/images'),
      path.join(this.outputDir, 'public/images')
    );
    
    // Copier les templates
    await fs.copy(
      path.join(this.templateDir, 'src/app/_templates'),
      path.join(this.outputDir, 'src/app/_templates')
    );
    
    // Copier les pages statiques
    const staticPages = [
      'comment-ca-marche',
      'faq',
      'partenaires',
      'inventaire-ia',
      'estimation-rapide',
      'contact',
      'services',
      'notre-offre'
    ];
    
    for (const page of staticPages) {
      await fs.copy(
        path.join(this.templateDir, 'src/app', page),
        path.join(this.outputDir, 'src/app', page)
      );
    }
    
    // Copier les fichiers de configuration
    const configFiles = [
      'tailwind.config.ts',
      'tsconfig.json',
      'postcss.config.mjs',
      'eslint.config.mjs',
      'next-env.d.ts'
    ];
    
    for (const file of configFiles) {
      if (await fs.pathExists(path.join(this.templateDir, file))) {
        await fs.copy(
          path.join(this.templateDir, file),
          path.join(this.outputDir, file)
        );
      }
    }
  }

  async generateVariableFiles() {
    console.log(chalk.blue('🔄 Génération des fichiers avec variables...'));
    
    // Générer globals.css
    await this.generateGlobalsCSS();
    
    // Générer layout.tsx
    await this.generateLayout();
    
    // Générer page.tsx
    await this.generateHomePage();
    
    // Générer les pages de quartiers
    for (const quartier of this.cityData.quartiers) {
      await this.generateQuartierPage(quartier);
    }
    
    // Générer les pages de destinations
    for (const destination of this.cityData.destinations) {
      await this.generateDestinationPage(destination);
    }
    
    // Générer la page principale de la ville
    await this.generateCityPage();
  }

  async generateGlobalsCSS() {
    const globalsCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

/* Styles personnalisés pour Moverz */
.bg-hero {
  background: linear-gradient(135deg, #04163a 0%, #2b7a78 50%, #04163a 100%);
  min-height: 100vh;
}

.halo {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(107, 207, 207, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.section {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.card-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.card-glass:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.bg-grid-white {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Responsive */
@media (max-width: 768px) {
  .section {
    padding: 2rem 0;
  }
  
  .container {
    padding: 0 0.5rem;
  }
  
  .card-glass {
    padding: 1rem;
  }
}`;

    await fs.writeFile(path.join(this.outputDir, 'src/app/globals.css'), globalsCSS);
  }

  async generateLayout() {
    const layoutContent = `import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Déménageurs ${this.cityData.city_name} (IA) - 5 devis sous 7 jours",
    template: "%s | Déménageurs ${this.cityData.city_name} (IA)",
  },
  description:
    "30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.",
  metadataBase: new URL("${this.cityData.domain}"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '${this.cityData.domain}',
    siteName: 'Déménageurs ${this.cityData.city_name} (IA)',
    title: 'Déménageurs ${this.cityData.city_name} (IA) - 5 devis sous 7 jours',
    description: '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.',
    images: [
      {
        url: '${this.cityData.domain}/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Déménageurs ${this.cityData.city_name} (IA) - Devis IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Déménageurs ${this.cityData.city_name} (IA) - 5 devis sous 7 jours',
    description: '30 minutes pour votre dossier → 5 devis personnalisés sous 7 jours. Estimation volumétrique à partir de photos, tarifs clairs, conseils locaux.',
    images: ['${this.cityData.domain}/og-image.jpg'],
  },
  alternates: {
    canonical: '${this.cityData.domain}',
  },
  verification: {
    google: '${this.cityData.googleVerification}',
  },
};

export const viewport: Viewport = {
  themeColor: '#04163a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}`;

    await fs.writeFile(path.join(this.outputDir, 'src/app/layout.tsx'), layoutContent);
  }

  async generateHomePage() {
    const homeContent = `import Hero from "@/components/Hero";
import ValueTriad from "@/components/ValueTriad";
import HowItWorks from "@/components/HowItWorks";
import ProofStrip from "@/components/ProofStrip";
import PhotoGuidelines from "@/components/PhotoGuidelines";
import PricingPreview from "@/components/PricingPreview";
import Testimonials from "@/components/Testimonials";
import NeighborhoodsTeaser from "@/components/NeighborhoodsTeaser";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  return (
    <main className="bg-hero">
      <div className="halo" />
      <Hero />
      <section className="section">
        <div className="container">
          <ValueTriad />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <HowItWorks />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <NeighborhoodsTeaser />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ProofStrip />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <PhotoGuidelines className="my-12 md:my-16" />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <PricingPreview />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Testimonials />
        </div>
      </section>
      <StickyCTA />
    </main>
  );
}`;

    await fs.writeFile(path.join(this.outputDir, 'src/app/page.tsx'), homeContent);
  }

  async generateQuartierPage(quartier) {
    // Créer le dossier du quartier
    await fs.ensureDir(path.join(this.outputDir, `src/app/${this.cityData.citySlug}/${quartier.slug}`));
    
    const quartierContent = `import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("${this.cityData.citySlug}/${quartier.slug}", "${quartier.nom}");

const ${quartier.slug.replace(/-/g, '')}Data = {
  zone: "${this.cityData.citySlug}/${quartier.slug}",
  zoneDisplay: "${quartier.nom}",
  description: "Service professionnel de déménagement dans le quartier ${quartier.nom}",
  coverImage: "https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80",
  stats: {
    dossiers: "${quartier.stats.dossiers}",
    demenageurs: "${quartier.stats.demenageurs}",
    delai: "${quartier.stats.delai}"
  },
  pourquoiMoverz: "${quartier.description}",
  accesStationnement: "${quartier.contraintes}",
  destinationsFrequentes: [
    {
      href: "/${this.cityData.citySlug}-vers-paris",
      title: "${quartier.nom} → Paris",
      description: "Flux régulier depuis ce quartier prisé, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Comment gérer le stationnement à ${quartier.nom} ?",
      answer: "Nos déménageurs connaissent les créneaux autorisés et les zones de déchargement temporaire. Ils optimisent les horaires et utilisent des véhicules adaptés aux rues historiques."
    }
  ]
};

export default function ${quartier.nom.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  return <LocalPage {...${quartier.slug.replace(/[^a-zA-Z0-9]/g, '')}Data} />;
}`;

    await fs.writeFile(
      path.join(this.outputDir, `src/app/${this.cityData.citySlug}/${quartier.slug}/page.tsx`),
      quartierContent
    );
  }

  async generateDestinationPage(destination) {
    // Créer le dossier de la destination
    await fs.ensureDir(path.join(this.outputDir, `src/app/${destination.slug}`));
    
    const destinationContent = `import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("${destination.nom}");

const ${destination.slug.replace(/-/g, '')}Data = {
  destination: "${destination.nom}",
  distance: "${destination.distance}",
  tempsMoyen: "${destination.duree}",
  periodeConseillee: "Mai-Sept",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "${destination.prix_moyen}",
      description: "Volume : 10-15 m³"
    }
  ],
  accesArrivee: "Contraintes spécifiques à ${destination.nom}",
  conseils: [
    "Anticipez les créneaux de livraison",
    "Prévoyez des protections renforcées",
    "Vérifiez les contraintes d'accès"
  ],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement ${this.cityData.city_name} → ${destination.nom} ?",
      answer: "Nos partenaires déménageurs peuvent généralement intervenir sous 7 jours."
    }
  ]
};

export default function ${destination.nom.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  return <CorridorPage {...${destination.slug.replace(/[^a-zA-Z0-9]/g, '')}Data} />;
}`;

    await fs.writeFile(
      path.join(this.outputDir, `src/app/${destination.slug}/page.tsx`),
      destinationContent
    );
  }

  async generateCityPage() {
    const cityContent = `import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("${this.cityData.citySlug}", "${this.cityData.city_name}");

const ${this.cityData.citySlug}Data = {
  zone: "${this.cityData.citySlug}",
  zoneDisplay: "${this.cityData.city_name}",
  description: "Service professionnel de déménagement dans le centre de ${this.cityData.city_name}",
  stats: {
    dossiers: "${this.cityData.stats.clients}",
    demenageurs: "${this.cityData.stats.demenageurs}",
    delai: "${this.cityData.stats.delai}"
  },
  pourquoiMoverz: "${this.cityData.city_name} se classe en tête des villes françaises où il fait bon vivre. Notre équipe d'experts déménageurs connaît parfaitement les spécificités de la ville.",
  accesStationnement: "${this.cityData.contraintes}",
  destinationsFrequentes: [
    {
      href: "/${this.cityData.citySlug}-vers-paris",
      title: "${this.cityData.city_name} → Paris",
      description: "Flux régulier, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement à ${this.cityData.city_name} ?",
      answer: "Nos partenaires déménageurs à ${this.cityData.city_name} peuvent généralement intervenir sous 7 jours."
    }
  ]
};

export default function ${this.cityData.city_name.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  return <LocalPage {...${this.cityData.citySlug}Data} />;
}`;

    await fs.writeFile(
      path.join(this.outputDir, `src/app/${this.cityData.citySlug}/page.tsx`),
      cityContent
    );
  }

  async generatePackageJson() {
    const packageJson = {
      "name": `demenageurs-${this.cityData.citySlug}`,
      "version": "0.1.0",
      "private": true,
      "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
      },
      "dependencies": {
        "clsx": "^2.1.1",
        "gray-matter": "^4.0.3",
        "lucide-react": "^0.453.0",
        "next": "^14.2.6",
        "next-seo": "^6.5.0",
        "next-sitemap": "^4.2.3",
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "tailwind-merge": "^2.5.2",
        "zod": "^4.1.11"
      },
      "devDependencies": {
        "@tailwindcss/postcss": "^4.0.1",
        "@types/node": "20.19.18",
        "@types/react": "19.1.13",
        "autoprefixer": "^10.4.20",
        "postcss": "^8.4.47",
        "tailwindcss": "^3.4.10",
        "typescript": "5.9.2",
        "eslint": "^8.57.0",
        "eslint-config-next": "^14.2.6"
      }
    };

    await fs.writeFile(
      path.join(this.outputDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
  }

  async generateNextConfig() {
    const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
};

module.exports = nextConfig;`;

    await fs.writeFile(
      path.join(this.outputDir, 'next.config.js'),
      nextConfig
    );
  }

  async generatePostCSSConfig() {
    const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;

    await fs.writeFile(
      path.join(this.outputDir, 'postcss.config.js'),
      postcssConfig
    );
  }

  async generateTailwindConfig() {
    const tailwindConfig = `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;`;

    await fs.writeFile(
      path.join(this.outputDir, 'tailwind.config.ts'),
      tailwindConfig
    );
  }

  async generateMetadata() {
    // Générer le fichier de données de la ville
    await fs.writeFile(
      path.join(this.outputDir, 'data', `${this.cityData.citySlug}.json`),
      JSON.stringify(this.cityData, null, 2)
    );
  }

  async generateSitemap() {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${this.cityData.domain}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${this.cityData.domain}/comment-ca-marche</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${this.cityData.domain}/faq</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${this.cityData.domain}/partenaires</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

    await fs.writeFile(
      path.join(this.outputDir, 'public', 'sitemap.xml'),
      sitemap
    );
  }

  async generateRobots() {
    const robots = `User-agent: *
Allow: /

Sitemap: ${this.cityData.domain}/sitemap.xml

# Interdictions spécifiques
Disallow: /admin/
Disallow: /api/
Disallow: /_next/

# Priorités par ville
Crawl-delay: 1`;

    await fs.writeFile(
      path.join(this.outputDir, 'public', 'robots.txt'),
      robots
    );
  }

  async installDependencies() {
    console.log(chalk.blue('📦 Installation des dépendances...'));
    
    try {
      execSync('npm install', { 
        cwd: this.outputDir, 
        stdio: 'inherit' 
      });
    } catch (error) {
      console.warn(chalk.yellow('⚠️ Erreur lors de l\'installation des dépendances, mais le site est généré'));
    }
  }
}

// ============================================================================
// EXÉCUTION
// ============================================================================

async function main() {
  const citySlug = process.argv[2];
  
  if (!citySlug) {
    console.error(chalk.red('❌ Usage: node generate-site-simple.js <city-slug>'));
    console.error(chalk.yellow('📝 Exemple: node generate-site-simple.js toulouse'));
    process.exit(1);
  }

  // Charger les données de la ville
  const cityDataPath = path.join(process.cwd(), 'data', `${citySlug}.json`);
  
  if (!await fs.pathExists(cityDataPath)) {
    console.error(chalk.red(`❌ Fichier de données non trouvé: ${cityDataPath}`));
    console.error(chalk.yellow('📝 Créez d\'abord le fichier de données avec des données RÉELLES'));
    process.exit(1);
  }

  const cityData = await fs.readJson(cityDataPath);
  
  const generator = new SiteGenerator(cityData);
  await generator.generate();
}

main().catch(console.error);
