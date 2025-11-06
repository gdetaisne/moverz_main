# 🎯 PLAN EXÉCUTION FINAL - Projet 404

**Date** : 03 novembre 2025  
**Basé sur** : Scan réel (513 erreurs) + Rollback TASK-404-02 + Analyse exhaustive

---

## 🧠 LOGIQUE D'ORDRE (CRITIQUE)

### Principe #1 : Valider le workflow D'ABORD
**Avant corrections massives** → Tester sur petits patterns (Quick Wins)  
**Workflow** : Code → Deploy → Scan → Comparer → Valider

### Principe #2 : Décider AVANT de corriger
**TASK-404-03** (décision 104 articles) AVANT **TASK-404-05** (correction liens)  
**Raison** : Si on crée contenu après correction → Re-correction nécessaire

### Principe #3 : Interne AVANT externe
**Liens internes** (TASK-404-05) AVANT **Redirections 301** (P1-404-07-404-redirections-externes-0%)  
**Raison** : Redirections basées sur état final liens internes

### Principe #4 : Skip ce qui est risqué
**TASK-404-02** = Cosmétique mais change 167 URLs → **SKIP**  
**Leçon** : Rollback du 03/11, validation insuffisante

---

## 📋 ORDRE FINAL OPTIMAL

### ✅ FAIT
**TASK-404-01** : Audit structure ✅ (01/11, 2h30)

---

### PHASE 0 : VALIDATION WORKFLOW (2h) ⭐ **DÉMARRER ICI**

**But** : Valider que code → deploy → scan → compare fonctionne

#### TASK-404-QW : Quick Wins (2h) - NOUVEAU
**Priorité** : P0 (validation workflow)  
**Actions** :
1. Fix majuscules URLs (1h)
   - `/Nice-vers-paris` → `/nice-vers-paris`
   - `/quartiers-Nice` → `/quartiers-nice`
   - Fichiers : Templates corridors, quartiers, homepage
   
2. Fix accents encodés Toulouse (30min)
   - URLs avec `%C3%A9` → Redirections 301
   - Ou fix source si templates
   
3. Fix devis cross-ville (30min)
   - `/devis-demenagement-lille` dans Bordeaux → Fix

**ROI** : 170-220 liens (35-45% des 513)  
**Validation** : Deploy → Scan → Compare (513 → 290-340)  
**Risque** : FAIBLE (chercher-remplacer simple)

**Si validation OK** → Confiance pour suite  
**Si validation KO** → Debug avant corrections massives

---

### PHASE 1 : DÉCISION (1h)

#### TASK-404-03 : Décision 104 articles
**Priorité** : P0 (BLOQUE 404-04 et 404-05)  
**Actions** :
1. Liste 104 articles (depuis TASK-404-01)
2. Par article : Créer OU Rediriger ?
3. Si créer : Définir slug/catégorie MAINTENANT
4. Si rediriger : Identifier pilier cible

**Focus spécial** : 
- 53 satellites Toulouse = **SPAM évident** (helicoptere, teleski) → Rediriger
- Rouen (34) + Montpellier (33) = Analyser SEO

**Dépend de** : TASK-404-01 ✅  
**Bloque** : TASK-404-04 (si création) ET TASK-404-05 (correction)

**⚠️ CRITIQUE** : DOIT être fait AVANT 404-05  
**Sinon** : Correction liens vers piliers → Puis contenu créé → Re-correction

---

### PHASE 2 : CRÉATION CONTENU (0-30h) - OPTIONNEL

#### TASK-404-04 : Création contenu (SI décidé en 404-03)
**Priorité** : P2 (optionnel)  
**Actions** : Créer X articles (0 à 104)

**Dépend de** : TASK-404-03 (décision)  
**Bloque** : TASK-404-05 (liens doivent pointer vers nouveau contenu)

**⚠️ DOIT être fait AVANT 404-05 si création**

**RECOMMANDATION** : 
- Rediriger les 53 Toulouse spam
- Créer seulement 20-30 prioritaires (Rouen/Montpellier)
- Effort : 6-9h au lieu de 20-30h

---

### PHASE 3 : CORRECTION MASSIVE (4-6h)

#### TASK-404-05 : Correction automatique ~400-500 liens
**Priorité** : P0 (cœur du projet)  
**Actions** :
1. Créer script basé sur VERIFICATION-ARTICLES.json
2. Corriger catégories incorrectes (~400-500)
3. Corriger variations slug (~100-150)
4. Corriger vers nouveau contenu (si TASK-404-04 fait)
5. Backup AVANT exécution
6. Dry-run sur Rennes (test)
7. Exécution 11 villes
8. Validation échantillon

**ROI** : ~400-500 liens (60-70% des 513 restants)

**Dépend de** : 
- TASK-404-03 ✅ (décision)
- TASK-404-04 si applicable (contenu créé)

**Bloque** : TASK-404-06

**⚠️ CRITIQUE** : Backup obligatoire (risque script bugué)

---

### PHASE 4 : VALIDATION INTERNE (1h)

#### TASK-404-06 : Validation liens internes
**Priorité** : P0 (go/no-go Phase 5)  
**Actions** :
1. Re-run analyze-404.mjs
2. Comparer avant/après
3. Analyser résiduels (<50 acceptables)
4. Tests manuels 3 villes

**Attendu** : 290-340 (post Quick Wins) → <50 liens

**Dépend de** : TASK-404-05  
**Bloque** : Phase 5 (ne pas continuer si échec)

---

### PHASE 5 : EXTERNE + HOMEPAGE (5-8h)

#### P1-404-07-404-redirections-externes-0% : Redirections 301 externes
**Priorité** : P1  
**Actions** :
1. Analyser URLs externes (Search Console, GPT)
2. Identifier non couvertes par corrections internes
3. Créer redirections 301 (~300-500)
4. Ajouter dans next.config.mjs (11 villes)

**Dépend de** : TASK-404-06  
**Bloque** : TASK-404-09

#### TASK-404-08 : Homepage (déjà traité en Quick Wins)
**Priorité** : P1  
**Actions** : Majuscules déjà fixées en Phase 0

**Temps révisé** : 1h (au lieu de 2-3h)

---

### PHASE 6 : VALIDATION FINALE (2-3h)

#### TASK-404-09 : Tests complets
**Priorité** : P0  
**Actions** :
1. Re-run analyse finale
2. Tests live 11 villes
3. Screaming Frog (1 ville)
4. Search Console vérification
5. Rapport final

**Attendu** : <10 erreurs résiduelles (vs 513 initial)

**Dépend de** : TASK-404-05 à 404-08  
**Bloque** : RIEN (fin projet)

---

## ⚠️ TÂCHES À SKIP

### TASK-404-02 : Harmonisation Technique → **SKIP**
**Raison** :
- Bug identifié = cosmétique (sans effet fonctionnel)
- Correction = 167 URLs changées (risque SEO)
- Rollback déjà fait (03/11, 1h15 perdue)
- **Coût > Bénéfice**

**Validation** : Retrait accents CATEGORY_MAPPING peut être fait en Quick Wins si nécessaire

---

## 📊 EFFORT TOTAL RÉVISÉ

| Phase | Tâches | Temps | % Résolution | Cumulé |
|-------|--------|-------|--------------|--------|
| ✅ Audit | 404-01 | 2h30 | - | 2h30 |
| 0. Quick Wins | 404-QW | 2h | 35-45% | 4h30 |
| 1. Décision | 404-03 | 1h | - | 5h30 |
| 2. Contenu (opt) | 404-04 | 0-9h | 5-10% | 5h30-14h30 |
| 3. Correction | 404-05 | 4-6h | 60-70% | 9h30-20h30 |
| 4. Validation | 404-06 | 1h | - | 10h30-21h30 |
| 5. Externe | 404-07 | 3-5h | 5-10% | 13h30-26h30 |
| 5. Homepage | 404-08 | 1h | - | 14h30-27h30 |
| 6. Final | 404-09 | 2-3h | - | 16h30-30h30 |

**TOTAL SANS création** : **16h30** (vs 15-23h initial)  
**TOTAL AVEC création partielle** : **20h30-24h30** (20-30 articles)

---

## 🎯 VALIDATION DÉPENDANCES

```mermaid
404-01 (✅)
  ↓
404-QW (Quick Wins) ← PHASE 0
  ↓ Deploy + Scan + Compare
  ↓ Si validé
404-03 (Décision)
  ↓
  ├─→ 404-04 (Création) SI décidé
  │     ↓
  └─→ 404-05 (Correction massive)
        ↓
      404-06 (Validation)
        ↓ Si OK
        ├─→ 404-07 (Redirections 301)
        └─→ 404-08 (Homepage - déjà fait)
              ↓
            404-09 (Validation finale)
```

**Points critiques** :
- ⚠️ 404-03 AVANT 404-05 (sinon re-correction)
- ⚠️ 404-04 AVANT 404-05 si création (sinon re-correction)
- ⚠️ 404-06 validation AVANT 404-07 (ne pas continuer si cassé)
- ✅ Quick Wins PEUT être parallèle (pas de dépendance)

---

## ✅ ORDRE RECOMMANDÉ FINAL

### Session 1 : Validation (2h)
```
TASK-404-QW : Quick Wins
→ Deploy CapRover
→ Régénérer scan
→ Comparer : 513 → 290-340
→ SI OK : Continue
```

### Session 2 : Décision (1h)
```
TASK-404-03 : Décider 104 articles
→ Recommandation : 53 spam Toulouse = Rediriger
→ 30 prioritaires = Créer
→ 21 autres = Rediriger
```

### Session 3 : Contenu (6-9h) - OPTIONNEL
```
TASK-404-04 : Créer 30 articles prioritaires
→ Skip spam Toulouse (53)
→ Focus Rouen/Montpellier
```

### Session 4 : Correction (4-6h)
```
TASK-404-05 : Script auto-correction
→ Test Rennes d'abord
→ Puis 11 villes
→ Validation échantillon
```

### Session 5 : Validation (1h)
```
TASK-404-06 : Tests
→ Scan final
→ Comparer
→ GO/NO-GO Phase 5
```

### Session 6 : Externe (5-8h)
```
P1-404-07-404-redirections-externes-0% : Redirections 301
TASK-404-08 : Homepage (réduit à 1h)
TASK-404-09 : Validation finale
```

---

## 📝 CHANGEMENTS À APPLIQUER

### Dans BACKLOG.md

**AJOUTER** :
- TASK-404-QW (Quick Wins) - P0 - 2h - NOUVEAU

**MODIFIER** :
- TASK-404-02 : Statut → ❌ SKIP (cosmétique, rollback)
- TASK-404-03 : Ajouter "Focus 53 spam Toulouse"
- TASK-404-08 : Temps 2-3h → 1h (majuscules déjà en QW)
- Dépendances : Retirer 404-02 des blocages

**ORDRE** :
1. ✅ TASK-404-01 (audit)
2. 🆕 TASK-404-QW (quick wins)
3. 📋 TASK-404-03 (décision)
4. 📋 TASK-404-04 (contenu - optionnel)
5. 📋 TASK-404-05 (correction massive)
6. 📋 TASK-404-06 (validation)
7. 📋 P1-404-07-404-redirections-externes-0% (redirections)
8. 📋 TASK-404-08 (homepage - réduit)
9. 📋 TASK-404-09 (validation finale)

---

## 🚨 POINTS CRITIQUES À NE PAS MANQUER

### ❌ NE JAMAIS faire dans cet ordre
```
❌ 404-05 AVANT 404-03 → Risque re-correction
❌ 404-05 AVANT 404-04 → Risque re-correction
❌ 404-07 AVANT 404-06 → Redirections sans validation
❌ 404-02 sans tests URLs → Rollback (déjà fait)
```

### ✅ TOUJOURS faire dans cet ordre
```
✅ Quick Wins → Deploy → Scan → Compare (validation workflow)
✅ 404-03 (décision) AVANT 404-05 (correction)
✅ 404-04 (contenu) AVANT 404-05 SI création
✅ 404-06 (validation) AVANT 404-07 (externe)
```

---

## 🎯 PRÊT POUR MISE À JOUR

Je vais maintenant mettre à jour :
1. BACKLOG.md (ordre + nouvelle tâche Quick Wins)
2. TODO-GUILLAUME.md (prochaine tâche = Quick Wins)
3. Créer dossier TASK-404-QW avec docs

**Validation** : Ce plan est-il OK ? 🤔

