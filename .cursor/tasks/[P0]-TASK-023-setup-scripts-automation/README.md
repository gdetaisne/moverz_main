# TASK-023 : Setup Scripts Automation

**Priorité** : P0 (Activation système)  
**Temps estimé** : 5 minutes  
**Assigné à** : Guillaume  
**Statut** : 📋 PENDING

---

## 🎯 Objectif

Activer les scripts automation créés aujourd'hui :
- Hook git pre-commit (validation automatique)
- Alias shell "moverz" (dashboard rapide)
- Test système complet

---

## 📋 Actions (3 Blocs de Commandes)

### 1. Setup Scripts (2 min)

```bash
cd ~/moverz_main-2

# Hook git (validation auto avant commit)
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
node tools/tasks/scripts/validate-tasks.mjs || exit 1
EOF
chmod +x .git/hooks/pre-commit

# Alias shell (raccourci "moverz")
echo 'alias moverz="cd ~/moverz_main-2 && node tools/tasks/scripts/health-check.mjs"' >> ~/.zshrc
source ~/.zshrc

# Test
moverz
```

---

### 2. Commit + Push (3 min)

```bash
git add .
git commit -m "docs: Consolidation finale système complet (doc + automation)"
git push origin refactor/repo-structure-20251102
```

---

### 3. Test Nouveau Chat Cursor (1 min)

```
1. Fermer ce chat
2. Ouvrir nouveau chat
3. Observer message bienvenue avec health check
```

---

## ✅ Résultat Attendu

**Après setup** :
- ✅ `moverz` fonctionne (dashboard immédiat)
- ✅ Validation pre-commit active (bloque si structure invalide)
- ✅ Documentation sur GitHub (versionnée)
- ✅ Cursor auto-éduqué (lit doc au démarrage)

---

## 🔗 Dépendances

**Dépend de** :
- Documentation stratégique créée ✅
- Scripts automation créés ✅
- tools/tasks/ créé ✅
- Consolidation terminée ✅

**Bloque** : Utilisation quotidienne du système

---

## 📖 Documentation

- **Commandes** : `/COMMANDES-A-FAIRE.md` (racine)
- **Récap complet** : `.cursor/CONSOLIDATION-FINALE-02-NOV-2025.md`
- **START HERE** : `/START-HERE.md`

---

*Créé le : 02 novembre 2025*  
*Durée estimée : 5 minutes*  
*Impact : Active tout le système créé aujourd'hui*

