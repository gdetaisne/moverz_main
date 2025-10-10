#!/usr/bin/env node

/**
 * SCRIPT DE CORRECTION AUTOMATIQUE DES ISSUES SEO
 * 
 * Corrige:
 * 1. Descriptions dupliquées dans les corridors (57 pages)
 * 2. Génère des descriptions uniques basées sur destination
 */

const fs = require('fs');
const path = require('path');

const SITES_DIR = path.join(__dirname, 'sites');
const CITIES = ['bordeaux', 'lille', 'lyon', 'marseille', 'montpellier', 'nantes', 'nice', 'rennes', 'rouen', 'strasbourg', 'toulouse'];

// Mapping des destinations vers leurs infos
const destinationData = {
  'paris': { distance: '580 km', duree: '6h00', particularite: 'capitale' },
  'lyon': { distance: '550 km', duree: '5h30', particularite: 'gastronomie' },
  'marseille': { distance: '660 km', duree: '7h00', particularite: 'Méditerranée' },
  'toulouse': { distance: '245 km', duree: '2h30', particularite: 'ville rose' },
  'nantes': { distance: '345 km', duree: '3h30', particularite: 'Loire' },
  'lille': { distance: '810 km', duree: '8h30', particularite: 'Flandres' },
  'nice': { distance: '950 km', duree: '10h00', particularite: 'Côte d\'Azur' },
  'strasbourg': { distance: '950 km', duree: '9h30', particularite: 'Alsace' },
  'rennes': { distance: '570 km', duree: '6h00', particularite: 'Bretagne' },
  'rouen': { distance: '620 km', duree: '6h30', particularite: 'Normandie' },
  'montpellier': { distance: '520 km', duree: '5h30', particularite: 'Languedoc' },
  'espagne': { distance: '150-500 km', duree: 'variable', particularite: 'international' },
};

const corrections = {
  filesUpdated: 0,
  descriptionsFixed: 0,
  errors: [],
};

function generateCorridorDescription(origin, destination, volumeType = 'Studio/T1', prix = null) {
  const destInfo = destinationData[destination.toLowerCase()] || { distance: 'XXX km', duree: 'Xh', particularite: 'destination' };
  
  // Descriptions variées selon le volume
  const templates = {
    'Studio/T1': `Déménagement ${origin} → ${destination} : ${destInfo.distance}, ${destInfo.duree}. Studio/T1 (10-15 m³)${prix ? ` dès ${prix}` : ''}. Devis gratuit sous 7j. Équipe pro, emballage inclus.`,
    'T2/T3': `Déménagement ${origin} → ${destination} : ${destInfo.distance}. T2/T3 (20-35 m³)${prix ? ` de ${prix}` : ''}. Comparaison de 3 devis personnalisés. Pros qualifiés. Réservez maintenant.`,
    'Maison': `Déménagement ${origin} → ${destination} vers ${destInfo.particularite}. Maison (40-80 m³)${prix ? ` ${prix}` : ''}. ${destInfo.distance}, ${destInfo.duree}. Devis multiples gratuits. Service complet.`,
  };
  
  return templates[volumeType] || templates['Studio/T1'];
}

function fixCorridorFile(filePath, origin) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Détecter le problème: description "Volume : 10-15 m³"
    if (!content.includes('description: "Volume : 10-15 m³"')) {
      return false; // Pas de problème détecté
    }
    
    // Extraire la destination depuis le nom du fichier ou le contenu
    const destMatch = content.match(/destination:\s*["']([^"']+)["']/);
    if (!destMatch) {
      corrections.errors.push(`${filePath}: destination non trouvée`);
      return false;
    }
    
    const destination = destMatch[1];
    
    // Extraire les prix
    const prixMatch = content.match(/prix:\s*["']([^"']+)["']/);
    const prix = prixMatch ? prixMatch[1] : null;
    
    // Générer 3 descriptions variées pour chaque type de logement
    const desc1 = generateCorridorDescription(origin, destination, 'Studio/T1', prix);
    const desc2 = generateCorridorDescription(origin, destination, 'T2/T3', prix);
    const desc3 = generateCorridorDescription(origin, destination, 'Maison', prix);
    
    // Remplacer chaque occurrence
    let newContent = content;
    let replacements = 0;
    
    // Pattern pour trouver chaque bloc de prix avec sa description
    const regex = /{\s*type:\s*"([^"]+)",\s*prix:\s*"([^"]+)",\s*description:\s*"Volume : 10-15 m³"\s*}/g;
    
    newContent = newContent.replace(regex, (match, type, prix) => {
      replacements++;
      let volumeType = 'Studio/T1';
      if (type.includes('T2') || type.includes('T3')) volumeType = 'T2/T3';
      else if (type.includes('Maison')) volumeType = 'Maison';
      
      const newDesc = generateCorridorDescription(origin, destination, volumeType, prix);
      return `{
      type: "${type}",
      prix: "${prix}",
      description: "${newDesc}"
    }`;
    });
    
    if (replacements > 0) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      corrections.filesUpdated++;
      corrections.descriptionsFixed += replacements;
      console.log(`  ✅ ${path.basename(filePath)}: ${replacements} descriptions corrigées`);
      return true;
    }
    
    return false;
  } catch (error) {
    corrections.errors.push(`${filePath}: ${error.message}`);
    return false;
  }
}

function scanCorridorPages(city) {
  const cityDir = path.join(SITES_DIR, city);
  const appDir = path.join(cityDir, 'app');
  
  if (!fs.existsSync(appDir)) {
    console.log(`⚠️  ${city}: app/ introuvable`);
    return;
  }
  
  // Chercher les fichiers corridor: {city}-vers-{destination}/page.tsx
  const entries = fs.readdirSync(appDir, { withFileTypes: true });
  
  let fixed = 0;
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.includes('-vers-')) {
      const corridorPath = path.join(appDir, entry.name, 'page.tsx');
      if (fs.existsSync(corridorPath)) {
        if (fixCorridorFile(corridorPath, city)) {
          fixed++;
        }
      }
    }
  }
  
  if (fixed > 0) {
    console.log(`✅ ${city}: ${fixed} fichiers corridor corrigés`);
  }
}

function main() {
  console.log('🚀 Correction des issues SEO - Descriptions corridors\n');
  console.log('─'.repeat(80));
  
  for (const city of CITIES) {
    console.log(`\n🔍 ${city}...`);
    scanCorridorPages(city);
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('📊 RÉSUMÉ');
  console.log('─'.repeat(80));
  console.log(`✅ Fichiers mis à jour: ${corrections.filesUpdated}`);
  console.log(`✅ Descriptions corrigées: ${corrections.descriptionsFixed}`);
  
  if (corrections.errors.length > 0) {
    console.log(`\n⚠️  Erreurs (${corrections.errors.length}):`);
    corrections.errors.forEach(err => console.log(`  • ${err}`));
  }
  
  console.log('\n💡 PROCHAINES ÉTAPES:');
  console.log('  1. Relancer l\'audit: node audit-seo-global.js');
  console.log('  2. Vérifier les autres issues (titles manquants)');
  console.log('  3. Tester un site: cd sites/bordeaux && npm run dev');
  console.log('='.repeat(80) + '\n');
}

main();

