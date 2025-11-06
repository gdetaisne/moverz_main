#!/usr/bin/env node
/**
 * Script de correction automatique : Nice hardcodé dans LocalMoneyFAQ
 * Corrige tous les appels <LocalMoneyFAQ citySlug="nice" cityName="Nice" />
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const cities = ['toulouse', 'strasbourg', 'rouen', 'rennes', 'nice', 'nantes', 'montpellier', 'marseille', 'lille', 'bordeaux'];

function fixLocalMoneyFAQ(citySlug) {
  const pagePath = path.join(rootDir, 'sites', citySlug, 'app', 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.error(`❌ page.tsx introuvable pour ${citySlug}`);
    return false;
  }

  let content = fs.readFileSync(pagePath, 'utf8');
  const originalContent = content;

  // Remplacer hardcodé "nice" par dynamique
  content = content.replace(
    /<LocalMoneyFAQ citySlug="nice" cityName="Nice" \/>/g,
    '<LocalMoneyFAQ citySlug={city.slug} cityName={city.nameCapitalized} />'
  );

  // Écriture seulement si changements
  if (content !== originalContent) {
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`✅ ${citySlug}/app/page.tsx corrigé`);
    return true;
  } else {
    console.log(`⏭️  ${citySlug}/app/page.tsx inchangé (déjà corrigé ?)`);
    return false;
  }
}

async function main() {
  console.log('🔧 Correction automatique : Nice hardcodé dans LocalMoneyFAQ\n');
  
  let fixed = 0;
  for (const city of cities) {
    console.log(`\n📝 Traitement ${city}...`);
    if (fixLocalMoneyFAQ(city)) {
      fixed++;
    }
  }
  
  console.log(`\n✅ Correction terminée : ${fixed}/${cities.length} villes corrigées`);
  console.log('⚠️  Note : Lyon déjà corrigé manuellement');
}

main().catch(console.error);


