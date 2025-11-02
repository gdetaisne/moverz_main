#!/bin/bash

# Script : Ajouter slash final aux breadcrumbs Marseille
# Date : 31 octobre 2025

set -e

SITE_DIR="/Users/guillaumestehelin/moverz_main-1/sites/marseille"

echo "🔧 Correction breadcrumbs Marseille..."
echo ""

# Compteurs
TOTAL=0
MODIFIED=0

# Trouver tous les fichiers avec des breadcrumbs
FILES=$(grep -rl "Breadcrumbs" "$SITE_DIR/app" --include="*.tsx" || true)

if [ -z "$FILES" ]; then
  echo "❌ Aucun fichier avec breadcrumbs trouvé"
  exit 0
fi

echo "📁 Fichiers trouvés : $(echo "$FILES" | wc -l | tr -d ' ')"
echo ""

for file in $FILES; do
  ((TOTAL++))
  
  # Backup
  cp "$file" "${file}.breadcrumb-backup"
  
  # Fix : href: "/{path}" → href: "/{path}/"
  # Mais PAS href: "/" (homepage déjà OK)
  
  # Pattern 1 : href: "/xxx" → href: "/xxx/"
  sed -i '' 's/href: "\/\([^"\/]*\)"/href: "\/\1\/"/g' "$file"
  
  # Pattern 2 : href: "/xxx/yyy" → href: "/xxx/yyy/"  
  sed -i '' 's/href: "\/\([^"]*[^\/]\)"/href: "\/\1\/"/g' "$file"
  
  # Vérifier si modifié
  if ! diff -q "$file" "${file}.breadcrumb-backup" > /dev/null 2>&1; then
    ((MODIFIED++))
    echo "✅ $(basename $file)"
  else
    echo "⚪ $(basename $file) (déjà OK)"
    rm "${file}.breadcrumb-backup"
  fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Terminé :"
echo "   Fichiers traités : $TOTAL"
echo "   Fichiers modifiés : $MODIFIED"
echo ""

if [ $MODIFIED -gt 0 ]; then
  echo "⚠️  Backups créés (.breadcrumb-backup)"
  echo "   Vérifiez avec : git diff sites/marseille/app"
  echo "   Si OK, supprimez : find sites/marseille -name '*.breadcrumb-backup' -delete"
  echo ""
fi

echo "🎉 Breadcrumbs Marseille corrigés !"

