# 🎯 MONOREPO + CAPROVER : Architecture Optimale

**Approche** : 1 Repo GitHub → 10 Apps CapRover → 10 Domaines

---

## 🏗️ ARCHITECTURE

```
GitHub: moverz_main (1 repo unique)
    ↓
    ├── sites/bordeaux/     → CapRover App: moverz-bordeaux  → bordeaux-demenageur.fr
    ├── sites/marseille/    → CapRover App: moverz-marseille → devis-demenageur-marseille.fr
    ├── sites/lyon/         → CapRover App: moverz-lyon      → devis-demenageur-lyon.fr
    ├── sites/toulouse/     → CapRover App: moverz-toulouse  → devis-demenageur-toulousain.fr
    ├── sites/nice/         → CapRover App: moverz-nice      → devis-demenageur-nice.fr
    ├── sites/nantes/       → CapRover App: moverz-nantes    → devis-demenageur-nantes.fr
    ├── sites/strasbourg/   → CapRover App: moverz-strasbourg→ devis-demenageur-strasbourg.fr
    ├── sites/lille/        → CapRover App: moverz-lille     → devis-demenageur-lille.fr
    ├── sites/rennes/       → CapRover App: moverz-rennes    → devis-demenageur-rennes.fr
    └── sites/rouen/        → CapRover App: moverz-rouen     → devis-demenageur-rouen.fr
```

---

## ✅ AVANTAGES DE CETTE APPROCHE

### **1. Gestion Centralisée**
```bash
# Un seul clone
git clone https://github.com/YOUR-USERNAME/moverz_main.git

# Toutes les modifications au même endroit
git log --oneline
# abc123 fix: Footer Bordeaux
# def456 feat: Add partner Marseille
# ghi789 fix: Template correction (all sites)
```

### **2. Déploiement Sélectif**
```bash
# Modifier uniquement Bordeaux
cd sites/bordeaux
# ... modifications ...
git add sites/bordeaux
git commit -m "fix(bordeaux): Update pricing"
git push

# CapRover détecte le commit → Redéploie UNIQUEMENT bordeaux
```

### **3. Corrections Globales Faciles**
```bash
# Corriger le template
vim moverz-template/src/components/Footer.tsx

# Régénérer tous les sites
./regenerate-all-sites.sh

# 1 commit = mise à jour de tous les sites
git add .
git commit -m "fix(all): Update footer design"
git push

# CapRover redéploie les 10 sites en parallèle
```

---

## 🚀 CONFIGURATION CAPROVER

### **Étape 1 : Préparer le Repo GitHub**

```bash
cd /Users/guillaumestehelin/moverz_main

# Initialiser git si pas déjà fait
git init

# Ajouter .gitignore global
cat > .gitignore << 'EOF'
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

# Env files
**/.env*.local
**/.env.production

# Logs
*.log
/tmp/*.log

# OS
.DS_Store

# IDEs
.vscode/
.idea/
EOF

# Premier commit
git add .
git commit -m "🎉 Initial commit - Monorepo Moverz (10 sites)"

# Créer le repo sur GitHub
gh repo create moverz_main --public --source=. --remote=origin --push
```

---

### **Étape 2 : Créer les Apps CapRover**

Pour **chaque site**, créer une app CapRover :

```bash
# Via CLI CapRover (après installation)
caprover deploy

# Ou via Web UI :
# 1. Apps → Create New App
# 2. Name: moverz-bordeaux
# 3. Has Persistent Data: NO
```

**Répéter pour les 10 sites** :
- moverz-bordeaux
- moverz-marseille
- moverz-lyon
- moverz-toulouse
- moverz-nice
- moverz-nantes
- moverz-strasbourg
- moverz-lille
- moverz-rennes
- moverz-rouen

---

### **Étape 3 : Configuration par App**

Pour **chaque app CapRover** :

#### **3.1 HTTP Settings**
```
☑ Enable HTTPS
☑ Force HTTPS by redirecting all HTTP traffic to HTTPS
☑ Websocket Support
```

#### **3.2 App Configs**
```yaml
# Port Mapping
Container HTTP Port: 3000

# Environment Variables
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
```

#### **3.3 Deployment**
```yaml
Method: GitHub
Repository: YOUR-USERNAME/moverz_main
Branch: main
Username: YOUR-USERNAME
Personal Access Token: ghp_xxxxx
```

#### **3.4 Captain Definition Path**
```
# Pour Bordeaux
sites/bordeaux/captain-definition

# Pour Marseille
sites/marseille/captain-definition
```

---

### **Étape 4 : Créer captain-definition par Site**

```bash
# Script pour créer tous les captain-definition
for site in bordeaux marseille lyon toulouse nice nantes strasbourg lille rennes rouen; do
  cat > "/Users/guillaumestehelin/moverz_main/sites/$site/captain-definition" << 'EOF'
{
  "schemaVersion": 2,
  "dockerfilePath": "./Dockerfile"
}
EOF
done
```

---

### **Étape 5 : Dockerfile Optimisé par Site**

Chaque site a déjà son `Dockerfile`. Vérifions qu'il est optimisé :

```dockerfile
# Force rebuild - Next.js production build v3
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

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]
```

---

### **Étape 6 : Configuration DNS**

Pour **chaque domaine** chez votre registrar :

```
# Exemple pour bordeaux-demenageur.fr
Type  | Name | Value
------|------|------------------------
A     | @    | IP_DE_VOTRE_VPS_CAPROVER
CNAME | www  | bordeaux-demenageur.fr
```

**Dans CapRover** :
- App Settings → Custom Domain
- Ajouter : `bordeaux-demenageur.fr`
- Ajouter : `www.bordeaux-demenageur.fr`
- ☑ Enable HTTPS

---

## 🔄 WORKFLOW DE DÉVELOPPEMENT

### **Modifier UN site** :
```bash
cd sites/bordeaux
# ... modifications ...
git add sites/bordeaux
git commit -m "fix(bordeaux): Update pricing"
git push

# CapRover détecte → Redéploie bordeaux uniquement
```

### **Modifier TOUS les sites** :
```bash
# 1. Corriger le template
vim moverz-template/src/components/Footer.tsx

# 2. Régénérer tous les sites
./regenerate-all-sites.sh

# 3. Commit global
git add .
git commit -m "fix(all): Update footer design"
git push

# CapRover détecte → Redéploie les 10 sites
```

### **Rollback** :
```bash
# Revenir à un commit précédent
git revert abc123

# CapRover redéploie automatiquement
```

---

## 📊 DÉPLOIEMENT SÉLECTIF AVANCÉ

### **Option A : Webhook par Site**

CapRover peut déployer **uniquement** les apps modifiées en analysant les commits :

```bash
# Webhook GitHub → CapRover
# Si commit touche sites/bordeaux/ → Redéploie moverz-bordeaux
# Si commit touche sites/marseille/ → Redéploie moverz-marseille
```

### **Option B : Script de Déploiement Intelligent**

```bash
#!/bin/bash
# deploy-changed.sh

# Détecte les sites modifiés
CHANGED_SITES=$(git diff --name-only HEAD~1 HEAD | grep "^sites/" | cut -d'/' -f2 | sort -u)

for site in $CHANGED_SITES; do
  echo "🚀 Déploiement de $site..."
  # Déclencher le déploiement CapRover via API
  curl -X POST "https://captain.your-domain.com/api/v2/user/apps/webhooks/triggerbuild?namespace=captain&token=YOUR_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"app\":\"moverz-$site\"}"
done
```

---

## 💰 COÛTS (VPS CapRover)

### **Hetzner Cloud (Recommandé)** :
```
CX21 (2 vCPU, 4GB RAM) : 5.83€/mois
+ 10 domaines × 10€/an     : 100€/an
──────────────────────────────────────
Total : 170€/an
```

**Capacité** : 10-20 sites Next.js sans problème

### **DigitalOcean** :
```
Basic Droplet (2 vCPU, 4GB) : 24$/mois = 288$/an
+ 10 domaines               : 100€/an
──────────────────────────────────────
Total : 388€/an
```

---

## 🎯 AVANTAGES FINAUX

| Critère | Monorepo CapRover | 10 Repos Vercel |
|---------|-------------------|-----------------|
| **Gestion** | ⭐⭐⭐⭐⭐ 1 repo | ⭐⭐ 10 repos |
| **Coût** | ⭐⭐⭐⭐ 170€/an | ⭐⭐⭐⭐⭐ 100€/an |
| **Maintenance** | ⭐⭐⭐⭐⭐ Facile | ⭐⭐ Complexe |
| **Corrections** | ⭐⭐⭐⭐⭐ 1 commit | ⭐⭐ 10 commits |
| **Setup** | ⭐⭐⭐ Moyen | ⭐⭐⭐⭐⭐ Simple |
| **Contrôle** | ⭐⭐⭐⭐⭐ Total | ⭐⭐⭐ Limité |

---

## 🚀 PROCHAINES ÉTAPES

1. ✅ Créer le repo GitHub `moverz_main`
2. ✅ Configurer CapRover (VPS + installation)
3. ✅ Créer les 10 apps CapRover
4. ✅ Configurer les webhooks GitHub
5. ✅ Déployer le premier site (Bordeaux)
6. ✅ Déployer les 9 autres

**Prêt à commencer ? 🎉**

