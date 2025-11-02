#!/bin/bash
# Script d'automatisation migration canonicals pour toutes les villes restantes
# Date: 31 octobre 2025
# Usage: ./scripts/migrate-canonical-all-cities.sh

set -e  # Exit on error

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🚀 MIGRATION CANONICALS - 7 VILLES RESTANTES                 ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Définition des villes restantes
declare -A CITIES
CITIES["lyon"]="https://devis-demenageur-lyon.fr/"
CITIES["bordeaux"]="https://www.bordeaux-demenageur.fr/"  # Cas spécial: www
CITIES["nantes"]="https://devis-demenageur-nantes.fr/"
CITIES["strasbourg"]="https://devis-demenageur-strasbourg.fr/"
CITIES["lille"]="https://devis-demenageur-lille.fr/"
CITIES["rennes"]="https://devis-demenageur-rennes.fr/"
CITIES["montpellier"]="https://devis-demenageur-montpellier.fr/"
CITIES["rouen"]="https://devis-demenageur-rouen.fr/"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
SITES_DIR="$ROOT_DIR/sites"

# Fonction pour migrer une ville
migrate_city() {
  local city=$1
  local url=$2
  
  echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${BLUE}🏙️  Migration: $city${NC}"
  echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  
  cd "$SITES_DIR/$city"
  
  # 1. Configuration files
  echo -e "${GREEN}✅ Phase 1: Configuration files${NC}"
  
  # next.config.mjs - Ajouter trailingSlash (chercher après output: 'standalone')
  if ! grep -q "trailingSlash: true" next.config.mjs 2>/dev/null; then
    sed -i '' "/output: 'standalone',/a\\
\\
  // SEO: Force trailing slash sur toutes les URLs (y compris homepage)\\
  trailingSlash: true,
" next.config.mjs
  fi
  
  # lib/env.ts - Corriger SITE_URL
  sed -i '' "s|SITE_URL: z.string().url().default('[^']*')|SITE_URL: z.string().url().default('$url')|g" lib/env.ts
  
  # lib/cityData.ts - Corriger siteUrl
  sed -i '' "s|siteUrl: '[^']*',\$|siteUrl: '$url',|g" lib/cityData.ts
  
  # next-sitemap.config.js - Corriger siteUrl
  sed -i '' "s|siteUrl: process.env.SITE_URL || '[^']*'|siteUrl: process.env.SITE_URL || '$url'|g" next-sitemap.config.js
  
  # public/robots.txt - Corriger Host
  sed -i '' "s|Host: .*\$|Host: $url|g" public/robots.txt
  
  # 2. Copier les fichiers corrigés de Nice
  echo -e "${GREEN}✅ Phase 2: Copier fichiers corrigés${NC}"
  
  cp "$SITES_DIR/nice/lib/canonical-helper.ts" lib/
  cp "$SITES_DIR/nice/lib/seo-builders.ts" lib/
  cp "$SITES_DIR/nice/app/partenaires/page.tsx" app/partenaires/
  cp "$SITES_DIR/nice/app/comment-ca-marche/page.tsx" app/comment-ca-marche/
  cp "$SITES_DIR/nice/app/blog/page.tsx" app/blog/
  cp "$SITES_DIR/nice/app/_templates/CorridorPage.tsx" app/_templates/
  cp "$SITES_DIR/nice/app/_templates/LocalPage.tsx" app/_templates/
  cp "$SITES_DIR/nice/app/sitemap.ts" app/
  
  # 3. Créer .caproverenv
  echo -e "${GREEN}✅ Phase 3: Créer .caproverenv${NC}"
  
  cat > .caproverenv << EOF
SITE_URL=$url
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
EOF
  
  # 4. Fixer Dockerfile
  echo -e "${GREEN}✅ Phase 4: Fixer Dockerfile${NC}"
  
  # Ajouter ARG default values
  sed -i '' "s|ARG SITE_URL\$|ARG SITE_URL=$url|g" Dockerfile
  
  # 5. Commit et push
  echo -e "${GREEN}✅ Phase 5: Git commit + push${NC}"
  
  git add .
  git commit -m "feat($city): Migration canonicals avec trailing slash

Template Nice appliqué:
- ✅ Configuration (next.config.mjs, env.ts, cityData.ts)
- ✅ Helper canonical + SEO builders
- ✅ Pages + Templates + Sitemap
- ✅ Deployment (.caproverenv, Dockerfile)

Ready for production." || echo "Nothing to commit"
  
  git push origin main
  
  echo -e "${GREEN}✅ $city migré avec succès !${NC}"
  echo ""
}

# Exécuter la migration pour chaque ville
counter=0
total=${#CITIES[@]}

for city in "${!CITIES[@]}"; do
  counter=$((counter + 1))
  echo -e "${BLUE}[$counter/$total] Traitement de $city...${NC}"
  migrate_city "$city" "${CITIES[$city]}"
done

echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  🎉 MIGRATION TERMINÉE - 7 VILLES MIGRÉES !                   ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Villes migrées:"
for city in "${!CITIES[@]}"; do
  echo -e "  ${GREEN}✅${NC} $city → ${CITIES[$city]}"
done

