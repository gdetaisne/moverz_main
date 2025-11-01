# Commits GitHub : TASK-006

## 📦 Commits Migration Initiale (31 octobre 2025)

> **Note** : SHA à documenter depuis l'historique Git  
> Ces commits correspondent aux phases 1-10 de la migration

### Phase 1-9 : Marseille (31 octobre)

#### Commit #1 : Création helper canonical
```bash
# À documenter depuis git log
git log --oneline --grep="canonical-helper" --grep="Marseille"
```

**Description** :
- Création `sites/marseille/lib/canonical-helper.ts`
- Fonctions : getCanonicalUrl, getCanonicalAlternates, getOpenGraphMetadata, getFullMetadata
- Tests helper validés

**Fichiers modifiés** :
- `sites/marseille/lib/canonical-helper.ts` (nouveau)

**SHA** : ⏳ À documenter

---

#### Commit #2-3 : Migration pages principales Marseille
**Description** :
- Homepage, services, quartiers
- Utilisation helper dans metadata

**Fichiers modifiés** (~50) :
- `sites/marseille/app/layout.tsx`
- `sites/marseille/app/services/*.tsx`
- `sites/marseille/app/*/page.tsx`

**SHA** : ⏳ À documenter

---

#### Commit #4-6 : Migration blog Marseille
**Description** :
- Blog index, catégories, articles
- Canonical dynamique par article

**Fichiers modifiés** (~70) :
- `sites/marseille/app/blog/page.tsx`
- `sites/marseille/app/blog/[category]/page.tsx`
- `sites/marseille/app/blog/[category]/[slug]/page.tsx`

**SHA** : ⏳ À documenter

---

#### Commit #7-9 : Pages légales + corridors Marseille
**Description** :
- Mentions légales, CGV, CGU, politique
- Corridors (Marseille → Paris, Lyon, etc.)

**Fichiers modifiés** (~15) :
- `sites/marseille/app/mentions-legales/page.tsx`
- `sites/marseille/app/*/page.tsx` (légales)
- `sites/marseille/app/marseille-vers-*/page.tsx`

**SHA** : ⏳ À documenter

---

### Phase 10 : 10 Autres Villes (31 octobre)

#### Commit #10 : Migration Nice
**Description** :
- Copie helper canonical-helper.ts
- Migration 133 pages

**Fichiers modifiés** (~135) :
- `sites/nice/lib/canonical-helper.ts` (nouveau)
- `sites/nice/app/**/*.tsx`

**SHA** : ⏳ À documenter

---

#### Commit #11 : Migration Toulouse
**Description** :
- Helper + 128 pages

**Fichiers modifiés** (~130) :
- `sites/toulouse/lib/canonical-helper.ts` (nouveau)
- `sites/toulouse/app/**/*.tsx`

**SHA** : ⏳ À documenter

---

#### Commit #12-13 : Migration Lyon, Bordeaux, Nantes
**Description** :
- 3 villes en un seul commit ou séparées

**Fichiers modifiés** (~360) :
- `sites/lyon/**`
- `sites/bordeaux/**`
- `sites/nantes/**`

**SHA** : ⏳ À documenter

---

#### Commit #14-15 : Migration Strasbourg, Lille, Rennes, Montpellier, Rouen
**Description** :
- 5 dernières villes

**Fichiers modifiés** (~650) :
- `sites/strasbourg/**`
- `sites/lille/**`
- `sites/rennes/**`
- `sites/montpellier/**`
- `sites/rouen/**`

**SHA** : ⏳ À documenter

---

## 📦 Commits Corrections Bugs Résiduels (1er novembre 2025)

### Commit BUG-1 : Fix quartiers hardcodés 'lille'

**Branche** : `main` (ou `fix/canonical-bugs`)

**Description** :
```
fix(canonical): Corriger quartiers hardcodés 'lille' → slug dynamique

PROBLÈME :
- 10 sites utilisent 'quartiers-lille' au lieu de quartiers-{ville}
- Canonicals pointent vers URLs 404
- Impact SEO critique

SOLUTION :
- Remplacer par `quartiers-${city.slug}` dynamique
- Utiliser getCityDataFromUrl() pour résoudre ville

FICHIERS (10) :
- sites/toulouse/app/quartiers-toulouse/page.tsx
- sites/strasbourg/app/quartiers-strasbourg/page.tsx
- sites/rouen/app/quartiers-rouen/page.tsx
- sites/rennes/app/quartiers-rennes/page.tsx
- sites/nice/app/quartiers-nice/page.tsx
- sites/nantes/app/quartiers-nantes/page.tsx
- sites/marseille/app/quartiers-marseille/page.tsx
- sites/lyon/app/quartiers-lyon/page.tsx
- sites/bordeaux/app/quartiers-bordeaux/page.tsx
- sites/montpellier/app/quartiers-montpellier/page.tsx

TASK-006 Bug résiduel #1
```

**Commande** :
```bash
git add sites/*/app/quartiers-*/page.tsx
git commit -m "fix(canonical): Corriger quartiers hardcodés 'lille' → slug dynamique

- Remplacer 'quartiers-lille' par \`quartiers-\${city.slug}\`
- 10 sites corrigés
- Impact : canonicals corrects sur pages quartiers

TASK-006 Bug #1"
```

**SHA** : ⏳ À documenter après commit

**Fichiers modifiés** : 10

---

### Commit BUG-2 : Fix metadata "Lille" dans autres villes

**Description** :
```
fix(metadata): Remplacer "Lille" hardcodé par ville dynamique

PROBLÈME :
- Toulouse (min 6 fichiers) affiche "Lille" au lieu de "Toulouse"
- Titles et descriptions incorrects
- Impact CTR et UX critique

SOLUTION :
- Utiliser ${city.nameCapitalized} dynamique
- Vérifier toutes les villes avec grep

FICHIERS (Toulouse minimum) :
- sites/toulouse/app/quartiers-toulouse/page.tsx (title + description)
- sites/toulouse/app/notre-offre/page.tsx (description)
- sites/toulouse/app/inventaire-ia/layout.tsx (description)
- sites/toulouse/app/faq/layout.tsx (description)
- sites/toulouse/app/estimation-rapide/layout.tsx (description)
- sites/toulouse/app/contact/page.tsx (description)

+ Autres villes si détectées par grep

TASK-006 Bug résiduel #2
```

**Commande** :
```bash
# Vérifier toutes les villes d'abord
grep -r "Déménagement à Lille" sites/*/app --include="*.tsx" | grep -v "sites/lille"

# Corriger tous les fichiers détectés
git add sites/*/app/{quartiers-*,notre-offre,inventaire-ia,faq,estimation-rapide,contact}/*.tsx
git commit -m "fix(metadata): Remplacer 'Lille' hardcodé par ville dynamique

- Corriger titles et descriptions
- Utiliser \${city.nameCapitalized}
- Toulouse + autres villes affectées

TASK-006 Bug #2"
```

**SHA** : ⏳ À documenter après commit

**Fichiers modifiés** : 6+ (selon résultats grep)

---

### Commit BUG-3 : Rendre templates 100% dynamiques

**Description** :
```
refactor(templates): Rendre CorridorPage et LocalPage dynamiques

PROBLÈME :
- CorridorPage.tsx : "Marseille" hardcodé (ligne 48)
- LocalPage.tsx : "Nice" et "toulouse" hardcodés (lignes 45, 122)
- Templates non réutilisables entre villes

SOLUTION :
- Ajouter getCityDataFromUrl() dans templates
- Utiliser ${city.nameCapitalized} partout
- Templates 100% génériques

FICHIERS (2 par ville × 11 = 22 fichiers) :
- sites/*/app/_templates/CorridorPage.tsx
- sites/*/app/_templates/LocalPage.tsx

TASK-006 Bug résiduel #3
```

**Modifications** :
```typescript
// CorridorPage.tsx
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';

export function generateCorridorPageJsonLd(destination: string) {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Déménagement ${city.nameCapitalized} → ${destination} — comparaison de devis`,
    // ...
  };
}

// LocalPage.tsx
export function generateLocalPageMetadata(zone: string, zoneDisplay: string): Metadata {
  const city = getCityDataFromUrl(env.SITE_URL);
  return {
    title: `Déménagement ${zoneDisplay} ${city.nameCapitalized} - Tarifs & Devis...`,
    // ...
  };
}

// Ligne 122 - Remplacer hardcodé
<div className="text-white/80 text-sm">{city.nameCapitalized}</div>
```

**Commande** :
```bash
git add sites/*/app/_templates/*.tsx
git commit -m "refactor(templates): Rendre CorridorPage et LocalPage dynamiques

- getCityDataFromUrl() dans templates
- Remplacer 'Marseille', 'Nice', 'toulouse' par \${city.nameCapitalized}
- Templates réutilisables 11 villes

TASK-006 Bug #3"
```

**SHA** : ⏳ À documenter après commit

**Fichiers modifiés** : 22 (2 par ville)

---

### Commit BUG-4 : Uniformiser cityData.ts trailing slash

**Description** :
```
fix(cityData): Uniformiser siteUrl SANS trailing slash

PROBLÈME :
- Inconsistance : toulouse avec /, nice sans /
- Source de confusion
- Helper corrige auto mais convention floue

SOLUTION :
- Convention : TOUJOURS sans trailing slash dans cityData
- Helper getCanonicalUrl() ajoute automatiquement
- Documentation explicite

FICHIERS (11) :
- sites/*/lib/cityData.ts

MODIFICATION :
- Enlever trailing slash de tous les siteUrl
- Ajouter commentaire explicatif

TASK-006 Bug résiduel #4
```

**Modification** :
```typescript
// sites/*/lib/cityData.ts

// Convention : siteUrl SANS trailing slash
// Le helper getCanonicalUrl() ajoute automatiquement le slash final
export const cityData: Record<string, CityData> = {
  toulouse: {
    slug: 'toulouse',
    siteUrl: 'https://devis-demenageur-toulousain.fr', // Sans /
    // ...
  },
  nice: {
    slug: 'nice',
    siteUrl: 'https://devis-demenageur-nice.fr', // Sans /
    // ...
  },
  // ... autres villes
};
```

**Commande** :
```bash
git add sites/*/lib/cityData.ts
git commit -m "fix(cityData): Uniformiser siteUrl SANS trailing slash

- Enlever trailing slash de tous les siteUrl
- Convention : helper ajoute le slash automatiquement
- Documentation explicite

TASK-006 Bug #4"
```

**SHA** : ⏳ À documenter après commit

**Fichiers modifiés** : 11

---

## 📊 Récapitulatif Commits

### Migration Initiale (31 oct)
| Phase | Commits | Fichiers | SHA |
|-------|---------|----------|-----|
| Marseille (1-9) | ~9 | ~130 | ⏳ |
| 10 villes (10) | ~6 | ~1277 | ⏳ |
| **TOTAL** | **~15** | **~1407** | - |

### Corrections Bugs (1er nov)
| Bug | Commit | Fichiers | SHA |
|-----|--------|----------|-----|
| #1 Quartiers | 1 | 10 | ⏳ |
| #2 Metadata | 1 | 6+ | ⏳ |
| #3 Templates | 1 | 22 | ⏳ |
| #4 cityData | 1 | 11 | ⏳ |
| **TOTAL** | **4** | **49+** | - |

**GRAND TOTAL** : ~19 commits, ~1456+ fichiers modifiés

---

## 🔍 Commandes Utiles

### Documenter SHA après commits

```bash
# Lister commits TASK-006
git log --oneline --grep="TASK-006" --grep="canonical" --grep="fix(canonical)" -i

# Détails commit spécifique
git show <SHA>

# Fichiers modifiés par commit
git diff-tree --no-commit-id --name-only -r <SHA>

# Statistiques commit
git show --stat <SHA>
```

### Vérifier commits sur GitHub

```bash
# Pusher vers GitHub
git push origin main

# Vérifier sur GitHub
# https://github.com/{user}/{repo}/commits/main
```

### Tag release (optionnel)

```bash
# Créer tag après finalisation TASK-006
git tag -a v1.0.0-canonical -m "TASK-006: Migration canonicals complète - 11 villes"
git push origin v1.0.0-canonical
```

---

## ✅ Checklist Commits

### Migration Initiale
- [x] 15+ commits sur `main` (phases 1-10)
- [x] Tous les commits pushés GitHub
- [ ] SHA documentés dans ce fichier

### Corrections Bugs
- [ ] Commit Bug #1 (quartiers)
- [ ] Commit Bug #2 (metadata)
- [ ] Commit Bug #3 (templates)
- [ ] Commit Bug #4 (cityData)
- [ ] SHA documentés

### Validation
- [ ] Vérifier commits sur GitHub
- [ ] Vérifier aucun conflit
- [ ] Vérifier CI/CD passe (si configuré)
- [ ] Tag release créé (optionnel)

---

## 📝 Template Message Commit

### Format Standard
```
<type>(<scope>): <description courte>

<description détaillée>
- Point 1
- Point 2
- Point 3

<impact>

<référence tâche>
```

### Exemples

**Type** :
- `feat` : nouvelle fonctionnalité
- `fix` : correction bug
- `refactor` : refactoring sans changement fonctionnel
- `docs` : documentation
- `test` : ajout/modification tests

**Scope** :
- `canonical` : URLs canoniques
- `metadata` : metadata SEO
- `templates` : composants templates
- `cityData` : données villes

**Référence** :
- `TASK-006` : toujours mentionner
- `Bug #X` : numéro bug si applicable

---

*Document créé le : 1er novembre 2025*  
*Dernière mise à jour : 1er novembre 2025*  
*SHA à compléter après commits effectifs*


