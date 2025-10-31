#!/bin/bash

# Script de correction automatique des liens Toulouse - VERSION 2
# Corrige les liens vers piliers avec les BONNES catégories

BLOG_DIR="sites/toulouse/content/blog"

echo "🔧 Correction des liens vers piliers Toulouse (v2 - CORRECTED)..."
echo "📁 Dossier: $BLOG_DIR"
echo ""

# ANNULER les corrections précédentes (general → sans catégorie)
echo "🔄 Étape 1: Annulation des corrections précédentes..."
find "$BLOG_DIR" -name "*.md" -type f -exec sed -i '' \
  -e 's|](/blog/general/aide-au-demenagement-toulouse)|](/blog/aide-au-demenagement-toulouse)|g' \
  -e 's|](/blog/general/demenagement-d-entreprise-toulouse)|](/blog/demenagement-d-entreprise-toulouse)|g' \
  -e 's|](/blog/general/demenagement-international-toulouse)|](/blog/demenagement-international-toulouse)|g' \
  -e 's|](/blog/general/demenagement-pas-cher-toulouse)|](/blog/demenagement-pas-cher-toulouse)|g' \
  -e 's|](/blog/general/demenagement-piano-toulouse)|](/blog/demenagement-piano-toulouse)|g' \
  -e 's|](/blog/general/demenageur-toulouse)|](/blog/demenageur-toulouse)|g' \
  -e 's|](/blog/general/garde-meuble-toulouse)|](/blog/garde-meuble-toulouse)|g' \
  -e 's|](/blog/general/location-camion-demenagement-toulouse)|](/blog/location-camion-demenagement-toulouse)|g' \
  -e 's|](/blog/general/petit-demenagement-toulouse)|](/blog/petit-demenagement-toulouse)|g' \
  -e 's|](/blog/general/prix-demenagement-toulouse)|](/blog/prix-demenagement-toulouse)|g' \
  {} +

echo "✅ Annulation terminée"
echo ""

# APPLIQUER les BONNES corrections avec les catégories du frontmatter + mapping
echo "🔄 Étape 2: Application des VRAIES catégories..."

# Basé sur le frontmatter ET le mapping dans blog.ts:
# aide-au-demenagement-toulouse.md → category: "aide-deménagement" → pas dans mapping → reste tel quel
# demenagement-d-entreprise-toulouse.md → category: "deménagement-entreprise" → mapping: "entreprise"
# demenagement-international-toulouse.md → category: "international" → mapping: "international"
# demenagement-pas-cher-toulouse.md → category: "deménagement-economique" → mapping: "pas-cher"
# demenagement-piano-toulouse.md → category: "demenagement-piano" → mapping: "piano"
# demenageur-toulouse.md → category: "deménageur-professionnel" → pas dans mapping → reste tel quel
# garde-meuble-toulouse.md → category: "garde-meuble" → mapping: "garde-meuble"
# location-camion-demenagement-toulouse.md → category: "location-camion" → mapping: "location-camion"
# petit-demenagement-toulouse.md → category: "deménagement-etudiant" → mapping: "etudiant"
# prix-demenagement-toulouse.md → category: "prix-deménagement" → pas dans mapping → reste tel quel

find "$BLOG_DIR" -name "*.md" -type f -exec sed -i '' \
  -e 's|](/blog/aide-au-demenagement-toulouse)|](/blog/aide-deménagement/aide-au-demenagement-toulouse)|g' \
  -e 's|](/blog/demenagement-d-entreprise-toulouse)|](/blog/entreprise/demenagement-d-entreprise-toulouse)|g' \
  -e 's|](/blog/demenagement-international-toulouse)|](/blog/international/demenagement-international-toulouse)|g' \
  -e 's|](/blog/demenagement-pas-cher-toulouse)|](/blog/pas-cher/demenagement-pas-cher-toulouse)|g' \
  -e 's|](/blog/demenagement-piano-toulouse)|](/blog/piano/demenagement-piano-toulouse)|g' \
  -e 's|](/blog/demenageur-toulouse)|](/blog/deménageur-professionnel/demenageur-toulouse)|g' \
  -e 's|](/blog/garde-meuble-toulouse)|](/blog/garde-meuble/garde-meuble-toulouse)|g' \
  -e 's|](/blog/location-camion-demenagement-toulouse)|](/blog/location-camion/location-camion-demenagement-toulouse)|g' \
  -e 's|](/blog/petit-demenagement-toulouse)|](/blog/etudiant/petit-demenagement-toulouse)|g' \
  -e 's|](/blog/prix-demenagement-toulouse)|](/blog/prix-deménagement/prix-demenagement-toulouse)|g' \
  {} +

echo "✅ Correction terminée avec les VRAIES catégories !"
echo ""
echo "📋 Catégories appliquées:"
echo "   - aide-au-demenagement-toulouse → /blog/aide-deménagement/"
echo "   - demenagement-d-entreprise-toulouse → /blog/entreprise/"
echo "   - demenagement-international-toulouse → /blog/international/"
echo "   - demenagement-pas-cher-toulouse → /blog/pas-cher/"
echo "   - demenagement-piano-toulouse → /blog/piano/"
echo "   - demenageur-toulouse → /blog/deménageur-professionnel/"
echo "   - garde-meuble-toulouse → /blog/garde-meuble/"
echo "   - location-camion-demenagement-toulouse → /blog/location-camion/"
echo "   - petit-demenagement-toulouse → /blog/etudiant/"
echo "   - prix-demenagement-toulouse → /blog/prix-deménagement/"
echo ""
echo "🔍 Relancer l'analyse 404 pour valider:"
echo "   node scripts/analyze-404.mjs toulouse"

