# ⚡ INSTALLATION RAPIDE - Sécurisation Tasks

**Temps** : 2 min  
**Impact** : Système tasks 100% sécurisé

---

## 🎯 EN 3 COMMANDES

### 1. Test (30 sec)
```bash
cd ~/moverz_main-2
node .cursor/scripts/health-check.mjs
```

**Sortie attendue** :
```
✅ SYSTÈME TASKS : PARFAIT (ou avec alertes)
15 tâches trouvées
6 en cours (alerte: trop parallèle)
```

---

### 2. Hook Git (30 sec)
```bash
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "🔒 Validation tasks..."
node .cursor/scripts/validate-tasks.mjs || exit 1
EOF

chmod +x .git/hooks/pre-commit
```

**Test** : `git commit -m "test"` → Devrait valider automatiquement

---

### 3. Alias Shell (1 min)
```bash
# Ajouter à ~/.zshrc
echo 'alias moverz="cd ~/moverz_main-2 && node .cursor/scripts/health-check.mjs"' >> ~/.zshrc
source ~/.zshrc

# Test
moverz
```

---

## 📊 CE QUE TU OBTIENS

### Au démarrage (tape `moverz`)
```
🏥 HEALTH CHECK SYSTÈME TASKS

📈 MÉTRIQUES:
Total tâches:          15
🔄 En cours:           6
⚠️ INCOMPLET:          0

🚨 ALERTES:
⚠️ 6 tâches en cours → Trop parallèle
⚠️ P1-006-SEO-migration-canonicals-100% : Fichiers manquants (tests.md, decisions.md)
```

### Avant commit (automatique)
```
🔒 Validation tasks...
❌ TASK-999-incomplete
   ❌ Fichier manquant: commits.md

❌ Commit bloqué - Fix d'abord
```

---

## 🎯 SCRIPTS DISPONIBLES

| Script | Usage | Quand |
|--------|-------|-------|
| `health-check.mjs` | Tout-en-un | Démarrage session |
| `validate-tasks.mjs` | Structure | Pre-commit (auto) |
| `check-incomplete-tasks.mjs` | INCOMPLET | Démarrage |
| `check-zombie-tasks.mjs` | Zombies >7j | Lundi matin |
| `tasks-dashboard.mjs` | Métriques | À la demande |
| `backup-tasks.sh` | Backup | Optionnel (cron) |
| `create-task-template.sh` | Template | Nouvelle tâche |

---

## 💡 WORKFLOWS

### Au réveil
```bash
moverz  # Dashboard + alertes
```

### Créer nouvelle tâche
```bash
.cursor/scripts/create-task-template.sh TASK-XXX-nom
# → Génère structure complète
```

### Avant commit
```bash
git commit -m "..."
# → Validation auto (hook)
```

---

## 🔗 DOCUMENTATION COMPLÈTE

- `.cursor/README-SECURISATION.md` - Vue exécutive
- `.cursor/INTEGRATION-SECURISATION.md` - Guide complet
- `.cursor/README.md` - Système tasks

---

**🚀 INSTALLE EN 2 MIN, UTILISABLE TOUTE LA VIE !**

