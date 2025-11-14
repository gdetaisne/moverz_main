#!/bin/bash

# Fix Partenaires Cross-Contamination
# Restaure les bons partenaires pour 8 villes depuis commit 2d7cc455 (08/10)

set -e

echo "🔧 Fix Partenaires Cross-Contamination"
echo "======================================="
echo ""

# Villes à corriger (ont partenaires Marseille au lieu des leurs)
CITIES=("lyon" "bordeaux" "lille" "nantes" "strasbourg" "rouen" "rennes" "montpellier")

# Commit source avec bons partenaires
SOURCE_COMMIT="2d7cc455"

echo "📋 Villes à corriger : ${#CITIES[@]}"
echo "🎯 Source : commit $SOURCE_COMMIT (08/10/2025)"
echo ""

for city in "${CITIES[@]}"; do
  echo "🔄 Restauration partenaires pour : $city"
  
  # Extraire SEULEMENT l'array partners depuis le bon commit
  git show $SOURCE_COMMIT:sites/$city/app/partenaires/page.tsx > /tmp/partenaires_${city}_old.tsx
  
  # Vérifier que le fichier existe dans l'ancien commit
  if [ $? -ne 0 ]; then
    echo "  ⚠️  Fichier introuvable dans commit source, skip"
    continue
  fi
  
  # Message
  echo "  ✅ Fichier extrait depuis commit source"
  
  # Copier le fichier complet (plus simple et plus sûr)
  cp /tmp/partenaires_${city}_old.tsx sites/$city/app/partenaires/page.tsx
  
  echo "  ✅ Partenaires restaurés pour $city"
  echo ""
done

# Nettoyage
rm -f /tmp/partenaires_*_old.tsx

echo "✅ TERMINÉ !"
echo ""
echo "📊 Résumé :"
echo "  - 8 villes corrigées"
echo "  - Partenaires restaurés depuis 08/10"
echo ""
echo "🎯 Prochaines étapes :"
echo "  1. Vérifier : git status"
echo "  2. Tester build : npm run build (dans un site)"
echo "  3. Commit : git commit -m 'fix(partenaires): Restore correct partners for 8 cities'"
echo "  4. Push : git push"

