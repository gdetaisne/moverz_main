#!/bin/bash

# Script pour pousser UN SEUL site vers son repo GitHub individuel
# Usage:
#   ./scripts/deploy/push-site.sh bordeaux                  # Push GitHub (webhook auto)
#   ./scripts/deploy/push-site.sh bordeaux --force-deploy   # Push + force rebuild CapRover

set -e

# Vérifier qu'un site est fourni
if [ -z "$1" ]; then
  echo "❌ ERREUR: Vous devez spécifier un site"
  echo ""
  echo "Usage: ./scripts/deploy/push-site.sh <ville> [--force-deploy]"
  echo ""
  echo "Villes disponibles:"
  echo "  marseille, lyon, montpellier, bordeaux, nantes, lille,"
  echo "  nice, strasbourg, rouen, rennes, toulouse"
  echo ""
  exit 1
fi

SITE=$1
FORCE_DEPLOY=0
CAPROVER_URL="${CAPROVER_URL:-https://captain.moverz.fr}"
CAPROVER_TOKEN="${CAPROVER_TOKEN}"

# Parse args
for arg in "$@"; do
  case $arg in
    --force-deploy)
      FORCE_DEPLOY=1
      shift
      ;;
  esac
done

# Vérifier que le dossier existe
if [ ! -d "sites/$SITE" ]; then
  echo "❌ ERREUR: Le dossier sites/$SITE n'existe pas"
  exit 1
fi

echo "🚀 PUSH SITE: $SITE"
echo "═══════════════════════════════════════"
echo ""

if [ "$FORCE_DEPLOY" = "1" ]; then
  echo "⚡ Mode : FORCE DEPLOY (rebuild CapRover immédiat)"
  if [ -z "$CAPROVER_TOKEN" ]; then
    echo "⚠️  CAPROVER_TOKEN non défini"
    echo "   → Push GitHub uniquement (webhook prendra relai)"
  fi
  echo ""
fi

# Aller dans le dossier du site
cd "sites/$SITE"

# Init git si besoin
if [ ! -d .git ]; then
  echo "🔧 Init repo Git..."
  git init
  git branch -M main
  echo ""
fi

# Configurer remote origin
if git remote | grep -q '^origin$'; then
  git remote set-url origin "https://github.com/gdetaisne/dd-$SITE.git"
else
  git remote add origin "https://github.com/gdetaisne/dd-$SITE.git"
fi

# Vérifier s'il y a des changements
if git diff --quiet && git diff --cached --quiet; then
  echo "ℹ️  Aucun changement à committer pour $SITE"
  echo ""
else
  # Afficher les fichiers modifiés
  echo "📝 Fichiers modifiés:"
  git status --short | head -20
  if [ $(git status --short | wc -l) -gt 20 ]; then
    echo "   ... et $(( $(git status --short | wc -l) - 20 )) autres fichiers"
  fi
  echo ""
  
  # Commit
  git add -A
  git commit -m "feat: Update $SITE $(date '+%Y-%m-%d %H:%M')

- Optimisation metadata CTR
- Corrections villes hardcodées → cityData dynamique
- Améliorations SEO"
  echo "✅ Commit créé"
  echo ""
fi

# Push vers GitHub
echo "📤 Push vers GitHub (dd-$SITE)..."
git push origin main

echo "✅ Poussé sur GitHub"
echo ""

# Trigger CapRover si --force-deploy
if [ "$FORCE_DEPLOY" = "1" ] && [ -n "$CAPROVER_TOKEN" ]; then
  echo "⚡ Trigger rebuild CapRover..."
  
  APP_NAME="dd-$SITE"
  response=$(curl -s -X POST "$CAPROVER_URL/api/v2/user/apps/webhooks/triggerbuild" \
    -H "Content-Type: application/json" \
    -H "x-captain-auth: $CAPROVER_TOKEN" \
    -d "{\"appName\": \"$APP_NAME\", \"branchToPull\": \"main\"}" \
    2>&1 || echo "error")
  
  if echo "$response" | grep -q "error"; then
    echo "❌ Erreur API CapRover"
  elif echo "$response" | grep -q "\"status\":200"; then
    echo "✅ Rebuild CapRover déclenché"
  else
    echo "⚠️  Réponse inattendue : $response"
  fi
  echo ""
fi

echo "═══════════════════════════════════════"
echo "✅ SITE $SITE DÉPLOYÉ !"
echo ""
echo "🔗 Repo: https://github.com/gdetaisne/dd-$SITE"

if [ "$FORCE_DEPLOY" = "1" ]; then
  echo "⏱️  Build en cours sur CapRover (~3-5 min)"
  echo "📊 Monitoring: $CAPROVER_URL"
else
  echo "🔄 Webhook GitHub → CapRover déploiera automatiquement (~3-5 min)"
fi

echo ""

# Déterminer l'URL du site
case $SITE in
  "bordeaux")
    SITE_URL="https://www.bordeaux-demenageur.fr"
    ;;
  "marseille")
    SITE_URL="https://devis-demenageur-marseille.fr"
    ;;
  "lyon")
    SITE_URL="https://devis-demenageur-lyon.fr"
    ;;
  "montpellier")
    SITE_URL="https://devis-demenageur-montpellier.fr"
    ;;
  *)
    SITE_URL="https://devis-demenageur-$SITE.fr"
    ;;
esac

echo "🌐 Site en prod: $SITE_URL"
echo ""

