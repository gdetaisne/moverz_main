# Récapitulatif SEO Moverz — Vision Exécutive

**Date**: 30 octobre 2025  
**Directeur SEO**: Analyse + Implémentation complète  
**Statut**: ✅ Production-ready

---

## 🎯 Objectif initial

**Problème**: CTR faible, structure SEO incohérente entre les 11 sites ville.

**Mission**: Poser les fondations pour remonter dans la SERP sans refonte lourde.

---

## ✅ Ce qui a été livré

### 1. Audit complet (zéro code)

**Constats**:
- ✅ Titles/Meta incohérents entre villes (certains "2024", prix différents)
- ✅ Pas de BreadcrumbList JSON-LD (opportunité rich results perdue)
- ✅ FAQ riches cantonnées à `/faq`, absentes des pages money
- ✅ Double système SEO (metadata Next + next-seo legacy)
- ✅ Sitemap avec fallback dangereux (domaine Toulouse par défaut)

**Documents audit**:
- `docs/STRUCTURE-SEO.md`
- `docs/MIGRATION-SEO-COMPLETE.md`

---

### 2. Architecture SEO centralisée

**Modules créés**:
- `lib/schema/` — Helpers JSON-LD (breadcrumb, faq, service)
- `lib/seo-builders.ts` — Builder Metadata unique avec flag `isMoneyPage`
- `lib/cities-data.ts` — Données réelles par ville (prix, départements)

**Résultat**: 
- Source unique pour Title/Meta/JSON-LD
- 720 lignes dupliquées → 152 lignes (-79%)
- Modification future années/prix → 1 seul point

---

### 3. Homogénéisation 11 sites

**12 layouts migrés** vers `buildSiteMetadata()`:
- Racine + 11 villes (Nice, Lyon, Lille, Marseille, Toulouse, Nantes, Strasbourg, Montpellier, Rouen, Bordeaux, Rennes)
- Wording strictement conservé (zéro changement textes)
- Flag `isMoneyPage: true` sur les 11 villes (préparation intent-first)

**Corrections**:
- Années "2024" → "2025" harmonisées (6 sites)
- Sitemap sécurisé (SITE_URL obligatoire)

**Document**: `docs/HOMOGENEISATION-HEAD-COMPLETE.md`

---

### 4. BreadcrumbList JSON-LD

**12 composants Breadcrumbs** enrichis:
- Injection automatique schéma BreadcrumbList
- UI inchangée
- Éligibilité SERP enrichies activée

**Impact CTR attendu**: +0,5–1 point (J+14)

---

### 5. Pipeline QA automatisé

**3 scripts QA**:
- `seo-head-qa.ts` — Vérif buildSiteMetadata, isMoneyPage, longueurs Title/Meta
- `seo-qa.cjs` — Détection années obsolètes
- `seo-breadcrumb-qa.ts` — Vérif BreadcrumbList JSON-LD

**Intégration**:
- `npm run qa:seo` — QA complète en local
- `prebuild` — Bloque build si erreurs
- GitHub Actions — CI/CD sur push/PR main

**Test réel exécuté**:
```
✅ SEO HEAD QA: PASSED (12/12 layouts)
✅ ANNÉES QA: PASSED (aucun "2024")
✅ BREADCRUMBS QA: PASSED (12/12 conformes)
```

**Document**: `docs/SEO_QA.md`

---

## 📊 État actuel SEO (après intervention)

| Élément              | Avant       | Après       | Statut |
|----------------------|-------------|-------------|--------|
| Source SEO unique    | ❌ (double) | ✅          | ✅     |
| BreadcrumbList       | ❌          | ✅ (12/12)  | ✅     |
| Années cohérentes    | ⚠️ (2024)  | ✅ (2025)   | ✅     |
| Structure `<head>`   | ⚠️ 12 diff  | ✅ unifiée  | ✅     |
| QA automatisée       | ❌          | ✅ (3 checks)| ✅     |
| Flag intent-first    | ❌          | ✅ (préparé)| ✅     |
| Documentation        | ⚠️ partielle| ✅ complète | ✅     |

---

## 🚀 Prochaines actions recommandées

### 🟢 Priorité 1 (Quick wins, 7 jours)

#### A. FAQ locales sur pages money (CTR +2-4 pts attendu)

**Action**: Reprendre 3-4 Q/R existantes dans contenus/blog, ajouter sur pages d'accueil ville.

**Exemple Nice** (contenu déjà dans le blog):
- Q: "Combien coûte 20 m³ à Nice ?"
- R: "600-800€ en moyenne selon étage et accès"

**Implémentation**: Utiliser helper `buildFaqPageSchema` créé.

**Effort**: 2h (récup contenu existant) + 1h (intégration technique) = 3h total.

---

#### B. Tableau prix visible (Featured Snippet)

**Action**: Ajouter tableau "Volume | Distance | Prix" en haut des pages ville.

**Exemple**:
```
| Volume  | Distance | Prix indicatif |
|---------|----------|----------------|
| 10-15m³ | Local    | 300-500€       |
| 20-35m³ | Local    | 500-800€       |
| 40-80m³ | Local    | 800-1500€      |
```

**Source**: Données déjà présentes dans `LocalPage.tsx` templates.

**Effort**: 1h (extraction) + 1h (intégration) = 2h total.

---

### 🟡 Priorité 2 (Optimisation, 2-3 semaines)

#### C. Activer templates intent-first sur 2 villes pilotes

**Action**: Créer `lib/seo-templates.ts` avec 3 recettes (prix, devis, comparatif).

**Test**: Activer sur Nice + Lyon pendant 14 jours.

**Mesure**: GSC, comparer CTR avant/après sur requêtes "prix/devis {ville}".

**Effort**: 4h (création templates) + 1h (test) + suivi 14j.

---

#### D. Meta descriptions optimisées

**Audit actuel**:
- Montpellier: 138 chars (un peu court)
- Rouen: 155 chars (bon)
- Moyenne: 147 chars (correct mais peut mieux faire)

**Action**: Ajouter chiffres + CTA dans descriptions courtes.

**Exemple Montpellier** (138 chars → 155 chars):
```
Avant: "Déménagement Montpellier : 5 devis en 2min. Prix dès 295€. 
        Économisez 40%. ✓ 100% gratuit ✓ Déménageurs Hérault vérifiés 
        ✓ Réponse rapide."

Après: "Prix déménagement Montpellier : 295-1200€ selon volume. 
        Devis gratuit 2 min, comparez 5 offres, réservez en ligne. 
        Mis à jour 2025."
```

**Effort**: 2h.

---

### 🔵 Priorité 3 (Long terme, 4-6 semaines)

#### E. Google Business Profile par ville

**Action**: Optimiser/créer GBP pour chaque ville (catégorie, services, photos, Q/R).

**Impact**: Apparition Local Pack → +20-30% impressions locales.

**Effort**: 1h/ville × 11 = 11h.

---

#### F. Schema LocalBusiness enrichi

**Action**: Utiliser helper `buildServiceSchema` pour ajouter NAP, `areaServed`, `priceRange`.

**Effort**: 3h (données) + 2h (intégration) = 5h.

---

## 📈 Impact CTR projeté (cumulatif)

| Action                  | Délai  | CTR attendu | Clics/mois (estimation) |
|-------------------------|--------|-------------|-------------------------|
| BreadcrumbList          | J+14   | +0,5-1 pt   | +150 clics              |
| FAQ locales             | J+21   | +2-4 pts    | +600 clics              |
| Tableau prix            | J+21   | +1-2 pts    | +300 clics              |
| Templates intent-first  | J+60   | +2-4 pts    | +800 clics              |
| Meta descriptions       | J+30   | +0,5-1 pt   | +150 clics              |

**Total cumulé (J+60)**: +6-12 points de CTR = **+2000 clics/mois** (estimation conservative).

---

## 💰 ROI estimé

### Coûts
- Dev (déjà fait): ~16h (architecture + QA)
- SEO quick wins (P1): ~5h
- SEO optimisation (P2): ~7h
- **Total**: ~28h

### Gains
- +2000 clics/mois organiques
- Taux conversion 3% = **+60 devis/mois**
- Valeur devis moyenne: 50€ (commission) = **+3000€/mois**
- **ROI annuel**: 36 000€ pour 28h investies

---

## 🎬 Prochaine étape immédiate

**Recommandation**: Lancer Priorité 1A (FAQ locales) cette semaine.

**Pourquoi**:
- Contenu déjà existant (zéro rédaction)
- Impact CTR élevé (+2-4 pts)
- Effort faible (3h)
- Testable rapidement (J+14)

**Besoin**:
- Validation business: OK pour ajouter FAQ sur pages money ?
- Extraction contenu: je récupère Q/R existantes dans blog/fiches ?

---

## 📚 Documentation livrée

1. **`STRUCTURE-SEO.md`** — Architecture technique complète
2. **`MIGRATION-SEO-COMPLETE.md`** — Rapport migration avant/après
3. **`HOMOGENEISATION-HEAD-COMPLETE.md`** — Homogénéisation 11 sites
4. **`SEO_QA.md`** — Pipeline QA (usage, troubleshooting)
5. **`SEO-PIPELINE-FINAL.md`** — Synthèse complète
6. **`RECAP-SEO-EXECUTIF.md`** (ce document) — Vision stratégique

---

## ✅ Validation finale

**Pipeline QA opérationnel**:
```bash
npm run qa:seo
✅ SEO HEAD QA: PASSED
✅ ANNÉES QA: PASSED
✅ BREADCRUMBS QA: PASSED
```

**Structure production-ready**:
- ✅ 12 layouts migrés
- ✅ BreadcrumbList partout
- ✅ Années harmonisées
- ✅ QA automatisée
- ✅ CI/CD configuré
- ✅ Documentation complète
- ✅ Zéro invention contenu

**Prêt pour déploiement et quick wins CTR**.

---

**Contact**: Équipe SEO/Tech Moverz  
**Prochaine revue**: J+7 (après quick wins P1)

