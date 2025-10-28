#!/usr/bin/env node

// PHASE 2 - OPTION B : Corriger catégories incorrectes
// Durée : 4-6 heures
// Impact : Résout ~153 URLs (catégories incorrectes)

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_PATH = path.join(__dirname, '..');

const VERIFICATION_FILE = path.join(BASE_PATH, 'VERIFICATION-ARTICLES.json');

console.log('🔧 PHASE 2 : Correction catégories incorrectes');
console.log('================================================\n');

// Charger les résultats de vérification
let verificationData;
try {
  const raw = fs.readFileSync(VERIFICATION_FILE, 'utf8');
  verificationData = JSON.parse(raw);
} catch (error) {
  console.error(`❌ Erreur lecture ${VERIFICATION_FILE}:`, error.message);
  process.exit(1);
}

const categoryIncorrecte = verificationData.results?.categoryIncorrecte || [];
console.log(`📊 Nombre d'URLs avec catégorie incorrecte : ${categoryIncorrecte.length}\n`);

if (categoryIncorrecte.length === 0) {
  console.log('✅ Aucune catégorie incorrecte à corriger !');
  process.exit(0);
}

// Backup timestamp
const backupDir = path.join(BASE_PATH, 'backups', `categories-${new Date().toISOString().replace(/[:.]/g, '-')}`);
fs.mkdirSync(backupDir, { recursive: true });
console.log(`📦 Backups dans : ${backupDir}\n`);

// Statistiques
let stats = {
  totalToFix: categoryIncorrecte.length,
  filesScanned: 0,
  filesModified: 0,
  linksFixed: 0,
  errors: []
};

// Fonction pour trouver tous les fichiers markdown d'une ville
function getAllMarkdownFiles(city) {
  const blogPath = path.join(BASE_PATH, 'sites', city, 'content', 'blog');
  const files = [];
  
  if (!fs.existsSync(blogPath)) {
    return files;
  }
  
  function scanDir(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        scanDir(fullPath);
      } else if (item.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  
  scanDir(blogPath);
  return files;
}

// Fonction pour remplacer un lien dans un fichier
function replaceLinkInFile(filePath, oldUrl, newUrl) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Pattern pour matcher les liens markdown
    // [texte](/blog/old-category/slug) -> [texte](/blog/new-category/slug)
    const escapedOldUrl = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const linkPattern = new RegExp(`\\[([^\\]]+)\\]\\(${escapedOldUrl}\\)`, 'g');
    
    const matches = content.match(linkPattern);
    if (!matches) {
      return 0; // Pas de lien trouvé
    }
    
    // Remplacer tous les liens
    content = content.replace(linkPattern, `[$1](${newUrl})`);
    
    if (content !== originalContent) {
      // Backup du fichier
      const relativePath = path.relative(BASE_PATH, filePath);
      const backupPath = path.join(backupDir, relativePath);
      const backupPathDir = path.dirname(backupPath);
      fs.mkdirSync(backupPathDir, { recursive: true });
      fs.writeFileSync(backupPath, originalContent, 'utf8');
      
      // Écrire le nouveau contenu
      fs.writeFileSync(filePath, content, 'utf8');
      
      return matches.length;
    }
    
    return 0;
  } catch (error) {
    stats.errors.push({ file: filePath, error: error.message });
    return 0;
  }
}

// Traiter chaque lien avec catégorie incorrecte
console.log('🔄 Début des corrections...\n');

for (const item of categoryIncorrecte) {
  const { url, city, sourceFile, result } = item;
  const { requestedCategory, actualCategory } = result;
  
  // Extraire le slug de l'URL
  const urlParts = url.split('/').filter(p => p);
  const slug = urlParts[urlParts.length - 1];
  
  console.log(`📍 ${city.toUpperCase()} : ${url}`);
  console.log(`   Catégorie incorrecte : ${requestedCategory}`);
  console.log(`   Catégorie réelle     : ${actualCategory}`);
  
  // Construire la bonne URL
  const correctUrl = `/blog/${actualCategory}/${slug}`;
  console.log(`   Correction           : ${correctUrl}`);
  
  // Trouver tous les fichiers markdown de cette ville
  const markdownFiles = getAllMarkdownFiles(city);
  stats.filesScanned += markdownFiles.length;
  
  let linksFixedForThisUrl = 0;
  
  // Chercher et remplacer dans chaque fichier
  for (const file of markdownFiles) {
    const fixedCount = replaceLinkInFile(file, url, correctUrl);
    if (fixedCount > 0) {
      stats.filesModified++;
      linksFixedForThisUrl += fixedCount;
      console.log(`   ✅ ${path.relative(BASE_PATH, file)} : ${fixedCount} lien(s) corrigé(s)`);
    }
  }
  
  stats.linksFixed += linksFixedForThisUrl;
  
  if (linksFixedForThisUrl === 0) {
    console.log(`   ⚠️  Aucun fichier ne contient ce lien`);
  }
  
  console.log('');
}

// Résumé
console.log('\n================================================');
console.log('✅ PHASE 2 TERMINÉE\n');
console.log('📊 Statistiques :');
console.log(`   • URLs à corriger      : ${stats.totalToFix}`);
console.log(`   • Fichiers scannés     : ${stats.filesScanned}`);
console.log(`   • Fichiers modifiés    : ${stats.filesModified}`);
console.log(`   • Liens corrigés       : ${stats.linksFixed}`);
console.log(`   • Erreurs              : ${stats.errors.length}`);

if (stats.errors.length > 0) {
  console.log('\n⚠️  Erreurs rencontrées :');
  stats.errors.forEach(err => {
    console.log(`   • ${err.file} : ${err.error}`);
  });
}

console.log(`\n📦 Backups : ${backupDir}`);
console.log('\n🔄 Prochaines étapes :');
console.log('   1. Re-run l\'analyse : node scripts/analyze-404.mjs');
console.log('   2. Vérifier manuellement quelques corrections');
console.log('   3. Passer à Phase 3');

console.log('\n💡 Rollback si besoin :');
console.log(`   cp -r ${backupDir}/* ${BASE_PATH}/`);
console.log('');

// Sauvegarder les stats
const statsFile = path.join(BASE_PATH, 'PHASE-2-STATS.json');
fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
console.log(`📄 Stats sauvegardées : ${statsFile}\n`);

