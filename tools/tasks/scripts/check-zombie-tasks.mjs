#!/usr/bin/env node
/**
 * 🧟 DÉTECTION TÂCHES ZOMBIES
 * 
 * Tâches "En cours" depuis >7 jours sans update
 * Run hebdomadaire: node .cursor/scripts/check-zombie-tasks.mjs
 */

import { readdirSync, statSync, readFileSync } from 'fs';
import { join } from 'path';

const TASKS_DIR = '/Users/guillaumestehelin/moverz_main-2/.cursor/tasks';
const ZOMBIE_THRESHOLD_DAYS = 7;

console.log('🧟 DÉTECTION TÂCHES ZOMBIES\n');

const tasks = readdirSync(TASKS_DIR)
  .filter(name => name.includes('TASK-') && statSync(join(TASKS_DIR, name)).isDirectory());

const zombies = [];
const now = Date.now();

for (const taskName of tasks) {
  const taskPath = join(TASKS_DIR, taskName);
  const progressPath = join(taskPath, 'progress.md');

  try {
    // Lire progress.md pour trouver dernier update
    const progress = readFileSync(progressPath, 'utf-8');
    
    // Extraire dates (format: **Date** : DD/MM/YYYY)
    const dates = progress.match(/\*\*Date\*\* : (\d{2}\/\d{2}\/\d{4})/g);
    
    if (!dates || dates.length === 0) continue;

    // Dernière date
    const lastDateStr = dates[dates.length - 1].match(/(\d{2}\/\d{2}\/\d{4})/)[1];
    const [day, month, year] = lastDateStr.split('/');
    const lastDate = new Date(year, month - 1, day);
    
    const daysSince = Math.floor((now - lastDate.getTime()) / (1000 * 60 * 60 * 24));

    // Vérifier statut dans README
    const readme = readFileSync(join(taskPath, 'README.md'), 'utf-8');
    const isEnCours = readme.includes('🔄 En cours') || readme.includes('EN COURS');

    if (isEnCours && daysSince >= ZOMBIE_THRESHOLD_DAYS) {
      zombies.push({ taskName, daysSince, lastDate: lastDateStr });
    }
  } catch (err) {
    // Ignorer erreurs de parsing
  }
}

if (zombies.length === 0) {
  console.log(`✅ Aucune tâche zombie (>=${ZOMBIE_THRESHOLD_DAYS} jours sans update)\n`);
  process.exit(0);
}

console.log(`🚨 ${zombies.length} tâche(s) zombie détectée(s) !\n`);

zombies.forEach(({ taskName, daysSince, lastDate }) => {
  console.log(`⚠️ ${taskName}`);
  console.log(`   Dernier update: ${lastDate} (${daysSince} jours)`);
  console.log(`   Action: Mettre en pause (INCOMPLET) ou finaliser\n`);
});

console.log('💡 Recommandation:');
console.log('   - Si bloquée → Marquer INCOMPLET');
console.log('   - Si oubliée → Finaliser ou abandonner');
console.log('   - Si active → Logger une session\n');

process.exit(1);

