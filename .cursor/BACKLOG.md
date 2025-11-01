# BACKLOG PARTAGÉ - Moverz

> **Instructions Cursor** : Quand on te demande d'évaluer le backlog, analyse chaque item et fournis :
> - **Priorité** : P0 (Critique/Bloquant) | P1 (Important) | P2 (Normal) | P3 (Nice-to-have)
> - **Temps estimé** : en heures ou jours
> - **Assignation suggérée** : Guillaume | Associée | Les deux | À clarifier
> - **Raison** : Justification courte de la priorisation

---

## ⚠️ TÂCHES INCOMPLÈTES (TOUJOURS PRIORITAIRES)

### [P1] [Temps restant: 20-30h] [Qui: Guillaume ou Associée] TASK-001 : Correction 404 - Phase 4 (104 articles manquants)

📁 **Doc** : `.cursor/tasks/TASK-001-correction-404/`

**Type** : Bugfix / Content

**Contexte** : Phases 1-3 terminées (93.6% résolus), reste 104 articles à créer (Rouen 34, Montpellier 33, Lyon 18, Autres 19)

**Ce qui reste** :
- [ ] Créer 104 articles manquants
- [ ] Re-run analyse 404
- [ ] Validation finale

**Commits** : #8faf337, #94189b4 (phases 1-3)

**Statut** : ⚠️ INCOMPLET (depuis 29 oct)

---

## 🔄 EN COURS (à finaliser)

### [P0] [Temps: ~90% fait] [Qui: Guillaume] TASK-011 : Fix 308 Redirections Nice + Deployment

📁 **Doc** : `.cursor/tasks/TASK-011-fix-308-nice/`

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

📁 **Doc** : `.cursor/tasks/TASK-012-villes-hardcodees/`

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

### [P1] [Temps: ~90% fait] [Qui: Guillaume] TASK-006 : Migration Canonicals Complète - 11 villes

📁 **Doc** : `.cursor/tasks/TASK-006-migration-canonicals-complete/`

**Type** : Refactor / SEO

**Contexte** : Migration exhaustive canonicals avec trailing slash partout, 1407 pages corrigées

**Travail effectué** :
- Marseille phases 1-9 complètes
- Nice + Toulouse + 8 autres villes
- Correction exhaustive 1407 pages
- Tests auto 55/55 ✅

**Commits** : 15+ commits (31 oct)

**Reste** : Tests live manuels 2+ sites

**Statut** : 🔄 EN COURS (90% fait)

**Démarrée le** : 31 octobre 2025

---

### [P1] [Temps: ~80% fait] [Qui: Associée] TASK-007 : Corrections 404 Massives + Redirections 301

📁 **Doc** : `.cursor/tasks/TASK-007-corrections-404-redirections/`

**Type** : Bugfix / SEO

**Contexte** : ~1014 redirections 301 (11 villes) + harmonisation blog + corrections liens

**Travail effectué** :
- Redirections 301 toutes villes
- Harmonisation catégories blog
- Correction 193 liens Nice (−41% 404)
- Correction 400 liens CSV

**Commits** : 15+ commits (29-31 oct)

**Reste** : Tests live 2+ sites

**Statut** : 🔄 EN COURS (80% fait)

**Démarrée le** : 29 octobre 2025

---

### [P2] [Temps: ~75% fait] [Qui: Guillaume + Associée] TASK-013 : Optimisation Internal Linking → Push Homepage

📁 **Doc** : `.cursor/tasks/TASK-013-internal-linking-homepage/`

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

📁 **Doc** : `.cursor/tasks/TASK-014-optimisation-metadata/`

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

📁 **Doc** : `.cursor/tasks/TASK-009-amelioration-seo/`

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

### [P3] [Temps: 10-15h] [Qui: Associée] TASK-005 : Audit qualité blogs - Amélioration contenu

📁 **Doc** : `.cursor/tasks/TASK-005-audit-qualite-blogs/`

**Type** : Content / SEO

**Contexte** : Articles courts (<800 mots), maillage faible, FAQ manquantes

**À faire** :
- Enrichir articles courts
- Améliorer maillage interne
- Ajouter FAQ

**Statut** : 📋 À faire

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

**⚠️ INCOMPLET** : 1 tâche (PRIORITAIRE)
- TASK-001 : Correction 404 Phase 4 (20-30h)

**🔄 EN COURS** : 7 tâches (à finaliser)
- TASK-011 : Fix 308 Nice (P0, 90% fait)
- TASK-012 : Villes hardcodées (P1, 85% fait)
- TASK-006 : Migration Canonicals (P1, 90% fait)
- TASK-007 : Corrections 404 + Redirections (P1, 80% fait)
- TASK-013 : Internal linking → Homepage (P2, 75% fait)
- TASK-014 : Optimisation Metadata (P2, 80% fait)
- TASK-009 : Amélioration SEO Schema (P2, 70% fait)

**✅ À ARCHIVER** : 2 tâches
- TASK-008, TASK-010

**Total backlog actif** : 9 tâches

*Dernière mise à jour : 2025-11-01*
