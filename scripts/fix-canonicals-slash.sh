#!/bin/bash

# Script de migration : Ajouter slash final aux canonicals
# Date : 31 octobre 2025
# Usage : ./scripts/fix-canonicals-slash.sh [ville]
#         Si aucune ville, traite TOUTES les villes

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SITES_DIR="$PROJECT_ROOT/sites"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Compteurs
TOTAL_FILES=0
MODIFIED_FILES=0

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Migration Canonicals : Ajout Slash Final             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Fonction : Ajouter slash final aux siteUrl dans cityData.ts
fix_citydata() {
  local city=$1
  local file="$SITES_DIR/$city/lib/cityData.ts"
  
  if [ ! -f "$file" ]; then
    echo -e "${YELLOW}⚠️  Fichier non trouvé : $file${NC}"
    return
  fi
  
  echo -e "${BLUE}🔧 Traitement : $file${NC}"
  ((TOTAL_FILES++))
  
  # Chercher les lignes siteUrl sans slash final
  # Pattern : siteUrl: 'https://...' (sans slash avant ')
  if grep -q "siteUrl: 'https://[^']*[^/]'" "$file"; then
    # Backup
    cp "$file" "${file}.backup"
    
    # Ajouter slash avant le guillemet fermant
    sed -i '' "s|siteUrl: '\(https://[^']*[^/]\)',|siteUrl: '\1/',|g" "$file"
    
    echo -e "${GREEN}✅ Modifié : siteUrl avec slash final${NC}"
    ((MODIFIED_FILES++))
  else
    echo -e "${GREEN}✓ Déjà OK (siteUrl a déjà un slash ou n'existe pas)${NC}"
  fi
  
  echo ""
}

# Fonction : Ajouter slash final dans env.ts
fix_env() {
  local city=$1
  local file="$SITES_DIR/$city/lib/env.ts"
  
  if [ ! -f "$file" ]; then
    echo -e "${YELLOW}⚠️  Fichier non trouvé : $file${NC}"
    return
  fi
  
  echo -e "${BLUE}🔧 Traitement : $file${NC}"
  ((TOTAL_FILES++))
  
  # Pattern : SITE_URL: z.string().url().default('https://...') (sans slash)
  if grep -q "\.default('https://[^']*[^/]')" "$file"; then
    cp "$file" "${file}.backup"
    
    # Ajouter slash avant le guillemet fermant du default
    sed -i '' "s|\.default('\(https://[^']*[^/]\)')|.default('\1/')|g" "$file"
    
    echo -e "${GREEN}✅ Modifié : SITE_URL default avec slash final${NC}"
    ((MODIFIED_FILES++))
  else
    echo -e "${GREEN}✓ Déjà OK${NC}"
  fi
  
  echo ""
}

# Fonction : Ajouter slash final dans next-sitemap.config.js
fix_next_sitemap() {
  local city=$1
  local file="$SITES_DIR/$city/next-sitemap.config.js"
  
  if [ ! -f "$file" ]; then
    echo -e "${YELLOW}⚠️  Fichier non trouvé : $file${NC}"
    return
  fi
  
  echo -e "${BLUE}🔧 Traitement : $file${NC}"
  ((TOTAL_FILES++))
  
  # Pattern : siteUrl: ... || 'https://...' (sans slash)
  if grep -q "|| 'https://[^']*[^/]'" "$file"; then
    cp "$file" "${file}.backup"
    
    sed -i '' "s||| '\(https://[^']*[^/]\)'||| '\1/'|g" "$file"
    
    echo -e "${GREEN}✅ Modifié : siteUrl avec slash final${NC}"
    ((MODIFIED_FILES++))
  else
    echo -e "${GREEN}✓ Déjà OK${NC}"
  fi
  
  echo ""
}

# Fonction : Copier le canonical-helper.ts
copy_canonical_helper() {
  local city=$1
  local source="$SITES_DIR/nice/lib/canonical-helper.ts"
  local dest="$SITES_DIR/$city/lib/canonical-helper.ts"
  
  if [ ! -f "$source" ]; then
    echo -e "${RED}❌ Source non trouvée : $source${NC}"
    echo -e "${YELLOW}💡 Créez d'abord le fichier canonical-helper.ts dans sites/nice/lib/${NC}"
    return
  fi
  
  if [ -f "$dest" ]; then
    echo -e "${YELLOW}⚠️  Le fichier existe déjà : $dest${NC}"
    return
  fi
  
  echo -e "${BLUE}🔧 Copie de canonical-helper.ts vers $city${NC}"
  cp "$source" "$dest"
  echo -e "${GREEN}✅ Copié : $dest${NC}"
  ((MODIFIED_FILES++))
  echo ""
}

# Fonction : Traiter une ville
process_city() {
  local city=$1
  
  echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
  echo -e "${BLUE}  Traitement de : $city${NC}"
  echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
  echo ""
  
  # 1. Fixer cityData.ts
  fix_citydata "$city"
  
  # 2. Fixer env.ts
  fix_env "$city"
  
  # 3. Fixer next-sitemap.config.js
  fix_next_sitemap "$city"
  
  # 4. Copier canonical-helper.ts (si pas encore présent)
  copy_canonical_helper "$city"
  
  echo -e "${GREEN}✓ $city terminé${NC}"
  echo ""
}

# Main
if [ -n "$1" ]; then
  # Une ville spécifique
  CITY=$1
  if [ ! -d "$SITES_DIR/$CITY" ]; then
    echo -e "${RED}❌ Ville non trouvée : $CITY${NC}"
    echo -e "${YELLOW}Villes disponibles :${NC}"
    ls -1 "$SITES_DIR"
    exit 1
  fi
  
  process_city "$CITY"
else
  # Toutes les villes
  echo -e "${BLUE}📍 Traitement de TOUTES les villes${NC}"
  echo ""
  
  for city_dir in "$SITES_DIR"/*; do
    if [ -d "$city_dir" ]; then
      city=$(basename "$city_dir")
      process_city "$city"
    fi
  done
fi

# Résumé
echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Résumé de la Migration                               ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}Fichiers traités :${NC} $TOTAL_FILES"
echo -e "${GREEN}Fichiers modifiés :${NC} $MODIFIED_FILES"
echo ""

if [ $MODIFIED_FILES -gt 0 ]; then
  echo -e "${YELLOW}⚠️  BACKUPS CRÉÉS :${NC}"
  echo "Des fichiers .backup ont été créés pour tous les fichiers modifiés."
  echo "Si tout fonctionne, vous pouvez les supprimer avec :"
  echo -e "${BLUE}find sites -name '*.backup' -delete${NC}"
  echo ""
  
  echo -e "${YELLOW}📋 PROCHAINES ÉTAPES :${NC}"
  echo "1. Vérifiez les modifications avec : git diff"
  echo "2. Testez un site localement :"
  echo -e "   ${BLUE}cd sites/nice && pnpm build && pnpm start${NC}"
  echo "3. Vérifiez les canonicals :"
  echo -e "   ${BLUE}curl -s http://localhost:3000 | grep canonical${NC}"
  echo "4. Si OK, committez les changements"
  echo "5. Migrez les pages individuelles (voir EXEMPLE-MIGRATION-CANONICALS.md)"
  echo ""
fi

echo -e "${GREEN}✅ Script terminé avec succès${NC}"

