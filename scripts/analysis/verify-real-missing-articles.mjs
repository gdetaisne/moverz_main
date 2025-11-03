#!/usr/bin/env node

/**
 * Script de vérification INTELLIGENT des articles manquants
 * 
 * Problème identifié : 
 * - Le script précédent transformait les slugs et créait des faux positifs
 * - Beaucoup d'articles marqués "manquants" existent en réalité
 * 
 * Ce script :
 * 1. Vérifie l'existence SANS transformer le slug
 * 2. Essaie des variations intelligentes (avec/sans ville, catégorie)
 * 3. Mappe la structure réelle par ville
 * 4. Identifie les VRAIS articles manquants
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

// Charger l'analyse des 404
const analysis = JSON.parse(fs.readFileSync(path.join(rootDir, '404-analysis.json'), 'utf8'));

console.log('🔍 VÉRIFICATION INTELLIGENTE DES ARTICLES MANQUANTS\n');
console.log('='.repeat(80));

// Étape 1 : Mapper la structure réelle de chaque ville
console.log('\n📂 ÉTAPE 1 : Mapping structure réelle par ville\n');

const cityStructures = {};

CITIES.forEach(city => {
  const blogPath = path.join(rootDir, 'sites', city, 'content', 'blog');
  
  if (!fs.existsSync(blogPath)) {
    console.log(`⚠️  ${city}: content/blog n'existe pas`);
    return;
  }
  
  const categories = fs.readdirSync(blogPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  cityStructures[city] = {
    blogPath,
    categories: {},
    totalArticles: 0
  };
  
  categories.forEach(category => {
    const categoryPath = path.join(blogPath, category);
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md') && file !== 'README.md');
    
    cityStructures[city].categories[category] = files.map(f => f.replace('.md', ''));
    cityStructures[city].totalArticles += files.length;
  });
  
  console.log(`✅ ${city.padEnd(15)}: ${categories.length} catégories, ${cityStructures[city].totalArticles} articles`);
});

// Étape 2 : Fonction de vérification intelligente
console.log('\n\n🧠 ÉTAPE 2 : Vérification intelligente des liens cassés\n');

function findArticle(city, url) {
  const parts = url.split('/').filter(p => p);
  // parts = ['blog', 'category', 'slug']
  
  if (parts.length < 3 || parts[0] !== 'blog') {
    return { found: false, reason: 'format_invalid' };
  }
  
  const requestedCategory = parts[1];
  const requestedSlug = parts[2];
  
  const cityStructure = cityStructures[city];
  if (!cityStructure) {
    return { found: false, reason: 'city_not_found' };
  }
  
  // Tentative 1 : Slug exact dans la catégorie exacte
  if (cityStructure.categories[requestedCategory]) {
    if (cityStructure.categories[requestedCategory].includes(requestedSlug)) {
      return { 
        found: true, 
        path: `${requestedCategory}/${requestedSlug}.md`,
        match: 'exact'
      };
    }
  }
  
  // Tentative 2 : Slug dans n'importe quelle catégorie
  for (const [category, slugs] of Object.entries(cityStructure.categories)) {
    if (slugs.includes(requestedSlug)) {
      return { 
        found: true, 
        path: `${category}/${requestedSlug}.md`,
        match: 'different_category',
        requestedCategory,
        actualCategory: category
      };
    }
  }
  
  // Tentative 3 : Variations du slug (avec préfixe ville)
  const slugVariations = [
    requestedSlug,
    `${requestedSlug}-${city}`,
    `${requestedCategory}-${city}-${requestedSlug}`,
    requestedSlug.replace(`-${city}`, ''),
    requestedSlug.replace(new RegExp(`${city}-?`, 'g'), '')
  ];
  
  for (const variation of slugVariations) {
    for (const [category, slugs] of Object.entries(cityStructure.categories)) {
      if (slugs.includes(variation)) {
        return { 
          found: true, 
          path: `${category}/${variation}.md`,
          match: 'slug_variation',
          requestedSlug,
          actualSlug: variation,
          actualCategory: category
        };
      }
    }
  }
  
  // Tentative 4 : Recherche partielle (contient le slug)
  for (const [category, slugs] of Object.entries(cityStructure.categories)) {
    const partial = slugs.find(s => 
      s.includes(requestedSlug) || requestedSlug.includes(s)
    );
    if (partial) {
      return { 
        found: true, 
        path: `${category}/${partial}.md`,
        match: 'partial_match',
        requestedSlug,
        actualSlug: partial,
        actualCategory: category
      };
    }
  }
  
  // Non trouvé
  return { 
    found: false, 
    reason: 'not_found',
    searchedIn: Object.keys(cityStructure.categories)
  };
}

// Étape 3 : Analyser chaque lien cassé
console.log('Analyse des liens cassés...\n');

const results = {
  articlesExistants: [],
  categoryIncorrecte: [],
  slugVariation: [],
  vraimentManquants: [],
  formatInvalide: []
};

let processed = 0;
const articlesManquants = analysis.categorized['articles-manquants'] || [];

articlesManquants.forEach(link => {
  processed++;
  
  if (processed % 100 === 0) {
    process.stdout.write(`\rProcessed: ${processed}/${articlesManquants.length}`);
  }
  
  const result = findArticle(link.city, link.url);
  
  if (result.found) {
    switch (result.match) {
      case 'exact':
        results.articlesExistants.push({ ...link, result });
        break;
      case 'different_category':
        results.categoryIncorrecte.push({ ...link, result });
        break;
      case 'slug_variation':
      case 'partial_match':
        results.slugVariation.push({ ...link, result });
        break;
    }
  } else {
    if (result.reason === 'format_invalid') {
      results.formatInvalide.push({ ...link, result });
    } else {
      results.vraimentManquants.push({ ...link, result });
    }
  }
});

console.log('\n\n');

// Étape 4 : Rapport
console.log('='.repeat(80));
console.log('📊 RÉSULTATS DE LA VÉRIFICATION\n');

console.log(`Total liens analysés : ${articlesManquants.length}\n`);

console.log(`✅ Articles EXISTANTS (slug exact)           : ${results.articlesExistants.length} (${((results.articlesExistants.length / articlesManquants.length) * 100).toFixed(1)}%)`);
console.log(`🔄 Catégorie incorrecte                      : ${results.categoryIncorrecte.length} (${((results.categoryIncorrecte.length / articlesManquants.length) * 100).toFixed(1)}%)`);
console.log(`🔀 Variation de slug                         : ${results.slugVariation.length} (${((results.slugVariation.length / articlesManquants.length) * 100).toFixed(1)}%)`);
console.log(`❌ Format URL invalide                       : ${results.formatInvalide.length} (${((results.formatInvalide.length / articlesManquants.length) * 100).toFixed(1)}%)`);
console.log(`⚠️  VRAIMENT manquants                       : ${results.vraimentManquants.length} (${((results.vraimentManquants.length / articlesManquants.length) * 100).toFixed(1)}%)`);

const resolvable = results.articlesExistants.length + results.categoryIncorrecte.length + results.slugVariation.length;
console.log(`\n💡 Résolvables par correction de liens      : ${resolvable} (${((resolvable / articlesManquants.length) * 100).toFixed(1)}%)`);

// Exemples
console.log('\n\n📋 EXEMPLES PAR CATÉGORIE\n');

console.log('### Articles EXISTANTS (10 premiers):');
results.articlesExistants.slice(0, 10).forEach((item, i) => {
  console.log(`${i + 1}. [${item.city}] ${item.url}`);
  console.log(`   → Existe: sites/${item.city}/content/blog/${item.result.path}`);
});

console.log('\n### Catégorie incorrecte (10 premiers):');
results.categoryIncorrecte.slice(0, 10).forEach((item, i) => {
  console.log(`${i + 1}. [${item.city}] ${item.url}`);
  console.log(`   → Demandé: ${item.result.requestedCategory}, Réel: ${item.result.actualCategory}`);
  console.log(`   → Existe: sites/${item.city}/content/blog/${item.result.path}`);
});

console.log('\n### Variation de slug (10 premiers):');
results.slugVariation.slice(0, 10).forEach((item, i) => {
  console.log(`${i + 1}. [${item.city}] ${item.url}`);
  console.log(`   → Demandé: ${item.result.requestedSlug}`);
  console.log(`   → Réel: ${item.result.actualSlug}`);
  console.log(`   → Existe: sites/${item.city}/content/blog/${item.result.path}`);
});

console.log('\n### VRAIMENT manquants (20 premiers):');
results.vraimentManquants.slice(0, 20).forEach((item, i) => {
  console.log(`${i + 1}. [${item.city}] ${item.url}`);
  console.log(`   → Introuvable dans les catégories: ${item.result.searchedIn?.slice(0, 3).join(', ')}...`);
});

// Étape 5 : Export des résultats
const outputData = {
  timestamp: new Date().toISOString(),
  summary: {
    total: articlesManquants.length,
    articlesExistants: results.articlesExistants.length,
    categoryIncorrecte: results.categoryIncorrecte.length,
    slugVariation: results.slugVariation.length,
    formatInvalide: results.formatInvalide.length,
    vraimentManquants: results.vraimentManquants.length,
    resolvablePercent: ((resolvable / articlesManquants.length) * 100).toFixed(1)
  },
  cityStructures,
  results
};

fs.writeFileSync(
  path.join(rootDir, 'VERIFICATION-ARTICLES.json'),
  JSON.stringify(outputData, null, 2)
);

console.log('\n\n✅ Résultats exportés: VERIFICATION-ARTICLES.json');

// Étape 6 : Statistiques par ville
console.log('\n\n🏙️  STATISTIQUES PAR VILLE\n');

const byCity = {};
results.vraimentManquants.forEach(item => {
  byCity[item.city] = (byCity[item.city] || 0) + 1;
});

Object.entries(byCity)
  .sort((a, b) => b[1] - a[1])
  .forEach(([city, count]) => {
    console.log(`${city.padEnd(15)}: ${count.toString().padStart(3)} articles vraiment manquants`);
  });

// Étape 7 : Recommandations
console.log('\n\n💡 RECOMMANDATIONS\n');
console.log('='.repeat(80));

console.log(`\n1. CORRIGER LES LIENS (${resolvable} liens, ${((resolvable / articlesManquants.length) * 100).toFixed(1)}%)`);
console.log('   → Articles existants: pointer vers le bon chemin');
console.log('   → Catégorie incorrecte: corriger la catégorie dans le lien');
console.log('   → Variation de slug: corriger le slug dans le lien');

console.log(`\n2. CRÉER LES ARTICLES (${results.vraimentManquants.length} articles, ${((results.vraimentManquants.length / articlesManquants.length) * 100).toFixed(1)}%)`);
console.log('   → Seulement ces articles sont vraiment manquants');
console.log('   → Voir VERIFICATION-ARTICLES.json pour la liste complète');

console.log(`\n3. CORRIGER LES FORMATS (${results.formatInvalide.length} liens, ${((results.formatInvalide.length / articlesManquants.length) * 100).toFixed(1)}%)`);
console.log('   → URLs avec format invalide à corriger');

console.log('\n='.repeat(80));

