#!/bin/bash

# Script pour initialiser et pousser tous les sites vers GitHub
# Usage: ./init-and-push-sites-fixed.sh

set -e

echo "🚀 INITIALISATION ET PUSH DE TOUS LES SITES"
echo "==========================================="
echo ""

SITES=(
  "nantes:dd-nantes"
  "nice:dd-nice" 
  "lyon:dd-lyon"
  "montpellier:dd-montpellier"
  "marseille:dd-marseille"
  "rennes:dd-rennes"
  "lille:dd-lille"
  "bordeaux:dd-bordeaux"
  "toulouse:dd-toulouse"
  "rouen:dd-rouen"
  "strasbourg:dd-strasbourg"
)

## Déterminer la racine du monorepo (chemin dynamique)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BASE_DIR="$SCRIPT_DIR"

for site_info in "${SITES[@]}"; do
  city="${site_info%%:*}"
  repo_name="${site_info##*:}"
  
  echo "📦 $city -> $repo_name"
  
  cd "$BASE_DIR/sites/$city"
  
  # Initialiser Git si nécessaire
  if [ ! -d ".git" ]; then
    echo "   🔧 Initialisation Git..."
    git init
  fi
  
  # Ajouter et commiter
  git add -A
  commit_msg="chore($city): init repo et push automatique

- Initialisation Git et configuration remote
- Synchronisation du contenu du site $city

Date: $(date '+%Y-%m-%d %H:%M')"
  
  git commit -m "$commit_msg" || echo "   ℹ️  Rien à commiter"
  
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
  
  cd "$BASE_DIR"
done

echo "═══════════════════════════════════════"
echo "✅ TOUS LES SITES ONT ÉTÉ TRAITÉS !"
echo ""
echo "🔗 Vérifiez sur GitHub:"
for site_info in "${SITES[@]}"; do
  repo_name="${site_info##*:}"
  echo "   • https://github.com/gdetaisne/$repo_name"
done
