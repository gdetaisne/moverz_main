#!/bin/bash
# Phase 4 Révisée : Correction des slugs incorrects
# Date: 29 Octobre 2025

echo "🚀 PHASE 4 RÉVISÉE : CORRECTION SLUGS INCORRECTS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

CITIES=(marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier)
BACKUP_DIR="backups/phase4-revised-$(date +%Y%m%d-%H%M%S)"

# Créer backup global
echo "📦 Création backup: $BACKUP_DIR..."
mkdir -p "$BACKUP_DIR"

for city in "${CITIES[@]}"; do
  if [ -d "sites/$city/content" ]; then
    cp -r "sites/$city/content" "$BACKUP_DIR/${city}-content"
  fi
done
echo "✅ Backup créé"
echo ""

# Compteurs
TOTAL_CHANGES=0

# Traiter chaque ville
for city in "${CITIES[@]}"; do
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🏙️  $city"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  
  if [ ! -d "sites/$city/content" ]; then
    echo "⚠️  Pas de contenu, skip"
    echo ""
    continue
  fi
  
  # Correction 1 : Liens vers piliers manquants (URLs à 2 segments)
  echo "🔧 Ajout /piliers/ pour liens incomplets..."
  
  find "sites/$city/content" -name "*.md" -type f -exec sed -i '' \
    -e "s|](/blog/demenagement-international-$city)|](/blog/piliers/demenagement-international-$city)|g" \
    -e "s|](/blog/demenagement-pas-cher-$city)|](/blog/piliers/demenagement-pas-cher-$city)|g" \
    -e "s|](/blog/demenagement-piano-$city)|](/blog/piliers/demenagement-piano-$city)|g" \
    -e "s|](/blog/demenageur-$city)|](/blog/piliers/demenageur-$city)|g" \
    -e "s|](/blog/garde-meuble-$city)|](/blog/piliers/garde-meuble-$city)|g" \
    -e "s|](/blog/petit-demenagement-$city)|](/blog/piliers/petit-demenagement-$city)|g" \
    -e "s|](/blog/aide-au-demenagement-$city)|](/blog/piliers/aide-au-demenagement-$city)|g" \
    {} \;
  
  # Correction 2 : Liens entreprise/international (cas spéciaux)
  echo "🔧 Correction liens entreprise..."
  
  find "sites/$city/content" -name "*.md" -type f -exec sed -i '' \
    -e "s|](/blog/demenagement-entreprise-$city)|](/blog/piliers/demenagement-entreprise-$city)|g" \
    -e "s|](/blog/demenagement-d-entreprise-$city)|](/blog/piliers/demenagement-entreprise-$city)|g" \
    {} \;
  
  # Correction 3 : Catégories incorrectes mixtes (ex: /blog/aide-demenagement-nice/satellites/...)
  echo "🔧 Correction catégories mixtes..."
  
  find "sites/$city/content" -name "*.md" -type f -exec sed -i '' \
    -e "s|](/blog/aide-demenagement-$city/satellites/|](/blog/satellites/|g" \
    -e "s|](/blog/demenagement-entreprise-$city/satellites/|](/blog/satellites/|g" \
    -e "s|](/blog/demenagement-international-$city/satellites/|](/blog/satellites/|g" \
    -e "s|](/blog/demenagement-pas-cher-$city/satellites/|](/blog/satellites/|g" \
    -e "s|](/blog/demenagement-piano-$city/satellites/|](/blog/satellites/|g" \
    {} \;
  
  # Correction 4 : Cas spéciaux par ville
  if [ "$city" == "lille" ]; then
    echo "🔧 Corrections spécifiques Lille..."
    find "sites/$city/content" -name "*.md" -type f -exec sed -i '' \
      -e "s|](/blog/accordage-piano-apres-demenagement-lille)|](/blog/satellites/accordage-piano-apres-demenagement-lille)|g" \
      -e "s|](/blog/assurance-demenagement-entreprise-lille)|](/blog/satellites/assurance-demenagement-entreprise-lille)|g" \
      -e "s|](/blog/assurance-piano-demenagement-lille)|](/blog/satellites/assurance-piano-demenagement-lille)|g" \
      -e "s|](/blog/checklist-demenagement-bureaux-lille)|](/blog/satellites/checklist-demenagement-bureaux-lille)|g" \
      -e "s|](/blog/checklist-demenagement-entreprise-lille)|](/blog/satellites/checklist-demenagement-entreprise-lille)|g" \
      {} \;
  fi
  
  # Compter changements
  if [ -d "$BACKUP_DIR/${city}-content" ]; then
    CHANGES=$(diff -r "$BACKUP_DIR/${city}-content" "sites/$city/content" 2>/dev/null | grep "^<" | wc -l | tr -d ' ')
    echo "📊 Lignes modifiées: $CHANGES"
    TOTAL_CHANGES=$((TOTAL_CHANGES + CHANGES))
  fi
  
  echo "✅ $city terminé"
  echo ""
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 PHASE 4 RÉVISÉE TERMINÉE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 RÉSUMÉ"
echo "   Lignes modifiées totales: $TOTAL_CHANGES"
echo ""
echo "📁 Backup: $BACKUP_DIR/"
echo ""
echo "🔍 Prochaine étape:"
echo "   node scripts/analyze-404.mjs"
echo ""
echo "🔄 Rollback si besoin:"
echo "   for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do"
echo "     rm -rf sites/\$city/content"
echo "     cp -r $BACKUP_DIR/\${city}-content sites/\$city/content"
echo "   done"
echo ""

