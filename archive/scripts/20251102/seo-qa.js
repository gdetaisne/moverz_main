#!/usr/bin/env node
/*
  QA années: détecte les mentions "2024" dans les layouts (racine + villes)
  Erreur bloquante si détecté.
*/
const { rgPath } = require('@vscode/ripgrep');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

function runRg(pattern, dir) {
  const result = spawnSync(rgPath, [pattern, dir, '--line-number', '--color', 'never'], { encoding: 'utf8' });
  if (result.error) throw result.error;
  return result.stdout.trim();
}

function main() {
  console.log('🔍 Années "2024" - scan complet\n');
  
  const root = process.cwd();
  
  // Scan sites/*/app/layout.tsx
  const sitesTarget = path.join(root, 'sites');
  const sitesOut = runRg('2024', sitesTarget);
  
  // Scan app/layout.tsx racine
  const rootTarget = path.join(root, 'app/layout.tsx');
  const rootOut = runRg('2024', rootTarget);
  
  const allMatches = [sitesOut, rootOut].filter(Boolean).join('\n');
  
  if (!allMatches) {
    console.log('✅ Aucune occurrence "2024" détectée\n');
    process.exit(0);
  }
  
  const lines = allMatches.split('\n').filter(Boolean);
  const layoutMatches = lines.filter(l => l.includes('app/layout.tsx'));
  
  if (layoutMatches.length === 0) {
    console.log('⚠️  Occurrences "2024" trouvées hors layouts (probablement contenu):\n');
    console.log(lines.slice(0, 5).join('\n'));
    if (lines.length > 5) console.log(`   ... et ${lines.length - 5} autres`);
    console.log('\n✅ Layouts OK\n');
    process.exit(0);
  }
  
  console.log('❌ Années "2024" détectées dans layouts:\n');
  layoutMatches.forEach(m => console.log(`   ${m}`));
  console.log('\n❌ QA ANNÉES: FAILED\n');
  console.log('Fix: Remplacer "2024" par "2025" dans les fichiers listés\n');
  process.exit(1);
}

main();


