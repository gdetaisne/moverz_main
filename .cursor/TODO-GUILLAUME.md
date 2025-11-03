# TODO ACTIFS - Guillaume

> **Instructions Cursor** : Ce fichier contient mes tâches EN COURS.
> Quand je te demande d'évaluer :
> - Vérifie que je ne suis pas sur trop de tâches en parallèle (max 3 recommandé)
> - Identifie les tâches incomplètes/abandonnées
> - Suggère quoi terminer en priorité
> - Estime le temps restant pour chaque tâche

---

## 🔥 EN COURS MAINTENANT

*Aucune tâche en cours*

**Session terminée** : TASK-404-02 🔄 ROLLBACK (03/11/2025, 1h15)
- Fix appliqué puis rollback après auto-critique
- Bug cosmétique sans impact fonctionnel
- **Leçon** : Toujours valider impact URLs avant commit

**Dernière session** : TASK-404-01 ✅ TERMINÉ (01/11/2025, 2h30)

---

## 📅 PLANIFIÉ PROCHAINE SESSION

### ~~TASK-404-02~~ : SKIP (bug cosmétique sans effet)

### TASK-404-03 : Décision Stratégique 104 Articles (1h)

**Priorité** : P0 (BLOQUE tout le reste projet 404)

**Actions** :
1. Fix cleanSlug() Marseille (15 min) → Remplacer bordeaux par marseille
2. Fix cleanSlug() Lyon (15 min) → Remplacer bordeaux par lyon
3. Retirer accents CATEGORY_MAPPING (30 min) → 11 villes
4. Fix Nice satellites: null (2 min)
5. Tests validation (15-30 min)

**Fichiers** :
- `sites/marseille/lib/blog.ts`
- `sites/lyon/lib/blog.ts`
- `sites/nice/lib/blog.ts`
- + 8 autres villes

**Commande démarrage** :
```bash
"Cursor, je démarre TASK-404-02"
```

**Docs** :
- `.cursor/RESUME-DEMARRAGE-DEMAIN-404.md` (guide complet)
- `.cursor/TASKS-404-DETAILLEES.md` section TASK-404-02

---

## 💡 IDÉES / DÉCOUVERTES

### Quick wins identifiés (session 01/11)

1. **Article Toulouse** (30 min) → 53 liens résolus (ROI 106)
2. **Catégories courtes** (1h) → 147 liens résolus (ROI 147)
3. **Majuscules homepage** (1h) → 80-100 liens résolus (ROI 80-100)

**Total** : 2h30 → 280-300 liens résolus (25% du CSV) 🚀

À faire après TASK-404-02 (dans TASK-404-05 et 404-08)

---

## ✅ FAIT AUJOURD'HUI (01/11/2025)

### TASK-404-01 : Audit Structure Complète ✅

**Temps** : 2h30 (estimé 2-3h)

**Accomplissements** :
- ✅ Restructuration TASK-001/007 → 9 sous-tâches
- ✅ Analyse complète multi-sources (Cursor + CSV + Code)
- ✅ 6 patterns majeurs identifiés
- ✅ 3 bugs critiques trouvés (cleanSlug, CATEGORY_MAPPING, majuscules)
- ✅ Découverte clé : 90.3% résolvables sans créer contenu
- ✅ 17 fichiers documentation créés
- ✅ Plan TASK-404-02 à 404-09 validé
- ✅ 3 commits GitHub (#a98ecc6, #f7e8414, #[pending])

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
✅ TASK-404-01 : Audit (2h30) ✅ TERMINÉ

⏭️ TASK-404-02 : Harmonisation (1h15-2h15) ← DEMAIN
📋 TASK-404-03 : Décision (1h)
📋 TASK-404-04 : Création (OPTIONNEL 20-30h)
📋 TASK-404-05 : Correction AUTO (4-6h) → 963 liens !
📋 TASK-404-06 : Validation (1h)
📋 TASK-404-07 : Redirections 301 (3h30-5h30)
📋 TASK-404-08 : Homepage (2h30-3h30)
📋 TASK-404-09 : Validation finale (2-3h)

Progression : 15% (2h30/16h45 minimum)
Résolution attendue finale : 95-99% (2400+ liens sur 2500)
```

---

*Dernière mise à jour : 2025-11-01 18h45*
