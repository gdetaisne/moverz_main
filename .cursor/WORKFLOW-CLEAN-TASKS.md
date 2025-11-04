# 🧹 WORKFLOW : Clean Tasks (Fin de Journée)

**Commande** : `"Cursor, clean tasks"`

**Durée** : 5-10 minutes  
**Fréquence** : À la fin de chaque session de travail

---

## 🎯 Objectif

Mettre à jour toute la documentation de progression pour :
- Garantir la continuité (toi ou Lucie peut reprendre)
- Respecter les contraintes du système
- Avoir des tâches clean et à jour

---

## 📋 PROCESSUS INTERACTIF (Cursor suit ces étapes)

### ÉTAPE 1 : Identifier les tâches travaillées aujourd'hui

**Cursor demande** :
```
🧹 CLEAN TASKS - Démarrage

Quelles tâches as-tu travaillées aujourd'hui ?
(Liste les numéros, ex: "404-02, 404-03" ou "toutes les EN COURS")
```

**Réponse utilisateur** : Liste des TASK-XXX

---

### ÉTAPE 2 : Pour CHAQUE tâche → Logger la session

**Cursor demande** (pour chaque tâche) :
```
📝 TASK-XXX : Logger la session

Résume ce que tu as fait aujourd'hui sur cette tâche :
- Quoi (actions effectuées)
- Temps passé
- Ce qui reste
- Problèmes rencontrés (si applicable)

(Format libre, je vais structurer)
```

**Cursor fait** :
1. Ouvre `[PX]-TASK-XXX/progress.md`
2. Ajoute une entrée datée avec le résumé structuré
3. Confirme : "✅ Session loggée dans progress.md"

---

### ÉTAPE 3 : Commits documentés ?

**Cursor demande** :
```
💾 As-tu fait des commits pour TASK-XXX ?

A) Oui → Liste les SHA (ex: "a1b2c3d, d4e5f6g")
B) Non → Skip
```

**Si OUI** :
- **Cursor demande** : "Description rapide de chaque commit ?"
- **Cursor fait** : Documente dans `commits.md` avec format standard
- **Cursor confirme** : "✅ Commits documentés"

**Si NON** :
- Cursor passe à l'étape suivante

---

### ÉTAPE 4 : Statut de la tâche

**Cursor demande** :
```
🎯 TASK-XXX : Quel est le statut ?

A) ✅ TERMINÉE (100% fait, prête à finaliser)
B) ⚠️ EN PAUSE (pas finie, reprendre plus tard)
C) 🔄 EN COURS (continue demain matin priorité)
D) ❌ ABANDONNÉE (annuler cette tâche)
```

#### Si A) TERMINÉE ✅

**Cursor vérifie la Definition of Done** :
```
🔍 Vérification DoD pour TASK-XXX :

1. Code propre et documenté ? (Oui/Non)
2. Commits sur GitHub main + SHA documentés ? (Oui/Non)
3. Testé sur 2+ sites avec résultats documentés ? (Oui/Non)
```

**Si 3x OUI** :
- Cursor demande confirmation : "Finaliser cette tâche ?"
- Si OUI → Archive dans DONE.md, retire de TODO-Guillaume.md
- Cursor demande : "Cette tâche débloque-t-elle d'autres tâches ?"
  - Si OUI → Cursor liste les tâches débloquées et demande si on les ajoute au TODO

**Si 1+ NON** :
- Cursor explique ce qui manque
- Propose de mettre en pause avec note "À finaliser"

#### Si B) EN PAUSE ⚠️

**Cursor demande** :
```
⚠️ Contexte de la pause :

- % complété (ex: 75%) ?
- Raison de la pause ?
- Ce qui reste à faire ?
- Problème bloquant (si applicable) ?
```

**Cursor fait** :
1. Marque ⚠️ INCOMPLET dans BACKLOG.md
2. Documente contexte dans progress.md
3. Met à jour TODO-Guillaume.md avec statut INCOMPLET
4. **IMPORTANT** : Note que cette tâche sera prioritaire demain

#### Si C) EN COURS 🔄

**Cursor demande** :
```
🔄 Continuation demain :

- % complété ?
- Prochaines étapes précises ?
```

**Cursor fait** :
1. Met à jour progress.md avec état actuel
2. Garde dans TODO-Guillaume.md "EN COURS"
3. Ajoute dans "PLANIFIÉ DEMAIN"

#### Si D) ABANDONNÉE ❌

**Cursor demande** :
```
❌ Abandon de TASK-XXX

⚠️ ATTENTION : Abandon = revert complet du code

Raison de l'abandon ?
```

**Cursor fait** :
1. Liste tous les commits de cette tâche
2. Demande confirmation : "Veux-tu revert ces commits ?"
3. Si OUI → Guide le revert + vérifie git status clean
4. Documente raison dans progress.md
5. Archive dans DONE.md section ABANDONNÉES

---

### ÉTAPE 5 : Fichiers temporaires à nettoyer ?

**Cursor demande** :
```
🗑️ As-tu créé des fichiers temporaires dans les dossiers tasks/ ?

Exemples : test-script.sh, temp-analysis.txt, backup-*.md

A) Oui → Je liste et tu confirmes suppression
B) Non → Skip
```

**Si OUI** :
- Cursor scanne les dossiers tasks travaillés
- Liste les fichiers hors structure standard (pas README/context/progress/commits/tests/decisions)
- Demande confirmation avant suppression

---

### ÉTAPE 6 : Mettre à jour TODO-Guillaume.md

**Cursor fait automatiquement** :
```
📝 Mise à jour TODO-Guillaume.md

Section "🔥 EN COURS MAINTENANT" :
- [Liste des tâches avec leur statut actuel]

Section "✅ FAIT AUJOURD'HUI" :
- [Résumé de la session d'aujourd'hui]
```

**Cursor montre un aperçu** et demande : "Valider cette mise à jour ?"

---

### ÉTAPE 7 : Préparer demain

**Cursor analyse les tâches** et propose :
```
📅 PLANIFIÉ DEMAIN (Date)

Tâches prioritaires :
1. [Tâches ⚠️ INCOMPLET] (TOUJOURS en priorité #1)
2. [Tâches EN COURS à continuer]
3. [Nouvelles tâches débloquées si temps]

Estimation temps : Xh

Valider ce plan ?
```

---

### ÉTAPE 8 : Commit documentation (SÉCURISÉ)

**Cursor demande** :
```
💾 Commit de la documentation ?

Veux-tu commit + push les mises à jour de documentation ?

A) Oui → Utiliser le script sécurisé (RECOMMANDÉ)
B) Non → Skip
```

**Si OUI** :

⚠️ **IMPORTANT** : Utiliser le script protégé pour éviter d'inclure des fichiers blog par erreur

**Cursor dit** :
```
Je te recommande d'utiliser le script sécurisé :

bash tools/tasks/scripts/commit-cursor-safe.sh

Ce script :
✅ Vérifie qu'aucun fichier hors .cursor/ n'est inclus
✅ Propose stash automatique des modifs blog en cours
✅ Stage SEULEMENT les fichiers .cursor/
✅ Double vérification avant commit
✅ Impossible d'inclure sites/ par erreur

Incident évité : 04/11/2025 - 800+ erreurs 404 causées par
git add -A qui a inclus 696 fichiers blog par erreur.
```

**Alternative manuelle** (si tu préfères) :
- Vérifier `git status` manuellement
- Stasher les modifs hors .cursor/
- `git add .cursor/` (JAMAIS `git add -A`)
- Vérifier `git diff --cached`
- Commit + push

---

### ÉTAPE 9 : Récapitulatif final

**Cursor affiche** :
```
✅ CLEAN TASKS TERMINÉ

📊 Résumé de la session :
- Tâches travaillées : X
- Sessions loggées : X/X ✅
- Commits documentés : X
- Tâches finalisées : X
- Tâches en pause : X
- Fichiers nettoyés : X

📅 Demain :
- Priorité #1 : [Tâche INCOMPLET ou EN COURS]
- Temps estimé : Xh

🎯 Statut des tâches :
- [P0] En cours : X
- [P1] En cours : X
- [P2] En cours : X

Tout est à jour ! 🚀
```

---

## 🔄 WORKFLOW RÉSUMÉ

```
1. Liste des tâches travaillées
   ↓
2. Logger chaque session (progress.md)
   ↓
3. Documenter commits (commits.md) si applicable
   ↓
4. Statut de chaque tâche (TERMINÉE/PAUSE/EN COURS/ABANDONNÉE)
   ↓
   ├─ Si TERMINÉE → Vérif DoD → Archive
   ├─ Si PAUSE → Contexte → Marque INCOMPLET
   ├─ Si EN COURS → État → Plan demain
   └─ Si ABANDONNÉE → Revert → Archive
   ↓
5. Nettoyer fichiers temporaires
   ↓
6. MAJ TODO-Guillaume.md (auto)
   ↓
7. Préparer plan demain
   ↓
8. Commit documentation (optionnel)
   ↓
9. Récapitulatif ✅
```

---

## 🎛️ OPTIONS FLEXIBLES

### Mode rapide (si pressé)

```
"Cursor, clean tasks en mode rapide"
```

**Cursor fait** :
- Skip les questions détaillées
- Juste logger sessions avec résumé court
- MAJ statuts au minimum
- Pas de commit

### Mode spécifique (1 seule tâche)

```
"Cursor, clean TASK-XXX"
```

**Cursor fait** :
- Workflow complet mais seulement pour cette tâche

### Mode automatique (confiance totale)

```
"Cursor, clean tasks auto : [résumé global de ta journée]"
```

**Cursor fait** :
- Détecte automatiquement les tâches modifiées (git diff)
- Logger avec ton résumé
- MAJ automatique des statuts
- Commit auto

---

## 📝 NOTES POUR CURSOR

### Informations à collecter pendant le workflow :

1. **Session logging** :
   - Date/heure
   - Durée
   - Actions effectuées
   - Problèmes rencontrés
   - Décisions prises

2. **Commits** :
   - SHA
   - Date/heure
   - Fichiers modifiés
   - Description courte

3. **Statut** :
   - % complétion
   - Contexte si pause
   - Raison si abandon
   - Tests si terminé

4. **Continuité** :
   - Ce qui reste
   - Prochaines étapes
   - Dépendances débloquées

### Fichiers à mettre à jour :

- `[PX]-TASK-XXX/progress.md` (toujours)
- `[PX]-TASK-XXX/commits.md` (si commits)
- `[PX]-TASK-XXX/tests.md` (si tests effectués)
- `.cursor/TODO-Guillaume.md` (toujours)
- `.cursor/BACKLOG.md` (si changement statut)
- `.cursor/DONE.md` (si finalisé/abandonné)

### Validations à faire :

- DoD (3 critères) avant marquer TERMINÉE
- Git status clean avant marquer ABANDONNÉE
- Contexte complet avant marquer INCOMPLET
- Plan demain cohérent avec priorités

---

## 🚨 RAPPELS IMPORTANTS

1. **Tâches INCOMPLET = TOUJOURS prioritaires demain**
2. **Pas de TERMINÉE sans les 3 critères DoD**
3. **Pas d'ABANDONNÉE sans revert code**
4. **Toujours documenter le "pourquoi" des pauses/abandons**

---

*Créé le : 2025-11-02*  
*Workflow interactif guidé pour clean tasks de fin de journée*

