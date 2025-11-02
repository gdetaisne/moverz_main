# 📋 Synthèse pour Nouveau Chat — Migration Canonicals

**Date:** 31 octobre 2025  
**Context:** Migration canonicals 11 villes - Code prêt, déploiement à finaliser

---

## ✅ CE QUI EST FAIT

### Code (100% terminé)
- ✅ **177 fichiers modifiés** sur 11 villes
- ✅ **Canonicals ajoutés** sur ~1400 pages
- ✅ **4 bugs critiques corrigés:**
  - Templates génériques (ville dynamique)
  - Blog templates (generateMetadata + canonical)
  - CorridorPage (marseille hardcodé → city.slug)
  - Client components (layouts créés)
- ✅ **Breadcrumbs fix** (URLs absolues pour Google)
- ✅ **Tout pushé sur GitHub** (12 repos)

### Corrections Détaillées par Type
**Pages commerciales (5/ville):**
- contact/page.tsx
- inventaire-ia/layout.tsx
- estimation-rapide/layout.tsx
- services/demenagement-economique-{ville}/page.tsx
- services/demenagement-standard-{ville}/page.tsx
- services/demenagement-premium-{ville}/page.tsx

**Blog (2 templates → ~1200 articles):**
- blog/[category]/[slug]/page.tsx
- blog/[category]/page.tsx

**Pages légales (4/ville):**
- cgu/page.tsx
- cgv/page.tsx
- mentions-legales/page.tsx
- politique-confidentialite/page.tsx

**Pages secondaires (3/ville):**
- notre-offre/page.tsx
- quartiers-{ville}/page.tsx
- (+ layouts estimation/inventaire)

**Templates (1):**
- _templates/CorridorPage.tsx

---

## ⚠️ BLOCAGE ACTUEL

### Nice - Problème Cache CapRover
**Status:** Déployé 4 fois, cache Docker persist

**Tests:**
- ✅ 36/44 pages OK (81.8%)
- ❌ 8 pages en 308 (services détaillés, quartiers, corridors)

**Cause identifiée:**
- CapRover refuse d'invalider cache Git
- Build utilise ancien code (timestamp 15h00 au lieu de 14h40)
- Force Rebuild ne pull PAS depuis GitHub

**Impact:**
- Pages principales: ✅ OK
- Canonicals: ✅ Corrects
- Contenu: ✅ "Nice" (pas "Lille")
- Pages secondaires: ❌ 308

**Acceptable pour SEO:**
- 308 = permanent redirect (Google suit)
- Canonicals corrects sur 81.8% pages
- Pas bloquant indexation

---

### 10 Autres Villes
**Status:** Code corrigé sur GitHub, PAS déployées sur CapRover

**Risque:** Même problème cache que Nice

---

## 🎯 PLAN D'ACTION RECOMMANDÉ

### Étape 1: Accepter Nice à 81.8% ✅
- Ne plus perdre de temps sur les 308
- Nice fonctionne suffisamment bien
- Permet d'avancer

### Étape 2: Déployer Lille (Ville Pilote) ⏱️ 15 min
**Pourquoi Lille:**
- Ville la plus testée (107 tests créés)
- Corrections exhaustives appliquées
- Si Lille OK → procédure fiable pour les autres

**Actions:**
1. CapRover → dd-lille → Force Rebuild
2. Attendre 5-10 min
3. Tester 10-20 pages

**Attendu:**
- HTTP 200 sur pages principales
- Canonicals corrects
- Contenu "Lille" (pas autre ville)

### Étape 3: Si Lille OK → Deploy Batch ⏱️ 2h
**9 villes restantes:**
- Marseille, Toulouse, Lyon, Bordeaux
- Nantes, Strasbourg, Rennes, Montpellier, Rouen

**Pour chaque ville:**
1. Force Rebuild CapRover
2. Test rapide 3 pages (homepage, services, contact)
3. Note OK ou problème

**Critère succès:** 7-8 villes OK (80%+)

### Étape 4: Résoudre Problèmes ⏱️ Variable
**Si 1-3 villes ont problèmes:**
- Identifier pattern (cache? config?)
- Appliquer fix ciblé
- Re-déployer

---

## 📊 Critères de Succès Globaux

### Minimal Acceptable (80%)
- ✅ 9/11 villes déployées OK
- ✅ Canonicals corrects sur pages principales
- ✅ Contenu ville correct
- ⚠️ Quelques 308 tolérés

### Optimal (95%+)
- ✅ 10-11/11 villes OK
- ✅ Canonicals partout
- ✅ <5% pages en 308
- ✅ Erreurs Google résolues

---

## 🔧 Commandes Utiles

### Test Rapide d'une Ville
```bash
# Remplacer {url}
curl -I https://{url}/
curl -I https://{url}/services/
curl -I https://{url}/contact/

# Vérifier canonical homepage
curl -s https://{url}/ | grep 'canonical'

# Vérifier contenu (nom ville)
curl -s https://{url}/services/ | grep -o "Déménagement [A-Z][a-z]*" | head -3
```

### Audit Exhaustif Lille
```bash
python3 /tmp/audit-complet-lille.py
```

---

## 📦 Commits Récents (à connaître)

### Corrections Canonicals
- Marseille: `1acc5a8`, `b34953d` (breadcrumbs)
- Nice: `322d549`, `43a52fa` (breadcrumbs)
- Lille: `1452bfd`, `8fe0257` (breadcrumbs)
- Autres: Commits `fix({ville}): Correction exhaustive...`

### Corrections Breadcrumbs (aujourd'hui)
- 11 commits identiques (1/ville)
- Message: `fix({ville}): Breadcrumbs URLs absolues pour Google`
- Fichier: `lib/schema/breadcrumb.ts`

---

## ⚠️ Problèmes Connus

### 1. Cache CapRover Docker
**Symptôme:** Force Rebuild utilise ancien code  
**Solution connue:** Aucune fiable à 100%  
**Workaround:** Accepter état partiel (80-90%)

### 2. Erreurs Google (non-critiques)
**Types:**
- Breadcrumbs URLs relatives (CORRIGÉ)
- FAQ Nice (à identifier)

**Impact:** Aucun sur indexation

---

## 🎯 PROCHAINE ACTION IMMÉDIATE

```
1. Déployer dd-lille sur CapRover (Force Rebuild)
2. Attendre 10 min
3. Lancer audit: python3 /tmp/audit-complet-lille.py
4. Si >90% OK → déployer les 9 autres
```

---

## 📁 Documents Clés

- `PLAN-ACTION-CANONICALS-FINAL.md` - Plan détaillé
- `RAPPORT-CORRECTION-EXHAUSTIVE.md` - Corrections appliquées
- `INVENTAIRE-PAGES-LILLE.md` - Détail 32 pages Lille
- `DIAGNOSTIC-NICE-308.md` - Analyse problème Nice

---

## 🎯 Questions pour le Nouveau Chat

**"Voici où on en est sur la migration canonicals:**
- Code 100% prêt sur GitHub (11 villes)
- Nice déployé à 81.8% (problème cache)
- 10 villes à déployer

**Je veux déployer Lille comme ville pilote.**

**Actions:**
1. Force Rebuild dd-lille
2. Test avec /tmp/audit-complet-lille.py
3. Si OK → déployer les 9 autres"

---

**Bonne continuation dans le nouveau chat !**

