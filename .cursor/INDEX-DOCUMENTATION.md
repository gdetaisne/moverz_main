# 📚 INDEX DOCUMENTATION - Point d'Entrée Cursor

**LECTURE OBLIGATOIRE au démarrage de chaque nouveau chat Cursor**

---

## 🎯 Objectif de ce Document

**Faire comprendre à Cursor** :
1. Le contexte business (lead generation via SEO)
2. L'architecture technique (11 sites, duplication)
3. Les zones de risque (bugs récurrents)
4. Les contraintes strictes (workflow tâches)
5. Les commandes disponibles

**Résultat** : Cursor évite 95% des bugs récurrents

---

## 📖 LECTURE OBLIGATOIRE (Ordre de Priorité)

### 🔴 **PRIORITÉ P0 : Lire en PREMIER**

#### 1. **PRINCIPES-SACRES.md** (5 min) ⭐⭐⭐
📄 `.cursor/PRINCIPES-SACRES.md`

**Pourquoi** : Comprendre les 3 principes non négociables
- SEO First (business critical)
- Multi-sites (11 villes)
- Maintenabilité (code propre)

**Cursor doit intégrer** :
- Jamais casser le SEO sans comprendre
- Toujours penser 11 villes
- Toujours utiliser cityData dynamique

---

#### 2. **ZONES-DE-RISQUE.md** (10 min) ⭐⭐⭐
📄 `.cursor/ZONES-DE-RISQUE.md`

**Pourquoi** : Connaître les 8 zones qui causent 90% des bugs
- Villes hardcodées
- Sync multi-sites oublié
- Canonicals cassés
- Dockerfile inconsistant
- Blog cross-contamination
- Internal linking cassé
- Metadata hardcodées
- Fichiers mal rangés

**Cursor doit retenir** :
- RED FLAGS (quand STOP et demander)
- Patterns de bugs à éviter
- Solutions pour chaque zone

---

#### 3. **CHECKLIST-PRE-CODE.md** (3 min) ⭐⭐⭐
📄 `.cursor/CHECKLIST-PRE-CODE.md`

**Pourquoi** : Checklist systématique avant chaque modification

**Cursor doit exécuter** :
- Avant d'écrire du code
- Vérifier impact SEO
- Vérifier multi-sites
- Vérifier ville hardcodée
- Prévoir tests

---

### 🟠 **PRIORITÉ P1 : Lire Ensuite**

#### 4. **TODO-Guillaume.md OU TODO-Lucie.md** (2 min) ⭐⭐
📄 `.cursor/TODO-Guillaume.md` ou `.cursor/TODO-Lucie.md`

**Pourquoi** : Connaître l'état actuel des tâches

**Cursor doit vérifier** :
- Y a-t-il des tâches ⚠️ INCOMPLET ? (prioritaires)
- Quelles tâches sont EN COURS ?
- Quelles tâches [P0] critiques ?

---

#### 5. **ARCHITECTURE-MULTISITES.md** (15 min) ⭐⭐
📄 `.cursor/ARCHITECTURE-MULTISITES.md`

**Pourquoi** : Comprendre en détail l'architecture technique

**Cursor doit comprendre** :
- Structure des 11 sites
- Code partagé vs spécifique
- Résolution de ville (SITE_URL → cityData)
- Scripts de sync disponibles
- Workflow déploiement CapRover

**Optionnel** : Lire en détail si modification architecture

---

### 🟡 **PRIORITÉ P2 : Références**

#### 6. **BACKLOG.md** (scan rapide) ⭐
📄 `.cursor/BACKLOG.md`

**Pourquoi** : Vue d'ensemble des tâches à faire

**Cursor scanne** :
- Section ⚠️ INCOMPLET (prioritaires)
- Tâches [P0] critiques
- Projet 404 (9 sous-tâches)

---

#### 7. **README.md** (référence) ⭐
📄 `.cursor/README.md`

**Pourquoi** : Guide complet du système de tâches

**Contenu** :
- Statuts des tâches (TERMINÉE, INCOMPLET, etc.)
- Definition of Done (3 critères)
- Workflows détaillés
- Commandes Cursor disponibles

---

#### 8. **WORKFLOW-CLEAN-TASKS.md** (référence)
📄 `.cursor/WORKFLOW-CLEAN-TASKS.md`

**Pourquoi** : Process fin de journée

**Quand lire** : Si user tape `"Cursor, clean tasks"`

---

#### 9. **COMMANDES-RAPIDES.md** (référence)
📄 `.cursor/COMMANDES-RAPIDES.md`

**Pourquoi** : Liste de toutes les commandes disponibles

**Quand lire** : Si besoin d'une commande spécifique

---

## 🚀 QUICK START (Nouveau Chat Cursor)

### Démarrage Automatique (ce que Cursor fait)

```
1. Run health-check automatique
   → node tools/tasks/scripts/health-check.mjs
   
2. Lire PRINCIPES-SACRES.md (5 min)
   → Intégrer : SEO first, 11 villes, cityData dynamique
   
3. Lire ZONES-DE-RISQUE.md (10 min)
   → Mémoriser : RED FLAGS, patterns de bugs
   
4. Lire CHECKLIST-PRE-CODE.md (3 min)
   → Checklist systématique avant code
   
5. Lire TODO-Guillaume.md (2 min)
   → État actuel : INCOMPLET ? EN COURS ? P0 ?
   
6. Afficher résumé à Guillaume :
   - Health check results
   - Tâches INCOMPLET (prioritaires)
   - Tâches P0 critiques
   - Recommandation
   
7. Attendre instructions
```

**Temps total** : ~20 minutes lecture + 30 sec health check  
**Investissement** : Évite 2-3h de debug bugs récurrents

---

### Message de Bienvenue (Cursor affiche)

```
👋 Salut Guillaume !

📚 J'ai lu la documentation obligatoire :
✅ PRINCIPES-SACRES.md (SEO first, 11 villes, maintenabilité)
✅ ZONES-DE-RISQUE.md (8 zones critiques mémorisées)
✅ CHECKLIST-PRE-CODE.md (workflow pré-code intégré)
✅ TODO-Guillaume.md (état actuel)

📊 Ton état actuel :
- 🔄 X tâches EN COURS
- ⚠️ Y tâches INCOMPLET (prioritaires)
- 🔴 Z tâches [P0] critiques

🎯 Prochaine tâche recommandée :
- [P0]-TASK-XXX : Description (raison)

Sur quoi veux-tu travailler ? 🚀
```

---

## 📂 STRUCTURE COMPLÈTE `.cursor/` + `tools/`

### Fichiers Système Actifs

```
.cursor/
├── BACKLOG.md                 → Toutes les tâches (INCOMPLET + PENDING)
├── TODO-Guillaume.md          → Tâches actives Guillaume
├── TODO-Lucie.md              → Tâches actives Lucie
├── DONE.md                    → Archive tâches finalisées
├── README.md                  → Guide système tâches
│
├── INDEX-DOCUMENTATION.md     → ⭐ Point d'entrée (ce fichier)
├── PRINCIPES-SACRES.md        → ⭐ Principes non négociables
├── ZONES-DE-RISQUE.md         → ⭐ Zones critiques (bugs récurrents)
├── ARCHITECTURE-MULTISITES.md → ⭐ Architecture technique
├── CHECKLIST-PRE-CODE.md      → ⭐ Checklist avant code
│
├── WORKFLOW-CLEAN-TASKS.md    → Workflow fin de journée
├── COMMANDES-RAPIDES.md       → Référence commandes
├── AIDE-MEMOIRE-CLEAN-TASKS.md → Aide-mémoire visuel
│
├── scripts/                   → Symlink → tools/tasks/scripts/
│
├── tasks/                     → Documentation par tâche
│   ├── README.md             (guide organisation)
│   ├── PRIORITES-VISUELLES.md (système [P0]/[P1]/[P2])
│   │
│   ├── [P0]-TASK-404-01-audit-structure/           ✅ TERMINÉ
│   ├── [P0]-TASK-404-02-harmonisation-technique/   📋 PENDING
│   ├── [P1]-TASK-404-03-decision-articles/         📋 PENDING
│   ├── ... (jusqu'à TASK-404-09)
│   │
│   ├── [P0]-TASK-011-fix-308-nice/                 🔄 EN COURS
│   ├── [P1]-TASK-006-migration-canonicals/         🔄 EN COURS
│   └── ... (autres tâches en cours)
│
└── archives/                  → Documentation historique
    ├── README.md             (guide archives)
    ├── projet-404/           (docs globales projet 404)
    ├── rapports/             (rapports datés)
    └── analyses/             (analyses temporaires)

tools/tasks/                   → Scripts automation (VERSIONNÉS GitHub)
├── scripts/                   → 7 scripts automation
│   ├── health-check.mjs      ⭐ Dashboard tout-en-un
│   ├── validate-tasks.mjs    🔒 Validation structure
│   ├── check-incomplete-tasks.mjs  ⚠️ Rappel INCOMPLET
│   ├── check-zombie-tasks.mjs  🧟 Détection >7j
│   ├── tasks-dashboard.mjs   📊 Métriques visuelles
│   ├── backup-tasks.sh       💾 Backup quotidien
│   └── create-task-template.sh  📝 Template auto
│
└── guides/                    → Guides sécurisation (archivés)
```

---

## 🎯 COMMANDES CURSOR DISPONIBLES

### Gestion de Tâches

```bash
"Cursor, évalue le backlog"
"Cursor, montre les INCOMPLET"
"Cursor, crée la tâche [description]"
"Cursor, je démarre TASK-XXX"
"Cursor, log ma session pour TASK-XXX : [fait]"
"Cursor, je mets TASK-XXX en pause : [raison]"
"Cursor, j'abandonne TASK-XXX : [raison]"
"Cursor, finalise TASK-XXX"
```

### Clean Tasks (Fin de Journée)

```bash
"Cursor, clean tasks"                    → Workflow complet (10 min)
"Cursor, clean tasks en mode rapide"    → Version rapide (5 min)
"Cursor, clean TASK-XXX"                 → 1 seule tâche (3 min)
```

Voir : `WORKFLOW-CLEAN-TASKS.md` pour détails

---

## 🔧 SCRIPTS AUTOMATION (Nouveau !)

### Scripts Disponibles

| Script | Usage | Quand |
|--------|-------|-------|
| `health-check.mjs` | Dashboard complet (tout-en-un) | Démarrage session ⭐ |
| `validate-tasks.mjs` | Validation structure (6 fichiers) | Pre-commit (auto) |
| `check-incomplete-tasks.mjs` | Rappel INCOMPLET | Démarrage |
| `check-zombie-tasks.mjs` | Détecte >7j sans update | Hebdo (lundi) |
| `tasks-dashboard.mjs` | Métriques visuelles | À la demande |
| `backup-tasks.sh` | Backup .cursor/ | Quotidien (optionnel) |
| `create-task-template.sh` | Génère template tâche | Nouvelle tâche |

**Path** : `tools/tasks/scripts/` (versionnés GitHub)  
**Symlink** : `.cursor/scripts/` → `tools/tasks/scripts/`

### Utilisation

```bash
# Dashboard complet (matin)
node tools/tasks/scripts/health-check.mjs

# Validation manuelle
node tools/tasks/scripts/validate-tasks.mjs

# Créer nouvelle tâche
tools/tasks/scripts/create-task-template.sh TASK-XXX-nom
```

### Automatisation Configurée

**Hook Git Pre-Commit** :
- Run `validate-tasks.mjs` automatiquement
- Bloque commit si structure invalide
- Garantit 6 fichiers obligatoires

**Alias Shell** :
```bash
moverz  # → Run health-check immédiatement
```

Voir : `tools/tasks/guides/GUIDE-INSTALLATION-RAPIDE.md` pour setup complet

---

## 🚨 CONTRAINTES STRICTES (Rappel)

### Definition of Done (3 critères)

**Une tâche ne peut être marquée ✅ TERMINÉE que si** :

1. ✅ Code propre et documenté
2. ✅ Commits GitHub main + SHA documentés
3. ✅ Testé sur 2+ sites avec résultats documentés

**Si 1 critère manque** → Cursor refuse de finaliser

---

### Tâches INCOMPLET = TOUJOURS Prioritaires

**Si tâches ⚠️ INCOMPLET existent** :

Cursor DOIT rappeler au démarrage :
```
⚠️ Tu as X tâches INCOMPLÈTES à finir en priorité :
1. TASK-XXX : [titre] (en pause depuis X jours)

Veux-tu :
A) Reprendre cette tâche INCOMPLET
B) Abandonner (avec revert code)
C) Exceptionnellement démarrer du nouveau (justifie)
```

---

### Pas de Code Sans Tâche Documentée

**Workflow OBLIGATOIRE** :
```
1. Vérifier si tâche existe dans BACKLOG.md
2. Si NON → Créer tâche + évaluation (P0-P3, temps)
3. Créer dossier .cursor/tasks/[PX]-TASK-XXX/
4. Déplacer dans TODO-Guillaume.md
5. ALORS SEULEMENT commencer à coder
```

---

## 📊 PRIORITÉS VISUELLES

**Système de préfixes dans `tasks/`** :

- **[P0]** = 🔴 Critique / Bloquant (6 tâches actuelles)
- **[P1]** = 🟠 Important (5 tâches actuelles)
- **[P2]** = 🟡 Normal (4 tâches actuelles)

**Commandes utiles** :
```bash
ls -1d .cursor/tasks/\[P0\]*  # Lister critiques
ls -1d .cursor/tasks/\[P1\]*  # Lister importantes
```

Voir : `tasks/PRIORITES-VISUELLES.md`

---

## 🗺️ NAVIGATION RAPIDE

### Besoin de...

| Besoin | Fichier à Lire |
|--------|----------------|
| Comprendre les principes | `PRINCIPES-SACRES.md` |
| Éviter un bug spécifique | `ZONES-DE-RISQUE.md` |
| Vérifier avant de coder | `CHECKLIST-PRE-CODE.md` |
| Comprendre architecture | `ARCHITECTURE-MULTISITES.md` |
| Voir tâches à faire | `BACKLOG.md` |
| Voir tâches en cours | `TODO-Guillaume.md` |
| Voir tâches finalisées | `DONE.md` |
| Nettoyer fin de journée | `WORKFLOW-CLEAN-TASKS.md` |
| Liste commandes | `COMMANDES-RAPIDES.md` |
| Détails d'une tâche | `tasks/[PX]-TASK-XXX/README.md` |
| Plan projet 404 | `archives/projet-404/TASKS-404-DETAILLEES.md` |

---

## 🚀 WORKFLOW CURSOR IDÉAL

### Au Démarrage de Chat

```
1. Lire INDEX-DOCUMENTATION.md (ce fichier)
   ↓
2. Lire PRINCIPES-SACRES.md (5 min)
   → Intégrer : SEO first, 11 villes, cityData dynamique
   ↓
3. Lire ZONES-DE-RISQUE.md (10 min)
   → Mémoriser : RED FLAGS, patterns bugs
   ↓
4. Lire CHECKLIST-PRE-CODE.md (3 min)
   → Workflow pré-code
   ↓
5. Lire TODO-Guillaume.md (2 min)
   → État actuel : INCOMPLET ? P0 ?
   ↓
6. Afficher résumé + attendre instructions
```

**Temps total lecture** : ~20 minutes  
**ROI** : Évite 2-3h de bugs à corriger

---

### Pendant le Travail

**À chaque modification de code** :

```
1. Vérifier CHECKLIST-PRE-CODE.md
   □ Impact SEO ?
   □ Multi-sites ?
   □ Ville hardcodée ?
   ↓
2. Si RED FLAG → STOP et demander
   ↓
3. Écrire code
   ↓
4. Tester (2+ villes si partagé)
   ↓
5. Commit
```

---

### En Fin de Journée

```
User : "Cursor, clean tasks"
   ↓
Cursor : Suit WORKFLOW-CLEAN-TASKS.md
   ↓
Résultat : Tout documenté, prêt pour demain
```

---

## 📋 CHECKLIST NOUVEAU CHAT (Pour Cursor)

**Au démarrage, Cursor DOIT** :

```
✅ Lecture obligatoire
   □ PRINCIPES-SACRES.md
   □ ZONES-DE-RISQUE.md  
   □ CHECKLIST-PRE-CODE.md
   □ TODO-Guillaume.md

✅ Vérifications
   □ Y a-t-il des ⚠️ INCOMPLET ? (prioritaires)
   □ Y a-t-il des [P0] critiques ?
   □ Quel est l'état du projet 404 ?

✅ Préparation
   □ Mémoriser RED FLAGS (canonicals, villes hardcodées, etc.)
   □ Mémoriser workflow multi-sites (sync 11 villes)
   □ Intégrer checklist pré-code

✅ Communication
   □ Afficher résumé état actuel à Guillaume
   □ Rappeler tâches INCOMPLET si existent
   □ Demander : "Sur quoi veux-tu travailler ?"
```

---

## 🎯 CONTEXTE BUSINESS (Rappel)

### Modèle Économique

```
SEO → Trafic → Pages → Formulaires → Leads → €€€
```

**Si SEO cassé** → Tout s'effondre

### 11 Villes = 11 Sources de Leads

```
Nice : X leads/mois
Lyon : Y leads/mois
Marseille : Z leads/mois
... Total : 11x leads
```

**Un bug sur 1 ville** = Perte de 1/11ème des leads

**Un bug sur les 11 villes** (sync oublié) = Perte totale

---

## ⚠️ BUGS RÉCURRENTS À ÉVITER

### Top 3 Bugs (90% des problèmes)

#### 🥇 #1 : Ville Hardcodée (40% des bugs)

```typescript
❌ title: "Déménagement à Lille"  // Dans site Nice
✅ title: `Déménagement à ${city.nameCapitalized}`
```

**Prévention** : Toujours cityData dynamique

---

#### 🥈 #2 : Sync Oublié (30% des bugs)

```bash
❌ Fix dans Nice uniquement
✅ Fix dans Nice + sync 10 autres villes
```

**Prévention** : Checklist "fichier partagé ?"

---

#### 🥉 #3 : Canonical Cassé (20% des bugs)

```typescript
❌ canonical: `${env.SITE_URL}/page/`  // Manuel
✅ canonical: getCanonicalUrl('page')  // Helper
```

**Prévention** : Helper uniquement, jamais manuel

---

## 💡 MENTAL MODEL POUR CURSOR

### Avant Chaque Action, Demande-Toi :

```
🎯 Est-ce que je touche au SEO ?
   SI OUI :
   - Comprendre impact business
   - Utiliser helper (canonical)
   - Tester après modification
   - Demander si incertain

🌍 Est-ce du code partagé (lib/components) ?
   SI OUI :
   - Penser 11 villes
   - Prévoir sync après modif
   - Tester 2+ villes
   - Commit "11 villes"

🚫 Est-ce que je hardcode une ville ?
   SI OUI :
   - STOP
   - Utiliser cityData dynamique
   - city.nameCapitalized, city.slug

📁 Est-ce que je crée un fichier ?
   - Où le ranger ?
   - Est-ce temporaire ?
   - .gitignore si nécessaire
```

**Si 1+ réponse problématique** → STOP et demander à Guillaume

---

## 🔄 WORKFLOW MODIFICATION TYPE

### Exemple : Fix Bug dans cityData

```
1. Demande : "Corriger cityData.ts trailing slash"
   ↓
2. Cursor vérifie CHECKLIST-PRE-CODE
   □ Impact SEO ? → Oui (URLs)
   □ Multi-sites ? → Oui (cityData partagé)
   ↓
3. Cursor demande confirmation
   "⚠️ cityData = 11 villes. Plan :
   1. Fix dans Nice
   2. Sync 10 autres
   3. Test Nice + Lyon
   OK ?"
   ↓
4. User : "OK"
   ↓
5. Cursor fait la modif
   ↓
6. Cursor sync (copie 10x ou run script)
   ↓
7. Cursor teste Nice + Lyon
   ↓
8. Cursor commit "fix(lib): cityData trailing slash (11 villes)"
   ↓
9. Cursor push
   ↓
10. Cursor finalise tâche (si DoD OK)
```

---

## 📊 ÉTAT ACTUEL PROJET

### Tâches Critiques [P0]

```
🔴 [P0]-TASK-011-fix-308-nice (90% fait)
🔴 [P0]-TASK-404-01-audit-structure ✅ TERMINÉ
🔴 [P0]-TASK-404-02-harmonisation-technique ← PROCHAINE
🔴 [P0]-TASK-404-05-correction-liens
🔴 [P0]-TASK-404-06-validation-liens
🔴 [P0]-TASK-404-09-validation-finale
```

### Tâches En Cours (à finaliser)

```
🔄 7 tâches à 70-95% complètes
- TASK-006 : Canonicals (95%, bugs résiduels)
- TASK-011 : Fix 308 Nice (90%)
- TASK-012 : Villes hardcodées (85%)
- TASK-009 : Schema.org (70%)
- TASK-013 : Internal linking (75%)
- TASK-014 : Metadata SEO (80%)
```

### Projet 404

```
✅ TASK-404-01 : Audit ✅ TERMINÉ
⏭️ TASK-404-02 : Harmonisation ← DEMAIN
📋 TASK-404-03 à 404-09 : PENDING
```

Voir : `archives/projet-404/TASKS-404-DETAILLEES.md` (plan complet)

---

## 🔑 TAKEAWAYS CRITIQUES

### Pour Cursor, retenir :

1. **SEO = BUSINESS** → Jamais casser sans comprendre
2. **11 VILLES** → Toujours sync code partagé
3. **cityData DYNAMIQUE** → Jamais hardcoder
4. **CHECKLIST PRÉ-CODE** → Systématique avant chaque modif
5. **RED FLAGS** → STOP et demander si détecté
6. **Tests 2+ villes** → Si code partagé
7. **DoD 3 critères** → Avant marquer TERMINÉE

---

## 📖 DOCUMENTATION EXTERNE

### Projet

- `README.md` (racine) → Overview projet Moverz
- `CHANGELOG.md` → Historique versions
- `docs/` → Documentation technique ancienne

### Scripts

- `scripts/README.md` → Guide scripts disponibles
- `scripts/sync/` → Scripts synchronisation
- `scripts/deploy/` → Scripts déploiement
- `scripts/analysis/` → Scripts analyse

---

## ✅ VALIDATION

**Cursor a bien lu cette doc si** :

```
□ Je comprends : SEO = business critical
□ Je comprends : 11 sites = code dupliqué + sync manuel
□ Je sais : Toujours utiliser cityData dynamique
□ Je sais : Vérifier CHECKLIST-PRE-CODE avant de coder
□ Je sais : STOP si RED FLAG détecté
□ Je sais : Tester 2+ villes si code partagé
□ Je connais : Les commandes disponibles
□ Je connais : Les zones de risque (8 zones)
```

**Si Cursor peut cocher ces 8 cases** → Documentation intégrée ✅

---

## 🎉 PRÊT À TRAVAILLER

**Après lecture de cette doc** :

Cursor est prêt à :
- ✅ Éviter les bugs récurrents
- ✅ Penser SEO automatiquement
- ✅ Gérer les 11 villes correctement
- ✅ Suivre les workflows
- ✅ Respecter les contraintes

**Investissement** : 20 min lecture  
**ROI** : Évite des heures de corrections

---

**Bonne session de travail !** 🚀

---

*Créé le : 2025-11-02*  
*Version : 1.0*  
*Point d'entrée pour tous les nouveaux chats Cursor*
