# 📋 TÂCHES 404 - DOCUMENTATION DÉTAILLÉE

**Date** : 1er novembre 2025  
**Basé sur** : ANALYSE-LOGIQUE-404-COMPLETE.md  
**Total tâches** : 9 sous-tâches indépendantes

---

## TASK-404-01 : Audit Structure Complète

### Métadonnées
- **Priorité** : P0 (BLOQUE TOUT)
- **Temps estimé** : 2-3h
- **Assigné** : Guillaume ou Associée
- **Type** : Audit / Investigation
- **Dépendances** : AUCUNE
- **Bloque** : Toutes les autres tasks 404

### Objectif
Mapper EXACTEMENT la structure réelle des 11 villes pour comprendre :
- Comment les URLs sont générées
- Incohérences dossiers vs frontmatter vs URLs
- Identifier les VRAIS articles manquants (validation)

### Contexte
- `verify-real-missing-articles.mjs` a identifié 104 articles VRAIMENT manquants
- Mais 691 liens ont une catégorie incorrecte (dossier ≠ frontmatter)
- Chaque ville a sa propre fonction `cleanSlug()` qui peut transformer les slugs
- SANS ce mapping, toutes corrections ultérieures sont à l'aveugle

### Actions détaillées

#### 1. Exécuter analyse complète (30min)
```bash
cd /Users/guillaumestehelin/moverz_main-2

# Générer analyse articles manquants
node scripts/verify-real-missing-articles.mjs

# Analyser tous les liens cassés
node scripts/analyze-404.mjs

# Résultats dans :
# - VERIFICATION-ARTICLES.json
# - 404-analysis.json
```

#### 2. Auditer fonction cleanSlug() (1h)
Pour chaque ville (11), extraire :
```bash
# Exemple Lyon
grep -A 30 "function cleanSlug" sites/lyon/lib/blog.ts > audit-cleanslug-lyon.txt

# Répéter pour 11 villes
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  grep -A 30 "function cleanSlug" sites/$city/lib/blog.ts > audit-cleanslug-$city.txt
done
```

Identifier :
- Transformations appliquées aux slugs
- Incohérences entre villes
- Patterns de nettoyage (ex: `-guide-complet` → `-guide`)

#### 3. Vérifier CATEGORY_MAPPING (30min)
```bash
# Exemple Nice
grep -A 20 "CATEGORY_MAPPING" sites/nice/lib/blog.ts

# Pour toutes villes
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  echo "=== $city ===" >> category-mappings.txt
  grep -A 30 "CATEGORY_MAPPING" sites/$city/lib/blog.ts >> category-mappings.txt
done
```

Créer tableau :
| Ville | Dossier | Frontmatter category | URL finale | Cohérent ? |
|-------|---------|---------------------|------------|------------|
| Lyon | satellites | demenagement-entreprise-lyon | /blog/demenagement-entreprise-lyon/slug | ✅ |
| Toulouse | piliers | demenageur | /blog/demenageur/slug | ❌ (dossier ≠ URL) |

#### 4. Consolider mapping complet (30min)
Créer `MAPPING-STRUCTURE-11-VILLES.json` :
```json
{
  "lyon": {
    "cleanSlugRules": [
      { "pattern": "-guide-complet", "replacement": "-guide" }
    ],
    "categoryMapping": {
      "satellites": "demenagement-entreprise-lyon",
      "piliers": "demenageur-lyon"
    },
    "inconsistencies": [
      "Dossier 'satellites' contient articles de catégories différentes"
    ],
    "totalArticles": 99,
    "categories": 11
  },
  // ... 10 autres villes
  "summary": {
    "totalArticles": 1044,
    "totalInconsistencies": 15,
    "citiesWithCleanSlug": 11,
    "citiesWithCategoryMapping": 11
  }
}
```

### Livrables
- [x] `VERIFICATION-ARTICLES.json` (963 résolvables, 104 manquants)
- [x] `404-analysis.json` (2125 liens cassés)
- [x] `MAPPING-STRUCTURE-11-VILLES.json` (mapping complet)
- [x] `RAPPORT-INCONSISTANCES.md` (liste problèmes trouvés)
- [x] Tableau récap par ville (markdown)

### Critères d'acceptation
- [x] Mapping 11 villes exporté avec structure complète
- [x] Incohérences documentées avec exemples
- [x] CleanSlug rules extraites et comparées
- [x] CATEGORY_MAPPING vérifié et documenté
- [x] 104 articles manquants validés (liste finale)

### Risques
- ⚠️ Incohérences entre villes complexes à mapper
- ⚠️ Certains cleanSlug() peuvent avoir bugs (à documenter, pas corriger ici)

### Notes
- NE PAS corriger le code ici, juste documenter
- Si incohérence critique trouvée → la noter pour TASK-404-02
- Temps peut varier selon complexité incohérences

---

## TASK-404-02 : Harmonisation Technique

### Métadonnées
- **Priorité** : P0 (BLOQUE TOUT sauf 404-01)
- **Temps estimé** : 1-2h
- **Assigné** : Guillaume
- **Type** : Refactor / Fix technique
- **Dépendances** : TASK-404-01 (besoin mapping)
- **Bloque** : TOUTES les autres tasks 404

### Objectif
Harmoniser la base technique pour garantir que :
- Les slugs sont générés de manière cohérente
- Les accents sont correctement encodés
- Les CATEGORY_MAPPING sont alignés
- La structure est STABLE avant toute correction

### Contexte
- Analyse GPT mentionne 200 URLs avec accents mal encodés
- Chaque ville a sa propre logique cleanSlug() (parfois incohérente)
- TASK-404-01 a identifié incohérences CATEGORY_MAPPING
- Si cette base technique n'est pas harmonisée → corrections ultérieures cassées

### Actions détaillées

#### 1. Fix encoding accents (30min)
Créer fonction standardisée :
```typescript
// lib/slug-utils.ts (nouveau fichier)
export function encodeSlugProperly(slug: string): string {
  return slug
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer accents
    .replace(/[éèêë]/g, 'e')
    .replace(/[àâä]/g, 'a')
    .replace(/[îï]/g, 'i')
    .replace(/[ôö]/g, 'o')
    .replace(/[ûü]/g, 'u')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
```

Appliquer dans `lib/blog.ts` de chaque ville (11 fichiers).

#### 2. Standardiser cleanSlug() (30-60min)
Basé sur incohérences TASK-404-01 :

Option A : **Harmoniser complètement**
```typescript
// Même logique pour 11 villes
function cleanSlug(originalSlug: string, category: string): string {
  let clean = originalSlug;
  
  // Règles communes
  clean = clean.replace(/-guide-complet$/i, '-guide');
  clean = clean.replace(/-criteres$/i, '');
  
  // Encoding accents
  clean = encodeSlugProperly(clean);
  
  return clean;
}
```

Option B : **Documenter différences**
Si certaines villes DOIVENT avoir logique différente :
- Documenter POURQUOI dans code
- Créer tests unitaires pour chaque ville
- Garantir stabilité

**DÉCISION** : À prendre avec Guillaume (harmoniser ou documenter)

#### 3. Aligner CATEGORY_MAPPING (15min)
Exemples d'incohérences trouvées :
```typescript
// Toulouse : piliers → multiple catégories (frontmatter)
// → Laisser tel quel, documenter

// Nice : satellites → null (bug)
// → Fixer vers catégorie réelle du frontmatter

// Lyon : dossiers = catégories URL (cohérent)
// → Modèle à suivre
```

Fixer bugs identifiés en TASK-404-01.

#### 4. Tests validation (15min)
```bash
# Re-générer URLs après harmonisation
cd sites/lyon && pnpm build

# Vérifier aucune URL cassée (comparer avant/après)
node scripts/compare-urls-before-after.mjs
```

Si URLs changent :
- Documenter TOUTES les URLs modifiées
- Créer redirections 301 temporaires (pour ne rien casser)

### Livrables
- [x] `lib/slug-utils.ts` (fonction encoding standardisée)
- [x] `lib/blog.ts` harmonisé (11 villes)
- [x] CATEGORY_MAPPING fixé (villes avec bugs)
- [x] Tests validation passés
- [x] Commits GitHub (1 commit par ville + 1 pour slug-utils)
- [x] `RAPPORT-HARMONISATION.md` (changements appliqués)

### Critères d'acceptation
- [x] Aucune URL existante cassée (compare avant/après)
- [x] Encoding accents standardisé
- [x] cleanSlug() cohérent (ou différences documentées)
- [x] CATEGORY_MAPPING sans bugs
- [x] Code déployé + testé en local (pnpm build OK pour 11 villes)

### Risques
- 🔴 CRITIQUE : Si URLs existantes changent → TOUT casser
- 🟠 Harmonisation peut révéler bugs cachés
- 🟡 Tests build peuvent échouer (résoudre avant commit)

### Notes
- Créer backup complet AVANT toute modification
- Commit atomique par ville (faciliter rollback)
- Si doute sur impact → NE PAS harmoniser, juste documenter

---

## TASK-404-03 : Décision Stratégique 104 Articles

### Métadonnées
- **Priorité** : P1 (après harmonisation)
- **Temps estimé** : 1h
- **Assigné** : Guillaume + Associée (décision business)
- **Type** : Stratégie / Décision
- **Dépendances** : TASK-404-01 (liste 104 articles)
- **Bloque** : TASK-404-04 (si création) ou TASK-404-05A (si redirections)

### Objectif
DÉCIDER pour chaque article manquant :
- **Option A** : Créer l'article (20-30h effort)
- **Option B** : Rediriger vers pilier existant (0h effort)

### Contexte
- 104 articles identifiés comme VRAIMENT manquants
- Répartition :
  - Rouen : 34
  - Montpellier : 33
  - Lyon : 18
  - Autres : 19
- Créer tout = 20-30h effort
- Rediriger tout = économie temps mais perte SEO long terme

### Actions détaillées

#### 1. Analyser pertinence SEO (30min)
Pour chaque article, évaluer :

Fichier : `VERIFICATION-ARTICLES.json` → section `results.vraimentManquants`

Créer tableau :
| Article | Ville | Volume recherche | Importance | Décision |
|---------|-------|------------------|------------|----------|
| demenagement-immediat-24h-toulouse | Toulouse | ? | Faible (doublons) | ❌ Rediriger |
| article-rouen-34 | Rouen | ? | ? | ⚠️ À vérifier |

Sources volume recherche :
- Google Keyword Planner
- OU estimation rapide (100/mois = important, <10/mois = négligeable)
- OU analyse concurrence (si concurrent a article = créer)

#### 2. Critères de décision
**CRÉER si** :
- Volume recherche > 50/mois
- OU intent transactionnel fort
- OU compétition forte (concurrents ont article)
- OU complète un pilier (ex: variation locale importante)

**REDIRIGER si** :
- Volume recherche < 10/mois
- OU doublon d'article existant
- OU intent informationnel faible
- OU pilier couvre déjà le sujet

#### 3. Définir slugs/catégories (si création)
Pour articles à créer :
```json
{
  "article-a-creer": {
    "slug": "nom-article-ville",
    "category": "categorie-ville",
    "pilier": "pilier-parent",
    "priority": "high|medium|low",
    "estimatedTime": "2h"
  }
}
```

#### 4. Mapper redirections (si pas création)
Pour articles à rediriger :
```json
{
  "/blog/category/article-manquant": {
    "destination": "/blog/category/pilier-cible",
    "reason": "Doublon, volume recherche faible"
  }
}
```

### Livrables
- [x] `DECISION-104-ARTICLES.md` (tableau complet avec décisions)
- [x] `ARTICLES-A-CREER.json` (si Option A choisie, specs complètes)
- [x] `REDIRECTIONS-404.json` (si Option B choisie, mapping)
- [x] Justification par article (pourquoi créer ou rediriger)

### Critères d'acceptation
- [x] CHAQUE article a une décision (Créer OU Rediriger)
- [x] Décisions justifiées (critères SEO documentés)
- [x] Si création : slugs/catégories définis MAINTENANT
- [x] Si redirection : piliers cibles identifiés
- [x] Validation Guillaume + Associée

### Scénarios de sortie

**Scénario A : Tout créer (104)**
→ Passer à TASK-404-04 (20-30h)

**Scénario B : Tout rediriger (104)**
→ Passer à TASK-404-05A (1-2h) puis TASK-404-05

**Scénario C : Mixte (ex: 30 créer, 74 rediriger)**
→ Passer à TASK-404-04 (6-9h) + TASK-404-05A (1h) puis TASK-404-05

### Risques
- ⚠️ Décision business difficile (temps vs SEO)
- ⚠️ Volume recherche peut être difficile à estimer
- 🟡 Peut révéler besoin de plus d'articles (ex: si concurrent en a 200)

### Notes
- Décision peut être révisée plus tard
- Commencer par Rouen (34) + Montpellier (33) = 67 articles (2/3 du total)
- Si hésitation sur 1 article → Rediriger (économie temps, toujours réversible)

---

## TASK-404-04 : Création Contenu Manquant (OPTIONNEL)

### Métadonnées
- **Priorité** : P2 (optionnel selon TASK-404-03)
- **Temps estimé** : 20-30h (104 articles) OU 6-9h (30 articles)
- **Assigné** : Associée (production contenu)
- **Type** : Content / Production
- **Dépendances** : TASK-404-02 (structure OK), TASK-404-03 (décision)
- **Bloque** : TASK-404-05 (correction liens doit inclure nouveau contenu)

### Objectif
Créer les articles manquants identifiés en TASK-404-03 avec :
- Qualité >= 8/10
- Slugs/catégories corrects (définis en 404-03)
- Frontmatter aligné avec structure harmonisée
- Maillage interne cohérent

### Contexte
- TASK-404-03 a décidé de créer X articles (X = 0 à 104)
- Slugs et catégories déjà définis (pas d'improvisation)
- Structure harmonisée en TASK-404-02 (base stable)
- Créer AVANT correction liens → sinon liens corrigés vers piliers au lieu du nouveau contenu

### Actions détaillées

#### 1. Préparer environnement (30min)
```bash
# Créer dossier de travail
mkdir -p .cursor/tasks/TASK-404-04/articles

# Copier specs depuis TASK-404-03
cp ARTICLES-A-CREER.json .cursor/tasks/TASK-404-04/

# Créer template article
cat > template-article.md << 'EOF'
---
title: "{TITLE}"
slug: "{SLUG}"
category: "{CATEGORY}"
meta_title: "{META_TITLE}"
meta_description: "{META_DESCRIPTION}"
h1: "{H1}"
type: satellite
publish_date: 2025-11-01
keywords:
  - {KEYWORD1}
  - {KEYWORD2}
---

# {H1}

{CONTENT}
EOF
```

#### 2. Production par batch (18-28h)
Stratégie : **10 articles par batch**

Batch 1 (Rouen 1-10) :
```bash
# Utiliser GPT/Claude pour génération
# OU rédaction manuelle
# Qualité >= 8/10 (critères Document Maître)

# Checklist par article :
- [ ] 1200-1600 mots
- [ ] Hyper-localisation (quartiers, acteurs, prix locaux)
- [ ] Zéro invention (données sourcées)
- [ ] FAQ complète (5-10 questions)
- [ ] Maillage interne (3-5 liens vers piliers)
- [ ] Frontmatter correct (slug/category depuis ARTICLES-A-CREER.json)
```

Répéter pour :
- Batch 2 : Rouen 11-20
- Batch 3 : Rouen 21-30
- Batch 4 : Rouen 31-34 + Montpellier 1-6
- ...
- Batch 11 : Autres villes (19 articles)

#### 3. Validation qualité (2-3h)
Par batch, vérifier :
```bash
# Frontmatter valide
node scripts/validate-frontmatter.mjs sites/rouen/content/blog/

# Maillage interne (pas de liens cassés dans nouveaux articles)
node scripts/check-blog-links.js sites/rouen/content/blog/

# Qualité rédaction (score >= 8/10)
# Critères :
# - Pertinence
# - Localisation
# - Exhaustivité
# - Maillage
```

#### 4. Commit par batch (30min total)
```bash
git add sites/rouen/content/blog/satellites/article-*.md
git commit -m "feat(rouen): Création batch 1/11 - 10 articles satellites (404-04)"
git push origin main

# Répéter pour 11 batchs
```

### Livrables
- [x] 104 articles créés (ou X selon décision 404-03)
- [x] Frontmatter aligné structure harmonisée
- [x] Qualité moyenne >= 8/10
- [x] Maillage interne cohérent (liens vers piliers)
- [x] Commits GitHub (11 commits, 1 par batch)
- [x] Rapport production (stats, temps réel, qualité)

### Critères d'acceptation
- [x] TOUS les articles définis en 404-03 créés
- [x] Frontmatter valide (validation script OK)
- [x] Aucun lien cassé dans nouveaux articles
- [x] Qualité validée (échantillon 10 articles >= 8/10)
- [x] Déployés sur sites (build OK)

### Optimisations
- Production IA (GPT-4/Claude) : 30min/article → 52h total (trop long)
- Production humaine : 15-20min/article → 26-35h total
- **Mixte recommandé** : IA génère brouillon, humain valide/améliore → 10-15min/article → 17-26h

### Risques
- 🔴 Temps peut exploser si qualité insuffisante (re-écriture)
- 🟠 Maillage interne peut créer nouveaux liens cassés (vérif stricte)
- 🟡 Frontmatter incorrect → URLs cassées (vérif avant commit)

### Notes
- **Si temps limité** : Créer seulement priorité HIGH (défini en 404-03)
- Reste peut être fait plus tard (ou jamais si redirections suffisent)
- Qualité > Quantité (mieux 30 articles 9/10 que 104 articles 6/10)

---

## TASK-404-05 : Correction Liens Internes Automatique

### Métadonnées
- **Priorité** : P0 (CRITIQUE pour maillage interne)
- **Temps estimé** : 4-6h
- **Assigné** : Guillaume
- **Type** : Refactor / Script automatique
- **Dépendances** : TASK-404-02 (structure OK), TASK-404-04 (contenu créé si applicable)
- **Bloque** : TASK-404-06, P1-404-07-404-redirections-externes-0%, TASK-404-08 (base propre nécessaire)

### Objectif
Corriger AUTOMATIQUEMENT les 963 liens internes cassés :
- 691 catégories incorrectes → bonnes catégories
- 192 variations slug → slugs réels
- 80 existants → slugs exacts
- 104 vers nouveau contenu (si TASK-404-04 fait)

### Contexte
- `VERIFICATION-ARTICLES.json` contient mapping EXACT de chaque correction
- 90.3% des liens cassés sont résolvables automatiquement
- Correction manuelle = impossible (963 liens × 11 villes)
- Script doit être SAFE (backup + vérif avant/après)

### Actions détaillées

#### 1. Créer script correction (2h)
Fichier : `scripts/fix-all-internal-links-404.mjs`

```javascript
#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Charger mapping depuis TASK-404-01
const verification = JSON.parse(
  fs.readFileSync('VERIFICATION-ARTICLES.json', 'utf8')
);

const CITIES = [
  'marseille', 'toulouse', 'lyon', 'bordeaux', 'nantes',
  'lille', 'nice', 'strasbourg', 'rouen', 'rennes', 'montpellier'
];

// Créer mapping corrections
const corrections = new Map();

// Type 1 : Catégories incorrectes (691)
verification.results.categoryIncorrecte.forEach(item => {
  const oldUrl = item.url;
  const newUrl = `/blog/${item.result.actualCategory}/${item.result.actualSlug || item.url.split('/').pop()}`;
  corrections.set(oldUrl, {
    newUrl,
    type: 'category_fix',
    city: item.city
  });
});

// Type 2 : Variations slug (192)
verification.results.slugVariation.forEach(item => {
  const oldUrl = item.url;
  const newUrl = `/blog/${item.result.actualCategory}/${item.result.actualSlug}`;
  corrections.set(oldUrl, {
    newUrl,
    type: 'slug_variation',
    city: item.city
  });
});

// Type 3 : Articles existants (80)
verification.results.articlesExistants.forEach(item => {
  const oldUrl = item.url;
  const newUrl = `/blog/${item.result.path.replace('.md', '')}`;
  corrections.set(oldUrl, {
    newUrl,
    type: 'exact_match',
    city: item.city
  });
});

// Type 4 : Nouveau contenu (si TASK-404-04 fait)
// Charger ARTICLES-A-CREER.json si existe
if (fs.existsSync('ARTICLES-A-CREER.json')) {
  const newArticles = JSON.parse(
    fs.readFileSync('ARTICLES-A-CREER.json', 'utf8')
  );
  
  Object.entries(newArticles).forEach(([oldUrl, spec]) => {
    const newUrl = `/blog/${spec.category}/${spec.slug}`;
    corrections.set(oldUrl, {
      newUrl,
      type: 'new_content',
      city: spec.city
    });
  });
}

console.log(`Total corrections à appliquer : ${corrections.size}`);

// Fonction correction dans fichier
function fixLinksInFile(filePath, cityCorrections) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changes = 0;
  
  cityCorrections.forEach((correction, oldUrl) => {
    const regex = new RegExp(
      `\\]\\(${oldUrl.replace(/\//g, '\\/')}\\)`,
      'g'
    );
    
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, `](${correction.newUrl})`);
      changes += matches.length;
      
      console.log(`  ✓ ${oldUrl} → ${correction.newUrl}`);
    }
  });
  
  if (changes > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
  
  return changes;
}

// Traiter chaque ville
let totalFixed = 0;
CITIES.forEach(city => {
  console.log(`\n📁 ${city.toUpperCase()}`);
  
  const blogPath = `sites/${city}/content/blog`;
  if (!fs.existsSync(blogPath)) {
    console.log(`  ⚠️  Pas de dossier blog`);
    return;
  }
  
  // Filtrer corrections pour cette ville
  const cityCorrections = new Map(
    Array.from(corrections).filter(([_, v]) => v.city === city)
  );
  
  console.log(`  ${cityCorrections.size} corrections à appliquer`);
  
  // Parcourir tous les fichiers markdown
  function processDir(dirPath) {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    items.forEach(item => {
      const fullPath = path.join(dirPath, item.name);
      
      if (item.isDirectory()) {
        processDir(fullPath);
      } else if (item.isFile() && item.name.endsWith('.md')) {
        const fixed = fixLinksInFile(fullPath, cityCorrections);
        totalFixed += fixed;
      }
    });
  }
  
  processDir(blogPath);
});

console.log(`\n✅ Total liens corrigés : ${totalFixed}`);
```

#### 2. Créer backup automatique (15min)
```bash
#!/bin/bash
# scripts/backup-before-404-fix.sh

BACKUP_DIR="backups/links-404-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📦 Backup des fichiers markdown..."

for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  if [ -d "sites/$city/content/blog" ]; then
    echo "  Backup $city..."
    cp -R "sites/$city/content/blog" "$BACKUP_DIR/$city-blog"
  fi
done

echo "✅ Backup créé : $BACKUP_DIR"
echo "$BACKUP_DIR" > .last-backup-404
```

#### 3. Validation avant exécution (30min)
Tests à faire sur 1 ville test (Rennes, petite) :

```bash
# Test 1 : Dry run
node scripts/fix-all-internal-links-404.mjs --dry-run --city rennes

# Test 2 : Vérifier changements proposés
# → Examiner manuellement 10 corrections

# Test 3 : Exécuter sur Rennes
bash scripts/backup-before-404-fix.sh
node scripts/fix-all-internal-links-404.mjs --city rennes

# Test 4 : Vérifier résultat
node scripts/analyze-404.mjs
# → Rennes devrait passer de 31 → ~0 liens cassés

# Test 5 : Build OK
cd sites/rennes && pnpm build
# → Aucune erreur
```

Si tests OK → Continuer. Sinon → Debug script.

#### 4. Exécution massive (1-2h)
```bash
# Backup complet
bash scripts/backup-before-404-fix.sh

# Exécuter sur 11 villes
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  echo "=== $city ==="
  node scripts/fix-all-internal-links-404.mjs --city $city
done

# OU en parallèle (plus rapide mais moins safe)
node scripts/fix-all-internal-links-404.mjs --all-cities
```

#### 5. Validation post-correction (1h)
```bash
# Re-run analyse
node scripts/analyze-404.mjs

# Attendu : 2125 → <100 liens cassés

# Vérif manuelle échantillon
# Checker 5 liens/ville (55 total) manuellement

# Build toutes villes
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  echo "=== Build $city ==="
  cd sites/$city && pnpm build && cd ../..
done

# Tous builds doivent passer ✅
```

#### 6. Commit par ville (30min)
```bash
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  git add sites/$city/content/blog/**/*.md
  
  # Stats corrections
  FIXES=$(git diff --cached sites/$city/ | grep -c "^-\[.*\](/blog/" || echo "0")
  
  git commit -m "fix($city): Correction massive liens internes - $FIXES liens (TASK-404-05)"
done

git push origin main
```

### Livrables
- [x] `scripts/fix-all-internal-links-404.mjs` (script correction)
- [x] `scripts/backup-before-404-fix.sh` (backup automatique)
- [x] Backup complet (`backups/links-404-YYYYMMDD-HHMMSS/`)
- [x] Commits GitHub (11 commits, 1 par ville)
- [x] `RAPPORT-CORRECTIONS-404.md` (stats, avant/après)
- [x] Tests validation (analyze-404.mjs + builds)

### Critères d'acceptation
- [x] Script créé et testé (dry-run OK)
- [x] Backup complet avant exécution
- [x] 963 liens corrigés (ou proche si TASK-404-04 pas faite)
- [x] Re-run analyze-404.mjs : <100 liens cassés (vs 2125 avant)
- [x] Build 11 villes : TOUS passent ✅
- [x] Validation manuelle échantillon : 55 liens OK
- [x] Code déployé + testé

### Scénarios d'erreur

**Si script crée erreurs** :
```bash
# Restaurer backup
LAST_BACKUP=$(cat .last-backup-404)
cp -R "$LAST_BACKUP"/* sites/

# Debug script
node scripts/fix-all-internal-links-404.mjs --debug --city rennes

# Fix + re-test
```

**Si builds échouent** :
```bash
# Identifier ville problème
cd sites/lyon && pnpm build
# → Erreur ligne X

# Checker correction problématique
grep -n "ligne X pattern" sites/lyon/content/blog/**/*.md

# Rollback ville si nécessaire
cp -R backups/links-404-*/lyon-blog sites/lyon/content/blog
```

### Risques
- 🔴 CRITIQUE : Script bugué → casse 1000+ fichiers (BACKUP OBLIGATOIRE)
- 🟠 Corrections incorrectes → liens toujours cassés (dry-run avant)
- 🟡 Builds échouent → rollback nécessaire

### Notes
- **DRY-RUN OBLIGATOIRE** sur ville test avant exécution massive
- Commits atomiques par ville (faciliter rollback)
- Garder backup 30 jours (au cas où régression découverte plus tard)

---

## TASK-404-06 : Validation Liens Internes

### Métadonnées
- **Priorité** : P0 (validation TASK-404-05)
- **Temps estimé** : 1h
- **Assigné** : Guillaume ou Associée
- **Type** : Validation / Tests
- **Dépendances** : TASK-404-05 (corrections faites)
- **Bloque** : Phase 4 (ne pas passer si liens cassés persistent)

### Objectif
Valider que les corrections TASK-404-05 ont fonctionné :
- 0 liens cassés (ou <50 résiduels acceptables)
- Aucune régression introduite
- Maillage interne 100% propre

### Contexte
- TASK-404-05 a corrigé ~963 liens automatiquement
- Besoin de validation indépendante (pas juste croire le script)
- Si >50 liens cassés persistent → rollback + debug

### Actions détaillées

#### 1. Re-run analyse complète (10min)
```bash
cd /Users/guillaumestehelin/moverz_main-2

# Analyse 404s
node scripts/analyze-404.mjs

# Export résultats
cp 404-analysis.json 404-analysis-POST-TASK-405.json

# Comparer avant/après
node scripts/compare-404-before-after.mjs \
  404-analysis.json \
  404-analysis-POST-TASK-405.json
```

**Attendu** :
- Avant : 2125 liens cassés
- Après : <100 liens cassés (idéalement <50)
- Réduction : ~95%

#### 2. Analyser liens cassés résiduels (20min)
```bash
# Extraire liens cassés restants
jq '.details[] | select(.brokenLinks | length > 0)' \
  404-analysis-POST-TASK-405.json \
  > liens-casses-residuels.json

# Catégoriser
node scripts/categorize-residual-404s.mjs
```

Types acceptables :
- Articles vraiment manquants (si TASK-404-04 pas faite)
- Liens vers piliers supprimés (OK si <10)
- Formats invalides (OK si <5)

Types NON acceptables (rollback nécessaire) :
- Catégories incorrectes (devrait être 0)
- Variations slug (devrait être 0)
- Liens vers articles existants (devrait être 0)

#### 3. Tests manuels échantillon (20min)
Sélectionner 3 villes (petite, moyenne, grosse) :
- Rennes (petite, 31 404s avant)
- Lyon (grosse, 481 404s avant)
- Bordeaux (moyenne, 216 404s avant)

Par ville :
```bash
# Build
cd sites/rennes && pnpm build

# Tests navigation :
# 1. Ouvrir article pilier
# 2. Cliquer 5 liens internes
# 3. Vérifier TOUS accessibles (pas de 404)

# Répéter pour Lyon et Bordeaux
```

#### 4. Vérif aucune régression (10min)
Comparer URLs générées avant/après :

```bash
# Générer liste URLs AVANT (depuis backup)
node scripts/list-all-blog-urls.mjs \
  --source backups/links-404-*/
  --output urls-before.txt

# Générer liste URLs APRÈS
node scripts/list-all-blog-urls.mjs \
  --source sites/
  --output urls-after.txt

# Comparer
diff urls-before.txt urls-after.txt
```

**Attendu** : AUCUNE différence (corrections liens ne change pas URLs générées)

Si différences → PROBLÈME (rollback)

### Livrables
- [x] `404-analysis-POST-TASK-405.json` (analyse post-correction)
- [x] `RAPPORT-VALIDATION-404-05.md` (résultats tests)
- [x] `liens-casses-residuels.json` (si <50 restants)
- [x] Screenshots tests manuels (3 villes)
- [x] Validation : ✅ ou ❌ (go/no-go pour Phase 4)

### Critères d'acceptation
- [x] Liens cassés : 2125 → <100 (réduction >= 95%)
- [x] Liens résiduels analysés et catégorisés
- [x] Tests manuels 3 villes : TOUS liens fonctionnent
- [x] Aucune régression URLs (diff vide)
- [x] Builds 11 villes : TOUS passent ✅
- [x] **GO pour Phase 4** : OUI ✅

### Scénarios de sortie

**Scénario A : Validation OK (<50 liens cassés, tous acceptables)**
→ GO Phase 4 (P1-404-07-404-redirections-externes-0%)

**Scénario B : Validation OK mais liens résiduels (50-100, acceptables)**
→ Documenter résiduels + GO Phase 4
→ Créer TASK-404-10 (optionnelle) pour traiter résiduels plus tard

**Scénario C : Échec validation (>100 liens cassés OU régressions)**
→ ROLLBACK TASK-404-05
→ Debug script
→ Re-exécuter TASK-404-05
→ Re-faire TASK-404-06

### Risques
- ⚠️ Faux positifs (script détecte liens cassés qui fonctionnent en prod)
- ⚠️ Résiduels non catégorisés (besoin analyse manuelle)
- 🟡 Tests manuels subjectifs (automatiser si possible)

### Notes
- Si doute sur résiduel → Tester en live (browser)
- Garder 404-analysis avant/après pour tracking historique
- Documenter TOUS les résiduels (même si acceptables)

---

## P1-404-07-404-redirections-externes-0% : Redirections 301 Externes (Search Console)

### Métadonnées
- **Priorité** : P1 (après liens internes propres)
- **Temps estimé** : 3-5h
- **Assigné** : Guillaume
- **Type** : SEO / Redirections
- **Dépendances** : TASK-404-06 (liens internes propres), TASK-404-05A (si pas création contenu)
- **Bloque** : TASK-404-09 (validation finale)

### Objectif
Ajouter redirections 301 pour URLs EXTERNES identifiées par :
- Analyse GPT (1541 URLs)
- Search Console (404s crawl Google)
- Backlinks cassés

Ces redirections sont DIFFÉRENTES des liens internes (déjà corrigés en TASK-404-05).

### Contexte
- Analyse GPT : 1541 erreurs externes
  - 800 anciennes structures URL
  - 500 pages blog supprimées
  - 200 accents mal encodés
  - 41 liens homepage cassés (traité en TASK-404-08)
- ~1014 redirections 301 déjà présentes (TASK-007)
- Besoin d'ajouter ~300-500 redirections supplémentaires

### Actions détaillées

#### 1. Réconcilier données GPT vs existantes (1h)
```bash
# Extraire redirections existantes
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  echo "=== $city ===" >> redirections-existantes.txt
  grep "source:" sites/$city/next.config.mjs >> redirections-existantes.txt
done

# Total existant
grep -c "source:" redirections-existantes.txt
# → Devrait être ~1014

# Comparer avec analyse GPT (1541)
# Écart = ~527 redirections manquantes
```

Créer liste URLs manquantes :
```json
{
  "anciennes-structures": [
    "/blog/demenagement-marseille-guide",
    "/blog/prix-demenagement-marseille-2024"
  ],
  "pages-supprimees": [
    "/blog/satellites/BATCH-article-12"
  ],
  "accents-mal-encodes": [
    "/blog/déménagement-étudiant-nice"
  ]
}
```

#### 2. Créer redirections par type (1-2h)

**Type A : Anciennes structures (800)**
Pattern :
```javascript
// sites/marseille/next.config.mjs
async redirects() {
  return [
    // ... existantes

    // ANCIENNES STRUCTURES (ajout P1-404-07-404-redirections-externes-0%)
    { 
      source: '/blog/demenagement-marseille-guide',
      destination: '/blog/demenageur-marseille/demenageur-marseille-guide',
      permanent: true 
    },
    { 
      source: '/blog/prix-demenagement-marseille-2024',
      destination: '/blog/prix-demenagement-marseille/prix-demenagement-marseille-guide-complet',
      permanent: true 
    }
  ];
}
```

**Type B : Pages supprimées (500)**
Pattern :
```javascript
// Wildcards pour BATCH/PILIER/PLACEHOLDER (déjà fait en TASK-007)
// Vérifier présence :
{ 
  source: '/blog/satellites/BATCH-:path*',
  destination: '/blog',
  permanent: true 
}

// Ajouter spécifiques si manquants
```

**Type C : Accents mal encodés (200)**
Pattern :
```javascript
{ 
  source: '/blog/déménagement-étudiant-nice',
  destination: '/blog/demenagement-etudiant-nice/demenagement-etudiant-nice-guide',
  permanent: true 
},
{ 
  source: '/blog/garde-meuble-marseille/tarifs-2024',
  destination: '/blog/garde-meuble-marseille/prix-garde-meuble-marseille-2025',
  permanent: true 
}
```

#### 3. Générer redirections automatiquement (30min)
Script :
```javascript
// scripts/generate-redirects-404-07.mjs

import fs from 'fs';

// Charger données GPT
const gptData = JSON.parse(fs.readFileSync('ANALYSE-GPT-404.json', 'utf8'));

// Charger redirections existantes
const existing = parseExistingRedirects('redirections-existantes.txt');

// Identifier manquantes
const missing = gptData.urls.filter(url => 
  !existing.some(e => e.source === url)
);

console.log(`Redirections manquantes : ${missing.length}`);

// Générer code next.config.mjs
const redirectsCode = missing.map(url => {
  const destination = findBestDestination(url);
  return `{ source: '${url}', destination: '${destination}', permanent: true }`;
}).join(',\n      ');

console.log(redirectsCode);

// Fonction intelligente pour trouver destination
function findBestDestination(oldUrl) {
  // 1. Essayer catégorie similaire
  // 2. Essayer pilier correspondant
  // 3. Fallback /blog
}
```

#### 4. Appliquer redirections (30min)
```bash
# Par ville, ajouter dans next.config.mjs

for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  echo "=== Applying redirects to $city ==="
  
  # Insérer redirections générées
  node scripts/insert-redirects.mjs \
    --city $city \
    --redirects redirections-404-07-$city.json
  
  # Vérif syntaxe
  cd sites/$city && pnpm build --dry-run
done
```

#### 5. Tests redirections (1h)
```bash
# Tester échantillon (20 URLs)

# Local (si serveur local up)
curl -I http://localhost:3000/blog/déménagement-étudiant-nice
# → Devrait retourner 308 avec Location: /blog/demenagement-etudiant-nice/...

# OU après deploy
curl -I https://devis-demenageur-marseille.fr/blog/prix-demenagement-marseille-2024
# → 308 vers nouvelle URL

# Répéter pour 20 URLs échantillon (2/ville)
```

#### 6. Commit + Deploy (30min)
```bash
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  git add sites/$city/next.config.mjs
  
  # Stats redirections
  REDIRECTS=$(grep -c "source:" sites/$city/next.config.mjs)
  
  git commit -m "feat($city): Ajout redirections 301 externes - Total: $REDIRECTS (P1-404-07-404-redirections-externes-0%)"
done

git push origin main

# Deploy via webhook CapRover (automatique)
```

### Livrables
- [x] `ANALYSE-GPT-404.json` (données GPT structurées)
- [x] `redirections-manquantes.json` (~300-500 URLs)
- [x] `scripts/generate-redirects-404-07.mjs` (script génération)
- [x] `next.config.mjs` modifié (11 villes)
- [x] Commits GitHub (11 commits)
- [x] Tests redirections (20 URLs validées)
- [x] `RAPPORT-REDIRECTIONS-404-07.md` (stats avant/après)

### Critères d'acceptation
- [x] ~1300-1500 redirections 301 ajoutées (total ~2314-2514)
- [x] Écart GPT (1541) vs implémenté expliqué
- [x] Tests échantillon : 20/20 redirections fonctionnent
- [x] Builds 11 villes : TOUS passent ✅
- [x] Déployé en production
- [x] Search Console vérifié (dans 7 jours) : 404s en baisse

### Patterns redirections

**Pattern 1 : Anciennes URLs → Nouvelles**
```javascript
'/blog/old-structure' → '/blog/category/new-slug'
```

**Pattern 2 : Accents → Slugs propres**
```javascript
'/blog/déménagement-nice' → '/blog/demenagement-nice/...'
```

**Pattern 3 : Pages supprimées → Piliers**
```javascript
'/blog/satellites/article-supprime' → '/blog/category/pilier-parent'
```

**Pattern 4 : Wildcards (nettoyage massif)**
```javascript
'/blog/autre-ville/:path*' → '/blog'
```

### Risques
- 🟠 Redirections peuvent ralentir site (trop nombreuses)
- 🟡 Fausses destinations (article inexistant)
- 🟡 Double redirects (A → B → C au lieu de A → C)

### Notes
- Tester redirections APRÈS deploy (local peut ne pas refléter prod)
- Garder trace anciennes URLs (pour tracking Search Console)
- Documenter POURQUOI chaque redirection (faciliter maintenance)

---

## TASK-404-08 : Audit + Fix Homepage 11 Villes

### Métadonnées
- **Priorité** : P1 (après redirections)
- **Temps estimé** : 2-3h
- **Assigné** : Guillaume ou Associée
- **Type** : Audit / Fix
- **Dépendances** : TASK-404-05 (liens internes OK), P1-404-07-404-redirections-externes-0% (redirections OK)
- **Bloque** : TASK-404-09 (validation finale)

### Objectif
Corriger les 41 liens cassés homepage identifiés par analyse GPT :
- Scraper homepages 11 villes
- Identifier liens cassés
- Corriger vers URLs validées (TASK-404-05/07)

### Contexte
- Analyse GPT : 41 liens homepage cassés
- Homepage = porte d'entrée #1 du site (CRITIQUE)
- Liens cassés homepage = très mauvaise UX
- Corrections TASK-404-05/07 déjà faites → destinations connues

### Actions détaillées

#### 1. Scraper homepages (30min)
```bash
# Script scraper
cat > scripts/scrape-homepage-links.mjs << 'EOF'
#!/usr/bin/env node

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const CITIES = [
  { name: 'marseille', url: 'https://devis-demenageur-marseille.fr' },
  { name: 'toulouse', url: 'https://devis-demenageur-toulouse.fr' },
  // ... 9 autres
];

const results = [];

for (const city of CITIES) {
  console.log(`Scraping ${city.name}...`);
  
  const response = await fetch(city.url);
  const html = await response.text();
  const $ = cheerio.load(html);
  
  const links = [];
  $('a[href^="/blog"]').each((i, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim();
    links.push({ href, text });
  });
  
  results.push({
    city: city.name,
    url: city.url,
    blogLinks: links,
    totalLinks: links.length
  });
}

console.log(JSON.stringify(results, null, 2));
EOF

# Exécuter
node scripts/scrape-homepage-links.mjs > homepage-links.json
```

#### 2. Identifier liens cassés (30min)
```bash
# Script vérification
node scripts/check-homepage-links.mjs

# Pour chaque lien homepage :
# 1. Vérifier si article existe (depuis VERIFICATION-ARTICLES.json)
# 2. Si non, vérifier si redirection existe (depuis next.config.mjs)
# 3. Si ni article ni redirection → CASSÉ
```

Créer liste :
```json
{
  "marseille": [
    {
      "href": "/blog/demenagement-marseille-guide",
      "text": "Guide déménagement",
      "status": "404",
      "correction": "/blog/demenageur-marseille/demenageur-marseille-guide"
    }
  ],
  "toulouse": [
    // ...
  ]
}
```

#### 3. Corriger homepages (1h)
Fichiers concernés :
- `app/page.tsx` (template global)
- `sites/marseille/app/page.tsx` (override si existe)
- Ou composants partagés (`components/Homepage.tsx`)

```typescript
// Exemple correction
// AVANT
<Link href="/blog/demenagement-marseille-guide">
  Guide déménagement
</Link>

// APRÈS
<Link href="/blog/demenageur-marseille/demenageur-marseille-guide/">
  Guide déménagement
</Link>
```

**ATTENTION** : Si template global → Corriger pour 11 villes en même temps

#### 4. Tests live (30min)
```bash
# Build + serve local
for city in marseille toulouse lyon; do
  echo "=== Testing $city ==="
  cd sites/$city
  pnpm build
  pnpm start &
  
  # Ouvrir browser
  open http://localhost:3000
  
  # Cliquer TOUS les liens blog homepage
  # Vérifier AUCUN 404
  
  # Tuer serveur
  pkill -f "next start"
  cd ../..
done
```

OU utiliser Playwright (automatisé) :
```javascript
// tests/homepage-links.spec.ts
import { test, expect } from '@playwright/test';

const CITIES = ['marseille', 'toulouse', ...];

CITIES.forEach(city => {
  test(`Homepage links - ${city}`, async ({ page }) => {
    await page.goto(`http://localhost:3000`);
    
    // Cliquer tous liens blog
    const blogLinks = await page.locator('a[href^="/blog"]').all();
    
    for (const link of blogLinks) {
      const href = await link.getAttribute('href');
      
      await link.click();
      await expect(page).not.toHaveURL(/.*404.*/);
      
      await page.goBack();
    }
  });
});
```

#### 5. Commit + Deploy (30min)
```bash
git add app/page.tsx sites/*/app/page.tsx components/Homepage.tsx

git commit -m "fix(homepage): Correction 41 liens cassés homepage - 11 villes (TASK-404-08)"

git push origin main

# Deploy automatique via webhook
```

### Livrables
- [x] `homepage-links.json` (scrape complet)
- [x] `homepage-broken-links.json` (41 liens identifiés)
- [x] `scripts/scrape-homepage-links.mjs` (script scraper)
- [x] `scripts/check-homepage-links.mjs` (script vérification)
- [x] Code homepage corrigé (11 villes)
- [x] Commits GitHub (1 commit global)
- [x] Tests validés (manuel ou Playwright)
- [x] `RAPPORT-HOMEPAGE-404-08.md`

### Critères d'acceptation
- [x] 41 liens cassés homepage identifiés
- [x] TOUS corrigés vers URLs valides
- [x] Tests live 3 villes : AUCUN lien cassé
- [x] Déployé en production
- [x] Vérif post-deploy : Homepages accessibles

### Cas particuliers

**Cas 1 : Lien vers article supprimé**
→ Rediriger vers pilier parent

**Cas 2 : Lien vers article créé en TASK-404-04**
→ Utiliser nouvelle URL

**Cas 3 : Lien vers URL externe (pas /blog)**
→ Ignorer (hors scope)

### Risques
- 🟠 Homepage template partagé → fix 1 fois mais impact 11 villes
- 🟡 Liens dynamiques (générés JS) plus difficiles à scraper
- 🟡 Cache CDN peut masquer corrections (invalidate cache)

### Notes
- Homepages peuvent avoir liens hardcodés OU générés dynamiquement
- Si dynamiques → Vérifier source données (ex: `lib/homepage-links.ts`)
- Scraper en production (pas local) pour voir vraie homepage

---

## TASK-404-09 : Validation Complète + Tests Live

### Métadonnées
- **Priorité** : P0 (validation finale)
- **Temps estimé** : 2-3h
- **Assigné** : Guillaume + Associée
- **Type** : Validation / Tests / QA
- **Dépendances** : TASK-404-05 à TASK-404-08 (TOUT terminé)
- **Bloque** : RIEN (tâche finale)

### Objectif
Valider que le projet 404 est 100% terminé :
- 0 liens cassés (ou <10 acceptables)
- Redirections 301 fonctionnent
- Homepage propre
- Search Console en amélioration
- Prêt pour fermeture TASK-001 et TASK-007

### Contexte
- 5 tâches complétées (404-01 à 404-08)
- État initial : 2125 liens cassés
- État attendu : <10 liens cassés
- Objectif : Validation indépendante complète

### Actions détaillées

#### 1. Re-run analyses complètes (30min)
```bash
cd /Users/guillaumestehelin/moverz_main-2

# Analyse 404s finale
node scripts/analyze-404.mjs

# Copier résultat
cp 404-analysis.json 404-analysis-FINAL.json

# Comparer évolution
node scripts/compare-404-evolution.mjs \
  404-analysis.json \              # Avant tout (2125)
  404-analysis-POST-TASK-405.json \ # Après liens internes (~100)
  404-analysis-FINAL.json           # Final (<10)

# Vérification articles manquants
node scripts/verify-real-missing-articles.mjs

# Export final
cp VERIFICATION-ARTICLES.json VERIFICATION-ARTICLES-FINAL.json
```

**Attendu** :
```
Évolution :
- Avant (29 oct) : 2125 liens cassés
- Après TASK-405 : <100 liens cassés (-95%)
- Final : <10 liens cassés (-99.5%)

Résolution : 2115+ liens sur 2125 (99.5%)
```

#### 2. Tests live 11 villes (1h)
Plan de test :

**Par ville (10min/ville) :**
```yaml
Ville: Marseille
URL: https://devis-demenageur-marseille.fr

Tests homepage:
  - [ ] Charger homepage → 200 OK
  - [ ] Cliquer 5 liens blog → TOUS accessibles
  - [ ] Vérifier aucun 404 visuel

Tests navigation blog:
  - [ ] Aller /blog → 200 OK
  - [ ] Ouvrir article pilier → 200 OK
  - [ ] Cliquer 10 liens internes → TOUS accessibles
  - [ ] Vérifier maillage interne fonctionne

Tests redirections:
  - [ ] Tester 3 anciennes URLs (depuis redirections-404-07)
  - [ ] Vérifier 308/301 → nouvelle URL
  - [ ] Vérifier destination accessible

Tests Search Console:
  - [ ] Ouvrir Search Console
  - [ ] Vérifier "Couverture" → 404s en baisse
  - [ ] Noter nouveaux 404s (si présents)
```

Répéter pour 11 villes.

**Résumé attendu** :
- 110 tests (10/ville × 11)
- Taux succès : >= 95% (104/110)
- Échecs acceptables : <6 (documentés)

#### 3. Crawl Screaming Frog (30min)
Ville test : Nice (la plus grosse, 119 articles)

```bash
# Lancer Screaming Frog
# URL : https://devis-demenageur-nice.fr
# Mode : Spider
# Profondeur : 3 niveaux

# Vérifier :
# - 0 erreurs 404 internes
# - 0 chaînes redirections (A → B → C)
# - Tous liens /blog accessibles
```

Exporter rapport :
- `screaming-frog-nice-FINAL.csv`

#### 4. Vérification Search Console (30min)
Pour 3 villes (Marseille, Lyon, Nice) :

```
Google Search Console → Couverture

Avant (29 oct) :
- Erreurs 404 : ~200-300/ville
- Tendance : Stable ou hausse

Après (01 nov + 7 jours) :
- Erreurs 404 : <50/ville (attendu)
- Tendance : Baisse
```

**Note** : Search Console met 7-14 jours à refléter changements

Documenter :
```json
{
  "marseille": {
    "avant": { "404s": 280, "date": "2025-10-29" },
    "apres": { "404s": 35, "date": "2025-11-08" },
    "reduction": "87.5%"
  }
}
```

#### 5. Documentation finale (30min)
Créer `RAPPORT-FINAL-RESOLUTION-404.md` :

```markdown
# 🎊 RÉSOLUTION 404 - RAPPORT FINAL

## Résumé exécutif

**Période** : 29 octobre - 8 novembre 2025 (10 jours)

**Objectif** : Résoudre 2125 liens cassés (analyse 29 oct)

**Résultat** : 2115 liens résolus (99.5%)

## Détails par phase

### Phase 1 : Audit & Harmonisation (3h)
- TASK-404-01 : Mapping structure 11 villes ✅
- TASK-404-02 : Harmonisation technique ✅

### Phase 2 : Décision & Création (optionnel)
- TASK-404-03 : Décision 104 articles ✅
- TASK-404-04 : Création contenu [OUI/NON]

### Phase 3 : Correction Massive (5h)
- TASK-404-05 : Correction 963 liens internes ✅
- TASK-404-06 : Validation liens internes ✅

### Phase 4 : Externe & Homepage (6h)
- P1-404-07-404-redirections-externes-0% : Redirections 301 (1300+) ✅
- TASK-404-08 : Fix homepage (41 liens) ✅

### Phase 5 : Validation (3h)
- TASK-404-09 : Tests complets ✅

## Métriques avant/après

| Métrique | Avant | Après | Delta |
|----------|-------|-------|-------|
| Liens cassés internes | 2125 | <10 | -99.5% |
| Redirections 301 | 1014 | 2314+ | +128% |
| Homepages propres | 0/11 | 11/11 | +100% |
| Articles créés | N/A | X | - |

## Impact SEO attendu

**Court terme (J+7-14)** :
- Search Console 404s : -70-90%
- Crawl budget : +30-40%

**Moyen terme (J+30-60)** :
- Positions moyennes : +10-15%
- Trafic organique : +15-25%

**Long terme (J+90+)** :
- Autorité domaine consolidée
- Maillage interne optimisé
- Base technique solide

## Fichiers livrés

- Analyses : 404-analysis-FINAL.json, VERIFICATION-ARTICLES-FINAL.json
- Scripts : 15 scripts créés/modifiés
- Documentation : 9 rapports détaillés
- Commits : 30+ commits (11 villes)

## Recommandations post-projet

1. Monitorer Search Console (hebdomadaire, 4 semaines)
2. Re-run analyze-404.mjs (mensuel)
3. Créer alertes 404s (>10 = investigation)
4. Documenter process pour futures villes

## Conclusion

✅ Projet RÉUSSI : 99.5% résolution
⏱️ Temps réel : XX heures (vs YY estimées)
🎯 Objectif atteint : Maillage interne 100% propre

**Tâches à archiver** :
- TASK-001 (remplacée par 404-01 à 404-09)
- TASK-007 (intégrée dans 404-07)

**Prochaines étapes** :
- Monitoring continu (4 semaines)
- Optionnel : TASK-404-04 (si pas faite)
```

### Livrables
- [x] `404-analysis-FINAL.json` (analyse finale)
- [x] `VERIFICATION-ARTICLES-FINAL.json` (vérification finale)
- [x] Tests live 11 villes (rapport)
- [x] Screaming Frog rapport (Nice)
- [x] Search Console metrics (3 villes)
- [x] `RAPPORT-FINAL-RESOLUTION-404.md` (complet)
- [x] Screenshots validation
- [x] Présentation résultats (slides ou doc)

### Critères d'acceptation
- [x] Liens cassés : <10 (vs 2125 avant)
- [x] Tests live : 95%+ succès (104/110)
- [x] Screaming Frog : 0 erreurs 404 internes
- [x] Search Console : Tendance baisse confirmée
- [x] Rapport final documenté
- [x] Validation Guillaume + Associée ✅

### Scénarios de sortie

**Scénario A : Validation complète (99%+ résolution)**
→ Archiver TASK-001 et TASK-007
→ Fermer projet 404
→ Monitoring passif (mensuel)

**Scénario B : Validation partielle (95-99% résolution, <50 résiduels)**
→ Documenter résiduels
→ Créer TASK-404-10 (optionnelle) pour résiduels
→ Archiver TASK-001 et TASK-007
→ Monitoring actif (hebdomadaire, 4 semaines)

**Scénario C : Échec validation (<95% résolution, >50 résiduels)**
→ Investigation approfondie résiduels
→ Identifier phase problématique
→ Re-exécuter phase concernée
→ Re-faire TASK-404-09

### Risques
- ⚠️ Search Console peut mettre >14 jours (résultats incomplets)
- 🟡 Tests live subjectifs (automatiser avec Playwright si possible)
- 🟡 Nouveaux 404s peuvent apparaître (contenu dynamique)

### Notes
- Tests live = critique (ne pas se fier qu'aux scripts)
- Documenter TOUS les résiduels (même si <10)
- Garder accès Search Console 3 mois (tracking long terme)
- Présenter résultats visuellement (graphiques évolution)

---

**FIN DOCUMENTATION DÉTAILLÉE**

*Ces 9 tâches remplacent TASK-001 et TASK-007 dans le BACKLOG.*


