# TODO ACTIFS - Guillaume

> **Instructions Cursor** : Ce fichier contient mes tâches EN COURS.
> Quand je te demande d'évaluer :
> - Vérifie que je ne suis pas sur trop de tâches en parallèle (max 3 recommandé)
> - Identifie les tâches incomplètes/abandonnées
> - Suggère quoi terminer en priorité
> - Estime le temps restant pour chaque tâche

---

## ⚠️ INCOMPLET (TOUJOURS PRIORITAIRES)

### [P1]-P1-012-SEO-villes-hardcodees-50% : Correction Global Villes Hardcodées ⚠️

**Statut** : ⚠️ INCOMPLET (40-50% fait)

**Démarrée** : 30-31/10/2025  
**Mise en pause** : 04/11/2025 13:15 GMT

**Progression** :
- ✅ Session 1 (30-31/10) : Metadata services, emails, footer (11 villes, 5 commits)
- ✅ Session 2 (04/11) : Pattern 1 "à Lille" (16 fichiers, 4 villes)
- ⏳ Restant : Pattern 1 (24 fichiers, 6 villes) + Pattern 2 (27 fichiers, 9 villes)

**Commits** : `da4c1da`, `6c00451` (+ 5 commits session 1)

**Temps investi** : ~4h30  
**Temps restant** : ~2h (Pattern 1 40min + Pattern 2 50min + tests 30min)

**Pourquoi en pause** :
- Tests Lille en attente déploiement CapRover
- Découverte bug global FAQ (P1-038-SEO-bug-faq-global-100% créée)
- Momentum pattern validé, prêt à reprendre

**Prochaine session** :
1. Tester Lille production (Pattern 1 + FAQ)
2. Corriger Bordeaux, Nantes, Rennes, Rouen, Strasbourg, Montpellier (Pattern 1)
3. Corriger Pattern 2 "à Marseille" (9 villes, 27 fichiers)
4. Tests finaux + déploiement

**Doc** : `.cursor/tasks/P1-012-SEO-villes-hardcodees-50%/`

---

## 🔥 EN COURS MAINTENANT

### [P0]-P0-046-SERP-favicon-logo-100% : Logo SERP / Favicons — CTR

**Statut** : 🔄 EN COURS (analyse initiale)  
**Temps estimé** : 1.5-3h  
**Doc** : `.cursor/tasks/P0-046-SERP-favicon-logo-100%/`

**Pourquoi** : Résultats Google sans logo → CTR en baisse sur 11 sites (mobile). Impact business direct → P0 exceptionnel (prioritaire malgré INCOMPLET).

**Prochaines étapes** :
1. Vérifier `GET /favicon.ico` (11 domaines)  
2. Ajouter `<link rel="icon" sizes="48x48">` si manquant (11 villes)  
3. Passer `Organization.logo` sur logo carré (512×512)  
4. Tests mobiles + captures (2 sites)

---

## ✅ Corrections Rapides (< 30 min) - Session 04/11

### 15:00 - Redirections Rouen + Vérif Breadcrumbs (15 min)

**Contexte** : Reporting Moverz Analytics détecté 4 URLs garde-meuble mal classées

**Actions** :
- ✅ Créé 4 redirections 301 dans `sites/rouen/next.config.mjs`
- ✅ `/blog/garde-meuble` → `/blog` (catégorie vide)
- ✅ 3 articles `/blog/garde-meuble/*` → `/blog/satellites/*`
- 🔍 Vérifié breadcrumbs Rouen : OK dans code, déploiement CapRover en cours

**Commits** :
- Rouen : `07e892e` (pushé)
- Monorepo : `c95c813` (pushé)

**Doc** : `.cursor/archives/rapports/SESSION-04-11-2025-redirections-rouen.md`

---

## 🆕 Nouvelles tâches (split de P2-014-Metadata-optimisation-100%)

- [P1]-P1-039-SEO-titles-normalisation-100% : Normalisation Titles 50–60 chars (11 villes) — PENDING  
  Doc: `.cursor/tasks/P1-039-SEO-titles-normalisation-100%/`
- [P1]-P1-040-SEO-descriptions-tier2-0% : Descriptions 150–160 chars — Tier 2 (11 villes) — PENDING  
  Doc: `.cursor/tasks/P1-040-SEO-descriptions-tier2-0%/`
- [P1]-TASK-041 : Price signals (UI + JSON‑LD Service) — PENDING  
  Doc: `.cursor/tasks/P1-041-SEO-price-signals-0%/`
- [P2]-TASK-043 : FAQ rationalisation (snippet efficace) — PENDING  
  Doc: `.cursor/tasks/P2-043-SEO-faq-rationalisation-100%/`
- [P2]-P2-044-SEO-howto-video-poc-100% : HowTo/Video — POC 2 villes — PENDING  
  Doc: `.cursor/tasks/P2-044-SEO-howto-video-poc-100%/`
- [P1]-TASK-045 : QA & Monitoring CTR (outillage + baselines) — PENDING  
  Doc: `.cursor/tasks/P1-045-Analytics-qa-ctr-100%/`

**Toutes les sessions 404 sont ARCHIVÉES dans DONE.md** ✅

**Session 3** : TASK-404-BLOG FINAL (4 villes) ✅ ARCHIVÉ (04/11/2025, 4h)  
**Session 2** : TASK-404-BLOG (5 villes) ✅ ARCHIVÉ (04/11/2025, 4h50)  
**Session 1** : TASK-404-ALL-CITIES (11 villes) ✅ ARCHIVÉ (03-04/11/2025, 12h)

### ✅ FAIT AUJOURD'HUI (04/11/2025) - SESSION 3

**TASK-404-BLOG FINAL (CORRECTIONS MANUELLES)** :
- Bordeaux : 184 liens ✅ 100% (2h15) - 12 commits, 2 rounds
- Toulouse : 170 liens ✅ 100% (1h05) - 6 commits, 66 catégories accentuées
- Strasbourg : 40 liens ✅ 100% (20min) - 4 commits, 2 rounds
- Lille : 43 liens ✅ 100% (20min) - 6 commits, 3 rounds (cas particuliers)
**TOTAL SESSION 3 : 437 liens corrigés - 4 villes - 28 commits - 4h**

**Documentation créée** :
- 4 dossiers tasks complets (README, progress, commits, RESUME-FINAL)
- ERREURS-APPRISES-BORDEAUX.md (leçons critiques)
- SESSION-04NOV-4VILLES.md (récapitulatif session)
- BILAN-SESSION-04NOV.md (analyse globale)

**Leçons critiques** :
- Vérification production AVANT correction (Bordeaux Round 1 = 117 nouveaux 404s)
- Corrections globales vs partielles (Lille 3 rounds au lieu d'1)
- Scanner exhaustif (Toulouse 66 catégories accentuées)

### ✅ FAIT AUJOURD'HUI (04/11/2025) - SESSION 2

**TASK-404-BLOG (NETTOYAGE APPROFONDI)** :
- Bordeaux : 117 liens ✅ 100% (40min)
- Montpellier : 204 liens ✅ 100% (1h45) 🥇 COMPLEXE
- Rennes : 147 liens ✅ 100% (45min)
- Rouen : 219 liens ✅ 100% (1h) 
- Nice : 10 liens ✅ 100% (20min)
**TOTAL SESSION 2 : 697 liens corrigés - 5 villes - 4h50**

### ✅ FAIT PRÉCÉDEMMENT (03-04/11/2025) - SESSION 1

**TASK-404-ALL-CITIES (MAJEUR)** :
- Nice : 280 liens (3 commits) ✅ 97%
- Lille : 140 liens (2 commits) ✅ 100%
- Lyon : 95 liens (3 commits) ✅ 100%
- Marseille : 162 liens (2 commits) ✅ 100%
- Nantes : 528 liens (6 commits) ✅ 100% 🥇
- Rennes : 322 liens (2 commits) ✅ 100% 🥈
- Strasbourg : 114 liens (2 commits) ✅ 100%
- Rouen : 4 liens (2 commits) ✅ 100%
- Toulouse : 68 liens (2 commits) ✅ 100%
- Montpellier : 0 (OK) ✅
- Bordeaux : 0 (OK) ✅
**TOTAL SESSION 1 : 1,713 liens corrigés - 29 commits - 33 scripts créés**

**Autres tâches** :
- TASK-025 (Sitemaps 11 villes) — commits documentés
- P1-012-SEO-villes-hardcodees-50% (villes hardcodées) — 7 villes
- P2-013-SEO-internal-linking-homepage-75% (maillage interne) — optimisations


---

## 🚨 URGENT - CRITIQUE SEO (À FAIRE MAINTENANT)

### ✅ [P0]-TASK-404-ALL-CITIES : FINALISÉ COMPLET (11 villes)

**Statut** : ✅ CLÔTURÉ  
**Session 1** : 12h (03-04 nov 2025) — 1,713 liens  
**Session 2** : 4h50 (04 nov 2025) — 697 liens (nettoyage approfondi)  
**TOTAL** : 16h50 — 2,410 liens corrigés (99.7% succès)

**Villes traitées** :
- 🥇 Nantes : 528 liens (4 commits, 3h)
- 🥈 Rennes : 322 liens (2 commits, 30min)
- 🥉 Nice : 280 liens (3 commits, 3h) - 97%
- Marseille : 162 liens (2 commits, 45min)
- Lille : 140 liens (2 commits, 2h30)
- Strasbourg : 114 liens (2 commits, 30min)
- Lyon : 95 liens (3 commits, 1h30)
- Toulouse : 68 liens (2 commits, 1h30)
- Rouen : 4 liens (2 commits, 10min)
- Montpellier : 0 (OK)
- Bordeaux : 0 (OK)

**Méthode** : Analyse → Mapping → Correction automatique → Tests

**Scripts créés** : 33 réutilisables + 11 mappings JSON

**404s restants** : 31 catégories vides (1.8%, documentés avec solutions)

**Documentation** : `.cursor/tasks/[P0]-TASK-404-ALL-CITIES/RAPPORT-FINAL-SESSION.md`

---

## ⚡ À FAIRE APRÈS (5 MIN)

### [P0]-P2-023-Scripts-setup-automation-100% : Setup Scripts Automation

**Priorité** : P0 (Active tout le système créé aujourd'hui)  
**Temps** : 5 minutes  
**Type** : Setup one-time

**Actions** :
1. ✅ Copie/colle 3 blocs commandes depuis `COMMANDES-A-FAIRE.md`
2. ✅ Test `moverz` fonctionne
3. ✅ Commit + push
4. ✅ Test nouveau chat Cursor

**Fichier** : `/COMMANDES-A-FAIRE.md` (tout est prêt à copier/coller)

**Impact** :
- Active validation pre-commit
- Active dashboard "moverz"
- Versionne tout sur GitHub
- Cursor auto-éduqué au prochain chat

---

## ✅ FAIT AUJOURD'HUI (04/11/2025) - FINALISATION

### ✅ P1-032-SEO-search-console-0% : Search Console Configuration (11 villes) - FINALISÉ

**Date** : 04/11/2025  
**Temps** : 0h (obsolète, remplacé par Moverz Analytics)

**Résultat** :
- Tâche obsolète : déjà fait via application Moverz Analytics (prod)
- 11/11 propriétés GSC configurées
- 11/11 sitemaps soumis
- Dashboard multi-sites temps réel
- Monitoring automatisé 100%
- Solution 10x supérieure aux attentes initiales

---

### ✅ P1-028-SEO-sitemaps-consistency-100% : Sitemaps Consistency (11 villes) - FINALISÉ

**Date** : 04/11/2025  
**Temps** : 0h (déjà complète lors de TASK-025)

**Résultat** :
- Audit complet 11 sites : 100% conformité
- 11/11 sitemaps accessibles (1,252 URLs)
- 11/11 robots.txt configurés
- 11/11 trailing slash cohérent
- 0 action corrective nécessaire

---

## 🔥 EN COURS MAINTENANT

*Aucune tâche en cours*

---

## ✅ FAIT AUJOURD'HUI (04/11/2025) - SESSION BREADCRUMBS

### ✅ TASK-031 : Breadcrumbs + Schema (11 villes) - FINALISÉ 🎉

**Date** : 04/11/2025 14:00-15:30  
**Temps** : 1h30 (vs 6-8h estimées - 77% économie)

**Résultat** :
- ✅ 319 pages avec breadcrumbs (vs 110 avant)
- ✅ Couverture 90.6% (vs 31.2% avant)
- ✅ 3 templates + 6 pages modifiés (9 fichiers/ville)
- ✅ 11 villes synchronisées (99 fichiers)
- ✅ 12 commits GitHub (monorepo + 11 villes)
- ✅ 9/11 sites validés en production (100% succès)
- ⏳ 2/11 sites en déploiement (Montpellier, Bordeaux)

**Impact** :
- Rich snippets SERP attendus (J+7-14)
- CTR +5-8% estimé
- Navigation UX améliorée

---

## 📅 TÂCHES À VENIR

### [P1]-P1-012-SEO-villes-hardcodees-50% : Correction Global Villes Hardcodées ⚠️ INCOMPLET

**Priorité** : P1  
**Temps estimé** : 1.5-2h  
**Statut** : PENDING

**Objectif** : 
Assurer 1 seule sitemap par domaine (route app), pas d'index ni `sitemap-*.xml`, directive `Sitemap:` dans `robots.txt`, neutraliser `next-sitemap`.

**Actions** :
1. Vérifier configuration sitemaps 11 villes
2. Supprimer fichiers sitemap-*.xml si existants
3. Valider route app/sitemap.ts unique
4. Ajouter directive Sitemap: dans robots.txt
5. Neutraliser next-sitemap.config.js

---

## 💡 IDÉES / DÉCOUVERTES

*Section pour nouvelles idées et découvertes à évaluer*

---

## ✅ FAIT RÉCEMMENT

### [P0]-TASK-025 : Fix Sitemap URLs 11 villes ✅ FINALISÉ

**Date** : 03/11/2025  
**Temps** : 2h30 (estimé 2-3h) ✅

**Accomplissements** :
- ✅ 11 sitemaps corrigés (cleanCategory + cleanSlug)
- ✅ 1272 URLs indexables validées (HTTP 200, 0 undefined)
- ✅ 6 commits GitHub (sitemap fix + 4 corrections build)
- ✅ 11/11 sites déployés CapRover et testés en live
- ✅ Leçon apprise : Workflow deploy 2 étapes documenté
- ✅ Exceptions documentées : Bordeaux (domaine) + Toulousain

**Impact business** :
- Résolution 858 erreurs 5xx (Toulouse)
- 1272 pages prêtes pour réindexation Google
- Attendu J+7 : 37 → 800+ pages indexées (+2000%)

**Definition of Done** :
- ✅ Code propre et documenté (10 fichiers)
- ✅ Commits GitHub main + 11 repos villes
- ✅ Testé en live (11/11 sites validés)

**Docs créées** :
- `.cursor/tasks/[P0]-TASK-025-fix-sitemap-urls/` (10 fichiers)
- RAPPORT-VALIDATION-FINAL.md
- LECON-APPRISE.md (workflow deploy)
- BORDEAUX-EXCEPTION.md

**Action restante (Guillaume)** :
- Resubmit Search Console (11 villes, 30min)
- Monitoring J+7 (10/11/2025)

---

### TASK-404-01 : Audit Structure Complète ✅ TERMINÉ

**Date** : 01/11/2025  
**Temps** : 2h30 (estimé 2-3h) ✅

**Accomplissements** :
- ✅ Restructuration TASK-001/007 → 9 sous-tâches
- ✅ Analyse complète multi-sources (Cursor + CSV + Code)
- ✅ 6 patterns majeurs identifiés
- ✅ 3 bugs critiques trouvés (cleanSlug, CATEGORY_MAPPING, majuscules)
- ✅ Découverte clé : 90.3% résolvables sans créer contenu
- ✅ 17 fichiers documentation créés
- ✅ Plan TASK-404-02 à 404-09 validé
- ✅ 3 commits GitHub (#a98ecc6, #f7e8414, #[pending])

**Definition of Done** :
- ✅ Code propre et documenté (17 fichiers)
- ✅ Commits GitHub main + SHA documentés
- ✅ Testé et validé (analyse complète 11 villes)

**Docs créées** :
- `.cursor/tasks/TASK-404-01-audit-structure/` (17 fichiers)
- `.cursor/ANALYSE-LOGIQUE-404-COMPLETE.md`
- `.cursor/TASKS-404-DETAILLEES.md`
- `.cursor/RESUME-DEMARRAGE-DEMAIN-404.md`
- `.cursor/RAPPORT-SESSION-01-NOV-2025.md`

---

## 🎯 PROCHAINES PRIORITÉS

### Option A : Finir projet 404 à 100% (1-2h)
**3 villes restantes (non critique)** :
- Lille : 28 liens, 8 erreurs (5.4%)
- Toulouse : 19 liens, 7 erreurs (7.9%)
- Strasbourg : 2 liens, 1 erreur (0.8%)

**Commande** : `"Cursor, je démarre TASK-404-LILLE"` (ou Toulouse/Strasbourg)

### Option B : Setup Scripts (5 min) ⚡
**P2-023-Scripts-setup-automation-100%** : Activer automation (validation pre-commit + dashboard "moverz")  
**Commande** : `"Cursor, je démarre P2-023-Scripts-setup-automation-100%"`

### Option C : SEO Prioritaire (1.5-2h)
**P1-028-SEO-sitemaps-consistency-100%** : Sitemaps Consistency (11 villes, P1)  
**Commande** : `"Cursor, je démarre P1-028-SEO-sitemaps-consistency-100%"`

---

## 📋 COMMANDES RAPIDES

```bash
# Voir état global
"Cursor, évalue le backlog"

# Démarrer une tâche
"Cursor, je démarre TASK-XXX"

# Logger session
"Cursor, log ma session pour TASK-XXX : [fait]"

# Mettre en pause
"Cursor, je mets TASK-XXX en pause : [raison]"

# Finaliser
"Cursor, finalise TASK-XXX"
```

---

## 📊 PROGRESSION PROJET 404

**🎉 PROJET 99% RÉSOLU** ✅

```
✅ TASK-404-01 : Audit (2h30) — TERMINÉ (01/11)
❌ TASK-404-02 : Harmonisation — SKIP (cosmétique, rollback 03/11)
✅ TASK-404-QW : Quick Wins (2h) — TERMINÉ (03/11)
   → ~165-185 liens corrigés (majuscules + accents)
   → Workflow validé : Code → Deploy → Scan → Compare ✅

✅ TASK-404-ALL-CITIES : Correction Massive — TERMINÉ (03-04/11)
   → Session 1 : 1,713 liens (11 villes, 12h)
   → Session 2 : 697 liens (5 villes, 4h50)
   → Session 3 : 437 liens (4 villes, 4h)
   → TOTAL : 2,847+ liens corrigés

❌ TASK-404-03 à 404-06 : OBSOLÈTES (corrections manuelles les ont remplacées)

📋 P1-404-07-404-redirections-externes-0% : Redirections 301 Externes (3-5h) — P1 (optionnel, Search Console)
📋 TASK-404-08 : Homepage (1h) — P2 (probablement déjà OK)
```

**État actuel** :
- ✅ **8/11 sites à 0% erreur** (Rouen, Rennes, Lyon, Marseille, Bordeaux, Montpellier, Nantes, Nice)
- 📋 **3 sites restants** (P2, non critique) :
  - Lille : 28 liens, 8 erreurs 404 (5.4%)
  - Toulouse : 19 liens, 7 erreurs 404 (7.9%)
  - Strasbourg : 2 liens, 1 erreur 404 (0.8%)
- **Taux d'erreur global : 1.3%** (16 erreurs / 1218 pages)

**Progression** : 99% complété (2,847 liens corrigés / ~2,863 total)  
**Temps investi** : 23h20 (audit + corrections + documentation)  
**ROI** : 513 → 16 erreurs (-97%)
```

---

## 🔥 AUTRES TÂCHES EN COURS (à finaliser)

**✅ Tâches finalisées récemment** :
- ✅ P1-006-SEO-migration-canonicals-100% : Canonicals (P1) — FINALISÉ (04/11)
- ✅ TASK-011 : Fix 308 Nice (P0) — FINALISÉ (04/11)

**🔄 5 tâches à finaliser** :
- P1-012-SEO-villes-hardcodees-50% : Villes hardcodées (P1, 85%, tests manquants)
- P2-013-SEO-internal-linking-homepage-75% : Internal linking (P2, 75%, validation maillage)
- P2-014-Metadata-optimisation-100% : Metadata SEO (P2, 80%, tests SERP + descriptions)
- P2-009-SEO-amelioration-70% : Schema.org (P2, 70%, validation Rich Results)

**Stratégie** : Projet 404 quasi-terminé (99%), focus sur finalisation tâches existantes + nouvelles priorités SEO.

---

*Dernière mise à jour : 2025-11-04 (nettoyé après sessions 404)*
