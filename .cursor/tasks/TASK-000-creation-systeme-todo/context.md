# Contexte : TASK-000 - Création Système TODO/Backlog

## Problème initial

Guillaume et son Associée travaillent sur le même projet Moverz avec plusieurs difficultés organisationnelles :

1. **Difficulté à organiser les TODO**
   - Pas de système structuré
   - Chacun ses sujets mais parfois croisés
   - Tâches commencées non terminées puis oubliées

2. **Changements de priorités**
   - Problèmes critiques apparaissent en cours de journée
   - Besoin de switcher rapidement
   - Perte de contexte sur tâche abandonnée

3. **Documentation éparpillée**
   - ~115 fichiers .md dans dossier principal
   - Impossible de retrouver historique d'une tâche
   - Documentation mélangée avec code

4. **Pas de priorisation systématique**
   - Besoin que Cursor aide à évaluer priorité + temps
   - Pas de visibilité sur ROI des tâches

## Pourquoi cette tâche ?

**Besoin critique d'organisation** pour :
- Ne plus oublier les tâches incomplètes
- Collaborer efficacement à deux
- Avoir une priorisation guidée
- Documenter proprement séparément du code
- Appliquer une Definition of Done stricte

## Solution choisie

Système 100% intégré Cursor avec :

1. **Fichiers markdown** (`.cursor/`)
   - Versionnable Git
   - Lisible en texte
   - Cursor peut lire/modifier

2. **Règles strictes** (`.cursorrules`)
   - Appliquées automatiquement
   - Cursor refuse de coder sans tâche
   - Vérifie Definition of Done

3. **Granularité contrôlée**
   - Backlog : Tâches moyennes/grosses
   - TODO : Granularité fine
   - Documentation par tâche séparée

4. **Statuts clairs**
   - 📋 À faire
   - 🔄 En cours
   - ⚠️ INCOMPLET (priorité absolue)
   - ❌ ABANDONNÉE (code reverté)
   - ✅ FINALISÉ (3 critères validés)

## Scope

**Inclus** :
- Création système complet
- Documentation exhaustive
- Migration ~115 fichiers orphelins
- Analyse commits 3 derniers jours
- Création 14 tâches depuis commits
- Analyse priorisation SEO
- Templates et exemples

**Hors scope** :
- Outil externe (Notion, Jira)
- Base de données
- Interface graphique

## Impact

### Productivité
- ✅ Tâches incomplètes visibles
- ✅ Priorisation guidée
- ✅ Pas d'oublis

### Collaboration
- ✅ Backlog partagé
- ✅ TODO personnels
- ✅ Assignation claire

### Qualité
- ✅ Definition of Done stricte
- ✅ Code propre obligatoire
- ✅ Tests obligatoires

### Documentation
- ✅ Historique complet par tâche
- ✅ Décisions tracées
- ✅ Commits documentés

