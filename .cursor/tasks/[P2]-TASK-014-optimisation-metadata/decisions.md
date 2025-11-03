# Décisions : TASK-014 — Optimisation Métadonnées SEO

## Ce que l’on fait (validé)
- Conserver l’architecture actuelle (builder `buildSiteMetadata()` par layout) — pas de refactor structurel.
- Corriger les titles/descriptions au niveau des pages spécifiques:
  - Pages ville `/{city}` (templates `LocalPage.tsx`) → éviter le doublon ville (zone + ville identiques).
  - Pages `contact/` → retirer toute ville hardcodée, rendre dynamique ou migrer au builder.

## Ce que l’on ne fait pas
- Pas de modification du helper canonical ni du mécanisme `metadataBase` (déjà correct avec slash).
- Pas d’optimisation globale des titres par ville au-delà du wording actuel (à discuter si besoin CTR).

## Raison
- Les anomalies identifiées impactent la cohérence SERP (CTR) sans nécessiter de changement d’architecture.
- Limiter aux corrections ciblées réduit les risques multi-sites et accélère la validation.

## Hand-off
- Implémenteur suivant: appliquer le plan d’action du README (section Analyse) + exécuter `tests.md`.
