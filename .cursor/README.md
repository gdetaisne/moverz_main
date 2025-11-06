# Guide Complet - Système de Gestion des Tâches

> **Pour Cursor** : Ce document explique en détail le système de gestion des tâches.
> Les règles strictes sont dans `.cursorrules` - ce fichier est la documentation complète.

---

## 📋 Vue d'ensemble

Système de gestion des tâches partagé entre Guillaume et son Associée, 100% intégré à Cursor.

### Principes clés

1. **Pas de code sans tâche documentée**
2. **Tâches INCOMPLET = toujours prioritaires**
3. **Definition of Done stricte** (3 critères obligatoires)
4. **Abandon = revert code complet**
5. **Documentation externe au code**

---

## 🗂️ Structure des fichiers

```
.cursor/
├── BACKLOG.md              # Backlog partagé (granularité limitée)
├── TODO-GUILLAUME.md       # Tâches actives Guillaume
├── TODO-ASSOCIEE.md        # Tâches actives Associée
├── DONE.md                 # Archive des tâches finalisées
├── WORKFLOWS.md            # Commandes Cursor pré-écrites
├── README.md               # Ce fichier
│
└── tasks/                  # Documentation détaillée par tâche
    ├── TASK-001-nom/
    │   ├── README.md       # Vue d'ensemble
    │   ├── context.md      # Contexte détaillé
    │   ├── progress.md     # Journal chronologique
    │   ├── commits.md      # Commits GitHub
    │   ├── tests.md        # Tests et validation
    │   ├── decisions.md    # Décisions techniques
    │   └── assets/         # Logs, screenshots...
    └── TASK-002-nom/
        └── ...
```

---

## 🎯 Statuts des tâches

| Statut | Signification | Priorité |
|--------|---------------|----------|
| **📋 À faire** | Dans le backlog, pas démarrée | Selon P0-P3 |
| **🔄 En cours** | Travail actif en cours | - |
| **⚠️ INCOMPLET** | Mise en pause, à reprendre | **TOUJOURS prioritaire** |
| **❌ ABANDONNÉE** | Annulée avec code reverté + raison | Hors priorités |
| **✅ FINALISÉ** | 3 critères validés | Archivée |

---

## 🔄 Workflow complet

### 1. Créer une tâche

**Commande** : `"Cursor, crée la tâche [description]"`

**Cursor fait** :
1. Évalue priorité (P0-P3) et temps
2. Suggère assignation (Guillaume/Associée/Les deux)
3. Crée entrée dans BACKLOG.md
4. Demande confirmation

### 2. Démarrer une tâche

**Commande** : `"Cursor, je démarre TASK-XXX"`

**Cursor fait** :
1. Vérifie s'il y a des tâches ⚠️ INCOMPLET (rappel priorité)
2. Crée dossier `.cursor/tasks/TASK-XXX-nom/`
3. Génère tous les fichiers template (README, context, progress, commits, tests, decisions)
4. Déplace dans TODO personnel
5. Marque 🔄 En cours dans BACKLOG.md

### 3. Logger une session de travail

**Commande** : `"Cursor, log ma session pour TASK-XXX : [ce que j'ai fait]"`

**Cursor fait** :
1. Ajoute entrée dans `progress.md` avec timestamp
2. Documente actions, problèmes rencontrés, solutions
3. Note le prochain step

### 4. Mettre en pause (INCOMPLET)

**Commande** : `"Cursor, je mets TASK-XXX en pause"`

**Cursor fait** :
1. Log détaillé dans `progress.md` :
   - Raison de la pause
   - État d'avancement (%)
   - Fichiers modifiés non commités
   - Ce qui reste à faire
   - Comment reprendre
2. Marque ⚠️ INCOMPLET dans BACKLOG.md
3. Rappelle que cette tâche devient prioritaire

### 5. Abandonner une tâche

**Commande** : `"Cursor, j'abandonne TASK-XXX : [raison]"`

**Cursor fait** :
1. Liste tous les commits liés à cette tâche
2. Propose commandes `git revert` pour chaque commit
3. Vérifie les sites impactés à redéployer
4. **ATTEND CONFIRMATION** du nettoyage
5. Une fois nettoyé → marque ❌ ABANDONNÉE avec raison documentée
6. Déplace dans section ABANDONNÉES du BACKLOG.md

### 6. Finaliser une tâche

**Commande** : `"Cursor, finalise TASK-XXX"`

**Cursor fait** :
1. **Vérifie Definition of Done** :
   - ✅ Code propre et documenté ?
   - ✅ Commits sur GitHub main + tous dépôts ? (liste SHA)
   - ✅ Testé sur 2+ sites ? (lesquels ?)
2. **Si critères manquants** → refuse et explique ce qui manque
3. **Si tous validés** :
   - Rempli `commits.md` avec tous les SHA
   - Rempli `tests.md` avec sites testés + résultats
   - Marque ✅ FINALISÉ dans README.md de la tâche
   - Archive dans DONE.md avec lien vers doc
   - Supprime du BACKLOG.md

---

## 📊 Priorisation

### Ordre strict

```
1. ⚠️ INCOMPLET (TOUJOURS en premier, peu importe P0-P3)
2. P0 - Bloquants / Critiques
3. P1 - Priorité haute
4. P2 - Priorité normale
5. P3 - Nice-to-have
```

### Échelle de priorité

| Priorité | Signification | Exemples |
|----------|---------------|----------|
| **P0** | Critique, bloquant prod ou équipe | Bug prod, site down, bloque deployment |
| **P1** | Important, impact business significatif | Feature demandée client, bug important |
| **P2** | Normal, évolution planifiée | Amélioration UX, refacto, optimisation |
| **P3** | Nice-to-have, peut attendre | Idées, explorations, petites améliorations |

---

## 🎯 Definition of Done

**3 critères OBLIGATOIRES** pour marquer ✅ FINALISÉ :

### 1. Code propre et documenté
- Code lisible, commenté si nécessaire
- Pas de console.log oubliés
- Respect des conventions du projet
- README mis à jour si besoin

### 2. Sur GitHub main + tous dépôts concernés
- Commits poussés sur `main` du repo principal
- Si multi-sites : déployé sur tous les sites concernés
- SHA documentés dans `commits.md`

### 3. Testé en live sur minimum 2 sites
- Tests fonctionnels sur au moins 2 sites en production
- Résultats documentés dans `tests.md`
- Screenshots/logs dans `assets/` si pertinent

**Aucune exception à ces 3 critères.**

---

## 🗑️ Abandon de tâche

### Checklist obligatoire

Pour marquer ❌ ABANDONNÉE, il FAUT :

- [ ] Identifier tous les commits liés (liste SHA)
- [ ] Si code PAS poussé : `git reset/checkout` pour nettoyer local
- [ ] Si code sur GitHub : `git revert` de tous les commits
- [ ] Si déployé sur sites : redéployer version clean
- [ ] Vérifier `git status` clean (aucun fichier modifié)
- [ ] Documenter la raison dans `progress.md`
- [ ] Marquer ❌ ABANDONNÉE dans README.md de la tâche

**Pas de code zombie !** Si on abandonne, on nettoie complètement.

---

## 🤝 Collaboration à deux

### Tâches personnelles vs partagées

**Format assignation** :
- `[Qui: Guillaume]` - tâche de Guillaume
- `[Qui: Associée]` - tâche de l'Associée
- `[Qui: Guillaume + Associée]` - tâche partagée

### Trouver une tâche pour l'autre

Si Guillaume trouve une tâche pour l'Associée (ou inversement) :

**Commande** : `"Cursor, crée une tâche pour [Associée] : [description]"`

**Cursor fait** :
1. Évalue et ajoute dans BACKLOG.md avec `[Qui: Associée]`
2. La tâche reste dans le BACKLOG jusqu'à ce que l'Associée la démarre

---

## 📝 Templates de documentation

### Structure TASK-XXX/README.md

```markdown
# TASK-XXX : [Titre complet]

**ID** : TASK-XXX
**Type** : Feature | Bugfix | Refactor | Hotfix
**Priorité** : P0 | P1 | P2 | P3
**Assigné** : Guillaume | Associée | Les deux
**Statut** : 📋 À faire | 🔄 En cours | ⚠️ INCOMPLET | ❌ ABANDONNÉE | ✅ FINALISÉ

---

## 📊 Vue rapide

**Démarrée le** : YYYY-MM-DD
**Finalisée le** : YYYY-MM-DD (ou vide)
**Temps estimé** : Xh
**Temps réel** : Xh

**Liens rapides** :
- [Contexte détaillé](./context.md)
- [Journal de bord](./progress.md)
- [Commits GitHub](./commits.md)
- [Tests effectués](./tests.md)
- [Décisions techniques](./decisions.md)

---

## ✅ Definition of Done

- [ ] 1. Code propre et documenté
- [ ] 2. Sur GitHub main + tous dépôts concernés
- [ ] 3. Testé en live sur 2+ sites

---

## 📝 Résumé exécutif

[Description courte de ce qui a été fait / pourquoi abandonné]
```

### Format progress.md (journal)

```markdown
# Journal de bord : TASK-XXX

## 2025-11-01 - 14:30

**Action** : [Ce qui a été fait]
**Fait** : 
- Point 1
- Point 2

**Problème rencontré** : [Description]
**Solution** : [Comment résolu]

**Prochain step** : [Quoi faire ensuite]

---

## 2025-11-01 - 16:00

[Nouvelle session...]
```

---

## 💡 Commandes Cursor rapides

Voir `.cursor/WORKFLOWS.md` pour la liste complète des commandes pré-écrites.

**Commandes essentielles** :
- `Cursor, évalue le backlog`
- `Cursor, montre les INCOMPLET`
- `Cursor, crée la tâche [description]`
- `Cursor, je démarre TASK-XXX`
- `Cursor, log ma session pour TASK-XXX`
- `Cursor, je mets TASK-XXX en pause`
- `Cursor, j'abandonne TASK-XXX : [raison]`
- `Cursor, finalise TASK-XXX`
- `Cursor, clean tasks` → **Workflow interactif fin de journée** 🧹

**Variantes clean tasks** :
- `Cursor, clean tasks en mode rapide` → Version rapide (5 min)
- `Cursor, clean TASK-XXX` → Nettoyer 1 seule tâche
- `Cursor, clean tasks auto : [résumé]` → Automatique avec résumé global

**Détails** : Voir `.cursor/WORKFLOW-CLEAN-TASKS.md`

---

## 🚨 Situations courantes

### Problème critique en cours de journée

**Scénario** : Tu travailles sur P1-050-404-fix-hardcoded-nice-links-100%, un bug critique apparaît.

**Workflow** :
1. `"Cursor, je mets P1-050-404-fix-hardcoded-nice-links-100% en pause : bug critique apparu"`
2. `"Cursor, crée la tâche : Bug critique [description]"` → Cursor évalue en P0
3. `"Cursor, je démarre TASK-051"` (le bug critique)
4. Résoudre le bug
5. `"Cursor, finalise TASK-051"`
6. `"Cursor, je reprends P1-050-404-fix-hardcoded-nice-links-100%"` (tâche INCOMPLET prioritaire)

### Tâche plus complexe que prévu

**Scénario** : Estimation 3h, mais après 5h toujours pas fini.

**Options** :
1. **Continuer** : Log dans progress.md la raison du dépassement
2. **Mettre en pause** : Si besoin de faire autre chose d'urgent
3. **Réduire le scope** : Finaliser ce qui est fait, créer nouvelle tâche pour le reste

### Tâche partiellement utile

**Scénario** : Tu veux abandonner P1-045-Analytics-qa-ctr-100% mais une partie du code est utile.

**Options** :
1. **Extraire le code utile** :
   - Créer P0-046-SERP-favicon-logo-100% "Refacto X" (scope réduit)
   - Finaliser P0-046-SERP-favicon-logo-100% proprement
   - Abandonner P1-045-Analytics-qa-ctr-100% (revert le reste)

2. **Réduire le scope** :
   - Ne pas abandonner
   - Finaliser avec scope réduit
   - Documenter pourquoi le scope a changé

---

## 📈 Statistiques et suivi

### Dans BACKLOG.md

```markdown
## 📊 STATS RAPIDES
- **⚠️ INCOMPLET** : X tâches
- **P0** : X tâches
- **P1** : X tâches  
- **P2** : X tâches
- **P3** : X tâches
- **Total** : X tâches
```

### Commande Cursor

`"Cursor, donne-moi les stats du backlog"`

**Cursor affiche** :
- Nombre de tâches par statut
- Nombre par priorité
- Répartition Guillaume vs Associée
- Tâches en pause depuis > 7 jours (alerte)

---

## ✅ Checklist quotidienne

### Matin

1. Ouvrir Cursor
2. Cursor rappelle automatiquement s'il y a des ⚠️ INCOMPLET
3. `"Cursor, évalue mon TODO + le backlog"`
4. Décider quoi faire aujourd'hui
5. `"Cursor, je démarre TASK-XXX"`

### Soir

1. `"Cursor, clean tasks"` → **Workflow interactif guidé (5-10 min)**
   - Logger toutes les sessions
   - Documenter les commits
   - Mettre à jour les statuts (terminé/pause/en cours/abandonné)
   - Nettoyer fichiers temporaires
   - MAJ TODO-Guillaume.md
   - Préparer plan demain
   - Commit documentation (optionnel)

**Alternative rapide** : `"Cursor, clean tasks en mode rapide"` (si pressé)

---

## 🎓 Exemples complets

Voir `.cursor/tasks/TASK-EXAMPLE-exemple-documentation/` pour un exemple complet de documentation de tâche.

---

**Dernière mise à jour** : 2025-11-02  
**Nouvelle commande** : `Cursor, clean tasks` - Workflow interactif fin de journée


