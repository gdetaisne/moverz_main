# Bordeaux - Mapping Liens /guide

**Date** : 03 novembre 2025  
**Pattern** : #5B - Liens `/blog/{category}/guide` inexistants

---

## 📊 ANALYSE

**Total liens cassés** : 117

**Distribution** :
```
  32 liens → /blog/devis/guide
  27 liens → /blog/etudiant/guide
  18 liens → /blog/longue-distance/guide
  17 liens → /blog/garde-meuble/guide
  13 liens → /blog/urgent/guide
  13 liens → /blog/prix/guide
  10 liens → /blog/international/guide
   9 liens → /blog/pas-cher/guide
   5 liens → /blog/entreprise/guide
```

---

## 🔧 MAPPING CORRECTION COMPLET

**Note** : Les catégories frontmatter sont longues (ex: `demenagement-etudiant-bordeaux`) mais Next.js les mappe vers URLs courtes (ex: `/blog/etudiant/`) via `CATEGORY_MAPPING` dans `lib/blog.ts`.

| Lien cassé (32 occurrences) | URL cible correcte | Catégorie | Slug |
|------------|-------------------|-----------|------|
| `/blog/devis/guide` | `/blog/devis/devis-demenagement-bordeaux-guide` | `devis-demenagement-bordeaux` | `devis-demenagement-bordeaux-guide` |
| `/blog/etudiant/guide` | `/blog/etudiant/demenagement-etudiant-bordeaux-guide-complet` | `demenagement-etudiant-bordeaux` | `demenagement-etudiant-bordeaux-guide-complet` |
| `/blog/longue-distance/guide` | `/blog/longue-distance/demenagement-longue-distance-bordeaux-guide` | `demenagement-longue-distance-bordeaux` | `demenagement-longue-distance-bordeaux-guide` |
| `/blog/garde-meuble/guide` | `/blog/garde-meuble/garde-meuble-bordeaux-guide` | `garde-meuble-bordeaux` | `garde-meuble-bordeaux-guide` |
| `/blog/urgent/guide` | `/blog/urgent/demenagement-urgent-bordeaux-guide` | `demenagement-urgent-bordeaux` | `demenagement-urgent-bordeaux-guide` |
| `/blog/prix/guide` | `/blog/prix/prix-demenagement-bordeaux-guide` | `prix-demenagement-bordeaux` | `prix-demenagement-bordeaux-guide` |
| `/blog/international/guide` | `/blog/international/demenagement-international-bordeaux-guide` | `demenagement-international-bordeaux` | `demenagement-international-bordeaux-guide` |
| `/blog/pas-cher/guide` | `/blog/pas-cher/demenagement-pas-cher-bordeaux-guide` | `demenagement-pas-cher-bordeaux` | `demenagement-pas-cher-bordeaux-guide` |
| `/blog/entreprise/guide` | `/blog/entreprise/demenagement-entreprise-bordeaux-guide` | `demenagement-entreprise-bordeaux` | `demenagement-entreprise-bordeaux-guide` |

---

## 📝 STRATÉGIE CORRECTION

### Option 1 : Rechercher/Remplacer Automatisé (RAPIDE - 10 min)

Utiliser `sed` ou script pour corriger les 117 liens d'un coup :

```bash
# Exemple pour devis/guide (32 occurrences)
find . -name "*.md" -type f -exec sed -i '' 's|](/blog/devis/guide)|](/blog/devis/devis-demenagement-bordeaux-guide)|g' {} \;
```

**Avantages** :
- ✅ Rapide (10 min total)
- ✅ Systématique (0 oubli)

**Inconvénients** :
- ⚠️ Risque de remplacer liens dans code/exemples (rare)

### Option 2 : Manuel (SAFE - 1h30)

Corriger chaque catégorie manuellement :
1. Grep tous les fichiers contenant `/blog/devis/guide`
2. Ouvrir chaque fichier
3. Remplacer manuellement
4. Valider contexte

**Avantages** :
- ✅ Contrôle total
- ✅ Validation contexte

**Inconvénients** :
- ❌ Long (1h30 pour 117 liens)
- ⚠️ Risque oubli

---

## ✅ RECOMMANDATION

**Option 1** (Automatisé) avec validation post-correction :

1. Script sed pour 9 remplacements
2. Git diff pour vérifier corrections
3. Build local test
4. Si OK → commit + push

**Temps estimé** : 10-15 min Bordeaux seul

---

## 🔍 EXEMPLE FICHIERS CONCERNÉS

```bash
grep -r "](/blog/devis/guide)" . --include="*.md" -l | head -5
```

Résultat attendu : ~32 fichiers satellites qui linkent vers `/blog/devis/guide`

