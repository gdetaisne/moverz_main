# Tasks - Documentation par tâche

Ce dossier contient **1 sous-dossier par tâche active** avec documentation complète.

---

## 📁 Structure standard

Chaque tâche suit la même structure :

```
TASK-XXX-nom-descriptif/
├── README.md        → Vue d'ensemble (objectif, actions, priorité)
├── context.md       → Contexte et "pourquoi" cette tâche
├── progress.md      → Journal chronologique (log des sessions)
├── commits.md       → SHA GitHub + description commits
├── tests.md         → Tests effectués + résultats
└── decisions.md     → Décisions techniques documentées
```

---

## 🎯 Tâches actives

### ⚠️ Légende priorités
- **[P0]** = Critique / Bloquant 🔴
- **[P1]** = Important 🟠
- **[P2]** = Normal 🟡

### Projet 404 (9 tâches)
- `[P0]-TASK-404-01-audit-structure/` ✅ TERMINÉ
- `[P0]-TASK-404-02-harmonisation-technique/` 📋 PENDING
- `[P1]-TASK-404-03-decision-articles/` 📋 PENDING
- `[P2]-TASK-404-04-creation-contenu/` 📋 PENDING (optionnel)
- `[P0]-TASK-404-05-correction-liens/` 📋 PENDING
- `[P0]-TASK-404-06-validation-liens/` 📋 PENDING
- `[P1]-TASK-404-07-redirections-externes/` 📋 PENDING
- `[P1]-TASK-404-08-fix-homepage/` 📋 PENDING
- `[P0]-TASK-404-09-validation-finale/` 📋 PENDING

### Autres tâches en cours
- `[P0]-TASK-011-fix-308-nice/` 🔄 EN COURS (90%)
- `[P1]-TASK-006-migration-canonicals-complete/` 🔄 EN COURS (95%)
- `[P1]-TASK-012-villes-hardcodees/` 🔄 EN COURS (85%)
- `[P2]-TASK-009-amelioration-seo/` 🔄 EN COURS (70%)
- `[P2]-TASK-013-internal-linking-homepage/` 🔄 EN COURS (75%)
- `[P2]-TASK-014-optimisation-metadata/` 🔄 EN COURS (80%)

### Exemple
- `TASK-EXAMPLE-exemple-documentation/` → Template de référence

---

## 🔄 Workflow

1. **Tâche créée** → BACKLOG.md → TODO-[PERSONNE].md
2. **Démarrage** : `"Cursor, je démarre TASK-XXX"`
3. **En cours** : Logger dans `progress.md` régulièrement
4. **Commits** : Documenter SHA dans `commits.md`
5. **Décisions** : Noter choix techniques dans `decisions.md`
6. **Tests** : Résultats dans `tests.md`
7. **Terminé** : Archiver dans DONE.md

---

## 📖 Documentation globale

Pour les plans détaillés et analyses globales :
- `.cursor/archives/projet-404/` → Docs globales projet 404
- `.cursor/archives/rapports/` → Rapports datés
- `.cursor/archives/analyses/` → Analyses temporaires

---

*Dernière mise à jour : 2025-11-02*  
*Organisation : 1 tâche = 1 dossier avec structure standard*

