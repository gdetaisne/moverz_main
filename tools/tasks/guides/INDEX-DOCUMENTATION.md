# 📚 INDEX DOCUMENTATION - LECTURE OBLIGATOIRE CURSOR

> **🤖 Pour Cursor** : Ce fichier liste TOUTE la documentation que tu DOIS lire au démarrage de chaque session.
> Lis ces fichiers dans l'ordre pour comprendre le contexte complet du projet.

---

## 🎯 ORDRE DE LECTURE OBLIGATOIRE

### 1. SYSTÈME DE TASKS (PRIORITÉ ABSOLUE) 🔥

**Lire EN PREMIER avant toute action** :

#### Règles strictes
- `.cursorrules` - **RÈGLES OBLIGATOIRES** (applique systématiquement)
- `.cursor/README.md` - Guide complet système tasks (400+ lignes)

#### Fichiers d'état
- `.cursor/BACKLOG.md` - Backlog partagé (vérifier INCOMPLET en premier)
- `.cursor/TODO-Guillaume.md` - Tâches actives Guillaume
- `.cursor/TODO-Lucie.md` - Tâches actives Lucie

#### Scripts de validation
- **RUN AUTOMATIQUEMENT** : `node .cursor/scripts/health-check.mjs`
  - Vérifie tâches INCOMPLET
  - Affiche métriques
  - Alerte sur anomalies

---

### 2. ARCHITECTURE PROJET (Contexte technique)

#### Architecture
- `docs/architecture/ARCHITECTURE.md` - ⭐ Structure multi-sites (LIRE EN PREMIER)
- `docs/architecture/CONTEXT.md` - Règles pour AI/développeurs
- `docs/architecture/DECISIONS.md` - Décisions techniques historiques

#### Guides opérationnels
- `docs/guides/SITES.md` - État des 11 sites (URLs, ports, status)
- `docs/guides/BUILD.md` - Résolution problèmes build
- `docs/guides/TROUBLESHOOTING.md` - Dépannage général

#### README principal
- `README.md` - Vue d'ensemble projet (racine)

---

### 3. TÂCHES EN COURS (Contexte immédiat)

**Avant de proposer toute action, LIRE** :

- `.cursor/tasks/[P0]-TASK-XXX/README.md` - Toutes les tâches P0 actives
- `.cursor/tasks/[P1]-TASK-XXX/README.md` - Tâches P1 en cours
- `progress.md` de chaque tâche EN COURS - Comprendre où on en est

---

### 4. DOCUMENTATION SPÉCIFIQUE (Si pertinent)

#### Rapports récents
- `docs/reports/` - Audits et synthèses sessions

#### Documentation technique
- `scripts/README.md` - Documentation scripts actifs
- `.cursor/scripts/README.md` - Scripts automation tasks

---

## 🚨 WORKFLOW DÉMARRAGE CURSOR

### ÉTAPE 1 : Health Check (AUTOMATIQUE)
```bash
node .cursor/scripts/health-check.mjs
```

**Cursor affiche** :
```
🏥 HEALTH CHECK SYSTÈME TASKS

📊 15 tâches trouvées
⚠️ 1 tâche INCOMPLET → PRIORITAIRE
⚠️ 3 tâches zombies (>7j)
🔄 6 tâches en cours

🎯 ACTIONS RECOMMANDÉES:
1. Reprendre TASK-006 (INCOMPLET)
2. Finaliser tâches zombies
```

### ÉTAPE 2 : Attendre Instructions User

**NE JAMAIS** :
- ❌ Proposer de coder avant vérif BACKLOG
- ❌ Créer tâche sans demander confirmation
- ❌ Ignorer les INCOMPLET

**TOUJOURS** :
- ✅ Vérifier BACKLOG d'abord
- ✅ Rappeler INCOMPLET si existent
- ✅ Proposer évaluation priorités

---

## 📋 CHECKLIST CURSOR DÉMARRAGE SESSION

```
[ ] 1. Lire .cursorrules (règles strictes)
[ ] 2. Run health-check.mjs (métriques + alertes)
[ ] 3. Lire BACKLOG.md section INCOMPLET
[ ] 4. Lire TODO-Guillaume.md ou TODO-Lucie.md (selon user)
[ ] 5. Si user demande code → Vérifier tâche existe
[ ] 6. Si pas de tâche → Proposer création + évaluation
[ ] 7. Si INCOMPLET → Rappeler AVANT toute action
```

---

## 🎯 RÉPONSES TYPE CURSOR

### User : "Peux-tu coder [feature] ?"

**Cursor répond** :
```
⚠️ Avant de coder, vérifions le système de tasks.

*[Run health-check automatiquement]*

📊 État actuel:
- 1 tâche INCOMPLET (TASK-006) → Prioritaire !
- 3 tâches zombies → À finaliser

💡 Je recommande:
A) Reprendre TASK-006 d'abord (INCOMPLET prioritaire)
B) Créer nouvelle tâche pour [feature] (après INCOMPLET)

Veux-tu :
1. Reprendre TASK-006 ?
2. Justifier pourquoi ignorer INCOMPLET ?
3. Voir détails TASK-006 ?
```

---

### User : "Cursor, je démarre TASK-XXX"

**Cursor fait** :
```
1. Vérifie si TASK-XXX existe dans BACKLOG
2. Vérifie INCOMPLET (rappel si existent)
3. Crée .cursor/tasks/TASK-XXX/ avec 6 fichiers
4. Déplace dans TODO-[personne].md
5. Marque EN COURS dans BACKLOG
6. Affiche "✅ Prêt à travailler sur TASK-XXX"
```

---

### User : "Cursor, finalise TASK-XXX"

**Cursor fait** :
```
1. Run validate-tasks.mjs
2. Vérifie Definition of Done:
   - Code propre ? ✅/❌
   - Commits sur GitHub ? (liste SHA)
   - Testé sur 2+ sites ? (lesquels ?)
3. Si manquant → Refuse + explique
4. Si OK → Archive dans DONE.md
```

---

## 🔧 FICHIERS CONFIGURATION

### Fichiers que Cursor LIT AUTOMATIQUEMENT
1. `.cursorrules` - **RÈGLES (déjà lu)**
2. `README.md` - Vue d'ensemble
3. `.cursor/INDEX-DOCUMENTATION.md` - **CE FICHIER** (à ajouter aux règles)

### Fichiers que Cursor DOIT EXÉCUTER
1. `.cursor/scripts/health-check.mjs` - **AU DÉMARRAGE**
2. `.cursor/scripts/validate-tasks.mjs` - **AVANT COMMIT**

---

## 💡 AMÉLIORATION .cursorrules

Ajouter section :

```markdown
## 🚀 DÉMARRAGE SESSION CURSOR

À CHAQUE nouveau chat, Cursor DOIT :

1. **Lire** `.cursor/INDEX-DOCUMENTATION.md` (ce fichier)
2. **Exécuter** `node .cursor/scripts/health-check.mjs`
3. **Afficher** résultat au user :
   - Tâches INCOMPLET (si existent)
   - Tâches zombies (si existent)
   - Dashboard métriques
4. **Attendre** instructions user avant toute action

Si user demande de coder AVANT ces étapes :
→ Refuser poliment et exécuter health-check d'abord
```

---

## 🎯 SOLUTION COMPLÈTE

**3 fichiers clés** qui forcent Cursor à suivre le process :

1. **`.cursorrules`** (existant) → Règles strictes
2. **`.cursor/INDEX-DOCUMENTATION.md`** (nouveau) → Checklist lecture
3. **`.cursor/scripts/health-check.mjs`** (nouveau) → Validation auto

**+** Amélioration `.cursorrules` avec section démarrage

---

**Ce fichier sert de "table des matières" obligatoire pour Cursor** ✅

