#!/bin/bash

# Script de préparation du monorepo pour CapRover
# Usage: ./prepare-monorepo.sh

echo "🎯 PRÉPARATION DU MONOREPO MOVERZ"
echo "=================================="
echo ""

BASE_DIR="/Users/guillaumestehelin/moverz_main"
cd "$BASE_DIR"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 ÉTAPE 1 : Créer captain-definition pour chaque site${NC}"
echo "======================================================="

sites=(bordeaux marseille lyon toulouse nice nantes strasbourg lille rennes rouen)

for site in "${sites[@]}"; do
  CAPTAIN_FILE="$BASE_DIR/sites/$site/captain-definition"
  
  if [ -f "$CAPTAIN_FILE" ]; then
    echo -e "  ⏭️  $site : captain-definition existe déjà"
  else
    cat > "$CAPTAIN_FILE" << 'EOF'
{
  "schemaVersion": 2,
  "dockerfilePath": "./Dockerfile"
}
EOF
    echo -e "  ${GREEN}✅ $site : captain-definition créé${NC}"
  fi
done

echo ""
echo -e "${BLUE}📋 ÉTAPE 2 : Vérifier les Dockerfiles${NC}"
echo "======================================"

for site in "${sites[@]}"; do
  DOCKERFILE="$BASE_DIR/sites/$site/Dockerfile"
  
  if [ -f "$DOCKERFILE" ]; then
    echo -e "  ${GREEN}✅ $site : Dockerfile existe${NC}"
  else
    echo -e "  ${YELLOW}⚠️  $site : Dockerfile manquant, création...${NC}"
    
    cat > "$DOCKERFILE" << 'EOF'
# Next.js production build for CapRover
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Build application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production runtime
FROM node:18-alpine AS runner
RUN apk add --no-cache dumb-init && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]
EOF
    echo -e "  ${GREEN}✅ $site : Dockerfile créé${NC}"
  fi
done

echo ""
echo -e "${BLUE}📋 ÉTAPE 3 : Vérifier next.config.js (standalone output)${NC}"
echo "========================================================="

for site in "${sites[@]}"; do
  CONFIG_FILE="$BASE_DIR/sites/$site/next.config.js"
  
  if [ -f "$CONFIG_FILE" ]; then
    # Vérifier si output: 'standalone' est présent
    if grep -q "output.*standalone" "$CONFIG_FILE"; then
      echo -e "  ${GREEN}✅ $site : next.config.js OK (standalone)${NC}"
    else
      echo -e "  ${YELLOW}⚠️  $site : Ajout de 'output: standalone'${NC}"
      
      # Backup
      cp "$CONFIG_FILE" "$CONFIG_FILE.backup"
      
      # Ajouter output: 'standalone'
      sed -i '' "s/const nextConfig = {/const nextConfig = {\n  output: 'standalone',/" "$CONFIG_FILE"
      
      echo -e "  ${GREEN}✅ $site : next.config.js mis à jour${NC}"
    fi
  else
    echo -e "  ${YELLOW}⚠️  $site : next.config.js manquant !${NC}"
  fi
done

echo ""
echo -e "${BLUE}📋 ÉTAPE 4 : Créer .gitignore global${NC}"
echo "====================================="

if [ -f "$BASE_DIR/.gitignore" ]; then
  echo -e "  ⏭️  .gitignore existe déjà"
else
  cat > "$BASE_DIR/.gitignore" << 'EOF'
# Dependencies
**/node_modules/
**/.pnp
**/.pnp.js

# Next.js
**/.next/
**/out/

# Production
**/build
**/.vercel
**/.netlify

# Environment
**/.env*.local
**/.env.production

# Logs
*.log
/tmp/*.log

# OS
.DS_Store
**/.DS_Store

# IDEs
.vscode/
.idea/
*.swp
*.swo

# Backups
*.backup
EOF
  echo -e "  ${GREEN}✅ .gitignore créé${NC}"
fi

echo ""
echo -e "${BLUE}📋 ÉTAPE 5 : Initialiser Git${NC}"
echo "=============================="

if [ -d "$BASE_DIR/.git" ]; then
  echo -e "  ${GREEN}✅ Git déjà initialisé${NC}"
  
  # Vérifier s'il y a des commits
  if git rev-parse HEAD >/dev/null 2>&1; then
    echo -e "  ${GREEN}✅ Commits existants détectés${NC}"
  else
    echo -e "  ${YELLOW}⚠️  Aucun commit, création du premier commit...${NC}"
    git add .
    git commit -m "🎉 Initial commit - Monorepo Moverz (10 sites)

Sites inclus:
- Bordeaux (bordeaux-demenageur.fr)
- Marseille (devis-demenageur-marseille.fr)
- Lyon (devis-demenageur-lyon.fr)
- Toulouse (devis-demenageur-toulousain.fr)
- Nice (devis-demenageur-nice.fr)
- Nantes (devis-demenageur-nantes.fr)
- Strasbourg (devis-demenageur-strasbourg.fr)
- Lille (devis-demenageur-lille.fr)
- Rennes (devis-demenageur-rennes.fr)
- Rouen (devis-demenageur-rouen.fr)
"
    echo -e "  ${GREEN}✅ Premier commit créé${NC}"
  fi
else
  echo -e "  ${YELLOW}⚠️  Initialisation de Git...${NC}"
  git init
  git add .
  git commit -m "🎉 Initial commit - Monorepo Moverz (10 sites)"
  echo -e "  ${GREEN}✅ Git initialisé et premier commit créé${NC}"
fi

echo ""
echo -e "${BLUE}📋 ÉTAPE 6 : Créer le repo GitHub${NC}"
echo "=================================="

# Vérifier si gh CLI est installé
if ! command -v gh &> /dev/null; then
    echo -e "  ${YELLOW}⚠️  GitHub CLI (gh) n'est pas installé${NC}"
    echo ""
    echo "  Installation:"
    echo "    brew install gh"
    echo ""
    echo "  Ou crée le repo manuellement sur https://github.com/new"
    echo ""
else
  # Vérifier si un remote origin existe
  if git remote get-url origin >/dev/null 2>&1; then
    ORIGIN_URL=$(git remote get-url origin)
    echo -e "  ${GREEN}✅ Remote origin existe déjà : $ORIGIN_URL${NC}"
  else
    echo -e "  ${YELLOW}⚠️  Création du repo GitHub...${NC}"
    echo ""
    read -p "  Nom du repo (défaut: moverz_main): " REPO_NAME
    REPO_NAME=${REPO_NAME:-moverz_main}
    
    gh repo create "$REPO_NAME" \
      --public \
      --description "Monorepo - 10 sites de déménagement Next.js" \
      --source=. \
      --remote=origin \
      --push
    
    if [ $? -eq 0 ]; then
      echo -e "  ${GREEN}✅ Repo GitHub créé et poussé !${NC}"
    else
      echo -e "  ${YELLOW}⚠️  Erreur lors de la création${NC}"
    fi
  fi
fi

echo ""
echo -e "${GREEN}🎉 PRÉPARATION TERMINÉE !${NC}"
echo "========================"
echo ""
echo "📊 RÉSUMÉ :"
echo ""
echo "  ✅ captain-definition créés (10 sites)"
echo "  ✅ Dockerfiles vérifiés"
echo "  ✅ next.config.js configurés"
echo "  ✅ .gitignore créé"
echo "  ✅ Git initialisé"
if git remote get-url origin >/dev/null 2>&1; then
  echo "  ✅ Repo GitHub configuré"
fi
echo ""
echo "🚀 PROCHAINES ÉTAPES :"
echo ""
echo "  1. Configurer CapRover (VPS + installation)"
echo "  2. Créer 10 apps CapRover :"
for site in "${sites[@]}"; do
  echo "     - moverz-$site"
done
echo ""
echo "  3. Configurer les domaines"
echo "  4. Déployer !"
echo ""
echo "📖 Voir MONOREPO_DEPLOIEMENT.md pour les détails"
echo ""

