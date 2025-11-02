# ⚡ ACTION REQUISE - Sécurisation Tasks

**TL;DR** : J'ai créé 7 scripts pour automatiser ton système de tasks, mais ils sont dans `.cursor/` qui est **gitignored**. **Décide comment les versionner** (3 options ci-dessous).

---

## ✅ CE QUI EST FAIT

### 1. Scripts Automation (7 fichiers) ✅
- `health-check.mjs` - Dashboard complet au démarrage
- `validate-tasks.mjs` - Valide structure (pre-commit)
- `check-incomplete-tasks.mjs` - Rappel INCOMPLET
- `check-zombie-tasks.mjs` - Détecte >7j sans update
- `tasks-dashboard.mjs` - Métriques visuelles
- `backup-tasks.sh` - Backup quotidien
- `create-task-template.sh` - Template auto

### 2. Documentation (5 guides) ✅
- `GUIDE-INSTALLATION-RAPIDE.md` - Setup 2 min
- `README-SECURISATION.md` - Vue exécutive
- `INTEGRATION-SECURISATION.md` - Guide complet
- `INDEX-DOCUMENTATION.md` - Checklist Cursor
- `GUIDE-IMPLEMENTATION-FINALE.md` - Ce qu'il faut faire

### 3. Configuration ✅
- `.cursorrules` - Mis à jour (section démarrage)
- `CURSOR-ONBOARDING.md` - Instructions racine (versionné)

---

## 🚨 PROBLÈME

```
.cursor/ est dans .gitignore
→ Scripts PAS versionnés
→ Pas sur GitHub
→ Lucie ne peut pas utiliser
```

---

## 🎯 3 SOLUTIONS (Choisis 1)

### Option 1 : APPROCHE HYBRIDE ⭐ RECOMMANDÉE

**Concept** : Scripts versionnés dans `/tools`, symlink depuis `.cursor/`

```bash
# 1. Créer tools/
mkdir -p tools/tasks
cp -r .cursor/scripts/ tools/tasks/scripts/
cp .cursor/GUIDE-*.md tools/tasks/
cp .cursor/*.md tools/tasks/ # Tous les guides

# 2. Symlink
rm -rf .cursor/scripts
ln -s ../../tools/tasks/scripts .cursor/scripts

# 3. Commit
git add tools/ CURSOR-ONBOARDING.md .cursorrules
git commit -m "feat: Scripts tasks dans /tools + onboarding Cursor"
git push
```

**Avantages** :
- ✅ Propre (séparé de .cursor/ IDE)
- ✅ Versionné (GitHub)
- ✅ .cursor/scripts fonctionne (symlink)
- ✅ Partageable Lucie

**Test** : `node .cursor/scripts/health-check.mjs` → Devrait marcher

---

### Option 2 : Exception .gitignore

**Concept** : Garder dans `.cursor/` mais versionner quand même

```bash
# 1. Modifier .gitignore
cat >> .gitignore << 'EOF'

# Exception : Scripts tasks versionnés
!.cursor/scripts/
!.cursor/*GUIDE*.md
!.cursor/*SECURISATION*.md
!.cursor/INDEX*.md
EOF

# 2. Forcer ajout
git add -f .cursor/scripts/
git add -f .cursor/*.md

# 3. Commit
git commit -m "feat: Versionne scripts tasks (exception gitignore)"
git push
```

**Avantages** :
- ✅ Simple (1 ligne gitignore)
- ✅ Scripts restent dans .cursor/

**Inconvénients** :
- ⚠️ Risque commits accidentels fichiers Cursor IDE

---

### Option 3 : Repo Git Séparé

**Concept** : Repo dédié pour scripts tasks

```bash
# 1. Créer repo
mkdir ~/.moverz-tasks-scripts
cd ~/.moverz-tasks-scripts
git init

# 2. Copier scripts
cp -r ~/moverz_main-2/.cursor/scripts .
cp ~/moverz_main-2/.cursor/*GUIDE*.md .

# 3. Push
git add . && git commit -m "init: Scripts tasks Moverz"
git remote add origin https://github.com/gdetaisne/moverz-tasks-automation
git push -u origin main

# 4. Clone dans .cursor/
cd ~/moverz_main-2/.cursor
git clone https://github.com/gdetaisne/moverz-tasks-automation scripts
```

**Avantages** :
- ✅ Totalement séparé
- ✅ Réutilisable autres projets
- ✅ Updates git pull

**Inconvénients** :
- ❌ Gestion 2 repos
- ❌ Setup complexe

---

## ⚡ MON CHOIX : **OPTION 1 (Hybride)**

**Pourquoi** :
1. ✅ Professionnel (/tools bien rangé)
2. ✅ Simple (symlink transparent)
3. ✅ Versionné (GitHub)
4. ✅ 0 risque commit accidentel

---

## 🚀 IMPLÉMENTATION (3 MIN)

### Commandes Exactes

```bash
cd ~/moverz_main-2

# 1. Créer structure tools/
mkdir -p tools/tasks/{scripts,guides}

# 2. Copier fichiers
cp -r .cursor/scripts/* tools/tasks/scripts/
cp .cursor/GUIDE-*.md tools/tasks/guides/
cp .cursor/README-SECURISATION.md tools/tasks/guides/
cp .cursor/SYNTHESE-SECURISATION.md tools/tasks/guides/
cp .cursor/INTEGRATION-SECURISATION.md tools/tasks/guides/
cp .cursor/INDEX-DOCUMENTATION.md tools/tasks/guides/
cp .cursor/TABLEAU-DE-BORD-FINAL.md tools/tasks/guides/

# 3. Créer symlink
rm -rf .cursor/scripts
ln -s ../../tools/tasks/scripts .cursor/scripts

# 4. Mettre à jour chemins .cursorrules
sed -i '' 's|node \.cursor/scripts/|node tools/tasks/scripts/|g' .cursorrules
sed -i '' 's|\.cursor/scripts/|tools/tasks/scripts/|g' .cursorrules

# 5. Commit + push
git add tools/ CURSOR-ONBOARDING.md .cursorrules
git commit -m "feat: Scripts tasks automation + onboarding Cursor

🔒 Scripts (versionnés dans /tools):
- 7 scripts automation (health-check, validate, etc.)
- Symlink: .cursor/scripts → tools/tasks/scripts

📚 Documentation:
- 5 guides complets dans tools/tasks/guides/
- CURSOR-ONBOARDING.md racine (instructions démarrage)
- .cursorrules mis à jour (section démarrage auto)

🎯 Impact:
- Cursor forcé de run health-check au démarrage
- Validation pre-commit automatique
- Système tasks 100% sécurisé
- Partageable Lucie immédiatement"

git push
```

---

## 🧪 VALIDATION POST-INSTALLATION

### Test 1 : Scripts Fonctionnent
```bash
node tools/tasks/scripts/health-check.mjs
# OU
node .cursor/scripts/health-check.mjs  # Via symlink
```

**Attendu** : Dashboard complet

---

### Test 2 : Nouveau Chat Cursor
```
1. Fermer Cursor complètement
2. Rouvrir projet
3. Nouveau chat
4. Envoyer : "Bonjour"

Cursor DEVRAIT afficher:
"Bonjour ! *[lance health check]*
 
 📊 État système tasks:
 - 15 tâches
 - 0 INCOMPLET
 - Recommandations: [...]
 
 Que veux-tu faire ?"
```

---

### Test 3 : Refus Code Sans Tâche
```
User: "Code une nouvelle feature"

Cursor DEVRAIT:
"⚠️ Créons d'abord la tâche :
 - Titre : TASK-XXX-nouvelle-feature
 - Priorité : P?
 Valides-tu ?"
```

---

## 📊 RÉSULTAT ATTENDU

| Comportement | Avant | Après |
|--------------|-------|-------|
| **Cursor lit règles** | Aléatoire | 100% (.cursorrules) |
| **Health check auto** | Jamais | Toujours (démarrage) |
| **Refus code sans tâche** | Parfois | 100% (forcé) |
| **Structure validée** | Manuel | Auto (pre-commit) |
| **INCOMPLET rappelées** | Jamais | 100% (health-check) |

---

## 🎯 DÉCISION REQUISE

**Tape simplement** :

1. ✅ **"Hybride"** → J'applique l'Option 1 (recommandée)
2. ✅ **"Exception gitignore"** → J'applique l'Option 2
3. ✅ **"Repo séparé"** → J'applique l'Option 3
4. 📋 **"Montre détails [option]"** → J'explique plus

---

**⏰ URGENT** : Scripts créés mais **pas versionnés**. Choisis une option maintenant !

---

**Créé** : 02 novembre 2025, 21h45  
**Par** : Cursor Assistant  
**Attend** : Ta décision (tape "Hybride")

