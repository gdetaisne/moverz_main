#!/usr/bin/env node

/**
 * Script pour corriger les statuts en fonction des statuts RÉELS dans les fichiers
 * et non pas juste les pourcentages
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../../../');
const tasksDir = path.join(rootDir, '.cursor/tasks');

function extractRealStatus(filePath) {
  if (!fs.existsSync(filePath)) return null;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Chercher statut explicite dans le fichier
  const patterns = [
    /\*\*Statut\*\*[:\s]+([^\n]+)/i,
    /statut[:\s]+([^\n]+)/i,
    /STATUS[:\s]+([^\n]+)/i,
    /status final[:\s]+([^\n]+)/i,
  ];
  
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      const statusText = match[1].toLowerCase().trim();
      
      // Détecter statuts spécifiques
      if (/finalisé|terminé|complet|fini|done|✅.*terminé/i.test(statusText)) {
        return 'termine';
      }
      if (/en pause|⏸️|pause/i.test(statusText)) {
        return 'en-pause';
      }
      if (/en cours|🔄|in progress/i.test(statusText)) {
        return 'en-cours';
      }
      if (/pending|📋|à faire|todo/i.test(statusText)) {
        return 'pas-commence';
      }
      if (/incomplet|⚠️/i.test(statusText)) {
        return 'incomplet';
      }
      if (/abandonnée|❌/i.test(statusText)) {
        return 'abandonnee';
      }
      if (/fusionné|mergé/i.test(statusText)) {
        return 'fusionne';
      }
      if (/en attente|⏳/i.test(statusText)) {
        return 'en-attente';
      }
    }
  }
  
  return null;
}

function findTaskDirs() {
  const dirs = [];
  try {
    const result = execSync(`find "${tasksDir}" -maxdepth 1 -type d -name "P*-*-*-*-*"`, { encoding: 'utf-8' });
    dirs.push(...result.trim().split('\n').filter(d => d && !d.includes('.md')));
  } catch (error) {
    // Ignorer erreur si aucun résultat
  }
  return dirs;
}

function fixStatuses() {
  console.log('🔍 Recherche des dossiers pour corriger les statuts...\n');
  
  const dirs = findTaskDirs();
  console.log(`📁 ${dirs.length} dossiers trouvés\n`);
  
  const fixes = [];
  
  for (const dirPath of dirs) {
    const dirName = path.basename(dirPath);
    
    // Extraire le statut actuel
    const match = dirName.match(/^(.+)-(termine|en-cours|pas-commence|incomplet|abandonnee|en-pause|fusionne|en-attente)$/);
    if (!match) continue;
    
    const baseName = match[1];
    const currentStatus = match[2];
    
    // Lire statut réel depuis fichiers
    const progressPath = path.join(dirPath, 'progress.md');
    const readmePath = path.join(dirPath, 'README.md');
    
    const realStatusProgress = extractRealStatus(progressPath);
    const realStatusReadme = extractRealStatus(readmePath);
    
    // Prioriser README, puis progress
    const realStatus = realStatusReadme || realStatusProgress;
    
    if (!realStatus) {
      // Pas de statut trouvé, garder actuel ou essayer de deviner
      continue;
    }
    
    if (realStatus !== currentStatus) {
      const newName = `${baseName}-${realStatus}`;
      const newPath = path.join(tasksDir, newName);
      
      fixes.push({
        oldPath: dirPath,
        newPath,
        oldName: dirName,
        newName,
        currentStatus,
        realStatus,
      });
    }
  }
  
  if (fixes.length === 0) {
    console.log('✅ Tous les statuts sont déjà corrects !\n');
    return;
  }
  
  // Afficher plan
  console.log('📋 CORRECTIONS À FAIRE :\n');
  for (const { oldName, newName, currentStatus, realStatus } of fixes) {
    console.log(`${oldName}`);
    console.log(`  → ${newName} (${currentStatus} → ${realStatus})\n`);
  }
  
  const args = process.argv.slice(2);
  const autoConfirm = args.includes('--yes') || args.includes('-y');
  
  if (!autoConfirm) {
    console.log(`\n⚠️  ${fixes.length} dossiers à corriger`);
    console.log('\n⚠️  Ajoutez --yes pour exécuter le renommage automatiquement.\n');
    return;
  }
  
  // Renommer
  console.log('\n🔄 Correction en cours...\n');
  let success = 0;
  let errors = 0;
  
  for (const { oldPath, newPath, oldName, newName } of fixes) {
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
  
  console.log(`\n✅ Correction terminée !`);
  console.log(`   Succès: ${success}`);
  if (errors > 0) console.log(`   Erreurs: ${errors}`);
}

fixStatuses();

