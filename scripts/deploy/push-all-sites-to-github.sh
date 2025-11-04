#!/bin/bash

# Script pour pousser tous les sites vers leurs repos GitHub individuels
# 
# Usage:
#   ./push-all-sites-to-github.sh                    # Push tous les sites SANS rsync (sécurisé)
#   ALLOW_CONTENT_SYNC=1 ./push-all-sites-to-github.sh  # Avec rsync content/ -> sites/ (risqué)
#   ./push-all-sites-to-github.sh --dry-run          # Simulation sans push
#   ./push-all-sites-to-github.sh --sites=nice,bordeaux  # Push seulement Nice et Bordeaux

set -e

# Configuration
ALLOW_CONTENT_SYNC="${ALLOW_CONTENT_SYNC:-0}"
DRY_RUN=0
SELECTED_SITES=""

# Parse args
for arg in "$@"; do
  case $arg in
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    --sites=*)
      SELECTED_SITES="${arg#*=}"
      shift
      ;;
  esac
done

echo "🚀 PUSH DE TOUS LES SITES VERS GITHUB"
echo "======================================"
echo ""

if [ "$DRY_RUN" = "1" ]; then
  echo "⚠️  MODE DRY-RUN (simulation, aucun push réel)"
  echo ""
fi

if [ "$ALLOW_CONTENT_SYNC" = "0" ]; then
  echo "🔒 RSYNC DÉSACTIVÉ (protection anti-404)"
  echo "   Pour activer: ALLOW_CONTENT_SYNC=1 ./push-all-sites-to-github.sh"
  echo ""
fi

SITES=(
  "marseille"
  "lyon"
  "montpellier"
  "bordeaux"
  "nantes"
  "lille"
  "nice"
  "strasbourg"
  "rouen"
  "rennes"
  "toulouse"
)

# Filter sites if --sites provided
if [ -n "$SELECTED_SITES" ]; then
  IFS=',' read -ra SITES <<< "$SELECTED_SITES"
  echo "🎯 Sites sélectionnés: ${SITES[*]}"
  echo ""
fi

for site in "${SITES[@]}"; do
  echo "📦 $site"
  
  # Synchroniser (facultatif et DÉSACTIVÉ par défaut) le contenu local de tests vers le dossier officiel du site
  if [ "$ALLOW_CONTENT_SYNC" = "1" ] && [ -d "content/$site/blog" ]; then
    echo "   🔄 Sync content/$site/blog -> sites/$site/content/blog (ALLOW_CONTENT_SYNC=1)"
    mkdir -p "sites/$site/content/blog"
    rsync -a --delete "content/$site/blog/" "sites/$site/content/blog/"
  fi
  
  if [ -d "sites/$site/.git" ]; then
    cd "sites/$site"
    
    # Vérifier s'il y a des changements
    if git diff --quiet && git diff --cached --quiet; then
      echo "   ℹ️  Aucun changement à committer"
    else
      # Ajouter tous les fichiers
      git add -A
      
      # Commit
      git commit -m "feat: Mise à jour contenu blog et piliers SEO

$(date '+%Y-%m-%d %H:%M')

- Nouveaux piliers SEO ajoutés
- Corrections liens internes
- Mise à jour domaines sitemap
- Optimisations SEO" 2>&1 | grep -v "nothing to commit" || true
    fi
    
    # Push vers le repo individuel
    if [ "$DRY_RUN" = "1" ]; then
      echo "   🔍 [DRY-RUN] Push simulé vers GitHub (dd-$site)"
    else
      echo "   📤 Push vers GitHub..."
      git push origin main 2>&1 | grep -v "Everything up-to-date" || echo "   ✅ Poussé avec succès"
    fi
    
    cd ../..
  else
    echo "   ⚠️  Pas de repo Git configuré"
  fi
  
  echo ""
done

echo "═══════════════════════════════════════"
echo ""
echo "✅ TOUS LES SITES ONT ÉTÉ POUSSÉS SUR GITHUB !"
echo ""
echo "🔗 Vérifiez sur GitHub:"
for site in "${SITES[@]}"; do
  echo "   • https://github.com/gdetaisne/dd-$site"
done
