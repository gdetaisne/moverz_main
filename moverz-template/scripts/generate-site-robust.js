#!/usr/bin/env node

/**
 * Script de génération robuste avec validation intégrée
 * Génère un site complet avec tests automatiques
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

class SiteGenerator {
  constructor(citySlug, cityData) {
    this.citySlug = citySlug;
    this.cityData = cityData;
    this.templateDir = path.join(__dirname, '..');
    this.outputDir = path.join(__dirname, '../../sites', citySlug);
    this.testResults = [];
  }

  async generate() {
    console.log(chalk.blue(`🚀 Génération du site pour ${this.cityData.city_name || this.cityData.city}...`));
    
    try {
      // 1. Validation pré-génération
      await this.validateTemplate();
      
      // 2. Création de la structure
      await this.createSiteStructure();
      
      // 3. Copie des fichiers avec remplacement des variables
      await this.copyAndProcessFiles();
      
      // 4. Génération des fichiers spécifiques
      await this.generateSpecificFiles();
      
      // 5. Configuration pour CapRover
      await this.configureForCapRover();
      
      // 6. Validation post-génération
      await this.validateGeneratedSite();
      
      // 7. Installation des dépendances
      await this.installDependencies();
      
      // 8. Test de build final
      await this.testBuild();
      
      console.log(chalk.green(`✅ Site généré avec succès pour ${this.cityData.city_name || this.cityData.city}!`));
      this.printSummary();
      
    } catch (error) {
      console.error(chalk.red(`❌ Erreur lors de la génération: ${error.message}`));
      throw error;
    }
  }

  async validateTemplate() {
    console.log(chalk.yellow('🔍 Validation du template...'));
    
    const requiredFiles = [
      'src/components/Header.tsx',
      'src/components/Footer.tsx',
      'src/components/HeaderTemplate.tsx',
      'src/app/_templates/LocalPage.tsx',
      'src/app/_templates/CorridorPage.tsx',
      'public/favicon.ico',
      'public/manifest.json',
      'src/app/globals.css',
      'postcss.config.js',
      'tailwind.config.ts',
      'next.config.js',
      'package.json',
      'tsconfig.json'
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(this.templateDir, file);
      if (!await fs.pathExists(filePath)) {
        throw new Error(`Fichier manquant dans le template: ${file}`);
      }
    }
    
    console.log(chalk.green('✅ Template validé'));
  }

  async createSiteStructure() {
    console.log(chalk.yellow('📁 Création de la structure du site...'));
    
    // Supprimer le dossier existant s'il y en a un
    if (await fs.pathExists(this.outputDir)) {
      await fs.remove(this.outputDir);
    }
    
    await fs.ensureDir(this.outputDir);
    console.log(chalk.green('✅ Structure créée'));
  }

  async copyAndProcessFiles() {
    console.log(chalk.yellow('📋 Copie et traitement des fichiers...'));
    
    // Copier tous les fichiers du template
    await fs.copy(this.templateDir, this.outputDir, {
      filter: (src) => {
        // Exclure node_modules et .next
        return !src.includes('node_modules') && !src.includes('.next');
      }
    });
    
    // Traiter les fichiers avec variables
    await this.processTemplateFiles();
    
    console.log(chalk.green('✅ Fichiers copiés et traités'));
  }

  async processTemplateFiles() {
    const filesToProcess = [
      'src/app/page.tsx',
      'src/components/HeaderTemplate.tsx',
      'src/app/_templates/LocalPage.tsx',
      'src/app/_templates/CorridorPage.tsx',
      'public/manifest.json',
      'package.json'
    ];

    for (const file of filesToProcess) {
      const filePath = path.join(this.outputDir, file);
      if (await fs.pathExists(filePath)) {
        let content = await fs.readFile(filePath, 'utf8');
        
        // Remplacer les variables
        content = this.replaceVariables(content);
        
        await fs.writeFile(filePath, content);
      }
    }
  }

  replaceVariables(content) {
    // Remplacer les variables Handlebars par les vraies valeurs
    const replacements = {
      '{{city_name}}': this.cityData.city_name || this.cityData.city,
      '{{city}}': this.cityData.city,
      '{{domain}}': this.cityData.domain,
      '{{region}}': this.cityData.region || 'France',
      '{{stats.clients}}': this.cityData.stats?.clients || '1000+',
      '{{stats.demenageurs}}': this.cityData.stats?.demenageurs || '16+',
      '{{stats.devis}}': this.cityData.stats?.devis || '5'
    };

    let processedContent = content;
    for (const [variable, value] of Object.entries(replacements)) {
      processedContent = processedContent.replace(new RegExp(variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
    }

    return processedContent;
  }

  async generateSpecificFiles() {
    console.log(chalk.yellow('📝 Génération des fichiers spécifiques...'));
    
    // Générer le page.tsx spécifique à la ville
    await this.generateMainPage();
    
    // Générer les pages de quartiers
    await this.generateQuartierPages();
    
    // Générer les pages de destinations
    await this.generateDestinationPages();
    
    console.log(chalk.green('✅ Fichiers spécifiques générés'));
  }

  async generateMainPage() {
    const pageContent = `import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("${this.citySlug}", "${this.cityData.city_name || this.cityData.city}");

const ${this.citySlug}Data = {
  zone: "${this.citySlug}",
  zoneDisplay: "${this.cityData.city_name || this.cityData.city}",
  description: "Service professionnel de déménagement dans le centre de ${this.cityData.city_name || this.cityData.city}",
  coverImage: "${this.cityData.coverImage || 'https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80'}",
  stats: {
    dossiers: "${this.cityData.stats?.dossiers || '1000+'}",
    demenageurs: "${this.cityData.stats?.demenageurs || '16+'}",
    delai: "${this.cityData.stats?.delai || '7 jours'}"
  },
  pourquoiMoverz: "${this.cityData.pourquoiMoverz || 'Notre équipe d\'experts déménageurs connaît parfaitement les spécificités de la ville.'}",
  accesStationnement: "Contraintes spécifiques à ${this.cityData.city_name || this.cityData.city}",
  destinationsFrequentes: ${JSON.stringify(this.cityData.destinationsFrequentes || [])},
  partenaires: [],
  faq: ${JSON.stringify(this.cityData.faq || [])}
};

export default function ${this.citySlug.charAt(0).toUpperCase() + this.citySlug.slice(1)}Page() {
  return <LocalPage {...${this.citySlug}Data} />;
}`;

    await fs.writeFile(path.join(this.outputDir, 'src/app/page.tsx'), pageContent);
  }

  async generateQuartierPages() {
    if (!this.cityData.quartiers) return;
    
    for (const quartier of this.cityData.quartiers) {
      const quartierDir = path.join(this.outputDir, 'src/app', this.citySlug, quartier.slug);
      await fs.ensureDir(quartierDir);
      
      const pageContent = `import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("${this.citySlug}/${quartier.slug}", "${quartier.name}");

const ${quartier.slug.replace(/-/g, '')}Data = {
  zone: "${this.citySlug}/${quartier.slug}",
  zoneDisplay: "${quartier.name}",
  description: "Service professionnel de déménagement dans le quartier ${quartier.name}",
  coverImage: "${quartier.coverImage || 'https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80'}",
  stats: {
    dossiers: "${this.cityData.stats?.dossiers || '1000+'}",
    demenageurs: "${this.cityData.stats?.demenageurs || '16+'}",
    delai: "${this.cityData.stats?.delai || '7 jours'}"
  },
  pourquoiMoverz: "${quartier.description || 'Notre équipe d\'experts déménageurs connaît parfaitement ce quartier.'}",
  accesStationnement: "Contraintes spécifiques à ${quartier.name}",
  destinationsFrequentes: ${JSON.stringify(this.cityData.destinationsFrequentes || [])},
  partenaires: [],
  faq: ${JSON.stringify(this.cityData.faq || [])}
};

export default function ${quartier.slug.replace(/-/g, '').charAt(0).toUpperCase() + quartier.slug.replace(/-/g, '').slice(1)}Page() {
  return <LocalPage {...${quartier.slug.replace(/-/g, '')}Data} />;
}`;

      await fs.writeFile(path.join(quartierDir, 'page.tsx'), pageContent);
    }
  }

  async generateDestinationPages() {
    if (!this.cityData.destinations) return;
    
    for (const destination of this.cityData.destinations) {
      const destDir = path.join(this.outputDir, 'src/app', `${this.citySlug}-vers-${destination.slug}`);
      await fs.ensureDir(destDir);
      
      const pageContent = `import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("${destination.name}");

const ${this.citySlug}Vers${destination.slug.charAt(0).toUpperCase() + destination.slug.slice(1)}Data = {
  destination: "${destination.name}",
  distance: "${destination.distance}",
  tempsMoyen: "${destination.tempsMoyen}",
  periodeConseillee: "${destination.periodeConseillee}",
  prixIndicatifs: ${JSON.stringify(destination.prixIndicatifs || [])},
  accesArrivee: "Contraintes spécifiques à ${destination.name}",
  conseils: ${JSON.stringify(destination.conseils || [])},
  faq: ${JSON.stringify(destination.faq || [])}
};

export default function ${destination.name}Page() {
  return <CorridorPage {...${this.citySlug}Vers${destination.slug.charAt(0).toUpperCase() + destination.slug.slice(1)}Data} />;
}`;

      await fs.writeFile(path.join(destDir, 'page.tsx'), pageContent);
    }
  }

  async configureForCapRover() {
    console.log(chalk.yellow('⚙️ Configuration pour CapRover...'));
    
    // Créer le captain-definition
    const captainDefinition = {
      "schemaVersion": 2,
      "dockerfilePath": "./Dockerfile"
    };
    
    await fs.writeFile(
      path.join(this.outputDir, 'captain-definition'), 
      JSON.stringify(captainDefinition, null, 2)
    );
    
    // Créer le Dockerfile
    const dockerfile = `# Next.js production build for CapRover - ${this.citySlug}
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
FROM base AS deps
RUN npm ci

# Build application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production runtime
FROM node:18-alpine AS runner
RUN apk add --no-cache dumb-init &&     addgroup --system --gid 1001 nodejs &&     adduser --system --uid 1001 nextjs

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]`;

    await fs.writeFile(path.join(this.outputDir, 'Dockerfile'), dockerfile);
    
    console.log(chalk.green('✅ Configuration CapRover créée'));
  }

  async validateGeneratedSite() {
    console.log(chalk.yellow('🧪 Validation du site généré...'));
    
    // Vérifier que les variables Handlebars sont résolues
    const filesToCheck = [
      'src/app/page.tsx',
      'src/components/HeaderTemplate.tsx'
    ];
    
    for (const file of filesToCheck) {
      const filePath = path.join(this.outputDir, file);
      if (await fs.pathExists(filePath)) {
        const content = await fs.readFile(filePath, 'utf8');
        if (content.includes('{{') || content.includes('}}}')) {
          throw new Error(`Variables Handlebars non résolues dans ${file}`);
        }
      }
    }
    
    console.log(chalk.green('✅ Site validé'));
  }

  async installDependencies() {
    console.log(chalk.yellow('📦 Installation des dépendances...'));
    
    try {
      execSync('npm install', { 
        cwd: this.outputDir, 
        stdio: 'pipe',
        timeout: 120000 // 2 minutes
      });
      console.log(chalk.green('✅ Dépendances installées'));
    } catch (error) {
      console.log(chalk.yellow('⚠️ Installation des dépendances échouée, mais on continue'));
    }
  }

  async testBuild() {
    console.log(chalk.yellow('🧪 Test de build...'));
    
    try {
      execSync('npm run build', { 
        cwd: this.outputDir, 
        stdio: 'pipe',
        timeout: 180000 // 3 minutes
      });
      console.log(chalk.green('✅ Build réussi'));
    } catch (error) {
      throw new Error(`Build échoué: ${error.message}`);
    }
  }

  printSummary() {
    console.log(chalk.blue('\n📊 RÉSUMÉ DE LA GÉNÉRATION'));
    console.log(chalk.blue('========================'));
    console.log(chalk.white(`🏙️  Ville: ${this.cityData.city_name || this.cityData.city}`));
    console.log(chalk.white(`📁 Dossier: ${this.outputDir}`));
    console.log(chalk.white(`🌐 URL: ${this.cityData.domain}`));
    console.log(chalk.white(`📋 Pages générées:`));
    console.log(chalk.white(`   - Page principale: /`));
    if (this.cityData.quartiers) {
      console.log(chalk.white(`   - Quartiers: ${this.cityData.quartiers.length}`));
    }
    if (this.cityData.destinations) {
      console.log(chalk.white(`   - Destinations: ${this.cityData.destinations.length}`));
    }
    console.log(chalk.green('\n✅ Site prêt pour le déploiement !'));
  }
}

// Fonction principale
async function main() {
  const citySlug = process.argv[2];
  
  if (!citySlug) {
    console.error(chalk.red('Usage: node generate-site-robust.js <city-slug>'));
    console.error(chalk.red('Exemple: node generate-site-robust.js lille'));
    process.exit(1);
  }
  
  // Charger les données de la ville
  const dataPath = path.join(__dirname, '../data', `${citySlug}.json`);
  
  if (!await fs.pathExists(dataPath)) {
    console.error(chalk.red(`Fichier de données non trouvé: ${dataPath}`));
    process.exit(1);
  }
  
  const cityData = await fs.readJson(dataPath);
  const generator = new SiteGenerator(citySlug, cityData);
  
  await generator.generate();
}

// Exécution
if (require.main === module) {
  main().catch(error => {
    console.error(chalk.red(`❌ Erreur: ${error.message}`));
    process.exit(1);
  });
}

module.exports = SiteGenerator;
