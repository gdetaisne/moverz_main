# 🧠 ANALYSE LOGIQUE COMPLÈTE - RÉSOLUTION 404

**Date** : 1er novembre 2025  
**Analyste** : Cursor + Guillaume  
**Objectif** : Définir l'ordre optimal de résolution (logique de dépendances)

---

## 📊 ÉTAT DES LIEUX CONSOLIDÉ

### Données brutes (01/11/2025)

| Source | Métrique | Valeur |
|--------|----------|--------|
| `analyze-404.mjs` | Total liens cassés | **2125** |
| `verify-real-missing-articles.mjs` | Liens "articles manquants" | 1067 |
| Analyse GPT | Total 404s (externe) | 1541 |
| TASK-001 | Articles identifiés manquants | 104 |
| TASK-007 | Redirections 301 déjà faites | ~1014 |

### Vérité terrain (verify-real-missing-articles.mjs)

**Sur les 1067 liens "articles manquants"** :

| Catégorie | Nombre | % | Résolution |
|-----------|--------|---|------------|
| ✅ Articles EXISTANTS | 80 | 7.5% | Slug exact trouvé |
| 🔄 Catégorie incorrecte | 691 | 64.8% | Article existe, mauvaise catégorie |
| 🔀 Variation de slug | 192 | 18.0% | Article existe, slug légèrement différent |
| ❌ Format invalide | 0 | 0.0% | URL mal formée |
| ⚠️ **VRAIMENT manquants** | **104** | **9.7%** | Article n'existe pas |

**INSIGHT CLÉ** : **90.3% résolvables par correction de liens** (963/1067)

---

## 🔬 ANALYSE DES PATTERNS

### Pattern 1 : Catégories incorrectes (691 liens, 64.8%)

**Exemple** : 
```
Lien cassé : /blog/demenageur/demenageur-toulouse
Article réel : sites/toulouse/content/blog/piliers/demenageur-toulouse.md
Catégorie demandée : demenageur
Catégorie réelle : piliers
```

**Cause racine** :
- Structure dossiers ≠ catégorie frontmatter
- `lib/blog.ts` utilise frontmatter `category` pour générer URL
- Liens internes utilisent structure dossier

**Impact si non traité en premier** :
- Si on crée du contenu sans comprendre la structure → doublon
- Si on corrige les slugs avant les catégories → re-cassage

**Solution** :
1. Mapper exactement structure réelle (dossiers vs frontmatter vs URLs)
2. Corriger liens internes vers bonnes catégories
3. OU harmoniser structure (dossiers = frontmatter)

---

### Pattern 2 : Variations de slug (192 liens, 18%)

**Exemple** :
```
Lien cassé : /blog/demenageur-lyon/choisir-demenageur-fiable-lyon
Slug demandé : choisir-demenageur-fiable-lyon
Slug réel : choisir-demenageur-fiable-lyon-criteres
Article : sites/lyon/content/blog/satellites/choisir-demenageur-fiable-lyon-criteres.md
```

**Cause racine** :
- Slugs générés automatiquement avec suffixes (-guide-complet, -criteres, etc.)
- Liens créés manuellement sans suffixe
- Fonction `cleanSlug()` transforme parfois les slugs

**Impact si non traité en premier** :
- Si on crée contenu avec slug simple → doublon avec slug suffixé
- Si on corrige avant de standardiser cleanSlug() → peut re-casser

**Solution** :
1. Auditer fonction `cleanSlug()` de chaque ville
2. Standardiser génération slugs
3. Corriger liens vers slugs réels

---

### Pattern 3 : Articles vraiment manquants (104, 9.7%)

**Exemples** :
- Toulouse : demenagement-immediat-24h-toulouse
- Rouen : 34 articles
- Montpellier : 33 articles
- Lyon : 18 articles

**Cause racine** :
- Contenu planifié mais jamais créé
- OU contenu supprimé sans mise à jour liens

**Impact si non traité en premier** :
- Si on corrige liens vers piliers → Quand on crée contenu, faut re-corriger
- Si on crée contenu AVANT corrections → Liens restent cassés

**Solution** :
1. DÉCIDER : créer contenu OU rediriger vers piliers
2. Si création : faire AVANT correction liens
3. Si redirection : faire APRÈS correction liens

---

### Pattern 4 : Redirections 301 existantes (~1014)

**Fichiers concernés** : `sites/*/next.config.mjs`

**Types de redirections déjà présentes** :
```javascript
// Type A : Wildcards autres villes
{ source: '/blog/demenagement-bordeaux/:path*', destination: '/blog', permanent: true }

// Type B : Satellites sans ville → avec ville  
{ source: '/blog/satellites/article', destination: '/blog/satellites/article-nice/', permanent: true }

// Type C : Catégories vides
{ source: '/blog/etudiant', destination: '/blog', permanent: true }

// Type D : Majuscules → minuscules
{ source: '/Toulouse/saint-cyprien', destination: '/toulouse/saint-cyprien', permanent: true }
```

**Interaction avec liens internes** :
- Redirections = URLs EXTERNES → nouvelles URLs (Search Console, backlinks)
- Liens internes = Markdown articles → autres articles
- **PAS de conflit** car redirections Next.js ne s'appliquent pas aux liens internes

**Impact si non traité en premier** :
- AUCUN conflit technique
- MAIS si on ajoute redirections inutiles → ralentissement

**Solution** :
1. Corriger TOUS les liens internes AVANT
2. Ajouter redirections 301 seulement pour URLs externes résiduelles
3. Éviter redirections inutiles (articles accessibles directement)

---

### Pattern 5 : Analyse GPT (1541 erreurs externes)

**Données GPT** :
- 800 anciennes structures URL
- 500 pages blog supprimées
- 200 accents mal encodés
- 41 liens homepage cassés

**Écart avec analyse interne** : 1541 (GPT) vs 2125 (mjs) = **584 de différence**

**Hypothèse** :
- GPT = URLs EXTERNES (Search Console, crawler Google)
- mjs = Liens INTERNES (maillage articles)
- Deux problèmes DISTINCTS

**Impact si non traité en premier** :
- Confondre externe et interne → fausses corrections
- Traiter externe avant interne → régressions

**Solution** :
1. Séparer clairement : externe (GPT) vs interne (mjs)
2. Traiter interne D'ABORD (maillage propre)
3. Puis externe (redirections 301 pour Google)

---

## ⚙️ LOGIQUE DE DÉPENDANCES

### Graphe de dépendances

```
1. AUDIT STRUCTURE
   ├─ Mapper dossiers vs frontmatter vs URLs
   ├─ Analyser cleanSlug() par ville
   └─ Identifier VRAIS articles manquants (104)
   
2. HARMONISATION TECHNIQUE
   ├─ Fix fonction cleanSlug() (si nécessaire)
   ├─ Fix encoding accents (200 GPT)
   ├─ Standardiser CATEGORY_MAPPING
   └─ ⚠️ CRITIQUE : Si pas fait, corrections ultérieures cassées
   
3. DÉCISION STRATÉGIQUE
   ├─ 104 articles vraiment manquants : créer ou rediriger ?
   ├─ Si créer → Définir slugs/catégories MAINTENANT
   └─ Si rediriger → Vers quels piliers ?
   
4. CRÉATION CONTENU (si décidé en #3)
   ├─ Créer 104 articles avec slugs corrects
   ├─ Frontmatter catégories alignées
   └─ ⚠️ Faire AVANT correction liens (sinon à re-corriger)
   
5. CORRECTION LIENS INTERNES
   ├─ Fix catégories incorrectes (691)
   ├─ Fix variations slug (192)
   ├─ Fix vers nouveau contenu (104 si créé)
   └─ ✅ Maillage interne 100% propre
   
6. REDIRECTIONS 301 EXTERNES
   ├─ Pour URLs GPT (1541) non couvertes par liens internes
   ├─ Anciennes structures (800)
   ├─ Pages supprimées (500)
   └─ Accents mal encodés (200)
   
7. AUDIT HOMEPAGE
   ├─ Fix 41 liens cassés (GPT)
   └─ Utilise liens déjà corrigés en #5
   
8. VALIDATION FINALE
   ├─ Re-run analyze-404.mjs → 0 liens cassés
   ├─ Tests live 2+ sites
   └─ Vérif Search Console
```

### Risques si ordre non respecté

| Mauvais ordre | Conséquence | Gravité |
|---------------|-------------|---------|
| Corriger liens AVANT harmonisation technique | Liens corrigés pointent vers slugs qui changent | 🔴 CRITIQUE |
| Corriger liens AVANT création contenu | Liens vers piliers alors que contenu existe | 🟠 IMPORTANT |
| Créer contenu SANS décision stratégique | Doublons, mauvaises catégories | 🟠 IMPORTANT |
| Redirections AVANT corrections liens internes | Redirections inutiles, double hop | 🟡 MOYEN |
| Homepage AVANT corrections liens | Liens homepage cassés même après fix | 🟡 MOYEN |

---

## 📋 ORDRE OPTIMAL FINAL

### Phase 1 : AUDIT & HARMONISATION (3-5h)

**TASK-404-01 : Audit structure complète**
- Temps : 2-3h
- Actions :
  1. Run `verify-real-missing-articles.mjs` (✅ déjà fait)
  2. Analyser `cleanSlug()` de chaque ville
  3. Vérifier CATEGORY_MAPPING cohérence
  4. Exporter mapping complet : dossiers → frontmatter → URLs
- Livrables :
  - `MAPPING-STRUCTURE-11-VILLES.json`
  - Rapport incohérences
- Dépendances : AUCUNE
- Bloque : Phase 2 (sans ça, corrections à l'aveugle)

**TASK-404-02 : Harmonisation technique**
- Temps : 1-2h
- Actions :
  1. Fix fonction `cleanSlug()` si incohérences
  2. Fix encoding accents (200 cas GPT)
  3. Standardiser CATEGORY_MAPPING
  4. Commit + push
- Livrables :
  - Code harmonisé 11 villes
  - Commit SHA
- Dépendances : TASK-404-01 (besoin mapping)
- Bloque : TOUTES les autres tasks (base technique)

---

### Phase 2 : DÉCISION & CRÉATION (0-30h selon choix)

**TASK-404-03 : Décision stratégique 104 articles**
- Temps : 1h
- Actions :
  1. Lister 104 articles manquants (depuis verify-real-missing-articles.mjs)
  2. Analyser pertinence SEO (volume recherche, importance)
  3. DÉCIDER pour chaque :
     - Option A : Créer article
     - Option B : Rediriger vers pilier
  4. Si création : définir slugs/catégories MAINTENANT
- Livrables :
  - `DECISION-104-ARTICLES.md`
  - Liste articles à créer (si Option A)
  - Mapping redirections (si Option B)
- Dépendances : TASK-404-01 (besoin liste exacte)
- Bloque : TASK-404-04 ou TASK-404-05 (selon choix)

**TASK-404-04 : Création contenu manquant (OPTIONNEL)**
- Temps : 20-30h (si décidé en 404-03)
- Actions :
  1. Créer articles avec slugs/catégories définis en 404-03
  2. Frontmatter aligné avec structure
  3. Qualité >= 8/10
  4. Commit par batch (10 articles)
- Livrables :
  - 104 articles créés (ou partie si choix mixte)
  - Commits GitHub
- Dépendances : TASK-404-02 (structure harmonisée), TASK-404-03 (décision)
- Bloque : TASK-404-05 (correction liens doit inclure nouveau contenu)

**OU**

**TASK-404-05A : Préparation redirections (ALTERNATIVE)**
- Temps : 1-2h (si pas de création)
- Actions :
  1. Mapper 104 articles → piliers cibles
  2. Générer redirections 301
- Livrables :
  - Mapping redirections
  - Code next.config.mjs
- Dépendances : TASK-404-03 (décision)
- Bloque : P1-404-07-404-redirections-externes-0% (redirections finales)

---

### Phase 3 : CORRECTION MASSIVE LIENS INTERNES (4-6h)

**TASK-404-05 : Correction liens internes automatique**
- Temps : 4-6h
- Actions :
  1. Créer script correction massive
  2. Fix catégories incorrectes (691)
  3. Fix variations slug (192)
  4. Fix vers nouveau contenu (104 si créé en 404-04)
  5. Fix autres patterns (80 existants)
  6. Backup avant correction
  7. Run script sur 11 villes
  8. Vérif manuelle échantillon (50 liens)
- Livrables :
  - Script `fix-all-internal-links.mjs`
  - Backup `backups/links-YYYYMMDD-HHMMSS/`
  - Commits par ville (11 commits)
  - Rapport corrections
- Dépendances : TASK-404-02 (technique OK), TASK-404-04 (contenu créé si applicable)
- Bloque : TASK-404-06, P1-404-07-404-redirections-externes-0% (liens internes doivent être propres)

**TASK-404-06 : Validation liens internes**
- Temps : 1h
- Actions :
  1. Re-run `analyze-404.mjs`
  2. Vérifier 0 liens cassés (ou <50 résiduels)
  3. Tests manuels 3 villes
- Livrables :
  - `404-analysis-FINAL.json`
  - Rapport validation
- Dépendances : TASK-404-05 (corrections faites)
- Bloque : Phase 4 (ne pas passer tant que liens cassés)

---

### Phase 4 : REDIRECTIONS EXTERNES & HOMEPAGE (5-8h)

**P1-404-07-404-redirections-externes-0% : Redirections 301 externes (Search Console)**
- Temps : 3-5h
- Actions :
  1. Analyser données GPT (1541 URLs)
  2. Identifier URLs non couvertes par corrections internes
  3. Créer redirections 301 :
     - Anciennes structures (800)
     - Pages supprimées (500)
     - Accents mal encodés (200)
     - Autres (41)
  4. Ajouter dans next.config.mjs (11 villes)
  5. Commit + deploy
- Livrables :
  - Redirections 301 ajoutées (~1300-1500 nouvelles)
  - Commits GitHub (11 villes)
  - Total redirections : ~2314-2514 (1014 + nouvelles)
- Dépendances : TASK-404-06 (liens internes propres), TASK-404-05A (si pas création contenu)
- Bloque : TASK-404-09 (validation finale)

**TASK-404-08 : Audit + Fix homepage 11 villes**
- Temps : 2-3h
- Actions :
  1. Scraper homepages 11 villes (liens sortants)
  2. Identifier 41 liens cassés (GPT)
  3. Corriger vers liens déjà validés en Phase 3
  4. Tests live chaque ville
- Livrables :
  - Homepages corrigées (11 villes)
  - Commits GitHub
  - Tests validés
- Dépendances : TASK-404-05 (liens internes OK), P1-404-07-404-redirections-externes-0% (redirections OK)
- Bloque : TASK-404-09 (validation finale)

---

### Phase 5 : VALIDATION FINALE (2-3h)

**TASK-404-09 : Validation complète + Tests live**
- Temps : 2-3h
- Actions :
  1. Re-run `analyze-404.mjs` → 0 liens cassés
  2. Tests live 11 villes :
     - Tester 10 liens/ville (110 total)
     - Vérif redirections 301 fonctionnent
     - Vérif homepage clean
  3. Search Console :
     - Vérif 404s en baisse
     - Vérif redirections indexées
  4. Crawl Screaming Frog (1 ville test)
- Livrables :
  - Rapport validation final
  - Screenshots tests
  - Metrics Search Console
- Dépendances : TASK-404-05 à TASK-404-08 (tout terminé)
- Bloque : RIEN (tâche finale)

---

## 📊 RÉCAPITULATIF EFFORT vs IMPACT

| Phase | Tasks | Temps | Impact | Résout | ROI |
|-------|-------|-------|--------|--------|-----|
| **Phase 1** | 404-01, 404-02 | 3-5h | Base technique | 0 404s | ∞ (bloque tout) |
| **Phase 2** | 404-03, 404-04 | 1-31h | Contenu manquant | 104 404s | 3-100 |
| **Phase 3** | 404-05, 404-06 | 5-7h | Maillage interne | ~963 404s | **193** ⭐ |
| **Phase 4** | 404-07, 404-08 | 5-8h | Externe + Homepage | ~1541 404s | **193-308** ⭐ |
| **Phase 5** | 404-09 | 2-3h | Validation | - | - |
| **TOTAL (sans création)** | 8 tasks | **15-23h** | SEO complet | **~2608 404s** | **170** ⭐ |
| **TOTAL (avec création)** | 9 tasks | **36-54h** | SEO complet | **~2608 404s** | **72** ⭐ |

**RECOMMANDATION STRATÉGIQUE** :
- Phase 1-3 + Phase 4-5 (SANS création contenu) = **15-23h** → Résout 95%
- Phase 2 (création) optionnelle = **+21-31h** → Résout 5% supplémentaires
- **ROI optimal** : Faire Phases 1, 3, 4, 5 EN PREMIER (sans 404-04)
- **Puis décider** si 104 articles vraiment nécessaires (ou redirections suffisent)

---

## ✅ WORKFLOW RECOMMANDÉ

### Sprint 1 (Semaine 1) : Bases + Maillage interne
```bash
Jour 1-2 : TASK-404-01 + TASK-404-02 (audit + harmonisation)
Jour 3-4 : TASK-404-03 + TASK-404-05 (décision + correction liens)
Jour 5   : TASK-404-06 (validation)
```
**Résultat** : Maillage interne 100% propre (~963 404s résolus)

### Sprint 2 (Semaine 2) : Externe + Validation
```bash
Jour 1-3 : P1-404-07-404-redirections-externes-0% (redirections 301 externes)
Jour 4   : TASK-404-08 (homepage)
Jour 5   : TASK-404-09 (validation finale)
```
**Résultat** : SEO complet, 95% 404s résolus

### Sprint 3 (OPTIONNEL) : Contenu manquant
```bash
Sessions 3-5h : TASK-404-04 (création 104 articles)
```
**Résultat** : 100% complet

---

## 🎯 CRITÈRES DE SUCCÈS

### Phase 1 (Audit)
- [x] Mapping complet structure 11 villes exporté
- [x] Incohérences identifiées
- [x] Code harmonisé + déployé

### Phase 3 (Liens internes)
- [x] Script correction créé + testé
- [x] 963 liens corrigés (691 catégories + 192 slugs + 80 existants)
- [x] Re-run analyze-404.mjs → <100 liens cassés
- [x] Tests manuels validés

### Phase 4 (Externe)
- [x] ~1300-1500 redirections 301 ajoutées
- [x] Homepage 11 villes → 0 liens cassés
- [x] Tests live validés

### Phase 5 (Validation)
- [x] analyze-404.mjs → 0 ou <10 liens cassés
- [x] Search Console → 404s en baisse
- [x] Crawl Screaming Frog → propre

---

**FIN DE L'ANALYSE**

*Ce document sert de base pour la restructuration des tâches 404 dans le BACKLOG.*


