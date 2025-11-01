# 🔍 Analyse Complète : Canonicals des Sites

**Date :** 31 octobre 2025  
**Statut :** ⚠️ PROBLÈMES MULTIPLES DÉTECTÉS

---

## 🎯 Résumé Exécutif

### Problème Identifié
Les canonicals en production présentent **3 problèmes majeurs** :
1. ❌ **Slash final incohérent** (avec/sans selon les pages)
2. ❌ **Domaines multiples** pour une même ville
3. ❌ **URLs hardcodées** (pas de centralisation)

### Impact SEO
- 🔴 **CRITIQUE** : Google peut considérer les URLs avec/sans slash comme des pages différentes
- 🔴 **CRITIQUE** : Dilution du PageRank entre plusieurs domaines
- 🟡 **MOYEN** : Risque de duplication de contenu

---

## 📊 État Actuel par Site

### Site Nice

#### Domaines Utilisés (3 variations !)
```
1. https://devis-demenageur-nice.fr          (cityData, sitemap, blog)
2. https://www.devis-demenageur-nice.fr      (comment-ca-marche)  
3. https://www.nice-demenageur.fr            (partenaires, corridors)
```

#### Slash Final (incohérent)
| Page | URL Canonical | Slash ? |
|------|---------------|---------|
| Homepage (layout.tsx) | Via `seo-builders.ts` → **AVEC /** | ✅ |
| /partenaires | `https://www.nice-demenageur.fr/partenaires/` | ✅ |
| /comment-ca-marche | `https://www.devis-demenageur-nice.fr/comment-ca-marche` | ❌ |
| /blog | `https://devis-demenageur-nice.fr/blog` | ❌ |
| /blog/cat/slug | Pas de canonical défini | ⚠️ |
| Corridors | `https://www.nice-demenageur.fr/nice-vers-{dest}` | ❌ |

### Site Lyon (même problème)
```
- https://devis-demenageur-lyon.fr
- https://www.devis-demenageur-lyon.fr  
- https://www.lyon-demenageur.fr
```

### Site Bordeaux (même problème)
```
- https://devis-demenageur-bordeaux.fr
- https://www.devis-demenageur-bordeaux.fr
- https://www.bordeaux-demenageur.fr (via cityData)
```

---

## 🔧 Comment Sont Construites les Canonicals ?

### 1️⃣ Layout Principal (Homepage)
**Fichier :** `sites/{ville}/app/layout.tsx`

```typescript
// Utilise le builder centralisé
export const metadata: Metadata = buildSiteMetadata({
  isMoneyPage: true,
});
```

**Builder :** `sites/{ville}/lib/seo-builders.ts` (ligne 90)
```typescript
alternates: {
  canonical: city.siteUrl.endsWith('/') 
    ? city.siteUrl 
    : `${city.siteUrl}/`,  // ✅ Ajoute le slash si absent
},
```

**Source URL :** `sites/{ville}/lib/cityData.ts`
```typescript
nice: {
  siteUrl: 'https://devis-demenageur-nice.fr',  // ❌ SANS slash
}
```

**Résultat :** La homepage **DEVRAIT** avoir le slash grâce au builder.

---

### 2️⃣ Pages Individuelles (partenaires, comment-ca-marche, etc.)

**❌ PROBLÈME : URLs hardcodées directement dans les pages**

#### Exemple : `sites/nice/app/comment-ca-marche/page.tsx`
```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: `https://www.devis-demenageur-nice.fr/comment-ca-marche`,  // ❌ SANS slash
  },
}
```

#### Exemple : `sites/nice/app/partenaires/page.tsx`
```typescript
export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.nice-demenageur.fr/partenaires/",  // ✅ AVEC slash
  },
}
```

**Constat :** Chaque page définit son canonical manuellement sans utiliser `seo-builders.ts`

---

### 3️⃣ Articles de Blog

**Fichier :** `sites/{ville}/app/blog/[category]/[slug]/page.tsx`

```typescript
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostByCleanSlug(params.category, params.slug);
  
  return {
    title: post.meta_title || post.title,
    description: post.meta_description,
    // ❌ PAS de canonical défini !
  };
}
```

**Constat :** Les articles de blog **N'ONT PAS** de canonical défini explicitement.  
→ Next.js utilise par défaut `metadataBase` du layout.

---

### 4️⃣ Pages Corridors

**Template :** `sites/{ville}/app/_templates/CorridorPage.tsx`

```typescript
export function generateCorridorPageMetadata(destination: string): Metadata {
  return {
    alternates: {
      canonical: `https://www.nice-demenageur.fr/nice-vers-${destination.toLowerCase()}`,  // ❌ SANS slash
    },
  };
}
```

---

### 5️⃣ Sitemap

**Fichier :** `sites/{ville}/app/sitemap.ts`

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.SITE_URL  // Utilise env.SITE_URL
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,  // ❌ Pas de slash ajouté
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/services`,  // ❌ Pas de slash final
    }
  ]
}
```

---

## 🎯 Sources des URLs (3 fichiers différents !)

### 1. `sites/{ville}/lib/env.ts`
```typescript
const envSchema = z.object({
  SITE_URL: z.string().url().default('https://www.nice-demenageur.fr'),  // ❌ SANS slash
});
```

### 2. `sites/{ville}/lib/cityData.ts`
```typescript
nice: {
  siteUrl: 'https://devis-demenageur-nice.fr',  // ❌ Domaine DIFFÉRENT + SANS slash
}
```

### 3. `sites/{ville}/next-sitemap.config.js`
```javascript
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://devis-demenageur-nice.fr',  // ❌ SANS slash
}
```

### 4. Pages individuelles (hardcodées)
- `https://www.nice-demenageur.fr/partenaires/`
- `https://www.devis-demenageur-nice.fr/comment-ca-marche`
- `https://devis-demenageur-nice.fr/blog`

---

## ⚠️ Impact d'un Changement

### Si on change TOUS les canonicals pour ajouter le slash final :

#### ✅ Avantages
1. **Cohérence SEO** : Une seule URL canonique par page
2. **Best practice Google** : Google préfère la version avec `/`
3. **Consolidation PageRank** : Toutes les signaux SEO vers une seule URL
4. **Évite duplicate content**

#### ⚠️ Risques
1. **Perte temporaire de positions** (1-2 semaines)
   - Google devra réindexer les nouvelles canonicals
   - Transfert de PageRank entre anciennes/nouvelles URLs

2. **Redirections 301 nécessaires ?**
   - Techniquement, Next.js gère déjà les deux versions (avec/sans slash)
   - Mais les signaux SEO sont divisés

3. **Impact Search Console**
   - Nouvelles URLs à surveiller
   - Erreurs temporaires possibles

#### 💡 Recommandation
**FAIRE LE CHANGEMENT** car :
- Les sites sont récents (peu de PageRank accumulé)
- Mieux corriger maintenant qu'après 6 mois
- Impact positif à moyen terme (30-60 jours)

---

## 🛠️ Solution Recommandée

### Option A : Centralisation Complète (RECOMMANDÉE)

#### 1. Définir UN SEUL domaine par ville dans `cityData.ts`
```typescript
nice: {
  siteUrl: 'https://devis-demenageur-nice.fr/',  // ✅ AVEC slash final
}
```

#### 2. Créer un helper pour les canonicals
**Nouveau fichier :** `sites/{ville}/lib/canonical-helper.ts`
```typescript
import { env } from '@/lib/env';
import { getCityDataFromUrl } from '@/lib/cityData';

export function getCanonicalUrl(path: string = ''): string {
  const city = getCityDataFromUrl(env.SITE_URL);
  const baseUrl = city.siteUrl; // Déjà avec slash final
  
  if (!path) return baseUrl;
  
  // Retirer slash initial si présent
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Ajouter slash final
  return `${baseUrl}${cleanPath}/`;
}
```

#### 3. Utiliser le helper partout
```typescript
// sites/nice/app/partenaires/page.tsx
import { getCanonicalUrl } from '@/lib/canonical-helper';

export const metadata: Metadata = {
  alternates: {
    canonical: getCanonicalUrl('partenaires'),  // → https://devis-demenageur-nice.fr/partenaires/
  },
}
```

#### 4. Mettre à jour le sitemap
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.SITE_URL.endsWith('/') ? env.SITE_URL : `${env.SITE_URL}/`;
  
  return [
    { url: baseUrl },  // ✅ Avec slash
    { url: `${baseUrl}services/` },  // ✅ Slash final partout
  ]
}
```

---

### Option B : Recherche/Remplacement Global (Plus rapide mais moins propre)

#### 1. Script de remplacement
```bash
# Ajouter slash final à tous les canonicals
find sites/nice/app -type f -name "*.tsx" -exec sed -i '' 's|canonical: "\(https://[^"]*[^/]\)"|canonical: "\1/"|g' {} \;
```

#### 2. Mettre à jour cityData.ts manuellement
```typescript
// Ajouter / à toutes les siteUrl
```

---

## 📋 Checklist de Migration

### Phase 1 : Préparation (1h)
- [ ] Décider du domaine principal par ville (avec/sans www)
- [ ] Sauvegarder l'état actuel des canonicals
- [ ] Créer `canonical-helper.ts`

### Phase 2 : Migration Code (2-3h)
- [ ] Mettre à jour `cityData.ts` (ajouter slash final)
- [ ] Mettre à jour toutes les pages avec le helper
- [ ] Mettre à jour sitemap.ts
- [ ] Mettre à jour next-sitemap.config.js

### Phase 3 : Tests (1h)
- [ ] Build local : `pnpm build`
- [ ] Vérifier canonicals dans le HTML généré
- [ ] Vérifier sitemap.xml
- [ ] Tester avec Google Rich Results Test

### Phase 4 : Déploiement (variable selon infra)
- [ ] Déployer sur tous les sites
- [ ] Soumettre nouveaux sitemaps à Search Console
- [ ] Monitorer erreurs 404
- [ ] Surveiller positions (Search Console Performance)

### Phase 5 : Suivi (30 jours)
- [ ] J+1 : Vérifier indexation
- [ ] J+7 : Analyser impact positions
- [ ] J+14 : Vérifier consolidation PageRank
- [ ] J+30 : Bilan final

---

## 🎓 Bonnes Pratiques SEO : Slash Final

### Ce que dit Google
> "Pick one version (with or without trailing slash) and use it consistently. Use canonicals and redirects to consolidate signals."

### Recommandations
1. ✅ **AVEC slash final** pour les "dossiers" : `/blog/`, `/services/`
2. ⚠️ **SANS slash** pour les "fichiers" : `/sitemap.xml`, `/robots.txt`
3. ✅ **Homepage AVEC slash** : `https://exemple.fr/`

### Dans votre cas
- URLs type "page" → **AVEC slash** : `/partenaires/`, `/comment-ca-marche/`
- URLs blog → **AVEC slash** : `/blog/prix/article-slug/`
- Homepage → **AVEC slash** : `https://devis-demenageur-nice.fr/`

---

## 🚨 Points d'Attention

### 1. Domaines Multiples
**Problème actuel :** Nice a 3 domaines différents
```
- devis-demenageur-nice.fr
- www.devis-demenageur-nice.fr
- www.nice-demenageur.fr
```

**Solution :**
- Choisir **UN SEUL** domaine principal
- Faire des redirections 301 des autres vers le principal
- Mettre à jour cityData.ts

### 2. metadataBase vs Canonical
Next.js utilise `metadataBase` pour :
- Open Graph URLs
- Images
- Canonicals (si non définis)

**Actuel :**
```typescript
metadataBase: new URL(city.siteUrl),  // Sans slash
```

**Devrait être :**
```typescript
metadataBase: new URL(city.siteUrl),  // AVEC slash dans cityData
```

### 3. Articles de Blog
Actuellement **AUCUN canonical** défini.  
→ Next.js génère automatiquement basé sur `metadataBase`  
→ Risque si metadataBase incohérent

---

## 💰 Estimation Effort

### Option A (Centralisation)
- Développement : **4-6 heures**
- Tests : **2 heures**
- Déploiement : **1 heure**
- **Total : 7-9 heures**

### Option B (Remplacement)
- Script + vérifications : **2-3 heures**
- Tests : **2 heures**
- Déploiement : **1 heure**
- **Total : 5-6 heures**

### Recommandation
**Option A** pour la maintenabilité long terme, même si plus long.

---

## 📚 Fichiers à Modifier (Nice)

### Critiques
```
sites/nice/lib/cityData.ts              → Ajouter slash à siteUrl
sites/nice/lib/canonical-helper.ts      → CRÉER (nouveau)
sites/nice/app/layout.tsx               → OK (utilise déjà builder)
sites/nice/lib/seo-builders.ts          → OK (a déjà la logique)
```

### Pages individuelles (7 fichiers)
```
sites/nice/app/partenaires/page.tsx
sites/nice/app/comment-ca-marche/page.tsx
sites/nice/app/blog/page.tsx
sites/nice/app/blog/[category]/[slug]/page.tsx
sites/nice/app/_templates/CorridorPage.tsx
sites/nice/app/contact/page.tsx
sites/nice/app/faq/page.tsx
```

### Configuration
```
sites/nice/next-sitemap.config.js
sites/nice/lib/env.ts
sites/nice/app/sitemap.ts
```

### À répliquer sur
- sites/lyon/
- sites/bordeaux/
- sites/marseille/
- sites/toulouse/
- sites/nantes/
- sites/lille/
- sites/rennes/
- sites/rouen/
- sites/strasbourg/
- sites/montpellier/

**Total : 11 villes × ~10 fichiers = 110 fichiers**

---

## 🎯 Décision Requise

### Questions pour vous
1. **Domaine principal par ville ?**
   - Nice : `devis-demenageur-nice.fr` OU `nice-demenageur.fr` ?
   - Bordeaux : `devis-demenageur-bordeaux.fr` OU `bordeaux-demenageur.fr` ?
   
2. **Avec/sans www ?**
   - Recommandation : **SANS www** (plus court, moderne)
   
3. **Timing de migration ?**
   - Immédiat ou attendre période creuse SEO ?
   
4. **Redirections 301 ?**
   - Configurer au niveau serveur/CDN pour anciens domaines ?

---

## 📝 Notes Techniques

### Next.js metadataBase
```typescript
// Si metadataBase = "https://exemple.fr" (sans slash)
// Et canonical non défini
// → Next.js génère : "https://exemple.fr/page" (sans slash final)

// Si metadataBase = "https://exemple.fr/" (avec slash)
// → Next.js génère : "https://exemple.fr/page/" (avec slash final) ✅
```

### Vérification Manuelle
```bash
# Build et inspecter HTML
cd sites/nice
pnpm build
pnpm start

# Vérifier canonical dans <head>
curl -s http://localhost:3000 | grep canonical
```

---

## ✅ Conclusion

### État Actuel
❌ **Non conforme aux best practices**
- Slash final incohérent
- Domaines multiples par ville
- URLs hardcodées partout

### Impact SEO Estimé
- **Court terme (J+1 à J+7)** : Léger recul positions (-5% à -10%)
- **Moyen terme (J+14 à J+30)** : Retour baseline puis amélioration
- **Long terme (J+60+)** : Gain net (+10% à +20% consolidation)

### Recommandation Finale
✅ **MIGRER MAINTENANT** avec Option A (centralisation)
- Investissement 7-9h de dev
- Gain maintenabilité énorme
- Impact SEO positif à 60 jours

---

**Document généré le :** 31 octobre 2025  
**Dernière mise à jour :** 31 octobre 2025  
**Auteur :** Analyse technique automatisée

