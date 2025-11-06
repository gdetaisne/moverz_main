#!/usr/bin/env node
/**
 * Script de correction automatique : Toulouse hardcodé dans Headers
 * Applique le pattern de correction Strasbourg/Nice aux villes restantes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const cities = ['lyon', 'marseille', 'bordeaux', 'nantes', 'lille', 'rennes', 'rouen', 'montpellier', 'toulouse'];

function fixHeader(citySlug) {
  const headerPath = path.join(rootDir, 'sites', citySlug, 'components', 'Header.tsx');
  
  if (!fs.existsSync(headerPath)) {
    console.error(`❌ Header.tsx introuvable pour ${citySlug}`);
    return false;
  }

  let content = fs.readFileSync(headerPath, 'utf8');
  const originalContent = content;

  // 1. Ajouter imports useMemo + getCityData
  if (!content.includes('useMemo')) {
    content = content.replace(
      "import { useState, useRef, useEffect } from 'react';",
      "import { useState, useRef, useEffect, useMemo } from 'react';\nimport { getCityData } from '@/lib/cityData';"
    );
  }

  // 2. Ajouter fonction getCityFromHostname après imports
  if (!content.includes('getCityFromHostname')) {
    const helperFunction = `// Fonction client-side pour résoudre la ville depuis hostname
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
}

`;
    
    content = content.replace(
      /export default function Header\(\) \{/,
      `${helperFunction}export default function Header() {`
    );
  }

  // 3. Ajouter cityData dynamique après useState
  if (!content.includes('const city = useMemo')) {
    const cityData = `  // Résoudre cityData dynamiquement
  const city = useMemo(() => {
    const citySlug = getCityFromHostname();
    return getCityData(citySlug);
  }, []);

  // Construire zonesItems dynamiquement depuis cityData
  const zonesItems = useMemo(() => {
    return [
      { href: \`/\${city.slug}\`, label: city.nameCapitalized },
      ...city.neighborhoods.slice(0, 5).map(n => ({
        href: \`/\${city.slug}/\${n.slug}\`,
        label: n.name
      }))
    ];
  }, [city]);

  // Construire corridors dynamiquement depuis cityData
  const corridors = useMemo(() => {
    return city.corridors.slice(0, 3).map(c => ({
      href: \`/\${city.slug}-vers-\${c.slug}\`,
      label: \`\${city.nameCapitalized} → \${c.destination}\`
    }));
  }, [city]);

`;
    
    // Insérer après zonesDropdownRef
    content = content.replace(
      /  const zonesDropdownRef = useRef<HTMLDivElement>\(null\);/,
      `  const zonesDropdownRef = useRef<HTMLDivElement>(null);\n${cityData}`
    );
  }

  // 4. Supprimer zonesItems hardcodés
  const zonesItemsPattern = /  const zonesItems = \[\s*\{ href: '\/toulouse', label: 'Toulouse' \},\s*\{ href: '\/toulouse\/[^']+', label: '[^']+' \}[^\]]*\]\s*;/;
  if (zonesItemsPattern.test(content)) {
    content = content.replace(zonesItemsPattern, '');
  }

  // 5. Remplacer logo "Toulouse" par dynamique
  content = content.replace(/<span>Toulouse<\/span>/g, '<span>{city.nameCapitalized}</span>');

  // 6. Remplacer corridors hardcodés par dynamiques
  const corridorsPattern = /<div className="border-t border-gray-200 my-2"><\/div>\s*<div className="px-4 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">\s*Destinations fréquentes\s*<\/div>\s*<Link[^>]+href="\/toulouse-vers-[^"]+"[^>]*>.*?Toulouse → [^<]+<\/Link>\s*<Link[^>]+href="\/toulouse-vers-[^"]+"[^>]*>.*?Toulouse → [^<]+<\/Link>\s*<Link[^>]+href="\/toulouse-vers-[^"]+"[^>]*>.*?Toulouse → [^<]+<\/Link>/gs;
  
  const corridorsReplacement = `<div className="border-t border-gray-200 my-2"></div>
                <div className="px-4 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Destinations fréquentes
                </div>
                {corridors.map((corridor) => (
                  <Link
                    key={corridor.href}
                    href={corridor.href}
                    className="block px-4 py-2 text-gray-800 hover:bg-white/50 transition-colors"
                    onClick={() => {
                      setIsZonesDropdownOpen(false);
                      trackClick(\`corridor-\${corridor.href.split('-vers-')[1]}\`);
                    }}
                  >
                    {corridor.label}
                  </Link>
                ))}`;

  if (corridorsPattern.test(content)) {
    content = content.replace(corridorsPattern, corridorsReplacement);
  }

  // Écriture seulement si changements
  if (content !== originalContent) {
    fs.writeFileSync(headerPath, content, 'utf8');
    console.log(`✅ ${citySlug}/Header.tsx corrigé`);
    return true;
  } else {
    console.log(`⏭️  ${citySlug}/Header.tsx inchangé (déjà corrigé ?)`);
    return false;
  }
}

async function main() {
  console.log('🔧 Correction automatique : Toulouse hardcodé dans Headers\n');
  
  let fixed = 0;
  for (const city of cities) {
    console.log(`\n📝 Traitement ${city}...`);
    if (fixHeader(city)) {
      fixed++;
    }
  }
  
  console.log(`\n✅ Correction terminée : ${fixed}/${cities.length} villes corrigées`);
  console.log('⚠️  Note : Nice et Strasbourg déjà corrigés manuellement');
}

main().catch(console.error);

