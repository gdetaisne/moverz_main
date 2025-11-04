#!/usr/bin/env node

/**
 * Correction des liens 404 dans le blog Lille
 * Utilise le mapping généré pour corriger UNIQUEMENT les vrais 404s
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../');

// Charger le mapping
const mappingPath = path.join(__dirname, 'blog-url-mapping.json');
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

// Guides principaux (category: "demenagement-lille")
const guidesHref = [
  'aide-demenagement-lille-guide',
  'demenagement-entreprise-lille-guide',
  'demenagement-international-lille-guide',
  'demenagement-pas-cher-lille-guide',
  'demenagement-piano-lille-expert',
  'demenageur-lille-expert',
  'garde-meuble-lille-guide-complet',
  'location-camion-demenagement-lille-guide',
  'petit-demenagement-lille-guide',
  'prix-demenagement-lille-guide'
];

// Construire les corrections
const corrections = {};

guidesHref.forEach(slug => {
  const data = mapping[slug];
  if (data) {
    // URL correcte (sans trailing slash pour markdown)
    const correctUrl = data.url.replace(/\/$/, '');
    corrections[slug] = correctUrl;
  }
});

console.log('🔧 Corrections à appliquer:\n');
Object.entries(corrections).forEach(([slug, url]) => {
  console.log(`  ${slug.padEnd(50)} → ${url}`);
});

// Patterns de liens cassés à corriger
const patterns = [
  // demenageur-lille/xxx → demenagement-lille/xxx
  {
    from: '/blog/demenageur-lille/demenageur-lille-expert',
    to: corrections['demenageur-lille-expert']
  },
  // location-camion-lille/xxx → demenagement-lille/xxx
  {
    from: '/blog/location-camion-lille/location-camion-demenagement-lille-guide',
    to: corrections['location-camion-demenagement-lille-guide']
  },
  // garde-meuble-lille/xxx → demenagement-lille/xxx
  {
    from: '/blog/garde-meuble-lille/garde-meuble-lille-guide-complet',
    to: corrections['garde-meuble-lille-guide-complet'] || '/blog/demenagement-lille/garde-meuble-lille-guide'
  },
  {
    from: '/blog/garde-meuble-lille/garde-meuble-lille-guide',
    to: corrections['garde-meuble-lille-guide-complet'] || '/blog/demenagement-lille/garde-meuble-lille-guide'
  },
  // prix-demenagement-lille/xxx → demenagement-lille/xxx
  {
    from: '/blog/prix-demenagement-lille/prix-demenagement-lille-guide',
    to: corrections['prix-demenagement-lille-guide']
  },
  {
    from: '/blog/prix-demenagement-lille/devis-demenagement-lille-obtenir-comparer',
    to: '/blog/prix-demenagement-lille/devis-demenagement-lille-obtenir-comparer' // Satellite, pas de correction
  },
  // aide-demenagement-lille/xxx → demenagement-lille/xxx (guide uniquement)
  {
    from: '/blog/aide-demenagement-lille/aide-demenagement-lille-guide',
    to: corrections['aide-demenagement-lille-guide']
  },
  // demenagement-international-lille/xxx → demenagement-lille/xxx (guide uniquement)
  {
    from: '/blog/demenagement-international-lille/demenagement-international-lille-guide',
    to: corrections['demenagement-international-lille-guide']
  },
  // demenagement-pas-cher-lille/xxx → demenagement-lille/xxx (guide uniquement)
  {
    from: '/blog/demenagement-pas-cher-lille/demenagement-pas-cher-lille-guide',
    to: corrections['demenagement-pas-cher-lille-guide']
  },
  // demenagement-piano-lille/xxx → demenagement-lille/xxx (guide uniquement)
  {
    from: '/blog/demenagement-piano-lille/demenagement-piano-lille-guide',
    to: corrections['demenagement-piano-lille-expert'] || '/blog/demenagement-lille/demenagement-piano-lille-expert'
  },
  // petit-demenagement-lille/xxx → demenagement-lille/xxx (guide uniquement)
  {
    from: '/blog/petit-demenagement-lille/petit-demenagement-lille-guide',
    to: corrections['petit-demenagement-lille-guide']
  },
  // demenagement-entreprise-lille/xxx → demenagement-lille/xxx (guide uniquement)
  {
    from: '/blog/demenagement-entreprise-lille/demenagement-entreprise-lille-guide',
    to: corrections['demenagement-entreprise-lille-guide']
  },
  // Catégories vides
  {
    from: '](/blog/entreprise)',
    to: '](/blog/entreprise)' // TODO: créer page ou redirection
  },
  {
    from: '](/blog/demenagement-entreprise-lille)',
    to: '](/blog/demenagement-lille/demenagement-entreprise-guide)'
  }
];

// Parcourir tous les fichiers markdown
const blogDir = path.join(root, 'content/blog');
let totalCorrections = 0;
let filesModified = 0;

function fixLinksInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let corrections = 0;
  
  patterns.forEach(pattern => {
    if (content.includes(pattern.from)) {
      const regex = new RegExp(pattern.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = (content.match(regex) || []).length;
      
      if (matches > 0) {
        content = content.replace(regex, pattern.to);
        corrections += matches;
        modified = true;
      }
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
    totalCorrections += corrections;
    console.log(`✅ ${path.relative(root, filePath)}: ${corrections} corrections`);
  }
  
  return modified;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.md') && file !== 'README.md') {
      fixLinksInFile(filePath);
    }
  });
}

console.log('\n🔍 Recherche et correction des liens...\n');
walkDir(blogDir);

console.log(`\n✅ Terminé!`);
console.log(`📝 ${filesModified} fichiers modifiés`);
console.log(`🔗 ${totalCorrections} liens corrigés`);

