# Tableau Status Wording par Site et Intent

**Date**: 31 octobre 2025  
**Légende**: ✅ Corrigé | ⏳ Pas encore fait | 🔄 Build en cours

---

## 📊 Status par Site × Intent

| Site | Homepage (Transactionnel) | Pages Quartiers (Transactionnel Local) | Blog Prix (Commercial Investigation) | Blog Guides (Informationnel) |
|------|---------------------------|----------------------------------------|-------------------------------------|------------------------------|
| **Bordeaux** | ✅ Corrigé (Comparables 7j) | ⏳ Pas fait (`/bordeaux` = ancien) | ⏳ Pas priorité (0 impressions) | ⏳ Pas priorité (0 impressions) |
| **Lille** | ✅ Corrigé (Comparables 7j) | ⏳ Pas fait | ⏳ Pas priorité (0 impressions) | ⏳ Pas priorité (0 impressions) |
| **Lyon** | ✅ Corrigé (Comparables 7j) | ⏳ Pas fait | ⏳ Pas priorité (0 impressions) | ⏳ Pas priorité (0 impressions) |
| **Marseille** | ✅ Corrigé (Comparables 7j) | ⏳ Pas fait | ⏳ Pas priorité (0 impressions) | ⏳ Pas priorité (0 impressions) |
| **Montpellier** | ✅ Corrigé (Comparables 7j) | ⏳ Pas fait | ⏳ Pas priorité (0 impressions) | ⏳ Pas priorité (0 impressions) |
| **Nantes** | ✅ Corrigé (Comparables 7j) | ✅ **Corrigé** (`/nantes` optimisé) | ⏳ Pas priorité (0 impressions) | ⏳ Pas priorité (0 impressions) |
| **Nice** | ✅ Corrigé (Comparables 7j) | ⏳ Pas fait | ⏳ Pas priorité (0 impressions) | ⏳ Pas priorité (0 impressions) |
| **Rennes** | ✅ Corrigé (Comparables 7j) | ✅ **Corrigé** (`/rennes` optimisé) | ⏳ Pas priorité (0 impressions) | ⏳ Pas priorité (0 impressions) |
| **Rouen** | ✅ Corrigé (Comparables 7j) | ✅ **Corrigé** (`/rouen` optimisé) | ⏳ Pas priorité (0 impressions) | ⏳ Pas priorité (0 impressions) |
| **Strasbourg** | ✅ Corrigé (Comparables 7j) | ✅ **Corrigé** (`/strasbourg` optimisé) | ⏳ Pas priorité (0 impressions) | ⏳ Pas priorité (0 impressions) |
| **Toulouse** | ✅ Corrigé (Comparables 7j) | ⏳ Pas fait | ⏳ Pas priorité (0 impressions) | ⏳ Pas priorité (0 impressions) |

---

## 📈 Compteurs

### Homepages (Intent Transactionnel)
- ✅ **11/11 sites** corrigés (100%)
- Wording: `Déménageurs {Ville} : 5 Devis Comparables 7j | 2025`
- Status builds: 🔄 En cours CapRover (20-30 min)

### Pages Quartiers (Intent Transactionnel Local)
- ✅ **4/11 sites** corrigés (36%)
  - Strasbourg, Rennes, Nantes, Rouen
- ⏳ **7/11 sites** pas encore fait (64%)
  - Bordeaux, Lille, Lyon, Marseille, Montpellier, Nice, Toulouse
- **Raison**: Data-driven (top 4 = 16% impressions dashboard)

### Blog Prix (Intent Commercial Investigation)
- ⏳ **0/11 sites** (0%)
- **Raison**: 0 impressions dashboard (sites neufs, pas encore indexé)
- **Décision**: Attendre volume avant optimiser

### Blog Guides (Intent Informationnel)
- ⏳ **0/11 sites** (0%)
- **Raison**: 0 impressions dashboard
- **Décision**: Pas priorité

---

## 🎯 Prochaines Actions

### J+1 (Aujourd'hui/Demain)
**Vérifier déploiement homepages**:
- [ ] Dashboard: Wording "Comparables 7j" visible 11/11
- [ ] searchIntent: "déclaré dans JSON" 11/11
- [ ] HowTo: au vert 11/11

### J+7 (7 nov 2025)
**Mesurer CTR pages quartiers top 4**:
- [ ] Strasbourg `/strasbourg`: CTR avant vs après
- [ ] Rennes `/rennes`: CTR avant vs après
- [ ] Nantes `/nantes`: CTR avant vs après
- [ ] Rouen `/rouen`: CTR avant vs après
- **Objectif**: 2% → 4-6% (+100% clics)

### Si succès J+7 → Rollout 7 villes
**Appliquer wording quartiers** (Bordeaux, Lille, Lyon, Marseille, Montpellier, Nice, Toulouse):
- [ ] Modifier `sites/*/app/_templates/LocalPage.tsx` (7 sites)
- [ ] Push GitHub + builds
- Impact: +100-200 clics/mois supplémentaires

### J+30+ (Si blog a du volume)
**Optimiser blog** (si impressions > 0):
- [ ] Templates intent "commercial_investigation" (prix)
- [ ] Templates intent "informationnel" (guides)

---

## 📋 Détail Pages Quartiers par Site

| Site | Page Quartier Ville | Status | Impressions/mois | Priorité |
|------|---------------------|--------|------------------|----------|
| Strasbourg | `/strasbourg` | ✅ Corrigé | 155 (5.54%) | ⭐⭐⭐ Top 1 |
| Rennes | `/rennes` | ✅ Corrigé | 145 (5.18%) | ⭐⭐⭐ Top 2 |
| Nantes | `/nantes` | ✅ Corrigé | 87 (3.11%) | ⭐⭐⭐ Top 4 |
| Rouen | `/rouen` | ✅ Corrigé | 62 (2.22%) | ⭐⭐⭐ Top 6 |
| Bordeaux | `/bordeaux` | ⏳ Pas fait | Faible | ⭐⭐ Moyen |
| Lille | `/lille` | ⏳ Pas fait | Faible | ⭐⭐ Moyen |
| Lyon | `/lyon` | ⏳ Pas fait | Faible | ⭐⭐ Moyen |
| Marseille | `/marseille` | ⏳ Pas fait | Faible | ⭐⭐ Moyen |
| Montpellier | `/montpellier` | ⏳ Pas fait | Faible | ⭐⭐ Moyen |
| Nice | `/nice` | ⏳ Pas fait | Faible | ⭐⭐ Moyen |
| Toulouse | `/toulouse` | ⏳ Pas fait | Faible | ⭐⭐ Moyen |

**Total impressions pages quartiers optimisées**: 449/mois (16% total impressions)

---

## 🔧 Status Technique

### JSON-LD (11 sites)
- ✅ Organization + Logo: 11/11
- ✅ LocalBusiness: 11/11
- ✅ HowTo schema: 11/11
- ✅ searchIntent: transactional: 11/11
- Status: 🔄 Build en cours (vérifier J+1)

### Canonical URLs
- ✅ Bordeaux: Corrigé (`www.bordeaux-demenageur.fr`)
- ✅ 10 autres: Déjà corrects
- Status: 🔄 Build en cours (vérifier J+1)

### Dockerfiles SITE_URL
- ✅ ARG SITE_URL: 11/11
- ✅ ENV SITE_URL: 11/11 (builder + runner)
- Status: ✅ Déployé

---

## 💡 Décisions Stratégiques

### Pourquoi Homepages 11/11 mais Quartiers 4/11 ?

**Homepages**:
- Effort: 0h (wording centralisé `buildSiteMetadata`)
- Impact: Futur (quand volume augmente)
- Décision: Faire 100% immédiatement

**Quartiers**:
- Effort: 1h/ville (templates locaux)
- Impact: Immédiat (pages ont déjà du trafic)
- Décision: Data-driven (top 4 d'abord, rollout si succès)

### Pourquoi Blog pas fait ?

**Blog**:
- Volume actuel: 0 impressions (sites neufs)
- Effort: 3-4h (templates intent × 841 articles)
- ROI: 0 court terme
- Décision: Attendre que blog ait du trafic

---

## 📊 Impact Projeté

### Court terme (J+7-14)
**Pages quartiers top 4 optimisées**:
- Impressions: 449/mois
- CTR avant: ~2%
- CTR après: 4-6%
- **Clics**: +80-160/mois ✅

### Moyen terme (J+30-60)
**Homepages + Quartiers**:
- CTR homepages: 2% → 6-8%
- CTR quartiers: 2% → 4-6%
- **Clics**: +2500-4000/mois ✅

### Long terme (J+90+)
**Tout cumulé** (homepages + quartiers + rich snippets):
- **Clics**: +4000-7000/mois ✅

---

## 🎯 Checklist Reprise

### Aujourd'hui/Demain (J+1)
- [ ] Refresh dashboard 11 sites
- [ ] Vérifier wording "Comparables 7j" visible homepages
- [ ] Vérifier searchIntent "déclaré dans JSON"
- [ ] Vérifier HowTo au vert
- [ ] Test canonical Bordeaux = `www.bordeaux-demenageur.fr`

### J+7 (7 nov)
- [ ] Google Search Console: Mesurer CTR 4 pages quartiers
- [ ] Si +2-4 pts confirmé → Go rollout 7 villes
- [ ] Si échec → Analyser pourquoi, ajuster

### J+30 (30 nov)
- [ ] Mesurer CTR homepages (si volume significatif)
- [ ] Vérifier volume blog (si impressions > 0 → optimiser)

---

**Version**: 1.0  
**Dernière mise à jour**: 31 octobre 2025  
**Status**: 🔄 Builds en cours, vérification J+1

