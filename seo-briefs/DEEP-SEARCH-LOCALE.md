# 🔍 Deep Search Locale - Procédure Détaillée

**Objectif :** Collecter des données locales vérifiables et précises pour chaque ville AVANT de rédiger les briefs satellites

**Principe :** Chaque article doit contenir 3-5 éléments hyper-locaux spécifiques à la ville cible

---

## 🎯 Pourquoi c'est CRITIQUE

### Votre Avantage Concurrentiel = Localisation

**Concurrence nationale (1 site pour toute la France) :**
- Contenu générique recyclable
- "Déménagement à Paris, Lyon, Marseille..."
- Aucune spécificité locale
- Faible pertinence locale

**Vous (1 site par ville) :**
- Contenu 100% spécifique [Ville]
- Quartiers précis, acteurs locaux, prix réels
- **Google favorise le contenu local pour recherches locales**
- **#1 sur "déménagement [quartier] [ville]"**

### Impact SEO Local

**Signal Google :**
> "Ce site connaît VRAIMENT [Ville], pas juste mentionné le nom 20 fois"

**Résultat :**
- ✅ Featured snippets locaux
- ✅ Google Maps intégré
- ✅ "Near me" searches
- ✅ Positions #1 requêtes locales

---

## 📋 Checklist des Données Locales à Collecter

### Par Ville (à faire UNE FOIS)

**Données urbaines de base :**
- [ ] Population (source : Wikipedia, INSEE)
- [ ] Nombre de quartiers/arrondissements
- [ ] Étudiants (source : sites universitaires)
- [ ] Métropole/agglomération (nombre communes)

**Infrastructure :**
- [ ] Transport en commun (métro, tramway, bus)
- [ ] Zones piétonnes principales
- [ ] Axes routiers majeurs (autoroutes, boulevards)
- [ ] Gares, aéroports

**Quartiers (TOP 10-15) :**
- [ ] Noms exacts des quartiers principaux
- [ ] Caractéristiques (centre historique, résidentiel, étudiant, affaires)
- [ ] Contraintes (rues étroites, stationnement difficile, accès)

**Événements/Périodes :**
- [ ] Rentrée universitaire (dates, ampleur)
- [ ] Pics déménagement saisonniers
- [ ] Jours de marché (contraintes stationnement)

### Par Pilier/Thématique

**Acteurs locaux (20-30 par ville) :**
- [ ] Déménageurs locaux (noms, quartiers, avis Google)
- [ ] Garde-meubles (noms, adresses, capacités)
- [ ] Loueurs de camion (agences, quartiers)
- [ ] Magasins cartons (adresses)

**Prix locaux :**
- [ ] Tarifs déménageurs (fourchettes ville)
- [ ] Prix garde-meuble (€/m²/mois par quartier)
- [ ] Location camion (tarifs journée/weekend)
- [ ] Stationnement déménagement (tarifs autorisation)

**Contraintes locales :**
- [ ] Accès difficiles typiques (vieux quartiers, rues étroites)
- [ ] Zones à stationnement réglementé
- [ ] Autorisations municipales nécessaires
- [ ] Spécificités (hauteur ponts, zones piétonnes)

---

## 🗺️ Méthodologie de Recherche par Source

### 1. Google Maps (30 min/ville)

**Objectif :** Identifier acteurs locaux + quartiers

#### Actions :

**A. Déménageurs locaux**
1. Rechercher "déménageur [ville]"
2. Filtrer par note > 4.0 étoiles
3. Pour chaque déménageur (TOP 20) :
   ```markdown
   - Nom : [Nom entreprise]
   - Adresse : [Adresse complète]
   - Note : [X.X]/5 ([XXX] avis)
   - Quartier : [Quartier]
   - Services : [Détail si visible]
   ```

**B. Garde-meubles**
1. Rechercher "garde meuble [ville]"
2. Rechercher "self stockage [ville]"
3. Noter :
   - Noms entreprises
   - Quartiers/adresses
   - Prix si affichés (rares)

**C. Location véhicules**
1. Rechercher "location utilitaire [ville]"
2. Noter agences Europcar, Sixt, Hertz, Leclerc, etc.
3. Quartiers présence

**D. Cartographie quartiers**
1. Zoomer sur centre-ville
2. Noter noms quartiers affichés
3. Identifier types (centre, résidentiel, affaires)

**Livrable :** Fichier `acteurs-locaux-[ville].md` avec 50+ entrées

---

### 2. Sites Municipaux (20 min/ville)

**Sources :**
- `[ville].fr` (site officiel mairie)
- Wikipedia article ville
- Site office tourisme

**Objectif :** Données démographiques + quartiers officiels

#### Actions :

**A. Données démographiques**
```markdown
## Données [Ville]

**Démographie :**
- Population : XXX XXX habitants (source : Wikipedia/INSEE, [année])
- Métropole : XXX XXX habitants ([X] communes)
- Étudiants : XX XXX (source : [université], [année])

**Transport :**
- Métro : [X] lignes, [X] stations
- Tramway : [X] lignes
- Gares : [liste]
- Aéroport : [nom], [distance centre]

**Autoroutes :**
- [AX] : [destination]
- [AX] : [destination]
```

**B. Quartiers officiels**
```markdown
## Quartiers [Ville]

### Centre Historique
- [Nom quartier 1] : [Caractéristiques]
- [Nom quartier 2] : [Caractéristiques]

### Quartiers Résidentiels
- [Nom quartier 3] : [Caractéristiques]
- [Nom quartier 4] : [Caractéristiques]

### Quartiers d'Affaires
- [Nom quartier 5] : [Caractéristiques]

### Quartiers Étudiants
- [Nom quartier 6] : [Caractéristiques]

### Quartiers Périphériques
- [Nom quartier 7] : [Caractéristiques]
```

**C. Contraintes urbaines**
```markdown
## Contraintes Déménagement [Ville]

**Accès difficiles :**
- Centre historique : rues pavées/étroites ([noms rues])
- Zones piétonnes : [liste zones]
- Stationnement réglementé : [quartiers concernés]

**Autorisations :**
- Stationnement déménagement : nécessaire dans [zones]
- Contact mairie : [URL/téléphone]
- Délai obtention : [X] jours ouvrés
```

**Livrable :** Fichier `donnees-urbaines-[ville].md`

---

### 3. Sites Déménageurs Locaux (40 min/ville)

**Objectif :** Prix réels locaux + exemples concrets

#### Actions :

**A. Visiter 5-10 sites de déménageurs locaux**
1. Prendre les déménageurs identifiés Google Maps
2. Visiter leurs sites web
3. Chercher :
   - Grilles tarifaires (si affichées)
   - Exemples de prix (témoignages clients)
   - Fourchettes indicatives
   - Services spécifiques [Ville]

**B. Collecter fourchettes de prix**
```markdown
## Prix Déménageurs [Ville]

**Studio/T1 (15-20m³) :**
- Fourchette observée : XXX-XXX€
- Source 1 : [Déménageur A] - XXX€ (site web, [date])
- Source 2 : [Déménageur B] - XXX-XXX€ (devis en ligne, [date])
- Source 3 : [Comparateur] - XXX€ moyenne (URL, [date])

**T2/T3 (30-40m³) :**
- Fourchette : XXX-XXX€
- Sources : [mêmes types sources]

**Maison 4-5 pièces (60-80m³) :**
- Fourchette : XXX-XXX€
- Sources : [mêmes types sources]

**Services spécifiques [Ville] :**
- Monte-meuble : XXX-XXX€/intervention
- Autorisation stationnement incluse : oui/non
- Supplément centre historique : +XX%
- Supplément étage sans ascenseur : +XX€/étage
```

**C. Cas d'usage locaux**
```markdown
## Exemples Concrets [Ville]

**Cas 1 :** Déménagement T2 [Quartier A] → [Quartier B]
- Volume : 35m³
- Distance : Xkm
- Contraintes : 3ème étage sans ascenseur départ
- Prix observé : XXX€
- Source : [Déménageur X, avis Google, [date]]

**Cas 2 :** Déménagement studio centre-ville
- [Détails similaires]
```

**Livrable :** Fichier `prix-locaux-[ville].md`

---

### 4. Garde-Meubles & Self-Stockage (30 min/ville)

**Objectif :** Prix stockage locaux + acteurs

#### Actions :

**A. Visiter sites des acteurs identifiés**

Principaux acteurs nationaux à vérifier :
- Homebox
- Une Pièce en Plus
- Shurgard (si présent)
- Lok'n Store
- + acteurs locaux Google Maps

**B. Collecter tarifs**
```markdown
## Prix Garde-Meuble [Ville]

### Self-Stockage

**[Acteur 1] - [Quartier]**
- 1m² : XX€/mois
- 5m² : XX€/mois
- 10m² : XX€/mois
- Source : [URL tarifs], [date]
- Adresse : [Adresse complète]

**[Acteur 2] - [Quartier]**
- [Même structure]

**[Acteur 3] - [Quartier]**
- [Même structure]

### Garde-Meuble Traditionnel

**[Acteur 4] - [Quartier]**
- Prix moyen : XX€/m³/mois
- Minimum : Xm³
- Source : [Site web/devis, date]

**Fourchettes globales [Ville] :**
- Self-stockage : XX-XX€/m²/mois
- Garde-meuble : XX-XX€/m³/mois
- Quartiers les moins chers : [Liste]
- Quartiers les plus chers : [Liste]
```

**Livrable :** Fichier `stockage-[ville].md`

---

### 5. Location de Camions (20 min/ville)

**Objectif :** Prix location locaux + agences

#### Actions :

**A. Identifier agences par quartier**
```markdown
## Location Camion [Ville]

### Agences par Type

**Loueurs Généralistes :**
- Europcar : [Adresses à [Ville]]
- Sixt : [Adresses]
- Hertz : [Adresses]

**Grandes Surfaces :**
- Leclerc Location : [Si présent]
- Carrefour : [Si présent]

**Spécialistes :**
- Ucar : [Adresses]
- Rent a Car : [Adresses]

**Acteurs Locaux :**
- [Nom local 1] : [Adresse]
- [Nom local 2] : [Adresse]
```

**B. Collecter tarifs types**
```markdown
## Prix Location Utilitaire [Ville]

**12m³ (type Kangoo/Partner) :**
- Journée : XX-XX€
- Weekend : XX-XX€
- Semaine : XX-XX€

**20m³ (type Master/Boxer) :**
- Journée : XX-XX€
- Weekend : XX-XX€
- Semaine : XX-XX€

**Fourchette moyenne [Ville] :** XX-XX€/jour

**Spécificités locales :**
- Caution : XXX-XXX€
- Km inclus : XXX km/jour
- Carburant : [Plein/Plein]
- Assurances : XX-XX€/jour
```

**Livrable :** Fichier `location-vehicules-[ville].md`

---

### 6. Forums & Avis (15 min/ville)

**Objectif :** Témoignages vérifiables + pain points locaux

#### Sources :

- Google Avis (déménageurs locaux)
- Trustpilot
- Forums locaux ville
- Groupes Facebook "[Ville] déménagement"

#### Actions :

**A. Identifier problématiques locales récurrentes**
```markdown
## Problématiques Récurrentes [Ville]

**Stationnement :**
- "Impossible stationner [Quartier X]" ([X] mentions)
- "Autorisation mairie délai long" ([X] mentions)
- "PV pendant déménagement [Zone Y]" ([X] mentions)

**Accès difficiles :**
- "Rues trop étroites [Centre-Ville]" ([X] mentions)
- "Monte-meuble obligatoire [Quartier Z]" ([X] mentions)
- "Escaliers anciens [Vieux [Ville]]" ([X] mentions)

**Prix :**
- "Surpris par surcoût [spécificité locale]" ([X] mentions)
- "[Service X] plus cher qu'ailleurs" ([X] mentions)
```

**B. Collecter citations utilisables**
```markdown
## Citations Vérifiables

**Sur les prix :**
> "J'ai payé XXX€ pour un T2 de [Quartier A] à [Quartier B]"
> — Avis Google [Déménageur X], [date]

**Sur les contraintes :**
> "Le [spécificité locale] a ajouté XX€ à mon devis"
> — Avis Trustpilot [Déménageur Y], [date]
```

**Livrable :** Fichier `temoignages-[ville].md`

---

### 7. Deep Search par Pilier/Satellite

**Pour articles satellites spécifiques, recherches ciblées :**

#### Exemple : Satellite "Déménagement Piano [Ville]"

**Recherches spécifiques :**
1. "déménageur piano [ville]" → identifier spécialistes
2. "transport piano [ville]" → prix observés
3. "conservatoire [ville]" → acteurs institutionnels
4. "magasin piano [ville]" → partenaires potentiels
5. "piano occasion [ville]" → contexte marché local

**Données à collecter :**
```markdown
## Piano [Ville] - Données Locales

**Déménageurs spécialisés piano :**
- [Nom 1] : [Adresse], [Avis]
- [Nom 2] : [Adresse], [Avis]

**Prix observés piano [Ville] :**
- Piano droit : XXX-XXX€
- Piano queue : XXX-XXX€
- Supplément étage : +XX€
- Source : [Avis Google déménageur X, date]

**Institutions musicales [Ville] :**
- Conservatoire : [Nom], [Adresse]
- Écoles de musique : [X] établissements
- Salles concert : [Liste]

**Contexte local :**
- [Ville] compte XXX pianistes (estimation)
- [Événement musical local si pertinent]
```

---

## 📊 Template de Fiche Locale Complète

### Créer AVANT briefs satellites

```markdown
# Fiche Locale Complète - [Ville]

**Date création :** [Date]
**Dernière mise à jour :** [Date]

---

## 📍 Données Urbaines

**Démographie :**
- Population : XXX XXX habitants
- Métropole : XXX XXX habitants ([X] communes)
- Étudiants : XX XXX
- Taux mobilité résidentielle : XX%

**Transport :**
- Métro : [X] lignes
- Tramway : [X] lignes
- Gares : [Liste]
- Aéroport : [Nom], [distance]

---

## 🏘️ Quartiers (TOP 15)

### [Quartier 1] - [Type]
- **Caractéristiques :** [Description]
- **Population :** ~XX XXX hab
- **Logements :** Majoritairement [type]
- **Contraintes déménagement :** [Détails]
- **Accès :** [Facile/Moyen/Difficile]

### [Quartier 2] - [Type]
[Même structure × 15]

---

## 💼 Acteurs Locaux

### Déménageurs (TOP 20)

| Nom | Quartier | Note | Avis | Site |
|-----|----------|------|------|------|
| [Nom 1] | [Quartier] | 4.8/5 | 215 | [URL] |
| [Nom 2] | [Quartier] | 4.6/5 | 187 | [URL] |
| ... | ... | ... | ... | ... |

### Garde-Meubles (TOP 10)

| Nom | Type | Quartier | Tarifs | Site |
|-----|------|----------|--------|------|
| [Nom 1] | Self-stockage | [Q] | XX€/m² | [URL] |
| [Nom 2] | Traditionnel | [Q] | XX€/m³ | [URL] |
| ... | ... | ... | ... | ... |

### Location Véhicules (TOP 10)

| Enseigne | Adresses [Ville] | Tel |
|----------|------------------|-----|
| Europcar | [Liste adresses] | [X] agences |
| Sixt | [Liste adresses] | [X] agences |
| ... | ... | ... |

---

## 💰 Prix Locaux Vérifiés

### Déménagement Standard

**Studio/T1 (15-20m³) :**
- Min observé : XXX€
- Max observé : XXX€
- Moyenne : XXX€
- Sources : [Liste 3-5 sources avec dates]

**T2/T3 (30-40m³) :**
- Min : XXX€
- Max : XXX€
- Moyenne : XXX€
- Sources : [Liste]

**Maison (60-80m³) :**
- Min : XXX€
- Max : XXX€
- Moyenne : XXX€
- Sources : [Liste]

### Services Additionnels

**Monte-meuble :**
- Prix [Ville] : XXX-XXX€
- Sources : [Liste]

**Emballage :**
- Forfait studio : XXX€
- Forfait T3 : XXX€
- Sources : [Liste]

**Garde-meuble :**
- Self-stockage : XX-XX€/m²/mois
- Traditionnel : XX-XX€/m³/mois
- Sources : [Liste]

**Location camion :**
- 12m³ jour : XX-XX€
- 20m³ jour : XX-XX€
- Sources : [Liste]

---

## 🚧 Contraintes Locales

### Accès Difficiles

**Centre historique :**
- Rues concernées : [Liste]
- Largeur minimale : Xm
- Stationnement : Réglementé
- Solution : Monte-meuble + porteurs

**Zones piétonnes :**
- [Zone 1] : [Détails accès]
- [Zone 2] : [Détails accès]

**Quartiers à forte densité :**
- [Quartier X] : Stationnement très difficile
- [Quartier Y] : Rues étroites

### Autorisations & Réglementations

**Stationnement déménagement :**
- Nécessaire dans : [Liste quartiers]
- Demande : Mairie [Ville], service [X]
- Délai : [X] jours ouvrés
- Coût : XX€ (si applicable)
- Contact : [Tel/Email]

**Restrictions circulation :**
- Zones ZFE : [Si applicable]
- Jours de marché : [Liste + quartiers]
- Heures interdites : [Si applicable]

---

## 📅 Saisonnalité

### Pics déménagement [Ville]

**Rentrée universitaire :**
- Dates : [Fin août - début septembre]
- Impact : +XX% demande
- Quartiers concernés : [Liste quartiers étudiants]

**Fin de bail résidentiels :**
- Pics : [Fin mars, fin juin, fin septembre]
- Impact : Tarifs +XX%

**Événements locaux :**
- [Événement 1] : [Impact déménagement]
- [Événement 2] : [Impact]

---

## 🎯 Spécificités [Ville]

**Points uniques à mentionner dans articles :**

1. [Spécificité 1 qui différencie cette ville]
   - Détails
   - Impact déménagement

2. [Spécificité 2]
   - Détails
   - Impact déménagement

3. [Spécificité 3]
   - Détails
   - Impact déménagement

---

## 💬 Témoignages & Citations Vérifiables

### Sur les prix

> "[Citation exacte avec prix]"
> — Source : [Avis Google Déménageur X, date]

> "[Citation 2]"
> — Source : [Trustpilot Déménageur Y, date]

### Sur les contraintes

> "[Citation sur difficulté locale]"
> — Source : [Forum/Avis, date]

---

## 📚 Sources Complètes

**Données démographiques :**
- Wikipedia [Ville] (consulté le [date])
- INSEE [Ville] (données [année])

**Acteurs locaux :**
- Google Maps (recherches [dates])
- Pages Jaunes (consulté le [date])

**Prix :**
- [Déménageur A] : [URL], consulté le [date]
- [Déménageur B] : [URL], consulté le [date]
- [Comparateur X] : [URL], consulté le [date]

**Contraintes :**
- Site mairie [Ville] : [URL], consulté le [date]
- Avis Google : analysés le [date]

---

## ✅ Checklist Complétude

- [ ] 15+ quartiers documentés
- [ ] 20+ déménageurs identifiés
- [ ] 10+ garde-meubles référencés
- [ ] Prix vérifiés (3+ sources par catégorie)
- [ ] Contraintes locales documentées
- [ ] Autorisations mairie vérifiées
- [ ] 5+ citations utilisables
- [ ] Toutes sources datées

**Statut :** ✅ Complet / ⚠️ À compléter / ❌ À faire
```

---

## 🔄 Intégration dans le Workflow

### PHASE 1 : Deep Search Locale (NOUVEAU - AVANT briefs)

**Timing :** 1 journée complète par ville (8h)

**Étapes :**
1. **Matin (4h) :** Recherches générales ville
   - Google Maps acteurs locaux
   - Sites municipaux données urbaines
   - Quartiers identification

2. **Après-midi (4h) :** Recherches prix & contraintes
   - Sites déménageurs prix
   - Garde-meubles tarifs
   - Forums & avis
   - Compilation fiche locale

**Livrable :** `fiche-locale-[ville].md` complète

---

### PHASE 2 : Création Briefs Satellites (ADAPTÉ)

**Pour chaque satellite, utiliser la fiche locale :**

```markdown
## 📊 Données Locales Obligatoires (issues fiche)

### Quartiers à Mentionner (3-5)
- [Quartier 1] : [Pourquoi pertinent pour ce satellite]
- [Quartier 2] : [Contexte d'utilisation]
- [Quartier 3] : [Exemple concret]

### Acteurs Locaux à Citer (2-3)
- [Déménageur A] : [Contexte mention]
- [Garde-meuble B] : [Exemple prix]

### Prix Locaux (3-5 données)
- [Prix 1] : XXX€ (source fiche locale)
- [Prix 2] : XX€/m² (source fiche locale)

### Contraintes Locales (1-2)
- [Contrainte spécifique ville]
- [Exemple concret quartier]

### Citations Vérifiables (1-2)
- "[Citation issue fiche locale]"
```

---

## 🎯 Règles d'Or Localisation

### ✅ CE QU'IL FAUT

**1. Être ultra-spécifique**
```markdown
❌ "Les quartiers de Lyon"
✅ "Le Vieux-Lyon, avec ses rues pavées étroites, et la Presqu'île"

❌ "Un déménageur local"
✅ "Des déménageurs lyonnais comme [Nom réel], basé dans le 3ème arrondissement"

❌ "Le prix varie"
✅ "À Lyon, comptez 450-750€ pour un T2 (sources : [Déménageur A], [Comparateur B], janvier 2025)"
```

**2. Utiliser données fiche locale systématiquement**
- Minimum 3 quartiers nommés par article
- Minimum 2 acteurs locaux cités
- Minimum 3 prix locaux sourcés
- Minimum 1 contrainte locale détaillée

**3. Varier les quartiers entre satellites**
- Satellite 1 : Quartiers A, B, C
- Satellite 2 : Quartiers D, E, F
- Satellite 3 : Quartiers A, G, H
→ Couvrir les 15 quartiers sur les 10 satellites

### ❌ CE QU'IL NE FAUT PAS

**1. Contenu générique recyclable**
```markdown
❌ "Lyon est une grande ville dynamique avec de nombreux quartiers"
→ Inutile, vide, recyclable

❌ "Les prix varient selon le volume et la distance"
→ Évident, pas spécifique Lyon

❌ "Il existe plusieurs déménageurs à Lyon"
→ Creux, aucune valeur ajoutée
```

**2. Inventer des détails**
```markdown
❌ "Le déménageur XYZ, reconnu à Lyon..."
→ Si XYZ n'existe pas ou pas vérifié

❌ "Un T2 coûte environ 600€ à Lyon"
→ Si pas de source pour ce chiffre

❌ "Le quartier de la Part-Dieu est réputé pour..."
→ Si affirmation non vérifiée
```

**3. Mentionner ville juste dans titre**
```markdown
❌ Titre : "Prix Déménagement Lyon"
    Contenu : [Générique France entière sans mention Lyon]

✅ Titre : "Prix Déménagement Lyon"
    Contenu : "À Lyon, les tarifs varient de 450€ (studio Villeurbanne)
    à 2500€ (maison Caluire). Les quartiers du centre (Presqu'île,
    Vieux-Lyon) coûtent 15-20% plus cher en raison des accès difficiles..."
```

---

## 📈 KPIs Localisation

### Par Article

**Minimum requis :**
- [ ] 3+ quartiers nommés précisément
- [ ] 2+ acteurs locaux cités (vérifiables)
- [ ] 3+ prix locaux avec sources
- [ ] 1+ contrainte locale détaillée
- [ ] 1+ citation/témoignage local (optionnel)

**Score localisation cible :** ≥ 8/10

### Par Ville (100 satellites)

**Couverture géographique :**
- [ ] 15 quartiers principaux tous mentionnés
- [ ] 20+ déménageurs locaux cités (variés)
- [ ] 10+ garde-meubles référencés
- [ ] Prix locaux documentés (toutes catégories)

---

## 🚀 Quick Start

**Pour démarrer immédiatement sur Lyon :**

**Jour 1 (8h) :**
1. [9h-11h] Google Maps Lyon :
   - Déménageurs (20 premiers)
   - Garde-meubles (10 premiers)
   - Location véhicules (10 agences)

2. [11h-13h] Sites municipaux :
   - Wikipedia Lyon (données démo)
   - lyon.fr (quartiers officiels)
   - Transports TCL (infra)

3. [14h-16h] Prix déménageurs :
   - Visiter 10 sites déménageurs
   - Noter fourchettes prix
   - Exemples concrets

4. [16h-18h] Compilation :
   - Créer `fiche-locale-lyon.md`
   - Vérifier checklist complétude

**Jour 2+ :** Créer briefs satellites en utilisant fiche

---

## ✅ Checklist Finale

**Avant de créer les briefs satellites :**

- [ ] Fiche locale ville complète (8/8 sections)
- [ ] 15+ quartiers documentés avec caractéristiques
- [ ] 20+ acteurs locaux vérifiés (Google Maps)
- [ ] Prix locaux sourcés (3+ sources par catégorie)
- [ ] Contraintes identifiées (accès, autorisations, etc.)
- [ ] 5+ citations vérifiables collectées
- [ ] Toutes données datées (mois/année)

**Si 7/7 OK → Prêt pour création briefs satellites**

---

**Document créé par :** Direction SEO Moverz  
**Version :** 1.0  
**Date :** 13 octobre 2025  
**PRIORITÉ :** 🔥 CRITIQUE - À faire AVANT tout brief satellite

