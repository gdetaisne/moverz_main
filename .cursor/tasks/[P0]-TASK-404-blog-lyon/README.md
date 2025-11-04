# TASK : Corriger 404s Blog Lyon

**Date création** : 03 novembre 2025  
**Priorité** : P0  
**Ville** : Lyon  
**Assigné** : Chat Cursor indépendant  
**Temps estimé** : 1h-1h30

---

## 🎯 OBJECTIF

Corriger **~10-20 liens internes 404** dans le blog Lyon.

**Pattern** : Mix (Architecture mixte : certains fourre-tout, certains spécifiques)

---

## 🏗️ ARCHITECTURE LYON

### Structure actuelle

**Dossiers** :
```
content/blog/
├── aide-au-demenagement-lyon/
├── demenagement-entreprise-lyon/
├── demenagement-international-lyon/
├── demenagement-lyon-pas-cher/
├── demenagement-petit-volume-lyon/
├── demenagement-piano-lyon/
├── demenageur-lyon/
├── garde-meuble-lyon/
├── location-camion-demenagement-lyon/
├── prix-demenagement-lyon/
└── satellites/
```

**Catégories frontmatter** :
```markdown
Majorité : category: "demenagement-lyon" (fourre-tout)
Certains : category: "demenagement-lyon-pas-cher" (spécifique)
```

**⚠️ ATTENTION : Architecture MIXTE !**

---

## 🔧 MAPPING LYON

**À VÉRIFIER MANUELLEMENT** car architecture mixte :

1. **Lister TOUTES les catégories uniques** :
```bash
find sites/lyon/content/blog -name "*.md" -exec grep "^category:" {} \; | sort | uniq
```

2. **Tester URLs production pour CHAQUE catégorie** :
```bash
curl -I https://devis-demenageur-lyon.fr/blog/demenagement-lyon/{slug}/
curl -I https://devis-demenageur-lyon.fr/blog/demenagement-lyon-pas-cher/{slug}/
```

**NE PAS ASSUMER** - Tester chaque pattern !

---

## ✅ CHECKLIST

### Phase 1 : Analyse approfondie (20 min)

- [ ] Lire `ERREURS-APPRISES-BORDEAUX.md`
- [ ] Lister toutes catégories uniques
- [ ] Tester 5-10 URLs production
- [ ] Identifier patterns (fourre-tout vs spécifique)
- [ ] Créer mapping exact

### Phase 2-9 : Comme Lille

---

**Domain** : https://devis-demenageur-lyon.fr  
**Liens cassés estimés** : 10-20  
**Architecture** : **MIXTE** (attention)  
**Status** : 📋 TODO



