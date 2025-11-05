# TODO ACTIFS - Lucie

> **Instructions Cursor** : Ce fichier contient les tâches EN COURS de Lucie.
> Quand elle te demande d'évaluer :
> - Vérifie qu'elle n'est pas sur trop de tâches en parallèle (max 3 recommandé)
> - Identifie les tâches incomplètes/abandonnées
> - Suggère quoi terminer en priorité
> - Estime le temps restant pour chaque tâche

---

## 🔥 EN COURS MAINTENANT

### [P1]-TASK-050 : Fix Liens "nice" Hardcodés (72 URLs 404) 🚨 URGENT

**Priorité** : P1 (Important - Bug détecté)  
**Type** : Bug Fix / Liens Internes

**Objectif** : Corriger les liens hardcodés "nice" dans FAQ et Services → Résoudre 72 URLs 404

**Documentation** : `.cursor/tasks/[P1]-TASK-050-fix-hardcoded-nice-links/`

**Détecté par** : Guillaume via Google Search Console  
**Créé le** : 2025-11-05  
**Temps estimé** : 45 min

**Problème** :
- 🔴 22 fichiers avec liens hardcodés "nice" (au lieu de dynamique)
- 🔴 72 URLs 404 créées (36 cross-site + 36 domaine dupliqué)
- 🔴 Bug introduit ce matin (commits `355478fa` et `7ae8f943`)

**Fichiers à corriger** :
- `sites/{ville}/app/faq/page.tsx` (10 sites sauf Nice)
- `sites/{ville}/app/services/page.tsx` (10 sites sauf Nice)

**Cause** : Lors optimisation FAQ/Services ce matin, copier/coller depuis Nice sans remplacer "nice" par `{city.slug}`

**Solution** :
```tsx
// AVANT (bugué)
<a href="/quartiers-nice/">

// APRÈS (corrigé)
<a href={`/quartiers-${city.slug}/`}>
```

**Checklist** :
- [ ] Lire documentation complète (README.md)
- [ ] Corriger 10 fichiers faq/page.tsx
- [ ] Corriger 10 fichiers services/page.tsx
- [ ] Tests local (build OK)
- [ ] Commit + Push

**Impact** :
- Résout 72 URLs 404
- Améliore UX
- Nettoie GSC

**Statut** : 📋 TODO

---

### [P2]-TASK-048 : Optimisation Page /services/ — Pricing + SEO ✅ COMPLÉTÉ

**Priorité** : P2 (Normal - Amélioration UX/SEO)  
**Type** : SEO / UX / Contenu

**Objectif** : Corriger incohérences pricing + Quick Wins SEO

**Démarrée le** : 2025-11-05  
**Complétée le** : 2025-11-05  
**Temps réel** : 2h15 (vs 3-4h estimé) ⚡

**Résultats** :

**Phase 1 - Pricing Fix** :
- ✅ Prix hub corrigés : 450€→280€ (Éco), 750€→600€ (Std)
- ✅ Labels contextuels ajoutés : "Studio local" vs "T2 local"
- ✅ Cohérence hub ↔ pages détails restaurée

**Phase 2 - SEO Quick Wins** :
- ✅ Titles raccourcis < 60 chars (4 pages × 11 villes)
  * Hub : "Services Déménagement Nice — 3 Formules" (48 chars)
  * Éco : "Déménagement Économique Nice — Dès 280€" (45 chars)
  * Std : "Déménagement Standard Nice — Dès 600€" (43 chars)
  * Premium : "Déménagement Premium Nice — Dès 1200€" (44 chars)
- ✅ FAQ section ajoutée (5 Q&A + Schema FAQPage)
- ✅ Maillage interne (blog + quartiers + FAQ)
- ✅ Schema.org Service + OfferCatalog (3 offers avec prix)

**Phase 3 - Sync & Validation** :
- ✅ 44 fichiers synchronisés (11 villes)
- ✅ Commit + push GitHub (SHA: `355478fa`)

**Impact attendu** :
- CTR ↑ 5-10% (280€ vs 450€ plus attractif)
- Rich snippets FAQ activés (SERP)
- Link juice ↑ (maillage interne)
- SERP display amélioré (titles optimisés)

**Statut** : ✅ COMPLÉTÉ (05/11/2025)

---

## 🔥 EN COURS MAINTENANT

### [P0]-TASK-046 : Logo SERP / Favicons — CTR Critique ✅ TECHNIQUE COMPLÉTÉ

**Priorité** : P0 (Business Critical)  
**Type** : SEO / Investigation + Fix

**Objectif** : Faire apparaître systématiquement le logo dans résultats Google (SERP)

**Documentation** : `.cursor/tasks/[P0]-TASK-046-favicon-logo-serp/`

**Démarrée le** : 2025-11-05  
**Complétée le** : 2025-11-05  
**Temps réel** : 1h15 (vs 1.5-3h estimé) ⚡

**Résultats** :
- ✅ Favicons 48x48 créés (11 villes) — CRITIQUE pour SERP
- ✅ favicon.ico régénéré (0 bytes → 2.7K valide)
- ✅ URLs absolues implémentées
- ✅ Sync 11 villes (55 fichiers modifiés)
- ✅ Commit + push GitHub (SHA: `ffccc050`)

**Root cause identifiée** :
- ❌ Favicon 48x48 MANQUANT (Google SERP requirement)
- ❌ favicon.ico vide (0 bytes)
- ⚠️ URLs relatives vs absolues

**Impact attendu (J+7-14)** :
- Logo visible SERP Google (mobile + desktop)
- CTR +5-15% (études Google)
- Leads +50-150/mois (11 villes)

**Statut** : ✅ TECHNIQUE COMPLÉTÉ (attente indexation Google 7-14j)

**Next check** : 12/11/2025 (J+7) → Vérifier logo SERP

**Rapport** : `.cursor/tasks/[P0]-TASK-046-favicon-logo-serp/RAPPORT-SESSION-05-NOV.md`

---

### [P2]-TASK-033 : Titles Optimisés (3 villes) ✅ COMPLÉTÉ

**Priorité** : P2 (Normal)  
**Type** : SEO On-Page / Contenu

**Objectif** : Optimiser longueur titles à 50-60 caractères (Rouen, Lyon, Lille)

**Résultats** :
- ✅ Titles raccourcis (suppression " | Moverz")
- ✅ Corridor pages : 60→53 chars
- ✅ Estimation Rapide : 70→54 chars
- ✅ 3 villes synchronisées (Rouen, Lyon, Lille)
- ✅ Commit + push GitHub

**Temps réel** : 35 min (vs 2-3h estimé) ⚡

**Statut** : ✅ COMPLÉTÉ (05/11/2025)

---

### [P1]-TASK-047 : Fix "Duplicate FAQPage field" (11 sites) ✅ TECHNIQUE COMPLÉTÉ

**Priorité** : P1 (Important - Bloque rich snippets)  
**Type** : SEO / Structured Data / Fix

**Objectif** : Corriger erreur "Champ 'FAQPage' en double" détectée par Google

**Démarrée le** : 2025-11-05  
**Complétée le** : 2025-11-05  
**Temps réel** : 45 min (vs 2-3h estimé) ⚡

**Root cause identifiée** :
- ❌ FAQPage déclaré sur `/` (homepage - LocalMoneyFAQ)
- ❌ FAQPage déclaré sur `/faq` (page dédiée)
- = Duplicate détecté par Google (Lyon: 0 valid)

**Résultats** :
- ✅ Homepage `/` → Question standalone (sans FAQPage)
- ✅ Page `/faq` → FAQPage unique conservé
- ✅ Sync 11 villes (11 fichiers modifiés)
- ✅ Commit + push GitHub (SHA: `550654e0`)

**Statut** : ✅ TECHNIQUE COMPLÉTÉ (attente indexation Google 3-7j)

**⚠️ ACTION MANUELLE REQUISE** :
Tu dois demander la réindexation sur Search Console (11 URLs `/faq`) :
1. Search Console → Inspection de l'URL
2. Tester `/faq` pour chaque ville
3. Cliquer "Demander l'indexation"

**URLs à réindexer** :
- https://devis-demenageur-nice.fr/faq
- https://devis-demenageur-lyon.fr/faq
- https://devis-demenageur-marseille.fr/faq
- https://devis-demenageur-toulouse.fr/faq
- https://devis-demenageur-bordeaux.fr/faq
- https://devis-demenageur-lille.fr/faq
- https://devis-demenageur-strasbourg.fr/faq
- https://devis-demenageur-nantes.fr/faq
- https://devis-demenageur-rennes.fr/faq
- https://devis-demenageur-rouen.fr/faq
- https://devis-demenageur-montpellier.fr/faq

**Next check** : 12/11/2025 (J+7) → Vérifier Search Console "FAQ valides" passé de 0→1

---

## ✅ TÂCHES RÉCEMMENT FINALISÉES (05/11/2025)

### [P3]-TASK-005 : Audit Qualité Blogs - Amélioration Contenu ✅

**Résultats** :
- ✅ 80 articles optimisés (8 villes) - **266% objectif dépassé !**
- ✅ 323 FAQ ajoutées (rich snippets Google)
- ✅ 180+ liens internes stratégiques
- ✅ Fix bug markdown "pouces doubles" (11 villes)
- ✅ 8 commits GitHub pushés

**Villes** : Nice, Lyon, Marseille, Toulouse, Bordeaux, Lille, Strasbourg, Montpellier  
**Temps** : 8h30 (vs 10-15h estimé) ⚡  
**Rapport** : `.cursor/tasks/[P3]-TASK-005-audit-qualite-blogs/RAPPORT-FINAL.md`

---

### [P2]-TASK-024 : Fix bouton "Voir tous les articles" blog ✅

**Résultats** :
- ✅ Composant client `SatelliteArticlesSection.tsx` créé
- ✅ État `showAll` pour toggle 9 vs tous articles
- ✅ Sync 11 villes (22 fichiers modifiés)
- ✅ Commit GitHub `c2fb392` pushé

**Temps** : 25 min (vs 30 min estimé) ⚡  
**Documentation** : `.cursor/tasks/[P2]-TASK-024-fix-bouton-blog/README.md`

---

## 📅 PLANIFIÉ DEMAIN (2 NOV 2025)

### En attente de Guillaume

**TASK-404-02** (Guillaume - Technique) doit être terminée en priorité avant les suivantes.

Une fois TASK-404-02 terminée :

---

## 📅 APRÈS-DEMAIN (3 NOV 2025) - Selon avancement Guillaume

### TASK-404-03 : Décision Stratégique 104 Articles (1h) [Guillaume + Lucie]

**Priorité** : P1 (décision business importante)  
**Type** : Stratégie / Décision (les deux ensemble)

**Objectif** : DÉCIDER pour 104 articles manquants → Créer OU Rediriger

**Ton rôle (Lucie - Contenu/SEO)** :
- Analyser pertinence contenu (intérêt utilisateur)
- Évaluer potentiel SEO (volume recherche estimé)
- Proposer structure articles si création
- Identifier piliers existants pour redirections

**Rôle Guillaume (Technique)** :
- Valider faisabilité technique
- Définir slugs/catégories si création
- Mapper redirections 301 si applicable

**Commande démarrage** :
```bash
"Cursor, je démarre TASK-404-03" (dire à Guillaume quand prête)
```

---

### TASK-404-04 : Création Contenu Manquant (20-30h) OPTIONNEL [Lucie]

**Priorité** : P2 (SEULEMENT si décidé en TASK-404-03)  
**Type** : Production contenu (100% Lucie)

**Objectif** : Créer les articles manquants (si décision = créer)

**Actions** :
- Production par batch (10 articles/session)
- Qualité minimum : 8/10 (standard satellites)
- Frontmatter aligné structure existante
- Maillage interne vers piliers

**Estimation** :
- 104 articles × 15 min/article = ~26h
- Répartir sur plusieurs sessions (10 articles/batch = 2h30/batch)

**Note** : Cette tâche est OPTIONNELLE. Si décision = rediriger, cette tâche est annulée.

---

## 📋 TÂCHES LUCIE DANS PROJET 404

```
📋 TASK-404-03 : Décision (1h) [Avec Guillaume]
📋 TASK-404-04 : Création (20-30h) OPTIONNEL [Lucie seule]
📋 TASK-404-06 : Validation (1h) [Possible pour Lucie]
📋 TASK-404-08 : Homepage (2h30) [Possible pour Lucie selon nature bugs]
📋 TASK-404-09 : Validation finale (2-3h) [Avec Guillaume]

Total Lucie : 4h30 minimum, 34h30 maximum (si création contenu)
```

---

## 💡 IDÉES / DÉCOUVERTES

<!-- Tâches trouvées en passant, à trier dans le backlog -->
<!-- Commande : "Cursor, crée la tâche [description]" pour les ajouter au backlog -->

*Aucune idée en attente*

---

## ✅ FAIT RÉCEMMENT

*En attente de tâches assignées - Projet 404 en cours (Guillaume)*

---

## 🎯 WORKFLOW RECOMMANDÉ

### Matin
1. `"Cursor, montre les INCOMPLET"` → Vérifier s'il y a des tâches prioritaires
2. `"Cursor, évalue mon TODO + le backlog"` → Décider quoi faire
3. `"Cursor, je démarre TASK-XXX"` → Cursor crée la doc et prépare la tâche

### Pendant le travail
- `"Cursor, log ma session pour TASK-XXX : [ce que j'ai fait]"` → Documenter régulièrement
- Si découverte d'une tâche → Ajouter dans "IDÉES/DÉCOUVERTES", trier plus tard

### Interruption / Changement de priorité
- `"Cursor, je mets TASK-XXX en pause : [raison]"` → Sauvegarder le contexte
- Cursor marque ⚠️ INCOMPLET avec notes détaillées

### Fin de tâche
- `"Cursor, finalise TASK-XXX"` → Cursor vérifie la Definition of Done
- Si critères validés → Archive dans DONE.md
- Si critères manquants → Cursor explique ce qui reste à faire

### Soir
- Vérifier que toutes les sessions sont loggées
- Mettre en pause les tâches non terminées avec contexte détaillé

---

## 📋 COMMANDES RAPIDES

```bash
# Évaluer les priorités
"Cursor, évalue le backlog"

# Créer une tâche
"Cursor, crée la tâche [description]"

# Démarrer une tâche
"Cursor, je démarre TASK-XXX"

# Logger une session
"Cursor, log ma session pour TASK-XXX : [fait]"

# Mettre en pause
"Cursor, je mets TASK-XXX en pause"

# Abandonner
"Cursor, j'abandonne TASK-XXX : [raison]"

# Finaliser
"Cursor, finalise TASK-XXX"

# Voir les incomplets
"Cursor, montre les INCOMPLET"
```

---

## 📊 PROGRESSION PROJET 404 (Vue Lucie)

```
✅ TASK-404-01 : Audit (Guillaume) ✅ TERMINÉ
🔄 TASK-404-02 : Harmonisation technique (Guillaume) ← EN COURS DEMAIN

⏭️ TASK-404-03 : Décision (Guillaume + Lucie) ← TA PROCHAINE TÂCHE
📋 TASK-404-04 : Création contenu (Lucie) OPTIONNEL si décision = créer
📋 TASK-404-05 : Correction AUTO (Guillaume)
📋 TASK-404-06 : Validation (Guillaume ou Lucie)
📋 TASK-404-07 : Redirections (Guillaume)
📋 TASK-404-08 : Homepage (Guillaume ou Lucie)
📋 TASK-404-09 : Validation finale (Guillaume + Lucie)
```

**Ta contribution** : 
- Session stratégie (1h) avec Guillaume
- Production contenu si nécessaire (20-30h optionnel)
- Validation qualité (2-3h tests)

**Total estimé** : 4h30 minimum, 34h30 maximum

---

*Dernière mise à jour : 2025-11-02*


