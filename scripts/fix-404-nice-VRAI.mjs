#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const CITY = 'nice';
const contentPath = path.join(rootDir, 'sites', CITY, 'content', 'blog');

console.log(`🔧 CORRECTION VRAIE DES 404 - NICE`);
console.log(`============================================================`);
console.log(`\n🎯 Format URL détecté : /blog/demenagement-nice/{slug}\n`);

// Patterns de correction
const corrections = [
  // Corriger tous les anciens formats vers le format unique
  {
    pattern: /\(\/blog\/aide-demenagement-nice\/satellites\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'aide-demenagement-nice/satellites/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/demenagement-entreprise-nice\/satellites\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'demenagement-entreprise-nice/satellites/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/demenagement-international-nice\/satellites\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'demenagement-international-nice/satellites/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/demenagement-pas-cher-nice\/satellites\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'demenagement-pas-cher-nice/satellites/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/demenagement-piano-nice\/satellites\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'demenagement-piano-nice/satellites/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/demenageur-nice\/satellites\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'demenageur-nice/satellites/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/garde-meuble-nice\/satellites\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'garde-meuble-nice/satellites/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/location-camion-demenagement-nice\/satellites\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'location-camion-demenagement-nice/satellites/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/location-camion-nice\/satellites\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'location-camion-nice/satellites/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/petit-demenagement-nice\/satellites\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'petit-demenagement-nice/satellites/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/petit-nice\/satellites\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'petit-nice/satellites/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/prix-demenagement-nice\/satellites\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'prix-demenagement-nice/satellites/* → demenagement-nice/*'
  },
  // Corriger les liens directs sans /satellites/
  {
    pattern: /\(\/blog\/aide-demenagement-nice\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'aide-demenagement-nice/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/demenagement-entreprise-nice\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'demenagement-entreprise-nice/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/demenagement-international-nice\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'demenagement-international-nice/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/demenagement-pas-cher-nice\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'demenagement-pas-cher-nice/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/demenagement-piano-nice\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'demenagement-piano-nice/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/demenageur-nice\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'demenageur-nice/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/garde-meuble-nice\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'garde-meuble-nice/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/location-camion-demenagement-nice\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'location-camion-demenagement-nice/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/location-camion-nice\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'location-camion-nice/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/petit-demenagement-nice\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'petit-demenagement-nice/* → demenagement-nice/*'
  },
  {
    pattern: /\(\/blog\/prix-demenagement-nice\/([^)]+)\)/g,
    replacement: '(/blog/demenagement-nice/$1)',
    desc: 'prix-demenagement-nice/* → demenagement-nice/*'
  },
];

// Fonction pour corriger un fichier
function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let fixCount = 0;

  for (const correction of corrections) {
    const matches = content.match(correction.pattern);
    if (matches) {
      content = content.replace(correction.pattern, correction.replacement);
      modified = true;
      fixCount += matches.length;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return fixCount;
  }

  return 0;
}

// Scanner tous les fichiers markdown
function scanAndFix(dir) {
  const stats = {
    filesScanned: 0,
    filesModified: 0,
    linksFixed: 0
  };

  function scan(directory) {
    const items = fs.readdirSync(directory, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(directory, item.name);

      if (item.isDirectory()) {
        scan(fullPath);
      } else if (item.isFile() && item.name.endsWith('.md') && item.name !== 'README.md') {
        stats.filesScanned++;
        const fixCount = fixFile(fullPath);

        if (fixCount > 0) {
          stats.filesModified++;
          stats.linksFixed += fixCount;
          console.log(`✅ ${item.name}: ${fixCount} liens corrigés`);
        }
      }
    }
  }

  scan(dir);
  return stats;
}

// Exécuter la correction
console.log(`📝 Correction en cours...\n`);
const stats = scanAndFix(contentPath);

console.log(`\n${'='.repeat(60)}`);
console.log(`📈 RÉSULTATS FINAUX`);
console.log(`${'='.repeat(60)}`);
console.log(`📄 Fichiers scannés : ${stats.filesScanned}`);
console.log(`✅ Fichiers modifiés : ${stats.filesModified}`);
console.log(`🔗 Liens corrigés : ${stats.linksFixed}`);
console.log(`\n🎯 Tester les URLs :`);
console.log(`   http://localhost:3027/blog/demenagement-nice/aide-demenagement-nice-guide`);
console.log(`\n🔍 Relancer l'analyse :`);
console.log(`   node scripts/analyze-404.mjs`);

