#!/usr/bin/env node

/**
 * Script pour remplacer les pourcentages par les statuts dans les noms de dossiers
 * Format : P0-046-SERP-favicon-logo-100% → P0-046-SERP-favicon-logo-termine
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../../../');
const tasksDir = path.join(rootDir, '.cursor/tasks');

// Mapping statut → slug
function extractStatus(filePath, percentage) {
  // Utiliser le pourcentage comme indicateur principal
  let status = 'pas-commence';
  if (percentage >= 100) status = 'termine';
  else if (percentage > 0) status = 'en-cours';
  else status = 'pas-commence';
  
  if (!fs.existsSync(filePath)) return status;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Chercher statut explicite qui override le pourcentage
  const statusPatterns = [
    /statut[:\s]+([^\n]+)/i,
    /STATUS[:\s]+([^\n]+)/i,
    /status final[:\s]+([^\n]+)/i,
    /✅.*FINALISÉ|TERMINÉ|COMPLET|FINI|DONE/i,
    /🔄.*EN COURS|IN PROGRESS/i,
    /📋.*À FAIRE|PENDING|TODO/i,
    /⚠️.*INCOMPLET/i,
    /❌.*ABANDONNÉE/i,
  ];
  
  for (const pattern of statusPatterns) {
    const match = content.match(pattern);
    if (match) {
      const statusText = match[1] ? match[1].toLowerCase() : '';
      const fullMatch = (match[0] + ' ' + statusText).toLowerCase();
      
      // Vérifier statuts finaux
      if (/finalisé|terminé|complet|fini|done|✅/i.test(fullMatch)) {
        return 'termine';
      }
      if (/incomplet|⚠️/i.test(fullMatch)) {
        return 'incomplet';
      }
      if (/abandonnée|❌/i.test(fullMatch)) {
        return 'abandonnee';
      }
      if (/en cours|🔄|in progress/i.test(fullMatch)) {
        return 'en-cours';
      }
      if (/à faire|pending|todo|📋/i.test(fullMatch)) {
        return 'pas-commence';
      }
    }
  }
  
  // Chercher patterns de statut dans le contenu (override pourcentage si trouvé)
  if (/TERMINÉ|COMPLET|FINALISÉ|FINI|DONE|✅.*100|100%.*complété/i.test(content)) {
    return 'termine';
  }
  if (/INCOMPLET|⚠️/i.test(content)) {
    return 'incomplet';
  }
  if (/ABANDONNÉE|❌/i.test(content)) {
    return 'abandonnee';
  }
  if (/EN COURS|IN PROGRESS|🔄.*\d+%/i.test(content) && percentage > 0 && percentage < 100) {
    return 'en-cours';
  }
  
  // Retourner statut basé sur pourcentage par défaut
  return status;
}

function findTaskDirs() {
  const dirs = [];
  try {
    const result = execSync(`find "${tasksDir}" -maxdepth 1 -type d -name "P*-*%"`, { encoding: 'utf-8' });
    dirs.push(...result.trim().split('\n').filter(d => d));
  } catch (error) {
    // Ignorer erreur si aucun résultat
  }
  return dirs;
}

function renameWithStatus() {
  console.log('🔍 Recherche des dossiers avec pourcentages...\n');
  
  const dirs = findTaskDirs();
  console.log(`📁 ${dirs.length} dossiers trouvés\n`);
  
  const renames = [];
  
  for (const oldPath of dirs) {
    const oldName = path.basename(oldPath);
    
    // Extraire le nom sans le pourcentage
    const nameMatch = oldName.match(/^(.+)-(\d+)%$/);
    if (!nameMatch) continue;
    
    const baseName = nameMatch[1];
    const percentage = parseInt(nameMatch[2]);
    
    // Extraire statut depuis fichiers (avec pourcentage comme fallback)
    const progressPath = path.join(oldPath, 'progress.md');
    const readmePath = path.join(oldPath, 'README.md');
    const statusFromProgress = extractStatus(progressPath, percentage);
    const statusFromReadme = extractStatus(readmePath, percentage);
    // Si les deux sont différents, prioriser celui qui n'est pas "pas-commence" ou celui du README
    const status = statusFromReadme !== 'pas-commence' ? statusFromReadme : statusFromProgress;
    
    const newName = `${baseName}-${status}`;
    const newPath = path.join(tasksDir, newName);
    
    renames.push({
      oldPath,
      newPath,
      oldName,
      newName,
      status,
      percentage,
    });
  }
  
  // Afficher plan
  console.log('📋 PLAN DE RENOMMAGE :\n');
  for (const { oldName, newName, status } of renames) {
    console.log(`${oldName}`);
    console.log(`  → ${newName} (${status})\n`);
  }
  
  const args = process.argv.slice(2);
  const autoConfirm = args.includes('--yes') || args.includes('-y');
  
  if (!autoConfirm) {
    console.log(`\n⚠️  ${renames.length} dossiers à renommer`);
    console.log('\n⚠️  Ajoutez --yes pour exécuter le renommage automatiquement.\n');
    return;
  }
  
  // Renommer
  console.log('\n🔄 Renommage en cours...\n');
  let success = 0;
  let errors = 0;
  
  for (const { oldPath, newPath, oldName, newName } of renames) {
    try {
      if (fs.existsSync(newPath)) {
        console.log(`⚠️  ${newName} existe déjà, skip`);
        continue;
      }
      fs.renameSync(oldPath, newPath);
      console.log(`✅ ${oldName} → ${newName}`);
      success++;
    } catch (error) {
      console.error(`❌ Erreur renommage ${oldName}:`, error.message);
      errors++;
    }
  }
  
  console.log(`\n✅ Renommage terminé !`);
  console.log(`   Succès: ${success}`);
  if (errors > 0) console.log(`   Erreurs: ${errors}`);
}

renameWithStatus();

