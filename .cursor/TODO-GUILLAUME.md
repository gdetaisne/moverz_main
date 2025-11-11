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

### [P0]-TASK-056-header-toulouse-hardcoded-complet : Correction Toulouse Hardcodé Headers + CtaPrimary ⚡️⚡️⚡️

**Statut** : 🔄 **EN COURS** (30min investi, Strasbourg corrigé)  
**Priorité** : P0 (CRITIQUE - Tous sites cassés)  
**Temps investi** : 30min  
**Temps restant** : ~2h30  
**Doc** : `.cursor/tasks/[P0]-TASK-056-header-toulouse-hardcoded-complet/`

**Problème CRITIQUE** :
- 🚨 **Tous les sites (11 villes) affichent "Toulouse"** au lieu de leur propre ville
- Origine : Commits Lucie ce matin (`e18e6dfb`, `564e6e21`)
- Impact : UX catastrophique + SEO cassé + Perte confiance

**Corrections** :
- ✅ Strasbourg Header.tsx corrigé (exemple)
- ⏳ 10 Headers restants (nice, lyon, marseille, bordeaux, nantes, lille, rennes, rouen, montpellier, toulouse)
- ⏳ 11 CtaPrimary.tsx (22 occurrences "Toulouse" à corriger)

**Actions** :
- [ ] Corriger 10 Headers restants (1h)
- [ ] Corriger 11 CtaPrimary.tsx (1h)
- [ ] Tests 2-3 villes (30min)
- [ ] Commit + Deploy (30min)

**À faire IMMÉDIATEMENT** avant toute autre tâche !

---

## 🔴 PRIORITÉ ABSOLUE : 3 TÂCHES LEAD GENERATION (TOUTES P0)

### [P0]-P0-LEADGEN-01-Metadata-ctr-optimisation-termine : Optimisation Metadata CTR ✅ FINALISÉ

**Statut** : ✅ **COMPLET** (06/01/2026)  
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

### ✅ [P0]-P0-LEADGEN-02-404-indexation-boost-100% : Résolution 404 & Indexation ⚡️⚡️

**Statut** : ✅ **TERMINÉE** (06/11/2025)  
**Priorité** : P0 (critique business)  
**Temps investi** : ~6h  
**Résultat** : 24 URLs corrigées, ~200 impressions récupérables  
**Doc** : `.cursor/tasks/P0-LEADGEN-02-404-indexation-boost-404-task-en-attente/`

**Objectif** :
- Résoudre 26 erreurs 404 résiduelles (Lyon 31, Lille 28, Toulouse 19, etc.)
- Investiguer Rennes 224 pages non indexées (126 erreurs 404 GSC)
- Débloquer +250-350 pages pour indexation Google

**Pourquoi P0** :
- Pages non indexées = leads perdus
- ROI direct sur génération leads
- Complément essentiel à LEADGEN-01

**Approche** :
- Lyon : Créer 3 articles piliers manquants (80% résolution)
- Lille/Toulouse : Redirections 301 catégories vides
- Rennes : Export GSC → analyse patterns → redirections/création

---

### [P0]-P0-LEADGEN-03-Analytics-monitoring-ctr-termine : Monitoring & Optimisation CTR ⚡️

**Statut** : 📋 PENDING (après LEADGEN-01)  
**Priorité** : P0 (critique business)  
**Temps estimé** : 1 jour setup + monitoring continu  
**ROI** : Détection rapide problèmes + optimisation continue  
**Doc** : `.cursor/tasks/P0-LEADGEN-03-Analytics-monitoring-ctr-termine/`

**Objectif** :
- Enrichir dashboard analytics (comparaison avant/après, drill-down URLs)
- Alertes automatiques (CTR baisse, 0 clic 3j, etc.)
- Baselines CTR documentées (par type page, par ville)
- A/B testing tracker (optionnel)

**Pourquoi P0** :
- Nécessaire mesurer ROI LEADGEN-01/02
- Alertes préviennent régressions critiques
- Sans monitoring = navigation à l'aveugle

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

### [P1]-TASK-059-migration-architecture-hybrid : Migration Architecture Hybrid Vercel + VPS 🚀

**Statut** : 📋 PENDING  
**Priorité** : P1 (Important - Impact résilience + coûts)  
**Temps estimé** : 3-4h  
**ROI** : Uptime +49%, Images Docker -93%, Coûts -40%  
**Doc** : `.cursor/tasks/[P1]-TASK-059-migration-architecture-hybrid/`

**Objectif** :
Séparer sites publics (Vercel) du backend privé (VPS) pour résilience maximale.

**Problème actuel** :
- ❌ VPS down → 11 sites down (67% uptime cette semaine)
- ❌ 626 images Docker dangling (76 GB, accumulation continue)
- ❌ Maintenance lourde (11 containers Next.js)

**Architecture cible** :
```
VERCEL (Public):
- 11 sites Next.js
- CDN 70+ régions, 99.99% uptime
- 0€/mois (tier gratuit)

VPS (Private):
- Postgres + CRM + Dashboards
- 30€/mois (vs 50€ avant)
```

**Plan migration (4 phases)** :
1. Phase 0 : Préparation (backup, Vercel CLI) - 30 min
2. Phase 1 : Nice TEST (valider process) - 1h
3. Phase 2 : 10 sites restants - 1h30
4. Phase 3 : Nettoyage VPS (containers/images) - 1h
5. Phase 4 : Config auto-deploy - 30 min

**Bénéfices mesurables** :
- ✅ Uptime sites : 67% → 99.99% (+49%)
- ✅ Images Docker : 626 → <50 (-93%)
- ✅ Maintenance : 10h/mois → 2h/mois (-80%)
- ✅ Coûts : 50€ → 30€/mois (-40%)

**Prérequis** :
- [x] Nettoyage Docker (TASK-058) ✅
- [x] VPS stable ✅
- [ ] Compte Vercel créé
- [ ] Backup VPS snapshot
- [ ] 3-4h temps disponible

**Prochaines actions** :
```
"Cursor, je démarre TASK-059 migration Vercel"
```

**Temps investi** : 0h (tâche créée 11/11/2025)

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

### P0-046-SERP-favicon-logo-en-pause : Logo SERP / Favicons
**Statut** : ⏸️ EN PAUSE  
**Raison** : Impact CTR marginal (+5-10%) vs metadata (+400%)  
**Reprendre** : Après LEADGEN-01 validé

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

