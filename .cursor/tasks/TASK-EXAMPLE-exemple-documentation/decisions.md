# Décisions techniques : TASK-EXAMPLE

## Décision 1 : Utiliser des fichiers markdown plutôt qu'un outil externe

**Date** : 2025-11-01
**Contexte** : Besoin d'un système de gestion des tâches intégré à Cursor

**Options évaluées** :
- A) Fichiers markdown dans `.cursor/`
- B) Outil externe (Notion, Linear, Jira)
- C) Extension VS Code dédiée
- D) Base de données locale

**Choix** : A - Fichiers markdown

**Raison** :
- ✅ 100% intégré à Cursor (pas de switch d'outil)
- ✅ Versionnable avec Git
- ✅ Lisible en mode texte
- ✅ Pas de dépendance externe
- ✅ Facile à synchroniser entre Guillaume et Associée
- ✅ Cursor peut lire et modifier directement
- ❌ Moins visuel qu'un outil dédié (acceptable)

---

## Décision 2 : Documentation séparée du code

**Date** : 2025-11-01
**Contexte** : Guillaume veut documenter les tâches sans polluer le code

**Options évaluées** :
- A) Documentation dans `.cursor/tasks/TASK-XXX/`
- B) Commentaires dans le code
- C) Docs dans un repo séparé

**Choix** : A - Dossier `.cursor/tasks/`

**Raison** :
- ✅ Séparation claire code vs doc tâches
- ✅ Facile à trouver (structure prévisible)
- ✅ Ne pollue pas le code source
- ✅ Permet assets (logs, screenshots)
- ✅ Facile à archiver/supprimer
- ✅ Cursor peut y accéder facilement

---

## Décision 3 : Statuts simplifiés (4 statuts + 1)

**Date** : 2025-11-01
**Contexte** : Besoin de workflow simple mais complet

**Options évaluées** :
- A) Workflow complexe (10+ statuts type Jira)
- B) Workflow minimal (À faire, En cours, Fait)
- C) Workflow intermédiaire (4+1 statuts)

**Choix** : C - 4 statuts + ABANDONNÉE

**Raison** :
- **📋 À faire** : Clair
- **🔄 En cours** : Travail actif
- **⚠️ INCOMPLET** : Critique pour ne pas oublier
- **✅ FINALISÉ** : DoD stricte
- **❌ ABANDONNÉE** : Archive avec raison

Ni trop simple (on perd l'info INCOMPLET), ni trop complexe (overhead inutile)

---

## Décision 4 : Definition of Done stricte (3 critères)

**Date** : 2025-11-01
**Contexte** : Guillaume veut s'assurer que les tâches sont vraiment finies

**Critères choisis** :
1. Code propre et documenté
2. Sur GitHub main + tous dépôts concernés
3. Testé en live sur minimum 2 sites

**Raison** :
- ✅ Évite les "presque fini" qui traînent
- ✅ Force le déploiement complet
- ✅ Force les tests réels
- ✅ Adapté au contexte multi-sites de Moverz
- ✅ Pas trop lourd (2 sites suffisent vs 11 sites)

---

## Décision 5 : Abandon = Revert code obligatoire

**Date** : 2025-11-01
**Contexte** : Éviter le code zombie dans le projet

**Règle** : Impossible de marquer ABANDONNÉE sans revert complet

**Raison** :
- ✅ Maintient la propreté du code
- ✅ Évite les fichiers modifiés oubliés
- ✅ Force à vraiment décider : finir OU nettoyer
- ✅ Pas de dette technique cachée

**Conséquence** : Si on veut garder une partie du code → réduire le scope au lieu d'abandonner

---

## Décision 6 : Priorité INCOMPLET absolue

**Date** : 2025-11-01
**Contexte** : Guillaume a tendance à commencer sans finir

**Règle** : Les tâches ⚠️ INCOMPLET passent AVANT tout (même P0)

**Raison** :
- ✅ Force à finir ce qui est commencé
- ✅ Évite l'accumulation de tâches à 80%
- ✅ Réduit le contexte switching
- ✅ Améliore la productivité

**Exception** : Justification explicite pour démarrer du nouveau (bugs critiques prod)

---

## Décision 7 : Backlog peu granulaire, TODO granulaire

**Date** : 2025-11-01
**Contexte** : Guillaume veut limiter la granularité du backlog

**Approche** :
- **BACKLOG** : Tâches de taille moyenne/grosse (3h+)
- **TODO personnel** : Sous-tâches détaillées

**Raison** :
- ✅ Backlog lisible et gérable
- ✅ Pas de micro-tâches qui polluent
- ✅ Détails quand on démarre (TODO)
- ✅ Vue macro vs vue micro

**Exemple** :
- Backlog : "Fix API rooms" (5h)
- TODO : "1. Corriger Zod validation (1h), 2. Tester curl (30min), 3. Déployer sites (2h), 4. Tester live (1h30)"

---

## Décision 8 : Évaluation manuelle (pas automatique)

**Date** : 2025-11-01
**Contexte** : Guillaume veut que Cursor évalue, mais quand il demande

**Choix** : Évaluation sur demande

**Raison** :
- ✅ Flexibilité (évalue quand tu veux)
- ✅ Pas d'overhead si pas besoin
- ✅ Cursor reste un assistant (pas un bot)
- ❌ Pas de rappels automatiques (acceptable, Guillaume préfère manuel)

**Commande** : `"Cursor, évalue le backlog"`

---

## Décision 9 : Numérotation TASK-XXX incrémentale

**Date** : 2025-11-01
**Contexte** : Besoin d'identifiants uniques pour les tâches

**Format** : `TASK-001`, `TASK-002`, etc.

**Raison** :
- ✅ Simple et prévisible
- ✅ Facile à référencer
- ✅ Ordre chronologique de création
- ✅ Pas de collision possible
- ✅ Court (3 chiffres suffisent pour 999 tâches)

---

## Décision 10 : Un seul BACKLOG partagé

**Date** : 2025-11-01
**Contexte** : Guillaume et Associée travaillent ensemble

**Choix** : `BACKLOG.md` unique + 2 TODO personnels

**Raison** :
- ✅ Visibilité complète pour les deux
- ✅ Facilite assignation croisée
- ✅ Évite duplication
- ✅ TODO personnels pour le travail actif
- ✅ Backlog = source de vérité unique

---

**Ces décisions peuvent évoluer avec l'usage. Documenter les changements ici.**



