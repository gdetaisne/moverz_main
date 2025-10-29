#!/bin/bash

# Phase 1: Correction automatique des préfixes ville dans les liens
# Objectif: Réduire 2970 → ~1800 404s (-39%)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

CITIES=(marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier)

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  PHASE 1: CORRECTION PRÉFIXES VILLE DANS LES LIENS        ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Backup avant modifications
BACKUP_DIR="$ROOT_DIR/backups/links-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📦 Backup créé dans: $BACKUP_DIR"
echo ""

# Compteurs
TOTAL_FILES=0
TOTAL_REPLACEMENTS=0

for city in "${CITIES[@]}"; do
  CONTENT_DIR="$ROOT_DIR/sites/$city/content/blog"
  
  if [ ! -d "$CONTENT_DIR" ]; then
    echo "⚠️  Pas de dossier content pour $city, skip..."
    continue
  fi
  
  echo "┌────────────────────────────────────────────────────────┐"
  echo "│  🔧 Traitement de: $(echo $city | tr '[:lower:]' '[:upper:]')                                  │"
  echo "└────────────────────────────────────────────────────────┘"
  
  # Backup de cette ville
  CITY_BACKUP="$BACKUP_DIR/$city"
  cp -R "$CONTENT_DIR" "$CITY_BACKUP"
  echo "   ✓ Backup: $CITY_BACKUP"
  
  # Compter fichiers
  FILE_COUNT=$(find "$CONTENT_DIR" -name "*.md" -type f | wc -l | tr -d ' ')
  echo "   📄 Fichiers à traiter: $FILE_COUNT"
  
  # Pattern 1: garde-meuble-{ville}/garde-meuble-{ville}- → garde-meuble-{ville}/
  PATTERN1_COUNT=$(find "$CONTENT_DIR" -name "*.md" -type f -exec grep -l "/blog/garde-meuble-$city/garde-meuble-$city-" {} \; 2>/dev/null | wc -l | tr -d ' ')
  if [ "$PATTERN1_COUNT" -gt 0 ]; then
    echo "   🔍 Pattern garde-meuble: $PATTERN1_COUNT fichiers"
    find "$CONTENT_DIR" -name "*.md" -type f -exec sed -i '' \
      "s|/blog/garde-meuble-$city/garde-meuble-$city-|/blog/garde-meuble-$city/|g" {} \;
    echo "   ✅ Corrigé: garde-meuble-$city"
    TOTAL_REPLACEMENTS=$((TOTAL_REPLACEMENTS + PATTERN1_COUNT))
  fi
  
  # Pattern 2: demenagement-{ville}/demenagement-{ville}- → demenagement-{ville}/
  PATTERN2_COUNT=$(find "$CONTENT_DIR" -name "*.md" -type f -exec grep -l "/blog/demenagement-$city/demenagement-$city-" {} \; 2>/dev/null | wc -l | tr -d ' ')
  if [ "$PATTERN2_COUNT" -gt 0 ]; then
    echo "   🔍 Pattern demenagement: $PATTERN2_COUNT fichiers"
    find "$CONTENT_DIR" -name "*.md" -type f -exec sed -i '' \
      "s|/blog/demenagement-$city/demenagement-$city-|/blog/demenagement-$city/|g" {} \;
    echo "   ✅ Corrigé: demenagement-$city"
    TOTAL_REPLACEMENTS=$((TOTAL_REPLACEMENTS + PATTERN2_COUNT))
  fi
  
  # Pattern 3: prix-demenagement-{ville}/prix-demenagement-{ville}- → prix-demenagement-{ville}/
  PATTERN3_COUNT=$(find "$CONTENT_DIR" -name "*.md" -type f -exec grep -l "/blog/prix-demenagement-$city/prix-demenagement-$city-" {} \; 2>/dev/null | wc -l | tr -d ' ')
  if [ "$PATTERN3_COUNT" -gt 0 ]; then
    echo "   🔍 Pattern prix-demenagement: $PATTERN3_COUNT fichiers"
    find "$CONTENT_DIR" -name "*.md" -type f -exec sed -i '' \
      "s|/blog/prix-demenagement-$city/prix-demenagement-$city-|/blog/prix-demenagement-$city/|g" {} \;
    echo "   ✅ Corrigé: prix-demenagement-$city"
    TOTAL_REPLACEMENTS=$((TOTAL_REPLACEMENTS + PATTERN3_COUNT))
  fi
  
  # Pattern 4: devis-demenagement-{ville}/devis-demenagement-{ville}- → devis-demenagement-{ville}/
  PATTERN4_COUNT=$(find "$CONTENT_DIR" -name "*.md" -type f -exec grep -l "/blog/devis-demenagement-$city/devis-demenagement-$city-" {} \; 2>/dev/null | wc -l | tr -d ' ')
  if [ "$PATTERN4_COUNT" -gt 0 ]; then
    echo "   🔍 Pattern devis-demenagement: $PATTERN4_COUNT fichiers"
    find "$CONTENT_DIR" -name "*.md" -type f -exec sed -i '' \
      "s|/blog/devis-demenagement-$city/devis-demenagement-$city-|/blog/devis-demenagement-$city/|g" {} \;
    echo "   ✅ Corrigé: devis-demenagement-$city"
    TOTAL_REPLACEMENTS=$((TOTAL_REPLACEMENTS + PATTERN4_COUNT))
  fi
  
  # Patterns supplémentaires pour catégories spécifiques
  for category in "etudiant" "entreprise" "piano" "international" "longue-distance" "pas-cher" "urgent"; do
    PATTERN="demenagement-$category-$city/demenagement-$category-$city-"
    PATTERN_COUNT=$(find "$CONTENT_DIR" -name "*.md" -type f -exec grep -l "/blog/$PATTERN" {} \; 2>/dev/null | wc -l | tr -d ' ')
    if [ "$PATTERN_COUNT" -gt 0 ]; then
      echo "   🔍 Pattern $category: $PATTERN_COUNT fichiers"
      find "$CONTENT_DIR" -name "*.md" -type f -exec sed -i '' \
        "s|/blog/$PATTERN|/blog/demenagement-$category-$city/|g" {} \;
      echo "   ✅ Corrigé: demenagement-$category-$city"
      TOTAL_REPLACEMENTS=$((TOTAL_REPLACEMENTS + PATTERN_COUNT))
    fi
  done
  
  echo "   ✨ $city terminé"
  echo ""
  
  TOTAL_FILES=$((TOTAL_FILES + FILE_COUNT))
done

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  RÉSUMÉ DE LA PHASE 1                                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📊 Statistiques:"
echo "   • Fichiers traités:        $TOTAL_FILES"
echo "   • Patterns corrigés:       $TOTAL_REPLACEMENTS"
echo "   • Backup:                  $BACKUP_DIR"
echo ""
echo "🔍 Validation:"
echo "   Exécutez maintenant:"
echo "   $ node scripts/analyze-404.mjs"
echo ""
echo "🎯 Objectif attendu:"
echo "   Avant:  2,970 liens cassés"
echo "   Après:  ~1,800 liens cassés (-39%)"
echo ""
echo "✅ Phase 1 terminée avec succès!"

