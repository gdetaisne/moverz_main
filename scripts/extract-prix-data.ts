#!/usr/bin/env tsx
/**
 * Extraction données prix depuis articles blog
 * Objectif: Créer mapping ville → prix par type logement pour titles optimisés
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

interface PrixData {
  ville: string;
  article: string;
  slug: string;
  category: string;
  title: string;
  metaTitle?: string;
  prix: {
    studio?: string;
    t1?: string;
    t2?: string;
    t3?: string;
    t4?: string;
    maison?: string;
    general?: string;
  };
  extraitContenu: string[];
}

const CITIES = ['bordeaux', 'lille', 'lyon', 'marseille', 'montpellier', 'nantes', 'nice', 'rennes', 'rouen', 'strasbourg', 'toulouse'];

// Regex pour extraire prix (ex: "450-1000€", "dès 450€", "750€")
const PRIX_REGEX = /(\d{2,4})\s*[-–—à]\s*(\d{2,4})\s*€|dès\s+(\d{2,4})\s*€|(\d{2,4})\s*€/gi;

function extractPrixFromContent(content: string): string[] {
  const matches = [...content.matchAll(PRIX_REGEX)];
  return matches.slice(0, 10).map(m => m[0]); // Max 10 premiers prix trouvés
}

function scanArticles(): PrixData[] {
  const results: PrixData[] = [];

  for (const city of CITIES) {
    const blogDir = join(process.cwd(), 'sites', city, 'content', 'blog');
    
    if (!statSync(blogDir, { throwIfNoEntry: false })) continue;

    // Scanner tous les MD
    const categories = readdirSync(blogDir);
    
    for (const cat of categories) {
      const catPath = join(blogDir, cat);
      if (!statSync(catPath).isDirectory()) continue;

      const files = readdirSync(catPath).filter(f => f.endsWith('.md'));

      for (const file of files) {
        const filePath = join(catPath, file);
        const raw = readFileSync(filePath, 'utf-8');
        const { data, content } = matter(raw);

        // Filtrer articles prix (title, category, ou slug contient "prix")
        const isPrix = 
          data.title?.toLowerCase().includes('prix') ||
          data.slug?.toLowerCase().includes('prix') ||
          data.category?.toLowerCase().includes('prix') ||
          data.meta_title?.toLowerCase().includes('prix') ||
          cat.toLowerCase().includes('prix');

        if (!isPrix) continue;

        // Extraire prix du contenu
        const prixTrouves = extractPrixFromContent(content);

        results.push({
          ville: city,
          article: file,
          slug: data.slug || file.replace('.md', ''),
          category: data.category || cat,
          title: data.title || 'Sans titre',
          metaTitle: data.meta_title,
          prix: {
            general: prixTrouves[0] || 'N/A'
          },
          extraitContenu: prixTrouves
        });
      }
    }
  }

  return results;
}

// Exécution
console.log('🔍 Extraction données prix articles blog...\n');

const articles = scanArticles();

console.log(`✅ ${articles.length} articles prix trouvés\n`);

// Grouper par ville
const parVille = articles.reduce((acc, a) => {
  if (!acc[a.ville]) acc[a.ville] = [];
  acc[a.ville].push(a);
  return acc;
}, {} as Record<string, PrixData[]>);

// Afficher résumé
console.log('📊 Répartition par ville:\n');
for (const [ville, arts] of Object.entries(parVille)) {
  console.log(`${ville}: ${arts.length} articles`);
}

// Sauvegarder JSON
const output = {
  meta: {
    date: new Date().toISOString(),
    totalArticles: articles.length,
    villes: CITIES.length
  },
  articles,
  parVille
};

writeFileSync('extraction-prix-articles.json', JSON.stringify(output, null, 2));
console.log('\n✅ Sauvegardé: extraction-prix-articles.json');

// Afficher échantillon
console.log('\n📄 Échantillon (5 premiers):\n');
articles.slice(0, 5).forEach(a => {
  console.log(`${a.ville.toUpperCase()} - ${a.slug}`);
  console.log(`  Title: ${a.title.substring(0, 60)}...`);
  console.log(`  Prix trouvés: ${a.extraitContenu.slice(0, 3).join(', ')}`);
  console.log('');
});

