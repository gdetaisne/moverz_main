#!/bin/bash

# Fix NeighborhoodsIndex.tsx - Remplacer "Toulouse" hardcodé par cityData dynamique
# Projet 404 - Pattern #9 Fix

CITIES="bordeaux lille lyon marseille montpellier nantes nice rennes rouen strasbourg toulouse"

for city in $CITIES; do
  FILE="sites/$city/components/NeighborhoodsIndex.tsx"
  
  if [ ! -f "$FILE" ]; then
    echo "⚠️  $city: Fichier NeighborhoodsIndex.tsx manquant, skip"
    continue
  fi
  
  echo "🔧 Fixing $city..."
  
  # Backup
  cp "$FILE" "$FILE.bak"
  
  # Fix 1: Ajouter imports si pas déjà présents
  if ! grep -q "getCityDataFromUrl" "$FILE"; then
    # Ajouter après la ligne import QUARTIERS
    sed -i '' '/import { QUARTIERS/a\
import { getCityDataFromUrl } from "@/lib/cityData";\
import { env } from "@/lib/env";
' "$FILE"
  fi
  
  # Fix 2: Ajouter const city dans le composant si pas présent
  if ! grep -q "const city = getCityDataFromUrl" "$FILE"; then
    # Ajouter après export default function
    sed -i '' '/export default function NeighborhoodsIndex()/a\
  const city = getCityDataFromUrl(env.SITE_URL);
' "$FILE"
  fi
  
  # Fix 3: Remplacer "Toulouse" hardcodé par {city.nameCapitalized} dans H1
  sed -i '' 's/Déménagement par quartiers & communes (Toulouse)/Déménagement par quartiers \& communes ({city.nameCapitalized})/g' "$FILE"
  
  # Fix 4: Remplacer "Quartiers de Toulouse" par "Quartiers de {city.nameCapitalized}" dans H2
  sed -i '' 's/Quartiers de Toulouse/Quartiers de {city.nameCapitalized}/g' "$FILE"
  
  echo "✅ $city corrigé"
done

echo ""
echo "🎉 Fix appliqué sur 11 villes !"
echo ""
echo "Prochaine étape : Vérifier les builds (test 3 villes)"

