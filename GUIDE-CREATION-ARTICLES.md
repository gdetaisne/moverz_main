# 🚀 GUIDE DE CRÉATION DES 44 ARTICLES PRIORITAIRES

**Pour** : Nouveau chat Cursor  
**Date** : 28 Octobre 2025  
**Objectif** : Créer 44 articles pour résoudre 57.7% des 404

---

## 📋 FICHIERS À UTILISER

1. **`ARTICLES-A-CREER.json`** (44 articles) - Source de données
2. **`LISTE-ARTICLES-A-CREER.md`** - Liste formatée avec détails
3. Ce guide - Instructions de création

---

## 🎯 STRATÉGIE DE CRÉATION

### Phase 1 : 14 articles (3-5 jours)
**Impact** : 528 liens résolus (32.6% des 404)

Créer en priorité :
1. `/blog/demenagement-rennes/demenageur-rennes` (90 refs) 🔴
2. `/blog/demenagement-marseille/prix-demenagement-marseille` (60 refs) 🔴
3. `/blog/demenagement-marseille/demenageur-marseille` (45 refs) 🔴
4. `/blog/demenagement-rennes/demenagement-piano-rennes` (40 refs) 🔴
5. ... (voir liste complète dans LISTE-ARTICLES-A-CREER.md)

### Phase 2 : 30 articles (5-7 jours)
**Impact** : +406 liens résolus (+25.1% des 404)

Articles avec 10-19 références chacun.

---

## 📂 STRUCTURE DES FICHIERS

### Où créer les articles ?

```
sites/{ville}/content/blog/{category}/{slug}.md
```

**Exemples** :
```
/blog/demenagement-rennes/demenageur-rennes
→ sites/rennes/content/blog/demenagement-rennes/demenageur-rennes.md

/blog/demenagement-marseille/prix-demenagement-marseille
→ sites/marseille/content/blog/demenagement-marseille/prix-demenagement-marseille.md

/blog/devis/guide
→ sites/bordeaux/content/blog/devis/guide.md
```

---

## 📝 TEMPLATE D'ARTICLE

### Frontmatter obligatoire

```markdown
---
title: "[Titre optimisé SEO - 60 caractères max]"
description: "[Description engageante - 150-160 caractères]"
date: "2025-10-29"
category: "[catégorie extraite de l'URL]"
author: "Équipe Moverz"
---
```

### Structure recommandée

```markdown
# [Titre H1 - Reprendre le sujet principal]

[Introduction 150-200 mots]
- Contexte
- Problématique
- Annonce du plan

## [Section 1 - Premier aspect important]

[Contenu 200-300 mots]

### [Sous-section si nécessaire]

[Détails]

## [Section 2 - Deuxième aspect]

[Contenu 200-300 mots]

## [Section 3 - Troisième aspect]

[Contenu 200-300 mots]

## FAQ

### Question fréquente 1 ?
Réponse claire et concise.

### Question fréquente 2 ?
Réponse claire et concise.

### Question fréquente 3 ?
Réponse claire et concise.

## Obtenez votre devis gratuit

Faites appel à Moverz pour un déménagement professionnel et sans stress. 
[Demandez votre devis gratuit dès maintenant](/estimation-rapide).

---

**Articles liés** :
- [Lien article 1](/blog/...)
- [Lien article 2](/blog/...)
- [Lien article 3](/blog/...)
```

---

## 🎨 BONNES PRATIQUES

### Longueur
- **Minimum** : 800 mots
- **Optimal** : 1 200-1 500 mots
- **Maximum** : 2 000 mots

### SEO
- 1 seul H1 (titre principal)
- 3-5 H2 (sections principales)
- Mots-clés naturellement intégrés
- Meta description engageante
- Liens internes (3-5 minimum)

### Maillage interne
Créer des liens vers :
- Articles piliers de la même catégorie
- Articles connexes (services complémentaires)
- Pages services (/notre-offre, /comment-ca-marche)

### Exemples de liens internes par thème

**Pour articles "déménageur"** :
```markdown
- [Comment choisir son déménageur](/blog/...)
- [Prix d'un déménageur](/blog/...)
- [Devis déménagement](/estimation-rapide)
```

**Pour articles "prix"** :
```markdown
- [Tarifs déménagement](/blog/...)
- [Aides financières](/blog/...)
- [Obtenez un devis](/estimation-rapide)
```

**Pour articles thématiques** :
```markdown
- [Guide complet {thème}](/blog/...)
- [FAQ {thème}](/blog/...)
- [Services {thème}](/notre-offre)
```

---

## 🤖 PROMPT RECOMMANDÉ POUR CURSOR

```
Aide-moi à créer les articles listés dans ARTICLES-A-CREER.json.

Pour chaque article :
1. Lire les infos depuis le JSON (ville, catégorie, slug, URL)
2. Déterminer le chemin du fichier : sites/{ville}/content/blog/{category}/{slug}.md
3. Générer un article de qualité (1200-1500 mots) avec :
   - Frontmatter complet
   - Introduction engageante
   - 3-5 sections H2
   - Contenu informatif et pratique
   - FAQ (3-5 questions)
   - CTA vers /estimation-rapide
   - 3-5 liens internes pertinents
4. Créer le fichier

Commence par les articles Phase 1 (priorité HAUTE) dans l'ordre de fréquence.
Après chaque article, demande-moi si tu continues.
```

---

## ✅ CHECKLIST PAR ARTICLE

Avant de passer au suivant, vérifier :

- [ ] Fichier créé dans le bon dossier
- [ ] Frontmatter complet et valide
- [ ] Titre H1 unique et pertinent
- [ ] 3-5 sections H2 structurées
- [ ] Longueur 800-1500 mots
- [ ] FAQ avec 3-5 questions
- [ ] CTA vers /estimation-rapide
- [ ] 3-5 liens internes
- [ ] Pas de fautes d'orthographe
- [ ] Contenu unique (pas de copie)

---

## 📊 SUIVI DE PROGRESSION

Utiliser `LISTE-ARTICLES-A-CREER.md` pour suivre :
- Cocher les articles créés
- Mettre à jour le compteur de progression
- Noter les articles à revoir

---

## 🚨 PIÈGES À ÉVITER

### ❌ NE PAS FAIRE
- Créer l'article dans le mauvais dossier
- Utiliser des slugs différents du JSON
- Copier-coller du contenu existant
- Oublier le frontmatter
- Créer des liens vers des 404 (vérifier avant)
- Mélanger les catégories

### ✅ FAIRE
- Suivre exactement le chemin spécifié
- Utiliser le slug du JSON
- Générer du contenu original
- Valider le frontmatter
- Vérifier les liens internes
- Respecter la catégorie

---

## 🏁 APRÈS CRÉATION

### Vérification immédiate
```bash
# Re-run l'analyse 404
node scripts/analyze-404.mjs

# Vérifier les liens du nouvel article
cd sites/{ville}
node scripts/check-blog-links.js
```

### Mise à jour des fichiers
1. Mettre à jour `SUIVI-CORRECTION-404.md`
2. Re-calculer les statistiques
3. Documenter les articles créés

---

## 💡 ASTUCES

### Génération rapide avec IA
Pour accélérer, demander à Cursor de :
1. Générer 5 articles d'un coup (même ville)
2. Utiliser un template commun
3. Adapter seulement le contenu spécifique

### Batch par ville
Créer tous les articles d'une ville d'un coup :
- Plus cohérent pour le maillage interne
- Vocabulaire et contexte similaires
- Gain de temps

### Priorisation intelligente
1. Commencer par Rennes (7 articles, haute fréquence)
2. Puis Marseille (3 articles, très haute fréquence)
3. Puis Bordeaux (10 articles, moyenne fréquence)

---

## 📞 EN CAS DE PROBLÈME

### Article existe déjà
→ Vérifier si le slug est correct dans les liens cassés
→ Peut-être un problème de casse ou de format

### Catégorie introuvable
→ Créer le dossier de catégorie s'il n'existe pas
```bash
mkdir -p sites/{ville}/content/blog/{category}
```

### Liens internes cassés
→ Utiliser les articles piliers existants
→ Vérifier avec `check-blog-links.js`

---

**Bonne création ! 🚀**

L'objectif est de résoudre 57.7% des 404 avec ces 44 articles.

