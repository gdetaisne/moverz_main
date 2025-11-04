# Analyse Lille - Pattern #5B

**Date** : 03 novembre 2025

---

## 📊 LIENS CASSÉS LILLE (Du scan)

### Catégorie : Liens vers guides satellites inexistants

**Type** : Pattern différent de Bordeaux !

**Exemples du scan** :
```
Source : /blog/aide-demenagement-lille/aide-demenagement-particuliers-lille
Liens cassés :
❌ /blog/location-camion-lille/location-camion-demenagement-lille-guide
❌ /blog/demenageur-lille/demenageur-lille-expert

Source : /blog/demenagement-international-lille/assurance-demenagement-international-lille
Lien cassé :
❌ /blog/demenagement-international-lille/demenagement-international-lille-guide

Source : /blog/demenagement-pas-cher-lille/aides-financieres-demenagement-lille
Lien cassé :
❌ /blog/demenagement-pas-cher-lille/demenagement-pas-cher-lille-guide
```

---

## 🔍 PATTERN IDENTIFIÉ

**Ce n'est PAS** `/blog/{category}/guide` (comme Bordeaux)

**Mais** : `/blog/{category}-lille/{slug}-guide` qui n'existe pas

**Exemples** :
```
❌ /blog/location-camion-lille/location-camion-demenagement-lille-guide (404)
❌ /blog/demenageur-lille/demenageur-lille-expert (404)
❌ /blog/demenagement-international-lille/demenagement-international-lille-guide (404)
```

**Vérification** : Ces fichiers existent-ils vraiment ?

---

## ✅ VÉRIFICATION EXISTENCE

**Guides qui EXISTENT dans Lille** :
- ✅ aide-demenagement-lille/aide-demenagement-lille-guide.md
- ✅ demenagement-entreprise-lille/demenagement-entreprise-lille-guide.md
- ✅ demenagement-international-lille/demenagement-international-lille-guide.md
- ✅ demenagement-pas-cher-lille/demenagement-pas-cher-lille-guide.md
- ✅ garde-meuble-lille/garde-meuble-lille-guide-complet.md
- ✅ location-camion-demenagement-lille/location-camion-demenagement-lille-guide.md
- ✅ petit-demenagement-lille/petit-demenagement-lille-guide.md
- ✅ prix-demenagement-lille/prix-demenagement-lille-guide.md

**Guides qui N'EXISTENT PAS** :
- ❌ demenageur-lille/demenageur-lille-expert.md (le scan dit que ça manque)

---

## 🤔 HYPOTHÈSE

Le scan externe voit des liens **cassés** mais ils pointent vers des articles qui **EXISTENT** dans notre code.

**Possibilité 1** : Problème de slug
```
Lien : /blog/location-camion-lille/location-camion-demenagement-lille-guide
Fichier : location-camion-demenagement-lille/location-camion-demenagement-lille-guide.md
→ Devrait fonctionner normalement !
```

**Possibilité 2** : Articles satellites linkent vers piliers avec mauvais slug
```
Article satellite linke : /blog/demenageur-lille/demenageur-lille-expert
Mais fichier s'appelle : demenageur-lille/demenageur-lille-guide.md (pas -expert)
→ 404
```

---

## 🔍 VÉRIFICATION NÉCESSAIRE

**Action** : Regarder dans les articles satellites Lille pour voir comment ils linkent



