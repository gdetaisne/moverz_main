#!/usr/bin/env node
/**
 * Script de correction : Ordre imports Testimonials.tsx
 * Image doit être avant les autres imports
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const cities = ['nice', 'lyon', 'marseille', 'bordeaux', 'nantes', 'lille', 'rennes', 'rouen', 'montpellier', 'strasbourg', 'toulouse'];

function fixImportsOrder(citySlug) {
  const filePath = path.join(rootDir, 'sites', citySlug, 'components', 'Testimonials.tsx');
  
  if (!fs.existsSync(filePath)) {
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Corriger ordre imports si nécessaire
  if (content.includes('import { useMemo }') && content.includes('import Image')) {
    // Vérifier si Image est après useMemo
    const useMemoIndex = content.indexOf('import { useMemo }');
    const imageIndex = content.indexOf('import Image');
    
    if (imageIndex > useMemoIndex && imageIndex < useMemoIndex + 100) {
      // Réorganiser : Image en premier après "use client"
      content = content.replace(
        /("use client"|'use client');?\s*\n\s*import { useMemo }[\s\S]*?import Image/g,
        `$1\n\nimport Image from "next/image";\nimport { useMemo } from 'react';`
      );
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${citySlug}/Testimonials.tsx imports réorganisés`);
      return true;
    }
  }
  
  return false;
}

async function main() {
  console.log('🔧 Correction ordre imports Testimonials.tsx\n');
  
  let fixed = 0;
  for (const city of cities) {
    if (fixImportsOrder(city)) {
      fixed++;
    }
  }
  
  console.log(`\n✅ Correction terminée : ${fixed} fichiers corrigés`);
}

main().catch(console.error);


