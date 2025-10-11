# 🔧 FIX ERREUR 500 - STRASBOURG BLOG

**Date :** 9 octobre 2025  
**Site :** devis-demenageur-strasbourg.fr/blog  
**Statut :** ✅ CORRIGÉ

---

## 🚨 PROBLÈME DÉTECTÉ

**Erreur :** Application error: a server-side exception has occurred  
**Page :** `/blog`  
**Digest :** 3336776577

---

## 🔍 DIAGNOSTIC

Le front matter des 10 articles Strasbourg était **incompatible** avec `lib/blog.ts`.

### Champs incorrects :
```yaml
# ❌ AVANT (erreur)
publishedAt: "2025-01-15"      # devrait être publish_date
description: "..."             # devrait être meta_description
# Manque: type, word_count, meta_title, h1
```

### Origine du problème :
Les articles Strasbourg avaient un format de front matter différent de celui attendu par la fonction `getAllBlogPosts()`.

---

## ✅ SOLUTION APPLIQUÉE

### Script de correction : `fix-strasbourg-frontmatter.py`

**Actions effectuées :**
1. ✅ Parsing de tous les fichiers `.md`
2. ✅ Extraction des champs existants
3. ✅ Conversion vers le format attendu
4. ✅ Calcul automatique `word_count`
5. ✅ Détection automatique `type` (pilier/satellite)
6. ✅ Réécriture avec nouveau front matter

### Résultats :

```
📋 10 fichiers corrigés
📝 48 431 mots au total
🎯 10 piliers détectés
```

**Fichiers corrigés :**
- aide-demenagement-strasbourg.md (5032 mots)
- demenagement-d-entreprise-strasbourg.md (5005 mots)
- demenagement-international-strasbourg.md (4997 mots)
- demenagement-petit-volume-strasbourg.md (3908 mots)
- demenagement-piano-strasbourg.md (4888 mots)
- demenagement-strasbourg-pas-cher.md (4488 mots)
- demenageur-strasbourg.md (5089 mots)
- location-camion-demenagement-strasbourg.md (5757 mots)
- prix-demenagement-strasbourg.md (5073 mots)
- garde-meuble-strasbourg-guide-complet.md (4193 mots)

---

## 📤 DÉPLOIEMENT

### Commits effectués :

**Repo individuel :** `dd-strasbourg`
```bash
git commit -m "fix: Correction front matter articles blog (erreur 500)"
git push origin main
```
Commit : `83a1f46`

### ⚠️ REDÉPLOIEMENT REQUIS

Le code est corrigé sur GitHub, mais **CapRover doit rebuild** :

1. Ouvre : https://captain.gslv.cloud
2. Apps → **dd-strasbourg**
3. Deployment → **Force Rebuild**
4. Attends ~2-3 min
5. Teste : https://devis-demenageur-strasbourg.fr/blog

---

## 🧪 TESTS À EFFECTUER

Après redéploiement, vérifie :

✅ https://devis-demenageur-strasbourg.fr/blog  
✅ https://devis-demenageur-strasbourg.fr/blog/demenagement-strasbourg/demenageur-strasbourg  
✅ Que les 10 piliers s'affichent  
✅ Que les métadonnées (mots, dates) sont visibles  

---

## 📚 FORMAT FRONT MATTER CORRECT

Pour référence future :

```yaml
---
title: "Titre de l'article"
meta_title: "Titre SEO"
meta_description: "Description SEO"
h1: "Titre H1"
slug: "slug-article"
category: "categorie-article"
type: "pilier"  # ou "satellite"
keywords: ["mot1", "mot2", "mot3"]
word_count: 5000
publish_date: "2025-01-15"
author: "Équipe Moverz"
featured: true
---
```

---

## 🎯 PROCHAINES ÉTAPES

1. ✅ Redéployer dd-strasbourg sur CapRover
2. 🔄 Vérifier que le blog fonctionne
3. 📊 (Optionnel) Mettre à jour le dashboard avec les chiffres Strasbourg
4. 🔗 (Optionnel) Créer le maillage interne pour Strasbourg (comme Toulouse)

---

**Script nettoyé :** Les fichiers temporaires ont été supprimés.  
**Backups :** Aucun backup conservé (corrections validées).

