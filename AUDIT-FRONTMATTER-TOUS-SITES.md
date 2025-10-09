# 🚨 AUDIT FRONT MATTER - TOUS LES SITES

**Date :** 9 octobre 2025  
**Problème :** Format front matter incompatible avec `lib/blog.ts`

---

## 📋 RÉSUMÉ

**Sites affectés :** 10 / 11 sites  
**Severité :** CRITIQUE (erreur 500 potentielle)

---

## 🔍 ANALYSE PAR SITE

### ❌ MAUVAIS FORMAT (identique à Strasbourg)

**Sites :** Marseille, Lyon, Montpellier, Nantes, Lille, Nice, Rennes, Rouen  
**Statut :** CRITIQUE - Erreur 500 probable

**Problèmes détectés :**
```yaml
# ❌ Format actuel (INCORRECT)
publishedAt: "2025-01-15"     # devrait être: publish_date
description: "..."            # devrait être: meta_description
featured: true

# ❌ Champs MANQUANTS
type: "pilier"                # REQUIS par getAllBlogPosts()
word_count: 5000              # REQUIS
meta_title: "..."             # REQUIS
h1: "..."                     # REQUIS
publish_date: "..."           # REQUIS (à la place de publishedAt)
```

**Nombre d'articles par site :**
- Marseille : 10 piliers
- Lyon : 10 piliers  
- Montpellier : 10 piliers
- Nantes : 10 piliers
- Lille : 10 piliers
- Nice : 10 piliers
- Rennes : 9 piliers
- Rouen : ~6 piliers

**Total estimé :** ~75 articles à corriger

---

### ❌ FORMAT DIFFÉRENT (très ancien)

**Site :** Toulouse  
**Statut :** CRITIQUE - Format legacy

**Problèmes détectés :**
```yaml
# ❌ Format actuel (TRÈS ANCIEN)
date: "2024-01-15"           # devrait être: publish_date
tags: ["tag1", "tag2"]       # devrait être: keywords
excerpt: "..."               # devrait être: meta_description
description: "..."           # devrait être: meta_description

# ❌ Champs MANQUANTS
type: "pilier"               # REQUIS
word_count: 5000             # REQUIS
meta_title: "..."            # REQUIS
h1: "..."                    # REQUIS
slug: "..."                  # REQUIS
category: "..."              # REQUIS
```

**Nombre d'articles :** 93 articles (10 piliers + 83 satellites)

---

### ⚠️ FORMAT MÉLANGÉ

**Site :** Bordeaux  
**Statut :** ATTENTION - Format inconsistant

**Constat :**
- ✅ Certains articles : BON format (piliers récents)
- ❌ D'autres articles : Format avec `description` + `date` + `tags` (satellites)

**Exemples :**

✅ **Bon format :**
```yaml
title: "Déménagement de piano à Bordeaux : guide complet"
meta_title: "..."
meta_description: "..."
h1: "..."
slug: "..."
category: "..."
type: "pilier"
keywords: "..."
word_count: 1800
date: "2025-01-11"           # ⚠️ devrait être publish_date
```

❌ **Mauvais format :**
```yaml
title: "Prix d'un déménagement de piano"
description: "..."           # devrait être meta_description
date: "2024-05-15"           # devrait être publish_date
category: "..."
tags: "..."                  # devrait être keywords (array)
meta_title: "..."            # ✅ présent
meta_description: "..."      # ✅ présent
word_count: 971              # ✅ présent
# ❌ Manque: type, h1, slug
```

**Nombre d'articles :** 143 articles

---

### ✅ CORRIGÉ

**Site :** Strasbourg  
**Statut :** CORRIGÉ (commit 83a1f46)  
**Articles corrigés :** 10 piliers

---

## 🎯 FORMAT ATTENDU PAR `lib/blog.ts`

```yaml
---
title: "Titre de l'article"
meta_title: "Titre SEO"
meta_description: "Description SEO (150-160 caractères)"
h1: "Titre H1 de la page"
slug: "slug-de-l-article"
category: "categorie-article"
type: "pilier"              # ou "satellite"
keywords: ["mot1", "mot2", "mot3"]
word_count: 5000
publish_date: "2025-01-15"
author: "Équipe Moverz"
featured: true              # ou false
---
```

---

## ⚠️ RISQUES

### Erreur 500 (Server Error)

**Cause :** `getAllBlogPosts()` attend des champs spécifiques :
- `publish_date` (pas `publishedAt` ou `date`)
- `type` (requis pour filtrer piliers/satellites)
- `word_count` (utilisé dans l'affichage)
- `meta_description` (pas `description`)

**Impact :**
- Page `/blog` → 500 error
- Pages `/blog/[category]` → 500 error
- Sitemap.ts → erreur génération sitemap
- Build Next.js → échec potentiel

### Données manquantes

Sans `type`, impossible de :
- Filtrer les piliers (`getPilierPosts()`)
- Créer les cocons sémantiques
- Prioriser les piliers dans le sitemap

Sans `word_count`, impossible d'afficher la métrique de lecture.

---

## 🔧 SOLUTION

### Option 1 : Script Python Global (RECOMMANDÉ)

Créer `fix-all-sites-frontmatter.py` qui :
1. Parse tous les sites (sauf Strasbourg déjà corrigé)
2. Détecte le format existant
3. Convertit vers le format attendu
4. Calcule `word_count` si manquant
5. Infère `type` selon les règles (guide complet = pilier)

**Avantage :** Traite tous les sites en une fois

### Option 2 : Adapter `lib/blog.ts` (PAS RECOMMANDÉ)

Modifier `getAllBlogPosts()` pour accepter les deux formats.

**Inconvénients :**
- Complexité technique
- Maintenabilité difficile
- Format inconsistant entre sites

---

## 📊 ESTIMATION

**Sites à corriger :** 10 sites  
**Articles à corriger :** ~311 articles
- Marseille : 10
- Lyon : 10
- Montpellier : 10
- Nantes : 10
- Lille : 10
- Nice : 10
- Rennes : 9
- Rouen : 6
- Toulouse : 93
- Bordeaux : 143 (à vérifier/nettoyer)

**Temps de correction :** ~5-10 minutes (script automatisé)  
**Temps de redéploiement :** ~30-45 minutes (11 sites)

---

## 🚀 PROCHAINES ÉTAPES

1. ✅ Créer script de correction global
2. ⏳ Exécuter sur tous les sites
3. ⏳ Vérifier les résultats
4. ⏳ Commit vers chaque repo individuel
5. ⏳ Redéployer tous les sites sur CapRover
6. ⏳ Tester chaque site `/blog`

---

## 📝 NOTES

- **Strasbourg déjà corrigé** : ne pas retraiter
- **Bordeaux** : attention au format mélangé, parser avec précaution
- **Toulouse** : format très différent, nécessite logique spécifique

---

**Créé :** 9 octobre 2025  
**Priorité :** URGENTE (sites potentiellement cassés)

