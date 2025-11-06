# 🎯 RESTRUCTURATION LEAD GENERATION - 05/11/2025

## Contexte

**Date** : 05/11/2025  
**Analysé par** : Cursor (rôle Head of Lead Generation)  
**Données sources** :
- Search Console (1 500 impressions, 6 clics, CTR 0.56%)
- Dashboard 404 (26 erreurs, 89 liens cassés)
- SEO Checklist 104 points (11 sites)
- Top 100 URLs SERP analysis

---

## 🔴 DIAGNOSTIC CRITIQUE

### Problème identifié
**CTR 10x trop faible** : 0.56% vs 3-5% attendu

**Root cause** :
1. Villes hardcodées dans metadata (Marseille affiche "Lille", Nantes affiche "Marseille")
2. Titles trop longs (>60 caractères, coupés SERP)
3. Descriptions génériques sans CTA ni bénéfice chiffré
4. 404 résiduels bloquent indexation (Lyon 63 pages, Rennes 224 pages)

**Impact business** :
- **6 clics/mois** au lieu de 45-75 attendus
- **0-1 lead/mois** au lieu de 7-10 attendus
- **PERTE : 6-7 leads/mois = 300-1 050€/mois**

---

## ✅ CE QUI A ÉTÉ FAIT (Restructuration)

### 1. Création 3 nouvelles tâches LEAD GEN consolidées

#### P0-LEADGEN-01-Metadata-ctr-optimisation-100% : Fix Metadata CTR (P0)
**Fusion de** : P1-012-SEO-villes-hardcodees-50% + P2-014-Metadata-optimisation-100% + P1-039-SEO-titles-normalisation-100% + P1-040-SEO-descriptions-tier2-0% + P1-045-Analytics-qa-ctr-100%

**Localisation** : `.cursor/tasks/P0-LEADGEN-01-Metadata-ctr-optimisation-100%/`

**Fichiers créés** :
- ✅ `README.md` (15 pages, plan complet)
- ✅ `context.md` (analyse business détaillée)
- ✅ `progress.md` (12h30 travail déjà fait documenté)
- ✅ `commits.md` (11 commits existants + 7 à venir)
- ✅ `tests.md` (10 tests définis)
- ✅ `decisions.md` (9 décisions stratégiques + 3 techniques)

**Temps** : 60% déjà complété (12h30 investis)  
**Reste** : 3-4h (finalisation villes hardcodées + templates)  
**ROI** : CTR ×4-5 = +3-5 leads/mois = +150-750€/mois

---

#### P0-LEADGEN-02-404-indexation-boost-100% : 404 & Indexation (P1)
**Nouvelle tâche** basée sur données 404 + Search Console

**Localisation** : `.cursor/tasks/[P1]-TASK-LEADGEN-02-404-indexation-boost/`

**Fichiers créés** :
- ✅ `README.md` (plan action Lyon/Lille/Toulouse/Rennes)

**Objectif** : Résoudre 26 erreurs 404 → débloquer +250-350 pages indexables

**Temps** : 1-2 jours  
**ROI** : +3-5 leads/mois = +150-750€/mois

---

#### P0-LEADGEN-03-Analytics-monitoring-ctr-100% : Monitoring & Optimisation (P1)
**Nouvelle tâche** monitoring continu

**Localisation** : `.cursor/tasks/[P1]-TASK-LEADGEN-03-monitoring-ctr-optimisation/`

**Fichiers créés** :
- ✅ `README.md` (features dashboard + alertes)

**Objectif** : Dashboard enrichi + alertes automatiques + baselines CTR

**Temps** : 1 jour setup + monitoring continu  
**ROI** : Détection rapide problèmes + optimisation continue

---

### 2. Mise à jour TODO-GUILLAUME.md

**Ancien fichier** : Sauvegardé → `.cursor/TODO-GUILLAUME-OLD-05-11-2025.md`

**Nouveau fichier** : `.cursor/TODO-GUILLAUME.md`

**Changements** :
- ✅ Section contexte business ajoutée
- ✅ 3 tâches LEADGEN prioritaires (P0 + P1)
- ✅ Roadmap 4 semaines détaillée
- ✅ Objectifs business chiffrés (J+14, J+30, J+60)
- ✅ Métriques suivi (tableau)
- ✅ Tâches anciennes déprioritisées/fusionnées documentées

---

### 3. Format conservé (as requested)

**Structure respectée** :
- README.md : Vue d'ensemble + plan action + ROI
- context.md : Pourquoi + problème business
- progress.md : Travail fait + travail restant
- commits.md : Historique GitHub
- tests.md : Stratégie validation
- decisions.md : Choix techniques/stratégiques

**Style** : Identique aux tâches existantes (P1-012-SEO-villes-hardcodees-50%, P2-014-Metadata-optimisation-100%, TASK-031, etc.)

---

## 📊 ROADMAP PROPOSÉE (4 semaines)

### Semaine 1 (maintenant - 12/11)
**Focus** : P0-LEADGEN-01-Metadata-ctr-optimisation-100% (Metadata CTR)
- Jour 1-2 : Finir villes hardcodées + templates
- Jour 3 : Deploy 11 sites
- Jour 7 : Monitoring CTR J+7

**Résultat attendu** : CTR 0.56% → 1.5-2% (+150-250%)

---

### Semaine 2 (13-19/11)
**Focus** : P0-LEADGEN-02-404-indexation-boost-100% (404) + Setup LEADGEN-03 (Monitoring)
- Jour 1-2 : Lyon, Lille, Toulouse 404
- Jour 3 : Rennes investigation
- Jour 4-5 : Dashboard monitoring enrichi

**Résultat attendu** : +100-150 pages indexables

---

### Semaine 3 (20-26/11)
**Validation J+14** : CTR ≥ 2% ?
- Si OUI : Célébrer ✅
- Si NON : A/B tests metadata

---

### Semaine 4 (27/11 - 05/12)
**Validation J+30** : CTR ≥ 2.5-3% ?
- Rapport ROI final
- Décisions optimisation Q1 2026

---

## 💰 ROI PROJETÉ (3 tâches combinées)

### Court terme (J+14 - 19/11)
- CTR : 0.56% → 2% = +250%
- Clics : 6 → 30/mois = +400%
- Leads : 0-1 → 4-5/mois = +400%
- **€€€ : +200-750€/mois**

### Moyen terme (J+30 - 05/12)
- CTR : 0.56% → 2.5-3% = +350-450%
- Clics : 6 → 45-60/mois = +650-900%
- Leads : 0-1 → 7-10/mois = +700-1 000%
- **€€€ : +350-1 500€/mois**

### Long terme (J+60 - 05/01/2026)
- CTR : 3%+ stabilisé
- Clics : 80-100/mois
- Leads : 12-15/mois
- **€€€ : +600-2 250€/mois**

---

## 📁 STRUCTURE FICHIERS CRÉÉE

```
.cursor/
├── tasks/
│   ├── P0-LEADGEN-01-Metadata-ctr-optimisation-100%/
│   │   ├── README.md (15 pages)
│   │   ├── context.md (analyse business)
│   │   ├── progress.md (60% déjà fait)
│   │   ├── commits.md (11 existants + 7 à venir)
│   │   ├── tests.md (10 tests définis)
│   │   └── decisions.md (12 décisions documentées)
│   │
│   ├── [P1]-TASK-LEADGEN-02-404-indexation-boost/
│   │   └── README.md (plan Lyon/Lille/Toulouse/Rennes)
│   │
│   └── [P1]-TASK-LEADGEN-03-monitoring-ctr-optimisation/
│       └── README.md (features monitoring)
│
├── TODO-GUILLAUME.md (nouveau, focus LEADGEN)
├── TODO-GUILLAUME-OLD-05-11-2025.md (backup)
└── RESTRUCTURATION-LEADGEN-05-11-2025.md (ce fichier)
```

---

## 🎯 PROCHAINES ACTIONS RECOMMANDÉES

### Action immédiate (Guillaume)
```bash
# Démarrer tâche prioritaire
"Cursor, je démarre P0-LEADGEN-01-Metadata-ctr-optimisation-100%"
```

### Ordre exécution
1. **P0-LEADGEN-01-Metadata-ctr-optimisation-100%** (P0, 2 jours) → Fix metadata CTR
2. **P0-LEADGEN-02-404-indexation-boost-100%** (P1, 1-2 jours) → Résoudre 404 & indexation
3. **P0-LEADGEN-03-Analytics-monitoring-ctr-100%** (P1, 1 jour) → Setup monitoring

**Total** : 4-5 jours travail → ROI +350-1 500€/mois à J+30

---

## ❓ QUESTIONS RESTANTES POUR GUILLAUME

1. **Dashboard GitHub** : Quel est le lien du repo ? (pour LEADGEN-03)
2. **Validation approche** : OK démarrer LEADGEN-01 cette semaine ?
3. **Priorités** : Confirmes-tu ordre LEADGEN-01 → LEADGEN-02 → LEADGEN-03 ?
4. **Tracking leads** : Formulaires trackés dans GA4 actuellement ?

---

## 📝 NOTES

**Tâches anciennes** :
- P1-012-SEO-villes-hardcodees-50% : ✅ Fusionnée dans LEADGEN-01
- P2-014-Metadata-optimisation-100% : ✅ Fusionnée dans LEADGEN-01
- P1-039-SEO-titles-normalisation-100%, 040, 045 : ✅ Fusionnées dans LEADGEN-01
- P0-046-SERP-favicon-logo-100% (Favicon) : ⏸️ Mis en pause (reprendre après LEADGEN-01)

**Philosophie restructuration** :
- Focus ROI business (leads, €€€)
- 1 tâche = 1 objectif business clair
- Éviter dispersion sur 5-10 tâches parallèles
- Quick wins prioritaires (J+14-30)

**Momentum existant** :
- 404 : 99% résolu (2 847 liens corrigés)
- Breadcrumbs : Déployés 11 sites
- Sitemaps : OK 11 sites
- Metadata : 60% déjà fait
- **→ Finalisation = unlock leads**

---

*Créé le* : 05/11/2025  
*Par* : Cursor (Head of Lead Generation analysis)  
*Validation* : En attente Guillaume

