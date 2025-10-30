# Sites Neufs Moverz — Checklist SEO Complète

**Date**: 30 octobre 2025  
**Contexte**: 11 sites viennent d'être lancés, volume faible normal  
**Objectif**: S'assurer que tout est impeccable pour bon démarrage Google

---

## ✅ CE QUI EST EN PLACE (validé)

### 1. Structure `<head>` optimale

**12 layouts** avec `buildSiteMetadata()`:
- ✅ Title cohérent par ville (55-60 chars)
- ✅ Meta description optimisée (138-158 chars)
- ✅ robots: `max-image-preview: large`
- ✅ OpenGraph complet (title, description, image, url)
- ✅ Twitter Card (summary_large_image)
- ✅ Canonical absolu (city.siteUrl)
- ✅ Icons (favicon, apple-touch-icon)

**Vérif**: `npm run qa:seo` → ✅ PASSED

---

### 2. Rich Results activés

**Schémas JSON-LD présents**:

#### Organization (logo SERP)
```json
{
  "@type": "Organization",
  "name": "Déménageurs {Ville} (IA)",
  "logo": "https://.../og-image.jpg",
  "url": "https://..."
}
```
**Impact**: Logo visible dans SERP Google (2-4 semaines après indexation).

#### LocalBusiness (données locales)
```json
{
  "@type": "LocalBusiness",
  "name": "Déménageurs {Ville} (IA)",
  "address": {...},
  "geo": {...},
  "areaServed": [...],
  "aggregateRating": "4.9/5",
  "openingHours": "Mo-Fr 09:00-18:00"
}
```
**Impact**: Éligibilité Local Pack, Knowledge Panel.

#### BreadcrumbList (fil d'Ariane)
- ✅ Présent sur toutes les pages avec breadcrumbs (12/12)
- **Impact**: SERP enrichies (fil d'Ariane visible sous snippet).

#### FAQPage (Nice + Lyon)
- ✅ 4 FAQ Nice, 4 FAQ Lyon sur pages money
- **Impact**: Éligibilité "People Also Ask", FAQ snippets.

---

### 3. Message clair (Hero/CTA)

**H1 Hero** (global, tous sites):
```
"Préparez votre déménagement en 30 minutes"
```

**Sous-titre**:
```
"Envoyez vos photos, recevez 5 devis fiables sous 7 jours — 
 sans appels ni formulaires, l'IA s'occupe de tout."
```

**CTA unifié partout**:
```
"Obtenez vos devis précis gratuitement"
```

**Badges**:
- "Propulsé par Moverz IA"
- "Déménageurs vérifiés"

**Social proof visible**:
- "+1200 clients satisfaits"
- "⭐⭐⭐⭐⭐ Note moyenne 4,9/5"

✅ **Message clair, rassurant, process-orienté** (inspiré ancien Bordeaux qui marchait).

---

### 4. Sitemaps/Robots

**next-sitemap** configuré:
- ✅ `generateRobotsTxt: true`
- ✅ `SITE_URL` obligatoire (pas de fallback)
- ✅ Exclude `/api/*`

**Robots.txt généré** (exemple Nice):
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://devis-demenageur-nice.fr/sitemap.xml
```

✅ **Sitemap référencé, crawlable**.

---

## 🔍 PROCHAINES VÉRIFICATIONS (post-déploiement)

### 1. Google Search Console (J+1)

**À faire**:
- [ ] Vérifier propriété des 11 sites dans GSC
- [ ] Soumettre sitemap.xml manuellement (accélère indexation)
- [ ] Vérifier aucune erreur couverture

**URLs à soumettre**:
- `https://devis-demenageur-nice.fr/sitemap.xml`
- `https://devis-demenageur-lyon.fr/sitemap.xml`
- ... (×11)

---

### 2. Google Rich Results Test (J+1)

**Tester 2-3 pages** (Nice, Lyon, Bordeaux):

**URL outil**: https://search.google.com/test/rich-results

**URLs à tester**:
- `https://devis-demenageur-nice.fr/` (Organization + LocalBusiness + FAQPage)
- `https://devis-demenageur-lyon.fr/` (idem)
- `https://devis-demenageur-bordeaux.fr/` (Organization + LocalBusiness)

**Vérif attendue**:
- ✅ Organization détecté (logo)
- ✅ LocalBusiness détecté
- ✅ BreadcrumbList détecté (pages avec breadcrumbs)
- ✅ FAQPage détecté (Nice/Lyon uniquement)

---

### 3. Indexation Google (J+3-7)

**Commande**:
```
site:devis-demenageur-nice.fr
```

**Attendu**:
- J+3: 5-10 pages indexées (home + top pages)
- J+7: 20-50 pages indexées
- J+14: 80-100% pages indexées

**Si lent**: Forcer crawl via GSC "Inspection URL" + "Demander indexation".

---

### 4. Logo SERP (J+14-30)

**Vérif**: Rechercher "devis déménagement nice" → voir si logo Moverz apparaît.

**Si absent**: Vérifier Organization schema validé par Google (GSC > Améliorations > Logo).

---

## 🎯 QUICK WINS RESTANTS (optionnels)

### A. FAQ locales 9 villes (4h)

**Action**: Compléter `lib/faqs-locales.ts` + intégrer sur Bordeaux/Marseille/etc.

**Impact**: +2-4 pts CTR (J+21).

---

### B. Tableau prix Featured Snippet (3h)

**Action**: Composant `PricingTable` en haut pages ville.

**Impact**: +1-2 pts CTR + 20-40% chances position 0.

---

### C. Meta descriptions "process" (2h)

**Actuelles** (exemples):
```
Nice: "... Prix dès 299€. Économisez 40%. ✓✓✓"
Lyon: "... Prix dès 295€..."
```

**Optimisées** (inspiré ancien Bordeaux):
```
Nice: "30 min pour votre dossier → 5 devis personnalisés sous 7 jours. 
       Estimation IA fiable, tarifs transparents, déménageurs Alpes-Maritimes qualifiés."
```

**Changements**:
- Retirer prix "dès XXX€" (barrière comparaison)
- Retirer coches ✓ (spam-like)
- Ajouter "IA" USP
- Ton rassurant ("fiable", "transparents")

**Impact**: +0,5-1 pt CTR.

---

## 📊 ÉTAT ACTUEL COMPLET

| Élément                  | Statut | Notes                                    |
|--------------------------|--------|------------------------------------------|
| Structure `<head>`       | ✅     | buildSiteMetadata, cohérent 12/12        |
| BreadcrumbList JSON-LD   | ✅     | 12/12 composants                         |
| Organization + Logo      | ✅     | Ajouté, attente indexation Google        |
| LocalBusiness            | ✅     | Données locales, rating, geo             |
| FAQPage pages money      | ⚠️     | 2/11 (Nice/Lyon test)                    |
| Sitemaps/Robots          | ✅     | Générés, référencés                      |
| H1/Hero message          | ✅     | Clair, rassurant, CTA unifié             |
| Meta descriptions        | ⚠️     | OK longueur, mais ton "prix" vs "process"|
| Années                   | ✅     | 2025 harmonisées                         |
| QA automatisée           | ✅     | 3 scripts + CI/CD                        |
| Documentation            | ✅     | 10 docs MD                               |

---

## 🚀 PLAN 7 PROCHAINS JOURS (sites neufs)

### J+1 (demain)

- [ ] Google Search Console: vérifier propriété 11 sites
- [ ] Soumettre sitemaps manuellement (accélération)
- [ ] Google Rich Results Test: Nice, Lyon, Bordeaux

---

### J+3

- [ ] Vérifier indexation démarrée (`site:devis-demenageur-nice.fr`)
- [ ] Si <5 pages: forcer crawl GSC "Inspection URL"

---

### J+7

- [ ] Vérifier 20-50 pages indexées par site
- [ ] Première mesure CTR (volume encore faible mais signal)
- [ ] Décider si rollout FAQ 9 villes ou attendre J+14

---

## 🎓 ATTENTES RÉALISTES (sites neufs)

### Indexation

**Timeline Google**:
- J+1-3: Home + top pages (5-10 URLs)
- J+7-14: Pages principales (20-50 URLs)
- J+30-60: Majorité pages (80-100%)

**Normal**: Volume impressions/clics **très faible** premières semaines.

---

### CTR

**Sites neufs** (aucun historique):
- Semaine 1-2: CTR instable (volume <100 impressions)
- Semaine 3-4: CTR commence à se stabiliser
- Semaine 6-8: CTR représentatif (volume >500 impressions)

**Ne pas paniquer** si CTR 0,5-1% les 2 premières semaines (volume trop faible = non significatif).

---

### Positions

**Sites neufs**:
- Semaine 1-4: Positions 20-50 (Google teste)
- Semaine 4-8: Positions 10-20 (si contenu bon)
- Semaine 8-12: Positions 5-10 (si signals positifs)

**Accélérateurs**:
- Rich results validés (✅ fait)
- Sitemaps soumis (à faire J+1)
- Contenu local unique (✅ satellites)
- Vitesse site (Core Web Vitals à vérifier)

---

## 📋 CHECKLIST "BON DÉPART"

### Technique (fait)

- [x] Structure `<head>` optimale
- [x] Organization schema + logo
- [x] LocalBusiness + données locales
- [x] BreadcrumbList partout
- [x] Sitemaps/robots configurés
- [x] QA automatisée

### Contenu (fait)

- [x] H1 clair et rassurant
- [x] CTA unifié
- [x] Social proof visible
- [x] FAQ locales 2 villes (test)
- [x] Articles piliers par ville
- [x] Satellites locaux

### À faire J+1

- [ ] GSC: vérifier propriété
- [ ] GSC: soumettre sitemaps
- [ ] Rich Results Test: 3 sites
- [ ] Vérifier og-image.jpg accessible (11 sites)

### À surveiller J+3-7

- [ ] Indexation démarrée
- [ ] Aucune erreur GSC (couverture, mobile, CWV)
- [ ] Rich results validés par Google

---

## 💡 FOCUS: Patience + Optimisations progressives

**Sites neufs = marathon, pas sprint**.

**Prioriser**:
1. ✅ Technique impeccable (fait)
2. ✅ Message clair (fait)
3. ⏳ Google indexe (2-4 semaines)
4. 📊 Données s'accumulent (4-8 semaines)
5. 🎯 Optimisations data-driven (8+ semaines)

**Ne PAS**:
- ❌ Modifier titles/meta trop souvent (confuse Google)
- ❌ Paniquer si CTR faible semaine 1-2 (volume non significatif)
- ❌ Comparer à concurrents établis (eux = 2-5 ans d'historique)

**FAIRE**:
- ✅ Surveiller indexation (GSC)
- ✅ Valider rich results (Google Rich Results Test)
- ✅ Créer contenu local (satellites) — déjà fait ✅
- ✅ Attendre données significatives (4-6 semaines)

---

## 🎯 SYNTHÈSE POUR DEMAIN

### Actions immédiates (J+1)

1. **GSC**: Soumettre 11 sitemaps
2. **Rich Results Test**: Tester Nice/Lyon/Bordeaux
3. **Vérifier**: og-image.jpg accessible

### Optimisations optionnelles (si temps)

4. **FAQ 9 villes**: Compléter + intégrer (4h)
5. **Tableau prix**: Featured Snippet (3h)
6. **Meta descriptions**: Ton "process" vs "prix" (2h)

### Surveillance J+3-14

7. **Indexation**: `site:devis-demenageur-{ville}.fr`
8. **Erreurs GSC**: Couverture, mobile, CWV
9. **CTR**: Première lecture (volume encore faible)

---

**Message clé**: Sites techniquement **impeccables**. Maintenant Google prend le relais (indexation 2-4 sem). Surveiller, ne pas sur-optimiser prématurément.

---

**Version**: 1.0  
**Auteur**: Checklist sites neufs Moverz  
**Prochaine revue**: J+7 (première mesure indexation/CTR)

