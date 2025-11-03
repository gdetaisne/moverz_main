#!/usr/bin/env node

/**
 * Fix NeighborhoodsIndex.tsx - "Toulouse" hardcodé → cityData dynamique
 * Pattern #9 - 10 villes (Montpellier déjà fixé manuellement)
 */

import { readFileSync, writeFileSync } from 'fs';

const CITIES = ['bordeaux', 'lille', 'lyon', 'marseille', 'nantes', 'nice', 'rennes', 'rouen', 'strasbourg', 'toulouse'];

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
    
    // Fix 1: Ajouter imports
    if (!content.includes('getCityDataFromUrl')) {
      content = content.replace(
        'import { QUARTIERS, COMMUNES, urlForQuartier, urlForCommune } from "@/components/NeighborhoodsData";',
        `import { QUARTIERS, COMMUNES, urlForQuartier, urlForCommune } from "@/components/NeighborhoodsData";
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";`
      );
    }
    
    // Fix 2: Ajouter const city dans le composant
    if (!content.includes('const city = getCityDataFromUrl')) {
      content = content.replace(
        'export default function NeighborhoodsIndex() {\n  const [query, setQuery] = useState("");',
        `export default function NeighborhoodsIndex() {
  const city = getCityDataFromUrl(env.SITE_URL);
  const [query, setQuery] = useState("");`
      );
    }
    
    // Fix 3: Remplacer H1 hardcodé (Toulouse ou bordeaux minuscule)
    content = content.replace(
      /Déménagement par quartiers & communes \((Toulouse|bordeaux|lille|lyon|marseille|nantes|nice|rennes|rouen|strasbourg|toulouse)\)/,
      'Déménagement par quartiers & communes ({city.nameCapitalized})'
    );
    
    // Fix 4: Remplacer H2 hardcodé
    content = content.replace(
      /Quartiers de (Toulouse|bordeaux|lille|lyon|marseille|nantes|nice|rennes|rouen|strasbourg|toulouse)/,
      'Quartiers de {city.nameCapitalized}'
    );
    
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${city}: Toulouse/ville hardcodée → cityData dynamique`);
    fixedCount++;
    
  } catch (err) {
    console.log(`⚠️  ${city}: Erreur - ${err.message}`);
  }
}

console.log('');
console.log(`🎉 ${fixedCount}/10 villes corrigées !`);

