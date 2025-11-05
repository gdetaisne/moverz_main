#!/bin/bash

# Script pour pousser tous les sites vers leurs repos GitHub individuels
# Usage:
#   ./scripts/deploy/push-all-sites.sh                  # Push GitHub (webhook auto)
#   ./scripts/deploy/push-all-sites.sh --force-deploy   # Push + force rebuild CapRover

set -e

# Configuration
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

echo "🚀 PUSH TOUS LES SITES VERS GITHUB"
echo "===================================="
echo ""

if [ "$FORCE_DEPLOY" = "1" ]; then
  echo "⚡ Mode : FORCE DEPLOY (rebuild CapRover immédiat)"
  if [ -z "$CAPROVER_TOKEN" ]; then
    echo "⚠️  CAPROVER_TOKEN non défini"
    echo "   → Push GitHub uniquement (webhook prendra relai)"
    echo ""
  fi
else
  echo "🔄 Mode : Push GitHub (webhook CapRover auto)"
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

# Fonction pour trigger CapRover rebuild
trigger_caprover_rebuild() {
  local site=$1
  local app_name="dd-$site"
  
  if [ -z "$CAPROVER_TOKEN" ]; then
    return 0
  fi
  
  echo "   ⚡ Trigger rebuild CapRover..."
  
  response=$(curl -s -X POST "$CAPROVER_URL/api/v2/user/apps/webhooks/triggerbuild" \
    -H "Content-Type: application/json" \
    -H "x-captain-auth: $CAPROVER_TOKEN" \
    -d "{\"appName\": \"$app_name\", \"branchToPull\": \"main\"}" \
    2>&1 || echo "error")
  
  if echo "$response" | grep -q "error"; then
    echo "   ❌ Erreur API CapRover"
  elif echo "$response" | grep -q "\"status\":200"; then
    echo "   ✅ Rebuild déclenché"
  else
    echo "   ⚠️  Réponse inattendue"
  fi
}

for site in "${SITES[@]}"; do
  echo "📦 $site"
  
  # Vérifier que le dossier existe
  if [ ! -d "sites/$site" ]; then
    echo "   ⚠️  Dossier sites/$site introuvable, on saute"
    echo ""
    continue
  fi
  
  cd "sites/$site"
  
  # Init git si besoin
  if [ ! -d .git ]; then
    echo "   🔧 Init repo Git..."
    git init
    git branch -M main
  fi
  
  # Configurer remote origin
  if git remote | grep -q '^origin$'; then
    git remote set-url origin "https://github.com/gdetaisne/dd-$site.git"
  else
    git remote add origin "https://github.com/gdetaisne/dd-$site.git"
  fi
  
  # Vérifier s'il y a des changements
  if git diff --quiet && git diff --cached --quiet; then
    echo "   ℹ️  Aucun changement à committer"
  else
    # Commit
    git add -A
    git commit -m "feat: Update $site $(date '+%Y-%m-%d %H:%M')

- Optimisation metadata CTR
- Corrections villes hardcodées → cityData dynamique
- Améliorations SEO" 2>&1 | grep -v "nothing to commit" || true
  fi
  
  # Push vers GitHub
  echo "   📤 Push vers GitHub (dd-$site)..."
  git push origin main 2>&1 | grep -v "Everything up-to-date" || echo "   ✅ Poussé"
  
  # Trigger CapRover si --force-deploy
  if [ "$FORCE_DEPLOY" = "1" ]; then
    trigger_caprover_rebuild "$site"
  fi
  
  cd ../..
  echo ""
done

echo "═══════════════════════════════════════"
echo ""
echo "✅ TOUS LES SITES POUSSÉS SUR GITHUB !"
echo ""

if [ "$FORCE_DEPLOY" = "1" ] && [ -n "$CAPROVER_TOKEN" ]; then
  echo "⚡ Rebuilds CapRover déclenchés"
  echo ""
  echo "⏱️  Durée estimée : ~3-5 min par site (~45 min total)"
  echo "📊 Monitoring : $CAPROVER_URL"
else
  echo "🔄 Webhook GitHub → CapRover déploiera automatiquement (~3-5 min par site)"
fi

echo ""
echo "🔗 Repos GitHub :"
for site in "${SITES[@]}"; do
  echo "   • https://github.com/gdetaisne/dd-$site"
done
echo ""

