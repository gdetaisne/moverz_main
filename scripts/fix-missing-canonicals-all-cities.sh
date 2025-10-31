#!/bin/bash
# Fix des canonicals manquants pour services, faq et quartiers
# Date: 31 octobre 2025

set -e

CITIES=(marseille nice toulouse lyon bordeaux nantes strasbourg rennes montpellier rouen)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
SITES_DIR="$ROOT_DIR/sites"

echo "🔧 CORRECTION CANONICALS MANQUANTS - 10 VILLES"
echo "═══════════════════════════════════════════════════════════"
echo ""

for city in "${CITIES[@]}"; do
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🏙️  $city"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  
  cd "$SITES_DIR/$city"
  
  # 1. Fix services/page.tsx
  if [ -f "app/services/page.tsx" ]; then
    if ! grep -q "getCanonicalUrl" "app/services/page.tsx"; then
      echo "   Copie services/page.tsx depuis Lille..."
      cp "$SITES_DIR/lille/app/services/page.tsx" "app/services/page.tsx"
      echo "   ✅ services corrigé"
    else
      echo "   ℹ️  services déjà OK"
    fi
  fi
  
  # 2. Fix faq/layout.tsx
  if [ -f "app/faq/layout.tsx" ]; then
    if ! grep -q "getCanonicalUrl" "app/faq/layout.tsx"; then
      echo "   Copie faq/layout.tsx depuis Lille..."
      cp "$SITES_DIR/lille/app/faq/layout.tsx" "app/faq/layout.tsx"
      echo "   ✅ faq corrigé"
    else
      echo "   ℹ️  faq déjà OK"
    fi
  fi
  
  # 3. Fix pages quartiers
  quartier_count=0
  for quartier_dir in app/$city/*/; do
    if [ -f "${quartier_dir}page.tsx" ]; then
      if ! grep -q "generateLocalPageMetadata" "${quartier_dir}page.tsx"; then
        quartier_name=$(basename "$quartier_dir")
        
        # Extraire zoneDisplay du fichier
        zone_display=$(grep "zoneDisplay:" "${quartier_dir}page.tsx" | head -1 | sed 's/.*zoneDisplay: "\([^"]*\)".*/\1/' | tr -d ',')
        
        if [ -n "$zone_display" ]; then
          # Utiliser Perl pour remplacer le metadata
          perl -i -0pe "s/export const metadata: Metadata = \{[^\}]*\};/import { generateLocalPageMetadata } from '\@\/app\/_templates\/LocalPage';\n\nexport const metadata: Metadata = generateLocalPageMetadata('$quartier_name', '$zone_display');/s" "${quartier_dir}page.tsx" 2>/dev/null
          
          # Ajouter import si pas déjà là
          if ! grep -q "import { generateLocalPageMetadata }" "${quartier_dir}page.tsx"; then
            perl -i -pe "s/(import LocalPage from '\@\/app\/_templates\/LocalPage';)/\1\nimport { generateLocalPageMetadata } from '\@\/app\/_templates\/LocalPage';/" "${quartier_dir}page.tsx"
          fi
          
          quartier_count=$((quartier_count + 1))
        fi
      fi
    fi
  done
  
  if [ $quartier_count -gt 0 ]; then
    echo "   ✅ $quartier_count pages quartiers corrigées"
  else
    echo "   ℹ️  Pages quartiers déjà OK ou absentes"
  fi
  
  echo ""
done

echo "═══════════════════════════════════════════════════════════"
echo "✅ Correction terminée pour 10 villes"
echo ""
echo "Next: Commit et push pour chaque ville"
EOF

chmod +x /tmp/check-missing-canonicals.sh
bash /tmp/check-missing-canonicals.sh
