import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Copie du mapping de blog.ts
const CATEGORY_MAPPING = {
  'déménagement-economique': 'pas-cher',
  'demenagement-economique': 'pas-cher',
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
  'piliers': 'general',
  'satellites': 'conseils',
  // Gestion des catégories avec espaces (fallback)
  'Déménagement entreprise': 'entreprise',
  'Déménagement étudiant': 'etudiant',
  'Déménagement piano': 'piano',
  'Déménagement international': 'international',
  'Déménagement économique': 'pas-cher'
};

const piليersDir = 'sites/toulouse/content/blog/piliers';

console.log('🔍 Test des URLs générées pour les piliers Toulouse\n');
console.log('='.repeat(80) + '\n');

const files = fs.readdirSync(piليersDir).filter(f => f.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(piليersDir, file);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  
  const slug = data.slug || file.replace('.md', '');
  const category = data.category;
  const cleanCategory = CATEGORY_MAPPING[category] || category;
  
  console.log(`📄 ${file}`);
  console.log(`   Slug: ${slug}`);
  console.log(`   Category (frontmatter): "${category}"`);
  console.log(`   Clean Category (après mapping): "${cleanCategory}"`);
  console.log(`   ✅ URL générée: /blog/${cleanCategory}/${slug}`);
  console.log('');
});

console.log('='.repeat(80));
console.log('\n💡 Note: Ces URLs sont générées par le système Next.js');
console.log('          Les liens dans les articles doivent pointer vers ces URLs exactes\n');

