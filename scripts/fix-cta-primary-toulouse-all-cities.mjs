#!/usr/bin/env node
/**
 * Script de correction automatique : Toulouse hardcodé dans CtaPrimary.tsx
 * Corrige les 2 occurrences par fichier (subtitle footer + liste points clés)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const cities = ['nice', 'lyon', 'marseille', 'bordeaux', 'nantes', 'lille', 'rennes', 'rouen', 'montpellier', 'strasbourg', 'toulouse'];

function fixCtaPrimary(citySlug) {
  const ctaPath = path.join(rootDir, 'sites', citySlug, 'components', 'CtaPrimary.tsx');
  
  if (!fs.existsSync(ctaPath)) {
    console.error(`❌ CtaPrimary.tsx introuvable pour ${citySlug}`);
    return false;
  }

  let content = fs.readFileSync(ctaPath, 'utf8');
  const originalContent = content;

  // 1. Ajouter imports useMemo + getCityData si pas déjà présent
  if (!content.includes('getCityData')) {
    content = content.replace(
      /"use client";\s*\n\s*import \{ useState \} from "react";/,
      `"use client";

import { useState, useMemo } from "react";
import { getCityData } from '@/lib/cityData';

// Fonction client-side pour résoudre la ville depuis hostname
function getCityFromHostname(): string {
  if (typeof window === 'undefined') return '${citySlug}';
  const hostname = window.location.hostname.toLowerCase();
  // Cas spéciaux
  if (hostname.includes('toulousain')) return 'toulouse';
  if (hostname.includes('bordeaux-demenageur')) return 'bordeaux';
  // Pattern standard: devis-demenageur-ville.fr
  const cities = ['strasbourg', 'nice', 'lyon', 'marseille', 'nantes', 'lille', 'rennes', 'rouen', 'montpellier', 'toulouse', 'bordeaux'];
  const found = cities.find(city => hostname.includes(city));
  return found || '${citySlug}';
}`
    );
  }

  // 2. Ajouter cityData après useState si pas déjà présent
  if (!content.includes('const city = useMemo')) {
    const cityData = `
  // Résoudre cityData dynamiquement
  const city = useMemo(() => {
    const citySlug = getCityFromHostname();
    return getCityData(citySlug);
  }, []);

`;
    
    content = content.replace(
      /export default function CtaPrimary\([^)]*\) \{([^}]*const \[isSubmitting, setIsSubmitting\] = useState\(false\));/,
      `export default function CtaPrimary($1 {$2${cityData}`
    );
  }

  // 3. Corriger ligne 62 : "Rejoignez plus de 1200 clients satisfaits à Toulouse"
  content = content.replace(
    /return "Rejoignez plus de 1200 clients satisfaits à Toulouse";/g,
    `return \`Rejoignez plus de 1200 clients satisfaits à \${city.nameCapitalized}\`;`
  );

  // 4. Corriger ligne 117 : "Partenaires certifiés à Toulouse"
  content = content.replace(
    /<span>Partenaires certifiés à Toulouse<\/span>/g,
    `<span>Partenaires certifiés à {city.nameCapitalized}</span>`
  );

  // Écriture seulement si changements
  if (content !== originalContent) {
    fs.writeFileSync(ctaPath, content, 'utf8');
    console.log(`✅ ${citySlug}/CtaPrimary.tsx corrigé`);
    return true;
  } else {
    console.log(`⏭️  ${citySlug}/CtaPrimary.tsx inchangé (déjà corrigé ?)`);
    return false;
  }
}

async function main() {
  console.log('🔧 Correction automatique : Toulouse hardcodé dans CtaPrimary.tsx\n');
  
  let fixed = 0;
  for (const city of cities) {
    console.log(`\n📝 Traitement ${city}...`);
    if (fixCtaPrimary(city)) {
      fixed++;
    }
  }
  
  console.log(`\n✅ Correction terminée : ${fixed}/${cities.length} villes corrigées`);
}

main().catch(console.error);

