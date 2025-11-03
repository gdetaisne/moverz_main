# 🔧 Tools Tasks - Scripts Automation & Guides

**Créé** : 02 novembre 2025  
**Purpose** : Scripts automation pour système de gestion des tâches

---

## 📁 Structure

```
tools/tasks/
├── scripts/          → 7 scripts automation (exécutables)
└── guides/           → Guides sécurisation (documentation)
```

---

## ⚡ Scripts Disponibles

### Dashboard & Monitoring

| Script | Fonction | Usage |
|--------|----------|-------|
| `health-check.mjs` | Dashboard complet (tout-en-un) | `node tools/tasks/scripts/health-check.mjs` |
| `tasks-dashboard.mjs` | Métriques visuelles | `node tools/tasks/scripts/tasks-dashboard.mjs` |

---

### Validation & Sécurité

| Script | Fonction | Usage |
|--------|----------|-------|
| `validate-tasks.mjs` | Validation structure (6 fichiers) | Pre-commit hook (auto) |
| `check-incomplete-tasks.mjs` | Rappel tâches INCOMPLET | Démarrage session |
| `check-zombie-tasks.mjs` | Détecte tâches >7j sans update | Hebdomadaire (lundi) |

---

### Utilitaires

| Script | Fonction | Usage |
|--------|----------|-------|
| `backup-tasks.sh` | Backup .cursor/ | Quotidien (optionnel) |
| `create-task-template.sh` | Génère template tâche | Nouvelle tâche |

---

## 🔗 Symlink

**`.cursor/scripts/` → `../../tools/tasks/scripts/`**

**Avantages** :
- ✅ Scripts versionnés dans `tools/`
- ✅ `.cursor/scripts/` fonctionne toujours (compatibilité)
- ✅ Séparé de `.cursor/` IDE
- ✅ Partageable (GitHub)

---

## 📚 Guides

### Documentation Sécurisation

| Guide | Contenu |
|-------|---------|
| `GUIDE-INSTALLATION-RAPIDE.md` | Setup 2 min |
| `INTEGRATION-SECURISATION.md` | Guide complet 30 pages |
| `README-SECURISATION.md` | Vue exécutive |
| `SYNTHESE-SECURISATION.md` | Résumé |
| `TABLEAU-DE-BORD-FINAL.md` | Métriques session |

---

## 🚀 Utilisation

### Dashboard Matin

```bash
# Alias shell (après setup)
moverz

# OU direct
node tools/tasks/scripts/health-check.mjs
```

**Affiche** :
- Tâches INCOMPLET (prioritaires)
- Tâches zombies (>7j)
- Métriques globales
- Recommandations

---

### Validation Manuelle

```bash
node tools/tasks/scripts/validate-tasks.mjs
```

**Vérifie** :
- Structure complète (6 fichiers par tâche)
- Fichiers non vides
- Sections obligatoires

---

### Créer Nouvelle Tâche

```bash
tools/tasks/scripts/create-task-template.sh TASK-XXX-nom
```

**Génère** :
```
.cursor/tasks/TASK-XXX-nom/
├── README.md
├── context.md
├── progress.md
├── commits.md
├── tests.md
├── decisions.md
└── assets/
```

---

## 🔧 Automatisation Configurée

### Hook Git Pre-Commit

**Installation** :
```bash
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
node tools/tasks/scripts/validate-tasks.mjs || exit 1
EOF
chmod +x .git/hooks/pre-commit
```

**Effet** :
- Run automatiquement avant chaque commit
- Bloque si structure invalide
- Garantit cohérence

---

### Alias Shell

**Installation** :
```bash
echo 'alias moverz="cd ~/moverz_main-2 && node tools/tasks/scripts/health-check.mjs"' >> ~/.zshrc
source ~/.zshrc
```

**Utilisation** :
```bash
moverz  # Dashboard immédiat
```

---

## 📊 Garanties

### Ce qui est FORCÉ

- ✅ Structure complète (6 fichiers obligatoires)
- ✅ Validation pre-commit (impossible de bypass sans --no-verify)
- ✅ Rappel INCOMPLET (au démarrage)
- ✅ Détection zombies (hebdo)

### Ce qui est ALERTÉ

- ⚠️ Tâches >7j sans update
- ⚠️ >3 tâches en parallèle
- ⚠️ Fichiers quasi-vides (<10 chars)
- ⚠️ Sections manquantes

---

## 🔗 Liens

**Documentation principale** :
- `.cursor/INDEX-DOCUMENTATION.md` (point d'entrée)
- `.cursor/README.md` (système tasks)
- `START-HERE.md` (racine projet)

**Guides setup** :
- `tools/tasks/guides/GUIDE-INSTALLATION-RAPIDE.md`

---

## ⚡ Quick Reference

```bash
# Dashboard
moverz

# Validation
node tools/tasks/scripts/validate-tasks.mjs

# Check INCOMPLET
node tools/tasks/scripts/check-incomplete-tasks.mjs

# Check zombies
node tools/tasks/scripts/check-zombie-tasks.mjs

# Nouveau template
tools/tasks/scripts/create-task-template.sh TASK-XXX
```

---

*Scripts automation pour système de gestion des tâches Moverz*  
*Version : 1.0 - Production Ready*  
*Dernière mise à jour : 02 novembre 2025*

