#!/usr/bin/env node

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

// Categories par ville
const categoryMappings = {
  marseille: {
    'demenagement-etudiant-marseille': 'etudiant',
    'demenagement-entreprise-marseille': 'entreprise',
    'demenagement-piano-marseille': 'piano',
    'demenagement-international-marseille': 'international',
    'demenagement-longue-distance-marseille': 'longue-distance',
    'demenagement-pas-cher-marseille': 'pas-cher',
    'demenagement-urgent-marseille': 'urgent',
    'devis-demenagement-marseille': 'devis',
    'garde-meuble-marseille': 'garde-meuble',
    'prix-demenagement-marseille': 'prix',
    'prix-demenagement-piano-marseille': 'prix-piano',
  }
};

function cleanSlug(slug, category, city) {
  let clean = slug;
  
  const categoryPatterns = [
    `demenagement-etudiant-${city}-`,
    `demenagement-entreprise-${city}-`,
    `demenagement-piano-${city}-`,
    `demenagement-international-${city}-`,
    `demenagement-longue-distance-${city}-`,
    `demenagement-pas-cher-${city}-`,
    `demenagement-urgent-${city}-`,
    `devis-demenagement-${city}-`,
    `garde-meuble-${city}-`,
    `prix-demenagement-${city}-`,
    `prix-demenagement-piano-${city}-`,
  ];
  
  categoryPatterns.forEach(pattern => {
    if (clean.startsWith(pattern)) {
      clean = clean.replace(pattern, '');
    }
  });
  
  clean = clean.replace(new RegExp(`-${city}$`, 'i'), '');
  clean = clean.replace(/-guide-complet$/i, '-guide');
  clean = clean.replace(/-reperes-2025$/i, '-2025');
  
  return clean;
}

// Récupérer tous les articles existants pour une ville
function getExistingArticles(city) {
  const articles = new Map();
  const contentPath = path.join(rootDir, 'sites', city, 'content', 'blog');
  
  if (!fs.existsSync(contentPath)) {
    console.warn(`⚠️  Content path not found: ${contentPath}`);
    return articles;
  }
  
  const categories = fs.readdirSync(contentPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const categoryMap = categoryMappings[city] || {};

  categories.forEach(category => {
    const categoryPath = path.join(contentPath, category);
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md') && file !== 'README.md');

    files.forEach(file => {
      const slug = file.replace('.md', '');
      const cleanCategory = categoryMap[category] || category;
      const cleanedSlug = cleanSlug(slug, category, city);
      const url = `/blog/${cleanCategory}/${cleanedSlug}`;
      
      articles.set(url, {
        file: path.join(categoryPath, file),
        category: cleanCategory,
        slug: cleanedSlug,
        originalSlug: slug,
        city
      });
    });
  });
  
  return articles;
}

// Trouver les liens cassés dans un fichier
function findBrokenLinks(filePath, existingArticles) {
  const brokenLinks = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Trouver tous les liens internes du blog
    const linkRegex = /\[([^\]]+)\]\((\/blog\/[^)]+)\)/g;
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
      const linkText = match[1];
      const linkUrl = match[2];
      
      // Vérifier si l'article existe
      if (!existingArticles.has(linkUrl)) {
        brokenLinks.push({
          text: linkText,
          url: linkUrl,
          line: content.substring(0, match.index).split('\n').length,
          sourceFile: filePath
        });
      }
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
  }
  
  return brokenLinks;
}

// Analyser tous les 404 pour une ville
function analyze404ForCity(city) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔍 Analyse des 404 pour ${city.toUpperCase()}`);
  console.log(`${'='.repeat(60)}`);
  
  const existingArticles = getExistingArticles(city);
  console.log(`✓ ${existingArticles.size} articles trouvés\n`);
  
  const allBrokenLinks = [];
  let filesWithIssues = 0;
  
  existingArticles.forEach((article, url) => {
    const brokenLinks = findBrokenLinks(article.file, existingArticles);
    
    if (brokenLinks.length > 0) {
      filesWithIssues++;
      allBrokenLinks.push(...brokenLinks);
    }
  });
  
  return {
    city,
    totalArticles: existingArticles.size,
    brokenLinks: allBrokenLinks,
    filesWithIssues
  };
}

// Catégoriser les 404 par type
function categorize404(results) {
  const categories = {
    'slugs-incorrects': [],
    'categories-incorrectes': [],
    'articles-manquants': [],
    'prefixes-villes': [],
    'autres': []
  };
  
  results.forEach(cityResult => {
    cityResult.brokenLinks.forEach(link => {
      const url = link.url;
      
      // Analyser le type d'erreur
      if (url.includes(`-${cityResult.city}-`)) {
        categories['prefixes-villes'].push({ ...link, city: cityResult.city, type: 'prefix-ville' });
      } else if (!url.match(/^\/blog\/[^/]+\/[^/]+$/)) {
        categories['slugs-incorrects'].push({ ...link, city: cityResult.city, type: 'slug-incorrect' });
      } else {
        categories['articles-manquants'].push({ ...link, city: cityResult.city, type: 'article-manquant' });
      }
    });
  });
  
  return categories;
}

// Main
async function main() {
  console.log('📊 ANALYSE EXHAUSTIVE DES 404 - PROJET MOVERZ');
  console.log('='.repeat(60));
  
  const allResults = [];
  
  for (const city of CITIES) {
    const result = analyze404ForCity(city);
    allResults.push(result);
  }
  
  // Résumé global
  console.log(`\n\n${'='.repeat(60)}`);
  console.log('📈 RÉSUMÉ GLOBAL');
  console.log(`${'='.repeat(60)}\n`);
  
  let totalBrokenLinks = 0;
  let totalArticles = 0;
  
  allResults.forEach(result => {
    totalBrokenLinks += result.brokenLinks.length;
    totalArticles += result.totalArticles;
    
    if (result.brokenLinks.length > 0) {
      console.log(`❌ ${result.city.padEnd(15)} : ${result.brokenLinks.length} liens cassés (${result.filesWithIssues} fichiers)`);
    } else {
      console.log(`✅ ${result.city.padEnd(15)} : Aucun lien cassé`);
    }
  });
  
  console.log(`\n📊 Total : ${totalBrokenLinks} liens cassés sur ${totalArticles} articles`);
  
  // Catégorisation
  console.log(`\n\n${'='.repeat(60)}`);
  console.log('🏷️  CATÉGORISATION DES 404');
  console.log(`${'='.repeat(60)}\n`);
  
  const categorized = categorize404(allResults);
  
  Object.entries(categorized).forEach(([category, links]) => {
    if (links.length > 0) {
      console.log(`\n### ${category.toUpperCase().replace(/-/g, ' ')} (${links.length} erreurs)`);
      console.log('-'.repeat(60));
      
      // Afficher max 10 exemples par catégorie
      links.slice(0, 10).forEach(link => {
        console.log(`  [${link.city}] ${link.url}`);
        console.log(`    ↳ Texte: "${link.text}"`);
        console.log(`    ↳ Fichier: ${path.basename(link.sourceFile)}:${link.line}`);
      });
      
      if (links.length > 10) {
        console.log(`  ... et ${links.length - 10} autres`);
      }
    }
  });
  
  // Export JSON pour traitement ultérieur
  const outputPath = path.join(rootDir, '404-analysis.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: {
      totalBrokenLinks,
      totalArticles,
      cities: allResults.map(r => ({
        city: r.city,
        brokenLinks: r.brokenLinks.length,
        filesWithIssues: r.filesWithIssues
      }))
    },
    categorized,
    details: allResults
  }, null, 2));
  
  console.log(`\n\n✅ Rapport complet exporté: ${outputPath}`);
}

main().catch(console.error);

