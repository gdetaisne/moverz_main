#!/bin/bash
# Script pour corriger "toulouse" hardcodé dans toutes les FAQ

set -e

VILLES="nice lille nantes rouen strasbourg rennes lyon marseille bordeaux"

echo "🔧 CORRECTION FAQ - Toulouse hardcodé"
echo "════════════════════════════════════════════════"
echo ""

for ville in $VILLES; do
  FILE="sites/$ville/app/faq/page.tsx"
  
  if [ ! -f "$FILE" ]; then
    echo "  ⚠️  $ville : Fichier non trouvé"
    continue
  fi
  
  echo -n "  📝 $ville : "
  
  # Correction 1 : "toulouse" → ${city.nameCapitalized} dans questions
  sed -i '' 's/à toulouse ?"/à ${city.nameCapitalized} ?"/g' "$FILE"
  
  # Correction 2 : "toulouse" → ${city.nameCapitalized} dans réponses (template literal)
  sed -i '' 's/à toulouse/à ${city.nameCapitalized}/g' "$FILE"
  sed -i '' 's/de toulouse/de ${city.nameCapitalized}/g' "$FILE"
  
  # Correction 3 : Liens /devis-demenagement-toulouse/ → /estimation-rapide/
  sed -i '' 's|/devis-demenagement-toulouse/|/estimation-rapide/|g' "$FILE"
  sed -i '' 's|/prix-demenagement-toulouse|/estimation-rapide/|g' "$FILE"
  sed -i '' 's|/estimation-demenagement-toulouse|/estimation-rapide/|g' "$FILE"
  
  # Correction 4 : Texte lien
  sed -i '' 's/devis de déménagement à toulouse/outil d'\''estimation rapide/g' "$FILE"
  
  # Correction 5 : Alt text images
  sed -i '' 's/FAQ Déménagement toulouse/FAQ Déménagement ${city.nameCapitalized}/g' "$FILE"
  
  # Correction 6 : Titre H1
  sed -i '' 's/FAQ — Déménagement à toulouse/FAQ — Déménagement à {city.nameCapitalized}/g' "$FILE"
  
  echo "✅ Corrigé"
done

echo ""
echo "════════════════════════════════════════════════"
echo "✅ 9 villes FAQ corrigées !"
echo ""

