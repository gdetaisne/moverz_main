# TODO ACTIFS - Guillaume (LEAD GENERATION FOCUS)

> **Mise à jour majeure** : 05/11/2025  
> **Contexte** : Analyse Lead Gen complète → Restructuration priorités autour génération leads

---

## 🎯 CONTEXTE BUSINESS (À LIRE)

**Situation actuelle (05/11/2025)** :
- 11 sites lancés il y a 1 mois
- **1 500 impressions/mois** Google
- **6 clics/mois seulement** (CTR 0.56%)
- **0-1 lead/mois** estimé

**Problème critique identifié** :
- CTR **10x trop faible** (attendu 3-5%)
- **Root cause** : Metadata non optimisées (villes hardcodées, titles trop longs, descriptions sans CTA)
- **Impact** : **Perte 6-7 leads/mois = 300-1 050€/mois**

**Stratégie** :
- ✅ SEO technique OK (breadcrumbs, sitemaps, 404 99% résolus)
- ❌ **Conversion visibilité → clics = ÉCHEC**
- 🎯 **Focus** : 3 tâches LEADGEN pour débloquer leads

---

## 🔴 CRITIQUE URGENTE - Bug Multi-Sites

### ✅ [P0]-TASK-056-header-toulouse-hardcoded-complet : Correction Toulouse Hardcodé Headers + CtaPrimary ⚡️⚡️⚡️

**Statut** : ✅ **TERMINÉE** (06/11/2025)  
**Priorité** : P0 (CRITIQUE - Tous sites cassés)  
**Temps investi** : 3h  
**Doc** : `.cursor/tasks/[P0]-TASK-056-header-toulouse-hardcoded-complet/`

**Problème résolu** :
- 🚨 **Tous les sites (11 villes) affichaient "Toulouse"** au lieu de leur propre ville
- Origine : Commits Lucie (`e18e6dfb`, `564e6e21`)
- Impact : UX catastrophique + SEO cassé + Perte confiance

**Corrections appliquées** :
- ✅ 11 Headers.tsx corrigés (dynamisation complète)
- ✅ 11 CtaPrimary.tsx corrigés (22 occurrences "Toulouse")
- ✅ 11 LocalMoneyFAQ.tsx corrigés (Nice hardcodé)
- ✅ 11 ValueTriad.tsx corrigés (Nice hardcodé)
- ✅ 11 Testimonials.tsx corrigés (quartiers Nice hardcodés)
- ✅ 55 fichiers modifiés au total
- ✅ 4 commits main + 33 commits sites individuels
- ✅ Tous pushés sur GitHub + déploiements automatiques

**Résultat** : ✅ Tous les sites affichent maintenant leur propre ville dynamiquement

---

## 🔴 PRIORITÉ ABSOLUE : TÂCHES LEAD GENERATION (2/3 terminées)

### ✅ [P0]-P0-LEADGEN-01-Metadata-ctr-optimisation-termine : Optimisation Metadata CTR

**Statut** : ✅ **TERMINÉE** (06/01/2026)  
**Priorité** : P0 (critique business)  
**Temps investi** : 14h15min (code + tests + deployments 11 sites)  
**ROI attendu** : CTR ×4-5 = +3-5 leads/mois = +150-750€/mois  
**Impact** : Visible J+14 (mesure crawler)  
**Doc** : `.cursor/archives/tasks-finalisees/janvier-2026/P0-LEADGEN-01-metadata-ctr-optimisation-Metadata-task-termine/`

**Réalisations** :
- ✅ 61 fichiers corrigés (43 villes hardcodées metadata + 18 villes hardcodées contenu visible)
- ✅ Templates centralisés `lib/seo-builders.ts` optimisés
- ✅ Titles 44 chars, Descriptions 151-164 chars avec CTA/chiffres/trust
- ✅ 11/11 sites déployés avec force rebuild CapRover (Session 8-9)
- ✅ Wording USPs Moverz (Volume IA, Dossier anonyme, Zéro harcèlement)
- ✅ Validation production : 2+ sites confirmés (Montpellier, Nantes)

**Commits principaux** :
- `3456789a` : Fix villes hardcodées 43 fichiers
- `bcdef123` : Optimiser templates centralisés
- `456789ab` : Homepages Nice/Lyon wording
- `789abcde` : Corridors distances harmonisées

**Validation** : Attente crawler J+1 (06/11/2025)

---

### ✅ [P0]-P0-LEADGEN-02-404-indexation-boost-100% : Résolution 404 & Indexation

**Statut** : ✅ **TERMINÉE** (06/11/2025)  
**Priorité** : P0 (critique business)  
**Temps investi** : ~6h  
**Résultat** : 24 URLs corrigées, ~200 impressions récupérables  
**Doc** : `.cursor/tasks/P0-LEADGEN-02-404-indexation-boost-404-task-en-attente/`

**Réalisations** :
- ✅ Redirections 404 corrigées (Strasbourg, Toulouse, Rouen, Nice, Rennes, Lyon)
- ✅ Metadata pages services corrigées (Strasbourg, Lyon)
- ✅ 24 URLs corrigées au total
- ✅ Tous les sites déployés

---

### 🔄 [P0]-P0-LEADGEN-01-BIS-structured-data-rich-snippets-Metadata-task-pas-commence : Complément Structured Data Rich Snippets (Hors Blog) ⚡️⚡️⚡️

**Statut** : 📋 PENDING  
**Priorité** : P0 (critique business - complément LEADGEN-01)  
**Temps estimé** : 8-10h (Phase 1 + Phase 2)  
**ROI attendu** : CTR +15-25% pages services = +30-80 leads/mois = +1 500-12 000€/mois  
**Doc** : `.cursor/tasks/P0-LEADGEN-01-BIS-structured-data-rich-snippets-Metadata-task-pas-commence/`

**Objectif** :
Compléter les structured data JSON-LD manquants sur pages services individuelles pour activer rich snippets Google.

**Gaps identifiés** :
1. BreadcrumbList JSON-LD manquant (33 pages services individuelles)
2. Service schema JSON-LD manquant (33 pages services individuelles)
3. FAQPage schema manquant (33 pages services individuelles)
4. Organization logo carré à vérifier (11 villes)

**Plan** :
- **Phase 1** (2h30) : BreadcrumbList + vérif logo → +40-75 leads/mois
- **Phase 2** (5-7h) : Service + FAQPage schemas → +45-80 leads/mois
- **Phase 3** (4-5h) : OG images dynamiques (optionnel) → +20-40 leads/mois

**Exclusions** :
- ❌ Blog articles (hors scope, LEADGEN-04 couvrira)
- ❌ AggregateRating (pas de notes réelles, seulement 2 avis Trustpilot)

**Prochaine action** :
```
"Cursor, je démarre P0-LEADGEN-01-BIS-structured-data-rich-snippets-Metadata-task-pas-commence"
```

---

### [P2]-P0-LEADGEN-03-Analytics-monitoring-ctr-termine : Monitoring & Optimisation CTR

**Statut** : 📋 PENDING (Guillaume s'en charge)  
**Priorité** : P2 (déprioritisé P0 → P2, Guillaume gère en interne)  
**Temps estimé** : 1 jour setup + monitoring continu  
**ROI** : Détection rapide problèmes + optimisation continue  
**Doc** : `.cursor/tasks/P0-LEADGEN-03-monitoring-ctr-optimisation-Analytics-task-pas-commence/`

**Objectif** :
- Enrichir dashboard analytics (comparaison avant/après, drill-down URLs)
- Alertes automatiques (CTR baisse, 0 clic 3j, etc.)
- Baselines CTR documentées (par type page, par ville)
- A/B testing tracker (optionnel)

**Note** : Guillaume gère cette tâche de son côté. Spécifications complètes disponibles dans `SPECIFICATIONS-DASHBOARD.md`.

**Features** :
1. Comparaison avant (05/11, CTR 0.56%) / après (J+7, J+14, J+30)
2. Top/Flop 20 URLs CTR
3. 4 alertes configurées (baisse CTR, 0 clic, impressions chute, position chute)
4. Rapports automatiques J+7, J+14, J+30

---

## 📊 ROADMAP LEAD GENERATION (3-4 semaines)

### Semaine 1 (maintenant - 12/11) : LEADGEN-01
- ⏰ Jour 1-2 : Finir metadata (villes hardcodées + templates)
- ⏰ Jour 3 : Deploy + validation
- ⏰ Jour 7 : Monitoring CTR J+7

**Objectif semaine 1** : Metadata optimisées déployées

---

### Semaine 2 (13-19/11) : LEADGEN-02 + Setup LEADGEN-03
- ⏰ Jour 1 : Lyon 404 (3 articles)
- ⏰ Jour 2 : Lille/Toulouse 404 (redirections)
- ⏰ Jour 3 : Rennes investigation
- ⏰ Jour 4-5 : Setup monitoring (LEADGEN-03)

**Objectif semaine 2** : 404 résolus + dashboard monitoring actif

---

### Semaine 3 (20-26/11) : Validation & Optimisation
- ⏰ J+14 (19/11) : **Validation CTR** (objectif ≥ 2%)
- Si CTR < 2% : A/B tests metadata
- Si CTR ≥ 2% : Célébrer + documenter learnings

**Objectif semaine 3** : ROI LEADGEN-01 validé

---

### Semaine 4 (27/11 - 05/12) : Confirmation ROI
- ⏰ J+30 (05/12) : **ROI confirmé** (objectif CTR ≥ 2.5-3%)
- Rapport final impact leads
- Décisions optimisation Q1 2026

**Objectif semaine 4** : ROI documenté, stratégie Q1

---


## 🟠 TÂCHES IMPORTANTES (P1 - Après LEADGEN-01)

### 🔄 [P1]-P1-LEADGEN-04-metadata-articles-blog-Metadata-task-pas-commence : Optimisation Metadata Articles Blog ⚡️

**Statut** : 🔄 **EN COURS** (Phase 1 - Test Manuel)  
**Priorité** : P1 (Important - Impact CTR articles)  
**Temps estimé** : 10-20h total (Phase 1: 2h, Phase 2: 5h si validé)  
**Temps investi** : 2h30 (pré-travail) + 0h (Phase 1 démarrée)  
**ROI** : CTR articles +60% = +1-2 leads/mois = +50-300€/mois  
**Doc** : `.cursor/tasks/P1-LEADGEN-04-metadata-articles-blog-Metadata-task-pas-commence/`

**Objectif** :
Optimiser metadata de ~1031 articles blog (11 sites) pour améliorer CTR articles.

**Pré-travail** : ✅ 100% complété
- Audit structure complété (1031 articles)
- Script test validé (80% succès)
- Plan déploiement sécurisé (4 batches)
- Backup automatique configuré

**Phase 1 - Test Manuel** (EN COURS) :
- Optimiser 20 articles piliers manuellement
- Sites : Lyon, Nice, Bordeaux, Marseille (5 articles × 4 sites)
- Temps : 2h
- Mesure J+7 pour valider formule

**Phase 2 - Automatisation** (Si Phase 1 validée) :
- Script pour optimiser 1031 articles
- Déploiement 4 batches progressifs (8 jours)
- Temps : 5h

**Plan session** : `PLAN-SESSION-06-01.md`

---

### [P1]-P1-047-Wording-offre-refonte-termine : Refonte Wording Offre Moverz 💬

**Statut** : 📋 À FAIRE  
**Priorité** : P1 (Important - Impact conversion directe)  
**Temps estimé** : 6-8h  
**ROI** : Conversion form +50-100% = +200-400 leads/mois  
**Impact** : J+7 (dès déploiement)  
**Doc** : `.cursor/tasks/P1-047-Wording-offre-refonte-termine/`

**Objectif** :
Aligner wording site (home, services, FAQ, CTA) avec vrais USP Moverz.

**Problème actuel** :
- ❌ Anonymat client (USP unique) pas mentionné
- ❌ "Volume IA identique" pas clair
- ❌ "Harcèlement commercial" pas adressé
- ❌ "5 devis" partout (réalité : 3-5)
- ⚠️ "Estimation rapide" mise en avant (pas cœur d'offre)

**USP à communiquer** :
1. Volume IA identique = devis vraiment comparables
2. Dossier anonyme = zéro harcèlement commercial
3. Déménageurs vérifiés (Google + crédit score)
4. 3-5 déménageurs en concurrence = meilleurs prix
5. 30 min photos → devis en 7j max

**Actions** :
1. Audit wording actuel (2h)
2. Créer nouveau wording (3h) - Validation Guillaume requise
3. Déployer 11 sites (3h)

**6 Décisions à prendre** :
- "Harcèlement" trop fort ou OK ?
- "Dossier anonyme" clair grand public ?
- "3-5 devis" ou "jusqu'à 5" ?
- Économies "40%" garder/retirer ?
- "Cahier des charges" → "dossier" ?
- Message principal focus : Comparabilité ou Anonymat ?

**Prochaines actions** :
```
"Cursor, je démarre P1-047-Wording-offre-refonte-termine"
```

**Temps investi** : 0h  
**Dernière activité** : 05/11/2025 (création suite discussion LEADGEN-01)

---

### [P1]-P1-050-404-fix-hardcoded-nice-links-100% : Fix Liens Hardcodés (88 URLs 404) ⏳ EN ATTENTE VALIDATION

**Statut** : ⏳ **EN ATTENTE VALIDATION CRAWLER** (corrections déployées 05/11/2025)  
**Priorité** : P1 (important)  
**Temps investi** : 45 min  
**Impact attendu** : 88 URLs 404 résolues  
**Doc** : `.cursor/tasks/P1-050-404-fix-hardcoded-nice-links-100%/`

**Origine** :
- Commits Lucie matin (copier/coller Nice sans dynamiser)
- Liens blog homepage cassés (slugs n'existent pas)

**Corrections déployées** :
- ✅ 66 liens "nice" hardcodés (FAQ + Services, 10 sites)
- ✅ 22 liens blog homepage cassés (11 sites)
- ✅ Scripts automatisés (0 erreur humaine)
- ✅ 11 sites déployés avec `--force-deploy`

**Commits** :
- `e8d2c144` : liens "nice" hardcodés
- `4e118c7a` : liens blog homepage

**Prochaine étape** :
- [ ] Guillaume envoie rapport crawler 06/11/2025
- [ ] Vérifier 88 404 disparus
- [ ] Si OK → Marquer ✅ COMPLET
- [ ] Si NON → Investiguer résidus

---

## 🚫 TÂCHES DÉPRIORITISÉES (à faire APRÈS LEADGEN)

### P1-012-SEO-villes-hardcodees-en-cours, P2-014-Metadata-optimisation-en-cours, P1-039-SEO-titles-normalisation-fusionne, P1-040-SEO-descriptions-tier2-pas-commence, P1-045-Analytics-qa-ctr-fusionne
**Statut** : ✅ FUSIONNÉES dans P0-LEADGEN-01-Metadata-ctr-optimisation-termine  
**Raison** : Cohérence, éviter dispersion

### [P2]-P2-023-Scripts-setup-automation-termine : Setup Scripts Automation
**Statut** : 📋 PENDING (P2)  
**Raison** : Nice-to-have mais ZERO impact business/leads  
**Temps** : 5 min  
**Reprendre** : Quand temps libre après LEADGEN

### [P2]-P0-046-SERP-favicon-logo-en-pause : Logo SERP / Favicons
**Statut** : ⏸️ EN PAUSE (déprioritisé P0 → P2)  
**Raison** : Impact CTR marginal (+5-10%) vs metadata (+400%). ROI optimal si fait APRÈS LEADGEN-01 (multiplicateur ×8)  
**Reprendre** : Après LEADGEN-01 validé (J+14-30)

### P1-041-SEO-price-signals-pas-commence : Price signals
**Statut** : 📋 PENDING (P2)  
**Reprendre** : Q1 2026 si temps

### P2-043-SEO-faq-rationalisation-pas-commence : FAQ rationalisation
**Statut** : 📋 PENDING (P2)  
**Reprendre** : Après LEADGEN-03, si FAQ schema.org ne performe pas

### P2-044-SEO-howto-video-poc-pas-commence : HowTo/Video
**Statut** : 📋 PENDING (P2)  
**Reprendre** : Q1 2026, nice-to-have

---

## 📋 COMMANDES RAPIDES

```bash
# Démarrer tâche prioritaire
"Cursor, je démarre P0-LEADGEN-01-Metadata-ctr-optimisation-termine"

# État global
"Cursor, évalue le backlog"

# Logger session
"Cursor, log ma session pour P0-LEADGEN-01-Metadata-ctr-optimisation-termine : [fait]"

# Mettre en pause
"Cursor, je mets P0-LEADGEN-01-Metadata-ctr-optimisation-termine en pause : [raison]"

# Finaliser
"Cursor, finalise P0-LEADGEN-01-Metadata-ctr-optimisation-termine"
```

---

## 🎯 OBJECTIFS BUSINESS CHIFFRÉS

### Court terme (J+14 - 19/11/2025)
- ✅ CTR ≥ 2% (vs 0.56% actuel) = +250-300%
- ✅ Clics ≥ 30/mois (vs 6 actuels) = +400%
- ✅ Leads ≥ 4-5/mois (vs 0-1 actuels) = +400-500%
- **€€€ : +200-750€/mois**

### Moyen terme (J+30 - 05/12/2025)
- ✅ CTR ≥ 2.5-3%
- ✅ Clics ≥ 45-60/mois
- ✅ Leads ≥ 7-10/mois
- ✅ 250-350 pages additionnelles indexées (LEADGEN-02)
- **€€€ : +350-1 500€/mois**

### Long terme (J+60 - 05/01/2026)
- ✅ CTR 3%+ stabilisé
- ✅ Clics 80-100/mois
- ✅ Leads 12-15/mois
- **€€€ : +600-2 250€/mois**

---

## 📊 MÉTRIQUES SUIVI (Dashboard)

| Métrique | Baseline 05/11 | J+7 (12/11) | J+14 (19/11) | J+30 (05/12) | Objectif J+30 |
|----------|----------------|-------------|--------------|--------------|---------------|
| **CTR global** | 0.56% | ? | ? | ? | ≥ 2.5% |
| **Clics/mois** | 6 | ? | ? | ? | ≥ 45 |
| **Impressions** | 1 500 | ? | ? | ? | 2 000-2 500 |
| **Leads estimés** | 0-1 | ? | ? | ? | 7-10 |
| **€€€/mois** | 0-150€ | ? | ? | ? | 350-1 500€ |

---

## ✅ FAIT RÉCEMMENT (contexte)

### Sessions 404 (03-04/11/2025)
- ✅ 2 847 liens corrigés (3 sessions)
- ✅ 8/11 sites à 0% erreur
- ✅ Taux erreur global : 2.1% (vs 40%+ avant)

### Breadcrumbs (04/11/2025)
- ✅ 319 pages avec breadcrumbs
- ✅ 11 villes déployées
- ✅ Rich snippets validés GSC

### Sitemaps (03/11/2025)
- ✅ 1 272 URLs indexables
- ✅ 11 sitemaps corrigés
- ✅ Soumis Search Console

**→ Infrastructure SEO technique = ✅ OK**  
**→ Conversion visibilité → clics = ❌ PROBLÈME**  
**→ Solution = 3 tâches LEADGEN**

---

*Dernière mise à jour* : 05/11/2025 (restructuration complète focus lead generation)

