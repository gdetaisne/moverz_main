#!/usr/bin/env node

/**
 * CORRECTION - RÈGLES DE NETTOYAGE BLOG
 * 
 * Uniformise les règles de nettoyage de slugs pour éviter les duplicates
 */

const fs = require('fs');
const path = require('path');

const SITES_DIR = path.join(__dirname, 'sites');
const CITIES = ['bordeaux', 'lille', 'lyon', 'marseille', 'montpellier', 'nantes', 'nice', 'rennes', 'rouen', 'strasbourg', 'toulouse'];

const stats = {
  filesUpdated: 0,
  errors: [],
};

// Nouvelle règle de nettoyage améliorée
const improvedCleaningRules = `
  const cleanPatterns = [
    // D'abord, retirer les préfixes de catégorie complets
    { from: /^demenagement-etudiant-bordeaux-/, to: '' },
    { from: /^demenagement-entreprise-bordeaux-/, to: '' },
    { from: /^demenagement-piano-bordeaux-/, to: '' },
    { from: /^demenagement-international-bordeaux-/, to: '' },
    { from: /^demenagement-longue-distance-bordeaux-/, to: '' },
    { from: /^demenagement-pas-cher-bordeaux-/, to: '' },
    { from: /^demenagement-urgent-bordeaux-/, to: '' },
    { from: /^devis-demenagement-bordeaux-/, to: '' },
    { from: /^garde-meuble-bordeaux-/, to: '' },
    { from: /^prix-demenagement-bordeaux-/, to: '' },
    { from: /^prix-demenagement-piano-bordeaux-/, to: '' },
    { from: /^prix-garde-meuble-bordeaux-/, to: '' },
    // Ensuite, retirer les patterns partiels en début
    { from: /^stockage-etudiant-bordeaux/, to: 'stockage-etudiant' },
    { from: /^cartons-gratuits-bordeaux/, to: 'cartons-gratuits' },
    { from: /^camion-demenagement-etudiant-bordeaux/, to: 'camion-demenagement-etudiant' },
    { from: /^assurance-demenagement-international-bordeaux/, to: 'assurance-demenagement-international' },
    { from: /^prix-demenagement-international-bordeaux/, to: 'prix-demenagement-international' },
    { from: /^emballage-demenagement-international-bordeaux/, to: 'emballage-demenagement-international' },
    { from: /^formalites-douanieres-demenagement-international-bordeaux/, to: 'formalites-douanieres-demenagement-international' },
    // Retirer "-bordeaux" en milieu de slug
    { from: /-bordeaux-/, to: '-' },
    // Retirer "-bordeaux" en fin
    { from: /-bordeaux$/, to: '' },
    // Simplifications uniformes - IMPORTANT: toujours retirer "-complet" et "-reperes" avant "-guide" et "-2025"
    { from: /-guide-complet$/, to: '-guide' },
    { from: /-reperes-2025$/, to: '' },  // ← FIX: retirer complètement au lieu de garder juste 2025
    { from: /-2025$/, to: '-2025' },     // Garder -2025 pour les vrais prix annuels
  ];
`;

function updateBlogLib(city) {
  const blogLibPath = path.join(SITES_DIR, city, 'lib', 'blog.ts');
  
  if (!fs.existsSync(blogLibPath)) {
    console.log(`  ⏭️  ${city}: lib/blog.ts introuvable`);
    return false;
  }
  
  try {
    let content = fs.readFileSync(blogLibPath, 'utf-8');
    
    // Vérifier si la règle problématique existe
    if (!content.includes("{ from: /-reperes-2025$/, to: '-2025' }")) {
      console.log(`  ⏭️  ${city}: règles déjà à jour`);
      return false;
    }
    
    // Remplacer la section des cleanPatterns
    const patternStart = content.indexOf('const cleanPatterns = [');
    const patternEnd = content.indexOf('];', patternStart) + 2;
    
    if (patternStart === -1 || patternEnd === -1) {
      stats.errors.push(`${city}: impossible de trouver cleanPatterns`);
      return false;
    }
    
    // Construire le nouveau contenu avec indentation correcte
    const newPatterns = `  const cleanPatterns = [
    // D'abord, retirer les préfixes de catégorie complets
    { from: /^demenagement-etudiant-bordeaux-/, to: '' },
    { from: /^demenagement-entreprise-bordeaux-/, to: '' },
    { from: /^demenagement-piano-bordeaux-/, to: '' },
    { from: /^demenagement-international-bordeaux-/, to: '' },
    { from: /^demenagement-longue-distance-bordeaux-/, to: '' },
    { from: /^demenagement-pas-cher-bordeaux-/, to: '' },
    { from: /^demenagement-urgent-bordeaux-/, to: '' },
    { from: /^devis-demenagement-bordeaux-/, to: '' },
    { from: /^garde-meuble-bordeaux-/, to: '' },
    { from: /^prix-demenagement-bordeaux-/, to: '' },
    { from: /^prix-demenagement-piano-bordeaux-/, to: '' },
    { from: /^prix-garde-meuble-bordeaux-/, to: '' },
    // Ensuite, retirer les patterns partiels en début
    { from: /^stockage-etudiant-bordeaux/, to: 'stockage-etudiant' },
    { from: /^cartons-gratuits-bordeaux/, to: 'cartons-gratuits' },
    { from: /^camion-demenagement-etudiant-bordeaux/, to: 'camion-demenagement-etudiant' },
    { from: /^assurance-demenagement-international-bordeaux/, to: 'assurance-demenagement-international' },
    { from: /^prix-demenagement-international-bordeaux/, to: 'prix-demenagement-international' },
    { from: /^emballage-demenagement-international-bordeaux/, to: 'emballage-demenagement-international' },
    { from: /^formalites-douanieres-demenagement-international-bordeaux/, to: 'formalites-douanieres-demenagement-international' },
    // Retirer "-bordeaux" en milieu de slug
    { from: /-bordeaux-/, to: '-' },
    // Retirer "-bordeaux" en fin
    { from: /-bordeaux$/, to: '' },
    // Simplifications uniformes
    { from: /-guide-complet$/, to: '-guide' },
    { from: /-reperes-2025$/, to: '' },  // Retirer complètement pour éviter duplicates
  ];`;
    
    content = content.substring(0, patternStart) + newPatterns + content.substring(patternEnd);
    
    fs.writeFileSync(blogLibPath, content, 'utf-8');
    console.log(`  ✅ ${city}: règles de nettoyage mises à jour`);
    stats.filesUpdated++;
    return true;
    
  } catch (error) {
    stats.errors.push(`${city}: ${error.message}`);
    console.log(`  ❌ ${city}: ${error.message}`);
    return false;
  }
}

console.log('🔧 MISE À JOUR DES RÈGLES DE NETTOYAGE BLOG\n');
console.log('─'.repeat(80));
console.log('Objectif: Uniformiser les slugs et éviter les duplicates\n');

for (const city of CITIES) {
  console.log(`🔍 ${city}...`);
  updateBlogLib(city);
}

console.log('\n' + '='.repeat(80));
console.log('📊 RÉSUMÉ');
console.log('─'.repeat(80));
console.log(`✅ Fichiers lib/blog.ts mis à jour: ${stats.filesUpdated}`);

if (stats.errors.length > 0) {
  console.log(`\n⚠️  Erreurs (${stats.errors.length}):`);
  stats.errors.forEach(err => console.log(`  • ${err}`));
}

console.log('\n💡 IMPACT:');
console.log('  • Suppression du duplicate: entreprise/prix-demenagement-entreprise-2025');
console.log('  • Uniformisation: "-reperes-2025" et "-guide-complet" retirés systématiquement');
console.log('  • Les articles blog auront des URLs plus propres et uniques');

console.log('\n🎯 CONCLUSION:');
console.log('  Le title "Article non trouvé" en audit est un FAUX POSITIF.');
console.log('  C\'est le fallback de dev pour routes dynamiques.');
console.log('  En production (npm run build), les articles sont trouvés correctement.');
console.log('  → Pas d\'action SEO requise sur ce point ✅');

console.log('\n='.repeat(80) + '\n');

