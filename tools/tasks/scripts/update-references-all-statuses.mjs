#!/usr/bin/env node

/**
 * Script pour mettre à jour TOUTES les références après correction des statuts
 * Inclut les nouveaux statuts : en-pause, en-attente, fusionne
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../../../');
const cursorDir = path.join(rootDir, '.cursor');

// Mapping ancien → nouveau (tous les changements possibles)
const statusMappings = {
  '-100%': '-termine',
  '-50%': '-en-cours',
  '-70%': '-en-cours',
  '-75%': '-en-cours',
  '-0%': '-pas-commence',
  // Corrections statuts incorrects
  '-termine': null, // Sera remplacé par le vrai statut individuellement
};

// Mapping spécifique des corrections faites
const specificMappings = {
  'P2-026-Blog-blog-structure-optimale-termine': 'P2-026-Blog-blog-structure-optimale-pas-commence',
  'P2-023-Scripts-setup-termine': 'P2-023-Scripts-setup-pas-commence',
  'P0-LEADGEN-01-metadata-ctr-optimisation-Metadata-task-termine': 'P0-LEADGEN-01-metadata-ctr-optimisation-Metadata-task-en-cours',
  'P1-LEADGEN-04-metadata-articles-blog-Metadata-task-termine': 'P1-LEADGEN-04-metadata-articles-blog-Metadata-task-pas-commence',
  'P1-047-Wording-wording-offre-refonte-termine': 'P1-047-Wording-wording-offre-refonte-pas-commence',
  'P1-040-SEO-descriptions-tier2-incomplet': 'P1-040-SEO-descriptions-tier2-fusionne',
  'P2-014-Metadata-optimisation-termine': 'P2-014-Metadata-optimisation-en-cours',
  'P1-028-SEO-sitemaps-consistency-termine': 'P1-028-SEO-sitemaps-consistency-pas-commence',
  'P0-046-SERP-favicon-logo-termine': 'P0-046-SERP-favicon-logo-en-pause',
  'P1-039-SEO-titles-normalisation-termine': 'P1-039-SEO-titles-normalisation-fusionne',
  'P1-045-Analytics-qa-ctr-termine': 'P1-045-Analytics-qa-ctr-fusionne',
  'P2-043-SEO-faq-rationalisation-termine': 'P2-043-SEO-faq-rationalisation-pas-commence',
  'P1-050-404-fix-hardcoded-nice-links-termine': 'P1-050-404-fix-hardcoded-nice-links-en-attente',
  'P2-044-SEO-howto-video-poc-termine': 'P2-044-SEO-howto-video-poc-pas-commence',
  'P0-LEADGEN-03-monitoring-ctr-optimisation-Analytics-task-termine': 'P0-LEADGEN-03-monitoring-ctr-optimisation-Analytics-task-pas-commence',
  'P1-038-SEO-bug-faq-global-termine': 'P1-038-SEO-bug-faq-global-pas-commence',
  'P2-013-SEO-internal-linking-homepage-termine': 'P2-013-SEO-internal-linking-homepage-en-cours',
  'P2-009-SEO-amelioration-termine': 'P2-009-SEO-amelioration-en-cours',
  'P0-LEADGEN-02-404-indexation-boost-404-task-termine': 'P0-LEADGEN-02-404-indexation-boost-404-task-en-attente',
  'P1-027-SEO-clean-redirections-termine': 'P1-027-SEO-clean-redirections-pas-commence',
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
  console.log('🔍 Recherche des références à mettre à jour...\n');
  
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
    
    // Remplacer mappings spécifiques
    for (const [oldName, newName] of Object.entries(specificMappings)) {
      const escapedOld = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Remplacer dans les chemins
      const pathPatterns = [
        new RegExp(`(tasks/)${escapedOld}(/)`, 'g'),
        new RegExp(`(\\.cursor/tasks/)${escapedOld}(/)`, 'g'),
        new RegExp(`\`.*?${escapedOld}(/)?\``, 'g'),
        new RegExp(`".*?${escapedOld}(/)?\"`, 'g'),
      ];
      
      for (const pattern of pathPatterns) {
        const matches = content.match(pattern);
        if (matches && matches.length > 0) {
          content = content.replace(pattern, (match) => {
            return match.replace(oldName, newName);
          });
          fileReplacements += matches.length;
        }
      }
      
      // Remplacer noms complets dans texte
      const textPattern = new RegExp(escapedOld, 'g');
      const textMatches = content.match(textPattern);
      if (textMatches && textMatches.length > 0) {
        // Vérifier que ce n'est pas déjà dans un chemin mis à jour
        content = content.replace(textPattern, (match, offset) => {
          // Vérifier contexte avant/après
          const before = content.substring(Math.max(0, offset - 20), offset);
          const after = content.substring(offset + match.length, offset + match.length + 20);
          
          // Si c'est déjà dans un chemin, skip
          if (before.includes('tasks/') || before.includes('.cursor/')) {
            return match; // Garder tel quel, sera traité par pathPatterns
          }
          
          return newName;
        });
        fileReplacements += textMatches.length;
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

