# 📁 Réorganisation `.cursor/` - 2 novembre 2025

## 🎯 Objectif

Nettoyer et structurer le dossier `.cursor/` en archivant les documents temporaires et en maintenant une racine propre avec seulement les fichiers actifs.

---

## ✅ Actions effectuées

### 1. Création structure archives
```bash
.cursor/archives/
├── projet-404/      # Docs globales projet 404
├── rapports/        # Rapports de sessions datés
└── analyses/        # Analyses temporaires
```

### 2. Déplacement fichiers

**→ `archives/projet-404/`** (4 fichiers)
- ANALYSE-LOGIQUE-404-COMPLETE.md
- TASKS-404-DETAILLEES.md
- POUR-GUILLAUME-RESUME-404.md
- RESUME-DEMARRAGE-DEMAIN-404.md

**→ `archives/rapports/`** (3 fichiers)
- RAPPORT-NETTOYAGE-SCRIPTS-20251102.md
- RAPPORT-RESTRUCTURATION-REPO-20251102.md
- RAPPORT-SESSION-01-NOV-2025.md

**→ `archives/analyses/`** (8 fichiers)
- ANALYSE-COMMITS-3-DERNIERS-JOURS.md
- ANALYSE-DEPENDANCES-TASKS-EN-COURS.md
- ANALYSE-PRIORISATION-SEO.md
- MIGRATION-DOCUMENTATION-COMPLETE.md
- ORDRE-EXECUTION-OPTIMAL-FINAL.md
- PRIORISATION-OPTIMALE-TASKS.md
- STATUS-DOCUMENTATION-COMPLETE.md
- TESTS-RESTRUCTURATION-20251102.md

---

## 📊 Résultat

### Avant
- **21 fichiers** à la racine `.cursor/`
- Navigation encombrée
- Mélange actif/archivé

### Après
- **7 items** à la racine (5 fichiers + 2 dossiers)
- Structure claire
- Séparation actif/archivé

### Racine `.cursor/` finale
```
.cursor/
├── BACKLOG.md           # Tâches à faire
├── DONE.md              # Tâches terminées
├── README.md            # Guide système
├── TODO-Guillaume.md    # Tâches actives Guillaume
├── TODO-Lucie.md        # Tâches actives Lucie
├── archives/            # Documentation historique
└── tasks/               # 1 dossier par tâche active
```

---

## 🎯 Principe d'organisation

**Tâche active** → `.cursor/tasks/TASK-XXX-nom/`  
- Documentation complète par tâche
- Structure standardisée (README, context, progress, commits, tests, decisions)

**Documentation globale projet** → `archives/projet-XXX/`  
- Analyses, plans détaillés, guides
- Consultation/référence

**Documents temporaires** → `archives/rapports/` ou `archives/analyses/`  
- Rapports datés
- Analyses ponctuelles
- Tests de restructuration

**Fichiers système actifs** → Racine `.cursor/`  
- BACKLOG, TODO, DONE, README uniquement

---

## ✅ Avantages

1. **Navigation claire** : 7 items au lieu de 21 à la racine
2. **Séparation actif/archivé** : Distinction immédiate
3. **Projet 404 organisé** : Docs globales dans `archives/projet-404/`, tâches dans `tasks/TASK-404-XX/`
4. **Scalable** : Chaque nouveau projet peut avoir son dossier archives
5. **Historique préservé** : Tous les documents conservés et accessibles

---

## 📝 Notes

- Les fichiers dans `archives/` restent consultables mais ne polluent plus la racine
- Cursor créera automatiquement les dossiers `TASK-404-02/`, `TASK-404-03/`, etc. au démarrage de chaque tâche
- Principe : **1 tâche = 1 dossier dans `tasks/`**

---

*Réorganisation effectuée le : 2025-11-02*  
*Durée : 5 minutes*  
*Fichiers déplacés : 15*  
*Fichiers supprimés : 0 (tout archivé)*

