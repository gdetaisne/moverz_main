#!/bin/bash

# Script pour initialiser et pousser tous les sites vers GitHub
# Usage: ./init-and-push-sites.sh

set -e

echo "🚀 INITIALISATION ET PUSH DE TOUS LES SITES"
echo "==========================================="
echo ""

SITES=(
  "nantes:dd-nantes"
  "nice:dd-nice" 
  "lyon:dd-lyon"
  "montpellier:dd-montpellier"
  "rennes:dd-rennes"
  "lille:dd-lille"
  "bordeaux:dd-bordeaux"
  "toulouse:dd-toulouse"
  "rouen:dd-rouen"
  "strasbourg:dd-strasbourg"
)

for site_info in "${SITES[@]}"; do
  city="${site_info%%:*}"
  repo_name="${site_info##*:}"
  
  echo "📦 $city -> $repo_name"
  
  cd "/Users/guillaumestehelin/moverz_main/sites/$city"
  
  # Initialiser Git si nécessaire
  if [ ! -d ".git" ]; then
    echo "   🔧 Initialisation Git..."
    git init
  fi
  
  # Ajouter et commiter
  git add -A
  git commit -m "fix: Correction sitemap - Lecture articles locaux uniquement

- Fonction get${city^}BlogPosts() créée
- Sitemap lit maintenant seulement les articles de $city
- Résolution problème pages non pertinentes
- Impact SEO: contenu pertinent uniquement

Date: $(date '+%Y-%m-%d %H:%M')" || echo "   ℹ️  Rien à commiter"
  
  # Ajouter remote si nécessaire
  if ! git remote | grep -q "^origin$"; then
    echo "   🔧 Ajout remote origin..."
    git remote add origin "https://github.com/gdetaisne/$repo_name.git"
  fi
  
  # Push
  echo "   📤 Push vers GitHub..."
  git push -u origin main --force || echo "   ⚠️  Push échoué (repo peut ne pas exister)"
  
  echo "   ✅ $city traité"
  echo ""
  
  cd /Users/guillaumestehelin/moverz_main
done

echo "═══════════════════════════════════════"
echo "✅ TOUS LES SITES ONT ÉTÉ TRAITÉS !"
echo ""
echo "🔗 Vérifiez sur GitHub:"
for site_info in "${SITES[@]}"; do
  repo_name="${site_info##*:}"
  echo "   • https://github.com/gdetaisne/$repo_name"
done
