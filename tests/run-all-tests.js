#!/usr/bin/env node

/**
 * Script principal pour exécuter tous les tests
 */

const { validateTemplate } = require('./validation/template-validation');
const { validateGeneratedSite } = require('./validation/site-validation');

async function runAllTests() {
  console.log('🚀 EXÉCUTION DE TOUS LES TESTS');
  console.log('==============================');
  
  let allPassed = true;
  
  // 1. Test du template
  console.log('\n1️⃣ Test du template...');
  const templateValid = validateTemplate('moverz-template');
  if (!templateValid) allPassed = false;
  
  // 2. Test des sites générés (si ils existent)
  console.log('\n2️⃣ Test des sites générés...');
  const sitesDir = 'sites';
  if (fs.existsSync(sitesDir)) {
    const sites = fs.readdirSync(sitesDir);
    for (const site of sites) {
      const sitePath = path.join(sitesDir, site);
      if (fs.statSync(sitePath).isDirectory()) {
        console.log(`\n📁 Test du site: ${site}`);
        const siteValid = validateGeneratedSite(sitePath);
        if (!siteValid) allPassed = false;
      }
    }
  } else {
    console.log('⚠️ Aucun site généré trouvé');
  }
  
  // Résumé final
  console.log('\n📊 RÉSUMÉ DES TESTS');
  console.log('==================');
  if (allPassed) {
    console.log('🎉 TOUS LES TESTS SONT PASSÉS !');
    process.exit(0);
  } else {
    console.log('❌ CERTAINS TESTS ONT ÉCHOUÉ');
    process.exit(1);
  }
}

// Import fs et path
const fs = require('fs');
const path = require('path');

// Exécution
runAllTests().catch(error => {
  console.error('❌ Erreur lors de l\'exécution des tests:', error);
  process.exit(1);
});
