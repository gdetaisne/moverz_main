#!/bin/bash
# Test Phase 4 sur Marseille uniquement
# Date: 29 Octobre 2025

CITY="marseille"

echo "🧪 TEST PHASE 4 - Ville: $CITY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Backup
BACKUP_DIR="backups/phase4-before-$(date +%Y%m%d-%H%M%S)"
echo "📦 Création backup: $BACKUP_DIR/$CITY..."
mkdir -p "$BACKUP_DIR"
cp -r "sites/$CITY/content" "$BACKUP_DIR/${CITY}-content-backup"
echo "✅ Backup créé"
echo ""

# Compter avant
BEFORE=$(grep -r "/blog/" "sites/$CITY/content" 2>/dev/null | wc -l | tr -d ' ')
echo "📊 Liens /blog/ avant correction: $BEFORE"
echo ""

# Pattern 1 : {categorie}-{ville}/{categorie}-{ville}-*
echo "🔧 Application Pattern 1: categorie-ville/categorie-ville-*"

find "sites/$CITY/content" -name "*.md" -type f -exec sed -i '' \
  -e "s|/blog/garde-meuble-$CITY/garde-meuble-$CITY-|/blog/garde-meuble-$CITY/|g" \
  -e "s|/blog/demenagement-entreprise-$CITY/demenagement-entreprise-$CITY-|/blog/demenagement-entreprise-$CITY/|g" \
  -e "s|/blog/demenagement-piano-$CITY/demenagement-piano-$CITY-|/blog/demenagement-piano-$CITY/|g" \
  -e "s|/blog/demenagement-pas-cher-$CITY/demenagement-pas-cher-$CITY-|/blog/demenagement-pas-cher-$CITY/|g" \
  -e "s|/blog/demenagement-international-$CITY/demenagement-international-$CITY-|/blog/demenagement-international-$CITY/|g" \
  -e "s|/blog/location-camion-demenagement-$CITY/location-camion-demenagement-$CITY-|/blog/location-camion-demenagement-$CITY/|g" \
  -e "s|/blog/location-camion-$CITY/location-camion-demenagement-$CITY-|/blog/location-camion-$CITY/|g" \
  -e "s|/blog/location-camion-$CITY/location-camion-$CITY-|/blog/location-camion-$CITY/|g" \
  -e "s|/blog/prix-demenagement-$CITY/prix-demenagement-$CITY-|/blog/prix-demenagement-$CITY/|g" \
  -e "s|/blog/petit-demenagement-$CITY/petit-demenagement-$CITY-|/blog/petit-demenagement-$CITY/|g" \
  -e "s|/blog/demenagement-$CITY-pas-cher/prix-demenagement-pas-cher-$CITY-|/blog/demenagement-$CITY-pas-cher/prix-|g" \
  -e "s|/blog/demenagement-$CITY-pas-cher/demenagement-$CITY-pas-cher-|/blog/demenagement-$CITY-pas-cher/|g" \
  -e "s|/blog/demenagement-$CITY-pas-cher/demenagement-pas-cher-$CITY-|/blog/demenagement-$CITY-pas-cher/|g" \
  -e "s|/blog/aide-demenagement-$CITY/aide-demenagement-$CITY-|/blog/aide-demenagement-$CITY/|g" \
  {} \;

echo "✅ Pattern 1 appliqué"
echo ""

# Pattern 2 : {categorie}/{categorie}-{ville}-*
echo "🔧 Application Pattern 2: categorie/categorie-ville-*"

find "sites/$CITY/content" -name "*.md" -type f -exec sed -i '' \
  -e "s|/blog/demenageur/demenageur-$CITY-|/blog/demenageur/|g" \
  -e "s|/blog/garde-meuble/garde-meuble-$CITY-|/blog/garde-meuble/|g" \
  -e "s|/blog/pas-cher/demenagement-pas-cher-$CITY-|/blog/pas-cher/|g" \
  -e "s|/blog/location-camion/location-camion-demenagement-$CITY-|/blog/location-camion/|g" \
  -e "s|/blog/location-camion/location-camion-$CITY-|/blog/location-camion/|g" \
  -e "s|/blog/prix/prix-demenagement-$CITY-|/blog/prix/|g" \
  -e "s|/blog/piano/demenagement-piano-$CITY-|/blog/piano/|g" \
  -e "s|/blog/entreprise/demenagement-entreprise-$CITY-|/blog/entreprise/|g" \
  -e "s|/blog/international/demenagement-international-$CITY-|/blog/international/|g" \
  -e "s|/blog/petit-demenagement/petit-demenagement-$CITY-|/blog/petit-demenagement/|g" \
  {} \;

echo "✅ Pattern 2 appliqué"
echo ""

# Compter après
AFTER=$(grep -r "/blog/" "sites/$CITY/content" 2>/dev/null | wc -l | tr -d ' ')
echo "📊 Liens /blog/ après correction: $AFTER"
echo ""

# Comparer
if [ -d "$BACKUP_DIR/${CITY}-content-backup" ]; then
  CHANGES=$(diff -r "$BACKUP_DIR/${CITY}-content-backup" "sites/$CITY/content" 2>/dev/null | grep "^<" | wc -l | tr -d ' ')
  echo "📊 Lignes modifiées: $CHANGES"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ TEST TERMINÉ"
echo ""
echo "📁 Backup disponible: $BACKUP_DIR/${CITY}-content-backup"
echo ""
echo "🔍 Pour vérifier manuellement un fichier:"
echo "   diff $BACKUP_DIR/${CITY}-content-backup/blog/garde-meuble-marseille/bien-ranger-box-stockage-marseille.md \\"
echo "        sites/$CITY/content/blog/garde-meuble-marseille/bien-ranger-box-stockage-marseille.md"
echo ""
echo "🔄 Pour rollback si besoin:"
echo "   rm -rf sites/$CITY/content"
echo "   cp -r $BACKUP_DIR/${CITY}-content-backup sites/$CITY/content"
echo ""

