#!/usr/bin/env node

/**
 * Correction FORCÉE de tous les 404s Nantes
 * Remplace TOUS les liens vers les slugs connus par leurs vraies URLs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../');

// Charger le mapping
const mappingPath = path.join(__dirname, 'blog-url-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Construire les corrections slug → URL correcte
const slugCorrections = {};
Object.entries(mapping).forEach(([slug, data]) => {
  const correctUrl = data.url.replace(/\/$/, ''); // Sans trailing slash
  slugCorrections[slug] = correctUrl;
});

console.log(`📚 ${Object.keys(slugCorrections).length} articles dans le mapping\n`);

let totalCorrections = 0;
let filesModified = 0;

function fixLinksInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fileCorrections = 0;
  
  // Pour chaque slug connu, chercher TOUS les liens qui y pointent
  Object.entries(slugCorrections).forEach(([slug, correctUrl]) => {
    // Pattern : ](/blog/{n'importe-quelle-catégorie}/{slug})
    // On cherche le slug sans se préoccuper de la catégorie
    const patterns = [
      new RegExp(`\\]\\(/blog/[^/]+/${slug}\\)`, 'g'),  // Avec catégorie
      new RegExp(`\\]\\(/blog/[^/]+/${slug}/\\)`, 'g'), // Avec catégorie + trailing slash
    ];
    
    patterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, `](${correctUrl})`);
        fileCorrections += matches.length;
        modified = true;
      }
    });
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
    totalCorrections += fileCorrections;
    console.log(`✅ ${path.relative(root, filePath)}: ${fileCorrections} corrections`);
  }
  
  return modified;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.md') && file !== 'README.md') {
      fixLinksInFile(filePath);
    }
  });
}

console.log('🔧 Correction FORCÉE de tous les liens...\n');
const blogDir = path.join(root, 'content/blog');
walkDir(blogDir);

console.log(`\n✅ Terminé!`);
console.log(`📝 ${filesModified} fichiers modifiés`);
console.log(`🔗 ${totalCorrections} liens corrigés`);

