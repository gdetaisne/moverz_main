# TASK-027 : Clean Redirections 301

**Date création** : 03 novembre 2025  
**Priorité** : P1 (Important - Dette technique)  
**Assigné** : Guillaume  
**Temps estimé** : 2-8h (selon approche)

---

## 🎯 OBJECTIF

Nettoyer, harmoniser et centraliser les redirections 301 des 11 sites.

**Problème actuel** :
- ❌ Incohérence entre villes (Nice: 107, Toulouse: 16)
- ❌ Redirections hardcodées (impossible à sync)
- ❌ Pas de centralisation (11 fichiers séparés)
- ⚠️ Bugs potentiels (trailing slash loops, destinations 404)

**Objectif** :
- ✅ Redirections harmonisées sur 11 villes
- ✅ Template centralisé (facilite maintenance)
- ✅ Validation automatique (pas de loops/404)
- ✅ Documentation complète

---

## 📊 ÉTAT ACTUEL

### Redirections par ville

| Ville | Count | Status | Problèmes |
|-------|-------|--------|-----------|
| Nice | 107 | ✅ Complet | - |
| Marseille | 82 | ✅ Bon | - |
| Lille | ~80 | ✅ Satellites | - |
| Strasbourg | ~40 | ✅ Majuscules | - |
| Nantes | ~35 | ✅ OK | - |
| Montpellier | ~30 | ✅ OK | - |
| Rennes | ~30 | ✅ OK | - |
| Rouen | ~25 | ✅ OK | - |
| Toulouse | 16 | ⚠️ Incomplet | Trailing slash loops |
| Lyon | ~10 | ⚠️ Incomplet | Manque satellites |
| Bordeaux | ❓ | ❓ À vérifier | - |

**Total** : ~550 redirections (toutes villes)

### Patterns identifiés

**✅ Bien couverts** (11/11 villes) :
1. Satellites génériques → ville-spécifiques
2. Catégories blog vides → /blog/

**⚠️ Partiels** :
3. Cross-ville (Toulouse) → 2/11 villes
4. Quartiers Bordeaux → 3/11 villes

**❌ Incomplets** :
5. Fichiers BATCH/PILIER → 2/11 villes
6. Majuscules → 3/11 villes

---

## 🎯 APPROCHES POSSIBLES

### Option A : Quick Fix (2-3h) ← RECOMMANDÉ

**Objectif** : Corriger urgences + harmoniser basique

**Actions** :
1. ✅ Audit Bordeaux (15 min)
2. ✅ Corriger trailing slash loops Toulouse (15 min)
3. ✅ Ajouter redirections BATCH/PILIER manquantes (9 villes, 1h)
4. ✅ Harmoniser patterns manquants (cross-ville, quartiers, 1h)
5. ✅ Tests validation (30 min)

**Résultat** :
- 11 villes avec redirections cohérentes
- Bugs critiques corrigés
- Aucun refactoring architecture

**Avantages** :
- ✅ Rapide
- ✅ Risque faible
- ✅ Résultat immédiat

**Inconvénients** :
- ❌ Maintenance future difficile
- ❌ Reste hardcodé

---

### Option B : Refactoring Complet (6-8h)

**Objectif** : Architecture propre et maintenable

**Actions** :
1. ✅ Créer template centralisé `.templates/redirects.template.js`
2. ✅ Variables dynamiques `${CITY_SLUG}`
3. ✅ Script génération 11 configs
4. ✅ Validation automatique (test destinations)
5. ✅ Documentation complète

**Résultat** :
- Template unique à maintenir
- Sync automatique 11 villes
- Tests automatisés

**Avantages** :
- ✅ Maintenance future facile
- ✅ Impossible d'oublier une ville
- ✅ Tests automatiques

**Inconvénients** :
- ❌ Long (6-8h)
- ❌ Risque refactoring
- ❌ Tests déploiement requis

---

### Option C : Hybride (3-4h) ← ÉQUILIBRÉ

**Phase 1** : Quick fixes (2h)
- Corriger urgences
- Harmoniser patterns

**Phase 2** : Refactoring léger (2h)
- Extraire redirections communes
- Script validation
- Documentation

**Résultat** :
- Correctif immédiat
- Base pour future centralisation

---

## 📋 PLAN D'ACTION (Option A - Quick Fix)

### Phase 1 : Audit & Inventory (30 min)

**1. Lire Bordeaux `next.config.mjs`**
- Compter redirections
- Identifier patterns
- Détecter problèmes

**2. Créer tableau complet**
```
INVENTORY-REDIRECTIONS.md :
- Ville par ville
- Pattern par pattern
- Manques identifiés
```

**3. Identifier bugs critiques**
- Trailing slash loops
- Destinations 404 potentielles
- Patterns manquants dangereux

---

### Phase 2 : Corrections Urgentes (1h)

**1. Corriger Toulouse trailing slash loops** (15 min)
```javascript
// ❌ ACTUEL
{ source: '/mentions-legales/', destination: '/mentions-legales/', permanent: true }

// ✅ CORRIGER ou SUPPRIMER
```

**2. Ajouter BATCH/PILIER manquants** (30 min)
```javascript
// À ajouter dans 9 villes (Lyon, Toulouse, etc.)
{ source: '/blog/satellites/BATCH-:path*', destination: '/blog/', permanent: true },
{ source: '/blog/satellites/PILIER-:path*', destination: '/blog/', permanent: true },
{ source: '/blog/satellites/LISTE-:path*', destination: '/blog/', permanent: true },
```

**3. Tester sur 2 villes** (15 min)
- Build local
- Vérifier pas de crash
- Test redirections

---

### Phase 3 : Harmonisation (1h)

**1. Patterns cross-ville manquants** (30 min)

Ajouter dans 9 villes (sauf Nice/Marseille) :
```javascript
// URLs Toulouse sur autre ville
{ source: '/Toulouse/:path*', destination: '/quartiers-{ville}/', permanent: true },
{ source: '/devis-demenagement-toulouse/', destination: '/estimation-rapide/', permanent: true },
```

**2. Quartiers Bordeaux manquants** (30 min)

Ajouter dans 8 villes (sauf Nice/Marseille/Toulouse) :
```javascript
{ source: '/{ville}/chartrons', destination: '/quartiers-{ville}/', permanent: true },
{ source: '/{ville}/bastide', destination: '/quartiers-{ville}/', permanent: true },
// + 5 autres quartiers
```

---

### Phase 4 : Validation & Deploy (30 min)

**1. Tests locaux** (15 min)
```bash
# Build 3 villes test
cd sites/nice && npm run build
cd sites/toulouse && npm run build
cd sites/lyon && npm run build
```

**2. Deploy CapRover** (10 min)
```bash
git add sites/*/next.config.mjs
git commit -m "fix(redirects): harmonisation 11 villes + bugs"
git push origin main
bash scripts/deploy/push-to-all-site-repos.sh
```

**3. Tests production** (5 min)
```bash
# Tester redirections ajoutées
curl -I https://devis-demenageur-toulouse.fr/blog/satellites/BATCH-test
# Attendu : 301 → /blog/

curl -I https://devis-demenageur-lyon.fr/Toulouse/capitole
# Attendu : 301 → /quartiers-lyon/
```

---

## 📋 CHECKLIST PRÉ-CODE

### ⚠️ Impact SEO ?
- ✅ OUI - Redirections = URLs = SEO
- ✅ Redirections 301 = OK SEO (permanent)
- ✅ Tests requis avant deploy

### 🌍 Multi-sites ?
- ✅ OUI - 11 sites
- ✅ Fichiers : `sites/*/next.config.mjs`
- ✅ Script sync non applicable (fichiers différents)

### 🚫 Ville hardcodée ?
- ⚠️ OUI - C'est le problème
- ✅ Option A : Garder hardcodé (quick fix)
- ✅ Option B : Dynamiser (refactoring)

---

## 🧪 TESTS OBLIGATOIRES

### Tests Build (avant deploy)

```bash
# 3 villes représentatives
cd sites/nice && npm run build     # Ville complète (107 redirects)
cd sites/toulouse && npm run build # Ville problématique (16 → 50+)
cd sites/lyon && npm run build     # Ville incomplète (10 → 50+)
```

**Attendu** : ✅ Build success (pas de crash next.config)

---

### Tests Production (après deploy)

**1. Redirections BATCH/PILIER**
```bash
curl -I https://devis-demenageur-lyon.fr/blog/satellites/BATCH-test/
# Attendu : HTTP/2 301
# Location: https://devis-demenageur-lyon.fr/blog/
```

**2. Redirections cross-ville**
```bash
curl -I https://devis-demenageur-lille.fr/Toulouse/capitole/
# Attendu : HTTP/2 301
# Location: https://devis-demenageur-lille.fr/quartiers-lille/
```

**3. Redirections quartiers Bordeaux**
```bash
curl -I https://devis-demenageur-rennes.fr/rennes/chartrons/
# Attendu : HTTP/2 301
# Location: https://devis-demenageur-rennes.fr/quartiers-rennes/
```

**Validation** : ✅ 3/3 redirections fonctionnent

---

## 🚨 RISQUES

### Risque #1 : Crash next.config.mjs
**Probabilité** : Faible  
**Impact** : Critique (site down)  
**Mitigation** : Tests build locaux avant deploy

### Risque #2 : Redirect loops
**Probabilité** : Faible  
**Impact** : Moyen (pages inaccessibles)  
**Mitigation** : Validation manuelle redirections

### Risque #3 : Oubli d'une ville
**Probabilité** : Moyenne  
**Impact** : Moyen (ville reste avec bugs)  
**Mitigation** : Checklist 11 villes

---

## 📊 CRITÈRES DE SUCCÈS

### Definition of Done

**Code** :
- ✅ 11 fichiers `next.config.mjs` modifiés
- ✅ Bugs critiques corrigés (Toulouse loops)
- ✅ Patterns harmonisés (BATCH/PILIER, cross-ville, quartiers)

**Tests** :
- ✅ Build local OK (3 villes test)
- ✅ Redirections testées en prod (9 tests minimum)
- ✅ Aucune régression détectée

**Documentation** :
- ✅ Inventory complet créé
- ✅ Décisions documentées
- ✅ Tests résultats documentés

**Deploy** :
- ✅ Commit GitHub main avec SHA
- ✅ 11 repos villes pushés
- ✅ 11 sites redéployés CapRover

---

## 📁 LIVRABLES

### Fichiers créés

```
.cursor/tasks/[P1]-TASK-027-clean-redirections/
├── README.md                  (ce fichier)
├── context.md                 (état actuel détaillé)
├── decisions.md               (choix techniques)
├── progress.md                (journal session)
├── commits.md                 (SHA GitHub)
├── tests.md                   (résultats tests)
└── INVENTORY-REDIRECTIONS.md  (tableau complet)
```

### Fichiers modifiés

```
sites/bordeaux/next.config.mjs       (audit)
sites/toulouse/next.config.mjs       (fix loops + ajouts)
sites/lyon/next.config.mjs           (ajouts patterns)
sites/lille/next.config.mjs          (ajouts patterns)
sites/strasbourg/next.config.mjs     (ajouts patterns)
sites/nantes/next.config.mjs         (ajouts patterns)
sites/montpellier/next.config.mjs    (ajouts patterns)
sites/rennes/next.config.mjs         (ajouts patterns)
sites/rouen/next.config.mjs          (ajouts patterns)
```

**Nice/Marseille** : Pas de changement (déjà complets)

---

## 🚀 COMMANDES DÉMARRAGE

```bash
# Pour Quick Fix (Option A)
"Cursor, je démarre TASK-027 en mode Quick Fix"

# Pour Refactoring (Option B)
"Cursor, je démarre TASK-027 en mode Refactoring"

# Pour Hybride (Option C)
"Cursor, je démarre TASK-027 en mode Hybride"
```

---

## 📖 RÉFÉRENCES

**État des lieux complet** : Voir conversation 03/11/2025 (analyse détaillée)

**Fichiers clés** :
- `sites/nice/next.config.mjs` (référence complète)
- `sites/marseille/next.config.mjs` (référence catégories accentuées)
- `sites/toulouse/next.config.mjs` (bugs à corriger)

**Docs projet** :
- `.cursor/PRINCIPES-SACRES.md` (SEO first)
- `.cursor/ZONES-DE-RISQUE.md` (canonicals & redirections)
- `.cursor/CHECKLIST-PRE-CODE.md` (workflow)

---

## 💡 NOTES

### Pourquoi P1 et pas P0 ?

**Actuel** : Redirections fonctionnent, sites en ligne
**Impact** : Dette technique, pas critique business
**Priorité** : Important mais pas bloquant

**Ordre recommandé** :
1. P0 : TASK-404 (liens cassés = perte SEO)
2. P1 : TASK-027 (clean redirections)
3. P1 : Autres tâches 70-95%

### Liens avec autres tâches

**TASK-404-CORRECTIONS-PATTERNS** :
- Ajout de redirections pendant corrections 404
- Architecture redirections impacte future maintenance

**TASK-006 Canonicals** :
- Redirections doivent pointer vers canonicals corrects

---

**Status** : 📋 TODO  
**Créé le** : 03 novembre 2025  
**Prêt à démarrer** : ✅ Oui

