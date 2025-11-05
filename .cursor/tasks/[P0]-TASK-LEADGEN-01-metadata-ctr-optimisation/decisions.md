# Decisions - TASK-LEADGEN-01

## 🎯 Décisions Stratégiques

### Décision #1 : Fusionner TASK-012 + TASK-014 + TASK-039/040/041

**Date** : 05/11/2025  
**Contexte** : Analyse Lead Gen révèle que metadata = goulot d'étranglement CTR  
**Décision** : Créer TASK-LEADGEN-01 fusionnant toutes tâches metadata

**Raisons** :
1. **Cohérence** : Toutes tâches adressent même problème (metadata non optimisées)
2. **Efficacité** : Évite dispersion sur 5 tâches séparées
3. **Focus ROI** : 1 tâche = 1 objectif business clair (CTR ×4-5)
4. **Simplicité suivi** : 1 tâche à suivre vs 5

**Alternative considérée** : Garder tasks séparées  
**Rejetée car** : Overhead coordination, risque tâches orphelines

---

### Décision #2 : Priorité P0 (vs P1 ou P2)

**Date** : 05/11/2025  
**Décision** : TASK-LEADGEN-01 = P0 (critique, à faire immédiatement)

**Raisons** :
1. **Impact business direct** : CTR ×4-5 = +3-5 leads/mois = +150-750€/mois
2. **ROI infini** : 0€ coût, retour immédiat
3. **Bloquant stratégique** : Sans metadata OK, toute acquisition organique compromise
4. **Quick win** : 2 jours travail, résultats J+14
5. **60% déjà fait** : Momentum existant (TASK-012 + TASK-014)

**Alternative considérée** : P1 après finir 404 restants  
**Rejetée car** : 404 = 1.3% erreurs (acceptable), metadata = 90% trafic potentiel perdu

---

### Décision #3 : Templates centralisés (vs metadata par page)

**Date** : 05/11/2025  
**Décision** : Créer `buildTitle()` et `buildDescription()` centralisés

**Raisons** :
1. **Maintenabilité** : 1 endroit à modifier vs 100+ fichiers
2. **Cohérence** : Garantit format uniforme 11 villes
3. **Validation** : Warnings automatiques si longueur hors range
4. **Scalabilité** : Facile ajouter nouvelles villes
5. **Best practice** : DRY (Don't Repeat Yourself)

**Alternative considérée** : Metadata hardcodées par page  
**Rejetée car** : Maintenance cauchemar, risque incohérences

**Implementation** :
```typescript
// lib/seo-builders.ts
export function buildTitle(pageType, city, options) { ... }
export function buildDescription(pageType, city, options) { ... }
```

---

### Décision #4 : Formule description [Bénéfice + Chiffre + CTA + Trust]

**Date** : 05/11/2025  
**Décision** : Adopter formule structurée pour toutes descriptions

**Formule** :
```
[Bénéfice concret] + [Chiffre précis] + [CTA urgent] + [Trust signal]
```

**Exemple** :
```
Déménageur Lyon : estimation IA 30min → 5 devis comparables en 7j. Gratuit, sans engagement. Déménageurs vérifiés.
[Bénéfice: IA rapide] [Chiffre: 30min, 5 devis, 7j] [CTA: Gratuit] [Trust: vérifiés]
```

**Raisons** :
1. **Psychologie conversion** : Formule prouvée marketing
2. **Différenciation** : Concurrents = descriptions génériques
3. **CTR boost** : +30-50% vs description plate
4. **Cohérence** : Même approche 11 villes

**Alternative considérée** : Descriptions libres par page  
**Rejetée car** : Qualité variable, pas de garantie CTR

**Source inspiration** : Best practices Google Ads + analyse concurrents

---

### Décision #5 : Longueur cible 50-60 chars titles, 150-160 chars descriptions

**Date** : 05/11/2025  
**Décision** : Standards stricts longueur metadata

**Raisons** :

**Titles 50-60 caractères** :
- Affichage complet mobile (54 chars max)
- Affichage complet desktop (60 chars max)
- Évite troncature = perte CTA
- Données Search Console : Titles >60 chars = CTR -15-25%

**Descriptions 150-160 caractères** :
- Affichage complet SERP (Google limite ~155-160)
- Assez long pour [Bénéfice + Chiffre + CTA + Trust]
- Pas trop long (>160 = coupé)
- Sweet spot conversion

**Alternative considérée** : Range plus large (40-70 / 140-170)  
**Rejetée car** : Risque troncature, perte cohérence

**Exceptions tolérées** :
- Titles 48-62 chars OK (si nécessaire ville nom long)
- Descriptions 148-162 chars OK

---

### Décision #6 : Déploiement 11 sites simultané (vs progressif)

**Date** : 05/11/2025  
**Décision** : Déployer 11 sites en même temps après validation

**Raisons** :
1. **Architecture mono-repo** : Code partagé, sync naturel
2. **Tests pré-deploy** : Build + validation OK avant
3. **Cohérence** : Évite 11 versions différentes
4. **Impact mesure** : Données comparables 11 sites
5. **Efficacité** : 1 deploy vs 11 deploys séquentiels

**Alternative considérée** : Deploy progressif (1-2 villes test, puis 9)  
**Rejetée car** :
- Overhead coordination
- Risque oublier villes
- Tests déjà faits localement

**Plan rollback** : Si problème critique J+1, rollback possible via CapRover

---

### Décision #7 : Monitoring CTR J+7/J+14/J+30 (vs J+30 seulement)

**Date** : 05/11/2025  
**Décision** : Suivi CTR 3 jalons (J+7, J+14, J+30)

**Raisons** :
1. **Détection rapide** : J+7 si problème, correction possible
2. **Validation court terme** : J+14 confirme tendance
3. **ROI confirmé** : J+30 valide impact business
4. **Apprentissage** : Comprendre vitesse impact Google

**Jalons** :
- **J+7** : Première mesure (indexation metadata)
- **J+14** : Validation tendance (objectif CTR ≥ 2%)
- **J+30** : ROI confirmé (objectif CTR ≥ 2.5-3%)

**Alternative considérée** : Attendre J+30 direct  
**Rejetée car** : Risque perdre 3 semaines si problème

---

### Décision #8 : Pas de A/B testing initialement (optionnel J+14)

**Date** : 05/11/2025  
**Décision** : Déployer 1 version optimale, A/B test seulement si budget temps

**Raisons** :
1. **Quick win prioritaire** : Passer 0.56% → 2%+ suffit
2. **Temps limité** : 2 jours, focus finalisation
3. **A/B = nice-to-have** : Amélioration 2% → 2.5% marginal vs 0.56% → 2%
4. **Complexité** : A/B nécessite tracking séparé

**Plan** : Si CTR J+14 < 2%, ALORS lancer A/B pour optimiser

**Alternative considérée** : A/B dès départ  
**Rejetée car** : Prématuré, overhead setup

---

### Décision #9 : Réutiliser dashboard analytics existant (vs créer nouveau)

**Date** : 05/11/2025  
**Décision** : Utiliser dashboard custom Guillaume pour monitoring CTR

**Raisons** :
1. **Déjà existant** : Économie temps développement
2. **Search Console intégré** : Source data officielle
3. **Multi-sites** : Déjà configuré 11 propriétés
4. **Temps réel** : Suivi quotidien possible

**Améliorations si nécessaire** :
- Ajouter alertes CTR < seuil
- Export CSV pour analyse
- Graphiques évolution CTR par ville

**Alternative considérée** : Créer dashboard dédié  
**Rejetée car** : Overhead, duplication

---

## 🔧 Décisions Techniques

### Décision Tech #1 : Utiliser getCityDataFromUrl(env.SITE_URL)

**Date** : 05/11/2025 (déjà adopté TASK-012)  
**Décision** : Pattern standard résolution ville

```typescript
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';

const city = getCityDataFromUrl(env.SITE_URL);
```

**Raisons** :
1. **Architecture existante** : Déjà utilisé ailleurs
2. **Fiable** : Basé sur SITE_URL (env)
3. **Type-safe** : TypeScript CityData
4. **Cohérent** : Même pattern partout

---

### Décision Tech #2 : Ne pas toucher aux autres features (breadcrumbs, FAQ, etc.)

**Date** : 05/11/2025  
**Décision** : Scope strict = metadata seulement

**Raisons** :
1. **Focus** : 1 tâche = 1 objectif
2. **Risque** : Toucher autre chose = possibilité casser
3. **Breadcrumbs OK** : Déjà déployés et validés
4. **FAQ OK** : Déjà en place

**Hors scope explicite** :
- ❌ Rich snippets (déjà OK)
- ❌ Schema.org (déjà OK)
- ❌ Canonicals (déjà OK)
- ❌ Sitemaps (déjà OK)
- ✅ **Metadata uniquement** (titles + descriptions)

---

### Décision Tech #3 : Warnings (pas errors) si longueur hors range

**Date** : 05/11/2025  
**Décision** : `console.warn()` si metadata hors optimal, mais ne pas bloquer build

**Raisons** :
1. **Flexibilité** : Certaines pages peuvent nécessiter title 62 chars
2. **Pragmatisme** : 90% conformité > 100% rigide
3. **Developer experience** : Warning informe sans bloquer

**Implementation** :
```typescript
if (title.length > 60) {
  console.warn(`⚠️ Title ${title.length} chars: ${pageType}`);
}
```

**Alternative considérée** : Throw error si hors range  
**Rejetée car** : Trop strict, bloque deploy

---

## 📊 Décisions Mesure Succès

### Décision Mesure #1 : CTR = métrique principale (pas leads)

**Date** : 05/11/2025  
**Décision** : Succès = CTR 0.56% → 2%+, pas directement leads

**Raisons** :
1. **Causalité directe** : Metadata → CTR (contrôlable)
2. **Mesure immédiate** : CTR visible J+7 vs leads J+30+
3. **Indépendant conversion** : CTR ne dépend pas formulaire
4. **Search Console** : Data officielle Google

**Leads = métrique secondaire** :
- Estimés via CTR × conversion 15%
- Validés ultérieurement (hors scope cette tâche)

**Alternative considérée** : Mesurer leads directement  
**Rejetée car** : Variables externes (formulaire, concurrence, saisonnalité)

---

### Décision Mesure #2 : Baseline 0.56% documentée (05/11)

**Date** : 05/11/2025  
**Décision** : Baseline CTR = 0.56% (6 clics / 1 500 impressions)

**Source** : Search Console 05/11/2025 (data 30 derniers jours)

**Importance** : Référence pour mesurer amélioration

**Breakdown baseline** :
- Rennes : 0.73% (meilleur hors Lyon)
- Lyon : 4.17% (anomalie positive)
- Autres : 0-0.5%

---

### Décision Mesure #3 : Objectifs J+14 et J+30 définis

**Date** : 05/11/2025  
**Décision** : Objectifs chiffrés clairs

**Objectif J+14** : CTR ≥ 2% (30+ clics)
- Amélioration +250-300%
- Conservateur, atteignable

**Objectif J+30** : CTR ≥ 2.5-3% (37-45 clics)
- Amélioration +350-450%
- Réaliste basé benchmarks

**Seuil échec** : CTR J+30 < 1.5%
- Si atteint, audit metadata + A/B tests

---

## 🔄 Décisions Réversibilité

### Décision Rollback #1 : Rollback possible si CTR J+7 < 0.5%

**Date** : 05/11/2025  
**Décision** : Si CTR baisse, rollback via CapRover

**Critères rollback** :
- CTR J+7 < 0.5% (baisse vs 0.56%)
- Ou erreurs critiques GSC
- Ou baisse impressions > 20%

**Procédure** :
1. Identifier commit avant deploy
2. Rollback CapRover 11 sites
3. Analyse root cause
4. Fix + redeploy

**Probabilité** : <5% (tests pré-deploy solides)

---

## 📝 Leçons Apprises (à documenter post-task)

### Leçon #1 : À documenter J+14
*Impact réel metadata sur CTR*

### Leçon #2 : À documenter J+30
*ROI confirmé, learnings pour futures optimisations*

### Leçon #3 : À documenter fin task
*Efficacité templates centralisés vs metadata hardcodées*

---

*Dernière mise à jour* : 05/11/2025

