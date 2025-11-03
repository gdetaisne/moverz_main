# 🎯 PRIORISATION OPTIMALE - Deep Dive Dépendances

**Date** : 01 novembre 2025  
**Objectif** : Ordre optimal pour éviter travail refait et conflits

---

## 🔬 ANALYSE TECHNIQUE APPROFONDIE

### Fichiers impactés par plusieurs tâches

**Toulouse `quartiers-toulouse/page.tsx`** :
```typescript
// ÉTAT ACTUEL (vérifié 01/11/2025)
title: "Quartiers & communes — Déménagement à Lille | IA & transparence",  // ❌
description: "...à Lille : Vieux Lille, Centre, Wazemmes... Mérignac, Pessac..."  // ❌ Lille + Bordeaux!
canonical: getCanonicalUrl('quartiers-lille'),  // ❌
name: `Devis de déménagement – ${q.title} (Lille)`,  // ❌
```

**3 TÂCHES veulent corriger ce fichier** :
- **TASK-006 Bug #2** : Metadata "Lille" → dynamique
- **TASK-006 Bug #1** : Canonical 'quartiers-lille' → dynamique
- **TASK-012** : Villes hardcodées → ⚠️ PAS encore corrigé ce fichier

**CONFLIT** : Si fait séparément → 3 commits, travail dupliqué

---

## 📊 MATRICE DÉPENDANCES TECHNIQUES

| Task | Modifie | Nécessite | Bloque |
|------|---------|-----------|--------|
| **TASK-011** | SITE_URL deployment | - | TASK-006 (tests Nice) |
| **TASK-404-02** | cleanSlug(), CATEGORY_MAPPING | - | TASK-404-05, blog mods |
| **TASK-006** | Canonicals, metadata pages | TASK-011 (Nice OK) | TASK-404-05 (trailing slash) |
| **TASK-012** | Metadata pages | - | TASK-014 (metadata propre) |
| **TASK-014** | Metadata optimization | TASK-012 (base propre) | - |
| **TASK-013** | Liens internes | TASK-006 (trailing slash) | - |
| **TASK-009** | Schema.org, wording | - (indépendant) | - |
| **TASK-404-05** | Liens internes blog | TASK-404-02, TASK-006 | TASK-404-06/07/08 |

---

## 🔴 CONFLITS DÉTECTÉS

### Conflit #1 : TASK-006 vs TASK-012 (CHEVAUCHEMENT RÉEL)

**Vérification terrain** (01/11/2025) :
```bash
# Toulouse quartiers-toulouse/page.tsx ACTUEL :
title: "Déménagement à Lille"  ❌
canonical: getCanonicalUrl('quartiers-lille')  ❌
```

**Conclusion** : **TASK-012 N'A PAS corrigé ce fichier** (seulement services/contact)

**Fichiers chevauchement** :
- `quartiers-toulouse/page.tsx` (TASK-006 Bug #1+#2 + TASK-012)
- `notre-offre/page.tsx` (TASK-006 Bug #2 potentiel)
- `inventaire-ia/layout.tsx` (TASK-006 Bug #2 potentiel)
- Autres layouts/pages (6+ fichiers Toulouse)

**IMPACT** : 10+ fichiers modifiés par 2 tâches différentes

**SOLUTION** :
```
Option A : TASK-006 + TASK-012 en 1 commit fusionné
Option B : TASK-012 d'abord (finaliser), puis TASK-006 complète
Option C : TASK-006 complète d'abord, skip TASK-012 (déjà fait conceptuellement)
```

**RECOMMANDATION** : **Option A** (fusionner, 1 commit)

---

### Conflit #2 : cleanSlug() vs Corrections blog

**TASK-404-02** : Change fonction `cleanSlug()` Marseille/Lyon
```typescript
// AVANT (actuel - BUGUÉ)
{ from: /^demenagement-etudiant-bordeaux-/, to: '' }

// APRÈS (TASK-404-02)
{ from: /^demenagement-etudiant-marseille-/, to: '' }
```

**IMPACT sur URLs** : Slugs Marseille/Lyon peuvent changer !

**Exemple** :
```
Avant : /blog/category/demenagement-etudiant-marseille-guide
Après : /blog/category/guide  (préfixe retiré correctement)
```

**TÂCHES IMPACTÉES** :
- **TASK-013** : Liens internes déjà optimisés → Peuvent casser si URLs changent
- **TASK-404-05** : Va corriger liens blog → DOIT utiliser nouvelles URLs

**SOLUTION** : 
1. TASK-404-02 EN PREMIER
2. Vérifier si URLs changent (comparer avant/après)
3. Si changent → Créer redirections 301 temporaires
4. Puis TASK-013 validation + TASK-404-05

**ORDRE CRITIQUE** : **TASK-404-02 → TASK-013 → TASK-404-05**

---

### Conflit #3 : Trailing slash partout

**TASK-006** : Ajoute trailing slash sur 1407 pages
```typescript
canonical: getCanonicalUrl('quartiers-nice')
// → https://devis-demenageur-nice.fr/quartiers-nice/
```

**TASK-404-05** : Corrige 963 liens internes
```markdown
[Lien](/blog/category/article)  ← Sans trailing slash ?
```

**QUESTION** : Les liens corrigés doivent-ils avoir trailing slash ?

**ANALYSE code** :
- Next.js redirige automatiquement (308) si pas de slash
- Mais SEO optimal = liens directs avec slash (évite redirect)

**SOLUTION** : TASK-404-05 doit ajouter trailing slash dans corrections

**ORDRE CRITIQUE** : **TASK-006 AVANT TASK-404-05** (définir standard)

---

## 📋 ORDRE OPTIMAL - VERSION 2 (DEEP DIVE)

### PHASE 1 : DÉBLOCAGE CRITIQUE (1h) ⚡

**P1.1 - TASK-011 : Tests Nice** (30 min)
```bash
curl -I https://devis-demenageur-nice.fr/services/demenagement-standard-nice/
# × 11 pages
# Attendu : 200 OK
```

**Pourquoi en #1** :
- Bloque tests TASK-006 (Nice doit être accessible)
- Quick win (juste tests, code déjà fait)
- P0 (critique)

**Débloque** : TASK-006

---

**P1.2 - TASK-404-02 (cleanSlug seulement)** (30 min)
```typescript
// Fix 2 fichiers
sites/marseille/lib/blog.ts : bordeaux → marseille
sites/lyon/lib/blog.ts : bordeaux → lyon

// Tester
cd sites/marseille && pnpm build
cd sites/lyon && pnpm build
# Vérifier aucune URL cassée
```

**Pourquoi en #2** :
- Bloque TOUTES modifications blog ultérieures
- Bug critique (URLs mal générées)
- Si fait APRÈS corrections → corrections cassées

**Débloque** : Blog structure stable

**SKIP pour l'instant** : Accents, Nice (pas bloquant immédiat)

---

### PHASE 2 : METADATA FUSIONNÉE (2h30) 🔄

**P2.1 - Audit chevauchements** (15 min)
```bash
# Lister fichiers touchés TASK-006
grep -l "quartiers-lille\|Déménagement à Lille" sites/*/app/**/*.tsx

# Lister fichiers touchés TASK-012  
# (déjà faits : services/contact)
# (manquants : quartiers, layouts)

# Identifier doublons
# Créer checklist unifiée
```

---

**P2.2 - TASK-006 + TASK-012 FUSIONNÉS** (2h)

**Stratégie** : 1 session, corrections groupées, 1 commit final

**Corrections par type** :

**Type A : Quartiers canonical** (15 min)
```typescript
// 9 fichiers (tous sauf Lille + Montpellier)
sites/*/app/quartiers-*/page.tsx

// AVANT
canonical: getCanonicalUrl('quartiers-lille'),

// APRÈS
const city = getCityDataFromUrl(env.SITE_URL);
canonical: getCanonicalUrl(`quartiers-${city.slug}`),
```

**Type B : Metadata hardcodées** (45 min)
```typescript
// Toulouse + autres villes (6-10 fichiers/ville minimum)

// quartiers-toulouse/page.tsx
title: "Quartiers — Déménagement à Lille..."  ❌
→ title: `Quartiers — Déménagement à ${city.nameCapitalized}...`  ✅

description: "...à Lille : Vieux Lille..."  ❌
→ description: `...à ${city.nameCapitalized} : ${QUARTIERS_VILLE}...`  ✅

name: `...– ${q.title} (Lille)`  ❌
→ name: `...– ${q.title} (${city.nameCapitalized})`  ✅

// notre-offre, inventaire-ia, faq, estimation, contact (même pattern)
```

**Type C : Templates dynamiques** (20 min)
```typescript
// app/_templates/CorridorPage.tsx
"name": `Déménagement Marseille → ${dest}...`  ❌
→ "name": `Déménagement ${city.nameCapitalized} → ${dest}...`  ✅

// app/_templates/LocalPage.tsx (2 occurrences)
title: `Déménagement ${zone} Nice - Tarifs...`  ❌
→ title: `Déménagement ${zone} ${city.nameCapitalized} - Tarifs...`  ✅

<div className="text-white/80 text-sm">toulouse</div>  ❌
→ <div className="text-white/80 text-sm">{city.nameCapitalized}</div>  ✅
```

**Type D : cityData.ts uniformisation** (10 min)
```typescript
// 11 fichiers sites/*/lib/cityData.ts
// Retirer trailing slash inconsistant

toulouse: { siteUrl: 'https://...fr/' }  ❌
→ toulouse: { siteUrl: 'https://...fr' }  ✅
```

**Tests** (30 min)
```bash
# Nice
curl -s https://devis-demenageur-nice.fr/quartiers-nice/ | grep canonical
# Attendu : href=".../quartiers-nice/" (pas quartiers-lille)

# Toulouse
curl -s https://devis-demenageur-toulousain.fr/quartiers-toulouse/ | grep -o "title>.*</title"
# Attendu : Toulouse (pas Lille)

# Build toutes villes modifiées
for city in toulouse bordeaux lyon marseille nice nantes rennes rouen strasbourg; do
  cd sites/$city && pnpm build && cd ../..
done
```

**Commit unique** (10 min)
```
fix(all): TASK-006 + TASK-012 - Corrections metadata complètes

Bugs corrigés :
- Quartiers canonical hardcodé "lille" (9 villes)
- Metadata "Lille" hardcodée (Toulouse + autres)
- Metadata quartiers Bordeaux (Toulouse description)
- Templates Marseille/Nice hardcodés
- cityData.ts trailing slash inconsistant

Fichiers modifiés :
- quartiers-*/page.tsx (9 villes)
- Layouts (6+ fichiers/ville)
- Templates (2 fichiers)
- cityData.ts (11 villes)

Total : ~70 fichiers

TASK-006 : ✅ Bugs #1, #2, #3, #4 corrigés
TASK-012 : ✅ Tests validés
```

---

**P2.3 - TASK-012 tests finaux** (15 min)

**Inclus dans P2.2** (tests déjà faits)

Juste valider :
- [x] Marseille : Zéro hardcodé
- [x] Bordeaux : Zéro hardcodé
- [x] Metadata dynamiques fonctionnent

**Finaliser TASK-012** : ✅

---

### PHASE 3 : METADATA OPTIMIZATION (30 min) 📊

**P3.1 - TASK-014 validation** (30 min)

**Nécessite** : TASK-006 + TASK-012 terminées (metadata propre)

**Actions** :
```bash
# Google Search Console
# → Coverage → Vérifier metadata
# → SERP Preview Tool : Tester titles 54 chars

# Tester 2 villes
curl -s https://devis-demenageur-nice.fr/ | grep -o "<title>.*</title>"
# Attendu : Title 54 chars max

curl -s https://devis-demenageur-marseille.fr/services/demenagement-standard-marseille/ | grep -o "<title>.*</title>"
```

**Si modifications nécessaires** : Commit séparé  
**Sinon** : Juste validation → Finaliser TASK-014 ✅

**Pourquoi en #3** :
- Nécessite metadata de base propres (TASK-006/012)
- Indépendant après ça
- Validation rapide

---

### PHASE 4 : SEO & LINKING (3h30) 📈

**P4.1 - TASK-013 validation** (1h30)

**Nécessite** : TASK-006 terminée (canonicals avec trailing slash définis)

**Actions** :
```bash
# Screaming Frog
# Crawl : https://devis-demenageur-nice.fr (ou Marseille)
# Profondeur : 3 niveaux

# Analyser :
# - Distribution PageRank interne
# - Liens vers homepage (optimisation OK ?)
# - Trailing slash cohérent (TASK-006)
# - Aucun lien cassé (vérif baseline avant TASK-404-05)

# Export rapport
screaming-frog-nice-internal-linking.csv
```

**Pourquoi en #4.1** :
- Nécessite canonicals/trailing slash stables (TASK-006)
- Établit baseline maillage AVANT corrections massives TASK-404-05
- Indépendant du blog (pas de conflit)

---

**P4.2 - TASK-404-02 COMPLET** (1h)

**Déjà fait** : cleanSlug() Marseille/Lyon (Phase 1)

**Reste** :
- Retirer accents CATEGORY_MAPPING (30 min)
  ```typescript
  // 11 fichiers sites/*/lib/blog.ts
  'déménagement-etudiant': 'etudiant',  ❌
  → Supprimer (garder seulement sans accent)
  ```
  
- Fix Nice satellites: null (2 min)
  ```typescript
  'satellites': null,  ❌
  → 'satellites': 'conseils',  ✅
  ```

- Tests validation (30 min)
  ```bash
  # Build 11 villes
  # Vérifier aucune URL blog cassée
  node scripts/analyze-404.mjs
  # Comparer avant/après (URLs ne doivent PAS changer)
  ```

**Pourquoi en #4.2** :
- cleanSlug() déjà fait (Phase 1), juste finir
- Nécessite TASK-006 terminée (trailing slash défini)
- **BLOQUE TASK-404-05** (structure finale blog)

**Finaliser TASK-404-02** : ✅

---

**P4.3 - TASK-009 validation** (1h) ← **Peut être PARALLÈLE**

**Nécessite** : Rien (indépendant)

**Actions** :
```bash
# Google Rich Results Test
https://search.google.com/test/rich-results

# Tester 2 villes :
https://devis-demenageur-nice.fr/
https://devis-demenageur-marseille.fr/

# Vérifier :
# - HowTo schema détecté ✅
# - Organization schema détecté ✅
# - Logo affiché ✅

# Tests wording (2 villes)
# → Vérifier intent transactionnel quartiers
# → Vérifier wording optimisé pages money
```

**Pourquoi parallèle** :
- Indépendant des autres tâches
- Peut être fait par Lucie pendant que Guillaume fait P4.1-P4.2
- Pas de conflit fichiers

**Finaliser TASK-009** : ✅

---

### PHASE 5 : PROJET 404 (13-23h) 🎯

**Nécessite** : TASK-404-02 terminée (Phase 4.2)

**P5.1 - TASK-404-03** : Décision 104 articles (1h)

**P5.2 - TASK-404-04** : Création (OPTIONNEL 20-30h)

**P5.3 - TASK-404-05** : Correction 963 liens (4-6h)
- **Nécessite** : TASK-404-02 (structure blog finale)
- **Nécessite** : TASK-006 (trailing slash défini)
- **Nécessite** : TASK-013 (baseline maillage)

**P5.4 - TASK-404-06 à 09** : Suite projet 404

---

## ⚡ ORDRE FINAL OPTIMISÉ

### SESSION 1 : DÉBLOCAGE (1h) - DEMAIN MATIN

```
08h00-08h30 : TASK-011 (tests Nice)
08h30-09h00 : TASK-404-02 (cleanSlug Marseille/Lyon)
```

**Résultat** : Nice OK, Blog structure stable

---

### SESSION 2 : METADATA UNIFIÉE (2h30) - DEMAIN APRÈS-MIDI

```
14h00-14h15 : Audit chevauchements TASK-006/012
14h15-16h15 : TASK-006 + TASK-012 fusionnés (1 commit)
16h15-16h45 : TASK-014 validation
```

**Résultat** : Metadata 100% propres, canonicals OK

---

### SESSION 3 : SEO FINAL (3h30) - JOUR SUIVANT

```
09h00-10h30 : TASK-013 (Screaming Frog)
10h30-11h30 : TASK-404-02 complet (accents, Nice)
11h30-12h30 : TASK-009 validation (Rich Results)
```

**Résultat** : SEO complet, structure blog finale

---

### SESSION 4+ : PROJET 404 (13-23h) - JOURS SUIVANTS

```
TASK-404-03 à 404-09 selon plan détaillé
```

**Nécessite** : Sessions 1-3 terminées

---

## 💰 GAINS OPTIMISATION

### Approche séquentielle naïve

| Jour | Tâches | Temps | Problèmes |
|------|--------|-------|-----------|
| 1 | TASK-006 (2h30) | 2h30 | Corrige metadata |
| 2 | TASK-012 (45min) | +45min | **Re-corrige mêmes metadata** |
| 3 | TASK-014 (1h) | +1h | Teste metadata déjà testées |
| 4 | TASK-404-02 (2h) | +2h | **Change blog → casse liens TASK-013** |
| 5 | TASK-013 refaire (1h30) | +1h30 | **Travail refait** |
| 6 | TASK-404-05 (5h) | +5h | - |
| **TOTAL** | - | **13h15** | **2h travail refait** ❌ |

### Approche optimisée (ce plan)

| Session | Tâches | Temps | Économie |
|---------|--------|-------|----------|
| 1 | TASK-011 + 404-02 partiel | 1h | - |
| 2 | TASK-006+012 fusionnés + 014 | 2h30 | **-1h15** |
| 3 | TASK-013 + 404-02 final + 009 | 3h30 | **-45min** |
| 4+ | TASK-404-05 à 09 | 13-23h | - |
| **TOTAL** | - | **20-30h** | **-2h** ✅ |

**GAIN** : **2h économisées + 0 travail refait**

---

## 🎯 PRIORISATION PAR CRITICITÉ

### P0 - BLOQUANT (faire EN PREMIER)

1. **TASK-011** (30 min) : Tests Nice → Débloque TASK-006
2. **TASK-404-02 cleanSlug** (30 min) : Structure blog → Débloque blog

**Total P0** : 1h

---

### P1 - CRITIQUE (faire AVANT corrections blog/404)

3. **TASK-006 + TASK-012 fusionnés** (2h) : Metadata/canonicals finales
4. **TASK-014** (30 min) : Validation metadata

**Total P1** : 2h30

---

### P2 - IMPORTANT (finaliser avant 404 massif)

5. **TASK-013** (1h30) : Baseline maillage
6. **TASK-404-02 final** (1h) : Accents, Nice
7. **TASK-009** (1h) : Rich Results (parallèle possible)

**Total P2** : 3h30

---

### P3 - PROJET 404 (séquence définie)

8. **TASK-404-03 à 09** (13-23h)

**Total P3** : 13-23h

---

## 📊 RÉCAPITULATIF

### Timeline optimale

```
JOUR 1 (4h)
├─ Matin : Phase 1 (1h)
└─ Après-midi : Phase 2 (2h30) + Phase 3 partiel (30min)

JOUR 2 (3h)
└─ Phase 3 suite (3h)

JOUR 3-5 (13-23h)
└─ Phase 5 (Projet 404)

TOTAL : 20-30h sur 3-5 jours
```

### Gains vs approche naïve

✅ **-2h travail total**  
✅ **0 conflit fichiers**  
✅ **0 travail refait**  
✅ **1 commit au lieu de 3** (metadata)  
✅ **Structure stable avant corrections massives**

---

## ✅ ACTIONS IMMÉDIATES DEMAIN

### Commande unique

```bash
"Cursor, exécute Phase 1 : TASK-011 puis TASK-404-02 cleanSlug"
```

**OU séparé** :
```bash
"Cursor, finalise TASK-011"  # 30 min
# Puis
"Cursor, je démarre TASK-404-02 (seulement cleanSlug Marseille/Lyon)"  # 30 min
```

**Résultat après 1h** : Bases débloquées ✅

---

**FIN DEEP DIVE - Plan optimal validé**

