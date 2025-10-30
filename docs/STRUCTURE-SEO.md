# Structure SEO Moverz — Documentation Technique

**Objectif**: Architecture centralisée, cohérente et maintenable pour Titles/Meta/JSON‑LD/Breadcrumbs, sans A/B test, orientée CTR et rich results.

---

## Principes directeurs

1. **Source unique SEO**: un seul module pour gabarits Title/Meta/année/prix.
2. **Pas d'invention de contenu**: réutilisation stricte des données existantes.
3. **Intent-first**: gabarits alignés sur requêtes (prix, devis, comparatif).
4. **Rich results**: BreadcrumbList, FAQPage, Service, ItemList activés partout où pertinent.
5. **QA automatisé**: détection incohérences (année, longueurs, canonicals).

---

## Modules créés

### 1. Helpers JSON‑LD (`lib/schema/`)

#### `lib/schema/breadcrumb.ts`
- **Fonction**: `buildBreadcrumbListSchema(items: BreadcrumbItem[])`
- **Type retour**: `WithContext<BreadcrumbList>`
- **Usage**: générer schéma BreadcrumbList à partir d'un tableau d'items `{ label, href }`.

#### `lib/schema/faq.ts`
- **Fonction**: `buildFaqPageSchema(qas: QAItem[])`
- **Type retour**: `WithContext<FAQPage>`
- **Usage**: générer schéma FAQPage à partir de questions/réponses `{ question, answer }`.

#### `lib/schema/service.ts`
- **Fonction**: `buildServiceSchema(input: ServiceInput)`
- **Type retour**: `WithContext<Service>`
- **Usage**: générer schéma Service/LocalBusiness avec `name`, `serviceType`, `url`, `telephone`, `areaServed`, `priceRange`, `address`.

### 2. Builder Metadata (`lib/seo-builders.ts`)

- **Fonction**: `buildSiteMetadata(intent: 'default' = 'default')`
- **Type retour**: `Metadata` (Next.js)
- **Usage**: génère `title`, `description`, `metadataBase`, `robots`, `openGraph`, `twitter` à partir de la ville (`getCityDataFromUrl(env.SITE_URL)`).
- **État actuel**: réplique exactement le wording de `app/layout.tsx` pour permettre bascule progressive sans changer textes.

### 3. Sécurisation Sitemap (`next-sitemap.config.js`)

- **Changement**: exige `process.env.SITE_URL`; **pas de fallback** vers domaine générique.
- **Rationale**: éviter canonicals/sitemaps erronés en multi-sites.
- **Impact**: le build échoue si `SITE_URL` est absent (fail fast).

### 4. QA automatisé (`scripts/seo-qa.js`)

- **Fonction**: détecte occurrences "2024" dans `sites/*/app/layout.tsx`.
- **Usage**: `node scripts/seo-qa.js`
- **Sortie**: liste des fichiers et lignes contenant "2024".
- **Objectif**: repérer incohérences d'année avant release.

---

## Intégrations réalisées

### Breadcrumbs (visuel + JSON‑LD)

#### Composants modifiés
- `components/Breadcrumbs.tsx`
- `sites/nice/components/Breadcrumbs.tsx`
- `sites/lyon/components/Breadcrumbs.tsx`
- `sites/lille/components/Breadcrumbs.tsx`
- `sites/bordeaux/components/Breadcrumbs.tsx`
- `sites/rennes/components/Breadcrumbs.tsx`
- `sites/marseille/components/Breadcrumbs.tsx`
- `sites/toulouse/components/Breadcrumbs.tsx`
- `sites/nantes/components/Breadcrumbs.tsx`
- `sites/strasbourg/components/Breadcrumbs.tsx`
- `sites/rouen/components/Breadcrumbs.tsx`

#### Ajout
```tsx
const JsonLd = () => {
  try {
    const { buildBreadcrumbListSchema } = require('@/lib/schema/breadcrumb');
    const json = buildBreadcrumbListSchema(items.map(i => ({ label: i.label, href: i.href })));
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      />
    );
  } catch {
    return null;
  }
};
```
- **Rendu**: inchangé (UI identique).
- **SEO**: injection `BreadcrumbList` JSON‑LD automatique partout où breadcrumbs visuels existent.

### Harmonisation Années 2024 → 2025

#### Fichiers corrigés
- `sites/rouen/app/layout.tsx` — Title: `... | 2024` → `... | 2025`
- `sites/nice/app/layout.tsx` — Title: `... | -40% 2024` → `... | -40% 2025`
- `sites/nantes/app/layout.tsx` — Title + Description: `2024` → `2025`
- `sites/bordeaux/app/layout.tsx` — Title: `... | -40% 2024` → `... | -40% 2025`
- `sites/lille/app/layout.tsx` — Title: `... | -40% 2024` → `... | -40% 2025`

#### Méthode
- Recherche grep `2024` ciblée sur `sites/*/app/layout.tsx`.
- Remplacement strict "2024" → "2025", zéro changement de wording ni prix.

---

## État des lieux SEO par ville (après intervention)

| Ville       | Title année | Description prix | BreadcrumbList | FAQ JSON‑LD (global) | ItemList (quartiers) |
|-------------|-------------|------------------|----------------|----------------------|----------------------|
| Nice        | 2025 ✅     | "dès 299€"       | ✅             | ✅ (StructuredData)  | ✅                   |
| Lyon        | Sans année  | "dès 295€"       | ✅             | ✅ (StructuredData)  | ✅                   |
| Lille       | 2025 ✅     | "dès 275€"       | ✅             | ✅ (StructuredData)  | ✅                   |
| Bordeaux    | 2025 ✅     | "dès 290€"       | ✅             | ✅ (StructuredData)  | ✅                   |
| Rennes      | 2025 ✅     | "dès 280€"       | ✅             | ✅ (StructuredData)  | ✅                   |
| Marseille   | (à vérifier)| (à vérifier)     | ✅             | ✅ (StructuredData)  | ✅                   |
| Nantes      | 2025 ✅     | "dès 299€"       | ✅             | ✅ (StructuredData)  | ✅                   |
| Toulouse    | (à vérifier)| (à vérifier)     | ✅             | ✅ (StructuredData)  | ✅                   |
| Strasbourg  | (à vérifier)| (à vérifier)     | ✅             | ✅ (StructuredData)  | ✅                   |
| Rouen       | 2025 ✅     | "dès 280€"       | ✅             | ✅ (StructuredData)  | ✅                   |
| Montpellier | (à vérifier)| (à vérifier)     | ✅             | ✅ (StructuredData)  | ✅                   |

---

## Schémas JSON‑LD présents (héritage + nouveau)

### Déjà en place (conservé)
- **`FAQPage` global** (via `components/StructuredData.tsx` et clones par ville) : 4 questions génériques (gratuité, délai, IA, zones).
- **`Service`** (via `StructuredData.tsx`) : comparateur déménagement, prix 0€.
- **`ItemList`** (pages `quartiers-{ville}`) : index quartiers/communes.
- **`Article`** (pages blog, ex: Bordeaux) : structured data article.

### Nouveau (ajouté aujourd'hui)
- **`BreadcrumbList`** (tous les `Breadcrumbs` global + villes) : fil d'Ariane structuré pour SERP enrichies.

---

## Opportunités restantes (sans coder nouveau contenu)

### 1. FAQ locales sur pages money
- **Principe**: reprendre les Q/R existantes dans contenus/fiches locales, ajouter 3–4 Q/R hyper-locales par ville.
- **Exemple (Nice)**: "Autorisation stationnement déménagement Nice ?" — "Demande en ligne nice.fr/demarches, délai 7j."
- **Implémentation**: utiliser `buildFaqPageSchema` et injecter JSON‑LD localement à la page (en complément du FAQ global).

### 2. Centralisation progressive des Metadata
- **Option A (recommandée)**: basculer `app/layout.tsx` et `sites/*/app/layout.tsx` sur `buildSiteMetadata()` sans changer textes.
- **Bénéfice**: modification future d'années/prix en un seul endroit.
- **Risque**: faible (wording strictement identique pour l'instant).

### 3. Gabarits intent-first (futur)
- Créer 3 variantes de `buildSiteMetadata(intent: 'price' | 'devis' | 'comparatif')`.
- Exemple:
  - **prix**: "Prix déménagement {Ville} 2025 : {xx–yy}€ | Devis 2 min"
  - **devis**: "Devis déménagement {Ville} immédiat | Prix transparents 2025"
  - **comparatif**: "Top {N} déménageurs {Ville} 2025 (prix, avis)"
- **Note**: requiert validation business des promesses/prix par ville avant déploiement.

---

## Commandes utiles

### QA année
```bash
node scripts/seo-qa.js
```
Détecte "2024" dans layouts ville. Sortie vide = OK.

### Vérif canonicals/sitemaps
```bash
# En dev, vérifier que SITE_URL est bien défini
echo $SITE_URL
# ou
grep SITE_URL .env
```

### Regénération sitemaps (post-build)
```bash
cd sites/nice && npm run postbuild
# Génère sitemap.xml et robots.txt
```

---

## Checklist avant release

- [ ] `node scripts/seo-qa.js` → aucune occurrence "2024"
- [ ] Tous les `sites/*/app/layout.tsx` ont année cohérente (2025 ou sans année)
- [ ] `SITE_URL` défini pour chaque site (env)
- [ ] Breadcrumbs visuels présents → BreadcrumbList JSON‑LD injecté ✅
- [ ] Pages quartiers/communes → ItemList JSON‑LD présent ✅
- [ ] StructuredData global (Service + FAQ générique) actif par ville ✅
- [ ] Longueurs Title < 60 chars, Meta 150–160 chars (à vérifier manuellement ou script)
- [ ] OG image existe (`/og-image.jpg` par site)
- [ ] Robots.txt généré et correct (allow `/`, disallow `/api/`, `/admin/`)

---

## Prochaines étapes suggérées (optionnelles)

1. **Brancher `buildSiteMetadata`** dans layouts (sans changer wording).
2. **Ajouter FAQ locales** (reprendre contenu existant fiches/blog) sur pages money (ville).
3. **Étendre QA script** pour vérifier longueurs Title/Meta, présence schémas requis.
4. **Documenter prix/fourchettes par ville** dans un fichier `lib/cities-data.ts` (source unique promesses).

---

## Glossaire technique

- **BreadcrumbList**: schema.org pour fil d'Ariane (améliore CTR SERP).
- **FAQPage**: schema.org pour Q/R (éligible rich snippets + "People Also Ask").
- **Service**: schema.org pour services locaux (signale type d'activité à Google).
- **ItemList**: schema.org pour listes (index quartiers, classements).
- **metadataBase**: base URL canonique Next.js (évite URLs relatives en OG/canonical).
- **Intent-first**: gabarits SEO alignés sur l'intention de recherche (info/transaction/comparatif).

---

**Version**: 1.0  
**Date**: 30 octobre 2025  
**Auteur**: Équipe SEO Moverz  
**Maintenance**: ce document doit être mis à jour à chaque ajout de module ou changement de stratégie SEO.

