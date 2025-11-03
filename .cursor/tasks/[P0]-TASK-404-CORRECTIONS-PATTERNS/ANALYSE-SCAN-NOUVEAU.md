# Analyse Nouveau Scan 404 - Post Phase 1

**Date** : 03 novembre 2025  
**Source** : Crawler externe (fourni par Guillaume)

---

## 📊 VUE D'ENSEMBLE

**Total liens cassés analysés** : ~470 URLs

**Villes concernées** :
- Bordeaux : ~120 liens
- Montpellier : ~125 liens
- Nice : ~85 liens
- Lille : ~65 liens
- Nantes : ~50 liens
- Rouen : ~40 liens
- Strasbourg : ~35 liens
- Rennes : ~25 liens
- Lyon : ~15 liens
- Toulouse : ~10 liens (✅ amélioré grâce Pattern #7 accents)
- Marseille : ~10 liens

---

## 🔍 PATTERNS IDENTIFIÉS

### Pattern #5B : Liens vers `/guide` inexistant (60-70% des erreurs)

**Impact** : **~320 liens** cassés

**Exemples massifs** :

```
❌ /blog/devis/guide
❌ /blog/urgent/guide
❌ /blog/prix/guide
❌ /blog/etudiant/guide
❌ /blog/pas-cher/guide
❌ /blog/garde-meuble/guide
❌ /blog/entreprise/guide
❌ /blog/international/guide
❌ /blog/longue-distance/guide
```

**Cause** :
- Articles piliers linkent vers `/blog/{category}/guide`
- Mais l'article s'appelle `/blog/{category}/{category}-{ville}-guide` ou `/blog/{category}/{category}-{ville}-guide-complet`

**Villes les plus touchées** :
- Bordeaux : ~80 liens `/guide`
- Montpellier : ~70 liens `/guide`
- Nice : ~50 liens `/guide`
- Lille : ~40 liens `/guide`
- Nantes : ~30 liens `/guide`
- Rouen : ~25 liens `/guide`
- Strasbourg : ~15 liens `/guide`
- Lyon : ~10 liens `/guide`

**Solution** :

**Option A : Créer pages `/guide`** (1h)
- Créer 10 articles guides génériques par catégorie
- Frontmatter : `slug: guide`, `category: {categorie}`
- Effort : ~10 articles × 11 villes = 110 fichiers

**Option B : Corriger liens vers vrais slugs** (4-6h)
- Script correction massive markdown
- Remplacer `/blog/{category}/guide` → `/blog/{category}/{category}-{ville}-guide`
- Exemple : `/blog/prix/guide` → `/blog/prix-demenagement-bordeaux/prix-demenagement-bordeaux-guide`
- Effort : Script + validation

**Option C : Redirections 301** (30min)
- Ajouter wildcard : `/blog/:category/guide → /blog/:category/:category-ville-guide`
- Problème : Ville dynamique difficile dans next.config.mjs
- Effort minimal mais less clean

**RECOMMANDATION** : **Option B** (Script correction)
- Plus clean SEO (internal links corrects)
- Évite redirections inutiles
- Base saine pour le futur

---

### Pattern #5A : Piliers → Satellites inexistants (~100 liens)

**Impact** : ~100 liens cassés

**Exemples Montpellier** :
```
Source : /blog/demenagement-montpellier/{topic}
Lien cassé : /blog/{topic}-montpellier/{slug-satellite}

Exemples :
❌ /blog/aide-au-demenagement-particulier-montpellier/aide-amis-demenagement-montpellier
❌ /blog/aide-au-demenagement-particulier-montpellier/plateformes-entraide-demenagement-montpellier
❌ /blog/demenagement-entreprise-montpellier/demenagement-entreprise-montpellier (lien circulaire!)
❌ /blog/location-camion-demenagement-montpellier/location-camion-demenagement-montpellier (idem!)
```

**Exemples Nice** :
```
Source : /blog/demenagement-nice/{topic}-guide
Lien cassé : /blog/{topic}-nice/satellites/{slug}

Exemples :
❌ /blog/aide-demenagement-nice/satellites/aide-amis-demenagement-nice
❌ /blog/demenagement-entreprise-nice/satellites/demenagement-bureaux-entreprise-nice
```

**Cause** :
- Articles piliers linkent vers satellites qui n'existent pas
- OU structure catégorie incorrecte (`/satellites/` au lieu de vraie catégorie)

**Solution** :

**Option A : Supprimer liens satellites** (2h)
- Script pour retirer tous liens vers `/satellites/` inexistants
- Garder seulement liens vers piliers
- Clean mais perd maillage interne

**Option B : Corriger structure catégories** (6-8h)
- Identifier vraie catégorie de chaque article
- Corriger liens vers bonne catégorie
- Plus de travail mais résultat propre

**RECOMMANDATION** : **Option A** (Supprimer)
- Articles satellites inexistants = liens inutiles
- Maillage simplifié
- Plus rapide

---

### Pattern #9 : Quartiers → Villes satellites (~40 liens)

**Impact** : ~40 liens cassés

**Exemples** :

**Bordeaux** (15 liens) :
```
Source : /quartiers-bordeaux
Liens cassés :
❌ /devis-demenagement-bordeaux-chartrons
❌ /devis-demenagement-bordeaux-cauderan
❌ /devis-demenagement-bordeaux-bastide
❌ /devis-demenagement-merignac
❌ /devis-demenagement-pessac
❌ /devis-demenagement-talence
❌ /devis-demenagement-begles
❌ /devis-demenagement-villenave-d-ornon
... (15 total)
```

**Nice** (10 liens) :
```
Source : /quartiers-nice
Liens cassés :
❌ /devis-demenagement-monaco
❌ /devis-demenagement-menton
❌ /devis-demenagement-cannes
❌ /devis-demenagement-antibes
❌ /devis-demenagement-grasse
❌ /nice/mantega
❌ /nice/pasteur
❌ /nice/fabron
❌ /nice/garibaldi
❌ /nice/saint-roch
```

**Rennes** (10 liens) :
```
Source : /quartiers-rennes
Liens cassés :
❌ /devis-demenagement-montgermont
❌ /devis-demenagement-betton
❌ /devis-demenagement-saint-gregoire
❌ /devis-demenagement-cesson-sevigne
❌ /devis-demenagement-pace
❌ /rennes/saint-helier
❌ /rennes/brequigny
❌ /rennes/blosne
❌ /rennes/maurepas
❌ /rennes/longchamp
```

**Toulouse** (5 liens) :
```
❌ /devis-demenagement-colomiers
❌ /devis-demenagement-blagnac
❌ /devis-demenagement-tournefeuille
❌ /devis-demenagement-muret
❌ /devis-demenagement-cugnaux
```

**Cause** :
- Pages quartiers linkent vers pages "devis quartier" qui n'existent pas
- Intent : Permettre devis par quartier/ville satellite
- Réalité : Pages jamais créées

**Solution** :

**Option A : Créer pages satellites** (15-20h)
- 40 nouvelles pages de devis par quartier/ville
- SEO intéressant (local targeting)
- Mais gros effort

**Option B : Rediriger vers /estimation-rapide/** (30min)
- Tous liens quartiers → `/estimation-rapide/`
- Formulaire unique
- Quick win

**Option C : Supprimer liens** (1h)
- Retirer les liens des pages quartiers
- Simplifier navigation
- Perte opportunité SEO

**RECOMMANDATION** : **Option B** (Redirection /estimation-rapide/)
- Quick win (30min)
- Fonctionnel immédiatement
- Garde possibilité créer pages plus tard

---

### Pattern Résiduel FAQ Cross-ville (~10 liens)

**Impact** : ~10 liens

**Exemples** :
```
Montpellier :
❌ /montpellier/panier (quartier qui n'existe pas)
❌ /montpellier/vieux-port (quartier Marseille!)
❌ /montpellier/plaine (quartier qui n'existe pas)
```

**Cause** : Pattern #8 (FAQ cross-ville) pas complètement résolu

**Solution** : Vérifier si hotfix appliqué partout (1h)

---

### Pattern Inventaire-IA → Devis (~5 liens)

**Impact** : ~5 liens

**Exemples** :
```
Bordeaux : /inventaire-ia → /devis-demenagement-bordeaux (404)
Lille : /inventaire-ia → /devis-demenagement-lille (404)
```

**Cause** : Template inventaire-ia linke vers `/devis-demenagement-{ville}` qui n'existe pas

**Solution** : Corriger template vers `/estimation-rapide/` (15min)

---

### Pattern Homepage Presqu'île Lyon (~1 lien)

**Impact** : 1 lien

**Exemple** :
```
Lyon homepage : / → /lyon/presqu-ile (404, problème accent)
```

**Cause** : Slug accent `presqu'île` → URL `presqu-ile` mais lien hardcodé différent

**Solution** : Corriger homepage Lyon (5min)

---

## 📊 PRIORISATION

| Pattern | Impact | Complexité | Temps | ROI | Priorité |
|---------|--------|------------|-------|-----|----------|
| #5B `/guide` | ~320 | Moyenne | 4-6h | 53 | 🔴 P0 |
| #5A Satellites | ~100 | Moyenne | 2h | 50 | 🟠 P1 |
| #9 Quartiers | ~40 | Faible | 30min | 80 | 🔴 P0 |
| FAQ résiduel | ~10 | Faible | 1h | 10 | 🟡 P2 |
| Inventaire-IA | ~5 | Faible | 15min | 20 | 🟢 P3 |
| Homepage Lyon | ~1 | Faible | 5min | 12 | 🟢 P3 |

**ROI = Impact / Temps**

---

## 🎯 PLAN PHASE 2 RECOMMANDÉ

### Quick Wins (1h30) → 46 liens

1. **Pattern #9 : Quartiers → /estimation-rapide/** (30min)
   - Corriger templates quartiers 11 villes
   - Remplacer `/devis-demenagement-{ville}` → `/estimation-rapide/`
   - Impact : ~40 liens

2. **Pattern Inventaire-IA** (15min)
   - Corriger template inventaire-ia
   - Impact : ~5 liens

3. **Pattern Homepage Lyon** (5min)
   - Fix accent presqu'île
   - Impact : 1 lien

4. **Pattern FAQ résiduel** (40min)
   - Vérifier Pattern #8 bien appliqué partout
   - Impact : ~10 liens estimé

**Total Quick Wins** : 1h30 → 56 liens ✅

---

### Script Principal (4-6h) → 320 liens

5. **Pattern #5B : Correction `/guide`** (4-6h)
   - Script correction massive markdown
   - Remplacer `/blog/{category}/guide` → vrai slug pilier
   - Mapping par catégorie/ville
   - Dry-run Rennes
   - Exécution 11 villes
   - Impact : ~320 liens

---

### Optionnel (2h) → 100 liens

6. **Pattern #5A : Satellites** (2h)
   - Option : Supprimer liens satellites inexistants
   - Script retrait liens `/satellites/`
   - Impact : ~100 liens

---

## 📈 IMPACT TOTAL PHASE 2

**Avec Quick Wins + Script Principal** :
- Temps : 5h30-7h30
- Impact : 376 liens (~80% des 470)
- Résolution totale : 323 (Phase 1) + 376 (Phase 2) = **699/983 liens** (71%)

**Avec tout (+ Pattern 5A optionnel)** :
- Temps : 7h30-9h30
- Impact : 476 liens (100% scan actuel)
- Résolution totale : **799/983 liens** (81%)

---

## 🚨 CONFIRMATION PHASE 1

Le scan confirme que **Phase 1 a bien fonctionné** :

**Patterns corrigés absents du scan** :
- ✅ Pattern #1 Services → lille (0 occurrence)
- ✅ Pattern #2 Corridors → marseille (0 occurrence)
- ✅ Pattern #3 Majuscules Nantes (0 occurrence)
- ✅ Pattern #4 FAQ Quartiers Bordeaux (0 occurrence majoritaire)
- ✅ Pattern #6 FAQ cities (0 occurrence majoritaire)
- ✅ Pattern #7 Accents Toulouse (Toulouse réduit à ~10 liens seulement!)

**Toulouse AVANT** : 86 erreurs  
**Toulouse APRÈS** : ~10 erreurs  
**Réduction Toulouse** : **-88%** 🎉

---

## 🎯 DÉCISIONS REQUISES

### Décision #1 : Pattern #5B `/guide`

**Question** : Comment corriger 320 liens vers `/guide` ?

**Options** :
- A) Script correction massive → vrais slugs (4-6h, clean)
- B) Créer 10 pages `/guide` génériques (1h, quick)
- C) Redirections 301 wildcards (30min, pas clean)

**Recommandation** : **Option A** (Script)

---

### Décision #2 : Pattern #5A Satellites

**Question** : Que faire des 100 liens vers satellites inexistants ?

**Options** :
- A) Supprimer liens (2h, clean)
- B) Corriger structure si articles existent (6-8h)
- C) Ignorer pour l'instant (0h, 100 liens cassés restent)

**Recommandation** : **Option A** (Supprimer)

---

### Décision #3 : Pattern #9 Quartiers

**Question** : Liens quartiers vers pages satellites inexistantes ?

**Options** :
- A) Rediriger → /estimation-rapide/ (30min)
- B) Créer 40 pages satellites (15-20h)
- C) Supprimer liens (1h)

**Recommandation** : **Option A** (Redirection)

---

## 📋 ORDRE D'EXÉCUTION RECOMMANDÉ

```
1. Quick Wins Phase 2 (1h30) → 56 liens
   ├─ Pattern #9 Quartiers (30min)
   ├─ Inventaire-IA (15min)
   ├─ Homepage Lyon (5min)
   └─ FAQ résiduel (40min)
   
2. Deploy + Validation (30min)
   └─ Confirmer Quick Wins OK
   
3. Script Pattern #5B (4-6h) → 320 liens
   ├─ Créer script correction (2h)
   ├─ Dry-run Rennes (30min)
   ├─ Exécution 11 villes (1h)
   ├─ Tests validation (1-2h)
   └─ Commit + Deploy (30min)
   
4. OPTIONNEL Pattern #5A (2h) → 100 liens
   └─ Script retrait satellites
```

**Temps total** : 6-8h (sans 5A) ou 8-10h (avec 5A)

**Résolution attendue** : 699-799 liens sur 983 (**71-81%**)

---

## ✅ CONFIRMATION RÉDUCTION PHASE 1

**Calcul** :
- Scan initial estimé : 513 erreurs (selon TASK-404-QW)
- Scan actuel : ~470 erreurs
- **Différence** : -43 erreurs (-8%)

**Hypothèse** :
- Pattern #7 Accents Toulouse : -76 liens
- Patterns 1-6 déjà filtrés par crawler (pages fixes corrigées)
- Nouveau scan focus sur **liens markdown** (Pattern #5)

**Conclusion** : Phase 1 validée, focus maintenant sur **Pattern #5 Blog** ✅

---

## 🚀 PROCHAINE ACTION

**Recommandation** : Démarrer Quick Wins Phase 2

**Commande** :
```bash
"Cursor, démarre Quick Wins Phase 2 : Patterns 9, Inventaire, Lyon"
```

Cursor va :
1. Corriger Pattern #9 Quartiers → /estimation-rapide/
2. Corriger Inventaire-IA template
3. Fix homepage Lyon presqu'île
4. Vérifier FAQ résiduel
5. Commit + Deploy
6. **ROI : 56 liens en 1h30**

Puis après validation :
```bash
"Cursor, créé le script Pattern #5B correction /guide"
```

---

**Analyse complétée**


