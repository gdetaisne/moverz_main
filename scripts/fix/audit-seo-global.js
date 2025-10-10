#!/usr/bin/env node

/**
 * AUDIT SEO GLOBAL - Détection de duplicates et problèmes SEO
 * Analyse tous les sites pour détecter:
 * - Titles dupliqués
 * - Meta descriptions dupliquées
 * - Titles/descriptions manquants
 * - H1 dupliqués ou manquants
 * - Problèmes de longueur
 */

const fs = require('fs');
const path = require('path');

const SITES_DIR = path.join(__dirname, 'sites');
const CITIES = ['bordeaux', 'lille', 'lyon', 'marseille', 'montpellier', 'nantes', 'nice', 'rennes', 'rouen', 'strasbourg', 'toulouse'];

// Seuils recommandés
const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESC_MIN = 120;
const DESC_MAX = 160;

const results = {
  sites: {},
  globalIssues: {
    duplicateTitles: {},
    duplicateDescriptions: {},
    duplicateH1s: {},
  },
  summary: {
    totalPages: 0,
    pagesWithIssues: 0,
    criticalIssues: 0,
    warnings: 0,
  }
};

function extractMetadata(filePath, content) {
  const issues = [];
  const warnings = [];
  
  // Extraction du title
  let title = null;
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  const titleMatch2 = content.match(/<title>([^<]+)<\/title>/);
  
  if (titleMatch) {
    title = titleMatch[1];
  } else if (titleMatch2) {
    title = titleMatch2[1];
  }
  
  if (!title) {
    issues.push('⛔ Title manquant');
  } else {
    if (title.length < TITLE_MIN) {
      warnings.push(`⚠️  Title trop court (${title.length} chars): "${title}"`);
    }
    if (title.length > TITLE_MAX) {
      warnings.push(`⚠️  Title trop long (${title.length} chars): "${title}"`);
    }
  }
  
  // Extraction de la description
  let description = null;
  const descMatch = content.match(/description:\s*["']([^"']+)["']/);
  const descMatch2 = content.match(/name=["']description["']\s+content=["']([^"']+)["']/);
  
  if (descMatch) {
    description = descMatch[1];
  } else if (descMatch2) {
    description = descMatch2[1];
  }
  
  if (!description) {
    issues.push('⛔ Meta description manquante');
  } else {
    if (description.length < DESC_MIN) {
      warnings.push(`⚠️  Description trop courte (${description.length} chars)`);
    }
    if (description.length > DESC_MAX) {
      warnings.push(`⚠️  Description trop longue (${description.length} chars)`);
    }
  }
  
  // Extraction du H1
  let h1 = null;
  const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
  const h1Match2 = content.match(/className="[^"]*h1[^"]*">([^<]+)</);
  
  if (h1Match) {
    h1 = h1Match[1];
  } else if (h1Match2) {
    h1 = h1Match2[1];
  }
  
  if (!h1) {
    warnings.push('⚠️  H1 non détecté (peut être dynamique)');
  }
  
  return {
    title,
    description,
    h1,
    issues,
    warnings
  };
}

function scanPages(city, appDir) {
  const pages = [];
  
  function scanDir(dir, urlPath = '') {
    if (!fs.existsSync(dir)) return;
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Ignorer certains dossiers
        if (entry.name.startsWith('_') || entry.name === 'api' || entry.name === 'faq-data') {
          continue;
        }
        
        const newUrlPath = urlPath + '/' + entry.name;
        scanDir(fullPath, newUrlPath);
      } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const metadata = extractMetadata(fullPath, content);
        
        const url = urlPath || '/';
        
        pages.push({
          path: fullPath.replace(SITES_DIR + '/', ''),
          url,
          ...metadata
        });
      }
    }
  }
  
  scanDir(appDir);
  return pages;
}

function analyzeCity(city) {
  const cityDir = path.join(SITES_DIR, city);
  const appDir = path.join(cityDir, 'app');
  
  if (!fs.existsSync(appDir)) {
    console.log(`⚠️  ${city}: dossier app/ introuvable`);
    return;
  }
  
  console.log(`\n🔍 Analyse de ${city}...`);
  const pages = scanPages(city, appDir);
  
  results.sites[city] = {
    totalPages: pages.length,
    pages: [],
    issues: {
      missingTitles: 0,
      missingDescriptions: 0,
      missingH1s: 0,
      titleTooShort: 0,
      titleTooLong: 0,
      descTooShort: 0,
      descTooLong: 0,
    }
  };
  
  results.summary.totalPages += pages.length;
  
  for (const page of pages) {
    const pageIssues = [...page.issues, ...page.warnings];
    
    if (pageIssues.length > 0) {
      results.summary.pagesWithIssues++;
      results.summary.criticalIssues += page.issues.length;
      results.summary.warnings += page.warnings.length;
    }
    
    // Compteurs d'issues
    if (!page.title) results.sites[city].issues.missingTitles++;
    if (!page.description) results.sites[city].issues.missingDescriptions++;
    if (!page.h1) results.sites[city].issues.missingH1s++;
    if (page.title && page.title.length < TITLE_MIN) results.sites[city].issues.titleTooShort++;
    if (page.title && page.title.length > TITLE_MAX) results.sites[city].issues.titleTooLong++;
    if (page.description && page.description.length < DESC_MIN) results.sites[city].issues.descTooShort++;
    if (page.description && page.description.length > DESC_MAX) results.sites[city].issues.descTooLong++;
    
    // Enregistrement des duplicates globaux
    if (page.title) {
      if (!results.globalIssues.duplicateTitles[page.title]) {
        results.globalIssues.duplicateTitles[page.title] = [];
      }
      results.globalIssues.duplicateTitles[page.title].push({
        city,
        url: page.url,
        path: page.path
      });
    }
    
    if (page.description) {
      if (!results.globalIssues.duplicateDescriptions[page.description]) {
        results.globalIssues.duplicateDescriptions[page.description] = [];
      }
      results.globalIssues.duplicateDescriptions[page.description].push({
        city,
        url: page.url,
        path: page.path
      });
    }
    
    if (page.h1) {
      if (!results.globalIssues.duplicateH1s[page.h1]) {
        results.globalIssues.duplicateH1s[page.h1] = [];
      }
      results.globalIssues.duplicateH1s[page.h1].push({
        city,
        url: page.url,
        path: page.path
      });
    }
    
    results.sites[city].pages.push({
      url: page.url,
      path: page.path,
      title: page.title,
      description: page.description,
      h1: page.h1,
      issues: pageIssues
    });
  }
  
  console.log(`   ✅ ${pages.length} pages analysées`);
}

function generateReport() {
  console.log('\n\n' + '='.repeat(80));
  console.log('📊 RAPPORT D\'AUDIT SEO GLOBAL - TOUS SITES');
  console.log('='.repeat(80));
  
  // Résumé général
  console.log('\n🎯 RÉSUMÉ GÉNÉRAL');
  console.log('─'.repeat(80));
  console.log(`Total de pages analysées: ${results.summary.totalPages}`);
  console.log(`Pages avec problèmes: ${results.summary.pagesWithIssues}`);
  console.log(`Issues critiques: ${results.summary.criticalIssues}`);
  console.log(`Warnings: ${results.summary.warnings}`);
  
  // Duplicates de titles
  console.log('\n\n🚨 TITLES DUPLIQUÉS (critique pour SEO)');
  console.log('─'.repeat(80));
  
  const duplicateTitles = Object.entries(results.globalIssues.duplicateTitles)
    .filter(([_, pages]) => pages.length > 1)
    .sort((a, b) => b[1].length - a[1].length);
  
  if (duplicateTitles.length === 0) {
    console.log('✅ Aucun title dupliqué détecté !');
  } else {
    console.log(`⛔ ${duplicateTitles.length} titles dupliqués détectés\n`);
    
    duplicateTitles.slice(0, 20).forEach(([title, pages], idx) => {
      console.log(`\n${idx + 1}. Title: "${title}"`);
      console.log(`   Utilisé sur ${pages.length} pages:`);
      pages.forEach(p => {
        console.log(`   • ${p.city}: ${p.url}`);
        console.log(`     ${p.path}`);
      });
    });
    
    if (duplicateTitles.length > 20) {
      console.log(`\n... et ${duplicateTitles.length - 20} autres titles dupliqués`);
    }
  }
  
  // Duplicates de descriptions
  console.log('\n\n⚠️  META DESCRIPTIONS DUPLIQUÉES');
  console.log('─'.repeat(80));
  
  const duplicateDescriptions = Object.entries(results.globalIssues.duplicateDescriptions)
    .filter(([_, pages]) => pages.length > 1)
    .sort((a, b) => b[1].length - a[1].length);
  
  if (duplicateDescriptions.length === 0) {
    console.log('✅ Aucune description dupliquée détectée !');
  } else {
    console.log(`⚠️  ${duplicateDescriptions.length} descriptions dupliquées détectées\n`);
    
    duplicateDescriptions.slice(0, 10).forEach(([desc, pages], idx) => {
      console.log(`\n${idx + 1}. Description: "${desc.substring(0, 80)}..."`);
      console.log(`   Utilisée sur ${pages.length} pages:`);
      pages.slice(0, 5).forEach(p => {
        console.log(`   • ${p.city}: ${p.url}`);
      });
      if (pages.length > 5) {
        console.log(`   ... et ${pages.length - 5} autres pages`);
      }
    });
    
    if (duplicateDescriptions.length > 10) {
      console.log(`\n... et ${duplicateDescriptions.length - 10} autres descriptions dupliquées`);
    }
  }
  
  // Rapport par ville
  console.log('\n\n📍 RAPPORT DÉTAILLÉ PAR VILLE');
  console.log('─'.repeat(80));
  
  for (const [city, data] of Object.entries(results.sites)) {
    console.log(`\n${city.toUpperCase()} - ${data.totalPages} pages`);
    console.log('  Issues:');
    console.log(`    • Titles manquants: ${data.issues.missingTitles}`);
    console.log(`    • Descriptions manquantes: ${data.issues.missingDescriptions}`);
    console.log(`    • H1 non détectés: ${data.issues.missingH1s}`);
    console.log(`    • Titles trop courts: ${data.issues.titleTooShort}`);
    console.log(`    • Titles trop longs: ${data.issues.titleTooLong}`);
    console.log(`    • Descriptions trop courtes: ${data.issues.descTooShort}`);
    console.log(`    • Descriptions trop longues: ${data.issues.descTooLong}`);
    
    // Pages avec problèmes
    const pagesWithIssues = data.pages.filter(p => p.issues.length > 0);
    if (pagesWithIssues.length > 0) {
      console.log(`\n  📄 Pages avec problèmes (${pagesWithIssues.length}):`);
      pagesWithIssues.slice(0, 5).forEach(page => {
        console.log(`\n    ${page.url}`);
        console.log(`    Title: ${page.title || '❌ MANQUANT'}`);
        page.issues.forEach(issue => {
          console.log(`    ${issue}`);
        });
      });
      if (pagesWithIssues.length > 5) {
        console.log(`\n    ... et ${pagesWithIssues.length - 5} autres pages avec problèmes`);
      }
    }
  }
  
  // Recommandations
  console.log('\n\n💡 RECOMMANDATIONS PRIORITAIRES');
  console.log('─'.repeat(80));
  
  if (duplicateTitles.length > 0) {
    console.log('1. 🚨 CRITIQUE: Corriger tous les titles dupliqués');
    console.log('   Chaque page doit avoir un title unique et descriptif.');
    console.log(`   → ${duplicateTitles.length} titles à corriger\n`);
  }
  
  if (duplicateDescriptions.length > 0) {
    console.log('2. ⚠️  IMPORTANT: Corriger les descriptions dupliquées');
    console.log('   Chaque page devrait avoir une description unique.');
    console.log(`   → ${duplicateDescriptions.length} descriptions à corriger\n`);
  }
  
  const totalMissingTitles = Object.values(results.sites).reduce((sum, s) => sum + s.issues.missingTitles, 0);
  if (totalMissingTitles > 0) {
    console.log('3. 🚨 CRITIQUE: Ajouter les titles manquants');
    console.log(`   → ${totalMissingTitles} pages sans title\n`);
  }
  
  const totalMissingDescs = Object.values(results.sites).reduce((sum, s) => sum + s.issues.missingDescriptions, 0);
  if (totalMissingDescs > 0) {
    console.log('4. ⚠️  IMPORTANT: Ajouter les descriptions manquantes');
    console.log(`   → ${totalMissingDescs} pages sans description\n`);
  }
  
console.log('\n' + '='.repeat(80));
console.log('📝 Rapport complet sauvegardé dans: AUDIT_SEO_RAPPORT.json');
console.log('='.repeat(80) + '\n');
}

// Exécution
console.log('🚀 Démarrage de l\'audit SEO global...\n');

for (const city of CITIES) {
  analyzeCity(city);
}

generateReport();

// Extraire les duplicates pour le exit code
const duplicateTitles = Object.entries(results.globalIssues.duplicateTitles)
  .filter(([_, pages]) => pages.length > 1);

// Sauvegarde du rapport JSON
fs.writeFileSync(
  path.join(__dirname, 'AUDIT_SEO_RAPPORT.json'),
  JSON.stringify(results, null, 2)
);

// Génération d'un fichier CSV pour les duplicates
let csv = 'Type,Contenu,Nombre de pages,Villes concernées,URLs\n';

Object.entries(results.globalIssues.duplicateTitles)
  .filter(([_, pages]) => pages.length > 1)
  .forEach(([title, pages]) => {
    const cities = [...new Set(pages.map(p => p.city))].join('; ');
    const urls = pages.map(p => `${p.city}${p.url}`).join('; ');
    csv += `Title,"${title.replace(/"/g, '""')}",${pages.length},"${cities}","${urls}"\n`;
  });

Object.entries(results.globalIssues.duplicateDescriptions)
  .filter(([_, pages]) => pages.length > 1)
  .forEach(([desc, pages]) => {
    const cities = [...new Set(pages.map(p => p.city))].join('; ');
    const urls = pages.map(p => `${p.city}${p.url}`).join('; ');
    csv += `Description,"${desc.replace(/"/g, '""')}",${pages.length},"${cities}","${urls}"\n`;
  });

fs.writeFileSync(
  path.join(__dirname, 'AUDIT_SEO_DUPLICATES.csv'),
  csv
);

console.log('✅ Fichiers générés:');
console.log('   • AUDIT_SEO_RAPPORT.json (données complètes)');
console.log('   • AUDIT_SEO_DUPLICATES.csv (pour Excel/Google Sheets)');

process.exit(duplicateTitles.length > 0 ? 1 : 0);

