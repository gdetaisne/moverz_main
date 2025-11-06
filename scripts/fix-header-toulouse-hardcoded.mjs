#!/usr/bin/env node
/**
 * Script de correction automatique : Toulouse hardcodé dans Headers 11 villes
 * 
 * Remplace :
 * - zonesItems hardcodés → dynamiques depuis cityData
 * - Logo "Toulouse" → city.nameCapitalized
 * - Corridors hardcodés → dynamiques depuis city.corridors
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const cities = ['nice', 'lyon', 'marseille', 'bordeaux', 'nantes', 'lille', 'rennes', 'rouen', 'montpellier', 'strasbourg'];

// Template de correction pour Header.tsx
const headerCorrections = [
  {
    // Ajout imports et fonction helper
    search: `'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Header() {`,
    replace: `'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useMemo } from 'react';
import { getCityData } from '@/lib/cityData';

// Fonction client-side pour résoudre la ville depuis hostname
function getCityFromHostname(): string {
  if (typeof window === 'undefined') return 'CITY_SLUG';
  const hostname = window.location.hostname.toLowerCase();
  // Cas spéciaux
  if (hostname.includes('toulousain')) return 'toulouse';
  if (hostname.includes('bordeaux-demenageur')) return 'bordeaux';
  // Pattern standard: devis-demenageur-ville.fr
  const cities = ['strasbourg', 'nice', 'lyon', 'marseille', 'nantes', 'lille', 'rennes', 'rouen', 'montpellier', 'toulouse', 'bordeaux'];
  const found = cities.find(city => hostname.includes(city));
  return found || 'CITY_SLUG';
}

export default function Header() {`
  },
  {
    // Ajout cityData dynamique après useState
    search: `  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isZonesDropdownOpen, setIsZonesDropdownOpen] = useState(false);
  const zonesDropdownRef = useRef<HTMLDivElement>(null);

  // Fermer les dropdowns`,
    replace: `  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isZonesDropdownOpen, setIsZonesDropdownOpen] = useState(false);
  const zonesDropdownRef = useRef<HTMLDivElement>(null);

  // Résoudre cityData dynamiquement
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

  // Fermer les dropdowns`
  },
  {
    // Supprimer zonesItems hardcodés
    search: `  const zonesItems = [
    { href: '/toulouse', label: 'Toulouse' },
    { href: '/toulouse/capitole', label: 'Capitole' },
    { href: '/toulouse/saint-cyprien', label: 'Saint-Cyprien' },
    { href: '/toulouse/carmes', label: 'Carmes' },
    { href: '/toulouse/jean-jaures', label: 'Jean Jaurès' },
    { href: '/toulouse/compans', label: 'Compans' },  ];`,
    replace: ``
  },
  {
    // Logo dynamique
    search: `            <span>Toulouse</span>`,
    replace: `            <span>{city.nameCapitalized}</span>`
  },
  {
    // Corridors dynamiques
    search: `                <div className="border-t border-gray-200 my-2"></div>
                <div className="px-4 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Destinations fréquentes
                </div>
                <Link
                  href="/toulouse-vers-paris"
                  className="block px-4 py-2 text-gray-800 hover:bg-white/50 transition-colors"
                  onClick={() => {
                    setIsZonesDropdownOpen(false);
                    trackClick('corridor-paris');
                  }}
                >
                  Toulouse → Paris
                </Link>
                <Link
                  href="/toulouse-vers-lyon"
                  className="block px-4 py-2 text-gray-800 hover:bg-white/50 transition-colors"
                  onClick={() => {
                    setIsZonesDropdownOpen(false);
                    trackClick('corridor-lyon');
                  }}
                >
                  Toulouse → Lyon
                </Link>
                <Link
                  href="/toulouse-vers-Toulouse"
                  className="block px-4 py-2 text-gray-800 hover:bg-white/50 transition-colors"
                  onClick={() => {
                    setIsZonesDropdownOpen(false);
                    trackClick('corridor-Toulouse');
                  }}
                >
                  Toulouse → Toulouse
                </Link>`,
    replace: `                <div className="border-t border-gray-200 my-2"></div>
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
                ))}`
  }
];

async function fixHeader(citySlug) {
  const headerPath = path.join(rootDir, 'sites', citySlug, 'components', 'Header.tsx');
  
  if (!fs.existsSync(headerPath)) {
    console.error(`❌ Header.tsx introuvable pour ${citySlug}`);
    return false;
  }

  let content = fs.readFileSync(headerPath, 'utf8');
  const originalContent = content;

  // Appliquer les corrections
  headerCorrections.forEach(({ search, replace }, index) => {
    const correctedReplace = replace.replace(/CITY_SLUG/g, citySlug);
    if (content.includes(search)) {
      content = content.replace(search, correctedReplace);
      console.log(`  ✅ Correction ${index + 1} appliquée`);
    } else {
      console.log(`  ⚠️  Correction ${index + 1} non trouvée (déjà appliquée ?)`);
    }
  });

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
    if (await fixHeader(city)) {
      fixed++;
    }
  }
  
  console.log(`\n✅ Correction terminée : ${fixed}/${cities.length} villes corrigées`);
  console.log('⚠️  Attention : Strasbourg déjà corrigé manuellement, vérifier les autres villes');
}

main().catch(console.error);

