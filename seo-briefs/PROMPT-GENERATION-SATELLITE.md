# 🤖 Prompt de Génération d'Articles Satellites

**Usage :** Copier-coller ce prompt dans Cursor pour générer un article satellite à partir d'un brief

---

## 📋 Prompt Standard (à adapter)

```markdown
Lis le fichier : seo-briefs/[ville]/satellites/[pilier]/brief-satellite-[XX].md

Tu es rédacteur SEO expert en déménagement pour Moverz [Ville].

CONTEXTE :
Tu vas rédiger un article satellite d'un cocon sémantique.
Cet article s'insère dans une stratégie SEO exigeante visant la position #1 Google.

MISSION :
Rédige l'article satellite en respectant STRICTEMENT le brief fourni.

RÈGLES CRITIQUES (ABSOLUES) :

✅ CE QUE TU DOIS FAIRE :

1. STRUCTURE :
   - Respecter EXACTEMENT la structure H2/H3 du brief
   - Suivre la longueur indiquée pour chaque section
   - Intégrer les transitions suggérées
   - Longueur totale : 1200-1800 mots (hors FAQ)

2. MOTS-CLÉS & SÉMANTIQUE :
   - Intégrer TOUS les mots-clés principaux naturellement
   - Placer les 10-15 mots sémantiques du pilier CSV de façon fluide
   - Densité mot-clé principal : 0.8-1.2%
   - JAMAIS de bourrage de mots-clés

3. DONNÉES CHIFFRÉES :
   - Utiliser UNIQUEMENT les données sourcées du brief (5 minimum)
   - Citer la source entre parenthèses ou en note
   - Format : "[chiffre exact] ([source], [année])"
   - ZÉRO donnée inventée

4. LOCALISATION [VILLE] :
   - Mentionner quartiers, acteurs locaux du brief
   - Exemples concrets spécifiques à [Ville]
   - Prix/tarifs réels [Ville] avec sources
   - RIEN de recyclable pour autre ville

5. TON & STYLE :
   - Narratif fluide : raconter, pas lister
   - Phrases variées (courtes/longues alternées)
   - Adresser le lecteur ("vous") 
   - Expert mais accessible
   - Rassurant et empathique

6. MAILLAGE INTERNE :
   - Intégrer les 2-3 liens vers pilier du brief
   - Ancres naturelles suggérées
   - Contexte de phrase fourni

7. FAQ :
   - Reprendre les 5-7 questions du brief
   - Réponses 50-100 mots chacune
   - Intégrer données chiffrées si indiqué

8. FRONT MATTER :
   - Utiliser le front matter exact du brief
   - Ajouter toutes les sources en bas

❌ CE QUE TU NE DOIS JAMAIS FAIRE :

1. ❌ INVENTER des chiffres, prix, statistiques
2. ❌ CITER des entreprises, quartiers non mentionnés dans brief
3. ❌ CRÉER des listes à puces excessives (max 2 courtes)
4. ❌ UTILISER des phrases creuses :
   - "Il est important de..."
   - "En effet..."
   - "N'hésitez pas à..."
   - "Il convient de..."
5. ❌ RÉPÉTER mécaniquement les mots-clés
6. ❌ ÉCRIRE du contenu générique recyclable
7. ❌ OMETTRE les spécificités locales [Ville]
8. ❌ IGNORER les données chiffrées du brief
9. ❌ DÉPASSER 2000 mots ou être < 1200 mots
10. ❌ COPIER des structures de phrases répétitives

APPROCHE NARRATIVE :

- Commence chaque section par une accroche engageante
- Utilise des transitions fluides entre paragraphes
- Intègre les données chiffrées dans le récit (pas en liste)
- Varie la structure des phrases
- Questionne le lecteur pour l'engager
- Utilise des exemples concrets [Ville]
- Termine chaque section sur une note encourageante

FORMAT DE SORTIE :

Markdown avec front matter YAML complet.
Inclure section sources en bas :

---
## Sources et Références

1. [Nom source 1] - [URL] (consulté le [date])
2. [Nom source 2] - [URL] (consulté le [date])
[etc.]
---

VÉRIFICATIONS AVANT DE GÉNÉRER :

Ai-je bien :
- [ ] Lu TOUT le brief en détail ?
- [ ] Identifié les 5+ données chiffrées à intégrer ?
- [ ] Noté les mots sémantiques CSV du pilier ?
- [ ] Repéré les spécificités [Ville] obligatoires ?
- [ ] Compris la structure narrative section par section ?
- [ ] Mémorisé les interdictions formelles ?

SI TOUT EST OK → GO ! Rédige maintenant l'article complet.

SINON → Relis le brief attentivement.
```

---

## 🎯 Variantes du Prompt (selon contexte)

### Variante 1 : Première génération d'un pilier (article long)

```markdown
[Même prompt que ci-dessus]

ATTENTION PARTICULIÈRE :
Cet article est le PREMIER satellite de ce pilier.
Il doit servir de référence qualité pour les 9 suivants.

Prends le temps de :
- Soigner particulièrement l'introduction (200 mots narratifs)
- Varier les structures de phrases au maximum
- Intégrer TOUS les mots sémantiques du pilier CSV
- Créer des transitions exceptionnelles entre sections

Longueur cible : 1600-1800 mots (haut de fourchette).
```

### Variante 2 : Régénération après refus

```markdown
[Même prompt que ci-dessus]

CONTEXTE SPÉCIFIQUE :
Cet article a été refusé à la validation pour les raisons suivantes :
[Copier-coller les retours du directeur SEO]

CORRECTIONS OBLIGATOIRES :
[Liste précise des points à corriger]

Régénère l'article en corrigeant SPÉCIFIQUEMENT ces points.
Conserve ce qui fonctionnait bien dans la version précédente.
```

### Variante 3 : Article court/simple

```markdown
[Même prompt que ci-dessus]

PARTICULARITÉ :
Cet article traite d'un sujet simple et concret.
Vise la clarté et l'efficacité.

Longueur cible : 1200-1400 mots (bas de fourchette).
Structure : 3 sections H2 suffisent.
Style : Direct et actionnable.
```

---

## 🔄 Workflow d'Utilisation

### Étape 1 : Préparation du Chat Cursor

1. Ouvrir un **nouveau chat Cursor**
2. Le nommer : "Production Satellites [Ville] - [Pilier]"
3. Charger les contextes nécessaires :
   ```
   Lis d'abord ces fichiers pour contexte :
   - seo-briefs/[ville]/[XX]-[pilier-ville].md (brief pilier)
   - sites/[ville]/content/blog/[pilier]/[article-pilier].md (pilier publié)
   ```

### Étape 2 : Génération Satellite par Satellite

Pour chaque des 10 satellites :

1. **Copier le prompt standard ci-dessus**
2. **Adapter les variables** :
   - Remplacer `[ville]` par le nom de la ville
   - Remplacer `[pilier]` par le nom du pilier
   - Remplacer `[XX]` par le numéro (01 à 10)
3. **Coller dans Cursor et exécuter**
4. **Attendre génération** (5-15 minutes)
5. **Lecture rapide** pour vérifier cohérence
6. **Sauvegarder** dans `sites/[ville]/content/blog/satellites/[slug].md`

### Étape 3 : Entre chaque génération

**Feedback optionnel pour améliorer la qualité :**

Si l'article X était excellent :
```
Excellent ! Continue sur cette qualité pour le satellite suivant.
Conserve cette fluidité narrative et cette richesse de détails.
```

Si l'article X avait un défaut mineur :
```
Bon travail ! Pour le prochain, attention à [point spécifique].
Exemple : "Évite de commencer 2 paragraphes par 'En effet,'".
```

### Étape 4 : Fin de série (après 10 satellites)

```
Tu viens de terminer la série de 10 satellites pour [Pilier] [Ville].

Récapitulatif de production :
- Satellites générés : 10/10
- Longueur moyenne : [calculer]
- Mots-clés couverts : [lister les principaux]

Bravo ! Cette série est maintenant envoyée pour validation SEO.
```

---

## ✅ Checklist Post-Génération (utilisateur)

**Après chaque article généré, vérifier rapidement (2 min) :**

- [ ] **Longueur** : Entre 1200-1800 mots ?
- [ ] **Structure** : H2/H3 présents et logiques ?
- [ ] **Données** : Au moins 3-5 chiffres visibles ?
- [ ] **Ville** : Quartiers/acteurs locaux mentionnés ?
- [ ] **FAQ** : 5-7 questions présentes en fin ?
- [ ] **Front matter** : Complet avec title, meta, keywords ?
- [ ] **Liens** : 2-3 liens vers pilier présents ?
- [ ] **Narratif** : Pas trop de bullet points ?

**Si 7/8 OK ✅ → Sauvegarder et passer au suivant**  
**Si < 6/8 OK ⚠️ → Demander ajustement à Cursor**  
**Si critique ❌ → Signaler au directeur SEO**

---

## 🔧 Prompts d'Ajustement Rapide

### Si l'article est trop court (< 1200 mots)

```
Cet article fait seulement [X] mots, il en faut 1200-1800.

Enrichis les sections suivantes :
- Section 2 : Ajoute 2 exemples concrets [Ville]
- Section 3 : Développe davantage les conseils pratiques
- FAQ : Ajoute 2 questions supplémentaires

Conserve le style narratif et les données déjà présentes.
```

### Si trop de bullet points

```
Cet article contient trop de listes à puces (> 25% du contenu).

Transforme les listes des sections 2 et 3 en paragraphes narratifs fluides.
Conserve maximum 1 liste courte de 3-5 items si vraiment nécessaire.

Exemple de transformation :
❌ "- Point 1
    - Point 2
    - Point 3"

✅ "Le premier aspect à considérer est [Point 1]. En complément, [Point 2] joue également un rôle crucial. Enfin, n'oubliez pas [Point 3] qui peut..."
```

### Si manque de données chiffrées

```
Cet article manque de données chiffrées (j'en vois seulement [X], il en faut 5+).

Le brief contient ces données sourcées :
[Copier-coller les 5+ données du brief]

Intègre-les naturellement dans les sections concernées.
Format attendu : "[chiffre] ([source], [année])"
```

### Si pas assez localisé [Ville]

```
Cet article manque de spécificités [Ville].

Le brief mentionne ces éléments locaux :
[Copier-coller quartiers, acteurs, contraintes du brief]

Intègre-les dans les sections 1, 2 et 3.
Exemples concrets obligatoires pour [Ville].
```

---

## 📊 Suivi de Production

### Tableau de Bord (à tenir à jour)

**Pilier :** [Nom]  
**Ville :** [Ville]

| # | Satellite | Mots | Généré | Validé | Corrections | Statut |
|---|-----------|------|--------|--------|-------------|--------|
| 01 | [Titre] | 1450 | ✅ | ⏳ | 0 | En validation |
| 02 | [Titre] | 1620 | ✅ | ⏳ | 0 | En validation |
| 03 | [Titre] | 1380 | ✅ | ❌ | 1 | À corriger |
| 04 | [Titre] | - | ⏳ | - | - | En cours |
| 05 | [Titre] | - | 🔴 | - | - | À faire |
| ... | ... | ... | ... | ... | ... | ... |
| 10 | [Titre] | - | 🔴 | - | - | À faire |

**Progression :** 3/10 générés, 2/10 validés

---

## 💡 Conseils Pro

### Pour une génération optimale

1. **Charger le contexte pilier** avant de générer les satellites
2. **Générer par série de 3-5** (pas tous d'un coup) pour ajuster si besoin
3. **Donner du feedback** entre les articles pour améliorer la qualité
4. **Varier les heures de génération** si l'IA semble répétitive
5. **Faire des pauses** : mieux vaut 3 articles excellents que 10 moyens

### Si la qualité baisse

**Symptôme :** Articles 6-10 moins bons que 1-5

**Solutions :**
1. Ouvrir un **nouveau chat** pour les 5 suivants (contexte frais)
2. Recharger le brief pilier avant chaque génération
3. Être plus directif sur les points qui posaient problème
4. Espacer les générations (1 par jour au lieu de 10 d'affilée)

### Si Cursor "hallucine" des données

**Symptôme :** Chiffres ou entreprises non présents dans le brief

**Action immédiate :**
```
STOP ! Tu viens d'inventer des données.

Voici les SEULES données autorisées :
[Copier-coller les 5-7 données sourcées du brief]

Régénère [Section X] en utilisant UNIQUEMENT ces données.
ZÉRO invention.
```

---

## 🎯 Objectif de Qualité

**Standard attendu :**

- Note lecture humaine : ≥ 8/10
- Données sourcées : 5+ par article
- Spécificités ville : 3+ mentions concrètes
- Maillage interne : 2-3 liens pilier
- Structure narrative : fluide et variée
- Longueur : 1200-1800 mots

**Si ces critères sont atteints → Article validable**

---

**Document créé par :** Direction SEO Moverz  
**Usage :** Production articles satellites via Cursor  
**Version :** 1.0  
**Dernière mise à jour :** 13 octobre 2025

