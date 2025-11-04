# TODO ACTIFS - Guillaume

> **Instructions Cursor** : Ce fichier contient mes tâches EN COURS.
> Quand je te demande d'évaluer :
> - Vérifie que je ne suis pas sur trop de tâches en parallèle (max 3 recommandé)
> - Identifie les tâches incomplètes/abandonnées
> - Suggère quoi terminer en priorité
> - Estime le temps restant pour chaque tâche

---

## 🔥 EN COURS MAINTENANT

*Aucune tâche en cours*

**Toutes les sessions 404 sont ARCHIVÉES dans DONE.md** ✅
- **Session 3** : TASK-404-BLOG FINAL (4 villes, 437 liens) ✅ ARCHIVÉ
- **Session 2** : TASK-404-BLOG (5 villes, 697 liens) ✅ ARCHIVÉ
- **Session 1** : TASK-404-ALL-CITIES (11 villes, 1,713 liens) ✅ ARCHIVÉ
- **TASK-404-01** : Audit Structure Complète ✅ ARCHIVÉ


---

## 🚨 URGENT - CRITIQUE SEO (À FAIRE MAINTENANT)

*Aucune tâche urgente en cours*

**Projet 404 CLÔTURÉ** : Voir DONE.md pour détails complets des 4 tâches archivées.

---

## ⚡ À FAIRE APRÈS (5 MIN)

### [P0]-TASK-023 : Setup Scripts Automation

**Priorité** : P0 (Active tout le système créé aujourd'hui)  
**Temps** : 5 minutes  
**Type** : Setup one-time

**Actions** :
1. ✅ Copie/colle 3 blocs commandes depuis `COMMANDES-A-FAIRE.md`
2. ✅ Test `moverz` fonctionne
3. ✅ Commit + push
4. ✅ Test nouveau chat Cursor

**Fichier** : `/COMMANDES-A-FAIRE.md` (tout est prêt à copier/coller)

**Impact** :
- Active validation pre-commit
- Active dashboard "moverz"
- Versionne tout sur GitHub
- Cursor auto-éduqué au prochain chat

---

## 📅 PLANIFIÉ AUJOURD'HUI (03 NOV 2025)

### 🎯 PROJET 404 - DÉMARRAGE

**Session actuelle** : Analyse complète + Restructuration tâches ✅

**Scan réel 03/11** : 513 erreurs 404 identifiées (1168 liens cassés)

**Plan validé** : Quick Wins → Décision → Correction massive → Validation

---
### Nouvelle tâche ajoutée

- [P1]-TASK-028 — Sitemaps Consistency (11 villes) — 1.5-2h — PENDING
  - Assurer 1 seule sitemap par domaine (route app), pas d’index ni `sitemap-*.xml`, directive `Sitemap:` dans `robots.txt`, neutraliser `next-sitemap`.

### TASK-404-QW : Quick Wins (2h) ← DÉMARRER MAINTENANT

**Priorité** : P0 (Valider workflow + ROI immédiat 35-45%)  
**Type** : Bugfix simple + Validation workflow

**Objectif** : 
1. Valider workflow : Code → Deploy → Scan → Compare
2. Résoudre 170-220 liens (35-45% des 513 erreurs)

**Actions** :
1. **Fix majuscules URLs (1h)** → 80-100 liens
   - `/Nice-vers-paris` → `/nice-vers-paris`
   - `/quartiers-Nice` → `/quartiers-nice`
   - Fichiers : Templates corridors, quartiers, homepage
   
2. **Fix accents Toulouse (30min)** → 60-80 liens
   - Redirections 301 : `/dem%C3%A9nagement-X/` → `/demenagement-X/`
   - Fichier : `sites/toulouse/next.config.mjs`
   
3. **Fix devis cross-ville (30min)** → 30-40 liens
   - `/devis-demenagement-lille` dans Bordeaux → Fix dynamique
   - Fichiers : Templates FAQ, Inventaire-IA

**Validation** :
- Deploy CapRover 11 villes
- Régénérer scan
- Comparer : **513 → 290-340** (objectif)

**Commande démarrage** :
```bash
"Cursor, je démarre TASK-404-QW"
```

**Docs de référence** :
- `.cursor/tasks/[P0]-TASK-404-QW-quick-wins/README.md` (plan détaillé)
- `.cursor/tasks/[P0]-TASK-404-ANALYSE-SCAN-03NOV.md` (analyse scan)
- `.cursor/tasks/[P0]-TASK-404-PLAN-EXECUTION-FINAL.md` (ordre optimal)

---

## 💡 IDÉES / DÉCOUVERTES

### Quick wins identifiés (session 01/11)

1. **Article Toulouse** (30 min) → 53 liens résolus (ROI 106)
2. **Catégories courtes** (1h) → 147 liens résolus (ROI 147)
3. **Majuscules homepage** (1h) → 80-100 liens résolus (ROI 80-100)

**Total** : 2h30 → 280-300 liens résolus (25% du CSV) 🚀

À faire après TASK-404-02 (dans TASK-404-05 et 404-08)

---

## ✅ FAIT RÉCEMMENT

**Tâches récemment archivées** : Voir DONE.md
- TASK-404-BLOG-FINAL (04/11)
- TASK-404-BLOG (04/11)
- TASK-404-ALL-CITIES (03-04/11)
- TASK-404-01 (01/11)
- TASK-025 (03/11)
- TASK-011 (04/11)

---

## 🎯 WORKFLOW RECOMMANDÉ

### Matin (Demain)
1. Lire `.cursor/RESUME-DEMARRAGE-DEMAIN-404.md` (5 min)
2. `"Cursor, je démarre TASK-404-02"` → Cursor prépare la tâche
3. Suivre plan détaillé (`.cursor/TASKS-404-DETAILLEES.md`)

### Pendant le travail
- `"Cursor, log ma session pour TASK-404-02 : [ce que j'ai fait]"` → Documenter régulièrement
- Si découverte d'une tâche → Ajouter dans "IDÉES/DÉCOUVERTES", trier plus tard

### Interruption / Changement de priorité
- `"Cursor, je mets TASK-404-02 en pause : [raison]"` → Sauvegarder le contexte
- Cursor marque ⚠️ INCOMPLET avec notes détaillées

### Fin de tâche
- `"Cursor, finalise TASK-404-02"` → Cursor vérifie la Definition of Done
- Si critères validés → Passe à TASK-404-03
- Si critères manquants → Cursor explique ce qui reste à faire

---

## 📋 COMMANDES RAPIDES

```bash
# Démarrer demain
"Cursor, je démarre TASK-404-02"

# Voir état projet 404
"Cursor, évalue le backlog" | grep 404

# Logger session
"Cursor, log ma session pour TASK-404-02 : [fait]"

# Mettre en pause
"Cursor, je mets TASK-404-02 en pause"

# Finaliser
"Cursor, finalise TASK-404-02"
```

---

## 📊 PROGRESSION PROJET 404

**PROJET CLÔTURÉ ✅** (04/11/2025)

**Résumé global** :
- ✅ TASK-404-01 : Audit Structure (2h30)
- ✅ TASK-404-ALL-CITIES : Session 1 - 11 villes (12h, 1,713 liens)
- ✅ TASK-404-BLOG : Session 2 - 5 villes (4h50, 697 liens)
- ✅ TASK-404-BLOG-FINAL : Session 3 - 4 villes (4h, 437 liens)

**Total** : ~24h — 2,847 liens 404 corrigés (99.8% succès)

**Voir DONE.md pour détails complets des 4 tâches archivées.**

---

## 🔥 AUTRES TÂCHES EN COURS (finaliser après 404)

**7 tâches à 70-95% complètes** :
- TASK-006 : Canonicals bugs (P1, 95%, 2h30 restant)
- TASK-011 : Fix 308 Nice (P0, 90%, tests deployment)
- TASK-012 : Villes hardcodées (P1, 85%, tests)
- TASK-013 : Internal linking (P2, 75%)
- TASK-014 : Metadata SEO (P2, 80%)
- TASK-009 : Schema.org (P2, 70%)

**Stratégie** : Finir projet 404 en priorité, puis finaliser ces 7 tâches.

---

*Dernière mise à jour : 2025-11-02*
