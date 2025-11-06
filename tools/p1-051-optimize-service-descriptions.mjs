#!/usr/bin/env node

/**
 * Script P1-051 : Optimiser descriptions services (33 pages)
 * Applique formule LEADGEN-01 aux descriptions metadata + OG
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const cities = [
  'marseille', 'bordeaux', 'lille', 'nice', 'nantes', 
  'rennes', 'rouen', 'strasbourg', 'montpellier', 'toulouse'
];

const descriptions = {
  economique: `Déménagement économique \${city.nameCapitalized} dès 280-450€. Petits budgets, déménageurs vérifiés. Estimation IA gratuite, 5 devis sous 7j. Volume identique. Économisez 40%.`,
  standard: `Déménagement standard \${city.nameCapitalized} : qualité/prix dès 600-900€. Estimation IA gratuite, 5 devis sous 7j. Volume identique, déménageurs vérifiés. Dossier anonyme.`,
  premium: `Déménagement premium \${city.nameCapitalized} dès 1200-2000€ : haut de gamme tout compris. Estimation IA gratuite, 5 devis sous 7j. Volume identique, déménageurs premium. Soigné.`
};

const oldDescriptions = {
  economique: [
    /Déménagement économique \$\{city\.nameCapitalized\} dès 280-450€\. Formule petits budgets, déménageurs vérifiés\. Estimation IA gratuite, 5 devis sous 7j\. Volume identique\. Économisez 40%\./,
    /Déménagement économique \$\{city\.nameCapitalized\} dès 280-450€\. Formule petits budgets, déménageurs vérifiés\. Estimation IA gratuite, 5 devis comparables sous 7j\. Volume identique pour tous\. Économisez jusqu'à 40%\./,
    /Formule économique pour déménager à \$\{city\.nameCapitalized\}\. Idéal petits budgets\. Estimation IA gratuite, devis sous 7j\. À partir de 450€\./,
    /Formule économique pour déménager à \$\{city\.nameCapitalized\}/
  ],
  standard: [
    /Déménagement standard \$\{city\.nameCapitalized\} : rapport qualité\/prix dès 600-900€\. Estimation IA gratuite, 5 devis sous 7j\. Volume identique, déménageurs vérifiés\. Dossier anonyme\./,
    /Déménagement standard \$\{city\.nameCapitalized\} : rapport qualité\/prix optimal dès 600-900€\. Estimation IA gratuite, 5 devis comparables sous 7j\. Volume identique pour tous, déménageurs vérifiés\. Dossier anonyme\./,
    /Déménagement standard à \$\{city\.nameCapitalized\} : rapport qualité\/prix optimal, déménageurs vérifiés\. Estimation IA gratuite, recevez 5 devis personnalisés sous 7j\. Dès 750€\./,
    /Formule standard pour déménager à \$\{city\.nameCapitalized\}/
  ],
  premium: [
    /Déménagement premium \$\{city\.nameCapitalized\} dès 1200-2000€ : haut de gamme tout compris\. Estimation IA gratuite, 5 devis sous 7j\. Volume identique, déménageurs premium\. Soigné\./,
    /Déménagement premium \$\{city\.nameCapitalized\} dès 1200-2000€ : service haut de gamme tout compris\. Estimation IA gratuite, 5 devis comparables sous 7j\. Volume identique, déménageurs certifiés premium\. Prestation soignée\./,
    /Formule premium pour déménager à \$\{city\.nameCapitalized\}\. Service tout compris haut de gamme\. Estimation IA gratuite, devis sous 7j\. À partir de 1200€\./,
    /Formule premium pour déménager à \$\{city\.nameCapitalized\}/
  ]
};

let modifiedFiles = 0;

for (const city of cities) {
  for (const [type, newDesc] of Object.entries(descriptions)) {
    const filePath = path.join(
      rootDir, 
      `sites/${city}/app/services/demenagement-${type}-${city}/page.tsx`
    );
    
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Fichier non trouvé: ${filePath}`);
      continue;
    }
    
    let content = fs.readFileSync(filePath, 'utf-8');
    const oldPatterns = oldDescriptions[type];
    let modified = false;
    
    // Remplacer description principale
    if (oldPatterns[0].test(content)) {
      content = content.replace(
        oldPatterns[0],
        newDesc
      );
      modified = true;
    }
    
    // Remplacer OG description
    if (oldPatterns[1].test(content)) {
      content = content.replace(
        oldPatterns[1],
        newDesc
      );
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      modifiedFiles++;
      console.log(`✅ ${city} - ${type}`);
    } else {
      console.log(`⏭️  ${city} - ${type} (déjà modifié ou pattern différent)`);
    }
  }
}

console.log(`\n✅ ${modifiedFiles} fichiers modifiés`);
console.log(`📝 Total attendu : ${cities.length * 3} fichiers`);

