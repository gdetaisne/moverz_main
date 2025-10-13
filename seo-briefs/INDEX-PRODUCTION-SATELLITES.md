# 📚 Index - Production Articles Satellites

**Mission :** Produire 900 articles satellites de qualité exceptionnelle  
**Organisation :** 10 piliers × 10 satellites × 9 villes  
**Standard :** Contenu narratif, données sourcées, zéro invention

---

## 🗂️ Documents de la Procédure

### 🚀 **Démarrage Rapide**

| Document | Description | Usage | Priorité |
|----------|-------------|-------|----------|
| **QUICK-START-PRODUCTION-PARALLELE.md** | 🔥 Démarrage 3 villes simultanées (5 min) | **LIRE EN PREMIER - Nouvelle approche** | ⭐⭐⭐ |
| **DOCUMENT-MAITRE-PRODUCTION-SATELLITES.md** | 📘 Document central autonome pour Cursor | **Donner à chaque chat Cursor** | ⭐⭐⭐ |
| **COMPTEUR-ARTICLES.md** | 📊 Suivi production 900 satellites en temps réel | **Check quotidien** | ⭐⭐⭐ |
| **INDEX-PRODUCTION-SATELLITES.md** | Ce fichier - Vue d'ensemble de tous les docs | Navigation et référence | ⭐⭐⭐ |

### 📋 **Procédure & Méthodologie**

| Document | Description | Usage | Quand |
|----------|-------------|-------|-------|
| **PROCEDURE-ARTICLES-SATELLITES.md** | Procédure complète détaillée de production | Référence pour comprendre chaque étape | Phase 0-3 |
| **DEEP-SEARCH-LOCALE.md** | 🔥 Collecte données locales par ville | **PHASE 0 OBLIGATOIRE** avant briefs | Directeur SEO |
| **STRATEGIE-MAILLAGE-INTERNE.md** | ⭐ Stratégie complète maillage cocons sémantiques | **CRITIQUE** : Architecture liens | Phase 1-3 |
| **STRATEGIE-FAQ.md** | ⭐ Stratégie FAQ & featured snippets Google | **CRITIQUE** : Optimisation questions/réponses | Phase 1-3 |
| **TEMPLATE-BRIEF-SATELLITE.md** | Template vierge à remplir pour chaque satellite | Phase 1 : Création briefs | Directeur SEO |
| **PROMPT-GENERATION-SATELLITE.md** | Prompt à utiliser dans Cursor + ajustements | Phase 2 : Génération articles | Utilisateur |

### 📊 **Stratégie & Briefs Existants**

| Document | Description | Usage | Disponibilité |
|----------|-------------|-------|---------------|
| **SEO Guidelines - Feuille 1.csv** | Briefs piliers experts (90 piliers) | Extraction mots-clés CSV par pilier | ✅ Existant |
| **seo-briefs/[ville]/[pilier].md** | Briefs piliers individuels (déjà extraits) | Contexte pour satellites | ✅ Existant (9 villes) |
| **seo-briefs/[ville]/satellites/** | Dossiers futurs pour briefs satellites | Stockage briefs satellites | 🔴 À créer |

### 📊 **Suivi & Monitoring**

| Document | Description | Usage | Quand |
|----------|-------------|-------|-------|
| **COMPTEUR-ARTICLES.md** | Compteur principal production | Lecture quotidienne | Tous les jours |
| **update-compteur.sh** | Script mise à jour compteur | Après chaque pilier | Production |
| **stats-rapides.sh** | Vue d'ensemble rapide | Check quotidien | Matin/soir |
| **GUIDE-COMPTEUR.md** | Guide utilisation compteur | Comprendre le système | Une fois |

---

## 🎯 Quel Document Pour Quelle Situation ?

### Je débute et ne connais rien au projet
→ Lire dans l'ordre :
1. **INDEX-PRODUCTION-SATELLITES.md** (ce fichier)
2. **GUIDE-DEMARRAGE-SATELLITES.md**
3. **PROCEDURE-ARTICLES-SATELLITES.md**

### Je suis le Directeur SEO et je vais créer des briefs
→ Utiliser :
1. **PROCEDURE-ARTICLES-SATELLITES.md** (Phase 1)
2. **TEMPLATE-BRIEF-SATELLITE.md** (template à remplir)
3. **SEO Guidelines - Feuille 1.csv** (mots-clés pilier)

### Je suis l'Utilisateur et je vais générer les articles
→ Utiliser :
1. **GUIDE-DEMARRAGE-SATELLITES.md** (workflow complet)
2. **PROMPT-GENERATION-SATELLITE.md** (copier-coller prompts)
3. **Briefs satellites fournis** par le Directeur SEO

### Un article a été refusé en validation
→ Consulter :
1. **PROMPT-GENERATION-SATELLITE.md** (section "Variante 2 : Régénération après refus")
2. **PROCEDURE-ARTICLES-SATELLITES.md** (Phase 3 - Corrections)
3. **Brief satellite** (vérifier si enrichissement nécessaire)

### Je veux comprendre les critères de qualité
→ Lire :
1. **PROCEDURE-ARTICLES-SATELLITES.md** (section "Objectifs Qualité")
2. **TEMPLATE-BRIEF-SATELLITE.md** (section "Ton, Style & Contraintes")
3. **PROMPT-GENERATION-SATELLITE.md** (section "Règles Critiques")

### Je veux comprendre le maillage interne / cocons sémantiques
→ Lire **EN PRIORITÉ** :
1. **STRATEGIE-MAILLAGE-INTERNE.md** (document complet dédié)
2. **PROCEDURE-ARTICLES-SATELLITES.md** (section "Architecture des Cocons")
3. **TEMPLATE-BRIEF-SATELLITE.md** (section "Stratégie de Maillage Interne")

### Je veux optimiser les FAQ pour featured snippets Google
→ Lire **EN PRIORITÉ** :
1. **STRATEGIE-FAQ.md** (document complet dédié)
2. **TEMPLATE-BRIEF-SATELLITE.md** (section "FAQ : Questions Fréquentes")
3. **PROMPT-GENERATION-SATELLITE.md** (instructions FAQ)

### Je cherche des exemples concrets
→ Consulter :
1. **PROCEDURE-ARTICLES-SATELLITES.md** (section "Exemples de Briefs Satellites")
2. **sites/toulouse/content/blog/satellites/** (83 satellites existants)
3. **GUIDE-DEMARRAGE-SATELLITES.md** (section "Planning Type")

---

## 📁 Arborescence Complète des Dossiers

```
moverz_main-4/
│
├── SEO Guidelines - Feuille 1.csv ────────┐ Briefs experts
│                                           │ 90 piliers
├── seo-briefs/                            │
│   ├── INDEX-PRODUCTION-SATELLITES.md ◄───┤ Ce fichier
│   ├── GUIDE-DEMARRAGE-SATELLITES.md      │
│   ├── PROCEDURE-ARTICLES-SATELLITES.md   │
│   ├── TEMPLATE-BRIEF-SATELLITE.md        │
│   ├── PROMPT-GENERATION-SATELLITE.md     │
│   │                                       │
│   ├── [Documents existants]              │
│   ├── README.md                           │
│   ├── DEMARRAGE-RAPIDE.md                │
│   ├── RECAPITULATIF.md                   │
│   ├── STATISTIQUES.md                    │
│   └── TOUTES-LES-VILLES.md               │
│   │                                       │
│   ├── marseille/                          │
│   │   ├── 01-demenagement-marseille-pas-cher.md ◄── Pilier 1
│   │   ├── 02-demenagement-international-marseille.md
│   │   ├── ...                            │
│   │   ├── 10-location-camion-demenagement-marseille.md
│   │   │                                   │
│   │   └── satellites/ ◄──────────────────┤ À créer
│   │       ├── demenagement-pas-cher/     │
│   │       │   ├── brief-satellite-01-[titre].md ◄── Brief sat 1
│   │       │   ├── brief-satellite-02-[titre].md
│   │       │   ├── ...                    │
│   │       │   ├── brief-satellite-10-[titre].md
│   │       │   └── sources-globales.md    │
│   │       │                               │
│   │       ├── demenagement-international/│
│   │       │   └── [10 briefs]            │
│   │       │                               │
│   │       └── ... [8 autres piliers]     │
│   │                                       │
│   ├── lyon/                               │
│   │   ├── [10 piliers]                   │
│   │   └── satellites/                    │
│   │       └── [à créer]                  │
│   │                                       │
│   ├── lille/                              │
│   │   ├── [10 piliers]                   │
│   │   └── satellites/                    │
│   │       └── [à créer]                  │
│   │                                       │
│   └── ... [7 autres villes]              │
│                                           │
└── sites/                                  │
    ├── marseille/                          │
    │   └── content/                        │
    │       └── blog/                       │
    │           ├── piliers/                │
    │           │   ├── demenagement-pas-cher-marseille.md ◄── Article pilier
    │           │   └── ...                 │
    │           │                            │
    │           └── satellites/ ◄───────────┤ Articles finaux
    │               ├── prix-demenagement-studio-marseille.md
    │               ├── comparatif-demenageurs-marseille.md
    │               └── ... [100 satellites]│
    │                                       │
    ├── lyon/                               │
    │   └── content/blog/                   │
    │       ├── piliers/                    │
    │       └── satellites/ [à créer]       │
    │                                       │
    ├── toulouse/ ◄─────────────────────────┤ Référence
    │   └── content/blog/                   │ 93 satellites
    │       ├── piliers/ [10 articles]      │ existants
    │       └── satellites/ [83 articles]   │
    │                                       │
    └── ... [autres villes]                 │
```

---

## 🔄 Workflow Visuel

```
┌─────────────────────────────────────────────────────────────┐
│                    INPUTS (Ce qui existe)                   │
├─────────────────────────────────────────────────────────────┤
│ • CSV avec briefs piliers (90)                             │
│ • Briefs piliers extraits (9 villes × 10)                  │
│ • 83 satellites Toulouse (référence)                        │
│ • Procédure complète documentée                             │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│         🔥 PHASE 0 : Deep Search Locale (NOUVELLE)          │
│           (Directeur SEO - moi - 1 FOIS PAR VILLE)          │
├─────────────────────────────────────────────────────────────┤
│ Pour 1 ville = données locales complètes                    │
│                                                             │
│ Jour 1 : Recherche Locale (8h)                             │
│   ├─ Google Maps : 20+ déménageurs, 10+ garde-meubles      │
│   ├─ Sites municipaux : 15+ quartiers, données démo        │
│   ├─ Sites déménageurs : prix locaux vérifiés              │
│   ├─ Forums/Avis : témoignages, pain points locaux         │
│   └─ Compilation : fiche-locale-[ville].md                 │
│                                                             │
│ Output : 1 fiche locale complète (réutilisable 100 sat)    │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              PHASE 1 : Création Briefs Satellites           │
│                   (Directeur SEO - moi)                     │
├─────────────────────────────────────────────────────────────┤
│ Pour 1 pilier = 10 satellites                               │
│                                                             │
│ Jour 1 : Deep Search                                        │
│   ├─ Identifier 30-50 sous-requêtes                        │
│   └─ Sélectionner Top 10                                   │
│                                                             │
│ Jour 2 : Recherche Données                                 │
│   └─ 5+ données chiffrées par satellite × 10               │
│                                                             │
│ Jour 3 : Rédaction Briefs                                  │
│   └─ 10 briefs détaillés (template rempli)                 │
│                                                             │
│ Output : 10 fichiers brief-satellite-[01-10].md            │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│              PHASE 2 : Génération Articles                  │
│                   (Utilisateur - vous)                      │
├─────────────────────────────────────────────────────────────┤
│ Pour 1 pilier = 10 satellites                               │
│                                                             │
│ Jour 1 : Setup                                              │
│   ├─ Ouvrir chat Cursor                                    │
│   └─ Charger contexte pilier                               │
│                                                             │
│ Jours 1-5 : Génération                                     │
│   ├─ Copier prompt génération                              │
│   ├─ Adapter variables (ville, pilier, numéro)             │
│   ├─ Exécuter dans Cursor (5-15 min)                       │
│   ├─ Contrôle rapide (3 min)                               │
│   └─ Sauvegarder article                                   │
│   ↻ Répéter × 10 satellites                                │
│                                                             │
│ Rythme : 2-3 satellites/jour                                │
│                                                             │
│ Output : 10 articles .md générés                            │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│            PHASE 3 : Validation & Corrections               │
│                   (Directeur SEO - moi)                     │
├─────────────────────────────────────────────────────────────┤
│ Pour 1 pilier = 10 satellites                               │
│                                                             │
│ Jours 1-2 : Validation                                     │
│   ├─ Lecture attentive (5 min/article)                     │
│   ├─ Checklist qualité (5 min/article)                     │
│   └─ Verdict : ✅ Validé / ⚠️ Ajuster / ❌ Refaire         │
│   ↻ × 10 satellites                                        │
│                                                             │
│ Jour 2 : Rapport                                            │
│   └─ Rapport validation détaillé                           │
│                                                             │
│ Jour 3 : Corrections                                        │
│   ├─ Accompagner ajustements                               │
│   └─ Valider après corrections                              │
│                                                             │
│ Output : 10 satellites validés ✅                           │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                 OUTPUT FINAL (Par pilier)                   │
├─────────────────────────────────────────────────────────────┤
│ ✅ 10 articles satellites validés                           │
│ ✅ 1200-1800 mots chacun (moyenne 1500)                    │
│ ✅ 50+ données chiffrées sourcées au total                  │
│ ✅ Maillage interne cohérent (2-3 liens/article)            │
│ ✅ Qualité lecture humaine ≥ 8/10                          │
│ ✅ Prêts à publier                                          │
│                                                             │
│ Durée totale : 7-11 jours par pilier                        │
└─────────────────────────────────────────────────────────────┘
                           ↓
                    ↻ RÉPÉTER
            pour 10 piliers × 9 villes
                  = 900 satellites
```

---

## 📊 État d'Avancement du Projet

### Briefs Piliers (Phase préparatoire)

| Ville | Briefs Piliers | Piliers Publiés | Satellites Publiés | Statut |
|-------|----------------|-----------------|---------------------|--------|
| Toulouse | ❌ Pas de briefs | 10 ✅ | 83 ✅ | ✅ Complet (référence) |
| Bordeaux | ❌ Pas de briefs | 10 ✅ | 103 ✅ | ✅ Complet |
| Lyon | 10 briefs ✅ | 10 ✅ | 0 ❌ | 🔴 À produire (100 sat) |
| Marseille | 10 briefs ✅ | 10 ✅ | 0 ❌ | 🔴 À produire (100 sat) |
| Lille | 10 briefs ✅ | 10 ✅ | 0 ❌ | 🔴 À produire (100 sat) |
| Montpellier | 10 briefs ✅ | 10 ✅ | 0 ❌ | 🔴 À produire (100 sat) |
| Nantes | 10 briefs ✅ | 10 ✅ | 0 ❌ | 🔴 À produire (100 sat) |
| Nice | 10 briefs ✅ | 10 ✅ | 0 ❌ | 🔴 À produire (100 sat) |
| Rennes | 10 briefs ✅ | 10 ✅ | 0 ❌ | 🔴 À produire (100 sat) |
| Strasbourg | 10 briefs ✅ | 10 ✅ | 0 ❌ | 🔴 À produire (100 sat) |
| Rouen | 10 briefs ✅ | 3 ❌ | 0 ❌ | 🔴 **URGENT** (7 piliers + 100 sat) |

**Total à produire :** ~720 satellites (8 villes complètes + Rouen)

### Briefs Satellites (Nouvelle phase)

| Ville | Briefs Satellites Créés | Articles Générés | Articles Validés | Progression |
|-------|-------------------------|------------------|------------------|-------------|
| Lyon | 0/100 | 0/100 | 0/100 | 🔴 0% - À démarrer |
| Marseille | 0/100 | 0/100 | 0/100 | 🔴 0% - À démarrer |
| Lille | 0/100 | 0/100 | 0/100 | 🔴 0% - À démarrer |
| [Autres] | 0/100 | 0/100 | 0/100 | 🔴 0% - À démarrer |

---

## 🎯 Priorisation Recommandée

### Ordre de Production par Ville (selon volumes SEO)

**Tier 1 - Haute Priorité (3-6 mois)**
1. **Lyon** - 4 010 recherches/mois
2. **Marseille** - 2 800 recherches/mois
3. **Montpellier** - 2 590 recherches/mois

**Tier 2 - Moyenne Priorité (6-12 mois)**
4. **Nantes** - 2 010 recherches/mois
5. **Lille** - 1 640 recherches/mois
6. **Nice** - 1 320 recherches/mois

**Tier 3 - Complétion (12-18 mois)**
7. **Strasbourg** - 920 recherches/mois
8. **Rouen** - 900 recherches/mois (+ 7 piliers manquants)
9. **Rennes** - 870 recherches/mois

### Ordre de Production par Pilier (au sein d'une ville)

**Par volume de recherche décroissant :**

1. **Garde-Meuble** (volumes élevés : 800-2100/mois selon ville)
2. **Déménageur** (volumes moyens-élevés : 400-1300/mois)
3. **Prix Déménagement** (volumes moyens)
4. **Location Camion** (volumes variables)
5. **Déménagement Pas Cher**
6. **Déménagement International**
7. **Petit Déménagement**
8. **Aide Déménagement**
9. **Déménagement Piano**
10. **Déménagement Entreprise**

---

## ⏱️ Estimations de Temps

### Par Satellite (1 article)

| Phase | Tâche | Durée | Responsable |
|-------|-------|-------|-------------|
| 1 | Deep search spécifique | 20-30 min | Dir. SEO |
| 1 | Rédaction brief détaillé | 30-45 min | Dir. SEO |
| 2 | Génération Cursor | 5-15 min | Utilisateur |
| 2 | Contrôle rapide | 3-5 min | Utilisateur |
| 3 | Validation | 10-15 min | Dir. SEO |
| **Total** | **1h10-1h50** | **par satellite** | |

### Par Pilier (10 satellites)

| Phase | Durée | Charge |
|-------|-------|--------|
| Phase 1 (Briefs) | 2-3 jours | Dir. SEO |
| Phase 2 (Génération) | 3-5 jours | Utilisateur |
| Phase 3 (Validation) | 2-3 jours | Dir. SEO |
| **Total** | **7-11 jours** | |

### Par Ville (10 piliers = 100 satellites)

**Séquentiel :** 10 piliers × 9 jours = **90 jours (3 mois)**

**Avec chevauchement (optimisé) :**
- Démarrer Phase 1 pilier 2 pendant Phase 2 pilier 1
- **65-75 jours (2-2,5 mois)**

### Projet Complet (8 villes × 100 satellites)

**Séquentiel (1 ville à la fois) :** 8 × 3 mois = **24 mois (2 ans)**

**Parallèle (2 villes simultanément) :** **12-14 mois**

**Intensif (3 villes simultanées) :** **8-10 mois** (risque qualité)

---

## 📋 Checklist Pré-Démarrage

**Avant de lancer le premier pilier :**

### Documentation
- [ ] Tous les documents de procédure lus et compris
- [ ] Workflow 3 phases clair
- [ ] Critères de qualité intégrés

### Outils & Fichiers
- [ ] Cursor installé et configuré
- [ ] Accès à tous les briefs piliers CSV
- [ ] Arborescence dossiers créée
- [ ] Templates téléchargés

### Organisation
- [ ] Ville prioritaire choisie (recommandé : Lyon)
- [ ] Pilier prioritaire identifié (recommandé : Garde-Meuble)
- [ ] Planning établi (3 mois pour 10 piliers)
- [ ] Moyen de communication Dir. SEO ↔ Utilisateur établi

### Rôles & Responsabilités
- [ ] Rôle Directeur SEO clair (Phase 1 + 3)
- [ ] Rôle Utilisateur clair (Phase 2)
- [ ] Délais de réponse convenus
- [ ] Process escalade si blocage

**Si tous cochés ✅ → GO pour démarrage production !**

---

## 🚀 Démarrage Immédiat

### Proposition de Premier Pilote

**Recommandation :**
- **Ville :** Lyon (volume le plus élevé)
- **Pilier :** Garde-Meuble Lyon (2 130 recherches/mois)
- **Satellites :** 10 articles

**Pourquoi ce choix ?**
1. ✅ Volume SEO maximal = ROI rapide
2. ✅ Sujet riche pour articles variés (prix, types, quartiers, durées...)
3. ✅ Briefs piliers CSV déjà disponibles
4. ✅ Lyon = ville stratégique

**Timeline :**
- **J0 (aujourd'hui)** : Validation de ce choix
- **J1-J3** : Création 10 briefs satellites Garde-Meuble Lyon (moi)
- **J4-J10** : Génération 10 satellites (vous)
- **J11-J13** : Validation + corrections (moi)
- **J14** : 10 satellites validés ✅

**Après ce pilote réussi :**
→ Répliquer sur les 9 autres piliers de Lyon
→ Étendre aux 8 autres villes

---

## 📞 Contact & Support

**Directeur SEO :** [À définir]  
**Délai réponse :** 24-48h pour questions  
**Révisions briefs :** Possibles si justifiées  
**Support technique :** [À définir]

---

## ✨ Vision Finale

**Dans 12-24 mois :**

✅ **900 articles satellites** publiés  
✅ **10 cocons sémantiques** complets par ville  
✅ **9 villes** couvertes intégralement  
✅ **Autorité topique** dominante en France  
✅ **Positions #1** sur centaines de requêtes longue traîne  
✅ **Trafic organique** multiplié par 10+  
✅ **Référence incontournable** déménagement en France

**L'investissement aujourd'hui = croissance exponentielle demain** 🚀

---

**Index créé le :** 13 octobre 2025  
**Version :** 1.0  
**Statut :** ✅ Procédure complète prête  
**Action :** 🟢 Prêt à démarrer production

