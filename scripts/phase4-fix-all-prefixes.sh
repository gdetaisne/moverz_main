#!/bin/bash
# Phase 4 : Correction des préfixes ville - TOUTES LES VILLES
# Date: 29 Octobre 2025

echo "🚀 PHASE 4 : CORRECTION PRÉFIXES VILLES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

CITIES=(marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier)
BACKUP_DIR="backups/phase4-$(date +%Y%m%d-%H%M%S)"

# Créer backup global
echo "📦 Création backup global: $BACKUP_DIR..."
mkdir -p "$BACKUP_DIR"

for city in "${CITIES[@]}"; do
  if [ -d "sites/$city/content" ]; then
    cp -r "sites/$city/content" "$BACKUP_DIR/${city}-content"
  fi
done
echo "✅ Backup global créé"
echo ""

# Compteurs
TOTAL_BEFORE=0
TOTAL_AFTER=0
TOTAL_CHANGES=0

# Traiter chaque ville
for city in "${CITIES[@]}"; do
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🏙️  $city"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  
  if [ ! -d "sites/$city/content" ]; then
    echo "⚠️  Pas de contenu trouvé, skip"
    echo ""
    continue
  fi
  
  # Compter avant
  BEFORE=$(grep -r "/blog/" "sites/$city/content" 2>/dev/null | wc -l | tr -d ' ')
  echo "📊 Liens /blog/ avant: $BEFORE"
  
  # Pattern 1 : {categorie}-{ville}/{categorie}-{ville}-*
  echo "🔧 Pattern 1: categorie-ville/categorie-ville-*..."
  
  find "sites/$city/content" -name "*.md" -type f -exec sed -i '' \
    -e "s|/blog/garde-meuble-$city/garde-meuble-$city-|/blog/garde-meuble-$city/|g" \
    -e "s|/blog/demenagement-entreprise-$city/demenagement-entreprise-$city-|/blog/demenagement-entreprise-$city/|g" \
    -e "s|/blog/demenagement-piano-$city/demenagement-piano-$city-|/blog/demenagement-piano-$city/|g" \
    -e "s|/blog/demenagement-pas-cher-$city/demenagement-pas-cher-$city-|/blog/demenagement-pas-cher-$city/|g" \
    -e "s|/blog/demenagement-international-$city/demenagement-international-$city-|/blog/demenagement-international-$city/|g" \
    -e "s|/blog/location-camion-demenagement-$city/location-camion-demenagement-$city-|/blog/location-camion-demenagement-$city/|g" \
    -e "s|/blog/location-camion-$city/location-camion-demenagement-$city-|/blog/location-camion-$city/|g" \
    -e "s|/blog/location-camion-$city/location-camion-$city-|/blog/location-camion-$city/|g" \
    -e "s|/blog/prix-demenagement-$city/prix-demenagement-$city-|/blog/prix-demenagement-$city/|g" \
    -e "s|/blog/petit-demenagement-$city/petit-demenagement-$city-|/blog/petit-demenagement-$city/|g" \
    -e "s|/blog/demenagement-$city-pas-cher/prix-demenagement-pas-cher-$city-|/blog/demenagement-$city-pas-cher/prix-|g" \
    -e "s|/blog/demenagement-$city-pas-cher/demenagement-$city-pas-cher-|/blog/demenagement-$city-pas-cher/|g" \
    -e "s|/blog/demenagement-$city-pas-cher/demenagement-pas-cher-$city-|/blog/demenagement-$city-pas-cher/|g" \
    -e "s|/blog/aide-demenagement-$city/aide-demenagement-$city-|/blog/aide-demenagement-$city/|g" \
    -e "s|/blog/demenageur-$city/demenageur-$city-|/blog/demenageur-$city/|g" \
    {} \;
  
  # Pattern 2 : {categorie}/{categorie}-{ville}-*
  echo "🔧 Pattern 2: categorie/categorie-ville-*..."
  
  find "sites/$city/content" -name "*.md" -type f -exec sed -i '' \
    -e "s|/blog/demenageur/demenageur-$city-|/blog/demenageur/|g" \
    -e "s|/blog/garde-meuble/garde-meuble-$city-|/blog/garde-meuble/|g" \
    -e "s|/blog/pas-cher/demenagement-pas-cher-$city-|/blog/pas-cher/|g" \
    -e "s|/blog/location-camion/location-camion-demenagement-$city-|/blog/location-camion/|g" \
    -e "s|/blog/location-camion/location-camion-$city-|/blog/location-camion/|g" \
    -e "s|/blog/prix/prix-demenagement-$city-|/blog/prix/|g" \
    -e "s|/blog/piano/demenagement-piano-$city-|/blog/piano/|g" \
    -e "s|/blog/entreprise/demenagement-entreprise-$city-|/blog/entreprise/|g" \
    -e "s|/blog/international/demenagement-international-$city-|/blog/international/|g" \
    -e "s|/blog/petit-demenagement/petit-demenagement-$city-|/blog/petit-demenagement/|g" \
    {} \;
  
  # Compter après
  AFTER=$(grep -r "/blog/" "sites/$city/content" 2>/dev/null | wc -l | tr -d ' ')
  echo "📊 Liens /blog/ après: $AFTER"
  
  # Compter changements
  if [ -d "$BACKUP_DIR/${city}-content" ]; then
    CHANGES=$(diff -r "$BACKUP_DIR/${city}-content" "sites/$city/content" 2>/dev/null | grep "^<" | wc -l | tr -d ' ')
    echo "📊 Lignes modifiées: $CHANGES"
    TOTAL_CHANGES=$((TOTAL_CHANGES + CHANGES))
  fi
  
  TOTAL_BEFORE=$((TOTAL_BEFORE + BEFORE))
  TOTAL_AFTER=$((TOTAL_AFTER + AFTER))
  
  echo "✅ $city terminé"
  echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 PHASE 4 TERMINÉE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 RÉSUMÉ GLOBAL"
echo "   Liens /blog/ avant: $TOTAL_BEFORE"
echo "   Liens /blog/ après: $TOTAL_AFTER"
echo "   Lignes modifiées:   $TOTAL_CHANGES"
echo ""
echo "📁 Backup disponible: $BACKUP_DIR/"
echo ""
echo "🔍 Prochaine étape:"
echo "   node scripts/analyze-404.mjs"
echo ""
echo "🔄 Rollback complet si besoin:"
echo "   for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do"
echo "     rm -rf sites/\$city/content"
echo "     cp -r $BACKUP_DIR/\${city}-content sites/\$city/content"
echo "   done"
echo ""

