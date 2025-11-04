# Progress Log - TASK-012

## Session Initiale : 30-31/10/2025 (3h30)

**Actions effectuées** :
- ✅ Metadata dynamiques services + contact (11 villes)
- ✅ Correction bug Lille hardcodé
- ✅ Fix quartiers Bordeaux dans autres sites
- ✅ Remplacement emails par contact@domaine.fr (11 villes)
- ✅ Correction URL Bordeaux cityData
- ✅ Footer résolution villes SITE_URL
- ✅ 5 commits GitHub main

**Temps** : 3h30

---

## Session 04/11/2025 : Pattern 1 "à Lille" (2h)

### Découverte : 77 fichiers villes hardcodées (10 villes)

**Scan révèle 2 patterns principaux** :

**Pattern 1 "à Lille"** : 40 fichiers (10 villes)
- Files : `estimation-rapide/layout.tsx`, `faq/layout.tsx`, `notre-offre/page.tsx`, `inventaire-ia/layout.tsx`
- Villes : Nice, Lyon, Marseille, Bordeaux, Lille, Nantes, Rennes, Rouen, Strasbourg, Montpellier

**Pattern 2 "à Marseille"** : 27 fichiers (9 villes)  
- Files : `partenaires/page.tsx`, `blog/page.tsx`, `comment-ca-marche/page.tsx`
- Villes : Lyon, Bordeaux, Lille, Nantes, Rennes, Rouen, Strasbourg, Montpellier

---

### Phase 1 : Correction Pattern 1 (16 fichiers corrigés)

**Villes traitées** :
- ✅ Nice (4 fichiers) : estimation-rapide, faq, notre-offre, inventaire-ia
- ✅ Lyon (4 fichiers) : estimation-rapide, faq, notre-offre, inventaire-ia
- ✅ Marseille (4 fichiers) : estimation-rapide, faq, notre-offre, inventaire-ia
- ✅ Lille (4 fichiers) : estimation-rapide, faq, notre-offre, inventaire-ia

**Méthode** :
```typescript
// Avant
import { getCanonicalUrl } from "@/lib/canonical-helper";
export const metadata: Metadata = {
  title: "Estimation Rapide Déménagement Lille | Calcul Volume | Moverz",
  description: "Estimez rapidement... à Lille...",
}

// Après
import { getCityDataFromUrl } from "@/lib/cityData";
import { env } from "@/lib/env";
const city = getCityDataFromUrl(env.SITE_URL);
export const metadata: Metadata = {
  title: `Estimation Rapide Déménagement ${city.nameCapitalized} | Calcul Volume | Moverz`,
  description: `Estimez rapidement... à ${city.nameCapitalized}...`,
}
```

**Tests** :
- ✅ 0 occurrence "à Lille" hardcodé dans 16 fichiers
- ✅ cityData importé et utilisé partout
- ✅ Pas d'erreurs linter
- ✅ Build local validé

**Commit** : `da4c1da` (16 fichiers, 116 insertions, 52 deletions)

---

### Phase 2 : Bug FAQ backticks découvert

**Diagnostic build local Lille** :
- ✅ Metadata (`<title>`, `<meta description>`) : Correctes ("Lille")
- ❌ Contenu page (`<h1>`, `<summary>`) : Code brut `${city.nameCapitalized}` visible

**Cause** : Guillemets doubles au lieu de backticks dans template literals
```typescript
// Bug
q: "Combien de cartons... à ${city.nameCapitalized} ?"  // ❌ Pas interpolé

// Fix
q: `Combien de cartons... à ${city.nameCapitalized} ?`  // ✅ Interpolé
```

**Scope** : 11 villes affectées (Nice 16, Lyon 16, Marseille 16, Bordeaux 16, Lille 16→8 corrigées, etc.)

**Correction Lille** : 8 occurrences restantes corrigées
- 4 questions (`q:`)
- 2 réponses (`a:`)
- 3 JSX (`alt`, `h1`, lien)

**Commit** : `6c00451` (1 fichier, 9 insertions, 9 deletions)

**Nouvelle task créée** : TASK-038 (P1, 1.5-2h, 10 villes restantes)

---

### État Actuel

**✅ Corrigé (17 fichiers)** :
- Pattern 1 : Nice, Lyon, Marseille, Lille (16 fichiers)
- FAQ backticks : Lille (1 fichier)

**⏳ Restant Pattern 1 (24 fichiers)** :
- Bordeaux (4 fichiers)
- Nantes (4 fichiers)
- Rennes (4 fichiers)
- Rouen (4 fichiers)
- Strasbourg (4 fichiers)
- Montpellier (4 fichiers)

**⏳ Restant Pattern 2 (27 fichiers)** :
- 9 villes × 3 fichiers (partenaires, blog, comment-ca-marche)

**Temps restant estimé** :
- Pattern 1 (24 fichiers) : 30-40min
- Pattern 2 (27 fichiers) : 40-50min
- Tests + déploiement : 30min
- **Total** : ~2h

---

### Tests En Attente

**Lille production** :
- ⏳ Pattern 1 : En cours déploiement CapRover
- ⏳ FAQ backticks : En cours déploiement CapRover

**À tester quand déployé** :
- [ ] Lille /estimation-rapide/ → "Lille" dans title
- [ ] Lille /faq/ → "Lille" dans h1 (pas `${city`)
- [ ] Lille /faq/ → Questions avec "Lille" interpolé

---

**Session mise en pause** : 04/11/2025 13:15 GMT  
**Raison** : Attente déploiement + continuation différée  
**Prochaine étape** : Pattern 1 (6 villes restantes)

# Journal de progression — 04/11/2025

- Micro-étapes appliquées (NeighborhoodsTeaser.tsx) — ajout du trailing slash aux liens quartiers et au lien "Voir tous les quartiers" pour cohérence SEO interne.
- Villes traitées (11/11):
  - sites/nice/components/NeighborhoodsTeaser.tsx
  - sites/lyon/components/NeighborhoodsTeaser.tsx
  - sites/marseille/components/NeighborhoodsTeaser.tsx
  - sites/nantes/components/NeighborhoodsTeaser.tsx
  - sites/rennes/components/NeighborhoodsTeaser.tsx
  - sites/strasbourg/components/NeighborhoodsTeaser.tsx
  - sites/rouen/components/NeighborhoodsTeaser.tsx
  - sites/toulouse/components/NeighborhoodsTeaser.tsx
  - sites/montpellier/components/NeighborhoodsTeaser.tsx
  - sites/bordeaux/components/NeighborhoodsTeaser.tsx
  - sites/lille/components/NeighborhoodsTeaser.tsx

Notes:
- Pas de logique ville conditionnelle détectée; corrections limitées aux href internes.
- Aucune erreur linter.

