# PLAN CORRECTION FINALE - 404s Blog Nice

**Date** : 03 novembre 2025  
**Commit à revert** : Aucun (code actuel = état propre)

---

## 🎯 PATTERNS IDENTIFIÉS

### Pattern 1 : `/blog/satellites/xxx`
**Problème** : Liens pointent vers `/blog/satellites/{slug}` mais cette catégorie n'existe pas en prod.

**Cause** : 
- CATEGORY_MAPPING dit `'satellites': 'conseils'`
- Mais certains articles ont `category: "satellites"` dans frontmatter
- Ou liens hardcodés vers `/blog/satellites/`

**Correction** :
- Si frontmatter `category: "satellites"` → vérifier quelle catégorie réelle l'article devrait avoir
- Si lien hardcodé → trouver la vraie catégorie selon le slug

**Exemples** :
- `/blog/satellites/cout-reel-demenagement-nice` → Probablement `/blog/prix/cout-reel-demenagement-nice/`

---

### Pattern 2 : `/blog/demenagement-nice/{slug-guide}` inexistant
**Problème** : Guides référencés qui n'existent pas.

**Exemples** :
- `/blog/demenagement-nice/demenagement-etudiant-nice-guide/` → N'existe pas
- `/blog/demenagement-nice/cartons-gratuits-nice-ou-trouver/` → Devrait être `/blog/satellites/...` ou autre

**Correction** :
- Vérifier si l'article existe ailleurs (satellites ?)
- Rediriger vers le bon article

---

### Pattern 3 : Guides dans mauvaises catégories
**Problème** : Liens vers guides dans catégories longues qui n'existent pas.

**Exemples** :
- `/blog/garde-meuble-nice/garde-meuble-nice-guide-complet`
- `/blog/prix-demenagement-nice/prix-demenagement-nice-guide`

**Correction** :
- Ces guides sont dans `/blog/demenagement-nice/{slug}/`
- Corriger tous les liens vers ces guides

---

### Pattern 4 : Catégories vides
**Problème** : Liens vers `/blog/{catégorie}` sans slug (catégorie vide).

**Exemples** :
- `/blog/garde-meuble`
- `/blog/international`
- `/blog/pas-cher`
- `/blog/piano`
- `/blog/prix`

**Correction** :
- Pointer vers `/blog/` (page principale blog)

---

## 📋 PLAN D'ACTION

### ÉTAPE 1 : Analyser chaque 404 pour trouver la source
```bash
# Pour chaque 404, trouver :
# 1. Où est le lien dans le code source ?
# 2. Quelle est la vraie URL de l'article ?
```

### ÉTAPE 2 : Tester URLs en production
```bash
# Vérifier que les URLs cibles existent réellement
curl -I https://devis-demenageur-nice.fr/blog/{catégorie}/{slug}/
```

### ÉTAPE 3 : Appliquer corrections par pattern
1. Pattern 1 : `/blog/satellites/` → trouver vraie catégorie
2. Pattern 2 : Guides inexistants → trouver où ils sont réellement
3. Pattern 3 : Guides catégories longues → `/blog/demenagement-nice/{slug}/`
4. Pattern 4 : Catégories vides → `/blog/`

### ÉTAPE 4 : Tests production
```bash
# Tester 10-20 liens corrigés en prod
```

---

## 🔍 RECHERCHE VRAIES URLS

Pour chaque slug dans la liste 404 :
1. Chercher le fichier source
2. Lire frontmatter `category`
3. Appliquer CATEGORY_MAPPING
4. Générer URL réelle
5. Tester en prod

---

## ⚠️ ATTENTION

- **Trailing slash** : TOUJOURS présent (`/blog/xxx/`)
- **CATEGORY_MAPPING** : Vérifier avant correction
- **Test production** : Obligatoire avant commit massif



