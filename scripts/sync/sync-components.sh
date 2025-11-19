#!/bin/bash

# Script de synchronisation des composants partagés depuis le template vers les sites
# Usage: ./scripts/sync-components.sh

set -e

echo "🔄 SYNCHRONISATION DES COMPOSANTS PARTAGÉS"
echo "=========================================="
echo ""

CITIES=(
  "marseille"
  "toulouse"
  "lyon"
  "bordeaux"
  "nantes"
  "lille"
  "nice"
  "strasbourg"
  "rouen"
  "rennes"
  "montpellier"
)

# Composants partagés (identiques sur tous les sites)
SHARED_COMPONENTS=(
  "Hero.tsx"
  "HowItWorks.tsx"
  "PricingPreview.tsx"
  "StickyCTA.tsx"
  "NeighborhoodsIndex.tsx"
  "CtaPrimary.tsx"
  "LeadForm.tsx"
  "ComparisonSection.tsx"
  "ProofStrip.tsx"
  "Testimonials.tsx"
)

echo "📋 Composants à synchroniser : ${#SHARED_COMPONENTS[@]}"
echo "🌍 Sites cibles : ${#CITIES[@]}"
echo ""

for city in "${CITIES[@]}"; do
  echo "📦 $city"
  
  # Sync composants partagés
  for comp in "${SHARED_COMPONENTS[@]}"; do
    if [ -f "components/$comp" ]; then
      cp "components/$comp" "sites/$city/components/$comp"
      echo "   ✅ $comp synchronisé"
    else
      echo "   ⚠️  $comp introuvable dans template"
    fi
  done
  
  # Sync CSS global COMPLET
  if [ -f "app/globals.css" ]; then
    cp "app/globals.css" "sites/$city/app/globals.css"
    echo "   ✅ globals.css synchronisé"
  fi
  
  echo ""
done

echo "═══════════════════════════════════════"
echo ""
echo "🔍 VÉRIFICATION MD5"
echo ""

# Vérifier l'homogénéité de chaque composant
for comp in "${SHARED_COMPONENTS[@]}"; do
  if [ -f "components/$comp" ]; then
    UNIQUE_HASHES=$(md5 -q "components/$comp" "sites/"*"/components/$comp" 2>/dev/null | sort -u | wc -l | tr -d ' ')
    if [ "$UNIQUE_HASHES" = "1" ]; then
      echo "✅ $comp : Tous identiques"
    else
      echo "❌ $comp : $UNIQUE_HASHES versions différentes"
    fi
  fi
done

# Vérifier globals.css
UNIQUE_CSS=$(md5 -q "app/globals.css" "sites/"*"/app/globals.css" 2>/dev/null | sort -u | wc -l | tr -d ' ')
if [ "$UNIQUE_CSS" = "1" ]; then
  echo "✅ globals.css : Tous identiques"
else
  echo "❌ globals.css : $UNIQUE_CSS versions différentes"
fi

echo ""
echo "✨ SYNCHRONISATION TERMINÉE"
echo ""
echo "📝 Prochaines étapes :"
echo "   1. Vérifier les changements : git status"
echo "   2. Tester localement : cd sites/toulouse && pnpm dev"
echo "   3. Commit : git add -A && git commit -m 'sync: composants partagés (11 villes)'"
echo "   4. Déployer : ./scripts/deploy/push-main.sh && ./scripts/deploy/push-all-sites.sh"
echo ""

