# 📊 ANALYSE SCAN 404 - 03 NOV 2025

**Scan date** : 03/11/2025 08:38:07  
**Total sites** : 11  
**Pages vérifiées** : 1558  
**Erreurs 404** : 513  
**Liens cassés visibles** : 1168

---

## 🔴 SITES CRITIQUES (Taux > 50%)

### 1. Nice - 119 erreurs (65% taux)
**Le plus critique** : 183 pages analysées, 119 404s, 146 liens cassés

**Patterns identifiés** :
- ❌ **Majuscules URLs** : `/Nice-vers-paris`, `/quartiers-Nice`, `/Nice/vieux-Nice`
- ❌ **Catégories incorrectes** : `/blog/piano/...` → `/blog/demenagement-piano/...`
- ❌ **Devis patterns** : `/devis-demenagement-Nice-vieux-nice` (majuscule)

**Impact estimé** :
- Majuscules : ~30 liens
- Catégories : ~40 liens
- Devis : ~20 liens

### 2. Toulouse - 86 erreurs (61% taux)
**Très critique** : 141 pages analysées, 86 404s, 149 liens cassés

**Patterns identifiés** :
- ❌ **Accents encodés** : `/blog/dem%C3%A9nagement-entreprise/...` (é = %C3%A9)
- ❌ **Satellites fantômes** : 53 liens vers `/blog/satellites/demenagement-*-toulouse` inexistants
- ❌ **Catégories courtes** : `/blog/garde-meuble/`, `/blog/international/`

**Impact estimé** :
- Accents encodés : ~60-80 liens
- Satellites : ~53 liens (TASK-404-03 à décider)
- Catégories courtes : ~20 liens

---

## 🟠 SITES MOYENS (Taux 30-50%)

### 3. Rouen - 67 erreurs (49.6% taux)
**Patterns** : 
- Majuscules : `/Rouen/joli-mai`
- Catégories incorrectes : `/blog/garde-meuble/...` → `/blog/garde-meuble-rouen/...`

### 4. Montpellier - 68 erreurs (34% taux)
**Patterns** :
- Catégories incorrectes (principal)
- Liens vers articles manquants

---

## 🟢 SITES BONS (Taux < 30%)

- Bordeaux : 48 erreurs (25.9%)
- Lille : 30 erreurs (18.2%)
- Nantes : 27 erreurs (20%)
- Strasbourg : 20 erreurs (14%)
- Rennes : 28 erreurs (33.7%)
- Lyon : 12 erreurs (14.8%) ⭐ **Le meilleur**
- Marseille : 8 erreurs (7.5%) ⭐ **Excellent**

---

## 📊 PATTERNS CONSOLIDÉS

### Pattern #1 : Majuscules URLs (priorité HAUTE)
**Impact** : ~80-100 liens (8-10% des 404s)  
**ROI** : **100 liens/heure**  
**Villes** : Nice, Lille, Marseille, Rouen, Strasbourg, Lyon

**Exemples** :
```
❌ /Nice-vers-paris
✅ /nice-vers-paris

❌ /quartiers-Nice
✅ /quartiers-nice

❌ /Lyon/la-presqu'%C3%AEle
✅ /lyon/presqu-ile
```

**Solution** : TASK-404-08 (fix homepage + templates) - 1h

---

### Pattern #2 : Accents encodés Toulouse (priorité HAUTE)
**Impact** : ~60-80 liens (6-8% des 404s)  
**ROI** : **60-80 liens/heure**  
**Ville** : Toulouse uniquement

**Exemples** :
```
❌ /blog/dem%C3%A9nagement-entreprise/...
✅ /blog/demenagement-entreprise/...

❌ /blog/prix-dem%C3%A9nagement/...
✅ /blog/prix-demenagement/...
```

**Root cause** : Liens générés avec accents dans source
**Solution** : Fix templates + composants Toulouse - 30min

---

### Pattern #3 : Catégories incorrectes (priorité CRITIQUE)
**Impact** : ~400-500 liens (40-50% des 404s)  
**ROI** : TASK-404-05 (automatique)  
**Villes** : TOUTES

**Exemples** :
```
❌ /blog/piano/assurer-piano-transport-nice
✅ /blog/demenagement-piano/assurer-piano-transport-nice

❌ /blog/garde-meuble/garde-meuble-toulouse
✅ /blog/garde-meuble-toulouse/... (selon structure)

❌ /blog/etudiant/guide
✅ /blog/demenagement-etudiant-bordeaux/guide-complet
```

**Solution** : TASK-404-05 (correction massive automatique) - 4-6h

---

### Pattern #4 : Satellites Toulouse manquants (priorité MOYENNE)
**Impact** : ~53 liens (5% des 404s)  
**Ville** : Toulouse

**Exemples clairement du spam** :
```
❌ /blog/satellites/demenagement-helicoptere-toulouse
❌ /blog/satellites/demenagement-teleski-toulouse
❌ /blog/satellites/demenagement-funiculaire-toulouse
```

**Décision** : ❌ **NE PAS CRÉER** (spam évident)  
**Solution** : Redirections 301 → article pilier - P1-404-07-404-redirections-externes-0%

---

### Pattern #5 : Devis-ville patterns (priorité MOYENNE)
**Impact** : ~40-50 liens  
**Villes** : Bordeaux, Lille, Marseille

**Exemples** :
```
❌ /devis-demenagement-lille (dans Bordeaux)
❌ /devis-demenagement-marseille-chartrons (ville incorrecte)
```

**Root cause** : Templates cross-contamination
**Solution** : Fix templates devis - 30min

---

## 🚀 QUICK WINS RÉVISÉS (basé sur scan réel)

| Quick Win | Temps | Liens résolus | ROI | Priorité |
|-----------|-------|---------------|-----|----------|
| 1. Majuscules URLs | 1h | 80-100 | **100** | 🔴 P0 |
| 2. Accents Toulouse | 30min | 60-80 | **120** | 🔴 P0 |
| 3. Devis patterns | 30min | 40-50 | **80** | 🟠 P1 |
| **TOTAL Quick Wins** | **2h** | **180-230** | **100** | - |

**% résolution** : 180-230 / 513 = **35-45%** des 404s en 2h 🚀

---

## 🎯 PLAN D'ACTION RECOMMANDÉ

### Sprint 1 : Quick Wins (2h) ⭐ **DÉMARRER ICI**

```bash
"Cursor, on démarre les quick wins 404"
```

**Actions** :
1. Fix majuscules URLs (1h)
   - Templates homepage
   - Liens corridors (`Nice-vers-paris`)
   - Liens quartiers (`/quartiers-Nice`)
   
2. Fix accents Toulouse (30min)
   - Identifier source (templates/composants)
   - Remplacer par slugs sans accents
   
3. Fix devis patterns (30min)
   - Templates devis cross-ville

**Résultat attendu** : 180-230 liens résolus (35-45%)

**Validation** :
- Deploy CapRover (11 villes)
- Régénérer scan
- Comparer : 513 → 280-330 (objectif)

---

### Sprint 2 : Catégories (4-6h)

Après validation Sprint 1, si ROI confirmé :

```bash
"Cursor, on lance TASK-404-05"
```

**Actions** :
- Correction massive automatique (~400-500 liens)
- Script basé sur VERIFICATION-ARTICLES.json

**Résultat attendu** : 280-330 → <50 liens résiduels

---

### Sprint 3 : Validation & Cleanup (2h)

**Actions** :
- TASK-404-06 : Validation
- P1-404-07-404-redirections-externes-0% : Redirections 301 résiduelles
- TASK-404-09 : Tests finaux

---

## 🔍 ANALYSE DÉTAILLÉE PAR VILLE

### Nice (119 404s, priorité #1)

**Patterns** :
- 30x majuscules (`Nice-vers-X`, `/quartiers-Nice`)
- 40x catégories incorrectes (`/blog/piano/`, `/blog/pas-cher/`)
- 20x devis patterns (`/devis-demenagement-Nice-...`)
- 29x articles satellites légitimes mais catégorie incorrecte

**Quick wins disponibles** : ~50 liens (42%)

---

### Toulouse (86 404s, priorité #2)

**Patterns** :
- 60-80x accents encodés (`dem%C3%A9nagement`)
- 53x satellites spam (helicoptere, teleski, etc.)
- Quelques catégories courtes

**Quick wins disponibles** : ~60-80 liens (70-93%) ⭐

**Note** : Les 53 satellites spam = décision à prendre (TASK-404-03)

---

### Rouen (67 404s)

**Patterns dominants** :
- Majuscules (`/Rouen/joli-mai`)
- Catégories incorrectes (`/blog/garde-meuble/` → `/blog/garde-meuble-rouen/`)

---

### Bordeaux (48 404s)

**Patterns** :
- Catégories courtes (`/blog/etudiant/guide` → chemin complet)
- Devis cross-ville (`/devis-demenagement-lille`)
- Templates `/marseille` hardcodés

---

## 💡 RECOMMANDATION STRATÉGIQUE

### Option A : Quick Wins d'abord (2h) ⭐⭐⭐ **RECOMMANDÉE**

**Avantages** :
- ROI immédiat : 35-45% résolution en 2h
- Validation rapide du processus (deploy → scan → compare)
- Confiance avant TASK-404-05 (massive)
- Patterns simples (majuscules, accents)

**Workflow** :
```
1. Fix majuscules + accents + devis (2h)
   ↓
2. Commit + Push GitHub
   ↓
3. Deploy CapRover 11 villes (webhook auto)
   ↓
4. Attendre 10-15 min (deploy complet)
   ↓
5. Régénérer scan
   ↓
6. Comparer : 513 → 280-330 ✅
   ↓
7. SI validé → Continue TASK-404-05
```

---

### Option B : TASK-404-05 directement (4-6h)

**Avantages** :
- Résout 80-90% en une session
- Moins d'itérations deploy/test

**Inconvénients** :
- Pas de validation intermédiaire
- Si script bugue → rollback massif
- Pas de mesure d'impact progressif

---

## 🎯 MA RECOMMANDATION

**Je recommande Option A (Quick Wins d'abord)** pour :

1. **Valider le workflow complet** (code → deploy → scan → compare)
2. **Gagner confiance** avec corrections simples
3. **ROI immédiat** : 35-45% résolution en 2h
4. **Itérations rapides** : Voir l'impact réel

**Commande** :
```bash
"Cursor, on démarre les quick wins 404"
```

---

## 📋 FICHIERS À MODIFIER (Quick Wins)

### Fix Majuscules (1h)

**Fichiers concernés** :
- `app/*/page.tsx` (pages corridors)
- `app/quartiers-*/page.tsx`
- Templates/composants homepage
- Liens dynamiques générés

**Villes** : Nice, Lille, Marseille, Rouen, Strasbourg, Lyon

---

### Fix Accents Toulouse (30min)

**Fichiers concernés** :
- Composants générant liens vers catégories
- Templates Toulouse spécifiques
- OU articles sources avec liens mal encodés

**Ville** : Toulouse uniquement

---

### Fix Devis Patterns (30min)

**Fichiers concernés** :
- Templates `/devis-demenagement-X`
- FAQ pages
- Composants cross-référençant villes

**Villes** : Bordeaux, Lille, Marseille

---

## ✅ PRÊT À DÉMARRER ?

**Questions** :

1. **Veux-tu partir sur Quick Wins** (2h, 35-45% résolution) ?
2. **Ou directement TASK-404-05** (4-6h, 80-90% résolution) ?

Sur quelle option ? 🚀

