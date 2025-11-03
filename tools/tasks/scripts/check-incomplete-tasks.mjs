#!/usr/bin/env node
/**
 * 🚨 DÉTECTION TÂCHES INCOMPLET
 * 
 * Rappel automatique des tâches en pause
 * Run au démarrage de session: node .cursor/scripts/check-incomplete-tasks.mjs
 */

import { readFileSync } from 'fs';

const BACKLOG_PATH = '/Users/guillaumestehelin/moverz_main-2/.cursor/BACKLOG.md';

console.log('🚨 VÉRIFICATION TÂCHES INCOMPLET\n');

const backlog = readFileSync(BACKLOG_PATH, 'utf-8');

// Chercher section INCOMPLET
const incompletSection = backlog.match(/## ⚠️ TÂCHES INCOMPLÈTES[\s\S]*?(?=\n##|$)/);

if (!incompletSection) {
  console.log('✅ Aucune tâche INCOMPLET\n');
  process.exit(0);
}

// Parser les tâches incomplet
const content = incompletSection[0];
const tasks = content.match(/TASK-\d+/g) || [];

if (tasks.length === 0) {
  console.log('✅ Aucune tâche INCOMPLET\n');
  process.exit(0);
}

// Afficher l'alerte
console.log('⚠️ ATTENTION : Tu as des tâches INCOMPLET en attente !\n');
console.log(`📊 ${tasks.length} tâche(s) en pause :\n`);

tasks.forEach((task, i) => {
  console.log(`${i + 1}. ${task}`);
});

console.log('\n💡 RAPPEL : Les tâches INCOMPLET sont TOUJOURS prioritaires');
console.log('📋 Actions possibles:');
console.log('   A) Reprendre une tâche INCOMPLET');
console.log('   B) Abandonner (avec revert code)');
console.log('   C) Justifier pourquoi démarrer du nouveau\n');

console.log('🔗 Voir: .cursor/BACKLOG.md section "⚠️ TÂCHES INCOMPLÈTES"\n');

process.exit(1); // Exit 1 pour attirer l'attention

