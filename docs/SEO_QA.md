# SEO QA Pipeline — Documentation

**Version**: 1.0  
**Date**: 30 octobre 2025  
**Objectif**: Garantir la qualité et cohérence SEO sur les 11 sites Moverz

---

## Vue d'ensemble

Le pipeline QA SEO vérifie automatiquement:
- ✅ Structure `<head>` (buildSiteMetadata, isMoneyPage, longueurs)
- ✅ Années obsolètes (détection "2024" dans layouts)
- ✅ BreadcrumbList JSON-LD (présence dans composants Breadcrumbs)

---

## Usage

### Commandes disponibles

```bash
# QA complète (recommandé)
npm run qa:seo

# Checks individuels
npm run qa:seo:head        # Structure <head> uniquement
npm run qa:seo:year        # Années obsolètes uniquement
npm run qa:seo:breadcrumb  # BreadcrumbList JSON-LD uniquement
```

### En développement

```bash
# Avant commit
npm run qa:seo

# Avant build
npm run build  # prebuild lance automatiquement qa:seo
```

### CI/CD

Le pipeline s'exécute automatiquement sur:
- Push vers `main`
- Pull requests vers `main`

Voir: `.github/workflows/seo-qa.yml`

---

## Checks détaillés

### 1. Structure `<head>` (seo-head-qa.ts)

#### Vérifications bloquantes (exit code 1)

**a) buildSiteMetadata() absent**
```
❌ sites/xxx/app/layout.tsx
   → buildSiteMetadata() absent → migration requise
```

**Fix**:
```typescript
// Avant
export const metadata: Metadata = {
  title: { default: "...", template: "..." },
  description: "...",
  // ... 50 lignes
};

// Après
import { buildSiteMetadata } from "@/lib/seo-builders";
export const metadata: Metadata = buildSiteMetadata({
  customTitle: "...",
  customTemplate: "...",
  customDescription: "...",
  isMoneyPage: true,  // Pour layouts ville
});
```

**b) isMoneyPage manquant (layouts ville)**
```
❌ sites/xxx/app/layout.tsx
   → isMoneyPage: true manquant (layout ville)
```

**Fix**: Ajouter `isMoneyPage: true` aux options de `buildSiteMetadata()`.

#### Warnings (non bloquants)

**a) Title trop long (> 60 chars)**
```
⚠️  sites/xxx/app/layout.tsx
   → Title 63 chars (> 60)
```

**Fix**: Raccourcir `customTitle`, ex:
- Retirer année si non critique
- Simplifier promesse "-40%" → "Pas Cher"
- Raccourcir "Comparateur Gratuit" → "Devis Gratuits"

**b) Title trop court (< 30 chars)**
```
⚠️  sites/xxx/app/layout.tsx
   → Title 28 chars (< 30)
```

**Fix**: Ajouter contexte (année, département, USP).

**c) Meta hors plage (< 120 ou > 160 chars)**
```
⚠️  sites/xxx/app/layout.tsx
   → Meta 165 chars (> 160)
```

**Fix**: Réduire `customDescription`:
- Retirer coches "✓" superflues
- Condenser promesses
- Privilégier chiffres + bénéfice + CTA

---

### 2. Années obsolètes (seo-qa.js)

#### Erreur bloquante

```
❌ Années "2024" détectées dans layouts:
   sites/nice/app/layout.tsx:21:    default: `... 2024`
```

**Fix**: Remplacer "2024" par "2025" (ou retirer année si non pertinente).

```typescript
// Avant
customTitle: `Déménagement Nice dès 299€ | Comparateur Gratuit | -40% 2024`

// Après
customTitle: `Déménagement Nice dès 299€ | Comparateur Gratuit | -40% 2025`
```

---

### 3. BreadcrumbList JSON-LD (seo-breadcrumb-qa.ts)

#### Warnings (non bloquants)

**a) Import buildBreadcrumbListSchema manquant**
```
⚠️  sites/xxx/components/Breadcrumbs.tsx
   → Import buildBreadcrumbListSchema manquant
```

**Fix**:
```typescript
import { buildBreadcrumbListSchema } from '@/lib/schema/breadcrumb';
```

**b) Appel buildBreadcrumbListSchema() manquant**
```
⚠️  sites/xxx/components/Breadcrumbs.tsx
   → Appel buildBreadcrumbListSchema() manquant
```

**Fix**: Ajouter composant interne JsonLd:
```typescript
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

**c) Injection script manquante**
```
⚠️  sites/xxx/components/Breadcrumbs.tsx
   → Injection <script type="application/ld+json"> manquante
```

**Fix**: Ajouter `<JsonLd />` dans le return du composant.

---

## Erreurs fréquentes

### 1. Build échoue avec "buildSiteMetadata is not a function"

**Cause**: Import manquant dans layout.

**Fix**:
```typescript
import { buildSiteMetadata } from "@/lib/seo-builders";
```

### 2. "SITE_URL manquant" en build

**Cause**: `next-sitemap.config.js` exige `SITE_URL` (sécurité multi-sites).

**Fix**: Définir `SITE_URL` dans `.env` ou env de build:
```bash
SITE_URL=https://demenageur-nice.fr npm run build
```

### 3. QA passe mais Title tronqué en SERP

**Cause**: Warning longueur ignoré (> 60 chars).

**Fix**: Raccourcir customTitle selon recommandations ci-dessus.

### 4. BreadcrumbList non détecté par Google

**Cause**: Composant Breadcrumbs sans JSON-LD.

**Fix**: Vérifier `npm run qa:seo:breadcrumb`, corriger warnings.

---

## Désactivation temporaire (dev uniquement)

### Désactiver prebuild

```bash
# Build sans QA (non recommandé)
npm run build --ignore-scripts
```

### Désactiver check spécifique

Commenter temporairement dans `package.json`:
```json
"qa:seo": "npm run qa:seo:head && npm run qa:seo:breadcrumb",
// "qa:seo:year" temporairement retiré
```

**⚠️ Ne jamais commit avec QA désactivé**

---

## Intégration CI/CD

### GitHub Actions

**Fichier**: `.github/workflows/seo-qa.yml`

**Déclencheurs**:
- Push vers `main`
- Pull requests vers `main`

**Comportement**:
- Installe dépendances (cache npm)
- Lance `npm run qa:seo`
- Fail si exit code 1 (erreurs bloquantes)
- Warnings n'empêchent pas le merge

**Résumé**: Visible dans l'onglet "Actions" de la PR.

---

## Maintenance du pipeline

### Ajouter un check

1. Créer script dans `scripts/seo-xxx-qa.ts`
2. Ajouter npm script `qa:seo:xxx`
3. Intégrer dans `qa:seo` (package.json)
4. Documenter dans cette section

### Modifier seuils longueurs

Éditer `scripts/seo-head-qa.ts`:
```typescript
const MAX_TITLE = 60;  // Ajuster ici
const MIN_TITLE = 30;
const MIN_META = 120;
const MAX_META = 160;
```

### Désactiver check BreadcrumbList

Retirer de `qa:seo` dans `package.json`:
```json
"qa:seo": "npm run qa:seo:head && npm run qa:seo:year"
// breadcrumb retiré
```

---

## Exemples sortie console

### ✅ QA réussie (sans warnings)

```
🔍 SEO Head QA - Vérification structure <head>

📁 12 layouts détectés

✅ app/layout.tsx
   Title: 55 chars
✅ sites/nice/app/layout.tsx
   Title: 58 chars
   Meta: 152 chars
✅ sites/lyon/app/layout.tsx
   Title: 52 chars
   Meta: 158 chars
... (9 autres)

────────────────────────────────────────────────────────────

📊 Résumé:
   buildSiteMetadata: 12/12
   isMoneyPage (villes): 11/11
   Erreurs bloquantes: 0
   Warnings: 0

✅ QA SEO HEAD: PASSED

🔍 Années "2024" - scan complet

✅ Aucune occurrence "2024" détectée

🔍 BreadcrumbList JSON-LD - Vérification composants

📁 11 composants Breadcrumbs détectés

✅ components/Breadcrumbs.tsx
✅ sites/nice/components/Breadcrumbs.tsx
... (9 autres)

────────────────────────────────────────────────────────────

📊 Résumé:
   Conformes: 11/11
   Warnings: 0

✅ BreadcrumbList QA: PASSED
```

### ⚠️ QA avec warnings

```
🔍 SEO Head QA - Vérification structure <head>

📁 12 layouts détectés

✅ app/layout.tsx
⚠️  sites/nice/app/layout.tsx
   → Title 63 chars (> 60)
⚠️  sites/lyon/app/layout.tsx
   → Meta 165 chars (> 160)
✅ sites/lille/app/layout.tsx
... (8 autres)

────────────────────────────────────────────────────────────

📊 Résumé:
   buildSiteMetadata: 12/12
   isMoneyPage (villes): 11/11
   Erreurs bloquantes: 0
   Warnings: 2

⚠️  QA SEO HEAD: PASSED (avec warnings)

🔍 Années "2024" - scan complet

✅ Aucune occurrence "2024" détectée

🔍 BreadcrumbList JSON-LD - Vérification composants

📁 11 composants Breadcrumbs détectés

✅ Conformes: 11/11

✅ BreadcrumbList QA: PASSED
```

### ❌ QA échouée (erreurs bloquantes)

```
🔍 SEO Head QA - Vérification structure <head>

📁 12 layouts détectés

✅ app/layout.tsx
❌ sites/nice/app/layout.tsx
   → buildSiteMetadata() absent → migration requise
❌ sites/lyon/app/layout.tsx
   → isMoneyPage: true manquant (layout ville)
... (9 autres)

────────────────────────────────────────────────────────────

📊 Résumé:
   buildSiteMetadata: 10/12
   isMoneyPage (villes): 9/11
   Erreurs bloquantes: 3
   Warnings: 0

❌ QA SEO HEAD: FAILED

🔍 Années "2024" - scan complet

❌ Années "2024" détectées dans layouts:
   sites/nice/app/layout.tsx:21

❌ QA ANNÉES: FAILED

Fix: Remplacer "2024" par "2025" dans les fichiers listés

→ Build interrompu
```

---

## Roadmap QA

### Phase 1 (actuelle)
- [x] Check buildSiteMetadata
- [x] Check isMoneyPage
- [x] Longueurs Title/Meta
- [x] Années obsolètes
- [x] BreadcrumbList JSON-LD

### Phase 2 (futur)
- [ ] Vérif OG image existe (fs check `/public/og-image.jpg`)
- [ ] Détection cannibalisation titles (doublons entre villes)
- [ ] Check FAQPage JSON-LD sur pages money
- [ ] Vérif SITE_URL cohérent avec city.siteUrl

### Phase 3 (avancé)
- [ ] Intégration Google Rich Results Test API
- [ ] Validation schema.org (external validator)
- [ ] Check Core Web Vitals seuils
- [ ] Rapport GSC automatisé (CTR/impressions)

---

## Troubleshooting

### "vscode-ripgrep not found"

**Cause**: Dépendance manquante pour `seo-qa.js`.

**Fix**:
```bash
npm install --save-dev vscode-ripgrep
```

### "tsx: command not found"

**Cause**: `tsx` non installé (requis pour scripts TypeScript).

**Fix**:
```bash
npm install --save-dev tsx
```

### Build local OK, CI fail

**Cause**: Dépendances non installées en CI ou cache npm corrompu.

**Fix**: Vérifier `.github/workflows/seo-qa.yml`:
```yaml
- name: Install dependencies
  run: npm ci  # Pas npm install
```

### Warnings légtimes à ignorer

Certains warnings sont acceptables:
- Title 61 chars (1 char au-dessus) → OK si critique (année, prix)
- Meta 162 chars (2 chars au-dessus) → OK si bénéfice important

**Ne pas contourner checks bloquants** (buildSiteMetadata, isMoneyPage).

---

## Best Practices

### 1. Lancer QA avant chaque commit

```bash
git add .
npm run qa:seo  # Vérif avant commit
git commit -m "feat: ..."
```

### 2. Corriger warnings progressivement

Ne pas bloquer le développement pour warnings:
- Créer issue/ticket pour chaque warning
- Prioriser warnings pages top-impressions GSC
- Corriger par batch (5-10 layouts/semaine)

### 3. Ne jamais skip prebuild en prod

```bash
# ❌ Dangereux
npm run build --ignore-scripts

# ✅ Correct
npm run build  # prebuild actif
```

### 4. Tester en local avant push

```bash
npm run qa:seo
# Si passed → safe to push
# Si failed → corriger avant push
```

---

## Architecture technique

### Scripts

| Script                    | Langage   | Fonction                                    | Bloquant |
|---------------------------|-----------|---------------------------------------------|----------|
| `seo-head-qa.ts`          | TypeScript| Structure <head>, buildSiteMetadata         | ✅       |
| `seo-qa.js`               | Node      | Années obsolètes "2024"                     | ✅       |
| `seo-breadcrumb-qa.ts`    | TypeScript| BreadcrumbList JSON-LD composants           | ❌       |

### Dépendances

- `tsx`: Exécution scripts TypeScript
- `vscode-ripgrep`: Recherche rapide (seo-qa.js)
- `fs`, `path`: Node built-ins (parsing fichiers)

**Aucune dépendance lourde** (ts-morph non utilisé, regex simple pour extraction).

---

## Métriques succès

### Immédiates (J+0)
- [x] Pipeline exécutable en local
- [x] CI/CD opérationnel
- [x] Documentation complète

### Court terme (J+7)
- [ ] 0 erreurs bloquantes sur main
- [ ] < 5 warnings persistants
- [ ] 100% layouts migrés buildSiteMetadata

### Long terme (maintenance)
- [ ] 0 régression détectée via QA
- [ ] Temps correction erreur < 10 min
- [ ] Adoption équipe 100% (QA avant commit)

---

## Ressources

### Documentation liée
- `docs/STRUCTURE-SEO.md` — Architecture SEO globale
- `docs/HOMOGENEISATION-HEAD-COMPLETE.md` — Migration layouts
- `docs/MIGRATION-SEO-COMPLETE.md` — Rapport complet migration

### Fichiers clés
- `lib/seo-builders.ts` — Builder Metadata
- `lib/schema/breadcrumb.ts` — Helper BreadcrumbList
- `lib/cities-data.ts` — Données villes (prix, départements)

### Contacts
- SEO Lead: questions stratégie SEO, gabarits intent-first
- Tech Lead: erreurs pipeline, ajout checks custom

---

**Version**: 1.0  
**Auteur**: Équipe SEO/Tech Moverz  
**Maintenance**: Mettre à jour si ajout de checks ou modification seuils

