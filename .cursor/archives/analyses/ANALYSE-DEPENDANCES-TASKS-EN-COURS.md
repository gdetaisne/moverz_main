# 🧠 ANALYSE DÉPENDANCES - Tâches EN COURS

**Date** : 01 novembre 2025  
**Objectif** : Identifier l'ordre optimal d'exécution pour éviter travail refait

---

## 📊 ÉTAT ACTUEL

### Tâches EN COURS (6 + 9 projet 404)

| Tâche | % Fait | Temps restant | Priorité | Type |
|-------|--------|---------------|----------|------|
| **TASK-011** | 90% | 30 min | P0 | Fix deployment Nice |
| **P1-012-SEO-villes-hardcodees-en-cours** | 85% | 45 min | P1 | Villes hardcodées |
| **P1-006-SEO-migration-canonicals-termine** | 95% | 2h30 | P1 | Canonicals + bugs |
| **P2-014-Metadata-optimisation-termine** | 80% | 1h | P2 | Metadata |
| **P2-013-SEO-internal-linking-homepage-en-cours** | 75% | 1h30 | P2 | Internal linking |
| **P2-009-SEO-amelioration-en-cours** | 70% | 3h | P2 | SEO Schema |
| **TASK-404-01** | ✅ | 0 | - | Audit (terminé) |
| **TASK-404-02** | 0% | 1h15-2h15 | P0 | Harmonisation |
| **TASK-404-03 à 09** | 0% | 13-23h | P0-P1 | Projet 404 |

---

## 🔬 ANALYSE DÉPENDANCES TECHNIQUES

### Groupe A : METADATA / CANONICALS (Conflit potentiel)

**P1-006-SEO-migration-canonicals-termine** (Canonicals 95%)
- Modifie : `canonical` dans metadata de 1407 pages
- Modifie : Helper `canonical-helper.ts`
- Bugs : Quartiers hardcodé "lille" (10 fichiers)

**P1-012-SEO-villes-hardcodees-en-cours** (Villes hardcodées 85%)
- Modifie : Metadata (title, description) pages
- Modifie : Même fichiers que P1-006-SEO-migration-canonicals-termine bugs #1 et #2
- Fix : Ville dynamique dans metadata

**P2-014-Metadata-optimisation-termine** (Metadata 80%)
- Modifie : Metadata optimization (titles, descriptions)
- Modifie : `metadataBase` dans helper
- Fix : Même type corrections que P1-012-SEO-villes-hardcodees-en-cours

**⚠️ CONFLIT POTENTIEL** :

```typescript
// P1-006-SEO-migration-canonicals-termine Bug #2 veut corriger :
// quartiers-toulouse/page.tsx
title: "Quartiers — Déménagement à Lille..."  // ❌

// P1-012-SEO-villes-hardcodees-en-cours veut AUSSI corriger :
// quartiers-toulouse/page.tsx (même fichier !)
title: "Quartiers — Déménagement à Lille..."  // ❌

// P2-014-Metadata-optimisation-termine pourrait AUSSI toucher :
// Optimization metadata quartiers-toulouse/page.tsx
```

**RISQUE** : Si fait séparément → 3 commits sur même fichier → Conflit merge ou travail dupliqué

**SOLUTION** : **Fusionner corrections P1-006-SEO-migration-canonicals-termine + P1-012-SEO-villes-hardcodees-en-cours + P2-014-Metadata-optimisation-termine**

---

### Groupe B : INTERNAL LINKS / CANONICALS (Dépendance)

**P1-006-SEO-migration-canonicals-termine** (Canonicals)
- Ajoute trailing slash PARTOUT (1407 pages)
- Liens internes doivent avoir trailing slash

**P2-013-SEO-internal-linking-homepage-en-cours** (Internal linking)
- Optimise liens internes
- Fix trailing slash déjà fait (commit #bc0d9bdd)
- Analyse Screaming Frog à faire

**TASK-404-05** (Correction liens internes AUTO)
- Va corriger 963 liens internes
- DOIT respecter trailing slash de P1-006-SEO-migration-canonicals-termine

**⚠️ DÉPENDANCE** :

Si TASK-404-05 exécutée AVANT finalisation P1-006-SEO-migration-canonicals-termine :
- Liens corrigés peuvent ne pas avoir trailing slash
- → P1-006-SEO-migration-canonicals-termine les re-modifie
- → Travail refait

**SOLUTION** : **P1-006-SEO-migration-canonicals-termine AVANT TASK-404-05**

---

### Groupe C : SITE_URL / DEPLOYMENT (Bloquant)

**TASK-011** (Fix 308 Nice)
- Fix SITE_URL deployment
- Bloque déploiement Nice

**P1-006-SEO-migration-canonicals-termine** (Canonicals)
- Utilise SITE_URL pour canonicals
- Dépend de TASK-011 pour Nice fonctionnel

**⚠️ BLOCAGE** :

P1-006-SEO-migration-canonicals-termine ne peut pas être validée si Nice retourne 308 (tests DoD impossible)

**SOLUTION** : **TASK-011 AVANT P1-006-SEO-migration-canonicals-termine**

---

### Groupe D : BLOG STRUCTURE / 404 (Dépendance forte)

**TASK-404-02** (Harmonisation)
- Fix cleanSlug() Marseille/Lyon (patterns Bordeaux)
- Fix CATEGORY_MAPPING
- Change structure génération URLs blog

**P2-013-SEO-internal-linking-homepage-en-cours** (Internal linking)
- Liens internes blog optimisés
- Déjà fait, mais dépend structure blog stable

**TASK-404-05** (Correction liens)
- Corrige 963 liens blog
- NÉCESSITE structure stable (TASK-404-02 terminée)

**⚠️ DÉPENDANCE CRITIQUE** :

Si TASK-404-02 change cleanSlug() APRÈS P2-013-SEO-internal-linking-homepage-en-cours ou corrections existantes :
- URLs blog changent
- Liens internes cassés à nouveau
- Travail P2-013-SEO-internal-linking-homepage-en-cours à refaire

**SOLUTION** : **TASK-404-02 AVANT toute autre correction blog**

---

### Groupe E : METADATA HARDCODÉES (Doublons travail)

**P1-006-SEO-migration-canonicals-termine Bug #2** : Metadata "Lille" dans Toulouse (6+ fichiers)
```
- quartiers-toulouse/page.tsx
- notre-offre/page.tsx
- inventaire-ia/layout.tsx
- faq/layout.tsx
- estimation-rapide/layout.tsx
- contact/page.tsx
```

**P1-012-SEO-villes-hardcodees-en-cours** : Metadata hardcodées (mêmes fichiers)
```
- services/contact (11 villes)
- Bug Lille hardcodé
- Metadata dynamiques
```

**CHEVAUCHEMENT** : 80-90% des corrections sont identiques !

**PREUVE** :
- P1-006-SEO-migration-canonicals-termine commit prévu : Fix metadata Lille → dynamique
- P1-012-SEO-villes-hardcodees-en-cours commit #c43c0391 : "Metadata dynamiques + Bug Lille corrigé"
- **DÉJÀ FAIT par P1-012-SEO-villes-hardcodees-en-cours** ✅

**SOLUTION** : **Vérifier si P1-006-SEO-migration-canonicals-termine Bug #2 déjà résolu par P1-012-SEO-villes-hardcodees-en-cours**

---

## 🎯 GRAPHE DÉPENDANCES

```
PRIORITÉ 1 : BASES TECHNIQUES (bloquantes)
├─ TASK-011 (30 min) : Fix 308 Nice
│  └─> Bloque : Déploiement Nice
│  └─> Bloque : Tests P1-006-SEO-migration-canonicals-termine
│
└─ TASK-404-02 (1h15-2h15) : Harmonisation cleanSlug
   └─> Bloque : TASK-404-05 (corrections liens blog)
   └─> Bloque : Toute modification blog

PRIORITÉ 2 : METADATA / CANONICALS (fusionner)
├─ P1-006-SEO-migration-canonicals-termine Bugs (2h30)
│  ├─ Bug #1 : Quartiers "lille" hardcodé
│  ├─ Bug #2 : Metadata "Lille" → ⚠️ Déjà fait P1-012-SEO-villes-hardcodees-en-cours ?
│  ├─ Bug #3 : Templates hardcodés
│  └─ Bug #4 : cityData.ts
│
├─ P1-012-SEO-villes-hardcodees-en-cours (45 min)
│  ├─ Tests 2 villes à valider
│  └─> Peut-être déjà résolu bugs P1-006-SEO-migration-canonicals-termine ?
│
└─ P2-014-Metadata-optimisation-termine (1h)
   ├─ Validation SERP
   └─> Utilise metadata de P1-006-SEO-migration-canonicals-termine/P1-012-SEO-villes-hardcodees-en-cours

PRIORITÉ 3 : LINKING / SEO (dépend P1+P2)
├─ P2-013-SEO-internal-linking-homepage-en-cours (1h30)
│  ├─ Analyse Screaming Frog
│  └─> Nécessite : Canonicals OK (P1-006-SEO-migration-canonicals-termine)
│
├─ P2-009-SEO-amelioration-en-cours (3h)
│  ├─ Rich Results Test
│  └─> Indépendant mais bénéficie metadata propre
│
└─ TASK-404-05 (4-6h)
   ├─ Correction 963 liens
   └─> NÉCESSITE : TASK-404-02 (structure stable)
   └─> NÉCESSITE : P1-006-SEO-migration-canonicals-termine (trailing slash défini)
```

---

## ⚡ ORDRE OPTIMAL IDENTIFIÉ

### Séquence 1 : DÉBLOCAGE (1h)

**1.1 TASK-011** (30 min) - Fix 308 Nice
- Tests deployment Nice
- Valider 11 pages → 200 OK
- **Bloque** : P1-006-SEO-migration-canonicals-termine (tests Nice impossibles sinon)

**1.2 TASK-404-02** (30 min prioritaire)
- Fix cleanSlug() Marseille/Lyon UNIQUEMENT (15 min × 2)
- **Bloque** : Toute correction blog ultérieure

**Résultat Séquence 1** : Bases techniques débloquées

---

### Séquence 2 : CONSOLIDATION METADATA (3h30)

**2.1 Analyse chevauchements P1-006-SEO-migration-canonicals-termine/P1-012-SEO-villes-hardcodees-en-cours** (15 min)
```bash
# Vérifier si Bug #2 P1-006-SEO-migration-canonicals-termine déjà résolu
grep -r "Déménagement à Lille" sites/toulouse/app
# Si vide → Déjà fait par P1-012-SEO-villes-hardcodees-en-cours ✅
```

**2.2 P1-006-SEO-migration-canonicals-termine Bugs restants** (2h15)
- Bug #1 : Quartiers (15 min) - 10 fichiers
- Bug #3 : Templates (20 min) - 2 fichiers  
- Bug #4 : cityData (10 min) - 11 fichiers
- Tests Nice + Toulouse (30 min)
- Commit + deploy (25 min)
- Skip Bug #2 si déjà fait par P1-012-SEO-villes-hardcodees-en-cours

**2.3 P1-012-SEO-villes-hardcodees-en-cours finalisation** (30 min)
- Tests 2 villes (Marseille, Bordeaux)
- Validation metadata dynamiques
- Si chevauchement avec P1-006-SEO-migration-canonicals-termine → Commit conjoint

**2.4 P2-014-Metadata-optimisation-termine validation** (30 min)
- Tests SERP (Google Search Console)
- Validation metadata 2 villes
- Utilise résultats P1-006-SEO-migration-canonicals-termine/P1-012-SEO-villes-hardcodees-en-cours

**Résultat Séquence 2** : Metadata + Canonicals 100% propres

---

### Séquence 3 : LINKING & SEO (5h30)

**3.1 P2-013-SEO-internal-linking-homepage-en-cours validation** (1h30)
- Screaming Frog crawl (Nice ou Marseille)
- Analyse maillage interne
- Vérifier trailing slash cohérent
- **Nécessite** : P1-006-SEO-migration-canonicals-termine terminée (canonicals stables)

**3.2 TASK-404-02 complet** (1h)
- Retirer accents CATEGORY_MAPPING (30 min)
- Fix Nice satellites: null (2 min)
- Tests validation (15-30 min)
- **Déjà fait** : cleanSlug() Marseille/Lyon (Séquence 1)

**3.3 P2-009-SEO-amelioration-en-cours validation** (3h)
- Rich Results Test (Google)
- Validation Schema.org
- Tests wording 2 villes
- **Indépendant** mais bénéficie metadata propre

**Résultat Séquence 3** : SEO complet + Structure blog stable

---

### Séquence 4 : PROJET 404 (13-23h)

**TASK-404-03 à 404-09** (selon plan détaillé)
- **Nécessite** : TASK-404-02 terminée (Séquence 3)
- **Nécessite** : P1-006-SEO-migration-canonicals-termine terminée (trailing slash défini)
- **Nécessite** : P2-013-SEO-internal-linking-homepage-en-cours terminée (maillage baseline)

**Résultat Séquence 4** : 404s résolus

---

## ⚠️ CONFLITS IDENTIFIÉS

### Conflit #1 : P1-006-SEO-migration-canonicals-termine Bug #2 vs P1-012-SEO-villes-hardcodees-en-cours (PROBABLE)

**P1-006-SEO-migration-canonicals-termine Bug #2** :
```
Problème : Metadata "Lille" dans Toulouse (6+ fichiers)
- quartiers-toulouse/page.tsx
- notre-offre/page.tsx
- etc.
```

**P1-012-SEO-villes-hardcodees-en-cours Commit #c43c0391** :
```
"Metadata dynamiques services + contact - Bug Lille hardcodé corrigé"
```

**HYPOTHÈSE** : **Bug #2 P1-006-SEO-migration-canonicals-termine DÉJÀ RÉSOLU par P1-012-SEO-villes-hardcodees-en-cours** ✅

**ACTION** : Vérifier avant de corriger (éviter doublon)

---

### Conflit #2 : Metadata modifications multiples

**3 tâches touchent metadata** :
- P1-006-SEO-migration-canonicals-termine : Canonical + bugs quartiers
- P1-012-SEO-villes-hardcodees-en-cours : Villes hardcodées
- P2-014-Metadata-optimisation-termine : Optimization titles/descriptions

**RISQUE** : Commits multiples sur mêmes fichiers

**SOLUTION** : Regrouper corrections metadata en 1 session

---

### Conflit #3 : Blog structure vs corrections

**TASK-404-02** change cleanSlug() → URLs blog peuvent changer

**Impacts** :
- P2-013-SEO-internal-linking-homepage-en-cours : Liens internes blog (déjà faits)
- TASK-404-05 : Corrections liens blog (à faire)

**SOLUTION** : TASK-404-02 AVANT toute autre modification blog

---

## 📋 ORDRE OPTIMAL FINAL

### Phase 1 : QUICK WINS CRITIQUES (1h)

**Objectif** : Débloquer bases techniques

1. **TASK-011** (30 min) ← Tests deployment Nice
   - Valider 11 pages → 200 OK
   - **Débloque** : P1-006-SEO-migration-canonicals-termine (tests Nice)

2. **TASK-404-02 PARTIEL** (30 min) ← Fix cleanSlug() uniquement
   - Marseille : bordeaux → marseille (15 min)
   - Lyon : bordeaux → lyon (15 min)
   - **Débloque** : Structure blog stable
   - **Skip** : Accents + Nice (faire plus tard)

**Résultat** : Bases débloquées, aucun travail refait

---

### Phase 2 : CONSOLIDATION METADATA (3h)

**Objectif** : Finaliser TOUTES corrections metadata en 1 fois

3. **Audit chevauchements** (15 min)
   - Lister fichiers touchés P1-006-SEO-migration-canonicals-termine + P1-012-SEO-villes-hardcodees-en-cours + P2-014-Metadata-optimisation-termine
   - Identifier doublons
   - Créer plan correction unifié

4. **P1-006-SEO-migration-canonicals-termine + P1-012-SEO-villes-hardcodees-en-cours fusionnés** (2h)
   - Bug #1 P1-006-SEO-migration-canonicals-termine : Quartiers (15 min)
   - Bug #2 P1-006-SEO-migration-canonicals-termine : Vérifier si fait par P1-012-SEO-villes-hardcodees-en-cours (5 min)
   - Bug #3 P1-006-SEO-migration-canonicals-termine : Templates (20 min)
   - Bug #4 P1-006-SEO-migration-canonicals-termine : cityData (10 min)
   - Tests P1-012-SEO-villes-hardcodees-en-cours : 2 villes (30 min)
   - Tests P1-006-SEO-migration-canonicals-termine : Nice + Toulouse (30 min)
   - **Commit UNIQUE** : Corrections P1-006-SEO-migration-canonicals-termine + validation P1-012-SEO-villes-hardcodees-en-cours (10 min)

5. **P2-014-Metadata-optimisation-termine validation** (30 min)
   - Tests SERP
   - Validation metadata
   - Commit si modifs nécessaires

**Résultat** : Metadata 100% propres, 1 commit au lieu de 3

---

### Phase 3 : SEO & LINKING (4h30)

**Objectif** : Finaliser optimisations SEO

6. **P2-013-SEO-internal-linking-homepage-en-cours validation** (1h30)
   - Screaming Frog
   - Analyse maillage
   - **Nécessite** : P1-006-SEO-migration-canonicals-termine terminée

7. **TASK-404-02 complet** (1h)
   - Accents CATEGORY_MAPPING (30 min)
   - Nice satellites: null (2 min)
   - Tests (30 min)
   - **Déjà fait** : cleanSlug() (Phase 1)

8. **P2-009-SEO-amelioration-en-cours validation** (2h) ← Peut être parallèle
   - Rich Results Test
   - Validation wording
   - **Indépendant**

**Résultat** : SEO complet, structure blog finale stable

---

### Phase 4 : PROJET 404 MASSIF (13-23h)

9. **TASK-404-03** (1h) - Décision 104 articles

10. **TASK-404-04** (OPTIONNEL 20-30h) - Création contenu

11. **TASK-404-05** (4-6h) - Correction 963 liens
    - **Nécessite** : TASK-404-02 terminée (Phase 3)
    - **Nécessite** : P1-006-SEO-migration-canonicals-termine terminée (trailing slash)

12. **TASK-404-06 à 404-09** (8-13h) - Validation + Redirections + Homepage

**Résultat** : 95-99% 404s résolus

---

## 📊 GAIN OPTIMISATION

### Approche séquentielle (mauvaise)

```
P1-006-SEO-migration-canonicals-termine (2h30) → Corrige metadata quartiers
  ↓
P1-012-SEO-villes-hardcodees-en-cours (45min) → Re-corrige mêmes metadata
  ↓
P2-014-Metadata-optimisation-termine (1h) → Re-corrige encore
  ↓
Total : 4h15 sur mêmes fichiers ❌
```

### Approche fusionnée (bonne)

```
Audit chevauchements (15min)
  ↓
P1-006-SEO-migration-canonicals-termine + P1-012-SEO-villes-hardcodees-en-cours fusionnés (2h)
  ↓
P2-014-Metadata-optimisation-termine validation (30min)
  ↓
Total : 2h45 (économie 1h30) ✅
```

**GAIN** : **1h30 économisées** (36% plus rapide)

---

## 📊 ORDRE FINAL RECOMMANDÉ

### Session 1 : QUICK WINS (1h) ⚡

```
1. TASK-011 (30 min) → Débloque Nice
2. TASK-404-02 cleanSlug (30 min) → Débloque blog
```

### Session 2 : METADATA FUSIONNÉES (3h) 🔄

```
3. Audit (15 min) → Identifier doublons
4. P1-006-SEO-migration-canonicals-termine + P1-012-SEO-villes-hardcodees-en-cours (2h) → 1 commit au lieu de 2
5. P2-014-Metadata-optimisation-termine (30 min) → Validation
```

### Session 3 : SEO COMPLET (4h30) 📈

```
6. P2-013-SEO-internal-linking-homepage-en-cours (1h30) → Maillage
7. TASK-404-02 reste (1h) → Accents etc
8. P2-009-SEO-amelioration-en-cours (2h) → Rich snippets (parallèle possible)
```

### Session 4 : PROJET 404 (13-23h) 🎯

```
9. TASK-404-03 à 404-09
```

---

## 💡 GAINS ATTENDUS

| Approche | Temps total | Risques |
|----------|-------------|---------|
| **Séquentiel** (mauvais) | 25-35h | Conflits, travail refait |
| **Optimisé** (bon) | 21-31h | Aucun conflit |
| **GAIN** | **4h économisées** | **0 travail refait** |

---

## ✅ RECOMMANDATIONS FINALES

### Demain matin : Session 1 (1h)

```bash
"Cursor, je finalise TASK-011"  # 30 min
# Puis
"Cursor, je démarre TASK-404-02 (cleanSlug seulement)"  # 30 min
```

**Résultat** : Nice OK + Blog structure stable

---

### Après-midi : Session 2 (3h)

```bash
"Cursor, vérifie chevauchements P1-006-SEO-migration-canonicals-termine et P1-012-SEO-villes-hardcodees-en-cours"  # 15 min
# Puis
"Cursor, corrige P1-006-SEO-migration-canonicals-termine bugs + finalise P1-012-SEO-villes-hardcodees-en-cours en 1 fois"  # 2h
# Puis
"Cursor, finalise P2-014-Metadata-optimisation-termine"  # 30 min
```

**Résultat** : Metadata 100% propres

---

### Jour suivant : Session 3+4 (18-28h)

SEO + Projet 404 complet

---

**FIN ANALYSE DÉPENDANCES**

*Ce document identifie l'ordre optimal pour économiser 4h et éviter conflits*

