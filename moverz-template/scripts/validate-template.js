#!/usr/bin/env node

/**
 * Script de validation du template Moverz
 * Vérifie que tous les composants sont prêts pour la génération
 */

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

class TemplateValidator {
  constructor() {
    this.templateDir = process.cwd();
    this.errors = [];
    this.warnings = [];
  }

  async validate() {
    console.log(chalk.blue('🔍 Validation du template Moverz...\n'));

    // 1. Vérifier la structure de base
    await this.validateStructure();

    // 2. Vérifier les fichiers de configuration
    await this.validateConfigFiles();

    // 3. Vérifier les composants
    await this.validateComponents();

    // 4. Vérifier les scripts
    await this.validateScripts();

    // 5. Vérifier les données
    await this.validateData();

    // 6. Afficher les résultats
    this.displayResults();
  }

  async validateStructure() {
    console.log(chalk.gray('📁 Vérification de la structure...'));

    const requiredDirs = [
      'src/app',
      'src/components',
      'src/lib',
      'public/images',
      'data',
      'scripts'
    ];

    for (const dir of requiredDirs) {
      const dirPath = path.join(this.templateDir, dir);
      if (!await fs.pathExists(dirPath)) {
        this.errors.push(`Dossier manquant: ${dir}`);
      }
    }
  }

  async validateConfigFiles() {
    console.log(chalk.gray('⚙️ Vérification des fichiers de configuration...'));

    const configFiles = [
      'package.json',
      'next.config.js',
      'postcss.config.js',
      'tailwind.config.ts'
    ];

    for (const file of configFiles) {
      const filePath = path.join(this.templateDir, file);
      if (!await fs.pathExists(filePath)) {
        this.errors.push(`Fichier de configuration manquant: ${file}`);
      }
    }

    // Vérifier le contenu de package.json
    try {
      const packageJson = await fs.readJson(path.join(this.templateDir, 'package.json'));
      
      const requiredDeps = [
        'next',
        'react',
        'react-dom',
        'tailwind-merge',
        'lucide-react'
      ];

      const requiredDevDeps = [
        'handlebars',
        'chalk',
        'fs-extra',
        '@tailwindcss/postcss',
        'tailwindcss'
      ];

      for (const dep of requiredDeps) {
        if (!packageJson.dependencies?.[dep]) {
          this.warnings.push(`Dépendance manquante: ${dep}`);
        }
      }

      for (const dep of requiredDevDeps) {
        if (!packageJson.devDependencies?.[dep]) {
          this.warnings.push(`Dépendance de développement manquante: ${dep}`);
        }
      }
    } catch (error) {
      this.errors.push(`Erreur lors de la lecture de package.json: ${error.message}`);
    }
  }

  async validateComponents() {
    console.log(chalk.gray('🧩 Vérification des composants...'));

    const requiredComponents = [
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/app/globals.css',
      'src/components/Hero.tsx',
      'src/components/ValueTriad.tsx',
      'src/components/Testimonials.tsx',
      'src/components/NeighborhoodsTeaser.tsx',
      'src/components/Header.tsx'
    ];

    for (const component of requiredComponents) {
      const componentPath = path.join(this.templateDir, component);
      if (!await fs.pathExists(componentPath)) {
        this.errors.push(`Composant manquant: ${component}`);
      } else {
        // Vérifier la présence de placeholders Handlebars
        try {
          const content = await fs.readFile(componentPath, 'utf8');
          if (content.includes('{{') && !content.includes('{{city_name}}')) {
            this.warnings.push(`Placeholders Handlebars potentiellement manquants dans: ${component}`);
          }
        } catch (error) {
          this.warnings.push(`Erreur lors de la lecture de ${component}: ${error.message}`);
        }
      }
    }
  }

  async validateScripts() {
    console.log(chalk.gray('📜 Vérification des scripts...'));

    const requiredScripts = [
      'scripts/generate-site-handlebars.js',
      'create-site.sh'
    ];

    for (const script of requiredScripts) {
      const scriptPath = path.join(this.templateDir, script);
      if (!await fs.pathExists(scriptPath)) {
        this.errors.push(`Script manquant: ${script}`);
      } else {
        // Vérifier les permissions d'exécution pour les scripts shell
        if (script.endsWith('.sh')) {
          try {
            const stats = await fs.stat(scriptPath);
            if (!(stats.mode & 0o111)) {
              this.warnings.push(`Script ${script} n'est pas exécutable`);
            }
          } catch (error) {
            this.warnings.push(`Erreur lors de la vérification des permissions de ${script}`);
          }
        }
      }
    }
  }

  async validateData() {
    console.log(chalk.gray('📊 Vérification des données...'));

    // Vérifier le template de données
    const templateDataPath = path.join(this.templateDir, 'data', 'template.json');
    if (!await fs.pathExists(templateDataPath)) {
      this.errors.push('Template de données manquant: data/template.json');
    } else {
      try {
        const templateData = await fs.readJson(templateDataPath);
        const requiredFields = [
          'city_name',
          'citySlug',
          'region',
          'domain',
          'contactEmail',
          'hero_title',
          'hero_subtitle',
          'quartiers',
          'testimonials'
        ];

        for (const field of requiredFields) {
          if (!templateData[field]) {
            this.errors.push(`Champ requis manquant dans template.json: ${field}`);
          }
        }
      } catch (error) {
        this.errors.push(`Erreur lors de la lecture de template.json: ${error.message}`);
      }
    }

    // Vérifier les données d'exemple
    const exampleDataPath = path.join(this.templateDir, 'data', 'toulouse.json');
    if (await fs.pathExists(exampleDataPath)) {
      try {
        const exampleData = await fs.readJson(exampleDataPath);
        if (exampleData.city_name === 'Ville') {
          this.warnings.push('Données d\'exemple non personnalisées dans toulouse.json');
        }
      } catch (error) {
        this.warnings.push(`Erreur lors de la lecture de toulouse.json: ${error.message}`);
      }
    }
  }

  displayResults() {
    console.log('\n' + chalk.blue('📋 Résultats de la validation:\n'));

    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log(chalk.green('✅ Template validé avec succès ! Prêt pour la génération de sites.'));
      return true;
    }

    if (this.errors.length > 0) {
      console.log(chalk.red('❌ Erreurs critiques:'));
      this.errors.forEach(error => {
        console.log(chalk.red(`  • ${error}`));
      });
      console.log();
    }

    if (this.warnings.length > 0) {
      console.log(chalk.yellow('⚠️ Avertissements:'));
      this.warnings.forEach(warning => {
        console.log(chalk.yellow(`  • ${warning}`));
      });
      console.log();
    }

    if (this.errors.length > 0) {
      console.log(chalk.red('❌ Le template n\'est pas prêt. Corrigez les erreurs avant de continuer.'));
      return false;
    } else {
      console.log(chalk.green('✅ Template prêt ! Vous pouvez ignorer les avertissements.'));
      return true;
    }
  }
}

// Exécution du script
const validator = new TemplateValidator();
validator.validate().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error(chalk.red('❌ Erreur lors de la validation:'), error);
  process.exit(1);
});

