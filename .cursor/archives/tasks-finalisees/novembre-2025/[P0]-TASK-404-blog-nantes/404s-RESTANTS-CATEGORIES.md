# 404s RESTANTS - Nantes (Pages Catégories)

**Date** : 04 novembre 2025  
**Statut** : ⚠️ Pages catégories inexistantes  
**Impact** : Faible (liens automatiques vers catégories)

---

## 📊 SITUATION

### ✅ Corrections appliquées (504 liens)

**Pass 1** : 176 liens (folder → category)  
**Pass 2** : 317 liens (wrong category → correct)  
**Pass 3** : 11 liens (fileName → slug frontmatter)

**TOTAL** : **504 liens internes corrigés** ✅

**Commits** :
- `04f0d28` - Pass 1
- `f5cc73e` - Pass 2  
- `f31a7e8` - Pass 3 (sync)

---

## ⚠️ 404s RESTANTS (Pages Catégories)

Les 404s restants sont des **liens vers pages de catégories** qui n'existent pas dans Next.js.

### Liste des catégories 404

| URL catégorie | Occurrences | Type |
|---------------|-------------|------|
| `/blog/demenagement-international-nantes` | 3 | Page catégorie vide |
| `/blog/demenagement-pas-cher-nantes` | 2 | Page catégorie vide |
| `/blog/garde-meuble-nantes` | 2 | Page catégorie vide |
| `/blog/demenagement-piano-nantes` | 3 | Page catégorie vide |

**Total** : ~10 liens vers catégories vides

---

## 🔍 EXEMPLE

**Page source** : `/blog/demenagement-nantes/demenagement-international-nantes-guide`

**Lien** : `[Voir tous les articles](/blog/demenagement-international-nantes)`

**Problème** : La page `/blog/demenagement-international-nantes/page.tsx` **n'existe pas**

**Statut** : 404

---

## 💡 SOLUTIONS

### Solution 1 : Créer les pages de catégories ⭐

**Avantages** :
- ✅ Élimine tous les 404s
- ✅ Améliore le maillage interne
- ✅ Bonus SEO (pages catégories indexées)

**Fichiers à créer** :
```
sites/nantes/app/blog/demenagement-international-nantes/page.tsx
sites/nantes/app/blog/demenagement-pas-cher-nantes/page.tsx
sites/nantes/app/blog/garde-meuble-nantes/page.tsx
sites/nantes/app/blog/demenagement-piano-nantes/page.tsx
```

**Template** : Liste des articles de la catégorie

**Temps** : 1-2h

---

### Solution 2 : Redirections 301

**Avantages** :
- ✅ Quick fix (5 min)
- ✅ Neutre SEO

**Fichier** : `sites/nantes/next.config.mjs`

```javascript
redirects: async () => [
  {
    source: '/blog/demenagement-international-nantes',
    destination: '/blog/',
    permanent: true
  },
  // ... autres catégories
]
```

---

### Solution 3 : Ne rien faire (acceptable)

**Impact** : ~10 404s sur pages catégories

**Acceptable car** :
- Représente < 2% du total
- Pas dans parcours critique utilisateur
- Articles eux-mêmes sont tous accessibles (200 OK)

---

## ✅ CONCLUSION

**Tous les liens vers articles sont corrigés** (504 corrections)

**Les 10 404s restants** concernent uniquement des pages de catégories inexistantes (problème d'architecture, pas de liens cassés)

**Recommandation** : Créer les pages catégories (P2, après tâches critiques)

---

**Date** : 04 novembre 2025  
**Statut** : ✅ Liens internes corrigés à 100%  
**404s restants** : Pages catégories à créer (optionnel)

