#!/usr/bin/env node

/**
 * Correction avancée des 404s Nantes
 * Corrige les liens avec mauvaises catégories basé sur le mapping complet
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../');

// Charger le mapping
const mappingPath = path.join(__dirname, 'blog-url-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Construire un index slug → URL
const slugToUrl = {};
Object.entries(mapping).forEach(([slug, data]) => {
  slugToUrl[slug] = data.url.replace(/\/$/, ''); // Sans trailing slash pour markdown
});

console.log(`📚 ${Object.keys(slugToUrl).length} articles dans le mapping\n`);

// Analyser les liens cassés et trouver les corrections
const corrections = [];
let totalCorrections = 0;
let filesModified = 0;

function fixLinksInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fileCorrections = 0;
  
  // Pattern : ](/blog/{category}/{slug})
  const linkPattern = /\]\(\/blog\/([^/]+)\/([^)]+)\)/g;
  
  content = content.replace(linkPattern, (match, category, slugWithMaybeSlash) => {
    const slug = slugWithMaybeSlash.replace(/\/$/, ''); // Retirer trailing slash si présent
    
    // Vérifier si ce slug existe dans notre mapping
    if (slugToUrl[slug]) {
      const correctUrl = slugToUrl[slug];
      const currentUrl = `/blog/${category}/${slug}`;
      
      // Si l'URL actuelle est différente de la correcte
      if (currentUrl !== correctUrl) {
        fileCorrections++;
        return `](${correctUrl})`;
      }
    }
    
    return match; // Pas de changement
  });
  
  if (fileCorrections > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
    totalCorrections += fileCorrections;
    console.log(`✅ ${path.relative(root, filePath)}: ${fileCorrections} corrections`);
    modified = true;
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

console.log('🔍 Recherche et correction des liens...\n');
const blogDir = path.join(root, 'content/blog');
walkDir(blogDir);

console.log(`\n✅ Terminé!`);
console.log(`📝 ${filesModified} fichiers modifiés`);
console.log(`🔗 ${totalCorrections} liens corrigés`);

