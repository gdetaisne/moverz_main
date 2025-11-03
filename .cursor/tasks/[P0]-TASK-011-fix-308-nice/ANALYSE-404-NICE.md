# 📊 ANALYSE 404 Nice - TASK-011

**Date** : 03/11/2025  
**Total liens cassés** : 127 liens  
**Source** : Données export utilisateur

---

## 🎯 PATTERNS IDENTIFIÉS

### Pattern #1 : Ancien dossier `/demenagement/` (5 liens)

**Erreur** : Liens pointent vers dossier `/demenagement/` supprimé

**Exemples** :
- `/demenagement/demenagement-avec-animaux-nice` → 404
- `/demenagement/cout-reel-demenagement-nice` → 404
- `/demenagement/demenagement-international-nice-monaco` → 404
- `/demenagement/demenagement-retraites-seniors-nice` → 404
- `/demenagement/calculer-prix-demenagement-nice` → 404

**Solution** : Redirections dans `next.config.mjs`
```javascript
{ source: '/demenagement/demenagement-avec-animaux-nice', 
  destination: '/blog/satellites/demenagement-avec-animaux-nice/', 
  permanent: true },
```

**Déjà corrigé ?** : ⚠️ Vérifier `sites/nice/next.config.mjs`  
Il y a déjà des redirections similaires (lignes 176-180)

---

### Pattern #2 : Structure Piliers → Satellites (71 liens)

**Erreur** : Articles piliers (/blog/demenagement-nice/xxx-guide) linkent vers `/satellites/` qui n'existe pas au bon endroit

**Exemples récurrents** :

#### 2A. Pilier Aide → Satellites (4 liens)
Source : `/blog/demenagement-nice/aide-demenagement-nice-guide`
```
❌ /blog/aide-demenagement-nice/satellites/demenagement-personnes-agees-nice
❌ /blog/aide-demenagement-nice/satellites/aide-financiere-demenagement-nice
❌ /blog/aide-demenagement-nice/satellites/aide-pole-emploi-demenagement-nice
❌ /blog/aide-demenagement-nice/satellites/aide-manutention-demenagement-nice
```

**Correction** : → `/blog/satellites/xxx-nice/`

---

#### 2B. Pilier Entreprise → Satellites (6 liens)
Source : `/blog/demenagement-nice/demenagement-entreprise-nice-guide`
```
❌ /blog/demenagement-entreprise-nice/satellites/demenagement-sophia-antipolis-nice
❌ /blog/demenagement-entreprise-nice/satellites/demenagement-archives-entreprise-nice
❌ /blog/demenagement-entreprise-nice/satellites/demenagement-cabinet-medical-nice
❌ /blog/demenagement-entreprise-nice/satellites/demenagement-locaux-commerciaux-nice
❌ /blog/demenagement-entreprise-nice/satellites/demenagement-sans-interruption-activite-nice
❌ /blog/demenagement-entreprise-nice/satellites/demenagement-bureaux-entreprise-nice
❌ /blog/demenagement-entreprise-nice/satellites/demenagement-entreprise-weekend-nice
```

**Correction** : → `/blog/satellites/xxx-nice/`

---

#### 2C. Pilier International → Satellites (4 liens)
Source : `/blog/demenagement-nice/demenagement-international-nice-guide`
```
❌ /blog/demenagement-international-nice/satellites/demenagement-international-nice-suisse
❌ /blog/demenagement-international-nice/satellites/demenagement-international-nice-italie
❌ /blog/demenagement-international-nice/satellites/demenagement-formalites-douane-nice
❌ /blog/demenagement-international-nice/satellites/delai-demenagement-international-nice
```

**Correction** : → `/blog/satellites/xxx-nice/`

---

#### 2D. Pilier Pas Cher → Satellites (12 liens)
Source : `/blog/demenagement-nice/demenagement-pas-cher-nice-guide`
```
❌ /blog/demenagement-pas-cher-nice/satellites/demenagement-formule-economique-nice
❌ /blog/demenagement-pas-cher-nice/satellites/astuces-demenagement-pas-cher-nice
❌ /blog/demenagement-pas-cher-nice/satellites/demenager-seul-nice-guide
❌ /blog/demenagement-pas-cher-nice/satellites/cartons-gratuits-nice-ou-trouver
❌ /blog/demenagement-pas-cher-nice/satellites/periode-pas-chere-demenagement-nice
❌ /blog/demenagement-pas-cher-nice/satellites/demenagement-etudiant-pas-cher-nice
❌ /blog/demenagement-pas-cher-nice/satellites/demenagement-groupe-nice
❌ /blog/demenagement-pas-cher-nice/satellites/comparateur-devis-demenagement-nice
❌ /blog/demenagement-pas-cher-nice/satellites/demenagement-weekend-vs-semaine-nice
❌ /blog/demenagement-pas-cher-nice/satellites/demenagement-petit-budget-nice
```

**Correction** : → `/blog/satellites/xxx-nice/`

---

#### 2E. Pilier Piano → Satellites (5 liens)
Source : `/blog/demenagement-nice/demenagement-piano-nice-guide`
```
❌ /blog/demenagement-piano-nice/satellites/demenagement-piano-droit-nice
❌ /blog/demenagement-piano-nice/satellites/demenagement-piano-queue-nice
❌ /blog/demenagement-piano-nice/satellites/assurer-piano-transport-nice
❌ /blog/demenagement-piano-nice/satellites/demenagement-piano-monte-meuble-nice
❌ /blog/demenagement-piano-nice/satellites/demenagement-piano-nice-prix
```

**Correction** : → `/blog/satellites/xxx-nice/`

---

#### 2F. Pilier Déménageur → Satellites (10 liens)
Source : `/blog/demenagement-nice/demenageur-nice-guide`
```
❌ /blog/demenageur-nice/satellites/avis-demenageurs-nice-guide
❌ /blog/demenageur-nice/satellites/formule-economique-vs-cle-en-main-nice
❌ /blog/demenageur-nice/satellites/demenageur-vieux-nice-acces-difficile
❌ /blog/demenageur-nice/satellites/choisir-demenageur-nice-criteres
❌ /blog/demenageur-nice/satellites/demenageur-monte-meuble-nice
❌ /blog/demenageur-nice/satellites/assurance-demenageur-nice
❌ /blog/demenageur-nice/satellites/comparatif-demenageurs-nice
❌ /blog/demenageur-nice/satellites/autorisation-stationnement-demenagement-nice
❌ /blog/demenageur-nice/satellites/demenageur-dimanche-soir-nice
❌ /blog/demenageur-nice/satellites/prix-demenageur-nice-2025
```

**Correction** : → `/blog/satellites/xxx-nice/`

---

#### 2G. Pilier Garde-Meuble → Satellites (10 liens)
Source : `/blog/demenagement-nice/garde-meuble-nice-guide`
```
❌ /blog/garde-meuble-nice/satellites/garde-meuble-etudiant-nice-pas-cher
❌ /blog/garde-meuble-nice/satellites/self-stockage-vs-garde-meuble-traditionnel-nice
❌ /blog/garde-meuble-nice/satellites/quelle-taille-box-stockage-nice
❌ /blog/garde-meuble-nice/satellites/prix-garde-meuble-nice-2025
❌ /blog/garde-meuble-nice/satellites/duree-minimum-location-box-nice
❌ /blog/garde-meuble-nice/satellites/garde-meuble-vieux-nice-centre
❌ /blog/garde-meuble-nice/satellites/acces-24-7-garde-meuble-nice
❌ /blog/garde-meuble-nice/satellites/garde-meuble-securise-nice
❌ /blog/garde-meuble-nice/satellites/preparer-affaires-garde-meuble-nice
❌ /blog/garde-meuble-nice/satellites/garde-meuble-pendant-demenagement-nice
```

**Correction** : → `/blog/satellites/xxx-nice/`

---

#### 2H. Pilier Location Camion → Satellites (8 liens)
Source : `/blog/demenagement-nice/location-camion-demenagement-nice-guide`
```
❌ /blog/location-camion-nice/satellites/location-camion-weekend-nice
❌ /blog/location-camion-nice/satellites/conduire-camion-vieux-nice-conseils
❌ /blog/location-camion-nice/satellites/km-inclus-location-camion-nice
❌ /blog/location-camion-nice/satellites/permis-conduire-camion-demenagement
❌ /blog/location-camion-nice/satellites/caution-location-camion-nice
❌ /blog/location-camion-nice/satellites/assurance-location-utilitaire-nice
❌ /blog/location-camion-nice/satellites/taille-camion-selon-logement-nice
❌ /blog/location-camion-nice/satellites/location-utilitaire-demenagement-nice
```

**Correction** : → `/blog/satellites/xxx-nice/`

---

#### 2I. Pilier Petit Déménagement → Satellites (6 liens)
Source : `/blog/demenagement-nice/petit-demenagement-nice-guide`
```
❌ /blog/petit-demenagement-nice/satellites/petit-demenagement-nice-solutions
❌ /blog/petit-demenagement-nice/satellites/demenagement-une-piece-nice
❌ /blog/petit-demenagement-nice/satellites/demenagement-express-rapide-nice
❌ /blog/petit-demenagement-nice/satellites/demenagement-studio-nice-prix
❌ /blog/petit-demenagement-nice/satellites/demenagement-chambre-etudiant-nice
❌ /blog/petit-demenagement-nice/satellites/demenagement-colocation-nice
```

**Correction** : → `/blog/satellites/xxx-nice/`

---

#### 2J. Pilier Prix → Satellites (7 liens)
Source : `/blog/demenagement-nice/prix-demenagement-nice-guide`
```
❌ /blog/prix-demenagement-nice/satellites/calculer-prix-demenagement-nice
❌ /blog/prix-demenagement-nice/satellites/devis-demenagement-nice-gratuit
❌ /blog/prix-demenagement-nice/satellites/demenagement-longue-distance-depuis-nice
❌ /blog/prix-demenagement-nice/satellites/prix-demenagement-t2-nice
❌ /blog/prix-demenagement-nice/satellites/prix-demenagement-t3-nice
❌ /blog/prix-demenagement-nice/satellites/demenagement-maison-nice-prix
❌ /blog/prix-demenagement-nice/satellites/facteurs-prix-demenagement-nice
```

**Correction** : → `/blog/satellites/xxx-nice/`

---

### Pattern #3 : Guides avec catégories courtes (24 liens)

**Erreur** : Liens vers guides situés dans catégories courtes (sans -nice)

**Exemples récurrents** :
```
❌ /blog/pas-cher/demenagement-pas-cher-nice-guide (8 occurrences)
❌ /blog/demenageur/demenageur-nice-guide-complet (5 occurrences)
❌ /blog/piano/demenagement-piano-nice-guide (3 occurrences)
❌ /blog/location-camion/location-camion-demenagement-nice-guide (2 occurrences)
❌ /blog/prix-demenagement-nice/prix-demenagement-nice-guide (2 occurrences)
❌ /blog/aide-demenagement/aide-demenagement-nice-guide (2 occurrences)
❌ /blog/demenagement-etudiant-nice/demenagement-etudiant-nice-guide (2 occurrences)
❌ /blog/location-camion-demenagement-nice/cartons-gratuits-nice-ou-trouver (2 occurrences)
```

**Correction** : → `/blog/demenagement-nice/xxx-guide`

**Exemple** :
- `/blog/pas-cher/demenagement-pas-cher-nice-guide` → `/blog/demenagement-nice/demenagement-pas-cher-nice-guide`
- `/blog/demenageur/demenageur-nice-guide-complet` → `/blog/demenagement-nice/demenageur-nice-guide`

---

### Pattern #4 : Catégories vides sans trailing slash (7 liens)

**Erreur** : Liens vers catégories vides `/blog/{categorie}` (pas de -nice, pas de contenu)

**Exemples** :
```
❌ /blog/piano (3 occurrences)
❌ /blog/pas-cher (3 occurrences)
❌ /blog/international (2 occurrences)
❌ /blog/garde-meuble (1 occurrence)
❌ /blog/prix (1 occurrence)
```

**Correction** : → `/blog/` (page listing)

---

## 📊 RÉCAPITULATIF PAR TYPE

| Pattern | Nb Liens | Complexité | Temps estimé |
|---------|----------|------------|--------------|
| #1 : `/demenagement/` | 5 | ⚠️ Facile | 5 min |
| #2 : Piliers → Satellites | 71 | 🟠 Moyen | 45 min |
| #3 : Guides catégories courtes | 24 | ⚠️ Facile | 20 min |
| #4 : Catégories vides | 7 | ⚠️ Facile | 5 min |
| **TOTAL** | **107 liens** | | **1h15** |

---

## 🎯 PLAN DE CORRECTION PROPOSÉ

### Option A : Correction Rapide (1h15)

**Approche** : Redirections uniquement

1. **Pattern #1** (5 min) : Ajouter 5 redirections dans `next.config.mjs`
2. **Pattern #2** (45 min) : Ajouter ~71 redirections groupées par pilier
3. **Pattern #3** (20 min) : Ajouter ~24 redirections guides
4. **Pattern #4** (5 min) : Ajouter ~7 redirections catégories

**Avantage** : Rapide, SEO-safe (301)  
**Inconvénient** : Ne corrige pas les liens dans les articles (sources)

---

### Option B : Correction Complète (3h)

**Approche** : Redirections + correction sources

1. **Redirections** (1h15) : Comme Option A
2. **Correction sources** (1h45) :
   - Éditer les 10 articles piliers (`/blog/demenagement-nice/xxx-guide`)
   - Corriger les liens internes vers satellites
   - Corriger les liens vers guides

**Avantage** : Propre, pas de redirections résiduelles  
**Inconvénient** : Plus long

---

## 🚀 RECOMMANDATION

### ⚡ **Option A Recommandée** (1h15)

**Raison** :
- Quick win SEO (301 redirects OK pour Google)
- Phase 2 projet 404 déjà en cours (~190 liens)
- Nice n'est pas prioritaire vs correction globale 11 villes

**Plan d'exécution** :
1. Créer fichier `redirects-404-nice.js` avec les 107 redirections
2. Importer dans `next.config.mjs`
3. Test local + deploy CapRover
4. Validation 107 liens → 200 OK

---

## 📝 NOTES TECHNIQUES

### Vérifications nécessaires

**Avant de corriger** :
- ✅ Vérifier que `/blog/satellites/` existe bien
- ✅ Vérifier structure `/blog/demenagement-nice/` 
- ⚠️ Checker si redirections existantes dans `next.config.mjs` (lignes 176-180)

**Après correction** :
- Test curl 10 URLs représentatives
- Scan complet 404 pour valider résolution

---

**Prêt à démarrer ?** 🚀

Dis-moi quelle option tu préfères (A ou B) et je génère le fichier de redirections.


