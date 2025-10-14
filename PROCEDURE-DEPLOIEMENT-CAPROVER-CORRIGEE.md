# Procédure de Déploiement CapRover - Version Corrigée

## 🎯 Objectif
Déployer un site spécifique (ex: Nantes) sur CapRover via son repo GitHub individuel (dd-nantes).

## ⚠️ Erreurs Rencontrées et Solutions

### Erreur 1: "Missing script: build"
**Problème** : Le `package.json` de la racine du monorepo n'a pas de script `build`.
**Solution** : Copier le `package.json` du site spécifique à la racine.

### Erreur 2: "Couldn't find any pages or app directory"
**Problème** : Le Dockerfile copie depuis le contexte racine, pas depuis `sites/[ville]/`.
**Solution** : Copier tous les fichiers du site à la racine du repo.

### Erreur 3: Cache Docker persistant
**Problème** : CapRover utilise des caches Docker même après modifications.
**Solution** : Modifier le cache buster dans le Dockerfile.

### Erreur 4: "module is not defined in ES module scope"
**Problème** : Fichiers `.js` obsolètes (`next.config.js`, `postcss.config.js`) utilisant syntaxe CommonJS alors que `package.json` déclare `"type": "module"`.
**Solution** : Supprimer les fichiers `.js`, utiliser uniquement `.mjs` (ES modules) ou `.cjs` (CommonJS explicite).

### Erreur 5: Erreurs de syntaxe TypeScript/React
**Problème** : Duplications et lignes orphelines dans `LocalPage.tsx` (ex: `} (ville).\`,`).
**Solution** : Supprimer les lignes orphelines entre les fonctions.

### Erreur 6: "unknown escape sequence" YAML
**Problème** : Échappements `\:` invalides dans les titres YAML des frontmatters Markdown.
**Solution** : Remplacer tous les `\:` par `:` (YAML n'a pas besoin d'échapper les deux-points dans les chaînes entre guillemets).

### Erreur 7: "can not read a block mapping entry" YAML
**Problème** : Guillemets fermants cassés avec backslash orphelin (ex: `title: "Prix Marseille\"`).
**Solution** : Remplacer tous les `\"` finaux par `"` (guillemet fermant propre).

## 📋 Procédure Complète

### Étape 1: Préparation du Site
```bash
# 1. Se placer dans le repo du site
cd sites/[ville]

# 2. Vérifier que le site a tous les fichiers nécessaires
ls -la
# Doit contenir : app/, components/, lib/, public/, content/, scripts/, package.json, etc.
```

### Étape 2: Copie des Fichiers à la Racine
```bash
# 1. Se placer à la racine du monorepo
cd /Users/guillaumestehelin/moverz_main-5

# 2. Copier le package.json du site à la racine
cp sites/[ville]/package.json package.json

# 3. Copier tous les dossiers nécessaires
cp -r sites/[ville]/app .
cp -r sites/[ville]/components .
cp -r sites/[ville]/lib .
cp -r sites/[ville]/public .
cp -r sites/[ville]/content .
cp -r sites/[ville]/scripts .

# 4. Copier les fichiers de configuration
cp sites/[ville]/*.json .
cp sites/[ville]/*.js .
cp sites/[ville]/*.ts .
cp sites/[ville]/*.mjs .
cp sites/[ville]/*.cjs .
```

### Étape 3: Correction du Dockerfile
```bash
# 1. Modifier le cache buster pour forcer le rebuild
cd sites/[ville]
cat > Dockerfile << 'EOF'
# Dockerfile spécifique pour [ville] - FORCE REBUILD v3
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN echo "FORCE REBUILD [ville] $(date +%s)" > /tmp/force-rebuild-$(date +%s).txt

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
RUN apk add --no-cache dumb-init && \
    addgroup --system --gid 1001 nodejs && \
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
```

### Étape 4: Configuration Captain-Definition
```bash
# 1. Utiliser le script deploy-site.sh
cd /Users/guillaumestehelin/moverz_main-5
./archive/deploy-site.sh [ville]

# Cela crée automatiquement le bon captain-definition
```

### Étape 5: Correction des Problèmes YAML dans les Frontmatters
```bash
# 1. Corriger les échappements \: invalides
find content/blog -name "*.md" -type f -exec sed -i '' 's/\\:/:/g' {} +

# 2. Corriger les guillemets cassés \" à la fin des titres
find content/blog -name "*.md" -type f -exec sed -i '' 's/\\"$/"/g' {} +

# 3. Vérifier qu'il n'y a plus d'erreurs
grep -r '\\:' content/blog/ && echo "⚠️ Encore des \\: à corriger" || echo "✅ Plus de \\:"
grep -r '\\"$' content/blog/ && echo "⚠️ Encore des \\\" à corriger" || echo "✅ Plus de \\\"" 
```

### Étape 6: Vérification des Erreurs de Syntaxe TypeScript/React
```bash
# 1. Vérifier les erreurs TypeScript/React
npm run build 2>&1 | grep -i error

# 2. Corriger les erreurs trouvées (ex: duplications dans LocalPage.tsx)
```

### Étape 7: Commit et Push
```bash
# 1. Ajouter tous les fichiers
git add .

# 2. Commit avec message descriptif
git commit -m "feat([ville]): Déploiement CapRover - fichiers copiés et corrigés

- package.json [ville] copié à la racine (avec script build)
- Dossiers app/, components/, lib/, public/, content/, scripts/ copiés
- Fichiers de config (next.config.mjs, tailwind.config.ts, etc.) copiés
- Dockerfile avec cache buster [ville] spécifique
- Erreurs de syntaxe corrigées
- Prêt pour déploiement CapRover dd-[ville]"

# 3. Push vers le repo du site
git push origin main --force
```

### Étape 8: Déploiement CapRover
1. Aller sur CapRover dashboard
2. Sélectionner l'app `dd-[ville]`
3. Aller dans l'onglet "Déploiement"
4. Configurer :
   - Repository: `gdetaisne/dd-[ville]`
   - Branch: `main`
   - Username: `gdetaisne`
   - Password: [token GitHub]
5. Cliquer sur "Save & Deploy"

## 🔍 Checklist de Vérification

### Avant le Commit
- [ ] `package.json` racine contient le script `build`
- [ ] Dossier `app/` présent à la racine
- [ ] Dossiers `components/`, `lib/`, `public/`, `content/`, `scripts/` présents
- [ ] Fichiers de config présents (`next.config.mjs`, `tailwind.config.ts`, etc.)
- [ ] Dockerfile avec cache buster spécifique au site
- [ ] `captain-definition` pointe vers `./sites/[ville]/Dockerfile`

### Après le Push
- [ ] Commit visible sur GitHub `dd-[ville]`
- [ ] Tous les fichiers présents dans le repo GitHub
- [ ] Build Docker démarre sans erreur
- [ ] Pas d'erreur "Missing script: build"
- [ ] Pas d'erreur "Couldn't find any pages or app directory"
- [ ] Pas d'erreur de syntaxe TypeScript/React
- [ ] Build Next.js réussit
- [ ] Déploiement CapRover terminé avec succès

## 🚨 Erreurs Courantes à Éviter

1. **Oublier de copier package.json** → Erreur "Missing script: build"
2. **Ne pas copier le dossier app/** → Erreur "Couldn't find any pages or app directory"
3. **Utiliser le mauvais cache buster** → Cache Docker persistant
4. **Laisser des erreurs de syntaxe** → Build Next.js échoue
5. **Mauvais captain-definition** → Dockerfile incorrect utilisé
6. **Oublier --force sur git push** → Conflits de branches

## 📊 Temps Estimé
- **Préparation** : 5 minutes
- **Copie fichiers** : 2 minutes
- **Correction erreurs** : 5-10 minutes
- **Commit/Push** : 2 minutes
- **Déploiement CapRover** : 5-10 minutes
- **Total** : 20-30 minutes par site

## 🎯 Résultat Attendu
Site déployé et accessible via CapRover avec toutes les pages fonctionnelles.
