# BACKLOG PARTAGÉ - Moverz

> **Instructions Cursor** : Quand on te demande d'évaluer le backlog, analyse chaque item et fournis :
> - **Priorité** : P0 (Critique/Bloquant) | P1 (Important) | P2 (Normal) | P3 (Nice-to-have)
> - **Temps estimé** : en heures ou jours
> - **Assignation suggérée** : Guillaume | Associée | Les deux | À clarifier
> - **Raison** : Justification courte de la priorisation

---

## ⚠️ TÂCHES INCOMPLÈTES (TOUJOURS PRIORITAIRES)

*Aucune tâche incomplète*

---

## 🎉 PROJET 404 - QUASI-RÉSOLU (99% complété)

**✅ SUCCÈS MASSIF** : 2,847+ liens corrigés sur 3 sessions (03-04/11/2025)

**Résultat scan 04/11** :
- **8/11 sites à 0% erreur** ✅ (Rouen, Rennes, Lyon, Marseille, Bordeaux, Montpellier, Nantes, Nice)
- **Taux d'erreur global : 1.3%** (49 liens / 1218 pages)
- **16 erreurs 404 restantes** sur 3 villes seulement

**Sites restants** (P2 - Non critique) :
- Lille : 28 liens visibles, 8 erreurs 404 (5.4%)
- Toulouse : 19 liens visibles, 7 erreurs 404 (7.9%)
- Strasbourg : 2 liens visibles, 1 erreur 404 (0.8%)

---

## 🔴 PROTECTIONS CI/CD - Prévention 404

### [P1] [Temps: 3-4h] [Qui: Guillaume] P1-048-CI-CD-anti-404-100% : CI anti-404 + garde push multi-sites

📁 **Doc** : `.cursor/tasks/P1-048-CI-CD-anti-404-100%/`

**Type** : Infrastructure / Prévention

**Objectif** : Empêcher toute réintroduction de 404 via commits accidentels sur `sites/*/content/**`

**Contexte** :
- Commit 8cab243 a cassé 630 fichiers → 676 erreurs 404 en 4h
- Cause : réécritures automatiques non validées sur `sites/*/content/**`
- Besoin : CI bloquante + gardes sur scripts de déploiement

**Actions** :
- [ ] GitHub Actions : regex-block sur patterns interdits
  - Pattern 1: `](/demenagement/[a-z0-9-]+)`
  - Pattern 2: `](/blog/[a-z0-9-]+/guide/?)`
  - Fail si match dans diff `sites/*/content/**`
- [ ] GitHub Actions : link-check interne (Nice, Bordeaux)
  - Vérif liens Markdown → fichier cible existe
  - Fail sur lien cassé détecté
- [ ] Garde script `push-all-sites-to-github.sh`
  - Désactiver rsync par défaut (ALLOW_CONTENT_SYNC=0)
  - Ajouter flags --dry-run et --sites=ville1,ville2
- [ ] CODEOWNERS
  - `sites/**` → review requise Guillaume
- [ ] Documentation
  - README CI avec exemples
  - Note: activer branch protection sur main (settings GitHub)

**Priorité** : P1 (prévention récidive 404 = business critical)

**Statut** : 📋 PENDING

---

## 🟡 PROJET 404 - Nettoyage Final (3 villes restantes)

### [P2] [Temps: 1-2h] [Qui: Guillaume ou Lucie] TASK-404-LILLE : Nettoyage final Lille (28 liens, 8 erreurs)

📁 **Doc** : À créer si nécessaire

**Type** : Bugfix / Cleanup

**Objectif** : Corriger les 28 liens cassés visibles + 8 erreurs 404 restantes sur Lille

**Contexte** :
- Lille : 149 pages analysées
- 28 liens cassés visibles, 8 erreurs 404
- Taux d'erreur : 5.4% (acceptable mais perfectible)

**Actions** :
- [ ] Analyser les 28 liens cassés (catégories, patterns)
- [ ] Corriger automatiquement ou manuellement
- [ ] Valider 0% erreur post-correction

**Priorité** : P2 (non critique, 5.4% acceptable)

**Statut** : 📋 PENDING

---

### [P2] [Temps: 1-2h] [Qui: Guillaume ou Lucie] TASK-404-TOULOUSE : Nettoyage final Toulouse (19 liens, 7 erreurs)

📁 **Doc** : À créer si nécessaire

**Type** : Bugfix / Cleanup

**Objectif** : Corriger les 19 liens cassés visibles + 7 erreurs 404 restantes sur Toulouse

**Contexte** :
- Toulouse : 89 pages analysées
- 19 liens cassés visibles, 7 erreurs 404
- Taux d'erreur : 7.9% (le plus élevé des 3)

**Actions** :
- [ ] Analyser les 19 liens cassés (accents, catégories)
- [ ] Corriger automatiquement ou manuellement
- [ ] Valider 0% erreur post-correction

**Priorité** : P2 (non critique, mais taux le plus élevé)

**Statut** : 📋 PENDING

---

### [P2] [Temps: 30min] [Qui: Guillaume ou Lucie] TASK-404-STRASBOURG : Nettoyage final Strasbourg (2 liens, 1 erreur)

📁 **Doc** : À créer si nécessaire

**Type** : Bugfix / Cleanup

**Objectif** : Corriger les 2 liens cassés visibles + 1 erreur 404 restante sur Strasbourg

**Contexte** :
- Strasbourg : 124 pages analysées
- 2 liens cassés visibles, 1 erreur 404
- Taux d'erreur : 0.8% (quasi-parfait)

**Actions** :
- [ ] Identifier les 2 liens cassés
- [ ] Correction rapide (probablement 1 article)
- [ ] Valider 0% erreur

**Priorité** : P2 (non critique, quasi-parfait)

**Statut** : 📋 PENDING

---

## ✅ PROJET 404 - Tâches Archivées (8 villes à 0%)

### ✅ TASK-404-01 : Audit Structure Complète

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

**Statut** : ✅ TERMINÉ et ARCHIVÉ  
**Démarrée le** : 01 novembre 2025  
**Terminée le** : 01 novembre 2025

---

### ✅ TASK-404-02 : Harmonisation Technique

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

**Statut** : ✅ ROLLBACK + SKIP (cosmétique, pas d'impact)  
**Temps réel** : 1h15min  
**Session** : 03 novembre 2025

---

### ✅ TASK-404-ALL-CITIES : Correction Massive 11 villes (2847 liens)

**Statut** : ✅ TERMINÉ et ARCHIVÉ dans DONE.md  
**Temps** : 12h (session 1)  
**Résultat** : 1713 liens corrigés, 29 commits, 33 scripts créés

Voir : `.cursor/DONE.md` pour détails complets

---

### ✅ TASK-404-03 à TASK-404-06 : OBSOLÈTES

**Raison** : Corrections manuelles massives (sessions 1-3) ont rendu ces tâches obsolètes
- TASK-404-03 : Décision → Prise pendant corrections
- TASK-404-04 : Création contenu → Non nécessaire (corrections suffisantes)
- TASK-404-05 : Correction AUTO → Fait manuellement (2847+ liens)
- TASK-404-06 : Validation → Faite ville par ville

**Statut** : ✅ ARCHIVÉ (remplacées par correction directe)

---

### [P1] [Temps: 3-5h] [Qui: Guillaume] P1-404-07-404-redirections-externes-0% : Redirections 301 Externes (À FAIRE)

📁 **Doc** : `.cursor/tasks/P1-404-07-404-redirections-externes-0%/`

**Type** : SEO / Redirections

**Objectif** : Ajouter ~1300-1500 redirections 301 pour URLs externes (Search Console, GPT)

**Actions** :
- [ ] Réconcilier GPT (1541) vs existantes (1014)
- [ ] Créer redirections anciennes structures (800)
- [ ] Créer redirections pages supprimées (500)
- [ ] Créer redirections accents (200)
- [ ] Tests redirections

**Dépendances** : Liens internes corrigés ✅  
**Bloque** : RIEN

**Statut** : 📋 PENDING

**Note** : Peut être fait plus tard (redirections externes Search Console, pas de liens internes cassés actuellement)

---

### [P2] [Temps: 1h] [Qui: Guillaume ou Associée] TASK-404-08 : Fix Homepage 11 Villes (Si nécessaire)

📁 **Doc** : `.cursor/tasks/[P1]-TASK-404-08-fix-homepage/`

**Type** : Audit / Fix

**Objectif** : Vérifier et corriger éventuels liens cassés homepage (analyse GPT mentionnait 41 liens)

**Actions** :
- [ ] Scraper homepages 11 villes (vérifier état actuel)
- [ ] Identifier liens cassés (probablement déjà corrigés)
- [ ] Corriger si nécessaire
- [ ] Tests live

**Statut** : 📋 PENDING (basse priorité, probablement déjà réglé)

**Note** : À vérifier si encore nécessaire après les corrections massives

---

## 🔴 PRIORITÉ IMMÉDIATE (Setup Final)

### [P2] [Temps: 5 min] [Qui: Guillaume] P2-023-Scripts-setup-automation-100% : Setup Scripts Automation

📁 **Doc** : `.cursor/tasks/P2-023-Scripts-setup-automation-100%/`

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

### [P0] [Temps: 1.5-3h] [Qui: Guillaume] P0-046-SERP-favicon-logo-100% : Logo SERP / Favicons — CTR

📁 **Doc** : `.cursor/tasks/P0-046-SERP-favicon-logo-100%/`

**Type** : SEO CTR / Investigation + Fix multi‑sites (11 villes)

**Objectif** : Faire apparaître systématiquement le logo (favicon) dans les résultats Google (organiques et Ads) pour augmenter le CTR.

**Contexte** : Observé "sans logo" quasi systématique sur mobile (ex. rennais → requêtes Toulouse). Impact direct sur CTR et revenus.

**Hypothèses à vérifier** :
- Favicon servi à la racine (`/favicon.ico`) bien accessible (200, non bloqué robots), poids/format OK
- Déclarations `<link rel="icon">` cohérentes (ajouter taille 48×48 explicite)
- Manifest/apple-touch présents mais non requis — vérifier cohérence
- JSON‑LD `Organization.logo` utilise `og-image.jpg` (1200×630, non carré) → à remplacer par logo carré (`logo.png`/`logo.svg`)

**Actions** :
- [ ] Audit 11 domaines : `curl -I https://<domaine>/favicon.ico` (200, type image/*, taille <100KB)
- [ ] Vérifier présence `<link rel="icon" ... 48x48>` dans `app/layout.tsx` (11 villes)
- [ ] Si manquant → ajouter icône 48×48 et 32×32 + conserver ICO
- [ ] Mettre `Organization.logo` → image carrée (512×512) par ville
- [ ] Tests mobiles réels (2 domaines) + capture

**Definition of Done** :
- [ ] 11/11 domaines : favicon 200 à la racine + `<link rel="icon">` 48×48 présent
- [ ] `Organization.logo` carré et accessible 200
- [ ] Preuves: captures Google (2 requêtes × 2 sites) avec logo affiché
- [ ] Documentation + SHAs consignés

**Raison (priorisation)** : Impact CTR direct et global (toutes requêtes), bénéfice immédiat sur leads → P0.

**Statut** : 🔄 EN COURS (création tâche + analyse)

---

## 🟠 SITEMAPS & INDEXATION

### [P1] [Temps: 1.5-2h] [Qui: Guillaume] P1-028-SEO-sitemaps-consistency-100% : Sitemaps Consistency 11 villes

📁 **Doc** : `.cursor/tasks/P1-028-SEO-sitemaps-consistency-100%/`

**Type** : SEO / QA + Cleanup

**Objectif** : Garantir 1 seule sitemap par domaine (route `app/sitemap.ts`) et une exposition cohérente sur les 11 sites.

**Actions** :
- [ ] Auditer 11 domaines : `GET /sitemap.xml` → 200 `application/xml`
- [ ] Vérifier absence de `sitemap_index.xml` et `sitemap-*.xml` (→ 404 attendu)
- [ ] Vérifier URLs avec trailing slash dans la sitemap
- [ ] Ajouter dans `robots.txt` la ligne `Sitemap: https://<domaine>/sitemap.xml` (11 sites)
- [ ] Neutraliser le risque de double-sitemap : supprimer/renommer `next-sitemap.config.js` inutilisés
- [ ] QA 2 URLs par site (sitemap → page 200)
- [ ] Commits + déploiements, GSC: resoumettre sitemaps

**Definition of Done** :
- [ ] 11/11 `GET /sitemap.xml` → 200 OK
- [ ] 0/11 `sitemap_index.xml` et `sitemap-*.xml` accessibles (404 OK)
- [ ] 11/11 `robots.txt` contiennent la directive `Sitemap:`
- [ ] Trailing slash cohérent sur toutes les URLs exposées
- [ ] Documentation et SHAs consignés

**Raison (priorisation)** : Sitemaps = signal d’indexation critique; prévenir régressions et garantir cohérence multi-sites.

---

## 🔄 EN COURS (à finaliser)

### [P1] [Temps: ~85% fait] [Qui: Associée] P1-012-SEO-villes-hardcodees-50% : Correction Global Villes Hardcodées

📁 **Doc** : `.cursor/tasks/P1-012-SEO-villes-hardcodees-50%/`

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

### [P1] [Temps: ~2h30 restant] [Qui: Guillaume] P1-006-SEO-migration-canonicals-100% : Migration Canonicals Complète - 11 villes

📁 **Doc** : `.cursor/tasks/P1-006-SEO-migration-canonicals-100%/`

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


### [P2] [Temps: ~75% fait] [Qui: Guillaume + Associée] P2-013-SEO-internal-linking-homepage-75% : Optimisation Internal Linking → Push Homepage

📁 **Doc** : `.cursor/tasks/P2-013-SEO-internal-linking-homepage-75%/`

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

### [P1] [Temps: 9-11h restant] [Qui: Guillaume + Lucie] P2-014-Metadata-optimisation-100% : Optimisation Metadata SEO Complète (11 villes)

📁 **Doc** : `.cursor/tasks/P2-014-Metadata-optimisation-100%/`

**Type** : SEO / Optimization

**Note** : 🔀 **Fusion TASK-030** (meta descriptions) dans P2-014-Metadata-optimisation-100% (04/11/2025)

**Objectif Complet** :
1. **Phase technique** (80% fait) : Fixes metadata dynamiques, titles, canonicals
2. **Phase contenu** (0% fait) : Optimisation longueur descriptions 150-160 chars

---

**✅ Phase 1 - Fixes Techniques (80% fait, 1h restant)**

**Changements apportés** :
- ✅ Metadata dynamiques (services, contact, 11 villes)
- ✅ Titles optimisés (54 chars)
- ✅ Canonical trailing slash
- ✅ metadataBase corrigé
- ✅ 5 commits GitHub main

**Reste à faire** :
- [ ] Corriger doublons "Ville Ville" dans titles
- [ ] Corriger villes hardcodées (contact pages)
- [ ] Tests SERP 2+ villes
- [ ] Valider metadataBase

**Temps restant Phase 1** : 45min-1h

---

**📋 Phase 2 - Extension Descriptions (0% fait, 8-10h)**

**Contexte** : Checklist SEO révèle descriptions trop courtes (60-140 chars vs 150-160 optimal)

**Actions** :
- [ ] Auditer 220-275 descriptions (11 villes)
- [ ] Réécrire pour 150-160 caractères
- [ ] Templates par type de page (homepage, services, corridors)
- [ ] Sync 11 villes
- [ ] Tests Rich Results
- [ ] Monitoring CTR (baseline + J+14)

**Exemple** :
```
❌ Actuel (138 chars) :
"Cahier des charges précis → 5 devis comparables en 7j..."

✅ Optimisé (158 chars) :
"Préparez votre déménagement à Nice en 30 minutes. Envoyez vos photos, recevez 5 devis fiables sous 7 jours sans appels ni formulaires. L'IA s'occupe de tout."
```

**Temps Phase 2** : 8-10h (Audit 2-3h + Réécriture 4-5h + Implémentation 1-2h + Tests 1h)

---

**Commits GitHub** :
- [x] #c43c0391 : Metadata dynamiques services + contact (11 villes)
- [x] #db77cd26 : Fix seo-builders.ts metadataBase (Marseille)
- [x] #34c00cb2 : Title optimisé 54 chars
- [x] #bc3a95ba : Optimize titles 11 cities
- [x] #59b965f1 : Canonical URL trailing slash GSC

**Definition of Done** :
- [x] 1. Phase technique : Metadata fixes + commits
- [ ] 2. Phase technique : Tests SERP validés
- [ ] 3. Phase contenu : 220-275 descriptions optimisées
- [ ] 4. Phase contenu : Sync 11 villes + monitoring

**Statut** : 🔄 EN COURS (Phase 1: 80%, Phase 2: 0%)

**Temps total restant** : 9-11h

**Démarrée le** : 30-31 octobre 2025

---

### [P2] [Temps: ~70% fait] [Qui: Guillaume] P2-009-SEO-amelioration-70% : Amélioration SEO - Schema.org + Wording

📁 **Doc** : `.cursor/tasks/P2-009-SEO-amelioration-70%/`

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

### [P2] [Temps: 1.5-2h] [Qui: Guillaume] TASK-037 : Configuration HSTS Headers (11 villes)

📁 **Doc** : `.cursor/tasks/[P2]-TASK-037-hsts-headers/`

**Type** : Sécurité / SEO Technique

**Objectif** : Activer HTTP Strict Transport Security (HSTS) sur 11 sites pour renforcer sécurité HTTPS

**Contexte** :
- Checklist SEO Point #101 : HSTS manquant sur 11/11 sites
- Sites déjà 100% HTTPS ✅ → HSTS = couche sécurité supplémentaire
- Configuration CapRover : `add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;`

**Impact SEO** :
- Direct : 🟡 MOYEN (signal confiance, HTTPS déjà actif)
- ROI estimé : <1% leads (vs 10-15% pour meta descriptions)
- **Priorité P2 justifiée** : À faire APRÈS tâches P1 à fort impact

**Actions** :
- [ ] Configuration CapRover HTTP Settings (11 apps)
- [ ] Tests validation curl + navigateurs
- [ ] Documentation procédure

**Statut** : 📋 PENDING

**Note** : Voir `.cursor/tasks/[P2]-TASK-037-hsts-headers/` pour plan détaillé, contexte, décisions techniques

---

## 🟠 META & CTR — Dérivés de P2-014-Metadata-optimisation-100% (Split par cohérence technique)

### [P1] [Temps: 2-3h] [Qui: Guillaume] P1-039-SEO-titles-normalisation-100% : Normalisation Titles 50–60 chars (11 villes)

📁 Doc : `.cursor/tasks/P1-039-SEO-titles-normalisation-100%/`  
**Objectif** : Normaliser les titles à 50–60 caractères, supprimer doublons (ex. “Ville | Déménageurs Ville”), règles par type de page.  
**Actions** :
- [ ] Règles par pageType (home/local/service/corridor/faq/contact/blog)
- [ ] Dédup `/{city}` (LocalPage) + services/contact
- [ ] QA (prévisualisation SERP) 2 villes  
**DoD** : 90% pages money 50–60 chars, 0 doublon ville.
**Statut** : 📋 PENDING

---

### [P1] [Temps: 2-3h] [Qui: Guillaume + Lucie] P1-040-SEO-descriptions-tier2-0% : Descriptions 150–160 chars — Tier 2 (11 villes)

📁 Doc : `.cursor/tasks/P1-040-SEO-descriptions-tier2-0%/`  
**Objectif** : Appliquer templates descriptions optimisées 150–160 chars sur services éco/standard/premium, contact, notre offre.  
**Actions** :
- [ ] Implémenter templates par type de page (déjà validés Phase 2)  
- [ ] Sync 11 villes  
- [ ] QA Rich Results + longueurs  
**DoD** : ≥85% pages money à 150–160 chars.
**Statut** : 📋 PENDING

---

### [P1] [Temps: 1-1.5h] [Qui: Guillaume] P1-041-SEO-price-signals-0% : Price signals (UI + JSON‑LD Service)

📁 Doc : `.cursor/tasks/P1-041-SEO-price-signals-0%/`  
**Objectif** : Renforcer signaux prix (mention “dès …” UI) et, si données fiables, exposer `priceRange`/bornes dans `Service` JSON‑LD.  
**Actions** :
- [ ] Audit des fourchettes fiables par ville/type  
- [ ] UI: mise en avant prix  
- [ ] JSON‑LD: `priceRange` quand éligible  
**DoD** : UI visible + JSON‑LD ajouté là où data fiable, QA OK.
**Statut** : 📋 PENDING

---

### [P2] [Temps: 1-1.5h] [Qui: Guillaume + Lucie] P2-043-SEO-faq-rationalisation-100% : FAQ rationalisation (snippet efficace)

📁 Doc : `.cursor/tasks/P2-043-SEO-faq-rationalisation-100%/`  
**Objectif** : Limiter à 2–4 Q/A très ciblées par page money; éviter surcharge; améliorer pertinence affichée en SERP.  
**Actions** :
- [ ] Sélection Q/A par type de page  
- [ ] Ajustements JSON‑LD  
- [ ] QA Rich Results  
**DoD** : FAQ courte et ciblée sur pages money, QA OK.
**Statut** : 📋 PENDING

---

### [P2] [Temps: 2-3h] [Qui: Guillaume] P2-044-SEO-howto-video-poc-100% : HowTo/Video — POC 2 villes

📁 Doc : `.cursor/tasks/P2-044-SEO-howto-video-poc-100%/`  
**Objectif** : Créer 2 HowTo + 1 VideoObject par 2 villes fortes impressions; mesurer impact rich results.  
**Actions** :
- [ ] Sélection contenus (checklist déménagement {Ville})  
- [ ] Marquage `HowTo`/`VideoObject` + UI  
- [ ] Rich Results Test + monitoring 2–4 semaines  
**DoD** : Rich results obtenus sur POC, plan de déploiement.
**Statut** : 📋 PENDING

---

### [P1] [Temps: 0.5-1h] [Qui: Guillaume] P1-045-Analytics-qa-ctr-100% : QA & Monitoring CTR (outillage + baselines)

📁 Doc : `.cursor/tasks/P1-045-Analytics-qa-ctr-100%/`  
**Objectif** : Baseline CTR par type de page, QA automate (longueurs/head), checkpoints J+14, J+28.  
**Actions** :
- [ ] Baselines GSC (export par pageType)  
- [ ] Intégrer `qa:seo` dans prebuild (déjà fait) + dashboards  
- [ ] Checkpoints calendrier  
**DoD** : baselines stockées, alerte/rituel QA défini, suivi à 2 échéances.
**Statut** : 📋 PENDING

### [P1] [Temps: 1.5-2h] [Qui: Guillaume] P1-038-SEO-bug-faq-global-100% : Corriger Template Literals FAQ (guillemets → backticks)

📁 **Doc** : `.cursor/tasks/[P1]-TASK-038-template-literals-faq/`

**Type** : Bugfix / Qualité Code

**Objectif** : Corriger template literals non interpolés dans faq/page.tsx (11 villes)

**Contexte** :
- Bug détecté lors tests Lille P1-012-SEO-villes-hardcodees-50% (04/11/2025)
- Guillemets doubles `"${city.nameCapitalized}"` au lieu de backticks `` `${city.nameCapitalized}` ``
- Résultat : Contenu page affiche `${city.nameCapitalized}` littéralement au lieu de "Lille"
- Metadata SEO **non affectées** (layout.tsx OK)
- UX dégradée : Questions FAQ affichent du code brut

**Villes affectées** :
- Nice, Lyon, Marseille, Bordeaux, Nantes, Rennes, Rouen, Strasbourg : 16 occurrences chacune
- Lille : 8 occurrences restantes (8/16 déjà corrigées)
- Montpellier, Toulouse : 8 occurrences chacune
- **Total** : ~140 lignes à corriger (11 villes)

**Impact Business** :
- ❌ **UX** : Questions FAQ illisibles (code brut visible)
- ✅ **SEO Metadata** : OK (pas d'impact Google direct)
- ⚠️ **SEO Contenu** : Contenu dégradé (keywords incorrects)
- ⚠️ **Confiance** : Affichage technique nuit à crédibilité
- 🔴 **11 villes** touchées

**Exemple bug** :
```html
<!-- Attendu -->
<summary>Combien de cartons prévoir pour un déménagement à Lille ?</summary>

<!-- Actuel (bug) -->
<summary>Combien de cartons prévoir pour un déménagement à ${city.nameCapitalized} ?</summary>
```

**Actions** :
- [ ] Corriger Nice faq/page.tsx (16 lignes)
- [ ] Corriger Lyon faq/page.tsx (16 lignes)
- [ ] Corriger Marseille faq/page.tsx (16 lignes)
- [ ] Corriger Bordeaux faq/page.tsx (16 lignes)
- [ ] Corriger Nantes faq/page.tsx (16 lignes)
- [ ] Corriger Rennes faq/page.tsx (16 lignes)
- [ ] Corriger Rouen faq/page.tsx (16 lignes)
- [ ] Corriger Strasbourg faq/page.tsx (16 lignes)
- [ ] Finaliser Lille faq/page.tsx (8 lignes restantes)
- [ ] Corriger Montpellier faq/page.tsx (8 lignes)
- [ ] Corriger Toulouse faq/page.tsx (8 lignes)
- [ ] Commit GitHub (1 commit global 11 villes)
- [ ] Tests build 2-3 villes
- [ ] Déploiement + tests production

**Estimations** :
- Correction code : 1h
- Tests + déploiement : 30-45min
- **Total** : 1.5-2h

**Priorité** : **P1** (Important)

**Justification Priorité P1** :
1. 🔴 UX cassée visible sur 11 sites live
2. ⚠️ Contenu FAQ illisible = perte confiance
3. ✅ Metadata SEO OK → pas P0 (pas d'impact ranking immédiat)
4. 📊 Fix rapide (1.5-2h) vs impact visible immédiat
5. 💡 Affichage technique = signal "site mal codé"

**Statut** : 📋 PENDING

**Dépendances** : AUCUNE (indépendant de P1-012-SEO-villes-hardcodees-50%)

**Bloque** : AUCUNE

**Créée le** : 04/11/2025 pendant P1-012-SEO-villes-hardcodees-50%

---

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

**Raison** : Remplacée par P1-006-SEO-migration-canonicals-100% (migration complète directe)

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

## 🔴 PROJET SEO - Audit Checklist 100 Points (04/11/2025)

### ❌ [P0] TASK-029 : Fix Critique Bordeaux SEO — ANNULÉE

📁 **Doc** : `.cursor/tasks/[P0]-TASK-029-fix-bordeaux-seo/`

**Type** : Bugfix Critique / SEO

**Statut** : ❌ **ANNULÉE** (04/11/2025)

**Raison annulation** : **Diagnostic initial erroné**

**Contexte** :
- Checklist initiale : 37.2% (16 OK / 21 KO)
- Tests production (curl) : **94.4%** (17 OK / 1-2 KO mineurs)
- Écart : +57 points (18 faux positifs sur 21)

**Découverte** :
Site Bordeaux est **BIEN CONFIGURÉ SEO** :
- ✅ Robots.txt présent et correct
- ✅ Sitemap XML valide + directive
- ✅ Canonicals corrects
- ✅ HTTPS 100%
- ✅ Title optimal (54 chars)
- ✅ Meta description présente (138 chars)
- ✅ Open Graph complet (10 tags)
- ✅ Twitter Cards présentes
- ✅ Favicon présent (4 tailles)
- ✅ Schema.org présent (4 schemas)
- ✅ Google Analytics installé (GA4 + Plausible)

**Seuls points mineurs** :
- ⚠️ Meta description un peu courte (→ TASK-030)
- ⚠️ Breadcrumbs absents (→ TASK-031)

**Temps économisé** : 4-6h (tâche inutile annulée)

**Rapports créés** :
- `DIAGNOSTIC-CORRECTION.md` (tests détaillés)
- `DECISION-ANNULATION.md` (justification)
- `progress.md` (session diagnostic)

**Leçon** : Ne pas se fier uniquement aux outils automatisés. Toujours valider en production.

---


### ✅ TASK-031 : Breadcrumbs + Schema (11 villes) - TERMINÉ

📁 **Doc** : `.cursor/tasks/[P1]-TASK-031-breadcrumbs-schema/`

**Type** : SEO Technique / UX

**Finalisée le** : 04/11/2025 (1h30)

**Résultat** :
- ✅ 319 pages avec breadcrumbs (90.6% couverture)
- ✅ 3 templates + 6 pages modifiés
- ✅ 11 villes synchronisées (99 fichiers)
- ✅ 12 commits GitHub
- ✅ 9/11 sites validés (2 en déploiement)

**Impact** : Rich snippets SERP attendus (J+7-14), CTR +5-8%

**Statut** : ✅ TERMINÉ

---

### [P1] [Temps: 3-4h] [Qui: Guillaume] P1-032-SEO-search-console-0% : Search Console Configuration (11 villes)

📁 **Doc** : `.cursor/tasks/P1-032-SEO-search-console-0%/`

**Type** : SEO Monitoring / Analytics

**Objectif** : Configurer et exploiter Google Search Console pour les 11 villes

**Contexte** :
- Tous les sites KO : GSC pas relié ou pas exploité
- Impact : pas de monitoring erreurs, indexation, données SEO
- Nécessaire pour valider toutes les optimisations

**Actions** :
- [ ] Vérifier propriété GSC par ville (11 sites)
- [ ] Soumettre sitemap.xml manuellement pour chaque ville
- [ ] Configurer monitoring erreurs crawl
- [ ] Configurer alertes (baisse indexation, erreurs)
- [ ] Créer dashboard de suivi multi-sites
- [ ] Documenter accès (credentials, URL dashboard)
- [ ] Vérifier aucune erreur couverture
- [ ] Test Rich Results par ville

**URLs à soumettre** :
- `https://devis-demenageur-nice.fr/sitemap.xml`
- `https://devis-demenageur-lyon.fr/sitemap.xml`
- ... (×11)

**Priorité** : P1 (monitoring essentiel)

**Statut** : 📋 PENDING

---

### [P2] [Temps: 2-3h] [Qui: Lucie] TASK-033 : Titles Optimisés (3 villes)

📁 **Doc** : `.cursor/tasks/[P2]-TASK-033-titles-optimises/`

**Type** : SEO On-Page / Contenu

**Objectif** : Optimiser longueur titles à 50-60 caractères (Rouen, Lyon, Lille)

**Contexte** :
- 3 villes KO : titles trop longs (>60 chars) ou trop courts (<50 chars)
- Impact SEO : titles tronqués dans SERP ou sous-optimisés

**Actions** :
- [ ] Auditer tous les titles sur Rouen, Lyon, Lille
- [ ] Réécrire pour 50-60 caractères
- [ ] Mots-clés principaux en début
- [ ] Sync 3 villes
- [ ] Valider affichage SERP

**Priorité** : P2 (impact limité, 3 villes seulement)

**Statut** : 📋 PENDING

---

### [P2] [Temps: 4-5h] [Qui: Lucie + Guillaume] TASK-034 : FAQ Schema (9 villes)

📁 **Doc** : `.cursor/tasks/[P2]-TASK-034-faq-schema/`

**Type** : SEO Structured Data

**Objectif** : Ajouter FAQPage schema sur pages FAQ (9 villes)

**Contexte** :
- 9 villes KO : pas de FAQPage schema
- 2 villes OK : Bordeaux, Nice
- Impact SEO : rich snippets FAQ manqués, éligibilité "People Also Ask"

**Villes à traiter** :
Rennes, Nantes, Marseille, Rouen, Strasbourg, Montpellier, Toulouse, Lyon, Lille

**Actions** :
- [ ] Vérifier structure FAQ existante par ville
- [ ] Implémenter FAQPage schema JSON-LD
- [ ] Sync 9 villes
- [ ] Tester Rich Results Test
- [ ] Valider snippets FAQ après 2-4 semaines

**Priorité** : P2 (nice-to-have, rich snippets)

**Statut** : 📋 PENDING

---

### [P2] [Temps: 2-3h] [Qui: Guillaume] TASK-035 : AggregateRating Schema (11 villes)

📁 **Doc** : `.cursor/tasks/[P2]-TASK-035-aggregate-rating/`

**Type** : SEO Structured Data

**Objectif** : Ajouter AggregateRating schema pour avis clients (11 villes)

**Contexte** :
- Tous les sites KO : pas de schema avis clients
- Impact SEO : rich snippets étoiles manqués dans SERP
- Social proof : "⭐⭐⭐⭐⭐ Note moyenne 4,9/5"

**Actions** :
- [ ] Créer AggregateRating schema JSON-LD
- [ ] Rating: 4.9/5, ratingCount: 1200+
- [ ] Intégrer dans layout.tsx ou component
- [ ] Sync 11 villes
- [ ] Tester Rich Results Test
- [ ] Valider étoiles SERP après 2-4 semaines

**Exemple schema** :
```json
{
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "bestRating": "5",
  "ratingCount": "1200"
}
```

**Priorité** : P2 (nice-to-have, visual impact SERP)

**Statut** : 📋 PENDING

---

### [P2] [Temps: 3-4h] [Qui: Lucie] TASK-036 : Liens Sortants Sources (10 villes)

📁 **Doc** : `.cursor/tasks/[P2]-TASK-036-liens-sortants/`

**Type** : SEO E-E-A-T / Contenu

**Objectif** : Ajouter liens vers sources fiables dans articles blog (10 villes)

**Contexte** :
- 10 villes KO : pas de liens sortants vers sources autoritaires
- 1 ville OK : Bordeaux
- Impact SEO : E-E-A-T moins démontré

**Villes à traiter** :
Rennes, Nantes, Marseille, Rouen, Strasbourg, Montpellier, Nice, Toulouse, Lyon, Lille

**Actions** :
- [ ] Identifier 10-20 articles piliers par ville
- [ ] Ajouter 1-3 liens vers sources fiables par article
- [ ] Sources suggérées : service-public.fr, demenager.fr, INSEE, etc.
- [ ] Liens contextuels (pas footer)
- [ ] Sync 10 villes
- [ ] Valider impact E-E-A-T (qualitatif)

**Priorité** : P2 (amélioration qualitative)

**Statut** : 📋 PENDING

---

## 📊 STATS RAPIDES

**⚠️ INCOMPLET** : 0 tâches

**🎉 PROJET 404** : **99% RÉSOLU** ✅
- ✅ 8/11 sites à 0% erreur (archivé)
- ✅ 2847+ liens corrigés sur 3 sessions
- 📋 3 tâches P2 restantes : Lille (28 liens), Toulouse (19 liens), Strasbourg (2 liens)
- 📋 2 tâches optionnelles : P1-404-07-404-redirections-externes-0% (redirections 301), TASK-404-08 (homepage)

**🔴 PRIORITÉ CRITIQUE** : 3 tâches Tier 1 (4.5-5.5h)
- ~~TASK-029 : Fix Bordeaux SEO~~ ❌ ANNULÉE (diagnostic erroné, site OK)
- P1-006-SEO-migration-canonicals-100% : Migration Canonicals bugs (P0, 95% fait, 2h30)
- P1-012-SEO-villes-hardcodees-50% : Villes hardcodées tests (P0, 85% fait, 30min)
- P1-028-SEO-sitemaps-consistency-100% : Sitemaps consistency (P0 SEO, 1.5-2h)

**🟠 PRIORITÉ IMPORTANTE** : 5 tâches Tier 2 (17-21h)
- P2-014-Metadata-optimisation-100% : Metadata SEO Complète (P1, 80%+0%, 9-11h) [Guillaume + Lucie] ← **inclut ex-TASK-030**
- TASK-031 : Breadcrumbs + Schema (P1, 11 villes, 6-8h) [Guillaume]
- P1-032-SEO-search-console-0% : Search Console (P1, 11 villes, 3-4h) [Guillaume]
- P2-013-SEO-internal-linking-homepage-75% : Internal linking validation (P1, 75% fait, 1h)
- P2-009-SEO-amelioration-70% : Schema.org Rich Results (P1, 70% fait, 1h)

**🟡 NICE-TO-HAVE** : 6 tâches P2 (12.5-19h)
- TASK-033 : Titles Optimisés (P2, 3 villes, 2-3h) [Lucie]
- TASK-034 : FAQ Schema (P2, 9 villes, 4-5h) [Lucie + Guillaume]
- TASK-035 : AggregateRating Schema (P2, 11 villes, 2-3h) [Guillaume]
- TASK-036 : Liens Sortants (P2, 10 villes, 3-4h) [Lucie]
- TASK-037 : HSTS Headers (P2, 11 villes, 1.5-2h) [Guillaume] ← NOUVEAU
- TASK-005 : Audit qualité blogs (P3, Lucie - en cours)

**Total backlog actif** : 17 tâches (8 critiques + 9 P2/P3)

**Répartition** :
- Guillaume : 7 tâches critiques/importantes (8.5-13h)
- Lucie : 5 tâches P2/P3 (17-22h)
- Les deux : 3 tâches collaboration (12-15h)

**Tâches modifiées** :
- ❌ TASK-029 annulée (diagnostic erroné, -4-6h)
- 🔀 TASK-030 fusionnée dans P2-014-Metadata-optimisation-100% (optimisation)
- 🆕 TASK-037 créée (HSTS headers, +1.5-2h, P2)

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
