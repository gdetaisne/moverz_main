# 🎯 PLAN DE CORRECTION BUGS RÉSIDUELS - TASK-006

**Date** : 1er novembre 2025  
**Statut TASK-006** : 95% fait (corrections bugs pour finaliser à 100%)  
**Temps estimé** : 2h30  
**Priorité** : P1 (impact SEO critique)

---

## 📋 Vue d'Ensemble

### Bugs Identifiés (4)

| Bug | Impact | Fichiers | Temps | Priorité |
|-----|--------|----------|-------|----------|
| **#1 Quartiers** | CRITIQUE SEO | 10 | 15 min | P0 |
| **#2 Metadata** | CRITIQUE UX/SEO | 6+ | 30 min | P1 |
| **#3 Templates** | MOYEN | 22 | 20 min | P2 |
| **#4 cityData** | FAIBLE | 11 | 10 min | P3 |
| **Tests + Deploy** | - | - | 55 min | - |
| **TOTAL** | - | **49+** | **2h30** | - |

---

## 🚀 ÉTAPE 1 : Bug #1 - Quartiers Hardcodés (15 min)

### Problème
```typescript
// ❌ Tous les sites sauf Lille utilisent 'quartiers-lille'
canonical: getCanonicalUrl('quartiers-lille'),
// → Génère /quartiers-lille/ au lieu de /quartiers-toulouse/
```

### Solution
```typescript
// ✅ Utiliser slug dynamique
const city = getCityDataFromUrl(env.SITE_URL);
canonical: getCanonicalUrl(`quartiers-${city.slug}`),
```

### Fichiers à Corriger (10)
```
sites/toulouse/app/quartiers-toulouse/page.tsx
sites/strasbourg/app/quartiers-strasbourg/page.tsx
sites/rouen/app/quartiers-rouen/page.tsx
sites/rennes/app/quartiers-rennes/page.tsx
sites/nice/app/quartiers-nice/page.tsx
sites/nantes/app/quartiers-nantes/page.tsx
sites/marseille/app/quartiers-marseille/page.tsx
sites/lyon/app/quartiers-lyon/page.tsx
sites/bordeaux/app/quartiers-bordeaux/page.tsx
sites/montpellier/app/quartiers-montpellier/page.tsx
```

### Actions
```bash
# 1. Pour CHAQUE fichier ci-dessus :

# A. Ajouter imports si manquants (en haut du fichier)
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";

# B. Dans export const metadata, ajouter AVANT la déclaration :
const city = getCityDataFromUrl(env.SITE_URL);

# C. Remplacer la ligne canonical
# AVANT :
canonical: getCanonicalUrl('quartiers-lille'),

# APRÈS :
canonical: getCanonicalUrl(`quartiers-${city.slug}`),
```

### Test Rapide
```bash
# Après modification, vérifier qu'il ne reste plus de 'quartiers-lille'
grep -r "quartiers-lille" sites/*/app --include="*.tsx" | grep -v "sites/lille"
# Résultat attendu : vide
```

### Commit
```bash
git add sites/*/app/quartiers-*/page.tsx
git commit -m "fix(canonical): Corriger quartiers hardcodés 'lille' → slug dynamique

- Remplacer 'quartiers-lille' par \`quartiers-\${city.slug}\`
- 10 sites corrigés
- Impact : canonicals corrects sur pages quartiers

TASK-006 Bug #1"
```

---

## 🚀 ÉTAPE 2 : Bug #2 - Metadata "Lille" (30 min)

### Problème
```typescript
// ❌ Toulouse affiche "Lille" au lieu de "Toulouse"
title: "Quartiers & communes — Déménagement à Lille | IA & transparence",
description: "...à Lille : Vieux Lille, Centre, Wazemmes..."
```

### Solution
```typescript
// ✅ Utiliser ville dynamique
const city = getCityDataFromUrl(env.SITE_URL);
title: `Quartiers & communes — Déménagement à ${city.nameCapitalized} | IA & transparence`,
description: `...à ${city.nameCapitalized} : ...`
```

### Détection Fichiers Affectés
```bash
# Vérifier TOUTES les villes (pas que Toulouse)
for ville in toulouse strasbourg rouen rennes nice nantes marseille lyon bordeaux montpellier; do
  echo "=== Vérification $ville ==="
  grep -r "Déménagement à Lille\|déménagement à Lille" sites/$ville/app --include="*.tsx" 2>/dev/null
done
```

### Fichiers Connus Toulouse (minimum 6)
```
sites/toulouse/app/quartiers-toulouse/page.tsx
sites/toulouse/app/notre-offre/page.tsx
sites/toulouse/app/inventaire-ia/layout.tsx
sites/toulouse/app/faq/layout.tsx
sites/toulouse/app/estimation-rapide/layout.tsx
sites/toulouse/app/contact/page.tsx
```

### Actions

#### Pour quartiers-toulouse/page.tsx
```typescript
// Ajouter imports
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";

// Ajouter AVANT export const metadata
const city = getCityDataFromUrl(env.SITE_URL);

// Remplacer metadata
export const metadata = {
  title: `Quartiers & communes — Déménagement à ${city.nameCapitalized} | IA & transparence`,
  description: `Trouvez votre page quartier/commune pour estimer votre déménagement à ${city.nameCapitalized}...`,
  alternates: {
    canonical: getCanonicalUrl(`quartiers-${city.slug}`), // Bug #1 déjà corrigé
  },
};
```

#### Pour autres fichiers (notre-offre, inventaire-ia, etc.)
```typescript
// Même pattern : ajouter city et remplacer "Lille" par ${city.nameCapitalized}
```

### Test
```bash
# Vérifier qu'il ne reste plus de "Lille" hardcodé
grep -r "Déménagement à Lille" sites/toulouse/app --include="*.tsx"
# Résultat attendu : vide

# Vérifier autres villes
grep -r "Déménagement à Lille" sites/*/app --include="*.tsx" | grep -v "sites/lille"
# Résultat attendu : vide
```

### Commit
```bash
git add sites/*/app/{quartiers-*,notre-offre,inventaire-ia,faq,estimation-rapide,contact}/*.tsx
git commit -m "fix(metadata): Remplacer 'Lille' hardcodé par ville dynamique

- Corriger titles et descriptions
- Utiliser \${city.nameCapitalized}
- Toulouse + autres villes affectées

TASK-006 Bug #2"
```

---

## 🚀 ÉTAPE 3 : Bug #3 - Templates Dynamiques (20 min)

### Problème
```typescript
// ❌ CorridorPage.tsx ligne 48
"name": `Déménagement Marseille → ${destination}...`

// ❌ LocalPage.tsx ligne 45
title: `Déménagement ${zoneDisplay} Nice - Tarifs...`

// ❌ LocalPage.tsx ligne 122
<div className="text-white/80 text-sm">toulouse</div>
```

### Fichiers à Corriger (22 = 2 × 11 villes)
```
sites/*/app/_templates/CorridorPage.tsx
sites/*/app/_templates/LocalPage.tsx
```

### Actions CorridorPage.tsx

```typescript
// 1. Ajouter imports (si manquants)
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';

// 2. Dans generateCorridorPageJsonLd() - ligne 44-56
export function generateCorridorPageJsonLd(destination: string) {
  const city = getCityDataFromUrl(env.SITE_URL); // ← AJOUTER
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Déménagement ${city.nameCapitalized} → ${destination} — comparaison de devis`, // ← MODIFIER
    "provider": {
      "@type": "Organization",
      "name": "Moverz"
    },
    "areaServed": `${city.nameCapitalized} → ${destination}`, // ← MODIFIER
    "serviceType": "Mise en relation et comparaison de devis"
  };
}

// 3. Vérifier autres occurrences "Marseille" dans le fichier
# grep -n "Marseille" CorridorPage.tsx
# Remplacer par ${city.nameCapitalized} si nécessaire
```

### Actions LocalPage.tsx

```typescript
// 1. Ajouter imports (si manquants)
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';

// 2. Dans generateLocalPageMetadata() - ligne 41-55
export function generateLocalPageMetadata(zone: string, zoneDisplay: string): Metadata {
  const city = getCityDataFromUrl(env.SITE_URL); // ← AJOUTER
  const canonicalUrl = getCanonicalUrl(`${city.slug}/${zone}`);
  return {
    title: `Déménagement ${zoneDisplay} ${city.nameCapitalized} - Tarifs & Devis Gratuit | Moverz`, // ← MODIFIER
    description: `Déménageur local ${zoneDisplay} à ${city.nameCapitalized} : tarifs détaillés...`, // ← MODIFIER
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `Déménagement ${zoneDisplay} ${city.nameCapitalized}`, // ← MODIFIER
      description: `Déménageur local ${zoneDisplay} à ${city.nameCapitalized}`, // ← MODIFIER
      url: canonicalUrl,
      type: 'website',
    },
  };
}

// 3. Dans generateLocalPageJsonLd() - ligne 57-70
export function generateLocalPageJsonLd(zone: string, zoneDisplay: string) {
  const city = getCityDataFromUrl(env.SITE_URL); // ← AJOUTER
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Comparaison de devis déménagement — ${zoneDisplay}`,
    "provider": {
      "@type": "Organization",
      "name": "Moverz"
    },
    "areaServed": `${city.nameCapitalized} — ${zoneDisplay}`, // ← MODIFIER
    "serviceType": "Mise en relation et comparaison de devis"
  };
}

// 4. Ligne 122 - Hardcodé "toulouse"
// AVANT :
<div className="text-white/80 text-sm">toulouse</div>

// APRÈS :
<div className="text-white/80 text-sm">{city.nameCapitalized}</div>

// NOTE : Nécessite const city dans le composant LocalPage (ligne 72-83)
export default function LocalPage({...}: LocalPageProps) {
  const city = getCityDataFromUrl(env.SITE_URL); // ← AJOUTER en haut de la fonction
  const jsonLd = generateLocalPageJsonLd(zone, zoneDisplay);
  // ...
}

// 5. Ligne 255 - Vérifier "toulouse intra-muros"
// AVANT :
{['toulouse intra-muros', 'Gironde', ...]}

// APRÈS :
{[`${city.nameCapitalized} intra-muros`, city.region, ...]}
```

### Test
```bash
# Vérifier qu'il ne reste plus de villes hardcodées
grep -n "Marseille\|Nice\|toulouse" sites/toulouse/app/_templates/*.tsx

# Résultat attendu : seulement des utilisations dynamiques ${city.nameCapitalized}
```

### Commit
```bash
git add sites/*/app/_templates/*.tsx
git commit -m "refactor(templates): Rendre CorridorPage et LocalPage dynamiques

- getCityDataFromUrl() dans templates
- Remplacer 'Marseille', 'Nice', 'toulouse' par \${city.nameCapitalized}
- Templates réutilisables 11 villes

TASK-006 Bug #3"
```

---

## 🚀 ÉTAPE 4 : Bug #4 - Uniformiser cityData.ts (10 min)

### Problème
```typescript
// Inconsistance
toulouse: { siteUrl: 'https://devis-demenageur-toulousain.fr/' }  // avec /
nice: { siteUrl: 'https://devis-demenageur-nice.fr' }             // sans /
```

### Solution
**Convention** : Toujours SANS trailing slash dans cityData  
(Le helper `getCanonicalUrl()` l'ajoute automatiquement)

### Fichiers (11)
```
sites/*/lib/cityData.ts
```

### Actions

```typescript
// Pour CHAQUE fichier sites/{ville}/lib/cityData.ts

// 1. Ajouter commentaire explicatif en haut du fichier (ligne 1-5)
/**
 * Données centralisées par ville pour Moverz
 * Source unique de vérité pour métadonnées, schema.org, sitemaps, etc.
 * 
 * Convention : siteUrl SANS trailing slash (le helper l'ajoute automatiquement)
 */

// 2. Pour CHAQUE ville dans cityData, enlever trailing slash de siteUrl

// AVANT :
toulouse: {
  siteUrl: 'https://devis-demenageur-toulousain.fr/',
}

// APRÈS :
toulouse: {
  siteUrl: 'https://devis-demenageur-toulousain.fr',
}
```

### Détection Fichiers à Corriger
```bash
# Trouver tous les siteUrl avec trailing slash
grep "siteUrl:" sites/*/lib/cityData.ts | grep "/$"
```

### Test
```bash
# Vérifier qu'aucun siteUrl n'a de trailing slash
grep "siteUrl:" sites/*/lib/cityData.ts | grep "/$"
# Résultat attendu : vide

# Vérifier que les helpers fonctionnent toujours
cd sites/nice && pnpm dev
# Tester localhost:3000 → vérifier canonical
```

### Commit
```bash
git add sites/*/lib/cityData.ts
git commit -m "fix(cityData): Uniformiser siteUrl SANS trailing slash

- Enlever trailing slash de tous les siteUrl
- Convention : helper ajoute le slash automatiquement
- Documentation explicite

TASK-006 Bug #4"
```

---

## 🧪 ÉTAPE 5 : Tests Live (30 min)

### Test Nice (15 min)

```bash
# 1. Homepage
curl -s https://devis-demenageur-nice.fr/ | grep canonical
# Attendu : .../nice.fr/"

# 2. Quartiers (Bug #1 corrigé)
curl -s https://devis-demenageur-nice.fr/quartiers-nice/ | grep canonical
# Attendu : .../quartiers-nice/" (PAS quartiers-lille)

# 3. Blog
curl -s https://devis-demenageur-nice.fr/blog/prix/ | grep canonical
# Attendu : .../blog/prix/"

# 4. Service
curl -s https://devis-demenageur-nice.fr/services/demenagement-standard-nice/ | grep canonical
# Attendu : .../services/demenagement-standard-nice/"

# 5. Redirection 308
curl -I https://devis-demenageur-nice.fr/quartiers-nice
# Attendu : HTTP/2 308 + Location: .../quartiers-nice/
```

### Test Toulouse (15 min)

```bash
# 1. Homepage
curl -s https://devis-demenageur-toulousain.fr/ | grep canonical

# 2. Quartiers (Bugs #1 + #2 corrigés)
curl -s https://devis-demenageur-toulousain.fr/quartiers-toulouse/ | grep -E '<title>|description|canonical'
# Vérifier :
# - Title : "...à Toulouse" (PAS "à Lille")
# - Description : quartiers Toulouse (PAS "Vieux Lille")
# - Canonical : /quartiers-toulouse/ (PAS /quartiers-lille/)

# 3. Notre Offre (Bug #2 corrigé)
curl -s https://devis-demenageur-toulousain.fr/notre-offre/ | grep description
# Vérifier : "...à Toulouse" (PAS "à Lille")

# 4. Contact (Bug #2 corrigé)
curl -s https://devis-demenageur-toulousain.fr/contact/ | grep description
# Vérifier : "...à Toulouse"
```

### Script Automatisé
```bash
# Re-run script complet
./scripts/test-all-canonicals.sh

# Attendu : 11/11 ✅
```

---

## 🚀 ÉTAPE 6 : Commit & Deploy (25 min)

### Push GitHub (5 min)
```bash
# Vérifier statut
git status

# Vérifier que les 4 commits sont prêts
git log --oneline -4

# Push
git push origin main

# Vérifier sur GitHub
# https://github.com/{user}/{repo}/commits/main
```

### Déploiement CapRover (20 min)

#### Nice
```bash
# Redéployer Nice
cd sites/nice
caprover deploy

# Ou via interface CapRover :
# 1. Se connecter à CapRover
# 2. Sélectionner app "devis-demenageur-nice"
# 3. Onglet "Deployment"
# 4. Force rebuild
```

#### Toulouse
```bash
# Redéployer Toulouse
cd sites/toulouse
caprover deploy
```

#### Autres villes (optionnel si temps)
- Priorité : Nice + Toulouse (bugs les plus visibles)
- Autres villes : déploiement progressif ou batch

---

## ✅ ÉTAPE 7 : Validation Finale (5 min + 48h GSC)

### Checklist Immédiate (5 min)
```bash
# 1. Tests post-déploiement
curl -s https://devis-demenageur-nice.fr/quartiers-nice/ | grep canonical
curl -s https://devis-demenageur-toulousain.fr/quartiers-toulouse/ | grep -E '<title>|canonical'

# 2. Vérifier pas de régression
./scripts/test-all-canonicals.sh

# 3. View source manuel
# Nice : view-source:https://devis-demenageur-nice.fr/quartiers-nice/
# Toulouse : view-source:https://devis-demenageur-toulousain.fr/quartiers-toulouse/
```

### Google Search Console (48h après)
1. Nice → Onglet "Couverture" → vérifier 0 erreurs canonical
2. Toulouse → Idem
3. Inspection URL `/quartiers-nice/` → vérifier canonical correct
4. Sitemaps → vérifier URLs détectées avec trailing slash

---

## 📊 Récapitulatif Timeline

| Étape | Durée | Cumul |
|-------|-------|-------|
| 1. Bug #1 Quartiers | 15 min | 15 min |
| 2. Bug #2 Metadata | 30 min | 45 min |
| 3. Bug #3 Templates | 20 min | 1h05 |
| 4. Bug #4 cityData | 10 min | 1h15 |
| 5. Tests Live | 30 min | 1h45 |
| 6. Commit + Deploy | 25 min | 2h10 |
| 7. Validation | 5 min | 2h15 |
| **Buffer** | 15 min | **2h30** |

---

## 🎯 Critères de Succès

### Tests Techniques ✅
- [ ] Grep "quartiers-lille" → vide (sauf sites/lille)
- [ ] Grep "Déménagement à Lille" → vide (sauf sites/lille)
- [ ] Grep templates villes hardcodées → vide
- [ ] Grep cityData trailing slash → vide
- [ ] Script test-all-canonicals.sh → 11/11 ✅

### Tests Fonctionnels ✅
- [ ] Nice /quartiers-nice/ → canonical correct
- [ ] Toulouse /quartiers-toulouse/ → title + canonical corrects
- [ ] Redirections 308 fonctionnelles
- [ ] Aucune régression détectée

### Commits ✅
- [ ] 4 commits sur GitHub main
- [ ] SHA documentés dans commits.md
- [ ] Messages descriptifs

### Déploiement ✅
- [ ] Nice redéployé et fonctionnel
- [ ] Toulouse redéployé et fonctionnel
- [ ] Pas d'erreurs 500/404

### Documentation ✅
- [x] README.md complet
- [x] context.md détaillé
- [x] progress.md à jour
- [ ] commits.md avec SHA
- [x] tests.md avec protocoles
- [x] decisions.md
- [x] PLAN-CORRECTION.md (ce fichier)

---

## 🚨 Points d'Attention

### Risques
1. **Compilation** : Vérifier que TypeScript compile sans erreurs
2. **Imports** : Bien ajouter getCityDataFromUrl partout
3. **Scope variable** : `city` doit être accessible là où utilisé
4. **Templates** : city doit être dans le scope du composant (pas que metadata)

### Si Problème
```bash
# Rollback commit spécifique
git revert <SHA>
git push origin main

# Tests locaux avant deploy
cd sites/nice && pnpm dev
# Vérifier localhost:3000
```

---

**Prêt à démarrer ? Commande :**
```bash
"Cursor, je démarre les corrections bugs TASK-006 selon PLAN-CORRECTION.md"
```

---

*Document créé le : 1er novembre 2025*  
*Temps estimé : 2h30*  
*Objectif : Finaliser TASK-006 à 100%*


