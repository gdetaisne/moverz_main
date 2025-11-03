# ✅ Setup "Clean Tasks" - Complet !

**Date** : 2025-11-02  
**Durée setup** : 15 minutes

---

## 🎯 Ce qui a été créé

### 1️⃣ Workflow interactif complet
📄 **`.cursor/WORKFLOW-CLEAN-TASKS.md`** (8.2K)
- Process détaillé étape par étape
- 9 étapes guidées avec questions/réponses
- Gestion des 4 statuts (TERMINÉE/PAUSE/EN COURS/ABANDONNÉE)
- Validation DoD automatique
- 3 modes : complet / rapide / automatique

### 2️⃣ Aide-mémoire visuel
📄 **`.cursor/AIDE-MEMOIRE-CLEAN-TASKS.md`** (3.4K)
- Vue d'ensemble rapide
- Tableau des commandes
- Exemples d'utilisation
- Tips et astuces

### 3️⃣ Référence commandes
📄 **`.cursor/COMMANDES-RAPIDES.md`** (3.8K)
- Toutes les commandes Cursor
- Workflows complets matin/soir
- Situations spéciales
- Liens vers documentation

### 4️⃣ Documentation mise à jour
📄 **`.cursor/README.md`** (mis à jour)
- Section "Commandes Cursor rapides" enrichie
- Section "Checklist quotidienne" avec clean tasks
- Référence au workflow

---

## 🚀 Comment l'utiliser

### En fin de journée, tape simplement :

```
"Cursor, clean tasks"
```

**Cursor va alors** :

1. **Te demander** quelles tâches tu as travaillées
2. **Te guider** pour logger chaque session
3. **Te demander** si tu as fait des commits
4. **Te demander** le statut de chaque tâche
5. **Vérifier** la DoD si tu veux marquer TERMINÉE
6. **Nettoyer** les fichiers temporaires
7. **Mettre à jour** ton TODO automatiquement
8. **Préparer** ton plan pour demain
9. **Proposer** un commit de documentation

**Tout est interactif et flexible !**

---

## ⚡ Variantes disponibles

### Mode rapide (si pressé)
```
"Cursor, clean tasks en mode rapide"
```
→ 3-5 minutes au lieu de 10

### 1 seule tâche
```
"Cursor, clean TASK-404-02"
```
→ Workflow complet mais pour 1 tâche uniquement

### Mode automatique
```
"Cursor, clean tasks auto : J'ai travaillé 3h sur TASK-404-02, 
fixé Marseille/Lyon, reste 8 villes. Commits a1b2c3d et d4e5f6g."
```
→ Cursor détecte et documente tout automatiquement

---

## 📋 Ce que ça fait concrètement

### Pour CHAQUE tâche travaillée :

✅ **Logger la session** → `progress.md`
```markdown
### 2025-11-02 - Session 14h-17h (3h)
- ✅ Fix cleanSlug() Marseille (15 min)
- ✅ Fix cleanSlug() Lyon (15 min)
- ⏳ En cours : Retrait accents (1h fait, reste 8 villes)
```

✅ **Documenter commits** → `commits.md`
```markdown
### Commit #1 : Fix cleanSlug Marseille + Lyon
- SHA : a1b2c3d
- Date : 2025-11-02 15h30
- Fichiers : sites/marseille/lib/blog.ts, sites/lyon/lib/blog.ts
```

✅ **MAJ statut** → `BACKLOG.md` + `TODO-Guillaume.md`
- Si TERMINÉE → Archive `DONE.md`
- Si PAUSE → Marque ⚠️ INCOMPLET
- Si EN COURS → Plan demain
- Si ABANDONNÉE → Revert + archive

✅ **Préparer demain** → `TODO-Guillaume.md`
```markdown
## 📅 PLANIFIÉ DEMAIN (3 NOV 2025)

### Priorité #1 : Finir [P0]-TASK-404-02 ⚠️ INCOMPLET
- Temps restant : 1h
- Actions : 8 villes + tests
```

---

## 🎯 Avantages

### Pour toi
✅ **Gain de temps** : Process guidé, pas besoin de réfléchir  
✅ **Continuité** : Tu sais exactement où tu en es demain  
✅ **Traçabilité** : Tous les commits documentés  
✅ **Clarté** : Statuts toujours à jour

### Pour Lucie
✅ **Collaboration** : Elle peut reprendre tes tâches facilement  
✅ **Visibilité** : Elle voit ce qui a été fait  
✅ **Coordination** : Pas de doublon ou confusion

### Pour le système
✅ **Respect des contraintes** : DoD vérifiée automatiquement  
✅ **Cohérence** : TODO/BACKLOG/DONE toujours synchro  
✅ **Documentation** : Zéro oubli, tout est tracé

---

## 📖 Documentation complète

| Fichier | Usage |
|---------|-------|
| `WORKFLOW-CLEAN-TASKS.md` | Process détaillé (lecture complète) |
| `AIDE-MEMOIRE-CLEAN-TASKS.md` | Référence rapide quotidienne |
| `COMMANDES-RAPIDES.md` | Toutes les commandes disponibles |

---

## 🧪 Test rapide (optionnel)

Tu peux tester maintenant :

```
"Cursor, clean tasks en mode rapide"
```

Cursor va te demander quelques questions et tu verras le workflow en action !

---

## 💡 Tips d'utilisation

### Utilise-le systématiquement
- **Chaque fin de journée** : 5-10 min investis
- **Avant de partir** : Tu pars l'esprit tranquille
- **Avant le week-end** : Super important pour reprendre lundi

### N'oublie pas
- Plus tu es précis dans tes résumés, mieux c'est
- Logger les problèmes rencontrés aide beaucoup
- Documenter les décisions = gain de temps futur

### Shortcuts mentaux
- Travaillé sur 1 tâche ? → `clean TASK-XXX` (2 min)
- Pressé ? → `clean tasks en mode rapide` (5 min)
- Session normale ? → `clean tasks` (10 min)

---

## 🎉 Prêt à l'emploi !

**Dès ce soir**, tu peux utiliser :

```bash
"Cursor, clean tasks"
```

Et Cursor te guidera à travers tout le processus ! 🚀

---

## 📊 Récapitulatif

```
✅ Workflow interactif créé (9 étapes)
✅ 3 modes disponibles (complet/rapide/auto)
✅ Documentation complète (3 fichiers)
✅ README.md mis à jour
✅ Aide-mémoires créés
✅ Commandes référencées
✅ Flexible et adaptatif
✅ Prêt à l'emploi immédiatement
```

**Tout est en place pour des "clean tasks" efficaces chaque soir !** 💪

---

*Setup créé le : 2025-11-02*  
*Temps d'utilisation quotidien : 5-10 min*  
*ROI : Clarté mentale + continuité garantie*

