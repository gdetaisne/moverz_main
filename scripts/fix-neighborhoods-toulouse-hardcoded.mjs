#!/usr/bin/env node

/**
 * Fix NeighborhoodsIndex.tsx - Remplacer "Toulouse" hardcodé par cityData dynamique
 * Pattern #9 - Bug copier-coller sur 11 villes
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const CITIES = ['bordeaux', 'lille', 'lyon', 'marseille', 'montpellier', 'nantes', 'nice', 'rennes', 'rouen', 'strasbourg', 'toulouse'];

let fixedCount = 0;

for (const city of CITIES) {
  const filePath = `sites/${city}/components/NeighborhoodsIndex.tsx`;
  
  try {
    let content = readFileSync(filePath, 'utf-8');
    
    // Vérifier si déjà fixé
    if (content.includes('city.nameCapitalized') && content.includes('getCityDataFromUrl')) {
      console.log(`✅ ${city}: Déjà fixé, skip`);
      continue;
    }
    
    let modified = false;
    
    // Fix 1: Ajouter imports si manquants
    if (!content.includes('getCityDataFromUrl')) {
      content = content.replace(
        'import { QUARTIERS, COMMUNES, urlForQuartier, urlForCommune } from "@/components/NeighborhoodsData";',
        `import { QUARTIERS, COMMUNES, urlForQuartier, urlForCommune } from "@/components/NeighborhoodsData";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";`
      );
      modified = true;
    }
    
    // Fix 2: Ajouter const city dans le composant
    if (!content.includes('const city = getCityDataFromUrl')) {
      content = content.replace(
        'export default function NeighborhoodsIndex() {\n  const [query, setQuery] = useState("");',
        `export default function NeighborhoodsIndex() {
  const city = getCityDataFromUrl(env.SITE_URL);
  const [query, setQuery] = useState("");`
      );
      modified = true;
    }
    
    // Fix 3: Remplacer H1 hardcodé
    content = content.replace(
      'Déménagement par quartiers & communes (Toulouse)',
      'Déménagement par quartiers & communes ({city.nameCapitalized})'
    );
    
    // Fix 4: Remplacer H2 hardcodé
    content = content.replace(
      'Quartiers de Toulouse',
      'Quartiers de {city.nameCapitalized}'
    );
    
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${city}: Corrigé (Toulouse → cityData dynamique)`);
    fixedCount++;
    
  } catch (err) {
    console.log(`⚠️  ${city}: Erreur - ${err.message}`);
  }
}

console.log('');
console.log(`🎉 Fix appliqué sur ${fixedCount}/11 villes !`);
console.log('');
console.log('📋 Prochaines étapes :');
console.log('1. Commit monorepo');
console.log('2. Push 11 villes GitHub');
console.log('3. Test builds (Nice, Toulouse, Bordeaux)');

