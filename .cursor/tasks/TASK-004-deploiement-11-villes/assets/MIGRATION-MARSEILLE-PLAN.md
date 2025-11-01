# 🚀 Plan de Migration : Marseille

**Date :** 31 octobre 2025  
**Durée estimée :** 12-17 heures (répartie sur 3-4 jours)  
**Statut :** 🟡 PRÉPARATION

---

## 🚨 PROBLÈME CRITIQUE DÉTECTÉ

### Incohérence des Domaines Marseille

| Fichier | Domaine Actuel | Problème |
|---------|----------------|----------|
| `cityData.ts` ligne 34 | `devis-demenageur-marseille.fr` | ❌ Sans slash |
| `env.ts` ligne 9 | `www.marseille-demenageur.fr` | ❌ **Domaine DIFFÉRENT** + www |
| `next-sitemap.config.js` ligne 3 | `devis-demenageur-marseille.fr` | ❌ Sans slash |

**Impact :** 3 domaines différents = confusion totale ! 🔥

---

## ⚖️ DÉCISION REQUISE (URGENT)

### Quel domaine garder pour Marseille ?

#### Option A : `devis-demenageur-marseille.fr` (Recommandé ✅)
**Pour :**
- ✅ Cohérent avec Nice, Lyon, Bordeaux
- ✅ Pattern standard : `devis-demenageur-{ville}.fr`
- ✅ SEO : Mot-clé "devis" dans l'URL
- ✅ Déjà utilisé dans cityData + next-sitemap (2/3 fichiers)

**Contre :**
- ⚠️ Changer env.ts (1 fichier)

---

#### Option B : `www.marseille-demenageur.fr`
**Pour :**
- Format inversé : `{ville}-demenageur.fr`
- Avec www

**Contre :**
- ❌ Incohérent avec 9 autres villes
- ❌ Pas de "devis" dans l'URL (SEO moins bon)
- ❌ www = moins moderne
- ❌ Changer cityData + next-sitemap (2 fichiers)

---

### 💡 Recommandation

**GARDER : `devis-demenageur-marseille.fr`** (Option A)

**Actions :**
1. Corriger `env.ts` ligne 9
2. Ajouter slash final partout
3. Pas de redirection 301 nécessaire (domaine interne dev)

---

## 📋 Plan d'Action Marseille

### Phase 0 : Décision Domaine (MAINTENANT)
- [ ] Valider domaine : `devis-demenageur-marseille.fr`
- [ ] OK pour corriger ?

---

### Phase 1 : Configuration de Base (30 min)

#### 1.1 Corriger cityData.ts
```typescript
// AVANT
siteUrl: 'https://devis-demenageur-marseille.fr',

// APRÈS
siteUrl: 'https://devis-demenageur-marseille.fr/',  // ✅ Slash ajouté
```

**Fichier :** `sites/marseille/lib/cityData.ts` ligne 34

---

#### 1.2 Corriger env.ts
```typescript
// AVANT
SITE_URL: z.string().url().default('https://www.marseille-demenageur.fr'),

// APRÈS
SITE_URL: z.string().url().default('https://devis-demenageur-marseille.fr/'),
```

**Fichier :** `sites/marseille/lib/env.ts` ligne 9

---

#### 1.3 Corriger next-sitemap.config.js
```javascript
// AVANT
siteUrl: process.env.SITE_URL || 'https://devis-demenageur-marseille.fr',

// APRÈS
siteUrl: process.env.SITE_URL || 'https://devis-demenageur-marseille.fr/',
```

**Fichier :** `sites/marseille/next-sitemap.config.js` ligne 3

---

#### 1.4 Copier canonical-helper.ts
```bash
cp sites/nice/lib/canonical-helper.ts sites/marseille/lib/
```

**Vérifier :** Le helper existe déjà ? Sinon le créer.

---

#### 1.5 Vérifier robots.txt
**Fichier :** `sites/marseille/public/robots.txt`

```txt
# AVANT
Host: https://devis-demenageur-marseille.fr

# APRÈS
Host: https://devis-demenageur-marseille.fr/
```

---

### Phase 2 : Canonicals Pages Principales (2-3h)

#### Pages à Modifier

| Page | Fichier | Action |
|------|---------|--------|
| Homepage | `app/layout.tsx` | ✅ Déjà OK (utilise builder) |
| Partenaires | `app/partenaires/page.tsx` | Utiliser helper |
| Comment ça marche | `app/comment-ca-marche/page.tsx` | Utiliser helper |
| Blog | `app/blog/page.tsx` | Utiliser helper |
| Articles blog | `app/blog/[category]/[slug]/page.tsx` | Ajouter canonical |
| Contact | `app/contact/page.tsx` | Utiliser helper |
| FAQ | `app/faq/page.tsx` | Utiliser helper |
| Services | `app/services/page.tsx` | Utiliser helper |

**Exemple de correction :**

```typescript
// AVANT
export const metadata: Metadata = {
  title: "Partenaires...",
  alternates: {
    canonical: "https://devis-demenageur-marseille.fr/partenaires",  // ❌
  },
};

// APRÈS
import { getCanonicalUrl } from '@/lib/canonical-helper';

export const metadata: Metadata = {
  title: "Partenaires...",
  alternates: {
    canonical: getCanonicalUrl('partenaires'),  // ✅
  },
};
```

---

### Phase 3 : Sitemap (30 min)

**Fichier :** `app/sitemap.ts`

```typescript
// AVANT
const baseUrl = env.SITE_URL  // Sans slash garanti

const staticPages = [
  { url: baseUrl },  // ❌
  { url: `${baseUrl}/services` },  // ❌
]

// APRÈS
import { getCanonicalUrl } from '@/lib/canonical-helper';

const staticPages = [
  { url: getCanonicalUrl() },  // ✅ Homepage
  { url: getCanonicalUrl('services') },  // ✅ /services/
  { url: getCanonicalUrl('partenaires') },  // ✅
  // ... etc
]
```

---

### Phase 4 : Templates (1h)

#### CorridorPage.tsx
**Fichier :** `app/_templates/CorridorPage.tsx`

```typescript
// AVANT
export function generateCorridorPageMetadata(destination: string): Metadata {
  return {
    alternates: {
      canonical: `https://devis-demenageur-marseille.fr/marseille-vers-${destination}`,
    },
  };
}

// APRÈS
import { getCanonicalUrl } from '@/lib/canonical-helper';

export function generateCorridorPageMetadata(destination: string): Metadata {
  return {
    alternates: {
      canonical: getCanonicalUrl(`marseille-vers-${destination}`),
    },
  };
}
```

---

#### LocalPage.tsx
**Fichier :** `app/_templates/LocalPage.tsx`

Même principe : utiliser `getCanonicalUrl()`.

---

### Phase 5 : Breadcrumbs (2-3h)

**Problème :** 188 breadcrumbs à corriger

**Script automatique :**
```bash
cd sites/marseille

# Ajouter slash final aux breadcrumbs
find app -name "*.tsx" -type f -exec sed -i '' \
  's|href: "/\([^"]*[^/]\)"|href: "/\1/"|g' {} \;
```

**Vérification manuelle après :**
- Articles de blog : `/blog/categorie/article/`
- Pages quartiers : `/marseille/vieux-port/`
- Pages services : `/services/demenagement-standard-marseille/`

---

### Phase 6 : Liens Internes (4-6h)

**Problème :** 300-500 liens sans slash final

#### 6.1 Script Automatique
```bash
cd sites/marseille

# Ajouter slash final à TOUS les liens internes
find app components -name "*.tsx" -type f -exec sed -i '' \
  's|href="/\([^"]*[^/]\)"|href="/\1/"|g' {} \;
```

#### 6.2 Vérifications Manuelles Critiques

**Fichiers à vérifier :**
- `components/Header.tsx` (navigation principale)
- `components/Hero.tsx` (CTA homepage)
- `app/page.tsx` (liens homepage)
- `components/NeighborhoodsTeaser.tsx`
- `components/BlogTeaser.tsx`

---

### Phase 7 : Redirections 301 (2-3h)

**Fichier :** `next.config.mjs`

**Nombre de redirections à corriger :** ~150-200

```javascript
// AVANT
async redirects() {
  return [
    { source: '/mentions-legales/', destination: '/mentions-legales', permanent: true },
    //                                            ❌ SANS slash
  ];
}

// APRÈS
async redirects() {
  return [
    { source: '/mentions-legales/', destination: '/mentions-legales/', permanent: true },
    //                                            ✅ AVEC slash
  ];
}
```

**Script automatique :**
```bash
sed -i '' "s|destination: '/\([^']*[^/]\)'|destination: '/\1/'|g" \
  sites/marseille/next.config.mjs
```

---

### Phase 8 : Tests (2h)

#### 8.1 Build Local
```bash
cd sites/marseille
pnpm install
pnpm build
```

**Attendu :** Build réussi sans erreurs

---

#### 8.2 Start Local
```bash
pnpm start
```

**Attendu :** Serveur démarre sur http://localhost:3000

---

#### 8.3 Vérifier Canonicals
```bash
# Homepage
curl -s http://localhost:3000 | grep -o 'canonical" href="[^"]*'
# Attendu : canonical" href="https://devis-demenageur-marseille.fr/"

# Partenaires
curl -s http://localhost:3000/partenaires | grep -o 'canonical" href="[^"]*'
# Attendu : canonical" href="https://devis-demenageur-marseille.fr/partenaires/"

# Blog
curl -s http://localhost:3000/blog | grep -o 'canonical" href="[^"]*'
# Attendu : canonical" href="https://devis-demenageur-marseille.fr/blog/"
```

---

#### 8.4 Vérifier Sitemap
```bash
curl -s http://localhost:3000/sitemap.xml | grep -o '<loc>[^<]*</loc>' | head -20
```

**Attendu :** TOUTES les URLs avec slash final

```xml
<loc>https://devis-demenageur-marseille.fr/</loc>
<loc>https://devis-demenageur-marseille.fr/services/</loc>
<loc>https://devis-demenageur-marseille.fr/partenaires/</loc>
```

---

#### 8.5 Vérifier robots.txt
```bash
curl -s http://localhost:3000/robots.txt
```

**Attendu :**
```txt
Host: https://devis-demenageur-marseille.fr/
Sitemap: https://devis-demenageur-marseille.fr/sitemap.xml
```

---

#### 8.6 Vérifier StructuredData (JSON-LD)
```bash
curl -s http://localhost:3000 | grep '@id' | head -5
```

**Attendu :** Toutes URLs avec slash final
```json
"@id": "https://devis-demenageur-marseille.fr/#organization"
"url": "https://devis-demenageur-marseille.fr/"
```

---

#### 8.7 Vérifier Redirections (sample)
```bash
# Tester 5 redirections au hasard
curl -I http://localhost:3000/mentions-legales/
```

**Attendu :** `Location: /mentions-legales/` (avec slash)

---

### Phase 9 : Commit & Push (30 min)

```bash
cd /Users/guillaumestehelin/moverz_main-1

# Créer branche dédiée
git checkout -b feat/canonicals-marseille

# Ajouter modifications
git add sites/marseille/

# Commit
git commit -m "feat(marseille): Add trailing slash to all canonicals

Configuration:
- Fix domain inconsistency (3 different domains → 1)
- Add trailing slash to cityData.ts
- Fix env.ts domain + slash
- Update next-sitemap.config.js

Canonicals:
- Update all page metadata (8 pages)
- Add canonical-helper.ts
- Fix sitemap.ts (all URLs)
- Update templates (CorridorPage, LocalPage)

Links:
- Fix internal links (~300-500 links)
- Fix breadcrumbs (188 instances)
- Fix redirects (~150-200 redirects)

Tests:
- ✅ Build passing
- ✅ All canonicals with trailing slash
- ✅ Sitemap validated
- ✅ JSON-LD validated

Estimated SEO impact: +15-20% consolidation"

# Push
git push origin feat/canonicals-marseille
```

---

## 📊 Checklist Complète Marseille

### Préparation
- [ ] **DÉCISION : Domaine = `devis-demenageur-marseille.fr`**
- [ ] Feature Freeze Marseille annoncé (si équipe)
- [ ] Branche Git créée : `feat/canonicals-marseille`

### Configuration (30 min)
- [ ] cityData.ts → slash ajouté ligne 34
- [ ] env.ts → domaine + slash corrigés ligne 9
- [ ] next-sitemap.config.js → slash ajouté ligne 3
- [ ] canonical-helper.ts → copié depuis Nice
- [ ] robots.txt → vérifié

### Canonicals Pages (2-3h)
- [ ] app/partenaires/page.tsx
- [ ] app/comment-ca-marche/page.tsx
- [ ] app/blog/page.tsx
- [ ] app/blog/[category]/[slug]/page.tsx
- [ ] app/contact/page.tsx
- [ ] app/faq/page.tsx
- [ ] app/services/page.tsx
- [ ] Autres pages spécifiques Marseille

### Sitemap (30 min)
- [ ] app/sitemap.ts → helper utilisé partout

### Templates (1h)
- [ ] app/_templates/CorridorPage.tsx
- [ ] app/_templates/LocalPage.tsx

### Breadcrumbs (2-3h)
- [ ] Script exécuté
- [ ] Vérification manuelle 10 pages

### Liens Internes (4-6h)
- [ ] Script exécuté
- [ ] Header vérifié
- [ ] Hero vérifié
- [ ] Homepage vérifiée
- [ ] Components principaux vérifiés

### Redirections 301 (2-3h)
- [ ] Script exécuté sur next.config.mjs
- [ ] Vérification manuelle 10 redirections

### Tests (2h)
- [ ] Build local OK
- [ ] Start local OK
- [ ] Canonicals vérifiés (5 pages)
- [ ] Sitemap vérifié
- [ ] robots.txt vérifié
- [ ] JSON-LD vérifié
- [ ] Redirections vérifiées (sample)

### Finalisation (30 min)
- [ ] Commit créé
- [ ] Push vers GitHub
- [ ] Pull Request créée (si process)
- [ ] Tests CI/CD passés (si configuré)

---

## ⏱️ Planning Suggéré (4 jours)

### Jour 1 : Config + Canonicals (4h)
```
9h-10h   : Décision domaine + config base
10h-12h  : Canonicals pages principales
14h-16h  : Sitemap + templates
```

### Jour 2 : Breadcrumbs + Début Liens (4h)
```
9h-12h   : Breadcrumbs (script + vérif)
14h-16h  : Liens internes (50% fait)
```

### Jour 3 : Liens + Redirections (5h)
```
9h-11h   : Liens internes (50% restant)
11h-13h  : Redirections 301 (script)
14h-16h  : Vérifications manuelles
```

### Jour 4 : Tests + Finalisation (3h)
```
9h-10h   : Tests complets locaux
10h-11h  : Corrections bugs détectés
11h-12h  : Commit + Push + PR
```

**Total : 16 heures réparties sur 4 jours** ✅

---

## 🚨 Points d'Attention Marseille

### 1. Domaine env.ts Différent
⚠️ **CRITIQUE** : env.ts a `www.marseille-demenageur.fr`  
→ Corriger en PREMIER avant tout le reste

### 2. Redirections Existantes
Vérifier si Marseille a des redirections spécifiques dans `next.config.mjs`

### 3. Contenu Marseille
Articles blog Marseille : vérifier canonicals après script

---

## 📈 Résultats Attendus

### Avant Migration
```
❌ 3 domaines différents (cityData, env, sitemap)
❌ Canonicals sans slash final
❌ Liens internes sans slash
❌ Breadcrumbs sans slash
❌ Redirections vers URLs sans slash
```

### Après Migration
```
✅ 1 domaine unique : devis-demenageur-marseille.fr/
✅ Tous canonicals avec slash final
✅ Tous liens internes avec slash
✅ Tous breadcrumbs avec slash
✅ Toutes redirections avec slash
✅ Impact SEO estimé : +15-20% consolidation
```

---

## 🆘 En Cas de Problème

### Build Errors
```bash
# Vérifier les imports
grep -r "canonical-helper" sites/marseille/app

# Vérifier la syntaxe
cd sites/marseille && pnpm lint
```

### Canonical Tags Manquants
```bash
# Vérifier qu'ils sont bien générés
curl -s http://localhost:3000 | grep canonical
```

### Rollback si Nécessaire
```bash
git checkout main
git branch -D feat/canonicals-marseille
```

---

## ✅ Validation Finale

Avant de merger :
- [ ] Tous les tests locaux passent
- [ ] Aucune erreur de build
- [ ] 20 pages vérifiées manuellement (canonicals OK)
- [ ] Sitemap 100% avec slashes
- [ ] Documentation mise à jour
- [ ] Code reviewé (si équipe)

---

**Prêt à commencer ? On y va ! 🚀**

**Prochaine action :** Valider le domaine (`devis-demenageur-marseille.fr`)

