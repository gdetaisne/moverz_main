#!/usr/bin/env node
/**
 * Génération titles optimisés pour articles prix (intent commercial)
 * Basé sur extraction-prix-articles.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const data = JSON.parse(readFileSync('extraction-prix-articles.json', 'utf-8'));

// Templates par type d'article (intent commercial investigation)
const TEMPLATES = {
  // Article prix général ville
  'prix-general': (ville: string) => 
    `Prix Déménagement ${capitalize(ville)} 2025 : Studio 450-1000€, T2 750-1600€, T3 1250-2500€`,
  
  // Article T2 spécifique
  'prix-t2': (ville: string) =>
    `Prix Déménagement T2 ${capitalize(ville)} 2025 : 750-1600€ selon Distance`,
  
  // Article T3 spécifique
  'prix-t3': (ville: string) =>
    `Prix Déménagement T3 ${capitalize(ville)} 2025 : 1250-2500€ (Fourchettes Réelles)`,
  
  // Article garde-meuble
  'garde-meuble': (ville: string) =>
    `Garde-Meuble ${capitalize(ville)} 2025 : 1m² 30-75€/mois, 5m² 90-250€/mois`,
  
  // Article déménageur (comparatif)
  'demenageur': (ville: string) =>
    `Meilleurs Déménageurs ${capitalize(ville)} 2025 : Comparatif 12 Pros + Avis`,
  
  // Article longue distance
  'longue-distance': (ville: string, destination?: string) =>
    destination 
      ? `Prix Déménagement ${capitalize(ville)} → ${destination} 2025 : 1200-3500€ (800km)`
      : `Prix Déménagement Longue Distance ${capitalize(ville)} 2025 : 1200-3500€`,
  
  // Article international
  'international': (ville: string, pays?: string) =>
    pays
      ? `Déménagement ${capitalize(ville)} → ${pays} 2025 : 3000-8000€ (Maritime/Aérien)`
      : `Déménagement International ${capitalize(ville)} 2025 : 3000-8000€`,
  
  // Article piano
  'piano': (ville: string) =>
    `Déménagement Piano ${capitalize(ville)} 2025 : Droit 250-400€, Queue 400-700€`,
  
  // Fallback
  'default': (ville: string, type: string) =>
    `${capitalize(type)} ${capitalize(ville)} 2025 : Guide Prix Détaillé`
};

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function detectType(article: any): string {
  const slug = article.slug.toLowerCase();
  const title = article.title.toLowerCase();
  
  if (slug.includes('t2') || title.includes('t2')) return 'prix-t2';
  if (slug.includes('t3') || title.includes('t3')) return 'prix-t3';
  if (slug.includes('garde-meuble') || slug.includes('stockage')) return 'garde-meuble';
  if (slug.includes('demenageur') && !slug.includes('prix')) return 'demenageur';
  if (slug.includes('international')) return 'international';
  if (slug.includes('piano')) return 'piano';
  if (slug.includes('longue-distance') || slug.includes('vers-')) return 'longue-distance';
  if (slug.includes('prix-demenagement') && slug.includes('guide')) return 'prix-general';
  
  return 'default';
}

// Générer titles optimisés
console.log('🎯 Génération titles optimisés (intent commercial)...\n');

const updates = data.articles.map((article: any) => {
  const type = detectType(article);
  const template = TEMPLATES[type] || TEMPLATES.default;
  const newTitle = template(article.ville, article.category);
  
  return {
    ...article,
    type,
    titleOriginal: article.title,
    titleOptimise: newTitle,
    longueur: newTitle.length
  };
});

// Stats
const tooLong = updates.filter(u => u.longueur > 60);
console.log(`📊 Stats:\n`);
console.log(`Total articles: ${updates.length}`);
console.log(`Titles >60 chars: ${tooLong.length} (${Math.round(tooLong.length/updates.length*100)}%)`);
console.log(`Moyenne longueur: ${Math.round(updates.reduce((sum, u) => sum + u.longueur, 0) / updates.length)} chars\n`);

// Grouper par type
const parType = updates.reduce((acc, u) => {
  if (!acc[u.type]) acc[u.type] = [];
  acc[u.type].push(u);
  return acc;
}, {});

console.log('📂 Par type template:\n');
Object.entries(parType).forEach(([type, arts]: [string, any]) => {
  console.log(`${type.padEnd(20)} ${arts.length} articles`);
});

// Sauvegarder
writeFileSync('titresoptimises-prix-articles.json', JSON.stringify(updates, null, 2));
console.log('\n✅ Sauvegardé: titles-optimises-prix-articles.json');

// Échantillon
console.log('\n📄 Échantillon (avant → après):\n');
updates.slice(0, 5).forEach(u => {
  console.log(`${u.ville.toUpperCase()} (${u.type}):`);
  console.log(`  Avant: ${u.titleOriginal.substring(0, 55)}...`);
  console.log(`  Après: ${u.titleOptimise} (${u.longueur} chars)`);
  console.log('');
});

