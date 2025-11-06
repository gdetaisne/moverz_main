#!/usr/bin/env node

/**
 * Script pour mettre à jour les références courtes (TASK-046) vers les nouveaux noms complets
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../../../');
const cursorDir = path.join(rootDir, '.cursor');

// Mapping ID tâche → nouveau nom complet
const taskIdToNewName = {
  '046': 'P0-046-SERP-favicon-logo-100%',
  'LEADGEN-01': 'P0-LEADGEN-01-Metadata-ctr-optimisation-100%',
  'LEADGEN-02': 'P0-LEADGEN-02-404-indexation-boost-100%',
  'LEADGEN-03': 'P0-LEADGEN-03-Analytics-monitoring-ctr-100%',
  'LEADGEN-04': 'P1-LEADGEN-04-Metadata-articles-blog-100%',
  '006': 'P1-006-SEO-migration-canonicals-100%',
  '012': 'P1-012-SEO-villes-hardcodees-50%',
  '027': 'P1-027-SEO-clean-redirections-100%',
  '028': 'P1-028-SEO-sitemaps-consistency-100%',
  '032': 'P1-032-SEO-search-console-0%',
  '038': 'P1-038-SEO-bug-faq-global-100%',
  '039': 'P1-039-SEO-titles-normalisation-100%',
  '040': 'P1-040-SEO-descriptions-tier2-0%',
  '041': 'P1-041-SEO-price-signals-0%',
  '045': 'P1-045-Analytics-qa-ctr-100%',
  '047': 'P1-047-Wording-offre-refonte-100%',
  '048': 'P1-048-CI-CD-anti-404-100%',
  '050': 'P1-050-404-fix-hardcoded-nice-links-100%',
  '404-07': 'P1-404-07-404-redirections-externes-0%',
  'ANALYTICS-01': 'P1-ANALYTICS-01-Analytics-setup-tracking-100%',
  '009': 'P2-009-SEO-amelioration-70%',
  '013': 'P2-013-SEO-internal-linking-homepage-75%',
  '014': 'P2-014-Metadata-optimisation-100%',
  '023': 'P2-023-Scripts-setup-automation-100%',
  '026': 'P2-026-Blog-structure-optimale-100%',
  '043': 'P2-043-SEO-faq-rationalisation-100%',
  '044': 'P2-044-SEO-howto-video-poc-100%',
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

function updateShortReferences() {
  console.log('🔍 Recherche des références courtes (TASK-XXX)...\n');
  
  // Inclure aussi les archives
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
    
    // Pour chaque ID de tâche
    for (const [taskId, newName] of Object.entries(taskIdToNewName)) {
      // Pattern pour TASK-XXX dans différents contextes
      // On remplace seulement si c'est une référence claire (pas dans un chemin déjà mis à jour)
      const patterns = [
        // Format: "Voir TASK-046 pour détails"
        new RegExp(`TASK-${taskId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=[^/\\w-])`, 'gi'),
        // Format: "[TASK-046]" 
        new RegExp(`\\[TASK-${taskId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]`, 'gi'),
      ];
      
      for (const pattern of patterns) {
        const matches = content.match(pattern);
        if (matches && matches.length > 0) {
          // Ne pas remplacer si c'est déjà dans un chemin mis à jour
          const contextBefore = content.substring(Math.max(0, content.indexOf(matches[0]) - 50), content.indexOf(matches[0]));
          if (!contextBefore.includes('tasks/P') && !contextBefore.includes('.cursor/tasks/P')) {
            content = content.replace(pattern, (match) => {
              // Remplacer par le nouveau nom, mais garder le format si c'était entre crochets
              if (match.startsWith('[')) {
                return `[${newName}]`;
              }
              return newName;
            });
            fileReplacements += matches.length;
          }
        }
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
  console.log(`   - ${totalReplacements} références courtes mises à jour`);
}

updateShortReferences();

