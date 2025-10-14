const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Mapping des catégories
const categoryMapping = {
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
};

// Clean slug function
function cleanSlug(slug, category) {
  let clean = slug;
  
  const categoryPatterns = [
    'demenagement-etudiant-lyon-',
    'demenagement-entreprise-lyon-',
    'demenagement-piano-lyon-',
    'demenagement-international-lyon-',
    'demenagement-longue-distance-lyon-',
    'demenagement-pas-cher-lyon-',
    'demenagement-urgent-lyon-',
    'devis-demenagement-lyon-',
    'garde-meuble-lyon-',
    'prix-demenagement-lyon-',
    'prix-demenagement-piano-lyon-',
  ];
  
  categoryPatterns.forEach(pattern => {
    if (clean.startsWith(pattern)) {
      clean = clean.replace(pattern, '');
    }
  });
  
  clean = clean.replace(/-lyon$/i, '');
  clean = clean.replace(/-guide-complet$/i, '-guide');
  clean = clean.replace(/-reperes-2025$/i, '-2025');
  
  return clean;
}

// Récupérer tous les articles existants
function getAllExistingArticles() {
  const articles = new Map();
  const blogDirectory = path.join(process.cwd(), 'content/blog');
  
  const categories = fs.readdirSync(blogDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  categories.forEach(category => {
    const categoryPath = path.join(blogDirectory, category);
    const files = fs.readdirSync(categoryPath)
      .filter(file => file.endsWith('.md') && file !== 'README.md');

    files.forEach(file => {
      const slug = file.replace('.md', '');
      const cleanCategory = categoryMapping[category] || category;
      const cleanedSlug = cleanSlug(slug, category);
      const url = `/blog/${cleanCategory}/${cleanedSlug}`;
      
      articles.set(url, {
        file: path.join(categoryPath, file),
        category: cleanCategory,
        slug: cleanedSlug,
        originalSlug: slug
      });
    });
  });
  
  return articles;
}

// Vérifier les liens dans un fichier
function checkLinksInFile(filePath, existingArticles) {
  const brokenLinks = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    
    // Trouver tous les liens internes du blog
    const linkRegex = /\[([^\]]+)\]\((\/blog\/[^)]+)\)/g;
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
      const linkText = match[1];
      const linkUrl = match[2];
      
      // Vérifier si l'article existe
      if (!existingArticles.has(linkUrl)) {
        brokenLinks.push({
          text: linkText,
          url: linkUrl,
          line: content.substring(0, match.index).split('\n').length
        });
      }
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
  }
  
  return brokenLinks;
}

// Fonction principale
function checkAllLinks() {
  console.log('Checking blog internal links for 404s...');
  console.log('---');
  
  const existingArticles = getAllExistingArticles();
  console.log(`✓ Found ${existingArticles.size} existing articles`);
  console.log('---');
  
  let totalBrokenLinks = 0;
  let filesWithIssues = 0;
  
  existingArticles.forEach((article, url) => {
    const brokenLinks = checkLinksInFile(article.file, existingArticles);
    
    if (brokenLinks.length > 0) {
      filesWithIssues++;
      console.log(`\n❌ ${path.basename(article.file)}:`);
      brokenLinks.forEach(link => {
        console.log(`   Line ${link.line}: "${link.text}" → ${link.url}`);
        totalBrokenLinks++;
      });
    }
  });
  
  console.log('\n---');
  
  if (totalBrokenLinks === 0) {
    console.log('✅ No broken internal links found! All links are valid.');
  } else {
    console.log(`⚠️  Found ${totalBrokenLinks} broken links in ${filesWithIssues} files.`);
  }
  
  // Afficher quelques exemples d'URLs valides
  console.log('\n📋 Sample of valid article URLs:');
  let count = 0;
  for (const [url, article] of existingArticles) {
    if (count < 5) {
      console.log(`   ${url} (${article.originalSlug})`);
      count++;
    }
  }
}

// Exécution
checkAllLinks();

