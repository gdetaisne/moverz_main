#!/usr/bin/env node

/**
 * Analyse SEO des articles satellites
 * Vérifie frontmatter, contenu, liens internes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const CITIES = ['marseille', 'toulouse', 'lyon', 'bordeaux', 'nantes', 'lille', 'nice', 'strasbourg', 'rouen', 'rennes', 'montpellier'];

console.log('🔍 ANALYSE SEO ARTICLES SATELLITES');
console.log('===================================\n');

const results = {
  total: 0,
  issues: {
    noFrontmatter: [],
    noTitle: [],
    noDescription: [],
    noDate: [],
    tooShort: [],
    noInternalLinks: [],
    placeholders: [],
    batchFiles: [],
  }
};

CITIES.forEach(city => {
  const satellitesDir = path.join(rootDir, 'sites', city, 'content', 'blog', 'satellites');
  
  if (!fs.existsSync(satellitesDir)) {
    console.log(`⚠️  ${city}: Dossier satellites non trouvé\n`);
    return;
  }
  
  const files = fs.readdirSync(satellitesDir).filter(f => f.endsWith('.md'));
  console.log(`📍 ${city.toUpperCase()}: ${files.length} articles`);
  
  files.forEach(file => {
    results.total++;
    const filePath = path.join(satellitesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Détection placeholders
    if (file.includes('placeholder')) {
      results.issues.placeholders.push(`${city}/${file}`);
      return;
    }
    
    // Détection batch files
    if (file.includes('BATCH') || file.includes('PILIER') || file.includes('RAPPORT')) {
      results.issues.batchFiles.push(`${city}/${file}`);
      return;
    }
    
    // Vérifier frontmatter
    const hasFrontmatter = content.startsWith('---');
    if (!hasFrontmatter) {
      results.issues.noFrontmatter.push(`${city}/${file}`);
    }
    
    // Extraire frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      
      if (!frontmatter.includes('title:')) {
        results.issues.noTitle.push(`${city}/${file}`);
      }
      if (!frontmatter.includes('description:')) {
        results.issues.noDescription.push(`${city}/${file}`);
      }
      if (!frontmatter.includes('publishedAt:') && !frontmatter.includes('date:')) {
        results.issues.noDate.push(`${city}/${file}`);
      }
    }
    
    // Vérifier longueur
    const wordCount = content.split(/\s+/).length;
    if (wordCount < 300) {
      results.issues.tooShort.push(`${city}/${file} (${wordCount} mots)`);
    }
    
    // Vérifier liens internes
    const hasInternalLinks = content.includes('](/blog/') || content.includes('](../');
    if (!hasInternalLinks) {
      results.issues.noInternalLinks.push(`${city}/${file}`);
    }
  });
  
  console.log(`   ✅ ${files.length - results.issues.placeholders.filter(p => p.startsWith(city)).length - results.issues.batchFiles.filter(p => p.startsWith(city)).length} articles OK\n`);
});

console.log('\n📊 RAPPORT GLOBAL');
console.log('=================\n');
console.log(`Total articles analysés: ${results.total}`);
console.log(`\n🚨 PROBLÈMES CRITIQUES:\n`);
console.log(`❌ Placeholders: ${results.issues.placeholders.length}`);
console.log(`❌ Batch files: ${results.issues.batchFiles.length}`);
console.log(`\n⚠️  PROBLÈMES SEO:\n`);
console.log(`📝 Sans title: ${results.issues.noTitle.length}`);
console.log(`📝 Sans description: ${results.issues.noDescription.length}`);
console.log(`📅 Sans date: ${results.issues.noDate.length}`);
console.log(`📏 Trop courts (<300 mots): ${results.issues.tooShort.length}`);
console.log(`🔗 Sans liens internes: ${results.issues.noInternalLinks.length}`);

// Top 10 problèmes
console.log(`\n🔥 TOP PROBLÈMES À CORRIGER:\n`);

if (results.issues.placeholders.length > 0) {
  console.log(`\n1️⃣ PLACEHOLDERS (${results.issues.placeholders.length} fichiers)`);
  results.issues.placeholders.slice(0, 5).forEach(f => console.log(`   - ${f}`));
  if (results.issues.placeholders.length > 5) console.log(`   ... et ${results.issues.placeholders.length - 5} autres`);
}

if (results.issues.batchFiles.length > 0) {
  console.log(`\n2️⃣ BATCH FILES (${results.issues.batchFiles.length} fichiers)`);
  results.issues.batchFiles.forEach(f => console.log(`   - ${f}`));
}

// Sauvegarder rapport
const report = {
  date: new Date().toISOString(),
  totalArticles: results.total,
  issues: results.issues,
};

fs.writeFileSync(
  path.join(rootDir, 'ANALYSE-SATELLITES-SEO.json'),
  JSON.stringify(report, null, 2)
);

console.log(`\n💾 Rapport sauvegardé: ANALYSE-SATELLITES-SEO.json\n`);

