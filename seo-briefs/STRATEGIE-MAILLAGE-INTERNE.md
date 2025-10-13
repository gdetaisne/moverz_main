# 🔗 Stratégie de Maillage Interne - Cocons Sémantiques

**Objectif :** Créer un maillage interne optimal pour maximiser l'autorité topique et le SEO

---

## 🎯 Pourquoi le Maillage Interne est CRUCIAL

### Impact SEO Direct

1. **Transmission du PageRank** : Les liens internes distribuent l'autorité SEO
2. **Compréhension topique** : Google comprend mieux la structure thématique
3. **Indexation facilitée** : Les robots explorent plus facilement le site
4. **Temps sur site augmenté** : Les utilisateurs naviguent entre articles connexes
5. **Taux de rebond réduit** : Moins de sorties immédiates

### Autorité Topique (Topic Authority)

Un cocon sémantique bien maillé **= signal fort à Google** :

> "Ce site est EXPERT sur ce sujet précis, regardez comment tout est interconnecté et complémentaire"

**Résultat :** Positions #1 sur l'ensemble des requêtes du cocon (pilier + satellites)

---

## 🏗️ Architecture d'un Cocon Sémantique

### Structure Théorique

```
                    [PAGE MÈRE]
                  Catégorie Déménagement
                         |
        +----------------+----------------+
        |                                 |
    [PILIER 1]                      [PILIER 2]
    Déménagement Piano              Garde-Meuble
         |                               |
    +----+----+                     +----+----+
    |    |    |                     |    |    |
  SAT1 SAT2 SAT3                  SAT1 SAT2 SAT3
  Prix Emb. Trans.                Prix Types Durée
```

### Notre Architecture Spécifique

**Pour chaque ville, nous avons :**

- **1 page ville** (page mère) : `/` ou `/demenagement-[ville]`
- **10 piliers** (articles principaux)
- **100 satellites** (10 par pilier, articles détaillés)

**Total par ville :** 111 pages interconnectées

---

## 🔗 Règles de Maillage Détaillées

### Règle 1 : Pilier → Satellites (Liens Descendants)

**Principe :** Le pilier DOIT linker vers tous ses satellites

#### Implémentation

**Dans chaque article pilier :**

1. **Section "Sommaire" ou "Dans ce dossier"** (haut de page)
   ```markdown
   ## 📚 Notre Dossier Complet : Déménagement Piano [Ville]
   
   - [Prix d'un déménagement de piano à [Ville]](/blog/piano/prix-piano)
   - [Comment emballer un piano pour le transport](/blog/piano/emballage-piano)
   - [Transport de piano à queue : techniques pro](/blog/piano/transport-piano-queue)
   - [Déménagement de piano droit vs piano à queue](/blog/piano/piano-droit-vs-queue)
   - [Monte-meuble pour piano : quand est-il nécessaire ?](/blog/piano/monte-meuble-piano)
   - [Assurance déménagement piano : ce qu'il faut savoir](/blog/piano/assurance-piano)
   - [Déménageurs spécialisés piano à [Ville]](/blog/piano/demenageurs-specialises)
   - [Délais et planning déménagement piano](/blog/piano/delais-planning)
   - [Pianos anciens et de collection : précautions](/blog/piano/pianos-anciens)
   - [FAQ : Toutes vos questions sur le déménagement piano](/blog/piano/faq-piano)
   ```

2. **Liens contextuels dans le corps** (3-5 liens)
   ```markdown
   Le [prix d'un déménagement de piano](/blog/piano/prix-piano) varie selon 
   plusieurs facteurs, notamment le type d'instrument. Pour un [piano à queue](/blog/piano/transport-piano-queue), 
   il faudra prévoir un budget plus important...
   ```

3. **Section "Pour aller plus loin"** (bas de page)
   ```markdown
   ## 📖 Approfondissez le Sujet
   
   **Prix et Budget :**
   - [Prix déménagement piano [Ville] : guide complet](/blog/piano/prix-piano)
   - [Assurance piano : coûts et garanties](/blog/piano/assurance-piano)
   
   **Aspects Techniques :**
   - [Emballage professionnel d'un piano](/blog/piano/emballage-piano)
   - [Monte-meuble piano : fonctionnement](/blog/piano/monte-meuble-piano)
   
   **Choix du Prestataire :**
   - [Trouver un déménageur spécialisé piano](/blog/piano/demenageurs-specialises)
   ```

**Total liens pilier → satellites :** 10-15 liens (tous les satellites couverts)

---

### Règle 2 : Satellites → Pilier (Liens Ascendants)

**Principe :** Chaque satellite DOIT linker vers son pilier parent (2-3 fois)

#### Implémentation

**Dans chaque article satellite :**

1. **Lien dans l'introduction** (contextuel)
   ```markdown
   Le déménagement de piano à [Ville] nécessite une expertise particulière. 
   Pour comprendre tous les aspects de ce type de déménagement, consultez notre 
   [guide complet du déménagement piano à [Ville]](/blog/piano/demenagement-piano-ville).
   
   Dans cet article, nous allons détailler spécifiquement...
   ```

2. **Lien dans le corps** (ancre variée)
   ```markdown
   Ces techniques font partie intégrante d'un [déménagement de piano professionnel 
   à [Ville]](/blog/piano/demenagement-piano-ville), comme nous l'expliquons 
   dans notre dossier complet.
   ```

3. **Lien dans la conclusion** (CTA naturel)
   ```markdown
   ## Conclusion
   
   [Ancre variée liée au contexte]. Pour découvrir tous nos conseils d'experts 
   et obtenir un devis personnalisé, consultez notre [guide complet du déménagement 
   piano à [Ville]](/blog/piano/demenagement-piano-ville).
   ```

**Total liens satellite → pilier :** 2-3 liens (ancres variées)

---

### Règle 3 : Satellites ↔ Satellites (Liens Horizontaux)

**Principe :** Les satellites du même pilier se linkent entre eux **SI pertinence thématique forte**

#### Quand créer un lien satellite → satellite ?

**✅ Créer un lien SI :**
- Les 2 sujets sont **complémentaires** (ex: "Prix piano" ↔ "Assurance piano")
- L'article A **mentionne naturellement** un concept détaillé dans article B
- Cela **aide vraiment** le lecteur à approfondir

**❌ NE PAS créer de lien SI :**
- Lien forcé juste "pour faire du maillage"
- Sujets trop éloignés (ex: "Emballage piano" ↔ "FAQ piano")
- Risque de cannibalisation des mots-clés

#### Implémentation

**Exemple dans satellite "Prix Piano" :**

```markdown
Le coût inclut généralement [l'assurance spécifique pour piano](/blog/piano/assurance-piano), 
qui est fortement recommandée pour les instruments de valeur. Si votre appartement 
se trouve en étage élevé sans ascenseur, il faudra prévoir un [monte-meuble 
spécialisé](/blog/piano/monte-meuble-piano), ce qui représente un surcoût de 200-400€.
```

**Total liens satellite → satellites :** 1-2 liens (maximum, si pertinent)

---

### Règle 4 : Page Ville → Piliers (Liens Stratégiques)

**Principe :** La page d'accueil/catégorie de la ville linke vers les 10 piliers

#### Implémentation

**Dans la page `/` ou `/demenagement-[ville]` :**

```markdown
## 📚 Nos Guides Experts par Type de Déménagement

### Déménagements Spécialisés

- [Déménagement Piano [Ville] : Guide Expert](/blog/piano/demenagement-piano-ville)
  Tout savoir sur le transport sécurisé de votre piano. Prix, techniques, déménageurs spécialisés.

- [Déménagement Entreprise [Ville] : Solutions Pro](/blog/entreprise/demenagement-entreprise-ville)
  Transfert de bureaux, locaux commerciaux, matériel IT. Planification et exécution.

### Solutions de Stockage

- [Garde-Meuble [Ville] : Guide Complet 2025](/blog/garde-meuble/garde-meuble-ville)
  Self-stockage, box sécurisés, tarifs. Toutes les solutions de stockage à [Ville].

[etc. pour les 10 piliers]
```

**Total liens page ville → piliers :** 10 liens (tous les piliers)

---

### Règle 5 : Liens Transversaux Entre Piliers

**Principe :** Les piliers peuvent se linker entre eux **SI forte complémentarité**

#### Exemples de liens pertinents entre piliers

**Pilier "Déménagement Piano" → autres piliers :**
- Lien vers **"Déménageur [Ville]"** : "Pour déménager un piano, choisissez un [déménageur professionnel spécialisé](/blog/demenageur/demenageur-ville)"
- Lien vers **"Prix Déménagement [Ville]"** : "Consultez notre [guide des prix déménagement à [Ville]](/blog/prix/prix-demenagement-ville) pour comprendre les tarifs"

**Pilier "Garde-Meuble [Ville]" → autres piliers :**
- Lien vers **"Déménagement International"** : "En cas de [déménagement international](/blog/international/demenagement-international-ville), le garde-meuble peut être nécessaire"
- Lien vers **"Déménagement Entreprise"** : "Les [entreprises en déménagement](/blog/entreprise/demenagement-entreprise-ville) utilisent souvent le garde-meuble"

**Total liens pilier → autres piliers :** 2-4 liens (maximum)

---

## 📊 Récapitulatif des Ratios de Liens

### Par Type de Page

| Type de Page | Liens VERS (outbound) | Liens DEPUIS (inbound) | Ratio |
|--------------|----------------------|------------------------|-------|
| **Page Ville** | 10 liens (vers piliers) | Nombreux (tous piliers + satellites) | Hub central |
| **Article Pilier** | 10-15 liens (vers ses satellites) + 2-4 (vers autres piliers) | 10-30 liens (ses satellites + page ville) | Autorité forte |
| **Article Satellite** | 2-3 liens (vers pilier) + 1-2 (vers satellites) | 1-3 liens (pilier + éventuels satellites) | Autorité ciblée |

### Exemple Concret : Pilier "Déménagement Piano Lyon"

**Liens SORTANTS du pilier (15 au total) :**
- 10 liens → ses satellites (prix, emballage, transport, etc.)
- 2 liens → piliers connexes (Déménageur Lyon, Prix Déménagement Lyon)
- 3 liens → page ville + services

**Liens ENTRANTS vers le pilier (25 au total) :**
- 1 lien ← page ville (homepage)
- 10 liens ← ses satellites (chacun link 2-3x mais ancres variées)
- 5 liens ← piliers connexes (Déménageur, Entreprise, etc.)
- 9 liens ← autres satellites connexes (garde-meuble piano, assurance spéciale, etc.)

**→ Ratio : 15 sortants / 25 entrants = Fort signal d'autorité topique**

---

## 🎨 Optimisation des Ancres de Liens

### Règles d'Or des Ancres

1. **Varier les ancres** : NE JAMAIS répéter la même ancre exacte
2. **Naturelles** : Intégrer dans une phrase fluide
3. **Descriptives** : Donner envie de cliquer
4. **Mot-clé inclus** : Mais pas ancre exacte SEO agressive

### Types d'Ancres à Alterner

#### ❌ Ancre Exacte SEO (à ÉVITER)

```markdown
Consultez notre [déménagement piano Lyon](/blog/piano/demenagement-piano-lyon)
```
**Problème :** Trop robotique, suroptimisé, Google peut pénaliser

#### ✅ Ancre Longue Naturelle (PRIVILÉGIER)

```markdown
Pour en savoir plus, consultez notre [guide complet du déménagement de piano à Lyon](/blog/piano/demenagement-piano-lyon)
```

#### ✅ Ancre Contextuelle (EXCELLENT)

```markdown
Ces techniques font partie des [bonnes pratiques de déménagement de piano dans la région lyonnaise](/blog/piano/demenagement-piano-lyon)
```

#### ✅ Ancre Question (ENGAGE)

```markdown
Vous vous demandez [comment déménager un piano à Lyon en toute sécurité](/blog/piano/demenagement-piano-lyon) ?
```

#### ✅ Ancre Bénéfice (INCITATIF)

```markdown
Découvrez [tous nos conseils d'experts pour un déménagement piano réussi à Lyon](/blog/piano/demenagement-piano-lyon)
```

### Distribution des Ancres (Exemple satellite → pilier, 3 liens)

**Lien 1 (intro) :** Ancre longue descriptive  
**Lien 2 (corps) :** Ancre contextuelle  
**Lien 3 (conclusion) :** Ancre bénéfice + CTA

---

## 🚀 Stratégies Avancées

### 1. Liens "Breadcrumb" (Fil d'Ariane)

**Ajouter dans CHAQUE article :**

```markdown
[Accueil](/]) > [Déménagement [Ville]](/demenagement-ville) > [Déménagement Piano](/blog/piano/demenagement-piano-ville) > Prix Piano
```

**Avantage :**
- Navigation claire
- Boost SEO (données structurées)
- Renforce architecture du cocon

### 2. Section "Articles Connexes" Automatique

**En fin de chaque satellite, suggérer 3-4 satellites connexes :**

```markdown
## 📖 Articles Connexes

**Dans ce dossier :**
- [Titre satellite 1](/url1) - Description courte
- [Titre satellite 2](/url2) - Description courte
- [Titre satellite 3](/url3) - Description courte

**Voir aussi :**
- [Pilier connexe](/url-pilier) - Description
```

### 3. Maillage Contextuel Profond

**Principe :** Linker au moment EXACT où le sujet est mentionné

**❌ Mauvais (fin d'article générique) :**
```markdown
Voir aussi : déménagement entreprise, garde-meuble, prix déménagement
```

**✅ Bon (contexte immédiat) :**
```markdown
Si vous déménagez un piano dans le cadre d'un [déménagement d'entreprise à Lyon](/blog/entreprise/demenagement-entreprise-lyon), comme un conservatoire ou une salle de concert...
```

### 4. Éviter la Cannibalisation

**Problème :** Plusieurs articles ciblent le même mot-clé

**Solution :** Angles différents + maillage clair

**Exemple avec "prix déménagement piano lyon" :**

- **Article Pilier** : Survol complet (liens vers tous satellites)
- **Satellite "Prix Piano"** : Focus 100% tarifs détaillés (link vers pilier pour contexte global)
- **Satellite "Assurance Piano"** : Mentionne le prix assurance (link vers satellite "Prix" pour budget complet)

**→ Chacun a son angle, pas de compétition interne**

---

## ✅ Checklist Maillage Interne

### Pour Chaque Article Pilier

- [ ] Linke vers TOUS ses satellites (10 liens minimum)
- [ ] Section "Sommaire" ou "Dans ce dossier" en haut
- [ ] 3-5 liens contextuels dans le corps
- [ ] Section "Pour aller plus loin" en bas
- [ ] 2-4 liens vers piliers connexes (si pertinent)
- [ ] Breadcrumb présent
- [ ] Ancres variées (pas répétitives)

### Pour Chaque Article Satellite

- [ ] 2-3 liens vers son pilier parent
- [ ] Ancres variées pour chaque lien pilier
- [ ] 1-2 liens vers satellites connexes (si très pertinent)
- [ ] Breadcrumb présent
- [ ] Section "Articles connexes" en fin (3-4 suggestions)
- [ ] Aucun lien forcé ou non naturel

### Pour la Page Ville

- [ ] Linke vers les 10 piliers
- [ ] Descriptions courtes et incitatives
- [ ] Hiérarchie visuelle claire (H2/H3)
- [ ] CTAs vers piliers prioritaires

---

## 📈 Monitoring du Maillage

### KPIs à Suivre

1. **Taux de clics internes** : % visiteurs qui cliquent sur liens internes
   - Cible : > 40%

2. **Profondeur de visite** : Nombre de pages vues par session
   - Cible : > 3 pages

3. **Temps sur site** : Durée moyenne session
   - Cible : > 5 minutes

4. **Taux de rebond** : % visiteurs quittant après 1 page
   - Cible : < 50%

5. **Pages/session piliers vs satellites**
   - Pilier doit générer + de clics vers satellites

### Outils de Monitoring

**Google Analytics 4 :**
- Événements de clic sur liens internes
- Flux de comportement
- Pages de destination secondaires

**Google Search Console :**
- Liens internes par page
- Distribution PageRank interne

**Screaming Frog (audit) :**
- Cartographie complète des liens
- Détection liens cassés
- Profondeur de crawl

---

## 🛠️ Implémentation Technique

### Dans les Briefs Satellites

**Chaque brief doit inclure :**

```markdown
## 🔗 Stratégie de Maillage Interne

### Liens vers le Pilier Parent (2-3 liens)

**Lien 1 :**
- **Position :** Introduction, paragraphe 2
- **Ancre :** "guide complet du déménagement de piano à Lyon"
- **Contexte :** "Pour comprendre tous les aspects techniques, consultez notre [guide complet du déménagement de piano à Lyon](/blog/piano/demenagement-piano-lyon)."

**Lien 2 :**
- **Position :** Section 3, paragraphe 4
- **Ancre :** "déménagement de piano professionnel à Lyon"
- **Contexte :** "Ces précautions sont essentielles dans le cadre d'un [déménagement de piano professionnel à Lyon](/blog/piano/demenagement-piano-lyon)."

**Lien 3 :**
- **Position :** Conclusion
- **Ancre :** "tous nos conseils d'experts piano à Lyon"
- **Contexte :** "Pour [tous nos conseils d'experts piano à Lyon](/blog/piano/demenagement-piano-lyon), découvrez notre dossier complet."

### Liens vers Satellites Connexes (1-2 liens)

**Lien 1 :**
- **Satellite cible :** "Assurance Déménagement Piano"
- **Position :** Section 2, paragraphe 3
- **Ancre :** "assurance spécifique pour piano"
- **Contexte :** "Pensez à souscrire une [assurance spécifique pour piano](/blog/piano/assurance-piano), qui couvre les dommages éventuels."
```

### Dans le Prompt de Génération

**Ajouter cette instruction :**

```markdown
MAILLAGE INTERNE (CRITIQUE) :

Tu DOIS intégrer EXACTEMENT les liens spécifiés dans le brief :
- Position précise indiquée
- Ancre exacte fournie
- Contexte de phrase suggéré

Format Markdown :
[ancre exacte](/url-exact)

Intègre ces liens NATURELLEMENT dans le récit.
NE PAS ajouter d'autres liens internes non spécifiés dans le brief.
```

---

## 🎯 Objectif Final par Cocon

**Pour chaque pilier + 10 satellites (11 articles) :**

✅ **150-200 liens internes** dans le cocon
✅ **Tous interconnectés** de façon logique
✅ **Pilier = hub central** (max liens entrants)
✅ **Satellites = expertise ciblée** (link fort vers pilier)
✅ **User experience fluide** (navigation intuitive)
✅ **Signal SEO puissant** (autorité topique maximale)

**Résultat attendu :**

🥇 **Position #1** sur requête pilier  
🥇 **Top 3** sur la majorité des requêtes satellites  
🥇 **Domination totale** du topic dans la ville

---

## 📋 Template de Rapport Maillage

**À produire après implémentation d'un cocon complet :**

```markdown
# Rapport Maillage Interne - [Pilier] [Ville]

**Date :** [Date]
**Articles :** 1 pilier + 10 satellites = 11 pages

---

## Statistiques Globales

- **Total liens internes cocon :** XXX liens
- **Liens pilier → satellites :** XX liens
- **Liens satellites → pilier :** XX liens
- **Liens satellites ↔ satellites :** XX liens
- **Liens depuis page ville :** 1 lien
- **Liens depuis autres piliers :** X liens

---

## Répartition par Article

### Pilier : [Titre]

**Liens sortants (XX) :**
- 10 liens → satellites
- X liens → piliers connexes
- X liens → page ville

**Liens entrants (XX) :**
- 1 lien ← page ville
- XX liens ← satellites
- X liens ← piliers connexes

### Satellites (10)

| Satellite | Liens → Pilier | Liens → Satellites | Liens Entrants |
|-----------|----------------|--------------------|----------------|
| Sat 1 | 3 | 2 | 3 |
| Sat 2 | 2 | 1 | 2 |
| ... | ... | ... | ... |

---

## Qualité des Ancres

- **Ancres variées :** ✅ Oui / ❌ Répétitions détectées
- **Ancres naturelles :** ✅ Fluides / ⚠️ Quelques forcées
- **Ancres descriptives :** ✅ Oui / ❌ Trop génériques

---

## Actions Correctives

- [ ] Ajouter 2 liens manquants dans satellite X
- [ ] Varier ancres répétitives dans satellite Y
- [ ] Ajouter section "Articles connexes" satellites 3, 5, 7

---

## Validation

- [ ] Tous les satellites linkent vers pilier (2-3×)
- [ ] Pilier linke vers tous les satellites
- [ ] Breadcrumbs présents partout
- [ ] Aucun lien cassé détecté
- [ ] Maillage cohérent et naturel

✅ **Cocon validé** / ⚠️ **Corrections nécessaires** / ❌ **À revoir**
```

---

## 🚀 Conclusion

Le maillage interne n'est **pas un détail technique**, c'est **LA CLÉ** de votre stratégie SEO cocon sémantique.

**Un bon maillage :**
✅ Renforce l'autorité topique  
✅ Facilite l'indexation  
✅ Améliore l'expérience utilisateur  
✅ Boost les positions Google  
✅ Augmente le trafic organique  

**Un mauvais maillage :**
❌ Cannibalisation entre articles  
❌ Autorité diluée  
❌ Pages "orphelines" non crawlées  
❌ Positions médiocres  
❌ Trafic faible  

**→ Investissez le temps nécessaire pour bien faire dès le départ !**

---

**Document créé par :** Direction SEO Moverz  
**Version :** 1.0  
**Date :** 13 octobre 2025  
**À intégrer dans :** Chaque brief satellite + validation finale

