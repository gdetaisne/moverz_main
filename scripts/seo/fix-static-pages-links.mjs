#!/usr/bin/env node

/**
 * Script pour corriger les liens hardcodés dans les pages React (/faq, /services)
 * - Remplace /blog/cartons-demenagement → /blog/conseils/cartons-demenagement ou /blog/
 * - Remplace /blog/prix-demenagement-2025 → /blog/prix/ ou /blog/
 * - Remplace /blog/demenagement-{ville}/ → /blog/ ou catégorie appropriée
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../../');

const SITES = [
  'lyon', 'toulouse', 'lille', 'marseille', 'bordeaux', 
  'nice', 'rouen', 'strasbourg', 'rennes', 'nantes', 'montpellier'
];

// Mapping des liens à corriger
const LINK_REPLACEMENTS = [
  // Articles génériques qui n'existent pas → rediriger vers /blog/ ou catégorie
  {
    pattern: /href="\/blog\/cartons-demenagement\/?"/g,
    replacement: 'href="/blog/"',
    reason: 'Article générique inexistant → redirection vers /blog/'
  },
  {
    pattern: /href="\/blog\/prix-demenagement-2025\/?"/g,
    replacement: 'href="/blog/prix/"',
    reason: 'Article générique inexistant → redirection vers catégorie prix'
  },
  // Liens vers catégories avec noms de dossiers complets (Montpellier, etc.)
  {
    pattern: /href="\/blog\/demenagement-montpellier\/?"/g,
    replacement: 'href="/blog/"',
    reason: 'Catégorie avec nom complet → redirection vers /blog/'
  },
  {
    pattern: /href="\/blog\/demenagement-lyon\/?"/g,
    replacement: 'href="/blog/"',
    reason: 'Catégorie avec nom complet → redirection vers /blog/'
  },
  {
    pattern: /href="\/blog\/demenagement-toulouse\/?"/g,
    replacement: 'href="/blog/"',
    reason: 'Catégorie avec nom complet → redirection vers /blog/'
  },
  {
    pattern: /href="\/blog\/demenagement-bordeaux\/?"/g,
    replacement: 'href="/blog/"',
    reason: 'Catégorie avec nom complet → redirection vers /blog/'
  },
  {
    pattern: /href="\/blog\/demenagement-nice\/?"/g,
    replacement: 'href="/blog/"',
    reason: 'Catégorie avec nom complet → redirection vers /blog/'
  },
  {
    pattern: /href="\/blog\/demenagement-rouen\/?"/g,
    replacement: 'href="/blog/"',
    reason: 'Catégorie avec nom complet → redirection vers /blog/'
  },
  {
    pattern: /href="\/blog\/demenagement-strasbourg\/?"/g,
    replacement: 'href="/blog/"',
    reason: 'Catégorie avec nom complet → redirection vers /blog/'
  },
  {
    pattern: /href="\/blog\/demenagement-rennes\/?"/g,
    replacement: 'href="/blog/"',
    reason: 'Catégorie avec nom complet → redirection vers /blog/'
  },
  {
    pattern: /href="\/blog\/demenagement-nantes\/?"/g,
    replacement: 'href="/blog/"',
    reason: 'Catégorie avec nom complet → redirection vers /blog/'
  },
  {
    pattern: /href="\/blog\/demenagement-lille\/?"/g,
    replacement: 'href="/blog/"',
    reason: 'Catégorie avec nom complet → redirection vers /blog/'
  },
  {
    pattern: /href="\/blog\/demenagement-marseille\/?"/g,
    replacement: 'href="/blog/"',
    reason: 'Catégorie avec nom complet → redirection vers /blog/'
  },
];

function fixLinksInFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { modified: false, changes: 0 };
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = content;
  let changes = 0;
  const corrections = [];
  
  LINK_REPLACEMENTS.forEach(({ pattern, replacement, reason }) => {
    const matches = content.match(pattern);
    if (matches) {
      modified = modified.replace(pattern, replacement);
      changes += matches.length;
      corrections.push({ pattern: pattern.source, replacement, reason, count: matches.length });
    }
  });
  
  if (changes > 0) {
    fs.writeFileSync(filePath, modified, 'utf8');
  }
  
  return { modified: changes > 0, changes, corrections };
}

console.log('🔧 Correction des liens hardcodés dans les pages React\n');

let totalFilesFixed = 0;
let totalLinksFixed = 0;

SITES.forEach(site => {
  console.log(`\n📦 ${site.toUpperCase()}`);
  console.log('─'.repeat(50));
  
  const pagesToFix = [
    `sites/${site}/app/faq/page.tsx`,
    `sites/${site}/app/services/page.tsx`,
  ];
  
  let siteFilesFixed = 0;
  let siteLinksFixed = 0;
  
  pagesToFix.forEach(relativePath => {
    const filePath = path.join(rootDir, relativePath);
    const { modified, changes, corrections } = fixLinksInFile(filePath);
    
    if (modified) {
      siteFilesFixed++;
      siteLinksFixed += changes;
      console.log(`   📝 ${path.basename(relativePath)}: ${changes} lien(s) corrigé(s)`);
      corrections.forEach(c => {
        console.log(`      ${c.reason} (${c.count}x)`);
      });
    }
  });
  
  if (siteFilesFixed > 0) {
    console.log(`   ✅ ${siteFilesFixed} fichiers modifiés, ${siteLinksFixed} liens corrigés.`);
    totalFilesFixed += siteFilesFixed;
    totalLinksFixed += siteLinksFixed;
  } else {
    console.log(`   ℹ️  Aucun lien à corriger`);
  }
});

console.log(`\n==================================================`);
console.log(`✅ RÉSUMÉ GLOBAL:`);
console.log(`   Sites traités: ${SITES.length}/${SITES.length}`);
console.log(`   Fichiers modifiés: ${totalFilesFixed}`);
console.log(`   Liens corrigés: ${totalLinksFixed}`);

