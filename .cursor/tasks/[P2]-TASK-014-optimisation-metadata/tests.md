# Tests : TASK-014 — Optimisation Métadonnées SEO

## Résultats QA 03/11/2025
- Layouts (11/11) : `buildSiteMetadata()` présent, `isMoneyPage: true` OK (villes)
- Slashes: `metadataBase`, `canonical`, `openGraph.url`, `twitter.images` → slash final OK
- Titles/descriptions: fallback builder ≈55 chars (pas de dépassement). Aucune `customTitle`/`customDescription` en layout.
- Anomalies repérées:
  - Doublon ville en titles/descriptions sur pages `/{city}` (templates LocalPage)
  - Ville erronée hardcodée dans `sites/rouen/app/contact/page.tsx` ("lille")

## Commandes QA
```bash
# Structure <head> (titles/meta lengths, canonical, robots)
node scripts/seo/seo-head-qa.ts

# Villes hardcodées (exemples)
rg -n "Contact D.m.nagement" sites
rg -n "Marseille\s*\)" sites | head -n 20

# Années figées non désirées (2024 dans layouts)
node scripts/seo/seo-qa.cjs
```

## Post-fix — Validation attendue
1) `seo-head-qa.ts` → PASSED (0 erreurs bloquantes)
2) Deux villes testées (Nice + Lyon) →
   - Title sans doublon ville
   - Description sans "local {Ville} à {Ville}"
   - Canonical correct (slash)

## Notes
- Les corrections sont limitées aux templates LocalPage (pages ville) et à `contact/`.
