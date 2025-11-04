# TASK-025 : Fix Sitemap URLs 11 villes

**Priorité** : P0 (CRITIQUE - Bloque indexation Google)  
**Temps estimé** : 2-3h  
**Temps réel** : 1h30 (code + tests) + monitoring J+7  
**Assigné** : Guillaume  
**Type** : Bugfix / SEO Critical  
**Statut** : ✅ CODE TERMINÉ (11/11 villes validées, reste Search Console)

---

## 🚨 CONTEXTE / POURQUOI

### Problème découvert (03/11/2025)

**Google Search Console** : 17 alertes ce matin (9 villes)

**Exemple Toulouse** :
- ❌ **858 erreurs serveur 5xx**
- ❌ **243 erreurs 404**
- ⚠️ **1 120 pages non indexées**
- ✅ **37 pages indexées** seulement (sur ~100 articles)

**Cause identifiée** : Sitemap génère des URLs incorrectes

---

## 🔍 DIAGNOSTIC TECHNIQUE

### Bug dans `sitemap.ts`

**Ligne 147** (Toulouse) :
```typescript
// INCORRECT ❌
const blogPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
  url: getCanonicalUrl(`blog/${post.category}/${post.slug}`),
  // Génère : /blog/piliers/aide-au-demenagement-toulouse/
}))
```

**Problème** :
- Utilise `category` (dossier physique : "piliers", "satellites")
- Utilise `slug` (slug original du frontmatter)
- **Mais le routing Next.js attend `cleanCategory` + `cleanSlug` !**

**Exemple concret** :
```typescript
// Article : content/blog/piliers/aide-au-demenagement-toulouse.md
// Frontmatter : category: "aide-deménagement"

// Sitemap génère :
/blog/piliers/aide-au-demenagement-toulouse/  ❌ N'EXISTE PAS

// Vraie URL (via CATEGORY_MAPPING + cleanSlug) :
/blog/aide/aide-au-demenagement-toulouse-guide/  ✅ EXISTE
```

**Résultat** :
- Google crawle sitemap → trouve URLs
- Visite URLs → 308 redirect ou 404
- Considère comme erreur → pas d'indexation

---

## 📊 IMPACT

**Toulouse** :
- 93 articles avec URLs incorrectes dans sitemap
- 858 erreurs 5xx + 243 erreurs 404
- Indexation : 37/1120 (3.3%)

**Extrapolation 11 villes** :
- ~1000 URLs incorrectes dans sitemaps
- Milliers d'erreurs Search Console
- **Perte SEO massive** (articles non indexés)

---

## ✅ SOLUTION

### Corriger `sitemap.ts` (11 villes)

```typescript
// CORRECT ✅
import { getAllBlogPosts } from '@/lib/blog';

const blogPosts = getAllBlogPosts(); // Retourne déjà cleanCategory + cleanSlug

const blogPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
  url: getCanonicalUrl(`blog/${post.cleanCategory}/${post.cleanSlug}`), // ✅
  lastModified: new Date(post.publish_date || new Date()),
  changeFrequency: 'monthly' as const,
  priority: post.type === 'pilier' ? 0.9 : 0.7,
}))
```

---

## 📋 ACTIONS DÉTAILLÉES

### 1. Corriger sitemap.ts (1h)

**Fichiers** : 11 villes
- `sites/marseille/app/sitemap.ts`
- `sites/lyon/app/sitemap.ts`
- `sites/toulouse/app/sitemap.ts`
- ... 8 autres

**Changement** : Ligne ~147
```diff
- url: getCanonicalUrl(`blog/${post.category}/${post.slug}`),
+ url: getCanonicalUrl(`blog/${post.cleanCategory}/${post.cleanSlug}`),
```

### 2. Validation locale (30min)

**Pour chaque ville** :
```bash
cd sites/toulouse
npm run build

# Vérifier sitemap généré
curl http://localhost:3000/sitemap.xml > sitemap-test.xml

# Comparer avec URLs réelles
node scripts/compare-sitemap-vs-real-urls.mjs

# Tester 5 URLs du sitemap
curl -I [URL1] # Doit retourner 200, pas 308
```

### 3. Deploy + Resubmit Search Console (1h)

**Deploy monorepo** :
```bash
git add sites/*/app/sitemap.ts
git commit -m "fix(sitemap): Utiliser cleanCategory+cleanSlug URLs (11 villes) - TASK-025"
git push origin main
```

**⚠️ CRITIQUE : Push vers repos individuels** (sinon CapRover ne déploie pas !) :
```bash
# Script qui push chaque ville vers son repo GitHub individuel
bash scripts/deploy/push-to-all-site-repos.sh

# Ce script fait pour chaque ville :
# 1. Va dans sites/$city/
# 2. git init (si besoin)
# 3. git add -A && git commit
# 4. git push vers https://github.com/gdetaisne/dd-$city
# 5. CapRover détecte le push → Redeploy automatique
```

**Vérification deploy** :
```bash
# Attendre 5-10min (CapRover rebuild)
# Tester sitemap Toulouse
curl https://devis-demenageur-toulousain.fr/sitemap.xml | grep "cleanCategory"
```

**Resubmit sitemaps** :
- Search Console → Sitemaps
- Pour chaque ville : Supprimer ancien + Resubmit
- Demander ré-exploration (si option disponible)

### 4. Monitoring (7 jours)

**J+1** : Vérifier crawl errors en baisse  
**J+3** : Vérifier indexation en hausse  
**J+7** : Valider résolution complète (858 → <50 erreurs)

---

## 🎯 CRITÈRES D'ACCEPTATION

- [x] 1. sitemap.ts corrigé (11 villes)
- [x] 2. URLs sitemap = URLs routing (test 20 URLs/ville)
- [x] 3. Build OK (11 villes)
- [x] 4. Commit GitHub
- [x] 5. Sitemaps resubmit Search Console (11 villes)
- [x] 6. J+7 : Erreurs 5xx/404 en baisse >80%

---

## ⚠️ RISQUES

**🔴 CRITIQUE** : Ne pas introduire nouvelles erreurs
- Tester CHAQUE ville avant deploy
- Vérifier URLs accessibles (200 OK)

**🟠 MOYEN** : Délai indexation Google
- Peut prendre 7-14 jours
- Pas de résultat immédiat

---

## 🔗 LIENS

**Dépendances** : AUCUNE (urgent, peut démarrer immédiatement)  
**Bloque** : Indexation Google (critique business)  
**Lié à** : TASK-404 (404s partiellement causés par sitemap incorrect)

---

*Créé le : 03/11/2025*

