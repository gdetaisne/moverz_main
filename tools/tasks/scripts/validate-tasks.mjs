#!/usr/bin/env node
/**
 * 🔒 VALIDATION SYSTÈME DE TASKS
 * 
 * Vérifie que toutes les tâches respectent la structure obligatoire
 * Run: node .cursor/scripts/validate-tasks.mjs
 */

import { readdirSync, statSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

const TASKS_DIR = '/Users/guillaumestehelin/moverz_main-2/.cursor/tasks';
const REQUIRED_FILES = ['README.md', 'context.md', 'progress.md', 'commits.md', 'tests.md', 'decisions.md'];

console.log('🔒 VALIDATION SYSTÈME DE TASKS\n');

// 1. Lister toutes les tâches
const tasks = readdirSync(TASKS_DIR)
  .filter(name => name.includes('TASK-') && statSync(join(TASKS_DIR, name)).isDirectory());

console.log(`📊 ${tasks.length} tâches trouvées\n`);

let errors = 0;
let warnings = 0;

// 2. Valider chaque tâche
for (const taskName of tasks) {
  const taskPath = join(TASKS_DIR, taskName);
  const issues = [];

  // Vérifier fichiers obligatoires
  for (const file of REQUIRED_FILES) {
    const filePath = join(taskPath, file);
    if (!existsSync(filePath)) {
      issues.push(`❌ Fichier manquant: ${file}`);
      errors++;
    } else {
      // Vérifier que le fichier n'est pas vide
      const content = readFileSync(filePath, 'utf-8').trim();
      if (content.length < 10) {
        issues.push(`⚠️ Fichier quasi-vide: ${file} (${content.length} chars)`);
        warnings++;
      }
    }
  }

  // Vérifier README.md contient les sections obligatoires
  const readmePath = join(taskPath, 'README.md');
  if (existsSync(readmePath)) {
    const readme = readFileSync(readmePath, 'utf-8');
    const requiredSections = ['Objectif', 'Statut', 'Priorité'];
    for (const section of requiredSections) {
      if (!readme.includes(section)) {
        issues.push(`⚠️ README.md manque section: ${section}`);
        warnings++;
      }
    }
  }

  // Afficher résultat
  if (issues.length > 0) {
    console.log(`📁 ${taskName}`);
    issues.forEach(issue => console.log(`   ${issue}`));
    console.log('');
  } else {
    console.log(`✅ ${taskName}`);
  }
}

// 3. Résumé
console.log('\n📊 RÉSUMÉ:');
console.log(`✅ Tâches valides: ${tasks.length - errors}`);
console.log(`❌ Erreurs: ${errors}`);
console.log(`⚠️ Warnings: ${warnings}`);

if (errors > 0) {
  console.log('\n🚨 VALIDATION ÉCHOUÉE');
  process.exit(1);
} else if (warnings > 0) {
  console.log('\n⚠️ VALIDATION OK avec warnings');
  process.exit(0);
} else {
  console.log('\n✅ VALIDATION PARFAITE');
  process.exit(0);
}

