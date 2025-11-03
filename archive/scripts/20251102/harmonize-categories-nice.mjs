#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const CITY = 'nice';
const contentPath = path.join(rootDir, 'sites', CITY, 'content', 'blog');

console.log(`🔧 HARMONISATION CATÉGORIES - NICE`);
console.log(`============================================================\n`);

// Mapping vers format standard (court, sans -nice)
const categoryStandardization = {
  // Formats longs → courts
  'aide-demenagement-nice': 'aide-demenagement',
  'demenagement-entreprise-nice': 'demenagement-entreprise',
  'demenagement-international-nice': 'demenagement-international',
  'demenagement-pas-cher-nice': 'demenagement-pas-cher',
  'demenagement-piano-nice': 'demenagement-piano',
  'demenageur-nice': 'demenageur',
  'garde-meuble-nice': 'garde-meuble',
  'location-camion-demenagement-nice': 'location-camion',
  'location-camion-nice': 'location-camion',
  'petit-demenagement-nice': 'petit-demenagement',
  'petit-nice': 'petit-demenagement',
  'prix-demenagement-nice': 'prix-demenagement',
  'demenagement-nice': 'demenagement-general',  // Catégorie générique
  
  // Garder les formats courts (déjà OK)
  'aide-demenagement': 'aide-demenagement',
  'demenagement-entreprise': 'demenagement-entreprise',
  'demenagement-piano': 'demenagement-piano',
  'demenagement-international': 'demenagement-international',
  'demenagement-pas-cher': 'demenagement-pas-cher',
  'garde-meuble': 'garde-meuble',
  'location-camion': 'location-camion',
  'petit-demenagement': 'petit-demenagement',
  'prix-demenagement': 'prix-demenagement',
  'demenagement-objets-fragiles': 'demenagement-objets-fragiles',
  'demenagement-longue-distance': 'demenagement-longue-distance',
  'demenagement-local': 'demenagement-local',
};

// Fonction pour mettre à jour le frontmatter d'un fichier
function harmonizeCategoryInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extraire le frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return { updated: false, oldCategory: null, newCategory: null };
  }
  
  const frontmatter = frontmatterMatch[1];
  const categoryMatch = frontmatter.match(/^category:\s*["']?([^"'\n]+)["']?$/m);
  
  if (!categoryMatch) {
    return { updated: false, oldCategory: null, newCategory: null };
  }
  
  const oldCategory = categoryMatch[1].trim();
  const newCategory = categoryStandardization[oldCategory];
  
  if (!newCategory || oldCategory === newCategory) {
    return { updated: false, oldCategory, newCategory: oldCategory };
  }
  
  // Remplacer la catégorie
  const newContent = content.replace(
    new RegExp(`^category:\\s*["']?${oldCategory}["']?$`, 'm'),
    `category: "${newCategory}"`
  );
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  
  return { updated: true, oldCategory, newCategory };
}

// Scanner tous les fichiers
function harmonizeAllCategories(dir) {
  const stats = {
    filesScanned: 0,
    filesUpdated: 0,
    categoriesChanged: {}
  };

  function scan(directory) {
    const items = fs.readdirSync(directory, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(directory, item.name);

      if (item.isDirectory()) {
        scan(fullPath);
      } else if (item.isFile() && item.name.endsWith('.md') && item.name !== 'README.md') {
        stats.filesScanned++;
        const result = harmonizeCategoryInFile(fullPath);

        if (result.updated) {
          stats.filesUpdated++;
          const key = `${result.oldCategory} → ${result.newCategory}`;
          stats.categoriesChanged[key] = (stats.categoriesChanged[key] || 0) + 1;
          console.log(`✅ ${item.name}: ${result.oldCategory} → ${result.newCategory}`);
        }
      }
    }
  }

  scan(dir);
  return stats;
}

// Exécuter l'harmonisation
const stats = harmonizeAllCategories(contentPath);

console.log(`\n${'='.repeat(60)}`);
console.log(`📈 RÉSULTATS`);
console.log(`${'='.repeat(60)}`);
console.log(`📄 Fichiers scannés : ${stats.filesScanned}`);
console.log(`✅ Fichiers mis à jour : ${stats.filesUpdated}`);

console.log(`\n📊 Changements par catégorie :`);
Object.entries(stats.categoriesChanged)
  .sort((a, b) => b[1] - a[1])
  .forEach(([change, count]) => {
    console.log(`   ${change} (${count} fichiers)`);
  });

console.log(`\n🎯 Tester dans le navigateur :`);
console.log(`   http://localhost:3027/blog`);
console.log(`\n🔍 Relancer l'analyse 404 :`);
console.log(`   node scripts/analyze-404.mjs`);

