#!/usr/bin/env node

/**
 * Script pour corriger les liens satellites cassés
 * 
 * Problème : Les guides contiennent des liens vers /blog/{catégorie}/satellites/{slug}
 * Mais les satellites sont dans /blog/{catégorie-mappée}/{slug}/
 * 
 * Solution : Lire frontmatter de chaque satellite, appliquer CATEGORY_MAPPING, corriger les liens
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
  'piliers': 'general',
  'satellites': 'conseils',
};

// Fonction pour obtenir la vraie catégorie URL d'un satellite
function getSatelliteCategory(slug) {
  const satellitePath = path.join(root, 'content/blog/satellites', `${slug}.md`);
  
  if (!fs.existsSync(satellitePath)) {
    return null;
  }
  
  const fileContent = fs.readFileSync(satellitePath, 'utf-8');
  const { data } = matter(fileContent);
  
  const category = data.category || 'conseils';
  
  // Si catégorie finit par -nice, utiliser telle quelle (pas de mapping)
  // Car CATEGORY_MAPPING ne contient pas les catégories avec -nice
  if (category.endsWith('-nice')) {
    return category;
  }
  
  // Sinon, appliquer le mapping
  const mappedCategory = CATEGORY_MAPPING[category] || category;
  return mappedCategory;
}

// Fonction pour corriger un lien
function correctLink(match, categoryPath, slug) {
  const cleanCategory = categoryPath.replace(/\/$/, '');
  const cleanSlug = slug.replace(/\/$/, '');
  
  // Obtenir la vraie catégorie du satellite
  const realCategory = getSatelliteCategory(cleanSlug);
  
  if (!realCategory) {
    console.warn(`⚠️  Satellite non trouvé: ${cleanSlug}`);
    return match; // Garder le lien original si satellite introuvable
  }
  
  const correctUrl = `/blog/${realCategory}/${cleanSlug}/`;
  return `](${correctUrl})`;
}

// Fonction principale
function fixSatelliteLinks(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  // Pattern: ](/blog/{catégorie}/satellites/{slug})
  const pattern = /\]\(\/blog\/([^/]+)\/satellites\/([^/)]+)\)/g;
  
  const newContent = content.replace(pattern, (match, category, slug) => {
    const corrected = correctLink(match, category, slug);
    if (corrected !== match) {
      modified = true;
      console.log(`  ${category}/satellites/${slug} → corrigé`);
    }
    return corrected;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    return true;
  }
  
  return false;
}

// Main
console.log('🔧 Correction des liens satellites...\n');

const blogDir = path.join(root, 'content/blog');
const files = [];
const categories = fs.readdirSync(blogDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== 'satellites' && !dirent.name.includes('backup'));

for (const catDir of categories) {
  const catPath = path.join(blogDir, catDir.name);
  const mdFiles = fs.readdirSync(catPath, { recursive: true })
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(catPath, f));
  
  files.push(...mdFiles);
}

let fixed = 0;
for (const file of files) {
  if (fixSatelliteLinks(file)) {
    fixed++;
  }
}

console.log(`\n✅ ${fixed} fichiers corrigés`);

