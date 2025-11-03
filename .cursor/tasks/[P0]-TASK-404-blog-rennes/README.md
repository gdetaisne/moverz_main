# TASK : Corriger 404s Blog Rennes

**Date création** : 03 novembre 2025  
**Priorité** : P0  
**Ville** : Rennes  
**Assigné** : Chat Cursor indépendant  
**Temps estimé** : 30 min-1h

---

## 🎯 OBJECTIF

Corriger **~10-20 liens internes 404** dans le blog Rennes.

**Pattern** : Simple (seulement 2 catégories)

---

## 🏗️ ARCHITECTURE RENNES

### Structure actuelle (SIMPLE)

**Dossiers** :
```
content/blog/
├── demenagement-rennes/  (tous les articles)
├── garde-meuble-rennes/  (1 guide)
└── satellites/
```

**Catégories frontmatter** :
```markdown
category: "demenagement-rennes" (majorité)
category: "garde-meuble-rennes" (1 article)
```

**URLs réelles** :
```
✅ /blog/demenagement-rennes/{slug}/
✅ /blog/garde-meuble-rennes/garde-meuble-rennes-guide-complet/
```

---

## 🔧 MAPPING RENNES

**2 catégories seulement** :

| Catégorie | URLs |
|-----------|------|
| `demenagement-rennes` | `/blog/demenagement-rennes/{slug}/` |
| `garde-meuble-rennes` | `/blog/garde-meuble-rennes/{slug}/` |

---

## ✅ CHECKLIST

Identique à Marseille (architecture simple).

---

**Domain** : https://devis-demenageur-rennes.fr  
**Liens cassés estimés** : 10-20  
**Architecture** : **SIMPLE** (facile)  
**Status** : 📋 TODO


