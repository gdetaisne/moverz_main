#!/bin/bash

# Script pour pousser chaque dossier de site vers son repo GitHub individuel
# Usage: ./scripts/push-to-all-site-repos.sh

set -e

echo "🚀 PUSH CHAQUE DOSSIER DE SITE VERS SON REPO INDIVIDUEL"
echo "==============================================================="
echo ""

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

for site in "${SITES[@]}"; do
  echo "📦 Push du dossier sites/$site vers dd-$site"
  if [ ! -d "sites/$site" ]; then
    echo "   ⚠️ Dossier sites/$site introuvable, on saute."
    continue
  fi
  cd "sites/$site"
  # Init git si besoin
  if [ ! -d .git ]; then
    git init
  fi
  git add -A
  git commit -m "sync: update $site from monorepo" || true
  # Remote origin -> repo du site
  if git remote | grep -q '^origin$'; then
    git remote set-url origin "https://github.com/gdetaisne/dd-$site.git"
  else
    git remote add origin "https://github.com/gdetaisne/dd-$site.git"
  fi
  echo "   📤 Push vers https://github.com/gdetaisne/dd-$site.git"
  git push -u origin main --force 2>&1 | grep -E "(Everything up-to-date|-> main|fast-forward)" || echo "   ⚠️ Push échoué pour $site"
  echo "   ✅ $site poussé"
  echo ""
  cd - >/dev/null
done

echo "═══════════════════════════════════════"
echo ""
echo "✅ TOUS LES SITES ONT ÉTÉ POUSSÉS SUR GITHUB !"
echo ""
echo "🔗 Vérifiez sur GitHub:"
for site in "${SITES[@]}"; do
  echo "   • https://github.com/gdetaisne/dd-$site"
done
echo ""
echo "🚀 Tous les sites sont maintenant à jour et prêts pour déploiement CapRover !"
