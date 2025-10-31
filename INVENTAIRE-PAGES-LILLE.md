# 📋 Inventaire Pages Lille — Status Canonical

**Date:** 31 octobre 2025  
**Total pages:** 32 fichiers page.tsx

---

## ✅ Pages AVEC Canonical (16/32)

| # | Page | Fichier | Type | Note |
|---|------|---------|------|------|
| 1 | `/` | `app/page.tsx` | Homepage | Via layout.tsx |
| 2 | `/blog/` | `app/blog/page.tsx` | Blog index | ✅ getCanonicalUrl |
| 3 | `/comment-ca-marche/` | `app/comment-ca-marche/page.tsx` | Statique | ✅ getCanonicalUrl |
| 4 | `/partenaires/` | `app/partenaires/page.tsx` | Statique | ✅ getCanonicalUrl |
| 5 | `/services/` | `app/services/page.tsx` | Statique | ✅ getCanonicalUrl |
| 6-11 | Corridors | `app/lille-vers-*/page.tsx` | Dynamique | ✅ generateCorridorPageMetadata |
| 12-17 | Quartiers | `app/lille/*/page.tsx` | Dynamique | ✅ generateLocalPageMetadata |

---

## ❌ Pages SANS Canonical (16/32)

### 🔴 Priorité CRITIQUE (Pages Commerciales)

| # | Page | Fichier | Impact SEO | Actions |
|---|------|---------|------------|---------|
| 1 | `/contact/` | `app/contact/page.tsx` | 🔴 Haut | Ajouter metadata |
| 2 | `/inventaire-ia/` | `app/inventaire-ia/page.tsx` | 🔴 Haut | Ajouter metadata |
| 3 | `/services/demenagement-economique-lille/` | `app/services/demenagement-economique-lille/page.tsx` | 🔴 Haut | Ajouter metadata |
| 4 | `/services/demenagement-standard-lille/` | `app/services/demenagement-standard-lille/page.tsx` | 🔴 Haut | Ajouter metadata |
| 5 | `/services/demenagement-premium-lille/` | `app/services/demenagement-premium-lille/page.tsx` | 🔴 Haut | Ajouter metadata |

### 🟡 Priorité HAUTE (Blog)

| # | Page | Fichier | Impact SEO | Actions |
|---|------|---------|------------|---------|
| 6 | `/blog/[category]/[slug]/` | `app/blog/[category]/[slug]/page.tsx` | 🟡 Moyen | Template dynamique |
| 7 | `/blog/[category]/` | `app/blog/[category]/page.tsx` | 🟡 Moyen | Template dynamique |

**Impact:** 111 articles blog sur Lille

### 🟢 Priorité MOYENNE (Pages Légales)

| # | Page | Fichier | Impact SEO | Actions |
|---|------|---------|------------|---------|
| 8 | `/cgu/` | `app/cgu/page.tsx` | 🟢 Bas | Ajouter metadata |
| 9 | `/cgv/` | `app/cgv/page.tsx` | 🟢 Bas | Ajouter metadata |
| 10 | `/mentions-legales/` | `app/mentions-legales/page.tsx` | 🟢 Bas | Ajouter metadata |
| 11 | `/politique-confidentialite/` | `app/politique-confidentialite/page.tsx` | 🟢 Bas | Ajouter metadata |

### 🟢 Priorité BASSE (Pages Secondaires)

| # | Page | Fichier | Impact SEO | Actions |
|---|------|---------|------------|---------|
| 12 | `/estimation-rapide/` | `app/estimation-rapide/page.tsx` | 🟢 Bas | Ajouter metadata |
| 13 | `/notre-offre/` | `app/notre-offre/page.tsx` | 🟢 Bas | Ajouter metadata |
| 14 | `/quartiers-lille/` | `app/quartiers-lille/page.tsx` | 🟢 Bas | Ajouter metadata |
| 15 | `/faq/` | `app/faq/page.tsx` | 🟡 Moyen | Via layout (déjà corrigé) |

---

## 🎯 Plan de Correction Méthodique

### Phase 1: Pages Commerciales Critiques (5 pages)
**Impact:** 5 pages × 11 villes = 55 pages

1. `contact/page.tsx`
2. `inventaire-ia/page.tsx`
3. `services/demenagement-economique-lille/page.tsx`
4. `services/demenagement-standard-lille/page.tsx`
5. `services/demenagement-premium-lille/page.tsx`

**Action:** Ajouter metadata avec `getCanonicalUrl()`

---

### Phase 2: Templates Blog Dynamiques (2 templates)
**Impact:** ~111 articles × 11 villes = ~1200 articles

1. `blog/[category]/[slug]/page.tsx` — Articles individuels
2. `blog/[category]/page.tsx` — Pages catégories

**Action:** Ajouter `generateMetadata()` dynamique

---

### Phase 3: Pages Légales (4 pages)
**Impact:** 4 pages × 11 villes = 44 pages

1. `cgu/page.tsx`
2. `cgv/page.tsx`
3. `mentions-legales/page.tsx`
4. `politique-confidentialite/page.tsx`

**Action:** Ajouter metadata avec `getCanonicalUrl()`

---

### Phase 4: Pages Secondaires (3 pages)
**Impact:** 3 pages × 11 villes = 33 pages

1. `estimation-rapide/page.tsx`
2. `notre-offre/page.tsx`
3. `quartiers-lille/page.tsx`

**Action:** Ajouter metadata avec `getCanonicalUrl()`

---

## 📊 Impact Total Réel

| Catégorie | Pages Lille | Total 11 villes |
|-----------|-------------|-----------------|
| Commerciales | 5 | **55** |
| Blog (dynamique) | 111 | **~1220** |
| Légales | 4 | **44** |
| Secondaires | 3 | **33** |
| **TOTAL** | **123** | **~1352 pages** |

---

## ⚠️ Note Importante

**Homepage** (`app/page.tsx`) : Le fichier ne contient pas de metadata directement, mais le canonical est généré via `app/layout.tsx` qui utilise `buildSiteMetadata()`. C'est pourquoi le test montre que homepage a un canonical même si `page.tsx` n'en a pas.

**FAQ** : Le fichier `app/faq/page.tsx` est "use client", mais on a ajouté le metadata dans `app/faq/layout.tsx` donc c'est OK.

---

## 🎯 Ordre d'Exécution

1. ✅ Pages commerciales critiques (Phase 1)
2. ✅ Templates blog (Phase 2)
3. ✅ Pages légales (Phase 3)
4. ✅ Pages secondaires (Phase 4)

**Estimation:** 3-4h pour tout corriger

