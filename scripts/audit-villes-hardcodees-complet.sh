#!/bin/bash

# Audit Complet Villes Hardcodées - Build + Scan
# Vérifie Headers, Partenaires, Zones desservies, Home, Blog

set -e

echo "🔍 AUDIT COMPLET VILLES HARDCODÉES"
echo "===================================="
echo ""

CITIES=("nice" "lyon" "marseille" "toulouse" "bordeaux" "lille" "nantes" "strasbourg" "rouen" "rennes" "montpellier")
ERRORS=0

# Fonction de scan
scan_hardcoded() {
  local city=$1
  local file=$2
  local section=$3
  
  # Liste des autres villes (pas la ville courante)
  local other_cities=("nice" "lyon" "marseille" "toulouse" "bordeaux" "lille" "nantes" "strasbourg" "rouen" "rennes" "montpellier")
  
  for other in "${other_cities[@]}"; do
    if [ "$other" != "$city" ]; then
      # Chercher la ville avec majuscule
      local capitalized="$(tr '[:lower:]' '[:upper:]' <<< ${other:0:1})${other:1}"
      
      # Scanner plusieurs patterns
      if grep -qi "à $capitalized\|$capitalized Express\|Déménageurs.*$capitalized\|/$other/\|quartiers-$other" "$file" 2>/dev/null; then
        echo "  ❌ $section : '$other' ou '$capitalized' trouvé dans $city"
        ((ERRORS++))
        return 1
      fi
    fi
  done
  
  return 0
}

echo "📦 PHASE 1 : Build tous les sites"
echo "=================================="
echo ""

BUILD_ERRORS=0

for city in "${CITIES[@]}"; do
  echo "🔨 Build $city..."
  
  if [ ! -d "sites/$city" ]; then
    echo "  ⚠️  Dossier introuvable, skip"
    continue
  fi
  
  cd sites/$city
  
  # Install si nécessaire
  if [ ! -d "node_modules" ]; then
    echo "  📦 Installation dépendances..."
    npm install --silent > /dev/null 2>&1
  fi
  
  # Build
  if npm run build > /tmp/build_${city}.log 2>&1; then
    echo "  ✅ Build OK"
  else
    echo "  ❌ Build FAILED"
    echo "  📄 Erreur : $(tail -5 /tmp/build_${city}.log)"
    ((BUILD_ERRORS++))
  fi
  
  cd ../..
  echo ""
done

echo ""
echo "📊 Résultat builds : $((11 - BUILD_ERRORS))/11 réussis"
echo ""

if [ $BUILD_ERRORS -gt 0 ]; then
  echo "⚠️  $BUILD_ERRORS builds échoués, arrêt de l'audit"
  exit 1
fi

echo ""
echo "🔍 PHASE 2 : Scan villes hardcodées"
echo "===================================="
echo ""

for city in "${CITIES[@]}"; do
  echo "🔍 Scan $city..."
  
  if [ ! -d "sites/$city" ]; then
    echo "  ⚠️  Skip"
    continue
  fi
  
  # 1. Headers
  if [ -f "sites/$city/components/Header.tsx" ]; then
    scan_hardcoded "$city" "sites/$city/components/Header.tsx" "Header" || true
  fi
  
  # 2. Partenaires
  if [ -f "sites/$city/app/partenaires/page.tsx" ]; then
    scan_hardcoded "$city" "sites/$city/app/partenaires/page.tsx" "Partenaires" || true
  fi
  
  # 3. Home
  if [ -f "sites/$city/app/page.tsx" ]; then
    scan_hardcoded "$city" "sites/$city/app/page.tsx" "Home" || true
  fi
  
  # 4. Zones desservies (quartiers)
  if [ -f "sites/$city/app/quartiers-$city/page.tsx" ]; then
    scan_hardcoded "$city" "sites/$city/app/quartiers-$city/page.tsx" "Zones" || true
  fi
  
  # 5. Blog
  if [ -f "sites/$city/app/blog/page.tsx" ]; then
    scan_hardcoded "$city" "sites/$city/app/blog/page.tsx" "Blog" || true
  fi
  
  echo ""
done

echo ""
echo "=========================================="
echo "📊 RÉSULTAT FINAL"
echo "=========================================="
echo ""
echo "Builds : $((11 - BUILD_ERRORS))/11 ✅"
echo "Erreurs villes hardcodées : $ERRORS"
echo ""

if [ $ERRORS -eq 0 ]; then
  echo "✅ AUCUNE VILLE HARDCODÉE DÉTECTÉE !"
  echo "🎉 Tous les sites sont propres !"
  exit 0
else
  echo "❌ $ERRORS erreurs détectées"
  echo "⚠️  Corriger les villes hardcodées avant de continuer"
  exit 1
fi

