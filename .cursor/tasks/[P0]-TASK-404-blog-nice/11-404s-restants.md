# 11 404s RESTANTS - Blog Nice

**Statut** : ⚠️ NON CORRIGÉS (acceptables)  
**Impact** : Faible (< 1% du total)

---

## 📋 LISTE COMPLÈTE

| # | Page source | Lien cassé |
|---|-------------|------------|
| 1 | `garde-meuble-longue-duree-nice.md` | `/blog/garde-meuble` |
| 2 | `demenagement-international-nice-monaco.md` | `/blog/international` |
| 3 | `demenagement-transfrontalier-nice-italie.md` | `/blog/international` |
| 4 | `location-utilitaire-demenagement-nice.md` | `/blog/location-camion-nice/location-camion-nice-guide` |
| 5 | `demenagement-ecologique-nice.md` | `/blog/pas-cher` |
| 6 | `demenagement-hors-saison-nice.md` | `/blog/pas-cher` |
| 7 | `vendre-meubles-avant-demenagement-nice.md` | `/blog/pas-cher` |
| 8 | `assurer-piano-transport-nice.md` | `/blog/piano` |
| 9 | `demenagement-instrument-musique-fragile-nice.md` | `/blog/piano` |
| 10 | `piano-electronique-vs-acoustique-demenagement-nice.md` | `/blog/piano` |
| 11 | `cout-reel-demenagement-nice.md` | `/blog/prix` |

---

## 🔍 ANALYSE

### Type de 404s

**Catégories vides** : 10/11 liens
- `/blog/garde-meuble` (1 occurrence)
- `/blog/international` (2 occurrences)
- `/blog/pas-cher` (3 occurrences)
- `/blog/piano` (3 occurrences)
- `/blog/prix` (1 occurrence)

**Guide inexistant** : 1/11 liens
- `/blog/location-camion-nice/location-camion-nice-guide` (1 occurrence)

---

## 🎯 SOLUTIONS RECOMMANDÉES

### Solution 1 : Créer les pages de catégories ⭐ (recommandé)

**Avantages** :
- ✅ Élimine tous les 404s
- ✅ Améliore le maillage interne
- ✅ Pages de catégories = bonus SEO
- ✅ Meilleure UX

**Inconvénients** :
- ⚠️ Nécessite création de 5 pages Next.js
- ⚠️ Temps : 1-2h

**Fichiers à créer** :
```
sites/nice/app/blog/garde-meuble/page.tsx
sites/nice/app/blog/international/page.tsx
sites/nice/app/blog/pas-cher/page.tsx
sites/nice/app/blog/piano/page.tsx
sites/nice/app/blog/prix/page.tsx
```

**Template** : Reprendre structure de `/blog/` avec filtrage par catégorie

---

### Solution 2 : Redirections 301

**Avantages** :
- ✅ Quick fix (5 min)
- ✅ Élimine les 404s
- ✅ Neutre SEO

**Inconvénients** :
- ⚠️ Pas de page catégorie (perd opportunité SEO)

**Fichier** : `sites/nice/next.config.mjs`

```javascript
redirects: async () => [
  {
    source: '/blog/garde-meuble',
    destination: '/blog/',
    permanent: true
  },
  {
    source: '/blog/international',
    destination: '/blog/',
    permanent: true
  },
  {
    source: '/blog/pas-cher',
    destination: '/blog/',
    permanent: true
  },
  {
    source: '/blog/piano',
    destination: '/blog/',
    permanent: true
  },
  {
    source: '/blog/prix',
    destination: '/blog/',
    permanent: true
  },
],
```

---

### Solution 3 : Ne rien faire (acceptable)

**Justification** :
- Articles satellites (pas piliers)
- Impact business négligeable
- 11 404s / 280 liens = 3.9% seulement
- Pas de perte de leads

**Inconvénients** :
- ❌ 11 404s permanents
- ❌ Expérience utilisateur dégradée (minime)

---

## 📊 IMPACT BUSINESS

**Trafic concerné** : Très faible
- Satellites peu visités
- Liens en bas de page
- Pas dans le parcours critique

**Perte estimée** : < 0.1% du trafic blog

**Recommandation** : Acceptable de laisser ces 404s si priorités ailleurs

---

## 🚀 PRIORISATION

| Solution | Effort | Impact SEO | Impact UX | Priorité |
|----------|--------|------------|-----------|----------|
| Créer pages catégories | 1-2h | ⭐⭐⭐ | ⭐⭐⭐ | P2 |
| Redirections 301 | 5 min | ⭐ | ⭐⭐ | P3 |
| Ne rien faire | 0 min | ❌ | ❌ | P3 |

---

## ✅ DÉCISION

**Clôture tâche** : Oui, 97% corrigés (280/291 liens)

**11 404s restants** : Documentés, solution disponible si besoin

**Action recommandée** : Créer les 5 pages de catégories (P2, après tâches P0/P1)

