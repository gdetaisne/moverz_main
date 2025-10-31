# 🎯 Plan Correction Exhaustive — Toutes Pages Manquantes

**Date:** 31 octobre 2025  
**Audit:** Lille (107 tests, 83.2% conforme, 18 problèmes détectés)  
**Stratégie:** Méthodique et complète

---

## 🔍 Problèmes Détectés par Catégorie

### Catégorie A: Pages Statiques Sans Canonical (6 pages)
- ❌ `/contact/` → canonical = `/` (au lieu de `/contact/`)
- ❌ `/inventaire-ia/` → canonical = `/` (au lieu de `/inventaire-ia/`)
- ❌ `/services/demenagement-economique-lille/` → canonical = `/`
- ❌ `/services/demenagement-standard-lille/` → canonical = `/`
- ❌ `/services/demenagement-premium-lille/` → canonical = `/`
- ✅ `/services/` → **CORRIGÉ** (dans le dernier push)
- ✅ `/faq/` → **CORRIGÉ** (dans le dernier push)

**Impact:** 6 pages × 11 villes = **66 pages**

---

### Catégorie B: Pages Quartiers Sans Canonical (3-5 par ville)
- ❌ `/lille/republique/` → canonical = `/`
- ❌ `/lille/fives/` → canonical = `/`
- ❌ `/lille/vauban/` → canonical = `/`
- ❌ `/lille/wazemmes/` → Probablement pareil
- ❌ `/lille/vieux-lille/` → **CORRIGÉ** (dans le dernier push)

**Impact:** 5 quartiers × 11 villes = **~50 pages**

---

### Catégorie C: Pages Corridors — HARDCODE MARSEILLE! 🚨
- ❌ `/lille-vers-paris/` → canonical = `/marseille-vers-paris/` 
- ❌ `/lille-vers-lyon/` → canonical = `/marseille-vers-lyon/`
- ❌ `/lille-vers-bruxelles/` → canonical = `/`
- ❌ `/lille-vers-londres/` → canonical = `/`
- ❌ `/lille-vers-gand/` → canonical = `/`

**Cause:** Les pages corridors sont générées dynamiquement mais ont le canonical hardcodé "marseille"

**Impact:** 5 corridors × 11 villes = **~55 pages**

---

### Catégorie D: Articles Blog (111 articles sur Lille)
- ❌ Tous les articles → canonical = `/` (au lieu de `/blog/category/slug/`)

**Impact:** ~100 articles × 11 villes = **~1100 pages**

---

## 📊 Impact Total

| Catégorie | Pages/ville | Total 11 villes |
|-----------|-------------|-----------------|
| Pages statiques | 6 | **66** |
| Quartiers | 5 | **55** |
| Corridors | 5 | **55** |
| Blog articles | 100 | **1100** |
| **TOTAL** | **~116** | **~1276 pages** |

---

## 🎯 Plan d'Action Méthodique

### Étape 1: Identifier TOUTES les pages par type (30 min)
- ✅ Lister toutes les pages statiques
- ✅ Lister tous les quartiers
- ✅ Lister tous les corridors
- ✅ Lister tous les articles blog

### Étape 2: Corriger Catégorie A - Pages Statiques (1h)
- [ ] `/contact/page.tsx` (11 villes)
- [ ] `/inventaire-ia/page.tsx` (11 villes)
- [ ] `/services/demenagement-*-*/page.tsx` (3 pages × 11 villes)

### Étape 3: Corriger Catégorie B - Quartiers (30 min)
- [ ] Toutes pages `/ville/quartier/page.tsx` (déjà commencé, vérifier tout)

### Étape 4: Corriger Catégorie C - Corridors (1h)
- [ ] Pages dynamiques `/ville-vers-destination/page.tsx`
- [ ] Fix hardcode "marseille" → variable dynamique

### Étape 5: Corriger Catégorie D - Blog Articles (1h30)
- [ ] Template blog article `[category]/[slug]/page.tsx`
- [ ] Vérifier génération dynamique metadata

### Étape 6: Tests Complets (1h)
- [ ] Re-audit exhaustif Lille (107 tests → 100%)
- [ ] Échantillons sur 3 autres villes
- [ ] Validation

**TOTAL ESTIMÉ:** ~5-6h

---

## ⚠️ Priorités

### Critique (🔴 Blocker)
1. **Corridors hardcodés "marseille"** → Brise complètement SEO corridors
2. **Articles blog (1100 pages)** → Impact SEO majeur

### Important (🟡 High)
3. **Pages services détaillées** → Pages commerciales importantes
4. **Page contact** → Conversion

### Moyen (🟢 Medium)
5. **Page inventaire-ia** → Déjà dans sitemap mais canonical manquant
6. **Pages quartiers** → Déjà commencé la correction

---

## 🎯 Prochaine Action Immédiate

Commencer par **Étape 1** : Identifier précisément TOUTES les pages sur Lille qui manquent de canonical.

Créer inventaire complet avant de corriger.

