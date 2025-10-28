# 🤖 Contexte pour AI / Cursor

**Pour : Claude, GPT, Copilot, Cursor AI**  
**Projet** : Moverz Multi-Sites (Déménageurs IA)  
**Dernière mise à jour** : 28 Octobre 2025

---

## 📐 Architecture Globale

### Type de projet
- **Monorepo** Next.js 14 (App Router)
- **11 sites indépendants** dans `sites/<ville>/`
- **Blog multi-tenant** dans `content/<ville>/blog/`
- **Déploiement** : CapRover via webhooks GitHub

### Stack technique
- Next.js 14.2.33 (App Router)
- TypeScript 5
- Tailwind CSS
- Prisma (PostgreSQL)
- Zod (validation)
- Node 24.x

---

## 🚨 Règles Strictes (JAMAIS enfreindre)

### ❌ Interdictions absolues

1. **Pas d'imports cross-ville**
```typescript
// ❌ INTERDIT
import { Hero } from '../../marseille/components/Hero'
import { Hero } from '@/sites/toulouse/components/Hero'

// ✅ CORRECT
import { Hero } from '@/components/Hero'  // Import local uniquement
```

2. **Pas de modification de version Node**
```json
// ❌ INTERDIT de changer
"engines": {
  "node": "24.x"
}
```

3. **Pas de modification de structure**
```bash
# ❌ INTERDIT
sites/
  marseille-toulouse-shared/  # Pas de dossiers partagés entre sites

# ✅ CORRECT
sites/
  marseille/  # Chaque site totalement isolé
  toulouse/
```

4. **Pas d'optimisation Next/Image pour Unsplash**
```javascript
// ✅ OBLIGATOIRE dans next.config.mjs
images: {
  unoptimized: true,  // Ne PAS enlever
  remotePatterns: [...]
}
```

---

## ✅ Conventions & Standards

### Structure de fichiers

```
sites/<ville>/
├── app/
│   ├── page.tsx           # Home
│   ├── layout.tsx         # Layout + metadata
│   ├── blog/              # Blog local
│   ├── <ville>/           # Pages quartiers
│   └── globals.css        # Styles + tokens CSS
├── components/
│   ├── Hero.tsx           # Composants locaux
│   ├── NeighborhoodsTeaser.tsx
│   └── Testimonials.tsx   # ⚠️ Doit avoir quartiers corrects
├── public/
│   ├── robots.txt         # ⚠️ Host SANS www.
│   └── images/
├── next.config.mjs        # ⚠️ unoptimized: true
├── .env.local             # SITE_SLUG, SITE_URL...
└── package.json

content/<ville>/blog/      # Contenu markdown
  ├── piliers/             # Articles principaux
  └── satellites/          # Articles secondaires
```

### Nommage

| Type | Convention | Exemple |
|------|------------|---------|
| URLs | kebab-case | `/marseille/vieux-port` |
| Fichiers composants | PascalCase | `HeroSection.tsx` |
| Slugs blog | kebab-case | `demenagement-urgent-marseille.md` |
| Variables env | SCREAMING_SNAKE | `SITE_URL`, `DATABASE_URL` |
| Fonctions | camelCase | `getBlogPosts()` |

### CSS Tokens standardisés

**Utilisez TOUJOURS ces classes** (définies dans `globals.css`) :

```css
/* Boutons */
.btn-primary    /* CTA principal (orange gradient) */
.btn-secondary  /* CTA secondaire (outline) */
.btn-accent     /* CTA sticky (bleu) */

/* Cartes */
.card-glass     /* Carte glassmorphism */

/* Backgrounds */
.bg-hero        /* Gradient hero animé */
```

---

## 🔄 Workflow Standard

### Modification d'un site

```bash
# 1. Modifier dans le monorepo
cd sites/<ville>
# Éditer les fichiers...

# 2. Tester en local
npm run dev -- -p <PORT>  # Voir SITES.md pour les ports

# 3. Vérifier
open http://localhost:<PORT>
open http://localhost:<PORT>/blog

# 4. Commit monorepo
cd ../..  # Retour racine
git add .
git commit -m "fix(<ville>): description"
git push origin main

# 5. Push vers repo individuel
cd sites/<ville>
git add .
git commit -m "fix: description"
git push origin main
# → Déclenche automatiquement le build CapRover
```

### Modification globale (tous les sites)

```bash
# 1. Modifier tous les sites
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  # Appliquer changement à sites/$city/...
done

# 2. Commit monorepo
git add .
git commit -m "feat: description globale"
git push origin main

# 3. Push tous les sites
./scripts/push-all-sites-to-github.sh
```

---

## 🎯 Tâches Courantes

### Ajouter un article de blog

```bash
# 1. Créer le fichier markdown
touch content/<ville>/blog/satellites/nouvel-article.md

# 2. Frontmatter obligatoire
cat > content/<ville>/blog/satellites/nouvel-article.md << 'EOF'
---
title: "Titre SEO-friendly"
description: "Meta description 150-160 char"
date: "2025-10-28"
category: "demenagement-entreprise"
author: "Équipe Moverz"
---

# Contenu ici...
EOF

# 3. Tester
cd sites/<ville>
npm run dev -- -p <PORT>
open http://localhost:<PORT>/blog

# 4. Push (voir workflow ci-dessus)
```

### Modifier un composant visuel (ex: Hero)

```bash
# 1. Identifier les sites concernés
# Si changement global → tous les sites
# Si changement local → 1 seul site

# 2. Modifier le composant
# sites/<ville>/components/Hero.tsx

# 3. Respecter les tokens CSS
className="btn-primary"      # Pas de classes inline custom
className="card-glass"
className="bg-hero"

# 4. Tester responsive
# Mobile, Tablet, Desktop

# 5. Push (voir workflow)
```

### Corriger les témoignages (localisation)

```typescript
// sites/<ville>/components/Testimonials.tsx

// ❌ INCORRECT (quartiers d'une autre ville)
const testimonials = [
  { name: "Marie D.", location: "Vieux-Port" },  // Marseille sur site Toulouse !
]

// ✅ CORRECT (quartiers de la ville du site)
// Toulouse
const testimonials = [
  { name: "Marie D.", location: "Capitole" },
  { name: "Jean M.", location: "Saint-Cyprien" },
]

// Référence quartiers : voir SITES.md
```

---

## 🐛 Troubleshooting Fréquent

### Erreur : "Blog list is empty"

```bash
# Cause : Contenu blog au mauvais endroit
# Solution :
ls content/<ville>/blog/  # Doit contenir des .md
# Si vide, copier depuis sites/<ville>/content/blog/
```

### Erreur : "Cannot find module '@/components/Hero'"

```bash
# Cause : Import cross-ville ou chemin incorrect
# Solution : Vérifier tsconfig.json paths
{
  "paths": {
    "@/*": ["./*"]  # Relatif au dossier du site
  }
}
```

### Images cassées en production

```javascript
// Cause : Image optimizer activé pour Unsplash
// Solution : Vérifier next.config.mjs
images: {
  unoptimized: true,  // DOIT être présent
}
```

### robots.txt incohérent avec canonical

```txt
# Vérifier que Host correspond à metadataBase
# ❌ INCORRECT
Host: https://www.devis-demenageur-marseille.fr
metadataBase: new URL("https://devis-demenageur-marseille.fr")

# ✅ CORRECT (sans www.)
Host: https://devis-demenageur-marseille.fr
metadataBase: new URL("https://devis-demenageur-marseille.fr")
```

---

## 🧪 Tests à Exécuter

### Avant chaque commit

```bash
# 1. Lint
npm run lint

# 2. Build test
npm run build

# 3. Vérification visuelle
npm run dev
# → Tester home, blog, page quartier

# 4. Vérification SEO
curl -I http://localhost:3020 | grep -i "x-robots"
curl http://localhost:3020/robots.txt
```

### Avant push production

```bash
# 1. Tests ci-dessus +

# 2. Vérifier env vars
grep SITE_URL .env.local
grep SITE_SLUG .env.local

# 3. Vérifier canonical
# Dans layout.tsx
grep metadataBase app/layout.tsx

# 4. Vérifier build logs
npm run build 2>&1 | grep -i error
```

---

## 📦 Variables d'Environnement

### Obligatoires (tous les sites)

```bash
# Identité
SITE_SLUG=<ville>
SITE_URL=https://devis-demenageur-<ville>.fr

# Base de données
DATABASE_URL=postgresql://...

# Services
AI_SERVICE_URL=http://localhost:8000

# Auth
JWT_SECRET=<secret>
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:302X

# Serveur
PORT=302X
NODE_ENV=development
```

### Spécificités

```bash
# Toulouse uniquement
SITE_URL=https://devis-demenageur-toulousain.fr  # ⚠️ Note "toulousain"
```

---

## 🎨 Design System

### Palette de couleurs

```css
/* Primary (Orange) */
--color-primary: #FF6B35;
--color-primary-dark: #E55A2B;

/* Secondary (Blue) */
--color-secondary: #4A90E2;

/* Neutral */
--color-dark: #04163a;
--color-light: #f8f9fa;

/* Gradients */
--gradient-hero: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-primary: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
```

### Espacements (Tailwind)

```tsx
// Marges internes composants
<section className="py-16 px-4">  // Mobile
<section className="py-24 px-8">  // Desktop

// Gaps grilles
<div className="grid gap-6">      // Mobile
<div className="grid gap-8">      // Desktop
```

---

## 🔐 Sécurité & Performance

### Headers à inclure

```typescript
// middleware.ts ou next.config.js
headers: [
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
]
```

### Images optimisées

```tsx
// ✅ Utiliser next/image
import Image from 'next/image'

<Image
  src="/images/hero.jpg"
  alt="Description précise"
  width={1200}
  height={630}
  priority  // Pour hero/LCP
/>
```

---

## 📚 Ressources Complémentaires

- **Architecture complète** : `ARCHITECTURE.md`
- **Guide déploiement** : `DEPLOY.md`
- **État des sites** : `SITES.md`
- **Historique** : `CHANGELOG.md`
- **Tâches futures** : `TODO.md`

---

## 💡 Prompts Suggérés pour AI

### Ajout de fonctionnalité

```
"Ajoute [fonctionnalité] au site [ville].
- Respecte les tokens CSS (.btn-primary, .card-glass)
- N'importe aucun composant cross-ville
- Teste sur mobile/desktop
- Fournis le diff complet"
```

### Debug

```
"Erreur [message] sur site [ville].
- Vérifie CONTEXT.md pour règles projet
- Propose 2-3 solutions avec trade-offs
- Fournis commandes de diagnostic"
```

### Refactoring

```
"Refactorise [composant] pour [raison].
- Maintiens compatibilité avec 11 sites
- Liste les fichiers impactés
- Fournis plan de migration progressif"
```

---

**🎯 Objectif** : Ce fichier doit permettre à toute AI de comprendre le projet en < 2 minutes et d'éviter 95% des erreurs courantes.

