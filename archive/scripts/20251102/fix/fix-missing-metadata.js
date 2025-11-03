#!/usr/bin/env node

/**
 * SCRIPT DE CORRECTION - METADATA MANQUANTES
 * 
 * Ajoute les metadata manquantes sur:
 * 1. Pages /comment-ca-marche (10 villes)
 * 2. Pages /blog (11 villes)
 */

const fs = require('fs');
const path = require('path');

const SITES_DIR = path.join(__dirname, 'sites');
const CITIES = ['bordeaux', 'lille', 'lyon', 'marseille', 'montpellier', 'nantes', 'nice', 'rennes', 'rouen', 'strasbourg', 'toulouse'];

// Mapping ville → capitale
const cityCapitals = {
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

const stats = {
  commentCaMarcheFixed: 0,
  blogFixed: 0,
  errors: [],
};

function addMetadataToCommentCaMarche(filePath, city) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Vérifier si metadata existe déjà
    if (content.includes('export const metadata') || content.includes('export async function generateMetadata')) {
      console.log(`  ⏭️  ${city}/comment-ca-marche: metadata déjà présente`);
      return false;
    }
    
    const cityName = cityCapitals[city] || city;
    
    // Générer la metadata
    const metadataBlock = `import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Comment ça marche ? Déménagement ${cityName} en 3 étapes | Moverz",
  description: "Découvrez notre processus simple pour déménager à ${cityName} : 1) Inventaire IA gratuit en 30 min 2) Recevez 3 devis sous 7j 3) Choisissez votre déménageur. 100% gratuit, sans engagement.",
  alternates: {
    canonical: \`https://www.devis-demenageur-${city}.fr/comment-ca-marche\`,
  },
  openGraph: {
    title: "Comment ça marche ? Déménagement ${cityName} simplifié | Moverz",
    description: "Processus simple et transparent : photos + IA + devis personnalisés. Déménagez sereinement à ${cityName}.",
    url: \`https://www.devis-demenageur-${city}.fr/comment-ca-marche\`,
    type: 'website',
  },
}

`;
    
    // Insérer après les imports existants
    const importEndMatch = content.match(/import[^;]+;\n(?=\n|export)/);
    if (importEndMatch) {
      const insertPos = importEndMatch.index + importEndMatch[0].length;
      content = content.slice(0, insertPos) + '\n' + metadataBlock + content.slice(insertPos);
    } else {
      // Si pas d'imports trouvés, insérer au début
      content = metadataBlock + content;
    }
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ ${city}/comment-ca-marche: metadata ajoutée`);
    stats.commentCaMarcheFixed++;
    return true;
  } catch (error) {
    stats.errors.push(`${filePath}: ${error.message}`);
    console.log(`  ❌ ${city}/comment-ca-marche: ${error.message}`);
    return false;
  }
}

function addMetadataToBlog(filePath, city) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Vérifier si metadata existe déjà avec un title correct
    const hasGoodMetadata = content.match(/export const metadata[^}]+title:\s*["']Blog\s+Déménagement/);
    if (hasGoodMetadata) {
      console.log(`  ⏭️  ${city}/blog: metadata complète déjà présente`);
      return false;
    }
    
    const cityName = cityCapitals[city] || city;
    
    // Si metadata existe mais est incomplète, on la remplace
    const hasMetadata = content.includes('export const metadata');
    
    const metadataBlock = `export const metadata: Metadata = {
  title: "Blog Déménagement ${cityName} - Guides & Conseils Experts | Moverz",
  description: "Guides complets et conseils d'experts pour réussir votre déménagement à ${cityName}. Astuces budget, checklist, comparatifs, conseils pratiques. Articles rédigés par des professionnels.",
  alternates: {
    canonical: \`https://www.devis-demenageur-${city}.fr/blog\`,
  },
  openGraph: {
    title: "Blog Déménagement ${cityName} - Tous nos guides pratiques",
    description: "Conseils d'experts, guides détaillés et astuces pour déménager sereinement à ${cityName}.",
    url: \`https://www.devis-demenageur-${city}.fr/blog\`,
    type: 'website',
  },
}

`;
    
    if (hasMetadata) {
      // Remplacer la metadata existante
      content = content.replace(
        /export const metadata[^}]+}\s*;?\s*/,
        metadataBlock
      );
    } else {
      // Ajouter import Metadata si nécessaire
      if (!content.includes("import type { Metadata }") && !content.includes("import { Metadata }")) {
        const firstImport = content.match(/^import /m);
        if (firstImport) {
          content = content.slice(0, firstImport.index) + 
                   "import type { Metadata } from 'next'\n" + 
                   content.slice(firstImport.index);
        }
      }
      
      // Insérer après les imports
      const importEndMatch = content.match(/import[^;]+;\n(?=\n|export)/);
      if (importEndMatch) {
        const insertPos = importEndMatch.index + importEndMatch[0].length;
        content = content.slice(0, insertPos) + '\n' + metadataBlock + content.slice(insertPos);
      }
    }
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ ${city}/blog: metadata ajoutée/corrigée`);
    stats.blogFixed++;
    return true;
  } catch (error) {
    stats.errors.push(`${filePath}: ${error.message}`);
    console.log(`  ❌ ${city}/blog: ${error.message}`);
    return false;
  }
}

function processCity(city) {
  console.log(`\n🔍 ${city}...`);
  
  const cityDir = path.join(SITES_DIR, city);
  const appDir = path.join(cityDir, 'app');
  
  if (!fs.existsSync(appDir)) {
    console.log(`  ⚠️  app/ introuvable`);
    return;
  }
  
  // 1. Comment ça marche
  const commentCaMarchePath = path.join(appDir, 'comment-ca-marche', 'page.tsx');
  if (fs.existsSync(commentCaMarchePath)) {
    addMetadataToCommentCaMarche(commentCaMarchePath, city);
  } else {
    console.log(`  ⏭️  comment-ca-marche: fichier introuvable`);
  }
  
  // 2. Blog
  const blogPath = path.join(appDir, 'blog', 'page.tsx');
  if (fs.existsSync(blogPath)) {
    addMetadataToBlog(blogPath, city);
  } else {
    console.log(`  ⏭️  blog: fichier introuvable`);
  }
}

function main() {
  console.log('🚀 Ajout des metadata manquantes - Pages principales\n');
  console.log('─'.repeat(80));
  
  for (const city of CITIES) {
    processCity(city);
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('📊 RÉSUMÉ');
  console.log('─'.repeat(80));
  console.log(`✅ Pages /comment-ca-marche corrigées: ${stats.commentCaMarcheFixed}`);
  console.log(`✅ Pages /blog corrigées: ${stats.blogFixed}`);
  console.log(`✅ Total: ${stats.commentCaMarcheFixed + stats.blogFixed} fichiers`);
  
  if (stats.errors.length > 0) {
    console.log(`\n⚠️  Erreurs (${stats.errors.length}):`);
    stats.errors.forEach(err => console.log(`  • ${err}`));
  }
  
  console.log('\n💡 PROCHAINES ÉTAPES:');
  console.log('  1. Relancer l\'audit: node audit-seo-global.js');
  console.log('  2. Vérifier les pages quartiers (templates)');
  console.log('  3. Commit: git add -A && git commit -m "fix(seo): add missing metadata to main pages"');
  console.log('='.repeat(80) + '\n');
}

main();

