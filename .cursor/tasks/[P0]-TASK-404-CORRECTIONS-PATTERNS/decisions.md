# Décisions Techniques - TASK-404-CORRECTIONS-PATTERNS

## Décision #1 : Approche par patterns plutôt que script massif

**Date** : 03 novembre 2025  
**Contexte** : 513 erreurs 404 à résoudre

**Options considérées** :
- A) Script automatique massif (risque élevé)
- B) Correction pattern par pattern (plus long mais sûr)

**Décision** : Option B - Par patterns

**Raison** :
- Permet validation incrémentale
- Réduit risque régression
- Facilite rollback si problème
- Plus facile à documenter

**Résultat** : ✅ Approche validée, 0 régression Phase 1

---

## Décision #2 : Templates avant markdown

**Date** : 03 novembre 2025

**Contexte** : Patterns dans templates (tsx) ET markdown

**Décision** : Traiter templates d'abord, markdown ensuite

**Raison** :
- Templates = impact immédiat (toutes pages)
- Markdown = plus complexe (300+ fichiers)
- Validation rapide sur templates
- ROI meilleur (110 liens/pattern vs 1-2 liens/fichier)

**Résultat** : ✅ Phase 1 (templates) 257 liens en 2h30

---

## Décision #3 : cityData dynamique systématique

**Date** : 03 novembre 2025

**Contexte** : Villes hardcodées partout

**Décision** : Remplacer TOUS les hardcoding par `city.nameCapitalized`

**Raison** :
- Évite bugs cross-ville
- Scalable (11 villes)
- Maintenable
- Best practice

**Implémentation** :
```typescript
// ❌ AVANT
href="/devis-demenagement-lille"

// ✅ APRÈS
const city = getCityDataFromUrl(env.SITE_URL);
href="/estimation-rapide/"
```

**Résultat** : ✅ Appliqué Patterns 1, 2, 4, 6, 8

---

## Décision #4 : Redirections 301 pour accents Toulouse

**Date** : 03 novembre 2025

**Contexte** : 40 URLs avec accents encodés

**Options** :
- A) Renommer fichiers markdown (risque SEO)
- B) Redirections 301 wildcards (safe)

**Décision** : Option B - Redirections 301

**Raison** :
- Aucun impact sur URLs existantes
- Safe pour SEO
- Réversible
- Couvre tous les patterns d'accents

**Implémentation** : 10 redirections wildcards dans `next.config.mjs`

**Résultat** : ✅ ~70 URLs redirigées, 0 impact SEO

---

## Décision #5 : Reporter Pattern #5 (blog)

**Date** : 03 novembre 2025

**Contexte** : Pattern #5 = 160 URLs dans markdown

**Décision** : Reporter en Phase 2

**Raison** :
- Complexe (300+ fichiers markdown)
- Risque régression élevé
- Besoin script dédié
- Validation Phase 1 d'abord

**Résultat** : Phase 1 validée (-51%), Phase 2 planifiée

---

## Décision #6 : Tests manuels sur 3 villes minimum

**Date** : 03 novembre 2025

**Décision** : Test manuel Nice + Toulouse + 1 autre ville minimum

**Raison** :
- Nice = la plus grosse (119 articles)
- Toulouse = cas spécial (accents)
- 3ème ville = validation cross-check
- Automatisation insuffisante

**Résultat** : ✅ Validé sur Nice, Toulouse, Bordeaux, puis 11/11

