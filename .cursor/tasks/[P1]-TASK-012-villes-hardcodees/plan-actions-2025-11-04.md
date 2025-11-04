# Plan d’actions — petites tâches simples (TASK-012)

## Stratégie recommandée (sécurisée, 2 étapes)
1) Corriger la SOURCE (template) du composant fautif
   - Fichier: `components/NeighborhoodsTeaser.tsx` (modèle racine)
   - Action: remplacer toute référence statique `quartiers-lille` par une construction dynamique basée sur la ville courante
     - Ex: utiliser `getCityDataFromUrl(env.SITE_URL)` + `getCanonicalUrl(\`quartiers-${city.slug}\`)` (ou équivalent pour props `href`)
   - Bénéfices: une seule modif, évite 11 edits manuels, cohérence future

2) Synchroniser sur 11 villes + tests
   - Script: `./scripts/sync/sync-components.sh`
   - Tests: ouvrir 2 sites (Nice, Lyon) et vérifier teaser quartiers → liens/canonicals corrects
   - Commit: `fix(components): NeighborhoodsTeaser dynamique (11 villes)`

## Alternative (si on veut VRAIMENT de « très petites » étapes)
Découper par ville (11 mini-tâches de 3-4 minutes chacune):
1. Corriger `sites/nice/components/NeighborhoodsTeaser.tsx`
2. Corriger `sites/lyon/components/NeighborhoodsTeaser.tsx`
3. Corriger `sites/marseille/components/NeighborhoodsTeaser.tsx`
4. Corriger `sites/nantes/components/NeighborhoodsTeaser.tsx`
5. Corriger `sites/rennes/components/NeighborhoodsTeaser.tsx`
6. Corriger `sites/strasbourg/components/NeighborhoodsTeaser.tsx`
7. Corriger `sites/rouen/components/NeighborhoodsTeaser.tsx`
8. Corriger `sites/toulouse/components/NeighborhoodsTeaser.tsx`
9. Corriger `sites/montpellier/components/NeighborhoodsTeaser.tsx`
10. Corriger `sites/bordeaux/components/NeighborhoodsTeaser.tsx`
11. Corriger `sites/lille/components/NeighborhoodsTeaser.tsx` (doit rester Lille OK)

## Contrôles rapides (garde-fous)
- Grep post-correction:
  - `rg -n "quartiers-(nice|lille|lyon|marseille|nantes|rennes|strasbourg|rouen|toulouse|montpellier|bordeaux)" sites/**/components/` → attendu: 0
- Canonical/links (2 villes):
  - Nice: teaser quartiers pointe vers `/quartiers-nice/`
  - Lyon: teaser quartiers pointe vers `/quartiers-lyon/`

## Optionnel (prévention régression)
- Hook pre-commit (grep) pour bloquer tout `quartiers-(nice|...)` dans `components/`
- Checklist PR: mentionner "11 villes synchro" si `components/` modifié

## Effort & Impact
- Effort: 10-20 min (stratégie source+sync) ou ~45-60 min (11 mini-tâches)
- Impact: supprime un hardcode critique transversal, réduit risques SEO/UX immédiats

