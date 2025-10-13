# 📘 DOCUMENT MAITRE - Production Satellites (Autonome)

**Version :** 2.0 - Production Autonome  
**Date :** 13 octobre 2025  
**Usage :** Document central à charger dans un chat Cursor pour production complète d'une ville

---

## 🎯 Objectif de ce Document

**Ce document contient TOUT ce qu'un chat Cursor doit savoir pour produire les 100 articles satellites d'une ville de manière autonome.**

**Workflow autonome :**
```
VOUS (Utilisateur) :
  ├─ Ouvrir 3 chats Cursor simultanés
  ├─ Chat 1 : "Lis DOCUMENT-MAITRE-PRODUCTION-SATELLITES.md, tu t'occupes de Lyon"
  ├─ Chat 2 : "Lis DOCUMENT-MAITRE-PRODUCTION-SATELLITES.md, tu t'occupes de Marseille"
  └─ Chat 3 : "Lis DOCUMENT-MAITRE-PRODUCTION-SATELLITES.md, tu t'occupes de Montpellier"

CURSOR (chaque chat) :
  ├─ Phase 0 : Deep Search Locale ville assignée (1 jour)
  ├─ Phase 1 : Création briefs satellites (pilier par pilier)
  ├─ Phase 2 : Génération articles satellites
  ├─ Phase 3 : Auto-validation + corrections
  └─ Livraison : 100 satellites validés

RÉSULTAT :
  └─ 3 villes complètes (300 satellites) en 2-3 mois au lieu de 6-9 mois
```

---

## 📚 Table des Matières

### PARTIE 1 : CONTEXTE & STRATÉGIE
1.1 Vision d'ensemble  
1.2 Votre avantage concurrentiel (localisation)  
1.3 Architecture des cocons sémantiques  
1.4 Les 3 piliers de la stratégie (Local + Maillage + FAQ)

### PARTIE 2 : RESSOURCES DISPONIBLES
2.1 Fichiers CSV et briefs piliers  
2.2 Articles de référence (Toulouse/Bordeaux)  
2.3 Structure des dossiers  

### PARTIE 3 : PHASE 0 - DEEP SEARCH LOCALE (1 jour)
3.1 Objectif et timing  
3.2 7 sources de recherche détaillées  
3.3 Template fiche locale complète  
3.4 Checklist validation fiche  

### PARTIE 4 : PHASE 1 - CRÉATION BRIEFS SATELLITES (par pilier)
4.1 Sélection des 10 sous-requêtes  
4.2 Deep search spécifique par satellite  
4.3 Template brief satellite complet  
4.4 Stratégie maillage interne  
4.5 Stratégie FAQ  
4.6 Checklist validation brief  

### PARTIE 5 : PHASE 2 - GÉNÉRATION ARTICLES
5.1 Prompt de génération  
5.2 Contraintes absolues  
5.3 Format de sortie  
5.4 Prompts d'ajustement  

### PARTIE 6 : PHASE 3 - AUTO-VALIDATION
6.1 Checklist validation complète  
6.2 Critères de qualité  
6.3 Corrections types  

### PARTIE 7 : WORKFLOW COMPLET ÉTAPE PAR ÉTAPE
7.1 Jour par jour pour 1 pilier  
7.2 Planning 10 piliers (100 satellites)  
7.3 Livrables attendus  

---

# PARTIE 1 : CONTEXTE & STRATÉGIE

## 1.1 Vision d'Ensemble

**Mission :** Produire 100 articles satellites pour la ville assignée

**Composition :**
- 10 piliers (déjà publiés)
- 10 satellites par pilier
- = 100 satellites à créer

**Délai cible :** 8-12 semaines par ville

**Standard qualité :**
- Note lecture humaine : ≥ 8/10
- Données 100% sourcées (ZÉRO invention)
- Contenu hyper-local (ville, quartiers, acteurs)
- SEO optimisé (mots-clés CSV, maillage, FAQ)

---

## 1.2 Votre Avantage Concurrentiel

### Stratégie Multi-Sites (1 site par ville)

**Concurrence nationale :**
- 1 site pour toute la France
- Contenu générique : "à Paris, Lyon, Marseille..."
- Aucune expertise locale réelle

**Vous :**
- 1 site dédié par ville
- Contenu 100% local : quartiers, prix, acteurs vérifiés
- **Google favorise le local pour recherches locales**
- **Position #1 sur requêtes locales**

**RÈGLE D'OR :**
> Si un paragraphe peut être copié-collé dans un autre site ville → ÉCHOUÉ
> Chaque article doit être 100% unique à la ville

---

## 1.3 Architecture des Cocons Sémantiques

### Structure par Ville

```
                    [Page Ville]
                  Déménagement [Ville]
                         |
        +----------------+----------------+
        |                                 |
    [PILIER 1]                      [PILIER 10]
    Garde-Meuble                    Entreprise
         |                               |
    +----+----+                     +----+----+
    |    |    |                     |    |    |
  SAT1 SAT2 SAT10                 SAT1 SAT2 SAT10
  Prix Types Durée                Prix Étapes Planning
```

**Total :** 1 + 10 + 100 = 111 pages interconnectées

---

## 1.4 Les 3 Piliers de la Stratégie

### Pilier 1 : 📍 LOCALISATION (différenciation)

**Chaque article DOIT contenir :**
- 3-5 quartiers nommés précisément
- 2-3 acteurs locaux cités (déménageurs, garde-meubles)
- 3-5 prix locaux avec sources
- 1-2 contraintes locales spécifiques
- 1+ citation vérifiable (avis, témoignage)

### Pilier 2 : 🔗 MAILLAGE INTERNE (autorité topique)

**Chaque satellite DOIT contenir :**
- 2-3 liens vers pilier parent (ancres variées)
- 1-2 liens vers satellites connexes (si pertinent)
- Breadcrumb
- Section "Articles connexes"

**Résultat :** 150-200 liens par cocon → signal Google FORT

### Pilier 3 : ❓ FAQ (featured snippets)

**Chaque satellite DOIT contenir :**
- 5-7 questions ultra-précises
- Réponses 50-100 mots optimisées snippet
- 2+ questions avec [Ville]
- 2+ questions prix/chiffres
- Format structured data

**Résultat :** 600 FAQ/ville → 180+ featured snippets

---

# PARTIE 2 : RESSOURCES DISPONIBLES

## 2.1 Fichiers CSV et Briefs Piliers

### CSV Expert

**Fichier :** `SEO Guidelines - Feuille 1.csv` (racine projet)

**Contenu :** 90 briefs piliers (9 villes × 10)

**Structure :**
- Colonne 1 : Ville
- Colonne 2 : Requêtes piliers
- Colonne 3 : Volume recherche
- Colonne 4 : Brief SEO complet
- Colonne 5 : **40-50 mots sémantiques** ← CRUCIAL !

**Extraction mots-clés CSV par pilier :**

Tu DOIS extraire les mots sémantiques de la colonne 5 pour chaque pilier de ta ville.

**Exemple pour "Garde-Meuble Lyon" :**
```
Mots CSV pilier : garde, meuble, stockage, box, self-stockage, 
entreposage, sécurisé, mois, tarif, location, volume, affaires, 
temporaire, longue durée, déménagement, particulier, entreprise, 
accès, surveillance, assurance, cartons, meubles, protection, 
climat, température, humidité, inventaire, contrat, flexible, 
caution, m², m³, lyon, lyonnais, quartiers, arrondissement, 
villeurbanne, part-dieu, confluence, etc.
```

**USAGE OBLIGATOIRE :** Ces mots doivent apparaître naturellement dans CHAQUE satellite du pilier.

---

### Briefs Piliers Extraits

**Localisation :** `seo-briefs/[ville]/[01-10]-[pilier].md`

**Contenu de chaque brief pilier :**
- Requêtes cibles
- Volume recherche
- Brief SEO expert détaillé
- Structure H1/H2/H3
- Mots sémantiques (40-50)
- Instructions rédaction

**Tu DOIS lire les 10 briefs piliers de ta ville avant de commencer.**

---

## 2.2 Articles de Référence

### Toulouse (93 satellites existants)

**Localisation :** `sites/toulouse/content/blog/satellites/`

**Usage :**
- ✅ Référence de structure
- ✅ Référence de qualité narrative
- ✅ Exemples de FAQ
- ❌ NE PAS copier le contenu
- ❌ NE PAS copier les données Toulouse

**À analyser :** Voir comment Toulouse a traité certains sujets pour s'inspirer de la structure.

---

## 2.3 Structure des Dossiers

**Où sauvegarder tes productions :**

```
seo-briefs/
└── [ville]/
    ├── piliers/
    │   └── [briefs piliers CSV déjà existants]
    ├── satellites/
    │   ├── garde-meuble/
    │   │   ├── brief-satellite-01-[titre].md
    │   │   ├── brief-satellite-02-[titre].md
    │   │   └── ... (10 briefs)
    │   ├── demenageur/
    │   └── ... (10 piliers)
    └── fiche-locale-[ville].md ← CRÉER EN PREMIER

sites/
└── [ville]/
    └── content/
        └── blog/
            ├── piliers/
            │   └── [articles piliers déjà publiés]
            └── satellites/
                ├── [article-satellite-01].md
                ├── [article-satellite-02].md
                └── ... (100 satellites)
```

---

# PARTIE 3 : PHASE 0 - DEEP SEARCH LOCALE

## 3.1 Objectif et Timing

**⚠️ À FAIRE EN PREMIER - OBLIGATOIRE**

**Objectif :** Collecter TOUTES les données locales vérifiables de la ville

**Timing :** 1 journée (6-8h de recherche)

**Pourquoi c'est critique :**
- Sans données locales = articles génériques = ÉCHEC
- 1 jour investi = données pour 100 articles
- ROI maximal

**Livrable :** `seo-briefs/[ville]/fiche-locale-[ville].md`

---

## 3.2 Les 7 Sources de Recherche

### Source 1 : Google Maps (30-40 min)

**Recherches à effectuer :**

**A. Déménageurs locaux (20 min)**

```
Recherche : "déménageur [ville]"
Filtres : Note ≥ 4.0 étoiles

Pour chaque déménageur (TOP 20) :
  ├─ Nom exact
  ├─ Adresse complète
  ├─ Note : X.X/5 (XXX avis)
  ├─ Quartier
  ├─ Téléphone
  └─ Site web (si visible)

Format de sauvegarde :
| Nom | Quartier | Note | Avis | Site |
|-----|----------|------|------|------|
| [Nom 1] | [Q] | 4.8/5 | 215 | [URL] |
| [Nom 2] | [Q] | 4.6/5 | 187 | [URL] |
```

**B. Garde-meubles (10 min)**

```
Recherches :
  - "garde meuble [ville]"
  - "self stockage [ville]"
  - "box stockage [ville]"

Noter TOP 10 :
  ├─ Nom (Homebox, Une Pièce en Plus, acteurs locaux)
  ├─ Quartier/adresse
  ├─ Type (self-stockage / traditionnel)
  └─ Prix si affichés (rares sur Maps)
```

**C. Location véhicules (5 min)**

```
Recherche : "location utilitaire [ville]"

Noter agences présentes :
  - Europcar : [adresses]
  - Sixt : [adresses]
  - Hertz : [adresses]
  - Leclerc : [si présent]
  - Acteurs locaux : [liste]
```

**D. Quartiers (5 min)**

```
Action :
  1. Zoomer sur centre-ville
  2. Noter TOUS les noms de quartiers affichés
  3. Classer par type :
     - Centre historique : [liste]
     - Résidentiel : [liste]
     - Affaires : [liste]
     - Étudiant : [liste]
     - Périphérique : [liste]

Objectif : 15-20 quartiers minimum
```

---

### Source 2 : Sites Municipaux (20-30 min)

**Sites à consulter :**
- `[ville].fr` (site mairie officiel)
- Wikipedia article ville
- Site métropole si applicable

**A. Données démographiques**

```markdown
## Données [Ville]

**Démographie (sources : Wikipedia + site mairie) :**
- Population commune : XXX XXX habitants ([année])
- Population métropole : XXX XXX habitants
- Nombre de communes métropole : [X]
- Étudiants : XX XXX ([source université])
- Taux croissance : +X%/an

**Géographie :**
- Superficie : XX km²
- Arrondissements : [X] (si applicable)
- Altitude : XXm

**Transport :**
- Métro : [X] lignes, [X] stations (ou "Pas de métro")
- Tramway : [X] lignes, [X] km
- Bus : [X] lignes
- Gare(s) : [Nom(s)], [XXk voyageurs/an]
- Aéroport : [Nom], [distance du centre], [XXM passagers/an]

**Autoroutes/Routes :**
- [AX] : [ville] → [destination] ([XXkm])
- [AX] : [ville] → [destination]
```

**B. Quartiers officiels**

```markdown
## Quartiers Officiels [Ville]

**Source :** [ville].fr/quartiers ou Wikipedia

### Centre Historique
- **[Quartier 1]** : [description courte], [particularité déménagement]
- **[Quartier 2]** : [description], [contraintes accès]

### Quartiers Résidentiels
- **[Quartier 3]** : [population], [type logements]
- **[Quartier 4]** : [description]

### Quartiers d'Affaires
- **[Quartier 5]** : [entreprises], [bureaux]

### Quartiers Étudiants
- **[Quartier 6]** : [universités proches], [nb étudiants]

### Quartiers Périphériques
- **[Quartier 7-15]** : [liste]

**Total documenté :** 15-20 quartiers minimum
```

**C. Contraintes urbaines**

```markdown
## Contraintes Urbaines [Ville]

**Accès difficiles :**
- Centre historique : [noms quartiers]
  - Rues étroites : largeur moyenne [X]m
  - Rues pavées : [liste zones]
  - Stationnement : [réglementations]

**Zones piétonnes :**
- [Zone 1] : horaires accès véhicules
- [Zone 2] : autorisations nécessaires

**Stationnement réglementé :**
- Quartiers zone bleue : [liste]
- Quartiers residents : [liste]

**Autorisations déménagement :**
- Nécessaire dans : [quartiers]
- Démarche : [site mairie ou contact]
- Délai : [X] jours ouvrés
- Coût : [gratuit / XX€]
- Contact : [URL/tel/email]
```

---

### Source 3 : Sites Déménageurs Locaux (40-50 min)

**Objectif CRITIQUE :** Prix locaux réels vérifiés

**Process :**

1. Sélectionner 5-10 déménageurs identifiés sur Maps
2. Visiter leurs sites web
3. Chercher pages "Tarifs", "Prix", "Devis", "Exemples"
4. Capturer TOUS les chiffres visibles

**Template de collecte :**

```markdown
## Prix Déménageurs [Ville]

**Source 1 : [Nom Déménageur]**
- Site : [URL exacte de la page tarifs]
- Consulté le : [date exacte]

**Tarifs affichés :**
- Studio/T1 : XXX€ (ou XXX-XXX€)
- T2 : XXX€ (ou XXX-XXX€)
- T3 : XXX€ (ou XXX-XXX€)
- Maison : XXX€ (ou XXX-XXX€)

**Services additionnels :**
- Emballage : +XXX€ ou inclus
- Monte-meuble : +XXX€
- Étage sans ascenseur : +XX€/étage
- Cartons : XX€/pack

---

**Source 2 : [Nom Déménageur 2]**
[Même structure]

---

**Source 3 : [Comparateur ou 3ème déménageur]**
[Même structure]

---

**FOURCHETTES CONSOLIDÉES [VILLE] :**

**Studio/T1 (15-20m³) :**
- Min observé : XXX€ ([source])
- Max observé : XXX€ ([source])
- Moyenne calculée : XXX€
- Nombre de sources : [X]

**T2/T3 (30-40m³) :**
- Min : XXX€
- Max : XXX€
- Moyenne : XXX€
- Sources : [X]

**Maison (60-80m³) :**
- Min : XXX€
- Max : XXX€
- Moyenne : XXX€
- Sources : [X]

**Cas d'usage concrets :**

**Exemple 1 :**
- Type : T2 [Quartier A] → [Quartier B]
- Distance : Xkm
- Étage : 3ème sans ascenseur
- Prix : XXX€
- Source : Avis Google [Déménageur], [date]

**Exemple 2 :**
[Même structure]
```

**⚠️ CRITIQUE : Minimum 3 sources différentes par catégorie de prix**

---

### Source 4 : Garde-Meubles & Self-Stockage (30 min)

**Process :**

1. Identifier acteurs (Google Maps)
2. Visiter leurs sites web
3. Chercher grilles tarifaires

**Acteurs à vérifier :**
- Homebox (présent dans grandes villes)
- Une Pièce en Plus
- Shurgard (grandes villes)
- Lok'n Store
- Acteurs 100% locaux

**Template de collecte :**

```markdown
## Prix Stockage [Ville]

### Self-Stockage (Box Individuels)

**[Acteur 1] - [Adresse/Quartier]**
- Site : [URL page tarifs]
- Consulté le : [date]

**Tarifs affichés :**
| Taille | m² | Prix/mois | Prix/m² |
|--------|----|-----------|---------| 
| XS | 1m² | XX€ | XX€ |
| S | 3m² | XX€ | XX€ |
| M | 5m² | XX€ | XX€ |
| L | 10m² | XX€ | XX€ |
| XL | 15m² | XX€ | XX€ |

**Services inclus :**
- Accès : [24/7 / horaires]
- Sécurité : [surveillance, alarme, contrôle accès]
- Assurance : [incluse / optionnelle XX€]

---

**[Acteur 2] - [Quartier]**
[Même structure]

---

**FOURCHETTES [VILLE] :**

**Self-stockage :**
- 1m² : XX-XX€/mois
- 5m² : XX-XX€/mois
- 10m² : XX-XX€/mois
- Moyenne : XX€/m²/mois

**Garde-meuble traditionnel :**
- Prix moyen : XX€/m³/mois
- Minimum volume : Xm³

**Quartiers les moins chers :**
- [Quartier périphérique 1] : -15-20% vs centre
- [Quartier 2] : données si disponibles

**Quartiers les plus chers :**
- [Centre/quartier affaires] : +20-30% vs moyenne
```

---

### Source 5 : Location de Camions (20 min)

**Template de collecte :**

```markdown
## Location Véhicules [Ville]

### Agences par Quartier

**Europcar [Ville] :**
- Agence 1 : [Adresse quartier 1]
- Agence 2 : [Adresse quartier 2]
- Total : [X] agences

**Sixt [Ville] :**
- [Liste adresses]

**Hertz, Leclerc, autres :**
- [Liste]

### Tarifs Types

**Recherche :** Sites web agences + comparateurs

**12m³ (type Kangoo/Partner) :**
- Journée : XX-XX€
- Weekend (2j) : XX-XX€
- Semaine : XX-XX€
- Source : [Site agence, date]

**20m³ (type Master/Boxer) :**
- Journée : XX-XX€
- Weekend : XX-XX€
- Semaine : XX-XX€
- Source : [Site agence, date]

**35m³ (gros camion) :**
- Journée : XX-XX€
- Source : [Site agence, date]

**Fourchette [Ville] :**
- Moyenne 20m³ jour : XX€
- Caution : XXX-XXX€
- Km inclus : XXX km
- Assurance : XX€/jour
```

---

### Source 6 : Forums & Avis (20 min)

**Objectif :** Problématiques locales + témoignages

**Sources :**
- Reddit : r/france, r/[ville] (si existe)
- Google Avis des déménageurs
- Trustpilot
- Facebook : groupes "[Ville] déménagement"
- Forums locaux ville

**Template de collecte :**

```markdown
## Problématiques Récurrentes [Ville]

**Méthode :** Analyse 30-50 avis Google + forums

**Stationnement (mentions : X) :**
- "Impossible stationner [Quartier X]" (8 mentions)
- "Amende pendant déménagement [Zone Y]" (5 mentions)
- "Autorisation refusée délai court" (3 mentions)

**Accès difficiles (mentions : X) :**
- "Rues trop étroites [Centre]" (12 mentions)
- "Monte-meuble obligatoire [Quartier]" (7 mentions)
- "Escaliers anciens sans ascenseur" (9 mentions)

**Prix (mentions : X) :**
- "Surpris surcoût [spécificité]" (6 mentions)
- "Plus cher que prévu" (contexte à détailler)

---

## Citations Vérifiables [Ville]

**Sur les prix :**

> "J'ai payé 850€ pour mon T2 de [Quartier A] à [Quartier B], 3ème étage sans ascenseur"
> — Avis Google [Déménageur X], [date exacte], [lien URL avis]

> "Devis à 1200€, facture finale 1450€ à cause du stationnement impossible [Centre]"
> — Trustpilot [Déménageur Y], [date], [lien]

[Minimum 5 citations avec prix/quartiers]

**Sur les contraintes :**

> "Les rues du [Quartier Historique] sont trop étroites, on a dû faire 50m à pied"
> — Avis Google [Déménageur Z], [date], [lien]

[Minimum 3 citations contraintes locales]
```

---

### Source 7 : Statistiques & Données Officielles (15 min)

**Sources :**
- INSEE : [ville]
- Observatoire logement métropole
- Sites universitaires (nb étudiants)

**Template :**

```markdown
## Statistiques Officielles [Ville]

**Logement (INSEE [année]) :**
- Total logements : XXX XXX
- Taux mobilité résidentielle : XX%/an
- Déménagements/an estimation : XX XXX

**Étudiants :**
- Total : XX XXX étudiants
- Source : [Université [Ville], année]
- Rentrée : [dates]
- Quartiers étudiants : [liste]

**Immobilier :**
- Prix moyen m² : XXX€
- Source : [MeilleursAgents / DVF, trimestre]
- Quartiers chers : [liste + prix]
- Quartiers abordables : [liste + prix]
```

---

## 3.3 Template Fiche Locale Complète

**Fichier à créer :** `seo-briefs/[ville]/fiche-locale-[ville].md`

**Utilise ce template exact :**

```markdown
# Fiche Locale Complète - [VILLE]

**Date création :** [Date]
**Dernière màj :** [Date]
**Statut :** ✅ Complète / ⚠️ À compléter

---

## 📍 DONNÉES URBAINES

[Copier résultats Source 2 - Sites Municipaux]

---

## 🏘️ QUARTIERS (15-20 minimum)

[Copier résultats Source 1D + Source 2B]

**Format par quartier :**

### [Quartier 1] - [Type : Centre/Résidentiel/Affaires/Étudiant]

**Caractéristiques :**
- Population : ~XX XXX hab (si dispo)
- Type logements : [Immeubles / Pavillons / Mixte]
- Caractère : [Historique / Moderne / Familial / Étudiant]

**Contraintes déménagement :**
- Accès : [Facile / Moyen / Difficile]
- Stationnement : [Facile / Réglementé / Très difficile]
- Particularités : [Rues étroites / Piéton / Escaliers / etc.]

**Spécificités :**
- [Détail unique à ce quartier utile pour déménagement]

---

[Répéter × 15-20 quartiers]

---

## 💼 ACTEURS LOCAUX

### Déménageurs (TOP 20)

[Copier résultats Source 1A - Tableau complet]

### Garde-Meubles (TOP 10)

[Copier résultats Source 1B + Source 4]

### Location Véhicules

[Copier résultats Source 1C + Source 5]

---

## 💰 PRIX LOCAUX VÉRIFIÉS

[Copier résultats Source 3 - Prix déménageurs complets]

[Copier résultats Source 4 - Prix stockage]

[Copier résultats Source 5 - Prix location]

**⚠️ RÈGLE ABSOLUE : Minimum 3 sources par catégorie de prix**

---

## 🚧 CONTRAINTES LOCALES

[Copier résultats Source 2C - Contraintes urbaines]

**Ajouts :** Contraintes identifiées dans avis (Source 6)

---

## 📅 SAISONNALITÉ

**Rentrée universitaire :**
- Dates : [fin août - début sept exact]
- Nb étudiants concernés : XX XXX
- Impact déménagement : +XX% demande
- Quartiers saturés : [liste quartiers étudiants]

**Fins de bail :**
- Pics : [fin mars, fin juin, fin septembre]
- Impact tarifs : +XX%

**Basse saison :**
- Période : [novembre-mars]
- Promotions : -10-15% possibles

---

## 💬 TÉMOIGNAGES & CITATIONS

[Copier résultats Source 6 - Citations vérifiables]

**Minimum requis :**
- 5 citations avec prix/quartiers
- 3 citations contraintes locales
- Toutes avec source URL + date

---

## 📊 STATISTIQUES

[Copier résultats Source 7 - Données officielles]

---

## 📚 SOURCES COMPLÈTES

**Données démographiques :**
- Wikipedia [Ville] : [URL], consulté le [date]
- Site mairie : [URL], consulté le [date]
- INSEE : [URL], consulté le [date]

**Acteurs locaux :**
- Google Maps : recherches effectuées le [date]
- Pages Jaunes : [URL], consulté le [date]

**Prix :**
- [Déménageur 1] : [URL], consulté le [date]
- [Déménageur 2] : [URL], consulté le [date]
- [Comparateur] : [URL], consulté le [date]
- [Garde-meuble 1] : [URL], consulté le [date]
- [Location 1] : [URL], consulté le [date]

**Forums/Avis :**
- Google Avis : analysés le [date]
- Reddit : analysé le [date]
- Trustpilot : analysé le [date]

---

## ✅ CHECKLIST COMPLÉTUDE

- [ ] 15+ quartiers documentés avec contraintes
- [ ] 20+ déménageurs identifiés (note, avis, adresse)
- [ ] 10+ garde-meubles référencés avec prix
- [ ] 10+ agences location véhicules
- [ ] Prix déménagement (3+ sources par catégorie)
- [ ] Prix stockage (2+ sources)
- [ ] Prix location (2+ sources)
- [ ] Contraintes locales documentées
- [ ] Autorisations mairie vérifiées (délai, coût, contact)
- [ ] 5+ citations prix vérifiables
- [ ] 3+ citations contraintes vérifiables
- [ ] Données démo/stats officielles
- [ ] Toutes sources URL + dates

**Statut :** ✅ 13/13 = Fiche complète

---

**Temps de création :** 6-8h
**Réutilisation :** 100 articles satellites
**ROI :** Maximal
```

---

## 3.4 Checklist Validation Fiche Locale

**Avant de passer à Phase 1, vérifie :**

- [ ] Fichier sauvegardé : `seo-briefs/[ville]/fiche-locale-[ville].md`
- [ ] 13/13 points checklist complétude OK
- [ ] Toutes les données sont datées
- [ ] Toutes les sources ont URL exactes
- [ ] Aucune donnée inventée ou approximative
- [ ] Quartiers vérifiés (noms exacts)
- [ ] Acteurs vérifiés (existent vraiment)
- [ ] Prix cohérents entre sources (pas d'aberrations)

**Si OK → Passer à Phase 1 (création briefs satellites)**

---

# PARTIE 4 : PHASE 1 - CRÉATION BRIEFS SATELLITES

## 4.1 Sélection des 10 Sous-Requêtes par Pilier

**Pour chaque des 10 piliers de la ville :**

### Process de Sélection

**Étape A : Deep Search Sous-Requêtes (30 min)**

1. **Google PAA (People Also Ask)**
   ```
   Recherche Google : "[pilier] [ville]"
   Ex : "garde meuble lyon"
   
   Action :
   - Noter toutes questions PAA
   - Cliquer sur chaque → nouvelles questions
   - Collecter 15-20 questions
   ```

2. **AlsoAsked.com** (si accès)
   ```
   Entrer : "[pilier] [ville]"
   Obtenir arbre questions
   Sélectionner 10-15 pertinentes
   ```

3. **Google Suggest**
   ```
   Taper : "[pilier] [ville]"
   Noter suggestions auto-complétion
   
   Taper : "[pilier] [ville] prix"
   Taper : "[pilier] [ville] comment"
   Taper : "[pilier] [ville] où"
   etc.
   
   Collecter 15-20 variantes
   ```

4. **Analyse Concurrents**
   ```
   Google : "[pilier] [ville]"
   Analyser Top 10 résultats
   Noter sous-sujets traités
   Identifier gaps (ce qu'ils ne traitent pas)
   ```

**Total collecté :** 30-50 sous-requêtes potentielles

---

**Étape B : Sélection Top 10 (20 min)**

**Critères de sélection :**

1. **Volume recherche** : Min 20/mois (ou forte pertinence stratégique)
2. **Intention claire** : Informationnelle ou transactionnelle
3. **Angle local** : Peut être localisé à [Ville]
4. **Complémentarité** : Couvre aspect unique du pilier
5. **Potentiel narratif** : Permet article riche 1200-1800 mots
6. **Mots-clés CSV** : 3-5 mots sémantiques pilier applicables
7. **Pas cannibalisation** : N'empiète pas sur pilier

**Équilibre thématique (parmi les 10) :**
- 2 satellites Prix/Tarifs
- 2-3 satellites Pratiques/Comment-faire
- 1-2 satellites Comparatifs/Choix
- 2-3 satellites Questions spécifiques
- 1-2 satellites Cas d'usage

**Validation :** Les 10 satellites couvrent-ils TOUS les aspects du pilier ?

---

## 4.2 Deep Search Spécifique par Satellite

**Pour chaque des 10 satellites sélectionnés :**

### Recherche de Données (20-30 min/satellite)

**1. Données chiffrées (minimum 5)**

```markdown
Satellite : [Titre]

## Données Chiffrées à Collecter

**Prix/Tarifs (2-3 données) :**
1. Prix moyen [service] [Ville] : XXX-XXX€
   - Source : [URL exacte]
   - Date : [date]

2. Tarif [spécifique] : XX€
   - Source : [URL]
   - Date : [date]

**Statistiques sectorielles (1-2 données) :**
3. [Stat pertinente] : XX%
   - Source : [Étude / INSEE]
   - Date : [date]

**Données locales [Ville] (1-2 données) :**
4. Nombre [acteurs/services] à [Ville] : XX
   - Source : [Annuaire / Google Maps]
   - Date : [date]

5. [Donnée locale spécifique]
   - Source : [URL]
   - Date : [date]

[+2 données bonus si trouvées]
```

**2. Exemples concrets locaux (2-3)**

```markdown
## Exemples Concrets [Ville]

**Exemple 1 :**
- Situation : [Description cas d'usage]
- Quartier(s) : [Quartiers spécifiques]
- Prix : XXX€
- Source : [Avis Google / Témoignage, URL, date]

**Exemple 2 :**
[Même structure]
```

**3. Acteurs locaux à citer (2-3)**

```markdown
## Acteurs Locaux à Mentionner

**Acteur 1 :** [Nom] (issu fiche locale)
- Contexte mention : [Dans quelle section]
- Information : [Ce qu'on dit de lui]

**Acteur 2 :** [Nom]
- Contexte mention : [Section]
```

**4. Quartiers à mentionner (3-5)**

```markdown
## Quartiers à Mentionner (issus fiche locale)

**Quartier 1 :** [Nom]
- Contexte : [Pourquoi pertinent pour ce satellite]
- Exemple : [Cas d'usage concret]

**Quartier 2-5 :** [Liste]
```

---

## 4.3 Template Brief Satellite Complet

**Pour chaque satellite, créer un brief avec ce template :**

```markdown
# Brief Satellite N° [X]/10 - [Pilier] - [Ville]

**Pilier parent :** [Nom]
**Sous-requête :** [Requête exacte]
**Volume :** [X]/mois
**Ville :** [Ville]
**Date création :** [Date]

---

## 🎯 INTENTION DE RECHERCHE

**Type :** [Informationnelle / Transactionnelle]

**Douleur utilisateur :**
[Description précise du problème]

**Questions implicites :**
1. [Question 1]
2. [Question 2]
3. [Question 3]
4. [Question 4]
5. [Question 5]

---

## 🔑 MOTS-CLÉS & SÉMANTIQUE

### Mots-clés Principaux (3-5)
1. [mot-clé principal exact]
2. [variante 1]
3. [variante 2]
4. [variante 3]
5. [variante 4]

### Mots-clés Secondaires (5-10)
1. [secondaire 1]
2. [secondaire 2]
[...]

### Mots Sémantiques CSV Pilier (10-15)
**EXTRAITS DE LA COLONNE 5 DU CSV POUR CE PILIER :**

[Liste les 10-15 mots pertinents pour ce satellite parmi les 40-50 du pilier]

**Densité cible :** 8-12 occurrences naturelles

---

## 📊 DONNÉES CHIFFRÉES OBLIGATOIRES (5-7)

**Issues Deep Search Spécifique + Fiche Locale**

### Donnée 1 : [Type]
- **Chiffre :** [Valeur exacte]
- **Source :** [Nom + URL complète]
- **Date :** [Date source]
- **Intégrer dans :** [Section X, paragraphe Y]

[Répéter × 5-7 données]

---

## 📍 DONNÉES LOCALES OBLIGATOIRES

**Issues Fiche Locale [Ville]**

### Quartiers à Mentionner (3-5)
- **[Quartier 1]** : [Contexte utilisation dans article]
- **[Quartier 2]** : [Exemple concret à donner]
- **[Quartier 3]** : [Pourquoi pertinent]
- **[Quartier 4]** : [Optionnel]
- **[Quartier 5]** : [Optionnel]

### Acteurs Locaux à Citer (2-3)
- **[Déménageur/Garde-meuble 1]** : [Dans quelle section, quel contexte]
- **[Acteur 2]** : [Contexte mention]
- **[Acteur 3]** : [Optionnel]

### Contraintes Locales (1-2)
- **[Contrainte 1]** : [Détail + impact déménagement]
- **[Contrainte 2]** : [Optionnel]

### Citations Vérifiables (0-2)
- **Citation 1 :** "[Texte]" — Source [URL, date]
- **Citation 2 :** [Optionnel]

---

## 🏗️ STRUCTURE NARRATIVE DÉTAILLÉE

### Titre H1
**Proposition :** [Titre optimisé 50-65 car avec ville et bénéfice]

### Introduction (150-200 mots)

**Accroche narrative (50-70 mots) :**
[Scénario concret / témoignage / statistique locale / question]

**Contexte [Ville] (80-100 mots) :**
[Pourquoi ce sujet est important à [Ville] spécifiquement]

**Annonce valeur (30-50 mots) :**
[Ce que va apprendre le lecteur]

**Mots-clés intro :**
- [Mot-clé principal] (1x)
- [Ville] (2x)
- 2-3 mots sémantiques CSV

---

### Section 1 : [Titre H2 - Comprendre]

**Longueur :** 300-400 mots

**Points à couvrir :**
1. [Point clé 1 - Détail attendu]
2. [Point clé 2 - Avec donnée chiffrée 1]
3. [Point clé 3 - Avec exemple [Ville]]
4. [Point clé 4]

**Quartiers à mentionner :** [Quartier A, B]

**H3 (optionnelles) :**
- [Sous-section 1] (100-150 mots)
- [Sous-section 2] (100-150 mots)

---

### Section 2 : [Titre H2 - Pratique/Technique]

**Longueur :** 400-500 mots

**Points à couvrir :**
1. [Point technique 1 - Donnée chiffrée 2]
2. [Point 2 - Exemple [Ville] avec quartier C]
3. [Point 3 - Acteur local à citer]
4. [Point 4]
5. [Point 5]

**Données chiffrées :** Données 3 et 4 de la liste

**H3 :**
- [Sous-section 1] (120-150 mots)
- [Sous-section 2] (120-150 mots)
- [Sous-section 3] (120-150 mots)

---

### Section 3 : [Titre H2 - Solutions/Conseils]

**Longueur :** 300-400 mots

**Structure conseils ou étapes :**
[Description de l'approche]

**Donnée chiffrée :** Donnée 5

**Quartiers :** [Quartier D, E]

---

### Section 4 (optionnelle) : [Titre H2]

**Longueur :** 200-300 mots

**Donnée chiffrée :** Donnée 6-7 si disponible

---

### Conclusion (100-150 mots)

**Récapitulatif** (60-80 mots)

**Message rassurant** (30-40 mots)

**CTA naturel** (20-30 mots)

---

## ❓ FAQ : 5-7 QUESTIONS

**Recherche PAA effectuée :** [Résultat Google PAA pour sous-requête]

### Question 1 : [Question ultra-précise avec [Ville] si pertinent]

**Type :** Prix/Tarifs  
**Potentiel snippet :** Élevé

**Réponse attendue (50-100 mots) :**

**[Phrase réponse directe 20-40 mots avec chiffre et source]**

[Paragraphe développement 30-60 mots]

**Points clés :**
- [Donnée chiffrée locale]
- [Exemple [Ville] avec quartier]
- [Conseil actionnable]

---

[Répéter × 5-7 questions avec types variés : Prix, Comment, Où, Pourquoi, Comparatif]

---

## 🔗 MAILLAGE INTERNE

### Liens vers Pilier Parent (2-3 liens)

**Lien 1 :**
- **Position :** Introduction, paragraphe 2
- **Ancre :** "[ancre longue naturelle avec mot-clé pilier et ville]"
- **URL :** `/blog/[categorie]/[slug-pilier]`
- **Contexte phrase :** "[Suggestion de phrase complète incluant le lien]"

**Lien 2 :**
- **Position :** Section 3, paragraphe X
- **Ancre :** "[ancre contextuelle différente]"
- **URL :** `/blog/[categorie]/[slug-pilier]`
- **Contexte :** "[Phrase suggérée]"

**Lien 3 (optionnel) :**
- **Position :** Conclusion
- **Ancre :** "[ancre bénéfice/CTA]"
- **URL :** `/blog/[categorie]/[slug-pilier]`
- **Contexte :** "[Phrase suggérée]"

### Liens vers Satellites Connexes (1-2 liens)

**Lien 1 :** (si très pertinent)
- **Satellite cible :** [Titre autre satellite]
- **Position :** [Section X]
- **Ancre :** "[ancre naturelle]"
- **URL :** `/blog/[categorie]/[slug-satellite]`
- **Contexte :** "[Phrase suggérée]"

---

## 📤 FRONT MATTER

```yaml
---
title: "[Titre exact - max 60 car]"
meta_title: "[Meta title 50-60 car]"
meta_description: "[Meta 150-158 car avec chiffre local]"
slug: "[slug-propre-ville]"
category: "[categorie-pilier-ville]"
type: "satellite"
pilier_parent: "[slug-pilier]"
keywords:
  - "[mot-clé principal]"
  - "[secondaire 1]"
  - "[secondaire 2]"
word_count: [estimation 1200-1800]
publish_date: "2025-[MM]-[DD]"
author: "Équipe Moverz [Ville]"
sources:
  - url: "[URL source 1]"
    title: "[Nom source]"
    date: "YYYY-MM-DD"
  [× 5-7 sources]
---
```

---

## ✅ CHECKLIST VALIDATION BRIEF

- [ ] Sous-requête validée (PAA, volume, pertinence)
- [ ] 5-7 données chiffrées avec sources URL
- [ ] 10-15 mots sémantiques CSV intégrés au plan
- [ ] 3-5 quartiers issus fiche locale
- [ ] 2-3 acteurs locaux issus fiche locale
- [ ] Structure narrative claire (4 sections H2)
- [ ] FAQ avec 5-7 questions ultra-précises
- [ ] Maillage interne défini (ancres + contextes)
- [ ] Front matter complet
- [ ] Longueur 1200-1800 mots faisable

**Sauvegarder :** `seo-briefs/[ville]/satellites/[pilier]/brief-satellite-[XX].md`

---

## 4.4 Stratégie Maillage Interne (Rappel)

**CHAQUE satellite doit :**

✅ 2-3 liens → pilier parent (ancres variées)  
✅ 1-2 liens → satellites connexes (si pertinent)  
✅ Breadcrumb  
✅ Section "Articles connexes" en fin  

**Ancres variées - Types à alterner :**
- Ancre longue descriptive : "guide complet du [sujet] à [Ville]"
- Ancre contextuelle : "bonnes pratiques de [sujet] dans la région [locale]"
- Ancre question : "comment [action] à [Ville] en toute sécurité"
- Ancre bénéfice : "tous nos conseils d'experts pour [résultat] à [Ville]"

**❌ JAMAIS ancre exacte SEO :** "[mot-clé exact]"

---

## 4.5 Stratégie FAQ (Rappel)

**CHAQUE satellite doit :**

✅ 5-7 questions ultra-précises  
✅ 2+ questions avec [Ville]  
✅ 2+ questions prix/chiffres  
✅ Types variés (Comment, Combien, Où, Pourquoi, Comparatif)  
✅ Réponses 50-100 mots  
✅ Réponse directe dès 1ère phrase  
✅ Format featured snippet optimal  

**Sources questions :**
- PAA Google
- AlsoAsked
- Avis Google / Forums

---

# PARTIE 5 : PHASE 2 - GÉNÉRATION ARTICLES

## 5.1 Prompt de Génération Autonome

**Pour chaque satellite, utilise CE prompt :**

```markdown
Je vais rédiger l'article satellite selon le brief que je viens de créer.

BRIEF : seo-briefs/[ville]/satellites/[pilier]/brief-satellite-[XX].md

DONNÉES LOCALES : seo-briefs/[ville]/fiche-locale-[ville].md

MOTS-CLÉS CSV : [Copier les 10-15 mots sémantiques du brief]

---

MISSION :
Rédiger l'article satellite en respectant STRICTEMENT le brief.

RÈGLES ABSOLUES :

✅ STRUCTURE :
- H1 exact du brief
- H2/H3 structure du brief
- Longueur sections respectée
- Longueur totale : 1200-1800 mots (hors FAQ)

✅ DONNÉES :
- UNIQUEMENT les 5-7 données chiffrées du brief
- Format : "[chiffre] ([source], [année])"
- ZÉRO invention de chiffres

✅ LOCALISATION [VILLE] (CRITIQUE) :
- Mentionner les 3-5 quartiers du brief
- Citer les 2-3 acteurs locaux du brief
- Intégrer les contraintes locales du brief
- Citations vérifiables du brief si fournies
- CHAQUE paragraphe doit avoir un élément local

✅ MOTS-CLÉS CSV :
- Intégrer les 10-15 mots sémantiques CSV naturellement
- Densité mot-clé principal : 0.8-1.2%
- JAMAIS de bourrage

✅ MAILLAGE INTERNE :
- Intégrer EXACTEMENT les 2-3 liens pilier du brief
- Ancres exactes fournies
- Position exacte indiquée
- Contexte phrase suggéré

✅ FAQ :
- Reprendre les 5-7 questions du brief
- Format : ## [Question]
- Réponse 50-100 mots
- Réponse directe dès 1ère phrase
- Intégrer données chiffrées

✅ TON & STYLE :
- Narratif fluide (raconter, pas lister)
- Phrases variées (courtes/longues)
- Adresser le lecteur ("vous")
- Expert accessible et rassurant

❌ INTERDICTIONS ABSOLUES :

1. ❌ INVENTER des chiffres, prix, statistiques
2. ❌ CITER des acteurs non présents dans brief/fiche locale
3. ❌ MENTIONNER des quartiers non vérifiés
4. ❌ BULLET POINTS excessifs (max 2 listes courtes)
5. ❌ PHRASES CREUSES : "Il est important de...", "En effet..."
6. ❌ CONTENU GÉNÉRIQUE recyclable autre ville
7. ❌ IGNORER les mots sémantiques CSV
8. ❌ ANCRES RÉPÉTITIVES (varier les 2-3 liens pilier)
9. ❌ DÉPASSER 2000 mots ou < 1200 mots
10. ❌ OMETTRE éléments locaux [Ville]

---

FORMAT SORTIE :

```yaml
---
[Front matter exact du brief]
---

[Contenu article 1200-1800 mots]

---

## Sources et Références

1. [Source 1] - [URL] (consulté le [date])
2. [Source 2] - [URL] (consulté le [date])
[× 5-7 sources]

---
```

VÉRIFICATIONS AVANT GÉNÉRATION :

- [ ] Brief lu en détail ?
- [ ] Fiche locale consultée ?
- [ ] 5-7 données chiffrées identifiées ?
- [ ] Mots sémantiques CSV notés ?
- [ ] Quartiers/acteurs locaux repérés ?
- [ ] Structure narrative comprise ?
- [ ] Interdictions mémorisées ?

SI OUI → GÉNÈRE MAINTENANT

SINON → Relis brief + fiche locale
```

---

## 5.2 Contraintes Absolues (Rappel)

### ZÉRO INVENTION

**Toute donnée doit être :**
- ✅ Présente dans le brief OU fiche locale
- ✅ Sourcée avec URL
- ✅ Datée

**En cas de doute :**
> NE PAS inventer → Omettre plutôt que d'inventer

### HYPER-LOCALISATION

**Test simple :**
> "Si je remplace [Ville] par une autre ville, l'article a-t-il encore du sens ?"
> 
> SI OUI → ÉCHOUÉ (trop générique)
> SI NON → RÉUSSI (vraiment local)

**Exemples :**

❌ "À Lyon, les prix varient selon le volume"
→ Générique, vrai partout

✅ "À Lyon, les déménagements du Vieux-Lyon (rues médiévales pavées) 
   coûtent 15-20% plus cher qu'à Villeurbanne (sources : [Déménageur A] 
   850€ vs [Déménageur B] 720€ pour T2, janvier 2025)"
→ Hyper-spécifique Lyon, données réelles

---

## 5.3 Format de Sortie

**Sauvegarder chaque article :**

```
sites/[ville]/content/blog/satellites/[slug-satellite].md
```

**Nommage fichier :**
- Slug propre : mots-clés-ville.md
- Ex : `prix-garde-meuble-lyon-2025.md`
- Tout en minuscules, tirets

---

## 5.4 Prompts d'Ajustement

**Si article trop court (< 1200 mots) :**

```
Article trop court ([X] mots, besoin 1200-1800).

Enrichis :
- Section 2 : +2 exemples concrets [Ville] avec quartiers
- Section 3 : Développe conseils pratiques
- FAQ : +1-2 questions supplémentaires

Conserve données existantes et style.
```

**Si trop de bullet points :**

```
Trop de listes (> 25% du contenu).

Transforme listes Sections 2-3 en paragraphes narratifs.
Conserve max 1 liste courte (3-5 items).

Exemple transformation :
❌ "- Point 1\n- Point 2"
✅ "Le premier aspect est [Point 1]. En complément, [Point 2]..."
```

**Si manque localisation :**

```
Manque de spécificités [Ville].

Le brief contient :
[Copier quartiers, acteurs, contraintes du brief]

Intègre-les dans Sections 1, 2, 3.
Minimum 3 quartiers nommés.
```

**Si données inventées détectées :**

```
STOP ! Données inventées détectées.

SEULES données autorisées :
[Copier les 5-7 données du brief]

Régénère [Section X] en utilisant UNIQUEMENT ces données.
```

---

# PARTIE 6 : PHASE 3 - AUTO-VALIDATION

## 6.1 Checklist Validation Complète

**Après chaque article généré, auto-vérifier (5 min) :**

### Structure & Longueur
- [ ] Longueur : 1200-1800 mots (hors FAQ) ?
- [ ] Structure H2/H3 respectée ?
- [ ] 4 sections H2 présentes ?
- [ ] Introduction 150-200 mots ?
- [ ] Conclusion 100-150 mots ?

### Données & Sources
- [ ] 5-7 données chiffrées présentes ?
- [ ] Chaque donnée sourcée : "[chiffre] ([source], [année])" ?
- [ ] Aucune donnée inventée détectée ?
- [ ] Section "Sources" en fin d'article ?

### Localisation [Ville]
- [ ] 3-5 quartiers nommés précisément ?
- [ ] 2-3 acteurs locaux cités ?
- [ ] Prix locaux (pas génériques) ?
- [ ] 1-2 contraintes locales détaillées ?
- [ ] Impossible de recycler pour autre ville ?

### Mots-Clés SEO
- [ ] Mot-clé principal présent naturellement (10-20×) ?
- [ ] 10-15 mots sémantiques CSV intégrés ?
- [ ] Pas de bourrage détecté ?

### Maillage Interne
- [ ] 2-3 liens vers pilier présents ?
- [ ] Ancres variées (pas répétitives) ?
- [ ] Liens intégrés naturellement ?
- [ ] Breadcrumb présent (si applicable) ?

### FAQ
- [ ] 5-7 questions présentes ?
- [ ] Questions ultra-précises (pas génériques) ?
- [ ] 2+ questions avec [Ville] ?
- [ ] 2+ questions prix/chiffres ?
- [ ] Réponses 50-100 mots chacune ?
- [ ] Réponse directe dès 1ère phrase ?

### Style & Ton
- [ ] Narratif fluide (pas robotisé) ?
- [ ] Bullet points < 20% contenu ?
- [ ] Pas phrases creuses ("Il est important...") ?
- [ ] Adresse au lecteur ("vous") ?
- [ ] Paragraphes < 5 lignes ?

### Front Matter
- [ ] Title, meta_title, meta_description ?
- [ ] Slug, category, type ?
- [ ] Keywords (3-5) ?
- [ ] Sources (5-7) avec URLs ?

---

## 6.2 Scoring Qualité

**Score chaque critère /10 :**

| Critère | Note /10 | Poids | Note Pond. |
|---------|----------|-------|------------|
| Localisation | [X] | ×3 | [X] |
| Données sourcées | [X] | ×3 | [X] |
| Structure | [X] | ×1 | [X] |
| Mots-clés CSV | [X] | ×2 | [X] |
| Maillage | [X] | ×2 | [X] |
| FAQ | [X] | ×2 | [X] |
| Style narratif | [X] | ×1 | [X] |

**Total :** [XX]/140 → Note finale : [X.X]/10

**Verdict :**
- ≥ 8.0/10 : ✅ Validé
- 6.0-7.9/10 : ⚠️ Corrections mineures
- < 6.0/10 : ❌ À refaire

---

## 6.3 Corrections Types

**Si note < 8/10, identifier le problème :**

**Problème 1 : Localisation faible (< 7/10)**
→ Ajouter 2-3 quartiers, 1 acteur local, 1 exemple ville

**Problème 2 : Données manquantes**
→ Intégrer les données du brief non utilisées

**Problème 3 : Mots-clés CSV absents**
→ Reprendre liste CSV, intégrer 5-8 mots manquants

**Problème 4 : Trop de listes**
→ Transformer en paragraphes narratifs

**Problème 5 : FAQ générique**
→ Repréciser questions avec [Ville], ajouter chiffres locaux

---

# PARTIE 7 : WORKFLOW COMPLET

## 7.1 Workflow Jour par Jour - 1 Pilier (10 Satellites)

### JOUR 0 (Phase 0 - Si pas encore fait) : Deep Search Locale

**Matin (4h) :**
- 9h-11h : Google Maps ([ville]) → acteurs locaux
- 11h-13h : Sites municipaux → données + quartiers

**Après-midi (4h) :**
- 14h-16h : Sites déménageurs → prix locaux
- 16h-18h : Compilation fiche-locale-[ville].md

**Livrable :** Fiche locale complète

---

### JOUR 1 (Phase 1) : Sélection Sous-Requêtes

**Matin (3h) :**
- 9h-10h : Lire brief pilier CSV
- 10h-12h : Deep Search sous-requêtes
  - Google PAA (15 questions)
  - Google Suggest (15 variantes)
  - Concurrents Top 10 (sous-sujets)

**Après-midi (2h) :**
- 14h-16h : Sélection Top 10 sous-requêtes
  - Filtrer par critères
  - Valider équilibre thématique
  - Lister dans ordre de production

**Livrable :** Liste 10 sous-requêtes validées

---

### JOURS 2-3 (Phase 1) : Création 10 Briefs

**Rythme :** 3-4 briefs/jour

**Par brief (1h-1h30) :**
- Deep search spécifique (20-30 min)
- Collecte 5-7 données chiffrées
- Rédaction brief (template rempli) (30-45 min)
- Auto-validation checklist (10 min)
- Sauvegarde

**J2 :** Briefs 1-4  
**J3 :** Briefs 5-10

**Livrables :** 10 briefs satellites prêts

---

### JOURS 4-8 (Phase 2) : Génération 10 Articles

**Rythme :** 2 satellites/jour

**Par satellite (2-3h) :**
- Génération Cursor (prompt autonome) : 10-20 min
- Auto-validation (checklist) : 10-15 min
- Corrections si nécessaire : 10-30 min
- Sauvegarde : 2 min

**Planning :**
- J4 : Satellites 1-2
- J5 : Satellites 3-4
- J6 : Satellites 5-6
- J7 : Satellites 7-8
- J8 : Satellites 9-10

**Livrables :** 10 articles satellites

---

### JOUR 9 (Phase 3) : Validation Finale

**Matin (3h) :**
- Re-vérification des 10 satellites
- Scoring qualité chacun
- Corrections mineures

**Après-midi (2h) :**
- Vérification maillage cohérent
- Test liens (pas de 404)
- Rapport qualité pilier

**Livrable :** 10 satellites validés ✅

---

**TOTAL : 9 jours pour 1 pilier (10 satellites)**

**Répéter × 10 piliers = 90 jours (3 mois) pour ville complète**

---

## 7.2 Planning 10 Piliers (100 Satellites)

### Semaines 1-2 : Pilier 1 + Phase 0

**Si Phase 0 pas faite :**
- Jour 1 : Deep Search Locale (8h)
- Jours 2-10 : Pilier 1 (9 jours)

**Si Phase 0 déjà faite :**
- Jours 1-9 : Pilier 1

### Semaines 3-4 : Pilier 2

**Jours 10-18 :** Process complet pilier 2

### Semaines 5-6 : Pilier 3

**Jours 19-27 :** Process complet pilier 3

[Répéter jusqu'à pilier 10]

### Semaines 11-12 : Validation Globale

**Actions finales :**
- Vérification cohérence 100 satellites
- Maillage interne global
- Correction liens cassés
- Rapport final qualité

**TOTAL : 12 semaines pour 100 satellites**

---

## 7.3 Livrables Attendus

### Livrables Intermédiaires

**Phase 0 :**
- `seo-briefs/[ville]/fiche-locale-[ville].md` (1 fichier)

**Phase 1 (× 10 piliers) :**
- `seo-briefs/[ville]/satellites/[pilier]/brief-satellite-[01-10].md` (100 fichiers)

**Phase 2 (× 100 satellites) :**
- `sites/[ville]/content/blog/satellites/[slug].md` (100 fichiers)

### Livrable Final

**Après 12 semaines :**

```markdown
# Rapport Final - Production Satellites [Ville]

**Date :** [Date]
**Satellites produits :** 100/100 ✅

---

## Statistiques

**Production :**
- Durée totale : XX semaines
- Articles/jour moyen : X.X
- Note qualité moyenne : X.X/10

**Localisation :**
- Quartiers couverts : XX/15+ (100%)
- Déménageurs cités : XX acteurs différents
- Prix locaux : XXX données sourcées

**SEO :**
- Mots-clés totaux : XXX
- Maillage interne : XXX liens
- FAQ totales : XXX questions

**Par Pilier :**

| Pilier | Satellites | Note moy | Données | Quartiers |
|--------|-----------|----------|---------|-----------|
| Garde-meuble | 10 | 8.5 | 67 | 12 |
| Déménageur | 10 | 8.3 | 58 | 14 |
| Prix | 10 | 8.7 | 71 | 11 |
| [etc.] | ... | ... | ... | ... |

---

## Validation Finale

✅ 100 satellites générés  
✅ Note moyenne ≥ 8/10  
✅ Aucune donnée inventée  
✅ Localisation hyper-précise  
✅ Maillage interne cohérent  
✅ 600 FAQ optimisées  

**Statut :** ✅ COMPLET - Prêt à publier

---

**[Ville] = TERMINÉE !**

Passer à ville suivante ou déploiement.
```

---

# ANNEXES

## Annexe A : Liste des 10 Piliers Standards

Par ordre de volume moyen (toutes villes) :

1. **Garde-Meuble** (volume élevé : 800-2100/mois selon ville)
2. **Déménageur** (volume moyen-élevé : 400-1300/mois)
3. **Prix Déménagement** (volume moyen)
4. **Location Camion** (volume variable)
5. **Déménagement Pas Cher**
6. **Déménagement International**
7. **Petit Déménagement**
8. **Aide Déménagement**
9. **Déménagement Piano**
10. **Déménagement Entreprise**

**Recommandation :** Commencer par Garde-Meuble (ROI rapide)

---

## Annexe B : Catégories de Satellites Types

**Pour chaque pilier, les 10 satellites couvrent généralement :**

**Satellites Prix (2) :**
- Prix détaillé service
- Facteurs influençant coût

**Satellites Pratiques (3) :**
- Comment faire [action]
- Étapes/process
- Matériel/préparation

**Satellites Comparatifs (2) :**
- Option A vs Option B
- Choix du prestataire

**Satellites Spécifiques (2) :**
- Cas d'usage particulier
- Problématique spécifique

**Satellite FAQ (1) :**
- Questions complètes
- Ou aspects non couverts

---

## Annexe C : Exemples de Sousrequêtes par Pilier

### Exemple : Pilier "Garde-Meuble [Ville]"

**10 satellites types :**

1. Prix garde-meuble [Ville] 2025 (comparatif quartiers)
2. Self-stockage vs garde-meuble traditionnel [Ville]
3. Quelle taille de box choisir pour [X]m² appartement
4. Durée minimum location box [Ville]
5. Assurance garde-meuble : obligatoire ou optionnelle
6. Accès 24/7 self-stockage [Ville] : quels acteurs
7. Garde-meuble étudiant [Ville] : solutions pas cher
8. Stockage pendant déménagement [Ville] : combien de temps
9. Température contrôlée : nécessaire pour quels objets
10. FAQ complète garde-meuble [Ville]

---

### Exemple : Pilier "Déménageur [Ville]"

**10 satellites types :**

1. Prix déménageur [Ville] 2025 selon volume
2. Comment choisir déménageur [Ville] : 10 critères
3. Déménageur avec monte-meuble [Ville] : quand nécessaire
4. Assurance déménageur : que couvre-t-elle vraiment
5. Formule économique vs clé en main [Ville] : comparatif
6. Déménageur [Quartier Historique] : spécialistes accès difficiles
7. Autorisation stationnement déménagement [Ville] : démarche
8. Pourboire déménageurs [Ville] : usages et montants
9. Déménagement dimanche [Ville] : surcoût et disponibilité
10. FAQ déménageur [Ville]

---

## Annexe D : Checklist Démarrage Chat Cursor

**Quand je (utilisateur) ouvre un nouveau chat Cursor :**

**Message initial :**

```
Lis ce document de référence :
seo-briefs/DOCUMENT-MAITRE-PRODUCTION-SATELLITES.md

Tu es en charge de la production des 100 articles satellites pour : [VILLE]

Ressources disponibles :
- SEO Guidelines - Feuille 1.csv (briefs piliers)
- seo-briefs/[ville]/[01-10]-[pilier].md (briefs piliers extraits)
- sites/toulouse/content/blog/satellites/ (référence structure)

MISSION :
1. Phase 0 : Créer fiche-locale-[ville].md (si pas déjà fait)
2. Phase 1-2-3 : Produire 10 piliers × 10 satellites = 100 articles
3. Standard : Note ≥ 8/10, données sourcées, hyper-local

Confirme que tu as bien lu le document maitre et es prêt à démarrer.

Questions avant de commencer ?
```

**Cursor devrait répondre :**
> "J'ai lu le document maitre. Je comprends :
> - Phase 0 : Deep search locale (fiche ville)
> - Phase 1 : Création briefs satellites (10 par pilier)
> - Phase 2 : Génération articles
> - Phase 3 : Auto-validation
> 
> Contraintes clés :
> - ZÉRO invention
> - Hyper-localisation
> - Mots-clés CSV
> - Maillage + FAQ
> 
> Prêt à démarrer. Par quel pilier commences-tu ? (Recommandation : Garde-Meuble)"

---

# RÈGLES ABSOLUES (RÉSUMÉ)

## ✅ TU DOIS

1. **Créer fiche locale** AVANT tout (Phase 0)
2. **Utiliser UNIQUEMENT** données fiche locale + brief
3. **Intégrer mots sémantiques CSV** pilier (10-15)
4. **Mentionner 3-5 quartiers** par article
5. **Citer 2-3 acteurs locaux** vérifiés
6. **Sourcer TOUTES** les données ("[chiffre] ([source], [année])")
7. **Créer maillage** interne (2-3 liens pilier, ancres variées)
8. **Optimiser FAQ** (5-7 questions, featured snippet)
9. **Style narratif** fluide (pas bullet points excessifs)
10. **Auto-valider** chaque article (checklist 20 points)

## ❌ TU NE DOIS JAMAIS

1. ❌ **Inventer** chiffres, prix, statistiques, acteurs
2. ❌ **Citer** quartiers non vérifiés dans fiche locale
3. ❌ **Créer** contenu générique recyclable autre ville
4. ❌ **Omettre** mots sémantiques CSV du pilier
5. ❌ **Ignorer** données locales de la fiche
6. ❌ **Répéter** ancres de liens (varier)
7. ❌ **Faire** listes à puces > 20% contenu
8. ❌ **Écrire** phrases creuses ("Il est important...")
9. ❌ **Dépasser** 2000 mots ou < 1200 mots
10. ❌ **Valider** article < 8/10

---

# DÉMARRAGE IMMÉDIAT

**Tu es un chat Cursor autonome. Voici ce que tu fais :**

## Étape 1 : Identifier ta Ville

```
Question à l'utilisateur :

"Quelle ville suis-je en charge de produire ?
- Lyon
- Marseille  
- Montpellier
- Autre : [préciser]"

Attendre réponse.
```

## Étape 2 : Vérifier Phase 0

```
Vérifier si existe : seo-briefs/[ville]/fiche-locale-[ville].md

SI OUI :
  → "Fiche locale [Ville] trouvée ✅"
  → "Prêt pour Phase 1"
  → Passer directement à Étape 3

SI NON :
  → "Fiche locale absente"
  → "Je vais la créer maintenant (Phase 0, ~6-8h)"
  → Démarrer Deep Search Locale (Partie 3)
  → Créer fiche-locale-[ville].md
  → Une fois finie, passer à Étape 3
```

## Étape 3 : Choisir Pilier de Départ

```
Question à l'utilisateur :

"Fiche locale [Ville] prête ✅

Par quel pilier commencer ?
1. Garde-Meuble (recommandé - volume élevé)
2. Déménageur
3. Prix Déménagement
4. Autre : [préciser parmi les 10 piliers]

Ou je suis les 10 piliers dans l'ordre ?"

Attendre réponse.
```

## Étape 4 : Lancer Production Pilier 1

```
"Démarrage production : Pilier [X] - [Ville]

Timeline :
- Jour 1 : Sélection 10 sous-requêtes
- Jours 2-3 : Création 10 briefs satellites
- Jours 4-8 : Génération 10 articles
- Jour 9 : Validation finale

Total : 9 jours pour ce pilier.

Je démarre maintenant Jour 1 (sélection sous-requêtes).
Brief pilier : seo-briefs/[ville]/[XX]-[pilier-ville].md
Fiche locale : seo-briefs/[ville]/fiche-locale-[ville].md

[Pause pour charger contexte]

Prêt. Démarrage..."

Puis exécuter Partie 7.1 - JOUR 1
```

---

# PROMPT INITIAL POUR CURSOR

**Copier-coller ceci dans un nouveau chat Cursor :**

```markdown
Lis ce document de référence complet :
seo-briefs/DOCUMENT-MAITRE-PRODUCTION-SATELLITES.md

Tu es un chat Cursor autonome en charge de produire les 100 articles 
satellites d'une ville.

CONTEXTE :
- Stratégie : 1 site par ville (avantage = hyper-localisation)
- 10 piliers par ville (déjà publiés)
- 10 satellites par pilier (à créer)
- Standard : Note ≥ 8/10, ZÉRO invention, 100% local

WORKFLOW :
- Phase 0 : Deep search locale ville (1 jour)
- Phase 1 : Briefs satellites pilier par pilier
- Phase 2 : Génération articles
- Phase 3 : Auto-validation

RESSOURCES :
- CSV briefs piliers : SEO Guidelines - Feuille 1.csv
- Briefs piliers : seo-briefs/[ville]/
- Référence : sites/toulouse/content/blog/satellites/

PRINCIPES NON-NÉGOCIABLES :
1. ZÉRO invention (données 100% sourcées)
2. Hyper-localisation (quartiers, acteurs, prix réels)
3. Mots-clés CSV pilier intégrés (10-15 par article)
4. Maillage interne (2-3 liens pilier/article)
5. FAQ optimisées (5-7 questions/article)

Confirme lecture document maitre et demande-moi quelle ville tu gères.
```

---

**Document créé par :** Direction SEO Moverz  
**Version :** 2.0 - Autonome  
**Date :** 13 octobre 2025  
**Usage :** Document central pour production parallèle (3 chats Cursor)  
**Prêt pour :** Production immédiate 3 villes simultanément

