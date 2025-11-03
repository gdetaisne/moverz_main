# TODO ACTIFS - Guillaume

> **Instructions Cursor** : Ce fichier contient mes tâches EN COURS.
> Quand je te demande d'évaluer :
> - Vérifie que je ne suis pas sur trop de tâches en parallèle (max 3 recommandé)
> - Identifie les tâches incomplètes/abandonnées
> - Suggère quoi terminer en priorité
> - Estime le temps restant pour chaque tâche

---

## 🔥 EN COURS MAINTENANT

*Aucune tâche en cours - Prêt pour le setup final*

**Dernière session** : Documentation stratégique complète (02/11/2025, 4h)

---

## ⚡ À FAIRE CE SOIR (URGENT - 5 MIN)

### [P0]-TASK-023 : Setup Scripts Automation ← MAINTENANT

**Priorité** : P0 (Active tout le système créé aujourd'hui)  
**Temps** : 5 minutes  
**Type** : Setup one-time

**Actions** :
1. ✅ Copie/colle 3 blocs commandes depuis `COMMANDES-A-FAIRE.md`
2. ✅ Test `moverz` fonctionne
3. ✅ Commit + push
4. ✅ Test nouveau chat Cursor

**Fichier** : `/COMMANDES-A-FAIRE.md` (tout est prêt à copier/coller)

**Impact** :
- Active validation pre-commit
- Active dashboard "moverz"
- Versionne tout sur GitHub
- Cursor auto-éduqué au prochain chat

---

## 📅 PLANIFIÉ DEMAIN (2 NOV 2025)

### 🎯 OBJECTIF SESSION : Option A ou B recommandée

**Option A (2-3h) - Quick Wins** ⭐ RECOMMANDÉ :
- ✅ TASK-404-02 (1h15-2h15) → Base technique propre
- ✅ Article Toulouse (30 min) → 53 liens résolus
- ✅ Catégories courtes (1h) → 147 liens résolus
- **Résultat : 200 liens résolus (17% du CSV)**

**Option B (3-4h) - Fondations complètes** :
- ✅ TASK-404-02 (1h15-2h15) → Base technique propre
- ✅ TASK-404-03 (1h) → Décision 104 articles (avec Lucie)
- **Résultat : Prêt pour correction massive**

---

### TASK-404-02 : Harmonisation Technique (1h15-2h15) ← DÉMARRER ICI

**Priorité** : P0 (BLOQUE tout le reste projet 404)  
**Type** : 100% technique (Guillaume)

**Actions** :
1. Fix cleanSlug() Marseille (15 min) → Remplacer `bordeaux` par `marseille`
2. Fix cleanSlug() Lyon (15 min) → Remplacer `bordeaux` par `lyon`
3. Retirer accents CATEGORY_MAPPING (30 min) → 11 villes
4. Fix Nice satellites: null → 'conseils' (2 min)
5. Tests validation (15-30 min) → Build 3 villes

**Fichiers à modifier** :
- `sites/marseille/lib/blog.ts` (cleanSlug fix)
- `sites/lyon/lib/blog.ts` (cleanSlug fix)
- `sites/nice/lib/blog.ts` (satellites fix + accents)
- `sites/*/lib/blog.ts` (8 autres villes - retrait accents)

**Commande démarrage** :
```bash
"Cursor, je démarre TASK-404-02"
```

**Docs de référence** :
- `.cursor/RESUME-DEMARRAGE-DEMAIN-404.md` (guide complet) ✅ déjà lu
- `.cursor/TASKS-404-DETAILLEES.md` section TASK-404-02 (10 min lecture)
- `.cursor/tasks/TASK-404-01-audit-structure/RAPPORT-INCONSISTANCES.md` (bugs détaillés)

---

## 💡 IDÉES / DÉCOUVERTES

### Quick wins identifiés (session 01/11)

1. **Article Toulouse** (30 min) → 53 liens résolus (ROI 106)
2. **Catégories courtes** (1h) → 147 liens résolus (ROI 147)
3. **Majuscules homepage** (1h) → 80-100 liens résolus (ROI 80-100)

**Total** : 2h30 → 280-300 liens résolus (25% du CSV) 🚀

À faire après TASK-404-02 (dans TASK-404-05 et 404-08)

---

## ✅ FAIT RÉCEMMENT

### TASK-404-01 : Audit Structure Complète ✅ TERMINÉ

**Date** : 01/11/2025  
**Temps** : 2h30 (estimé 2-3h) ✅

**Accomplissements** :
- ✅ Restructuration TASK-001/007 → 9 sous-tâches
- ✅ Analyse complète multi-sources (Cursor + CSV + Code)
- ✅ 6 patterns majeurs identifiés
- ✅ 3 bugs critiques trouvés (cleanSlug, CATEGORY_MAPPING, majuscules)
- ✅ Découverte clé : 90.3% résolvables sans créer contenu
- ✅ 17 fichiers documentation créés
- ✅ Plan TASK-404-02 à 404-09 validé
- ✅ 3 commits GitHub (#a98ecc6, #f7e8414, #[pending])

**Definition of Done** :
- ✅ Code propre et documenté (17 fichiers)
- ✅ Commits GitHub main + SHA documentés
- ✅ Testé et validé (analyse complète 11 villes)

**Docs créées** :
- `.cursor/tasks/TASK-404-01-audit-structure/` (17 fichiers)
- `.cursor/ANALYSE-LOGIQUE-404-COMPLETE.md`
- `.cursor/TASKS-404-DETAILLEES.md`
- `.cursor/RESUME-DEMARRAGE-DEMAIN-404.md`
- `.cursor/RAPPORT-SESSION-01-NOV-2025.md`

---

## 🎯 WORKFLOW RECOMMANDÉ

### Matin (Demain)
1. Lire `.cursor/RESUME-DEMARRAGE-DEMAIN-404.md` (5 min)
2. `"Cursor, je démarre TASK-404-02"` → Cursor prépare la tâche
3. Suivre plan détaillé (`.cursor/TASKS-404-DETAILLEES.md`)

### Pendant le travail
- `"Cursor, log ma session pour TASK-404-02 : [ce que j'ai fait]"` → Documenter régulièrement
- Si découverte d'une tâche → Ajouter dans "IDÉES/DÉCOUVERTES", trier plus tard

### Interruption / Changement de priorité
- `"Cursor, je mets TASK-404-02 en pause : [raison]"` → Sauvegarder le contexte
- Cursor marque ⚠️ INCOMPLET avec notes détaillées

### Fin de tâche
- `"Cursor, finalise TASK-404-02"` → Cursor vérifie la Definition of Done
- Si critères validés → Passe à TASK-404-03
- Si critères manquants → Cursor explique ce qui reste à faire

---

## 📋 COMMANDES RAPIDES

```bash
# Démarrer demain
"Cursor, je démarre TASK-404-02"

# Voir état projet 404
"Cursor, évalue le backlog" | grep 404

# Logger session
"Cursor, log ma session pour TASK-404-02 : [fait]"

# Mettre en pause
"Cursor, je mets TASK-404-02 en pause"

# Finaliser
"Cursor, finalise TASK-404-02"
```

---

## 📊 PROGRESSION PROJET 404

```
✅ TASK-404-01 : Audit (2h30) ✅ TERMINÉ (01/11)

⏭️ TASK-404-02 : Harmonisation (1h15-2h15) ← DEMAIN [Guillaume]
📋 TASK-404-03 : Décision (1h) [Guillaume + Lucie]
📋 TASK-404-04 : Création contenu (20-30h) OPTIONNEL [Lucie]
📋 TASK-404-05 : Correction AUTO (4-6h) → 963 liens ! [Guillaume]
📋 TASK-404-06 : Validation (1h) [Guillaume ou Lucie]
📋 TASK-404-07 : Redirections 301 (3h30-5h30) [Guillaume]
📋 TASK-404-08 : Homepage (2h30-3h30) [Guillaume ou Lucie]
📋 TASK-404-09 : Validation finale (2-3h) [Guillaume + Lucie]

Progression : 11% (2h30/22h estimé sans création contenu)
Résolution attendue : 95-99% (2400+ liens sur 2500)
```

---

## 🔥 AUTRES TÂCHES EN COURS (finaliser après 404)

**7 tâches à 70-95% complètes** :
- TASK-006 : Canonicals bugs (P1, 95%, 2h30 restant)
- TASK-011 : Fix 308 Nice (P0, 90%, tests deployment)
- TASK-012 : Villes hardcodées (P1, 85%, tests)
- TASK-013 : Internal linking (P2, 75%)
- TASK-014 : Metadata SEO (P2, 80%)
- TASK-009 : Schema.org (P2, 70%)

**Stratégie** : Finir projet 404 en priorité, puis finaliser ces 7 tâches.

---

*Dernière mise à jour : 2025-11-02*
