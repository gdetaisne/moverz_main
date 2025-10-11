#!/usr/bin/env bash

# Script pour redéployer tous les sites après les corrections des sitemaps
# Usage: ./redeploy-all-sites.sh

set -e

echo "🚀 REDÉPLOIEMENT DE TOUS LES SITES"
echo "===================================="
echo ""
echo "📋 Raison: Correction des domaines sitemap pour Google Search Console"
echo ""

# Configuration CapRover
CAPROVER_URL="${CAPROVER_URL:-https://captain.gslv.cloud}"
CAPROVER_TOKEN="${CAPROVER_TOKEN}"

if [ -z "$CAPROVER_TOKEN" ]; then
  echo "⚠️  CAPROVER_TOKEN non défini"
  echo ""
  echo "📝 Pour configurer le token:"
  echo "   1. Va sur ton CapRover: $CAPROVER_URL"
  echo "   2. Settings → Access Token"
  echo "   3. Copie le token"
  echo "   4. Export: export CAPROVER_TOKEN='ton_token'"
  echo ""
  echo "💡 Alternative: Redéploiement manuel via l'interface CapRover"
  echo ""
fi

# Fonction pour déclencher un redéploiement
trigger_deployment() {
  local app_name=$1
  local city=$2
  
  echo "📦 $app_name ($city)"
  
  if [ -n "$CAPROVER_TOKEN" ]; then
    echo "   → Déclenchement via API CapRover..."
    
    response=$(curl -s -X POST "$CAPROVER_URL/api/v2/user/apps/webhooks/triggerbuild" \
      -H "Content-Type: application/json" \
      -H "x-captain-auth: $CAPROVER_TOKEN" \
      -d "{\"appName\": \"$app_name\", \"branchToPull\": \"main\"}" \
      2>&1 || echo "error")
    
    if echo "$response" | grep -q "error"; then
      echo "   ❌ Erreur API - Redéployer manuellement"
    elif echo "$response" | grep -q "\"status\":200"; then
      echo "   ✅ Déploiement déclenché avec succès"
    else
      echo "   ⚠️  Réponse: $response"
      echo "   → Redéployer manuellement dans CapRover"
    fi
  else
    echo "   ⏭️  Passer (pas de token) - Redéployer manuellement"
  fi
  
  echo ""
}

# Sites prioritaires (avec contenu)
echo "🎯 SITES PRIORITAIRES (avec piliers créés)"
echo "=========================================="
echo ""

trigger_deployment "dd-marseille" "Marseille"
trigger_deployment "dd-lyon" "Lyon"
trigger_deployment "dd-montpellier" "Montpellier"
trigger_deployment "dd-bordeaux" "Bordeaux"

echo ""
echo "🔄 SITES EN COURS (piliers en création)"
echo "========================================"
echo ""

trigger_deployment "dd-nantes" "Nantes"
trigger_deployment "dd-lille" "Lille"
trigger_deployment "dd-nice" "Nice"

echo ""
echo "⏳ AUTRES SITES"
echo "==============="
echo ""

trigger_deployment "dd-strasbourg" "Strasbourg"
trigger_deployment "dd-rouen" "Rouen"
trigger_deployment "dd-rennes" "Rennes"
trigger_deployment "dd-toulouse" "Toulouse"

echo ""
echo "═══════════════════════════════════════"
echo ""

if [ -n "$CAPROVER_TOKEN" ]; then
  echo "✅ REDÉPLOIEMENTS DÉCLENCHÉS !"
  echo ""
  echo "⏱️  Durée estimée par site: 2-5 minutes"
  echo "⏱️  Temps total: ~30-60 minutes pour tous"
  echo ""
  echo "📊 Suivi en temps réel:"
  echo "   → Ouvre CapRover: $CAPROVER_URL"
  echo "   → Onglet 'Apps' → Chaque app → 'Deployment'"
  echo ""
else
  echo "📋 REDÉPLOIEMENT MANUEL REQUIS"
  echo ""
  echo "Pour chaque site, dans CapRover:"
  echo "   1. Ouvre: $CAPROVER_URL"
  echo "   2. Apps → [nom-app] → Deployment"
  echo "   3. Clique 'Force Rebuild'"
  echo ""
  echo "🎯 Sites prioritaires à redéployer EN PREMIER:"
  echo "   • dd-marseille (10 piliers)"
  echo "   • dd-lyon (10 piliers)"
  echo "   • dd-montpellier (10 piliers)"
  echo "   • dd-bordeaux (143 articles)"
  echo ""
fi

echo "🗺️  APRÈS REDÉPLOIEMENT:"
echo "   1. Tester les sitemaps:"
echo "      → https://devis-demenageur-marseille.fr/sitemap.xml"
echo "      → https://devis-demenageur-lyon.fr/sitemap.xml"
echo "      → https://devis-demenageur-montpellier.fr/sitemap.xml"
echo "      → https://www.bordeaux-demenageur.fr/sitemap.xml"
echo ""
echo "   2. Soumettre dans Google Search Console:"
echo "      → https://search.google.com/search-console"
echo "      → Sitemaps → Ajouter 'sitemap.xml'"
echo ""
echo "🎉 Bonne chance avec les redéploiements !"

