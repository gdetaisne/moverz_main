#!/bin/bash

# Script de correction automatique des liens Toulouse - VERSION 3 FINALE
# Utilise les catégories APRÈS mapping pour des URLs correctes

BLOG_DIR="sites/toulouse/content/blog"

echo "🔧 Correction des liens vers piliers Toulouse (v3 - FINAL)..."
echo "📁 Dossier: $BLOG_DIR"
echo ""

# ANNULER les corrections v2 précédentes
echo "🔄 Étape 1: Annulation des corrections v2..."
find "$BLOG_DIR" -name "*.md" -type f -exec sed -i '' \
  -e 's|](/blog/aide-deménagement/aide-au-demenagement-toulouse)|](/blog/aide-au-demenagement-toulouse)|g' \
  -e 's|](/blog/entreprise/demenagement-d-entreprise-toulouse)|](/blog/demenagement-d-entreprise-toulouse)|g' \
  -e 's|](/blog/international/demenagement-international-toulouse)|](/blog/demenagement-international-toulouse)|g' \
  -e 's|](/blog/pas-cher/demenagement-pas-cher-toulouse)|](/blog/demenagement-pas-cher-toulouse)|g' \
  -e 's|](/blog/piano/demenagement-piano-toulouse)|](/blog/demenagement-piano-toulouse)|g' \
  -e 's|](/blog/deménageur-professionnel/demenageur-toulouse)|](/blog/demenageur-toulouse)|g' \
  -e 's|](/blog/garde-meuble/garde-meuble-toulouse)|](/blog/garde-meuble-toulouse)|g' \
  -e 's|](/blog/location-camion/location-camion-demenagement-toulouse)|](/blog/location-camion-demenagement-toulouse)|g' \
  -e 's|](/blog/etudiant/petit-demenagement-toulouse)|](/blog/petit-demenagement-toulouse)|g' \
  -e 's|](/blog/prix-déménagement/prix-demenagement-toulouse)|](/blog/prix-demenagement-toulouse)|g' \
  {} +

echo "✅ Annulation terminée"
echo ""

# APPLIQUER les VRAIES corrections avec les catégories APRÈS mapping
echo "🔄 Étape 2: Application des catégories après mapping..."

# Basé sur le nouveau CATEGORY_MAPPING dans blog.ts:
# aide-deménagement → 'aide'
# déménagement-entreprise → 'entreprise'
# international → 'international' (reste tel quel)
# déménagement-economique → 'pas-cher'
# demenagement-piano → 'piano'
# déménageur-professionnel → 'demenageur'
# garde-meuble → 'garde-meuble'
# location-camion → 'location-camion'
# déménagement-etudiant → 'etudiant'
# prix-déménagement → 'prix'

find "$BLOG_DIR" -name "*.md" -type f -exec sed -i '' \
  -e 's|](/blog/aide-au-demenagement-toulouse)|](/blog/aide/aide-au-demenagement-toulouse)|g' \
  -e 's|](/blog/demenagement-d-entreprise-toulouse)|](/blog/entreprise/demenagement-d-entreprise-toulouse)|g' \
  -e 's|](/blog/demenagement-international-toulouse)|](/blog/international/demenagement-international-toulouse)|g' \
  -e 's|](/blog/demenagement-pas-cher-toulouse)|](/blog/pas-cher/demenagement-pas-cher-toulouse)|g' \
  -e 's|](/blog/demenagement-piano-toulouse)|](/blog/piano/demenagement-piano-toulouse)|g' \
  -e 's|](/blog/demenageur-toulouse)|](/blog/demenageur/demenageur-toulouse)|g' \
  -e 's|](/blog/garde-meuble-toulouse)|](/blog/garde-meuble/garde-meuble-toulouse)|g' \
  -e 's|](/blog/location-camion-demenagement-toulouse)|](/blog/location-camion/location-camion-demenagement-toulouse)|g' \
  -e 's|](/blog/petit-demenagement-toulouse)|](/blog/etudiant/petit-demenagement-toulouse)|g' \
  -e 's|](/blog/prix-demenagement-toulouse)|](/blog/prix/prix-demenagement-toulouse)|g' \
  {} +

echo "✅ Correction terminée avec les catégories APRÈS mapping !"
echo ""
echo "📋 URLs finales (catégories mappées):"
echo "   - aide-au-demenagement-toulouse → /blog/aide/"
echo "   - demenagement-d-entreprise-toulouse → /blog/entreprise/"
echo "   - demenagement-international-toulouse → /blog/international/"
echo "   - demenagement-pas-cher-toulouse → /blog/pas-cher/"
echo "   - demenagement-piano-toulouse → /blog/piano/"
echo "   - demenageur-toulouse → /blog/demenageur/"
echo "   - garde-meuble-toulouse → /blog/garde-meuble/"
echo "   - location-camion-demenagement-toulouse → /blog/location-camion/"
echo "   - petit-demenagement-toulouse → /blog/etudiant/"
echo "   - prix-demenagement-toulouse → /blog/prix/"
echo ""
echo "🔍 Relancer l'analyse 404 pour valider:"
echo "   node scripts/analyze-404.mjs toulouse"

