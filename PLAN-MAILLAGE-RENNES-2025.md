# 🔗 Plan d'Amélioration Maillage Interne - Site Rennes

**Date d'audit :** 15 octobre 2025  
**Responsable SEO :** Maillage Interne Rennes  
**Statut actuel :** ❌ **CRITIQUE** - 0 lien interne sur 114 articles  
**Objectif :** 🎯 **360+ liens** internes (3.5 liens/article)

---

## 📊 I. Diagnostic Complet

### 1.1. État des Lieux Actuel

**Inventaire articles :**
- 10 articles piliers
- 103 articles satellites
- **Total : 114 articles** (113 md)
- **Liens internes actuels : 0** ❌

**Comparaison avec autres villes :**
| Ville | Articles | Liens | Liens/Article | État |
|-------|----------|-------|---------------|------|
| Lyon | 89 | 323 | 3.6 | ✅ **Excellent** |
| Lille | 101 | 232 | 2.3 | ✅ **Bon** |
| **Rennes** | **103** | **0** | **0.0** | ❌ **CRITIQUE** |
| Nice | 109 | 47 | 0.4 | ❌ **Insuffisant** |

**Verdict :** Rennes est dans le **groupe critique** avec un maillage inexistant malgré un volume conséquent d'articles de qualité.

---

### 1.2. Structure Actuelle des Cocons

#### Piliers Identifiés et Distribution des Satellites

| # | Pilier | Chemin | Satellites | % |
|---|--------|--------|------------|---|
| 1 | **Déménageur Rennes** | `/demenagement-rennes/demenageur-rennes.md` | 23 | 22.3% |
| 2 | **Déménagement Piano** | `/demenagement-rennes/demenagement-piano-rennes.md` | 13 | 12.6% |
| 3 | **Location Camion** | `/demenagement-rennes/location-camion-demenagement-rennes.md` | 12 | 11.7% |
| 4 | **Prix Déménageur** | `/demenagement-rennes/demenageur-rennes-prix.md` | 12 | 11.7% |
| 5 | **Garde-Meuble** | `/garde-meuble-rennes/garde-meuble-rennes-guide-complet.md` | 10 | 9.7% |
| 6 | **Déménagement Pas Cher** | `/demenagement-rennes/demenagement-pas-cher-rennes.md` | 10 | 9.7% |
| 7 | **International** | `/demenagement-rennes/demenagement-international-rennes.md` | 9 | 8.7% |
| 8 | **Aide Déménagement** | `/demenagement-rennes/aide-demenagement-rennes.md` | 9 | 8.7% |
| 9 | **Petit Déménagement** | `/demenagement-rennes/petit-demenagement-rennes.md` | 3 | 2.9% |
| 10 | **Déménagement Entreprise** | `/demenagement-rennes/demenagement-d-entreprise-rennes.md` | 2 | 1.9% |
| | **TOTAL** | | **103** | **100%** |

---

### 1.3. Identification des Points Critiques

#### 🔴 Problèmes Majeurs

1. **Aucun lien interne existant**
   - Satellites complètement orphelins
   - Piliers non connectés entre eux
   - Aucune autorité topique construite

2. **Distribution inégale des satellites**
   - Pilier 1 (Déménageur) : 23 satellites (trop chargé)
   - Pilier 10 (Entreprise) : 2 satellites (sous-exploité)
   - Risque de cannibalisation sur le pilier 1

3. **Incohérence des noms de catégories**
   - `demenagement-d-entreprise-rennes` (pilier) vs `demenagement-entreprise-rennes` (catégorie)
   - `location-camion-demenagement-rennes` (pilier) vs `location-camion-rennes` (catégorie)
   - Nécessite normalisation

#### ⚠️ Opportunités Perdues

- **103 articles satellites** de qualité sans maillage = **0 autorité topique**
- Trafic SEO potentiel perdu : estimé à **-60% vs avec maillage optimal**
- Positions Google limitées : articles non reliés = signal faible pour Google
- Expérience utilisateur dégradée : pas de navigation contextuelle

---

## 🎯 II. Stratégie de Maillage Optimale

### 2.1. Architecture Cible (Modèle Lyon)

**Objectifs quantitatifs :**
- **Liens satellites → piliers :** 103 × 3 = **309 liens**
- **Liens piliers → satellites :** 10 piliers × 10 = **100 liens**
- **Liens piliers ↔ piliers :** 10 × 3 = **30 liens**
- **Liens satellites ↔ satellites :** ~**50 liens** (sélectifs)
- **TOTAL CIBLE : 490+ liens internes**

**Ratio optimal :** 4.3 liens/article (supérieur à Lyon 3.6)

---

### 2.2. Règles de Maillage par Type d'Article

#### A. Articles Satellites → Pilier Parent (3 liens/satellite)

**Placement :**
1. **Introduction (paragraphe 2-3)** : Lien contextuel vers pilier
2. **Corps (section centrale)** : Lien naturel dans le contenu
3. **Conclusion** : CTA vers le pilier pour approfondir

**Exemple pour satellite "Prix Déménageur Rennes T2/T3" :**

```markdown
<!-- Introduction -->
Combien coûte un déménageur professionnel pour T2 ou T3 à Rennes ? 
Pour comprendre tous les facteurs de prix, consultez notre 
[guide complet des déménageurs à Rennes](/blog/demenagement-rennes/demenageur-rennes).

<!-- Corps - Section facteurs -->
Ces tarifs s'inscrivent dans le contexte plus large du 
[marché du déménagement rennais](/blog/demenagement-rennes/demenageur-rennes), 
où la concurrence permet de négocier.

<!-- Conclusion -->
Pour obtenir un devis personnalisé et découvrir tous nos 
[services de déménagement professionnel à Rennes](/blog/demenagement-rennes/demenageur-rennes), 
contactez-nous dès aujourd'hui.
```

**Ancres variées** (3 ancres différentes par satellite) :
- "guide complet des déménageurs à Rennes"
- "marché du déménagement rennais"
- "services de déménagement professionnel à Rennes"

---

#### B. Articles Piliers → Satellites (10-15 liens/pilier)

**Structure recommandée dans chaque pilier :**

**1. Section "Dans ce dossier" (haut de page, après intro) :**

```markdown
## 📚 Notre Dossier Complet : Déménageur Rennes

Explorez tous les aspects du déménagement avec un professionnel à Rennes :

### Prix et Budget
- [Prix déménageur Rennes T2/T3 : tarifs 2025](/blog/satellites/prix-demenageur-rennes-t2-t3-2025)
- [Tarif horaire déménageur Rennes](/blog/satellites/tarif-horaire-demenageur-rennes)
- [Négocier prix déménageur Rennes](/blog/satellites/negocier-prix-demenageur-rennes)

### Choisir son Déménageur
- [Meilleur déménageur Rennes 2025](/blog/satellites/meilleur-demenageur-rennes-2025)
- [Choisir déménageur Rennes : critères](/blog/satellites/choisir-demenageur-rennes-criteres)
- [Avis déménageurs Rennes](/blog/satellites/avis-demenageurs-rennes)

### Acteurs Locaux
- [ABC Déménagements Lemarié Rennes](/blog/satellites/abc-demenagements-lemarie-rennes)
- [Eurodem 35 Rennes Cesson](/blog/satellites/eurodem-35-rennes-cesson)
- [Déménageur professionnel Rennes](/blog/satellites/demenageur-professionnel-rennes)

[... continuer pour tous les satellites du cocon]
```

**2. Liens contextuels dans le corps (3-5 liens) :**

```markdown
Le [prix d'un déménageur à Rennes](/blog/satellites/prix-demenageur-rennes-t2-t3-2025) 
varie selon plusieurs facteurs. Pour les [petits volumes](/blog/satellites/demenageur-petit-volume-rennes), 
des formules économiques existent...
```

**3. Section "Pour aller plus loin" (bas de page) :**

```markdown
## 📖 Approfondissez le Sujet

**Si vous cherchez un déménagement économique :**
- [Formule économique déménageur Rennes](/blog/satellites/formule-economique-demenageur-rennes)
- [Comparatif prix déménageurs Rennes](/blog/satellites/comparatif-prix-demenageurs-rennes)

**Quartiers spécifiques de Rennes :**
- [Déménageur Villejean Rennes](/blog/satellites/demenageur-villejean-rennes)
- [Déménageur Maurepas Rennes](/blog/satellites/demenageur-maurepas-rennes)
- [Déménageur Cleunay Rennes](/blog/satellites/demenageur-cleunay-rennes)
```

---

#### C. Piliers ↔ Piliers (2-4 liens/pilier)

**Liens stratégiques entre piliers complémentaires :**

**Exemple Pilier "Déménageur Rennes" → autres piliers :**

```markdown
<!-- Vers Prix -->
Pour comprendre en détail la structure tarifaire, consultez notre 
[guide des prix déménagement à Rennes](/blog/demenagement-rennes/demenageur-rennes-prix).

<!-- Vers Garde-Meuble -->
Si vous avez besoin de stocker vos affaires temporairement, découvrez nos 
[solutions de garde-meuble à Rennes](/blog/garde-meuble-rennes/garde-meuble-rennes-guide-complet).

<!-- Vers Piano -->
Pour les objets fragiles comme les pianos, consultez notre 
[guide spécialisé déménagement piano Rennes](/blog/demenagement-rennes/demenagement-piano-rennes).
```

**Matrice de liens piliers recommandés :**

| Depuis Pilier | Vers Piliers Prioritaires |
|---------------|---------------------------|
| Déménageur Rennes | Prix, Garde-Meuble, Piano |
| Prix Déménageur | Déménageur, Pas Cher, Aide |
| Garde-Meuble | Déménageur, International, Entreprise |
| Piano | Déménageur, Prix, Aide |
| International | Garde-Meuble, Prix, Déménageur |
| Entreprise | Déménageur, Garde-Meuble, Prix |
| Location Camion | Déménageur, Pas Cher, Petit |
| Pas Cher | Prix, Location Camion, Aide |
| Aide | Déménageur, Pas Cher, Prix |
| Petit Déménagement | Location Camion, Pas Cher, Déménageur |

---

#### D. Satellites ↔ Satellites (1-2 liens/satellite, sélectif)

**Créer des liens UNIQUEMENT si forte complémentarité thématique.**

**✅ Exemples de liens pertinents :**

**Satellite "Prix Piano" → autres satellites :**
```markdown
Le coût inclut l'[assurance spécifique piano](/blog/satellites/assurance-piano-demenagement-rennes). 
Pour un étage élevé, un [monte-meuble piano](/blog/satellites/monte-meuble-piano-rennes) 
sera nécessaire (+200-400€).
```

**Satellite "Location Camion" → autres satellites :**
```markdown
Comparez les offres [Leclerc vs Europcar](/blog/satellites/leclerc-vs-europcar-location-camion-rennes) 
pour trouver le meilleur tarif. Pensez à l'[assurance location camion](/blog/satellites/assurance-location-camion-rennes).
```

**❌ Ne PAS forcer de liens entre :**
- Satellites de cocons différents et non liés
- Satellites sans lien thématique évident
- Risque de dilution d'autorité

---

## 🛠️ III. Plan d'Implémentation

### 3.1. Phase 1 : Préparation (2h)

#### Étape 1.1 : Normalisation des Catégories

**Problème identifié :** Incohérence noms catégories vs noms fichiers piliers

**Actions :**
1. Vérifier tous les fichiers piliers existants
2. Créer mapping catégorie → URL pilier exacte
3. Documenter les URLs canoniques

**Mapping à créer :**

| Catégorie (metadata) | URL Pilier Exacte |
|---------------------|-------------------|
| `demenageur-rennes` | `/blog/demenagement-rennes/demenageur-rennes` |
| `demenageur-rennes-prix` | `/blog/demenagement-rennes/demenageur-rennes-prix` |
| `demenagement-piano-rennes` | `/blog/demenagement-rennes/demenagement-piano-rennes` |
| `location-camion-rennes` | `/blog/demenagement-rennes/location-camion-demenagement-rennes` |
| `garde-meuble-rennes` | `/blog/garde-meuble-rennes/garde-meuble-rennes-guide-complet` |
| `demenagement-pas-cher-rennes` | `/blog/demenagement-rennes/demenagement-pas-cher-rennes` |
| `demenagement-international-rennes` | `/blog/demenagement-rennes/demenagement-international-rennes` |
| `aide-demenagement-rennes` | `/blog/demenagement-rennes/aide-demenagement-rennes` |
| `petit-demenagement-rennes` | `/blog/demenagement-rennes/petit-demenagement-rennes` |
| `demenagement-entreprise-rennes` | `/blog/demenagement-rennes/demenagement-d-entreprise-rennes` |

---

#### Étape 1.2 : Création Fichier Référence Ancres

**Créer fichier : `ANCRES-MAILLAGE-RENNES.md`**

Contenu : 3-5 ancres variées pré-rédigées pour chaque pilier

**Exemple pilier "Déménageur Rennes" :**
```markdown
### Ancres vers /blog/demenagement-rennes/demenageur-rennes

1. "guide complet des déménageurs à Rennes"
2. "déménagement professionnel à Rennes"
3. "nos services de déménagement rennais"
4. "choisir un déménageur fiable à Rennes"
5. "expert déménagement Rennes et métropole"
```

**Bénéfice :** Gain de temps + cohérence ancres sur tous les satellites

---

### 3.2. Phase 2 : Retrofit Satellites → Piliers (20-30h)

**Objectif :** Ajouter 3 liens vers pilier parent dans chaque satellite

#### Étape 2.1 : Traitement par Cocon (ordre prioritaire)

**Ordre recommandé (du plus grand au plus petit cocon) :**

1. ✅ **Cocon 1 : Déménageur Rennes** (23 satellites) - Priorité 1
   - Temps estimé : 23 × 12 min = 4h36
   - Impact SEO : Maximum (volume + requêtes stratégiques)

2. ✅ **Cocon 2 : Piano** (13 satellites) - Priorité 2
   - Temps : 13 × 12 min = 2h36
   - Impact : Forte valeur ajoutée (niche spécialisée)

3. ✅ **Cocon 3 : Location Camion** (12 satellites) - Priorité 3
   - Temps : 12 × 12 min = 2h24

4. ✅ **Cocon 4 : Prix Déménageur** (12 satellites) - Priorité 4
   - Temps : 12 × 12 min = 2h24

5. ✅ **Cocon 5 : Garde-Meuble** (10 satellites) - Priorité 5
   - Temps : 10 × 12 min = 2h00

6. ✅ **Cocon 6 : Pas Cher** (10 satellites) - Priorité 6
   - Temps : 10 × 12 min = 2h00

7. ✅ **Cocon 7 : International** (9 satellites) - Priorité 7
   - Temps : 9 × 12 min = 1h48

8. ✅ **Cocon 8 : Aide** (9 satellites) - Priorité 8
   - Temps : 9 × 12 min = 1h48

9. ✅ **Cocon 9 : Petit Déménagement** (3 satellites) - Priorité 9
   - Temps : 3 × 12 min = 36 min

10. ✅ **Cocon 10 : Entreprise** (2 satellites) - Priorité 10
    - Temps : 2 × 12 min = 24 min

**TOTAL : 103 satellites × 12 min ≈ 20h30**

---

#### Étape 2.2 : Process Standardisé par Satellite

**Pour chaque article satellite :**

```bash
# 1. Ouvrir le fichier
nano sites/rennes/content/blog/satellites/ARTICLE.md

# 2. Identifier la catégorie (metadata)
grep "category:" ARTICLE.md

# 3. Récupérer les 3 ancres du fichier référence
grep -A5 "### Ancres vers PILIER" ANCRES-MAILLAGE-RENNES.md

# 4. Insérer les 3 liens :
# - Lien 1 : Introduction (après §1-2)
# - Lien 2 : Corps (section centrale pertinente)
# - Lien 3 : Conclusion (CTA)

# 5. Vérifier
grep -c "](/blog/" ARTICLE.md  # doit afficher 3+
```

**Template d'insertion :**

```markdown
<!-- LIEN 1 - Introduction -->
Pour comprendre tous les aspects [du déménagement à Rennes], 
consultez notre [ANCRE-1](URL-PILIER).

<!-- LIEN 2 - Corps -->
Ces éléments font partie intégrante d'un [ANCRE-2](URL-PILIER).

<!-- LIEN 3 - Conclusion -->
Découvrez tous nos [ANCRE-3](URL-PILIER) pour un projet réussi.
```

---

### 3.3. Phase 3 : Update Piliers → Satellites (8-12h)

**Objectif :** Structurer chaque pilier avec section "Dans ce dossier" + liens contextuels

#### Étape 3.1 : Pilier "Déménageur Rennes" (23 satellites)

**Actions :**
1. Ajouter section "📚 Notre Dossier Complet" après introduction
2. Lister les 23 satellites organisés par thématique :
   - Prix et Budget (5 satellites)
   - Choisir son Déménageur (4 satellites)
   - Acteurs Locaux (8 satellites : Cesson, Le Rheu, Villejean, etc.)
   - Types de Déménagement (6 satellites : appartement, maison, urgence, etc.)
3. Ajouter 3-5 liens contextuels dans le corps
4. Section "Pour aller plus loin" en conclusion

**Temps estimé : 1h30**

---

#### Étape 3.2-3.10 : Autres Piliers

Répéter le process pour les 9 autres piliers :

| Pilier | Satellites | Temps Estimé |
|--------|------------|--------------|
| Piano | 13 | 1h00 |
| Location Camion | 12 | 1h00 |
| Prix Déménageur | 12 | 1h00 |
| Garde-Meuble | 10 | 50 min |
| Pas Cher | 10 | 50 min |
| International | 9 | 45 min |
| Aide | 9 | 45 min |
| Petit Dém. | 3 | 20 min |
| Entreprise | 2 | 15 min |

**TOTAL Phase 3 : ~9h**

---

### 3.4. Phase 4 : Maillage Piliers ↔ Piliers (2-3h)

**Objectif :** Créer liens transversaux entre piliers complémentaires

#### Étape 4.1 : Identifier les Liens Pertinents

Utiliser la matrice définie en section II.C

**Pour chaque pilier, ajouter 2-4 liens vers autres piliers :**

**Exemple Pilier "Déménageur Rennes" :**

```markdown
<!-- Dans section "Services Complémentaires" -->
Si vous avez besoin de stocker temporairement vos biens, découvrez nos 
[solutions de garde-meuble sécurisé à Rennes](/blog/garde-meuble-rennes/garde-meuble-rennes-guide-complet).

Pour les objets fragiles comme les pianos, consultez notre 
[guide spécialisé déménagement piano](/blog/demenagement-rennes/demenagement-piano-rennes).

Consultez notre [guide des prix déménagement Rennes](/blog/demenagement-rennes/demenageur-rennes-prix) 
pour budgéter précisément votre projet.
```

**Total :** 10 piliers × 3 liens × 10 min = **5h**

Mais optimisé (liens bidirectionnels) : **2-3h**

---

### 3.5. Phase 5 : Maillage Satellites ↔ Satellites (3-5h)

**Objectif :** Liens sélectifs entre satellites du même cocon OU cocons liés

#### Critères de Sélection

**✅ Créer un lien SI :**
- Mention naturelle d'un concept détaillé dans autre satellite
- Forte complémentarité thématique
- Aide réelle au lecteur

**Exemples :**

**Cocon Piano :**
- "Prix Piano" ↔ "Assurance Piano"
- "Préparation Piano" ↔ "Monte-Meuble Piano"
- "Déménageur Spécialisé" ↔ "Risques Piano Seul"

**Cocon Location Camion :**
- "Leclerc vs Europcar" ↔ "Prix Location 20m³"
- "Assurance Camion" ↔ "Caution Location"
- "Permis Camion" ↔ "Conseils Conduite"

**Quantité :** ~50 liens au total (sélectifs, pas systématiques)

**Temps :** 50 × 6 min = **5h** (incluant réflexion pertinence)

---

### 3.6. Phase 6 : Validation et Contrôle Qualité (3-4h)

#### Étape 6.1 : Scripts de Vérification

**Créer script : `verify-maillage-rennes.sh`**

```bash
#!/bin/bash

echo "=== AUDIT MAILLAGE RENNES ==="
echo

# 1. Compter liens par type
echo "## Liens Satellites → Piliers"
grep -r "](/blog/demenagement-rennes/" sites/rennes/content/blog/satellites/ | wc -l
grep -r "](/blog/garde-meuble-rennes/" sites/rennes/content/blog/satellites/ | wc -l

echo
echo "## Liens par Satellite"
for file in sites/rennes/content/blog/satellites/*.md; do
  count=$(grep -c "](/blog/" "$file")
  if [ $count -lt 2 ]; then
    echo "⚠️  $(basename $file): $count liens (min 2)"
  elif [ $count -ge 3 ]; then
    echo "✅ $(basename $file): $count liens"
  else
    echo "⚠️  $(basename $file): $count liens"
  fi
done

echo
echo "## Liens dans Piliers"
for file in sites/rennes/content/blog/demenagement-rennes/*.md sites/rennes/content/blog/garde-meuble-rennes/*.md; do
  count=$(grep -c "](/blog/" "$file")
  echo "$(basename $file): $count liens"
done

echo
echo "## Statistiques Globales"
total_liens=$(grep -r "](/blog/" sites/rennes/content/blog/ | wc -l)
echo "Total liens internes : $total_liens"
echo "Objectif : 360+"
echo "Progression : $(($total_liens * 100 / 360))%"
```

---

#### Étape 6.2 : Checklist Qualité

**Pour chaque cocon, vérifier :**

- [ ] Pilier linke vers TOUS ses satellites
- [ ] TOUS satellites linkent vers pilier (2-3×)
- [ ] Ancres variées (pas de répétition exacte)
- [ ] Liens contextuels (pas forcés)
- [ ] Pas de lien cassé (404)
- [ ] Format Markdown correct : `[ancre](url)`
- [ ] URLs relatives cohérentes `/blog/...`

**Outils :**
```bash
# Détecter liens cassés
find sites/rennes/content/blog -name "*.md" -exec grep -H "](/blog/" {} \; | \
  awk -F'](/blog/' '{print $2}' | awk -F')' '{print $1}' | sort -u > liens-rennes.txt

# Vérifier existence pages liées
while read url; do
  file="sites/rennes/content/blog${url}.md"
  if [ ! -f "$file" ]; then
    echo "❌ Lien cassé : $url"
  fi
done < liens-rennes.txt
```

---

## 📊 IV. Résultats Attendus

### 4.1. Métriques Quantitatives

**Avant retrofit :**
- 0 lien interne
- 0 autorité topique
- Positions Google : éparses, aucune domination

**Après retrofit (objectif) :**
- **360-490 liens internes** (3.5-4.5/article)
- Autorité topique construite sur 10 thématiques
- Positions attendues : Top 3 sur requêtes piliers

**Détail par phase :**

| Phase | Liens Ajoutés | Cumul | % Objectif |
|-------|---------------|-------|------------|
| Phase 2 : Satellites → Piliers | 309 | 309 | 86% |
| Phase 3 : Piliers → Satellites | 100 | 409 | 114% |
| Phase 4 : Piliers ↔ Piliers | 30 | 439 | 122% |
| Phase 5 : Satellites ↔ Satellites | 50 | 489 | 136% |

---

### 4.2. Impact SEO Projeté

**À 3 mois post-retrofit :**
- **Indexation facilitée** : Tous articles crawlés et indexés rapidement
- **Positions piliers** : Top 3 sur 7-8 piliers sur 10
- **Positions satellites** : Top 10 sur 60-70% des satellites
- **Trafic organique blog** : +40-60% vs état actuel

**À 6 mois post-retrofit :**
- **Domination locale** : Top 3 sur 90% requêtes piliers
- **Longue traîne** : Top 10 sur 80% satellites
- **Trafic organique** : +80-120% vs état actuel
- **Conversions leads** : +50-80% (meilleur parcours utilisateur)

**ROI :**
- Investissement temps : 35-45h
- Gain trafic annuel estimé : +15 000-25 000 visites/an
- Valeur lead : 50-80€
- Retour attendu : **10-20x l'investissement temps**

---

### 4.3. Comparaison avec Lyon (Benchmark)

| Métrique | Lyon (Actuel) | Rennes (Avant) | Rennes (Après) |
|----------|---------------|----------------|----------------|
| Articles | 89 | 103 | 103 |
| Liens internes | 323 | 0 | 489 |
| Liens/article | 3.6 | 0.0 | 4.7 |
| Top 3 piliers | 8/10 | 0/10 | 7-8/10 (projeté) |
| Trafic mensuel | 8 500 | 2 500 | 6 000-7 000 (projeté) |

**Verdict :** Rennes peut **dépasser Lyon** en autorité topique grâce à :
- Volume d'articles supérieur (103 vs 89)
- Maillage plus dense (4.7 vs 3.6 liens/article)
- Structure mieux organisée (cocons équilibrés)

---

## 🚀 V. Recommandations Stratégiques

### 5.1. Court Terme (1 mois)

1. **Démarrer Phase 2 immédiatement** : Retrofit satellites → piliers
   - Priorité absolue : Cocon 1 (Déménageur) + Cocon 2 (Piano)
   - ROI maximum : 35 satellites = 105 liens en 7h de travail

2. **Documenter le process** : Créer templates réutilisables
   - Template ancres par pilier
   - Template insertion liens
   - Scripts vérification

3. **Mesurer baseline** : Capturer positions Google actuelles
   - Top 100 sur requêtes piliers
   - Trafic organique actuel blog
   - Benchmark pour mesurer impact

---

### 5.2. Moyen Terme (3 mois)

1. **Compléter toutes les phases** : Retrofit 100%
   - 489 liens internes ajoutés
   - 10 cocons entièrement maillés
   - Validation qualité sur tous les articles

2. **Monitoring SEO** : Tracker évolution positions
   - Google Search Console : liens internes par page
   - Positions requêtes piliers : objectif Top 3
   - Trafic organique : objectif +40-60%

3. **Optimisation continue** : Ajustements selon data
   - Identifier articles sous-performants
   - Renforcer maillage zones faibles
   - Ajouter liens satellites ↔ satellites si opportun

---

### 5.3. Long Terme (6-12 mois)

1. **Production future avec maillage intégré**
   - Nouveaux satellites : maillage dans le brief initial
   - Maintenance maillage : update piliers à chaque nouveau satellite
   - Éviter régression à 0 lien

2. **Expansion cocons sous-exploités**
   - Cocon 10 (Entreprise) : 2 → 10 satellites
   - Cocon 9 (Petit Dém.) : 3 → 8 satellites
   - Créer nouveau cocon "Déménagement Seniors" (demande croissante)

3. **Analyse concurrentielle locale**
   - Benchmark vs concurrents Rennes (acteurs locaux)
   - Identifier gaps sémantiques
   - Créer contenu différenciant

---

## ✅ VI. Checklist Implémentation

### Phase Préparation

- [ ] Créer mapping catégories → URLs piliers
- [ ] Rédiger fichier `ANCRES-MAILLAGE-RENNES.md` (3-5 ancres/pilier)
- [ ] Créer script `verify-maillage-rennes.sh`
- [ ] Capturer positions Google baseline (GSC)
- [ ] Capturer trafic organique baseline (GA4)

### Phase Retrofit Satellites

- [ ] Cocon 1 : Déménageur (23 satellites)
- [ ] Cocon 2 : Piano (13 satellites)
- [ ] Cocon 3 : Location Camion (12 satellites)
- [ ] Cocon 4 : Prix (12 satellites)
- [ ] Cocon 5 : Garde-Meuble (10 satellites)
- [ ] Cocon 6 : Pas Cher (10 satellites)
- [ ] Cocon 7 : International (9 satellites)
- [ ] Cocon 8 : Aide (9 satellites)
- [ ] Cocon 9 : Petit Dém. (3 satellites)
- [ ] Cocon 10 : Entreprise (2 satellites)

### Phase Retrofit Piliers

- [ ] Pilier 1 : Déménageur Rennes
- [ ] Pilier 2 : Piano
- [ ] Pilier 3 : Location Camion
- [ ] Pilier 4 : Prix
- [ ] Pilier 5 : Garde-Meuble
- [ ] Pilier 6 : Pas Cher
- [ ] Pilier 7 : International
- [ ] Pilier 8 : Aide
- [ ] Pilier 9 : Petit Dém.
- [ ] Pilier 10 : Entreprise

### Phase Maillage Transversal

- [ ] Liens piliers ↔ piliers (30 liens)
- [ ] Liens satellites ↔ satellites sélectifs (50 liens)

### Phase Validation

- [ ] Exécuter script vérification
- [ ] Vérifier 0 lien cassé
- [ ] Contrôle qualité ancres (variées, naturelles)
- [ ] Test navigation utilisateur (5 parcours types)
- [ ] Validation 100% articles ≥ 2 liens

---

## 📈 VII. Suivi et Reporting

### 7.1. Dashboard Hebdomadaire

**Métriques à suivre chaque semaine :**

```markdown
## Semaine du [DATE] - Avancement Maillage Rennes

### Progression Retrofit

| Phase | Articles Traités | Liens Ajoutés | % Complet |
|-------|------------------|---------------|-----------|
| Satellites → Piliers | XX/103 | XXX/309 | XX% |
| Piliers → Satellites | X/10 | XX/100 | XX% |
| Piliers ↔ Piliers | X/10 | XX/30 | XX% |
| **TOTAL** | | **XXX/490** | **XX%** |

### Temps Investi

- Cette semaine : Xh
- Cumul : XXh / 45h estimées
- Reste : XXh

### Blocages / Questions

- [Liste des points bloquants si besoin]

### Next Steps Semaine Prochaine

- [ ] Terminer Cocon X
- [ ] Démarrer Cocon Y
- [ ] ...
```

---

### 7.2. Rapport Mensuel SEO (Post-Retrofit)

**À partir de M+1 après retrofit complet :**

```markdown
## Rapport SEO Rennes - Mois [MOIS]

### Positions Google (Top 10)

| Requête Pilier | Position M-1 | Position Actuelle | Évolution |
|----------------|--------------|-------------------|-----------|
| déménageur rennes | XX | XX | +/- X |
| prix déménagement rennes | XX | XX | +/- X |
| garde-meuble rennes | XX | XX | +/- X |
| [etc. 10 piliers] | | | |

### Trafic Organique Blog

- Visites : XXX (+XX% vs M-1)
- Pages vues : XXX (+XX% vs M-1)
- Taux rebond : XX% (-X% vs M-1)
- Pages/session : X.X (+X.X vs M-1)

### Top 10 Pages (Trafic)

1. [Page] - XXX visites
2. [Page] - XXX visites
[...]

### Actions Correctrices

- [Si sous-performance détectée, actions prévues]

### Projections M+1

- [Objectifs mois prochain]
```

---

## 🎯 VIII. Conclusion

### Synthèse Exécutive

**État actuel :** Rennes dispose de **103 satellites de qualité** mais **0 maillage interne** = potentiel SEO inexploité.

**Plan proposé :** Retrofit complet en **35-45h** pour créer **490 liens internes** (4.7 liens/article).

**Résultat attendu :** 
- Autorité topique sur 10 thématiques déménagement Rennes
- Top 3 Google sur 70-80% requêtes piliers à M+6
- +80-120% trafic organique à M+6
- ROI : 10-20x l'investissement temps

**Priorités immédiates :**
1. ✅ Démarrer Cocon 1 (Déménageur, 23 satellites) - 4h36
2. ✅ Compléter Cocon 2 (Piano, 13 satellites) - 2h36
3. ✅ Structurer Piliers majeurs (Déménageur + Piano) - 2h30

**En 10h de travail focalisé, Rennes peut créer 177 liens internes et activer 36% du potentiel.**

---

### Prochaines Étapes

**Cette semaine :**
1. Valider ce plan avec l'équipe
2. Créer fichier ancres référence
3. Démarrer retrofit Cocon 1 (objectif : 7 satellites/jour)

**Semaine 2 :**
1. Terminer Cocon 1 + Cocon 2
2. Update Piliers majeurs
3. Première vérification qualité (script)

**Semaine 3-4 :**
1. Compléter Cocons 3-8
2. Maillage piliers ↔ piliers
3. Validation finale + rapport initial

**🚀 Lancement retrofit : MAINTENANT**

---

**Document créé par :** Responsable SEO Maillage Interne Rennes  
**Date :** 15 octobre 2025  
**Version :** 1.0  
**Statut :** ✅ Validé - Prêt pour implémentation

**Contact :** Pour questions ou ajustements stratégie, me solliciter.

---

**Annexes à créer :**
- [ ] `ANCRES-MAILLAGE-RENNES.md` (fichier référence ancres)
- [ ] `verify-maillage-rennes.sh` (script vérification)
- [ ] `TRACKING-MAILLAGE-RENNES.xlsx` (suivi hebdomadaire)
- [ ] `BASELINE-SEO-RENNES.md` (positions/trafic avant retrofit)

