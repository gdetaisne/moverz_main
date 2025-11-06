# 📋 DETTE TECHNIQUE RESTANTE - Session 03 Nov 2025

**Date** : 03 novembre 2025 - 16h45  
**Analyste** : Cursor AI (auto-revue)

---

## ✅ CE QUI EST FAIT ET DÉPLOYABLE

### **Pattern #9 : Quartiers → Satellites** ✅

**Status** : Code 100% corrigé, pushé GitHub, attente déploiement

**Actions complétées** :
- ✅ Phase 1 : 6 bugs critiques corrigés (35 liens)
- ✅ Phase 2 : Nettoyage quartiers/communes sans pages (102 items retirés)
- ✅ Commits : `64f86e6` + `9f91ca4`
- ✅ Push : Monorepo + 11 repos individuels

**Reste à faire** :
- [ ] Tests live post-déploiement (15 min)
- [ ] Validation crawler Pattern #9 résolu (30 min)

**Impact attendu** : ~145 liens 404 résolus

---

## ⚠️ DETTE TECHNIQUE IDENTIFIÉE NON TRAITÉE

### **1. P1-012-SEO-villes-hardcodees-50% Incomplète** 🟠

**Découverte** : P1-012-SEO-villes-hardcodees-50% marquée "100% complète" mais scope incomplet

**Ce qui manquait** :
- ❌ 8 pages `quartiers-{ville}/page.tsx` (metadata Lille hardcodée)
- ❌ 11 composants `NeighborhoodsIndex.tsx` (Toulouse hardcodé)
- ❌ NeighborhoodsData.ts (Montpellier, Bordeaux, Strasbourg)

**Résolution** : ✅ Corrigé dans Pattern #9 Phase 1

**Action requise** : ❓
- **Option A** : Marquer P1-012-SEO-villes-hardcodees-50% comme ⚠️ INCOMPLET puis ✅ TERMINÉ (corrigé dans Pattern #9)
- **Option B** : Laisser tel quel (déjà marqué terminé, bugs corrigés ailleurs)
- **Option C** : Mettre à jour documentation P1-012-SEO-villes-hardcodees-50% avec note "bugs résiduels corrigés dans Pattern #9"

**Recommandation** : **Option C** (mise à jour doc, pas de réouverture)

---

### **2. Pattern #5B : Catégories `/guide`** 🔴

**Problème** : ~320-400 liens cassés vers `/blog/{category}/guide`

**Source** : Liens internes dans markdown articles (content/blog/\*\*/\*.md)

**Exemple** :
```
❌ Lien : /blog/prix/guide
✅ Article réel : /blog/prix-demenagement-bordeaux/prix-demenagement-bordeaux-guide
```

**Villes affectées** : **Toutes (11 villes)**

**Volumétrie estimée** :
- Bordeaux : ~128 liens
- Montpellier : ~70 liens (pattern différent - liens circulaires)
- Lille : ~40 liens
- Nice : ~50 liens (pattern satellites, pas /guide)
- Autres : ~100 liens

**Total** : **~320-400 liens** (68% des 470 URLs restantes)

**Stratégie Qualité** (3-4h) :
1. Créer script recherche/remplacement markdown
2. Mapper `/blog/{category}/guide` → `/blog/{category}-{ville}/{category}-{ville}-guide`
3. Appliquer sur 11 villes
4. Test + Deploy

**Status actuel** : 📋 **ANALYSÉ** mais **NON TRAITÉ**

**Action requise** : ❓
- **Option A** : Créer sous-tâche dédiée "TASK-404-PATTERN-5B"
- **Option B** : Intégrer dans TASK-404-CORRECTIONS-PATTERNS (déjà en cours)
- **Option C** : Reporter après validation Pattern #9

**Recommandation** : **Option B** (continuer dans tâche actuelle)

---

### **3. Pattern #5A : Piliers → Satellites Nice/Montpellier** 🟡

**Problème** : ~110 liens cassés structure satellites

**Exemple Nice** :
```
❌ /blog/aide-demenagement-nice/satellites/aide-amis-demenagement-nice
❌ /blog/demenagement-entreprise-nice/satellites/demenagement-bureaux-entreprise-nice
```

**Exemple Montpellier** :
```
❌ /blog/demenagement-entreprise-montpellier/demenagement-entreprise-montpellier
(Lien circulaire - article link vers lui-même)
```

**Volumétrie** :
- Montpellier : ~80 liens
- Nice : ~40 liens

**Status** : 📋 **DOCUMENTÉ** mais **NON TRAITÉ**

**Action requise** : ❓
- **Option A** : Traiter maintenant (2-3h script correction)
- **Option B** : Reporter après Pattern #5B (plus gros impact)

**Recommandation** : **Option B** (après #5B)

---

## 📊 RÉCAPITULATIF DETTE

| Item | Impact | Temps | Priorité | Status |
|------|--------|-------|----------|--------|
| **P1-012-SEO-villes-hardcodees-50% doc** | Documentation | 10 min | P2 | 📝 À documenter |
| **Pattern #5B /guide** | ~320-400 liens | 3-4h | P0 | 🔴 À traiter |
| **Pattern #5A Satellites** | ~110 liens | 2-3h | P1 | 🟡 À planifier |

---

## 🎯 PLAN RECOMMANDÉ

### **Immédiat (après déploiement Pattern #9)** :

1. ✅ **Tests Pattern #9** (15 min)
   - Valider 0 lien 404 sur `/quartiers-{ville}`
   - Tester 11 sites

2. ✅ **Pattern #5B** (3-4h)
   - Script correction liens `/guide` dans markdown
   - ~320-400 liens résolus
   - **Résolution complète projet 404** → 91%+

3. ⏸️ **Pattern #5A** (2-3h)
   - Après validation Pattern #5B
   - Résolution finale → 100%

4. ✅ **Doc P1-012-SEO-villes-hardcodees-50%** (10 min)
   - Note dans README : "Bugs résiduels corrigés Pattern #9"

---

## ✅ ACTIONS REQUISES

### **Pour finaliser Pattern #9** :
- [ ] Guillaume : Fix blog/page.tsx build error
- [ ] Guillaume : Rebuild 11 sites CapRover
- [ ] Cursor : Tests live 11 sites
- [ ] Guillaume : Validation crawler

### **Pour Pattern #5B** (prochain) :
- [ ] Décision Guillaume : Traiter maintenant ou reporter ?
- [ ] Si GO : Cursor crée script correction markdown
- [ ] Application + Deploy 11 villes

### **Pour clôture session** :
- [ ] Mettre à jour BACKLOG.md (Pattern #9 terminé)
- [ ] Mettre à jour TODO-GUILLAUME.md
- [ ] Documenter leçon apprise P1-012-SEO-villes-hardcodees-50%

---

**Créé par** : Cursor AI (auto-revue session)  
**Objectif** : Aucune dette technique non documentée

