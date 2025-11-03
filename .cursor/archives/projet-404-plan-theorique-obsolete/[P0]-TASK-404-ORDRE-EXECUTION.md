# 📋 ORDRE EXÉCUTION PROJET 404 - FINAL

**Date** : 03 novembre 2025  
**Version** : 2.0 (après scan réel + rollback TASK-404-02)

---

## ⚠️ ORDRE STRICT À RESPECTER

### ✅ PHASE 0 : AUDIT (FAIT)
```
✅ TASK-404-01 : Audit structure (2h30) - TERMINÉ 01/11
```

---

### 🔥 PHASE 1 : VALIDATION WORKFLOW (2h)

```
TASK-404-QW : Quick Wins
├─ Fix majuscules (1h)
├─ Fix accents Toulouse (30min)
└─ Fix devis cross-ville (30min)
   ↓
Deploy CapRover 11 villes
   ↓
Régénérer scan
   ↓
Comparer : 513 → 290-340 (attendu -35-45%)
   ↓
SI OK → Phase 2
SI KO → Debug et re-test
```

**Objectif** : Valider que workflow fonctionne avant corrections massives

---

### 📋 PHASE 2 : DÉCISION (1h)

```
TASK-404-03 : Décision 104 articles
├─ 53 spam Toulouse → Rediriger (helicoptere, teleski...)
├─ 20-30 prioritaires → Créer (Rouen/Montpellier SEO)
└─ 21 autres → Rediriger
   ↓
Créer mapping redirections
Créer specs articles si création
```

**⚠️ CRITIQUE** : DOIT être fait AVANT 404-05

**Raison** : Si correction liens AVANT décision → Re-correction nécessaire

---

### 📝 PHASE 3 : CONTENU (0-9h OPTIONNEL)

```
SI décision = créer 20-30 articles
  ↓
TASK-404-04 : Création contenu
├─ Production articles (qualité 8/10)
├─ Frontmatter aligné
└─ Slugs/catégories définis en 404-03
   ↓
```

**⚠️ DOIT être fait AVANT 404-05** si création

**Raison** : Liens doivent pointer vers nouveau contenu

---

### 🤖 PHASE 4 : CORRECTION MASSIVE (4-6h)

```
TASK-404-05 : Auto-correction
├─ Créer script (VERIFICATION-ARTICLES.json)
├─ Backup OBLIGATOIRE
├─ Dry-run Rennes (test)
├─ Fix catégories (~400-500)
├─ Fix variations slug (~100-150)
├─ Fix vers nouveau contenu (si 404-04)
└─ Validation échantillon
```

**⚠️ NE PAS faire AVANT 404-03** (et 404-04 si applicable)

---

### ✅ PHASE 5 : VALIDATION INTERNE (1h)

```
TASK-404-06 : Validation
├─ Re-run analyze-404.mjs
├─ Comparer avant/après
├─ Analyser résiduels
└─ Tests manuels 3 villes
   ↓
Résultat : <50 erreurs (attendu)
   ↓
SI OK → Phase 6
SI KO → Rollback + Debug
```

**GO/NO-GO** pour Phase 6

---

### 🌐 PHASE 6 : EXTERNE + FINAL (6-9h)

```
TASK-404-07 : Redirections 301 (3-5h)
├─ URLs externes Search Console
├─ ~300-500 redirections
└─ next.config.mjs 11 villes
   ↓
TASK-404-08 : Homepage (1h)
├─ Vérif post Quick Wins
└─ Liens résiduels
   ↓
TASK-404-09 : Validation finale (2-3h)
├─ Tests live 11 villes
├─ Screaming Frog
├─ Search Console
└─ Rapport final
```

---

## 🚫 SKIP

### ❌ TASK-404-02 : Harmonisation Technique

**Raison SKIP** :
- Bug cosmétique (pas d'effet fonctionnel)
- Correction changerait 167 URLs (risque SEO)
- Rollback effectué 03/11
- Coût > Bénéfice

**Leçon** : Valider impact URLs AVANT toute modification

---

## 🔴 POINTS CRITIQUES (NE PAS SE TROMPER)

### ❌ ERREURS À ÉVITER

```
❌ 404-05 AVANT 404-03
   → Correction vers piliers, puis contenu créé → Re-correction

❌ 404-05 AVANT 404-04 (si création)
   → Liens vers piliers au lieu de nouveau contenu

❌ 404-07 AVANT 404-06
   → Redirections sans validation liens internes

❌ Modifier cleanSlug() sans test URLs
   → Risque 167 URLs changées (leçon 404-02)
```

### ✅ ORDRE CORRECT

```
✅ Quick Wins → Deploy → Scan → Compare (validation)
✅ 404-03 (décision) AVANT 404-05
✅ 404-04 (contenu) AVANT 404-05 SI création
✅ 404-06 (validation) AVANT 404-07
```

---

## 📊 TIMELINE ESTIMÉE

```
Session 1 (2h)   : TASK-404-QW (Quick Wins)
↓ Deploy + Scan
Session 2 (1h)   : TASK-404-03 (Décision)
Session 3 (0-9h) : TASK-404-04 (Contenu - optionnel)
Session 4 (4-6h) : TASK-404-05 (Correction massive)
Session 5 (1h)   : TASK-404-06 (Validation)
Session 6 (6-9h) : TASK-404-07/08/09 (Final)

TOTAL : 14h30-28h30
```

---

## 🎯 PROCHAINE ACTION

```bash
"Cursor, je démarre TASK-404-QW"
```

**Cursor va** :
1. Lire `.cursor/tasks/[P0]-TASK-404-QW-quick-wins/README.md`
2. Identifier fichiers à modifier
3. Faire corrections
4. Guider deploy + validation

---

*Ordre validé le : 03/11/2025*  
*Basé sur : Scan réel + Rollback 404-02 + Analyse exhaustive*

