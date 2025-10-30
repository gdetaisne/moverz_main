# Homogénéisation Structure `<head>` — 11 Sites Moverz

**Date**: 30 octobre 2025  
**Objectif**: Structure `<head>` unifiée, maintenable, avec flag `isMoneyPage` pour intent-first futur

---

## Résumé exécutif

### ✅ Homogénéisation complète

**12 layouts migrés vers `buildSiteMetadata()`**:
- `app/layout.tsx` (racine)
- `sites/nice/app/layout.tsx`
- `sites/lyon/app/layout.tsx`
- `sites/lille/app/layout.tsx`
- `sites/marseille/app/layout.tsx`
- `sites/toulouse/app/layout.tsx`
- `sites/nantes/app/layout.tsx`
- `sites/strasbourg/app/layout.tsx`
- `sites/montpellier/app/layout.tsx`
- `sites/rouen/app/layout.tsx`
- `sites/bordeaux/app/layout.tsx`
- `sites/rennes/app/layout.tsx`

### Impact

- ✅ **Source unique** pour générer `<head>`
- ✅ **Wording strictement conservé** (zéro modification textes)
- ✅ **Flag `isMoneyPage`** ajouté pour templates intent-first futurs
- ✅ **Robustesse**: une seule fonction génère title/meta/OG/Twitter/robots/canonical/icons
- ✅ **Maintenabilité**: modification future années/prix en 1 point

---

## Changements builder

### `lib/seo-builders.ts`

#### Ajout `isMoneyPage` flag

```typescript
interface SiteMetadataOptions {
  intent?: SeoIntent;
  customTitle?: string;
  customDescription?: string;
  customTemplate?: string;
  /** Flag page money (landing conversion) → permettra intent-first dynamique futur */
  isMoneyPage?: boolean;
}

export function buildSiteMetadata(options: SiteMetadataOptions = {}): Metadata {
  const { intent = 'default', customTitle, customDescription, customTemplate, isMoneyPage = false } = options;
  // Note: isMoneyPage permettra plus tard d'appliquer des templates intent-first dynamiquement
  // Actuellement non utilisé, préparation architecture future
  ...
}
```

**Utilisation future**: `isMoneyPage: true` activera automatiquement templates "prix/devis 2025" quand logique intent-first sera implémentée.

---

## État par site (après homogénéisation)

| Site         | Builder | isMoneyPage | Wording conservé | Année  |
|--------------|---------|-------------|------------------|--------|
| racine       | ✅      | false       | ✅               | N/A    |
| Nice         | ✅      | true        | ✅               | 2025   |
| Lyon         | ✅      | true        | ✅               | N/A    |
| Lille        | ✅      | true        | ✅               | 2025   |
| Marseille    | ✅      | true        | ✅               | N/A    |
| Toulouse     | ✅      | true        | ✅               | N/A    |
| Nantes       | ✅      | true        | ✅               | 2025   |
| Strasbourg   | ✅      | true        | ✅               | N/A    |
| Montpellier  | ✅      | true        | ✅               | N/A    |
| Rouen        | ✅      | true        | ✅               | 2025   |
| Bordeaux     | ✅      | true        | ✅               | 2025   |
| Rennes       | ✅      | true        | ✅               | N/A    |

---

## Exemple migration (avant → après)

### Avant (Marseille)

```typescript
export const metadata: Metadata = {
  title: {
    default: `Déménagement Marseille Pas Cher | Comparateur Gratuit | -40%`,
    template: `%s | Déménageur Marseille`,
  },
  description: `Déménagement Marseille : comparez 5 devis en 2min. Prix dès 299€...`,
  metadataBase: new URL(city.siteUrl),
  robots: { ... },
  openGraph: { ... },
  twitter: { ... },
  alternates: { canonical: city.siteUrl },
  icons: { ... },
};
```

### Après (Marseille)

```typescript
// Metadata centralisée avec wording spécifique Marseille (source unique)
export const metadata: Metadata = buildSiteMetadata({
  customTitle: `Déménagement Marseille Pas Cher | Comparateur Gratuit | -40%`,
  customTemplate: `%s | Déménageur Marseille`,
  customDescription: `Déménagement Marseille : comparez 5 devis en 2min. Prix dès 299€...`,
  isMoneyPage: true,
});
```

**Bénéfices**:
- 60+ lignes → 6 lignes
- Robots/OG/Twitter/canonical/icons générés automatiquement
- Cohérence garantie entre sites
- Flag `isMoneyPage` prêt pour intent-first

---

## Wording par ville (conservé strictement)

| Ville       | Title                                                                 | Prix "dès" |
|-------------|-----------------------------------------------------------------------|------------|
| Nice        | `Déménagement Nice dès 299€ \| Comparateur Gratuit \| -40% 2025`     | 299€       |
| Lyon        | `Déménagement Lyon Pas Cher \| 5 Devis Gratuits 2min \| -40%`        | 295€       |
| Lille       | `Déménageur Lille dès 275€ \| Comparateur Gratuit \| -40% 2025`      | 275€       |
| Marseille   | `Déménagement Marseille Pas Cher \| Comparateur Gratuit \| -40%`     | 299€       |
| Toulouse    | `Déménageur Toulouse dès 285€ \| Devis Gratuit 2min \| -40%`         | 285€       |
| Nantes      | `Déménageur Nantes dès 299€ \| Devis Gratuit 2min \| -40% 2025`      | 299€       |
| Strasbourg  | `Déménagement Strasbourg dès 290€ \| Devis Gratuit 2min \| -40%`     | 290€       |
| Montpellier | `Déménageur Montpellier dès 295€ \| Devis Gratuit 2min \| -40%`      | 295€       |
| Rouen       | `Déménageur Rouen dès 280€ \| 5 Devis Gratuits en 2min \| 2025`      | 280€       |
| Bordeaux    | `Déménagement Bordeaux Pas Cher \| Devis Gratuit \| -40% 2025`       | 290€       |
| Rennes      | `Déménageur Rennes dès 280€ \| 5 Devis Gratuits 2min \| -40%`        | 280€       |

**Notes**:
- Certains sites ont "2025", d'autres non (conservé tel quel)
- Variations "Déménagement" vs "Déménageur" conservées
- Promesses "-40%" cohérentes partout

---

## Vérifications effectuées

### Linter
```bash
✅ Aucune erreur sur les 12 fichiers migrés
```

### QA années
```bash
node scripts/seo-qa.js
✅ Aucune occurrence "2024" dans layouts (déjà corrigé en phase précédente)
```

### Structure `<head>` générée

Tous les sites génèrent désormais:
- `<title>` custom par ville
- `<meta name="description">` custom par ville
- `<meta name="robots">` avec max-image-preview:large
- `<meta property="og:*">` (title, description, image, url, siteName)
- `<meta name="twitter:*">` (card, title, description, images)
- `<link rel="canonical">` pointant vers `city.siteUrl`
- `<link rel="icon">`, `<link rel="apple-touch-icon">`

---

## Prochaines étapes (intent-first)

### Phase future: templates dynamiques

Avec `isMoneyPage: true`, le builder pourra appliquer automatiquement des patterns intent-first:

```typescript
// Exemple futur (non implémenté)
if (isMoneyPage && intent === 'price') {
  // Override automatique pour pages "prix"
  customTitle = `Prix déménagement ${city.name} 2025 : ${cityData.priceFrom} | Devis 2 min`;
  customDescription = `Estimez votre déménagement à ${city.name} dès ${cityData.priceFrom}. Devis gratuit en 2 min. Mis à jour 2025.`;
}
```

**Avantages**:
- Activation centralisée par intent
- Wording 2025 systématique
- Prix cohérents avec `lib/cities-data.ts`
- Rollback facile (désactiver flag ou intent)

---

## Commandes utiles

### Vérif QA
```bash
node scripts/seo-qa.js
```

### Vérif imports builder
```bash
grep -r "buildSiteMetadata" sites/*/app/layout.tsx
# Doit retourner 11 occurrences (+ 1 dans app/layout.tsx racine = 12 total)
```

### Vérif flag isMoneyPage
```bash
grep -r "isMoneyPage: true" sites/*/app/layout.tsx
# Doit retourner 11 occurrences (toutes les villes)
```

---

## Checklist post-homogénéisation

- [x] 12 layouts migrés vers `buildSiteMetadata()`
- [x] Flag `isMoneyPage` ajouté au builder
- [x] Flag `isMoneyPage: true` appliqué aux 11 villes
- [x] Wording strictement conservé (zéro changement)
- [x] Aucune erreur lint
- [x] QA années OK (aucun "2024" résiduel)
- [x] Documentation complète
- [ ] Test build prod (à faire en déploiement)
- [ ] Vérif SITE_URL par site (env)

---

## Gains maintenabilité

### Avant
- 12 fichiers × 60 lignes metadata = **720 lignes dupliquées**
- Modifications nécessitant 12 search/replace manuels
- Risque d'incohérence OG/Twitter/robots entre sites

### Après
- 12 fichiers × 6 lignes appel builder = **72 lignes**
- 1 fonction `buildSiteMetadata` = **80 lignes**
- **Total: 152 lignes** (vs 720) = **-79% code**
- Modification année/prix/robots → **1 seul point** (builder ou `cities-data.ts`)
- Cohérence garantie (même fonction pour tous)

---

## Risques & atténuation

### Risque: Wording modifié par erreur
- **Impact**: CTR/ranking affectés
- **Atténuation**: conservation stricte via `customTitle/customDescription`
- **Vérif**: code review systématique

### Risque: `isMoneyPage` activé par erreur sur pages non-money
- **Impact**: templates intent-first inappropriés (futur)
- **Atténuation**: `isMoneyPage` actuellement non utilisé (préparation architecture)
- **Vérif**: limiter flag aux layouts ville uniquement (déjà fait)

### Risque: Build cassé si `SITE_URL` manquant
- **Impact**: erreur next-sitemap (voulu, fail fast)
- **Atténuation**: vérifier env avant déploiement
- **Vérif**: checklist pré-release

---

## Métriques succès

### Immédiates (J+0)
- [x] Build local OK
- [ ] Build prod OK (11 sites)
- [ ] Aucune régression visuelle `<head>`

### Court terme (J+7)
- [ ] Aucune régression CTR/impressions GSC
- [ ] Aucune erreur Search Console (robots/canonical)

### Long terme (maintenance)
- [ ] Modification années 2025 → 2026 en < 30 min (vs 2h avant)
- [ ] Rollout templates intent-first en < 1h

---

**Version**: 1.0  
**Auteur**: Équipe SEO Moverz  
**Maintenance**: mettre à jour si ajout de sites ou modification builder

