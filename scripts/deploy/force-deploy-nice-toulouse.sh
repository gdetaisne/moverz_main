#!/usr/bin/env bash

# Script pour forcer le deploy CapRover de Nice + Toulouse (validation crawler)
# Usage: ./force-deploy-nice-toulouse.sh

set -e

echo "🚀 FORCE DEPLOY CAPROVER - Nice + Toulouse"
echo "════════════════════════════════════════"
echo ""
echo "🎯 OBJECTIF: Validation crawler après corrections 404"
echo ""

# Configuration CapRover
CAPROVER_URL="${CAPROVER_URL:-https://captain.gslv.cloud}"
CAPROVER_TOKEN="${CAPROVER_TOKEN}"

if [ -z "$CAPROVER_TOKEN" ]; then
  echo "⚠️  CAPROVER_TOKEN non défini"
  echo ""
  echo "📝 Pour configurer le token:"
  echo "   1. Va sur: https://captain.gslv.cloud"
  echo "   2. Settings → Access Token"
  echo "   3. Copie le token"
  echo "   4. Export: export CAPROVER_TOKEN='ton_token'"
  echo ""
  echo "💡 ALTERNATIVE - Redéploiement manuel:"
  echo ""
  echo "   🔹 NICE:"
  echo "      1. https://captain.gslv.cloud/apps/details/dd-nice"
  echo "      2. Deployment → Force Rebuild"
  echo "      3. Attendre 3-5 min"
  echo ""
  echo "   🔹 TOULOUSE:"
  echo "      1. https://captain.gslv.cloud/apps/details/dd-toulouse"
  echo "      2. Deployment → Force Rebuild"
  echo "      3. Attendre 3-5 min"
  echo ""
  exit 1
fi

# Fonction pour déclencher un redéploiement
trigger_deployment() {
  local app_name=$1
  local city=$2
  
  echo "📦 Déploiement $city ($app_name)"
  echo "   → Appel API CapRover..."
  
  response=$(curl -s -X POST "$CAPROVER_URL/api/v2/user/apps/webhooks/triggerbuild" \
    -H "Content-Type: application/json" \
    -H "x-captain-auth: $CAPROVER_TOKEN" \
    -d "{\"appName\": \"$app_name\", \"branchToPull\": \"main\"}" \
    2>&1 || echo "error")
  
  if echo "$response" | grep -q "error"; then
    echo "   ❌ Erreur API"
    echo "   → Redéployer manuellement: $CAPROVER_URL/apps/details/$app_name"
    return 1
  elif echo "$response" | grep -q '"status":200'; then
    echo "   ✅ Déploiement déclenché avec succès"
    return 0
  else
    echo "   ⚠️  Réponse inattendue: $response"
    echo "   → Vérifier manuellement: $CAPROVER_URL/apps/details/$app_name"
    return 1
  fi
}

echo "🎯 DÉPLOIEMENT DES 2 SITES"
echo "══════════════════════════"
echo ""

# Deploy Nice (gros volume 404 identifiés)
trigger_deployment "dd-nice" "Nice"
echo ""

# Deploy Toulouse (référence stable)
trigger_deployment "dd-toulouse" "Toulouse"
echo ""

echo "════════════════════════════════════════"
echo ""
echo "✅ DÉPLOIEMENTS DÉCLENCHÉS !"
echo ""
echo "⏱️  Durée estimée: 3-5 min par site"
echo ""
echo "📊 Suivi en temps réel:"
echo "   Nice     : $CAPROVER_URL/apps/details/dd-nice"
echo "   Toulouse : $CAPROVER_URL/apps/details/dd-toulouse"
echo ""
echo "🧪 APRÈS DÉPLOIEMENT - Tests à faire:"
echo ""
echo "   1. Vérifier pages corrigées:"
echo "      → https://devis-demenageur-nice.fr/services/demenagement-economique-nice/"
echo "      → https://devis-demenageur-nice.fr/nice-vers-paris/"
echo "      → https://devis-demenageur-nice.fr/faq/"
echo ""
echo "   2. Lancer crawler 404 sur Nice:"
echo "      → Scanner externe pour mesurer impact"
echo "      → Comparer avant (97 erreurs) vs après"
echo ""
echo "   3. Si OK Nice → Deploy 9 autres villes:"
echo "      → ./scripts/deploy/redeploy-all-sites.sh"
echo ""
echo "🎉 Bonne validation !"

