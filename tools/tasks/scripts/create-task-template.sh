#!/bin/bash
# 📝 GÉNÉRATEUR TEMPLATE TÂCHE
# 
# Crée structure complète pour nouvelle tâche
# Usage: .cursor/scripts/create-task-template.sh TASK-XXX-nom-descriptif

if [ -z "$1" ]; then
  echo "❌ Usage: $0 TASK-XXX-nom-descriptif"
  echo "Exemple: $0 TASK-015-fix-images"
  exit 1
fi

TASK_ID="$1"
TASK_DIR="/Users/guillaumestehelin/moverz_main-2/.cursor/tasks/$TASK_ID"

if [ -d "$TASK_DIR" ]; then
  echo "❌ Erreur: $TASK_ID existe déjà !"
  exit 1
fi

echo "📝 Création template pour $TASK_ID"
echo ""

# Créer dossier
mkdir -p "$TASK_DIR/assets"

# README.md
cat > "$TASK_DIR/README.md" << 'EOF'
# [TASK_ID] : [Titre Descriptif]

**Statut** : 📋 À faire  
**Priorité** : P? (à évaluer)  
**Temps estimé** : ?h  
**Assigné** : Guillaume / Lucie / Les deux  
**Créée le** : [DATE]

---

## 🎯 Objectif

[Description claire de ce qu'on veut accomplir]

---

## 📋 Actions

- [ ] Action 1
- [ ] Action 2
- [ ] Action 3

---

## 📦 Livrables

- [ ] Livrable 1
- [ ] Livrable 2

---

## ⚙️ Dépendances

**Bloquée par** : 
- TASK-XXX (si applicable)

**Bloque** :
- TASK-YYY (si applicable)

---

## ✅ Definition of Done

- [ ] 1. Code propre et documenté
- [ ] 2. Commits sur GitHub main + SHA documentés
- [ ] 3. Testé sur 2+ sites en production

---

**Dernière mise à jour** : [DATE]
EOF

# context.md
cat > "$TASK_DIR/context.md" << 'EOF'
# Contexte Détaillé

## 📖 Historique

[Pourquoi cette tâche existe ? Quel problème résout-elle ?]

## 🎯 Objectifs Détaillés

[Explication approfondie de ce qu'on veut accomplir]

## 🔍 Analyse du Problème

[Si c'est un bug : comment le reproduire, logs, etc.]
[Si c'est une feature : pourquoi maintenant, impact business]

## 💡 Solutions Envisagées

### Option A : [Nom]
**Avantages** :
- ...

**Inconvénients** :
- ...

### Option B : [Nom]
**Avantages** :
- ...

**Inconvénients** :
- ...

## ✅ Solution Retenue

[Quelle option choisie et pourquoi]

---

**Rédigé le** : [DATE]
EOF

# progress.md
cat > "$TASK_DIR/progress.md" << 'EOF'
# Journal de Progression

## 📅 Session du [DATE]

**Durée** : Xh  
**Avancement** : X%

### ✅ Fait
- ...

### 🚧 En cours
- ...

### ⏭️ Prochain step
- ...

### 🐛 Problèmes rencontrés
- ...

### 💡 Décisions prises
- ...

---
EOF

# commits.md
cat > "$TASK_DIR/commits.md" << 'EOF'
# Commits GitHub

## 📦 Commits Liés

### Repo Principal (moverz_main)

- [ ] `[SHA]` - [Message commit]
- [ ] `[SHA]` - [Message commit]

### Sites Individuels (si applicable)

**Marseille** :
- [ ] `[SHA]` - [Message commit]

**Toulouse** :
- [ ] `[SHA]` - [Message commit]

[Autres sites...]

---

## 🔗 Liens Utiles

- PR GitHub: [URL]
- Issue: [URL]

---

**Dernière mise à jour** : [DATE]
EOF

# tests.md
cat > "$TASK_DIR/tests.md" << 'EOF'
# Tests & Validation

## 🧪 Tests Effectués

### Test 1 : [Nom]
**Date** : [DATE]  
**Site** : [Ville]  
**Résultat** : ✅ OK / ❌ KO

**Détails** :
- ...

---

### Test 2 : [Nom]
**Date** : [DATE]  
**Site** : [Ville]  
**Résultat** : ✅ OK / ❌ KO

**Détails** :
- ...

---

## ✅ Sites Testés (minimum 2)

- [ ] Marseille
- [ ] Toulouse
- [ ] Lyon
- [ ] [Autre]

---

## 📊 Critères de Validation

- [ ] Critère 1
- [ ] Critère 2
- [ ] Critère 3

---

**Dernière mise à jour** : [DATE]
EOF

# decisions.md
cat > "$TASK_DIR/decisions.md" << 'EOF'
# Décisions Techniques

## 🎯 Décisions Majeures

### Décision #1 : [Titre]
**Date** : [DATE]  
**Décidé par** : Guillaume / Lucie / Les deux

**Contexte** :
[Pourquoi cette décision était nécessaire]

**Options considérées** :
1. Option A : ...
2. Option B : ...

**Décision** : Option [X]

**Raison** :
[Pourquoi cette option plutôt que les autres]

**Impact** :
- Court terme : ...
- Long terme : ...

---

### Décision #2 : [Titre]
[Même structure]

---

## 🔄 Changements de Direction

### [DATE] - Pivot sur [Quoi]
**Raison** : [Pourquoi changement]  
**Impact** : [Ce qui change]

---

**Dernière mise à jour** : [DATE]
EOF

echo "✅ Template créé: $TASK_DIR"
echo ""
echo "📁 Fichiers générés:"
echo "   - README.md"
echo "   - context.md"
echo "   - progress.md"
echo "   - commits.md"
echo "   - tests.md"
echo "   - decisions.md"
echo "   - assets/ (dossier)"
echo ""
echo "📝 Prochaine étape:"
echo "   1. Éditer README.md (remplacer [TASK_ID], [DATE], etc.)"
echo "   2. Remplir context.md"
echo "   3. Ajouter au BACKLOG.md"
echo ""

