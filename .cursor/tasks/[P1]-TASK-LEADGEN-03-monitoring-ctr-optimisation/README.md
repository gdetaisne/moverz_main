# TASK-LEADGEN-03 : Monitoring & Optimisation Continue CTR

**Type** : Lead Generation / Analytics & Optimization  
**Priorité** : P1 (Important, après LEADGEN-01/02)  
**Temps estimé** : 1 jour setup + monitoring continu  
**Assigné à** : Guillaume  
**Statut** : 📋 PENDING

---

## 🎯 Objectif Business

**PROBLÈME** :
- Actuellement : Monitoring manuel CTR Search Console
- Pas d'alertes automatiques si CTR baisse
- Pas de baseline par type de page/ville
- Difficile identifier opportunités optimisation

**OBJECTIF** :
1. **Dashboard monitoring** : CTR temps réel 11 sites
2. **Alertes automatiques** : Si CTR < seuil, notification
3. **Baselines documentées** : CTR par page type, par ville
4. **Optimisation continue** : A/B tests, itérations metadata

---

## 📊 Contexte & Données

### Dashboard existant (Guillaume)

**Assets actuels** :
- Dashboard analytics custom (source Search Console)
- 11 propriétés GSC configurées
- GitHub repo dashboard (à confirmer lien)

**Fonctionnalités actuelles** :
- Suivi impressions/clics global
- Breakdown par site
- Graphiques évolution

**Gaps identifiés** :
- ❌ Pas d'alertes automatiques
- ❌ Pas de baseline par type page
- ❌ Pas de comparaison avant/après
- ❌ Pas de drill-down par URL

---

## 🛠️ Plan d'Action

### Phase 1 : Setup Baselines (2h)

#### Baseline pré-LEADGEN-01 (05/11/2025)

**Documenter état actuel** :

| Métrique | Valeur 05/11 | Source |
|----------|--------------|--------|
| CTR global | 0.56% | GSC |
| Clics/mois | 6 | GSC |
| Impressions/mois | 1 500 | GSC |
| Position moyenne | 37.3 | GSC |
| Sites analysés | 11 | Dashboard |

**Breakdown par site** :

| Site | CTR | Clics | Impressions | Position | Note |
|------|-----|-------|-------------|----------|------|
| Lyon | 4.17% | 1 | 49 | 17.4 | ⭐ Meilleur |
| Rennes | 0.73% | 3 | 416 | 34.2 | |
| Strasbourg | 1.28% | 2 | 158 | 42.4 | |
| Nantes | 0% | 0 | 154 | 29.6 | |
| Autres | 0-0.5% | 0 | <100 | 35-65 | |

**Breakdown par type page** (à mesurer post-LEADGEN-01) :

| Type page | CTR baseline | Objectif J+30 |
|-----------|--------------|---------------|
| Home | ? | 3-4% |
| Services | ? | 2.5-3% |
| Blog articles | ? | 2-3% |
| Contact | ? | 4-5% |
| FAQ | ? | 2-3% |
| Corridors | ? | 2-3% |

---

### Phase 2 : Enrichir Dashboard (4h)

#### Feature 1 : Comparaison avant/après (1h)

**Objectif** : Visualiser impact LEADGEN-01

**Implementation** :
```typescript
// dashboard/components/ComparisonChart.tsx
interface ComparisonData {
  baseline: { date: '05/11/2025', ctr: 0.56, clicks: 6 },
  current: { date: string, ctr: number, clicks: number },
  delta: { ctr: string, clicks: string } // "+250%", "+24"
}
```

**Affichage** :
- Graphique avant/après (ligne baseline + ligne actuelle)
- Delta % et absolu
- Code couleur (vert si amélioration, rouge si baisse)

---

#### Feature 2 : Drill-down par URL (1.5h)

**Objectif** : Identifier pages top/flop

**Vues** :
1. **Top 20 URLs CTR** : Pages performantes (apprendre)
2. **Bottom 20 URLs CTR** : Pages à optimiser (priorité)
3. **Filter par type page** : Home, Services, Blog, etc.

**Colonnes** :
- URL
- CTR
- Clics
- Impressions
- Position moyenne
- Évolution vs semaine dernière

---

#### Feature 3 : Alertes automatiques (1.5h)

**Objectif** : Notification si problème détecté

**Alertes configurées** :

| Alerte | Condition | Action |
|--------|-----------|--------|
| **CTR baisse** | CTR jour < baseline - 20% | Email Guillaume |
| **0 clic 3 jours** | Site 0 clic pendant 3 jours consécutifs | Email urgent |
| **Impressions chute** | Impressions -30% vs semaine dernière | Email + check indexation |
| **Position chute** | Position moyenne +10 (baisse ranking) | Email + analyse SEO |

**Implementation** :
- Cron job quotidien (ou webhook GSC si disponible)
- Email via Nodemailer ou service
- Dashboard affiche alertes actives

---

### Phase 3 : Outils Optimisation Continue (2h)

#### Tool 1 : A/B Testing Tracker

**Objectif** : Si A/B tests metadata (optionnel)

**Fonctionnalités** :
- Définir test : Variante A vs B
- Assigner sites : Lyon/Nice → A, Rennes/Nantes → B
- Durée : 14 jours
- Résultats : CTR A vs CTR B, winner déclaré

---

#### Tool 2 : Générateur metadata optimisées

**Objectif** : Aide création nouvelles pages

**Input** :
- Type page : home, blog article, service
- Ville : Lyon
- Mots-clés : "déménagement pas cher"

**Output** :
- Title optimisé 50-60 chars (formule [MK + Ville + CTA])
- Description 150-160 chars (formule [Bénéfice + Chiffre + CTA + Trust])
- Preview SERP (visuel)

---

### Phase 4 : Heatmaps & Behaviour (optionnel, 2h)

**Objectif** : Comprendre pourquoi users ne cliquent pas (si CTR reste faible)

**Outils** :
- Hotjar ou Microsoft Clarity (gratuit)
- Installer sur 2-3 sites test (Lyon, Rennes)

**Insights** :
- Où users scrollent
- Où users cliquent (CTA, liens)
- Heatmap formulaire lead

**Décision** : Si CTR post-LEADGEN-01 < 1.5% J+30, alors activer heatmaps

---

## 📋 Plan d'Exécution

### Jour 1 : Setup initial (8h)

**Matin (4h)** :
1. Documenter baselines (30min)
2. Feature "Comparaison avant/après" (1h30)
3. Feature "Drill-down URLs" (1h30)
4. Tests dashboard (30min)

**Après-midi (4h)** :
1. Feature "Alertes automatiques" (1h30)
2. Configuration alertes email (1h)
3. Tool "A/B Testing Tracker" (1h)
4. Documentation + deploy (30min)

---

### Monitoring continu (post-setup)

**J+7 (12/11)** :
- Vérifier CTR première fois post-LEADGEN-01
- Documenter dans dashboard
- Email rapport à Guillaume

**J+14 (19/11)** :
- Validation tendance CTR
- Si CTR < 2%, analyser pages flop
- Décider si A/B tests nécessaires

**J+30 (05/12)** :
- ROI confirmé ou non
- Rapport final impact LEADGEN-01
- Décisions optimisation Q1 2026

**Mensuel** :
- Rapport CTR évolution
- Top/Flop pages
- Recommandations optimisation

---

## 🎯 Critères de Réussite (Definition of Done)

### Setup
- [ ] Baselines 05/11 documentées (global + par site)
- [ ] Dashboard enrichi : comparaison avant/après
- [ ] Dashboard enrichi : drill-down par URL
- [ ] Alertes configurées (4 types)
- [ ] Tests alertes OK (simulation baisse CTR)
- [ ] A/B testing tracker créé
- [ ] Documentation dashboard mise à jour

### Monitoring actif
- [ ] Rapport J+7 envoyé
- [ ] Rapport J+14 envoyé
- [ ] Rapport J+30 envoyé (ROI final)
- [ ] 0 alerte manquée (si problème, détecté)

---

## 📊 ROI Attendu

### Investissement
- **Temps setup** : 1 jour (8h)
- **Temps monitoring** : 1-2h/semaine
- **Coût** : 0€ (dashboard existant)
- **Outils payants** : 0€ (Clarity gratuit si besoin)

### Retour

**Détection rapide problèmes** :
- Si CTR baisse, correction J+1 au lieu J+30
- **Économie** : -500-1 000€ perte évitée

**Optimisation continue** :
- A/B tests → +10-20% CTR additionnel
- **Gain** : +1-2 leads/mois = +50-300€/mois

**Knowledge base** :
- Baselines permettent benchmarks futurs
- Learnings réutilisables nouvelles villes

**ROI indirect** : Permet piloter stratégie SEO data-driven

---

## 🔗 Dépendances

### Bloqué par
- TASK-LEADGEN-01 (besoin metadata optimisées pour mesurer impact)
- Dashboard analytics existant (Guillaume)

### Bloque
- Aucune (nice-to-have)

### Synergie
- TASK-LEADGEN-01 : Monitoring valide impact
- TASK-LEADGEN-02 : Monitoring détecte si indexation réussie

---

## 📝 Notes

**Priorité P1** (vs P2) car :
- Nécessaire mesurer ROI LEADGEN-01 (sinon on vole aveugle)
- Alertes préviennent régressions
- Optimisation continue = leads long terme

**Alternative considérée** : Monitoring manuel Search Console  
**Rejetée car** : Chronophage, risque manquer alertes, pas de baselines

**Dashboard GitHub** :
- Guillaume : Confirmer lien repo
- Si besoin refactor, OK investir temps

**Heatmaps optionnel** :
- Seulement si CTR J+30 < 1.5%
- Sinon, metadata suffisent

---

*Créée le* : 05/11/2025  
*Statut* : PENDING (démarrer après LEADGEN-01, en parallèle LEADGEN-02 OK)

