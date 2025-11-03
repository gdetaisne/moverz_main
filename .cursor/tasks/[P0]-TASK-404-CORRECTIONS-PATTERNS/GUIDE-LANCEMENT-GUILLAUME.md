# Guide Lancement Tasks 404 Blog - Guillaume

**Date** : 03 novembre 2025  
**Contexte** : Pattern #5 Blog - Corrections ville par ville

---

## 🎯 VUE D'ENSEMBLE

**Total villes** : 11  
**Complétées** : 1 (Bordeaux ✅)  
**En cours** : 3 (Lille, Montpellier, Nice - Cursors indépendants lancés)  
**Restantes** : 6 (À lancer quand les 3 premiers sont finis)

---

## ✅ BORDEAUX - COMPLÉTÉ (03/11 soir)

**Status** : ✅ DONE  
**Temps** : 2h (avec erreurs + corrections)  
**Liens corrigés** : 117  
**Commits** :
- Monorepo : `8f719a0`
- Bordeaux : `c8befc5`

**Leçons** : Voir `ERREURS-APPRISES-BORDEAUX.md`

---

## 🔄 EN COURS (3 Cursors indépendants)

### Lille
📁 `.cursor/tasks/[P0]-TASK-404-blog-lille/`  
**Liens** : ~70  
**Architecture** : Fourre-tout  
**Pattern** : `{dossier}/` → `demenagement-lille/`

### Montpellier
📁 `.cursor/tasks/[P0]-TASK-404-blog-montpellier/`  
**Liens** : ~50-80  
**Architecture** : Fourre-tout  
**Pattern** : `{dossier}/` → `demenagement-montpellier/`

### Nice
📁 `.cursor/tasks/[P0]-TASK-404-blog-nice/`  
**Liens** : ~50-80  
**Architecture** : Fourre-tout  
**Pattern** : `{dossier}/` → `demenagement-nice/`

---

## 📋 RESTANTES (6 villes)

### Batch 1 : Simples (faciles, 2h total)

**Marseille** (30 min)  
📁 `.cursor/tasks/[P0]-TASK-404-blog-marseille/`  
✅ Architecture simple (2 catégories)  
✅ ~10 liens seulement

**Rennes** (30 min)  
📁 `.cursor/tasks/[P0]-TASK-404-blog-rennes/`  
✅ Architecture simple (2 catégories)  
✅ ~10-20 liens

**Strasbourg** (1h)  
📁 `.cursor/tasks/[P0]-TASK-404-blog-strasbourg/`  
✅ Architecture simple (2 catégories)  
✅ ~30-50 liens

---

### Batch 2 : Fourre-tout (moyennes, 3h30 total)

**Nantes** (2h)  
📁 `.cursor/tasks/[P0]-TASK-404-blog-nantes/`  
⚠️ Fourre-tout (comme Lille)  
⚠️ ~50-80 liens

**Rouen** (1h30)  
📁 `.cursor/tasks/[P0]-TASK-404-blog-rouen/`  
⚠️ Fourre-tout (comme Lille)  
⚠️ ~40-60 liens

---

### Batch 3 : Spéciales (complexes, 2h30 total)

**Lyon** (1h30)  
📁 `.cursor/tasks/[P0]-TASK-404-blog-lyon/`  
🚨 Architecture MIXTE  
🚨 Nécessite analyse approfondie  
🚨 ~10-20 liens

**Toulouse** (45 min)  
📁 `.cursor/tasks/[P0]-TASK-404-blog-toulouse/`  
🚨 Catégories accentuées  
🚨 Redirections déjà créées (vérifier)  
🚨 ~13 liens

---

## 🚀 COMMENT LANCER UN NOUVEAU CURSOR

### Étape 1 : Créer nouveau chat Cursor

**Titre suggéré** : `404 Blog {VILLE}`

### Étape 2 : Copier/coller cette commande

```
Salut Cursor !

Je veux que tu corriges les 404s blog pour {VILLE}.

📁 Ta task complète : .cursor/tasks/[P0]-TASK-404-blog-{ville}/README.md

⚠️ CRITIQUE - AVANT de commencer :

1. Lis .cursor/tasks/[P0]-TASK-404-CORRECTIONS-PATTERNS/ERREURS-APPRISES-BORDEAUX.md (10 min)
   → J'ai fait des erreurs sur Bordeaux, ne les reproduis PAS

2. Lis ton README.md complet (5 min)
   → Architecture spécifique {VILLE}

3. Teste 3 URLs en production OBLIGATOIRE (5 min)
   → Ne JAMAIS corriger sans tester

4. Fais 1 correction test (15 min)
   → Valide approche avant masse

5. ALORS seulement : correction masse

Documente TOUT dans progress.md au fur et à mesure.

Prêt ? 🚀
```

**Remplacer** :
- `{VILLE}` par le nom de la ville (Nantes, Lyon, etc.)
- `{ville}` par le nom en minuscule (nantes, lyon, etc.)

---

## 📊 SUIVI GLOBAL

| Ville | Status | Cursor | Temps | Priorité |
|-------|--------|--------|-------|----------|
| **Bordeaux** | ✅ DONE | Principal | 2h | - |
| **Lille** | 🔄 EN COURS | Chat 1 | 2h | - |
| **Montpellier** | 🔄 EN COURS | Chat 2 | 2h | - |
| **Nice** | 🔄 EN COURS | Chat 3 | 2h | - |
| Marseille | 📋 TODO | - | 30 min | Batch 1 |
| Rennes | 📋 TODO | - | 30 min | Batch 1 |
| Strasbourg | 📋 TODO | - | 1h | Batch 1 |
| Nantes | 📋 TODO | - | 2h | Batch 2 |
| Rouen | 📋 TODO | - | 1h30 | Batch 2 |
| Lyon | 📋 TODO | - | 1h30 | Batch 3 |
| Toulouse | 📋 TODO | - | 45 min | Batch 3 |

---

## 🎯 ORDRE RECOMMANDÉ

**Quand Lille/Montpellier/Nice sont finis** :

1. **Batch Simples** (2h total, 3 Cursors parallèles) :
   - Marseille
   - Rennes
   - Strasbourg

2. **Batch Fourre-tout** (3h30 total, 2 Cursors parallèles) :
   - Nantes
   - Rouen

3. **Batch Spéciales** (2h30 total, 2 Cursors séquentiels) :
   - Lyon (analyser d'abord)
   - Toulouse (vérifier redirections)

---

## ✅ CRITÈRES VALIDATION (PAR VILLE)

**Avant de marquer DONE** :

- [ ] 0 lien cassé pattern (grep = 0)
- [ ] Git diff propre
- [ ] Commits documentés (commits.md avec SHA)
- [ ] Deploy CapRover OK
- [ ] 3 URLs testées production = 200 OK
- [ ] Progress.md rempli

---

## 📚 FICHIERS ESSENTIELS

**Index global** :  
`.cursor/tasks/[P0]-TASK-404-CORRECTIONS-PATTERNS/INDEX-TASKS-PAR-VILLE.md`

**Erreurs à éviter** :  
`.cursor/tasks/[P0]-TASK-404-CORRECTIONS-PATTERNS/ERREURS-APPRISES-BORDEAUX.md`

**Tasks individuelles** :  
`.cursor/tasks/[P0]-TASK-404-blog-{ville}/README.md`

**BACKLOG mis à jour** :  
`.cursor/BACKLOG.md` (section Pattern #5)

---

## 🔔 NOTIFICATIONS

**Quand Lille/Montpellier/Nice terminent** :

1. Vérifier leurs `commits.md` (SHA documentés)
2. Vérifier leurs `progress.md` (tout OK)
3. Lancer scan validation crawler
4. Si OK → Lancer Batch 1 (Marseille/Rennes/Strasbourg)

---

**Créé par** : Cursor AI Principal  
**Date** : 03/11/2025  
**Prochaine action** : Attendre fin Lille/Montpellier/Nice


