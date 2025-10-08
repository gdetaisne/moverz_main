#!/usr/bin/env node

/**
 * Script de génération robuste avec validation intégrée - VERSION CORRIGÉE
 */

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');

// Fonctions utilitaires pour nettoyer les noms de variables
function cleanVariableName(name) {
  return name
    .replace(/[^a-zA-Z0-9]/g, '') // Supprimer tous les caractères non alphanumériques
    .replace(/^[0-9]/, 'var$&'); // Si commence par un chiffre, ajouter 'var'
}

function cleanFunctionName(name) {
  return name
    .split(/[^a-zA-Z0-9]/)
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
    .replace(/^[0-9]/, 'Func$&'); // Si commence par un chiffre, ajouter 'Func'
}

class SiteGenerator {
  constructor(citySlug, cityData) {
    this.citySlug = citySlug;
    this.cityData = cityData;
    this.templateDir = path.join(__dirname, '..');
    this.outputDir = path.join(__dirname, '../../sites', citySlug);
  }

  async generate() {
    console.log(chalk.blue(`\n🚀 GÉNÉRATION DU SITE ${this.cityData.city_name || this.cityData.city}`));
    console.log(chalk.blue('='.repeat(60)));
    
    try {
      await this.validateTemplate();
      await this.createSiteStructure();
      await this.copyAndProcessFiles();
      await this.generateSpecificFiles();
      await this.configureForCapRover();
      await this.validateGeneratedSite();
      await this.installDependencies();
      await this.testBuild();
      
      console.log(chalk.green(`\n✅ Site généré avec succès !`));
      this.printSummary();
      
    } catch (error) {
      console.error(chalk.red(`\n❌ Erreur: ${error.message}`));
      throw error;
    }
  }

  async validateTemplate() {
    console.log(chalk.yellow('\n🔍 Validation du template...'));
    
    const requiredFiles = [
      'src/components/Header.tsx',
      'src/components/Footer.tsx',
      'src/app/_templates/LocalPage.tsx',
      'src/app/_templates/CorridorPage.tsx',
      'src/app/globals.css',
      'postcss.config.js',
      'tailwind.config.ts',
      'next.config.js',
      'package.json'
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(this.templateDir, file);
      if (!await fs.pathExists(filePath)) {
        throw new Error(`Fichier manquant: ${file}`);
      }
    }
    
    console.log(chalk.green('✅ Template validé'));
  }

  async createSiteStructure() {
    console.log(chalk.yellow('\n📁 Création de la structure...'));
    
    if (await fs.pathExists(this.outputDir)) {
      await fs.remove(this.outputDir);
    }
    
    await fs.ensureDir(this.outputDir);
    console.log(chalk.green('✅ Structure créée'));
  }

  async copyAndProcessFiles() {
    console.log(chalk.yellow('\n📋 Copie des fichiers...'));
    
    await fs.copy(this.templateDir, this.outputDir, {
      filter: (src) => !src.includes('node_modules') && !src.includes('.next') && !src.includes('scripts')
    });
    
    await this.processTemplateFiles();
    console.log(chalk.green('✅ Fichiers copiés'));
  }

  async processTemplateFiles() {
    const filesToProcess = [
      'src/components/HeaderTemplate.tsx',
      'public/manifest.json',
      'package.json'
    ];

    for (const file of filesToProcess) {
      const filePath = path.join(this.outputDir, file);
      if (await fs.pathExists(filePath)) {
        let content = await fs.readFile(filePath, 'utf8');
        content = this.replaceVariables(content);
        await fs.writeFile(filePath, content);
      }
    }
  }

  replaceVariables(content) {
    const replacements = {
      '{{city_name}}': this.cityData.city_name || this.cityData.city,
      '{{city}}': this.cityData.city,
      '{{domain}}': this.cityData.domain,
      '{{region}}': this.cityData.region || 'France'
    };

    let result = content;
    for (const [variable, value] of Object.entries(replacements)) {
      result = result.replace(new RegExp(variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
    }
    return result;
  }

  async generateSpecificFiles() {
    console.log(chalk.yellow('\n📝 Génération des pages...'));
    
    await this.generateMainPage();
    
    if (this.cityData.quartiers) {
      await this.generateQuartierPages();
    }
    
    if (this.cityData.destinations) {
      await this.generateDestinationPages();
    }
    
    console.log(chalk.green('✅ Pages générées'));
  }

  async generateMainPage() {
    const varName = cleanVariableName(this.citySlug);
    const funcName = cleanFunctionName(this.citySlug);
    
    const pageContent = `import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("${this.citySlug}", "${this.cityData.city_name || this.cityData.city}");

const ${varName}Data = {
  zone: "${this.citySlug}",
  zoneDisplay: "${this.cityData.city_name || this.cityData.city}",
  description: "Service professionnel de déménagement à ${this.cityData.city_name || this.cityData.city}",
  coverImage: "${this.cityData.coverImage || 'https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80'}",
  stats: {
    dossiers: "${this.cityData.stats?.dossiers || '1000+'}",
    demenageurs: "${this.cityData.stats?.demenageurs || '16+'}",
    delai: "${this.cityData.stats?.delai || '7 jours'}"
  },
  pourquoiMoverz: "${(this.cityData.pourquoiMoverz || 'Notre équipe connaît parfaitement la ville.').replace(/"/g, '\\"')}",
  accesStationnement: "Contraintes à ${this.cityData.city_name || this.cityData.city}",
  destinationsFrequentes: ${JSON.stringify(this.cityData.destinationsFrequentes || [])},
  partenaires: [],
  faq: ${JSON.stringify(this.cityData.faq || [])}
};

export default function ${funcName}Page() {
  return <LocalPage {...${varName}Data} />;
}`;

    await fs.writeFile(path.join(this.outputDir, 'src/app/page.tsx'), pageContent);
  }

  async generateQuartierPages() {
    for (const quartier of this.cityData.quartiers) {
      const quartierDir = path.join(this.outputDir, 'src/app', this.citySlug, quartier.slug);
      await fs.ensureDir(quartierDir);
      
      const varName = cleanVariableName(quartier.slug);
      const funcName = cleanFunctionName(quartier.slug);
      
      const pageContent = `import { generateLocalPageMetadata } from "@/app/_templates/LocalPage";
import LocalPage from "@/app/_templates/LocalPage";

export const metadata = generateLocalPageMetadata("${this.citySlug}/${quartier.slug}", "${quartier.name}");

const ${varName}Data = {
  zone: "${this.citySlug}/${quartier.slug}",
  zoneDisplay: "${quartier.name}",
  description: "Déménagement ${quartier.name}",
  coverImage: "${quartier.coverImage || 'https://images.unsplash.com/photo-1509021436665-8f127686dfbc?w=1600&h=900&fit=crop&q=80'}",
  stats: {
    dossiers: "${this.cityData.stats?.dossiers || '1000+'}",
    demenageurs: "${this.cityData.stats?.demenageurs || '16+'}",
    delai: "${this.cityData.stats?.delai || '7 jours'}"
  },
  pourquoiMoverz: "${(quartier.description || 'Nous connaissons ce quartier.').replace(/"/g, '\\"')}",
  accesStationnement: "Contraintes ${quartier.name}",
  destinationsFrequentes: ${JSON.stringify(this.cityData.destinationsFrequentes || [])},
  partenaires: [],
  faq: ${JSON.stringify(this.cityData.faq || [])}
};

export default function ${funcName}Page() {
  return <LocalPage {...${varName}Data} />;
}`;

      await fs.writeFile(path.join(quartierDir, 'page.tsx'), pageContent);
    }
  }

  async generateDestinationPages() {
    for (const destination of this.cityData.destinations) {
      const destDir = path.join(this.outputDir, 'src/app', `${this.citySlug}-vers-${destination.slug}`);
      await fs.ensureDir(destDir);
      
      const varName = cleanVariableName(`${this.citySlug}Vers${destination.slug}`);
      const funcName = cleanFunctionName(destination.name || destination.slug);
      
      const pageContent = `import { generateCorridorPageMetadata } from "@/app/_templates/CorridorPage";
import CorridorPage from "@/app/_templates/CorridorPage";

export const metadata = generateCorridorPageMetadata("${destination.name || destination.slug}");

const ${varName}Data = {
  destination: "${destination.name || destination.slug}",
  distance: "${destination.distance || 'N/A'}",
  tempsMoyen: "${destination.tempsMoyen || 'N/A'}",
  periodeConseillee: "${destination.periodeConseillee || 'Toute l\'année'}",
  prixIndicatifs: ${JSON.stringify(destination.prixIndicatifs || [])},
  accesArrivee: "Contraintes à ${destination.name || destination.slug}",
  conseils: ${JSON.stringify(destination.conseils || [])},
  faq: ${JSON.stringify(destination.faq || [])}
};

export default function ${funcName}Page() {
  return <CorridorPage {...${varName}Data} />;
}`;

      await fs.writeFile(path.join(destDir, 'page.tsx'), pageContent);
    }
  }

  async configureForCapRover() {
    console.log(chalk.yellow('\n⚙️  Configuration CapRover...'));
    
    const captainDefinition = {
      "schemaVersion": 2,
      "dockerfilePath": "./Dockerfile"
    };
    
    await fs.writeFile(
      path.join(this.outputDir, 'captain-definition'), 
      JSON.stringify(captainDefinition, null, 2)
    );
    
    const dockerfile = `FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./

FROM base AS deps
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:18-alpine AS runner
RUN apk add --no-cache dumb-init && \\
    addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]`;

    await fs.writeFile(path.join(this.outputDir, 'Dockerfile'), dockerfile);
    
    console.log(chalk.green('✅ CapRover configuré'));
  }

  async validateGeneratedSite() {
    console.log(chalk.yellow('\n🧪 Validation du site...'));
    
    const mainPage = path.join(this.outputDir, 'src/app/page.tsx');
    if (await fs.pathExists(mainPage)) {
      const content = await fs.readFile(mainPage, 'utf8');
      if (content.includes('{{') || content.includes('}}}')) {
        throw new Error('Variables non résolues dans page.tsx');
      }
    }
    
    console.log(chalk.green('✅ Site validé'));
  }

  async installDependencies() {
    console.log(chalk.yellow('\n📦 Installation des dépendances...'));
    
    try {
      execSync('npm install', { 
        cwd: this.outputDir, 
        stdio: 'pipe',
        timeout: 120000
      });
      console.log(chalk.green('✅ Dépendances installées'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  Installation partielle'));
    }
  }

  async testBuild() {
    console.log(chalk.yellow('\n🧪 Test de build...'));
    
    try {
      execSync('npm run build', { 
        cwd: this.outputDir, 
        stdio: 'pipe',
        timeout: 180000
      });
      console.log(chalk.green('✅ Build réussi'));
    } catch (error) {
      throw new Error(`Build échoué: ${error.stderr ? error.stderr.toString() : error.message}`);
    }
  }

  printSummary() {
    console.log(chalk.blue('\n' + '='.repeat(60)));
    console.log(chalk.green('📊 RÉSUMÉ'));
    console.log(chalk.blue('='.repeat(60)));
    console.log(chalk.white(`🏙️  Ville: ${this.cityData.city_name || this.cityData.city}`));
    console.log(chalk.white(`📁 Dossier: ${this.outputDir}`));
    console.log(chalk.white(`🌐 Domaine: ${this.cityData.domain}`));
    
    let pageCount = 1; // page principale
    if (this.cityData.quartiers) pageCount += this.cityData.quartiers.length;
    if (this.cityData.destinations) pageCount += this.cityData.destinations.length;
    
    console.log(chalk.white(`📄 Pages: ${pageCount}`));
    console.log(chalk.green('\n✅ PRÊT POUR LE DÉPLOIEMENT !\n'));
  }
}

async function main() {
  const citySlug = process.argv[2];
  
  if (!citySlug) {
    console.error(chalk.red('Usage: node generate-site-robust-fixed.js <city-slug>'));
    console.error(chalk.yellow('Exemple: node generate-site-robust-fixed.js marseille'));
    process.exit(1);
  }
  
  const dataPath = path.join(__dirname, '../data', `${citySlug}.json`);
  
  if (!await fs.pathExists(dataPath)) {
    console.error(chalk.red(`Données non trouvées: ${dataPath}`));
    process.exit(1);
  }
  
  const cityData = await fs.readJson(dataPath);
  const generator = new SiteGenerator(citySlug, cityData);
  
  await generator.generate();
}

if (require.main === module) {
  main().catch(error => {
    console.error(chalk.red(`\n❌ ERREUR: ${error.message}`));
    process.exit(1);
  });
}

module.exports = SiteGenerator;

