# Commits - TASK-025

## ✅ Commits créés

### Commit #1 : Fix URLs

**SHA** : `697a477`  
**Date** : 03/11/2025  
**Stats** : 11 files changed, 11 insertions(+), 11 deletions(-)  
**Changement** : category → cleanCategory, slug → cleanSlug

### Commit #2 : Fix undefined

**SHA** : `dd4ca89`  
**Date** : 03/11/2025  
**Stats** : 11 files changed, 33 insertions(+), 473 deletions(-)  
**Changement** : getCityBlogPosts() → getAllBlogPosts()  
**Cleanup** : -440 lignes code dupliqué supprimé

### Commit #3 : Lyon apostrophe + helper sitemap

**SHA** : `69c23d4`  
**Date** : 03/11/2025  
**Changement** : Correction typographique Presqu'île + utilisation helper `getAllBlogPosts()` dans Lyon

### Commit #4 : ESM compat fichiers config Bordeaux

**SHA** : `4e32035`  
**Date** : 03/11/2025  
**Changement** : Rename config files to .mjs/.cjs pour compat ESM (lié au déploiement sitemaps)

## Détail original

### Commit principal

```bash
git add sites/*/app/sitemap.ts

git commit -m "fix(sitemap): Utiliser cleanCategory+cleanSlug pour URLs blog (TASK-025)

Problème :
- Sitemap générait URLs avec category (dossier) + slug (original)
- Routing attend cleanCategory (CATEGORY_MAPPING) + cleanSlug (nettoyé)
- → 93 URLs/ville incorrectes = 1023 URLs totales cassées

Impact Search Console :
- Toulouse : 858 erreurs 5xx + 243 erreurs 404
- 9 villes affectées (alertes ce matin)
- Indexation : 37/1120 pages (3.3%)

Correction :
- sitemap.ts ligne ~147 : category → cleanCategory, slug → cleanSlug
- 11 villes corrigées
- URLs sitemap = URLs routing maintenant

Test :
- 20 URLs/ville testées (200 OK)
- Builds 11 villes : OK
- Sitemaps resubmit Search Console

Attendu J+7 :
- Erreurs 5xx : 858 → <50 (-94%)
- Erreurs 404 : 243 → <50 (traité aussi par TASK-404)
- Indexation : 37 → 800+ pages (+2000%)"

git push origin main
```

---

## Fichiers à modifier

1. `sites/marseille/app/sitemap.ts`
2. `sites/lyon/app/sitemap.ts`
3. `sites/toulouse/app/sitemap.ts`
4. `sites/bordeaux/app/sitemap.ts`
5. `sites/lille/app/sitemap.ts`
6. `sites/nantes/app/sitemap.ts`
7. `sites/nice/app/sitemap.ts`
8. `sites/strasbourg/app/sitemap.ts`
9. `sites/rouen/app/sitemap.ts`
10. `sites/rennes/app/sitemap.ts`
11. `sites/montpellier/app/sitemap.ts`

Total : **11 fichiers**

---

*Prêt pour commit*

