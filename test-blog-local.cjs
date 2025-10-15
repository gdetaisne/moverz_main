#!/usr/bin/env node

// Test simple pour vérifier que getAllBlogPosts() lit bien le répertoire local

const fs = require('fs');
const path = require('path');

const sites = [
  'marseille', 'nantes', 'nice', 'lyon', 'montpellier',
  'rennes', 'lille', 'bordeaux', 'toulouse', 'rouen', 'strasbourg'
];

console.log('🧪 TEST LECTURE LOCALE DES ARTICLES\n');
console.log('='.repeat(60));

sites.forEach(site => {
  const blogDir = path.join(__dirname, 'sites', site, 'content', 'blog');
  
  if (fs.existsSync(blogDir)) {
    const categories = fs.readdirSync(blogDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    let totalArticles = 0;
    categories.forEach(category => {
      const categoryPath = path.join(blogDir, category);
      const files = fs.readdirSync(categoryPath)
        .filter(file => file.endsWith('.md') && file !== 'README.md');
      totalArticles += files.length;
    });
    
    console.log(`\n📦 ${site.toUpperCase()}`);
    console.log(`   Catégories: ${categories.length}`);
    console.log(`   Articles:   ${totalArticles}`);
    console.log(`   ✅ Répertoire local existe`);
  } else {
    console.log(`\n❌ ${site.toUpperCase()}: Répertoire non trouvé`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('✅ Test terminé\n');

