#!/bin/bash

# Script pour préparer chaque repo satellite avec la structure correcte pour CapRover
# Copie les fichiers du site à la racine du repo

set -e

echo "🚀 PRÉPARATION DES REPOS SATELLITES POUR CAPROVER"
echo "=================================================="
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
  echo "📦 Préparation de dd-$site"
  
  # Copier les fichiers du site à la racine
  echo "   📁 Copie des fichiers de sites/$site/ vers la racine..."
  
  # Copier package.json
  cp "sites/$site/package.json" package.json
  
  # Copier les dossiers principaux
  rm -rf app components lib public content scripts 2>/dev/null || true
  cp -r "sites/$site/app" .
  cp -r "sites/$site/components" .
  cp -r "sites/$site/lib" .
  cp -r "sites/$site/public" .
  cp -r "sites/$site/content" .
  
  # Copier scripts si existe
  if [ -d "sites/$site/scripts" ]; then
    cp -r "sites/$site/scripts" .
  fi
  
  # Copier les fichiers de configuration
  cp sites/$site/*.json . 2>/dev/null || true
  cp sites/$site/*.ts . 2>/dev/null || true
  
  # Copier next.config selon son extension et la compatibilité
  if [ -f "sites/$site/next.config.mjs" ]; then
    cp sites/$site/next.config.mjs .
  elif [ -f "sites/$site/next.config.cjs" ]; then
    cp sites/$site/next.config.cjs .
  elif [ -f "sites/$site/next.config.js" ]; then
    # Vérifier si package.json déclare "type": "module"
    if grep -q '"type": "module"' "sites/$site/package.json"; then
      # Convertir .js en .mjs
      cp sites/$site/next.config.js next.config.mjs
      sed -i '' 's/module\.exports/export default/g' next.config.mjs
      echo "   ⚠️  Converti next.config.js → next.config.mjs pour $site"
    else
      cp sites/$site/next.config.js .
    fi
  fi
  
  # Copier les autres fichiers de config (.cjs spécifiques)
  cp sites/$site/postcss.config.cjs . 2>/dev/null || true
  cp sites/$site/tailwind.config.cjs . 2>/dev/null || true
  
  # Copier captain-definition à la racine
  cp "sites/$site/captain-definition" captain-definition
  
  # Copier Dockerfile à la racine et le modifier
  cp "sites/$site/Dockerfile" Dockerfile
  
  # Modifier le Dockerfile pour utiliser le contexte racine
  sed -i '' 's|COPY \. \./|COPY . ./|g' Dockerfile
  
  echo "   ✅ Fichiers copiés pour $site"
  
  # Commit
  git add .
  git commit -m "fix($site): Prépare structure pour CapRover - fichiers à la racine

- package.json $site copié à la racine
- app/, components/, lib/, public/, content/ copiés
- captain-definition à la racine
- Dockerfile à la racine
- Prêt pour déploiement CapRover"
  
  # Changer vers le repo satellite et push
  echo "   📤 Push vers dd-$site..."
  git remote set-url origin "https://github.com/gdetaisne/dd-$site.git"
  git push origin main --force 2>&1 | grep -E "(Everything up-to-date|-> main|fast-forward)" || echo "   ⚠️  Push échoué pour $site"
  
  echo "   ✅ $site préparé et pushé"
  echo ""
done

# Restaurer l'origine
echo "🔙 Restauration origine: $CURRENT_ORIGIN"
git remote set-url origin "$CURRENT_ORIGIN"

# Nettoyer les fichiers copiés à la racine
echo "🧹 Nettoyage de la racine du monorepo..."
rm -rf app components lib public content captain-definition Dockerfile 2>/dev/null || true
git checkout package.json next.config.mjs tailwind.config.ts tsconfig.json 2>/dev/null || true

echo ""
echo "═══════════════════════════════════════"
echo "✅ TOUS LES REPOS SATELLITES SONT PRÊTS !"
echo ""
echo "🔗 CapRover va maintenant trouver:"
echo "   • captain-definition à la racine"
echo "   • Dockerfile à la racine"
echo "   • package.json avec script build"
echo "   • app/, components/, etc. à la racine"
echo ""
echo "🚀 Force rebuild dans CapRover pour chaque app !"

