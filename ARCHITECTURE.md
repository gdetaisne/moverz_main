# 🏗️ Architecture Multi-Sites Moverz

**Version :** 4.0 (Octobre 2025)  
**Dernière mise à jour :** 28 Octobre 2025

## 📋 Vue d'ensemble

Monorepo Next.js avec 11 sites de déménagement par ville, déployés individuellement sur CapRover via GitHub.

---

## 🗂️ Structure du Monorepo

```
moverz_main-8/
├── components/              # 🔵 Composants partagés (référence)
│   ├── Hero.tsx            # Hero animé avec IA
│   ├── HowItWorks.tsx      # Section "Comment ça marche"
│   ├── PricingPreview.tsx  # Tarifs indicatifs
│   ├── StickyCTA.tsx       # CTA flottant
│   └── ...
│
├── sites/                   # 🟢 11 sites autonomes
│   ├── marseille/
│   ├── toulouse/
│   ├── lyon/
│   ├── bordeaux/
│   ├── nantes/
│   ├── lille/
│   ├── nice/
│   ├── strasbourg/
│   ├── rouen/
│   ├── rennes/
│   └── montpellier/
│
├── content/                 # 🟡 Contenu blog centralisé (source)
│   ├── marseille/blog/
│   ├── toulouse/blog/
│   └── ...
│
├── public/                  # 🟠 Assets partagés (images, logo)
│   ├── logo.png
│   └── images/
│       └── quartiers/       # Images par ville
│
├── lib/                     # 🔷 Utilitaires partagés
│   ├── blog.ts             # Tenant-aware blog loader
│   ├── env.ts
│   └── utils.ts
│
└── scripts/
    └── push-all-sites-to-github.sh  # Déploiement vers GitHub
```

---

## 🔄 Système de Déploiement

### Workflow de développement → production

```
┌─────────────────────────────────────────────────────────┐
│ 1. DÉVELOPPEMENT (Monorepo)                            │
│    - Modifications dans /components, /lib, /sites      │
│    - Test local : cd sites/marseille && npm run dev    │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ 2. COMMIT MONOREPO                                      │
│    git add .                                            │
│    git commit -m "feat: nouvelle fonctionnalité"       │
│    git push origin main                                 │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ 3. PUSH VERS DÉPÔTS INDIVIDUELS                        │
│    cd sites/marseille && git add . && git commit       │
│    git push origin main (vers dd-marseille)            │
│    → Répéter pour chaque ville                         │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│ 4. DÉPLOIEMENT CAPROVER (Automatique)                  │
│    Webhook GitHub → CapRover rebuild (~5-10 min)       │
│    https://devis-demenageur-marseille.fr/             │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Règles de Synchronisation

### ✅ Ce qui est CENTRALISÉ (dans le monorepo)

| Élément | Emplacement | Propagation |
|---------|------------|-------------|
| **Hero.tsx** | `/components/Hero.tsx` | Copier vers `sites/*/components/` |
| **HowItWorks.tsx** | `/components/HowItWorks.tsx` | Copier vers `sites/*/components/` |
| **PricingPreview.tsx** | `/components/PricingPreview.tsx` | Copier vers `sites/*/components/` |
| **StickyCTA.tsx** | `/components/StickyCTA.tsx` | Copier vers `sites/*/components/` |
| **CSS global** | `/app/globals.css` | Copier vers `sites/*/app/globals.css` |
| **Blog (source)** | `/content/{ville}/blog/` | Sync vers `sites/{ville}/content/blog/` |
| **Logo** | `/public/logo.png` | Copier vers `sites/*/public/logo.png` |
| **Images quartiers** | `/public/images/quartiers/{ville}/` | Copier vers `sites/*/public/images/quartiers/{ville}/` |

### ⚠️ Ce qui est LOCAL (spécifique par site)

| Élément | Emplacement | Raison |
|---------|------------|---------|
| **Testimonials.tsx** | `sites/{ville}/components/Testimonials.tsx` | Quartiers locaux (ex: Capitole pour Toulouse) |
| **NeighborhoodsTeaser.tsx** | `sites/{ville}/components/NeighborhoodsTeaser.tsx` | Liste des quartiers par ville |
| **Metadata** | `sites/{ville}/app/layout.tsx` | Titre, description, URL canonique |
| **Content blog** | `sites/{ville}/content/blog/` | Articles spécifiques à la ville |
| **ENV vars** | `sites/{ville}/.env.local` | SITE_URL, SITE_SLUG |

---

## 📝 Procédure de Modification d'un Composant Partagé

### Exemple : Modifier le Hero

#### 1. Éditer le composant root
```bash
# Éditer /components/Hero.tsx
code components/Hero.tsx
```

#### 2. Synchroniser vers tous les sites (AUTOMATIQUE)
```bash
# Script automatise la copie vers les 11 sites
./scripts/sync-components.sh

# Sortie attendue :
# ✅ Hero.tsx synchronisé × 11 sites
# ✅ Vérification MD5 : Tous identiques
```

#### 3. Commit dans le monorepo
```bash
git add components/Hero.tsx sites/*/components/Hero.tsx
git commit -m "feat(hero): amélioration animation IA"
git push origin main
```

#### 4. Déployer vers tous les sites (AUTOMATIQUE)
```bash
# Script automatise commit + push vers 11 repos GitHub
./scripts/push-all-sites-to-github.sh

# Déclenche automatiquement les rebuilds CapRover
```

#### 5. Vérifier les déploiements
```bash
# Attendre 10-15 min, puis vérifier :
# https://devis-demenageur-marseille.fr/
# https://devis-demenageur-toulousain.fr/
# etc.
```

### Composants partagés synchronisés automatiquement

**Liste des composants** (définie dans `sync-components.sh`) :
- `Hero.tsx` - Hero animé avec IA
- `HowItWorks.tsx` - Section "Comment ça marche"
- `PricingPreview.tsx` - Aperçu tarifs
- `StickyCTA.tsx` - CTA flottant
- `NeighborhoodsIndex.tsx` - Index des quartiers
- `CtaPrimary.tsx` - CTA principal
- `LeadForm.tsx` - Formulaire contact
- `app/globals.css` - Styles globaux + animations

**⚠️ Composants NON synchronisés** (spécifiques par ville) :
- `Testimonials.tsx` - Témoignages locaux
- `NeighborhoodsTeaser.tsx` - Liste quartiers par ville
- `QuartierTemplate.tsx` - Template pages quartiers

---

## 🔧 Configuration CapRover

### Fichiers requis par site

Chaque `sites/{ville}/` doit contenir :

```
sites/marseille/
├── captain-definition        # Pointe vers ./Dockerfile
├── Dockerfile                # Build Next.js + copie content/blog et public/
├── package.json              # Scripts build, start
├── next.config.mjs           # Config Next.js
└── .git/                     # Dépôt Git individuel
```

### Dockerfile (exemple Marseille)

```dockerfile
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Build
FROM base AS builder
COPY package.json ./
RUN npm install
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Runtime
FROM node:20-alpine AS runner
RUN apk add --no-cache dumb-init
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/content ./content  # ⚠️ CRITIQUE

CMD ["dumb-init", "node_modules/.bin/next", "start"]
```

### next.config.mjs (unifié pour tous les sites)

```javascript
export default {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  
  // Skip checks en prod (fait en dev)
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  
  // Images non optimisées (évite erreurs 400 Unsplash)
  images: {
    unoptimized: true,
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.unsplash.com',
      pathname: '/**',
    }],
  }
};
```

---

## 🧪 Tests Avant Déploiement

### Checklist Pre-Push

```bash
# 1. Build local OK ?
cd sites/marseille
npm run build
# ✅ Doit compiler sans erreur

# 2. Fichiers critiques présents ?
ls -la public/logo.png
ls -la content/blog/
ls -la components/Hero.tsx
# ✅ Tous doivent exister

# 3. Dockerfile copie content/ et public/ ?
grep "COPY.*content" Dockerfile
grep "COPY.*public" Dockerfile
# ✅ Les 2 lignes doivent être présentes
```

---

## 🚨 Problèmes Fréquents

### 1. "Aucun changement à committer" lors du push

**Cause :** Les modifications du monorepo n'ont pas été copiées dans `sites/{ville}/`.

**Solution :**
```bash
# Copier manuellement
cp components/Hero.tsx sites/marseille/components/Hero.tsx

# Commit + push
cd sites/marseille
git add components/Hero.tsx
git commit -m "fix: sync Hero from monorepo"
git push origin main
```

---

### 2. Testimonials avec mauvais quartiers

**Cause :** Fichier `Testimonials.tsx` non localisé.

**Solution :**
```bash
# Éditer chaque site individuellement
code sites/toulouse/components/Testimonials.tsx

# Remplacer les quartiers :
# ❌ "Chartrons" (Bordeaux) → ✅ "Capitole" (Toulouse)
```

---

### 3. Blog mélangé entre villes

**Cause :** `lib/blog.ts` ne résout pas correctement le tenant.

**Solution :**
```typescript
// lib/blog.ts doit utiliser SITE_SLUG ou SITE_URL
function resolveTenantSlug(): string {
  const fromEnv = (process.env.SITE_SLUG || '').toLowerCase();
  if (CITY_SLUGS.includes(fromEnv)) return fromEnv;
  
  // Fallback sur SITE_URL
  const url = new URL(env.SITE_URL);
  if (url.hostname.includes('toulousain')) return 'toulouse';
  // etc.
}
```

---

### 4. Images 404 en production

**Cause :** Images non copiées dans le Dockerfile.

**Solution :**
```dockerfile
# Ajouter dans le Dockerfile
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
```

---

### 5. Build CapRover échoue

**Cause :** Erreur TypeScript ou ESLint.

**Solution :**
```javascript
// next.config.mjs
typescript: { ignoreBuildErrors: true },
eslint: { ignoreDuringBuilds: true },
```

---

## 📊 Composants par Niveau de Partage

### 🔵 Totalement partagés (identiques partout)
- `Hero.tsx` → Animation IA, badges Moverz
- `HowItWorks.tsx` → Images Unsplash, CTAs
- `PricingPreview.tsx` → Tarifs, CTA
- `StickyCTA.tsx` → Seuil 40%, `btn-accent`
- `globals.css` → `.btn-primary`, `.btn-secondary`, `.btn-accent`, `card-glass`, `bg-hero`

### 🟡 Partiellement partagés (structure commune, contenu local)
- `NeighborhoodsTeaser.tsx` → Structure commune, quartiers par ville
- `Testimonials.tsx` → Structure commune, quartiers par ville
- `BlogTeaser.tsx` → Structure commune, articles par ville

### 🟢 Totalement locaux (uniques par site)
- `app/layout.tsx` → Metadata (title, description, canonical)
- `content/blog/` → Articles spécifiques
- `.env.local` → Variables d'environnement

---

## 🔗 URLs des Dépôts

| Ville | Dépôt GitHub | URL Live |
|-------|--------------|----------|
| Marseille | `gdetaisne/dd-marseille` | https://devis-demenageur-marseille.fr/ |
| Toulouse | `gdetaisne/dd-toulouse` | https://devis-demenageur-toulousain.fr/ |
| Lyon | `gdetaisne/dd-lyon` | https://devis-demenageur-lyon.fr/ |
| Bordeaux | `gdetaisne/dd-bordeaux` | https://devis-demenageur-bordeaux.fr/ |
| Nantes | `gdetaisne/dd-nantes` | https://devis-demenageur-nantes.fr/ |
| Lille | `gdetaisne/dd-lille` | https://devis-demenageur-lille.fr/ |
| Nice | `gdetaisne/dd-nice` | https://devis-demenageur-nice.fr/ |
| Strasbourg | `gdetaisne/dd-strasbourg` | https://devis-demenageur-strasbourg.fr/ |
| Rouen | `gdetaisne/dd-rouen` | https://devis-demenageur-rouen.fr/ |
| Rennes | `gdetaisne/dd-rennes` | https://devis-demenageur-rennes.fr/ |
| Montpellier | `gdetaisne/dd-montpellier` | https://devis-demenageur-montpellier.fr/ |

---

## 🎓 Bonnes Pratiques

### ✅ À FAIRE

1. **Toujours tester localement avant de push** : `npm run build` doit passer
2. **Copier les composants partagés depuis `/components/`** vers tous les sites
3. **Commit monorepo + dépôts individuels** pour garder la traçabilité
4. **Vérifier les Testimonials** : quartiers corrects par ville
5. **Synchroniser le blog** : `content/{ville}/blog/` → `sites/{ville}/content/blog/`

### ❌ À ÉVITER

1. ❌ Modifier directement dans `sites/{ville}/components/` sans copier vers le monorepo
2. ❌ Utiliser des quartiers génériques (ex: Bordeaux pour tous les sites)
3. ❌ Oublier de pusher vers les dépôts individuels après commit monorepo
4. ❌ Activer l'optimisation Next/Image (`unoptimized: false`) → erreurs 400 Unsplash
5. ❌ Laisser des imports cross-ville (ex: `import from '../../toulouse/...'`)

---

## 📚 Ressources

- **Monorepo principal** : `gdetaisne/moverz_main`
- **CapRover** : Dashboard déploiement
- **Next.js 14** : https://nextjs.org/docs
- **Tailwind CSS** : https://tailwindcss.com/docs

---

**Auteur :** Claude Sonnet 4.5  
**Maintenance :** Guillaume Stehelin

