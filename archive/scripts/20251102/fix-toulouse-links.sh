#!/bin/bash

# Script de correction automatique des liens Toulouse
# Corrige les liens vers piliers en ajoutant la catégorie /general/

BLOG_DIR="sites/toulouse/content/blog"

echo "🔧 Correction des liens vers piliers Toulouse..."
echo "📁 Dossier: $BLOG_DIR"
echo ""

# Compter les fichiers à modifier
total_files=$(find "$BLOG_DIR" -name "*.md" | wc -l | xargs)
echo "📊 Fichiers à scanner: $total_files"
echo ""

# Corriger tous les liens vers piliers
# Tous les piliers sont dans la catégorie "general" selon le mapping

echo "🔄 Correction en cours..."

find "$BLOG_DIR" -name "*.md" -type f -exec sed -i '' \
  -e 's|](/blog/aide-au-demenagement-toulouse)|](/blog/general/aide-au-demenagement-toulouse)|g' \
  -e 's|](/blog/demenagement-d-entreprise-toulouse)|](/blog/general/demenagement-d-entreprise-toulouse)|g' \
  -e 's|](/blog/demenagement-international-toulouse)|](/blog/general/demenagement-international-toulouse)|g' \
  -e 's|](/blog/demenagement-pas-cher-toulouse)|](/blog/general/demenagement-pas-cher-toulouse)|g' \
  -e 's|](/blog/demenagement-piano-toulouse)|](/blog/general/demenagement-piano-toulouse)|g' \
  -e 's|](/blog/demenageur-toulouse)|](/blog/general/demenageur-toulouse)|g' \
  -e 's|](/blog/garde-meuble-toulouse)|](/blog/general/garde-meuble-toulouse)|g' \
  -e 's|](/blog/location-camion-demenagement-toulouse)|](/blog/general/location-camion-demenagement-toulouse)|g' \
  -e 's|](/blog/petit-demenagement-toulouse)|](/blog/general/petit-demenagement-toulouse)|g' \
  -e 's|](/blog/prix-demenagement-toulouse)|](/blog/general/prix-demenagement-toulouse)|g' \
  {} +

echo ""
echo "✅ Correction terminée !"
echo ""
echo "📋 Liens corrigés:"
echo "   - aide-au-demenagement-toulouse"
echo "   - demenagement-d-entreprise-toulouse"
echo "   - demenagement-international-toulouse"
echo "   - demenagement-pas-cher-toulouse"
echo "   - demenagement-piano-toulouse"
echo "   - demenageur-toulouse"
echo "   - garde-meuble-toulouse"
echo "   - location-camion-demenagement-toulouse"
echo "   - petit-demenagement-toulouse"
echo "   - prix-demenagement-toulouse"
echo ""
echo "🔍 Relancer l'analyse 404 pour valider:"
echo "   node scripts/analyze-404.mjs toulouse"

