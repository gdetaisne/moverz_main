# TASK-404-blog-strasbourg - Corriger 404s Blog Strasbourg

## 📊 Statut : ✅ FINALISÉ

## Contexte

Strasbourg : Architecture blog simple (3 catégories)
~41 liens 404 internes identifiés

## Architecture Blog Strasbourg

- `demenagement-strasbourg/` : 9 articles (catégorie principale)
- `garde-meuble-strasbourg/` : 1 article (`garde-meuble-strasbourg-guide-complet.md`)
- `satellites/` : 82 articles

**Particularité** : Pas de catégories multiples comme Bordeaux/Toulouse

## Solution Appliquée

### 1. Fix liens satellites (7 liens)

**Articles satellites** avec liens cassés `/blog/satellites/...` :
- `assurance-demenageur-strasbourg` (4 liens) → `/blog/demenagement-strasbourg/...`
- `demenageur-grande-ile-strasbourg` (2 liens) → `/blog/demenagement-strasbourg/...`
- `garde-meuble-etudiant-strasbourg` (1 lien) → `/blog/garde-meuble-strasbourg/...`

### 2. Fix liens garde-meuble (17 liens)

**Problème** : Article principal = `garde-meuble-strasbourg-guide-complet.md`
- `slug: "garde-meuble-strasbourg-guide-complet"`
- `cleanSlug` enlève `-complet` → URL = `/blog/demenagement-strasbourg/garde-meuble-strasbourg-guide/`

**Corrections** :
- 10 liens `/blog/demenagement-strasbourg/garde-meuble-strasbourg` → `...garde-meuble-strasbourg-guide`
- 5 liens `/blog/demenagement-strasbourg/garde-meuble-etudiant-strasbourg` → `...garde-meuble-strasbourg-guide#etudiant`
- 1 lien `/blog/garde-meuble-strasbourg/assurance-demenageur-strasbourg` → `/blog/demenagement-strasbourg/assurance-demenageur-strasbourg`
- 1 lien `/blog/garde-meuble-etudiant-strasbourg` → `...garde-meuble-strasbourg-guide#etudiant`

### 3. Fix slug autorisation (4 liens)

**Problème** : Liens pointaient vers `autorisation-stationnement-strasbourg`  
**Slug réel** : `autorisation-stationnement-demenagement-strasbourg`

**Correction** : Ajout du mot `demenagement` dans tous les liens

## 📈 Résultat

- ✅ **40 liens internes corrigés** (28 + 12)
- ✅ **25 fichiers modifiés** (19 + 6)
- ✅ Build local réussi
- ✅ 0 lien cassé restant

## 📦 Commits

| Phase | Monorepo | Strasbourg | Description |
|-------|----------|------------|-------------|
| 1. Corrections initiales | `16cde40` | `2a00b9e` | 28 liens |
| 2. Corrections garde-meuble | `4679172` | `67d4299` | 12 liens |
| **TOTAL** | **2 commits** | **2 commits** | **40 liens** |

### 4. Fix liens garde-meuble round 2 (12 liens)

**Problème** : Après déploiement, rapport montre encore 16 404s  
**Cause** : Articles `garde-meuble-strasbourg/` avaient liens vers `demenagement-strasbourg/`

**Corrections** :
- 7 liens `prix-garde-meuble-strasbourg-2025`
- 2 liens `taille-box-garde-meuble-strasbourg`
- 2 liens `duree-location-garde-meuble-strasbourg`
- 1 lien `self-stockage-vs-garde-meuble-strasbourg`
- 1 lien `acces-24-7-self-stockage-strasbourg`
- 1 lien `assurance-garde-meuble-strasbourg`
- 1 lien `garde-meuble-strasbourg` → `garde-meuble-strasbourg-guide`

Tous redirigés : `demenagement-strasbourg/[article]` → `garde-meuble-strasbourg/[article]`

## 🚀 Déploiement

CapRover redéploie automatiquement (~3-5 min)  
**Statut** : ✅ Déployé et vérifié (commit `67d4299`)  
**Date** : 2025-11-04  
**Production** : 0 lien cassé confirmé

## 🎯 Spécificités Strasbourg

1. **Architecture simple** : Seulement 3 catégories (vs 11+ Bordeaux/Toulouse)
2. **Pas de CATEGORY_MAPPING accentué** : Pas besoin (catégories sans accents)
3. **cleanSlug actif** : Enlève `-guide-complet` → `-guide`
4. **1 seul article garde-meuble** : Redirige tout vers lui
5. **82 satellites** : Tous dans `category: "demenagement-strasbourg"`

## 📊 Comparaison Villes

| Ville | Catégories | Articles | Corrections | Durée |
|-------|------------|----------|-------------|-------|
| Bordeaux | 8 | ~200 | 181 | 2h |
| Toulouse | 66 | ~150 | 170 | 1h05 |
| **Strasbourg** | **3** | **92** | **40** | **20 min** |

Strasbourg = **le plus simple** grâce à architecture minimaliste.  
**Note** : 2 rounds de corrections (28 + 12) pour couvrir tous les cas.
