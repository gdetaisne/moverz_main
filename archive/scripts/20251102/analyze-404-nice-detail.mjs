#!/usr/bin/env node

/**
 * Analyse détaillée des 404 restants pour Nice
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const blogDir = join(__dirname, '../sites/nice/content/blog');

// Catégories valides
const validCategories = [
  'aide-demenagement',
  'demenagement-entreprise',
  'demenagement-general',
  'demenagement-international',
  'demenagement-pas-cher',
  'demenagement-piano',
  'demenageur',
  'garde-meuble',
  'location-camion',
  'petit-demenagement',
  'prix-demenagement',
];

function getAllMarkdownFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function getAllSlugs() {
  const allFiles = getAllMarkdownFiles(blogDir);
  return allFiles.map(file => {
    const slug = file.split('/').pop().replace('.md', '');
    return slug;
  });
}

function analyzeFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const relativePath = filePath.replace(blogDir + '/', '');
  const errors = [];
  
  // Regex pour extraire les liens
  const linkRegex = /\[([^\]]+)\]\((\/blog\/[^)]+)\)/g;
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const text = match[1];
    const url = match[2];
    
    // Extraire category et slug
    const parts = url.split('/').filter(p => p);
    if (parts.length < 3) continue; // /blog/{category}/{slug} minimum
    
    const category = parts[1];
    const slug = parts[parts.length - 1];
    
    // Vérifier si la catégorie est valide
    if (!validCategories.includes(category)) {
      errors.push({
        type: 'CATEGORIE_INVALIDE',
        url,
        text,
        category,
        slug,
        file: relativePath
      });
      continue;
    }
    
    // Vérifier si le slug existe
    const allSlugs = getAllSlugs();
    if (!allSlugs.includes(slug)) {
      errors.push({
        type: 'ARTICLE_MANQUANT',
        url,
        text,
        category,
        slug,
        file: relativePath
      });
    }
  }
  
  return errors;
}

function main() {
  console.log(`\n🔍 ANALYSE DÉTAILLÉE DES 404 NICE\n${'='.repeat(60)}\n`);
  
  const allFiles = getAllMarkdownFiles(blogDir);
  console.log(`📄 ${allFiles.length} fichiers à analyser\n`);
  
  const allErrors = [];
  const errorsByType = {
    'CATEGORIE_INVALIDE': [],
    'ARTICLE_MANQUANT': []
  };
  
  allFiles.forEach(file => {
    const errors = analyzeFile(file);
    if (errors.length > 0) {
      allErrors.push(...errors);
      errors.forEach(err => {
        errorsByType[err.type].push(err);
      });
    }
  });
  
  console.log(`${'='.repeat(60)}`);
  console.log(`\n📊 RÉSUMÉ:\n`);
  console.log(`   • Total: ${allErrors.length} liens cassés`);
  console.log(`   • Catégories invalides: ${errorsByType.CATEGORIE_INVALIDE.length}`);
  console.log(`   • Articles manquants: ${errorsByType.ARTICLE_MANQUANT.length}`);
  
  // Top 10 catégories invalides
  if (errorsByType.CATEGORIE_INVALIDE.length > 0) {
    console.log(`\n\n❌ CATÉGORIES INVALIDES (${errorsByType.CATEGORIE_INVALIDE.length})\n${'='.repeat(60)}\n`);
    
    const categoryCounts = {};
    errorsByType.CATEGORIE_INVALIDE.forEach(err => {
      categoryCounts[err.category] = (categoryCounts[err.category] || 0) + 1;
    });
    
    const sorted = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
    sorted.slice(0, 10).forEach(([cat, count]) => {
      console.log(`   ${count.toString().padStart(3)}× ${cat}`);
      // Montrer 2 exemples
      const examples = errorsByType.CATEGORIE_INVALIDE
        .filter(e => e.category === cat)
        .slice(0, 2);
      examples.forEach(ex => {
        console.log(`        → ${ex.url}`);
        console.log(`          "${ex.text}"`);
        console.log(`          dans ${ex.file}`);
      });
      console.log();
    });
  }
  
  // Top 20 articles manquants
  if (errorsByType.ARTICLE_MANQUANT.length > 0) {
    console.log(`\n\n📝 ARTICLES MANQUANTS (${errorsByType.ARTICLE_MANQUANT.length})\n${'='.repeat(60)}\n`);
    
    const slugCounts = {};
    errorsByType.ARTICLE_MANQUANT.forEach(err => {
      const key = `${err.category}/${err.slug}`;
      slugCounts[key] = (slugCounts[key] || 0) + 1;
    });
    
    const sorted = Object.entries(slugCounts).sort((a, b) => b[1] - a[1]);
    sorted.slice(0, 30).forEach(([path, count]) => {
      const example = errorsByType.ARTICLE_MANQUANT.find(e => `${e.category}/${e.slug}` === path);
      console.log(`   ${count.toString().padStart(3)}× /blog/${path}`);
      console.log(`        "${example.text}"`);
    });
  }
  
  console.log(`\n${'='.repeat(60)}\n`);
}

main();

