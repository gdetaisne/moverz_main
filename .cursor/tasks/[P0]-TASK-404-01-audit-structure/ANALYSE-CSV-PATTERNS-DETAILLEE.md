# 🔬 ANALYSE DÉTAILLÉE CSV - PATTERNS IDENTIFIÉS

**Date** : 01 novembre 2025  
**Fichier** : `liens-casses-2025-11-01 (1).csv`  
**Total liens cassés** : 1167  
**Méthode** : Analyse patterns Python + awk

---

## 📊 DISTRIBUTION PAR SITE

| Site | Liens cassés | % |
|------|--------------|---|
| bordeaux-demenageur.fr | 227 | 19.5% |
| devis-demenageur-montpellier.fr | 172 | 14.7% |
| devis-demenageur-toulousain.fr | 149 | 12.8% |
| devis-demenageur-nice.fr | 146 | 12.5% |
| devis-demenageur-lille.fr | 132 | 11.3% |
| devis-demenageur-nantes.fr | 112 | 9.6% |
| devis-demenageur-rouen.fr | 81 | 6.9% |
| devis-demenageur-strasbourg.fr | 63 | 5.4% |
| devis-demenageur-lyon.fr | 35 | 3.0% |
| devis-demenageur-rennes.fr | 32 | 2.7% |
| devis-demenageur-marseille.fr | 19 | 1.6% |

**Insight** : Bordeaux, Montpellier et Toulouse concentrent **47%** des liens cassés (548/1167)

---

## 🎯 PATTERN #1 : MAJUSCULES DANS CORRIDORS

### Problème

URLs avec majuscules au lieu de minuscules :

```
❌ /Nice-vers-paris
✅ /nice-vers-paris

❌ /Marseille-vers-lyon
✅ /marseille-vers-lyon

❌ /Toulouse-vers-nantes
✅ /toulouse-vers-nantes
```

### Volumétrie

**~50-60 liens estimés** (Nice, Marseille, autres villes)

### Cause

Liens générés avec première lettre majuscule (template ou composant bugué)

### Pages sources

- Homepage (`/`)
- Page ville principale (`/nice`, `/marseille`)
- Peut-être composant `CorridorLinks.tsx` ou similar

### Solution

**TASK-404-08 : Fix homepage**
1. Identifier template corridor links
2. Forcer minuscules : `city.toLowerCase()}-vers-${destination.toLowerCase()}`
3. Tester 11 villes

**Alternative TASK-404-07** : Redirections 301
```javascript
{ 
  source: '/Nice-vers-:destination',
  destination: '/nice-vers-:destination',
  permanent: true 
}
```

**Recommandation** : FIX le code (TASK-404-08) plutôt que redirections

---

## 🎯 PATTERN #2 : MAJUSCULES QUARTIERS

### Problème Type A : quartiers-Nice

```
❌ /quartiers-Nice
✅ /quartiers-nice

❌ /quartiers-Bordeaux
✅ /quartiers-bordeaux
```

### Problème Type B : /Nice/quartier

```
❌ /Nice/vieux-Nice
✅ /nice/vieux-nice

❌ /Nice/promenade-des-anglais
✅ /nice/promenade-des-anglais

❌ /Bordeaux/chartrons
✅ /bordeaux/chartrons
```

### Volumétrie

**~30-40 liens** (homepage + pages quartiers)

### Cause

Template quartiers avec `{city}` au lieu de `{city.toLowerCase()}`

### Pages sources

- Homepage (`/`)
- Page `/quartiers-nice`

### Solution

**TASK-404-08 : Fix homepage + pages quartiers**

Fichiers probables :
- `app/page.tsx` (homepage)
- `app/quartiers-[city]/page.tsx`
- `components/QuartiersLinks.tsx`

Fix :
```typescript
// AVANT
<Link href={`/${city}/vieux-${city}`}>

// APRÈS
<Link href={`/${city.toLowerCase()}/vieux-${city.toLowerCase()}`}>
```

---

## 🎯 PATTERN #3 : DEVIS-DEMENAGEMENT-VILLE-QUARTIER

### Problème

URLs anciennes ou mal formées :

```
❌ /devis-demenagement-Nice-vieux-nice
❌ /devis-demenagement-bordeaux-chartrons
❌ /devis-demenagement-marseille-saint-pierre
```

Ces pages **n'existent pas** (ou plus) dans structure actuelle

### Volumétrie

**~40-50 liens** (Nice, Bordeaux, Marseille)

### Cause

Anciennes URLs avant refonte (structure 2024 ?)

### Pages sources

- Page `/quartiers-nice`
- Page `/quartiers-bordeaux`

### Solution

**TASK-404-07 : Redirections 301**

Mapping vers pages actuelles :
```javascript
// Nice
{ 
  source: '/devis-demenagement-Nice-:quartier',
  destination: '/nice/:quartier',
  permanent: true 
}

// Bordeaux
{
  source: '/devis-demenagement-bordeaux-:quartier',
  destination: '/bordeaux/:quartier',
  permanent: true
}
```

**OU** si pages quartiers individuelles n'existent pas :
```javascript
{
  source: '/devis-demenagement-:ville-:quartier',
  destination: '/quartiers-:ville',
  permanent: true
}
```

---

## 🎯 PATTERN #4 : CATÉGORIES COURTES (CRITIQUE ⚠️)

### Problème

Catégories blog génériques au lieu de spécifiques :

| Catégorie cassée | Occurrences | Devrait être |
|------------------|-------------|--------------|
| `/blog/devis/` | 29 | `/blog/devis-demenagement-ville/` |
| `/blog/prix/` | 28 | `/blog/prix-demenagement-ville/` |
| `/blog/etudiant/` | 56 | `/blog/demenagement-etudiant-ville/` |
| `/blog/international/` | 11 | `/blog/demenagement-international-ville/` |
| `/blog/urgent/` | 13 | `/blog/demenagement-urgent-ville/` |
| `/blog/longue-distance/` | 17 | `/blog/demenagement-longue-distance-ville/` |
| `/blog/piliers/` | Variable | Catégorie spécifique du pilier |

**TOTAL** : **~150-200 liens** avec catégories courtes

### Exemple concret

```
❌ /blog/devis/guide
✅ /blog/devis-demenagement-toulouse/guide

❌ /blog/prix/frais-caches-demenagement
✅ /blog/prix-demenagement-lille/frais-caches-demenagement

❌ /blog/etudiant/aide-financiere-demenagement-etudiant
✅ /blog/demenagement-etudiant-ville/aide-financiere-demenagement-etudiant
```

### Cause racine

**CATEGORY_MAPPING bugué** (confirmé dans audit TASK-404-01)

Toulouse `lib/blog.ts` :
```typescript
const CATEGORY_MAPPING = {
  'demenagement-economique': 'pas-cher',  // OK
  'piliers': 'general',                    // ❌ Trop générique
  'satellites': 'conseils',                // ❌ Trop générique
};
```

Au lieu de :
```typescript
const CATEGORY_MAPPING = {
  'piliers': USE_FRONTMATTER_CATEGORY,  // Chaque pilier a sa catégorie
  'satellites': USE_FRONTMATTER_CATEGORY,
};
```

### Pages sources principales

**Top sources** (pages avec le + de liens cassés) :
- `blog/demenageur/demenageur-toulouse` : **53 liens cassés** 🔴
- `blog/demenageur-rennes` : 24 liens cassés
- `blog/prix-demenagement-montpellier` : 16 liens cassés

**→ Articles piliers contiennent BEAUCOUP de liens internes cassés**

### Solution

**TASK-404-02 : Harmonisation CATEGORY_MAPPING** (déjà planifié ✅)

**PUIS TASK-404-05 : Correction massive liens internes**

Script devra corriger :
```bash
/blog/devis/guide → /blog/devis-demenagement-toulouse/guide
/blog/prix/xxx → /blog/prix-demenagement-ville/xxx
/blog/etudiant/xxx → /blog/demenagement-etudiant-ville/xxx
```

Nécessite mapping intelligent :
- Déterminer QUELLE ville selon contexte article source
- Ou rediriger vers pilier parent

---

## 🎯 PATTERN #5 : GUIDE vs GUIDE-COMPLET

### Problème

Suffixe `-complet` manquant :

```
❌ /blog/garde-meuble-nice/garde-meuble-nice-guide
✅ /blog/garde-meuble-nice/garde-meuble-nice-guide-complet

❌ /blog/demenageur-lille/demenageur-lille-guide
✅ /blog/demenageur-lille/demenageur-lille-expert  (ou -guide-complet)
```

### Volumétrie

**~449 liens** (selon `grep "guide"`)

**Mais attention** : Inclut liens corrects avec `-guide-complet`

Estimation réelle : **~100-150 liens** avec juste `-guide` au lieu de `-guide-complet`

### Cause

Fonction `cleanSlug()` retire `-complet` :

```typescript
// Certaines villes
clean = clean.replace(/-guide-complet$/i, '-guide');
```

**OU** liens créés manuellement sans `-complet`

### Solution

**TASK-404-05 : Correction liens internes**

Mapping :
```
-guide$ → -guide-complet
```

**OU si certains guides existent sans -complet** :
- Vérifier dans `VERIFICATION-ARTICLES.json` → `slugVariation`
- Corriger vers slug réel

---

## 🎯 PATTERN #6 : ARTICLES MANQUANTS LES PLUS RÉFÉRENCÉS

### Top 15 URLs cassées (multi-sites)

| Occurrences | URL cassée |
|-------------|------------|
| 30× | `/blog/demenageur-lille/demenageur-lille-expert` |
| 29× | `/blog/devis/guide` |
| 20× | `/blog/location-camion-lille/location-camion-demenagement-lille-guide` |
| 18× | `/blog/garde-meuble-strasbourg/garde-meuble-strasbourg-guide-complet` |
| 17× | `/blog/longue-distance/guide` |
| 16× | `/blog/petit-demenagement-montpellier/petit-demenagement-montpellier` |
| 16× | `/blog/demenageur-montpellier/demenageur-montpellier` |
| 15× | `/blog/garde-meuble/guide` |
| 15× | `/blog/etudiant/aide-financiere-demenagement-etudiant` |
| 15× | `/blog/demenagement-pas-cher-lille/demenagement-pas-cher-lille-guide` |
| 13× | `/devis-demenagement-lille` |
| 13× | `/blog/urgent/guide` |
| 12× | `/blog/demenagement-piano-montpellier/demenagement-piano-montpellier` |
| 12× | `/blog/demenagement-lyon-pas-cher/demenagement-lyon-pas-cher-guide-complet` |

### Insight

**Catégories courtes dominent** : `/blog/devis/guide`, `/blog/garde-meuble/guide`, `/blog/urgent/guide`

**Articles spécifiques manquants** : Lille (expert, location-camion), Montpellier (plusieurs piliers), Strasbourg (garde-meuble)

### Solution

**TASK-404-03 : Décision**

Pour chaque article :
1. Si catégorie courte → Corriger catégorie (pas créer)
2. Si article vraiment manquant → Décider créer ou rediriger

Exemples :
- `/blog/devis/guide` → Corriger vers `/blog/devis-demenagement-ville/guide` ✅
- `/blog/demenageur-lille/demenageur-lille-expert` → Vérifier si existe avec autre nom
- `/blog/garde-meuble-strasbourg/garde-meuble-strasbourg-guide-complet` → Créer si manquant

---

## 📊 RÉSUMÉ PATTERNS & SOLUTIONS

| Pattern | Volume | Type | Solution | Task |
|---------|--------|------|----------|------|
| **#1 Majuscules corridors** | ~50-60 | Homepage/code | Fix code | 404-08 |
| **#2 Majuscules quartiers** | ~30-40 | Homepage/code | Fix code | 404-08 |
| **#3 Devis-ville-quartier** | ~40-50 | Anciennes URLs | Redirections 301 | 404-07 |
| **#4 Catégories courtes** | ~150-200 | CATEGORY_MAPPING | Fix mapping + correction liens | 404-02 + 404-05 |
| **#5 Guide vs guide-complet** | ~100-150 | cleanSlug() ou liens manuels | Correction liens | 404-05 |
| **#6 Articles manquants** | Variable | Contenu absent | Décision cas par cas | 404-03 |

**Total estimé résolvable sans créer contenu** : **370-530 liens** (32-45% du CSV)

**Reste nécessitant correction liens internes** : **637-797 liens** (55-68%)

---

## ✅ VALIDATION ANALYSE CURSOR

### Concordance patterns CSV ↔ Analyse Cursor

| Pattern | CSV | Cursor | Match ? |
|---------|-----|--------|---------|
| Catégories incorrectes | 150-200 (courtes) | 691 (64.8%) | ✅ CONFIRMÉ |
| Variations slug | 100-150 (guide) | 192 (18%) | ✅ CONFIRMÉ |
| Majuscules | 80-100 | Pas séparé | ✅ IDENTIFIÉ |
| Articles manquants | Variable | 104 (9.7%) | 🟡 PARTIEL |

**Catégories incorrectes** :
- CSV : 150-200 = catégories courtes visibles
- Cursor : 691 = TOUS types catégories incorrectes (+ variations structure dossiers)
- **Cursor plus complet** ✅

**Variations slug** :
- CSV : 100-150 = principalement guide vs guide-complet
- Cursor : 192 = TOUS types variations
- **Cursor plus complet** ✅

**Majuscules** :
- CSV : Identifiées clairement (80-100)
- Cursor : Incluses dans autres patterns
- **CSV complète Cursor** ✅

---

## 🎯 ACTIONS COMPLÉMENTAIRES RECOMMANDÉES

### Ajout à TASK-404-08 (Homepage)

**Inclure fix majuscules** :
1. Corridors : `Nice-vers-paris` → `nice-vers-paris`
2. Quartiers : `quartiers-Nice` → `quartiers-nice`
3. Quartiers links : `/Nice/quartier` → `/nice/quartier`

**Fichiers à modifier** :
```typescript
// app/page.tsx ou components/Homepage.tsx
<Link href={`/${city.toLowerCase()}-vers-${dest.toLowerCase()}`}>
<Link href={`/quartiers-${city.toLowerCase()}`}>
<Link href={`/${city.toLowerCase()}/${quartier}`}>
```

### Ajout à TASK-404-07 (Redirections)

**Inclure redirections devis-ville-quartier** :
```javascript
// Nice, Bordeaux, Marseille
{
  source: '/devis-demenagement-:ville-:quartier',
  destination: '/quartiers-:ville',  // ou /:ville/:quartier si existe
  permanent: true
}
```

### Ajout à TASK-404-02 (Harmonisation)

**Vérifier et fixer CATEGORY_MAPPING générique** :
```typescript
// SUPPRIMER ou DOCUMENTER
'piliers': 'general',      // ❌ Trop générique
'satellites': 'conseils',  // ❌ Trop générique

// UTILISER frontmatter category à la place
```

---

## 📈 IMPACT ESTIMÉ

### Si TASK-404-02 à 404-09 exécutées

**Résolution attendue CSV (1167 liens)** :

| Pattern | Résolution | Volume |
|---------|-----------|--------|
| Catégories courtes | TASK-404-02 + 404-05 | 150-200 ✅ |
| Majuscules | TASK-404-08 | 80-100 ✅ |
| Devis-quartier | TASK-404-07 | 40-50 ✅ |
| Guide variations | TASK-404-05 | 100-150 ✅ |
| Articles manquants | TASK-404-03/04 | Variable |

**Total résolvable** : **370-500 liens** (32-43% du CSV)  
**+ Corrections liens internes** : **~650 liens supplémentaires**

**TOTAL ATTENDU** : **~1020-1150 liens résolus** (87-98% du CSV) ✅

---

**FIN DE L'ANALYSE DÉTAILLÉE**

*Ce rapport complète TASK-404-01 avec patterns CSV spécifiques.*

