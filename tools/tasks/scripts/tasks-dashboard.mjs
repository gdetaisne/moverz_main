#!/usr/bin/env node
/**
 * 📊 DASHBOARD MÉTRIQUES TASKS
 * 
 * Vue d'ensemble du système de tasks
 * Run: node .cursor/scripts/tasks-dashboard.mjs
 */

import { readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';

const TASKS_DIR = '/Users/guillaumestehelin/moverz_main-2/.cursor/tasks';
const BACKLOG_PATH = '/Users/guillaumestehelin/moverz_main-2/.cursor/BACKLOG.md';

console.log('📊 DASHBOARD SYSTÈME TASKS\n');
console.log('='.repeat(50));
console.log('');

// 1. Compter tâches
const tasks = readdirSync(TASKS_DIR)
  .filter(name => name.includes('TASK-') && statSync(join(TASKS_DIR, name)).isDirectory());

const tasksByStatus = {
  pending: 0,
  enCours: 0,
  incomplet: 0,
  termine: 0,
  abandonne: 0
};

const tasksByPriority = {
  P0: 0,
  P1: 0,
  P2: 0,
  P3: 0
};

for (const taskName of tasks) {
  try {
    const readmePath = join(TASKS_DIR, taskName, 'README.md');
    const readme = readFileSync(readmePath, 'utf-8');
    
    // Statut
    if (readme.includes('📋 À faire') || readme.includes('PENDING')) tasksByStatus.pending++;
    else if (readme.includes('🔄 En cours') || readme.includes('EN COURS')) tasksByStatus.enCours++;
    else if (readme.includes('⚠️ INCOMPLET') || readme.includes('INCOMPLET')) tasksByStatus.incomplet++;
    else if (readme.includes('✅ FINALISÉ') || readme.includes('TERMINÉ')) tasksByStatus.termine++;
    else if (readme.includes('❌ ABANDONNÉE')) tasksByStatus.abandonne++;
    
    // Priorité
    if (readme.includes('P0')) tasksByPriority.P0++;
    else if (readme.includes('P1')) tasksByPriority.P1++;
    else if (readme.includes('P2')) tasksByPriority.P2++;
    else if (readme.includes('P3')) tasksByPriority.P3++;
  } catch (err) {
    // Ignorer tâches avec README.md manquant (seront catchées par validate-tasks)
  }
}

// 2. Afficher métriques
console.log('📈 MÉTRIQUES GLOBALES:');
console.log('');
console.log(`Total tâches:          ${tasks.length}`);
console.log('');
console.log('Par statut:');
console.log(`  📋 À faire:          ${tasksByStatus.pending}`);
console.log(`  🔄 En cours:         ${tasksByStatus.enCours}`);
console.log(`  ⚠️  INCOMPLET:        ${tasksByStatus.incomplet}`);
console.log(`  ✅ Terminé:          ${tasksByStatus.termine}`);
console.log(`  ❌ Abandonné:        ${tasksByStatus.abandonne}`);
console.log('');
console.log('Par priorité:');
console.log(`  🔥 P0 (Critique):    ${tasksByPriority.P0}`);
console.log(`  🚨 P1 (Important):   ${tasksByPriority.P1}`);
console.log(`  📊 P2 (Normal):      ${tasksByPriority.P2}`);
console.log(`  💡 P3 (Nice-to-have):${tasksByPriority.P3}`);
console.log('');

// 3. Taux de complétion
const completed = tasksByStatus.termine;
const total = tasks.length - tasksByStatus.abandonne;
const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

console.log('📊 PERFORMANCE:');
console.log('');
console.log(`Taux de complétion:    ${completionRate}% (${completed}/${total})`);

// 4. Alertes
console.log('');
console.log('🚨 ALERTES:');
console.log('');

if (tasksByStatus.incomplet > 0) {
  console.log(`⚠️  ${tasksByStatus.incomplet} tâche(s) INCOMPLET → À reprendre en priorité !`);
}

if (tasksByStatus.enCours > 3) {
  console.log(`⚠️  ${tasksByStatus.enCours} tâches en cours → Trop parallèle, risque de zombie`);
}

if (tasksByStatus.enCours === 0 && tasksByStatus.incomplet === 0) {
  console.log('✅ Aucune tâche active → Prêt à démarrer du nouveau !');
}

console.log('');
console.log('='.repeat(50));
console.log('');

