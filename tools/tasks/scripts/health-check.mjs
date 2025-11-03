#!/usr/bin/env node
/**
 * 🏥 HEALTH CHECK COMPLET SYSTÈME TASKS
 * 
 * Run TOUS les checks en une fois
 * Usage: node .cursor/scripts/health-check.mjs
 */

import { execSync } from 'child_process';

const SCRIPTS_DIR = '/Users/guillaumestehelin/moverz_main-2/.cursor/scripts';

console.log('🏥 HEALTH CHECK SYSTÈME TASKS');
console.log('='.repeat(60));
console.log('');

let totalErrors = 0;
let totalWarnings = 0;

// 1. Validation Structure
console.log('1️⃣ VALIDATION STRUCTURE TÂCHES...\n');
try {
  execSync(`node ${SCRIPTS_DIR}/validate-tasks.mjs`, { stdio: 'inherit' });
  console.log('✅ Structure: OK\n');
} catch (err) {
  console.log('❌ Structure: ERREURS DÉTECTÉES\n');
  totalErrors++;
}

console.log('='.repeat(60));
console.log('');

// 2. Check INCOMPLET
console.log('2️⃣ VÉRIFICATION TÂCHES INCOMPLET...\n');
try {
  execSync(`node ${SCRIPTS_DIR}/check-incomplete-tasks.mjs`, { stdio: 'inherit' });
  console.log('✅ INCOMPLET: Aucune\n');
} catch (err) {
  console.log('⚠️ INCOMPLET: Tâches en attente\n');
  totalWarnings++;
}

console.log('='.repeat(60));
console.log('');

// 3. Check Zombies
console.log('3️⃣ DÉTECTION TÂCHES ZOMBIES...\n');
try {
  execSync(`node ${SCRIPTS_DIR}/check-zombie-tasks.mjs`, { stdio: 'inherit' });
  console.log('✅ Zombies: Aucune\n');
} catch (err) {
  console.log('⚠️ Zombies: Tâches détectées\n');
  totalWarnings++;
}

console.log('='.repeat(60));
console.log('');

// 4. Dashboard
console.log('4️⃣ DASHBOARD MÉTRIQUES...\n');
try {
  execSync(`node ${SCRIPTS_DIR}/tasks-dashboard.mjs`, { stdio: 'inherit' });
} catch (err) {
  console.log('❌ Dashboard: Erreur\n');
  totalErrors++;
}

console.log('='.repeat(60));
console.log('');

// 5. Résumé final
console.log('📊 RÉSUMÉ HEALTH CHECK:');
console.log('');
console.log(`❌ Erreurs:  ${totalErrors}`);
console.log(`⚠️ Warnings: ${totalWarnings}`);
console.log('');

if (totalErrors === 0 && totalWarnings === 0) {
  console.log('✅ SYSTÈME TASKS : PARFAIT\n');
  process.exit(0);
} else if (totalErrors === 0) {
  console.log('⚠️ SYSTÈME TASKS : OK AVEC ALERTES\n');
  process.exit(0);
} else {
  console.log('🚨 SYSTÈME TASKS : ACTION REQUISE\n');
  process.exit(1);
}

