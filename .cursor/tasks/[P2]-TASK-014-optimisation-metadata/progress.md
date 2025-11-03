# Progress Log : TASK-014

---

## Session 30-31/10/2025 - Metadata optimization (3h)

### Actions effectuées

**30 octobre** :
- Fix seo-builders.ts metadataBase (Marseille)
- Title optimisé 54 chars (retrait 'en' devant '7j')
- Canonical URL trailing slash GSC compliance

**31 octobre** :
- Metadata dynamiques services + contact (11 villes)
- Optimize titles 11 cities (SEO)
- Fix bug Lille hardcodé dans metadata

### Commits
- #c43c0391, #db77cd26, #34c00cb2, #bc3a95ba, #59b965f1

---

## Statut actuel

**Fait** : 80% (metadata optimisées + commits)  
**Reste** : Tests SERP + validation (20%)

---

## Session 03/11/2025 - Analyse SERP + plan correctifs (30min)

### Observations
- Doublons ville dans titles/descriptions des pages `/{city}` (templates LocalPage).
- Ville erronée hardcodée dans `sites/rouen/app/contact/page.tsx` ("lille").
- QA head OK: builder présent 11/11, slashes OK.

### Prochaines actions
1) Dédupliquer titles/descriptions `/{city}` sur 11 sites.
2) Rendre dynamiques les titles `contact/` (11 sites).
3) Exécuter QA (`seo-head-qa.ts`, `seo-qa.cjs`, recherches rg) + tests live Nice/Lyon.

---

*Dernière mise à jour : 03/11/2025*

