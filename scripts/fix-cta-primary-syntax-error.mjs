#!/usr/bin/env node
/**
 * Script de correction : Fix erreur syntaxe CtaPrimary.tsx
 * Corrige la signature de fonction cassée par le script précédent
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const cities = ['lyon', 'marseille', 'bordeaux', 'nantes', 'lille', 'rennes', 'rouen', 'montpellier', 'strasbourg', 'toulouse'];

function fixSyntaxError(citySlug) {
  const ctaPath = path.join(rootDir, 'sites', citySlug, 'components', 'CtaPrimary.tsx');
  
  if (!fs.existsSync(ctaPath)) {
    console.error(`❌ CtaPrimary.tsx introuvable pour ${citySlug}`);
    return false;
  }

  let content = fs.readFileSync(ctaPath, 'utf8');
  
  // Fix signature fonction cassée
  if (content.includes('export default function CtaPrimary(') && !content.includes('export default function CtaPrimary({')) {
    content = content.replace(
      /export default function CtaPrimary\(\s*const \[email, setEmail\] = useState\(""\);\s*const \[phone, setPhone\] = useState\(""\);\s*const \[isSubmitting, setIsSubmitting\] = useState\(false\)\s*\{[^}]*\s*\/\/ Résoudre cityData dynamiquement/,
      `export default function CtaPrimary({ placement, label, className = "" }: CtaPrimaryProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Résoudre cityData dynamiquement`
    );
    
    fs.writeFileSync(ctaPath, content, 'utf8');
    console.log(`✅ ${citySlug}/CtaPrimary.tsx syntaxe corrigée`);
    return true;
  }
  
  console.log(`⏭️  ${citySlug}/CtaPrimary.tsx OK`);
  return false;
}

async function main() {
  console.log('🔧 Correction erreurs syntaxe CtaPrimary.tsx\n');
  
  let fixed = 0;
  for (const city of cities) {
    if (fixSyntaxError(city)) {
      fixed++;
    }
  }
  
  console.log(`\n✅ Correction terminée : ${fixed} fichiers corrigés`);
}

main().catch(console.error);

