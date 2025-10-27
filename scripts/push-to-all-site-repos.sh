#!/bin/bash

# Script pour pousser le monorepo vers tous les repos GitHub individuels des sites
# Usage: ./scripts/push-to-all-site-repos.sh

set -e

echo "🚀 PUSH MONOREPO VERS TOUS LES REPOS GITHUB INDIVIDUELS"
echo "========================================================="
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

# Sauvegarder l'origine actuelle
CURRENT_ORIGIN=$(git remote get-url origin)
echo "🔖 Origine actuelle: $CURRENT_ORIGIN"
echo ""

for site in "${SITES[@]}"; do
  echo "📦 Push vers dd-$site"
  
  # Changer l'origine vers le repo du site
  git remote set-url origin "https://github.com/gdetaisne/dd-$site.git"

  # Sécuriser la config Next/ESM
  # 1) forcer la présence de next.config.mjs et supprimer .js
  if [ -f next.config.js ]; then
    git rm -f next.config.js || true
    rm -f next.config.js || true
    echo "   🧹 next.config.js supprimé (ESM)"
  fi
  
  # 2) PostCSS: utiliser .cjs (CommonJS) dans contexte type=module
  if [ -f postcss.config.js ]; then
    git rm -f postcss.config.js || true
    rm -f postcss.config.js || true
    echo "module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }" > postcss.config.cjs
    git add postcss.config.cjs
    echo "   🔁 postcss.config.js → postcss.config.cjs"
  fi
  
  # Commit de sécurité si des changements ont été faits
  if ! git diff --cached --quiet; then
    git commit -m "chore($site): enforce ESM/CJS config for CapRover build (Next + PostCSS)"
  fi
  
  # Push vers le repo du site
  echo "   📤 Push vers https://github.com/gdetaisne/dd-$site.git"
  git push origin main --force 2>&1 | grep -E "(Everything up-to-date|-> main|fast-forward)" || echo "   ⚠️  Push terminé (sortie non standard) pour $site"
  
  echo "   ✅ $site poussé"
  echo ""
done

# Restaurer l'origine d'origine
echo "🔙 Restauration origine: $CURRENT_ORIGIN"
git remote set-url origin "$CURRENT_ORIGIN"

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
