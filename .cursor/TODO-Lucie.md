# TODO ACTIFS - Lucie

> **Instructions Cursor** : Ce fichier contient les tâches EN COURS de Lucie.
> Quand elle te demande d'évaluer :
> - Vérifie qu'elle n'est pas sur trop de tâches en parallèle (max 3 recommandé)
> - Identifie les tâches incomplètes/abandonnées
> - Suggère quoi terminer en priorité
> - Estime le temps restant pour chaque tâche

---

## 🔥 EN COURS MAINTENANT

### [P1]-TASK-060-analyse-alertes-gsc : Analyse Alertes Google Search Console 🔍

**Statut** : 🔄 **EN COURS** (première alerte collectée)  
**Priorité** : P1 (Important - monitoring SEO critique)  
**Temps estimé** : 2-3h  
**Temps investi** : 15min  
**Doc** : `.cursor/tasks/[P1]-TASK-060-analyse-alertes-gsc/`

**Objectif** :
Analyser les messages d'alertes reçus de Google Search Console et traiter les problèmes identifiés.

**Alertes collectées** : 1/?
- ✅ **Alerte #1** : Toulouse - Erreur redirections (indexation bloquée) 🔴

**Actions** :
- [x] Lister toutes les alertes GSC reçues (par site si applicable) → 1 alerte collectée
- [x] Catégoriser alertes (404, indexation, crawl, sécurité, etc.) → Indexation/Redirections
- [ ] Analyser impact business (pages affectées, trafic impacté) → En cours
- [ ] Prioriser actions correctives (P0/P1/P2) → À déterminer après analyse GSC
- [ ] Créer plan d'action pour chaque alerte critique
- [ ] Documenter décisions (corriger vs ignorer vs monitorer)
- [ ] Créer tâches suivantes si actions nécessaires

**Alerte #1 - Toulouse** :
- **Problème** : "Erreur liée à des redirections" → Pages non indexées
- **Action requise** : Ouvrir GSC, analyser rapport d'indexation, identifier URLs affectées
- **Priorité estimée** : P0/P1 (selon nombre de pages)

**Prochaines actions** :
1. ✅ Accéder à GSC pour Toulouse
2. ✅ Ouvrir le rapport d'indexation
3. ✅ Analyser les détails de l'erreur "redirections"
4. ✅ Documenter les URLs affectées
5. ✅ Créer plan d'action
6. ✅ **Corriger Toulouse** (redirection supprimée, commit `5f9b2ae8`)
7. ✅ **Corriger 10 autres villes** (correction préventive, commit global créé)
8. ✅ Push vers GitHub ✅
9. ⏳ Deploy toutes les villes (11 villes) - CapRover
10. ⏳ Vérifier GSC dans 48h pour confirmer disparition erreurs

**Découverte importante** :
- ⚠️ Même problème dans 10 autres villes (bordeaux, strasbourg, rouen, rennes, lille, lyon, marseille, montpellier, nantes, nice)
- ✅ **Correction préventive appliquée** : 11 villes corrigées au total
- Document créé : `DECOUVERTE-MULTI-SITES.md` (analyse complète)

**Dernière activité** : 06/01/2026 (11 villes corrigées, commits créés)

**Alerte #2 - Toulouse (Améliorations GSC)** :
- **Problème** : FAQ et Extraits d'avis = 0 valides
- **Analyse** : 
  - FAQ : Structure OK, probablement pas encore validée par Google
  - Extraits d'avis : ❌ Manque Review individuels (seulement AggregateRating présent)
- **Action requise** : ✅ Ajouter Review Schema individuels (P1, 2-3h) - **FAIT**
- **Correction** : 5 Review ajoutés dans StructuredData.tsx (commit `f45ffb5c`, pushé)
- **Test** : ✅ 3 éléments valides détectés par Google Rich Results Test
- **Document** : `ANALYSE-ALERTE-02-TOULOUSE-AMELIORATIONS.md`
- **Prochaine étape** : Déployer Toulouse + vérifier GSC dans 1-2 semaines

**Alerte #3 - Toulouse (Indexation GSC)** :
- **Problème** : 1,146 pages non indexées
- **Priorités** :
  - 🔴 **P0** : Erreur serveur (5xx) - **791 pages** (CRITIQUE)
  - 🔴 **P1** : 404 - **312 pages** (CRITIQUE SEO)
  - 🟠 **P2** : Redirections - 30 pages
  - 🟡 **P2** : Erreur redirections - 4 pages (déjà corrigé)
- **Action requise** : 
  - ✅ **Tests effectués** : 5 URLs testées → **Problème CORRIGÉ** (404/200 au lieu de 5xx)
  - ⚠️ **Dernier crawl Google : 14 octobre** (il y a ~3 mois) → Google n'a pas encore recrawlé
  - 💡 **Meilleure approche** : **Resoumettre sitemap dans GSC** (plus efficace que réindexation URL par URL)
  - ✅ **Vérification sitemap Toulouse** : Sitemap propre (114 URLs, 0 invalides) ✅
  - ✅ **Vérification sitemaps toutes villes** : 11/11 accessibles ✅
  - ⚠️ **Erreur Rennes détectée** : "Erreur HTTP générique" du 8 novembre - Sitemap fonctionne maintenant ✅
  - ⚠️ **Pages non indexées Marseille** : 1,2k pages (5 motifs) - Guide d'analyse créé ✅
  - ⚠️ **Nice - Aucun clic** : Diagnostic créé ✅ - Site OK techniquement, vérifier GSC (sitemap soumis ? indexation ?)
  - ✅ **Action GSC principale** :
    - ✅ Resoumettre sitemaps dans GSC pour **11 villes** ✅ **FAIT** (2025-01-06)
  - ⏳ Analyser motifs non-indexation Marseille (guide disponible)
  - ✅ **Gérer 404** : Décision d'attendre recrawl Google ✅ (2025-01-06) - Vérifier évolution dans 1-2 semaines
  - ⏳ Vérifier statut sitemaps dans 1-2 jours
  - ⏳ Vérifier mise à jour erreurs 5xx dans 1-2 semaines
- **Documents** : 
  - `ANALYSE-ALERTE-03-TOULOUSE-INDEXATION.md`
  - `DIAGNOSTIC-5XX-TOULOUSE.md`
  - `OPTIONS-GSC-5XX.md` (analyse toutes options)

---

### [P1]-TASK-054-404-marseille-1127-pages : Fix 1,127 Pages 404 Marseille 🚨 CRITIQUE SEO

**Priorité** : P1 (Critique SEO - Impact ranking)  
**Type** : Bug Fix / SEO / Cleanup  
**Créé le** : 2025-11-05  
**Temps estimé** : 3-4h

**Problème détecté** :
- 🔴 **1,127 pages 404** sur `devis-demenageur-marseille.fr` (Google Search Console)
- 🔴 Impact SEO majeur : Perte de ranking potentielle
- 🔴 Pages non indexées : 1,180 total (1,127 = 404, 20 = redirections, 18 = erreurs serveur)
- 🔴 Pages indexées : 129 seulement (vs ~1,300 attendues)

**Causes probables** :
1. Articles de blog supprimés/restructurés mais toujours dans sitemap ou indexés par Google
2. URLs obsolètes dans anciens sitemaps
3. Redirections cassées ou manquantes
4. Pages quartiers/corridors renommées sans redirections

**Actions à faire** :

**Phase 1 - Diagnostic (30 min)** ✅ FAIT :
- ✅ Liste URLs 404 reçue (100+ URLs analysées)
- ✅ Patterns identifiés :
  1. **Cross-city URLs (80% des 404)** : `/blog/demenagement-nice/...`, `/blog/demenagement-lille/...` etc.
     → Liens internes pointent vers articles d'autres villes au lieu de Marseille
  2. **Slug malformé** : `/blog/demenagement-marseille/$slug` (fichier avec slug littéral `$slug`)
  3. **Catégories obsolètes** : `/deménagement-voiture/`, `/demenagement-escalier/`, etc.
  4. **Trailing slash** : `/devis-demenagement-marseille/` (peut-être normalisé)

**Phase 2 - Correction (2h)** :
- [x] **2.3 Redirections 301** ✅ FAIT (135+ redirections ajoutées) :
  - ✅ Cross-city URLs → Pages équivalentes Marseille (nice, lille, montpellier, etc.)
  - ✅ Catégories obsolètes → Blog homepage ou catégories valides
  - ✅ URL malformée `$slug` → Redirect vers blog marseille
  - ✅ URL bizarre `/marseille/Marseille/` → Redirect vers quartiers
- [ ] **2.1 Cross-city links** : Scanner tous les markdown pour liens vers autres villes (OPTIONNEL - redirections gèrent déjà le problème)
  - Pattern à chercher : `[texte](/blog/demenagement-[autre-ville]/...`
  - Corriger en : `[texte](/blog/demenagement-marseille/...` OU supprimer lien si article n'existe pas
- [ ] **2.2 Slug malformé** : Vérifier fichier avec `slug: "$slug"` dans frontmatter (redirection ajoutée mais mieux corriger source)
- [ ] **2.4 Vérifier sitemap** : S'assurer que seuls articles existants sont référencés
- [ ] **2.5 Quartiers/Corridors** : Vérifier URLs `cityData.ts` valides

**Phase 3 - Nettoyage Google (30 min)** :
- [ ] Supprimer URLs obsolètes via Search Console (si pages vraiment supprimées)
- [ ] Soumettre nouveau sitemap à Google Search Console
- [ ] Demander réindexation des pages valides

**Phase 4 - Prévention (30 min)** :
- [ ] Vérifier autres villes (Lille, Toulouse, Strasbourg mentionnées dans backlog 404)
- [ ] Documenter pattern pour éviter récidive
- [ ] Ajouter vérification dans CI/CD si possible

**Fichiers à vérifier** :
- `sites/marseille/app/sitemap.ts` (sitemap generation)
- `sites/marseille/content/blog/**` (articles blog)
- `sites/marseille/next.config.mjs` (redirections)
- `sites/marseille/lib/cityData.ts` (quartiers/corridors)

**Impact attendu** :
- ✅ Réduction 404 → 0 ou < 10 pages légitimes
- ✅ Pages indexées ↑ de 129 → ~1,300
- ✅ Ranking SEO amélioré
- ✅ Confiance Google restaurée

**Statut** : 📋 TODO  
**Documentation** : À créer `.cursor/tasks/[P1]-TASK-054-404-marseille-1127-pages/`

---

### ✅ [P1]-P1-050-404-fix-hardcoded-nice-links-100% : Fix Liens "nice" Hardcodés (88 URLs 404) ✅ TERMINÉ

**Priorité** : P1 (Important - Bug détecté)  
**Type** : Bug Fix / Liens Internes

**Objectif** : Corriger les liens hardcodés "nice" dans FAQ et Services → Résoudre 88 URLs 404

**Documentation** : `.cursor/tasks/[P1]-TASK-050-fix-hardcoded-nice-links/`

**Détecté par** : Guillaume via Google Search Console  
**Créé le** : 2025-11-05  
**Terminé le** : 2025-11-05 (par Guillaume)  
**Temps investi** : 45 min

**Problème** :
- 🔴 22 fichiers avec liens hardcodés "nice" (au lieu de dynamique)
- 🔴 88 URLs 404 créées (66 FAQ/Services + 22 homepage blog)
- 🔴 Bug introduit ce matin (commits `355478fa` et `7ae8f943`)

**Fichiers corrigés** :
- ✅ `sites/{ville}/app/faq/page.tsx` (10 sites sauf Nice) - Commit `e8d2c144`
- ✅ `sites/{ville}/app/services/page.tsx` (10 sites sauf Nice) - Commit `e8d2c144`
- ✅ `sites/{ville}/app/page.tsx` (11 sites homepage) - Commit `4e118c7a`

**Solution appliquée** :
```tsx
// AVANT (bugué)
<a href="/quartiers-nice/">

// APRÈS (corrigé)
<a href={`/quartiers-${city.slug}/`}>
```

**Résultat** :
- ✅ 88 URLs 404 résolues
- ✅ 31 fichiers corrigés (20 FAQ/Services + 11 homepages)
- ✅ 11 sites déployés
- ⏳ En attente validation crawler GSC

**Statut** : ✅ TERMINÉ (2025-11-05)

---

### [P1]-TASK-061-fix-hardcoded-nice-inventaire-ia : Fix Liens "nice" Hardcodés dans inventaire-ia/page.tsx (10 URLs 404)

**Priorité** : P1 (Important - Bug détecté)  
**Type** : Bug Fix / Liens Internes

**Objectif** : Corriger les liens hardcodés "nice" dans inventaire-ia/page.tsx → Résoudre 10 URLs 404

**Documentation** : `.cursor/tasks/[P1]-TASK-061-fix-hardcoded-nice-inventaire-ia/`

**Détecté par** : Lucie (vérification P1-050)  
**Créé le** : 2025-01-06  
**Temps estimé** : 20 min

**Problème** :
- 🔴 11 fichiers avec lien hardcodé "nice" (au lieu de dynamique)
- 🔴 10 URLs 404 créées (11 sites - Nice = 10 sites avec bug)
- 🔴 Lien CTA `/devis-demenagement-nice/` hardcodé dans section finale

**Fichiers à corriger** :
- `sites/{ville}/app/inventaire-ia/page.tsx` (11 sites)

**Cause** : Copier/coller depuis Nice sans remplacer "nice" par `{city.slug}`

**Solution** :
```tsx
// AVANT (bugué)
<a href="/devis-demenagement-nice/">

// APRÈS (corrigé)
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';

const city = getCityDataFromUrl(env.SITE_URL);
<a href={`/devis-demenagement-${city.slug}/`}>
```

**Checklist** :
- [x] Lire documentation complète (README.md)
- [x] Corriger 11 fichiers inventaire-ia/page.tsx
  - [x] Ajouter imports `getCityDataFromUrl` et `env`
  - [x] Ajouter `const city = getCityDataFromUrl(env.SITE_URL);`
  - [x] Remplacer `href="/devis-demenagement-nice/"` par `href={`/devis-demenagement-${city.slug}/`}`
- [ ] Tests local (build OK)
- [ ] Commit + Push
- [x] Vérifier 0 lien hardcodé restant ✅

**Impact** :
- Résout 10 URLs 404
- Améliore UX
- Nettoie GSC

**Statut** : 📋 TODO

---

### [P2]-P1-048-CI-CD-anti-404-termine : Optimisation Page /services/ — Pricing + SEO ✅ COMPLÉTÉ

**Priorité** : P2 (Normal - Amélioration UX/SEO)  
**Type** : SEO / UX / Contenu

**Objectif** : Corriger incohérences pricing + Quick Wins SEO

**Démarrée le** : 2025-11-05  
**Complétée le** : 2025-11-05  
**Temps réel** : 2h15 (vs 3-4h estimé) ⚡

**Résultats** :

**Phase 1 - Pricing Fix** :
- ✅ Prix hub corrigés : 450€→280€ (Éco), 750€→600€ (Std)
- ✅ Labels contextuels ajoutés : "Studio local" vs "T2 local"
- ✅ Cohérence hub ↔ pages détails restaurée

**Phase 2 - SEO Quick Wins** :
- ✅ Titles raccourcis < 60 chars (4 pages × 11 villes)
  * Hub : "Services Déménagement Nice — 3 Formules" (48 chars)
  * Éco : "Déménagement Économique Nice — Dès 280€" (45 chars)
  * Std : "Déménagement Standard Nice — Dès 600€" (43 chars)
  * Premium : "Déménagement Premium Nice — Dès 1200€" (44 chars)
- ✅ FAQ section ajoutée (5 Q&A + Schema FAQPage)
- ✅ Maillage interne (blog + quartiers + FAQ)
- ✅ Schema.org Service + OfferCatalog (3 offers avec prix)

**Phase 3 - Sync & Validation** :
- ✅ 44 fichiers synchronisés (11 villes)
- ✅ Commit + push GitHub (SHA: `355478fa`)

**Impact attendu** :
- CTR ↑ 5-10% (280€ vs 450€ plus attractif)
- Rich snippets FAQ activés (SERP)
- Link juice ↑ (maillage interne)
- SERP display amélioré (titles optimisés)

**Statut** : ✅ COMPLÉTÉ (05/11/2025)

---

## 🔥 EN COURS MAINTENANT

### [P0]-P0-046-SERP-favicon-logo-en-pause : Logo SERP / Favicons — CTR Critique ✅ TECHNIQUE COMPLÉTÉ

**Priorité** : P0 (Business Critical)  
**Type** : SEO / Investigation + Fix

**Objectif** : Faire apparaître systématiquement le logo dans résultats Google (SERP)

**Documentation** : `.cursor/tasks/P0-046-SERP-favicon-logo-en-pause/`

**Démarrée le** : 2025-11-05  
**Complétée le** : 2025-11-05  
**Temps réel** : 1h15 (vs 1.5-3h estimé) ⚡

**Résultats** :
- ✅ Favicons 48x48 créés (11 villes) — CRITIQUE pour SERP
- ✅ favicon.ico régénéré (0 bytes → 2.7K valide)
- ✅ URLs absolues implémentées
- ✅ Sync 11 villes (55 fichiers modifiés)
- ✅ Commit + push GitHub (SHA: `ffccc050`)

**Root cause identifiée** :
- ❌ Favicon 48x48 MANQUANT (Google SERP requirement)
- ❌ favicon.ico vide (0 bytes)
- ⚠️ URLs relatives vs absolues

**Impact attendu (J+7-14)** :
- Logo visible SERP Google (mobile + desktop)
- CTR +5-15% (études Google)
- Leads +50-150/mois (11 villes)

**Statut** : ✅ TECHNIQUE COMPLÉTÉ (attente indexation Google 7-14j)

**Next check** : 12/11/2025 (J+7) → Vérifier logo SERP

**Rapport** : `.cursor/tasks/P0-046-SERP-favicon-logo-en-pause/RAPPORT-SESSION-05-NOV.md`

---

### [P2]-TASK-033 : Titles Optimisés (3 villes) ✅ COMPLÉTÉ

**Priorité** : P2 (Normal)  
**Type** : SEO On-Page / Contenu

**Objectif** : Optimiser longueur titles à 50-60 caractères (Rouen, Lyon, Lille)

**Résultats** :
- ✅ Titles raccourcis (suppression " | Moverz")
- ✅ Corridor pages : 60→53 chars
- ✅ Estimation Rapide : 70→54 chars
- ✅ 3 villes synchronisées (Rouen, Lyon, Lille)
- ✅ Commit + push GitHub

**Temps réel** : 35 min (vs 2-3h estimé) ⚡

**Statut** : ✅ COMPLÉTÉ (05/11/2025)

---

### [P1]-P1-047-Wording-offre-refonte-termine : Fix "Duplicate FAQPage field" (11 sites) ✅ TECHNIQUE COMPLÉTÉ

**Priorité** : P1 (Important - Bloque rich snippets)  
**Type** : SEO / Structured Data / Fix

**Objectif** : Corriger erreur "Champ 'FAQPage' en double" détectée par Google

**Démarrée le** : 2025-11-05  
**Complétée le** : 2025-11-05  
**Temps réel** : 45 min (vs 2-3h estimé) ⚡

**Root cause identifiée** :
- ❌ FAQPage déclaré sur `/` (homepage - LocalMoneyFAQ)
- ❌ FAQPage déclaré sur `/faq` (page dédiée)
- = Duplicate détecté par Google (Lyon: 0 valid)

**Résultats** :
- ✅ Homepage `/` → Question standalone (sans FAQPage)
- ✅ Page `/faq` → FAQPage unique conservé
- ✅ Sync 11 villes (11 fichiers modifiés)
- ✅ Commit + push GitHub (SHA: `550654e0`)

**Statut** : ✅ TECHNIQUE COMPLÉTÉ (attente indexation Google 3-7j)

**⚠️ ACTION MANUELLE REQUISE** :
Tu dois demander la réindexation sur Search Console (11 URLs `/faq`) :
1. Search Console → Inspection de l'URL
2. Tester `/faq` pour chaque ville
3. Cliquer "Demander l'indexation"

**URLs à réindexer** :
- https://devis-demenageur-nice.fr/faq
- https://devis-demenageur-lyon.fr/faq
- https://devis-demenageur-marseille.fr/faq
- https://devis-demenageur-toulouse.fr/faq
- https://devis-demenageur-bordeaux.fr/faq
- https://devis-demenageur-lille.fr/faq
- https://devis-demenageur-strasbourg.fr/faq
- https://devis-demenageur-nantes.fr/faq
- https://devis-demenageur-rennes.fr/faq
- https://devis-demenageur-rouen.fr/faq
- https://devis-demenageur-montpellier.fr/faq

**Next check** : 12/11/2025 (J+7) → Vérifier Search Console "FAQ valides" passé de 0→1

---

## ✅ TÂCHES RÉCEMMENT FINALISÉES (05/11/2025)

### [P3]-TASK-005 : Audit Qualité Blogs - Amélioration Contenu ✅

**Résultats** :
- ✅ 80 articles optimisés (8 villes) - **266% objectif dépassé !**
- ✅ 323 FAQ ajoutées (rich snippets Google)
- ✅ 180+ liens internes stratégiques
- ✅ Fix bug markdown "pouces doubles" (11 villes)
- ✅ 8 commits GitHub pushés

**Villes** : Nice, Lyon, Marseille, Toulouse, Bordeaux, Lille, Strasbourg, Montpellier  
**Temps** : 8h30 (vs 10-15h estimé) ⚡  
**Rapport** : `.cursor/tasks/[P3]-TASK-005-audit-qualite-blogs/RAPPORT-FINAL.md`

---

### [P2]-TASK-024 : Fix bouton "Voir tous les articles" blog ✅

**Résultats** :
- ✅ Composant client `SatelliteArticlesSection.tsx` créé
- ✅ État `showAll` pour toggle 9 vs tous articles
- ✅ Sync 11 villes (22 fichiers modifiés)
- ✅ Commit GitHub `c2fb392` pushé

**Temps** : 25 min (vs 30 min estimé) ⚡  
**Documentation** : `.cursor/tasks/[P2]-TASK-024-fix-bouton-blog/README.md`

---

## 📅 PLANIFIÉ DEMAIN (2 NOV 2025)

### En attente de Guillaume

**TASK-404-02** (Guillaume - Technique) doit être terminée en priorité avant les suivantes.

Une fois TASK-404-02 terminée :

---

## 📅 APRÈS-DEMAIN (3 NOV 2025) - Selon avancement Guillaume

### TASK-404-03 : Décision Stratégique 104 Articles (1h) [Guillaume + Lucie]

**Priorité** : P1 (décision business importante)  
**Type** : Stratégie / Décision (les deux ensemble)

**Objectif** : DÉCIDER pour 104 articles manquants → Créer OU Rediriger

**Ton rôle (Lucie - Contenu/SEO)** :
- Analyser pertinence contenu (intérêt utilisateur)
- Évaluer potentiel SEO (volume recherche estimé)
- Proposer structure articles si création
- Identifier piliers existants pour redirections

**Rôle Guillaume (Technique)** :
- Valider faisabilité technique
- Définir slugs/catégories si création
- Mapper redirections 301 si applicable

**Commande démarrage** :
```bash
"Cursor, je démarre TASK-404-03" (dire à Guillaume quand prête)
```

---

### TASK-404-04 : Création Contenu Manquant (20-30h) OPTIONNEL [Lucie]

**Priorité** : P2 (SEULEMENT si décidé en TASK-404-03)  
**Type** : Production contenu (100% Lucie)

**Objectif** : Créer les articles manquants (si décision = créer)

**Actions** :
- Production par batch (10 articles/session)
- Qualité minimum : 8/10 (standard satellites)
- Frontmatter aligné structure existante
- Maillage interne vers piliers

**Estimation** :
- 104 articles × 15 min/article = ~26h
- Répartir sur plusieurs sessions (10 articles/batch = 2h30/batch)

**Note** : Cette tâche est OPTIONNELLE. Si décision = rediriger, cette tâche est annulée.

---

## 📋 TÂCHES LUCIE DANS PROJET 404

```
📋 TASK-404-03 : Décision (1h) [Avec Guillaume]
📋 TASK-404-04 : Création (20-30h) OPTIONNEL [Lucie seule]
📋 TASK-404-06 : Validation (1h) [Possible pour Lucie]
📋 TASK-404-08 : Homepage (2h30) [Possible pour Lucie selon nature bugs]
📋 TASK-404-09 : Validation finale (2-3h) [Avec Guillaume]

Total Lucie : 4h30 minimum, 34h30 maximum (si création contenu)
```

---

## 💡 IDÉES / DÉCOUVERTES

<!-- Tâches trouvées en passant, à trier dans le backlog -->
<!-- Commande : "Cursor, crée la tâche [description]" pour les ajouter au backlog -->

*Aucune idée en attente*

---

## ✅ FAIT RÉCEMMENT

*En attente de tâches assignées - Projet 404 en cours (Guillaume)*

---

## 🎯 WORKFLOW RECOMMANDÉ

### Matin
1. `"Cursor, montre les INCOMPLET"` → Vérifier s'il y a des tâches prioritaires
2. `"Cursor, évalue mon TODO + le backlog"` → Décider quoi faire
3. `"Cursor, je démarre TASK-XXX"` → Cursor crée la doc et prépare la tâche

### Pendant le travail
- `"Cursor, log ma session pour TASK-XXX : [ce que j'ai fait]"` → Documenter régulièrement
- Si découverte d'une tâche → Ajouter dans "IDÉES/DÉCOUVERTES", trier plus tard

### Interruption / Changement de priorité
- `"Cursor, je mets TASK-XXX en pause : [raison]"` → Sauvegarder le contexte
- Cursor marque ⚠️ INCOMPLET avec notes détaillées

### Fin de tâche
- `"Cursor, finalise TASK-XXX"` → Cursor vérifie la Definition of Done
- Si critères validés → Archive dans DONE.md
- Si critères manquants → Cursor explique ce qui reste à faire

### Soir
- Vérifier que toutes les sessions sont loggées
- Mettre en pause les tâches non terminées avec contexte détaillé

---

## 📋 COMMANDES RAPIDES

```bash
# Évaluer les priorités
"Cursor, évalue le backlog"

# Créer une tâche
"Cursor, crée la tâche [description]"

# Démarrer une tâche
"Cursor, je démarre TASK-XXX"

# Logger une session
"Cursor, log ma session pour TASK-XXX : [fait]"

# Mettre en pause
"Cursor, je mets TASK-XXX en pause"

# Abandonner
"Cursor, j'abandonne TASK-XXX : [raison]"

# Finaliser
"Cursor, finalise TASK-XXX"

# Voir les incomplets
"Cursor, montre les INCOMPLET"
```

---

## 📊 PROGRESSION PROJET 404 (Vue Lucie)

```
✅ TASK-404-01 : Audit (Guillaume) ✅ TERMINÉ
🔄 TASK-404-02 : Harmonisation technique (Guillaume) ← EN COURS DEMAIN

⏭️ TASK-404-03 : Décision (Guillaume + Lucie) ← TA PROCHAINE TÂCHE
📋 TASK-404-04 : Création contenu (Lucie) OPTIONNEL si décision = créer
📋 TASK-404-05 : Correction AUTO (Guillaume)
📋 TASK-404-06 : Validation (Guillaume ou Lucie)
📋 P1-404-07-404-redirections-externes-0% : Redirections (Guillaume)
📋 TASK-404-08 : Homepage (Guillaume ou Lucie)
📋 TASK-404-09 : Validation finale (Guillaume + Lucie)
```

**Ta contribution** : 
- Session stratégie (1h) avec Guillaume
- Production contenu si nécessaire (20-30h optionnel)
- Validation qualité (2-3h tests)

**Total estimé** : 4h30 minimum, 34h30 maximum

---

*Dernière mise à jour : 2025-11-02*


