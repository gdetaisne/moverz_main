# Commandes Cursor - Guide Rapide

> **Pour Cursor** : Ce fichier liste toutes les commandes que Guillaume et son Associée peuvent utiliser.
> Référence rapide pour copier/coller.

---

## 🎯 Commandes Essentielles

### Évaluer le backlog
```
Cursor, évalue le backlog
```
→ Cursor analyse toutes les tâches et donne :
- Priorité (P0-P3) pour chaque tâche
- Temps estimé
- Assignation recommandée
- Ordre de traitement

---

### Voir les tâches incomplètes
```
Cursor, montre les INCOMPLET
```
→ Cursor liste toutes les tâches ⚠️ INCOMPLET avec :
- Titre et ID
- Depuis combien de jours en pause
- Progression (%)
- Ce qui reste à faire

---

### Créer une nouvelle tâche
```
Cursor, crée la tâche : [description détaillée du besoin]
```
→ Cursor :
1. Évalue priorité (P0-P3) et temps estimé
2. Suggère assignation (Guillaume/Associée)
3. Crée entrée dans BACKLOG.md
4. Demande confirmation

**Exemple** :
```
Cursor, crée la tâche : Fix API rooms qui retourne 500 en dev, besoin de corriger la validation Zod et l'auth middleware
```

---

### Démarrer une tâche
```
Cursor, je démarre TASK-XXX
```
→ Cursor :
1. Vérifie s'il y a des ⚠️ INCOMPLET (rappel priorité)
2. Crée dossier `.cursor/tasks/TASK-XXX-nom/`
3. Génère tous les fichiers template
4. Déplace dans TODO personnel
5. Marque 🔄 En cours

**Exemple** :
```
Cursor, je démarre TASK-001
```

---

### Logger une session de travail
```
Cursor, log ma session pour TASK-XXX : [ce que j'ai fait, problèmes rencontrés, solutions, prochain step]
```
→ Cursor ajoute dans `progress.md` avec timestamp

**Exemple** :
```
Cursor, log ma session pour TASK-001 :
- Corrigé validation Zod dans rooms.ts ligne 45
- Problème : JWT_SECRET manquant en dev
- Solution : ajouté dans .env.example
- Prochain step : tester avec curl en local
```

---

### Mettre une tâche en pause (INCOMPLET)
```
Cursor, je mets TASK-XXX en pause
```
OU avec raison :
```
Cursor, je mets TASK-XXX en pause : [raison]
```

→ Cursor :
1. Log détaillé dans `progress.md`
2. Demande état d'avancement (%)
3. Liste fichiers modifiés non commités
4. Note ce qui reste à faire
5. Marque ⚠️ INCOMPLET dans BACKLOG.md

**Exemple** :
```
Cursor, je mets TASK-001 en pause : bug critique apparu en prod, je dois switcher sur P0
```

---

### Abandonner une tâche
```
Cursor, j'abandonne TASK-XXX : [raison détaillée]
```

→ Cursor :
1. Liste tous les commits liés
2. Propose commandes `git revert`
3. Vérifie sites impactés
4. **ATTEND CONFIRMATION** du nettoyage
5. Marque ❌ ABANDONNÉE avec raison

**Exemple** :
```
Cursor, j'abandonne TASK-012 : approche trop complexe, on va utiliser une librairie tierce à la place
```

---

### Finaliser une tâche
```
Cursor, finalise TASK-XXX
```

→ Cursor vérifie **Definition of Done** :
- ✅ Code propre et documenté ?
- ✅ Sur GitHub main + tous dépôts ?
- ✅ Testé sur 2+ sites ?

Si critères manquants → refuse et explique
Si tous validés → archive dans DONE.md

**Exemple** :
```
Cursor, finalise TASK-001
```

---

## 🔍 Commandes de Consultation

### Voir mes tâches actives
```
Cursor, évalue mon TODO
```
→ Cursor analyse TODO personnel et suggère priorités

---

### Statistiques du backlog
```
Cursor, donne-moi les stats du backlog
```
→ Cursor affiche :
- Nombre de tâches par statut
- Nombre par priorité
- Répartition Guillaume vs Associée
- Alertes (tâches en pause > 7 jours)

---

### Historique d'une tâche
```
Cursor, montre l'historique de TASK-XXX
```
→ Cursor lit `progress.md` et résume

---

### Rechercher une tâche
```
Cursor, trouve les tâches qui parlent de [mot-clé]
```
→ Cursor cherche dans BACKLOG.md, TODO, DONE.md

**Exemple** :
```
Cursor, trouve les tâches qui parlent d'API rooms
```

---

## 🛠️ Commandes Avancées

### Créer une tâche pour l'autre personne
```
Cursor, crée une tâche pour [Guillaume/Associée] : [description]
```

**Exemple** :
```
Cursor, crée une tâche pour Associée : Audit SEO du site Marseille, vérifier les 404 et canonicals
```

---

### Reprendre une tâche INCOMPLET
```
Cursor, je reprends TASK-XXX
```
→ Cursor :
1. Montre le dernier état dans `progress.md`
2. Rappelle ce qui reste à faire
3. Liste les fichiers à vérifier
4. Marque 🔄 En cours

---

### Changer la priorité d'une tâche
```
Cursor, change TASK-XXX en P0 : [raison]
```

**Exemple** :
```
Cursor, change TASK-045 en P0 : bug critique détecté en prod, impacte tous les users
```

---

### Estimer le temps restant
```
Cursor, estime le temps restant pour TASK-XXX
```
→ Cursor analyse `progress.md` et les critères manquants

---

### Diviser une tâche trop grosse
```
Cursor, divise TASK-XXX en sous-tâches
```
→ Cursor analyse et propose découpage

**Exemple** :
```
Cursor, divise TASK-020 en sous-tâches : elle est trop grosse (estimée 15h)
```

---

### Fusionner des tâches similaires
```
Cursor, fusionne TASK-XXX et TASK-YYY
```
→ Cursor crée une nouvelle tâche combinée

---

## 📅 Commandes Quotidiennes

### Routine du matin
```
Cursor, que dois-je faire aujourd'hui ?
```
→ Cursor :
1. Rappelle les ⚠️ INCOMPLET
2. Montre les P0/P1
3. Suggère ordre de traitement
4. Estime temps total

---

### Routine du soir
```
Cursor, résume ma journée
```
→ Cursor :
1. Liste ce qui a été fait (DONE aujourd'hui)
2. Tâches en cours (progrès)
3. Tâches mises en pause (attention)
4. Temps total passé

---

## 🎯 Workflows Complets

### Workflow : Bug critique en prod
```
1. "Cursor, je mets TASK-XXX en pause : bug critique"
2. "Cursor, crée la tâche : Bug critique [description]"
3. "Cursor, je démarre TASK-YYY" (le bug)
4. [Résoudre le bug]
5. "Cursor, finalise TASK-YYY"
6. "Cursor, je reprends TASK-XXX"
```

---

### Workflow : Tâche trouvée pour l'autre
```
1. "Cursor, crée une tâche pour [Associée] : [description]"
2. Cursor évalue et ajoute dans BACKLOG
3. L'Associée voit la tâche dans le backlog
4. Elle démarre quand elle veut
```

---

### Workflow : Tâche plus complexe que prévu
```
1. "Cursor, log ma session pour TASK-XXX : tâche plus complexe, estimée 3h mais déjà 5h passées, besoin encore 4h"
2. Continuer OU
3. "Cursor, divise TASK-XXX en sous-tâches"
4. Finaliser une partie, mettre le reste en nouvelles tâches
```

---

## 💬 Exemples de Conversations

### Exemple 1 : Démarrer la journée
```
User: Cursor, que dois-je faire aujourd'hui ?

Cursor: 
⚠️ Tu as 1 tâche INCOMPLET :
- TASK-015 : Migration images Nice (en pause depuis 2 jours, 60% fait, reste 3h)

Priorités P0/P1 :
- [P1] TASK-020 : Refacto auth (5h, Guillaume)
- [P1] TASK-018 : Fix SEO Toulouse (3h, Guillaume)

Recommandation :
1. Finir TASK-015 (INCOMPLET prioritaire, 3h)
2. Ensuite TASK-020 (P1, 5h)

Total estimé aujourd'hui : 8h
```

---

### Exemple 2 : Créer une tâche
```
User: Cursor, crée la tâche : API rooms retourne 500, besoin fixer validation Zod

Cursor:
📊 ÉVALUATION

Titre proposé : Fix API rooms - Erreur 500 validation Zod
Type : Bugfix
Priorité : P1 (bug en dev, pas bloquant prod)
Temps estimé : 4h
Assigné à : Guillaume

Détails identifiés :
- Fichiers probables : backend/routes/rooms.ts, validation schema
- Impact : Dev environment seulement
- Urgence : Moyenne (pas en prod)

Je crée la tâche TASK-021 dans le BACKLOG ?
```

---

### Exemple 3 : Finaliser une tâche
```
User: Cursor, finalise TASK-021

Cursor:
Vérifions la Definition of Done pour TASK-021 :

✅ 1. Code propre et documenté
   → Commits : #abc123 "fix: validation Zod rooms"
   → Code review OK

✅ 2. Sur GitHub main + dépôts
   → moverz_main-2 : #abc123
   → nice : #def456
   → lyon : #ghi789
   → Tous les sites déployés

✅ 3. Testé sur 2+ sites
   → Nice : curl testé, 201/200 OK
   → Lyon : curl testé, 201/200 OK

🎉 Tous les critères validés !

Actions :
- ✅ Mise à jour commits.md avec SHA
- ✅ Mise à jour tests.md avec résultats
- ✅ Marque FINALISÉ dans README.md
- ✅ Archivé dans DONE.md
- ✅ Supprimé du BACKLOG.md

Temps estimé : 4h
Temps réel : 4.5h

Bravo ! 🎉
```

---

## 🆘 Aide Rapide

```
Cursor, aide : [sujet]
```

**Exemples** :
- `Cursor, aide : comment abandonner une tâche`
- `Cursor, aide : workflow quotidien`
- `Cursor, aide : Definition of Done`

---

*Dernière mise à jour : 2025-11-01*

