import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { env } from '@/lib/env';

// Villes supportées et aide pour déduire la ville courante
const SUPPORTED_CITIES = [
  'toulouse', 'bordeaux', 'lyon', 'marseille', 'nantes',
  'lille', 'nice', 'rennes', 'rouen', 'strasbourg', 'montpellier',
];

function inferCitySlugFromEnv(): string {
  try {
    const url = new URL(env.SITE_URL);
    const host = url.hostname.toLowerCase();
    // Cas particulier: "toulousain" → "toulouse"
    if (host.includes('toulousain')) return 'toulouse';
    for (const city of SUPPORTED_CITIES) {
      if (host.includes(city)) return city;
    }
  } catch {}
  return 'toulouse';
}

function getCategoryMappingForCity(city: string) {
  const baseMap: Record<string, string> = {
    'demenagement-etudiant': 'etudiant',
    'demenagement-entreprise': 'entreprise',
    'demenagement-piano': 'piano',
    'demenagement-international': 'international',
    'demenagement-longue-distance': 'longue-distance',
    'demenagement-pas-cher': 'pas-cher',
    'demenagement-urgent': 'urgent',
    'devis-demenagement': 'devis',
    'garde-meuble': 'garde-meuble',
    'prix-demenagement': 'prix',
    'prix-demenagement-piano': 'prix-piano',
  };
  // Générer map spécifique à la ville: <base>-<city> → short
  const cityMap: Record<string, string> = {};
  Object.entries(baseMap).forEach(([base, short]) => {
    cityMap[`${base}-${city}`] = short;
  });
  // Fallbacks nommés en clair
  cityMap['Déménagement entreprise'] = 'entreprise';
  cityMap['Déménagement étudiant'] = 'etudiant';
  cityMap['Déménagement piano'] = 'piano';
  cityMap['Déménagement international'] = 'international';
  return cityMap;
}

// Fonction pour extraire la catégorie du chemin du fichier
function extractCategoryFromPath(filePath: string): string {
  const pathParts = filePath.split('/');
  const categoryDir = pathParts[pathParts.length - 2]; // Le dossier parent du fichier .md
  return categoryDir || 'default';
}

export interface BlogPost {
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  h1: string;
  category: string;
  type: 'pilier' | 'satellite';
  keywords: string[];
  word_count: number;
  publish_date: string;
  featured: boolean;
  content: string;
  // URLs optimisées (nouvelles URLs propres)
  cleanSlug: string;
  cleanCategory: string;
}

// Fonction pour nettoyer les slugs (générique par ville)
function cleanSlug(originalSlug: string, category: string, city: string): string {
  let cleanSlug = originalSlug;
  const prefixes = [
    'demenagement-etudiant',
    'demenagement-entreprise',
    'demenagement-piano',
    'demenagement-international',
    'demenagement-longue-distance',
    'demenagement-pas-cher',
    'demenagement-urgent',
    'devis-demenagement',
    'garde-meuble',
    'prix-demenagement',
    'prix-demenagement-piano',
    'prix-garde-meuble',
  ];
  // Supprimer préfixes spécifiques à la ville
  prefixes.forEach(p => {
    const re = new RegExp(`^${p}-${city}-`, 'i');
    cleanSlug = cleanSlug.replace(re, '');
  });
  // Nettoyer occurrences de la ville dans le slug
  cleanSlug = cleanSlug.replace(new RegExp(`-${city}-`, 'gi'), '-');
  cleanSlug = cleanSlug.replace(new RegExp(`-${city}$`, 'i'), '');
  // Simplifications
  cleanSlug = cleanSlug.replace(/-guide-complet$/i, '-guide');
  cleanSlug = cleanSlug.replace(/-reperes-2025$/i, '');
  return cleanSlug;
}

export function getAllBlogPosts(cityOverride?: string): BlogPost[] {
  const blogDirectory = path.join(process.cwd(), 'content/blog');
  const city = (cityOverride || inferCitySlugFromEnv()).toLowerCase();
  const categoryMap = getCategoryMappingForCity(city);
  const categories = fs.readdirSync(blogDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const allPosts: BlogPost[] = [];

  categories.forEach(category => {
    const categoryPath = path.join(blogDirectory, category);
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md') && file !== 'README.md');

    files.forEach(file => {
      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      const originalSlug = data.slug || file.replace('.md', '');
      // Catégorie (dossier) + filtre ville
      const category = data.category || extractCategoryFromPath(filePath);
      const isForCity = category.endsWith(`-${city}`) || originalSlug.includes(`-${city}`);
      if (!isForCity) {
        return; // ignorer posts d'autres villes
      }
      const cleanCategorySlug = cleanSlug(originalSlug, category, city);
      const baseCategory = category.replace(new RegExp(`-${city}$`, 'i'), '');
      const cleanCategory = categoryMap[category as keyof typeof categoryMap] || categoryMap[baseCategory] || baseCategory;

      // Gérer les keywords (peuvent être string ou array)
      let keywordsArray: string[] = [];
      if (data.keywords) {
        if (typeof data.keywords === 'string') {
          keywordsArray = data.keywords.split(',').map(k => k.trim()).filter(k => k.length > 0);
        } else if (Array.isArray(data.keywords)) {
          keywordsArray = data.keywords;
        }
      }

      allPosts.push({
        slug: originalSlug,
        title: data.title,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        h1: data.h1,
        category: category,
        type: data.type,
        keywords: keywordsArray,
        word_count: data.word_count,
        publish_date: data.publish_date || data.date || new Date().toISOString().split('T')[0],
        featured: data.featured || false,
        content,
        // URLs optimisées
        cleanSlug: cleanCategorySlug,
        cleanCategory,
      });
    });
  });

  return allPosts.sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime());
}

// Fonction pour trouver un article par son nouveau slug
export function getBlogPostByCleanSlug(cleanCategory: string, cleanSlug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(post => post.cleanCategory === cleanCategory && post.cleanSlug === cleanSlug) || null;
}

// Fonction legacy pour compatibilité
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => post.category === category);
}

// Nouvelle fonction pour les catégories propres
export function getBlogPostsByCleanCategory(cleanCategory: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => post.cleanCategory === cleanCategory);
}

export function getPilierPosts(): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => post.type === 'pilier');
}

export function getFeaturedPosts(): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => post.featured);
}
