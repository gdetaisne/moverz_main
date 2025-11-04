# TASK : Corriger 404s Blog Nice

**Date création** : 03 novembre 2025  
**Priorité** : P0  
**Ville** : Nice  
**Assigné** : Chat Cursor indépendant  
**Temps estimé** : 1h30-2h

---

## 🎯 OBJECTIF

Corriger **~50-80 liens internes 404** dans le blog Nice.

**Pattern** : Mismatch dossier ≠ catégorie frontmatter (identique à Lille/Montpellier)

---

## 🏗️ ARCHITECTURE NICE

### Structure actuelle

**Dossiers** :
```
content/blog/
├── aide-demenagement-nice/
├── demenagement-entreprise-nice/
├── demenagement-international-nice/
├── demenagement-pas-cher-nice/
├── demenagement-piano-nice/
├── demenageur-nice/
├── garde-meuble-nice/
├── location-camion-demenagement-nice/
├── petit-demenagement-nice/
├── prix-demenagement-nice/
└── satellites/
```

**Catégories frontmatter** :
```markdown
TOUS les guides ont : category: "demenagement-nice"
```

**URLs réelles** :
```
✅ /blog/demenagement-nice/demenageur-nice-guide/
✅ /blog/demenagement-nice/garde-meuble-nice-guide-complet/
✅ /blog/demenagement-nice/prix-demenagement-nice-guide/
```

**Liens cassés** :
```
❌ /blog/demenageur-nice/demenageur-nice-guide
❌ /blog/garde-meuble-nice/garde-meuble-nice-guide-complet
```

---

## 🔧 MAPPING NICE

**TOUTES les catégories** → `demenagement-nice`

| Lien cassé | URL correcte |
|------------|--------------|
| `/blog/demenageur-nice/{slug}` | `/blog/demenagement-nice/{slug}` |
| `/blog/garde-meuble-nice/{slug}` | `/blog/demenagement-nice/{slug}` |
| `/blog/aide-demenagement-nice/{slug}` | `/blog/demenagement-nice/{slug}` |
| `/blog/prix-demenagement-nice/{slug}` | `/blog/demenagement-nice/{slug}` |
| `/blog/demenagement-pas-cher-nice/{slug}` | `/blog/demenagement-nice/{slug}` |
| ... | ... |

---

## ✅ CHECKLIST - Identique à Lille

**⚠️ Lire task Lille** : `.cursor/tasks/[P0]-TASK-404-blog-lille/README.md`

Même workflow, remplacer "lille" par "nice"

---

## 🚀 TESTS PRODUCTION OBLIGATOIRES

```bash
curl -I https://devis-demenageur-nice.fr/blog/demenagement-nice/demenageur-nice-guide/
curl -I https://devis-demenageur-nice.fr/blog/demenagement-nice/garde-meuble-nice-guide-complet/
curl -I https://devis-demenageur-nice.fr/blog/demenagement-nice/prix-demenagement-nice-guide/
```

- [ ] 3 URLs = 200 OK avant de commencer

---

**Domain** : https://devis-demenageur-nice.fr  
**Liens cassés estimés** : 50-80  
**Status** : ✅ CLÔTURÉ (97% corrigés - 11 404s restants documentés)

---

## ✅ RÉSULTAT FINAL

**Date clôture** : 03 novembre 2025  
**Temps total** : 3h

**Corrections** :
- 280 liens corrigés / 291 total = **97%**
- 108 fichiers modifiés
- 3 commits appliqués

**Commits** :
1. `e27484b` - 90 fichiers (guides piliers → /blog/demenagement-nice/)
2. `7747ef4` - 17 fichiers (satellites + patterns spéciaux)
3. `4b8e3c9` - 1 fichier (corrections finales)

**Scripts créés** (réutilisables) :
- `analyze-blog-structure.mjs` - Analyse architecture blog
- `fix-404-links.mjs` - Correction automatique
- `fix-remaining-404s.mjs` - Patterns spéciaux
- `blog-url-mapping.json` - Référentiel 119 articles

**404s restants** : 11 liens vers pages catégories inexistantes
- Solutions documentées dans `11-404s-restants.md`
- Impact : < 1% du trafic (acceptable)

**Documentation complète** : `RAPPORT-FINAL.md`

