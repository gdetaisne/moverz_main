# Décisions : TASK-014 — Optimisation Métadonnées SEO

## Ce que l’on fait (validé)
- Conserver l’architecture actuelle (builder `buildSiteMetadata()` par layout) — pas de refactor structurel.
- Corriger les titles/descriptions au niveau des pages spécifiques:
  - Pages ville `/{city}` (templates `LocalPage.tsx`) → éviter le doublon ville (zone + ville identiques).
  - Pages `contact/` → retirer toute ville hardcodée, rendre dynamique ou migrer au builder.
- Phase 2 (contenu) : Templates descriptions par type de page (150–160 chars) déployés par tiers.
- Corridors : wording conversion‑first (5 devis/7j, IA, sans appels) déployé 11 villes.

## Ce que l’on ne fait pas
- Pas de modification du helper canonical ni du mécanisme `metadataBase` (déjà correct avec slash).
- Pas d’optimisation globale des titres par ville au-delà du wording actuel (à discuter si besoin CTR).
- Pas d’`AggregateRating` tant que la conformité Google n’est pas garantie (voir ci‑dessous).

## Raison
- Les anomalies identifiées impactent la cohérence SERP (CTR) sans nécessiter de changement d’architecture.
- Limiter aux corrections ciblées réduit les risques multi-sites et accélère la validation.

## Hand-off
- Implémenteur suivant: appliquer le plan d’action du README (section Analyse) + exécuter `tests.md`.

---

## Décision sur les “Ratings” (étoiles SERP)

1) Conformité Google  
   - Google n’affiche plus de “review snippets” pour les entités `LocalBusiness`/`Organization` si auto‑générés (self‑serving).  
   - Les avis doivent être visibles sur la page et provenir d’une source vérifiable.  

2) Options évaluées  
   - A) UI seule (preuve sociale) sans JSON‑LD → Conforme, impact modéré, déployable maintenant.  
   - B) Intégration widget tiers (Trustpilot/Google) + page “Avis” → Conforme; ensuite JSON‑LD possible sur “Product/Service” spécifique, si éligible.  
   - C) “Notes” inventées → ❌ Refusé (non conforme + risque pénalité).

3) Décision  
   - À court terme: A (UI seule) — pas de balisage `AggregateRating`.  
   - En parallèle: ouvrir `[P2]-TASK-035-aggregate-rating` pour cadrer B (source d’avis, widget, modèle de données, périmètre de pages éligibles), puis seulement si conforme → JSON‑LD.
