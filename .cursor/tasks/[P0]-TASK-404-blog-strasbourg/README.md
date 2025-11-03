# TASK : Corriger 404s Blog Strasbourg

**Date création** : 03 novembre 2025  
**Priorité** : P0  
**Ville** : Strasbourg  
**Assigné** : Chat Cursor indépendant  
**Temps estimé** : 30 min-1h

---

## 🎯 OBJECTIF

Corriger **~30-50 liens internes 404** dans le blog Strasbourg.

**Pattern** : Simple (seulement 2 catégories)

---

## 🏗️ ARCHITECTURE STRASBOURG

### Structure actuelle (SIMPLE)

**Dossiers** :
```
content/blog/
├── demenagement-strasbourg/  (tous les articles)
├── garde-meuble-strasbourg/  (plusieurs articles)
└── satellites/
```

**Catégories frontmatter** :
```markdown
category: "demenagement-strasbourg" (majorité)
category: "garde-meuble-strasbourg" (quelques uns)
```

**URLs réelles** :
```
✅ /blog/demenagement-strasbourg/{slug}/
✅ /blog/garde-meuble-strasbourg/{slug}/
```

---

## 🔧 MAPPING STRASBOURG

**2 catégories seulement** :

| Catégorie | URLs |
|-----------|------|
| `demenagement-strasbourg` | `/blog/demenagement-strasbourg/{slug}/` |
| `garde-meuble-strasbourg` | `/blog/garde-meuble-strasbourg/{slug}/` |

---

## ✅ CHECKLIST

Identique à Marseille/Rennes (architecture simple).

---

**Domain** : https://devis-demenageur-strasbourg.fr  
**Liens cassés estimés** : 30-50  
**Architecture** : **SIMPLE**  
**Status** : 📋 TODO


