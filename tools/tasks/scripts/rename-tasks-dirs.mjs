#!/usr/bin/env node

/**
 * Script de renommage des dossiers de tâches
 * Format ancien : [P0]-TASK-046-favicon-logo-serp
 * Format nouveau : P0-046-SERP-favicon-logo-0%
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../../../');
const tasksDir = path.join(rootDir, '.cursor/tasks');

// Mapping sujet global
const subjectMapping = {
  'favicon-logo-serp': 'SERP',
  'metadata-ctr-optimisation': 'Metadata',
  'metadata-articles-blog': 'Metadata',
  'optimisation-metadata': 'Metadata',
  '404-indexation-boost': '404',
  'redirections-externes': '404',
  'monitoring-ctr-optimisation': 'Analytics',
  'migration-canonicals-complete': 'SEO',
  'canonicals': 'SEO',
  'sitemaps-consistency': 'SEO',
  'search-console': 'SEO',
  'internal-linking': 'SEO',
  'villes-hardcodees': 'SEO',
  'titles-normalisation': 'SEO',
  'descriptions-tier2': 'SEO',
  'faq-rationalisation': 'SEO',
  'howto-video-poc': 'SEO',
  'amelioration-seo': 'SEO',
  'price-signals': 'SEO',
  'qa-monitoring-ctr': 'Analytics',
  'ci-anti-404': 'CI/CD',
  'wording-offre-refonte': 'Wording',
  'fix-hardcoded-nice-links': '404',
  'clean-redirections': 'SEO',
  'setup-tracking': 'Analytics',
  'setup-scripts-automation': 'Scripts',
  'blog-structure-optimale': 'Blog',
  'bug-faq-global': 'SEO',
};

// Fonction pour extraire le pourcentage depuis un fichier
function extractPercentage(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Chercher patterns comme "100%", "Progression : 30%", "80% fait"
  const patterns = [
    /(\d+)%\s*(?:complété|fait|terminé|COMPLÉTÉ)/i,
    /Progression[:\s]+(\d+)%/i,
    /STATUS[:\s]+.*?(\d+)%/i,
    /(\d+)%\s*(?:fait|done|complété)/i,
    /STATUS FINAL[:\s]+.*?(\d+)%/i,
  ];
  
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      const pct = parseInt(match[1]);
      if (pct >= 0 && pct <= 100) return pct;
    }
  }
  
  // Chercher statuts spécifiques
  if (/TERMINÉ|COMPLET|FINALISÉ|FINI|DONE|✅.*100/i.test(content)) return 100;
  if (/PENDING|À FAIRE|TODO|📋/i.test(content)) return 0;
  if (/EN COURS|IN PROGRESS|🔄/i.test(content)) {
    // Chercher pourcentage dans EN COURS
    const progressMatch = content.match(/(\d+)%[^\n]*fait/i);
    if (progressMatch) return parseInt(progressMatch[1]);
    return 50; // Default pour EN COURS
  }
  
  return 0;
}

// Fonction pour déterminer le sujet global
function getSubject(restOfName) {
  const lowerName = restOfName.toLowerCase();
  for (const [key, subject] of Object.entries(subjectMapping)) {
    if (lowerName.includes(key)) {
      return subject;
    }
  }
  return 'SEO'; // Default
}

// Fonction pour nettoyer le nom de détail
function cleanDetailName(fullName, taskId, subject) {
  // Extraire la partie après TASK-XXX- 
  // Format attendu: TASK-046-xxx ou TASK-LEADGEN-01-xxx
  // On utilise le taskId qu'on a déjà extrait pour trouver où commence le détail
  const taskIdRegex = new RegExp(`TASK-${taskId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-(.+)`, 'i');
  const match = fullName.match(taskIdRegex);
  if (!match) return 'task';
  
  let cleaned = match[1];
  
  // Mapping sujets → mots à enlever du nom
  const subjectRemovals = {
    'SERP': ['serp'],
    'Metadata': ['metadata'],
    '404': [], // Garder tout pour 404
    'Analytics': ['monitoring', 'tracking', 'analytics'],
    'CI/CD': ['ci', 'anti-404'],
    'Wording': [],
    'Blog': [],
    'Scripts': ['scripts', 'automation'],
    'SEO': ['seo'],
  };
  
  const wordsToRemove = subjectRemovals[subject] || [];
  
  // Enlever les mots du sujet (exact match uniquement pour éviter de casser)
  if (wordsToRemove.length > 0) {
    const parts = cleaned.split('-');
    const filtered = parts.filter(part => {
      const lowerPart = part.toLowerCase();
      return !wordsToRemove.some(removal => lowerPart === removal);
    });
    // Garder au moins une partie
    if (filtered.length > 0) {
      cleaned = filtered.join('-');
    }
  }
  
  // Enlever suffixes génériques (seulement si on garde assez de parties)
  const genericSuffixes = ['complete', 'consistency'];
  const parts = cleaned.split('-');
  if (parts.length > 2 && genericSuffixes.includes(parts[parts.length - 1].toLowerCase())) {
    parts.pop();
    cleaned = parts.join('-');
  }
  
  // Nettoyer début/fin
  cleaned = cleaned.replace(/^-|-$/g, '');
  
  return cleaned || 'task';
}

// Fonction principale
function renameTaskDirectories() {
  const dirs = fs.readdirSync(tasksDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => name.startsWith('[') && name.includes('TASK'));
  
  const renames = [];
  
  for (const oldName of dirs) {
    // Extraire priorité
    const priorityMatch = oldName.match(/\[P(\d+)\]/);
    if (!priorityMatch) continue;
    const priority = priorityMatch[1];
    
    // Extraire ID tâche
    let taskId = 'XXX';
    const taskMatch = oldName.match(/TASK-([A-Z0-9-]+)/i);
    if (taskMatch) {
      const fullId = taskMatch[1];
      // Garder format complet pour LEADGEN et 404
      if (fullId.startsWith('LEADGEN')) {
        taskId = fullId; // LEADGEN-01
      } else if (fullId.startsWith('404')) {
        taskId = fullId; // 404-07
      } else if (fullId.startsWith('ANALYTICS')) {
        taskId = fullId; // ANALYTICS-01
      } else {
        taskId = fullId.split('-')[0]; // 046, 006, etc.
      }
    }
    
    // Déterminer sujet global
    const subject = getSubject(oldName.toLowerCase());
    
    // Nettoyer nom de détail
    const detailName = cleanDetailName(oldName, taskId, subject);
    
    // Extraire pourcentage
    const progressPath = path.join(tasksDir, oldName, 'progress.md');
    const readmePath = path.join(tasksDir, oldName, 'README.md');
    const percentage = Math.max(
      extractPercentage(progressPath),
      extractPercentage(readmePath)
    );
    
    // Construire nouveau nom (remplacer "/" par "-" pour compatibilité fichiers)
    const safeSubject = subject.replace(/\//g, '-');
    const newName = `P${priority}-${taskId}-${safeSubject}-${detailName}-${percentage}%`;
    
    renames.push({
      oldName,
      newName,
      priority,
      taskId,
      subject,
      detailName,
      percentage,
    });
  }
  
  // Trier par priorité puis ID
  renames.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.taskId.localeCompare(b.taskId);
  });
  
  // Afficher plan
  console.log('📋 PLAN DE RENOMMAGE :\n');
  for (const { oldName, newName, percentage } of renames) {
    console.log(`${oldName}`);
    console.log(`  → ${newName} (${percentage}%)\n`);
  }
  
  // Demander confirmation
  console.log(`\n⚠️  ${renames.length} dossiers à renommer`);
  
  // Pour automation, on peut skip la confirmation en passant --yes
  const args = process.argv.slice(2);
  const autoConfirm = args.includes('--yes') || args.includes('-y');
  
  if (!autoConfirm) {
    console.log('\n⚠️  Ajoutez --yes pour exécuter le renommage automatiquement.');
    console.log('   Exemple: node rename-tasks-dirs.mjs --yes\n');
    return;
  }
  
  // Renommer
  console.log('\n🔄 Renommage en cours...\n');
  let success = 0;
  let errors = 0;
  
  for (const { oldName, newName } of renames) {
    const oldPath = path.join(tasksDir, oldName);
    const newPath = path.join(tasksDir, newName);
    
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

// Exécuter
renameTaskDirectories();

