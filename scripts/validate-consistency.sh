#!/bin/bash

# Script de validation de cohérence multi-sites
# Détecte les modifications directes aux fichiers qui doivent être synchronisés
# Usage: ./scripts/validate-consistency.sh

set -e

echo "🔍 VALIDATION DE COHÉRENCE MULTI-SITES"
echo "======================================"
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

ERRORS=0

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "📋 Vérification des fichiers de configuration..."
echo ""

# 1. Vérifier tsconfig.json
echo "1️⃣  Vérification tsconfig.json"
UNIQUE_TSCONFIG=$(md5 -q sites/*/tsconfig.json | sort -u | wc -l | tr -d ' ')
if [ "$UNIQUE_TSCONFIG" = "1" ]; then
  echo -e "   ${GREEN}✅ tsconfig.json : Tous identiques${NC}"
else
  echo -e "   ${RED}❌ tsconfig.json : $UNIQUE_TSCONFIG versions différentes${NC}"
  echo -e "   ${YELLOW}→ Correction : ./scripts/sync-config-files.sh${NC}"
  ERRORS=$((ERRORS + 1))
  
  # Afficher les différences
  for city in "${CITIES[@]}"; do
    hash=$(md5 -q "sites/$city/tsconfig.json")
    echo "      $city: $hash"
  done
fi
echo ""

# 2. Vérifier Dockerfile (hors header avec {{CITY}})
echo "2️⃣  Vérification Dockerfile"
UNIQUE_DOCKER=$(for city in "${CITIES[@]}"; do
  tail -n +2 "sites/$city/Dockerfile" | md5 -q
done | sort -u | wc -l | tr -d ' ')

if [ "$UNIQUE_DOCKER" = "1" ]; then
  echo -e "   ${GREEN}✅ Dockerfile : Tous identiques (hors header)${NC}"
else
  echo -e "   ${RED}❌ Dockerfile : $UNIQUE_DOCKER versions différentes${NC}"
  echo -e "   ${YELLOW}→ Correction : ./scripts/sync-config-files.sh${NC}"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# 3. Vérifier .dockerignore
echo "3️⃣  Vérification .dockerignore"
UNIQUE_DOCKERIGNORE=$(md5 -q sites/*/.dockerignore | sort -u | wc -l | tr -d ' ')
if [ "$UNIQUE_DOCKERIGNORE" = "1" ]; then
  echo -e "   ${GREEN}✅ .dockerignore : Tous identiques${NC}"
else
  echo -e "   ${RED}❌ .dockerignore : $UNIQUE_DOCKERIGNORE versions différentes${NC}"
  echo -e "   ${YELLOW}→ Correction : ./scripts/sync-config-files.sh${NC}"
  ERRORS=$((ERRORS + 1))
fi
echo ""

# 4. Vérifier .eslintrc.json
echo "4️⃣  Vérification .eslintrc.json"
UNIQUE_ESLINT=$(md5 -q sites/*/.eslintrc.json | sort -u | wc -l | tr -d ' ')
if [ "$UNIQUE_ESLINT" = "1" ]; then
  echo -e "   ${GREEN}✅ .eslintrc.json : Tous identiques${NC}"
else
  echo -e "   ${RED}❌ .eslintrc.json : $UNIQUE_ESLINT versions différentes${NC}"
  echo -e "   ${YELLOW}→ Correction : ./scripts/sync-config-files.sh${NC}"
  ERRORS=$((ERRORS + 1))
fi
echo ""

echo "📋 Vérification des composants partagés..."
echo ""

# 5. Vérifier composants UX
SHARED_COMPONENTS=(
  "Hero.tsx"
  "HowItWorks.tsx"
  "PricingPreview.tsx"
  "StickyCTA.tsx"
  "NeighborhoodsIndex.tsx"
  "CtaPrimary.tsx"
  "LeadForm.tsx"
)

COMP_ERRORS=0
for comp in "${SHARED_COMPONENTS[@]}"; do
  if [ -f "components/$comp" ]; then
    UNIQUE=$(md5 -q "components/$comp" sites/*/components/$comp 2>/dev/null | sort -u | wc -l | tr -d ' ')
    if [ "$UNIQUE" = "1" ]; then
      echo -e "   ${GREEN}✅ $comp : Tous identiques${NC}"
    else
      echo -e "   ${RED}❌ $comp : $UNIQUE versions différentes${NC}"
      echo -e "   ${YELLOW}→ Correction : ./scripts/sync-components.sh${NC}"
      COMP_ERRORS=$((COMP_ERRORS + 1))
      ERRORS=$((ERRORS + 1))
    fi
  fi
done

if [ "$COMP_ERRORS" -gt 0 ]; then
  echo ""
fi

# 6. Vérifier globals.css
echo "5️⃣  Vérification app/globals.css"
if [ -f "app/globals.css" ]; then
  UNIQUE_CSS=$(md5 -q "app/globals.css" sites/*/app/globals.css 2>/dev/null | sort -u | wc -l | tr -d ' ')
  if [ "$UNIQUE_CSS" = "1" ]; then
    echo -e "   ${GREEN}✅ globals.css : Tous identiques${NC}"
  else
    echo -e "   ${RED}❌ globals.css : $UNIQUE_CSS versions différentes${NC}"
    echo -e "   ${YELLOW}→ Correction : ./scripts/sync-components.sh${NC}"
    ERRORS=$((ERRORS + 1))
  fi
fi
echo ""

# 7. Vérifier les modifications Git non commitées sur les sites
echo "📋 Vérification des modifications locales..."
echo ""

MODIFIED_CONFIGS=()
for city in "${CITIES[@]}"; do
  if git diff --quiet sites/$city/tsconfig.json sites/$city/Dockerfile sites/$city/.dockerignore sites/$city/.eslintrc.json 2>/dev/null; then
    :
  else
    MODIFIED_CONFIGS+=("$city")
  fi
done

if [ ${#MODIFIED_CONFIGS[@]} -eq 0 ]; then
  echo -e "   ${GREEN}✅ Aucune modification locale détectée${NC}"
else
  echo -e "   ${YELLOW}⚠️  Modifications locales détectées sur :${NC}"
  for city in "${MODIFIED_CONFIGS[@]}"; do
    echo "      - $city"
  done
  echo ""
  echo -e "   ${YELLOW}→ Ces modifications seront écrasées par sync-config-files.sh${NC}"
  echo -e "   ${YELLOW}→ Si intentionnelles : modifier .templates/ puis sync${NC}"
fi
echo ""

# Résultat final
echo "═══════════════════════════════════════"
echo ""

if [ "$ERRORS" -eq 0 ]; then
  echo -e "${GREEN}✅ VALIDATION RÉUSSIE${NC}"
  echo ""
  echo "Tous les fichiers sont cohérents entre les 11 sites."
  exit 0
else
  echo -e "${RED}❌ VALIDATION ÉCHOUÉE${NC}"
  echo ""
  echo -e "${RED}$ERRORS problème(s) de cohérence détecté(s)${NC}"
  echo ""
  echo "🔧 Actions correctives :"
  echo ""
  echo "   1. Pour configs techniques (tsconfig, Dockerfile, etc.) :"
  echo "      ./scripts/sync-config-files.sh"
  echo ""
  echo "   2. Pour composants UX (Hero, globals.css, etc.) :"
  echo "      ./scripts/sync-components.sh"
  echo ""
  echo "   3. Vérifier à nouveau :"
  echo "      ./scripts/validate-consistency.sh"
  echo ""
  echo "⚠️  RAPPEL : Ne JAMAIS modifier directement un site"
  echo "   Toujours passer par .templates/ ou /components/ puis sync"
  echo ""
  exit 1
fi

