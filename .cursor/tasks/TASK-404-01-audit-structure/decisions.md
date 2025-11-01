# Décisions : TASK-404-01

**Tâche** : Audit Structure Complète  
**Date** : 01 novembre 2025

---

## 🎯 DÉCISIONS MAJEURES

### Décision #1 : Restructurer TASK-001 et TASK-007

**Contexte** :
- TASK-001 : 104 articles à créer (20-30h)
- TASK-007 : ~1014 redirections 301 (80% fait)
- Approche monolithique, pas de séparation claire

**Analyse** :
- Audit révèle 90.3% résolvables sans créer contenu
- Patterns multiples nécessitent approches différentes
- Dépendances techniques (harmonisation AVANT corrections)

**Décision** : ✅ Restructurer en 9 sous-tâches indépendantes

**Raison** :
- Granularité permet optimisation ordre (dépendances)
- Séparation liens internes vs externes vs création contenu
- ROI meilleur (15-23h vs 20-30h)
- Bugs code détectés AVANT corrections

**Alternative rejetée** : Continuer TASK-001 tel quel
- Risque créer contenu en doublon
- Bugs cleanSlug() écraserait corrections
- Pas de compréhension structure sous-jacente

---

### Décision #2 : Audit AVANT toute correction

**Contexte** :
- Tentation de corriger immédiatement (quick wins)
- Guillaume demande "analyse raisonnée"

**Décision** : ✅ Faire audit complet AVANT (TASK-404-01)

**Raison** :
- Sans mapping structure → Corrections à l'aveugle
- Bugs code écraseraient corrections ultérieures
- Besoin comprendre dépendances techniques

**Résultat** :
- 3 bugs critiques trouvés (auraient cassé corrections)
- 6 patterns identifiés (approche ciblée)
- ROI audit : 200-400% (2h30 → économise 5-10h)

**Alternative rejetée** : Corriger puis auditer
- Risque régressions
- Corrections à refaire
- Temps perdu

---

### Décision #3 : Analyser CSV en détail

**Contexte** :
- CSV Guillaume fourni (1167 liens)
- Analyse Cursor déjà faite (2125 liens)
- Différence volumétrique (958 liens)

**Décision** : ✅ Analyse approfondie CSV (1h supplémentaire)

**Raison** :
- Validation croisée = robustesse
- CSV peut révéler patterns non vus par Cursor
- Réconcilier deux sources = compréhension complète

**Résultat** :
- 2 patterns nouveaux (majuscules, devis-quartier)
- Concordance 100% confirmée
- Priorités ajustées (Toulouse, Bordeaux)

**Alternative rejetée** : Ignorer CSV (se fier qu'à Cursor)
- Aurait manqué patterns majuscules
- Pas de validation externe
- Moins de confiance

---

### Décision #4 : Ordre optimal des tasks

**Contexte** :
- Guillaume insiste : "Ce n'est pas qu'une question d'impact SEO, c'est une question de logique"
- Dépendances techniques critiques

**Décision** : ✅ Ordre strict par dépendances (pas par ROI SEO)

**Ordre final** :
1. **404-01 Audit** (bloque tout, comprendre structure)
2. **404-02 Harmonisation** (fix bugs code, base stable)
3. **404-03 Décision** (créer ou rediriger ?)
4. **404-04 Création** (si décidé, AVANT correction liens)
5. **404-05 Correction liens** (utilise structure harmonisée + contenu créé)
6. **404-06 Validation** (ne pas passer si cassé)
7. **404-07 Redirections** (APRÈS liens internes propres)
8. **404-08 Homepage** (utilise liens déjà corrigés)
9. **404-09 Validation finale**

**Raison** :
- Si harmonisation APRÈS corrections → corrections écrasées
- Si création contenu APRÈS correction liens → liens déjà redirigés
- Si redirections AVANT liens internes → redirections inutiles

**Alternative rejetée** : Ordre par ROI SEO (quick wins d'abord)
- Aurait créé régressions multiples
- Travail à refaire
- Inefficace long terme

---

### Décision #5 : Création contenu OPTIONNELLE

**Contexte** :
- TASK-001 prévoyait création systématique 104 articles
- Audit révèle 90.3% résolvables sans contenu

**Décision** : ✅ Rendre création OPTIONNELLE (TASK-404-04)

**Raison** :
- 963 liens corrigeables automatiquement
- 104 articles = 20-30h effort
- Peut rediriger vers piliers (économie temps)
- Décision éclairée en TASK-404-03 (analyse priorités)

**Résultat** :
- Effort : 15-23h (sans création) vs 36-54h (avec)
- ROI : 170 liens/h vs 72 liens/h
- Flexibilité : Peut créer top priorités seulement

**Alternative rejetée** : Créer 104 articles systématiquement
- Temps considérable (20-30h)
- ROI faible (certains articles peu recherchés)
- Peut toujours faire plus tard

---

## 📊 DÉCISIONS TECHNIQUES

### cleanSlug() Marseille et Lyon

**Problème** : Patterns copier-collés depuis Bordeaux  
**Décision** : ✅ Remplacer en TASK-404-02 (pas maintenant)  
**Raison** : Audit seulement, pas de modification code

### CATEGORY_MAPPING générique

**Problème** : `piliers: 'general'`, `satellites: 'conseils'`  
**Décision** : ✅ Documenter + utiliser frontmatter (TASK-404-02)  
**Raison** : Architecture choisie (frontmatter > dossiers)

### Structure 3 vs 11 catégories

**Problème** : Marseille/Strasbourg/Rennes (3) vs autres (11)  
**Décision** : ✅ ACCEPTABLE, ne pas harmoniser  
**Raison** : Choix architectural, fonctionne bien, pas urgent

---

## 🎯 DÉCISIONS MÉTHODOLOGIQUES

### Documentation granulaire

**Décision** : ✅ 1 dossier par task avec 8+ fichiers standard

**Fichiers créés** :
- README.md (vue d'ensemble)
- context.md (pourquoi)
- progress.md (journal)
- commits.md (SHA GitHub)
- decisions.md (ce fichier)
- tests.md (si applicable)
- + rapports spécifiques (mapping, analyses, etc.)

**Raison** :
- Conformité `.cursorrules`
- Facilite reprise demain
- Traçabilité complète

### Validation multi-sources

**Décision** : ✅ Croiser 3 sources (Cursor + CSV + Code)

**Sources** :
1. Cursor : analyze-404.mjs (2125 liens, interne)
2. CSV : Crawl externe (1167 liens, public)
3. Code : Audit cleanSlug + CATEGORY_MAPPING

**Raison** :
- Une source peut manquer patterns
- Validation croisée = robustesse
- Meilleure compréhension complète

---

## ✅ RÉSUMÉ DÉCISIONS

| Décision | Impact | Justification |
|----------|--------|---------------|
| Restructurer en 9 tasks | Effort -20% | Optimisation logique dépendances |
| Audit AVANT corrections | ROI 200-400% | Détecte bugs, évite régressions |
| Analyser CSV détail | +2 patterns | Validation croisée robuste |
| Ordre strict dépendances | 0 régression | Logique > ROI SEO |
| Création contenu OPTIONNEL | -20-30h si pas nécessaire | Flexibilité stratégique |

**Toutes décisions validées par analyse et résultats** ✅

---

**FIN DECISIONS**

*Dernière mise à jour : 01/11/2025*

