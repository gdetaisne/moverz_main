#!/usr/bin/env node

/**
 * Script pour corriger les liens internes dans les articles blog Lyon
 * Remplace les URLs avec noms de dossiers complets par les cleanCategory
 * 
 * Exemple:
 * /blog/demenagement-lyon-pas-cher/... → /blog/pas-cher/...
 * /blog/prix-demenagement-lyon/... → /blog/prix/...
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../');

// CATEGORY_MAPPING (copié de lib/blog.ts)
const CATEGORY_MAPPING = {
  'déménagement-economique': 'pas-cher',
  'demenagement-economique': 'pas-cher',
  'demenagement-etudiant': 'etudiant',
  'demenagement-entreprise': 'entreprise', 
  'demenagement-piano': 'piano',
  'demenagement-international': 'international',
  'demenagement-longue-distance': 'longue-distance',
  'demenagement-pas-cher': 'pas-cher',
  'demenagement-urgent': 'urgent',
  'devis-demenagement': 'devis',
  'garde-meuble': 'garde-meuble',
  'prix-demenagement': 'prix',
  'prix-demenagement-lyon': 'prix',
  'demenagement-lyon-pas-cher': 'pas-cher',
  'demenagement-etudiant-lyon': 'etudiant',
  'demenagement-entreprise-lyon': 'entreprise',
  'demenagement-piano-lyon': 'piano',
  'demenagement-international-lyon': 'international',
  'demenagement-petit-volume-lyon': 'petit-volume',
  'demenageur-lyon': 'demenageur',
  'garde-meuble-lyon': 'garde-meuble',
  'location-camion-demenagement-lyon': 'location-camion',
  'aide-au-demenagement-lyon': 'aide',
  'piliers': 'general',
  'satellites': 'conseils',
};

// Fonction pour nettoyer le slug (simplifiée)
function cleanSlugFunction(originalSlug) {
  let cleaned = originalSlug;
  cleaned = cleaned.replace(/-guide-complet$/, '-guide');
  cleaned = cleaned.replace(/-reperes-2025$/, '');
  return cleaned;
}

// Récupérer tous les articles existants avec leurs URLs réelles
function getAllArticleUrls() {
  const blogDirectory = path.join(root, 'content/blog');
  const articles = new Map();
  
  const categories = fs.readdirSync(blogDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  categories.forEach(categoryFolder => {
    const categoryPath = path.join(blogDirectory, categoryFolder);
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md') && file !== 'README.md');

    files.forEach(file => {
      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      const originalSlug = data.slug || file.replace('.md', '');
      const cleanCategory = CATEGORY_MAPPING[categoryFolder] || categoryFolder;
      const cleanedSlug = cleanSlugFunction(originalSlug);
      
      // URL réelle générée par Next.js
      const realUrl = `/blog/${cleanCategory}/${cleanedSlug}`;
      
      // URLs incorrectes possibles (avec nom de dossier complet)
      const wrongUrls = [
        `/blog/${categoryFolder}/${originalSlug}`,
        `/blog/${categoryFolder}/${cleanedSlug}`,
      ];
      
      wrongUrls.forEach(wrongUrl => {
        articles.set(wrongUrl, realUrl);
      });
    });
  });
  
  return articles;
}

// Corriger les liens dans un fichier
function fixLinksInFile(filePath, urlMapping) {
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = content;
  let changes = 0;
  
  // Pattern pour trouver les liens markdown [/blog/...]
  const linkPattern = /\[([^\]]+)\]\((\/blog\/[^\)]+)\)/g;
  
  const matches = [...content.matchAll(linkPattern)];
  
  matches.forEach(match => {
    const fullMatch = match[0];
    const linkText = match[1];
    const linkUrl = match[2];
    
    // Vérifier si cette URL existe dans le mapping
    if (urlMapping.has(linkUrl)) {
      const correctUrl = urlMapping.get(linkUrl);
      const newLink = `[${linkText}](${correctUrl})`;
      modified = modified.replace(fullMatch, newLink);
      changes++;
      console.log(`  ✅ ${linkUrl} → ${correctUrl}`);
    }
  });
  
  return { modified, changes };
}

// Main
console.log('🔧 Correction des liens internes blog Lyon\n');

const urlMapping = getAllArticleUrls();
console.log(`📊 ${urlMapping.size} URLs mappées\n`);

const blogDirectory = path.join(root, 'content/blog');
const categories = fs.readdirSync(blogDirectory, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let totalChanges = 0;
let filesModified = 0;

categories.forEach(category => {
  const categoryPath = path.join(blogDirectory, category);
  const files = fs.readdirSync(categoryPath)
    .filter(file => file.endsWith('.md') && file !== 'README.md');

  files.forEach(file => {
    const filePath = path.join(categoryPath, file);
    const { modified, changes } = fixLinksInFile(filePath, urlMapping);
    
    if (changes > 0) {
      fs.writeFileSync(filePath, modified, 'utf8');
      totalChanges += changes;
      filesModified++;
      console.log(`📝 ${file}: ${changes} lien(s) corrigé(s)`);
    }
  });
});

console.log(`\n✅ ${filesModified} fichiers modifiés, ${totalChanges} liens corrigés`);

