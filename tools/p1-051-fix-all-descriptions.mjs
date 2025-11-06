#!/usr/bin/env node

/**
 * Script P1-051 : Force correction de toutes les descriptions
 * Remplace toutes les variantes pour forcer synchronisation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const cities = [
  'lyon', 'marseille', 'bordeaux', 'lille', 'nice', 'nantes', 
  'rennes', 'rouen', 'strasbourg', 'montpellier', 'toulouse'
];

const finalDescriptions = {
  economique: `Déménagement économique \${city.nameCapitalized} dès 280-450€. Petits budgets, déménageurs vérifiés. Estimation IA gratuite, 5 devis sous 7j. Volume identique. Économisez 40%.`,
  standard: `Déménagement standard \${city.nameCapitalized} : qualité/prix dès 600-900€. Estimation IA gratuite, 5 devis sous 7j. Volume identique, déménageurs vérifiés. Dossier anonyme.`,
  premium: `Déménagement premium \${city.nameCapitalized} dès 1200-2000€ : haut de gamme tout compris. Estimation IA gratuite, 5 devis sous 7j. Volume identique, déménageurs premium. Soigné.`
};

const patternsToReplace = {
  economique: [
    /description:\s*`[^`]*Déménagement économique[^`]*`/g,
  ],
  standard: [
    /description:\s*`[^`]*Déménagement standard[^`]*`/g,
  ],
  premium: [
    /description:\s*`[^`]*Déménagement premium[^`]*`/g,
  ]
};

let modifiedFiles = 0;
let totalReplacements = 0;

for (const city of cities) {
  for (const [type, finalDesc] of Object.entries(finalDescriptions)) {
    const filePath = path.join(
      rootDir, 
      `sites/${city}/app/services/demenagement-${type}-${city}/page.tsx`
    );
    
    if (!fs.existsSync(filePath)) {
      continue;
    }
    
    let content = fs.readFileSync(filePath, 'utf-8');
    const patterns = patternsToReplace[type];
    let modified = false;
    let replacements = 0;
    
    for (const pattern of patterns) {
      const matches = content.match(pattern);
      if (matches) {
        for (const match of matches) {
          // Vérifier si c'est déjà la bonne description
          if (!match.includes('Petits budgets') && !match.includes('qualité/prix') && !match.includes('haut de gamme')) {
            content = content.replace(
              match,
              `description: \`${finalDesc}\``
            );
            modified = true;
            replacements++;
          }
        }
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      modifiedFiles++;
      totalReplacements += replacements;
      console.log(`✅ ${city} - ${type} (${replacements} remplacements)`);
    }
  }
}

console.log(`\n✅ ${modifiedFiles} fichiers modifiés`);
console.log(`📝 ${totalReplacements} remplacements effectués`);

