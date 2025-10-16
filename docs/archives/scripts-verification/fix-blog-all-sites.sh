#!/bin/bash

# Script pour corriger lib/blog.ts de tous les sites
# Change process.cwd() vers __dirname pour lecture locale

set -e

echo "🔧 CORRECTION DE LIB/BLOG.TS POUR TOUS LES SITES"
echo "================================================"
echo ""

SITES=("nantes" "nice" "lyon" "montpellier" "rennes" "lille" "bordeaux" "toulouse" "rouen" "strasbourg")

for site in "${SITES[@]}"; do
  echo "📦 $site"
  
  BLOG_FILE="/Users/guillaumestehelin/moverz_main/sites/$site/lib/blog.ts"
  
  if [ -f "$BLOG_FILE" ]; then
    # Remplacer process.cwd() par __dirname
    sed -i '' 's|path\.join(process\.cwd(), '\''content/blog'\'')|path.join(__dirname, '\''../'\'', '\''content/blog'\'')|g' "$BLOG_FILE"
    echo "   ✅ Corrigé"
  else
    echo "   ⚠️  Fichier non trouvé"
  fi
  
done

echo ""
echo "✅ TOUS LES SITES ONT ÉTÉ CORRIGÉS !"

