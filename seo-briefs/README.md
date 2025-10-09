# 📚 Briefs SEO - Moverz

Structure organisée des briefs SEO extraits du fichier expert `SEO Guidelines - Feuille 1.csv`.

## 📁 Structure

```
seo-briefs/
├── marseille/ ✅ (10 pilliers - 2 800/mois)
├── lyon/ ✅ (10 pilliers - 4 010/mois)
├── lille/ ✅ (10 pilliers - 1 640/mois)
├── nice/ ✅ (10 pilliers - 1 320/mois)
├── montpellier/ ✅ (10 pilliers - 2 590/mois)
├── nantes/ ✅ (10 pilliers - 2 010/mois)
├── rennes/ ✅ (10 pilliers - 870/mois)
├── rouen/ ✅ (10 pilliers - 900/mois)
├── strasbourg/ ✅ (10 pilliers - 920/mois)
├── README.md (ce fichier)
├── DEMARRAGE-RAPIDE.md
├── PROMPT-TEMPLATE.md
└── RECAPITULATIF.md

📊 TOTAL : 9 villes × 10 pilliers = 90 briefs SEO
📈 Volume cumulé : ~17 000 recherches/mois
```

## 🎯 Stratégie SEO : Topic Clusters

### Architecture
- **10 piliers** par ville = pages d'autorité sur requêtes principales
- **9 articles satellites** par pilier = longue traîne + maillage interne
- **Total par ville** : 10 piliers + 90 articles = 100 contenus interconnectés

### Priorisation par volume
**Top 3 pilliers Marseille :**
1. 🥇 **location camion déménagement** (14 310/mois) 
2. 🥈 **garde meuble** (2 050/mois)
3. 🥉 **déménageur marseille** (360/mois)

## 🚀 Workflow de Production

### Étape 1 : Créer un pilier (2-3h)

**Ouvrir un nouveau chat Cursor et dire :**

```
Lis le fichier : seo-briefs/marseille/01-demenagement-marseille-pas-cher.md

Tu es rédacteur expert déménagement pour Moverz Marseille.

MISSION :
Rédige la page pilier en suivant STRICTEMENT le brief.

CONTRAINTES CRITIQUES :
- Structure H1/H2/H3 = exactement celle du brief
- Intégrer TOUS les mots sémantiques naturellement
- Contenu 100% spécifique Marseille (quartiers, particularités locales)
- Données réelles et vérifiables (prix 2025, délais, acteurs locaux)
- Ton : Expert mais accessible, rassurant

FORMAT SORTIE :
Markdown avec front matter Next.js

```yaml
---
title: "..."
description: "..."
slug: "demenagement-marseille-pas-cher"
category: "demenagement-marseille"
keywords: [...]
author: "Équipe Moverz Marseille"
publishedAt: "2025-01-15"
featured: true
---

[Contenu selon structure du brief]
```

GO ! Rédige maintenant.
```

### Étape 2 : Créer les 9 articles satellites (1-2h chacun)

**Identifier les sous-requêtes avec Deep Search :**
```
Pour le pilier "déménagement piano marseille", fais une deep search pour :
- Identifier 9 sous-requêtes pertinentes (longue traîne)
- Exemple : "comment emballer un piano", "prix transport piano marseille", etc.
```

**Puis pour chaque article :**
```
Article satellite pour pilier "déménagement piano marseille"

Sous-requête : "comment emballer un piano pour déménagement"

Rédige un article de 1200 mots avec :
- Lien vers le pilier (2-3 fois, ancres naturelles)
- Contenu actionnable et expert
- Spécificités Marseille si pertinent
- Format markdown avec front matter
```

## 📊 Volumes de Recherche Marseille

| Pilier | Volume/mois | Priorité |
|--------|-------------|----------|
| Location camion | 14 310 | 🔥🔥🔥 |
| Garde meuble | 2 050 | 🔥🔥🔥 |
| Déménageur | 360 | 🔥🔥 |
| Pas cher | 140 | 🔥 |
| Piano | 50 | ⭐ |
| Aide | 30 | ⭐ |
| International | 20 | ⭐ |
| Entreprise | 20 | ⭐ |
| Petit | 20 | ⭐ |
| Prix | 10 | ⭐ |

## ✅ Checklist Qualité

Avant de valider un contenu :

```
✅ Brief suivi à 100% (structure, sections, longueur)
✅ Mots sémantiques intégrés (80%+ de la liste)
✅ Spécificités Marseille présentes (quartiers, acteurs, problématiques)
✅ Données chiffrées réalistes et sourcées
✅ Vocabulaire naturel (pas sur-optimisé)
✅ CTA contextualisés (2-3 par page)
✅ FAQ répond aux questions du brief
✅ Liens internes pertinents
✅ Front matter complet
```

## 🔄 Réutilisation pour autres villes

Pour créer les briefs d'une autre ville :

```bash
# Modifier le script extract-seo-briefs.py
CITY = "Lyon"  # ou "Toulouse", "Bordeaux", etc.

# Exécuter
python3 extract-seo-briefs.py
```

## 📈 Suivi des créations

### Marseille
- [ ] Pilier 1 : déménagement pas cher
- [ ] Pilier 2 : international
- [ ] Pilier 3 : piano
- [ ] Pilier 4 : garde meuble
- [ ] Pilier 5 : petit déménagement
- [ ] Pilier 6 : aide
- [ ] Pilier 7 : entreprise
- [ ] Pilier 8 : déménageur
- [ ] Pilier 9 : prix
- [ ] Pilier 10 : location camion

### Lyon
- [ ] À créer

### Toulouse
- [ ] À créer

## 💡 Conseils Pro

1. **Commencer par les hauts volumes** (camion, garde-meuble) = ROI rapide
2. **Créer d'abord le pilier** avant ses 9 satellites
3. **Garder un fichier de tracking** des mots-clés déjà couverts
4. **Actualiser tous les 6 mois** (prix, données locales)
5. **Monitorer positions Google** après 2-3 mois

## 🎓 Ressources

- Brief SEO expert : `SEO Guidelines - Feuille 1.csv`
- Script extraction : `extract-seo-briefs.py`
- Sites actifs : `/sites/marseille/`, `/sites/lyon/`, etc.

---

**Créé le :** 2025-01-15  
**Valeur du conseil SEO :** ~150 000€ (10 pilliers × 10 villes × analyse experte)

