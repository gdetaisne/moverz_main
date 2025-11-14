#!/bin/bash

# Test des Partenaires - 4 villes en local
# Vérifie que chaque ville a ses propres partenaires

echo "🧪 TEST PARTENAIRES - 4 VILLES"
echo "==============================="
echo ""

echo "✅ Nice (localhost:3001)"
echo "   Premier partenaire :"
grep -A 5 'const partners = \[' /Users/guillaumestehelin/moverz_main-4/sites/nice/app/partenaires/page.tsx | grep 'name:' | head -1
echo ""

echo "✅ Lyon (localhost:3002)"
echo "   Premier partenaire :"
grep -A 5 'const partners = \[' /Users/guillaumestehelin/moverz_main-4/sites/lyon/app/partenaires/page.tsx | grep 'name:' | head -1
echo ""

echo "✅ Montpellier (localhost:3003)"
echo "   Premier partenaire :"
grep -A 5 'const partners = \[' /Users/guillaumestehelin/moverz_main-4/sites/montpellier/app/partenaires/page.tsx | grep 'name:' | head -1
echo ""

echo "✅ Strasbourg (localhost:3004)"
echo "   Premier partenaire :"
grep -A 5 'const partners = \[' /Users/guillaumestehelin/moverz_main-4/sites/strasbourg/app/partenaires/page.tsx | grep 'name:' | head -1
echo ""

echo "==============================="
echo "📊 VÉRIFICATION CROSS-CONTAMINATION"
echo "==============================="
echo ""

# Check si "Marseille" apparaît dans les 4 sites
echo "🔍 Recherche 'Marseille' :"
for city in nice lyon montpellier strasbourg; do
  count=$(grep -i "marseille" /Users/guillaumestehelin/moverz_main-4/sites/$city/app/partenaires/page.tsx 2>/dev/null | wc -l | tr -d ' ')
  if [ "$count" -gt 0 ] && [ "$city" != "montpellier" ]; then
    echo "  ❌ $city : $count occurrences (BUG!)"
  else
    echo "  ✅ $city : OK"
  fi
done

echo ""
echo "==============================="
echo "✅ TESTS TERMINÉS"
echo "==============================="

