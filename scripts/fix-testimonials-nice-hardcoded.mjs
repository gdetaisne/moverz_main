#!/usr/bin/env node
/**
 * Script de correction automatique : Quartiers Nice hardcodés dans Testimonials.tsx
 * Corrige les 3 témoignages avec quartiers Nice → quartiers dynamiques depuis city.neighborhoods
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const cities = ['nice', 'lyon', 'marseille', 'bordeaux', 'nantes', 'lille', 'rennes', 'rouen', 'montpellier', 'strasbourg', 'toulouse'];

function fixTestimonials(citySlug) {
  const filePath = path.join(rootDir, 'sites', citySlug, 'components', 'Testimonials.tsx');
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Testimonials.tsx introuvable pour ${citySlug}`);
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
      /export default function Testimonials\(\) \{/,
      `export default function Testimonials() {
  const city = useMemo(() => {
    const citySlug = getCityFromHostname();
    return getCityData(citySlug);
  }, []);

  // Utiliser les 3 premiers quartiers de la ville
  const neighborhoods = city.neighborhoods.slice(0, 3);
`
    );
  }

  // Remplacer le tableau testimonials hardcodé par dynamique
  const testimonialsPattern = /const testimonials = \[[\s\S]*?\];/;
  
  if (testimonialsPattern.test(content)) {
    const newTestimonials = `const testimonials = [
    {
      name: "Marie L.",
      location: neighborhoods[0]?.name || city.nameCapitalized,
      text: "Estimation très précise, équipe pro. Déménagement sans stress.",
      avatar: "/images/testimonials/avatar-1.jpg"
    },
    {
      name: "Thomas B.", 
      location: neighborhoods[1]?.name || city.nameCapitalized,
      text: "L'IA a bien évalué le volume. Prix correct, service impeccable.",
      avatar: "/images/testimonials/avatar-2.jpg"
    },
    {
      name: "Sophie M.",
      location: neighborhoods[2]?.name || city.nameCapitalized, 
      text: "Gain de temps énorme avec l'estimation photo. Recommande.",
      avatar: "/images/testimonials/avatar-3.jpg"
    }
  ];`;

    content = content.replace(testimonialsPattern, newTestimonials);
  }

  // Écriture seulement si changements
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${citySlug}/Testimonials.tsx corrigé`);
    return true;
  } else {
    console.log(`⏭️  ${citySlug}/Testimonials.tsx inchangé (déjà corrigé ?)`);
    return false;
  }
}

async function main() {
  console.log('🔧 Correction automatique : Quartiers Nice hardcodés dans Testimonials.tsx\n');
  
  let fixed = 0;
  for (const city of cities) {
    console.log(`\n📝 Traitement ${city}...`);
    if (fixTestimonials(city)) {
      fixed++;
    }
  }
  
  console.log(`\n✅ Correction terminée : ${fixed}/${cities.length} villes corrigées`);
}

main().catch(console.error);

