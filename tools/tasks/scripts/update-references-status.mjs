#!/usr/bin/env node

/**
 * Script pour mettre à jour toutes les références après remplacement pourcentages → statuts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../../../');
const cursorDir = path.join(rootDir, '.cursor');

// Mapping ancien nom (avec %) → nouveau nom (avec statut)
const statusMappings = {
  '100%': 'termine',
  '50%': 'en-cours',
  '70%': 'en-cours',
  '75%': 'en-cours',
  '0%': 'pas-commence',
};

function findMdFiles(dir) {
  const files = [];
  try {
    const result = execSync(`find "${dir}" -name "*.md" -type f`, { encoding: 'utf-8' });
    files.push(...result.trim().split('\n').filter(f => f));
  } catch (error) {
    console.error('Erreur find:', error.message);
  }
  return files;
}

function updateReferences() {
  console.log('🔍 Recherche des références avec pourcentages...\n');
  
  const mdFiles = [
    ...findMdFiles(cursorDir),
    ...findMdFiles(path.join(cursorDir, 'archives')),
  ];
  
  let totalFiles = 0;
  let totalReplacements = 0;
  
  for (const filePath of mdFiles) {
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    let fileReplacements = 0;
    
    // Remplacer tous les patterns P*-*-*-*-XXX% par P*-*-*-*-statut
    for (const [pct, status] of Object.entries(statusMappings)) {
      // Pattern pour noms complets avec pourcentage
      const pattern = new RegExp(`(P[0-2]-[A-Z0-9-]+-[A-Z][^\\s]*?)-${pct.replace('%', '\\%')}(?=[^%\\w])`, 'g');
      const matches = content.match(pattern);
      if (matches && matches.length > 0) {
        content = content.replace(pattern, `$1-${status}`);
        fileReplacements += matches.length;
      }
      
      // Pattern pour chemins .cursor/tasks/P*-*-*-*-XXX%/
      const pathPattern = new RegExp(`(tasks/P[0-2]-[A-Z0-9-]+-[A-Z][^/\\s]*?)-${pct.replace('%', '\\%')}(/)`, 'g');
      const pathMatches = content.match(pathPattern);
      if (pathMatches && pathMatches.length > 0) {
        content = content.replace(pathPattern, `$1-${status}$2`);
        fileReplacements += pathMatches.length;
      }
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf-8');
      totalFiles++;
      totalReplacements += fileReplacements;
      const relativePath = path.relative(cursorDir, filePath);
      console.log(`✅ ${relativePath} (${fileReplacements} remplacements)`);
    }
  }
  
  console.log(`\n✅ Mise à jour terminée :`);
  console.log(`   - ${totalFiles} fichiers modifiés`);
  console.log(`   - ${totalReplacements} références mises à jour`);
}

updateReferences();

