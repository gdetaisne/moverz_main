#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const CITY = 'nice';
const contentPath = path.join(rootDir, 'sites', CITY, 'content', 'blog');

console.log(`🔧 CORRECTION LIENS GUIDES PILIERS - NICE`);
console.log(`============================================================\n`);

// Charger tous les articles avec leurs vraies catégories
function loadAllArticlesWithCategories() {
  const articlesMap = new Map(); // slug → category

  function scan(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        scan(fullPath);
      } else if (item.isFile() && item.name.endsWith('.md') && item.name !== 'README.md') {
        const content = fs.readFileSync(fullPath, 'utf8');
        const categoryMatch = content.match(/^category:\s*["']?([^"'\n]+)["']?$/m);
        
        if (categoryMatch) {
          const category = categoryMatch[1].trim();
          const slug = item.name.replace('.md', '').replace(/-guide-complet$/, '-guide');
          articlesMap.set(slug, category);
        }
      }
    }
  }

  scan(contentPath);
  return articlesMap;
}

const articlesMap = loadAllArticlesWithCategories();
console.log(`✓ ${articlesMap.size} articles chargés avec leurs catégories\n`);

// Fonction pour corriger les liens dans un fichier
function fixLinksInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fixCount = 0;

  // Trouver tous les liens vers /blog/demenagement-nice/{slug}
  const linkPattern = /\]\(\/blog\/demenagement-nice\/([^)]+)\)/g;
  const matches = [...content.matchAll(linkPattern)];

  for (const match of matches) {
    const slug = match[1];
    const category = articlesMap.get(slug);

    if (category) {
      const oldLink = `/blog/demenagement-nice/${slug}`;
      const newLink = `/blog/${category}/${slug}`;
      
      content = content.replace(
        new RegExp(`\\]\\(\\/blog\\/demenagement-nice\\/${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'),
        `](${newLink})`
      );
      
      modified = true;
      fixCount++;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return fixCount;
  }

  return 0;
}

// Scanner tous les fichiers
function fixAllLinks() {
  const stats = {
    filesScanned: 0,
    filesModified: 0,
    linksFixed: 0
  };

  function scan(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        scan(fullPath);
      } else if (item.isFile() && item.name.endsWith('.md') && item.name !== 'README.md') {
        stats.filesScanned++;
        const fixCount = fixLinksInFile(fullPath);

        if (fixCount > 0) {
          stats.filesModified++;
          stats.linksFixed += fixCount;
          console.log(`✅ ${item.name}: ${fixCount} liens corrigés`);
        }
      }
    }
  }

  scan(contentPath);
  return stats;
}

// Exécuter la correction
const stats = fixAllLinks();

console.log(`\n${'='.repeat(60)}`);
console.log(`📈 RÉSULTATS`);
console.log(`${'='.repeat(60)}`);
console.log(`📄 Fichiers scannés : ${stats.filesScanned}`);
console.log(`✅ Fichiers modifiés : ${stats.filesModified}`);
console.log(`🔗 Liens corrigés : ${stats.linksFixed}`);
console.log(`\n🎯 Relancer l'analyse 404 :`);
console.log(`   node scripts/analyze-404.mjs`);

