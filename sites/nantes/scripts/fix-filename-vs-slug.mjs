#!/usr/bin/env node

/**
 * Correction des liens basés sur noms de fichiers
 * Certains liens utilisent le nom du fichier au lieu du slug frontmatter
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../');

// Charger le mapping
const mappingPath = path.join(__dirname, 'blog-url-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Construire le mapping fileName → correct URL
const corrections = {};

Object.values(mapping).forEach(item => {
  if (item.fileName && item.fileName !== item.originalSlug) {
    // Le nom de fichier est différent du slug frontmatter
    const correctUrl = item.url.replace(/\/$/, ''); // Sans trailing slash
    corrections[item.fileName] = correctUrl;
  }
});

console.log(`📝 ${Object.keys(corrections).length} fichiers avec nom ≠ slug\n`);
console.log('Corrections à appliquer:\n');
Object.entries(corrections).slice(0, 10).forEach(([fileName, url]) => {
  console.log(`  ${fileName} → ${url}`);
});

if (Object.keys(corrections).length > 10) {
  console.log(`  ... et ${Object.keys(corrections).length - 10} autres`);
}

// Parcourir tous les fichiers
const blogDir = path.join(root, 'content/blog');
let totalCorrections = 0;
let filesModified = 0;

function fixLinksInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fileCorrections = 0;
  
  Object.entries(corrections).forEach(([fileName, correctUrl]) => {
    // Chercher les liens qui utilisent le nom de fichier
    // Pattern : ](/blog/{category}/{fileName})
    const patterns = [
      new RegExp(`\\]\\(/blog/[^/]+/${fileName}\\)`, 'g'),
      new RegExp(`\\]\\(/blog/[^/]+/${fileName}/\\)`, 'g'),
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
    console.log(`\n✅ ${path.relative(root, filePath)}: ${fileCorrections} corrections`);
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

console.log('\n🔧 Correction des liens...\n');
walkDir(blogDir);

console.log(`\n✅ Terminé!`);
console.log(`📝 ${filesModified} fichiers modifiés`);
console.log(`🔗 ${totalCorrections} liens corrigés`);

