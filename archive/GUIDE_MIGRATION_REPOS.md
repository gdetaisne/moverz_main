# 🚀 GUIDE MIGRATION VERS REPOS SÉPARÉS

**Objectif** : Migrer de `moverz_main` (monorepo) vers 9 repos séparés avec noms d'apps CapRover.

---

## 🎯 **ARCHITECTURE FINALE**

### **Repos GitHub = Apps CapRover :**
```
GitHub Repos:           CapRover Apps:
dd-lille          →     dd-lille
dd-marseille      →     dd-marseille  
dd-lyon           →     dd-lyon
dd-toulouse       →     dd-toulouse
dd-nice           →     dd-nice
dd-nantes         →     dd-nantes
dd-strasbourg     →     dd-strasbourg
dd-rennes         →     dd-rennes
dd-rouen          →     dd-rouen
```

---

## 📋 **ÉTAPES DE MIGRATION**

### **✅ Étape 1 : Préparation (TERMINÉE)**
- ✅ Code copié dans `../temp-repos/`
- ✅ Dockerfiles simplifiés (sans préfixe `sites/`)
- ✅ Captain-definition configurés

### **🔄 Étape 2 : Création des repos GitHub**
```bash
./create-github-repos.sh
```

**Ce qui va se passer :**
1. Création de 9 repos GitHub
2. Push du code de chaque site
3. Configuration des remotes

### **🔄 Étape 3 : Configuration CapRover**
Pour chaque app CapRover :
```
Repository: gdetaisne/dd-[ville]
Branch: main
Username: gdetaisne
Password: [ton token GitHub]
```

### **🔄 Étape 4 : Test des déploiements**
1. Tester `dd-lille` en premier
2. Si ça marche → déployer les 8 autres
3. Configurer les webhooks

---

## 🎯 **AVANTAGES DE CETTE ARCHITECTURE**

### **✅ Déploiement :**
- **1 repo = 1 app** : Simplicité maximale
- **Webhooks directs** : Push = Déploiement automatique
- **Noms cohérents** : Repo = App CapRover
- **Indépendance** : Chaque site déployable séparément

### **✅ Maintenance :**
- **Correction de bug** : 1 commit = 1 site affecté
- **Nouvelle fonctionnalité** : Déployable site par site
- **Rollback** : Possibilité de revenir en arrière par site
- **Permissions** : Accès granulaire par repo

### **✅ Webhooks :**
- **Configuration simple** : 1 webhook = 1 site
- **Déclenchement automatique** : Push = Déploiement
- **Logs séparés** : Historique par site
- **Monitoring** : Statut par repo

---

## 🔧 **STRUCTURE D'UN REPO**

### **Contenu d'un repo (ex: `dd-lille`) :**
```
dd-lille/
├── captain-definition          # Configuration CapRover
├── Dockerfile                  # Build Docker
├── package.json               # Dépendances Next.js
├── next.config.js             # Config Next.js
├── src/                       # Code source
├── public/                    # Assets statiques
├── data/                      # Données spécifiques à la ville
└── ...                        # Autres fichiers Next.js
```

### **Captain-definition :**
```json
{
  "schemaVersion": 2,
  "dockerfilePath": "./Dockerfile"
}
```

### **Dockerfile :**
```dockerfile
# Next.js production build for CapRover
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
```

---

## 🚀 **COMMANDES DE MIGRATION**

### **Créer tous les repos GitHub :**
```bash
./create-github-repos.sh
```

### **Créer un repo manuellement :**
```bash
# Aller dans le dossier du site
cd ../temp-repos/dd-lille

# Initialiser Git
git init
git add .
git commit -m "🎯 Initial commit - Site de déménagement lille"

# Créer le repo GitHub (via interface web ou API)
# Puis push
git branch -M main
git remote add origin https://github.com/gdetaisne/dd-lille.git
git push -u origin main
```

---

## 📊 **STATUT DE LA MIGRATION**

| Étape | Status | Description |
|-------|--------|-------------|
| 1. Préparation | ✅ | Code copié dans `../temp-repos/` |
| 2. Création repos | ⏳ | À faire avec `./create-github-repos.sh` |
| 3. Config CapRover | ⏳ | À faire après création repos |
| 4. Test déploiements | ⏳ | À faire après config CapRover |
| 5. Webhooks | ⏳ | À faire après tests réussis |

---

## 🎯 **PROCHAINE ÉTAPE**

**Exécuter la création des repos :**
```bash
./create-github-repos.sh
```

**Tu auras besoin de :**
- Ton token GitHub (avec permissions `repo`)
- Confirmer le nom d'utilisateur (gdetaisne)

**Une fois terminé, on configurera CapRover ! 🚀**
