# 🔍 PATTERN #5B - ANALYSE DÉTAILLÉE : Liens `/guide` Inexistant

**Date** : 03 novembre 2025  
**Impact** : **~320 liens cassés** (68% des 470 erreurs restantes)  
**Priorité** : 🔴 P0 (Gros impact, résolution claire)

---

## 📊 VUE D'ENSEMBLE

**Problème** : Articles linkent vers `/blog/{category}/guide` qui n'existe pas

**Cause root** :
1. Guides piliers nommés : `/blog/{category}-{ville}/{category}-{ville}-guide`
2. Liens internes utilisent raccourci : `/blog/{category}/guide`
3. Next.js ne trouve pas la page → 404

**Exemple Bordeaux** :
```
❌ Lien : /blog/prix/guide
✅ Article réel : /blog/prix-demenagement-bordeaux/prix-demenagement-bordeaux-guide

❌ Lien : /blog/etudiant/guide
✅ Article réel : /blog/demenagement-etudiant-bordeaux/demenagement-etudiant-bordeaux-guide-complet
```

---

## 🔢 QUANTIFICATION PAR VILLE

### Bordeaux : 128 liens `/guide`

| Catégorie | Fréquence | Vrai slug guide |
|-----------|-----------|-----------------|
| `/blog/devis/guide` | 28 | `/blog/devis-demenagement-bordeaux/devis-demenagement-bordeaux-guide` |
| `/blog/etudiant/guide` | 23 | `/blog/demenagement-etudiant-bordeaux/demenagement-etudiant-bordeaux-guide-complet` |
| `/blog/longue-distance/guide` | 19 | `/blog/demenagement-longue-distance-bordeaux/demenagement-longue-distance-bordeaux-guide` |
| `/blog/garde-meuble/guide` | 18 | `/blog/garde-meuble-bordeaux/garde-meuble-bordeaux-guide` |
| `/blog/urgent/guide` | 12 | `/blog/demenagement-urgent-bordeaux/demenagement-urgent-bordeaux-guide` |
| `/blog/international/guide` | 11 | `/blog/demenagement-international-bordeaux/demenagement-international-bordeaux-guide` |
| `/blog/prix/guide` | 7 | `/blog/prix-demenagement-bordeaux/prix-demenagement-bordeaux-guide` |
| `/blog/pas-cher/guide` | 6 | `/blog/demenagement-pas-cher-bordeaux/demenagement-pas-cher-bordeaux-guide` |
| `/blog/entreprise/guide` | 3 | `/blog/demenagement-entreprise-bordeaux/demenagement-entreprise-bordeaux-guide` |
| `/blog/demenageur/guide` | 1 | ⚠️ Vérifier existence |

**Total Bordeaux** : 128 liens

---

### Montpellier : ~70 liens estimés

**Patterns identifiés du scan** :
- `/blog/demenagement-entreprise-montpellier/` → `/blog/demenagement-entreprise-montpellier/demenagement-entreprise-montpellier` (lien circulaire!)
- `/blog/demenagement-international-montpellier/` → `/blog/demenagement-international-montpellier/demenagement-international-montpellier` (idem!)
- `/blog/location-camion-demenagement-montpellier/` → `/blog/location-camion-demenagement-montpellier/location-camion-demenagement-montpellier` (idem!)

**⚠️ PROBLÈME SPÉCIFIQUE MONTPELLIER** : Liens circulaires !

Les articles linkent vers eux-mêmes avec pattern : `/blog/{slug}/{slug}`

**Hypothèse** :
- Articles piliers Montpellier ont une structure différente
- Catégorie = slug article (pas de dossier catégorie séparé)
- Liens générés automatiquement linkent vers `/blog/{category}/{slug}` = `/blog/{slug}/{slug}`

**Vérification requise** :
```bash
# Vérifier structure Montpellier
ls sites/montpellier/content/blog/
```

---

### Nice : ~50 liens estimés

**Patterns du scan** :
```
Source : /blog/demenagement-nice/{topic}-guide
Liens cassés : /blog/{topic}-nice/satellites/{slug}

Exemples :
❌ /blog/aide-demenagement-nice/satellites/aide-amis-demenagement-nice
❌ /blog/demenagement-entreprise-nice/satellites/demenagement-bureaux-entreprise-nice
```

**Différence vs Bordeaux** :
- Nice utilise structure `/blog/{topic}-nice/` au lieu de `/blog/{topic}/`
- Mais liens satellites pointent vers dossier `/satellites/` inexistant

**Résolution** :
- Pattern #5A (satellites) PAS Pattern #5B
- Traiter séparément

---

### Lille : ~40 liens estimés

**Structure similaire Bordeaux** :
```
❌ /blog/entreprise/guide
✅ /blog/demenagement-entreprise-lille/demenagement-entreprise-lille-guide (estimé)
```

---

### Nantes : ~30 liens estimés

**Patterns du scan** :
```
❌ /blog/demenagement-international-nantes → /blog/demenagement-international-nantes/demenagement-dom-tom-montpellier
❌ /blog/demenagement-pas-cher-nantes → /blog/demenagement-pas-cher-nantes/astuces-reduire-cout-demenagement-nantes
```

**Structure** : Similaire Bordeaux (besoin mapping `/guide`)

---

### Rouen, Strasbourg, Lyon : ~30-40 liens total

**Patterns similaires** : Besoin mapping `/guide`

---

## 🗺️ MAPPING COMPLET (Bordeaux validé, extrapoler 11 villes)

### Pattern standard (9 catégories × 11 villes = 99 mappings)

| Lien cassé | Vrai slug | Notes |
|------------|-----------|-------|
| `/blog/devis/guide` | `/blog/devis-demenagement-{ville}/devis-demenagement-{ville}-guide` | Top fréquence |
| `/blog/etudiant/guide` | `/blog/demenagement-etudiant-{ville}/demenagement-etudiant-{ville}-guide-complet` | Suffix `-complet` |
| `/blog/longue-distance/guide` | `/blog/demenagement-longue-distance-{ville}/demenagement-longue-distance-{ville}-guide` | |
| `/blog/garde-meuble/guide` | `/blog/garde-meuble-{ville}/garde-meuble-{ville}-guide` | |
| `/blog/urgent/guide` | `/blog/demenagement-urgent-{ville}/demenagement-urgent-{ville}-guide` | |
| `/blog/international/guide` | `/blog/demenagement-international-{ville}/demenagement-international-{ville}-guide` | |
| `/blog/prix/guide` | `/blog/prix-demenagement-{ville}/prix-demenagement-{ville}-guide` | |
| `/blog/pas-cher/guide` | `/blog/demenagement-pas-cher-{ville}/demenagement-pas-cher-{ville}-guide` | |
| `/blog/entreprise/guide` | `/blog/demenagement-entreprise-{ville}/demenagement-entreprise-{ville}-guide` | |

### Cas particuliers

**Demenageur** :
```
❌ /blog/demenageur/guide
✅ /blog/demenageur-{ville}/demenageur-{ville}-guide (à vérifier existence)
OU /blog/demenageur-{ville}/demenageur-{ville}-expert (Nice, Lille)
```

---

## 🔍 VÉRIFICATION EXISTENCE GUIDES

### Villes avec structure confirmée (Bordeaux)

✅ **9/10 catégories guides existent** :
- devis-demenagement-bordeaux/devis-demenagement-bordeaux-guide.md ✅
- demenagement-etudiant-bordeaux/demenagement-etudiant-bordeaux-guide-complet.md ✅
- demenagement-longue-distance-bordeaux/demenagement-longue-distance-bordeaux-guide.md ✅
- garde-meuble-bordeaux/garde-meuble-bordeaux-guide.md ✅
- demenagement-urgent-bordeaux/demenagement-urgent-bordeaux-guide.md ✅
- demenagement-international-bordeaux/demenagement-international-bordeaux-guide.md ✅
- prix-demenagement-bordeaux/prix-demenagement-bordeaux-guide.md ✅
- demenagement-pas-cher-bordeaux/demenagement-pas-cher-bordeaux-guide.md ✅
- demenagement-entreprise-bordeaux/demenagement-entreprise-bordeaux-guide.md ✅

⚠️ **1/10 catégorie À VÉRIFIER** :
- demenageur/guide → Vérifier si `demenageur-bordeaux/demenageur-bordeaux-guide.md` existe

### Villes à vérifier (10 autres)

**Commande validation** :
```bash
for city in marseille toulouse lyon nice lille nantes strasbourg rouen rennes montpellier; do
  echo "=== $city ==="
  ls sites/$city/content/blog/devis-demenagement-$city/*guide* 2>/dev/null || echo "  ❌ devis guide manquant"
  ls sites/$city/content/blog/demenagement-etudiant-$city/*guide* 2>/dev/null || echo "  ❌ etudiant guide manquant"
  ls sites/$city/content/blog/garde-meuble-$city/*guide* 2>/dev/null || echo "  ❌ garde-meuble guide manquant"
  # ... etc pour 9 catégories
done
```

---

## 📝 EXEMPLES CONCRETS DE LIENS CASSÉS

### Dans articles satellites (scan fourni)

**Exemple 1 : Article prix-demenagement-pas-cher-bordeaux.md**
```markdown
# Quels sont les prix pour un [déménagement pas cher](/blog/pas-cher/guide) à Bordeaux ?

❌ Problème : /blog/pas-cher/guide n'existe pas
✅ Solution : /blog/demenagement-pas-cher-bordeaux/demenagement-pas-cher-bordeaux-guide
```

**Exemple 2 : FAQ article**
```markdown
Consultez notre [guide déménagement pas cher](/blog/pas-cher/guide)

❌ Problème : /blog/pas-cher/guide n'existe pas
✅ Solution : /blog/demenagement-pas-cher-bordeaux/demenagement-pas-cher-bordeaux-guide
```

**Exemple 3 : Lien dans guide pilier vers autre guide**
```markdown
Pour volumes importants, privilégiez [déménageur classique](/blog/demenageur/guide)

❌ Problème : /blog/demenageur/guide n'existe pas
✅ Solution : /blog/demenageur-bordeaux/demenageur-bordeaux-expert (si existe)
OU Solution : /blog/devis-demenagement-bordeaux/devis-demenagement-bordeaux-guide (fallback)
```

---

### Dans guides piliers (analyse ligne 71)

**Exemple : demenagement-etudiant-bordeaux-guide-complet.md ligne 71**
```markdown
Pour en savoir plus, consultez nos guides sur
[tarifs préférentiels étudiants](/blog/pas-cher/guide),
[solutions express](/blog/urgent/guide) et
[budget optimisé](/blog/prix/guide).

❌ 3 liens cassés dans 1 seule phrase !
✅ Solutions :
- /blog/pas-cher/guide → /blog/demenagement-pas-cher-bordeaux/demenagement-pas-cher-bordeaux-guide/
- /blog/urgent/guide → /blog/demenagement-urgent-bordeaux/demenagement-urgent-bordeaux-guide/
- /blog/prix/guide → /blog/prix-demenagement-bordeaux/prix-demenagement-bordeaux-guide/
```

**Pattern fréquent** : Phrase type "consultez nos guides" avec 3-5 liens `/guide` cassés

---

## 🛠️ SOLUTION TECHNIQUE

### Script de correction automatique

```javascript
#!/usr/bin/env node
// scripts/fix-pattern-5b-guide-links.mjs

import fs from 'fs';
import path from 'path';

const CITIES = [
  'marseille', 'toulouse', 'lyon', 'bordeaux', 'nantes',
  'lille', 'nice', 'strasbourg', 'rouen', 'rennes', 'montpellier'
];

// Mapping catégorie → vrai slug guide
// Format : { 'category': 'category-ville/slug-exact' }
const GUIDE_MAPPING = {
  'devis': 'devis-demenagement-CITY/devis-demenagement-CITY-guide',
  'etudiant': 'demenagement-etudiant-CITY/demenagement-etudiant-CITY-guide-complet',
  'longue-distance': 'demenagement-longue-distance-CITY/demenagement-longue-distance-CITY-guide',
  'garde-meuble': 'garde-meuble-CITY/garde-meuble-CITY-guide',
  'urgent': 'demenagement-urgent-CITY/demenagement-urgent-CITY-guide',
  'international': 'demenagement-international-CITY/demenagement-international-CITY-guide',
  'prix': 'prix-demenagement-CITY/prix-demenagement-CITY-guide',
  'pas-cher': 'demenagement-pas-cher-CITY/demenagement-pas-cher-CITY-guide',
  'entreprise': 'demenagement-entreprise-CITY/demenagement-entreprise-CITY-guide',
  // Cas spéciaux
  'demenageur': 'demenageur-CITY/demenageur-CITY-guide', // À vérifier par ville
};

// Variantes de noms ville
const CITY_NAMES = {
  'toulouse': 'toulouse',
  'bordeaux': 'bordeaux',
  'marseille': 'marseille',
  'lyon': 'lyon',
  'nice': 'nice',
  'lille': 'lille',
  'nantes': 'nantes',
  'strasbourg': 'strasbourg',
  'rouen': 'rouen',
  'rennes': 'rennes',
  'montpellier': 'montpellier'
};

function fixGuideLinksInFile(filePath, city) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let changesCount = 0;
  
  // Pour chaque catégorie avec mapping
  Object.entries(GUIDE_MAPPING).forEach(([category, templateSlug]) => {
    // Remplacer CITY par nom ville
    const realSlug = templateSlug.replace(/CITY/g, city);
    
    // Pattern à chercher : ](/blog/{category}/guide)
    const brokenLinkPattern = new RegExp(
      `\\]\\(/blog/${category}/guide\\)`,
      'g'
    );
    
    // Remplacement : ](/blog/{realSlug}/)
    const fixedLink = `](/blog/${realSlug}/)`;
    
    // Compter matches
    const matches = content.match(brokenLinkPattern);
    if (matches) {
      content = content.replace(brokenLinkPattern, fixedLink);
      changesCount += matches.length;
      
      console.log(`  ✓ /blog/${category}/guide → /blog/${realSlug}/ (${matches.length}x)`);
    }
  });
  
  // Si modifications, écrire fichier
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
  
  return changesCount;
}

function processDirectory(dirPath, city) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  let totalFixed = 0;
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item.name);
    
    if (item.isDirectory()) {
      totalFixed += processDirectory(fullPath, city);
    } else if (item.isFile() && item.name.endsWith('.md')) {
      const fixed = fixGuideLinksInFile(fullPath, city);
      totalFixed += fixed;
    }
  });
  
  return totalFixed;
}

// Main
let grandTotal = 0;

CITIES.forEach(city => {
  console.log(`\n📁 ${city.toUpperCase()}`);
  
  const blogPath = `sites/${city}/content/blog`;
  
  if (!fs.existsSync(blogPath)) {
    console.log(`  ⚠️  Pas de dossier blog`);
    return;
  }
  
  const cityTotal = processDirectory(blogPath, city);
  console.log(`  Total : ${cityTotal} liens corrigés`);
  
  grandTotal += cityTotal;
});

console.log(`\n✅ TOTAL : ${grandTotal} liens /guide corrigés sur 11 villes`);
```

---

## 📋 PLAN D'EXÉCUTION DÉTAILLÉ

### Étape 1 : Validation mapping (1h)

**Actions** :
1. Vérifier existence guides pour 11 villes
2. Identifier cas particuliers (Nice, Montpellier structure différente)
3. Adapter mapping si nécessaire

**Commande** :
```bash
# Vérifier 9 catégories × 11 villes (99 fichiers)
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  echo "=== $city ==="
  
  # Devis
  test -f "sites/$city/content/blog/devis-demenagement-$city/devis-demenagement-$city-guide.md" && echo "  ✅ devis" || echo "  ❌ devis"
  
  # Etudiant
  test -f "sites/$city/content/blog/demenagement-etudiant-$city/demenagement-etudiant-$city-guide-complet.md" && echo "  ✅ etudiant" || echo "  ❌ etudiant"
  
  # Longue distance
  test -f "sites/$city/content/blog/demenagement-longue-distance-$city/"*guide*.md && echo "  ✅ longue-distance" || echo "  ❌ longue-distance"
  
  # Garde-meuble
  test -f "sites/$city/content/blog/garde-meuble-$city/"*guide*.md && echo "  ✅ garde-meuble" || echo "  ❌ garde-meuble"
  
  # Urgent
  test -f "sites/$city/content/blog/demenagement-urgent-$city/"*guide*.md && echo "  ✅ urgent" || echo "  ❌ urgent"
  
  # International
  test -f "sites/$city/content/blog/demenagement-international-$city/"*guide*.md && echo "  ✅ international" || echo "  ❌ international"
  
  # Prix
  test -f "sites/$city/content/blog/prix-demenagement-$city/"*guide*.md && echo "  ✅ prix" || echo "  ❌ prix"
  
  # Pas cher
  test -f "sites/$city/content/blog/demenagement-pas-cher-$city/"*guide*.md && echo "  ✅ pas-cher" || echo "  ❌ pas-cher"
  
  # Entreprise
  test -f "sites/$city/content/blog/demenagement-entreprise-$city/"*guide*.md && echo "  ✅ entreprise" || echo "  ❌ entreprise"
  
done > validation-guides-11-villes.txt

cat validation-guides-11-villes.txt
```

**Résultat attendu** : Liste guides manquants par ville

---

### Étape 2 : Créer script avec gestion cas spéciaux (1h)

**Adaptations nécessaires** :

**Nice : Structure différente**
```javascript
// Nice utilise parfois structure différente
const NICE_OVERRIDES = {
  'aide-demenagement': 'aide-demenagement/aide-demenagement-nice-guide',
  'demenageur': 'demenageur/demenageur-nice-guide-complet',
  'location-camion': 'location-camion/location-camion-demenagement-nice-guide',
  // etc.
};
```

**Montpellier : Liens circulaires**
```javascript
// Pattern spécial Montpellier : /blog/{slug}/{slug}
// Vérifier si catégorie = slug, si oui, corriger différemment
if (city === 'montpellier') {
  // Logique spéciale pour Montpellier
  // Exemple : /blog/demenagement-entreprise-montpellier/demenagement-entreprise-montpellier
  // → /blog/demenagement-entreprise-montpellier/ (supprimer slug en double)
}
```

**Fallbacks si guide n'existe pas** :
```javascript
// Si guide catégorie X n'existe pas, rediriger vers guide général
const FALLBACK_GUIDE = 'demenageur-CITY/demenageur-CITY-guide';

if (!guideExists(category, city)) {
  console.warn(`  ⚠️  Guide ${category} inexistant pour ${city}, fallback vers ${FALLBACK_GUIDE}`);
  return FALLBACK_GUIDE.replace('CITY', city);
}
```

---

### Étape 3 : Dry-run sur ville test (30min)

**Ville test** : Rennes (petite ville, 31 articles)

**Commande** :
```bash
# Backup Rennes
cp -R sites/rennes/content/blog sites/rennes/content/blog.backup-pattern-5b

# Dry-run (mode simulation)
node scripts/fix-pattern-5b-guide-links.mjs --dry-run --city rennes

# Résultat attendu :
# ==> Rennes : 15 liens /guide à corriger
#   ✓ /blog/devis/guide → /blog/devis-demenagement-rennes/devis-demenagement-rennes-guide/ (3x)
#   ✓ /blog/etudiant/guide → /blog/demenagement-etudiant-rennes/demenagement-etudiant-rennes-guide-complet/ (5x)
#   ...
```

**Vérification manuelle** :
```bash
# Examiner 5 corrections proposées
# Vérifier que les destinations existent vraiment

# Test : Les guides existent ?
ls sites/rennes/content/blog/devis-demenagement-rennes/*guide*.md
ls sites/rennes/content/blog/demenagement-etudiant-rennes/*guide*.md
```

**Si OK** :
```bash
# Exécuter réellement sur Rennes
node scripts/fix-pattern-5b-guide-links.mjs --city rennes

# Build test
cd sites/rennes && npm run build

# Si build OK → Continuer
```

---

### Étape 4 : Exécution 11 villes (1h)

```bash
# Backup complet
bash scripts/backup-before-pattern-5b.sh

# Exécuter script sur 11 villes
node scripts/fix-pattern-5b-guide-links.mjs --all-cities

# Résultat attendu :
# Bordeaux : 128 liens corrigés
# Montpellier : ~70 liens corrigés
# Nice : ~50 liens corrigés
# Lille : ~40 liens corrigés
# Nantes : ~30 liens corrigés
# Rouen : ~25 liens corrigés
# Strasbourg : ~15 liens corrigés
# Lyon : ~10 liens corrigés
# Marseille : ~10 liens corrigés
# Rennes : ~15 liens corrigés
# Toulouse : ~10 liens corrigés (déjà peu d'erreurs grâce Pattern #7)

# TOTAL : ~320-350 liens corrigés
```

---

### Étape 5 : Validation (1-2h)

**Tests build** :
```bash
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  echo "=== Build $city ==="
  cd sites/$city && npm run build && cd ../..
done
```

**Tests manuels** :
```bash
# Vérifier 10 liens corrigés (1/ville)
# Ouvrir article → Cliquer lien corrigé → Vérifier 200 OK
```

**Comparer avant/après** :
```bash
# Re-run analyze-404.mjs
node scripts/analysis/analyze-404.mjs

# Attendu :
# AVANT : ~470 liens cassés
# APRÈS : ~150 liens cassés
# Réduction : -68% (-320 liens)
```

---

### Étape 6 : Commit + Deploy (30min)

```bash
# Par ville
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  git add sites/$city/content/blog/**/*.md
  
  # Compter corrections
  FIXES=$(git diff --cached sites/$city/ | grep -c "^-.*](/blog/.*\/guide)" || echo "0")
  
  git commit -m "fix($city): Pattern #5B - Correction ${FIXES} liens /guide (TASK-404-CORRECTIONS-PATTERNS)"
done

# Push GitHub main
git push origin main

# Deploy CapRover
bash scripts/deploy/push-to-all-site-repos.sh
```

---

## 📊 ESTIMATION IMPACT

### Par ville (basé sur fréquence Bordeaux extrapolée)

| Ville | Liens `/guide` | Temps correction | Articles touchés |
|-------|----------------|------------------|------------------|
| Bordeaux | 128 | Inclus script | ~80 |
| Montpellier | ~70 | Inclus script | ~50 |
| Nice | ~50 | Inclus script | ~35 |
| Lille | ~40 | Inclus script | ~30 |
| Nantes | ~30 | Inclus script | ~20 |
| Rouen | ~25 | Inclus script | ~15 |
| Strasbourg | ~15 | Inclus script | ~10 |
| Lyon | ~10 | Inclus script | ~8 |
| Marseille | ~10 | Inclus script | ~8 |
| Rennes | ~15 | Inclus script | ~10 |
| Toulouse | ~10 | Inclus script | ~8 |
| **TOTAL** | **~403** | **4-6h** | **~274** |

**Révision estimation** : 403 liens (pas 320) → **86% des 470 erreurs** !

---

## ⚠️ CAS PARTICULIERS IDENTIFIÉS

### 1. Catégorie `/demenageur/guide` (1 lien/ville = 11 total)

**Problème** : Guide demenageur peut ne pas exister ou avoir nom différent

**Exemples réels** :
- Nice : `demenageur/demenageur-nice-guide-complet.md` ✅
- Lille : `demenageur-lille/demenageur-lille-expert.md` ⚠️ (nom différent)
- Bordeaux : À vérifier

**Solution** :
```javascript
// Vérifier existence avant correction
const demenageurGuides = {
  'nice': 'demenageur/demenageur-nice-guide-complet',
  'lille': 'demenageur-lille/demenageur-lille-expert',
  'rouen': 'demenageur/demenageur-rouen-guide-complet',
  // ... mapper pour chaque ville
  
  // Fallback si inexistant
  'default': 'devis-demenagement-CITY/devis-demenagement-CITY-guide'
};
```

---

### 2. Montpellier : Liens circulaires

**Problème différent** :
```
Liens scan : /blog/demenagement-entreprise-montpellier/demenagement-entreprise-montpellier
```

Ce n'est PAS `/blog/entreprise/guide` mais `/blog/{slug}/{slug}` (lien vers soi-même)

**Cause** : Structure catégories Montpellier différente

**Solution** : **Pattern séparé** (pas Pattern #5B)
- Identifier pourquoi liens circulaires
- Vérifier structure dossiers Montpellier
- Corriger logique génération liens

**Temps** : +2h (analyse + correction)

---

### 3. Nice : Structure `/demenagement-nice/` vs autres villes

**Observation scan** :
```
Nice : /blog/demenagement-nice/{topic}-guide → liens satellites
Bordeaux : /blog/demenagement-{topic}-bordeaux/{topic}-guide
```

Structure **potentiellement différente** → Vérifier

**Commande validation** :
```bash
ls -la sites/nice/content/blog/ | grep "demenagement-nice"
```

---

## 🎯 RECOMMANDATION FINALE

### Approche en 2 temps

**Phase 5B-1 : Standard** (4h) → ~300 liens
- Corriger 8 catégories standard (devis, etudiant, longue-distance, garde-meuble, urgent, international, prix, pas-cher)
- Appliquer 10 villes (sauf Montpellier)
- Mapping uniforme

**Phase 5B-2 : Cas spéciaux** (2h) → ~100 liens
- Montpellier : Liens circulaires (analyse + fix)
- Catégorie demenageur : Mapping custom par ville
- Entreprise : Vérifier existence guides

**Total Pattern #5B** : 6h → ~400 liens ✅

---

## 📝 CHECKLIST AVANT EXÉCUTION

```
□ Mapping validé pour 11 villes
  - [x] Bordeaux confirmé (9/9 guides existent)
  - [ ] 10 autres villes à vérifier
  
□ Script créé avec :
  - [ ] Mapping catégories
  - [ ] Gestion cas spéciaux Nice
  - [ ] Gestion cas spéciaux Montpellier
  - [ ] Fallback si guide n'existe pas
  - [ ] Dry-run mode
  
□ Tests préparés :
  - [ ] Dry-run Rennes
  - [ ] Validation manuelle 10 corrections
  - [ ] Build Rennes OK
  
□ Backup :
  - [ ] Script backup automatique
  - [ ] Commande rollback documentée
```

---

## 🚨 RISQUES

### Risque #1 : Guide n'existe pas (MOYEN)

**Probabilité** : 10-15% (10-40 liens)

**Conséquence** : Correction vers 404 (pire que lien cassé actuel)

**Mitigation** :
- Validation existence AVANT correction
- Fallback vers guide général si inexistant
- Log warnings pour review manuelle

---

### Risque #2 : Structure ville différente (FAIBLE)

**Villes concernées** : Montpellier, Nice (confirmé)

**Conséquence** : Script ne trouve pas ou corrige mal

**Mitigation** :
- Mapping custom par ville
- Dry-run validation
- Exclure ville si structure trop différente

---

### Risque #3 : Régression builds (FAIBLE)

**Probabilité** : <5%

**Conséquence** : Build échoue après correction

**Mitigation** :
- Backup automatique AVANT
- Test build Rennes
- Rollback facile si problème

---

## 💡 ALTERNATIVES CONSIDÉRÉES

### Alternative A : Créer pages `/guide` génériques (1h)

**Avantages** :
- Quick win (1h vs 6h)
- Aucun risque régression
- Résout 100% liens

**Inconvénients** :
- 90 nouveaux fichiers (9 catégories × 10 villes, Bordeaux existe déjà)
- Contenu générique (faible qualité SEO)
- Duplicate content potentiel
- Maintenance future

**Décision** : ❌ Pas recommandé (contenu low-quality)

---

### Alternative B : Redirections 301 wildcards (30min)

**Avantages** :
- Ultra rapide (30min)
- Aucun changement markdown
- Réversible facilement

**Inconvénients** :
- Internal links via redirections (pas clean)
- Performance légèrement dégradée
- SEO moins bon que liens directs
- Difficulté : ville dynamique dans next.config.mjs

**Décision** : ❌ Pas recommandé (pas clean)

---

### Alternative C : Correction manuelle (40h+)

**Avantages** :
- Contrôle total
- Opportunité améliorer contenu

**Inconvénients** :
- **40h effort** (274 fichiers × 10min)
- Risque erreurs humaines
- Non scalable

**Décision** : ❌ Infaisable

---

## ✅ DÉCISION : Script automatique (Recommandé)

**Temps** : 6h (1h validation + 1h script + 30min dry-run + 1h exécution + 2h validation + 30min commit)

**Impact** : ~400 liens corrigés (86% des 470 erreurs)

**ROI** : **67 liens/heure** ⭐

**Qualité** : Liens propres, SEO optimal, maintenable

---

## 🚀 PROCHAINE ACTION

**Commande** :
```bash
"Cursor, crée le script Pattern #5B avec validation mapping 11 villes"
```

Cursor va :
1. Valider existence guides 11 villes
2. Créer mapping complet avec cas spéciaux
3. Coder script avec dry-run
4. Tester sur Rennes
5. Proposer exécution 11 villes

---

**Analyse Pattern #5B complétée**

