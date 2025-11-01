# 🔄 Exemple de Migration : Canonicals avec Slash Final

## 📝 Vue d'Ensemble

Ce document montre comment migrer les pages pour utiliser le système centralisé de canonicals.

---

## 🎯 Étape 1 : Mettre à Jour cityData.ts

### AVANT (sites/nice/lib/cityData.ts)
```typescript
nice: {
  slug: 'nice',
  name: 'Nice',
  nameCapitalized: 'Nice',
  region: 'Provence-Alpes-Côte d\'Azur',
  siteUrl: 'https://devis-demenageur-nice.fr',  // ❌ SANS slash
  coordinates: {
    latitude: 43.7102,
    longitude: 7.2620
  },
  // ...
}
```

### APRÈS
```typescript
nice: {
  slug: 'nice',
  name: 'Nice',
  nameCapitalized: 'Nice',
  region: 'Provence-Alpes-Côte d\'Azur',
  siteUrl: 'https://devis-demenageur-nice.fr/',  // ✅ AVEC slash final
  coordinates: {
    latitude: 43.7102,
    longitude: 7.2620
  },
  // ...
}
```

**Répéter pour toutes les villes dans le fichier.**

---

## 🎯 Étape 2 : Mettre à Jour env.ts (Optionnel)

### AVANT (sites/nice/lib/env.ts)
```typescript
const envSchema = z.object({
  SITE_URL: z.string().url().default('https://www.nice-demenageur.fr'),
  // ...
});
```

### APRÈS
```typescript
const envSchema = z.object({
  SITE_URL: z.string().url().default('https://devis-demenageur-nice.fr/'),  // ✅ Slash + même domaine que cityData
  // ...
});
```

---

## 🎯 Étape 3 : Migrer les Pages

### Exemple 1 : Page /partenaires

#### AVANT (sites/nice/app/partenaires/page.tsx)
```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partenaires déménageurs - Déménageurs nice (IA)",
  description: "Découvrez nos partenaires déménageurs certifiés à nice...",
  alternates: {
    canonical: "https://www.nice-demenageur.fr/partenaires/",  // ❌ Hardcodé
  },
  openGraph: {
    title: "Partenaires déménageurs - Déménageurs nice (IA)",
    description: "Découvrez nos partenaires déménageurs certifiés à nice...",
    url: "https://www.nice-demenageur.fr/partenaires/",  // ❌ Hardcodé
    type: "website",
  },
};
```

#### APRÈS (Option 1 : Helper complet)
```typescript
import type { Metadata } from "next";
import { getFullMetadata } from "@/lib/canonical-helper";

export const metadata: Metadata = getFullMetadata(
  'partenaires',
  'Partenaires déménageurs - Déménageurs nice (IA)',
  'Découvrez nos partenaires déménageurs certifiés à nice. Qualité garantie, tarifs transparents, service client premium.'
);
```

#### APRÈS (Option 2 : Helper partiel)
```typescript
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/canonical-helper";

export const metadata: Metadata = {
  title: "Partenaires déménageurs - Déménageurs nice (IA)",
  description: "Découvrez nos partenaires déménageurs certifiés à nice...",
  alternates: {
    canonical: getCanonicalUrl('partenaires'),  // ✅ Dynamique
  },
  openGraph: {
    title: "Partenaires déménageurs - Déménageurs nice (IA)",
    description: "Découvrez nos partenaires déménageurs certifiés à nice...",
    url: getCanonicalUrl('partenaires'),  // ✅ Dynamique
    type: "website",
  },
};
```

---

### Exemple 2 : Page /comment-ca-marche

#### AVANT
```typescript
export const metadata: Metadata = {
  title: "Comment ça marche ? Déménagement Nice en 3 étapes | Moverz",
  description: "Découvrez notre processus simple...",
  alternates: {
    canonical: `https://www.devis-demenageur-nice.fr/comment-ca-marche`,  // ❌ 3 problèmes :
    // 1. Domaine différent (www + devis-demenageur vs nice-demenageur)
    // 2. Pas de slash final
    // 3. Hardcodé
  },
  openGraph: {
    title: "Comment ça marche ? Déménagement Nice simplifié | Moverz",
    description: "Processus simple et transparent...",
    url: `https://www.devis-demenageur-nice.fr/comment-ca-marche`,  // ❌ Idem
    type: 'website',
  },
}
```

#### APRÈS
```typescript
import { getFullMetadata } from "@/lib/canonical-helper";

export const metadata = getFullMetadata(
  'comment-ca-marche',
  'Comment ça marche ? Déménagement Nice en 3 étapes | Moverz',
  'Découvrez notre processus simple pour déménager à Nice : 1) Inventaire IA gratuit en 30 min 2) Recevez 3 devis sous 7j 3) Choisissez votre déménageur. 100% gratuit, sans engagement.'
);
```

---

### Exemple 3 : Page Blog

#### AVANT (sites/nice/app/blog/page.tsx)
```typescript
export const metadata: Metadata = {
  title: "Blog Déménagement Nice - Conseils & Guides | Moverz",
  description: "Tous nos articles, guides et conseils pour réussir votre déménagement à Nice.",
  alternates: {
    canonical: `https://devis-demenageur-nice.fr/blog`,  // ❌ Sans www, sans slash
  },
  // ...
};
```

#### APRÈS
```typescript
import { getCanonicalUrl } from "@/lib/canonical-helper";

export const metadata: Metadata = {
  title: "Blog Déménagement Nice - Conseils & Guides | Moverz",
  description: "Tous nos articles, guides et conseils pour réussir votre déménagement à Nice.",
  alternates: {
    canonical: getCanonicalUrl('blog'),  // ✅ → https://devis-demenageur-nice.fr/blog/
  },
  // ...
};
```

---

### Exemple 4 : Articles de Blog (dynamiques)

#### AVANT (sites/nice/app/blog/[category]/[slug]/page.tsx)
```typescript
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostByCleanSlug(params.category, params.slug);
  
  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description,
    keywords: post.keywords.join(', '),
    // ❌ PAS de canonical défini !
    openGraph: {
      title: post.title,
      description: post.meta_description,
      type: 'article',
      publishedTime: post.publish_date,
      // ❌ PAS d'URL définie !
    },
  };
}
```

#### APRÈS
```typescript
import { getCanonicalUrl } from "@/lib/canonical-helper";

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostByCleanSlug(params.category, params.slug);
  
  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  // ✅ Construire le path dynamiquement
  const canonicalPath = `blog/${params.category}/${params.slug}`;
  const canonicalUrl = getCanonicalUrl(canonicalPath);

  return {
    title: post.meta_title || post.title,
    description: post.meta_description,
    keywords: post.keywords.join(', '),
    alternates: {
      canonical: canonicalUrl,  // ✅ Ex: https://devis-demenageur-nice.fr/blog/prix/article-slug/
    },
    openGraph: {
      title: post.title,
      description: post.meta_description,
      type: 'article',
      publishedTime: post.publish_date,
      url: canonicalUrl,  // ✅ Même URL
    },
  };
}
```

---

### Exemple 5 : Pages Corridors (template)

#### AVANT (sites/nice/app/_templates/CorridorPage.tsx)
```typescript
export function generateCorridorPageMetadata(destination: string): Metadata {
  return {
    title: `Déménagement nice → ${destination} — Comparez des devis | Moverz`,
    description: `Un seul dossier, 20 déménageurs qualifiés. 3 devis sous 7 jours pour nice → ${destination}.`,
    alternates: {
      canonical: `https://www.nice-demenageur.fr/nice-vers-${destination.toLowerCase()}`,  // ❌ Hardcodé
    },
    openGraph: {
      title: `Déménagement nice → ${destination} — Comparez des devis | Moverz`,
      description: `Un seul dossier, 20 déménageurs qualifiés. 3 devis sous 7 jours pour nice → ${destination}.`,
      url: `https://www.nice-demenageur.fr/nice-vers-${destination.toLowerCase()}`,  // ❌ Hardcodé
      type: 'website',
    },
  };
}
```

#### APRÈS
```typescript
import { getCanonicalUrl } from "@/lib/canonical-helper";

export function generateCorridorPageMetadata(destination: string): Metadata {
  const slug = `nice-vers-${destination.toLowerCase()}`;
  const canonicalUrl = getCanonicalUrl(slug);
  
  return {
    title: `Déménagement nice → ${destination} — Comparez des devis | Moverz`,
    description: `Un seul dossier, 20 déménageurs qualifiés. 3 devis sous 7 jours pour nice → ${destination}.`,
    alternates: {
      canonical: canonicalUrl,  // ✅ Dynamique
    },
    openGraph: {
      title: `Déménagement nice → ${destination} — Comparez des devis | Moverz`,
      description: `Un seul dossier, 20 déménageurs qualifiés. 3 devis sous 7 jours pour nice → ${destination}.`,
      url: canonicalUrl,  // ✅ Dynamique
      type: 'website',
    },
  };
}
```

---

## 🎯 Étape 4 : Mettre à Jour le Sitemap

### AVANT (sites/nice/app/sitemap.ts)
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.SITE_URL  // ❌ Sans slash final garanti
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,  // ❌ Peut être sans slash
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,  // ❌ Slash final manquant
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
  
  return [...staticPages]
}
```

### APRÈS
```typescript
import { getCanonicalUrl } from '@/lib/canonical-helper';

export default function sitemap(): MetadataRoute.Sitemap {
  // ✅ Helper garantit le slash final
  
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: getCanonicalUrl(),  // ✅ Homepage avec slash
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: getCanonicalUrl('services'),  // ✅ /services/ avec slash
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getCanonicalUrl('partenaires'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // ...
  ]
  
  // Pages de quartiers
  const neighborhoodPages: MetadataRoute.Sitemap = city.neighborhoods.map(n => ({
    url: getCanonicalUrl(`${city.slug}/${n.slug}`),  // ✅ Dynamique avec slash
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  
  // Articles de blog
  const blogPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: getCanonicalUrl(`blog/${post.category}/${post.slug}`),  // ✅ Avec slash
    lastModified: new Date(post.publish_date || new Date()),
    changeFrequency: 'monthly' as const,
    priority: post.type === 'pilier' ? 0.9 : 0.7,
  }))
  
  return [
    ...staticPages, 
    ...neighborhoodPages,
    ...blogPages
  ]
}
```

---

## 🎯 Étape 5 : Mettre à Jour next-sitemap.config.js

### AVANT
```javascript
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://devis-demenageur-nice.fr',  // ❌ Sans slash
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  // ...
};
```

### APRÈS
```javascript
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://devis-demenageur-nice.fr/',  // ✅ Avec slash
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  // ...
};
```

---

## 🎯 Étape 6 : Mettre à Jour seo-builders.ts (Déjà OK)

Le fichier `seo-builders.ts` a déjà la logique correcte :

```typescript
export function buildSiteMetadata(options: SiteMetadataOptions = {}): Metadata {
  // ...
  return {
    // ...
    alternates: {
      canonical: city.siteUrl.endsWith('/') ? city.siteUrl : `${city.siteUrl}/`,  // ✅ Déjà bon
    },
    // ...
  }
}
```

**Rien à changer ici**, tant que `cityData.ts` a le slash final.

---

## 📋 Checklist par Site

### Nice (exemple)
- [ ] `lib/cityData.ts` → Ajouter slash à `siteUrl`
- [ ] `lib/canonical-helper.ts` → Créer le fichier (copier)
- [ ] `lib/env.ts` → Ajouter slash au default
- [ ] `app/partenaires/page.tsx` → Utiliser helper
- [ ] `app/comment-ca-marche/page.tsx` → Utiliser helper
- [ ] `app/blog/page.tsx` → Utiliser helper
- [ ] `app/blog/[category]/[slug]/page.tsx` → Ajouter canonical
- [ ] `app/_templates/CorridorPage.tsx` → Utiliser helper
- [ ] `app/contact/page.tsx` → Utiliser helper
- [ ] `app/faq/page.tsx` → Utiliser helper
- [ ] `app/sitemap.ts` → Utiliser helper partout
- [ ] `next-sitemap.config.js` → Ajouter slash

### Répéter pour
- [ ] Lyon
- [ ] Bordeaux
- [ ] Marseille
- [ ] Toulouse
- [ ] Nantes
- [ ] Lille
- [ ] Rennes
- [ ] Rouen
- [ ] Strasbourg
- [ ] Montpellier

---

## 🧪 Tests à Effectuer

### 1. Build Local
```bash
cd sites/nice
pnpm build
```

### 2. Vérifier les Canonicals dans le HTML
```bash
pnpm start
# Dans un autre terminal :
curl -s http://localhost:3000 | grep -A 1 "canonical"
curl -s http://localhost:3000/partenaires | grep -A 1 "canonical"
curl -s http://localhost:3000/blog | grep -A 1 "canonical"
```

**Résultat attendu :**
```html
<link rel="canonical" href="https://devis-demenageur-nice.fr/"/>
<link rel="canonical" href="https://devis-demenageur-nice.fr/partenaires/"/>
<link rel="canonical" href="https://devis-demenageur-nice.fr/blog/"/>
```

### 3. Vérifier le Sitemap
```bash
curl -s http://localhost:3000/sitemap.xml | grep "<loc>"
```

**Résultat attendu : Tous les `<loc>` avec slash final**
```xml
<loc>https://devis-demenageur-nice.fr/</loc>
<loc>https://devis-demenageur-nice.fr/services/</loc>
<loc>https://devis-demenageur-nice.fr/partenaires/</loc>
<loc>https://devis-demenageur-nice.fr/blog/prix/article/</loc>
```

### 4. Tester avec Google Rich Results Test
```
https://search.google.com/test/rich-results
```

Entrer l'URL de production après déploiement et vérifier que le canonical est correct.

---

## 🚨 Points d'Attention

### 1. Domaines Différents
Si vous aviez `nice-demenageur.fr` sur certaines pages et `devis-demenageur-nice.fr` sur d'autres :

**Décision à prendre :**
- Quel domaine garder comme principal ?
- Mettre en place redirections 301 ?

**Recommandation :**
```
Principal : devis-demenageur-nice.fr (sans www)
Redirection : nice-demenageur.fr → devis-demenageur-nice.fr
```

### 2. Articles de Blog Sans Canonical
Actuellement, beaucoup d'articles n'ont **pas** de canonical défini.  
→ Next.js utilise `metadataBase` par défaut  
→ **Ajouter explicitement** pour éviter les surprises

### 3. Impact SEO Temporaire
- Jours 1-7 : Léger recul positions (-5 à -10%)
- Jours 7-14 : Stabilisation
- Jours 14-30 : Retour baseline
- Jours 30+ : Amélioration consolidation

---

## 📊 Avant/Après Résumé

| Élément | Avant | Après |
|---------|-------|-------|
| **Canonicals** | Incohérents (avec/sans slash) | ✅ Tous avec slash final |
| **Domaines** | 2-3 par ville | ✅ 1 seul par ville |
| **Maintenance** | URLs hardcodées partout | ✅ Helper centralisé |
| **Blog articles** | Pas de canonical | ✅ Canonical explicite |
| **Sitemap** | URLs sans slash | ✅ URLs avec slash |
| **SEO Impact** | ❌ Dilution PageRank | ✅ Consolidation |

---

## 🎉 Bénéfices Attendus

1. **SEO**
   - Consolidation du PageRank sur une seule URL par page
   - Pas de duplicate content
   - Conformité Google best practices

2. **Maintenance**
   - Une seule fonction à modifier si changement de domaine
   - Pas d'oubli de slash final
   - Code plus propre et lisible

3. **Évolutivité**
   - Facile d'ajouter de nouvelles pages
   - Facile de changer de domaine si besoin
   - Tests automatisables

---

**Document créé le :** 31 octobre 2025  
**Prêt pour implémentation**

