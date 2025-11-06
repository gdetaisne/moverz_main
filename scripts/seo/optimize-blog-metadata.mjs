#!/usr/bin/env node

/**
 * SCRIPT PRODUCTION - Optimise Metadata Articles Blog (Titres + Descriptions)
 * 
 * Gère les divergences de structure entre sites :
 * - Format ancien : description (Marseille, Toulouse)
 * - Format nouveau : meta_description (Bordeaux, Montpellier, etc.)
 * - Sites mixtes : détecte format par fichier
 * 
 * Optimise :
 * - meta_title (50-60 car) OU crée si absent
 * - meta_description OU description (150-160 car)
 * 
 * Usage :
 *   node scripts/seo/optimize-blog-metadata.mjs [site] [--dry-run]
 *   node scripts/seo/optimize-blog-metadata.mjs rouen --dry-run
 *   node scripts/seo/optimize-blog-metadata.mjs rouen  # Écrit réellement
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

// ===========================
// 1. CONFIGURATION
// ===========================

// Extraire arguments (ignorer node et chemin script)
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const TARGET_SITE = args.find(arg => !arg.startsWith('--') && !arg.includes('.mjs') && !arg.includes('node'));

const BACKUP_DIR = path.join(ROOT_DIR, '.cursor/tasks/P1-LEADGEN-04-metadata-articles-blog-Metadata-task-pas-commence/backups');

// Mapping villes (slug → nom capitalisé)
const CITY_NAMES = {
  'bordeaux': 'Bordeaux',
  'lille': 'Lille',
  'lyon': 'Lyon',
  'marseille': 'Marseille',
  'montpellier': 'Montpellier',
  'nantes': 'Nantes',
  'nice': 'Nice',
  'rennes': 'Rennes',
  'rouen': 'Rouen',
  'strasbourg': 'Strasbourg',
  'toulouse': 'Toulouse',
};

// Formules metadata par type d'article
// DISTINCTION : Transactionnel (CTA devis) vs Informatif (sans CTA)

const METADATA_FORMULAS = {
  // ===== TRANSACTIONNEL : Prix déménagement local T2/T3/T4/maison (particuliers) =====
  
  'prix-transactionnel': {
    title: (city) => `Prix Déménagement ${city} : Comparez 5 Devis Gratuits | 2025`,
    description: (city) => `Déménagement ${city} : T2 500-800€, T3 800-1200€, T4 1200-1800€. IA analyse vos photos → 5 devis comparables sous 7j. Gratuit. 1200+ clients ⭐4.9/5`,
    transactional: true,
  },
  
  // ===== INFORMATIFS (sans CTA devis) =====
  
  // Prix mais studio/petit/entreprise/international → Informatif
  'prix-informatif': {
    title: (city) => `Prix Déménagement ${city} : Guide Complet & Tarifs | 2025`,
    description: (city) => `Guide complet prix déménagement ${city} : Tarifs détaillés selon volume, distance et accessibilité. Facteurs de coût expliqués. Estimation précise pour votre projet.`,
    transactional: false,
  },
  // Type "Pas Cher"
  'pas-cher': {
    title: (city) => `Déménagement Pas Cher ${city} : Guide & Astuces | 2025`,
    description: (city) => `Guide déménagement pas cher ${city} : Astuces pour économiser, comparer les tarifs, négocier. Conseils pratiques pour réduire les coûts sans sacrifier la qualité.`,
    transactional: false,
  },
  // Type "Garde-Meuble"
  'garde-meuble': {
    title: (city) => `Garde-Meuble ${city} : Guide Complet & Comparatif | 2025`,
    description: (city) => `Guide garde-meuble ${city} : Tarifs, volumes, durées. Comparatif solutions stockage. Conseils choix box adapté. Informations détaillées pour votre projet.`,
    transactional: false,
  },
  // Type "Petit Déménagement"
  'petit': {
    title: (city) => `Petit Déménagement ${city} : Guide Studio/T1 | 2025`,
    description: (city) => `Guide petit déménagement ${city} : Tarifs studio, solutions adaptées petit volume. Conseils organisation, emballage et transport. Comparaison options disponibles.`,
    transactional: false,
  },
  // Type "Urgent"
  'urgent': {
    title: (city) => `Déménagement Urgent ${city} : Guide & Solutions | 2025`,
    description: (city) => `Guide déménagement urgent ${city} : Solutions rapides, délais, tarifs. Conseils organisation express. Comparaison options disponibles pour déménager rapidement.`,
    transactional: false,
  },
  // Type "Entreprise"
  'entreprise': {
    title: (city) => `Déménagement Entreprise ${city} : Guide Professionnel | 2025`,
    description: (city) => `Guide déménagement entreprise ${city} : Solutions B2B, organisation bureaux, gestion équipes. Conseils professionnels pour déménager vos locaux efficacement.`,
    transactional: false,
  },
  // Type "Étudiant"
  'etudiant': {
    title: (city) => `Déménagement Étudiant ${city} : Guide & Conseils | 2025`,
    description: (city) => `Guide déménagement étudiant ${city} : Tarifs étudiants, aides disponibles, solutions économiques. Conseils pratiques pour déménager à petit budget.`,
    transactional: false,
  },
  // Type "Piano"
  'piano': {
    title: (city) => `Déménagement Piano ${city} : Guide Spécialisé | 2025`,
    description: (city) => `Guide déménagement piano ${city} : Techniques spécialisées, précautions, tarifs. Conseils transport instrument fragile. Informations détaillées pour votre piano.`,
    transactional: false,
  },
  // Type "International"
  'international': {
    title: (city) => `Déménagement International ${city} : Guide Complet | 2025`,
    description: (city) => `Guide déménagement international ${city} : Formalités, douanes, transport longue distance. Conseils organisation déménagement Europe/Monde. Informations détaillées.`,
    transactional: false,
  },
  // Type "Devis"
  'devis': {
    title: (city) => `Devis Déménagement ${city} : Guide & Comparatif | 2025`,
    description: (city) => `Guide devis déménagement ${city} : Comment obtenir et comparer des devis. Facteurs de prix expliqués. Conseils pour choisir le meilleur déménageur.`,
    transactional: false,
  },
  // Type "Aide au Déménagement" (Guides)
  'aide': {
    title: (city) => `Aide au Déménagement ${city} : Guide Complet & Astuces | 2025`,
    description: (city) => `Guide complet déménagement ${city} : Checklist, organisation, emballage, transport. Conseils pratiques étape par étape. Évitez les erreurs courantes. Guide expert.`,
    transactional: false,
  },
  // Type "Location Camion"
  'location': {
    title: (city) => `Location Camion Déménagement ${city} : Guide & Comparatif | 2025`,
    description: (city) => `Location camion déménagement ${city} : Comparatif tarifs, volumes, permis requis. Guide choix camion adapté. Conseils location vs déménageur. Comparaison complète.`,
    transactional: false,
  },
  
  // ===== DÉFAUT =====
  // Par défaut : Informatif (pas de CTA devis)
  default: {
    title: (city) => `Déménagement ${city} : Guide Complet & Conseils | 2025`,
    description: (city) => `Guide déménagement ${city} : Conseils pratiques, astuces et bonnes pratiques. Informations détaillées pour bien préparer votre projet. Expert déménagement ${city}.`,
    transactional: false,
  },
};

// ===========================
// 2. FONCTIONS UTILITAIRES
// ===========================

/**
 * Détecte format frontmatter
 */
function detectFormat(frontmatter) {
  const hasMetaDesc = frontmatter.meta_description !== undefined;
  const hasDesc = frontmatter.description !== undefined;
  
  if (hasMetaDesc) {
    return { type: 'nouveau', descField: 'meta_description' };
  } else if (hasDesc) {
    return { type: 'ancien', descField: 'description' };
  } else {
    return { type: 'inconnu', descField: null };
  }
}

/**
 * Détecte type d'article depuis slug/title/category
 * DISTINCTION : Transactionnel vs Informatif
 * 
 * TRANSACTIONNEL : UNIQUEMENT prix déménagement local T2/T3/T4/maison pour particuliers
 * INFORMATIF : TOUT LE RESTE
 */
function detectArticleType(slug, title, category) {
  const text = `${slug} ${title} ${category || ''}`.toLowerCase();
  
  // ===== TRANSACTIONNEL : Prix déménagement local T2/T3/T4/maison (particuliers) =====
  // Seulement si : prix + (T2 OU T3 OU T4 OU maison OU grande taille) + PAS studio/petit + PAS entreprise + PAS international
  if (text.includes('prix') && 
      (text.includes('t2') || text.includes('t3') || text.includes('t4') || 
       text.includes('maison') || text.includes('grand') || text.includes('moyen')) &&
      !text.includes('studio') && !text.includes('petit') && 
      !text.includes('entreprise') && !text.includes('international')) {
    return 'prix-transactionnel';
  }
  
  // ===== TOUT LE RESTE EST INFORMATIF =====
  
  // Prix mais studio/petit → Informatif
  if (text.includes('prix') && (text.includes('studio') || text.includes('petit'))) {
    return 'prix-informatif';
  }
  
  // Prix mais entreprise → Informatif
  if (text.includes('prix') && text.includes('entreprise')) {
    return 'prix-informatif';
  }
  
  // Prix mais international → Informatif
  if (text.includes('prix') && text.includes('international')) {
    return 'prix-informatif';
  }
  
  // Prix générique (sans précision taille) → Informatif par défaut
  if (text.includes('prix') && !text.includes('t2') && !text.includes('t3') && 
      !text.includes('t4') && !text.includes('maison')) {
    return 'prix-informatif';
  }
  
  // Autres types → Tous informatifs
  // IMPORTANT : Vérifier "petit-volume" AVANT "pas-cher" pour éviter confusion
  if (text.includes('petit-volume') || text.includes('petit déménagement')) return 'petit';
  if (text.includes('pas-cher') || text.includes('pas cher') || text.includes('économique')) return 'pas-cher';
  if (text.includes('garde-meuble') || text.includes('garde meuble') || text.includes('box')) return 'garde-meuble';
  if (text.includes('petit')) return 'petit';
  if (text.includes('urgent')) return 'urgent';
  if (text.includes('entreprise')) return 'entreprise';
  if (text.includes('etudiant') || text.includes('étudiant')) return 'etudiant';
  if (text.includes('piano')) return 'piano';
  if (text.includes('international')) return 'international';
  if (text.includes('aide') || text.includes('aide-au-demenagement')) return 'aide';
  if (text.includes('location') || text.includes('location-camion')) return 'location';
  if (text.includes('devis')) return 'devis';
  
  // Par défaut : Informatif
  return 'default';
}

/**
 * Extrait ville depuis chemin fichier
 */
function extractCityFromPath(filePath) {
  const parts = filePath.split(path.sep);
  const sitesIndex = parts.indexOf('sites');
  if (sitesIndex >= 0 && parts[sitesIndex + 1]) {
    const siteSlug = parts[sitesIndex + 1];
    return CITY_NAMES[siteSlug] || siteSlug.charAt(0).toUpperCase() + siteSlug.slice(1);
  }
  return 'Ville';
}

/**
 * Génère meta_title optimisé
 */
function generateMetaTitle(frontmatter, articleType, city) {
  const formula = METADATA_FORMULAS[articleType] || METADATA_FORMULAS.default;
  return formula.title(city);
}

/**
 * Génère meta_description optimisée
 * DISTINCTION : Transactionnel (avec CTA devis) vs Informatif (sans CTA)
 */
function generateMetaDescription(frontmatter, articleType, city) {
  const formula = METADATA_FORMULAS[articleType] || METADATA_FORMULAS.default;
  return formula.description(city);
}

/**
 * Crée backup d'un fichier
 */
function backupFile(filePath) {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
  
  const relativePath = path.relative(ROOT_DIR, filePath);
  const backupPath = path.join(BACKUP_DIR, relativePath.replace(/\//g, '_'));
  
  // Créer dossiers parents si nécessaire
  const backupDir = path.dirname(backupPath);
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  fs.copyFileSync(filePath, backupPath);
  return backupPath;
}

/**
 * Valide longueurs metadata
 */
function validateMetadata(metaTitle, metaDesc) {
  const errors = [];
  
  if (metaTitle) {
    if (metaTitle.length < 45) errors.push(`meta_title trop court (${metaTitle.length} car, min 45)`);
    if (metaTitle.length > 65) errors.push(`meta_title trop long (${metaTitle.length} car, max 65)`);
  }
  
  if (metaDesc) {
    if (metaDesc.length < 150) errors.push(`meta_description trop courte (${metaDesc.length} car, min 150)`);
    if (metaDesc.length > 165) errors.push(`meta_description trop longue (${metaDesc.length} car, max 165)`);
  }
  
  return errors;
}

/**
 * Parse et optimise un fichier
 */
function processFile(filePath) {
  const relativePath = path.relative(ROOT_DIR, filePath);
  const city = extractCityFromPath(filePath);
  
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📄 ${relativePath}`);
  console.log(`${'='.repeat(80)}`);
  
  // 1. Vérifier existence
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Fichier introuvable`);
    return { success: false, reason: 'File not found' };
  }
  
  // 2. Lire contenu
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // 3. Parser frontmatter
  let parsed;
  try {
    parsed = matter(fileContent);
  } catch (error) {
    console.log(`❌ Erreur parsing YAML : ${error.message}`);
    return { success: false, reason: 'Parse error', error: error.message };
  }
  
  const frontmatter = parsed.data;
  const originalKeys = Object.keys(frontmatter);
  
  // 4. Détecter format
  const format = detectFormat(frontmatter);
  console.log(`📋 Format : ${format.type} (${format.descField || 'aucun'})`);
  
  if (format.type === 'inconnu') {
    console.log(`⚠️  Aucun champ description trouvé → SKIP`);
    return { success: false, reason: 'No description field', skipped: true };
  }
  
  // 5. Générer nouvelles metadata
  const articleType = detectArticleType(
    frontmatter.slug || '', 
    frontmatter.title || '', 
    frontmatter.category || ''
  );
  const formula = METADATA_FORMULAS[articleType] || METADATA_FORMULAS.default;
  const isTransactional = formula.transactional !== false; // Par défaut transactionnel
  
  console.log(`🎯 Type article détecté : ${articleType} (${isTransactional ? 'TRANSACTIONNEL' : 'INFORMATIF'})`);
  
  const newMetaTitle = generateMetaTitle(frontmatter, articleType, city);
  const newMetaDesc = generateMetaDescription(frontmatter, articleType, city);
  
  // 6. Valider longueurs
  const validationErrors = validateMetadata(newMetaTitle, newMetaDesc);
  if (validationErrors.length > 0) {
    console.log(`⚠️  Erreurs validation :`);
    validationErrors.forEach(err => console.log(`   - ${err}`));
  }
  
  // 7. Afficher changements
  const currentDesc = frontmatter[format.descField] || '';
  const currentTitle = frontmatter.meta_title || '(absent)';
  
  console.log(`\n📝 Titre actuel (${currentTitle.length} car) :`);
  console.log(`   "${currentTitle}"`);
  console.log(`\n✨ Nouveau titre (${newMetaTitle.length} car) :`);
  console.log(`   "${newMetaTitle}"`);
  
  console.log(`\n📝 Description actuelle (${currentDesc.length} car) :`);
  console.log(`   "${currentDesc.substring(0, 80)}..."`);
  console.log(`\n✨ Nouvelle description (${newMetaDesc.length} car) :`);
  console.log(`   "${newMetaDesc.substring(0, 80)}..."`);
  
  // 8. Modifier frontmatter
  const modified = { ...frontmatter };
  
  // Toujours créer/optimiser meta_title
  modified.meta_title = newMetaTitle;
  
  // Modifier description selon format
  if (format.type === 'nouveau') {
    modified.meta_description = newMetaDesc;
  } else {
    modified.description = newMetaDesc;
    // Si format ancien, créer aussi meta_description pour migration future
    if (!modified.meta_description) {
      modified.meta_description = newMetaDesc;
    }
  }
  
  // 9. Vérifier qu'aucun champ n'a été perdu
  const newKeys = Object.keys(modified);
  const missingKeys = originalKeys.filter(k => !newKeys.includes(k));
  
  if (missingKeys.length > 0) {
    console.log(`❌ ERREUR : Champs perdus : ${missingKeys.join(', ')}`);
    return { success: false, reason: 'Fields lost', missingKeys };
  }
  
  console.log(`✅ ${newKeys.length} champs préservés`);
  
  // 10. Stringify (reconstruire fichier)
  let newFileContent;
  try {
    newFileContent = matter.stringify(parsed.content, modified);
  } catch (error) {
    console.log(`❌ Erreur stringify : ${error.message}`);
    return { success: false, reason: 'Stringify error', error: error.message };
  }
  
  // 11. DRY RUN ou écriture réelle
  if (DRY_RUN) {
    console.log(`\n🔒 DRY RUN : Fichier NON modifié`);
  } else {
    // Backup
    const backupPath = backupFile(filePath);
    console.log(`💾 Backup : ${path.relative(ROOT_DIR, backupPath)}`);
    
    // Écrire
    fs.writeFileSync(filePath, newFileContent, 'utf-8');
    console.log(`✅ Fichier modifié`);
  }
  
  return {
    success: true,
    format: format.type,
    descField: format.descField,
    articleType,
    city,
    metaTitleLength: newMetaTitle.length,
    metaDescLength: newMetaDesc.length,
    fieldsCount: newKeys.length,
  };
}

/**
 * Trouve tous les fichiers .md d'un site
 */
function findBlogFiles(siteSlug) {
  const blogDir = path.join(ROOT_DIR, 'sites', siteSlug, 'content', 'blog');
  
  if (!fs.existsSync(blogDir)) {
    console.log(`❌ Dossier blog introuvable : ${blogDir}`);
    console.log(`   Vérification : ROOT_DIR = ${ROOT_DIR}`);
    return [];
  }
  
  const files = [];
  
  function walkDir(dir) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          walkDir(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'README.md') {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.log(`⚠️  Erreur lecture ${dir} : ${error.message}`);
    }
  }
  
  walkDir(blogDir);
  
  return files;
}

// ===========================
// 3. MAIN
// ===========================

console.log(`
╔════════════════════════════════════════════════════════════════════╗
║  OPTIMISATION METADATA BLOG - LEADGEN-04                          ║
║  Mode : ${DRY_RUN ? 'DRY RUN (aucune modification)' : 'WRITE (modifie fichiers)'}                    ║
╚════════════════════════════════════════════════════════════════════╝
`);

if (!TARGET_SITE) {
  console.log(`❌ Usage : node scripts/seo/optimize-blog-metadata.mjs [site] [--dry-run]`);
  console.log(`   Exemples :`);
  console.log(`     node scripts/seo/optimize-blog-metadata.mjs rouen --dry-run`);
  console.log(`     node scripts/seo/optimize-blog-metadata.mjs rouen`);
  process.exit(1);
}

const blogFiles = findBlogFiles(TARGET_SITE);

if (blogFiles.length === 0) {
  console.log(`❌ Aucun fichier blog trouvé pour ${TARGET_SITE}`);
  process.exit(1);
}

console.log(`\n📁 ${blogFiles.length} fichiers trouvés pour ${TARGET_SITE}\n`);

const results = [];
let processed = 0;

for (const filePath of blogFiles) {
  processed++;
  console.log(`\n[${processed}/${blogFiles.length}]`);
  const result = processFile(filePath);
  results.push({ filePath, ...result });
}

// ===========================
// 4. RAPPORT FINAL
// ===========================

console.log(`\n\n${'='.repeat(80)}`);
console.log(`📊 RAPPORT FINAL`);
console.log(`${'='.repeat(80)}\n`);

const successes = results.filter(r => r.success);
const failures = results.filter(r => !r.success);
const skipped = failures.filter(r => r.skipped);

console.log(`✅ Succès : ${successes.length}/${results.length}`);
console.log(`⚠️  Skippés : ${skipped.length}/${results.length}`);
console.log(`❌ Échecs : ${failures.length - skipped.length}/${results.length}\n`);

if (successes.length > 0) {
  console.log(`📊 Statistiques succès :`);
  const byFormat = {};
  const byType = {};
  
  successes.forEach(r => {
    byFormat[r.format] = (byFormat[r.format] || 0) + 1;
    byType[r.articleType] = (byType[r.articleType] || 0) + 1;
  });
  
  console.log(`\n   Par format :`);
  Object.entries(byFormat).forEach(([format, count]) => {
    console.log(`     ${format} : ${count}`);
  });
  
  console.log(`\n   Par type article :`);
  Object.entries(byType).forEach(([type, count]) => {
    console.log(`     ${type} : ${count}`);
  });
}

if (skipped.length > 0) {
  console.log(`\n⚠️  Fichiers skippés (sans metadata) :`);
  skipped.forEach(r => {
    console.log(`   • ${path.basename(r.filePath)}`);
  });
}

if (failures.length - skipped.length > 0) {
  console.log(`\n❌ Fichiers en échec :`);
  failures.filter(r => !r.skipped).forEach(r => {
    console.log(`   • ${path.basename(r.filePath)} : ${r.reason}`);
  });
}

console.log(`\n${'='.repeat(80)}`);

if (DRY_RUN) {
  console.log(`\n🔒 Mode DRY RUN : Aucun fichier modifié`);
  console.log(`Pour écrire réellement, relancez sans --dry-run\n`);
} else {
  console.log(`\n✅ Fichiers modifiés et backupés dans ${BACKUP_DIR}\n`);
}

// Exit code
process.exit(failures.length - skipped.length > 0 ? 1 : 0);

