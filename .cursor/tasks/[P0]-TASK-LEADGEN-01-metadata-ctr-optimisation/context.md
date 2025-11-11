# Contexte - TASK-LEADGEN-01

## 🔴 Problème Business Identifié

**Date analyse** : 05/11/2025  
**Analysé par** : Head of Lead Generation (analyse complète data Search Console)

### Situation actuelle
- **11 sites lancés** : Il y a 1 mois (oct 2025)
- **Impressions** : 1 500/mois
- **Clics** : 6/mois seulement
- **CTR** : 0.56%
- **Leads estimés** : 0-1/mois

### Problème critique
**CTR 10x trop faible** :
- CTR actuel : 0.56%
- CTR attendu marché : 3-5%
- **Écart** : -84% à -89%

**Traduction business** :
- Avec CTR normal 3% : 45 clics attendus (vs 6 actuels)
- Conversion 15% : 7 leads/mois attendus (vs 0-1 actuels)
- **PERTE : 6-7 leads/mois = 300-1 050€/mois**

## 🔍 Root Cause Analysis

### Analyse Search Console Top 100 URLs révèle 3 problèmes majeurs

#### 1. Villes hardcodées dans metadata (❌ CRITIQUE)

**Exemples réels** :

**Marseille blog** (position 44.2, 0 clic) :
```
URL: devis-demenageur-marseille.fr/blog/...
Title: "demenagement-marseille - Blog Déménagement lille | Déménageurs Marseille"
                                                      ^^^^^ LILLE !!!
Description: "Découvrez tous nos articles sur demenagement-marseille."
```

**Nantes blog** (position 51.6, 0 clic) :
```
URL: devis-demenageur-nantes.fr/blog/...
Title: "Blog Déménagement Marseille - Guides & Conseils | Moverz | Déménageurs Nantes"
                       ^^^^^^^^^ MARSEILLE sur site NANTES !!!
Description: "Guides pour réussir votre déménagement à Marseille..."
```

**Impact** :
- Google pénalise (incohérence URL ↔ metadata)
- User confus (voit mauvaise ville)
- CTR effondré (perte de pertinence perçue)

#### 2. Titles trop longs (>60 caractères)

**Exemples** :

**Rennes** (position 73.0, 0 clic) :
```
Title: "Déménagement Rennes — Devis en 7j | Moverz | Déménageurs Rennes"
Longueur: 71 caractères
Affichage SERP mobile: "Déménagement Rennes — Devis en 7j | Moverz | Déména..."
                                                               ^^^^^^^^ COUPÉ
```

**Strasbourg** (position 72.2, 0 clic) :
```
Title: "Déménagement Strasbourg — Devis en 7j | Moverz | Déménageurs Strasbourg"
Longueur: 79 caractères
Affichage mobile: "Déménagement Strasbourg — Devis en 7j | Move..."
```

**Impact** :
- Message coupé = perte CTA
- Moins attractif dans SERP
- CTR réduit de 15-25%

#### 3. Descriptions génériques sans valeur

**Exemples** :

**Strasbourg blog** (position 45.1, 0 clic) :
```
Title: "Déménagement Strasbourg Pas Cher : Astuces & Solutions Économiques"
Description: [VIDE]
```

**Nice blog** (position 48.4, 0 clic) :
```
Description: "Guides complets et conseils d'experts pour réussir votre déménagement à Nice."
```
❌ Générique  
❌ Aucun chiffre  
❌ Aucun CTA  
❌ Aucune urgence  
❌ Aucun trust signal  

**Impact** :
- Pas de différenciation vs concurrents
- Pas d'incitation au clic
- CTR 50-70% plus faible qu'optimal

## 📊 Données Comparatives

### Performances par site (Search Console)

**Sites AVEC linking** :
- 890 impressions
- 5 clics
- **CTR 0.40%**

**Sites SANS linking** :
- 563 impressions
- 1 clic
- **CTR 0.69%**

**Anomalie** : Lyon (sans linking) = **meilleur performer**
- CTR : 4.17%
- Position : 17.4
- **Preuve** : Avec metadata correctes, CTR peut être 7x meilleur

## 🎯 Pourquoi Cette Tâche Est P0

### 1. Impact immédiat
- Fix déployable en 2 jours
- Résultats visibles J+7-14
- Pas de dépendances externes

### 2. ROI infini
- Coût : 0€ (dev interne)
- Retour : +150-1 200€/mois
- Multiplicateur leads ×4-7

### 3. Bloquant stratégique
Sans metadata optimisées :
- ❌ Linking inefficace (impressions sans clics)
- ❌ Content marketing gaspillé (articles non cliqués)
- ❌ Rich snippets invisibles (Google ne les affiche pas si CTR faible)
- ❌ Toute stratégie acquisition organique compromise

### 4. Travail déjà 60% fait
- TASK-012 : 40-50% complété (villes hardcodées partiellement corrigées)
- TASK-014 : 80% complété (certaines pages optimisées)
- **Reste : Finaliser + systématiser**

## 🔗 Historique Tâches Antérieures

### TASK-012 : Correction Global Villes Hardcodées
- **Démarrée** : 30-31/10/2025
- **Statut** : ⚠️ INCOMPLET (40-50%)
- **Travail fait** :
  - Session 1 : Metadata services, emails, footer (11 villes, 5 commits)
  - Session 2 : Pattern 1 "à Lille" (16 fichiers, 4 villes corrigées)
- **Restant** :
  - Pattern 1 : 24 fichiers, 6 villes
  - Pattern 2 : 27 fichiers, 9 villes
- **Doc** : `.cursor/tasks/[P1]-TASK-012-villes-hardcodees/`

### TASK-014 : Optimisation Métadonnées SEO
- **Démarrée** : 30-31/10/2025
- **Statut** : 🔄 EN COURS (80%)
- **Travail fait** :
  - Metadata dynamiques services + contact
  - Titles optimisés 54 caractères
  - Canonical URL trailing slash
  - Descriptions home Nice/Lyon
  - Corridors → Paris (11 villes)
- **Restant** :
  - Descriptions Tier 2 (pages secondaires)
  - Validation longueur systématique
- **Doc** : `.cursor/tasks/[P2]-TASK-014-optimisation-metadata/`

### TASK-039, TASK-040, TASK-041, TASK-045 : Créées mais PENDING
- **Statut** : 📋 PENDING (jamais démarrées)
- **Raison création** : Split TASK-014 en sous-tâches
- **Décision** : Fusionnées dans TASK-LEADGEN-01 (cette tâche)

## 🏗️ Architecture Technique Impactée

### Fichiers concernés (estimation)

**Patterns villes hardcodées** :
- `sites/{ville}/app/estimation-rapide/layout.tsx` (11 villes)
- `sites/{ville}/app/faq/layout.tsx` (11 villes)
- `sites/{ville}/app/notre-offre/page.tsx` (11 villes)
- `sites/{ville}/app/inventaire-ia/layout.tsx` (11 villes)
- `sites/{ville}/app/partenaires/page.tsx` (9 villes)
- `sites/{ville}/app/blog/page.tsx` (9 villes)
- `sites/{ville}/app/comment-ca-marche/page.tsx` (9 villes)

**Total** : ~51 fichiers à corriger

**Templates metadata centralisés** :
- `lib/seo-builders.ts` (probable)
- `lib/seo.ts` (possible)
- Ou fichiers metadata par type de page

### Principes Architecture Moverz

**Contrainte multi-sites** :
- 11 sites Next.js indépendants
- Build séparé par ville
- Déploiement CapRover individuel
- **Code partagé via** : `lib/`, `components/`

**Règle sacré #1** : TOUJOURS utiliser `cityData` dynamique
```typescript
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';

const city = getCityDataFromUrl(env.SITE_URL);
// Utiliser city.nameCapitalized, city.slug, etc.
```

**Règle sacré #2** : Jamais hardcoder ville
```typescript
// ❌ INTERDIT
title: "Déménagement Lille | Moverz"

// ✅ CORRECT
title: `Déménagement ${city.nameCapitalized} | Moverz`
```

## 📈 Projections Business Post-Fix

### Scénario Conservateur (J+14)
- CTR 0.56% → 2%
- Impressions 1 500 → 1 800 (+ pages indexées)
- **Clics : 36** (vs 6 actuels)
- **Leads : 5-7** (vs 0-1 actuels)
- **€€€ : +250-1 050€/mois**

### Scénario Réaliste (J+30)
- CTR 0.56% → 2.5-3%
- Impressions → 2 500
- **Clics : 62-75**
- **Leads : 9-12**
- **€€€ : +450-1 800€/mois**

### Scénario Optimiste (J+60, avec indexation complète)
- CTR → 3%
- Impressions → 3 500 (+ 404 résolus)
- **Clics : 105**
- **Leads : 15-20**
- **€€€ : +750-3 000€/mois**

## 🔗 Dépendances

### Tâches bloquantes (AUCUNE)
Cette tâche est **indépendante** et peut démarrer immédiatement.

### Tâches bloquées par celle-ci
- **TASK-LEADGEN-02** (404 indexation) : Bénéficiera du CTR amélioré
- **TASK-LEADGEN-03** (Monitoring) : Nécessite metadata optimisées pour mesurer efficacement
- **Toute stratégie acquisition** : SEA, Content, Linking → inefficace sans metadata

### Synergie avec travail existant
- ✅ Breadcrumbs déployés → Rich snippets prêts
- ✅ Sitemaps OK → Indexation prête
- ✅ 404 99% résolus → Pages propres
- **Manque juste** : Metadata optimisées pour convertir visibilité → clics

## 📅 Timeline

**Création tâche** : 05/11/2025  
**Priorité** : P0  
**Démarrage prévu** : Immédiat  
**Durée estimée** : 2 jours (8h travail effectif)  
**Validation** : J+14 (19/11/2025)  
**ROI mesuré** : J+30 (05/12/2025)

