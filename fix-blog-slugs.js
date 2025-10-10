#!/usr/bin/env node

/**
 * DIAGNOSTIC ET CORRECTION - BLOG SLUGS
 * 
 * Analyse pourquoi "Article non trouvé" apparaît
 * et corrige les problèmes de routing blog
 */

const fs = require('fs');
const path = require('path');

const SITES_DIR = path.join(__dirname, 'sites');
const TEST_CITY = 'bordeaux'; // On test sur bordeaux d'abord

// Copie de la logique de nettoyage de slug depuis blog.ts
function cleanSlug(originalSlug, category) {
  let cleanSlug = originalSlug;
  
  const cleanPatterns = [
    { from: /^demenagement-etudiant-bordeaux-/, to: '' },
    { from: /^demenagement-entreprise-bordeaux-/, to: '' },
    { from: /^demenagement-piano-bordeaux-/, to: '' },
    { from: /^demenagement-international-bordeaux-/, to: '' },
    { from: /^demenagement-longue-distance-bordeaux-/, to: '' },
    { from: /^demenagement-pas-cher-bordeaux-/, to: '' },
    { from: /^demenagement-urgent-bordeaux-/, to: '' },
    { from: /^devis-demenagement-bordeaux-/, to: '' },
    { from: /^garde-meuble-bordeaux-/, to: '' },
    { from: /^prix-demenagement-bordeaux-/, to: '' },
    { from: /^prix-demenagement-piano-bordeaux-/, to: '' },
    { from: /^prix-garde-meuble-bordeaux-/, to: '' },
    { from: /^stockage-etudiant-bordeaux/, to: 'stockage-etudiant' },
    { from: /^cartons-gratuits-bordeaux/, to: 'cartons-gratuits' },
    { from: /^camion-demenagement-etudiant-bordeaux/, to: 'camion-demenagement-etudiant' },
    { from: /-bordeaux-/, to: '-' },
    { from: /-bordeaux$/, to: '' },
    { from: /-guide-complet$/, to: '-guide' },
    { from: /-reperes-2025$/, to: '-2025' }
  ];

  cleanPatterns.forEach(pattern => {
    cleanSlug = cleanSlug.replace(pattern.from, pattern.to);
  });

  return cleanSlug;
}

const CATEGORY_MAPPING = {
  'demenagement-etudiant-bordeaux': 'etudiant',
  'demenagement-entreprise-bordeaux': 'entreprise', 
  'demenagement-piano-bordeaux': 'piano',
  'demenagement-international-bordeaux': 'international',
  'demenagement-longue-distance-bordeaux': 'longue-distance',
  'demenagement-pas-cher-bordeaux': 'pas-cher',
  'demenagement-urgent-bordeaux': 'urgent',
  'devis-demenagement-bordeaux': 'devis',
  'garde-meuble-bordeaux': 'garde-meuble',
  'prix-demenagement-bordeaux': 'prix',
  'prix-demenagement-piano-bordeaux': 'prix-piano',
};

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]+?)\n---/);
  if (!match) return null;
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Nettoyer les quotes
      value = value.replace(/^["']|["']$/g, '');
      
      frontmatter[key] = value;
    }
  }
  
  return frontmatter;
}

function analyzeBlogContent(city) {
  const contentDir = path.join(SITES_DIR, city, 'content', 'blog');
  
  if (!fs.existsSync(contentDir)) {
    console.log(`❌ Pas de dossier content/blog pour ${city}`);
    return { articles: [], categories: [] };
  }
  
  const categories = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.'))
    .map(d => d.name);
  
  const articles = [];
  
  for (const category of categories) {
    const categoryPath = path.join(contentDir, category);
    const files = fs.readdirSync(categoryPath)
      .filter(f => f.endsWith('.md') && f !== 'README.md');
    
    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const frontmatter = parseFrontmatter(content);
      
      if (!frontmatter) {
        console.log(`⚠️  Pas de frontmatter: ${category}/${file}`);
        continue;
      }
      
      const originalSlug = frontmatter.slug || file.replace('.md', '');
      const cleanedSlug = cleanSlug(originalSlug, category);
      const cleanCategory = CATEGORY_MAPPING[category] || category;
      
      articles.push({
        file: `${category}/${file}`,
        category,
        cleanCategory,
        originalSlug,
        cleanedSlug,
        title: frontmatter.title,
        url: `/blog/${cleanCategory}/${cleanedSlug}`,
      });
    }
  }
  
  return { articles, categories };
}

console.log('🔍 DIAGNOSTIC BLOG - Analyse des slugs et routing\n');
console.log('─'.repeat(80));

const { articles, categories } = analyzeBlogContent(TEST_CITY);

console.log(`\n📊 RÉSUMÉ ${TEST_CITY.toUpperCase()}`);
console.log(`  • Catégories: ${categories.length}`);
console.log(`  • Articles: ${articles.length}`);

console.log('\n📝 MAPPING CATÉGORIES:');
categories.forEach(cat => {
  const clean = CATEGORY_MAPPING[cat] || cat;
  console.log(`  ${cat} → ${clean}`);
});

console.log('\n📄 EXEMPLES D\'ARTICLES (10 premiers):');
articles.slice(0, 10).forEach((article, idx) => {
  console.log(`\n${idx + 1}. ${article.title}`);
  console.log(`   Fichier: ${article.file}`);
  console.log(`   Catégorie: ${article.category} → ${article.cleanCategory}`);
  console.log(`   Slug: ${article.originalSlug} → ${article.cleanedSlug}`);
  console.log(`   URL: ${article.url}`);
});

// Test de correspondance
console.log('\n\n🧪 TEST DE CORRESPONDANCE');
console.log('─'.repeat(80));

const testCases = [
  { category: 'etudiant', slug: 'demenagement-etudiant-pas-cher' },
  { category: 'etudiant', slug: 'guide' },
  { category: 'piano', slug: 'guide' },
];

testCases.forEach(test => {
  const found = articles.find(a => 
    a.cleanCategory === test.category && 
    a.cleanedSlug === test.slug
  );
  
  if (found) {
    console.log(`✅ /blog/${test.category}/${test.slug} → TROUVÉ`);
    console.log(`   ${found.title}`);
  } else {
    console.log(`❌ /blog/${test.category}/${test.slug} → NON TROUVÉ`);
    console.log(`   Candidats dans ${test.category}:`);
    articles
      .filter(a => a.cleanCategory === test.category)
      .slice(0, 3)
      .forEach(a => {
        console.log(`      • ${a.cleanedSlug} (${a.title})`);
      });
  }
});

// Vérifier les duplicates de slugs
console.log('\n\n🔍 VÉRIFICATION DES DUPLICATES');
console.log('─'.repeat(80));

const slugMap = {};
articles.forEach(article => {
  const key = `${article.cleanCategory}/${article.cleanedSlug}`;
  if (!slugMap[key]) {
    slugMap[key] = [];
  }
  slugMap[key].push(article.title);
});

const duplicates = Object.entries(slugMap).filter(([_, titles]) => titles.length > 1);

if (duplicates.length === 0) {
  console.log('✅ Aucun duplicate détecté');
} else {
  console.log(`⚠️  ${duplicates.length} duplicates détectés:`);
  duplicates.forEach(([slug, titles]) => {
    console.log(`\n  ${slug}:`);
    titles.forEach(title => console.log(`    • ${title}`));
  });
}

console.log('\n\n💡 DIAGNOSTIC');
console.log('─'.repeat(80));

if (articles.length === 0) {
  console.log('❌ PROBLÈME: Aucun article trouvé !');
  console.log('   → Vérifier que les fichiers .md existent dans content/blog/');
  console.log('   → Vérifier que le frontmatter est correct (---...---)');
} else {
  console.log(`✅ ${articles.length} articles détectés`);
  console.log('   Le contenu existe, le problème est probablement dans le routing Next.js');
  console.log('');
  console.log('   Solutions possibles:');
  console.log('   1. Vérifier que generateStaticParams() génère les bons params');
  console.log('   2. Le fallback "Article non trouvé" est normal en dev pour les routes dynamiques');
  console.log('   3. En production avec "npm run build", les articles devraient être trouvés');
}

console.log('\n' + '='.repeat(80) + '\n');

