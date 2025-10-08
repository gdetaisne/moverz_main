#!/usr/bin/env node

/**
 * Tests de validation des sites générés
 * Vérifie que les sites générés sont fonctionnels
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function validateGeneratedSite(sitePath) {
  console.log(`🔍 Validation du site: ${sitePath}`);
  
  const errors = [];
  
  // 1. Vérifier que le build fonctionne
  console.log('🧪 Test de build...');
  try {
    execSync('npm run build', { 
      cwd: sitePath, 
      stdio: 'pipe',
      timeout: 60000 // 60 secondes
    });
    console.log('✅ Build réussi');
  } catch (error) {
    errors.push('❌ Build échoué');
    console.log('❌ Erreur de build:', error.message);
  }
  
  // 2. Vérifier les variables Handlebars résolues
  console.log('🔍 Vérification des variables Handlebars...');
  try {
    const files = execSync('find src -name "*.tsx" -o -name "*.ts"', { cwd: sitePath }).toString();
    const fileList = files.trim().split('\n');
    
    let handlebarsFound = false;
    fileList.forEach(file => {
      if (file) {
        const content = fs.readFileSync(path.join(sitePath, file), 'utf8');
        if (content.includes('{{{' || content.includes('{{'))) {
          handlebarsFound = true;
          errors.push(`❌ Variables Handlebars non résolues dans ${file}`);
        }
      }
    });
    
    if (!handlebarsFound) {
      console.log('✅ Variables Handlebars résolues');
    }
  } catch (error) {
    errors.push('❌ Erreur lors de la vérification des variables');
  }
  
  // 3. Vérifier les imports
  console.log('🔍 Vérification des imports...');
  try {
    const pageContent = fs.readFileSync(path.join(sitePath, 'src/app/page.tsx'), 'utf8');
    if (pageContent.includes('HeaderTemplate')) {
      errors.push('❌ Import HeaderTemplate encore présent');
    } else {
      console.log('✅ Imports corrects');
    }
  } catch (error) {
    errors.push('❌ Erreur lors de la vérification des imports');
  }
  
  // Résumé
  if (errors.length === 0) {
    console.log(`🎉 Site validé avec succès !`);
    return true;
  } else {
    console.log(`❌ ${errors.length} erreurs trouvées:`);
    errors.forEach(error => console.log(`  ${error}`));
    return false;
  }
}

module.exports = { validateGeneratedSite };

// Exécution directe
if (require.main === module) {
  const sitePath = process.argv[2];
  if (!sitePath) {
    console.log('Usage: node site-validation.js <path-to-site>');
    process.exit(1);
  }
  validateGeneratedSite(sitePath);
}
