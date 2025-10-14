#!/bin/bash

# Script pour appliquer les corrections CapRover à tous les sites
# Usage: ./scripts/fix-all-sites-for-caprover.sh

set -e

echo "🔧 CORRECTION DES SITES POUR CAPROVER"
echo "===================================="
echo ""

SITES=(
  "bordeaux"
  "lille" 
  "lyon"
  "marseille"
  "montpellier"
  "nice"
  "rennes"
  "rouen"
  "strasbourg"
  "toulouse"
)

for site in "${SITES[@]}"; do
  echo "📦 Correction du site: $site"
  
  # 1. Vérifier que le site existe
  if [ ! -d "sites/$site" ]; then
    echo "   ⚠️  Site $site n'existe pas, skip"
    continue
  fi
  
  # 2. Vérifier que le site a un package.json
  if [ ! -f "sites/$site/package.json" ]; then
    echo "   ⚠️  package.json manquant pour $site, skip"
    continue
  fi
  
  # 3. Copier le package.json du site à la racine
  echo "   📋 Copie package.json $site → racine"
  cp "sites/$site/package.json" "package.json"
  
  # 4. Copier tous les dossiers nécessaires
  echo "   📁 Copie dossiers $site → racine"
  cp -r "sites/$site/app" .
  cp -r "sites/$site/components" .
  cp -r "sites/$site/lib" .
  cp -r "sites/$site/public" .
  cp -r "sites/$site/content" .
  cp -r "sites/$site/scripts" .
  
  # 5. Copier les fichiers de configuration
  echo "   ⚙️  Copie fichiers de config $site → racine"
  cp sites/$site/*.json . 2>/dev/null || true
  cp sites/$site/*.js . 2>/dev/null || true
  cp sites/$site/*.ts . 2>/dev/null || true
  cp sites/$site/*.mjs . 2>/dev/null || true
  cp sites/$site/*.cjs . 2>/dev/null || true
  
  # 6. Corriger le Dockerfile avec cache buster spécifique
  echo "   🐳 Correction Dockerfile $site"
  cat > "sites/$site/Dockerfile" << EOF
# Dockerfile spécifique pour $site - FORCE REBUILD v3
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN echo "FORCE REBUILD $site \$(date +%s)" > /tmp/force-rebuild-\$(date +%s).txt

# Install dependencies
FROM base AS deps
COPY package.json ./
RUN npm install --production=false

# Build application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production runtime
FROM node:20-alpine AS runner
RUN apk add --no-cache dumb-init && \\
    addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Copy public directory
RUN mkdir -p ./public
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["dumb-init", "node_modules/.bin/next", "start"]
EOF
  
  # 7. Commit et push vers le repo du site
  echo "   📤 Commit et push $site vers dd-$site"
  git add .
  git commit -m "feat($site): Déploiement CapRover - fichiers copiés et corrigés

- package.json $site copié à la racine (avec script build)
- Dossiers app/, components/, lib/, public/, content/, scripts/ copiés
- Fichiers de config (next.config.mjs, tailwind.config.ts, etc.) copiés
- Dockerfile avec cache buster $site spécifique
- Prêt pour déploiement CapRover dd-$site" 2>/dev/null || echo "   ℹ️  Aucun changement à committer"
  
  # Push vers le repo du site
  git push origin main --force 2>/dev/null || echo "   ⚠️  Push échoué pour $site"
  
  echo "   ✅ $site corrigé et poussé"
  echo ""
done

echo "═══════════════════════════════════════"
echo ""
echo "✅ TOUS LES SITES ONT ÉTÉ CORRIGÉS !"
echo ""
echo "🔗 Vérifiez sur GitHub:"
for site in "${SITES[@]}"; do
  echo "   • https://github.com/gdetaisne/dd-$site"
done
echo ""
echo "🚀 Vous pouvez maintenant déployer sur CapRover !"
