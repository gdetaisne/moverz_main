# ⚡ Commandes Cursor - Référence Rapide

---

## 🎯 GESTION DE TÂCHES

### Planification
```bash
"Cursor, évalue le backlog"
"Cursor, montre les INCOMPLET"
"Cursor, crée la tâche [description]"
"Cursor, crée une tâche pour [Lucie] : [description]"
```

### Exécution
```bash
"Cursor, je démarre TASK-XXX"
"Cursor, log ma session pour TASK-XXX : [ce que j'ai fait]"
```

### Statut
```bash
"Cursor, je mets TASK-XXX en pause : [raison]"
"Cursor, j'abandonne TASK-XXX : [raison]"
"Cursor, finalise TASK-XXX"
```

---

## 🧹 CLEAN TASKS (FIN DE JOURNÉE)

### Commande principale
```bash
"Cursor, clean tasks"
```
→ **Workflow interactif guidé (5-10 min)**
- Logger toutes les sessions
- Documenter commits
- MAJ statuts (terminé/pause/en cours/abandonné)
- Nettoyer fichiers temporaires
- MAJ TODO-Guillaume.md
- Préparer plan demain
- Commit documentation (optionnel)

**Documentation** : `.cursor/WORKFLOW-CLEAN-TASKS.md`  
**Aide-mémoire** : `.cursor/AIDE-MEMOIRE-CLEAN-TASKS.md`

### Variantes
```bash
"Cursor, clean tasks en mode rapide"
→ Version rapide (3-5 min), skip détails

"Cursor, clean TASK-XXX"
→ Nettoyer 1 seule tâche (2-3 min)

"Cursor, clean tasks auto : [résumé global]"
→ Automatique avec détection (2 min)
```

---

## 📊 ANALYSE & STATS

```bash
"Cursor, donne-moi les stats du backlog"
"Cursor, évalue mon TODO + le backlog"
```

---

## 🚀 DÉPLOIEMENT

### Scripts disponibles
```bash
./scripts/deploy/push-main.sh              # Push monorepo principal
./scripts/deploy/push-all-sites.sh         # Push tous les sites (11 villes)
./scripts/deploy/push-site.sh <ville>      # Push un seul site
```

### Options force deploy
```bash
./scripts/deploy/push-all-sites.sh --force-deploy      # Rebuild CapRover immédiat
./scripts/deploy/push-site.sh bordeaux --force-deploy  # Rebuild CapRover immédiat
```

**Documentation complète** : `scripts/deploy/README.md`

---

## 🔄 WORKFLOW COMPLET

### Matin
```bash
1. Cursor rappelle automatiquement les ⚠️ INCOMPLET
2. "Cursor, évalue mon TODO + le backlog"
3. "Cursor, je démarre TASK-XXX"
```

### Pendant travail
```bash
"Cursor, log ma session pour TASK-XXX : [résumé]"
```

### Soir
```bash
"Cursor, clean tasks"
```

---

## 🚨 SITUATIONS SPÉCIALES

### Bug critique en cours de journée
```bash
1. "Cursor, je mets TASK-XXX en pause : bug critique"
2. "Cursor, crée la tâche : Bug [description]"
3. "Cursor, je démarre TASK-YYY" (le bug)
4. [Résoudre]
5. "Cursor, finalise TASK-YYY"
6. Reprendre TASK-XXX (INCOMPLET prioritaire)
```

### Tâche plus longue que prévu
```bash
Option 1: Continue + log raison dépassement
Option 2: "Cursor, je mets TASK-XXX en pause : trop complexe"
Option 3: Réduire scope + finaliser + créer nouvelle tâche pour reste
```

---

## 📖 DOCUMENTATION

| Fichier | Contenu |
|---------|---------|
| `.cursor/README.md` | Guide complet système |
| `.cursor/WORKFLOW-CLEAN-TASKS.md` | Workflow détaillé clean tasks |
| `.cursor/AIDE-MEMOIRE-CLEAN-TASKS.md` | Aide-mémoire visuel |
| `.cursor/BACKLOG.md` | Toutes les tâches à faire |
| `.cursor/TODO-Guillaume.md` | Tes tâches actives |
| `.cursor/TODO-Lucie.md` | Tâches Lucie |
| `.cursor/DONE.md` | Archive tâches terminées |
| `.cursor/tasks/[PX]-TASK-XXX/` | Doc complète par tâche |
| `.cursor/tasks/README.md` | Organisation dossiers tasks |
| `.cursor/tasks/PRIORITES-VISUELLES.md` | Système priorités [P0]/[P1]/[P2] |

---

## 🎯 PRIORITÉS VISUELLES

Les dossiers tasks/ ont des préfixes :

- **[P0]** = 🔴 Critique / Bloquant
- **[P1]** = 🟠 Important
- **[P2]** = 🟡 Normal

**Commandes utiles** :
```bash
ls -1d .cursor/tasks/\[P0\]*    # Lister P0
ls -1d .cursor/tasks/\[P1\]*    # Lister P1
ls -1d .cursor/tasks/\[P2\]*    # Lister P2
```

---

## ✅ DEFINITION OF DONE (3 critères)

Pour marquer une tâche ✅ TERMINÉE :

1. ✅ Code propre et documenté
2. ✅ Commits GitHub main + SHA documentés
3. ✅ Testé sur 2+ sites avec résultats documentés

**Si 1 critère manque** → Cursor refuse de finaliser

---

## 🚫 CONTRAINTES STRICTES

1. ❌ **Pas de code sans tâche documentée**
2. ❌ **Tâches ⚠️ INCOMPLET = TOUJOURS prioritaires**
3. ❌ **Pas de ✅ TERMINÉE sans les 3 critères DoD**
4. ❌ **Pas de ❌ ABANDONNÉE sans revert code complet**

---

*Référence rapide pour usage quotidien*  
*Dernière mise à jour : 2025-11-02*

