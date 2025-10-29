# 🎯 GUIDE COMPLET - RÉSOLUTION DES 404s

**Date**: 29 Octobre 2025  
**Projet**: Moverz Multi-Sites  
**Objectif**: Résoudre 2 970 liens cassés → 0 404

---

## 📋 TABLE DES MATIÈRES

1. [Vue d'ensemble](#vue-densemble)
2. [Prérequis](#prérequis)
3. [Phase 1: Préfixes villes](#phase-1-préfixes-villes)
4. [Phase 2: Slugs incorrects](#phase-2-slugs-incorrects)
5. [Phase 3: Analyse fine](#phase-3-analyse-fine)
6. [Phase 4: Corrections automatiques](#phase-4-corrections-automatiques)
7. [Phase 5: Création contenu](#phase-5-création-contenu)
8. [Phase 6: Validation finale](#phase-6-validation-finale)
9. [Suivi de progression](#suivi-de-progression)
10. [Dépannage](#dépannage)

---

## 📊 VUE D'ENSEMBLE

### État actuel (29 octobre 2025)

- **2 970 liens cassés** sur 1 047 articles
- **841 fichiers** (80.3%) avec des liens cassés
- **11 villes** concernées

### Répartition des problèmes

```
┌────────────────────────────────────────────────────┐
│ Articles manquants    54.5%  ████████████████████  │
│ Préfixes villes       39.2%  ██████████████        │
│ Slugs incorrects       6.3%  ███                   │
└────────────────────────────────────────────────────┘
```

### Résolvable automatiquement

- ✅ **93.6%** des problèmes sont résolvables automatiquement
- ⚠️ **6.4%** nécessitent création de contenu

### Planning

```
Semaine 1  │ ████████████████████     │ Phases 1-3
Semaine 2  │ ████████████████████████ │ Phases 4-6
```

**Durée totale**: 8-10 jours

---

## 🔧 PRÉREQUIS

### Outils nécessaires

```bash
# 1. Node.js (déjà installé)
node --version  # v24.x

# 2. jq (pour validation script)
brew install jq

# 3. Git (pour backup)
git --version
```

### Vérifier l'état initial

```bash
# Exécuter l'analyse de base
node scripts/analyze-404.mjs

# Lancer le script de validation
bash scripts/validate-404-progress.sh
```

**Résultat attendu**: Rapport montrant 2 970 liens cassés

---

## 🔴 PHASE 1: PRÉFIXES VILLES

**Objectif**: Corriger les 1 164 liens avec préfixes ville répétés  
**Durée**: 1-2 jours  
**Gain**: -39% (2 970 → ~1 806 liens cassés)

### Problème

Les liens contiennent le nom de la ville en double:

```markdown
❌ /blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet
✅ /blog/garde-meuble-marseille/guide-complet
```

### Solution

Le script automatique corrige tous les patterns:

```bash
bash scripts/phase1-fix-ville-prefixes.sh
```

### Ce que fait le script

1. ✅ Crée un backup automatique dans `backups/links-YYYYMMDD-HHMMSS/`
2. ✅ Corrige tous les patterns de préfixes pour les 11 villes:
   - `garde-meuble-{ville}/garde-meuble-{ville}-*`
   - `demenagement-{ville}/demenagement-{ville}-*`
   - `prix-demenagement-{ville}/prix-demenagement-{ville}-*`
   - `devis-demenagement-{ville}/devis-demenagement-{ville}-*`
   - Et toutes les catégories spécifiques
3. ✅ Affiche un rapport de progression par ville

### Sortie attendue

```
╔════════════════════════════════════════════════════════════╗
║  RÉSUMÉ DE LA PHASE 1                                      ║
╚════════════════════════════════════════════════════════════╝

📊 Statistiques:
   • Fichiers traités:        1,047
   • Patterns corrigés:       ~1,164
   • Backup:                  backups/links-20251029-120000/

✅ Phase 1 terminée avec succès!
```

### Validation

```bash
# Re-exécuter l'analyse
node scripts/analyze-404.mjs

# Vérifier la progression
bash scripts/validate-404-progress.sh
```

**Résultat attendu**: ~1 806 liens cassés (-39%)

### En cas de problème

```bash
# Restaurer le backup
cp -R backups/links-YYYYMMDD-HHMMSS/* sites/

# Vérifier les diffs (avant re-exécution)
git diff sites/marseille/content/blog/
```

---

## 🟡 PHASE 2: SLUGS INCORRECTS

**Objectif**: Corriger les 188 liens mal formés  
**Durée**: 2-3 heures  
**Gain**: -10% (1 806 → ~1 618 liens cassés)

### Problème

URLs incomplètes ou mal formées:

```markdown
❌ /blog/demenagement-international-toulouse
✅ /blog/international/guide-complet-toulouse

❌ /blog/garde-meuble-toulouse
✅ /blog/garde-meuble-toulouse/guide-complet
```

### Solution (Manuelle assistée)

Les scripts de Phase 2 et 3 existent déjà:

```bash
# Si le script phase2 existe déjà
bash scripts/phase2-fix-categories.mjs

# Sinon, passer à Phase 3 qui inclut cette analyse
node scripts/analyze-missing-articles-detailed.mjs
```

### Actions manuelles

Pour chaque URL incorrecte:

1. Identifier l'article cible correct
2. Remplacer dans tous les fichiers:

```bash
# Exemple: corriger un lien spécifique
find sites/toulouse/content -name "*.md" -exec sed -i '' \
  's|/blog/demenagement-international-toulouse|/blog/international/guide-complet-toulouse|g' {} \;
```

### Validation

```bash
node scripts/analyze-404.mjs
bash scripts/validate-404-progress.sh
```

**Résultat attendu**: ~1 618 liens cassés (-10%)

---

## 🔍 PHASE 3: ANALYSE FINE

**Objectif**: Identifier précisément les 1 618 "articles manquants"  
**Durée**: 4-6 heures  
**Gain**: Intelligence pour Phase 4

### Problème

Parmi les 1 618 "articles manquants":
- ~1 400 existent ailleurs (mauvaise catégorie/slug)
- ~40-50 sont vraiment manquants

### Solution

```bash
node scripts/analyze-missing-articles-detailed.mjs
```

### Ce que fait le script

1. ✅ Analyse chaque URL "manquante"
2. ✅ Cherche l'article dans d'autres catégories
3. ✅ Détecte les variations de slug
4. ✅ Utilise un algorithme de similarité (Levenshtein)
5. ✅ Classe en 6 catégories:
   - Exact match (article existe déjà)
   - Mauvaise catégorie
   - Variation de slug
   - Correspondance floue
   - Vraiment manquant
   - Format invalide

### Sortie attendue

```
╔════════════════════════════════════════════════════════════╗
║  RÉSULTATS DE L'ANALYSE                                    ║
╚════════════════════════════════════════════════════════════╝

✅ Exact match (résolvable):           170
🔄 Mauvaise catégorie (résolvable):    153
🔄 Variation de slug (résolvable):     50
🟡 Correspondance floue (à vérifier):  15
❌ Vraiment manquant (créer):          42
⚠️  Format invalide (corriger):        10

📈 Résolvable automatiquement: 373/440 URLs (84.8%)
```

### Fichiers générés

1. **`missing-articles-detailed.json`**: Analyse complète
2. **`scripts/phase4-fix-wrong-categories.sh`**: Script de correction auto-généré

### Top 10 articles à créer

Le script affiche les articles les plus référencés:

```
╔════════════════════════════════════════════════════════════╗
║  TOP 10 ARTICLES À CRÉER (par fréquence)                   ║
╚════════════════════════════════════════════════════════════╝

 1. [marseille] /blog/demenagement-marseille/location-camion-demenagement-marseille
    Référencé 15x dans 12 articles

 2. [marseille] /blog/demenagement-marseille/aide-au-demenagement-marseille
    Référencé 12x dans 9 articles

 3. [lyon] /blog/demenageur/choisir-demenageur-lyon
    Référencé 11x dans 8 articles
...
```

---

## 🟢 PHASE 4: CORRECTIONS AUTOMATIQUES

**Objectif**: Corriger les ~1 400 liens vers articles existants  
**Durée**: 1-2 jours  
**Gain**: -97% (1 618 → ~40 liens cassés)

### Prérequis

✅ Phase 3 complétée (génère le script Phase 4)

### Solution

```bash
# Script auto-généré par Phase 3
bash scripts/phase4-fix-wrong-categories.sh
```

### Ce que fait le script

1. ✅ Crée un backup automatique
2. ✅ Applique toutes les corrections identifiées en Phase 3:
   - Correction des catégories incorrectes (~153 URLs)
   - Correction des variations de slug (~50 URLs)
   - Correction des exact match (~170 URLs)
3. ✅ Affiche progression en temps réel

### Sortie attendue

```
╔════════════════════════════════════════════════════════════╗
║  PHASE 4: CORRECTION CATÉGORIES/SLUGS                      ║
╚════════════════════════════════════════════════════════════╝

🔧 marseille: /blog/demenagement-marseille/article → /blog/garde-meuble-marseille/article
🔧 lyon: /blog/demenageur/article → /blog/demenageur-lyon/article
...

✅ 373 corrections appliquées
```

### Validation

```bash
node scripts/analyze-404.mjs
bash scripts/validate-404-progress.sh
```

**Résultat attendu**: ~40-50 liens cassés (-97% depuis Phase 3)

---

## 📝 PHASE 5: CRÉATION CONTENU

**Objectif**: Créer les 40-50 articles vraiment manquants  
**Durée**: 3-5 jours  
**Gain**: -100% (40 → 0 liens cassés)

### Prérequis

✅ Phase 4 complétée  
✅ Fichier `missing-articles-detailed.json` disponible

### Liste des articles à créer

```bash
# Extraire la liste
jq -r '.trulyMissing[] | "\(.city) - \(.url) (référencé \(.frequency)x)"' \
  missing-articles-detailed.json | sort -t'(' -k2 -nr
```

### Priorisation

Créer les articles par ordre de fréquence:

1. **Haute priorité** (>10 références): Créer en premier
2. **Moyenne priorité** (5-10 références): Créer ensuite
3. **Basse priorité** (<5 références): Créer si temps

### Template de création

```markdown
---
title: "[Titre optimisé SEO]"
description: "[Description 150-160 caractères]"
date: 2025-10-29
category: "[catégorie]"
---

# [Titre H1]

[Introduction 2-3 paragraphes]

## Section 1

[Contenu...]

## Section 2

[Contenu...]

## Liens internes pertinents

- [Article connexe 1](/blog/categorie/article1)
- [Article connexe 2](/blog/categorie/article2)
```

### Où créer les fichiers

```bash
# Structure
sites/{ville}/content/blog/{categorie}/{slug}.md

# Exemple pour Marseille
sites/marseille/content/blog/demenagement-marseille/location-camion-demenagement-marseille.md
```

### Validation continue

Après chaque batch de 10 articles:

```bash
node scripts/analyze-404.mjs
bash scripts/validate-404-progress.sh
```

---

## ✅ PHASE 6: VALIDATION FINALE

**Objectif**: Vérifier 0 404 et optimiser  
**Durée**: 1-2 heures

### 1. Analyse finale

```bash
node scripts/analyze-404.mjs
```

**Résultat attendu**: 

```
📊 Total : 0 liens cassés sur 1,047 articles
```

### 2. Test crawl interne

```bash
# Pour chaque ville (exemple: marseille)
cd sites/marseille
npm run build
npm run start

# Tester quelques URLs manuellement
curl -I http://localhost:3000/blog/demenagement-marseille/guide-complet
curl -I http://localhost:3000/blog/garde-meuble-marseille/prix
```

### 3. Vérifier les sitemaps

```bash
# Régénérer les sitemaps
cd sites/marseille
npm run postbuild

# Vérifier
ls -lh public/sitemap*.xml
```

### 4. Google Search Console

1. Soumettre les nouveaux sitemaps
2. Demander réindexation des pages modifiées
3. Surveiller les 404s dans la console pendant 1 semaine

### 5. Monitoring continu

Ajouter à la routine hebdomadaire:

```bash
# Tous les lundis
bash scripts/validate-404-progress.sh
```

---

## 📈 SUIVI DE PROGRESSION

### Script de validation

```bash
# Exécuter à tout moment
bash scripts/validate-404-progress.sh
```

### Ce que montre le script

```
╔════════════════════════════════════════════════════════════╗
║  ÉTAT ACTUEL                                               ║
╚════════════════════════════════════════════════════════════╝

   Total liens cassés:        1,234
   Total articles:            1,047
   Taux:                      1.18 erreurs/article

╔════════════════════════════════════════════════════════════╗
║  PROGRESSION GLOBALE                                       ║
╚════════════════════════════════════════════════════════════╝

   Initial:     2,970 404s
   Actuel:      1,234 404s
   Corrigé:     1,736 404s
   Progression: 58.5%

   [█████████████████████████░░░░░░░░░░░░░] 58.5%

╔════════════════════════════════════════════════════════════╗
║  PROCHAINES ACTIONS RECOMMANDÉES                           ║
╚════════════════════════════════════════════════════════════╝

   🟡 Priorité 2: Corriger les slugs incorrects
      $ bash scripts/phase2-fix-categories.mjs
```

### Historique

Le script maintient un historique dans `404-progress-history.json`:

```json
[
  {
    "timestamp": "2025-10-29T01:00:00Z",
    "total": 2970,
    "slugs": 188,
    "missing": 1618,
    "prefixes": 1164
  },
  {
    "timestamp": "2025-10-29T14:00:00Z",
    "total": 1806,
    "slugs": 188,
    "missing": 1618,
    "prefixes": 0
  }
]
```

### Graphique de progression

```bash
# Afficher l'évolution
jq -r '.[] | "\(.timestamp)\t\(.total)"' 404-progress-history.json
```

---

## 🔧 DÉPANNAGE

### Problème: "Permission denied"

```bash
# Solution: Rendre les scripts exécutables
chmod +x scripts/*.sh scripts/*.mjs
```

### Problème: "jq: command not found"

```bash
# Solution: Installer jq
brew install jq
```

### Problème: Backup introuvable

```bash
# Solution: Vérifier les backups disponibles
ls -lh backups/

# Restaurer un backup spécifique
cp -R backups/links-20251029-120000/marseille sites/marseille/content/blog/
```

### Problème: Script Phase 4 ne génère rien

```bash
# Solution: Re-exécuter Phase 3
node scripts/analyze-missing-articles-detailed.mjs

# Vérifier que le fichier est généré
ls -lh scripts/phase4-fix-wrong-categories.sh
```

### Problème: Trop de 404s persistent après Phase 4

```bash
# Solution: Analyser les 404s restants
jq '.categorized["articles-manquants"][] | select(.frequency > 5)' 404-analysis.json

# Identifier les articles à créer en priorité
node scripts/analyze-missing-articles-detailed.mjs
jq '.trulyMissing | sort_by(-.frequency)' missing-articles-detailed.json
```

### Problème: Git conflicts

```bash
# Si conflicts après corrections
git status
git diff

# Garder les versions locales (avec corrections)
git add sites/
git commit -m "fix: Correction 404s - Phases 1-4"
```

---

## 📞 RESSOURCES

### Fichiers clés

| Fichier | Description |
|---------|-------------|
| `ANALYSE-404-EXHAUSTIVE-2025-10-29.md` | Rapport d'analyse complet |
| `404-analysis.json` | Données brutes de l'analyse |
| `missing-articles-detailed.json` | Analyse fine des articles manquants |
| `404-progress-history.json` | Historique de progression |

### Scripts

| Script | Usage | Phase |
|--------|-------|-------|
| `analyze-404.mjs` | Analyse de base | Toutes |
| `validate-404-progress.sh` | Suivi progression | Toutes |
| `phase1-fix-ville-prefixes.sh` | Correction préfixes | Phase 1 |
| `analyze-missing-articles-detailed.mjs` | Analyse fine | Phase 3 |
| `phase4-fix-wrong-categories.sh` | Corrections auto | Phase 4 |

### Commandes rapides

```bash
# Analyse complète
node scripts/analyze-404.mjs

# Validation avec progression
bash scripts/validate-404-progress.sh

# Phase 1 (préfixes)
bash scripts/phase1-fix-ville-prefixes.sh

# Phase 3 (analyse fine)
node scripts/analyze-missing-articles-detailed.mjs

# Phase 4 (corrections auto)
bash scripts/phase4-fix-wrong-categories.sh
```

---

## 🎯 CHECKLIST GLOBALE

### Préparation
- [ ] Installer `jq` (`brew install jq`)
- [ ] Exécuter analyse initiale (`node scripts/analyze-404.mjs`)
- [ ] Vérifier backup Git (`git status`)

### Phase 1 (1-2 jours)
- [ ] Exécuter `phase1-fix-ville-prefixes.sh`
- [ ] Valider backup créé
- [ ] Vérifier réduction à ~1 800 404s

### Phase 2 (2-3 heures)
- [ ] Corriger slugs incorrects
- [ ] Vérifier réduction à ~1 618 404s

### Phase 3 (4-6 heures)
- [ ] Exécuter `analyze-missing-articles-detailed.mjs`
- [ ] Examiner rapport détaillé
- [ ] Vérifier script Phase 4 généré

### Phase 4 (1-2 jours)
- [ ] Exécuter `phase4-fix-wrong-categories.sh`
- [ ] Valider backup créé
- [ ] Vérifier réduction à ~40-50 404s

### Phase 5 (3-5 jours)
- [ ] Créer articles haute priorité (>10 refs)
- [ ] Créer articles moyenne priorité (5-10 refs)
- [ ] Créer articles basse priorité (<5 refs)
- [ ] Validation continue tous les 10 articles

### Phase 6 (1-2 heures)
- [ ] Analyse finale (0 404s)
- [ ] Test crawl interne
- [ ] Vérifier sitemaps
- [ ] Soumettre à Google Search Console
- [ ] Configurer monitoring hebdomadaire

---

## 🏆 OBJECTIFS DE RÉUSSITE

### Critères de succès

✅ **0 lien cassé** détecté par `analyze-404.mjs`  
✅ **100% des fichiers** sans 404  
✅ **Maillage interne** cohérent  
✅ **Sitemaps** à jour  
✅ **Google Search Console** sans erreurs 404

### Métriques SEO attendues

| Métrique | Avant | Après | Gain |
|----------|-------|-------|------|
| Liens cassés | 2 970 | 0 | -100% |
| Crawl budget | Gaspillé | Optimisé | +++ |
| Link juice | Perdu | Conservé | +++ |
| Trafic organique | Baseline | +30-50% | +40% |

---

**Bon courage! 🚀**

**Questions?** Consultez le [rapport d'analyse complet](./ANALYSE-404-EXHAUSTIVE-2025-10-29.md)

