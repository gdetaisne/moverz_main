# 🚀 LEÇONS CAPROVER VALIDÉES - Procédure de Déploiement

## ✅ **CE QUI FONCTIONNE PARFAITEMENT**

### 1. **Architecture GitHub → CapRover**
- ✅ **Repos séparés** : Chaque site a son propre repo GitHub
- ✅ **Webhooks automatiques** : Déploiement automatique au push
- ✅ **Apps CapRover configurées** : Domaines, repos, webhooks OK
- ✅ **Build Docker réussi** : `npm run build` + Docker build OK
- ✅ **Déploiement réussi** : Site accessible en production

### 2. **Structure de fichiers validée**
```
dd-lille/
├── captain-definition    # ✅ Configuré pour CapRover
├── Dockerfile           # ✅ Build multi-stage validé
├── next.config.js       # ✅ output: 'standalone' OK
├── package.json         # ✅ type: "module" OK
├── public/              # ❌ Assets manquants (à corriger)
└── src/                 # ✅ Structure Next.js OK
```

---

## ❌ **PROBLÈMES IDENTIFIÉS ET SOLUTIONS**

### 1. **Assets statiques manquants**
**Problème :** 404 sur favicon.ico, manifest.json, images
**Solution :** 
- Créer assets par défaut dans le template
- Vérifier la copie dans Dockerfile
- Tester localement avant déploiement

### 2. **Images externes non fiables**
**Problème :** images.unsplash.com → 404
**Solution :**
- Utiliser des images locales par défaut
- Configurer des fallbacks
- Ou utiliser un CDN fiable

### 3. **Variables Handlebars non résolues**
**Problème :** `{{{city_name}}}` dans le code généré
**Solution :**
- Résolution automatique dans le script de génération
- Tests de validation post-génération

---

## 📋 **PROCÉDURE VALIDÉE POUR NOUVEAUX SITES**

### Étape 1 : Préparation du Template
```bash
# 1. Template avec tous les assets
moverz-template/
├── public/
│   ├── favicon.ico      # ✅ Asset par défaut
│   ├── manifest.json    # ✅ Manifest générique
│   └── images/          # ✅ Images par défaut
├── src/app/
│   ├── globals.css      # ✅ CSS complet
│   └── _templates/      # ✅ Composants validés
└── scripts/
    └── generate-site-robust-fixed.js  # ✅ Script validé
```

### Étape 2 : Configuration CapRover
```json
// captain-definition
{
  "schemaVersion": 2,
  "dockerfilePath": "./Dockerfile"
}
```

```dockerfile
# Dockerfile validé
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./

FROM base AS deps
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:18-alpine AS runner
RUN apk add --no-cache dumb-init && \\
    addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]
```

### Étape 3 : next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ✅ Obligatoire pour CapRover
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
```

### Étape 4 : package.json
```json
{
  "name": "demenageurs-[city]",
  "version": "1.0.0",
  "type": "module",  // ✅ Obligatoire pour next.config.js
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

---

## 🧪 **TESTS DE VALIDATION**

### Tests pré-déploiement
```bash
# 1. Test local
npm run build
npm run start
curl http://localhost:3000

# 2. Test des assets
curl http://localhost:3000/favicon.ico
curl http://localhost:3000/manifest.json

# 3. Test de déploiement
# Push vers GitHub → Vérifier logs CapRover
```

### Checklist de validation
- [ ] Build local réussi
- [ ] Assets statiques accessibles
- [ ] Design correct (CSS chargé)
- [ ] Variables résolues (pas de `{{{{`)
- [ ] Déploiement CapRover réussi
- [ ] Site accessible sur le domaine

---

## 🚀 **PROCHAINES ÉTAPES**

1. **Corriger le template** avec assets intégrés
2. **Tester sur un site pilote** (Marseille)
3. **Supprimer tous les sites existants**
4. **Régénérer tous les sites** avec la procédure validée
5. **Déployer progressivement** avec validation

---

*Document créé le $(date) - Basé sur l'expérience Lille → CapRover*

