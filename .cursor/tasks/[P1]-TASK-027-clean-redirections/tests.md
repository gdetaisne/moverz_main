# Tests - TASK-027 Clean Redirections

**Tâche** : Clean Redirections 301  
**Date création** : 03 novembre 2025

---

## 🎯 STRATÉGIE TESTS

### Approche

**Tests échantillonnés** (pas exhaustifs)

**Raison** :
- 11 villes × 80-120 redirects = ~1000 redirections
- Tests exhaustifs = 5-6h
- Tests échantillonnés = 30 min
- Coverage 80% risques avec 10% effort

---

### Phases de tests

1. **Tests build locaux** (avant deploy)
   - 3 villes représentatives
   - Vérifier next.config.mjs valide
   - Durée : 10 min

2. **Tests production critiques** (après deploy)
   - 9 redirections critiques
   - 3 villes × 3 patterns
   - Durée : 10 min

3. **Tests regression** (après deploy)
   - Vérifier redirections existantes OK
   - 3 redirections par ville
   - Durée : 10 min

**Total** : 30 min tests

---

## 🧪 TESTS BUILD (Avant Deploy)

### Test Build Local

**Objectif** : Vérifier syntax next.config.mjs

**Villes testées** : 3 représentatives
- Nice (107 redirects - ville complète)
- Toulouse (16 → 80+ - ville corrigée)
- Lyon (10 → 80+ - ville incomplète)

---

### Test #1 : Build Nice

```bash
cd sites/nice
npm run build
```

**Attendu** :
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

### Test #2 : Build Toulouse

```bash
cd sites/toulouse
npm run build
```

**Attendu** :
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

### Test #3 : Build Lyon

```bash
cd sites/lyon
npm run build
```

**Attendu** :
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

## 🌐 TESTS PRODUCTION (Après Deploy)

### Tests Redirections BATCH/PILIER

**Pattern testé** : Fichiers temporaires supprimés

---

#### Test #4 : BATCH Lyon

```bash
curl -I https://devis-demenageur-lyon.fr/blog/satellites/BATCH-test/
```

**Attendu** :
```
HTTP/2 301
location: https://devis-demenageur-lyon.fr/blog/
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

#### Test #5 : PILIER Lille

```bash
curl -I https://devis-demenageur-lille.fr/blog/satellites/PILIER-test/
```

**Attendu** :
```
HTTP/2 301
location: https://devis-demenageur-lille.fr/blog/
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

#### Test #6 : LISTE Rennes

```bash
curl -I https://devis-demenageur-rennes.fr/blog/satellites/LISTE-test/
```

**Attendu** :
```
HTTP/2 301
location: https://devis-demenageur-rennes.fr/blog/
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

### Tests Cross-Ville Toulouse

**Pattern testé** : URLs Toulouse sur autres villes

---

#### Test #7 : Toulouse Capitole sur Lyon

```bash
curl -I https://devis-demenageur-lyon.fr/Toulouse/capitole/
```

**Attendu** :
```
HTTP/2 301
location: https://devis-demenageur-lyon.fr/quartiers-lyon/
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

#### Test #8 : Devis Toulouse sur Lille

```bash
curl -I https://devis-demenageur-lille.fr/devis-demenagement-toulouse/
```

**Attendu** :
```
HTTP/2 301
location: https://devis-demenageur-lille.fr/estimation-rapide/
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

#### Test #9 : Toulouse vers Paris sur Strasbourg

```bash
curl -I https://devis-demenageur-strasbourg.fr/Toulouse-vers-paris/
```

**Attendu** :
```
HTTP/2 301
location: https://devis-demenageur-strasbourg.fr/strasbourg-vers-paris/
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

### Tests Quartiers Bordeaux

**Pattern testé** : Quartiers Bordeaux sur autres villes

---

#### Test #10 : Chartrons sur Rennes

```bash
curl -I https://devis-demenageur-rennes.fr/rennes/chartrons/
```

**Attendu** :
```
HTTP/2 301
location: https://devis-demenageur-rennes.fr/quartiers-rennes/
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

#### Test #11 : Cauderan sur Montpellier

```bash
curl -I https://devis-demenageur-montpellier.fr/montpellier/cauderan/
```

**Attendu** :
```
HTTP/2 301
location: https://devis-demenageur-montpellier.fr/quartiers-montpellier/
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

#### Test #12 : Bastide sur Rouen

```bash
curl -I https://devis-demenageur-rouen.fr/rouen/bastide/
```

**Attendu** :
```
HTTP/2 301
location: https://devis-demenageur-rouen.fr/quartiers-rouen/
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

## ✅ TESTS REGRESSION

### Tests Redirections Existantes

**Objectif** : Vérifier qu'on n'a rien cassé

---

#### Test #13 : Satellite Nice

```bash
curl -I https://devis-demenageur-nice.fr/blog/satellites/cartons-gratuits-ou-trouver/
```

**Attendu** :
```
HTTP/2 301
location: https://devis-demenageur-nice.fr/blog/satellites/cartons-gratuits-ou-trouver-nice/
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

#### Test #14 : Catégorie vide Marseille

```bash
curl -I https://devis-demenageur-marseille.fr/blog/etudiant/
```

**Attendu** :
```
HTTP/2 301
location: https://devis-demenageur-marseille.fr/blog/
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

#### Test #15 : Ancien URL Toulouse

```bash
curl -I https://devis-demenageur-toulouse.fr/estimation-demenagement-toulouse/
```

**Attendu** :
```
HTTP/2 301
location: https://devis-demenageur-toulouse.fr/estimation-rapide/
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

## 🔍 TESTS SPÉCIFIQUES

### Test Toulouse Loops (Fix Critique)

**Objectif** : Vérifier suppression loops

---

#### Test #16 : Mentions légales Toulouse (après fix)

```bash
curl -I https://devis-demenageur-toulouse.fr/mentions-legales/
```

**Attendu** :
```
HTTP/2 200
(Pas de redirect, page charge directement)
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

**Note** : Avant fix = 301 loop, après = 200 direct

---

### Test Bordeaux Audit

**Objectif** : Vérifier redirections Bordeaux fonctionnent

---

#### Test #17 : Satellite Bordeaux

```bash
curl -I https://www.bordeaux-demenageur.fr/blog/satellites/cartons-gratuits-ou-trouver/
```

**Attendu** :
```
HTTP/2 301
location: https://www.bordeaux-demenageur.fr/blog/satellites/cartons-gratuits-ou-trouver-bordeaux/
```

**Résultat** : ⏳ TODO

**Status** : ⏳ TODO

---

## 📊 RÉSUMÉ TESTS

### Tableau récapitulatif

| # | Test | Type | Ville | Status | Résultat |
|---|------|------|-------|--------|----------|
| 1 | Build Nice | Build | Nice | ⏳ | - |
| 2 | Build Toulouse | Build | Toulouse | ⏳ | - |
| 3 | Build Lyon | Build | Lyon | ⏳ | - |
| 4 | BATCH Lyon | Prod | Lyon | ⏳ | - |
| 5 | PILIER Lille | Prod | Lille | ⏳ | - |
| 6 | LISTE Rennes | Prod | Rennes | ⏳ | - |
| 7 | Toulouse → Lyon | Prod | Lyon | ⏳ | - |
| 8 | Toulouse → Lille | Prod | Lille | ⏳ | - |
| 9 | Toulouse → Stras | Prod | Stras | ⏳ | - |
| 10 | Chartrons → Rennes | Prod | Rennes | ⏳ | - |
| 11 | Cauderan → Montp | Prod | Montp | ⏳ | - |
| 12 | Bastide → Rouen | Prod | Rouen | ⏳ | - |
| 13 | Satellite Nice | Regr | Nice | ⏳ | - |
| 14 | Catégorie Marsei | Regr | Marsei | ⏳ | - |
| 15 | Ancien URL Toul | Regr | Toul | ⏳ | - |
| 16 | Mentions Toul | Spéc | Toul | ⏳ | - |
| 17 | Satellite Bdx | Spéc | Bdx | ⏳ | - |

**Total** : 17 tests  
**Passés** : 0  
**Échoués** : 0  
**TODO** : 17

---

## ⚠️ CRITÈRES ACCEPTATION

### Tests Build

**Success** : ✅ 3/3 builds passent

**Si échec** :
- Syntax error dans next.config.mjs
- → Corriger et re-tester
- → NE PAS DEPLOY avant fix

---

### Tests Production

**Success** : ✅ 12/12 redirections fonctionnent (301 + destination correcte)

**Si échec** :
- 1-2 échecs : Corriger et re-deploy ville concernée
- 3+ échecs : Problème systématique, rollback et investiguer

---

### Tests Regression

**Success** : ✅ 3/3 redirections existantes OK

**Si échec** :
- Régression identifiée
- → Rollback et investiguer
- → Corriger bug introduit

---

## 🚨 EN CAS D'ÉCHEC

### Procédure rollback

**Si tests build échouent** :
1. Ne pas deploy
2. Corriger syntax
3. Re-tester localement
4. Deploy une fois OK

**Si tests production échouent** :
1. Identifier ville(s) problématique(s)
2. Rollback ville via CapRover (version précédente)
3. Investiguer bug
4. Corriger et re-deploy

**Si régression détectée** :
1. Rollback immédiat 11 villes
2. Investiguer modification ayant cassé
3. Corriger
4. Re-tester exhaustivement
5. Re-deploy

---

## 📖 COMMANDES TESTS

### Script tests automatique (optionnel)

```bash
# Si Option B Refactoring choisie
bash scripts/validate-redirects.sh

# Teste automatiquement :
# - Build 11 villes
# - Redirections critiques
# - Pas de loops
# - Destinations 200 OK
```

**Si Quick Fix** : Tests manuels ci-dessus suffisants

---

## 📋 CHECKLIST FINALE

**Avant de marquer tâche TERMINÉE** :

- [ ] ✅ 3/3 tests build passés
- [ ] ✅ 12/12 tests production passés
- [ ] ✅ 3/3 tests regression passés
- [ ] ✅ 2/2 tests spécifiques passés
- [ ] ✅ Aucune régression détectée
- [ ] ✅ Résultats documentés dans ce fichier
- [ ] ✅ SHA commits documentés

**Total** : 17/17 tests ✅

---

**Créé le** : 03 novembre 2025  
**Dernière MAJ** : 03 novembre 2025  
**Tests effectués** : 0/17

