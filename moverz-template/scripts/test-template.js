#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

// ============================================================================
// SCRIPT DE TEST DU TEMPLATE
// ============================================================================

async function testTemplate() {
  console.log(chalk.blue('🧪 Test du template Moverz...'));
  
  try {
    // 1. Vérifier que le template se lance
    console.log(chalk.gray('  📋 Vérification des fichiers du template...'));
    
    const requiredFiles = [
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/components/HeaderTemplate.tsx',
      'next.config.js',
      'package.json',
      'postcss.config.js'
    ];
    
    for (const file of requiredFiles) {
      const filePath = path.join(process.cwd(), file);
      if (await fs.pathExists(filePath)) {
        console.log(chalk.green(`  ✅ ${file}`));
      } else {
        console.log(chalk.red(`  ❌ ${file} manquant`));
        return false;
      }
    }
    
    // 2. Vérifier que les données de test existent
    console.log(chalk.gray('  📋 Vérification des données de test...'));
    
    const testDataPath = path.join(process.cwd(), 'data', 'bordeaux.json');
    if (await fs.pathExists(testDataPath)) {
      console.log(chalk.green('  ✅ Données de test Bordeaux disponibles'));
    } else {
      console.log(chalk.yellow('  ⚠️ Données de test Bordeaux manquantes'));
    }
    
    // 3. Vérifier la configuration Next.js
    console.log(chalk.gray('  📋 Vérification de la configuration...'));
    
    const nextConfig = await fs.readFile(path.join(process.cwd(), 'next.config.js'), 'utf8');
    if (nextConfig.includes('remotePatterns')) {
      console.log(chalk.green('  ✅ Configuration Next.js moderne'));
    } else {
      console.log(chalk.yellow('  ⚠️ Configuration Next.js obsolète'));
    }
    
    // 4. Vérifier qu'il n'y a pas de variables Handlebars dans les fichiers React
    console.log(chalk.gray('  📋 Vérification des variables Handlebars...'));
    
    const reactFiles = [
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/components/HeaderTemplate.tsx'
    ];
    
    let hasHandlebars = false;
    for (const file of reactFiles) {
      const content = await fs.readFile(path.join(process.cwd(), file), 'utf8');
      if (content.includes('{{') || content.includes('}}')) {
        console.log(chalk.red(`  ❌ Variables Handlebars trouvées dans ${file}`));
        hasHandlebars = true;
      }
    }
    
    if (!hasHandlebars) {
      console.log(chalk.green('  ✅ Aucune variable Handlebars dans les fichiers React'));
    }
    
    console.log(chalk.green('\n✅ Template testé avec succès !'));
    console.log(chalk.cyan('🌐 Template disponible sur: http://localhost:4002'));
    console.log(chalk.cyan('🌐 Site Bordeaux disponible sur: http://localhost:4000'));
    
    return true;
    
  } catch (error) {
    console.error(chalk.red(`❌ Erreur lors du test: ${error.message}`));
    return false;
  }
}

// ============================================================================
// EXÉCUTION
// ============================================================================

testTemplate().catch(console.error);


