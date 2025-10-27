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
  "rennes:dd-rennes"
  "lille:dd-lille"
  "bordeaux:dd-bordeaux"
  "toulouse:dd-toulouse"
  "rouen:dd-rouen"
  "strasbourg:dd-strasbourg"
)

# Base directory for sites (absolute path for portability on this machine)
BASE_DIR="/Users/lucie/moverz_main/sites"

for site_info in "${SITES[@]}"; do
  city="${site_info%%:*}"
  repo_name="${site_info##*:}"
  
  echo "📦 $city -> $repo_name"
  
  cd "$BASE_DIR/$city" || { echo "   ❌ Dossier introuvable: $BASE_DIR/$city"; continue; }
  
  # Initialiser Git si nécessaire
  if [ ! -d ".git" ]; then
    echo "   🔧 Initialisation Git..."
    git init
  fi
  
  # Ajouter et commiter
  git add -A
  commit_msg="deploy(rollback-2025-10-16): sync site $city\n\n- Push monorepo state for $city\n- Ensure per-site blog + no blog redirects\n\nDate: $(date '+%Y-%m-%d %H:%M')"
  
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
  
  cd /Users/lucie/moverz_main
done

echo "═══════════════════════════════════════"
echo "✅ TOUS LES SITES ONT ÉTÉ TRAITÉS !"
echo ""
echo "🔗 Vérifiez sur GitHub:"
for site_info in "${SITES[@]}"; do
  repo_name="${site_info##*:}"
  echo "   • https://github.com/gdetaisne/$repo_name"
done
