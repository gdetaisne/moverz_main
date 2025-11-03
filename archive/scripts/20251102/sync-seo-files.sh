#!/bin/bash

# Script de synchronisation des fichiers SEO et sitemaps dynamiques
# Usage: ./scripts/sync-seo-files.sh

set -e

echo "🔄 SYNCHRONISATION FICHIERS SEO & SITEMAPS"
echo "=========================================="
echo ""

CITIES=(
  "marseille"
  "toulouse"
  "lyon"
  "bordeaux"
  "nantes"
  "lille"
  "nice"
  "strasbourg"
  "rouen"
  "rennes"
  "montpellier"
)

echo "📋 Fichiers à synchroniser :"
echo "   - lib/cityData.ts (nouveau)"
echo "   - lib/seo.ts (dynamique)"
echo "   - components/StructuredData.tsx (dynamique)"
echo "   - app/sitemap.ts (dynamique)"
echo ""
echo "🌍 Sites cibles : ${#CITIES[@]}"
echo ""

for city in "${CITIES[@]}"; do
  echo "📦 $city"
  
  # Sync cityData.ts (nouveau fichier centralisé)
  if [ -f "lib/cityData.ts" ]; then
    cp "lib/cityData.ts" "sites/$city/lib/cityData.ts"
    echo "   ✅ cityData.ts synchronisé"
  else
    echo "   ⚠️  cityData.ts introuvable"
  fi
  
  # Sync seo.ts (maintenant dynamique)
  if [ -f "lib/seo.ts" ]; then
    cp "lib/seo.ts" "sites/$city/lib/seo.ts"
    echo "   ✅ seo.ts synchronisé"
  else
    echo "   ⚠️  seo.ts introuvable"
  fi
  
  # Sync StructuredData.tsx (maintenant dynamique)
  if [ -f "components/StructuredData.tsx" ]; then
    cp "components/StructuredData.tsx" "sites/$city/components/StructuredData.tsx"
    echo "   ✅ StructuredData.tsx synchronisé"
  else
    echo "   ⚠️  StructuredData.tsx introuvable"
  fi
  
  # Sync sitemap.ts (maintenant dynamique)
  if [ -f "app/sitemap.ts" ]; then
    cp "app/sitemap.ts" "sites/$city/app/sitemap.ts"
    echo "   ✅ sitemap.ts synchronisé"
  else
    echo "   ⚠️  sitemap.ts introuvable"
  fi
  
  echo ""
done

echo "═══════════════════════════════════════"
echo ""
echo "🔍 VÉRIFICATION MD5"
echo ""

# Vérifier que tous les fichiers sont identiques
FILES=("lib/cityData.ts" "lib/seo.ts" "components/StructuredData.tsx" "app/sitemap.ts")

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    UNIQUE_HASHES=$(find sites/*/$(echo $file) 2>/dev/null | xargs md5 -q 2>/dev/null | sort -u | wc -l | tr -d ' ')
    if [ "$UNIQUE_HASHES" = "1" ]; then
      echo "✅ $file : Tous identiques"
    else
      echo "❌ $file : $UNIQUE_HASHES versions différentes"
    fi
  fi
done

echo ""
echo "✨ SYNCHRONISATION TERMINÉE"
echo ""
echo "📝 Prochaines étapes :"
echo "   1. Tester un site : cd sites/marseille && npm run build"
echo "   2. Vérifier sitemap : open http://localhost:3020/sitemap.xml"
echo "   3. Commit monorepo : git add -A && git commit -m 'feat(seo): dynamisation métadonnées et sitemaps'"
echo "   4. Déployer : ./scripts/push-all-sites-to-github.sh"
echo ""

