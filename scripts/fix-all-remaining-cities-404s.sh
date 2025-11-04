#!/bin/bash

# Script pour corriger les 404s de toutes les villes restantes
# Villes: Nantes, Montpellier, Rennes, Rouen, Strasbourg, Toulouse

CITIES=("nantes" "montpellier" "rennes" "rouen" "strasbourg" "toulouse")
BASE_DIR="/Users/guillaumestehelin/moverz_main-2/sites"

for CITY in "${CITIES[@]}"; do
  echo "========================================"
  echo "🏙️  Traitement de $CITY"
  echo "========================================"
  
  cd "$BASE_DIR/$CITY" || continue
  
  # Copier scripts
  mkdir -p scripts
  cp ../marseille/scripts/analyze-blog-structure.mjs scripts/
  cp ../marseille/scripts/fix-404-marseille-simple.mjs scripts/fix-404-$CITY-simple.mjs
  
  # Adapter domain
  DOMAIN="devis-demenageur-$CITY.fr"
  sed -i '' "s/devis-demenageur-marseille.fr/$DOMAIN/g" scripts/analyze-blog-structure.mjs
  
  # Adapter category
  CATEGORY_UPPER=$(echo "${CITY^}" | sed 's/^./\U&/')
  sed -i '' "s/demenagement-marseille/demenagement-$CITY/g" scripts/fix-404-$CITY-simple.mjs
  sed -i '' "s/Marseille/$CATEGORY_UPPER/g" scripts/fix-404-$CITY-simple.mjs
  
  # Installer gray-matter si nécessaire
  npm list gray-matter 2>&1 | grep -q "gray-matter@" || npm install --save-dev gray-matter --silent
  
  # Analyser
  echo "📊 Analyse..."
  node scripts/analyze-blog-structure.mjs > /dev/null
  
  # Corriger
  echo "🔧 Corrections..."
  RESULT=$(node scripts/fix-404-$CITY-simple.mjs 2>&1 | tail -3)
  echo "$RESULT"
  
  # Tester
  echo "✅ Test production..."
  HTTP_CODE=$(curl -sI "https://$DOMAIN/blog/demenagement-$CITY/demenageur-$CITY/" 2>&1 | grep "HTTP/" | head -1)
  echo "$HTTP_CODE"
  
  # Commit
  git add .
  STATS=$(echo "$RESULT" | grep "fichiers modifiés" | grep -o "[0-9]* fichiers")
  LINKS=$(echo "$RESULT" | grep "liens corrigés" | grep -o "[0-9]* liens")
  
  git commit -m "fix($CITY): correct broken blog internal links

Pattern #5A: Fix folder mismatch

$STATS modified
$LINKS corrected

Scripts added:
- scripts/analyze-blog-structure.mjs
- scripts/blog-url-mapping.json
- scripts/fix-404-$CITY-simple.mjs"
  
  # Push
  git push origin main
  
  echo "✅ $CITY terminé!"
  echo ""
done

echo "========================================" 
echo "🎉 TOUTES LES VILLES TRAITÉES !"
echo "========================================"

