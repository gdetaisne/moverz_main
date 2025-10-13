# 🚀 Guide de Démarrage - Production Articles Satellites

**Objectif :** Produire 900 articles satellites de qualité exceptionnelle (10 piliers × 10 satellites × 9 villes)

---

## 📚 Documents de Référence

Avant de commencer, familiarisez-vous avec :

1. **`PROCEDURE-ARTICLES-SATELLITES.md`** → Procédure complète détaillée
2. **`TEMPLATE-BRIEF-SATELLITE.md`** → Template de brief à utiliser
3. **`PROMPT-GENERATION-SATELLITE.md`** → Prompt pour Cursor
4. **`SEO Guidelines - Feuille 1.csv`** → Briefs piliers + mots-clés

---

## 🎯 Vue d'Ensemble du Workflow

```
PHASE 1                    PHASE 2                    PHASE 3
Directeur SEO              Utilisateur                Directeur SEO
    |                          |                          |
    | 1. Deep Search           |                          |
    | 2. Identifier            |                          |
    |    10 sous-requêtes      |                          |
    | 3. Créer 10 briefs       |                          |
    |    satellites            |                          |
    |                          |                          |
    └──────► [Briefs prêts] ──┤                          |
                               |                          |
                               | 1. Charger brief         |
                               | 2. Générer article       |
                               | 3. Sauvegarder           |
                               | (× 10 satellites)        |
                               |                          |
                               └──► [Articles générés] ──┤
                                                          |
                                                          | 1. Valider qualité
                                                          | 2. Demander corrections
                                                          | 3. Approuver
                                                          | (× 10 satellites)
                                                          |
                                                          └──► [Satellites validés] ✅
```

**Durée par pilier (10 satellites) :**
- Phase 1 (moi) : 2-3 jours
- Phase 2 (vous) : 3-5 jours  
- Phase 3 (moi) : 2-3 jours

**Total : 7-11 jours par pilier complet**

---

## 🗂️ Structure des Dossiers

```
seo-briefs/
├── [ville]/
│   ├── piliers/
│   │   ├── 01-[pilier].md (brief pilier CSV)
│   │   ├── 02-[pilier].md
│   │   └── ...
│   └── satellites/
│       ├── [pilier-1]/
│       │   ├── brief-satellite-01-[titre].md
│       │   ├── brief-satellite-02-[titre].md
│       │   ├── ...
│       │   ├── brief-satellite-10-[titre].md
│       │   └── sources-globales.md
│       ├── [pilier-2]/
│       │   └── [10 briefs satellites]
│       └── ...

sites/
├── [ville]/
│   └── content/
│       └── blog/
│           ├── piliers/
│           │   ├── [pilier-1].md (article pilier publié)
│           │   └── ...
│           └── satellites/
│               ├── [article-satellite-01].md
│               ├── [article-satellite-02].md
│               └── ...
```

---

## 🔄 Procédure Détaillée Étape par Étape

### ═══════════════════════════════════════
### PHASE 1 : Création des Briefs Satellites
### ═══════════════════════════════════════

**Responsable :** Directeur SEO (moi)  
**Durée :** 2-3 jours par pilier

#### Étape 1.1 : Deep Search Globale (Jour 1 matin)

**Objectif :** Identifier 30-50 sous-requêtes potentielles pour le pilier

**Actions :**

1. **Lire le brief pilier CSV** :
   ```bash
   Ouvrir : seo-briefs/[ville]/[XX]-[pilier-ville].md
   ```
   - Noter les 40-50 mots sémantiques
   - Identifier le volume et l'intention principale

2. **Deep Search via outils SEO** :
   - Google Suggest : Taper "[pilier] [ville]" et noter suggestions
   - AlsoAsked.com : Questions fréquentes
   - AnswerThePublic : Visualisation requêtes longue traîne
   - Top 10 Google : Analyser sous-sujets traités par concurrents

3. **Créer liste brute** :
   ```markdown
   ## Sous-requêtes potentielles - [Pilier] [Ville]
   
   ### Haute priorité (volume 50+/mois)
   1. [sous-requête] - [volume] - [source]
   2. [sous-requête] - [volume] - [source]
   ...
   
   ### Moyenne priorité (volume 20-50/mois)
   1. [sous-requête] - [volume estimé] - [source]
   ...
   
   ### Longue traîne (volume < 20/mois mais pertinent)
   1. [sous-requête] - [pertinence]
   ...
   ```

**Livrable :** Liste de 30-50 sous-requêtes classées

---

#### Étape 1.2 : Sélection des 10 Meilleures (Jour 1 après-midi)

**Objectif :** Choisir les 10 sous-requêtes qui deviendront des satellites

**Critères de sélection :**

1. **Volume de recherche** : Min 20/mois (ou forte pertinence stratégique)
2. **Intention claire** : Informationnelle ou transactionnelle
3. **Angle local** : Peut être localisé à [Ville]
4. **Complémentarité** : Couvre un aspect unique du pilier
5. **Potentiel narratif** : Permet un article riche (1200-1800 mots)
6. **Mots-clés CSV** : Au moins 3-5 mots sémantiques pilier applicables
7. **Pas de cannibalisation** : N'empiète pas sur le pilier ou autres satellites

**Actions :**

1. Trier les 30-50 sous-requêtes selon critères
2. Sélectionner **Top 10**
3. Vérifier qu'elles couvrent tous les aspects du pilier :
   - Aspect prix/tarifs (1-2 satellites)
   - Aspect pratique/comment-faire (2-3 satellites)
   - Aspect comparatif/choix (1-2 satellites)
   - Questions spécifiques (2-3 satellites)
   - Cas d'usage particuliers (1-2 satellites)

**Livrable :** Liste finale de 10 sous-requêtes avec justification

---

#### Étape 1.3 : Deep Search Spécifique par Satellite (Jour 2 matin → soir)

**Objectif :** Collecter 5+ données chiffrées sourcées pour chaque satellite

**Pour chaque des 10 satellites :**

**Actions (20-30 min par satellite) :**

1. **Recherche de données chiffrées** :
   - Prix moyens (sites déménageurs locaux, comparateurs)
   - Statistiques sectorielles (études de marché, INSEE)
   - Données locales [Ville] (mairie, statistiques urbaines)
   - Témoignages chiffrés (forums, avis vérifiés)
   - Comparaisons factuelles (différents acteurs, quartiers)

2. **Sourcer rigoureusement** :
   ```markdown
   ### Données Satellite 1 : [Titre]
   
   1. **Prix moyen [service] à [Ville]**
      - Chiffre : 450-750€
      - Source : Comparateur-demenagement.fr
      - URL : https://...
      - Date : Janvier 2025
   
   2. **Statistique [aspect]**
      - Chiffre : 68% des utilisateurs...
      - Source : Étude IFOP Déménagement 2024
      - URL : https://...
      - Date : Décembre 2024
   
   [etc. jusqu'à 5-7 données]
   ```

3. **Identifier exemples concrets [Ville]** :
   - Quartiers spécifiques (noms vérifiés)
   - Acteurs locaux (entreprises réelles, accessibles)
   - Contraintes locales (rues étroites, stationnement, etc.)

**Livrable :** Dossier `sources-globales.md` avec toutes les données des 10 satellites

---

#### Étape 1.4 : Rédaction des 10 Briefs Satellites (Jour 3)

**Objectif :** Créer les 10 briefs détaillés suivant le template

**Actions (30-45 min par brief) :**

1. **Copier le template** :
   ```bash
   cp seo-briefs/TEMPLATE-BRIEF-SATELLITE.md \
      seo-briefs/[ville]/satellites/[pilier]/brief-satellite-01-[titre].md
   ```

2. **Remplir toutes les sections** :
   - Contexte & positionnement
   - Intention de recherche
   - Mots-clés (principaux, secondaires, sémantiques CSV)
   - 5-7 données chiffrées sourcées
   - Structure narrative détaillée (H2/H3 avec contenus attendus)
   - FAQ (5-7 questions ultra-précises)
   - Maillage interne (ancres vers pilier)
   - Ton & style (rappels contraintes)
   - Front matter complet

3. **Vérifier checklist** :
   - [ ] Deep search effectuée
   - [ ] 5+ données sourcées
   - [ ] 10-15 mots sémantiques CSV intégrés
   - [ ] Structure narrative claire
   - [ ] Spécificités [Ville] présentes
   - [ ] FAQ avec questions précises
   - [ ] Maillage interne défini
   - [ ] Longueur 1200-1800 mots faisable

**Livrable :** 10 fichiers `brief-satellite-[01-10].md` prêts pour production

---

### ═══════════════════════════════════════
### PHASE 2 : Génération des Articles
### ═══════════════════════════════════════

**Responsable :** Utilisateur (vous)  
**Durée :** 3-5 jours par pilier (10 satellites)

#### Étape 2.1 : Préparation Cursor (Jour 1 matin)

**Actions :**

1. **Ouvrir nouveau chat Cursor** :
   - Nom : "Satellites [Ville] - [Pilier]"

2. **Charger contexte** :
   ```
   Lis d'abord ces fichiers pour contexte :
   
   1. Brief pilier CSV :
   seo-briefs/[ville]/[XX]-[pilier-ville].md
   
   2. Article pilier publié :
   sites/[ville]/content/blog/piliers/[pilier].md
   
   Tu vas rédiger 10 articles satellites pour ce pilier.
   Prêt à démarrer ?
   ```

3. **Attendre confirmation** Cursor

---

#### Étape 2.2 : Génération Satellite par Satellite (Jours 1-5)

**Rythme conseillé :** 2-3 satellites/jour

**Pour chaque satellite (X/10) :**

**Actions (15-30 min par satellite) :**

1. **Copier le prompt de génération** :
   ```bash
   Ouvrir : seo-briefs/PROMPT-GENERATION-SATELLITE.md
   Copier le "Prompt Standard"
   ```

2. **Adapter les variables** :
   - Remplacer `[ville]` par le nom exact
   - Remplacer `[pilier]` par le nom exact
   - Remplacer `[XX]` par le numéro (01, 02, ..., 10)

3. **Coller dans Cursor et exécuter**

4. **Attendre génération** (5-15 minutes)

5. **Lecture rapide de contrôle** (3-5 min) :
   - [ ] Longueur 1200-1800 mots ?
   - [ ] Structure H2/H3 présente ?
   - [ ] 3-5 chiffres visibles ?
   - [ ] Mentions [Ville] présentes ?
   - [ ] FAQ en fin d'article ?
   - [ ] Front matter complet ?

6. **Sauvegarder** :
   ```bash
   Créer : sites/[ville]/content/blog/satellites/[slug-article].md
   Copier-coller le contenu généré
   ```

7. **Si OK** : Passer au suivant  
   **Si problème** : Utiliser un prompt d'ajustement (voir PROMPT-GENERATION-SATELLITE.md)

---

#### Étape 2.3 : Feedback Continu (Entre chaque génération)

**Améliorer la qualité progressivement :**

**Si article excellent** :
```
Excellent ! Continue sur cette qualité pour le satellite suivant.
Conserve cette fluidité narrative et cette richesse de détails.
```

**Si défaut mineur** :
```
Bon travail ! Pour le prochain, attention à [point précis].
Exemple : "Évite de commencer 2 paragraphes par 'En effet,'".
```

**Si défaut majeur** :
- Utiliser un prompt d'ajustement spécifique (trop court, trop de listes, manque données, etc.)
- Voir section "Prompts d'Ajustement Rapide" dans PROMPT-GENERATION-SATELLITE.md

---

#### Étape 2.4 : Fin de Série (Jour 5)

**Après 10 satellites générés :**

1. **Récapitulatif dans Cursor** :
   ```
   Tu viens de terminer 10 satellites pour [Pilier] [Ville].
   
   Récapitulatif :
   - Satellites générés : 10/10 ✅
   - Longueur moyenne : [calculer manuellement]
   - Thématiques couvertes : [lister]
   
   Bravo ! Cette série est envoyée pour validation SEO.
   ```

2. **Auto-vérification rapide** (30 min pour les 10) :
   - Tous les fichiers sauvegardés ?
   - Noms de fichiers cohérents ?
   - Front matter présent partout ?
   - Aucun placeholder `[Ville]` ou `[Prix]` non remplacé ?

3. **Notifier le directeur SEO** :
   ```
   Série [Pilier] [Ville] terminée.
   10 satellites générés prêts pour validation.
   
   Dossier : sites/[ville]/content/blog/satellites/
   Fichiers : [slug-01].md à [slug-10].md
   ```

---

### ═══════════════════════════════════════
### PHASE 3 : Validation & Corrections
### ═══════════════════════════════════════

**Responsable :** Directeur SEO (moi)  
**Durée :** 2-3 jours par pilier

#### Étape 3.1 : Validation Article par Article (10-15 min/article)

**Pour chaque satellite :**

**Actions :**

1. **Lecture attentive** (5 min)
2. **Checklist de validation** (5 min) :
   - [ ] Structure respectée
   - [ ] Longueur 1200-1800 mots
   - [ ] 5+ données chiffrées sourcées
   - [ ] Mots-clés CSV intégrés naturellement
   - [ ] Spécificités [Ville] présentes (quartiers, acteurs)
   - [ ] Narratif fluide (pas trop de listes)
   - [ ] FAQ complète (5-7 questions)
   - [ ] Maillage interne (2-3 liens pilier)
   - [ ] Front matter complet
   - [ ] ZÉRO donnée inventée détectée

3. **Verdict :** 
   - ✅ **Validé** : Marquer comme prêt à publier
   - ⚠️ **À ajuster** : Noter corrections mineures nécessaires
   - ❌ **À refaire** : Brief à affiner et regénérer

---

#### Étape 3.2 : Rapport de Validation (Jour 2)

**Créer rapport détaillé** :

```markdown
# Rapport Validation - [Pilier] [Ville]

**Date :** [Date]  
**Satellites validés :** X/10

---

## Satellites Validés ✅ (X)

| # | Titre | Mots | Note /10 | Commentaire |
|---|-------|------|----------|-------------|
| 01 | [Titre] | 1450 | 9/10 | Excellent, narratif fluide |
| 02 | [Titre] | 1620 | 8/10 | Bon, légère répétition Section 2 |
| ... | ... | ... | ... | ... |

---

## Satellites À Ajuster ⚠️ (X)

### Satellite 03 : [Titre]

**Problèmes identifiés :**
1. Manque 2 données chiffrées (seulement 3/5)
2. Section 3 trop de listes (40% du contenu)
3. FAQ : question 2 trop générique

**Corrections demandées :**
1. Ajouter 2 chiffres sources dans Section 2 (voir brief)
2. Transformer listes Section 3 en paragraphes
3. FAQ Q2 : Spécifier "[Question ultra-précise]"

**Délai :** 24-48h

---

## Satellites À Refaire ❌ (X)

### Satellite 07 : [Titre]

**Raisons du refus :**
1. Contenu trop générique (recyclable autre ville)
2. Données inventées détectées (prix non sourcés)
3. Pas de mentions quartiers [Ville]

**Actions :**
1. Brief à enrichir avec +3 données [Ville]
2. Régénération complète nécessaire

**Délai :** 1 semaine

---

## Statistiques Globales

- **Taux validation directe :** X/10 (X%)
- **Longueur moyenne :** XXXX mots
- **Note moyenne :** X,X/10
- **Temps validation total :** XX heures

---

## Prochaines Étapes

1. [ ] Corrections mineures (Satellites X, X, X)
2. [ ] Régénération refusés (Satellites X)
3. [ ] Publication après OK (Satellites validés)
```

---

#### Étape 3.3 : Accompagnement Corrections (Jour 3)

**Pour satellites à ajuster :**

1. **Transmettre rapport** à l'utilisateur
2. **Fournir exemples concrets** de corrections
3. **Valider après ajustements** (2ème passe généralement OK)

**Pour satellites refusés :**

1. **Analyser pourquoi le brief était insuffisant**
2. **Enrichir le brief** (+ données, + spécificités ville)
3. **Demander régénération** complète

---

#### Étape 3.4 : Validation Finale (Jour 3 fin)

**Quand tous les 10 satellites OK :**

```markdown
# ✅ VALIDATION FINALE - [Pilier] [Ville]

**Date :** [Date]  
**Statut :** 10/10 satellites validés

---

## Récapitulatif Qualité

- **Note moyenne :** 8,5/10 ⭐
- **Longueur moyenne :** 1520 mots ✅
- **Données sourcées :** 62 au total (6,2/article) ✅
- **Spécificités [Ville] :** 38 mentions ✅
- **Maillage interne :** 27 liens pilier ✅

---

## Prêt pour Publication

✅ Tous les articles peuvent être publiés  
✅ Cocon sémantique complet et cohérent  
✅ SEO optimisé et qualité humaine garantie

**Félicitations ! 🎉**

---

## Prochaine Étape

→ Passer au pilier suivant de [Ville]  
ou  
→ Commencer une nouvelle ville
```

---

## 📅 Planning Type - Exemple Lyon

### Mois 1 : Piliers prioritaires (3 piliers = 30 satellites)

**Semaines 1-2 : Pilier "Garde-Meuble Lyon"**
- J1-2 : Deep search + briefs (moi)
- J3-7 : Génération 10 satellites (vous)
- J8-9 : Validation (moi)
- **→ 10 satellites OK**

**Semaines 3-4 : Pilier "Déménageur Lyon"**
- [même process]
- **→ 20 satellites OK cumulés**

**Semaines 5-6 : Pilier "Prix Déménagement Lyon"**
- [même process]
- **→ 30 satellites OK cumulés**

### Mois 2-3 : Compléter Lyon (7 piliers = 70 satellites)

[Répéter le process pour 7 piliers restants]

**Total Lyon après 3 mois :** 100 satellites ✅

---

## ✅ Checklist de Démarrage - Avant de Commencer

**Avant de lancer la production du 1er pilier :**

### Documents
- [ ] J'ai lu PROCEDURE-ARTICLES-SATELLITES.md
- [ ] J'ai lu TEMPLATE-BRIEF-SATELLITE.md
- [ ] J'ai lu PROMPT-GENERATION-SATELLITE.md
- [ ] J'ai lu ce guide (GUIDE-DEMARRAGE-SATELLITES.md)

### Outils & Accès
- [ ] J'ai accès au CSV "SEO Guidelines - Feuille 1.csv"
- [ ] J'ai Cursor installé et configuré
- [ ] J'ai les briefs piliers dans seo-briefs/[ville]/
- [ ] J'ai identifié la ville et le pilier prioritaire

### Compréhension
- [ ] Je comprends le workflow 3 phases
- [ ] Je sais utiliser les templates
- [ ] Je sais adapter les prompts pour Cursor
- [ ] Je connais les critères de validation

### Communication
- [ ] Moyen de contact avec Directeur SEO défini
- [ ] Délais de réponse clarifiés (24-48h questions)
- [ ] Process de validation compris

**Si tous les points sont cochés ✅ → Prêt à démarrer !**

---

## 🎯 Indicateurs de Succès

### Par Pilier (10 satellites)

**Quantité :**
- 10/10 satellites générés ✅
- 10/10 satellites validés ✅

**Qualité moyenne :**
- Note lecture ≥ 8/10 ⭐
- Longueur : 1200-1800 mots par article
- Données sourcées : 5+ par article
- Taux validation directe : ≥ 70%

**Délais :**
- Production complète : 7-11 jours/pilier
- Dont génération : 3-5 jours
- Dont validation : 2-3 jours

### Par Ville (10 piliers = 100 satellites)

**Objectif 3 mois :**
- 100 satellites publiés ✅
- Note moyenne ≥ 8/10
- Cocon sémantique complet
- Maillage interne cohérent

---

## 📞 Support & Questions

### Questions Fréquentes

**Q : Combien de temps prend la génération d'un satellite ?**  
R : 5-15 minutes par Cursor + 5 min contrôle = 10-20 min total

**Q : Puis-je générer les 10 satellites d'un coup ?**  
R : Déconseillé. Préférer par séries de 2-3 pour ajuster la qualité au fur et à mesure.

**Q : Que faire si Cursor invente des données ?**  
R : Utiliser le prompt d'ajustement "Si Cursor hallucine" dans PROMPT-GENERATION-SATELLITE.md

**Q : Puis-je modifier un brief satellite ?**  
R : Oui, si justifié. Contacter le directeur SEO avec la raison et la modification proposée.

**Q : Combien de villes puis-je traiter en parallèle ?**  
R : Maximum 2 villes (2 chats Cursor distincts). Au-delà, risque de baisse de qualité.

---

## 🎉 Félicitations !

Vous avez maintenant toutes les clés pour produire des articles satellites d'exception.

**Prochaine étape concrète :**

1. Choisir **ville** et **pilier prioritaire**
2. Me notifier pour que je démarre Phase 1 (briefs)
3. Attendre mes 10 briefs (2-3 jours)
4. Lancer votre Phase 2 (génération)
5. Itérer jusqu'à 900 satellites ✅

**→ Démarrons avec quel pilier de quelle ville ?**

---

**Guide créé par :** Direction SEO Moverz  
**Version :** 1.0  
**Date :** 13 octobre 2025  
**Contact :** [À définir]

