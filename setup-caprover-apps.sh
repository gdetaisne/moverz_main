#!/bin/bash

# Script pour configurer chaque app CapRover individuellement
# Usage: ./setup-caprover-apps.sh

echo "🔧 CONFIGURATION CAPROVER - APPROCHE MONOREPO"
echo "=============================================="
echo ""

# Liste des apps et leurs chemins
declare -A APPS=(
    ["dd-bordeaux"]="sites/bordeaux"
    ["dd-marseille"]="sites/marseille"
    ["dd-lyon"]="sites/lyon"
    ["dd-toulouse"]="sites/toulouse"
    ["dd-nice"]="sites/nice"
    ["dd-nantes"]="sites/nantes"
    ["dd-strasbourg"]="sites/strasbourg"
    ["dd-lille"]="sites/lille"
    ["dd-rennes"]="sites/rennes"
    ["dd-rouen"]="sites/rouen"
)

echo "📋 CONFIGURATION POUR CHAQUE APP :"
echo ""

for app in "${!APPS[@]}"; do
    site_path="${APPS[$app]}"
    echo "🎯 App: $app"
    echo "   Repository: gdetaisne/moverz_main"
    echo "   Branch: main"
    echo "   Username: gdetaisne"
    echo "   Password: [ton token GitHub]"
    echo "   Captain Definition Path: $site_path/captain-definition"
    echo ""
done

echo "💡 IMPORTANT :"
echo "- Chaque app utilise son propre captain-definition"
echo "- Chaque captain-definition pointe vers son propre Dockerfile"
echo "- Permet le déploiement sélectif par app"
echo ""
