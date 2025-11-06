#!/usr/bin/env node

/**
 * Script de mise à jour des références aux tâches après renommage
 * Met à jour tous les fichiers .md qui référencent les anciens noms de tâches
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../../../');
const cursorDir = path.join(rootDir, '.cursor');

// Mapping ancien nom → nouveau nom (format complet pour recherche)
const taskMappings = {
  '[P0]-TASK-046-favicon-logo-serp': 'P0-046-SERP-favicon-logo-100%',
  '[P0]-TASK-LEADGEN-01-metadata-ctr-optimisation': 'P0-LEADGEN-01-Metadata-ctr-optimisation-100%',
  '[P0]-TASK-LEADGEN-02-404-indexation-boost': 'P0-LEADGEN-02-404-indexation-boost-100%',
  '[P0]-TASK-LEADGEN-03-monitoring-ctr-optimisation': 'P0-LEADGEN-03-Analytics-monitoring-ctr-100%',
  '[P1]-TASK-006-migration-canonicals-complete': 'P1-006-SEO-migration-canonicals-100%',
  '[P1]-TASK-012-villes-hardcodees': 'P1-012-SEO-villes-hardcodees-50%',
  '[P1]-TASK-027-clean-redirections': 'P1-027-SEO-clean-redirections-100%',
  '[P1]-TASK-028-sitemaps-consistency': 'P1-028-SEO-sitemaps-consistency-100%',
  '[P1]-TASK-032-search-console': 'P1-032-SEO-search-console-0%',
  '[P1]-TASK-038-bug-faq-global': 'P1-038-SEO-bug-faq-global-100%',
  '[P1]-TASK-039-titles-normalisation': 'P1-039-SEO-titles-normalisation-100%',
  '[P1]-TASK-040-descriptions-tier2': 'P1-040-SEO-descriptions-tier2-0%',
  '[P1]-TASK-041-price-signals': 'P1-041-SEO-price-signals-0%',
  '[P1]-TASK-045-qa-monitoring-ctr': 'P1-045-Analytics-qa-ctr-100%',
  '[P1]-TASK-047-wording-offre-refonte': 'P1-047-Wording-offre-refonte-100%',
  '[P1]-TASK-048-ci-anti-404': 'P1-048-CI-CD-anti-404-100%',
  '[P1]-TASK-050-fix-hardcoded-nice-links': 'P1-050-404-fix-hardcoded-nice-links-100%',
  '[P1]-TASK-404-07-redirections-externes': 'P1-404-07-404-redirections-externes-0%',
  '[P1]-TASK-ANALYTICS-01-setup-tracking': 'P1-ANALYTICS-01-Analytics-setup-tracking-100%',
  '[P1]-TASK-LEADGEN-04-metadata-articles-blog': 'P1-LEADGEN-04-Metadata-articles-blog-100%',
  '[P2]-TASK-009-amelioration-seo': 'P2-009-SEO-amelioration-70%',
  '[P2]-TASK-013-internal-linking-homepage': 'P2-013-SEO-internal-linking-homepage-75%',
  '[P2]-TASK-014-optimisation-metadata': 'P2-014-Metadata-optimisation-100%',
  '[P2]-TASK-023-setup-scripts-automation': 'P2-023-Scripts-setup-automation-100%',
  '[P2]-TASK-026-blog-structure-optimale': 'P2-026-Blog-structure-optimale-100%',
  '[P2]-TASK-043-faq-rationalisation': 'P2-043-SEO-faq-rationalisation-100%',
  '[P2]-TASK-044-howto-video-poc': 'P2-044-SEO-howto-video-poc-100%',
};

// Fonction pour trouver tous les fichiers .md
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

// Fonction principale
async function updateAllReferences() {
  console.log('🔍 Recherche des fichiers .md (incluant archives)...\n');
  
  // Inclure aussi les archives
  const mdFiles = [
    ...findMdFiles(cursorDir),
    ...findMdFiles(path.join(cursorDir, 'archives')),
  ];
  console.log(`📄 ${mdFiles.length} fichiers trouvés\n`);
  
  let totalFiles = 0;
  let totalReplacements = 0;
  
  for (const filePath of mdFiles) {
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    let fileReplacements = 0;
    
    // Pour chaque ancien nom dans le mapping
    for (const [oldName, newName] of Object.entries(taskMappings)) {
      const escapedOld = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Remplacer format complet [P0]-TASK-046-xxx
      const fullPattern = new RegExp(escapedOld, 'g');
      const fullMatches = (content.match(fullPattern) || []).length;
      if (fullMatches > 0) {
        content = content.replace(fullPattern, newName);
        fileReplacements += fullMatches;
      }
      
      // Remplacer dans les chemins .cursor/tasks/[P0]-TASK-046-xxx/
      const pathPatterns = [
        new RegExp(`\\.cursor/tasks/${escapedOld}/`, 'g'),
        new RegExp(`tasks/${escapedOld}/`, 'g'),
        new RegExp(`\`\\.cursor/tasks/${escapedOld}/`, 'g'),
        new RegExp(`"\.cursor/tasks/${escapedOld}/`, 'g'),
      ];
      
      for (const pattern of pathPatterns) {
        const matches = (content.match(pattern) || []).length;
        if (matches > 0) {
          content = content.replace(pattern, (match) => {
            return match.replace(oldName, newName);
          });
          fileReplacements += matches;
        }
      }
      
      // Remplacer format court TASK-XXX dans les références de texte
      // Ex: "Voir TASK-046 pour détails" → "Voir P0-046-SERP-favicon-logo-100% pour détails"
      // Mais seulement si suivi de contexte qui indique une référence
      const shortPattern = new RegExp(`TASK-${escapedOld.match(/TASK-([\w-]+)/)?.[1] || ''}(?=[^/\\w])`, 'gi');
      // On fera ça plus prudemment en cherchant les patterns spécifiques
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

// Exécuter
updateAllReferences().catch(console.error);
