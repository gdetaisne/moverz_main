# TASK : Corriger 404s Blog Rouen

**Date création** : 03 novembre 2025  
**Priorité** : P0  
**Ville** : Rouen  
**Assigné** : Chat Cursor indépendant  
**Temps estimé** : 1h-1h30

---

## 🎯 OBJECTIF

Corriger **~40-60 liens internes 404** dans le blog Rouen.

**Pattern** : Mismatch dossier ≠ catégorie frontmatter (identique à Lille/Montpellier/Nice/Nantes)

---

## 🏗️ ARCHITECTURE ROUEN

### Structure actuelle

**Dossiers** :
```
content/blog/
├── aide-demenagement-rouen/
├── demenagement-entreprise-rouen/
├── demenagement-international-rouen/
├── demenagement-piano-rouen/
├── demenageur-rouen-pas-cher/
├── garde-meuble-rouen/
├── location-camion-demenagement-rouen/
├── prix-demenagement-rouen/
└── satellites/
```

**Catégories frontmatter** :
```markdown
TOUS les guides ont : category: "demenagement-rouen"
```

**URLs réelles** :
```
✅ /blog/demenagement-rouen/demenageur-rouen/
✅ /blog/demenagement-rouen/garde-meuble-rouen-guide-complet/
✅ /blog/demenagement-rouen/prix-demenagement-rouen-guide-complet/
```

---

## 🔧 MAPPING ROUEN

**TOUTES les catégories** → `demenagement-rouen`

---

## ✅ CHECKLIST

Identique à Lille. **Remplacer "lille" par "rouen"** dans les commandes.

---

## 🚀 TESTS PRODUCTION

```bash
curl -I https://devis-demenageur-rouen.fr/blog/demenagement-rouen/demenageur-rouen/
curl -I https://devis-demenageur-rouen.fr/blog/demenagement-rouen/garde-meuble-rouen-guide-complet/
curl -I https://devis-demenageur-rouen.fr/blog/demenagement-rouen/prix-demenagement-rouen-guide-complet/
```

---

**Domain** : https://devis-demenageur-rouen.fr  
**Liens cassés estimés** : 40-60  
**Architecture** : Fourre-tout (identique Lille)  
**Status** : 📋 TODO



