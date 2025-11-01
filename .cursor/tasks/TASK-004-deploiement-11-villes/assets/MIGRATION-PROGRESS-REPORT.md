# 📊 Migration Canonicals — Rapport de Progression

**Date:** 31 octobre 2025  
**Status:** ✅ 3/11 villes migrées (27%)  
**Temps écoulé:** ~3h

---

## ✅ Villes Migrées

| Ville | Domaine | Status | Git Repo | Notes |
|-------|---------|--------|----------|-------|
| **Marseille** | `devis-demenageur-marseille.fr/` | ✅ Complété | dd-marseille | Template référence |
| **Nice** | `devis-demenageur-nice.fr/` | ✅ Complété | dd-nice | Copie de Marseille |
| **Toulouse** | `devis-demenageur-toulousain.fr/` | ✅ Complété | dd-toulouse | Copie de Nice |

---

## ⏳ Villes Restantes (7)

| # | Ville | Domaine | Priorité | Estimation |
|---|-------|---------|----------|------------|
| 4 | **Lyon** | `devis-demenageur-lyon.fr/` | ⭐⭐⭐ | 1h |
| 5 | **Bordeaux** | `www.bordeaux-demenageur.fr/` | ⭐⭐ | 1h ⚠️ (www.) |
| 6 | **Nantes** | `devis-demenageur-nantes.fr/` | ⭐⭐ | 1h |
| 7 | **Strasbourg** | `devis-demenageur-strasbourg.fr/` | ⭐⭐ | 1h |
| 8 | **Lille** | `devis-demenageur-lille.fr/` | ⭐⭐ | 1h |
| 9 | **Rennes** | `devis-demenageur-rennes.fr/` | ⭐ | 1h |
| 10 | **Montpellier** | `devis-demenageur-montpellier.fr/` | ⭐ | 1h |
| 11 | **Rouen** | `devis-demenageur-rouen.fr/` | ⭐ | 1h |

**Total restant:** ~7-8h

---

## 🔧 Modifications Appliquées (Template)

### Configuration
- ✅ `next.config.mjs`: `trailingSlash: true`
- ✅ `lib/env.ts`: `SITE_URL` avec slash `/`
- ✅ `lib/cityData.ts`: `siteUrl` avec slash `/`
- ✅ `next-sitemap.config.js`: `siteUrl` avec slash `/`
- ✅ `public/robots.txt`: `Host` + `Sitemap` avec slash `/`

### Helper + SEO
- ✅ `lib/canonical-helper.ts`: Helper centralisé copié de Marseille
- ✅ `lib/seo-builders.ts`: `siteUrlWithSlash` + nettoyage `alternates.canonical`

### Pages
- ✅ `app/partenaires/page.tsx`: `getCanonicalUrl('partenaires')`
- ✅ `app/comment-ca-marche/page.tsx`: `getCanonicalUrl('comment-ca-marche')`
- ✅ `app/blog/page.tsx`: `getCanonicalUrl('blog')`

### Templates
- ✅ `app/_templates/CorridorPage.tsx`: `getCanonicalUrl()` pour corridors
- ✅ `app/_templates/LocalPage.tsx`: `getCanonicalUrl()` + fix bug toulouse hardcoded

### Sitemap
- ✅ `app/sitemap.ts`: 100% `getCanonicalUrl()` (0 occurrences de `${baseUrl}`)

### Deployment
- ✅ `.caproverenv`: Créé avec `SITE_URL` correct
- ✅ `Dockerfile`: `ARG SITE_URL` avec valeur par défaut + slash `/`

---

## 📈 Impact Attendu

### SEO Benefits
- ✅ **Uniformisation canonicals**: Une seule version d'URL par page
- ✅ **Fin dilution PageRank**: Concentration du ranking
- ✅ **Redirections 308**: Préservation équité des liens
- ✅ **Cohérence absolue**: Sitemap + Canonicals + Liens internes
- ✅ **Conformité Google**: URLs avec `/` pour répertoires

### Technical Benefits
- ✅ **Helper centralisé**: Maintenance facile
- ✅ **Configuration Next.js**: `trailingSlash: true` global
- ✅ **Deployment robuste**: `.caproverenv` + Dockerfile fixé
- ✅ **Zero double slashes**: `getCanonicalUrl()` gère automatiquement

---

## 🎯 Prochaines Étapes Recommandées

### Option A: Valider en Production (Recommandé)
**Avant de continuer les 7 villes restantes:**
1. ✅ Tester Marseille, Nice, Toulouse en production
2. ✅ Vérifier canonicals homepage (`curl -s https://... | grep canonical`)
3. ✅ Vérifier sitemaps (`curl -s https://.../sitemap.xml`)
4. ✅ Vérifier redirections 308 (`curl -I https://.../partenaires`)
5. Si OK → Continuer avec les 7 autres villes

**Avantages:**
- Validation du template avant scale
- Détection d'erreurs éventuelles
- Confiance accrue pour les 7 villes restantes

---

### Option B: Continuer Immédiatement
**Faire les 7 villes restantes maintenant:**
- Lyon → Bordeaux → Nantes → Strasbourg → Lille → Rennes → Montpellier → Rouen
- Estimation: 7-8h avec workflow rodé

**Avantages:**
- Tout fait d'un coup
- Migration complète aujourd'hui

**Risques:**
- Si erreur dans template, impacte 7 villes
- Pas de validation intermédiaire

---

## 🛠️ Workflow Optimisé (Pour Villes Restantes)

**Temps par ville: ~1h**

### Étape 1: Configuration (15 min)
```bash
# next.config.mjs
Ajouter: trailingSlash: true

# lib/env.ts, lib/cityData.ts, next-sitemap.config.js, public/robots.txt
Remplacer URLs sans / par URLs avec /
```

### Étape 2: Copier Fichiers Corrigés (10 min)
```bash
cp nice/lib/canonical-helper.ts <ville>/lib/
cp nice/lib/seo-builders.ts <ville>/lib/
cp nice/app/partenaires/page.tsx <ville>/app/partenaires/
cp nice/app/comment-ca-marche/page.tsx <ville>/app/comment-ca-marche/
cp nice/app/blog/page.tsx <ville>/app/blog/
cp nice/app/_templates/* <ville>/app/_templates/
cp nice/app/sitemap.ts <ville>/app/
```

### Étape 3: Deployment (10 min)
```bash
# Créer .caproverenv
SITE_URL=https://devis-demenageur-<ville>.fr/
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Fixer Dockerfile
ARG SITE_URL=https://devis-demenageur-<ville>.fr/
```

### Étape 4: Git (5 min)
```bash
git add .
git commit -m "feat(<ville>): Migration canonicals avec trailing slash"
git push origin main
```

### Étape 5: Push Monorepo (5 min)
```bash
cd monorepo
git add sites/<ville>
git commit -m "feat(<ville>): Migration canonicals"
git push origin main
```

---

## 📋 Checklist Tests Production

Pour chaque ville migrée, tester:

### Canonical Homepage
```bash
curl -s https://devis-demenageur-<ville>.fr | grep -o '<link rel="canonical" href="[^"]*"'
```
**Attendu:** `href="https://devis-demenageur-<ville>.fr/"`

### Sitemap
```bash
curl -s https://devis-demenageur-<ville>.fr/sitemap.xml | grep '<loc>' | head -3
```
**Attendu:** Toutes URLs avec `/`

### Redirections 308
```bash
curl -I https://devis-demenageur-<ville>.fr/partenaires 2>&1 | grep -E "HTTP|location"
```
**Attendu:** `HTTP/2 308` + `location: /partenaires/`

---

## 🚨 Cas Spécial: Bordeaux

**Domaine:** `www.bordeaux-demenageur.fr` (avec `www.`)

**Modifications spécifiques:**
- `SITE_URL=https://www.bordeaux-demenageur.fr/`
- `siteUrl: 'https://www.bordeaux-demenageur.fr/'`
- Vérifier que le `www` est présent partout

---

## 📊 Résumé

| Métrique | Valeur |
|----------|--------|
| **Villes migrées** | 3/11 (27%) |
| **Fichiers modifiés/ville** | ~15 fichiers |
| **Temps moyen/ville** | ~1h (après rodage) |
| **Git commits** | 3 (1 par ville) |
| **Repos pushés** | 6 (3 villes × 2 repos) |
| **Progression** | 27% complété |

---

## 🎉 Conclusion

**3 villes migrées avec succès:**
- ✅ Marseille (template référence)
- ✅ Nice (workflow optimisé)
- ✅ Toulouse (workflow automatisé)

**7 villes restantes:**
- ⏳ Workflow éprouvé prêt à être répliqué
- ⏳ Estimation: 7-8h avec approche optimisée

**Recommandation:** Tester les 3 villes en production avant de continuer.

---

**Auteur:** IA Assistant  
**Date:** 31 octobre 2025  
**Version:** 1.0

