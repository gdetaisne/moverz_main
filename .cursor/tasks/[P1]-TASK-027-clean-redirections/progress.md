# Progress - TASK-027 Clean Redirections

**Date création** : 03 novembre 2025  
**Status** : 📋 TODO

---

## 📊 AVANCEMENT GLOBAL

**Phase actuelle** : 0/4 (Documentation créée)

```
□ Phase 1 : Audit & Inventory (30 min)
□ Phase 2 : Corrections Urgentes (1h)
□ Phase 3 : Harmonisation (1h)
□ Phase 4 : Validation & Deploy (30 min)
```

**Temps investi** : 0h  
**Temps estimé restant** : 2-3h (Quick Fix)

---

## 📝 SESSIONS DE TRAVAIL

### Session 0 : Documentation (03/11/2025)

**Date** : 03 novembre 2025  
**Durée** : 15 min  
**Par** : Cursor

**Actions** :
- ✅ Création dossier tâche
- ✅ README.md (plan complet)
- ✅ context.md (contexte détaillé)
- ✅ decisions.md (choix techniques)
- ✅ progress.md (ce fichier)
- ✅ commits.md (template)
- ✅ tests.md (template)

**État** : Documentation prête pour démarrage

**Notes** :
- État des lieux déjà fait (conversation précédente)
- Analyse complète disponible
- Prêt à démarrer dès validation Guillaume

---

## 🔄 PROCHAINE SESSION

**Quand** : À définir par Guillaume

**Démarrage recommandé** :
```bash
"Cursor, je démarre TASK-027 en mode Quick Fix"
```

**Plan première session (2-3h)** :

**1. Audit Bordeaux** (15 min)
- Lire `sites/bordeaux/next.config.mjs`
- Compter redirections
- Identifier patterns/problèmes

**2. Inventory complet** (15 min)
- Créer tableau INVENTORY-REDIRECTIONS.md
- Lister patterns par ville
- Identifier manques

**3. Corrections urgentes** (1h)
- Fix loops Toulouse
- Ajouter BATCH/PILIER (9 villes)
- Tests build

**4. Harmonisation** (1h)
- Ajouter cross-ville (9 villes)
- Ajouter quartiers Bordeaux (8 villes)
- Tests build

**5. Deploy & Validation** (30 min)
- Commit + push
- Deploy CapRover 11 villes
- Tests production (9 tests)

---

## 📋 CHECKLIST PHASES

### Phase 1 : Audit & Inventory ⏳

**Objectif** : Comprendre état exact + identifier manques

- [ ] Lire `sites/bordeaux/next.config.mjs`
- [ ] Compter redirections Bordeaux
- [ ] Créer INVENTORY-REDIRECTIONS.md
  - [ ] Tableau ville par ville
  - [ ] Patterns présents/manquants
  - [ ] Bugs identifiés
- [ ] Identifier bugs critiques

**Durée estimée** : 30 min  
**Status** : TODO

---

### Phase 2 : Corrections Urgentes ⏳

**Objectif** : Corriger bugs critiques

- [ ] **Toulouse loops**
  - [ ] Supprimer 3 redirections inutiles
  - [ ] Test build Toulouse
  
- [ ] **BATCH/PILIER manquants** (9 villes)
  - [ ] Lyon
  - [ ] Lille
  - [ ] Strasbourg
  - [ ] Nantes
  - [ ] Montpellier
  - [ ] Rennes
  - [ ] Rouen
  - [ ] Nice
  - [ ] Bordeaux
  
- [ ] Tests build (3 villes)
  - [ ] Nice
  - [ ] Toulouse
  - [ ] Lyon

**Durée estimée** : 1h  
**Status** : TODO

---

### Phase 3 : Harmonisation ⏳

**Objectif** : Patterns cohérents 11 villes

- [ ] **Cross-ville Toulouse** (9 villes)
  - [ ] Lyon
  - [ ] Lille
  - [ ] Strasbourg
  - [ ] Nantes
  - [ ] Montpellier
  - [ ] Rennes
  - [ ] Rouen
  - [ ] Toulouse
  - [ ] Bordeaux
  
- [ ] **Quartiers Bordeaux** (8 villes)
  - [ ] Lyon
  - [ ] Lille
  - [ ] Strasbourg
  - [ ] Nantes
  - [ ] Montpellier
  - [ ] Rennes
  - [ ] Rouen
  - [ ] Bordeaux
  
- [ ] Tests build (3 villes)
  - [ ] Nice
  - [ ] Toulouse
  - [ ] Lyon

**Durée estimée** : 1h  
**Status** : TODO

---

### Phase 4 : Validation & Deploy ⏳

**Objectif** : Deploy + tests production

- [ ] **Commit & Push**
  - [ ] Commit monorepo main
  - [ ] SHA documenté dans commits.md
  
- [ ] **Deploy CapRover**
  - [ ] Push 11 repos villes
  - [ ] Vérifier 11 redeploys OK
  
- [ ] **Tests production** (9 tests critiques)
  - [ ] BATCH/PILIER (3 villes)
  - [ ] Cross-ville Toulouse (3 villes)
  - [ ] Quartiers Bordeaux (3 villes)
  
- [ ] **Documentation finale**
  - [ ] Résultats tests.md
  - [ ] Commits SHA
  - [ ] Inventory final

**Durée estimée** : 30 min  
**Status** : TODO

---

## 🚧 BLOCKERS

*Aucun blocker identifié*

**Prérequis** :
- ✅ Documentation complète
- ✅ État des lieux fait
- ⏳ Validation approche par Guillaume

---

## 💡 DÉCOUVERTES

*À documenter pendant la tâche*

### Découvertes Session 0

**1. Bordeaux non audité** :
- État redirections inconnu
- Domaine exception
- À vérifier en priorité

**2. Toulouse loops suspects** :
- 3 redirections source = destination
- Risque loop
- À supprimer

**3. Incohérence quantitative** :
- Nice: 107 vs Lyon: 10
- Facteur 10x de différence
- Harmonisation nécessaire

---

## ⚠️ RISQUES RENCONTRÉS

*À documenter pendant la tâche*

---

## 📈 MÉTRIQUES

### Redirections par ville (état actuel)

| Ville | Avant | Après | Progression |
|-------|-------|-------|-------------|
| Nice | 107 | - | - |
| Marseille | 82 | - | - |
| Lille | ~80 | - | - |
| Strasbourg | ~40 | - | - |
| Nantes | ~35 | - | - |
| Montpellier | ~30 | - | - |
| Rennes | ~30 | - | - |
| Rouen | ~25 | - | - |
| Toulouse | 16 | - | - |
| Lyon | ~10 | - | - |
| Bordeaux | ❓ | - | - |

**Objectif après harmonisation** : 80-120 par ville

---

### Patterns coverage

| Pattern | Avant | Après | Target |
|---------|-------|-------|--------|
| Satellites | 11/11 ✅ | - | 11/11 |
| Catégories vides | 11/11 ✅ | - | 11/11 |
| Cross-ville | 2/11 ⚠️ | - | 11/11 |
| Quartiers Bdx | 3/11 ⚠️ | - | 11/11 |
| BATCH/PILIER | 2/11 ❌ | - | 11/11 |
| Majuscules | 3/11 ⚠️ | - | Selon besoin |

**Objectif** : 100% coverage patterns critiques

---

## 🎯 PROCHAINES ACTIONS

**Immédiat** :
1. Attendre validation approche (Guillaume)
2. Démarrer Phase 1 (Audit Bordeaux)

**Court terme** :
1. Phases 2-4 (corrections + harmonisation)
2. Deploy + tests

**Long terme** :
1. Monitoring 404s (validation corrections)
2. Évaluer besoin refactoring (dans 3-6 mois)

---

## 📖 NOTES SESSION

*À remplir pendant les sessions de travail*

### Session 1 (à venir)

**Date** : TBD  
**Durée** : TBD  
**Fait** : TBD

---

**Créé le** : 03 novembre 2025  
**Dernière MAJ** : 03 novembre 2025  
**Status** : 📋 TODO

