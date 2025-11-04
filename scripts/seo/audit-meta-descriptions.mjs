#!/usr/bin/env node

/**
 * Audit Meta Descriptions - Moverz 11 Villes
 * 
 * Scanne les meta descriptions et mesure leurs longueurs
 * Identifie les pages sous-optimisées (< 150 chars)
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const SITES_DIR = './sites';
const OPTIMAL_MIN = 150;
const OPTIMAL_MAX = 160;

const results = [];

// Villes à analyser
const cities = [
  'nice', 'lyon', 'marseille', 'bordeaux', 'nantes',
  'rennes', 'rouen', 'strasbourg', 'lille', 'montpellier', 'toulouse'
];

// Patterns de fichiers à analyser
const pagesConfig = [
  { path: 'app/page.tsx', type: 'Homepage', priority: 'P0' },
  { path: 'app/faq/layout.tsx', type: 'FAQ', priority: 'P0' },
  { path: 'app/contact/page.tsx', type: 'Contact', priority: 'P1' },
  { path: 'app/services/demenagement-standard-${city}/page.tsx', type: 'Service Standard', priority: 'P0' },
  { path: 'app/services/demenagement-economique-${city}/page.tsx', type: 'Service Économique', priority: 'P1' },
  { path: 'app/services/demenagement-premium-${city}/page.tsx', type: 'Service Premium', priority: 'P1' },
  { path: 'app/notre-offre/page.tsx', type: 'Notre Offre', priority: 'P1' },
  { path: 'app/partenaires/page.tsx', type: 'Partenaires', priority: 'P2' },
  { path: 'app/blog/page.tsx', type: 'Blog', priority: 'P2' },
];

function extractDescription(content) {
  // Chercher description: "..." ou description: '...'
  const patterns = [
    /description:\s*"([^"]+)"/,
    /description:\s*'([^']+)'/,
    /description:\s*`([^`]+)`/,
    /description:\s*:\s*\n\s*"([^"]+)"/,
    /description:\s*:\s*\n\s*`([^`]+)`/,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      // Remplacer ${city.nameCapitalized} par [VILLE] pour mesure
      let desc = match[1]
        .replace(/\$\{city\.nameCapitalized\}/g, '[VILLE]')
        .replace(/\$\{city\.slug\}/g, '[ville]')
        .trim();
      return desc;
    }
  }
  return null;
}

function analyzeDescription(desc) {
  const length = desc.length;
  let status = '✅ OK';
  let recommendation = '';

  if (length < OPTIMAL_MIN) {
    status = '⚠️ COURT';
    recommendation = `Ajouter ${OPTIMAL_MIN - length} caractères`;
  } else if (length > OPTIMAL_MAX) {
    status = '🟡 LONG';
    recommendation = `Réduire de ${length - OPTIMAL_MAX} caractères`;
  }

  return { length, status, recommendation };
}

// Scanner chaque ville
for (const city of cities) {
  const siteDir = join(SITES_DIR, city);

  for (const pageConfig of pagesConfig) {
    const pagePath = pageConfig.path.replace('${city}', city);
    const fullPath = join(siteDir, pagePath);

    try {
      const content = readFileSync(fullPath, 'utf-8');
      const description = extractDescription(content);

      if (description) {
        const analysis = analyzeDescription(description);

        results.push({
          city,
          type: pageConfig.type,
          priority: pageConfig.priority,
          description: description.substring(0, 100) + (description.length > 100 ? '...' : ''),
          ...analysis,
        });
      }
    } catch (err) {
      // Fichier n'existe pas, skip
    }
  }
}

// Grouper par priorité
const byPriority = {
  P0: results.filter(r => r.priority === 'P0'),
  P1: results.filter(r => r.priority === 'P1'),
  P2: results.filter(r => r.priority === 'P2'),
};

// Afficher rapport
console.log('\n🎯 AUDIT META DESCRIPTIONS - 11 VILLES MOVERZ\n');
console.log(`Total pages analysées : ${results.length}`);
console.log(`\n📊 STATISTIQUES GLOBALES\n`);

const stats = {
  total: results.length,
  ok: results.filter(r => r.status === '✅ OK').length,
  court: results.filter(r => r.status === '⚠️ COURT').length,
  long: results.filter(r => r.status === '🟡 LONG').length,
};

const avgLength = Math.round(results.reduce((sum, r) => sum + r.length, 0) / results.length);

console.log(`Moyenne longueur : ${avgLength} caractères`);
console.log(`✅ OK (150-160 chars) : ${stats.ok} (${Math.round(stats.ok / stats.total * 100)}%)`);
console.log(`⚠️ COURT (< 150) : ${stats.court} (${Math.round(stats.court / stats.total * 100)}%)`);
console.log(`🟡 LONG (> 160) : ${stats.long} (${Math.round(stats.long / stats.total * 100)}%)`);

// Détail par priorité
for (const [priority, pages] of Object.entries(byPriority)) {
  if (pages.length === 0) continue;

  console.log(`\n\n🔴 PRIORITÉ ${priority} (${pages.length} pages)\n`);
  console.log('─'.repeat(100));

  // Grouper par type
  const byType = {};
  pages.forEach(p => {
    if (!byType[p.type]) byType[p.type] = [];
    byType[p.type].push(p);
  });

  for (const [type, items] of Object.entries(byType)) {
    const avgLen = Math.round(items.reduce((sum, i) => sum + i.length, 0) / items.length);
    const needsWork = items.filter(i => i.status !== '✅ OK').length;

    console.log(`\n${type} (${items.length} pages, moyenne: ${avgLen} chars)`);

    if (needsWork > 0) {
      console.log(`  ⚠️ ${needsWork} pages à optimiser :`);
      items.filter(i => i.status !== '✅ OK').slice(0, 3).forEach(item => {
        console.log(`    - ${item.city}: ${item.length} chars ${item.status} (${item.recommendation})`);
      });
      if (needsWork > 3) {
        console.log(`    ... et ${needsWork - 3} autres villes`);
      }
    } else {
      console.log(`  ✅ Toutes les pages OK`);
    }
  }
}

// Recommandations
console.log(`\n\n💡 RECOMMANDATIONS\n`);
console.log('─'.repeat(100));

const workNeeded = results.filter(r => r.status !== '✅ OK');
console.log(`\n${workNeeded.length} pages nécessitent optimisation\n`);

const p0Needs = byPriority.P0.filter(r => r.status !== '✅ OK');
if (p0Needs.length > 0) {
  console.log(`🔴 PRIORITÉ IMMÉDIATE : ${p0Needs.length} pages P0`);
  console.log(`   Types: Homepages, FAQ, Services Standard`);
  console.log(`   Impact: +15-20% CTR attendu`);
  console.log(`   Temps: 2-3h`);
}

const p1Needs = byPriority.P1.filter(r => r.status !== '✅ OK');
if (p1Needs.length > 0) {
  console.log(`\n🟠 PRIORITÉ HAUTE : ${p1Needs.length} pages P1`);
  console.log(`   Types: Services éco/premium, Contact, Notre Offre`);
  console.log(`   Impact: +10-12% CTR attendu`);
  console.log(`   Temps: 2-3h`);
}

console.log(`\n📈 ROI ESTIMÉ`);
console.log(`   Investissement: 4-6h`);
console.log(`   Impact business: +10-15% leads`);
console.log(`   Gain estimé: +500-750€/mois`);

console.log('\n');

