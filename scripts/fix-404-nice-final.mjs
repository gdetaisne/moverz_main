#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const CITY = 'nice';
const contentPath = path.join(rootDir, 'sites', CITY, 'content', 'blog');

console.log(`🔧 CORRECTION FINALE DES 404 - NICE`);
console.log(`============================================================\n`);

// Mapping des catégories (aligné avec lib/blog.ts)
const categoryMapping = {
  'aide-demenagement-nice': 'aide',
  'demenagement-entreprise-nice': 'entreprise',
  'demenagement-international-nice': 'international',
  'demenagement-pas-cher-nice': 'pas-cher',
  'demenagement-piano-nice': 'piano',
  'demenageur-nice': 'demenageur',
  'garde-meuble-nice': 'garde-meuble',
  'location-camion-demenagement-nice': 'location-camion',
  'petit-demenagement-nice': 'petit',
  'prix-demenagement-nice': 'prix',
};

// Patterns de correction
const corrections = [];

// 1. Corriger les liens vers satellites : /blog/{categorie-nice}/satellites/{slug} → /blog/conseils/{slug}
for (const [folderName, cleanCat] of Object.entries(categoryMapping)) {
  corrections.push({
    pattern: new RegExp(`\\(/blog/${folderName}/satellites/([^)]+)\\)`, 'g'),
    replacement: '(/blog/conseils/$1)',
    description: `${folderName}/satellites/* → conseils/*`
  });
}

// 2. Corriger les liens directs : /blog/{categorie-nice}/{slug} → /blog/{categorie-clean}/{slug}
for (const [folderName, cleanCat] of Object.entries(categoryMapping)) {
  corrections.push({
    pattern: new RegExp(`\\(/blog/${folderName}/([^/\\)]+)\\)`, 'g'),
    replacement: `(/blog/${cleanCat}/$1)`,
    description: `${folderName}/* → ${cleanCat}/*`
  });
}

// Fonction pour corriger un fichier
function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fixCount = 0;

  for (const correction of corrections) {
    const matches = content.match(correction.pattern);
    if (matches) {
      content = content.replace(correction.pattern, correction.replacement);
      modified = true;
      fixCount += matches.length;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return fixCount;
  }

  return 0;
}

// Scanner tous les fichiers markdown
function scanAndFix(dir) {
  const stats = {
    filesScanned: 0,
    filesModified: 0,
    linksFixed: 0
  };

  function scan(directory) {
    const items = fs.readdirSync(directory, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(directory, item.name);

      if (item.isDirectory()) {
        scan(fullPath);
      } else if (item.isFile() && item.name.endsWith('.md') && item.name !== 'README.md') {
        stats.filesScanned++;
        const fixCount = fixFile(fullPath);

        if (fixCount > 0) {
          stats.filesModified++;
          stats.linksFixed += fixCount;
          console.log(`✅ ${item.name}: ${fixCount} liens corrigés`);
        }
      }
    }
  }

  scan(dir);
  return stats;
}

// Exécuter la correction
const stats = scanAndFix(contentPath);

console.log(`\n${'='.repeat(60)}`);
console.log(`📈 RÉSULTATS`);
console.log(`${'='.repeat(60)}`);
console.log(`📄 Fichiers scannés : ${stats.filesScanned}`);
console.log(`✅ Fichiers modifiés : ${stats.filesModified}`);
console.log(`🔗 Liens corrigés : ${stats.linksFixed}`);
console.log(`\n🎯 Relancer l'analyse pour vérifier :`);
console.log(`   node scripts/analyze-404.mjs`);

