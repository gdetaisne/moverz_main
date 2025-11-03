# TASK : Corriger 404s Blog Nantes

**Date création** : 03 novembre 2025  
**Priorité** : P0  
**Ville** : Nantes  
**Assigné** : Chat Cursor indépendant  
**Temps estimé** : 1h30-2h

---

## 🎯 OBJECTIF

Corriger **~50-80 liens internes 404** dans le blog Nantes.

**Pattern** : Mismatch dossier ≠ catégorie frontmatter (identique à Lille/Montpellier/Nice)

---

## 🏗️ ARCHITECTURE NANTES

### Structure actuelle

**Dossiers** :
```
content/blog/
├── aide-demenagement-nantes/
├── demenagement-entreprise-nantes/
├── demenagement-international-nantes/
├── demenagement-pas-cher-nantes/
├── demenagement-piano-nantes/
├── demenageur-nantes/
├── garde-meuble-nantes/
├── location-camion-demenagement-nantes/
├── petit-demenagement-nantes/
├── prix-demenagement-nantes/
└── satellites/
```

**Catégories frontmatter** :
```markdown
TOUS les guides ont : category: "demenagement-nantes"
```

**URLs réelles** :
```
✅ /blog/demenagement-nantes/demenageur-nantes-guide/
✅ /blog/demenagement-nantes/garde-meuble-nantes-guide/
✅ /blog/demenagement-nantes/prix-demenagement-nantes-guide/
```

**Liens cassés** :
```
❌ /blog/demenageur-nantes/demenageur-nantes-guide
❌ /blog/garde-meuble-nantes/garde-meuble-nantes-guide
```

---

## 🔧 MAPPING NANTES

**TOUTES les catégories** → `demenagement-nantes`

| Lien cassé | URL correcte |
|------------|--------------|
| `/blog/demenageur-nantes/{slug}` | `/blog/demenagement-nantes/{slug}` |
| `/blog/garde-meuble-nantes/{slug}` | `/blog/demenagement-nantes/{slug}` |
| ... | ... |

---

## ✅ CHECKLIST

Identique à Lille/Montpellier/Nice. **Remplacer "lille" par "nantes"** dans les commandes.

---

## 🚀 TESTS PRODUCTION

```bash
curl -I https://devis-demenageur-nantes.fr/blog/demenagement-nantes/demenageur-nantes-guide/
curl -I https://devis-demenageur-nantes.fr/blog/demenagement-nantes/garde-meuble-nantes-guide/
curl -I https://devis-demenageur-nantes.fr/blog/demenagement-nantes/prix-demenagement-nantes-guide/
```

---

**Domain** : https://devis-demenageur-nantes.fr  
**Liens cassés estimés** : 50-80  
**Architecture** : Fourre-tout (identique Lille)  
**Status** : 📋 TODO

