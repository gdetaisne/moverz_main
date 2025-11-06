#!/usr/bin/env node
/**
 * Script de correction automatique : Nice hardcodé dans ValueTriad.tsx
 * Corrige "ex. Nice & Gironde" → "ex. {city.nameCapitalized} & Gironde"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const cities = ['nice', 'lyon', 'marseille', 'bordeaux', 'nantes', 'lille', 'rennes', 'rouen', 'montpellier', 'strasbourg', 'toulouse'];

function fixValueTriad(citySlug) {
  const filePath = path.join(rootDir, 'sites', citySlug, 'components', 'ValueTriad.tsx');
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ValueTriad.tsx introuvable pour ${citySlug}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Vérifier si besoin d'ajouter import getCityData
  const needsCityImport = !content.includes('getCityData');
  const needsUseMemo = !content.includes('useMemo');

  // Ajouter imports si nécessaire
  if (needsCityImport || needsUseMemo) {
    // Trouver la première ligne après "use client" ou début fichier
    if (content.includes("'use client'") || content.includes('"use client"')) {
      content = content.replace(
        /("use client"|'use client');?\s*\n/,
        `$1\n\nimport { useMemo } from 'react';\nimport { getCityData } from '@/lib/cityData';\n\n// Fonction client-side pour résoudre la ville depuis hostname\nfunction getCityFromHostname(): string {\n  if (typeof window === 'undefined') return '${citySlug}';\n  const hostname = window.location.hostname.toLowerCase();\n  if (hostname.includes('toulousain')) return 'toulouse';\n  if (hostname.includes('bordeaux-demenageur')) return 'bordeaux';\n  const cities = ['strasbourg', 'nice', 'lyon', 'marseille', 'nantes', 'lille', 'rennes', 'rouen', 'montpellier', 'toulouse', 'bordeaux'];\n  const found = cities.find(city => hostname.includes(city));\n  return found || '${citySlug}';\n}\n`
      );
    } else {
      // Pas de "use client", ajouter au début
      content = `"use client";\n\nimport { useMemo } from 'react';\nimport { getCityData } from '@/lib/cityData';\n\n// Fonction client-side pour résoudre la ville depuis hostname\nfunction getCityFromHostname(): string {\n  if (typeof window === 'undefined') return '${citySlug}';\n  const hostname = window.location.hostname.toLowerCase();\n  if (hostname.includes('toulousain')) return 'toulouse';\n  if (hostname.includes('bordeaux-demenageur')) return 'bordeaux';\n  const cities = ['strasbourg', 'nice', 'lyon', 'marseille', 'nantes', 'lille', 'rennes', 'rouen', 'montpellier', 'toulouse', 'bordeaux'];\n  const found = cities.find(city => hostname.includes(city));\n  return found || '${citySlug}';\n}\n\n${content}`;
    }
  }

  // Ajouter city résolu dynamiquement après export default function
  if (!content.includes('const city = useMemo')) {
    content = content.replace(
      /export default function ValueTriad\(\) \{/,
      `export default function ValueTriad() {
  const city = useMemo(() => {
    const citySlug = getCityFromHostname();
    return getCityData(citySlug);
  }, []);
`
    );
  }

  // Remplacer "Nice" hardcodé par dynamique
  content = content.replace(
    /"Déménageurs qualifiés \(ex\. Nice & Gironde\)"/g,
    `\`Déménageurs qualifiés (ex. \${city.nameCapitalized} & Gironde)\``
  );

  // Écriture seulement si changements
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${citySlug}/ValueTriad.tsx corrigé`);
    return true;
  } else {
    console.log(`⏭️  ${citySlug}/ValueTriad.tsx inchangé (déjà corrigé ?)`);
    return false;
  }
}

async function main() {
  console.log('🔧 Correction automatique : Nice hardcodé dans ValueTriad.tsx\n');
  
  let fixed = 0;
  for (const city of cities) {
    console.log(`\n📝 Traitement ${city}...`);
    if (fixValueTriad(city)) {
      fixed++;
    }
  }
  
  console.log(`\n✅ Correction terminée : ${fixed}/${cities.length} villes corrigées`);
}

main().catch(console.error);

