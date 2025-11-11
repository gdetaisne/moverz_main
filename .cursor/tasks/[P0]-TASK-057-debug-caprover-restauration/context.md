# CONTEXT - Pourquoi cette Restauration ?

**Date incident** : 11 novembre 2025 ~00:00-01:00 UTC  
**Date restauration** : 11 novembre 2025 ~02:00 UTC  
**Snapshot restauré** : 4 novembre 2025

---

## ✅ INCIDENT INITIAL IDENTIFIÉ (11/11/2025)

**Problème Root Cause** : **Disque VPS se remplit rapidement de façon récurrente**

### Symptômes Observés (10/11/2025)

**Graphique Hostinger "Espace disque"** :
- Montée rapide de 200 GB → ~400 GB sur quelques semaines
- 10/11/2025 11:15 : **7.82 GB utilisés** (proche limite ?)
- Courbe ascendante constante = **problème récurrent**

### Actions Guillaume (10/11/2025)

1. Détection disque plein/presque plein
2. Tentative libération espace disque manuellement
3. **Résultat** : "tout cassé" (CapRover/sites down)
4. **Solution d'urgence** : Restauration snapshot 4 nov

### Problème Critique Identifié

🚨 **Si cause racine non résolue, incident va se reproduire** sous quelques jours/semaines !

**Suspects probables** :
- Logs Docker non rotatifs (accumulation infinie)
- Images Docker non nettoyées (builds CapRover multiples)
- Volumes Docker orphelins
- Builds Next.js cachés (.next, node_modules dans containers)
- Logs applicatifs sites (11 sites × logs)

---

## 🔍 CAUSES PROBABLES REMPLISSAGE DISQUE

### ✅ Hypothèse Validée : Libération Espace Manuelle a Cassé Système

**Scénario reconstruit** :
1. Disque se remplit rapidement (200→400 GB sur quelques semaines)
2. Guillaume détecte problème (10/11 11:15)
3. Guillaume tente libérer espace (commandes `docker system prune` ? suppression manuelle ?)
4. **Commande supprime fichier critique** (config CapRover ? volume Docker ?)
5. → CapRover crash, sites inaccessibles
6. → Solution : Restauration snapshot 4 nov

### Suspects Remplissage Disque (À DIAGNOSTIQUER)

**Suspect #1 : Logs Docker** ⭐⭐⭐ (TRÈS PROBABLE)
- Logs containers non rotatifs = accumulation infinie
- 11 sites + services = beaucoup de logs
- Vérifier : `/var/lib/docker/containers/*/` (fichiers `*-json.log`)

**Suspect #2 : Images Docker** ⭐⭐ (PROBABLE)
- Builds CapRover multiples (1 build = 1 image)
- Images orphelines non supprimées
- Vérifier : `docker images` (dangling images ?)

**Suspect #3 : Volumes Docker Orphelins** ⭐⭐
- Volumes créés lors builds non nettoyés
- Vérifier : `docker volume ls` + `docker volume prune`

**Suspect #4 : Builds Next.js** ⭐
- `.next/` dossiers dans containers
- `node_modules/` dupliqués
- Cache Turbo/Next.js

**Suspect #5 : Logs Applicatifs** ⭐
- Logs sites (console.log, errors)
- Logs CapRover (`/captain/`)
- Logs Nginx

---

## 📅 CHRONOLOGIE (À COMPLÉTER)

### 4 novembre 2025 (snapshot de référence)
- ✅ CapRover fonctionnel
- ✅ 11 sites accessibles
- ✅ Version code stable

### 5-10 novembre 2025 (période intermédiaire)
- ❓ Quelles modifications effectuées ?
- ❓ Déploiements code ?
- ❓ Changements infrastructure ?

### 11 novembre 2025 00:00-01:00 UTC (incident initial)
- 🚨 **Incident X se produit** (À DOCUMENTER)
- ❓ Symptômes observés ?
- ❓ Actions tentées ?

### 11 novembre 2025 02:00 UTC (restauration)
- 🔄 Guillaume décide de restaurer snapshot 4 nov
- 🔄 Restauration VPS Hostinger en cours
- ⚠️ **Nouvelle situation** : CapRover ne démarre plus

### 11 novembre 2025 02:30-04:00 UTC (debugging actuel)
- 🔍 Diagnostic avec Cursor
- 🔍 Identification root cause (config corrompue)
- 📝 Documentation incident (ce fichier)

---

## 🎯 OBJECTIFS DOCUMENTATION

1. **Comprendre incident initial** (pourquoi restauration nécessaire)
2. **Prévenir récidive** (monitoring, alertes, procédures)
3. **Améliorer process** (restauration propre, tests post-restauration)

---

## 📋 QUESTIONS POUR GUILLAUME

1. **Incident Initial** :
   - Qu'est-ce qui s'est passé ce matin avant la restauration ?
   - Quels symptômes as-tu observés ?
   - Quelles actions as-tu tentées avant de restaurer ?

2. **Restauration** :
   - Pourquoi snapshot du 4 nov (vs plus récent) ?
   - Process de restauration Hostinger (automatique/manuel) ?
   - Validations effectuées après restauration ?

3. **État Avant Incident** :
   - Déploiements code récents (5-10 nov) ?
   - Changements infra (Docker, CapRover, Nginx) ?
   - Logs/alertes inhabituels avant incident ?

4. **Décisions Futures** :
   - Fréquence snapshots à augmenter ?
   - Monitoring CapRover à mettre en place ?
   - Process de restauration à documenter/améliorer ?

---

**À COMPLÉTER** : Guillaume, réponds aux questions ci-dessus pour finaliser ce contexte.

---

**Dernière mise à jour** : 11/11/2025 03:15 UTC

