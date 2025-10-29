#!/usr/bin/env node

/**
 * Phase 3: Analyse fine des articles "manquants"
 * Objectif: Identifier si articles existent ailleurs (catégorie/slug différent)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const CITIES = [
  'marseille', 'toulouse', 'lyon', 'bordeaux', 'nantes',
  'lille', 'nice', 'strasbourg', 'rouen', 'rennes', 'montpellier'
];

// Lire le rapport 404-analysis.json
function load404Report() {
  const reportPath = path.join(rootDir, '404-analysis.json');
  if (!fs.existsSync(reportPath)) {
    console.error('❌ Fichier 404-analysis.json introuvable. Exécutez analyze-404.mjs d\'abord.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(reportPath, 'utf8'));
}

// Récupérer tous les fichiers articles pour une ville
function getAllArticleFiles(city) {
  const files = new Map(); // url → filepath
  const contentPath = path.join(rootDir, 'sites', city, 'content', 'blog');
  
  if (!fs.existsSync(contentPath)) {
    return files;
  }
  
  const categories = fs.readdirSync(contentPath, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  
  categories.forEach(category => {
    const categoryPath = path.join(contentPath, category);
    const categoryFiles = fs.readdirSync(categoryPath)
      .filter(f => f.endsWith('.md') && f !== 'README.md');
    
    categoryFiles.forEach(file => {
      const slug = file.replace('.md', '');
      const filepath = path.join(categoryPath, file);
      
      // Stocker plusieurs variantes possibles
      files.set(`${category}/${slug}`, filepath);
      
      // Variantes de slug (sans suffixe ville)
      const slugWithoutCity = slug.replace(new RegExp(`-${city}$`), '');
      if (slugWithoutCity !== slug) {
        files.set(`${category}/${slugWithoutCity}`, filepath);
      }
      
      // Variantes de slug (sans préfixe catégorie-ville)
      const patterns = [
        `garde-meuble-${city}-`,
        `demenagement-${city}-`,
        `prix-demenagement-${city}-`,
        `devis-demenagement-${city}-`,
      ];
      
      patterns.forEach(pattern => {
        if (slug.startsWith(pattern)) {
          const shortSlug = slug.replace(pattern, '');
          files.set(`${category}/${shortSlug}`, filepath);
        }
      });
    });
  });
  
  return files;
}

// Trouver l'article correspondant
function findMatchingArticle(brokenUrl, city, allFiles) {
  // Nettoyer l'URL
  const cleanUrl = brokenUrl.replace('/blog/', '');
  
  // Tentative 1: Match exact
  if (allFiles.has(cleanUrl)) {
    return { found: true, type: 'exact', path: allFiles.get(cleanUrl) };
  }
  
  // Tentative 2: Extraire catégorie et slug
  const parts = cleanUrl.split('/');
  if (parts.length !== 2) {
    return { found: false, type: 'invalid-format' };
  }
  
  const [category, slug] = parts;
  
  // Tentative 3: Chercher le slug dans toutes les catégories
  for (const [key, filepath] of allFiles.entries()) {
    const [cat, fileSlug] = key.split('/');
    
    // Match par slug exact (catégorie différente)
    if (fileSlug === slug && cat !== category) {
      return { 
        found: true, 
        type: 'wrong-category',
        path: filepath,
        correctCategory: cat,
        wantedCategory: category
      };
    }
    
    // Match par similarité de slug
    if (fileSlug.includes(slug) || slug.includes(fileSlug)) {
      return {
        found: true,
        type: 'slug-variation',
        path: filepath,
        correctSlug: fileSlug,
        wantedSlug: slug,
        correctCategory: cat
      };
    }
  }
  
  // Tentative 4: Recherche fuzzy (Levenshtein distance)
  const candidates = [];
  for (const [key, filepath] of allFiles.entries()) {
    const [cat, fileSlug] = key.split('/');
    const distance = levenshteinDistance(slug, fileSlug);
    
    if (distance <= 3) { // Max 3 caractères de différence
      candidates.push({
        key,
        filepath,
        distance,
        category: cat,
        slug: fileSlug
      });
    }
  }
  
  if (candidates.length > 0) {
    candidates.sort((a, b) => a.distance - b.distance);
    const best = candidates[0];
    return {
      found: true,
      type: 'fuzzy-match',
      path: best.filepath,
      correctSlug: best.slug,
      wantedSlug: slug,
      correctCategory: best.category,
      distance: best.distance,
      alternatives: candidates.slice(0, 3)
    };
  }
  
  // Article vraiment manquant
  return { found: false, type: 'truly-missing' };
}

// Distance de Levenshtein (similarité de chaînes)
function levenshteinDistance(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(0));
  
  for (let i = 0; i <= len1; i++) matrix[i][0] = i;
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;
  
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  
  return matrix[len1][len2];
}

// Main
async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  ANALYSE FINE DES ARTICLES MANQUANTS                       ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  const report = load404Report();
  const missingArticles = report.categorized['articles-manquants'] || [];
  
  console.log(`📊 ${missingArticles.length} liens "articles manquants" à analyser\n`);
  
  const results = {
    exact: [],
    wrongCategory: [],
    slugVariation: [],
    fuzzyMatch: [],
    trulyMissing: [],
    invalidFormat: []
  };
  
  const urlFrequency = new Map(); // Compter fréquence de chaque URL
  
  // Compter fréquences
  missingArticles.forEach(link => {
    const count = urlFrequency.get(link.url) || 0;
    urlFrequency.set(link.url, count + 1);
  });
  
  const uniqueUrls = [...new Set(missingArticles.map(l => l.url))];
  console.log(`🔍 ${uniqueUrls.length} URLs uniques à analyser\n`);
  
  // Analyser chaque URL unique
  for (const url of uniqueUrls) {
    const links = missingArticles.filter(l => l.url === url);
    const city = links[0].city;
    const frequency = urlFrequency.get(url);
    
    // Charger tous les fichiers de cette ville
    const allFiles = getAllArticleFiles(city);
    
    // Chercher l'article
    const match = findMatchingArticle(url, city, allFiles);
    
    const result = {
      url,
      city,
      frequency,
      references: links.length,
      ...match
    };
    
    switch (match.type) {
      case 'exact':
        results.exact.push(result);
        break;
      case 'wrong-category':
        results.wrongCategory.push(result);
        break;
      case 'slug-variation':
        results.slugVariation.push(result);
        break;
      case 'fuzzy-match':
        results.fuzzyMatch.push(result);
        break;
      case 'truly-missing':
        results.trulyMissing.push(result);
        break;
      case 'invalid-format':
        results.invalidFormat.push(result);
        break;
    }
  }
  
  // Afficher résumé
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  RÉSULTATS DE L\'ANALYSE                                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  console.log(`✅ Exact match (résolvable):           ${results.exact.length}`);
  console.log(`🔄 Mauvaise catégorie (résolvable):    ${results.wrongCategory.length}`);
  console.log(`🔄 Variation de slug (résolvable):     ${results.slugVariation.length}`);
  console.log(`🟡 Correspondance floue (à vérifier):  ${results.fuzzyMatch.length}`);
  console.log(`❌ Vraiment manquant (créer):          ${results.trulyMissing.length}`);
  console.log(`⚠️  Format invalide (corriger):        ${results.invalidFormat.length}`);
  
  const totalResolvable = results.exact.length + results.wrongCategory.length + results.slugVariation.length;
  const totalLinks = missingArticles.length;
  const resolvablePercent = ((totalResolvable / uniqueUrls.length) * 100).toFixed(1);
  
  console.log(`\n📈 Résolvable automatiquement: ${totalResolvable}/${uniqueUrls.length} URLs (${resolvablePercent}%)`);
  
  // Top 10 articles vraiment manquants par fréquence
  if (results.trulyMissing.length > 0) {
    console.log('\n\n╔════════════════════════════════════════════════════════════╗');
    console.log('║  TOP 10 ARTICLES À CRÉER (par fréquence)                   ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    
    results.trulyMissing
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10)
      .forEach((result, i) => {
        console.log(`${(i + 1).toString().padStart(2)}. [${result.city}] ${result.url}`);
        console.log(`    Référencé ${result.frequency}x dans ${result.references} articles`);
      });
  }
  
  // Export JSON détaillé
  const outputPath = path.join(rootDir, 'missing-articles-detailed.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log(`\n\n✅ Rapport détaillé exporté: ${outputPath}`);
  
  // Générer script de correction automatique
  generateFixScript(results);
}

// Générer script de correction
function generateFixScript(results) {
  const scriptPath = path.join(rootDir, 'scripts', 'phase4-fix-wrong-categories.sh');
  
  let script = `#!/bin/bash
# Phase 4: Correction automatique des catégories/slugs incorrects
# Généré automatiquement par analyze-missing-articles-detailed.mjs

set -e

SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  PHASE 4: CORRECTION CATÉGORIES/SLUGS                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Backup
BACKUP_DIR="$ROOT_DIR/backups/categories-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📦 Backup: $BACKUP_DIR"
echo ""

`;

  let count = 0;
  
  // Corrections pour mauvaise catégorie
  results.wrongCategory.forEach(result => {
    const oldUrl = result.url;
    const newUrl = `/blog/${result.correctCategory}/${result.wantedSlug}`;
    const city = result.city;
    
    script += `# ${++count}. [${city}] Correction catégorie\n`;
    script += `echo "🔧 ${city}: ${oldUrl} → ${newUrl}"\n`;
    script += `find "sites/${city}/content" -name "*.md" -type f -exec sed -i '' "s|${oldUrl}|${newUrl}|g" {} \\;\n\n`;
  });
  
  // Corrections pour variations de slug
  results.slugVariation.forEach(result => {
    const oldUrl = result.url;
    const newUrl = `/blog/${result.correctCategory}/${result.correctSlug}`;
    const city = result.city;
    
    script += `# ${++count}. [${city}] Correction slug\n`;
    script += `echo "🔧 ${city}: ${oldUrl} → ${newUrl}"\n`;
    script += `find "sites/${city}/content" -name "*.md" -type f -exec sed -i '' "s|${oldUrl}|${newUrl}|g" {} \\;\n\n`;
  });
  
  script += `echo ""\necho "✅ ${count} corrections appliquées"\n`;
  script += `echo "🔍 Relancez: node scripts/analyze-404.mjs"\n`;
  
  fs.writeFileSync(scriptPath, script, { mode: 0o755 });
  console.log(`✅ Script de correction généré: ${scriptPath}`);
}

main().catch(console.error);

