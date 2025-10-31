#!/usr/bin/env node

/**
 * Script pour corriger TOUS les liens internes Nice au bon format
 * 
 * Format attendu: /blog/{category}/{slug}
 * - category: SANS suffix -nice (ex: aide-demenagement, demenageur, etc.)
 * - slug: nom du fichier sans .md
 * - PAS de /satellites/ dans l'URL
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mapping des catégories (nom du dossier → catégorie URL)
const categoryMapping = {
  'aide-demenagement-nice': 'aide-demenagement',
  'demenagement-entreprise-nice': 'demenagement-entreprise',
  'demenagement-general-nice': 'demenagement-general',
  'demenagement-international-nice': 'demenagement-international',
  'demenagement-pas-cher-nice': 'demenagement-pas-cher',
  'demenagement-piano-nice': 'demenagement-piano',
  'demenageur-nice': 'demenageur',
  'garde-meuble-nice': 'garde-meuble',
  'location-camion-demenagement-nice': 'location-camion',
  'petit-demenagement-nice': 'petit-demenagement',
  'prix-demenagement-nice': 'prix-demenagement',
  'satellites': 'satellites', // Les satellites peuvent être dans n'importe quelle catégorie
};

// Fonction pour déterminer la catégorie d'un slug
function getCategoryForSlug(slug) {
  // Mapping manuel pour les slugs connus
  const knownCategories = {
    // Aide déménagement
    'aide-demenagement-nice-guide': 'aide-demenagement', // GUIDE PILIER
    'aide-financiere-demenagement-nice': 'aide-demenagement',
    'aide-pole-emploi-demenagement-nice': 'aide-demenagement',
    'aide-manutention-demenagement-nice': 'aide-demenagement',
    'demenagement-personnes-agees-nice': 'aide-demenagement',
    
    // Déménageur
    'demenageur-nice-guide': 'demenageur',
    'demenageur-nice-guide-complet': 'demenageur', // GUIDE PILIER
    'prix-demenageur-nice-2025': 'demenageur',
    'choisir-demenageur-nice-criteres': 'demenageur',
    'comparatif-demenageurs-nice': 'demenageur',
    'avis-demenageurs-nice-guide': 'demenageur',
    'demenageur-monte-meuble-nice': 'demenageur',
    'demenageur-dimanche-soir-nice': 'demenageur',
    'demenageur-vieux-nice-acces-difficile': 'demenageur',
    'assurance-demenageur-nice': 'demenageur',
    
    // Prix
    'prix-demenagement-nice-guide': 'prix-demenagement', // GUIDE PILIER
    'prix-demenagement-t2-nice': 'prix-demenagement',
    'prix-demenagement-t3-nice': 'prix-demenagement',
    'calculer-prix-demenagement-nice': 'prix-demenagement',
    'facteurs-prix-demenagement-nice': 'prix-demenagement',
    'cout-reel-demenagement-nice': 'prix-demenagement',
    'demenagement-maison-nice-prix': 'prix-demenagement',
    'demenagement-studio-nice-prix': 'prix-demenagement',
    
    // Garde-meuble
    'garde-meuble-nice-guide-complet': 'garde-meuble', // GUIDE PILIER
    'prix-garde-meuble-nice-2025': 'garde-meuble',
    'garde-meuble-securise-nice': 'garde-meuble',
    'garde-meuble-etudiant-nice-pas-cher': 'garde-meuble',
    'garde-meuble-pendant-demenagement-nice': 'garde-meuble',
    'garde-meuble-vieux-nice-centre': 'garde-meuble',
    'acces-24-7-garde-meuble-nice': 'garde-meuble',
    'duree-minimum-location-box-nice': 'garde-meuble',
    'quelle-taille-box-stockage-nice': 'garde-meuble',
    'preparer-affaires-garde-meuble-nice': 'garde-meuble',
    'self-stockage-vs-garde-meuble-traditionnel-nice': 'garde-meuble',
    
    // Location camion
    'location-camion-demenagement-nice-guide': 'location-camion', // GUIDE PILIER
    'location-camion-weekend-nice': 'location-camion',
    'location-utilitaire-demenagement-nice': 'location-camion',
    'taille-camion-selon-logement-nice': 'location-camion',
    'permis-conduire-camion-demenagement': 'location-camion',
    'assurance-location-utilitaire-nice': 'location-camion',
    'caution-location-camion-nice': 'location-camion',
    'km-inclus-location-camion-nice': 'location-camion',
    'conduire-camion-vieux-nice-conseils': 'location-camion',
    
    // Petit déménagement
    'petit-demenagement-nice-guide': 'petit-demenagement', // GUIDE PILIER
    'petit-demenagement-nice-solutions': 'petit-demenagement',
    'demenagement-une-piece-nice': 'petit-demenagement',
    'demenagement-chambre-etudiant-nice': 'petit-demenagement',
    'demenagement-colocation-nice': 'petit-demenagement',
    
    // Pas cher
    'demenagement-pas-cher-nice-guide': 'demenagement-pas-cher', // GUIDE PILIER
    'demenagement-petit-budget-nice': 'demenagement-pas-cher',
    'astuces-demenagement-pas-cher-nice': 'demenagement-pas-cher',
    'demenagement-formule-economique-nice': 'demenagement-pas-cher',
    'periode-pas-chere-demenagement-nice': 'demenagement-pas-cher',
    'demenagement-groupe-nice': 'demenagement-pas-cher',
    'formule-economique-vs-cle-en-main-nice': 'demenagement-pas-cher',
    'demenagement-etudiant-pas-cher-nice': 'demenagement-pas-cher',
    
    // Piano
    'demenagement-piano-nice-guide': 'demenagement-piano', // GUIDE PILIER
    'demenagement-piano-nice-prix': 'demenagement-piano',
    'demenagement-piano-droit-nice': 'demenagement-piano',
    'demenagement-piano-queue-nice': 'demenagement-piano',
    'demenagement-piano-monte-meuble-nice': 'demenagement-piano',
    
    // International
    'demenagement-international-nice-guide': 'demenagement-international', // GUIDE PILIER
    'demenagement-international-nice-italie': 'demenagement-international',
    'demenagement-international-nice-suisse': 'demenagement-international',
    'demenagement-formalites-douane-nice': 'demenagement-international',
    'delai-demenagement-international-nice': 'demenagement-international',
    'demenagement-longue-distance-depuis-nice': 'demenagement-international',
    
    // Entreprise
    'demenagement-entreprise-nice-guide': 'demenagement-entreprise', // GUIDE PILIER
    'demenagement-bureaux-entreprise-nice': 'demenagement-entreprise',
    'demenagement-locaux-commerciaux-nice': 'demenagement-entreprise',
    'demenagement-archives-entreprise-nice': 'demenagement-entreprise',
    'demenagement-cabinet-medical-nice': 'demenagement-entreprise',
    'demenagement-sophia-antipolis-nice': 'demenagement-entreprise',
    'demenagement-entreprise-weekend-nice': 'demenagement-entreprise',
    'demenagement-sans-interruption-activite-nice': 'demenagement-entreprise',
    
    // Général / Autres
    'demenager-seul-nice-guide': 'demenagement-general',
    'checklist-demenagement-complete-nice': 'demenagement-general',
    'demenagement-express-rapide-nice': 'demenagement-general',
    'demenagement-weekend-vs-semaine-nice': 'demenagement-general',
    'autorisation-stationnement-demenagement-nice': 'demenagement-general',
    'demenagement-ecologique-nice': 'demenagement-general',
    'devis-demenagement-nice-gratuit': 'demenagement-general',
    'comparateur-devis-demenagement-nice': 'demenagement-general',
    'cartons-gratuits-nice-ou-trouver': 'demenagement-general',
  };
  
  return knownCategories[slug] || 'demenagement-general';
}

function getAllMarkdownFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      getAllMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function fixLinksInFile(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  let modified = false;
  
  // Regex pour matcher les liens Markdown
  // Formats à corriger:
  // 1. /blog/{category-nice}/{slug}
  // 2. /blog/{category-nice}/satellites/{slug}
  // 3. /blog/{category}/{slug} où category a un suffix -nice
  
  const linkRegex = /\[([^\]]+)\]\(\/blog\/([^)]+)\)/g;
  
  content = content.replace(linkRegex, (match, text, path) => {
    // Extraire le slug (dernière partie du path)
    const parts = path.split('/');
    const slug = parts[parts.length - 1];
    
    // Déterminer la bonne catégorie pour ce slug
    const correctCategory = getCategoryForSlug(slug);
    
    // Nouveau lien corrigé
    const fixedLink = `[${text}](/blog/${correctCategory}/${slug})`;
    
    // Log si modification
    if (match !== fixedLink) {
      modified = true;
    }
    
    return fixedLink;
  });
  
  if (modified) {
    writeFileSync(filePath, content, 'utf-8');
    return true;
  }
  
  return false;
}

function main() {
  const blogDir = join(__dirname, '../sites/nice/content/blog');
  const files = getAllMarkdownFiles(blogDir);
  
  console.log(`\n🔧 CORRECTION DES LIENS INTERNES NICE\n${'='.repeat(60)}\n`);
  console.log(`📁 Dossier: ${blogDir}`);
  console.log(`📄 ${files.length} fichiers à traiter\n`);
  
  let modifiedCount = 0;
  
  files.forEach(file => {
    const relativePath = file.replace(blogDir + '/', '');
    const wasModified = fixLinksInFile(file);
    
    if (wasModified) {
      modifiedCount++;
      console.log(`✅ ${relativePath}`);
    }
  });
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`\n📊 RÉSUMÉ:`);
  console.log(`   • ${files.length} fichiers analysés`);
  console.log(`   • ${modifiedCount} fichiers modifiés`);
  console.log(`\n✅ Correction terminée!\n`);
}

main();

