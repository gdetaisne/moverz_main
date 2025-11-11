# Décisions - TASK-027 Clean Redirections

**Date** : 03 novembre 2025

---

## 🎯 DÉCISIONS PRISES

### ✅ Décision #1 : Priorité P1 (Important)

**Date** : 03/11/2025  
**Décideur** : Guillaume + Cursor

**Question** : P0 (critique) ou P1 (important) ?

**Choix** : **P1 - Important**

**Raison** :
- Sites fonctionnent (pas de crash)
- Redirections existantes marchent
- Dette technique, pas urgence business
- P0 réservé aux bugs critiques bloquants

**Alternative rejetée** : P0 (trop élevé)

---

### ✅ Décision #2 : Approche Quick Fix (Option A)

**Date** : 03/11/2025  
**Décideur** : À valider par Guillaume

**Question** : Quick Fix (2-3h) vs Refactoring (6-8h) ?

**Recommandation** : **Option A - Quick Fix**

**Raisons** :
1. ✅ Correctif immédiat (bugs critiques)
2. ✅ Risque faible (pas de refactoring)
3. ✅ Temps raisonnable (2-3h)
4. ✅ Compatible projet 404 en cours

**Refactoring** (Option B) :
- ❌ Long (6-8h)
- ❌ Risque refactoring
- ❌ ROI seulement long terme
- ✅ Peut être fait plus tard si besoin

**Décision finale** : À confirmer par Guillaume au démarrage

---

### 📋 Décision #3 : Patterns à harmoniser

**Date** : 03/11/2025  
**Décideur** : Cursor (basé sur analyse)

**Patterns OBLIGATOIRES** (à ajouter partout) :

**1. BATCH/PILIER redirections** ✅
```javascript
{ source: '/blog/satellites/BATCH-:path*', destination: '/blog/', permanent: true }
{ source: '/blog/satellites/PILIER-:path*', destination: '/blog/', permanent: true }
```

**Raison** : Google a indexé ces fichiers temporaires  
**Priorité** : Critique (404s potentiels)  
**Villes** : 9/11 manquantes

---

**2. Cross-ville Toulouse** ✅
```javascript
{ source: '/Toulouse/:path*', destination: '/quartiers-{ville}/', permanent: true }
{ source: '/devis-demenagement-toulouse/', destination: '/estimation-rapide/', permanent: true }
```

**Raison** : Bug templates (Toulouse hardcodée)  
**Priorité** : Important (404s existants)  
**Villes** : 9/11 manquantes

---

**3. Quartiers Bordeaux** ✅
```javascript
{ source: '/{ville}/chartrons', destination: '/quartiers-{ville}/', permanent: true }
// + 6 autres quartiers Bordeaux
```

**Raison** : Bug templates (quartiers copiés partout)  
**Priorité** : Important (404s existants)  
**Villes** : 8/11 manquantes

---

**Patterns OPTIONNELS** (à évaluer) :

**4. Majuscules** ⚠️
```javascript
{ source: '/quartiers-Marseille', destination: '/quartiers-marseille/', permanent: true }
```

**Décision** : Ajouter UNIQUEMENT si 404s détectés  
**Raison** : Cas rares, pas systématique

---

**5. Piliers catégories** ⚠️
```javascript
{ source: '/blog/aide-au-demenagement/...', destination: '/blog/aide-au-demenagement-{ville}/...', permanent: true }
```

**Décision** : Ne PAS généraliser  
**Raison** : Spécifique Nice/Lyon (structure blog différente)

---

### 📋 Décision #4 : Corriger Toulouse Loops

**Date** : 03/11/2025  
**Décideur** : Cursor

**Problème** :
```javascript
{ source: '/mentions-legales/', destination: '/mentions-legales/', permanent: true }
```

**Options** :

**A) Supprimer** ✅ RECOMMANDÉ
- Redirect inutile (même source/destination)
- Risque loop

**B) Corriger**
- Mais corriger vers quoi ? (déjà bon)

**C) Garder**
- Non, loop potentiel

**Décision** : **Supprimer ces 3 redirections**

---

### 📋 Décision #5 : Ne PAS dynamiser (Quick Fix)

**Date** : 03/11/2025  
**Décideur** : Cursor (recommandation)

**Question** : Remplacer ville hardcodée par variables ?

**Exemple** :
```javascript
// ❌ ACTUEL
{ source: '/blog/satellites/article', destination: '/blog/satellites/article-nice/', permanent: true }

// ✅ DYNAMIQUE
const CITY = process.env.CITY_SLUG;
{ source: '/blog/satellites/article', destination: `/blog/satellites/article-${CITY}/`, permanent: true }
```

**Décision** : **NON (Option A Quick Fix)**

**Raisons** :
1. ❌ Refactoring long (6-8h)
2. ❌ Risque régression
3. ❌ Tests complexes
4. ✅ Peut être fait plus tard (Option B)

**Si Option B choisie** : Alors dynamiser

---

### 📋 Décision #6 : Template Centralisé

**Date** : 03/11/2025  
**Décideur** : À valider par Guillaume

**Question** : Créer template centralisé `.templates/redirects.template.js` ?

**Décision** : **NON pour Quick Fix, OUI si Refactoring**

**Option A** : Pas de template (copier-coller 11 fichiers)  
**Option B** : Template + script génération

**Avantages template** :
- ✅ Maintenance facile
- ✅ Impossible d'oublier ville
- ✅ Sync automatique

**Inconvénients** :
- ❌ Long à créer (2-3h)
- ❌ Tests requis
- ❌ Pas critique court terme

**Décision finale** : Selon approche choisie

---

### 📋 Décision #7 : Script Validation

**Date** : 03/11/2025  
**Décideur** : Cursor

**Question** : Créer script validation redirections ?

**Exemple** :
```javascript
// scripts/validate-redirects.mjs
// - Tester destinations = 200 OK
// - Détecter loops
// - Détecter destinations 404
```

**Décision** : **NON pour Quick Fix, OUI si Refactoring**

**Raison** :
- Quick Fix : Tests manuels suffisants (9 tests)
- Refactoring : Script ROI positif (long terme)

---

### 📋 Décision #8 : Bordeaux Audit

**Date** : 03/11/2025  
**Décideur** : Cursor

**Question** : Auditer Bordeaux en priorité ?

**Décision** : **OUI - Premier pas de la tâche**

**Raisons** :
1. ⚠️ Domaine exception (`www.bordeaux-demenageur.fr`)
2. ❓ État redirections inconnu
3. 🔴 Site principal (risque élevé)

**Action** : Lire `sites/bordeaux/next.config.mjs` avant tout

---

### 📋 Décision #9 : Tests Manuels vs Automatiques

**Date** : 03/11/2025  
**Décideur** : Cursor

**Question** : Comment tester 11 villes × ~80 redirections ?

**Décision** : **Tests échantillonnés**

**Approche** :
1. ✅ Build local : 3 villes (Nice, Toulouse, Lyon)
2. ✅ Tests prod manuels : 9 redirections critiques
3. ❌ Pas de tests automatiques exhaustifs

**Redirections critiques à tester** :
- BATCH/PILIER (3 villes)
- Cross-ville Toulouse (3 villes)
- Quartiers Bordeaux (3 villes)

**Total** : 9 tests manuels couvrent 80% risques

---

## 🔄 DÉCISIONS RÉVERSIBLES

### Décision Réversible #1 : Approche Quick Fix

**Si** : Problèmes récurrents dans 3-6 mois  
**Alors** : Passer Option B Refactoring

**Signaux** :
- Nouveaux patterns oubliés sur 50% villes
- Maintenance redirections > 1h/mois
- Bugs critiques récurrents

---

### Décision Réversible #2 : Ne pas dynamiser

**Si** : Besoin centralisation  
**Alors** : Refactoring avec variables dynamiques

**Timing** : Après projet 404 (si besoin identifié)

---

## ❌ DÉCISIONS REJETÉES

### ❌ Rejeté #1 : Supprimer Redirections

**Proposition** : Supprimer redirections au lieu d'harmoniser

**Raison rejet** :
- ❌ 404s immédiats (Google a indexé)
- ❌ Perte SEO
- ❌ Mauvaise UX utilisateur

---

### ❌ Rejeté #2 : Redirections Dynamiques (Quick Fix)

**Proposition** : Variables `${CITY_SLUG}` dans Quick Fix

**Raison rejet** :
- ❌ Trop long (6-8h)
- ❌ Hors scope Quick Fix
- ✅ Possible plus tard (Option B)

---

### ❌ Rejeté #3 : Tests Automatiques Exhaustifs

**Proposition** : Tester 11 × 80 = 880 redirections automatiquement

**Raison rejet** :
- ❌ Long à coder (2-3h)
- ❌ ROI faible (Quick Fix)
- ✅ Tests échantillonnés suffisants

---

### ❌ Rejeté #4 : Priorité P0

**Proposition** : Marquer P0 (critique)

**Raison rejet** :
- Sites fonctionnent
- Pas de crash/bug critique
- Dette technique ≠ urgence

---

## 📋 DÉCISIONS À PRENDRE (Guillaume)

### ⏳ Décision Pendante #1 : Quelle approche ?

**Options** :
- **A) Quick Fix** (2-3h) ← Recommandé
- **B) Refactoring** (6-8h)
- **C) Hybride** (3-4h)

**À décider** : Au démarrage tâche

---

### ⏳ Décision Pendante #2 : Timing

**Question** : Quand faire cette tâche ?

**Options** :
- **A) Maintenant** (avant fin projet 404)
- **B) Après TASK-404** (après 190 liens restants)
- **C) Plus tard** (si problèmes récurrents)

**Recommandation** : **Option A ou B** (momentum projet 404)

---

### ⏳ Décision Pendante #3 : Qui fait ?

**Options** :
- **A) Guillaume** (connaissance architecture)
- **B) Lucie** (si formée)
- **C) Cursor autonome** (risque moyen)

**Recommandation** : **Guillaume** (première fois)

---

## 📊 CRITÈRES DÉCISION

### Pour Quick Fix (Option A)

**Choisir si** :
- ✅ Besoin correctif rapide
- ✅ Projet 404 en cours
- ✅ Pas de temps pour refactoring
- ✅ Dette technique acceptable

---

### Pour Refactoring (Option B)

**Choisir si** :
- ✅ Temps disponible (6-8h)
- ✅ Dette technique inacceptable
- ✅ Maintenance future prioritaire
- ✅ ROI long terme valorisé

---

## 📖 JUSTIFICATIONS

### Pourquoi Quick Fix recommandé ?

**1. Contexte projet 404** :
- Déjà en cours corrections
- Momentum et documentation existants
- Besoin fixes immédiats

**2. ROI immédiat** :
- 2-3h → Bugs critiques corrigés
- Cohérence 11 villes
- Résultat tangible

**3. Risque faible** :
- Pas de refactoring
- Tests simples
- Réversible si problème

**4. Permet itération** :
- Quick Fix maintenant
- Refactoring plus tard si besoin
- Approche agile

---

**Créé le** : 03 novembre 2025  
**Décisions documentées** : ✅ Complet  
**En attente validation** : Guillaume (approche)

