# TASK : Corriger 404s Blog Marseille

**Date création** : 03 novembre 2025  
**Priorité** : P0  
**Ville** : Marseille  
**Assigné** : Chat Cursor indépendant  
**Temps estimé** : 30 min-1h

---

## 🎯 OBJECTIF

Corriger **~10 liens internes 404** dans le blog Marseille.

**Pattern** : Simple (seulement 2-3 catégories)

---

## 🏗️ ARCHITECTURE MARSEILLE

### Structure actuelle (SIMPLE)

**Dossiers** :
```
content/blog/
├── demenagement-marseille/  (90% des articles)
├── garde-meuble-marseille/  (10 articles)
└── satellites/
```

**Catégories frontmatter** :
```markdown
category: "demenagement-marseille"  (majorité)
category: "garde-meuble-marseille"  (quelques uns)
```

**URLs réelles** :
```
✅ /blog/demenagement-marseille/{slug}/
✅ /blog/garde-meuble-marseille/{slug}/
```

**⚠️ Structure SIMPLE** - Peu de 404s attendus

---

## 🔧 MAPPING MARSEILLE

**2 catégories seulement** :

| Catégorie | URLs |
|-----------|------|
| `demenagement-marseille` | `/blog/demenagement-marseille/{slug}/` |
| `garde-meuble-marseille` | `/blog/garde-meuble-marseille/{slug}/` |

---

## ✅ CHECKLIST

### Phase 1 : Audit (15 min)

```bash
cd sites/marseille/content/blog

# Chercher liens cassés potentiels
grep -r "](/blog/" . --include="*.md" | grep -v "/blog/demenagement-marseille/" | grep -v "/blog/garde-meuble-marseille/" | grep -v "/blog/conseils/" | head -20
```

- [ ] Liste liens cassés documentée
- [ ] Volume < 20 liens (confirmé)

### Phase 2 : Tests Production (5 min)

```bash
curl -I https://devis-demenageur-marseille.fr/blog/demenagement-marseille/
curl -I https://devis-demenageur-marseille.fr/blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet/
```

### Phase 3 : Corrections (15-30 min)

- [ ] Corriger manuellement (peu de liens)
- [ ] Vérifier git diff

### Phase 4 : Deploy (10 min)

---

**Domain** : https://devis-demenageur-marseille.fr  
**Liens cassés estimés** : 10  
**Architecture** : **SIMPLE** (facile)  
**Status** : 📋 TODO

