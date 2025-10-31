# 🚀 Migration Canonicals — 10 Villes Restantes

**Date:** 31 octobre 2025  
**Status:** 📋 Planification  
**Template:** Migration Marseille (validée ✅)

---

## 🎯 Objectif

Répliquer la migration des canonicals avec **trailing slash** (`/`) sur les 10 villes restantes.

**Référence:** Migration Marseille (100% réussie)  
**Documentation:** `MARSEILLE-MIGRATION-SUCCESS.md`

---

## 📊 Liste des Villes

| # | Ville | Domaine Actuel | Status Canonical | Priorité |
|---|-------|---------------|------------------|----------|
| ✅ | **Marseille** | `devis-demenageur-marseille.fr` | ✅ Migré | — |
| 1 | **Nice** | `devis-demenageur-nice.fr` | ⏳ À faire | ⭐⭐⭐ |
| 2 | **Toulouse** | `devis-demenageur-toulouse.fr` | ⏳ À faire | ⭐⭐⭐ |
| 3 | **Lyon** | `devis-demenageur-lyon.fr` | ⏳ À faire | ⭐⭐⭐ |
| 4 | **Bordeaux** | `www.bordeaux-demenageur.fr` | ⏳ À faire | ⭐⭐ |
| 5 | **Nantes** | `devis-demenageur-nantes.fr` | ⏳ À faire | ⭐⭐ |
| 6 | **Strasbourg** | `devis-demenageur-strasbourg.fr` | ⏳ À faire | ⭐⭐ |
| 7 | **Lille** | `devis-demenageur-lille.fr` | ⏳ À faire | ⭐⭐ |
| 8 | **Rennes** | `devis-demenageur-rennes.fr` | ⏳ À faire | ⭐⭐ |
| 9 | **Montpellier** | `devis-demenageur-montpellier.fr` | ⏳ À faire | ⭐ |
| 10 | **Rouen** | `devis-demenageur-rouen.fr` | ⏳ À faire | ⭐ |

**Total:** 10 villes × ~2h = **~20h de travail**

---

## 🔧 Template Migration (Workflow Marseille)

### Phase 1: Préparation (15 min)
1. ✅ Identifier domaine canonical
2. ✅ Vérifier structure fichiers
3. ✅ Checker si `.caproverenv` existe

### Phase 2: Configuration (20 min)
1. ✅ `next.config.mjs`: Ajouter `trailingSlash: true`
2. ✅ `lib/env.ts`: Mettre à jour `SITE_URL` default avec `/`
3. ✅ `lib/cityData.ts`: Mettre à jour `siteUrl` avec `/`
4. ✅ `next-sitemap.config.js`: Mettre à jour `siteUrl` avec `/`
5. ✅ `public/robots.txt`: Mettre à jour `Host` et `Sitemap` avec `/`

### Phase 3: Helper Canonical (10 min)
1. ✅ Copier `lib/canonical-helper.ts` depuis Marseille
2. ✅ Vérifier imports

### Phase 4: SEO Metadata (15 min)
1. ✅ `lib/seo-builders.ts`: Nettoyer `alternates.canonical`
2. ✅ Forcer `siteUrlWithSlash` pour `metadataBase` et `openGraph.url`

### Phase 5: Pages & Templates (30 min)
1. ✅ `app/partenaires/page.tsx`: Ajouter `getCanonicalUrl('partenaires')`
2. ✅ `app/comment-ca-marche/page.tsx`: Ajouter `getCanonicalUrl('comment-ca-marche')`
3. ✅ `app/blog/page.tsx`: Ajouter `getCanonicalUrl('blog')`
4. ✅ `app/_templates/CorridorPage.tsx`: Utiliser `getCanonicalUrl()`
5. ✅ `app/_templates/LocalPage.tsx`: Utiliser `getCanonicalUrl()` + Fix bug hardcoded

### Phase 6: Sitemap (15 min)
1. ✅ `app/sitemap.ts`: Remplacer tous les `${baseUrl}/path` par `getCanonicalUrl('path')`

### Phase 7: Liens Internes (20 min)
1. ✅ Créer script `scripts/fix-breadcrumbs-{ville}.sh`
2. ✅ Créer script `scripts/fix-internal-links-{ville}.sh`
3. ✅ Exécuter scripts
4. ✅ Vérifier `layout.tsx` (pas de slash sur `.json`, `.png`)

### Phase 8: Deployment (15 min)
1. ✅ Créer/Vérifier `.caproverenv` avec `SITE_URL`
2. ✅ Fixer `Dockerfile` (ARG avec default value)
3. ✅ Commit + Push vers repo ville
4. ✅ Commit + Push vers monorepo

### Phase 9: Tests Production (10 min)
1. ✅ Test canonical homepage
2. ✅ Test Open Graph URL
3. ✅ Test sitemap
4. ✅ Test redirections 308
5. ✅ Rapport final

**Total:** ~2h30 par ville (avec template rodé)

---

## 📋 Checklist Réutilisable

### Configuration Files
```bash
# 1. next.config.mjs
trailingSlash: true

# 2. lib/env.ts
SITE_URL: z.string().url().default('https://devis-demenageur-{ville}.fr/')

# 3. lib/cityData.ts
siteUrl: 'https://devis-demenageur-{ville}.fr/'

# 4. next-sitemap.config.js
siteUrl: process.env.SITE_URL || 'https://devis-demenageur-{ville}.fr/'

# 5. public/robots.txt
Host: https://devis-demenageur-{ville}.fr/
Sitemap: https://devis-demenageur-{ville}.fr/sitemap.xml
```

### Files to Modify (Standard)
```
✅ next.config.mjs
✅ lib/env.ts
✅ lib/cityData.ts
✅ lib/canonical-helper.ts (copier)
✅ lib/seo-builders.ts
✅ next-sitemap.config.js
✅ public/robots.txt
✅ app/sitemap.ts
✅ app/partenaires/page.tsx
✅ app/comment-ca-marche/page.tsx
✅ app/blog/page.tsx
✅ app/_templates/CorridorPage.tsx
✅ app/_templates/LocalPage.tsx
✅ app/layout.tsx (vérifier static files)
✅ .caproverenv (créer si absent)
✅ Dockerfile (fixer ARG default)
```

### Scripts to Create
```bash
scripts/fix-breadcrumbs-{ville}.sh
scripts/fix-internal-links-{ville}.sh
```

### Tests Production (Commandes)
```bash
# Test Canonical Homepage
curl -s https://devis-demenageur-{ville}.fr | grep 'rel="canonical"'

# Test Sitemap
curl -s https://devis-demenageur-{ville}.fr/sitemap.xml | grep '<loc>' | head -5

# Test Redirection 308
curl -I https://devis-demenageur-{ville}.fr/partenaires 2>&1 | grep -E "HTTP|location"
```

---

## 🎯 Stratégie de Rollout

### Option A: Séquentiel (Recommandé)
**Une ville à la fois**, tester en production avant la suivante.

**Avantages:**
- ✅ Validation immédiate
- ✅ Détection d'erreurs rapide
- ✅ Apprentissage continu

**Timeline:** ~20h sur 2-3 jours

**Ordre suggéré:**
1. Nice (priorité haute + gros volume)
2. Toulouse (priorité haute)
3. Lyon (priorité haute)
4. Bordeaux (cas spécial: `www.`)
5. Nantes → Strasbourg → Lille → Rennes (priorité moyenne)
6. Montpellier → Rouen (priorité basse)

---

### Option B: Par Batch
**Groupes de 2-3 villes**, puis validation.

**Avantages:**
- ✅ Plus rapide (1-2 jours)
- ⚠️ Risque si erreur commune

**Batches:**
- Batch 1: Nice + Toulouse + Lyon
- Batch 2: Bordeaux + Nantes + Strasbourg
- Batch 3: Lille + Rennes + Montpellier + Rouen

---

## 🚨 Points de Vigilance

### Cas Spécial: Bordeaux
**Domaine:** `www.bordeaux-demenageur.fr` (avec `www`)

**À vérifier:**
- ✅ `siteUrl` doit être `https://www.bordeaux-demenageur.fr/`
- ✅ Pas `https://bordeaux-demenageur.fr/`

### Cas Spécial: Lille
**Config:** `next.config.mjs` (pas `.js`)

### Dockerfile ARG Default
**Tous sites:**
```dockerfile
ARG SITE_URL=https://devis-demenageur-{ville}.fr/
ENV SITE_URL=${SITE_URL}
```

### .caproverenv
**Vérifier existence** pour chaque ville.

**Si absent, créer:**
```bash
SITE_URL=https://devis-demenageur-{ville}.fr/
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

---

## 📊 Suivi Migration

| Ville | Status | Commit | Build CapRover | Tests Prod | Date |
|-------|--------|--------|----------------|------------|------|
| Marseille | ✅ | ✅ | ✅ | ✅ | 31 oct |
| Nice | ⏳ | — | — | — | — |
| Toulouse | ⏳ | — | — | — | — |
| Lyon | ⏳ | — | — | — | — |
| Bordeaux | ⏳ | — | — | — | — |
| Nantes | ⏳ | — | — | — | — |
| Strasbourg | ⏳ | — | — | — | — |
| Lille | ⏳ | — | — | — | — |
| Rennes | ⏳ | — | — | — | — |
| Montpellier | ⏳ | — | — | — | — |
| Rouen | ⏳ | — | — | — | — |

**Progression:** 1/11 (9%)

---

## 🎯 Prochaine Action

**Commencer par Nice:**
1. ✅ Priorité haute (gros volume trafic)
2. ✅ Structure standard (comme Marseille)
3. ✅ Domaine simple: `devis-demenageur-nice.fr`

**Commande pour démarrer:**
```bash
# Dire "go nice" pour lancer migration Nice
```

---

**Auteur:** IA Assistant  
**Date:** 31 octobre 2025  
**Status:** 📋 **PRÊT À DÉMARRER**

