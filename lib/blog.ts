import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { env } from './env';

// Cities supported and resolver
const CITY_SLUGS = [
  'toulouse', 'bordeaux', 'lyon', 'marseille', 'nantes',
  'lille', 'nice', 'rennes', 'rouen', 'strasbourg', 'montpellier',
];

function resolveTenantSlug(): string {
  const fromEnv = (process.env.SITE_SLUG || '').toLowerCase();
  if (CITY_SLUGS.includes(fromEnv)) return fromEnv;
  try {
    const url = new URL(env.SITE_URL);
    const host = url.hostname.toLowerCase();
    if (host.includes('toulousain')) return 'toulouse';
    const found = CITY_SLUGS.find(slug => host.includes(slug));
    if (found) return found;
  } catch {}
  return 'toulouse';
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

// Slug normalization (keep as provided)
function normalizeSlug(originalSlug: string): string {
  return originalSlug;
}

export function getAllBlogPosts(): BlogPost[] {
  const tenant = resolveTenantSlug();
  const blogDirectory = path.join(process.cwd(), 'content', tenant, 'blog');
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  const categories = fs.readdirSync(blogDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const allPosts: BlogPost[] = [];

  categories.forEach((categoryName) => {
    const categoryPath = path.join(blogDirectory, categoryName);
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md') && file !== 'README.md');

    files.forEach(file => {
      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      const originalSlug = data.slug || file.replace('.md', '');
      const category = data.category || categoryName;
      const cleanCategorySlug = normalizeSlug(originalSlug);
      const cleanCategory = category;

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
