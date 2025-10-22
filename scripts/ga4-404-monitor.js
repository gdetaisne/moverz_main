/**
 * MOVERZ - Détection automatique des 404 via GA4 API
 * 
 * Ce script :
 * 1. Se connecte à l'API GA4
 * 2. Récupère les pages avec titre "404: This page could not be found"
 * 3. Groupe par page_referrer
 * 4. Exporte les patterns récurrents (>10 hits/semaine)
 * 5. Suggère automatiquement des redirections
 * 
 * Installation:
 * npm install @google-analytics/data dotenv
 * 
 * Configuration:
 * Créer un fichier .env avec:
 * GA4_PROPERTY_ID=votre-property-id
 * GOOGLE_APPLICATION_CREDENTIALS=chemin/vers/service-account.json
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import fs from 'fs';
import path from 'path';

// Configuration
const PROPERTY_ID = process.env.GA4_PROPERTY_ID || 'properties/YOUR_PROPERTY_ID';
const THRESHOLD_VIEWS = 10; // Minimum de vues pour considérer une redirection
const OUTPUT_DIR = './scripts/reports';
const OUTPUT_FILE = 'ga4-404-report.json';

// Mapping intelligent des URLs cassées vers destinations
const SMART_REDIRECTS = {
  '/blog': '/actualites',
  '/estimation-rapide': '/devis',
  '/inventaire-ia': '/analyse-ia',
  '/analyse-ia': '/analyse-ia', // Vérifier que cette page existe
  '/devis-gratuit': '/devis',
  '/contact-rapide': '/contact',
  '/quartiers': '/quartiers-{city}', // À personnaliser par ville
};

/**
 * Initialise le client GA4
 */
function initializeAnalytics() {
  return new BetaAnalyticsDataClient();
}

/**
 * Récupère les données 404 depuis GA4
 */
async function fetch404Data(analyticsDataClient, daysAgo = 7) {
  const [response] = await analyticsDataClient.runReport({
    property: PROPERTY_ID,
    dateRanges: [
      {
        startDate: `${daysAgo}daysAgo`,
        endDate: 'today',
      },
    ],
    dimensions: [
      { name: 'pageTitle' },
      { name: 'pagePath' },
      { name: 'pageReferrer' },
      { name: 'fullPageUrl' },
    ],
    metrics: [
      { name: 'screenPageViews' },
    ],
    dimensionFilter: {
      filter: {
        fieldName: 'pageTitle',
        stringFilter: {
          matchType: 'EXACT',
          value: '404: This page could not be found',
        },
      },
    },
    orderBys: [
      {
        metric: {
          metricName: 'screenPageViews',
        },
        desc: true,
      },
    ],
    limit: 100,
  });

  return response;
}

/**
 * Analyse et groupe les données 404
 */
function analyze404Patterns(response) {
  const patterns = {};
  const totalViews = { count: 0 };

  if (!response.rows || response.rows.length === 0) {
    console.log('✅ Aucun 404 détecté dans la période !');
    return { patterns: {}, totalViews: 0, recommendations: [] };
  }

  response.rows.forEach((row) => {
    const pageTitle = row.dimensionValues[0].value;
    const pagePath = row.dimensionValues[1].value;
    const pageReferrer = row.dimensionValues[2].value;
    const fullPageUrl = row.dimensionValues[3].value;
    const views = parseInt(row.metricValues[0].value);

    totalViews.count += views;

    // Extraire le domaine depuis fullPageUrl
    let domain = 'unknown';
    try {
      const url = new URL(fullPageUrl);
      domain = url.hostname;
    } catch (e) {
      // Si l'URL est relative ou invalide
      domain = 'relative-url';
    }

    // Créer une clé unique pour grouper
    const key = `${domain}|${pagePath}`;

    if (!patterns[key]) {
      patterns[key] = {
        domain,
        path: pagePath,
        views: 0,
        referrers: [],
        fullUrls: new Set(),
      };
    }

    patterns[key].views += views;
    patterns[key].referrers.push({
      referrer: pageReferrer,
      views,
    });
    patterns[key].fullUrls.add(fullPageUrl);
  });

  // Convertir les Sets en Arrays
  Object.keys(patterns).forEach((key) => {
    patterns[key].fullUrls = Array.from(patterns[key].fullUrls);
  });

  // Générer des recommandations
  const recommendations = generateRecommendations(patterns);

  return {
    patterns,
    totalViews: totalViews.count,
    recommendations,
  };
}

/**
 * Génère des recommandations de redirection intelligentes
 */
function generateRecommendations(patterns) {
  const recommendations = [];

  Object.values(patterns).forEach((pattern) => {
    if (pattern.views >= THRESHOLD_VIEWS) {
      const sourcePath = pattern.path;
      let suggestedDestination = '/';

      // Recherche intelligente de destination
      for (const [source, dest] of Object.entries(SMART_REDIRECTS)) {
        if (sourcePath.includes(source)) {
          suggestedDestination = dest;
          break;
        }
      }

      // Extraire la ville du domaine si applicable
      const cityMatch = pattern.domain.match(/devis-demenageur-(\w+)\.fr/);
      if (cityMatch && suggestedDestination.includes('{city}')) {
        suggestedDestination = suggestedDestination.replace('{city}', cityMatch[1]);
      }

      recommendations.push({
        source: sourcePath,
        destination: suggestedDestination,
        views: pattern.views,
        domain: pattern.domain,
        priority: pattern.views > 50 ? 'HAUTE' : pattern.views > 20 ? 'MOYENNE' : 'BASSE',
        topReferrers: pattern.referrers
          .sort((a, b) => b.views - a.views)
          .slice(0, 3),
      });
    }
  });

  // Trier par nombre de vues décroissant
  recommendations.sort((a, b) => b.views - a.views);

  return recommendations;
}

/**
 * Exporte le rapport en JSON
 */
function exportReport(data, filename = OUTPUT_FILE) {
  // Créer le dossier de sortie s'il n'existe pas
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, filename);
  const timestamp = new Date().toISOString();

  const report = {
    generatedAt: timestamp,
    period: '7 derniers jours',
    threshold: THRESHOLD_VIEWS,
    summary: {
      totalViews: data.totalViews,
      uniquePatterns: Object.keys(data.patterns).length,
      recommendationsCount: data.recommendations.length,
    },
    patterns: data.patterns,
    recommendations: data.recommendations,
  };

  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`\n📄 Rapport exporté: ${outputPath}`);

  return report;
}

/**
 * Affiche un résumé dans la console
 */
function displaySummary(report) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 MOVERZ - RAPPORT 404 GA4');
  console.log('='.repeat(60));
  console.log(`📅 Période: ${report.period}`);
  console.log(`👁️  Total vues 404: ${report.summary.totalViews}`);
  console.log(`🔗 Patterns uniques: ${report.summary.uniquePatterns}`);
  console.log(`💡 Recommandations: ${report.summary.recommendationsCount}`);
  console.log('='.repeat(60));

  if (report.recommendations.length > 0) {
    console.log('\n🎯 TOP REDIRECTIONS RECOMMANDÉES:\n');
    report.recommendations.slice(0, 10).forEach((rec, index) => {
      console.log(`${index + 1}. [${rec.priority}] ${rec.source}`);
      console.log(`   → ${rec.destination}`);
      console.log(`   📈 ${rec.views} vues | 🌐 ${rec.domain}`);
      console.log(`   🔗 Top référent: ${rec.topReferrers[0]?.referrer || 'N/A'}\n`);
    });
  } else {
    console.log('\n✅ Aucune redirection nécessaire pour le moment.\n');
  }

  console.log('='.repeat(60));
}

/**
 * Génère le code de redirection Next.js
 */
function generateNextJsRedirects(recommendations) {
  const redirects = recommendations.map((rec) => ({
    source: rec.source,
    destination: rec.destination,
    permanent: true,
  }));

  const code = `// Généré automatiquement le ${new Date().toISOString()}
// À intégrer dans next.config.mjs

export const autoGeneratedRedirects = ${JSON.stringify(redirects, null, 2)};
`;

  const outputPath = path.join(OUTPUT_DIR, 'next-redirects-auto.mjs');
  fs.writeFileSync(outputPath, code);
  console.log(`\n📝 Redirections Next.js générées: ${outputPath}`);
}

/**
 * Main
 */
async function main() {
  try {
    console.log('🚀 Démarrage du monitoring 404...\n');

    const analyticsDataClient = initializeAnalytics();
    const response = await fetch404Data(analyticsDataClient, 7);
    const analysis = analyze404Patterns(response);
    const report = exportReport(analysis);

    displaySummary(report);

    if (report.recommendations.length > 0) {
      generateNextJsRedirects(report.recommendations);
    }

    console.log('\n✅ Analyse terminée avec succès!\n');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error('\n💡 Vérifiez:');
    console.error('   1. GA4_PROPERTY_ID dans .env');
    console.error('   2. GOOGLE_APPLICATION_CREDENTIALS configuré');
    console.error('   3. Permissions GA4 Data API activées\n');
    process.exit(1);
  }
}

// Exécution
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { fetch404Data, analyze404Patterns, generateRecommendations };

