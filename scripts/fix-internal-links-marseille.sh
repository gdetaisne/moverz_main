#!/bin/bash

# Script : Corriger TOUS les liens internes Marseille avec trailing slash
# Date : 31 octobre 2025
# Durée estimée : 5-10 minutes d'exécution

set -e

SITE_DIR="/Users/guillaumestehelin/moverz_main-1/sites/marseille"

echo "🔗 Correction COMPLÈTE des liens internes Marseille..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Compteurs
TOTAL_FILES=0
MODIFIED_FILES=0
TOTAL_LINKS=0

# Trouver tous les fichiers TSX/JSX
FILES=$(find "$SITE_DIR/app" "$SITE_DIR/components" -type f \( -name "*.tsx" -o -name "*.jsx" \) 2>/dev/null || true)

if [ -z "$FILES" ]; then
  echo "❌ Aucun fichier trouvé"
  exit 1
fi

echo "📁 Fichiers à traiter : $(echo "$FILES" | wc -l | tr -d ' ')"
echo ""

for file in $FILES; do
  ((TOTAL_FILES++))
  
  # Backup
  cp "$file" "${file}.links-backup"
  
  # Compter les liens avant
  BEFORE=$(grep -o 'href="[^"]*"' "$file" 2>/dev/null | wc -l | tr -d ' ')
  
  # ═══════════════════════════════════════════════════════
  # CORRECTIONS
  # ═══════════════════════════════════════════════════════
  
  # 1. <Link href="/path"> → <Link href="/path/">
  #    Mais PAS href="/" (homepage)
  #    Mais PAS href="/path/" (déjà OK)
  #    Mais PAS href="http..." (liens externes)
  
  # Pattern A : href="/xxx" où xxx ne contient pas de /
  sed -i '' 's|href="/\([a-zA-Z0-9_-][a-zA-Z0-9_-]*\)"|href="/\1/"|g' "$file"
  
  # Pattern B : href="/xxx/yyy" où ne se termine pas par /
  sed -i '' 's|href="/\([^"]*[^/]\)"|href="/\1/"|g' "$file"
  
  # Pattern C : href={ } dynamiques
  # Chercher href={`/blog/${category}`} → href={`/blog/${category}/`}
  sed -i '' 's|href={`/\([^}]*[^/]\)`}|href={`/\1/`}|g' "$file"
  
  # 2. Corriger les doubles slashes créés par erreur
  sed -i '' 's|href="//"|href="/"|g' "$file"
  sed -i '' 's|href="/\([^"]*\)//|href="/\1/|g' "$file"
  
  # 3. Cas spéciaux : anchors (#)
  #    /page#section → /page/#section
  sed -i '' 's|href="/\([^"#]*\)#|href="/\1/#|g' "$file"
  
  # 4. Query strings (?)
  #    /page?param=value → /page/?param=value
  sed -i '' 's|href="/\([^"?]*\)?|href="/\1/?|g' "$file"
  
  # Compter les liens après
  AFTER=$(grep -o 'href="[^"]*"' "$file" 2>/dev/null | wc -l | tr -d ' ')
  ((TOTAL_LINKS+=AFTER))
  
  # Vérifier si modifié
  if ! diff -q "$file" "${file}.links-backup" > /dev/null 2>&1; then
    ((MODIFIED_FILES++))
    
    # Compter combien de liens modifiés
    CHANGED=$(diff "${file}.links-backup" "$file" | grep '^[<>]' | grep 'href=' | wc -l | tr -d ' ')
    
    echo "✅ $(basename $(dirname $file))/$(basename $file) → $CHANGED liens modifiés"
  else
    # Aucun changement, supprimer backup
    rm "${file}.links-backup"
  fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RÉSUMÉ"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Fichiers traités :  $TOTAL_FILES"
echo "Fichiers modifiés : $MODIFIED_FILES"
echo "Total liens :       ~$TOTAL_LINKS"
echo ""

if [ $MODIFIED_FILES -gt 0 ]; then
  echo "⚠️  Backups créés (.links-backup)"
  echo "   Vérifier : git diff sites/marseille"
  echo "   Supprimer backups si OK :"
  echo "   find sites/marseille -name '*.links-backup' -delete"
  echo ""
fi

echo "🎉 Correction complète des liens internes terminée !"
echo ""
echo "📋 PROCHAINES ÉTAPES :"
echo "1. Vérifier modifications : cd sites/marseille && git diff"
echo "2. Build & test : pnpm build"
echo "3. Vérifier quelques pages manuellement"
echo "4. Commit si tout OK"

