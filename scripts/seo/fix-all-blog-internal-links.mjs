#!/usr/bin/env node

/**
 * Script UNIVERSEL pour corriger les liens internes blog sur TOUS les sites
 * 
 * PROBLÈME IDENTIFIÉ :
 * - Commit a5219c1d a changé la génération des URLs (priorité au nom du dossier)
 * - Les liens dans les markdown pointent encore vers les anciennes URLs
 * - Exemple: /blog/demenagement-piano-lyon/... → doit être /blog/piano/...
 * 
 * SOLUTION :
 * - Lit la logique de chaque site depuis lib/blog.ts (CATEGORY_MAPPING + cleanSlug)
 * - Génère le mapping des URLs réelles
 * - Corrige tous les liens dans les markdown
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '../../');

const SITES = [
  'lyon', 'toulouse', 'lille', 'marseille', 'bordeaux', 
  'nice', 'rouen', 'strasbourg', 'rennes', 'nantes', 'montpellier'
];

// Fonction pour extraire CATEGORY_MAPPING depuis lib/blog.ts
function getCategoryMapping(site) {
  const blogTsPath = path.join(rootDir, 'sites', site, 'lib', 'blog.ts');
  
  if (!fs.existsSync(blogTsPath)) {
    console.warn(`⚠️  lib/blog.ts non trouvé pour ${site}`);
    return {};
  }
  
  const content = fs.readFileSync(blogTsPath, 'utf8');
  
  // Extraire CATEGORY_MAPPING avec regex (multiline)
  const mappingMatch = content.match(/const CATEGORY_MAPPING\s*=\s*\{([\s\S]*?)\};/);
  if (!mappingMatch) {
    return {};
  }
  
  const mappingContent = mappingMatch[1];
  const mapping = {};
  
  // Parser les lignes du mapping (gérer les commentaires et lignes vides)
  mappingContent.split('\n').forEach(line => {
    // Ignorer les commentaires et lignes vides
    if (line.trim().startsWith('//') || line.trim() === '') {
      return;
    }
    
    // Pattern pour 'key': 'value' ou "key": "value"
    const match = line.match(/['"]([^'"]+)['"]:\s*['"]([^'"]+)['"]/);
    if (match) {
      mapping[match[1]] = match[2];
    }
  });
  
  // Ajouter mappings spécifiques par site si nécessaire
  if (site === 'lyon') {
    // Ajouter mappings manquants pour Lyon
    mapping['demenagement-piano-lyon'] = 'piano';
    mapping['demenagement-etudiant-lyon'] = 'etudiant';
    mapping['demenagement-entreprise-lyon'] = 'entreprise';
    mapping['demenagement-international-lyon'] = 'international';
    mapping['demenagement-petit-volume-lyon'] = 'petit-volume';
    mapping['demenagement-lyon-pas-cher'] = 'pas-cher';
    mapping['aide-au-demenagement-lyon'] = 'aide';
    mapping['aide-demenagement-lyon'] = 'aide';
    mapping['demenageur-lyon'] = 'demenageur';
    mapping['garde-meuble-lyon'] = 'garde-meuble';
    mapping['location-camion-demenagement-lyon'] = 'location-camion';
  }
  
  return mapping;
}

// Fonction pour extraire cleanSlug depuis lib/blog.ts (simplifiée)
function getCleanSlugFunction(site) {
  // Pour l'instant, on utilise la logique standard
  // TODO: Extraire la vraie logique depuis lib/blog.ts si différente
  return function(originalSlug) {
    let cleaned = originalSlug;
    cleaned = cleaned.replace(/-guide-complet$/, '-guide');
    cleaned = cleaned.replace(/-reperes-2025$/, '');
    return cleaned;
  };
}

// Fonction pour extraire la catégorie du chemin (comme extractCategoryFromPath)
function extractCategoryFromPath(filePath) {
  const pathParts = filePath.split('/');
  const categoryDir = pathParts[pathParts.length - 2];
  return categoryDir || 'default';
}

// Générer le mapping des URLs pour un site
function generateUrlMapping(site) {
  const blogDir = path.join(rootDir, 'sites', site, 'content', 'blog');
  
  if (!fs.existsSync(blogDir)) {
    return new Map();
  }
  
  const categoryMapping = getCategoryMapping(site);
  const cleanSlugFn = getCleanSlugFunction(site);
  const urlMapping = new Map();
  
  const categories = fs.readdirSync(blogDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  categories.forEach(categoryFolder => {
    const categoryPath = path.join(blogDir, categoryFolder);
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md') && file !== 'README.md');
    
    files.forEach(file => {
      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      const originalSlug = data.slug || file.replace('.md', '');
      const cleanCategory = categoryMapping[categoryFolder] || categoryFolder;
      const cleanedSlug = cleanSlugFn(originalSlug);
      
      // URL réelle générée par Next.js
      const realUrl = `/blog/${cleanCategory}/${cleanedSlug}`;
      
      // URLs incorrectes possibles (avec nom de dossier complet)
      const wrongUrls = [
        `/blog/${categoryFolder}/${originalSlug}`,
        `/blog/${categoryFolder}/${cleanedSlug}`,
        `/blog/${categoryFolder}/${originalSlug}/`,
        `/blog/${categoryFolder}/${cleanedSlug}/`,
      ];
      
      wrongUrls.forEach(wrongUrl => {
        urlMapping.set(wrongUrl, realUrl);
      });
    });
  });
  
  return urlMapping;
}

// Générer un index slug → URL réelle pour recherche par slug
function generateSlugIndex(site, urlMapping) {
  const slugIndex = new Map();
  
  // Parcourir toutes les URLs du mapping pour créer un index par slug
  urlMapping.forEach((realUrl, wrongUrl) => {
    // Extraire le slug de l'URL réelle
    const slugMatch = realUrl.match(/\/blog\/[^/]+\/(.+)$/);
    if (slugMatch) {
      const slug = slugMatch[1];
      // Stocker l'URL réelle pour ce slug
      if (!slugIndex.has(slug)) {
        slugIndex.set(slug, realUrl);
      }
    }
  });
  
  return slugIndex;
}

// Corriger les liens dans un fichier
function fixLinksInFile(filePath, urlMapping, categoryMapping, slugIndex, site) {
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = content;
  let changes = 0;
  const corrections = [];
  
  // Pattern pour trouver les liens markdown [/blog/...]
  const linkPattern = /\[([^\]]+)\]\((\/blog\/[^\)]+)\)/g;
  
  const matches = [...content.matchAll(linkPattern)];
  
  matches.forEach(match => {
    const fullMatch = match[0];
    const linkText = match[1];
    let linkUrl = match[2];
    
    // Retirer trailing slash pour comparaison
    const linkUrlNoSlash = linkUrl.replace(/\/$/, '');
    
    // Méthode 1: Vérifier si cette URL existe dans le mapping direct
    if (urlMapping.has(linkUrl) || urlMapping.has(linkUrlNoSlash)) {
      const correctUrl = urlMapping.get(linkUrl) || urlMapping.get(linkUrlNoSlash);
      const newLink = `[${linkText}](${correctUrl})`;
      modified = modified.replace(fullMatch, newLink);
      changes++;
      corrections.push({ old: linkUrl, new: correctUrl });
      return;
    }
    
    // Méthode 2: Extraire catégorie et slug, corriger la catégorie si nécessaire
    const urlMatch = linkUrl.match(/\/blog\/([^/]+)\/(.+)$/);
    if (urlMatch) {
      const [, categoryInLink, slugInLink] = urlMatch;
      const cleanSlug = slugInLink.replace(/\/$/, '');
      
      // Si la catégorie dans le lien est un nom de dossier complet, la mapper
      if (categoryMapping[categoryInLink]) {
        const cleanCategory = categoryMapping[categoryInLink];
        const newUrl = `/blog/${cleanCategory}/${cleanSlug}`;
        
        // Toujours corriger la catégorie si elle est mappée (même si l'article n'existe pas encore)
        // Cela évite les 404 dus à des catégories incorrectes
        if (categoryInLink !== cleanCategory) {
          // Chercher l'article par slug d'abord (si existe)
          if (slugIndex.has(cleanSlug)) {
            const correctUrl = slugIndex.get(cleanSlug);
            const newLink = `[${linkText}](${correctUrl})`;
            modified = modified.replace(fullMatch, newLink);
            changes++;
            corrections.push({ old: linkUrl, new: correctUrl });
            return;
          }
          
          // Sinon, utiliser la nouvelle URL avec la catégorie corrigée
          // (même si l'article n'existe pas, au moins la catégorie est correcte)
          const newLink = `[${linkText}](${newUrl})`;
          modified = modified.replace(fullMatch, newLink);
          changes++;
          corrections.push({ old: linkUrl, new: newUrl });
          return;
        }
      }
      
      // Méthode 3: Chercher par slug uniquement (si la catégorie est incorrecte)
      if (slugIndex.has(cleanSlug)) {
        const correctUrl = slugIndex.get(cleanSlug);
        const newLink = `[${linkText}](${correctUrl})`;
        modified = modified.replace(fullMatch, newLink);
        changes++;
        corrections.push({ old: linkUrl, new: correctUrl });
        return;
      }
    }
  });
  
  return { modified, changes, corrections };
}

// Main
console.log('🔧 Correction des liens internes blog (TOUS LES SITES)\n');

let totalSitesFixed = 0;
let totalFilesFixed = 0;
let totalLinksFixed = 0;

SITES.forEach(site => {
  console.log(`\n📦 ${site.toUpperCase()}`);
  console.log('─'.repeat(50));
  
  const categoryMapping = getCategoryMapping(site);
  const urlMapping = generateUrlMapping(site);
  const slugIndex = generateSlugIndex(site, urlMapping);
  
  console.log(`   📊 ${urlMapping.size} URLs mappées, ${slugIndex.size} slugs indexés`);
  
  if (urlMapping.size === 0) {
    console.log(`   ⚠️  Aucun mapping généré, skip`);
    return;
  }
  
  const blogDir = path.join(rootDir, 'sites', site, 'content', 'blog');
  
  if (!fs.existsSync(blogDir)) {
    console.log(`   ⚠️  Dossier blog introuvable, skip`);
    return;
  }
  
  const categories = fs.readdirSync(blogDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  let siteFilesFixed = 0;
  let siteLinksFixed = 0;
  
  categories.forEach(category => {
    const categoryPath = path.join(blogDir, category);
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md') && file !== 'README.md');
    
    files.forEach(file => {
      const filePath = path.join(categoryPath, file);
      const { modified, changes, corrections } = fixLinksInFile(filePath, urlMapping, categoryMapping, slugIndex, site);
      
      if (changes > 0) {
        fs.writeFileSync(filePath, modified, 'utf8');
        siteFilesFixed++;
        siteLinksFixed += changes;
        
        if (corrections.length > 0) {
          console.log(`   📝 ${file}: ${changes} lien(s) corrigé(s)`);
          corrections.slice(0, 3).forEach(c => {
            console.log(`      ${c.old} → ${c.new}`);
          });
          if (corrections.length > 3) {
            console.log(`      ... et ${corrections.length - 3} autres`);
          }
        }
      }
    });
  });
  
  if (siteFilesFixed > 0) {
    console.log(`   ✅ ${siteFilesFixed} fichiers modifiés, ${siteLinksFixed} liens corrigés`);
    totalSitesFixed++;
    totalFilesFixed += siteFilesFixed;
    totalLinksFixed += siteLinksFixed;
  } else {
    console.log(`   ℹ️  Aucun lien à corriger`);
  }
});

console.log(`\n${'='.repeat(50)}`);
console.log(`✅ RÉSUMÉ GLOBAL:`);
console.log(`   Sites traités: ${totalSitesFixed}/${SITES.length}`);
console.log(`   Fichiers modifiés: ${totalFilesFixed}`);
console.log(`   Liens corrigés: ${totalLinksFixed}`);

