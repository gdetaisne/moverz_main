# BACKLOG PARTAGÉ - Moverz

> **Instructions Cursor** : Quand on te demande d'évaluer le backlog, analyse chaque item et fournis :
> - **Priorité** : P0 (Critique/Bloquant) | P1 (Important) | P2 (Normal) | P3 (Nice-to-have)
> - **Temps estimé** : en heures ou jours
> - **Assignation suggérée** : Guillaume | Associée | Les deux | À clarifier
> - **Raison** : Justification courte de la priorisation

---

## ⚠️ TÂCHES INCOMPLÈTES (TOUJOURS PRIORITAIRES)

*Aucune tâche incomplet actuellement - Tâches 404 restructurées en 9 sous-tâches (voir section dédiée)*

---

## 🎯 PROJET 404 - RÉSOLUTION COMPLÈTE (9 SOUS-TÂCHES)

> **Note** : TASK-001 et TASK-007 ont été **restructurées** en 9 sous-tâches indépendantes après analyse approfondie (01/11/2025).  
> **Voir** : `.cursor/archives/projet-404/ANALYSE-LOGIQUE-404-COMPLETE.md` et `.cursor/archives/projet-404/TASKS-404-DETAILLEES.md`

### [P0] [Temps: 2-3h] [Qui: Guillaume] TASK-404-01 : Audit Structure Complète 🔄 EN COURS

📁 **Doc** : `.cursor/tasks/[P0]-TASK-404-01-audit-structure/`

**Type** : Audit / Investigation

**Objectif** : Mapper EXACTEMENT structure 11 villes (dossiers/frontmatter/URLs) pour identifier incohérences

**Actions** :
- [x] Run verify-real-missing-articles.mjs (963 résolvables, 104 manquants)
- [x] Auditer cleanSlug() fonction (11 villes)
- [x] Vérifier CATEGORY_MAPPING (11 villes)
- [x] Créer MAPPING-STRUCTURE-11-VILLES.json
- [x] Analyser CSV Guillaume (1167 liens, 6 patterns identifiés)

**Découvertes critiques** :
- 🔴 Bug cleanSlug() Marseille + Lyon (copié Bordeaux)
- 🟠 Catégories incorrectes = 64.8% des 404s (691 liens)
- 🟢 90.3% résolvables sans créer contenu (963/1067)
- 🆕 Majuscules (80-100 liens CSV)
- 🆕 1 article Toulouse = 53 liens cassés

**Livrables** :
- [x] VERIFICATION-ARTICLES.json ✅
- [x] MAPPING-STRUCTURE-11-VILLES.json ✅
- [x] RAPPORT-INCONSISTANCES.md ✅
- [x] ANALYSE-CSV-PATTERNS-DETAILLEE.md ✅
- [x] RAPPORT-FINAL-AUDIT.md ✅

**Temps réel** : 2h30 (vs 2-3h estimé)

**Dépendances** : AUCUNE  
**Bloque** : Toutes les autres tasks 404

**Statut** : ✅ TERMINÉ  
**Démarrée le** : 01 novembre 2025  
**Terminée le** : 01 novembre 2025

---

### [P0] [Temps: 1-2h] [Qui: Guillaume] TASK-404-02 : Harmonisation Technique 🔄 ROLLBACK

📁 **Doc** : `.cursor/tasks/[P0]-TASK-404-02-harmonisation-technique/`

**Type** : Refactor / Fix technique

**Objectif initial** : Harmoniser base technique (cleanSlug, encoding accents, CATEGORY_MAPPING)

**Actions réalisées** :
- [x] Fix cleanSlug() Marseille/Lyon
- [x] Retirer accents CATEGORY_MAPPING (11 villes)
- [x] Tests validation (syntaxe)
- [x] **Auto-critique** ✅
- [x] **ROLLBACK** (validation insuffisante)

**Commits** :
- [x] #8b6cf4a : Fix technique (revert après)
- [x] #ee3e441 : Revert (fix allait changer ~167 URLs)

**Découverte** : Bug initial était **cosmétique** (pas d'impact fonctionnel)

**Recommandation** : **SKIP cette tâche** (bug sans effet, correction risquée)

**Dépendances** : TASK-404-01 ✅  
**Bloque** : ~~Toutes les autres tasks 404~~ → Plus bloquant

**Statut** : 🔄 ROLLBACK + SKIP recommandé  
**Temps réel** : 1h15min (45min fix + 30min analyse/rollback)  
**Session** : 03 novembre 2025

---

### [P1] [Temps: 1h] [Qui: Guillaume + Associée] TASK-404-03 : Décision Stratégique 104 Articles

📁 **Doc** : `.cursor/tasks/[P1]-TASK-404-03-decision-articles/`

**Type** : Stratégie / Décision business

**Objectif** : DÉCIDER pour 104 articles : créer OU rediriger vers piliers

**Actions** :
- [ ] Analyser pertinence SEO (volume recherche)
- [ ] Décider par article (créer/rediriger)
- [ ] Si création : définir slugs/catégories
- [ ] Si redirection : mapper piliers cibles

**Dépendances** : TASK-404-01  
**Bloque** : TASK-404-04 ou TASK-404-05

**Statut** : 📋 PENDING

---

### [P2] [Temps: 20-30h] [Qui: Associée] TASK-404-04 : Création Contenu Manquant (OPTIONNEL)

📁 **Doc** : `.cursor/tasks/[P2]-TASK-404-04-creation-contenu/`

**Type** : Content / Production

**Objectif** : Créer les 104 articles (si décidé en TASK-404-03)

**Actions** :
- [ ] Production par batch (10 articles/batch)
- [ ] Qualité >= 8/10
- [ ] Frontmatter aligné
- [ ] Validation qualité

**Dépendances** : TASK-404-02, TASK-404-03  
**Bloque** : TASK-404-05

**Statut** : 📋 PENDING (optionnel selon décision 404-03)

---

### [P0] [Temps: 4-6h] [Qui: Guillaume] TASK-404-05 : Correction Liens Internes Automatique

📁 **Doc** : `.cursor/tasks/[P0]-TASK-404-05-correction-liens/`

**Type** : Refactor / Script automatique

**Objectif** : Corriger AUTOMATIQUEMENT 963 liens internes cassés

**Actions** :
- [ ] Créer script correction massive
- [ ] Fix 691 catégories incorrectes
- [ ] Fix 192 variations slug
- [ ] Fix 80 liens existants
- [ ] Backup + validation

**Résout** : 90.3% des 404s (963/1067)

**Dépendances** : TASK-404-02, TASK-404-04 (si applicable)  
**Bloque** : TASK-404-06, TASK-404-07, TASK-404-08

**Statut** : 📋 PENDING

---

### [P0] [Temps: 1h] [Qui: Guillaume ou Associée] TASK-404-06 : Validation Liens Internes

📁 **Doc** : `.cursor/tasks/[P0]-TASK-404-06-validation-liens/`

**Type** : Validation / Tests

**Objectif** : Valider corrections TASK-404-05 (0 liens cassés)

**Actions** :
- [ ] Re-run analyze-404.mjs
- [ ] Analyser résiduels (<50 acceptables)
- [ ] Tests manuels 3 villes
- [ ] Vérif aucune régression

**Dépendances** : TASK-404-05  
**Bloque** : Phase 4 (ne pas passer si liens cassés)

**Statut** : 📋 PENDING

---

### [P1] [Temps: 3-5h] [Qui: Guillaume] TASK-404-07 : Redirections 301 Externes

📁 **Doc** : `.cursor/tasks/[P1]-TASK-404-07-redirections-externes/`

**Type** : SEO / Redirections

**Objectif** : Ajouter ~1300-1500 redirections 301 pour URLs externes (Search Console, GPT)

**Actions** :
- [ ] Réconcilier GPT (1541) vs existantes (1014)
- [ ] Créer redirections anciennes structures (800)
- [ ] Créer redirections pages supprimées (500)
- [ ] Créer redirections accents (200)
- [ ] Tests redirections

**Dépendances** : TASK-404-06  
**Bloque** : TASK-404-09

**Statut** : 📋 PENDING

---

### [P1] [Temps: 2-3h] [Qui: Guillaume ou Associée] TASK-404-08 : Fix Homepage 11 Villes

📁 **Doc** : `.cursor/tasks/[P1]-TASK-404-08-fix-homepage/`

**Type** : Audit / Fix

**Objectif** : Corriger 41 liens cassés homepage (analyse GPT)

**Actions** :
- [ ] Scraper homepages 11 villes
- [ ] Identifier liens cassés
- [ ] Corriger vers URLs validées
- [ ] Tests live

**Dépendances** : TASK-404-05, TASK-404-07  
**Bloque** : TASK-404-09

**Statut** : 📋 PENDING

---

### [P0] [Temps: 2-3h] [Qui: Guillaume + Associée] TASK-404-09 : Validation Finale + Tests Live

📁 **Doc** : `.cursor/tasks/[P0]-TASK-404-09-validation-finale/`

**Type** : Validation / Tests / QA

**Objectif** : Validation complète projet 404 (99%+ résolution)

**Actions** :
- [ ] Re-run analyses finales
- [ ] Tests live 11 villes (110 tests)
- [ ] Crawl Screaming Frog (Nice)
- [ ] Vérif Search Console
- [ ] Rapport final

**Dépendances** : TASK-404-05 à TASK-404-08  
**Bloque** : RIEN (tâche finale)

**Statut** : 📋 PENDING

---

## 🔴 PRIORITÉ IMMÉDIATE (Setup Final)

### [P0] [Temps: 5 min] [Qui: Guillaume] TASK-023 : Setup Scripts Automation

📁 **Doc** : `.cursor/tasks/[P0]-TASK-023-setup-scripts-automation/`

**Type** : Setup / Installation

**Contexte / Pourquoi** :
Scripts automation créés (7 scripts) mais pas encore activés. Setup requis pour activer :
- Hook git pre-commit (validation automatique)
- Alias shell "moverz" (dashboard rapide)
- Test que tout fonctionne

**Actions** :
- [ ] Créer hook git pre-commit (30 sec)
- [ ] Ajouter alias shell "moverz" (30 sec)
- [ ] Tester health-check fonctionne (30 sec)
- [ ] Commit + push GitHub (3 min)

**Temps estimé** : 5 minutes

**Dépendances** : Documentation + scripts déjà créés  
**Bloque** : Utilisation quotidienne du système

**Statut** : 📋 PENDING  
**Créée le** : 02 novembre 2025

---

## 🔄 EN COURS (à finaliser)

### [P0] [Temps: ~90% fait] [Qui: Guillaume] TASK-011 : Fix 308 Redirections Nice + Deployment

📁 **Doc** : `.cursor/tasks/[P0]-TASK-011-fix-308-nice/`

**Type** : Bugfix / Deployment

**Contexte / Pourquoi** :
11 pages Nice retournent 308 après déploiement (services, quartiers, corridors, pages légales). Problème de cache Docker CapRover ou commit déployé différent.

**Diagnostic** :
- Tests : 30/41 réussis (73.2%) vs 42% avant
- 11 pages → 308 au lieu de 200
- Fichiers existent en local ✅
- Commit remote = local ✅
- Hypothèse : Cache Docker

**Changements apportés** :
- Diagnostic complet effectué
- Solutions identifiées (force rebuild, invalidation cache)
- Fix deployment (SITE_URL, Dockerfile, .caproverenv)

**Commits GitHub** :
- [x] #615682ad : Fix captain-definition + Dockerfile Nice SITE_URL
- [x] #e008dfa8 : Ajout .caproverenv Nice avec SITE_URL
- [x] #1291630d : Correction SITE_URL env.ts Nice
- [x] #92e01c15 : Invalider cache Docker + ENV SITE_URL base stage
- [x] #b2f587c3 : Force invalidation cache Docker timestamp unique

**Sites à tester** :
- [ ] Nice : Vérifier 11 pages retournent 200 (pas 308)
- [ ] Valider déploiement CapRover OK

**Definition of Done** :
- [ ] 1. Fix appliqué et documenté
- [x] 2. Sur GitHub main (5 commits)
- [ ] 3. Testé live Nice - 11 pages → 200 OK

**Statut** : 🔄 EN COURS (fix fait, tests deployment à valider)

**Démarrée le** : 31 octobre 2025

---

### [P1] [Temps: ~85% fait] [Qui: Associée] TASK-012 : Correction Global Villes Hardcodées

📁 **Doc** : `.cursor/tasks/[P1]-TASK-012-villes-hardcodees/`

**Type** : Bugfix / Refactor

**Contexte / Pourquoi** :
Villes hardcodées dans le code (ex: "Lille" en dur dans code Bordeaux). Problème de copier/coller lors création sites. Impact SEO et UX (mauvaises infos affichées).

**Problèmes identifiés** :
- **Bug Lille hardcodé** : Dans pages services/contact autres villes
- **Quartiers Bordeaux** : Hardcodés dans code Strasbourg
- **Emails** : contact@ville-incorrecte.fr en dur
- **URLs** : Domaines hardcodés au lieu d'utiliser cityData

**Changements apportés** :
- Metadata dynamiques services + contact (11 villes)
- Correction bug Lille hardcodé
- Fix quartiers Bordeaux dans autres sites
- Remplacement emails par contact@domaine.fr (11 villes)
- Correction URL Bordeaux cityData
- Footer résolution villes SITE_URL

**Commits GitHub** :
- [x] #c43c0391 : Metadata dynamiques + Bug Lille hardcodé corrigé (11 villes)
- [x] #c10e79f2 : Remplacement emails par contact@domaine.fr (11 villes)
- [x] #8c353a42 : Sync cityData.ts URL Bordeaux correcte
- [x] #dfe0ae7a : Corrige URL Bordeaux + doc URLs production
- [x] #af07421b : Fix footer résolution villes + SITE_URL Montpellier

**Sites à tester** :
- [ ] 2+ villes : Vérifier pas de ville hardcodée
- [ ] Vérifier metadata dynamiques correctes
- [ ] Vérifier emails corrects par ville

**Definition of Done** :
- [x] 1. Code corrigé et documenté (11 villes)
- [x] 2. Sur GitHub main (5 commits)
- [ ] 3. Testé sur 2+ sites (zéro hardcodé)

**Statut** : 🔄 EN COURS (code fait, tests à valider)

**Démarrée le** : 30-31 octobre 2025

---

### [P1] [Temps: ~2h30 restant] [Qui: Guillaume] TASK-006 : Migration Canonicals Complète - 11 villes

📁 **Doc** : `.cursor/tasks/[P1]-TASK-006-migration-canonicals-complete/`

**Type** : Refactor / SEO Critical

**Contexte** : Migration exhaustive canonicals avec trailing slash partout, 1407 pages corrigées

**Travail effectué** (95%) :
- ✅ Marseille phases 1-9 complètes (130 pages)
- ✅ Nice + Toulouse + 8 autres villes (1277 pages)
- ✅ Helper `canonical-helper.ts` centralisé (11 villes)
- ✅ Tests auto 55/55 ✅
- ✅ 15+ commits sur GitHub main

**Bugs résiduels identifiés** (1er nov - Analyse approfondie) :
- ⚠️ **Bug #1** (P0) : Pages quartiers avec slug hardcodé 'lille' → 10 sites affectés
- ⚠️ **Bug #2** (P1) : Metadata "Lille" dans Toulouse → 6+ fichiers
- ⚠️ **Bug #3** (P2) : Templates hardcodés Marseille/Nice → 2 fichiers × 11 villes
- ⚠️ **Bug #4** (P3) : cityData.ts trailing slash inconsistant → 11 fichiers

**Commits** : 
- [x] 15+ commits migration initiale (31 oct)
- [ ] 4 commits corrections bugs (1er nov)

**Ce qui reste** (2h30) :
- [ ] Corriger Bug #1 quartiers (15 min) - 10 fichiers
- [ ] Corriger Bug #2 metadata (30 min) - 6+ fichiers
- [ ] Corriger Bug #3 templates (20 min) - 22 fichiers
- [ ] Corriger Bug #4 cityData (10 min) - 11 fichiers
- [ ] Tests live Nice + Toulouse (30 min)
- [ ] Commit + deploy (25 min)
- [ ] Validation GSC (48h après)

**Definition of Done** :
- [x] 1. Code propre : helper centralisé ✅
- [x] 2. 1407 pages avec trailing slash ✅
- [ ] 3. Bugs résiduels corrigés (0/4)
- [x] 4. Sur GitHub main (15/19 commits)
- [ ] 5. Testé live 2+ sites
- [ ] 6. Validation GSC (48h après)

**Statut** : 🔄 EN COURS (95% fait - corrections bugs en cours)

**Démarrée le** : 31 octobre 2025  
**Bugs identifiés le** : 1er novembre 2025

---


### [P2] [Temps: ~75% fait] [Qui: Guillaume + Associée] TASK-013 : Optimisation Internal Linking → Push Homepage

📁 **Doc** : `.cursor/tasks/[P2]-TASK-013-internal-linking-homepage/`

**Type** : SEO / Optimization

**Contexte / Pourquoi** :
Optimisation maillage interne pour pousser autorité vers homepage. Liens stratégiques depuis articles satellites vers homepage, services, pages money.

**Changements apportés** :
- **Internal linking multi-villes** :
  - Marseille : Maillage interne optimisé
  - Rouen : Maillage interne renforcé
  - Bordeaux : Liens stratégiques ajoutés
  - Lille, Lyon, Toulouse, Nice : Maillage amélioré

- **Fix ALL internal links trailing slash** (Marseille Phase 8)
  - Tous liens internes avec trailing slash cohérent
  - Liens vers homepage optimisés

- **Push homepage depuis satellites** :
  - Articles satellites → Homepage
  - Articles satellites → Services
  - Articles satellites → Pages money

**Commits GitHub** :
- [x] #bc3a95ba : Add internal linking Marseille/Rouen/Bordeaux/Lille/Lyon/Toulouse/Nice
- [x] #bc0d9bdd : Fix ALL internal links avec trailing slash (Marseille Phase 8)

**Sites à tester** :
- [ ] Vérifier liens internes homepage depuis articles
- [ ] Analyser maillage avec outil SEO (Screaming Frog)
- [ ] Vérifier trailing slash cohérent

**Definition of Done** :
- [x] 1. Maillage interne optimisé et documenté
- [x] 2. Sur GitHub main (2 commits principaux)
- [ ] 3. Testé sur 2+ sites avec analyse maillage

**Statut** : 🔄 EN COURS (code fait, analyse maillage à valider)

**Démarrée le** : 30-31 octobre 2025

---

### [P2] [Temps: ~80% fait] [Qui: Guillaume] TASK-014 : Optimisation Métadonnées SEO - 11 villes

📁 **Doc** : `.cursor/tasks/[P2]-TASK-014-optimisation-metadata/`

**Type** : SEO / Optimization

**Contexte / Pourquoi** :
Optimisation complète métadonnées SEO pour améliorer CTR et positionnement Google : titles, descriptions, metadata dynamiques, metadataBase.

**Changements apportés** :
- **Metadata dynamiques** :
  - Services + Contact (11 villes)
  - Bug Lille hardcodé corrigé
  - metadataBase trailing slash

- **Titles optimisés** :
  - 54 chars max (retrait 'en' devant '7j')
  - Optimize titles 11 cities (SEO)

- **Canonical URL** :
  - Trailing slash GSC compliance
  - Fix metadataBase seo-builders.ts

**Commits GitHub** :
- [x] #c43c0391 : Metadata dynamiques services + contact (11 villes)
- [x] #db77cd26 : Fix seo-builders.ts metadataBase (Marseille)
- [x] #34c00cb2 : Title optimisé 54 chars
- [x] #bc3a95ba : Optimize titles 11 cities
- [x] #59b965f1 : Canonical URL trailing slash GSC

**Sites à tester** :
- [ ] Vérifier metadata correctes sur 2+ villes
- [ ] Tester Google SERP preview (titles)
- [ ] Valider metadataBase OK

**Definition of Done** :
- [x] 1. Metadata optimisées et documentées
- [x] 2. Sur GitHub main (5 commits)
- [ ] 3. Testé SERP + metadata sur 2+ sites

**Statut** : 🔄 EN COURS (code fait, validation SERP à faire)

**Démarrée le** : 30-31 octobre 2025

---

### [P2] [Temps: ~70% fait] [Qui: Guillaume] TASK-009 : Amélioration SEO - Schema.org + Wording

📁 **Doc** : `.cursor/tasks/[P2]-TASK-009-amelioration-seo/`

**Type** : SEO / Feature

**Contexte** : Enrichissement Schema.org + optimisation wording pour meilleur positionnement

**Travail effectué** :
- Schema.org (HowTo, Organization, searchIntent)
- Wording optimisé quartiers + intent transactionnel
- FAQ locales Nice + Lyon
- Architecture SEO centralisée

**Commits** : 10 commits (30-31 oct)

**Reste** : Validation Rich Results Test

**Statut** : 🔄 EN COURS (70% fait)

**Démarrée le** : 30 octobre 2025

---

## 🟡 PRIORITÉ NORMALE (P2)

*Voir tâches EN COURS ci-dessus*

---

## 🟢 NICE-TO-HAVE (P3)

### [P3] [Temps: 10-15h] [Qui: Lucie] TASK-005 : Audit qualité blogs - Amélioration contenu

📁 **Doc** : `.cursor/tasks/[P3]-TASK-005-audit-qualite-blogs/`

**Type** : Content / SEO

**Contexte** : Articles courts (<800 mots), maillage faible, FAQ manquantes

**Actions** :
- Enrichir articles courts (<800 → 1000-1200 mots)
- Améliorer maillage interne (piliers + satellites)
- Ajouter FAQ (rich snippets)

**Statut** : 🔄 EN COURS

**Démarrée le** : 03 novembre 2025  
**Assignée à** : Lucie

---

## 🗑️ TÂCHES ABANDONNÉES

### [❌ ABANDONNÉE] TASK-002 : Migration Canonicals (doc seulement)

**Raison** : Remplacée par TASK-006 (migration complète directe)

**Nettoyage** : ✅ Aucun code à revert (documentation conservée)

---

## ✅ TÂCHES RÉCEMMENT FINALISÉES

### ✅ TASK-008 : Production satellites multi-villes (185 articles)
**Finalisée** : 30 oct | Associée | ~28h
- Bordeaux 50, Strasbourg 60, Rouen 75

### ✅ TASK-010 : UX/Design blog premium (11 villes)
**Finalisée** : 30 oct | Associée | ~6h
- Design magazine, fix CSS

### ✅ TASK-003, TASK-004 : Déjà archivées
Voir DONE.md

---

## 📊 STATS RAPIDES

**⚠️ INCOMPLET** : 0 tâches

**🎯 PROJET 404** : 9 tâches (1 TERMINÉ, 8 PENDING)
- TASK-404-01 : Audit structure (EN COURS)
- TASK-404-02 à 404-09 : PENDING (séquence logique)

**🔄 EN COURS** : 7 tâches (à finaliser)
- TASK-011 : Fix 308 Nice (P0, 90% fait)
- TASK-012 : Villes hardcodées (P1, 85% fait)
- TASK-006 : Migration Canonicals (P1, 95% fait - bugs en cours)
- TASK-013 : Internal linking → Homepage (P2, 75% fait)
- TASK-014 : Optimisation Metadata (P2, 80% fait)
- TASK-009 : Amélioration SEO Schema (P2, 70% fait)
- TASK-005 : Audit qualité blogs (P3, Lucie - vient de démarrer)

**✅ À ARCHIVER** : 2 tâches
- TASK-008, TASK-010

**Total backlog actif** : 15 tâches (7 EN COURS + 1 TERMINÉ + 8 PENDING projet 404)

**Répartition** :
- Guillaume : 6 tâches EN COURS
- Lucie : 1 tâche EN COURS (TASK-005)

---

## 📝 NOTES IMPORTANTES

### Restructuration TASK-001 et TASK-007 (01/11/2025)

Les tâches TASK-001 et TASK-007 ont été **remplacées** par 9 sous-tâches après analyse approfondie révélant :

**Découverte clé** : 90.3% des 404s sont résolvables par correction automatique (pas besoin de créer contenu)

**Nouvelle structure** :
- Phase 1 : Audit + Harmonisation (3-5h) → Base technique propre
- Phase 2 : Décision + Création optionnelle (1-31h) → Contenu si nécessaire
- Phase 3 : Correction massive (5-7h) → 963 liens corrigés automatiquement
- Phase 4 : Externe + Homepage (5-8h) → Redirections 301 + homepage
- Phase 5 : Validation (2-3h) → Tests complets

**Effort total** :
- Sans création contenu : 15-23h → Résout 95% (recommandé)
- Avec création contenu : 36-54h → Résout 100%

**Docs** :
- `.cursor/archives/projet-404/ANALYSE-LOGIQUE-404-COMPLETE.md` (7000 mots)
- `.cursor/archives/projet-404/TASKS-404-DETAILLEES.md` (15000 mots)

---

*Dernière mise à jour : 2025-11-02*  
*Réorganisation `.cursor/` : Archives créées, docs 404 déplacées vers `archives/projet-404/`*
