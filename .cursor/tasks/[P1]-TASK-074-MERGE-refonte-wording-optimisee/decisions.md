# Decisions - TASK-074-MERGE

## Décision #1 : Approche MERGE vs Classique

**Date** : 14/11/2025  
**Décideur** : Guillaume + Cursor

**Contexte** :
- Approche initiale : TASK-074 à 078 (6 tâches, 13.5h)
- Approche proposée : TASK-074-MERGE (1 tâche, 4.5h)

**Décision** : ✅ **MERGE Approche Optimisée**

**Raisons** :
1. Gain de temps : -60% (8-9h gagnées)
2. Commit atomique : 1 seul (facile revert)
3. Zéro désynchronisation : Sync immédiat < 10 min
4. Tests parallélisés : Build 11 villes ensemble
5. Overhead minimal : 1 tâche à gérer vs 6

**Alternative rejetée** : Approche classique (trop lente, risque désync)

---

## Décision #2 : Règles Impératives

**Date** : 14/11/2025  
**Décideur** : Guillaume

**Règles imposées** :

### Règle #1 : Homogénéité Stricte
Les 11 sites doivent être parfaitement homogènes sur parties partagées (templates, structures, components).

**Exception** : Contenus locaux (blogs, pages ville-spécifiques)

### Règle #2 : ZÉRO Désynchronisation
Durée max désync autorisée : < 10 minutes

**Workflow** : Modifier Nice → Test → **IMMÉDIATEMENT** copier 10 villes

### Règle #3 : Validation Double Obligatoire
- Build local réussi (11 villes)
- Tests production (3+ sites)

### Règle #4 : Best Practices Commits
Format strict, messages descriptifs, lister 11 villes

### Règle #5 : Autonomie Push
Cursor propose automatiquement les push après commit

**Raison** : Éviter bugs récurrents (désync, villes hardcodées, SEO cassé)

---

## Décision #3 : Pages à Modifier

**Date** : 14/11/2025  
**Décideur** : Cursor (basé sur specs existantes)

**Pages prioritaires** :
1. Homepage (`app/page.tsx`)
2. FAQ (`app/faq/page.tsx`)
3. Services (`app/services/page.tsx`)
4. Notre offre (`app/notre-offre/page.tsx`)
5. Contact (`app/contact/page.tsx`)

**Components prioritaires** :
1. `Hero.tsx` (titre + sous-titre + CTA)
2. `CtaPrimary.tsx` (CTA principal)
3. `StickyCTA.tsx` (CTA sticky)
4. `LeadForm.tsx` (formulaire + micro-copie)
5. `HowItWorks.tsx` (process 3 étapes)

**Raison** : Pages à fort trafic + impact conversion

---

## Décision #4 : Angle Messaging

**Date** : 14/11/2025  
**Décideur** : Guillaume (specs existantes)

**Angle choisi** : **Anti-Arnaque / Transparence Radicale**

**Messages clés** :
1. "Devis vraiment comparables"
2. "Sans harcèlement téléphonique"
3. "Solvabilité vérifiée"
4. "Transparence totale prix"

**Raison** : Adresse points de friction clients + différenciation vs concurrence

**Alternative rejetée** : Wording corporate fade (pas différenciant)

---

## Décision #5 : Workflow Sync

**Date** : 14/11/2025  
**Décideur** : Cursor (contrainte Guillaume)

**Workflow choisi** :
1. Modifier Nice (5 min)
2. Build + test Nice local (3 min)
3. **IMMÉDIATEMENT** copier 10 villes (2 min)
4. Build + test 2+ villes (5 min)
5. Commit atomique

**Durée désync** : < 10 min ✅

**Raison** : Respect règle impérative Guillaume (ZÉRO désync prolongée)

**Alternative rejetée** : Modifier 1 ville, tester longuement, puis sync (risque désync > 10 min)

---

## Décision #6 : Format Commit

**Date** : 14/11/2025  
**Décideur** : Guillaume (règle best practices)

**Format choisi** :
```
style(wording): Refonte messaging disruptif anti-arnaque (11 villes)

- Bullet 1
- Bullet 2

Sites: 11 villes listées
Tested: Nice (local), Lyon (local), Marseille (local), Nice (prod), Lyon (prod), Marseille (prod)
```

**Type** : `style` (wording/messaging)

**Raison** : Best practices Git, traçabilité complète, facilite revert

---

**Toutes décisions validées par Guillaume**



