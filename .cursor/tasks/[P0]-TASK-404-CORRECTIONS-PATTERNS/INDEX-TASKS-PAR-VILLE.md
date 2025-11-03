# Index Tasks 404 Blog Par Ville

**Date création** : 03 novembre 2025  
**Contexte** : Corrections Pattern #5 Blog - Approche ville par ville

---

## 📊 VUE D'ENSEMBLE

**Total villes** : 11  
**Ville complétée** : 1 (Bordeaux ✅)  
**Villes restantes** : 9  
**Temps total estimé** : 10-14h

---

## ✅ BORDEAUX - COMPLÉTÉ

**Status** : ✅ TERMINÉ  
**Date** : 03/11/2025  
**Temps** : 2h (avec erreurs corrigées)  
**Liens corrigés** : 117

**Commits** :
- Monorepo : `8f719a0`
- Bordeaux individuel : `c8befc5`

**Pattern corrigé** : #5B - Liens `/guide` inexistants  
**Approche** : Correction manuelle contrôlée (sed)

---

## 🔴 ARCHITECTURE A : Catégorie Fourre-Tout (5 villes)

**Caractéristique** : TOUS les guides sous catégorie `demenagement-{ville}`

### [P0] LILLE

📁 **Task** : `.cursor/tasks/[P0]-TASK-404-blog-lille/`  
**Liens estimés** : ~70  
**Temps** : 1h30-2h  
**Pattern** : Fourre-tout  
**Exemple** :
```
❌ /blog/demenageur-lille/demenageur-lille-expert
✅ /blog/demenagement-lille/demenageur-lille-expert
```

---

### [P0] MONTPELLIER

📁 **Task** : `.cursor/tasks/[P0]-TASK-404-blog-montpellier/`  
**Liens estimés** : ~50-80  
**Temps** : 1h30-2h  
**Pattern** : Fourre-tout  
**Exemple** :
```
❌ /blog/demenageur-montpellier/demenageur-montpellier
✅ /blog/demenagement-montpellier/demenagement-entreprise-montpellier
```

---

### [P0] NICE

📁 **Task** : `.cursor/tasks/[P0]-TASK-404-blog-nice/`  
**Liens estimés** : ~50-80  
**Temps** : 1h30-2h  
**Pattern** : Fourre-tout  
**Exemple** :
```
❌ /blog/demenageur-nice/demenageur-nice-guide
✅ /blog/demenagement-nice/demenageur-nice-guide
```

---

### [P0] NANTES

📁 **Task** : `.cursor/tasks/[P0]-TASK-404-blog-nantes/`  
**Liens estimés** : ~50-80  
**Temps** : 1h30-2h  
**Pattern** : Fourre-tout  
**Exemple** :
```
❌ /blog/demenageur-nantes/demenageur-nantes-guide
✅ /blog/demenagement-nantes/demenageur-nantes-guide
```

---

### [P0] ROUEN

📁 **Task** : `.cursor/tasks/[P0]-TASK-404-blog-rouen/`  
**Liens estimés** : ~40-60  
**Temps** : 1h-1h30  
**Pattern** : Fourre-tout  
**Exemple** :
```
❌ /blog/demenageur-rouen/demenageur-rouen
✅ /blog/demenagement-rouen/demenageur-rouen
```

---

## 🟢 ARCHITECTURE B : Simple (3 villes)

**Caractéristique** : 2-3 catégories seulement, structure claire

### [P0] MARSEILLE

📁 **Task** : `.cursor/tasks/[P0]-TASK-404-blog-marseille/`  
**Liens estimés** : ~10  
**Temps** : 30 min-1h  
**Pattern** : Simple  
**Catégories** :
- `demenagement-marseille`
- `garde-meuble-marseille`

---

### [P0] RENNES

📁 **Task** : `.cursor/tasks/[P0]-TASK-404-blog-rennes/`  
**Liens estimés** : ~10-20  
**Temps** : 30 min-1h  
**Pattern** : Simple  
**Catégories** :
- `demenagement-rennes`
- `garde-meuble-rennes`

---

### [P0] STRASBOURG

📁 **Task** : `.cursor/tasks/[P0]-TASK-404-blog-strasbourg/`  
**Liens estimés** : ~30-50  
**Temps** : 30 min-1h  
**Pattern** : Simple  
**Catégories** :
- `demenagement-strasbourg`
- `garde-meuble-strasbourg`

---

## 🟠 ARCHITECTURE C : Mixte/Spéciale (2 villes)

### [P0] LYON

📁 **Task** : `.cursor/tasks/[P0]-TASK-404-blog-lyon/`  
**Liens estimés** : ~10-20  
**Temps** : 1h-1h30  
**Pattern** : **MIXTE** (certains fourre-tout, certains spécifiques)  
**⚠️ Nécessite analyse approfondie**

Catégories :
- `demenagement-lyon` (fourre-tout)
- `demenagement-lyon-pas-cher` (spécifique)
- ... (mix)

---

### [P0] TOULOUSE

📁 **Task** : `.cursor/tasks/[P0]-TASK-404-blog-toulouse/`  
**Liens estimés** : ~13  
**Temps** : 45 min-1h  
**Pattern** : **SPÉCIAL** (accents + redirections)  
**⚠️ Pattern #7 déjà traité, vérifier redirections**

Structure :
- `piliers/` + `satellites/` (pas de catégories en dossiers)
- Catégories accentuées
- Redirections 301 déjà créées

---

## 📋 ORDRE RECOMMANDÉ

### Batch 1 : Villes simples (facile, 2h total)
1. **Marseille** (30 min)
2. **Rennes** (30 min)
3. **Strasbourg** (45 min)

**→ Permet de valider approche sur villes simples**

---

### Batch 2 : Villes fourre-tout (moyen, 8h total)
4. **Lille** (2h)
5. **Montpellier** (2h)
6. **Nice** (2h)
7. **Nantes** (2h)
8. **Rouen** (1h30)

**→ Même pattern, approche validée sur Lille**

---

### Batch 3 : Villes complexes (analyse requise, 2h total)
9. **Lyon** (1h30) - Architecture mixte
10. **Toulouse** (45 min) - Vérifier redirections

**→ Nécessitent analyse spécifique**

---

## 🚨 RÈGLES OBLIGATOIRES (TOUTES VILLES)

### Avant toute correction

1. **✅ Lire** : `ERREURS-APPRISES-BORDEAUX.md`
2. **✅ Analyser** : `lib/blog.ts` → CATEGORY_MAPPING
3. **✅ Tester** : 3-5 URLs en production
4. **✅ Corriger** : 1 fichier test
5. **✅ Valider** : Git diff + curl
6. **✅ ALORS** : Correction masse

### Ne JAMAIS

- ❌ Assumer architecture identique entre villes
- ❌ Corriger sans tester production
- ❌ Commit sans git diff vérifié
- ❌ Ignorer les warnings

---

## 📚 RÉFÉRENCES ESSENTIELLES

**À LIRE OBLIGATOIREMENT AVANT CHAQUE VILLE** :

1. **ERREURS-APPRISES-BORDEAUX.md** ⭐⭐⭐  
   → Mes 3 erreurs + comment les éviter

2. **README.md de la ville concernée**  
   → Architecture spécifique + mapping exact

3. **Exemple réussi Bordeaux**  
   → SHA `8f719a0` (monorepo) + `c8befc5` (Bordeaux)

---

## 🎯 CRITÈRES DE SUCCÈS (PAR VILLE)

- [ ] 0 lien cassé restant (grep = 0)
- [ ] Git diff propre (aucun changement involontaire)
- [ ] URLs testées production = 200 OK
- [ ] Commit monorepo + ville individuelle
- [ ] Deploy CapRover OK
- [ ] Validation post-deploy

---

## 📊 SUIVI GLOBAL

| Ville | Status | Liens | Temps | Chat Cursor | Date |
|-------|--------|-------|-------|-------------|------|
| Bordeaux | ✅ DONE | 117 | 2h | Principal | 03/11 |
| Lille | 📋 TODO | ~70 | 1h30 | - | - |
| Montpellier | 📋 TODO | ~60 | 1h30 | - | - |
| Nice | 📋 TODO | ~60 | 1h30 | - | - |
| Nantes | 📋 TODO | ~60 | 1h30 | - | - |
| Rouen | 📋 TODO | ~50 | 1h | - | - |
| Lyon | 📋 TODO | ~15 | 1h | - | - |
| Marseille | 📋 TODO | ~10 | 30 min | - | - |
| Rennes | 📋 TODO | ~15 | 30 min | - | - |
| Strasbourg | 📋 TODO | ~40 | 45 min | - | - |
| Toulouse | 📋 TODO | ~13 | 45 min | - | - |
| **TOTAL** | **9/10** | **~500** | **12h** | - | - |

---

## 🚀 COMMANDE POUR CHAQUE CHAT CURSOR

**Copier/coller ceci au démarrage** :

```
Salut Cursor !

Je veux que tu corriges les 404s blog pour {VILLE}.

📁 Ta task : .cursor/tasks/[P0]-TASK-404-blog-{ville}/README.md

⚠️ AVANT de commencer :
1. Lis ERREURS-APPRISES-BORDEAUX.md (10 min)
2. Lis ton README.md complet
3. Teste 3 URLs production
4. Fais 1 correction test
5. ALORS seulement : correction masse

Ne reproduis PAS les erreurs Bordeaux !
Documente tout dans progress.md.

Prêt ? 🚀
```

---

**Créé par** : Cursor AI Principal  
**Date** : 03/11/2025  
**Contexte** : Pattern #5 Blog, post-Bordeaux


