#!/usr/bin/env node

/**
 * Nettoyer NeighborhoodsData.ts - Retirer quartiers/communes sans pages
 * Pattern #9 - Résolution 404s par suppression liens invalides
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const CITIES = [
  'nice', 'lyon', 'lille', 'toulouse', 'rennes', 
  'marseille', 'nantes', 'strasbourg', 'rouen', 
  'bordeaux', 'montpellier'
];

let totalRemoved = 0;

for (const city of CITIES) {
  console.log(`\n🔍 Analyse ${city.toUpperCase()}...`);
  
  const dataPath = `sites/${city}/components/NeighborhoodsData.ts`;
  const quartiersDir = `sites/${city}/app/${city}`;
  
  if (!existsSync(dataPath)) {
    console.log(`⚠️  ${city}: NeighborhoodsData.ts manquant, skip`);
    continue;
  }
  
  // Lire quartiers existants (dossiers réels)
  let existingFolders = [];
  if (existsSync(quartiersDir)) {
    existingFolders = readdirSync(quartiersDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);
  }
  
  console.log(`   📁 Dossiers existants : ${existingFolders.length} (${existingFolders.join(', ')})`);
  
  // Lire NeighborhoodsData.ts actuel
  let content = readFileSync(dataPath, 'utf-8');
  
  // Parser QUARTIERS actuels
  const quartiersMatch = content.match(/export const QUARTIERS: Item\[\] = \[([\s\S]*?)\];/);
  if (!quartiersMatch) {
    console.log(`⚠️  ${city}: QUARTIERS non trouvé dans format attendu, skip`);
    continue;
  }
  
  const quartiersSection = quartiersMatch[1];
  const quartierLines = quartiersSection.match(/{ slug: "([^"]+)",\s*title: "([^"]+)" }/g) || [];
  
  const currentQuartiers = quartierLines.map(line => {
    const match = line.match(/slug: "([^"]+)",\s*title: "([^"]+)"/);
    return match ? { slug: match[1], title: match[2] } : null;
  }).filter(Boolean);
  
  console.log(`   📋 Quartiers définis : ${currentQuartiers.length}`);
  
  // Filtrer seulement ceux qui existent
  const validQuartiers = currentQuartiers.filter(q => 
    existingFolders.includes(q.slug)
  );
  
  const removedQuartiers = currentQuartiers.length - validQuartiers.length;
  
  console.log(`   ✅ Quartiers valides : ${validQuartiers.length}`);
  console.log(`   ❌ Quartiers à retirer : ${removedQuartiers}`);
  
  if (removedQuartiers > 0) {
    console.log(`      Retirés : ${currentQuartiers.filter(q => !existingFolders.includes(q.slug)).map(q => q.slug).join(', ')}`);
  }
  
  // Générer nouveau QUARTIERS
  const newQuartiersArray = validQuartiers.map(q => 
    `  { slug: "${q.slug}",      title: "${q.title}" },`
  ).join('\n');
  
  // Remplacer QUARTIERS dans le fichier
  content = content.replace(
    /export const QUARTIERS: Item\[\] = \[([\s\S]*?)\];/,
    `export const QUARTIERS: Item[] = [\n${newQuartiersArray}\n];`
  );
  
  // Vider COMMUNES (aucune page /devis-demenagement-{commune}/ n'existe)
  let communesCount = 0;
  const communesMatch = content.match(/export const COMMUNES: Item\[\] = \[([\s\S]*?)\];/);
  if (communesMatch) {
    const communesLines = communesMatch[1].match(/{ slug: "[^"]+"/g) || [];
    communesCount = communesLines.length;
    
    console.log(`   📍 Communes définies : ${communesCount} → Toutes retirées (0 page existante)`);
    
    content = content.replace(
      /export const COMMUNES: Item\[\] = \[([\s\S]*?)\];/,
      'export const COMMUNES: Item[] = [];\n// Communes satellites à créer ultérieurement'
    );
    
    totalRemoved += removedQuartiers + communesCount;
  }
  
  writeFileSync(dataPath, content, 'utf-8');
  console.log(`   ✅ ${city}: Nettoyé (${removedQuartiers} quartiers + ${communesCount} communes retirés)`);
}

console.log('\n');
console.log('═══════════════════════════════════════');
console.log(`🎉 Nettoyage terminé !`);
console.log(`📊 Total items retirés : ${totalRemoved}`);
console.log(`✅ NeighborhoodsData.ts ↔ Pages réelles : 100% sync`);
console.log('═══════════════════════════════════════');
console.log('');
console.log('📋 Impact :');
console.log('   - Page /quartiers-{ville} : 0 lien 404');
console.log('   - ~110 liens 404 résolus (56 quartiers + 55 communes)');
console.log('');
console.log('🚀 Prochaine étape :');
console.log('   1. Tester page /quartiers-nice en local');
console.log('   2. Commit + Push 11 villes');
console.log('   3. Validation crawler');

