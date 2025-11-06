#!/usr/bin/env node

/**
 * Script CIBLÉ pour corriger les liens internes blog de LYON UNIQUEMENT
 * 
 * CONTEXTE :
 * - Lyon utilise priorité DOSSIER (commit a5219c1d toujours actif)
 * - Mapping : aide-au-demenagement-lyon → aide, demenagement-piano-lyon → piano, etc.
 * - Le revert ca2d8e4c a remis les anciens liens (cassés pour Lyon)
 * 
 * OBJECTIF :
 * - Corriger les liens internes de Lyon pour correspondre à sa nouvelle logique
 * - UNIQUEMENT Lyon, ne pas toucher aux autres sites
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '../../');

// Mapping basé sur lib/blog.ts de Lyon
const LYON_CATEGORY_MAPPING = {
  'aide-au-demenagement-lyon': 'aide',
  'aide-demenagement-lyon': 'aide',
  'demenagement-entreprise-lyon': 'entreprise',
  'demenagement-international-lyon': 'international',
  'demenagement-lyon-pas-cher': 'pas-cher',
  'demenagement-petit-volume-lyon': 'petit-volume',
  'demenagement-piano-lyon': 'piano',
  'demenageur-lyon': 'demenageur',
  'garde-meuble-lyon': 'garde-meuble',
  'location-camion-demenagement-lyon': 'location-camion',
  'prix-demenagement-lyon': 'prix',
  'satellites': 'conseils',
};

// Générer l'index des articles réels de Lyon
function generateLyonArticlesIndex() {
  const blogDir = path.join(rootDir, 'sites/lyon/content/blog');
  const articlesIndex = new Map(); // slug → { category, cleanCategory, url }
  
  const categories = fs.readdirSync(blogDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  categories.forEach(categoryFolder => {
    const categoryPath = path.join(blogDir, categoryFolder);
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md') && file !== 'README.md');
    
    files.forEach(file => {
      const slug = file.replace('.md', '');
      const cleanCategory = LYON_CATEGORY_MAPPING[categoryFolder] || categoryFolder;
      const url = `/blog/${cleanCategory}/${slug}`;
      
      articlesIndex.set(slug, { 
        categoryFolder, 
        cleanCategory, 
        url 
      });
    });
  });
  
  return articlesIndex;
}

// Corriger les liens dans un fichier
function fixLinksInFile(filePath, articlesIndex) {
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = content;
  let changes = 0;
  const corrections = [];
  
  // Pattern pour trouver les liens markdown vers /blog/
  const linkPattern = /\[([^\]]+)\]\((\/blog\/[^\)]+)\)/g;
  
  const matches = [...content.matchAll(linkPattern)];
  
  matches.forEach(match => {
    const fullMatch = match[0];
    const linkText = match[1];
    let linkUrl = match[2];
    
    // Retirer trailing slash pour analyse
    const linkUrlNoSlash = linkUrl.replace(/\/$/, '');
    
    // Extraire catégorie et slug du lien
    const urlMatch = linkUrlNoSlash.match(/\/blog\/([^/]+)\/(.+)$/);
    if (!urlMatch) return;
    
    const [, categoryInLink, slugInLink] = urlMatch;
    
    // Si la catégorie est une ancienne catégorie longue, corriger
    if (LYON_CATEGORY_MAPPING[categoryInLink]) {
      const correctCategory = LYON_CATEGORY_MAPPING[categoryInLink];
      
      // Vérifier que l'article existe
      if (articlesIndex.has(slugInLink)) {
        const article = articlesIndex.get(slugInLink);
        const correctUrl = article.url;
        
        // Si le lien pointe vers la mauvaise catégorie, corriger
        if (`/blog/${categoryInLink}/${slugInLink}` !== correctUrl) {
          const newLink = `[${linkText}](${correctUrl})`;
          modified = modified.replace(fullMatch, newLink);
          changes++;
          corrections.push({ 
            old: linkUrl, 
            new: correctUrl,
            reason: `Category mapping: ${categoryInLink} → ${correctCategory}`
          });
        }
      } else {
        // Article n'existe pas, corriger quand même la catégorie (au cas où)
        const correctUrl = `/blog/${correctCategory}/${slugInLink}`;
        if (`/blog/${categoryInLink}/${slugInLink}` !== correctUrl) {
          const newLink = `[${linkText}](${correctUrl})`;
          modified = modified.replace(fullMatch, newLink);
          changes++;
          corrections.push({ 
            old: linkUrl, 
            new: correctUrl,
            reason: `Category mapping (article non trouvé): ${categoryInLink} → ${correctCategory}`
          });
        }
      }
    }
  });
  
  return { modified, changes, corrections };
}

// Main
console.log('🔧 Correction des liens internes blog LYON UNIQUEMENT\n');

const articlesIndex = generateLyonArticlesIndex();
console.log(`📊 ${articlesIndex.size} articles indexés sur Lyon\n`);

const blogDir = path.join(rootDir, 'sites/lyon/content/blog');
const categories = fs.readdirSync(blogDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let totalFilesFixed = 0;
let totalLinksFixed = 0;
const allCorrections = [];

categories.forEach(category => {
  const categoryPath = path.join(blogDir, category);
  const files = fs.readdirSync(categoryPath)
    .filter(file => file.endsWith('.md') && file !== 'README.md');
  
  files.forEach(file => {
    const filePath = path.join(categoryPath, file);
    const { modified, changes, corrections } = fixLinksInFile(filePath, articlesIndex);
    
    if (changes > 0) {
      fs.writeFileSync(filePath, modified, 'utf8');
      totalFilesFixed++;
      totalLinksFixed += changes;
      allCorrections.push(...corrections);
      
      console.log(`✏️  ${category}/${file}: ${changes} lien(s) corrigé(s)`);
      corrections.slice(0, 2).forEach(c => {
        console.log(`   ${c.old} → ${c.new}`);
      });
      if (corrections.length > 2) {
        console.log(`   ... et ${corrections.length - 2} autres`);
      }
    }
  });
});

console.log(`\n${'='.repeat(60)}`);
console.log(`✅ RÉSUMÉ :`);
console.log(`   Fichiers modifiés: ${totalFilesFixed}`);
console.log(`   Liens corrigés: ${totalLinksFixed}`);

if (totalLinksFixed > 0) {
  console.log(`\n📋 Exemples de corrections :`);
  allCorrections.slice(0, 10).forEach(c => {
    console.log(`   ${c.old}`);
    console.log(`   → ${c.new}`);
    console.log(`   (${c.reason})\n`);
  });
}

console.log(`\n🎯 Prochaines étapes :`);
console.log(`   1. Review les changements : git diff sites/lyon/content/blog/`);
console.log(`   2. Test : vérifier quelques URLs sur lyon local`);
console.log(`   3. Commit + push si OK`);

