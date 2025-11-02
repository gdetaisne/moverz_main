# 🤖 ONBOARDING CURSOR - LISEZ-MOI EN PREMIER

> **🚨 ATTENTION CURSOR** : Ce fichier contient les instructions de démarrage **OBLIGATOIRES**.
> Tu DOIS lire et appliquer ces étapes à CHAQUE nouvelle session de chat.

---

## ⚡ DÉMARRAGE RAPIDE (30 secondes)

### ÉTAPE 1 : Health Check du Système Tasks
```bash
node .cursor/scripts/health-check.mjs
```

**Affiche** :
- Tâches INCOMPLET (prioritaires)
- Tâches zombies (>7j sans update)
- Métriques globales (15 tâches, 6 en cours, etc.)

### ÉTAPE 2 : Afficher Résultat au User

**Template** :
```
🏥 SYSTÈME TASKS - État actuel :

📊 [X] tâches trouvées
⚠️ [Y] tâches INCOMPLET → PRIORITAIRES !
🧟 [Z] tâches zombies (>7j)
🔄 [W] tâches en cours

🎯 ACTIONS RECOMMANDÉES:
[Afficher les recommandations du health check]

Que veux-tu faire ?
```

### ÉTAPE 3 : Attendre Instructions

**NE JAMAIS coder avant** de :
1. Vérifier qu'une tâche existe dans BACKLOG
2. Rappeler les INCOMPLET si existent
3. Demander confirmation user

---

## 📚 DOCUMENTATION À LIRE

### Système Tasks (PRIORITÉ 1)
- `.cursorrules` - **RÈGLES STRICTES** (applique toujours)
- `.cursor/INDEX-DOCUMENTATION.md` - Index complet
- `.cursor/README.md` - Guide système tasks
- `.cursor/BACKLOG.md` - État tâches

### Architecture Projet (PRIORITÉ 2)
- `docs/architecture/ARCHITECTURE.md` - Structure multi-sites
- `docs/architecture/CONTEXT.md` - Règles pour AI
- `README.md` - Vue d'ensemble

### Guides Opérationnels (PRIORITÉ 3)
- `docs/guides/SITES.md` - 11 sites (URLs, ports)
- `docs/guides/BUILD.md` - Troubleshooting build

---

## 🚫 INTERDICTIONS ABSOLUES

1. ❌ **Coder sans tâche documentée**
   → Proposer création tâche d'abord

2. ❌ **Ignorer tâches INCOMPLET**
   → Rappeler TOUJOURS en priorité

3. ❌ **Marquer FINALISÉ sans les 3 critères**
   → Vérifier : code propre + commits GH + tests 2+ sites

4. ❌ **Créer tâche sans évaluation**
   → Toujours évaluer : priorité P0-P3, temps, assignation

---

## ✅ WORKFLOW CORRECT

```
User: "Peux-tu ajouter [feature] ?"
   ↓
Cursor: Run health-check.mjs
   ↓
Cursor: Affiche état (INCOMPLET ? zombies ?)
   ↓
Cursor: "Je vois que tu veux [feature]. Créons la tâche :
         - Titre : TASK-XXX-[nom]
         - Priorité : P? (à évaluer)
         - Temps : ?h
         Valides-tu ?"
   ↓
User: "Oui"
   ↓
Cursor: Crée structure .cursor/tasks/TASK-XXX/
   ↓
Cursor: Ajoute au BACKLOG + TODO
   ↓
Cursor: "✅ Tâche créée. Je démarre le code ?"
   ↓
User: "Oui"
   ↓
Cursor: Code + log dans progress.md
```

---

## 🎯 COMMANDES RECONNUES

User peut dire :
- `"Cursor, évalue le backlog"` → Analyse priorités
- `"Cursor, je démarre TASK-XXX"` → Setup + marque EN COURS
- `"Cursor, log ma session pour TASK-XXX : [fait]"` → Update progress.md
- `"Cursor, finalise TASK-XXX"` → Vérifie DoD + archive
- `"Cursor, montre les INCOMPLET"` → Liste tâches en pause

---

## 📊 MÉTRIQUES ACTUELLES (Exemple)

```
État au 02/11/2025:
- Total tâches : 15
- EN COURS : 6 (⚠️ trop parallèle)
- INCOMPLET : 0
- P0 critiques : 6
- Complétion : 7%
```

---

## 🔗 LIENS RAPIDES

- **Guide installation scripts** : `.cursor/GUIDE-INSTALLATION-RAPIDE.md`
- **Système tasks complet** : `.cursor/README.md`
- **Index documentation** : `.cursor/INDEX-DOCUMENTATION.md`

---

## ⚡ RÉSUMÉ 1 LIGNE

**Cursor : Lis `.cursorrules` + Run `health-check.mjs` + Affiche état → PUIS attends instructions.**

---

**🎯 Ce fichier garantit que CHAQUE session Cursor démarre avec le contexte complet.**

