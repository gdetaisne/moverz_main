#!/bin/bash

# Script pour corriger les catégories blog sur toutes les villes
# Copie la solution de Strasbourg et l'adapte pour chaque ville
# Date: 29 Octobre 2025

set -e

CITIES=(marseille toulouse lyon bordeaux nantes lille nice rouen rennes montpellier)

echo "🔧 CORRECTION CATÉGORIES BLOG - TOUTES LES VILLES"
echo "===================================================="
echo ""

for CITY in "${CITIES[@]}"; do
  echo "🏙️  Traitement de $CITY..."
  
  CATEGORY_FILE="sites/$CITY/app/blog/[category]/page.tsx"
  
  if [ ! -f "$CATEGORY_FILE" ]; then
    echo "   ⚠️  Fichier $CATEGORY_FILE non trouvé, skip"
    continue
  fi
  
  # Vérifier si le mapping existe déjà
  if grep -q "categoryMapping:" "$CATEGORY_FILE"; then
    echo "   ℹ️  Mapping déjà présent, skip"
    continue
  fi
  
  echo "   → Ajout mapping catégories..."
  
  # Créer un fichier temporaire avec le nouveau code
  cat > "/tmp/category-fix-${CITY}.txt" << 'ENDOFMAPPING'
export default function CategoryPage({ params }: CategoryPageProps) {
  // Mapping des catégories vers les slugs réels des articles
  const categoryMapping: { [key: string]: string[] } = {
    'piano': ['demenagement-piano-CITYNAME'],
    'garde-meuble': ['garde-meuble-CITYNAME-guide-complet'],
    'international': ['demenagement-international-CITYNAME'],
    'entreprise': ['demenagement-d-entreprise-CITYNAME'],
    'prix': ['prix-demenagement-CITYNAME'],
    'pas-cher': ['demenagement-CITYNAME-pas-cher'],
    'urgent': [],
    'etudiant': [],
    'devis': [],
    'longue-distance': [],
  };

  // Récupérer tous les posts et filtrer selon le mapping
  const allPosts = getAllBlogPosts();
  const categoryFilter = categoryMapping[params.category];
  
  let posts: any[] = [];
  
  if (categoryFilter && categoryFilter.length > 0) {
    // Filtrer par slugs mappés
    posts = allPosts.filter(post => categoryFilter.includes(post.cleanSlug));
  } else {
    // Fallback : chercher par cleanCategory (comportement original)
    posts = getBlogPostsByCleanCategory(params.category);
  }
ENDOFMAPPING
  
  # Remplacer CITYNAME par le nom de la ville
  sed "s/CITYNAME/$CITY/g" "/tmp/category-fix-${CITY}.txt" > "/tmp/category-fix-${CITY}-final.txt"
  
  # Remplacer la fonction dans le fichier
  # On utilise Python pour une manipulation plus sûre
  python3 << ENDOFPYTHON
import re

with open('$CATEGORY_FILE', 'r') as f:
    content = f.read()

# Remplacer la ligne problématique
old_pattern = r'export default function CategoryPage\(\{ params \}: CategoryPageProps\) \{[\s\S]*?const posts = getBlogPostsByCleanCategory\(params\.category\);'

with open('/tmp/category-fix-${CITY}-final.txt', 'r') as f:
    new_content = f.read()

# Remplacer
content = re.sub(old_pattern, new_content, content, count=1)

with open('$CATEGORY_FILE', 'w') as f:
    f.write(content)

print("   ✅ Mapping ajouté")
ENDOFPYTHON
  
done

echo ""
echo "🎉 Correction catégories terminée pour toutes les villes !"
echo ""

