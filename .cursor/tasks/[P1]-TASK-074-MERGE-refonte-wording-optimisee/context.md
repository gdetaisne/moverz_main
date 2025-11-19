# Context - TASK-074-MERGE : Refonte Wording Optimisée

**Date création** : 14/11/2025  
**Créé par** : Guillaume + Cursor

---

## 📖 Contexte Business

### Problème Actuel

**Wording trop corporate, peu différenciant** :
- Messages fades ("Comparez les meilleurs déménageurs")
- Pas d'angle unique vs concurrence
- Points de friction non adressés
- CTR sous-optimal

**Résultat** : Taux de conversion perfectible

---

### Opportunité

**Angle disruptif "Anti-Arnaque"** :
- Adresser points de friction clients
- Se différencier radicalement vs concurrence
- Créer confiance via transparence
- Améliorer CTR + conversion

**Points de friction identifiés** :
1. Devis incomparables (critères différents)
2. Harcèlement téléphonique
3. Déménageurs peu fiables
4. Prix cachés / surprises

---

## 🎯 Objectif Moverz 2.0

### Phase 1 : Refonte Offre ✅ TERMINÉE
- TASK-070 à 073 finalisées
- Commit `2239247c` (13/11)
- Nouvelle structure déployée 11 sites

### Phase 2 : Refonte Wording 🔄 EN COURS
- **Approche initiale** : TASK-074 à 078 (13.5h, 5 tâches)
- **Approche optimisée** : TASK-074-MERGE (4.5h, 1 tâche)

---

## 💡 Pourquoi Approche MERGE ?

### Problèmes Approche Classique (074-078)

**TASK-074** : Audit wording (2h)  
**TASK-075** : Refonte Nice (3h)  
**TASK-076** : Test Nice (1h)  
**TASK-077** : Généralisation 11 villes (4h)  
**TASK-078** : Tests finaux (2h)  
**TASK-079** : Deploy + doc (1.5h)

**Total** : 13.5h sur 3 jours

**Problèmes détectés** :
- ❌ Redondance audit/tests (3h perdues)
- ❌ Commits multiples pour même logique
- ❌ Risque désynchronisation entre villes
- ❌ Overhead gestion 6 tâches
- ❌ Complexité coordination

---

### Avantages Approche MERGE

**1 tâche unique, workflow optimisé** :

**Phase 1** : Audit express (30 min) → Lecture 10 refonte-wording.md existants  
**Phase 2** : Refonte atomique 11 villes (3h) → Sync immédiat  
**Phase 3** : Tests simultanés (1h) → Validation parallèle  
**Phase 4** : Commit + Deploy (30 min) → Atomique

**Total** : 4.5-5.5h en 1 journée

**Bénéfices** :
- ✅ **-60% temps** (8-9h gagnées)
- ✅ **Commit atomique** (facile revert)
- ✅ **0 désynchronisation** (< 10 min max)
- ✅ **Tests parallélisés**
- ✅ **Overhead minimal**

---

## ⚠️ RÈGLES IMPÉRATIVES Guillaume

### Règle #1 : Homogénéité Stricte
Les 11 sites doivent être parfaitement homogènes sur parties partagées.

**Exception** : Contenus locaux (blogs, pages ville-spécifiques)

### Règle #2 : ZÉRO Désynchronisation
Durée max désync : < 10 minutes

**Workflow** : Modifier Nice → Test → **IMMÉDIATEMENT** copier 10 villes

### Règle #3 : Validation Double
- Build local 11 villes
- Tests production 3+ sites

### Règle #4 : Best Practices Commits
Format strict, messages descriptifs, lister 11 villes

### Règle #5 : Autonomie Push
Cursor propose automatiquement les push après commit

---

## 📂 Fichiers Specs Existants

**10 fichiers refonte-wording.md déjà créés** :
- `sites/nice/refonte-wording.md`
- `sites/lyon/refonte-wording.md`
- `sites/marseille/refonte-wording.md`
- `sites/toulouse/refonte-wording.md`
- `sites/bordeaux/refonte-wording.md`
- `sites/lille/refonte-wording.md`
- `sites/nantes/refonte-wording.md`
- `sites/strasbourg/refonte-wording.md`
- `sites/rouen/refonte-wording.md`
- `sites/rennes/refonte-wording.md`

**Contenu** : Exemples wording disruptif, angles anti-arnaque

**Avantage** : Pas besoin de réfléchir à zéro, juste appliquer !

---

## 🎨 Messaging Disruptif Cible

### Angles Principaux

**1. Devis vraiment comparables**
> "Enfin des devis comparables, pas des promesses floues"

**2. Anti-harcèlement**
> "Sans harcèlement téléphonique"

**3. Solvabilité vérifiée**
> "Déménageurs solvabilité vérifiée"

**4. Transparence radicale**
> "Transparence totale prix"

---

## 🏗️ Architecture Technique

### Multi-Sites (11 Villes)

**Sites indépendants** :
- Nice, Lyon, Marseille, Toulouse, Bordeaux
- Lille, Nantes, Strasbourg, Rouen, Rennes, Montpellier

**Code partagé** (sync manuel) :
- `lib/` (cityData, helpers)
- `components/` (Hero, CTA, LeadForm, etc.)

**Code spécifique** :
- `content/blog/` (articles par ville)
- Pages locales (quartiers, corridors)

---

## 🚨 Zones de Risque

### Zone #1 : Ville Hardcodée (40% des bugs)
**Prévention** : Toujours utiliser `city.nameCapitalized`, `city.slug`

### Zone #2 : Sync Oublié (30% des bugs)
**Prévention** : Sync immédiat (< 10 min)

### Zone #3 : SEO Cassé (20% des bugs)
**Prévention** : Metadata uniquement (pas de canonical modifié)

---

## 📋 Checklist Pré-Code

**Avant chaque modification** :
```
□ Impact SEO ? → Metadata uniquement
□ Multi-sites ? → OUI (11 villes)
□ Ville hardcodée ? → cityData dynamique
□ Sync prévu ? → < 10 min
□ Tests prévus ? → Local + prod
```

---

## 🎯 Résultat Attendu

**11 sites avec** :
- ✅ Wording disruptif anti-arnaque
- ✅ CTA unifié
- ✅ Metadata CTR-optimisées
- ✅ Angle différenciant vs concurrence
- ✅ Points de friction adressés

**Impact business attendu** :
- CTR +10-20%
- Conversion +5-10%
- Différenciation perçue améliorée

---

**Contexte validé par Guillaume** : 14/11/2025



