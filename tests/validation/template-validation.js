#!/usr/bin/env node

/**
 * Tests de validation du template
 * Vérifie que tous les composants nécessaires existent
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_COMPONENTS = [
  'src/components/Header.tsx',
  'src/components/Footer.tsx', 
  'src/components/HeaderTemplate.tsx',
  'src/app/_templates/LocalPage.tsx',
  'src/app/_templates/CorridorPage.tsx'
];

const REQUIRED_ASSETS = [
  'public/favicon.ico',
  'public/manifest.json',
  'src/app/globals.css',
  'postcss.config.js',
  'tailwind.config.ts'
];

const REQUIRED_CONFIG = [
  'next.config.js',
  'package.json',
  'tsconfig.json'
];

function validateTemplate(templatePath) {
  console.log(`🔍 Validation du template: ${templatePath}`);
  
  const errors = [];
  const warnings = [];
  
  // Vérifier les composants
  REQUIRED_COMPONENTS.forEach(component => {
    const fullPath = path.join(templatePath, component);
    if (!fs.existsSync(fullPath)) {
      errors.push(`❌ Composant manquant: ${component}`);
    } else {
      console.log(`✅ ${component}`);
    }
  });
  
  // Vérifier les assets
  REQUIRED_ASSETS.forEach(asset => {
    const fullPath = path.join(templatePath, asset);
    if (!fs.existsSync(fullPath)) {
      errors.push(`❌ Asset manquant: ${asset}`);
    } else {
      console.log(`✅ ${asset}`);
    }
  });
  
  // Vérifier la configuration
  REQUIRED_CONFIG.forEach(config => {
    const fullPath = path.join(templatePath, config);
    if (!fs.existsSync(fullPath)) {
      errors.push(`❌ Configuration manquante: ${config}`);
    } else {
      console.log(`✅ ${config}`);
    }
  });
  
  // Résumé
  if (errors.length === 0) {
    console.log(`🎉 Template validé avec succès !`);
    return true;
  } else {
    console.log(`❌ ${errors.length} erreurs trouvées:`);
    errors.forEach(error => console.log(`  ${error}`));
    return false;
  }
}

module.exports = { validateTemplate };

// Exécution directe
if (require.main === module) {
  const templatePath = process.argv[2] || 'moverz-template';
  validateTemplate(templatePath);
}
