#!/bin/bash

# Script pour forcer le rebuild CapRover via API curl directe (sans CLI)
# Usage: 
#   ./scripts/deploy/force-rebuild-caprover-direct.sh
#   ./scripts/deploy/force-rebuild-caprover-direct.sh 'ton-mot-de-passe'
#   CAPROVER_PASSWORD='ton-mot-de-passe' ./scripts/deploy/force-rebuild-caprover-direct.sh

set -e

CAPROVER_URL="${CAPROVER_URL:-https://captain.gslv.cloud}"

echo "🚀 FORCE REBUILD CAPROVER VIA API DIRECTE"
echo "=========================================="
echo ""

# Utiliser le mot de passe en argument ou variable d'environnement
if [ -n "$1" ]; then
  CAPROVER_PASSWORD="$1"
elif [ -z "$CAPROVER_PASSWORD" ]; then
  echo "🔐 Mot de passe CapRover nécessaire"
  echo ""
  echo "Usage:"
  echo "   $0 'ton-mot-de-passe'"
  echo ""
  echo "OU:"
  echo "   CAPROVER_PASSWORD='ton-mot-de-passe' $0"
  echo ""
  read -sp "CapRover password: " CAPROVER_PASSWORD
  echo ""
  echo ""
fi

# Liste des apps à rebuild - TOUS LES 11 SITES
APPS_TO_REBUILD=(
  "dd-marseille"
  "dd-lyon"
  "dd-montpellier"
  "dd-bordeaux"
  "dd-nantes"
  "dd-lille"
  "dd-nice"
  "dd-strasbourg"
  "dd-rouen"
  "dd-rennes"
  "dd-toulouse"
)

echo "📦 Apps à rebuild:"
for app in "${APPS_TO_REBUILD[@]}"; do
  echo "   - $app"
done
echo ""

# Fonction pour obtenir le token API (nécessite login)
get_api_token() {
  # Appel API login pour obtenir le token
  response=$(curl -s -k -X POST "$CAPROVER_URL/api/v2/login" \
    -H "Content-Type: application/json" \
    -d "{\"password\": \"$CAPROVER_PASSWORD\"}" \
    2>&1)
  
  # Debug (optionnel)
  # echo "Response: $response" >&2
  
  # Extraire le token (format peut varier selon version CapRover)
  token=$(echo "$response" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
  
  if [ -z "$token" ]; then
    # Essayer un autre format de réponse
    token=$(echo "$response" | grep -o '"token":\s*"[^"]*' | sed 's/.*"token":\s*"\([^"]*\)".*/\1/')
  fi
  
  if [ -n "$token" ]; then
    echo "$token"
    return 0
  else
    echo "❌ Erreur login - Token non trouvé dans: $response" >&2
    return 1
  fi
}

# Fonction pour rebuild une app
rebuild_app() {
  local app_name=$1
  local token=$2
  
  echo "📦 Rebuild $app_name..."
  
  # Utiliser l'endpoint /redeploy (correct pour CapRover v1.14)
  response=$(curl -s -k -X POST "$CAPROVER_URL/api/v2/user/apps/appData/$app_name/redeploy" \
    -H "Content-Type: application/json" \
    -H "x-captain-auth: $token" \
    2>&1)
  
  # Vérifier la réponse
  if echo "$response" | grep -q "\"status\":100\|200\|success"; then
    echo "   ✅ Rebuild déclenché"
    return 0
  elif echo "$response" | grep -q "unauthorized\|authentication\|401"; then
    echo "   ❌ Token invalide"
    return 1
  elif echo "$response" | grep -q "not found\|404"; then
    echo "   ⚠️  App non trouvée ($app_name)"
    return 1
  else
    echo "   ⚠️  Erreur: $response"
    return 1
  fi
}

# Obtenir le token
echo "🔐 Authentification..."
API_TOKEN=$(get_api_token)

if [ -z "$API_TOKEN" ]; then
  echo "❌ Échec authentification"
  exit 1
fi

echo "✅ Token obtenu"
echo ""

# Rebuild toutes les apps
SUCCESS=0
FAILED=0

for app in "${APPS_TO_REBUILD[@]}"; do
  if rebuild_app "$app" "$API_TOKEN"; then
    ((SUCCESS++))
  else
    ((FAILED++))
  fi
  echo ""
  sleep 1
done

echo "═══════════════════════════════════════"
echo "✅ Rebuilds déclenchés: $SUCCESS"
if [ $FAILED -gt 0 ]; then
  echo "❌ Échecs: $FAILED"
fi
echo ""
echo "⏱️  Durée estimée : ~3-5 min par app"
echo "📊 Monitoring : $CAPROVER_URL"

