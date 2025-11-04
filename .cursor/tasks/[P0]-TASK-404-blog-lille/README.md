# TASK-404-blog-lille - Corriger 404s Blog Lille

## 📊 Statut : ✅ FINALISÉ

## Contexte

Lille : Architecture mixte (11 catégories) avec cas particuliers
~22 liens 404 initiaux identifiés

## Architecture Blog Lille

**Catégories principales** :
- `demenagement-lille` : Articles piliers (entreprise, piano, garde-meuble)
- `entreprise` : Mapping de `demenagement-entreprise` → `entreprise`
- `garde-meuble-lille` : Articles stockage
- `location-camion-demenagement-lille` : Articles location
- Autres catégories spécialisées

**Particularité** : 
- Mapping `demenagement-entreprise` → `entreprise` dans `lib/blog.ts`
- Beaucoup d'articles dans `category: "demenagement-lille"` malgré dossiers séparés

## Solutions Appliquées - 3 Rounds

### Round 1 : Corrections initiales (22 corrections)

**Problèmes** :
- 3 liens `garde-meuble-lille-guide` → Mauvaise catégorie (`garde-meuble-lille/` au lieu de `demenagement-lille/`)
- 1 lien `devis-demenagement-lille-obtenir-comparer` → Mauvaise catégorie
- 15 liens entreprise sans catégorie
- 2 mentions `piano-guide` inexistant
- 1 slug incorrect `agences-location`
- 3 liens morts (RGPD, garde-meuble-entreprise, destruction-archives)
- 1 lien inventaire-ia cassé

**Corrections** :
```bash
/blog/garde-meuble-lille/garde-meuble-lille-guide 
  → /blog/demenagement-lille/garde-meuble-lille-guide

/blog/entreprise/[article] (ajout catégorie pour 15 articles)

Suppression 5 liens morts + fix inventaire-ia
```

### Round 2 : Catégories et slugs (10 corrections)

**Problèmes détectés** :
- 2 liens `piano-expert` → Mauvaise catégorie
- 2 slugs incorrects (acces-24-7, location-camion)
- 3 liens `bureaux-weekend` → Manquait catégorie
- 1 slug checklist incorrect
- 2 nouveaux liens morts

**Corrections** :
```bash
/blog/demenagement-piano-lille/demenagement-piano-lille-expert
  → /blog/demenagement-lille/demenagement-piano-lille-expert

acces-24-7-self-stockage-lille-acteurs → acces-247-self-stockage-lille

/blog/demenagement-bureaux-weekend-lille → /blog/entreprise/...

Suppression 2 liens morts (résiliation-bail, modification-kbis)
```

### Round 3 : Fix complet (11 corrections)

**Problèmes critiques identifiés** :
- 5 liens vers `/blog/entreprise)` seul → Catégorie sans article = 404
- 4 liens `location-camion-lille/` → Mauvais nom de catégorie
- 1 slug incorrect `demenagement-materiel-informatique`
- 2 nouveaux liens morts

**Corrections finales** :
```bash
# TOUS les /blog/entreprise) → guide complet
sed 's|](/blog/entreprise)\b|](/blog/demenagement-lille/demenagement-entreprise-lille-guide)|g'

# TOUS les location-camion-lille → location-camion-demenagement-lille
sed 's|](/blog/location-camion-lille/|](/blog/location-camion-demenagement-lille/|g'

# Slug materiel-informatique
/blog/demenagement-materiel-informatique-lille 
  → /blog/entreprise/transfert-materiel-informatique-entreprise-lille

# Suppression liens morts
- checklist-demenagement-bureaux-lille
- prix-demenagement-entreprise-lille
```

## 📈 Résultat Final

- ✅ **43 liens corrigés** (22 + 10 + 11)
- ✅ **9 liens morts supprimés**
- ✅ **39 fichiers modifiés**
- ✅ Build local réussi
- ✅ 0 lien cassé restant

## 📦 Commits

| Round | Monorepo | Lille | Corrections |
|-------|----------|-------|-------------|
| 1. Initiales | `5187545` | `92992b0` | 22 + 3 suppressions |
| 2. Catégories | `08aa7a7` | `7d07d03` | 10 + 2 suppressions |
| 3. Complet | `807f2d9` | `55c1b1a` | 11 + 2 suppressions |
| **TOTAL** | **3 commits** | **3 commits** | **43 + 7 suppressions** |

## 🎓 Leçons Apprises

### ⚠️ Erreurs à éviter

1. **Correction partielle** : Ne pas corriger un seul type de lien à la fois
2. **Catégorie seule** : `/blog/entreprise)` sans article = 404 garanti
3. **Variations de nom** : `location-camion-lille` vs `location-camion-demenagement-lille`
4. **Slugs longs** : `agences-location-camion-lille-comparatif` (pas juste `agences-location`)

### ✅ Méthode correcte

1. **Scanner TOUS les patterns** en une fois
2. **Corriger globalement** avec regex larges (`\b` pour word boundary)
3. **Vérifier build** après chaque round
4. **Tester en production** avant de fermer

## 🚀 Déploiement

CapRover redéploie automatiquement (~3-5 min)  
**Statut** : ✅ Déployé (commit `55c1b1a`)

## 📊 Comparaison Villes

| Ville | Catégories | Corrections | Rounds | Durée |
|-------|------------|-------------|--------|-------|
| Bordeaux | 8 | 184 | 2 | 2h15 |
| Toulouse | 66 | 170 | 2 | 1h05 |
| Strasbourg | 3 | 40 | 2 | 20 min |
| **Lille** | **11** | **43** | **3** | **20 min** |

Lille = **Complexe** malgré taille moyenne (beaucoup de cas particuliers)
