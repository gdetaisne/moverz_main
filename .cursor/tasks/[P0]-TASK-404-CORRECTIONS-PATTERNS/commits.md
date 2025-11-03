# Commits GitHub - TASK-404-CORRECTIONS-PATTERNS

---

## Phase 1 : Patterns 1-6 (03 Nov - Matin)

**Date** : 03 Nov 2025 - 09h00-11h00  
**Impact** : 257 liens corrigés → -51% URLs 404

### Commit Principal (Monorepo)

**SHA** : (voir repos individuels)  
**Message** : `fix(404): Corrections Patterns 1-6 (257 liens) - Services/Corridors/FAQ`

**Fichiers** :
- 33 pages services (`app/services/demenagement-*-{ville}/page.tsx`)
- 11 templates corridors (`app/_templates/CorridorPage.tsx`)
- 1 homepage Nantes (`app/nantes/page.tsx`)
- 11 pages FAQ (`app/faq/page.tsx`)

**Total** : 56 fichiers

---

### Repos Individuels - Phase 1

| Ville | SHA | Status |
|-------|-----|--------|
| Toulouse | (via push individuel) | ✅ Déployé |
| Nice | (via push individuel) | ✅ Déployé |
| Montpellier | (via push individuel) | ✅ Déployé |
| Bordeaux | (via push individuel) | ✅ Déployé |
| Lyon | (via push individuel) | ✅ Déployé |
| Marseille | (via push individuel) | ✅ Déployé |
| Nantes | (via push individuel) | ✅ Déployé |
| Lille | (via push individuel) | ✅ Déployé |
| Strasbourg | `7ead963` | ✅ Déployé + Fix build |
| Rouen | (via push individuel) | ✅ Déployé |
| Rennes | (via push individuel) | ✅ Déployé |

**Validation** : 11/11 villes opérationnelles ✅

---

## Quick Wins : Patterns #10, #7, #8 (03 Nov - Midi)

**Date** : 03 Nov 2025 - 11h45-11h50  
**Durée** : 15 minutes  
**Impact** : 56 liens corrigés → -11% URLs 404 supplémentaire

### Commit Principal (Monorepo)

**SHA** : `e712d4f`  
**Message** : `fix(404): Quick Wins Patterns #10, #7, #8 (21 URLs)`

**Détails** :
```
Pattern #10: Homepage Nantes
- Fix: /ile-de-nantes → /ile-nantes (NeighborhoodsTeaser)

Pattern #7: Accents Toulouse
- Fix: 40 catégories satellites accents → sans accents
- Script: fix-all-accents-categories.cjs

Pattern #8: FAQ Cross-ville
- Fix: 'toulouse' hardcodé → cityData dynamique (10 villes)
- Fix: /devis-demenagement-toulouse → /estimation-rapide
- Script: fix-faq-toulouse-hardcoded.sh

Impact: 21 URLs 404 → 0
```

**Fichiers** : 53 fichiers
- 40 satellites Toulouse (frontmatter category)
- 10 pages FAQ (content + liens)
- 1 NeighborhoodsTeaser Nantes
- 2 scripts

---

### Repos Individuels - Quick Wins

| Ville | SHA | Fichiers | Status |
|-------|-----|----------|--------|
| **Toulouse** | `1b5ca80` | 41 (40 satellites + 1 script) | ✅ Pushé |
| **Nice** | `4a42521` | 2 (FAQ + script) | ✅ Pushé |
| **Montpellier** | `faaf221` | 2 (FAQ + script) | ✅ Pushé |
| **Bordeaux** | `77e2aef` | 13 (FAQ + ...) | ✅ Pushé |
| **Lyon** | `325a90e` | 9 (FAQ + ...) | ✅ Pushé |
| **Marseille** | `d09fe13` | 13 (FAQ + ...) | ✅ Pushé |
| **Nantes** | `b78a277` | 3 (FAQ + NeighborhoodsTeaser) | ✅ Pushé |
| **Lille** | `7a813c8` | 13 (FAQ + ...) | ✅ Pushé |
| **Strasbourg** | `341bafd` | 3 (FAQ + ...) | ✅ Pushé |
| **Rouen** | `51a0605` | 2 (FAQ + ...) | ✅ Pushé |
| **Rennes** | `2ffc437` | 2 (FAQ + ...) | ✅ Pushé |

**Validation** : 11/11 repos pushés ✅

---

## Hotfix : const city Scope Error (03 Nov - 12h10)

**Date** : 03 Nov 2025 - 12h10  
**Durée** : 5 minutes  
**Contexte** : Build error détecté lors du rebuild Montpellier

### Erreur

**Build Montpellier fail** : `ReferenceError: city is not defined`

**Cause** : Script `fix-faq-toulouse-hardcoded.sh` a utilisé `${city.nameCapitalized}` dans template literals au niveau module, mais `const city` était déclaré dans le composant (ligne 271).

**Impact** : 10 villes (Montpellier + 9 autres par script)

---

### Commit Hotfix (Monorepo)

**SHA** : `d21fafc`  
**Message** : `fix(404): FAQ const city scope error - Quick Wins hotfix`

**Détails** :
```
Erreur: city utilisé dans template literals au niveau module
Solution: const city déclaré AVANT array faqs

Impact: Fix build error Montpellier + 9 autres villes
Villes: Montpellier, Nice, Lille, Nantes, Rouen, Strasbourg, Rennes, Lyon, Marseille, Bordeaux
```

**Fichiers** : 10 × `app/faq/page.tsx`

---

### Repos Individuels - Hotfix

| Ville | SHA | Status |
|-------|-----|--------|
| **Montpellier** | `826fe19` | ✅ Pushé |
| **Nice** | `d2fb120` | ✅ Pushé |
| **Lille** | `f3f7a3c` | ✅ Pushé |
| **Nantes** | `d5e895a` | ✅ Pushé |
| **Rouen** | `07fc816` | ✅ Pushé |
| **Strasbourg** | `b5a0914` | ✅ Pushé |
| **Rennes** | `97947f9` | ✅ Pushé |
| **Lyon** | `26181b5` | ✅ Pushé |
| **Marseille** | `702a8b3` | ✅ Pushé |
| **Bordeaux** | `020efd5` | ✅ Pushé |

**Validation** : Build Nice ✅ OK

---

## Progression Globale

**Total commits documentés** : 2 vagues (Phase 1 + Quick Wins)

**Total URLs résolues** :
- Phase 1 : 257 URLs (-51%)
- Quick Wins : 56 URLs (-11%)
- **Total** : 313 URLs (-62%)

**Restant** : ~194 URLs (Patterns #5, #9)

---

**Dernière mise à jour** : 03 Nov 2025 - 11h55

---

## Pattern #9 Phase 1 : Fix Quartiers Hardcodés (03 Nov - Après-midi)

**Date** : 03 Nov 2025 - 15h30  
**Durée** : 45 minutes  
**Impact** : 35 liens 404 résolus (bugs initiaux jamais corrigés)

### Bugs Découverts

**TASK-012 était incomplète** :
- quartiers-{ville}/page.tsx : 8 villes Metadata "Lille" hardcodée ❌
- NeighborhoodsIndex.tsx : 11 villes "Toulouse" hardcodé ❌
- NeighborhoodsData.ts : Montpellier = données Marseille ❌
- NeighborhoodsData.ts : Bordeaux URL format incorrect ❌
- NeighborhoodsData.ts : Strasbourg trailing slash ❌
- Page /quartiers-montpellier manquante ❌

### Commit Principal (Monorepo)

**SHA** : `64f86e6`  
**Message** : `fix(404): Pattern #9 - Quartiers hardcodés corrigés (11 villes)`

**Détails** :
```
- quartiers-{ville}/page.tsx (8): Lille → cityData dynamique
- NeighborhoodsIndex.tsx (11): Toulouse → cityData dynamique  
- NeighborhoodsData.ts Montpellier: Marseille → Montpellier
- NeighborhoodsData.ts Bordeaux: URL format correct
- NeighborhoodsData.ts Strasbourg: Trailing slash
- Page quartiers-montpellier: Créée

Impact: 35 liens 404 résolus
Fichiers: 23 (22 modifiés + 1 créé)
```

---

### Repos Individuels - Pattern #9 Phase 1

| Ville | SHA | Fichiers Modifiés | Status |
|-------|-----|-------------------|--------|
| **Marseille** | `a7dac23` | 4 (quartiers page + NeighborhoodsIndex + Data + blog) | ✅ Pushé |
| **Lyon** | `9cb8b23` | 4 | ✅ Pushé |
| **Montpellier** | `663e7c3` | 5 (+ quartiers-montpellier créée) | ✅ Pushé |
| **Bordeaux** | `71210d1` | 5 | ✅ Pushé |
| **Nantes** | `82e9c19` | 4 | ✅ Pushé |
| **Lille** | `f13c33e` | 3 | ✅ Pushé |
| **Nice** | `13863f7` | 4 | ✅ Pushé |
| **Strasbourg** | `314648a` | 13 | ✅ Pushé |
| **Rouen** | `50911c4` | 4 | ✅ Pushé |
| **Rennes** | `43047ac` | 4 | ✅ Pushé |
| **Toulouse** | `(pending)` | 3 | ⏳ En cours |

**Scripts créés** :
- `scripts/fix-quartiers-pages-metadata.mjs` (8 villes)
- `scripts/fix-neighborhoods-index-toulouse.mjs` (10 villes)

**Validation** : 10/11 repos pushés, Toulouse en cours

---

**Dernière mise à jour** : 03 Nov 2025 - 15h40

---

## Pattern #9 Phase 2 : Nettoyage quartiers/communes sans pages (03 Nov - 16h27)

**SHA** : `9f91ca4`  
**Message** : `fix(404): Pattern #9 Phase 2 - Nettoyage quartiers/communes sans pages (11 villes)`

**Détails** :
- Suppression/ajustement de liens vers quartiers ou communes sans pages dédiées.
- Cohérence avec `cityData` et templates.

---

## Correctif URL builder quartiers (03 Nov - 11h42)

**SHA** : `8ec4324`  
**Message** : `fix(404): urlForQuartier vers vraies pages (/nice/slug au lieu de /devis-nice-slug)`

**Impact** : Alignement du helper sur les vraies routes des pages quartiers.
