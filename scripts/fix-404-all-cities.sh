#!/bin/bash

# Script pour corriger les 404s et catégories blog sur toutes les villes
# Date: 29 Octobre 2025

set -e

CITIES=(marseille toulouse lyon bordeaux nantes lille nice rouen rennes montpellier)

echo "🔧 CORRECTION 404s + CATÉGORIES - TOUTES LES VILLES"
echo "======================================================"
echo ""

for CITY in "${CITIES[@]}"; do
  echo "🏙️  Traitement de $CITY..."
  CITY_UPPER=$(echo "$CITY" | sed 's/.*/\u&/')
  
  # 1. Supprimer numéro téléphone de StructuredData.tsx
  if [ -f "sites/$CITY/components/StructuredData.tsx" ]; then
    echo "   → Suppression numéro téléphone..."
    sed -i '' '/"telephone":/d' "sites/$CITY/components/StructuredData.tsx"
  fi
  
  # 2. Ajouter mapping catégories dans [category]/page.tsx
  if [ -f "sites/$CITY/app/blog/[category]/page.tsx" ]; then
    echo "   → Ajout mapping catégories blog..."
    
    # Vérifier si le mapping existe déjà
    if ! grep -q "categoryMapping:" "sites/$CITY/app/blog/[category]/page.tsx"; then
      # Insérer le mapping après la ligne "export default function CategoryPage"
      sed -i '' "/export default function CategoryPage/a\\
\\
  // Mapping des catégories vers les slugs réels des articles\\
  const categoryMapping: { [key: string]: string[] } = {\\
    'piano': ['demenagement-piano-$CITY'],\\
    'garde-meuble': ['garde-meuble-$CITY-guide-complet'],\\
    'international': ['demenagement-international-$CITY'],\\
    'entreprise': ['demenagement-d-entreprise-$CITY'],\\
    'prix': ['prix-demenagement-$CITY'],\\
    'pas-cher': ['demenagement-$CITY-pas-cher'],\\
    'urgent': [],\\
    'etudiant': [],\\
    'devis': [],\\
    'longue-distance': [],\\
  };\\
\\
  // Récupérer tous les posts et filtrer selon le mapping\\
  const allPosts = getAllBlogPosts();\\
  const categoryFilter = categoryMapping[params.category];\\
  \\
  let posts: any[] = [];\\
  \\
  if (categoryFilter && categoryFilter.length > 0) {\\
    posts = allPosts.filter(post => categoryFilter.includes(post.cleanSlug));\\
  } else {\\
    posts = getBlogPostsByCleanCategory(params.category);\\
  }\\
\\
  // Remplacer la ligne suivante\\
  // const posts = getBlogPostsByCleanCategory(params.category);\\
" "sites/$CITY/app/blog/[category]/page.tsx"
    fi
  fi
  
  echo "   ✅ $CITY terminé"
  echo ""
done

echo "🎉 Correction terminée pour toutes les villes !"
echo ""
echo "📊 Prochaine étape :"
echo "   git add sites/*"
echo "   git commit -m 'fix: Correction 404s + catégories toutes villes'"
echo "   git push origin main"

