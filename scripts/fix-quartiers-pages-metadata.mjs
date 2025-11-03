#!/usr/bin/env node

/**
 * Fix quartiers-{ville}/page.tsx - Metadata "Lille" hardcodée → cityData dynamique
 * Pattern #9 - Bug copier-coller initial jamais corrigé dans TASK-012
 */

import { readFileSync, writeFileSync } from 'fs';

const CITIES = ['bordeaux', 'lyon', 'marseille', 'nice', 'nantes', 'rennes', 'rouen', 'strasbourg'];
// Toulouse et Lille déjà corrigés dans TASK-012
// Montpellier : page manquante (créée)

let fixedCount = 0;

for (const city of CITIES) {
  const filePath = `sites/${city}/app/quartiers-${city}/page.tsx`;
  
  try {
    let content = readFileSync(filePath, 'utf-8');
    
    // Vérifier si déjà fixé
    if (content.includes('getCityDataFromUrl') && !content.includes('Déménagement à Lille')) {
      console.log(`✅ ${city}: Déjà fixé, skip`);
      continue;
    }
    
    // Ajouter imports
    if (!content.includes('getCityDataFromUrl')) {
      content = content.replace(
        'import { getCanonicalUrl } from "@/lib/canonical-helper";',
        `import { getCanonicalUrl } from "@/lib/canonical-helper";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";

const city = getCityDataFromUrl(env.SITE_URL);`
      );
    }
    
    // Fix metadata title (Lille → dynamique)
    content = content.replace(
      /title: "Quartiers & communes — Déménagement à Lille \| IA & transparence",/,
      'title: `Quartiers & communes — Déménagement à ${city.nameCapitalized} | IA & transparence`,'
    );
    
    // Fix description (générique car chaque ville a ses propres quartiers)
    content = content.replace(
      /description:\s*"Trouvez votre page quartier\/commune.*?",/s,
      'description: `Trouvez votre page quartier/commune pour estimer votre déménagement à ${city.nameCapitalized}. Zones couvertes et tarifs indicatifs.`,'
    );
    
    // Fix canonical (quartiers-lille → dynamique)
    content = content.replace(
      /canonical: getCanonicalUrl\('quartiers-lille'\),/,
      "canonical: getCanonicalUrl(`quartiers-${city.slug}`),"
    );
    
    // Fix JsonLd city name
    content = content.replace(
      /name: `Devis de déménagement – \$\{q\.title\} \(Lille\)`/,
      'name: `Devis de déménagement – ${q.title} (${city.nameCapitalized})`'
    );
    
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${city}: Metadata Lille → cityData dynamique`);
    fixedCount++;
    
  } catch (err) {
    console.log(`⚠️  ${city}: Erreur - ${err.message}`);
  }
}

console.log('');
console.log(`🎉 ${fixedCount}/8 villes corrigées !`);
console.log('');
console.log('📋 Résultat :');
console.log('- Metadata title dynamique');
console.log('- Description dynamique');
console.log('- Canonical dynamique');
console.log('- JsonLd city name dynamique');

