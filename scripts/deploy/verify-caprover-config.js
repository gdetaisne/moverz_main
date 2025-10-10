#!/usr/bin/env node

/**
 * VÉRIFICATION COMPLÈTE - CONFIG CAPROVER
 * 
 * Vérifie que tous les sites sont prêts pour déploiement CapRover
 */

const fs = require('fs');
const path = require('path');

const SITES_DIR = path.join(__dirname, 'sites');
const CITIES = ['bordeaux', 'lille', 'lyon', 'marseille', 'montpellier', 'nantes', 'nice', 'rennes', 'rouen', 'strasbourg', 'toulouse'];

const results = {
  sites: {},
  summary: {
    ready: 0,
    warnings: 0,
    errors: 0,
  }
};

function checkSite(city) {
  const siteDir = path.join(SITES_DIR, city);
  const issues = [];
  const warnings = [];
  
  // 1. Vérifier captain-definition
  const captainDefPath = path.join(siteDir, 'captain-definition');
  if (!fs.existsSync(captainDefPath)) {
    issues.push('❌ captain-definition manquant');
  } else {
    try {
      const captainDef = JSON.parse(fs.readFileSync(captainDefPath, 'utf-8'));
      if (!captainDef.dockerfilePath) {
        issues.push('❌ dockerfilePath manquant dans captain-definition');
      }
    } catch (e) {
      issues.push('❌ captain-definition invalide (JSON)');
    }
  }
  
  // 2. Vérifier Dockerfile
  const dockerfilePath = path.join(siteDir, 'Dockerfile');
  if (!fs.existsSync(dockerfilePath)) {
    issues.push('❌ Dockerfile manquant');
  } else {
    const dockerfile = fs.readFileSync(dockerfilePath, 'utf-8');
    
    // Vérifier les étapes essentielles
    if (!dockerfile.includes('npm run build')) {
      warnings.push('⚠️  "npm run build" absent du Dockerfile');
    }
    if (!dockerfile.includes('COPY --from=builder')) {
      warnings.push('⚠️  Multi-stage build peut-être mal configuré');
    }
    if (!dockerfile.includes('/app/content')) {
      warnings.push('⚠️  Dossier content/ non copié (nécessaire pour blog)');
    }
    if (!dockerfile.includes('standalone')) {
      warnings.push('⚠️  Référence à "standalone" manquante dans Dockerfile');
    }
  }
  
  // 3. Vérifier package.json
  const packagePath = path.join(siteDir, 'package.json');
  if (!fs.existsSync(packagePath)) {
    issues.push('❌ package.json manquant');
  } else {
    try {
      const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
      
      if (!pkg.scripts) {
        issues.push('❌ Scripts manquants dans package.json');
      } else {
        if (!pkg.scripts.build) {
          issues.push('❌ Script "build" manquant');
        }
        if (!pkg.scripts.start) {
          issues.push('❌ Script "start" manquant');
        }
      }
      
      // Vérifier les dépendances Next.js
      if (!pkg.dependencies || !pkg.dependencies.next) {
        issues.push('❌ Next.js non présent dans dependencies');
      }
    } catch (e) {
      issues.push('❌ package.json invalide (JSON)');
    }
  }
  
  // 4. Vérifier next.config
  const nextConfigFiles = ['next.config.js', 'next.config.mjs', 'next.config.cjs'];
  let nextConfigFound = false;
  let hasStandalone = false;
  
  for (const filename of nextConfigFiles) {
    const configPath = path.join(siteDir, filename);
    if (fs.existsSync(configPath)) {
      nextConfigFound = true;
      const content = fs.readFileSync(configPath, 'utf-8');
      if (content.includes("output") && content.includes("standalone")) {
        hasStandalone = true;
      }
    }
  }
  
  if (!nextConfigFound) {
    warnings.push('⚠️  next.config.* non trouvé');
  } else if (!hasStandalone) {
    issues.push('❌ output: "standalone" manquant dans next.config');
  }
  
  // 5. Vérifier dossier content (pour blog)
  const contentPath = path.join(siteDir, 'content');
  if (!fs.existsSync(contentPath)) {
    warnings.push('⚠️  Dossier content/ absent (blog désactivé?)');
  } else {
    const blogPath = path.join(contentPath, 'blog');
    if (fs.existsSync(blogPath)) {
      const articles = fs.readdirSync(blogPath, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .length;
      if (articles === 0) {
        warnings.push('⚠️  Aucun contenu blog détecté');
      }
    }
  }
  
  // 6. Vérifier .dockerignore (optionnel mais recommandé)
  const dockerignorePath = path.join(siteDir, '.dockerignore');
  if (!fs.existsSync(dockerignorePath)) {
    warnings.push('💡 .dockerignore recommandé pour optimiser le build');
  }
  
  return {
    city,
    issues,
    warnings,
    ready: issues.length === 0,
  };
}

console.log('🔍 VÉRIFICATION CONFIG CAPROVER - TOUS LES SITES\n');
console.log('─'.repeat(80));
console.log('');

for (const city of CITIES) {
  const result = checkSite(city);
  results.sites[city] = result;
  
  if (result.ready && result.warnings.length === 0) {
    console.log(`✅ ${city.toUpperCase()} - Prêt pour déploiement`);
    results.summary.ready++;
  } else if (result.ready && result.warnings.length > 0) {
    console.log(`🟡 ${city.toUpperCase()} - Prêt avec warnings`);
    result.warnings.forEach(w => console.log(`   ${w}`));
    results.summary.ready++;
    results.summary.warnings++;
  } else {
    console.log(`❌ ${city.toUpperCase()} - Problèmes détectés`);
    result.issues.forEach(i => console.log(`   ${i}`));
    result.warnings.forEach(w => console.log(`   ${w}`));
    results.summary.errors++;
  }
  console.log('');
}

console.log('='.repeat(80));
console.log('📊 RÉSUMÉ');
console.log('─'.repeat(80));
console.log(`✅ Sites prêts: ${results.summary.ready}/${CITIES.length}`);
console.log(`⚠️  Sites avec warnings: ${results.summary.warnings}`);
console.log(`❌ Sites avec erreurs: ${results.summary.errors}`);
console.log('');

if (results.summary.ready === CITIES.length) {
  console.log('🎉 TOUS LES SITES SONT PRÊTS POUR CAPROVER !');
  console.log('');
  console.log('💡 Prochaines étapes:');
  console.log('   1. Commit les changements: git add -A && git commit');
  console.log('   2. Push sur GitHub: git push origin main');
  console.log('   3. Déployer: ./redeploy-all-sites.sh');
} else {
  console.log('⚠️  Certains sites nécessitent des corrections avant déploiement.');
  console.log('');
  console.log('💡 Voir les détails ci-dessus pour chaque site.');
}

console.log('='.repeat(80));
console.log('');

// Sauvegarder le rapport
fs.writeFileSync(
  path.join(__dirname, 'CAPROVER_CONFIG_CHECK.json'),
  JSON.stringify(results, null, 2)
);

console.log('📄 Rapport détaillé: CAPROVER_CONFIG_CHECK.json');

// Exit code basé sur les erreurs
process.exit(results.summary.errors > 0 ? 1 : 0);

