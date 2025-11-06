#!/bin/bash

# Script pour forcer le rebuild CapRover via CLI (sans token API)
# Usage: ./scripts/deploy/force-rebuild-caprover.sh [nantes|rennes|lyon|bordeaux|all]

set -e

CAPROVER_URL="${CAPROVER_URL:-https://captain.gslv.cloud}"
SITE="${1:-}"

if [ -z "$SITE" ]; then
  echo "❌ Usage: $0 <site>"
  echo ""
  echo "Sites disponibles:"
  echo "  nantes, rennes, lyon, bordeaux"
  echo "  all (pour tous les sites modifiés)"
  exit 1
fi

# Vérifier si caprover CLI est installé
if ! command -v caprover &> /dev/null; then
  echo "❌ CapRover CLI non installé"
  echo "   Installation: npm install -g caprover"
  exit 1
fi

echo "🚀 FORCE REBUILD CAPROVER VIA CLI"
echo "=================================="
echo ""

# Fonction pour rebuild une app
rebuild_app() {
  local site=$1
  local app_name="dd-$site"
  
  echo "📦 Rebuild $app_name..."
  
  # Utiliser caprover api pour appeler l'endpoint triggerbuild
  response=$(caprover api \
    -u "$CAPROVER_URL" \
    -t "/api/v2/user/apps/webhooks/triggerbuild" \
    -m POST \
    -d "{\"appName\": \"$app_name\", \"branchToPull\": \"main\"}" \
    2>&1)
  
  if echo "$response" | grep -q "\"status\":200" || echo "$response" | grep -q "success"; then
    echo "   ✅ Rebuild déclenché pour $app_name"
    return 0
  elif echo "$response" | grep -q "Authentication\|password\|login"; then
    echo "   ⚠️  Authentification requise"
    echo "   💡 Essaie: caprover login -h $CAPROVER_URL"
    return 1
  else
    echo "   ⚠️  Réponse: $response"
    return 1
  fi
}

# Rebuild selon paramètre
if [ "$SITE" = "all" ]; then
  echo "🎯 Rebuild des 4 sites modifiés..."
  echo ""
  rebuild_app "nantes"
  echo ""
  rebuild_app "rennes"
  echo ""
  rebuild_app "lyon"
  echo ""
  rebuild_app "bordeaux"
else
  rebuild_app "$SITE"
fi

echo ""
echo "⏱️  Durée estimée : ~3-5 min par site"
echo "📊 Monitoring : $CAPROVER_URL"

