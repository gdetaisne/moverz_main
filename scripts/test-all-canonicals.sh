#!/bin/bash
# Script de test des canonicals pour les 11 villes
# Usage: ./scripts/test-all-canonicals.sh

echo "🧪 TEST PRODUCTION — 11 VILLES"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Tableau associatif: ville → URL
declare -a CITIES=(
  "Marseille:https://devis-demenageur-marseille.fr"
  "Nice:https://devis-demenageur-nice.fr"
  "Toulouse:https://devis-demenageur-toulousain.fr"
  "Lyon:https://devis-demenageur-lyon.fr"
  "Bordeaux:https://www.bordeaux-demenageur.fr"
  "Nantes:https://devis-demenageur-nantes.fr"
  "Strasbourg:https://devis-demenageur-strasbourg.fr"
  "Lille:https://devis-demenageur-lille.fr"
  "Rennes:https://devis-demenageur-rennes.fr"
  "Montpellier:https://devis-demenageur-montpellier.fr"
  "Rouen:https://devis-demenageur-rouen.fr"
)

SUCCESS=0
FAILED=0

for entry in "${CITIES[@]}"; do
  IFS=: read -r city url <<< "$entry"
  
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🏙️  $city"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  
  # Test 1: Canonical Homepage
  canonical=$(curl -s --max-time 10 "$url" 2>/dev/null | grep -o '<link rel="canonical" href="[^"]*"' | head -1)
  
  if [ -z "$canonical" ]; then
    echo "❌ Canonical: ABSENT"
    FAILED=$((FAILED + 1))
  elif echo "$canonical" | grep -q '.fr/"'; then
    echo "✅ Canonical: $canonical"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "⚠️  Canonical: $canonical (PAS DE SLASH)"
    FAILED=$((FAILED + 1))
  fi
  
  # Test 2: Open Graph URL
  og=$(curl -s --max-time 10 "$url" 2>/dev/null | grep -o '<meta property="og:url" content="[^"]*"' | head -1)
  if echo "$og" | grep -q '.fr/"'; then
    echo "✅ Open Graph: OK avec slash"
  else
    echo "⚠️  Open Graph: $og"
  fi
  
  # Test 3: Redirection 308
  http_status=$(curl -I "$url/partenaires" 2>&1 | grep -E "HTTP" | head -1)
  location=$(curl -I "$url/partenaires" 2>&1 | grep -i "location:" | head -1)
  
  if echo "$http_status" | grep -q "308"; then
    echo "✅ Redirection: 308 → $location"
  else
    echo "⚠️  Redirection: $http_status"
  fi
  
  echo ""
done

echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "📊 RÉSULTATS:"
echo "   ✅ Succès: $SUCCESS/11"
echo "   ❌ Échecs: $FAILED/11"
echo ""

if [ $SUCCESS -eq 11 ]; then
  echo "╔════════════════════════════════════════════════════════════╗"
  echo "║  🎉 TOUTES LES VILLES VALIDÉES ! 🎉                       ║"
  echo "╚════════════════════════════════════════════════════════════╝"
  exit 0
else
  echo "⚠️  Certaines villes nécessitent un redéploiement CapRover"
  exit 1
fi

