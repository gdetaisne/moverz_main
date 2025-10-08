#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import Handlebars from 'handlebars';
import chalk from 'chalk';
import { execSync } from 'child_process';

// ============================================================================
// GÉNÉRATEUR DE SITE MULTI-VILLES
// ============================================================================

// Register Handlebars helpers
Handlebars.registerHelper('times', function (n, block) {
  let accum = '';
  for (let i = 0; i < n; ++i) {
    accum += block.fn(i);
  }
  return accum;
});

Handlebars.registerHelper('gte', function (a, b, options) {
  if (a >= b) {
    return options.fn(this);
  }
  return options.inverse(this);
});

// Helper pour générer des clés uniques
Handlebars.registerHelper('uniqueKey', function (prefix, context) {
  const cityName = context.data.root.city_name || 'default';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}-${cityName}-${timestamp}-${random}`;
});

// Helper pour générer des IDs uniques par ville
Handlebars.registerHelper('cityId', function (baseId) {
  const cityName = this.city_name || 'default';
  return `${baseId}-${cityName}`;
});

class SiteGenerator {
  constructor(cityData) {
    this.cityData = cityData;
    this.templateDir = process.cwd();
    this.outputDir = path.join(process.cwd(), '..', 'sites', cityData.citySlug);
  }

  async generate() {
    const cityName = this.cityData.city_name || this.cityData.city || 'Unknown';
    console.log(chalk.blue(`🚀 Génération du site pour ${cityName}...`));
    
    try {
      // 1. Créer la structure du site
      await this.createSiteStructure();
      
      // 2. Copier le fichier de données (AVANT les autres fichiers qui en dépendent)
      await this.copyDataFile();
      
      // 3. Copier les fichiers statiques
      await this.copyStaticFiles();
      
      // 4. Générer les fichiers avec variables
      await this.generateVariableFiles();
      
      // 5. Générer le package.json
      await this.generatePackageJson();
      
      // 6. Générer la configuration Next.js
      await this.generateNextConfig();
      
      // 7. Générer les métadonnées
      await this.generateMetadata();
      
      // 8. Générer le sitemap
      await this.generateSitemap();
      
      // 9. Générer robots.txt
      await this.generateRobots();
      
      // 10. Installer les dépendances
      await this.installDependencies();
      
      console.log(chalk.green(`✅ Site généré avec succès pour ${cityName}!`));
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
      'scripts'
    ];

    for (const dir of dirs) {
      await fs.ensureDir(path.join(this.outputDir, dir));
    }
  }

  async copyStaticFiles() {
    console.log(chalk.blue('📋 Copie des fichiers statiques...'));
    
    // Copier les composants (mais Footer et Header seront générés avec variables)
    const components = await fs.readdir(path.join(this.templateDir, 'src/components'));
    for (const component of components) {
      const componentPath = `src/components/${component}`;
      if (component === 'Footer.tsx' || component === 'Header.tsx') {
        // Générer avec variables Handlebars
        await this.generateFile(componentPath, componentPath);
      } else {
        // Copier directement
        await fs.copy(
          path.join(this.templateDir, componentPath),
          path.join(this.outputDir, componentPath)
        );
      }
    }
    
    // Copier les libs
    await fs.copy(
      path.join(this.templateDir, 'src/lib'),
      path.join(this.outputDir, 'src/lib')
    );
    
    // Copier les templates
    await fs.copy(
      path.join(this.templateDir, 'src/app/_templates'),
      path.join(this.outputDir, 'src/app/_templates')
    );
    
    // Copier les images
    await fs.copy(
      path.join(this.templateDir, 'public/images'),
      path.join(this.outputDir, 'public/images')
    );
    
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
    
    // Générer layout.tsx
    await this.generateFile('src/app/layout.tsx', 'src/app/layout.tsx');
    
    // Générer page.tsx
    await this.generateFile('src/app/page.tsx', 'src/app/page.tsx');
    
    // Générer les pages statiques
    const staticPages = [
      'comment-ca-marche/page.tsx',
      'faq/page.tsx',
      'partenaires/page.tsx',
      'inventaire-ia/page.tsx',
      'estimation-rapide/page.tsx',
      'contact/page.tsx',
      'services/page.tsx',
      'notre-offre/page.tsx',
      'blog/page.tsx',
      'blog/[category]/page.tsx',
      'blog/[category]/[slug]/page.tsx'
    ];
    
    for (const page of staticPages) {
      await this.generateFile(`src/app/${page}`, `src/app/${page}`);
    }
    
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

  async generateFile(templatePath, outputPath) {
    let content = await fs.readFile(path.join(this.templateDir, templatePath), 'utf8');
    
    // Remplacement simple par regex (pas de Handlebars.compile pour éviter les conflits JSX)
    // On remplace uniquement {{variableName}} par la valeur correspondante
    content = content.replace(/\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g, (match, varName) => {
      if (this.cityData.hasOwnProperty(varName)) {
        return this.cityData[varName];
      }
      return match; // Garder tel quel si pas de correspondance
    });
    
    await fs.writeFile(path.join(this.outputDir, outputPath), content);
  }

  async generateQuartierPage(quartier) {
    const template = `import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("${this.cityData.citySlug}/${quartier.slug}", "${quartier.nom}");

const ${quartier.slug}Data = {
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

export default function ${quartier.nom}Page() {
  return <LocalPage {...${quartier.slug}Data} />;
}`;

    const quartierDir = path.join(this.outputDir, `src/app/${this.cityData.citySlug}/${quartier.slug}`);
    await fs.ensureDir(quartierDir);
    await fs.writeFile(path.join(quartierDir, 'page.tsx'), template);
  }

  async generateDestinationPage(destination) {
    const template = `import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("${destination.nom}");

const ${destination.slug}Data = {
  destination: "${destination.nom}",
  distance: "${destination.distance}",
  tempsMoyen: "${destination.duree}",
  periodeConseillee: "Mai-Sept",
  prixIndicatifs: [
    {
      type: "Studio/T1",
      prix: "800-1200€",
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
      question: "Quels sont les délais pour un déménagement ${this.cityData.city} → ${destination.nom} ?",
      answer: "Nos partenaires déménageurs peuvent généralement intervenir sous 7 jours."
    }
  ]
};

export default function ${destination.nom}Page() {
  return <CorridorPage {...${destination.slug}Data} />;
}`;

    const destDir = path.join(this.outputDir, `src/app/${destination.slug}`);
    await fs.ensureDir(destDir);
    await fs.writeFile(path.join(destDir, 'page.tsx'), template);
  }

  async generateCityPage() {
    const template = `import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("${this.cityData.citySlug}", "${this.cityData.city}");

const ${this.cityData.citySlug}Data = {
  zone: "${this.cityData.citySlug}",
  zoneDisplay: "${this.cityData.city}",
  description: "Service professionnel de déménagement dans le centre de ${this.cityData.city}",
  stats: {
    dossiers: "${this.cityData.stats.clients}",
    demenageurs: "${this.cityData.stats.demenageurs}",
    delai: "${this.cityData.stats.delai}"
  },
  pourquoiMoverz: "${this.cityData.city} se classe en tête des villes françaises où il fait bon vivre. Notre équipe d'experts déménageurs connaît parfaitement les spécificités de la ville.",
  accesStationnement: "Contraintes spécifiques à ${this.cityData.city}",
  destinationsFrequentes: [
    {
      href: "/${this.cityData.citySlug}-vers-paris",
      title: "${this.cityData.city} → Paris",
      description: "Flux régulier, accès livraison à anticiper."
    }
  ],
  partenaires: [],
  faq: [
    {
      question: "Quels sont les délais pour un déménagement à ${this.cityData.city} ?",
      answer: "Nos partenaires déménageurs à ${this.cityData.city} peuvent généralement intervenir sous 7 jours."
    }
  ]
};

export default function ${this.cityData.city}Page() {
  return <LocalPage {...${this.cityData.citySlug}Data} />;
}`;

    const cityDir = path.join(this.outputDir, `src/app/${this.cityData.citySlug}`);
    await fs.ensureDir(cityDir);
    await fs.writeFile(path.join(cityDir, 'page.tsx'), template);
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
        "@types/node": "20.19.18",
        "@types/react": "19.1.13",
        "autoprefixer": "^10.4.20",
        "postcss": "^8.4.47",
        "tailwindcss": "^3.4.10",
        "typescript": "5.9.2"
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

export default nextConfig;`;

    await fs.writeFile(
      path.join(this.outputDir, 'next.config.ts'),
      nextConfig
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

  async copyDataFile() {
    console.log(chalk.blue('📄 Copie du fichier de données...'));
    
    const dataDir = path.join(this.outputDir, 'data');
    await fs.ensureDir(dataDir);
    await fs.writeJson(
      path.join(dataDir, `${this.cityData.citySlug}.json`),
      this.cityData,
      { spaces: 2 }
    );
  }

  async installDependencies() {
    console.log(chalk.blue('📦 Installation des dépendances...'));
    console.log(chalk.yellow('⏭️  Skipping npm install for faster generation (run manually later)'));
    
    // Skip pour le moment - l'utilisateur peut lancer npm install manuellement
    // try {
    //   execSync('npm install', { 
    //     cwd: this.outputDir, 
    //     stdio: 'inherit' 
    //   });
    // } catch (error) {
    //   console.warn(chalk.yellow('⚠️ Erreur lors de l\'installation des dépendances, mais le site est généré'));
    // }
  }
}

// ============================================================================
// EXÉCUTION
// ============================================================================

async function main() {
  const citySlug = process.argv[2];
  
  if (!citySlug) {
    console.error(chalk.red('❌ Usage: node generate-site.js <city-slug>'));
    console.error(chalk.yellow('📝 Exemple: node generate-site.js toulouse'));
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
