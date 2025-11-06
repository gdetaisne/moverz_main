# 🎯 Système de Priorités Visuelles

**Date d'implémentation** : 2025-11-02

---

## 📊 Légende

Les dossiers de tâches ont maintenant un **préfixe visuel de priorité** :

- **[P0]** = 🔴 **Critique / Bloquant**
  - Bugs en production
  - Bloque d'autres tâches
  - Impact business immédiat
  
- **[P1]** = 🟠 **Important**
  - Améliorations SEO importantes
  - Bugs non-bloquants
  - Dépendances modérées

- **[P2]** = 🟡 **Normal**
  - Optimisations
  - Nice-to-have
  - Pas de dépendances critiques

---

## 📁 Répartition actuelle

### 🔴 P0 - Critique (6 tâches)
```
[P0]-TASK-011-fix-308-nice
[P0]-TASK-404-01-audit-structure           ✅ TERMINÉ
[P0]-TASK-404-02-harmonisation-technique   ← PROCHAINE
[P0]-TASK-404-05-correction-liens
[P0]-TASK-404-06-validation-liens
[P0]-TASK-404-09-validation-finale
```

### 🟠 P1 - Important (5 tâches)
```
P1-006-SEO-migration-canonicals-termine
P1-012-SEO-villes-hardcodees-en-cours
[P1]-TASK-404-03-decision-articles
P1-404-07-404-redirections-externes-0%
[P1]-TASK-404-08-fix-homepage
```

### 🟡 P2 - Normal (4 tâches)
```
P2-009-SEO-amelioration-en-cours
P2-013-SEO-internal-linking-homepage-en-cours
P2-014-Metadata-optimisation-termine
[P2]-TASK-404-04-creation-contenu         (optionnel)
```

---

## 🎯 Avantages

✅ **Visibilité immédiate** : Voir en 1 coup d'œil ce qui est critique  
✅ **Tri alphabétique utile** : Les P0 remontent en premier  
✅ **Navigation rapide** : Identifier les tâches bloquantes rapidement  
✅ **Priorisation claire** : Pas besoin d'ouvrir le fichier pour connaître la priorité

---

## 🔄 Workflow recommandé

1. **Toujours traiter P0 en priorité**
   - Surtout si statut ⚠️ INCOMPLET
   
2. **Puis P1** une fois P0 terminés ou en attente

3. **Enfin P2** quand temps disponible

---

## 📝 Convention de nommage

```
[PX]-TASK-NNN-nom-descriptif/
 │    │    │    └─ Description claire
 │    │    └─ Numéro unique
 │    └─ Mot-clé "TASK"
 └─ Priorité P0/P1/P2
```

---

## 🔍 Commandes utiles

**Lister par priorité** :
```bash
ls -1d [P0]*
ls -1d [P1]*
ls -1d [P2]*
```

**Compter par priorité** :
```bash
ls -1d [P0]* | wc -l
ls -1d [P1]* | wc -l
ls -1d [P2]* | wc -l
```

**Voir toutes les tâches triées** :
```bash
ls -1 | grep '^\[P'
```

---

*Créé le : 2025-11-02*  
*Système mis en place pour navigation visuelle rapide*

