# Commits - TASK-027 Clean Redirections

**Tâche** : Clean Redirections 301  
**Date création** : 03 novembre 2025

---

## 📊 RÉSUMÉ COMMITS

**Total commits** : 0  
**Repos impactés** : 0/12

---

## 🔄 COMMITS MONOREPO

### Commit #1 (à venir)

**Date** : TBD  
**Message** : `fix(redirects): harmonisation 11 villes + bugs critiques`

**Description** :
```
fix(redirects): harmonisation 11 villes + bugs critiques

- Fix Toulouse trailing slash loops (suppression 3 redirects)
- Ajout BATCH/PILIER redirections (9 villes)
- Ajout cross-ville Toulouse (9 villes)
- Ajout quartiers Bordeaux (8 villes)

Résultat :
- Toulouse: 16 → 80+ redirections
- Lyon: 10 → 80+ redirections
- Patterns cohérents 11 villes

Tested:
- Build local: Nice, Toulouse, Lyon ✓
- Production: 9 tests critiques ✓

Refs: TASK-027
```

**Fichiers modifiés** :
```
sites/bordeaux/next.config.mjs       (audit + ajouts)
sites/toulouse/next.config.mjs       (fix loops + ajouts)
sites/lyon/next.config.mjs           (ajouts patterns)
sites/lille/next.config.mjs          (ajouts patterns)
sites/strasbourg/next.config.mjs     (ajouts patterns)
sites/nantes/next.config.mjs         (ajouts patterns)
sites/montpellier/next.config.mjs    (ajouts patterns)
sites/rennes/next.config.mjs         (ajouts patterns)
sites/rouen/next.config.mjs          (ajouts patterns)
```

**SHA** : TBD  
**Statut** : ⏳ TODO

---

## 🏙️ REPOS VILLES (Deploy CapRover)

### Push vers repos GitHub individuels

**Script** : `bash scripts/deploy/push-to-all-site-repos.sh`

**Repos concernés** : 11/11

| Ville | Repo GitHub | Statut | SHA |
|-------|-------------|--------|-----|
| Nice | `gdetaisne/dd-nice` | ⏳ TODO | - |
| Marseille | `gdetaisne/dd-marseille` | ⏳ TODO | - |
| Lyon | `gdetaisne/dd-lyon` | ⏳ TODO | - |
| Lille | `gdetaisne/dd-lille` | ⏳ TODO | - |
| Toulouse | `gdetaisne/dd-toulouse` | ⏳ TODO | - |
| Bordeaux | `gdetaisne/dd-bordeaux` | ⏳ TODO | - |
| Nantes | `gdetaisne/dd-nantes` | ⏳ TODO | - |
| Strasbourg | `gdetaisne/dd-strasbourg` | ⏳ TODO | - |
| Montpellier | `gdetaisne/dd-montpellier` | ⏳ TODO | - |
| Rennes | `gdetaisne/dd-rennes` | ⏳ TODO | - |
| Rouen | `gdetaisne/dd-rouen` | ⏳ TODO | - |

**Note** : Push déclenche webhook CapRover → Redeploy automatique

---

## 📋 WORKFLOW DEPLOY COMPLET

### Étape 1 : Commit Monorepo

```bash
cd /Users/guillaumestehelin/moverz_main-2

git add sites/*/next.config.mjs
git add .cursor/tasks/[P1]-TASK-027-clean-redirections/

git commit -m "fix(redirects): harmonisation 11 villes + bugs critiques"

git push origin main
```

**SHA monorepo** : TBD

---

### Étape 2 : Push Repos Villes

```bash
bash scripts/deploy/push-to-all-site-repos.sh
```

**Output attendu** :
```
🚀 Pushing all sites to individual GitHub repos...

📦 Nice (dd-nice)...
✅ Pushed to https://github.com/gdetaisne/dd-nice.git

📦 Marseille (dd-marseille)...
✅ Pushed to https://github.com/gdetaisne/dd-marseille.git

...

✅ All 11 sites pushed successfully
```

---

### Étape 3 : Vérifier Redeploys CapRover

**Dashboard CapRover** : https://captain.your-domain.com

**Vérifier** :
- [ ] dd-nice : Build en cours → Success
- [ ] dd-marseille : Build en cours → Success
- [ ] dd-lyon : Build en cours → Success
- [ ] dd-lille : Build en cours → Success
- [ ] dd-toulouse : Build en cours → Success
- [ ] dd-bordeaux : Build en cours → Success
- [ ] dd-nantes : Build en cours → Success
- [ ] dd-strasbourg : Build en cours → Success
- [ ] dd-montpellier : Build en cours → Success
- [ ] dd-rennes : Build en cours → Success
- [ ] dd-rouen : Build en cours → Success

**Durée estimée** : 5-10 min par site (11 sites en parallèle)

---

## 🔍 VÉRIFICATION COMMITS

### Checklist avant push

- [ ] Message commit clair et descriptif
- [ ] Fichiers modifiés listés dans message
- [ ] Tests locaux passés (build OK)
- [ ] Documentation à jour (commits.md, progress.md)
- [ ] SHA documenté après push

---

### Checklist après push

- [ ] SHA monorepo documenté
- [ ] 11 repos villes pushés
- [ ] 11 redeploys CapRover validés
- [ ] Tests production effectués
- [ ] Résultats documentés dans tests.md

---

## 📖 HISTORIQUE

### Commits liés (autres tâches)

**TASK-404-CORRECTIONS-PATTERNS** (03/11/2025) :
- Ajout redirections Nice/Marseille
- Ajout redirections Strasbourg/Nantes

**TASK-025-fix-sitemap-urls** (03/11/2025) :
- Pas de redirections, mais leçon workflow deploy

**TASK-012-villes-hardcodees** (03/11/2025) :
- Corrections templates (évite futurs bugs redirections)

---

## 🎯 COMMITS FUTURS (si Refactoring)

### Commit #2 (optionnel - si Option B choisie)

**Message** : `refactor(redirects): centralisation template + variables dynamiques`

**Description** :
```
refactor(redirects): centralisation template + variables dynamiques

Phase 1 - Template :
- Créer .templates/redirects.template.js
- Extraire redirections communes
- Variables ${CITY_SLUG} dynamiques

Phase 2 - Script génération :
- scripts/sync/generate-redirects.sh
- Génère 11 next.config.mjs depuis template

Phase 3 - Validation :
- scripts/validate-redirects.mjs
- Tests automatiques destinations

Résultat :
- Maintenance 10x plus rapide
- Impossible oublier ville
- Tests automatisés

Refs: TASK-027 (Phase Refactoring)
```

**Si fait** : Dans 3-6 mois selon besoin

---

**Créé le** : 03 novembre 2025  
**Dernière MAJ** : 03 novembre 2025  
**Commits effectués** : 0/1

