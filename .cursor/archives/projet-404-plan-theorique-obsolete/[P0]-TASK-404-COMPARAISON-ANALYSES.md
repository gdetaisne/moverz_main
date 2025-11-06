# 🔍 COMPARAISON : Tâches Pré-définies vs Scan Réel 03/11

**Date** : 03 novembre 2025  
**Sources comparées** :
- TASKS-404-DETAILLEES.md (planification 01/11)
- Scan réel 03/11 (513 erreurs)

---

## 📊 SOURCES DE DONNÉES

### Source 1 : verify-real-missing-articles.mjs (01/11)
**Périmètre** : Liens INTERNES (markdown → markdown)  
**Total** : 1067 liens cassés  
**Base pour** : TASK-404-01 à 404-09

```
691 catégories incorrectes (64.8%)
192 variations slug (18.0%)
80 articles existants (7.5%)
104 vraiment manquants (9.7%)
```

### Source 2 : Scan production 03/11
**Périmètre** : Erreurs 404 CRAWLÉES (user experience réelle)  
**Total** : 513 erreurs 404 (1168 liens cassés visibles)

**Patterns identifiés** :
- Majuscules URLs : ~80-100 liens
- Accents encodés Toulouse : ~60-80 liens
- Catégories incorrectes : ~400-500 liens
- Devis cross-ville : ~30-40 liens
- Satellites Toulouse : ~53 liens

---

## ⚠️ GAP IDENTIFIÉ

### 🔴 Pattern NON couvert : Majuscules URLs (~80-100 liens)

**Scan réel montre** :
```
❌ /Nice-vers-paris
❌ /quartiers-Nice
❌ /Rouen/joli-mai
❌ /Marseille-vers-lyon
```

**Tâches pré-définies** :
- TASK-404-08 : Fix homepage (41 liens) ✅
- MAIS ne mentionne PAS explicitement les majuscules

**Conclusion** : ⚠️ **Partiellement couvert** par TASK-404-08

---

### 🔴 Pattern DIFFÉRENT : Accents Toulouse

**Scan réel montre** :
```
❌ /blog/dem%C3%A9nagement-entreprise/... (URLs générées)
❌ /blog/prix-dem%C3%A9nagement/... (dans HTML crawlé)
```

**Tâches pré-définies** :
- TASK-404-02 : Retrait accents CATEGORY_MAPPING ✅
- MAIS cible CATEGORY_MAPPING (code), pas URLs générées

**Analyse** :
- TASK-404-02 supprime `'déménagement-etudiant': 'etudiant'`
- Mais scan montre URLs **déjà générées avec accents** en production
- **Deux problèmes différents** :
  1. Code source (CATEGORY_MAPPING) → TASK-404-02
  2. URLs déjà crawlées → Besoin redirections 301

**Conclusion** : ⚠️ **TASK-404-02 ne résout PAS les URLs existantes**

---

### 🟡 Pattern NON couvert : Devis cross-ville (~30-40 liens)

**Scan réel montre** :
```
❌ /devis-demenagement-lille (dans Bordeaux)
❌ /devis-demenagement-marseille-chartrons (ville incorrecte)
```

**Tâches pré-définies** :
- Aucune tâche ne mentionne spécifiquement ce pattern

**Conclusion** : ❌ **NON couvert**

---

## ✅ CE QUI EST BIEN ALIGNÉ

### Pattern : Catégories incorrectes ✅
**Scan** : ~400-500 liens  
**Tâches** : TASK-404-05 (correction 691 catégories)  
**Alignement** : ✅ PARFAIT

### Pattern : Articles manquants ✅
**Scan** : Présents (Rouen, Montpellier surtout)  
**Tâches** : TASK-404-03 (décision 104 articles)  
**Alignement** : ✅ PARFAIT

### Pattern : Satellites Toulouse ✅
**Scan** : 53 liens spam (helicoptere, teleski...)  
**Tâches** : TASK-404-03/04 (décision + éventuelle création)  
**Alignement** : ✅ COUVERT (décision à prendre)

---

## 📋 RECONCILIATION : Tâches Ajustées

### Option A : Garder plan original + ajouts mineurs ⭐ RECOMMANDÉE

**Ajustements** :

1. **TASK-404-02-BIS : Fix production existante** (NEW)
   - Temps : 30min
   - Actions :
     - Redirections 301 pour URLs avec accents Toulouse
     - Fix templates majuscules
   - Bloque : Rien (peut être fait en parallèle)

2. **TASK-404-08 : Clarifier scope**
   - Ajout explicite : Fix majuscules (Nice-vers-X, quartiers-Nice)
   - Ajout : Fix devis cross-ville
   - Temps : 2-3h → 3-4h

3. **P1-404-07-404-redirections-externes-0% : Ajouter redirections accents**
   - Ajouter ~60-80 redirections pour Toulouse
   - Temps : 3-5h (inchangé, déjà prévu)

**Effort total ajusté** : 16h45-25h15 → **17h15-26h45** (+30min-1h30)

---

### Option B : Quick Wins d'abord (nouveauté)

**Nouvelle approche** :

```
Sprint 0 (NEW) : Quick Wins (2h)
├─ Fix majuscules URLs (1h) → 80-100 liens
├─ Fix accents Toulouse redirections (30min) → 60-80 liens
└─ Fix devis cross-ville (30min) → 30-40 liens
↓ Deploy + Scan + Compare
513 → 280-340 (-35-45%)
↓
Puis suivre TASK-404-02 à 404-09 (plan original)
```

**Avantages** :
- ✅ Validation rapide workflow (2h)
- ✅ ROI immédiat : 35-45% résolution
- ✅ Confiance avant corrections massives
- ✅ Mesure d'impact réel

**Inconvénients** :
- Une itération deploy/scan supplémentaire
- +2h au total (mais ROI validé)

---

## 💡 MA RECOMMANDATION

### ⭐ Option B : Quick Wins d'abord

**Pourquoi** :

1. **Validation du workflow complet** :
   - Tu veux tester : Code → Deploy → Scan → Compare
   - Quick wins = test parfait (simple, mesurable)

2. **ROI immédiat mesurable** :
   - 2h → 180-230 liens résolus
   - Confirmation que le plan fonctionne

3. **Patterns simples** :
   - Majuscules : Chercher-remplacer
   - Accents : Redirections 301
   - Devis : Fix templates
   - **Pas de risque** (vs TASK-404-02 rollback)

4. **Alignement avec ton workflow** :
   > 1. Faire les taches
   > 2. Publier CapRover
   > 3. Regenerer ces données
   > 4. Comparer
   > 5. Avancer

   Quick Wins = Test complet de ce workflow ! ✅

---

## 🎯 COMPARAISON FINALE

### Tâches pré-définies (01/11)
- ✅ Basées sur analyse exhaustive 1067 liens
- ✅ Couvrent 90% des patterns
- ⚠️ Ne mentionnent pas explicitement : majuscules, devis cross-ville
- ⚠️ TASK-404-02 a été rollback (risqué)

### Scan réel (03/11)
- ✅ Données PRODUCTION (user experience)
- ✅ Révèle patterns invisibles (majuscules, accents encodés)
- ✅ Volumétrie précise (513 erreurs)
- ✅ Permet validation itérative

### Alignement global
**Note** : 7/10

- ✅ Core patterns matchent (catégories, articles manquants)
- ⚠️ Quelques gaps (majuscules, devis)
- ⚠️ TASK-404-02 à reconsidérer (rollback)

---

## 🚀 PLAN FINAL RECOMMANDÉ

### Sprint 0 : Quick Wins (2h) ← **NOUVEAU**
- Fix majuscules
- Redirections accents Toulouse
- Fix devis cross-ville
- **→ 513 → 280-340** (-35-45%)

### Sprint 1 : Décision (1h)
- TASK-404-03 : Décider 104 articles
- Skip TASK-404-02 (cosmétique, rollback)
- **→ Prêt pour corrections massives**

### Sprint 2 : Correction massive (4-6h)
- TASK-404-05 : Auto-correction ~400-500 liens
- **→ 280-340 → <50**

### Sprint 3 : Cleanup (3-5h)
- TASK-404-06, 404-07, 404-08, 404-09
- **→ <10 résiduels**

**Total révisé** : **12-15h** (vs 16h45-25h15 original)

---

## ✅ CONCLUSION

### Les tâches pré-définies sont-elles alignées ?

**Réponse** : **OUI à 70%**, avec **ajustements mineurs** :

✅ **Bien aligné** :
- TASK-404-05 (catégories)
- TASK-404-03 (articles manquants)
- TASK-404-06/09 (validation)

⚠️ **Gaps à combler** :
- Majuscules URLs (scan montre, tasks ne mentionnent pas explicitement)
- Accents Toulouse (TASK-404-02 cible code, pas URLs production)
- Devis cross-ville (non mentionné)

🔴 **À reconsidérer** :
- TASK-404-02 : Rollback car cosmétique + risqué
- **Recommandation** : SKIP ou refaire avec redirections

---

## 🎯 ACTION IMMÉDIATE

**Je recommande** :

```bash
"Cursor, on démarre Quick Wins (Sprint 0)"
```

**Pourquoi** :
1. Valide ton workflow deploy→scan→compare
2. ROI immédiat mesurable (35-45%)
3. Confiance avant corrections massives
4. Patterns simples (pas de risque rollback)

**Ensuite** :
- Si Quick Wins validés (513 → 280-340)
- → Continue TASK-404-05 (correction massive)

**Temps total** : 2h + 4-6h = **6-8h** pour résoudre **90%** des 404s 🚀

---

Veux-tu :
- **A) Démarrer Quick Wins** (2h, validation workflow)
- **B) Suivre tasks originales** (skip Quick Wins, direct TASK-404-03)
- **C) Autre stratégie** ?

