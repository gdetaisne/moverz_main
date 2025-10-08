#!/bin/bash

echo "🚀 MIGRATION VERS REPOS SÉPARÉS"
echo "==============================="
echo ""

# Liste des sites
sites=(lille marseille lyon toulouse nice nantes strasbourg rennes rouen)

echo "📋 REPOS À CRÉER :"
echo ""

for site in "${sites[@]}"; do
    app_name="dd-$site"
    echo "  $app_name (site: $site)"
done

echo ""
echo "🎯 AVANTAGES :"
echo "  ✅ 1 repo = 1 app CapRover"
echo "  ✅ Webhooks simples"
echo "  ✅ Déploiement indépendant"
echo "  ✅ Noms cohérents"
echo ""

echo "📋 ÉTAPES :"
echo "  1. Créer les repos GitHub (9 repos)"
echo "  2. Copier le code de chaque site"
echo "  3. Configurer CapRover (1 app = 1 repo)"
echo "  4. Tester le déploiement"
echo ""

read -p "Continuer la migration ? (y/N): " confirm
if [[ $confirm != [yY] ]]; then
    echo "❌ Migration annulée"
    exit 0
fi

echo ""
echo "🚀 DÉBUT DE LA MIGRATION..."
echo ""

# Créer les dossiers temporaires pour chaque repo
for site in "${sites[@]}"; do
    app_name="dd-$site"
    echo "📁 Préparation de $app_name..."
    
    # Créer le dossier temporaire
    mkdir -p "../temp-repos/$app_name"
    
    # Copier le contenu du site
    cp -r "sites/$site"/* "../temp-repos/$app_name/"
    
    # Créer un captain-definition simple
    cat > "../temp-repos/$app_name/captain-definition" << EOL
{
  "schemaVersion": 2,
  "dockerfilePath": "./Dockerfile"
}
EOL
    
    # Créer un Dockerfile simple (sans préfixe sites/)
    cat > "../temp-repos/$app_name/Dockerfile" << EOL
# Next.js production build for CapRover - $site
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
FROM base AS deps
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
EOL
    
    echo "✅ $app_name préparé dans ../temp-repos/$app_name/"
done

echo ""
echo "🎉 MIGRATION PRÉPARÉE !"
echo ""
echo "📋 PROCHAINES ÉTAPES :"
echo "  1. Créer les repos GitHub :"
for site in "${sites[@]}"; do
    app_name="dd-$site"
    echo "     - $app_name"
done
echo ""
echo "  2. Push le code de chaque repo"
echo "  3. Configurer CapRover (1 app = 1 repo)"
echo ""
echo "📁 Dossiers préparés dans : ../temp-repos/"
