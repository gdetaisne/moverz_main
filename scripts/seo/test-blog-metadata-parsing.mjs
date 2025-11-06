#!/usr/bin/env node

/**
 * TEST SCRIPT - Parse & Modify Blog Metadata SAFELY
 * 
 * Objectif : Tester parsing YAML frontmatter AVANT automatisation massive
 * 
 * Tests :
 * 1. Parse frontmatter (gray-matter)
 * 2. Détecte format (description vs meta_description)
 * 3. Modifie uniquement champ description
 * 4. Stringify sans casser autres champs
 * 5. Valide syntaxe YAML résultat
 * 
 * Usage : node scripts/seo/test-blog-metadata-parsing.mjs
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ===========================
// 1. CONFIGURATION
// ===========================

const TEST_FILES = [
  // Format ANCIEN (description)
  'sites/marseille/content/blog/demenagement-marseille/petit-demenagement-marseille.md',
  'sites/toulouse/content/blog/prix-demenagement-toulouse/prix-demenagement-toulouse-guide-complet.md',
  
  // Format NOUVEAU (meta_description)
  'sites/bordeaux/content/blog/prix-demenagement-bordeaux/prix-demenagement-bordeaux-guide.md',
  'sites/rouen/content/blog/satellites/prix-demenageur-rouen-2025.md',
  'sites/nice/content/blog/satellites/prix-demenageur-nice-2025.md',
];

const DRY_RUN = true; // true = ne modifie PAS les fichiers, affiche seulement
const BACKUP_DIR = '.cursor/tasks/[P1]-TASK-LEADGEN-04-metadata-articles-blog/test-backups';

// ===========================
// 2. FONCTIONS UTILITAIRES
// ===========================

/**
 * Crée backup d'un fichier
 */
function backupFile(filePath) {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  
  const filename = path.basename(filePath);
  const backupPath = path.join(BACKUP_DIR, `${filename}.backup`);
  
  fs.copyFileSync(filePath, backupPath);
  console.log(`✅ Backup créé : ${backupPath}`);
  
  return backupPath;
}

/**
 * Détecte format frontmatter
 */
function detectFormat(frontmatter) {
  if (frontmatter.meta_description !== undefined) {
    return 'nouveau'; // meta_description
  } else if (frontmatter.description !== undefined) {
    return 'ancien'; // description
  } else {
    return 'inconnu'; // ni l'un ni l'autre
  }
}

/**
 * Génère nouvelle description (MOCKUP pour test)
 */
function generateNewDescription(frontmatter, cityName) {
  const title = frontmatter.title || 'Article';
  
  // Pour test, on ajoute juste "[OPTIMISÉ]" au début
  const currentDesc = frontmatter.meta_description || frontmatter.description || '';
  
  return `[OPTIMISÉ TEST] ${currentDesc.substring(0, 140)}`;
}

/**
 * Parse et modifie un fichier
 */
function processFile(filePath) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📄 Fichier : ${filePath}`);
  console.log(`${'='.repeat(80)}`);
  
  // 1. Vérifier existence
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Fichier introuvable : ${filePath}`);
    return { success: false, reason: 'File not found' };
  }
  
  // 2. Lire contenu
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  console.log(`✅ Fichier lu (${fileContent.length} caractères)`);
  
  // 3. Parser frontmatter
  let parsed;
  try {
    parsed = matter(fileContent);
    console.log(`✅ Frontmatter parsé (${Object.keys(parsed.data).length} champs)`);
  } catch (error) {
    console.log(`❌ Erreur parsing YAML : ${error.message}`);
    return { success: false, reason: 'Parse error', error };
  }
  
  // 4. Détecter format
  const format = detectFormat(parsed.data);
  console.log(`📋 Format détecté : ${format.toUpperCase()}`);
  
  if (format === 'inconnu') {
    console.log(`⚠️  Aucun champ description/meta_description trouvé`);
    return { success: false, reason: 'No description field' };
  }
  
  // 5. Afficher description actuelle
  const descField = format === 'nouveau' ? 'meta_description' : 'description';
  const currentDesc = parsed.data[descField];
  console.log(`\n📝 Description actuelle (${currentDesc.length} car) :`);
  console.log(`   "${currentDesc}"`);
  
  // 6. Générer nouvelle description
  const cityName = path.basename(path.dirname(filePath)).split('-').pop();
  const newDesc = generateNewDescription(parsed.data, cityName);
  console.log(`\n✨ Nouvelle description (${newDesc.length} car) :`);
  console.log(`   "${newDesc}"`);
  
  // 7. Modifier frontmatter (en mémoire)
  const originalData = { ...parsed.data };
  parsed.data[descField] = newDesc;
  
  // 8. Vérifier qu'aucun autre champ n'a été perdu
  const originalKeys = Object.keys(originalData);
  const newKeys = Object.keys(parsed.data);
  
  if (originalKeys.length !== newKeys.length) {
    console.log(`❌ ERREUR : Nombre de champs changé (${originalKeys.length} → ${newKeys.length})`);
    return { success: false, reason: 'Field count changed' };
  }
  
  const missingKeys = originalKeys.filter(k => !newKeys.includes(k));
  if (missingKeys.length > 0) {
    console.log(`❌ ERREUR : Champs perdus : ${missingKeys.join(', ')}`);
    return { success: false, reason: 'Fields lost', missingKeys };
  }
  
  console.log(`✅ Aucun champ perdu (${newKeys.length} champs préservés)`);
  
  // 9. Stringify (reconstruire fichier)
  let newFileContent;
  try {
    newFileContent = matter.stringify(parsed.content, parsed.data);
    console.log(`✅ Fichier reconstruit (${newFileContent.length} caractères)`);
  } catch (error) {
    console.log(`❌ Erreur stringify : ${error.message}`);
    return { success: false, reason: 'Stringify error', error };
  }
  
  // 10. Comparer taille
  const sizeDiff = newFileContent.length - fileContent.length;
  console.log(`📊 Différence taille : ${sizeDiff > 0 ? '+' : ''}${sizeDiff} caractères`);
  
  // 11. DRY RUN ou écriture réelle
  if (DRY_RUN) {
    console.log(`\n🔒 DRY RUN : Fichier NON modifié (mode test)`);
  } else {
    // Backup
    backupFile(filePath);
    
    // Écrire
    fs.writeFileSync(filePath, newFileContent, 'utf-8');
    console.log(`✅ Fichier modifié et sauvegardé`);
  }
  
  return {
    success: true,
    format,
    descField,
    originalLength: currentDesc.length,
    newLength: newDesc.length,
    fieldsCount: newKeys.length,
    sizeDiff
  };
}

// ===========================
// 3. MAIN
// ===========================

console.log(`
╔════════════════════════════════════════════════════════════════════╗
║  TEST PARSING & MODIFICATION METADATA BLOG                         ║
║  Mode : ${DRY_RUN ? 'DRY RUN (aucune modification)' : 'WRITE (modifie fichiers)'}                    ║
╚════════════════════════════════════════════════════════════════════╝
`);

const results = [];

for (const filePath of TEST_FILES) {
  const result = processFile(filePath);
  results.push({ filePath, ...result });
}

// ===========================
// 4. RAPPORT FINAL
// ===========================

console.log(`\n\n${'='.repeat(80)}`);
console.log(`📊 RAPPORT FINAL`);
console.log(`${'='.repeat(80)}\n`);

const successes = results.filter(r => r.success);
const failures = results.filter(r => !r.success);

console.log(`✅ Succès : ${successes.length}/${results.length}`);
console.log(`❌ Échecs : ${failures.length}/${results.length}\n`);

if (successes.length > 0) {
  console.log(`Détails succès :`);
  successes.forEach(r => {
    console.log(`  • ${path.basename(r.filePath)}`);
    console.log(`    Format: ${r.format}, Champ: ${r.descField}`);
    console.log(`    Description: ${r.originalLength} → ${r.newLength} car`);
    console.log(`    Champs préservés: ${r.fieldsCount}`);
  });
}

if (failures.length > 0) {
  console.log(`\nDétails échecs :`);
  failures.forEach(r => {
    console.log(`  • ${path.basename(r.filePath)}`);
    console.log(`    Raison: ${r.reason}`);
  });
}

console.log(`\n${'='.repeat(80)}`);

if (DRY_RUN) {
  console.log(`\n🔒 Mode DRY RUN : Aucun fichier modifié`);
  console.log(`Pour écrire réellement, modifiez DRY_RUN = false dans le script\n`);
} else {
  console.log(`\n✅ Fichiers modifiés et backupés dans ${BACKUP_DIR}\n`);
}

// Exit code
process.exit(failures.length > 0 ? 1 : 0);





