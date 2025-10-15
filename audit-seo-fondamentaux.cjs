#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SITES = [
  'marseille', 'nantes', 'nice', 'lyon', 'montpellier',
  'rennes', 'lille', 'bordeaux', 'toulouse', 'rouen', 'strasbourg'
];

const DOMAINS = {
  marseille: 'devis-demenageur-marseille.fr',
  nantes: 'devis-demenageur-nantes.fr',
  nice: 'devis-demenageur-nice.fr',
  lyon: 'devis-demenageur-lyon.fr',
  montpellier: 'devis-demenageur-montpellier.fr',
  rennes: 'devis-demenageur-rennes.fr',
  lille: 'devis-demenageur-lille.fr',
  bordeaux: 'devis-demenageur-bordeaux.fr',
  toulouse: 'devis-demenageur-toulouse.fr',
  rouen: 'devis-demenageur-rouen.fr',
  strasbourg: 'devis-demenageur-strasbourg.fr'
};

console.log('🔍 AUDIT SEO FONDAMENTAUX - TOUS LES SITES');
console.log('='.repeat(80));
console.log('');

const results = {};

SITES.forEach(site => {
  const siteDir = path.join(__dirname, 'sites', site);
  results[site] = {
    site: site,
    domain: DOMAINS[site],
    scores: {},
    issues: [],
    recommendations: []
  };

  console.log(`\n📦 ${site.toUpperCase()}`);
  console.log('-'.repeat(80));

  // 1. STRUCTURE TECHNIQUE
  console.log('\n1️⃣ STRUCTURE TECHNIQUE');
  
  // robots.txt
  const robotsPath = path.join(siteDir, 'public', 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    const hasDisallow = robotsContent.includes('Disallow:');
    const hasSitemap = robotsContent.includes('Sitemap:');
    const correctDomain = robotsContent.includes(DOMAINS[site]);
    
    if (hasDisallow && hasSitemap && correctDomain) {
      console.log('   ✅ robots.txt : Complet et correct');
      results[site].scores.robots = 10;
    } else {
      console.log('   ⚠️  robots.txt : Incomplet');
      if (!correctDomain) {
        results[site].issues.push('robots.txt : domaine incorrect');
      }
      results[site].scores.robots = 7;
    }
  } else {
    console.log('   ❌ robots.txt : Manquant');
    results[site].scores.robots = 0;
    results[site].issues.push('robots.txt manquant');
  }

  // sitemap.ts
  const sitemapPath = path.join(siteDir, 'app', 'sitemap.ts');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const usesLocalFunction = sitemapContent.includes(`get${site.charAt(0).toUpperCase() + site.slice(1)}BlogPosts`);
    
    if (usesLocalFunction) {
      console.log('   ✅ sitemap.ts : Lecture locale');
      results[site].scores.sitemap = 10;
    } else {
      console.log('   ⚠️  sitemap.ts : Lecture globale (contenu dupliqué)');
      results[site].scores.sitemap = 5;
      results[site].issues.push('sitemap.ts lit contenu global');
    }
  } else {
    console.log('   ❌ sitemap.ts : Manquant');
    results[site].scores.sitemap = 0;
    results[site].issues.push('sitemap.ts manquant');
  }

  // next.config
  const nextConfigMjs = path.join(siteDir, 'next.config.mjs');
  const nextConfigJs = path.join(siteDir, 'next.config.js');
  const hasNextConfig = fs.existsSync(nextConfigMjs) || fs.existsSync(nextConfigJs);
  
  if (hasNextConfig) {
    const configPath = fs.existsSync(nextConfigMjs) ? nextConfigMjs : nextConfigJs;
    const configContent = fs.readFileSync(configPath, 'utf8');
    const hasImages = configContent.includes('images:');
    const hasCompress = configContent.includes('compress:');
    const hasPoweredByHeader = configContent.includes('poweredByHeader: false');
    
    let score = 10;
    if (!hasImages) score -= 2;
    if (!hasCompress) score -= 2;
    if (!hasPoweredByHeader) score -= 1;
    
    console.log(`   ✅ next.config : ${fs.existsSync(nextConfigMjs) ? 'mjs' : 'js'} (${score}/10)`);
    results[site].scores.nextConfig = score;
    
    if (!hasImages) results[site].recommendations.push('Ajouter config images dans next.config');
    if (!hasCompress) results[site].recommendations.push('Activer compression dans next.config');
  } else {
    console.log('   ❌ next.config : Manquant');
    results[site].scores.nextConfig = 0;
    results[site].issues.push('next.config manquant');
  }

  // 2. METADATA SEO
  console.log('\n2️⃣ METADATA SEO');
  
  const layoutPath = path.join(siteDir, 'app', 'layout.tsx');
  if (fs.existsSync(layoutPath)) {
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    
    // Title
    const hasTitle = layoutContent.includes('title:');
    const hasTitleTemplate = layoutContent.includes('template:');
    const titleCorrect = layoutContent.includes(site.charAt(0).toUpperCase() + site.slice(1));
    
    if (hasTitle && hasTitleTemplate) {
      if (titleCorrect) {
        console.log('   ✅ Title : Correct avec template');
        results[site].scores.title = 10;
      } else {
        console.log('   ⚠️  Title : Majuscule incorrecte (nantes → Nantes)');
        results[site].scores.title = 7;
        results[site].issues.push(`Title : "${site}" doit être "${site.charAt(0).toUpperCase() + site.slice(1)}"`);
      }
    } else {
      console.log('   ⚠️  Title : Incomplet');
      results[site].scores.title = 5;
    }
    
    // Description
    const hasDescription = layoutContent.includes('description:');
    const descLength = layoutContent.match(/description:\s*["'](.+?)["']/)?.[1]?.length || 0;
    
    if (hasDescription && descLength >= 50 && descLength <= 160) {
      console.log(`   ✅ Description : ${descLength} caractères (optimal)`);
      results[site].scores.description = 10;
    } else if (hasDescription) {
      console.log(`   ⚠️  Description : ${descLength} caractères (recommandé: 50-160)`);
      results[site].scores.description = 6;
      if (descLength < 50) results[site].recommendations.push('Description trop courte (< 50 car)');
      if (descLength > 160) results[site].recommendations.push('Description trop longue (> 160 car)');
    } else {
      console.log('   ❌ Description : Manquante');
      results[site].scores.description = 0;
      results[site].issues.push('Meta description manquante');
    }
    
    // OpenGraph
    const hasOpenGraph = layoutContent.includes('openGraph:');
    const hasOGImage = layoutContent.includes('og-image.jpg');
    
    if (hasOpenGraph && hasOGImage) {
      console.log('   ✅ OpenGraph : Complet');
      results[site].scores.openGraph = 10;
    } else if (hasOpenGraph) {
      console.log('   ⚠️  OpenGraph : Incomplet');
      results[site].scores.openGraph = 6;
    } else {
      console.log('   ❌ OpenGraph : Manquant');
      results[site].scores.openGraph = 0;
      results[site].issues.push('OpenGraph manquant');
    }
    
    // Canonical
    const hasMetadataBase = layoutContent.includes('metadataBase:');
    if (hasMetadataBase) {
      console.log('   ✅ Canonical : metadataBase configuré');
      results[site].scores.canonical = 10;
    } else {
      console.log('   ❌ Canonical : metadataBase manquant');
      results[site].scores.canonical = 0;
      results[site].issues.push('metadataBase manquant');
    }
    
  } else {
    console.log('   ❌ layout.tsx : Manquant');
    results[site].scores.metadata = 0;
    results[site].issues.push('layout.tsx manquant');
  }

  // 3. CONTENU
  console.log('\n3️⃣ CONTENU');
  
  const blogDir = path.join(siteDir, 'content', 'blog');
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
    
    console.log(`   ✅ Articles : ${totalArticles} articles locaux`);
    console.log(`   ✅ Catégories : ${categories.length}`);
    results[site].scores.content = totalArticles > 50 ? 10 : (totalArticles > 20 ? 7 : 5);
    results[site].totalArticles = totalArticles;
    results[site].totalCategories = categories.length;
    
    if (totalArticles < 50) {
      results[site].recommendations.push(`Augmenter le nombre d'articles (${totalArticles} < 50 optimal)`);
    }
  } else {
    console.log('   ❌ Blog : Répertoire manquant');
    results[site].scores.content = 0;
    results[site].issues.push('Répertoire blog manquant');
  }

  // 4. DONNÉES STRUCTURÉES
  console.log('\n4️⃣ DONNÉES STRUCTURÉES (Schema.org)');
  
  const structuredDataPath = path.join(siteDir, 'components', 'StructuredData.tsx');
  if (fs.existsSync(structuredDataPath)) {
    const structuredContent = fs.readFileSync(structuredDataPath, 'utf8');
    const hasLocalBusiness = structuredContent.includes('LocalBusiness');
    const hasAddress = structuredContent.includes('PostalAddress');
    const hasGeo = structuredContent.includes('GeoCoordinates');
    const hasRating = structuredContent.includes('AggregateRating');
    
    let schemaScore = 10;
    if (!hasAddress) schemaScore -= 3;
    if (!hasGeo) schemaScore -= 2;
    if (!hasRating) schemaScore -= 2;
    
    console.log(`   ✅ Schema.org : LocalBusiness (${schemaScore}/10)`);
    results[site].scores.schema = schemaScore;
    
    if (!hasAddress) results[site].recommendations.push('Ajouter PostalAddress au Schema');
    if (!hasGeo) results[site].recommendations.push('Ajouter GeoCoordinates au Schema');
    if (!hasRating) results[site].recommendations.push('Ajouter AggregateRating au Schema');
  } else {
    console.log('   ❌ Schema.org : Manquant');
    results[site].scores.schema = 0;
    results[site].issues.push('Données structurées manquantes');
  }

  // 5. PERFORMANCE
  console.log('\n5️⃣ PERFORMANCE');
  
  const middlewarePath = path.join(siteDir, 'middleware.js');
  if (fs.existsSync(middlewarePath)) {
    console.log('   ✅ Middleware : Présent');
    results[site].scores.middleware = 10;
  } else {
    console.log('   ⚠️  Middleware : Manquant');
    results[site].scores.middleware = 5;
    results[site].recommendations.push('Ajouter middleware.js pour headers sécurité');
  }
  
  // 6. SCORE GLOBAL
  const avgScore = Object.values(results[site].scores).reduce((a, b) => a + b, 0) / Object.keys(results[site].scores).length;
  results[site].globalScore = Math.round(avgScore * 10) / 10;
  
  console.log('\n' + '='.repeat(80));
  console.log(`📊 SCORE GLOBAL : ${results[site].globalScore}/10`);
  
  if (results[site].issues.length > 0) {
    console.log(`\n🚨 PROBLÈMES CRITIQUES (${results[site].issues.length}):`);
    results[site].issues.forEach(issue => console.log(`   • ${issue}`));
  }
  
  if (results[site].recommendations.length > 0) {
    console.log(`\n💡 RECOMMANDATIONS (${results[site].recommendations.length}):`);
    results[site].recommendations.forEach(rec => console.log(`   • ${rec}`));
  }
});

// SYNTHÈSE GLOBALE
console.log('\n\n');
console.log('📊 SYNTHÈSE GLOBALE');
console.log('='.repeat(80));

const globalStats = {
  avgScore: 0,
  totalIssues: 0,
  totalRecommendations: 0,
  totalArticles: 0
};

SITES.forEach(site => {
  globalStats.avgScore += results[site].globalScore;
  globalStats.totalIssues += results[site].issues.length;
  globalStats.totalRecommendations += results[site].recommendations.length;
  globalStats.totalArticles += results[site].totalArticles || 0;
});

globalStats.avgScore /= SITES.length;

console.log(`\n✅ Score moyen : ${Math.round(globalStats.avgScore * 10) / 10}/10`);
console.log(`🚨 Total problèmes : ${globalStats.totalIssues}`);
console.log(`💡 Total recommandations : ${globalStats.totalRecommendations}`);
console.log(`📝 Total articles : ${globalStats.totalArticles}`);

console.log('\n📋 CLASSEMENT PAR SCORE:');
const sorted = SITES.sort((a, b) => results[b].globalScore - results[a].globalScore);
sorted.forEach((site, index) => {
  const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
  console.log(`${medal} ${index + 1}. ${site.padEnd(15)} : ${results[site].globalScore}/10`);
});

// Sauvegarder les résultats
fs.writeFileSync(
  path.join(__dirname, 'AUDIT-SEO-RESULTS.json'),
  JSON.stringify(results, null, 2)
);

console.log('\n💾 Résultats sauvegardés dans AUDIT-SEO-RESULTS.json');
console.log('\n✅ Audit terminé !');

