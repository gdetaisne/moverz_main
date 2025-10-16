#!/bin/bash

# Script pour corriger les majuscules des titles dans layout.tsx

set -e

echo "🔧 CORRECTION MAJUSCULES DES TITLES"
echo "===================================="
echo ""

# Sites à corriger (ceux qui ont le problème)
SITES=("nantes:Nantes" "nice:Nice" "lyon:Lyon" "rennes:Rennes" "lille:Lille" "bordeaux:Bordeaux" "toulouse:Toulouse" "rouen:Rouen" "strasbourg:Strasbourg")

for site_info in "${SITES[@]}"; do
  site="${site_info%%:*}"
  capital="${site_info##*:}"
  
  echo "📦 $site → $capital"
  
  LAYOUT_FILE="/Users/guillaumestehelin/moverz_main/sites/$site/app/layout.tsx"
  
  if [ -f "$LAYOUT_FILE" ]; then
    # Remplacer "Déménageurs nantes" par "Déménageurs Nantes"
    sed -i '' "s/Déménageurs $site/Déménageurs $capital/g" "$LAYOUT_FILE"
    echo "   ✅ Corrigé"
  else
    echo "   ⚠️  Fichier non trouvé"
  fi
done

echo ""
echo "✅ TOUTES LES MAJUSCULES ONT ÉTÉ CORRIGÉES !"

