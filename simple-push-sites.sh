#!/bin/bash

# Script simple pour initialiser et pousser tous les sites
set -e

echo "🚀 PUSH SIMPLE DE TOUS LES SITES"
echo "================================"

SITES=("nantes" "nice" "lyon" "montpellier" "rennes" "lille" "bordeaux" "toulouse" "rouen" "strasbourg")

for city in "${SITES[@]}"; do
  echo "📦 $city"
  
  cd "/Users/guillaumestehelin/moverz_main/sites/$city"
  
  # Initialiser Git si nécessaire
  if [ ! -d ".git" ]; then
    git init
  fi
  
  # Ajouter et commiter
  git add -A
  git commit -m "fix: Correction sitemap - Lecture articles locaux uniquement" || echo "Rien à commiter"
  
  # Ajouter remote si nécessaire
  if ! git remote | grep -q "^origin$"; then
    git remote add origin "https://github.com/gdetaisne/dd-$city.git"
  fi
  
  # Push
  git push -u origin main --force || echo "Push échoué"
  
  echo "✅ $city traité"
  cd /Users/guillaumestehelin/moverz_main
done

echo "✅ TERMINÉ !"
