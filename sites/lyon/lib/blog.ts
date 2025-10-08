import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Mapping des catégories pour URLs courtes
const CATEGORY_MAPPING = {
  'demenagement-etudiant-lyon': 'etudiant',
  'demenagement-entreprise-lyon': 'entreprise', 
  'demenagement-piano-lyon': 'piano',
  'demenagement-international-lyon': 'international',
  'demenagement-longue-distance-lyon': 'longue-distance',
  'demenagement-pas-cher-lyon': 'pas-cher',
  'demenagement-urgent-lyon': 'urgent',
  'devis-demenagement-lyon': 'devis',
  'garde-meuble-lyon': 'garde-meuble',
  'prix-demenagement-lyon': 'prix',
  'prix-demenagement-piano-lyon': 'prix-piano',
  // Gestion des catégories avec espaces (fallback)
  'Déménagement entreprise': 'entreprise',
  'Déménagement étudiant': 'etudiant',
  'Déménagement piano': 'piano',
  'Déménagement international': 'international'
};

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

// Fonction pour nettoyer les slugs
function cleanSlug(originalSlug: string, category: string): string {
  // Retirer le préfixe de catégorie redondant
  let cleanSlug = originalSlug;
  
  // Patterns de nettoyage spécifiques (ordre important!)
  const cleanPatterns = [
    // D'abord, retirer les préfixes de catégorie complets
    { from: /^demenagement-etudiant-lyon-/, to: '' },
    { from: /^demenagement-entreprise-lyon-/, to: '' },
    { from: /^demenagement-piano-lyon-/, to: '' },
    { from: /^demenagement-international-lyon-/, to: '' },
    { from: /^demenagement-longue-distance-lyon-/, to: '' },
    { from: /^demenagement-pas-cher-lyon-/, to: '' },
    { from: /^demenagement-urgent-lyon-/, to: '' },
    { from: /^devis-demenagement-lyon-/, to: '' },
    { from: /^garde-meuble-lyon-/, to: '' },
    { from: /^prix-demenagement-lyon-/, to: '' },
    { from: /^prix-demenagement-piano-lyon-/, to: '' },
    { from: /^prix-garde-meuble-lyon-/, to: '' },
    // Ensuite, retirer les patterns partiels en début
    { from: /^stockage-etudiant-lyon/, to: 'stockage-etudiant' },
    { from: /^cartons-gratuits-lyon/, to: 'cartons-gratuits' },
    { from: /^camion-demenagement-etudiant-lyon/, to: 'camion-demenagement-etudiant' },
    { from: /^assurance-demenagement-international-lyon/, to: 'assurance-demenagement-international' },
    { from: /^prix-demenagement-international-lyon/, to: 'prix-demenagement-international' },
    { from: /^emballage-demenagement-international-lyon/, to: 'emballage-demenagement-international' },
    { from: /^formalites-douanieres-demenagement-international-lyon/, to: 'formalites-douanieres-demenagement-international' },
    // Retirer "-lyon" en milieu de slug
    { from: /-lyon-/, to: '-' },
    // Retirer "-lyon" en fin
    { from: /-lyon$/, to: '' },
    // Retirer les doublons et simplifications
    { from: /-guide-complet$/, to: '-guide' },
    { from: /-reperes-2025$/, to: '-2025' }
  ];

  cleanPatterns.forEach(pattern => {
    cleanSlug = cleanSlug.replace(pattern.from, pattern.to);
  });

  return cleanSlug;
}

export function getAllBlogPosts(): BlogPost[] {
  const blogDirectory = path.join(process.cwd(), 'content/blog');
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
      
      // Utiliser la catégorie du frontmatter ou extraire du chemin
      const category = data.category || extractCategoryFromPath(filePath);
      const cleanCategorySlug = cleanSlug(originalSlug, category);
      const cleanCategory = CATEGORY_MAPPING[category as keyof typeof CATEGORY_MAPPING] || category;

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
