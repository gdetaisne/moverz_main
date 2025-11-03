# 🚨 ZONES DE RISQUE - Prévention des Bugs Récurrents

**Pour Cursor** : Ce document liste les zones critiques qui causent systématiquement des bugs.

**Avant de modifier du code, vérifie si tu touches à une de ces zones.**

---

## 🔴 ZONE À RISQUE #1 : Villes Hardcodées

### 📊 Impact : CRITIQUE (UX + SEO)

**Bug le plus fréquent** : Ville hardcodée au lieu de cityData dynamique

### 🐛 Exemples réels de bugs

```typescript
// ❌ BUG : Toulouse affiche "Lille"
title: "Quartiers & communes — Déménagement à Lille | IA & transparence"

// ❌ BUG : Strasbourg utilise quartiers de Bordeaux
neighborhoods: [
  { slug: 'chartrons', name: 'Chartrons' },  // Quartier de Bordeaux !
  { slug: 'saint-pierre', name: 'Saint-Pierre' }
]

// ❌ BUG : Canonical pointe vers mauvaise ville
canonical: getCanonicalUrl('quartiers-lille')  // Dans site Toulouse !
```

**Conséquence** :
- Utilisateur confus (voit mauvaise ville)
- Google pénalise (contenu incohérent)
- Canonical pointe vers 404
- Perte de ranking

---

### ✅ Solution : TOUJOURS utiliser cityData

```typescript
// ✅ CORRECT : Import cityData
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';

// ✅ CORRECT : Résoudre la ville dynamiquement
const city = getCityDataFromUrl(env.SITE_URL);

// ✅ CORRECT : Utiliser city.nameCapitalized
title: `Quartiers & communes — Déménagement à ${city.nameCapitalized} | IA & transparence`

// ✅ CORRECT : Utiliser city.neighborhoods
neighborhoods: city.neighborhoods

// ✅ CORRECT : Canonical dynamique
canonical: getCanonicalUrl(`quartiers-${city.slug}`)
```

---

### 🔍 Comment détecter (checklist Cursor)

**Avant de commit, scanner le code pour** :

```bash
# Détecter hardcoded city names
grep -r "à Lille" sites/*/app/ | grep -v sites/lille
grep -r "à Nice" sites/*/app/ | grep -v sites/nice
grep -r "à Lyon" sites/*/app/ | grep -v sites/lyon
# etc.

# Détecter quartiers hardcodés
grep -r "Chartrons\|Vieux-Port\|Capitole" sites/*/app/ --include="*.tsx"

# Détecter canonical hardcodé
grep -r "quartiers-lille\|quartiers-nice" sites/*/app/ --include="*.tsx"
```

**Si 1+ résultat (hors ville concernée)** → BUG

---

### 🛡️ Prévention (règles Cursor)

**AVANT d'écrire du code avec une ville** :

1. ⚠️ **Est-ce hardcodé ou dynamique ?**
   - Hardcodé → STOP, utiliser cityData
   
2. ⚠️ **Si je copie depuis une autre ville** :
   - Chercher toutes références à l'ancienne ville
   - Remplacer par city.nameCapitalized / city.slug
   
3. ⚠️ **Tester sur 2+ villes**
   - Vérifier que chaque ville affiche ses propres données

---

## 🟠 ZONE À RISQUE #2 : Sync Multi-Sites Oublié

### 📊 Impact : CRITIQUE (Code désynchronisé)

**Bug** : Modification dans 1 site, 10 autres ont ancienne version

### 🐛 Scénario réel

```
Session 1 :
- Cursor fixe bug dans sites/nice/lib/cityData.ts
- Cursor commit + push
- ✅ Nice OK

Session 2 (lendemain) :
- Même bug découvert dans Lyon
- Cursor re-fixe dans Lyon
- → Perte de temps (déjà fixé hier)
```

**Root cause** : Cursor a oublié de sync Nice → 10 autres villes

---

### ✅ Solution : Scripts de sync

**Fichiers à sync manuellement** :

| Fichier modifié | Script à run | Villes affectées |
|-----------------|--------------|------------------|
| `lib/*.ts` | Copie manuelle 11x | 11 villes |
| `components/*.tsx` | `./scripts/sync/sync-components.sh` | 11 villes |
| `Dockerfile` | `./scripts/sync/sync-config-files.sh` | 11 villes |
| Config (tsconfig, etc.) | `./scripts/sync/sync-config-files.sh` | 11 villes |
| `content/blog/*.md` | Aucun (spécifique) | 1 ville |
| `app/*.tsx` pages | Aucun (spécifique) | 1 ville |

---

### 🔍 Comment détecter

**Cursor DOIT vérifier à la fin de chaque tâche** :

```markdown
📋 Checklist Sync Multi-Sites

Fichiers modifiés dans cette tâche :
- sites/nice/lib/cityData.ts
- sites/nice/components/Hero.tsx

Questions :
□ Ces fichiers sont-ils partagés entre villes ?
  → OUI (lib/ et components/)

□ Ai-je copié sur les 10 autres villes ?
  → Cursor doit demander à l'utilisateur

□ Ai-je run les scripts sync ?
  → ./scripts/sync/sync-components.sh

□ Ai-je testé sur 2+ villes ?
  → Nice + Lyon minimum
```

---

### 🛡️ Prévention

**Workflow OBLIGATOIRE pour code partagé** :

```
1. Modifier dans 1 site (ex: Nice)
   ↓
2. Tester que ça fonctionne (Nice)
   ↓
3. STOP - Checklist sync :
   □ Fichier dans lib/ ou components/ ?
   → SI OUI : Continuer
   → SI NON : Skip sync
   ↓
4. Copier sur les 10 autres sites
   Options :
   - Script sync si disponible
   - OU copie manuelle 10x
   ↓
5. Tester sur 2+ autres villes (Lyon, Marseille)
   ↓
6. Commit (noter dans message "11 villes")
   ↓
7. Push
```

**Message commit type** :
```
fix(lib): Correction cityData trailing slash (11 villes)

- Remove trailing slash from siteUrl
- getCanonicalUrl() handles it automatically
- Tested: Nice, Lyon, Marseille

Sites: all 11 cities updated
```

---

## 🟠 ZONE À RISQUE #3 : Canonicals & SEO

### 📊 Impact : BUSINESS CRITICAL

**Canonical = URL que Google doit indexer**

Mauvais canonical = Google confus = Perte de ranking = Perte d'€€€

---

### 🐛 Bugs SEO critiques possibles

#### Bug #1 : Canonical sans trailing slash
```html
❌ <link rel="canonical" href="https://site.fr/page">
✅ <link rel="canonical" href="https://site.fr/page/">
```
**Impact** : Google voit 2 URLs différentes → Duplicate content

#### Bug #2 : Canonical pointe vers 404
```typescript
❌ canonical: getCanonicalUrl('quartiers-lille')  // Dans site Nice
→ Génère : https://devis-demenageur-nice.fr/quartiers-lille/ (404!)
```
**Impact** : Google ne peut pas indexer

#### Bug #3 : Canonical pointe vers mauvais domaine
```typescript
❌ siteUrl: 'https://devis-demenageur-bordeaux.fr'
   Mais domaine réel: https://www.bordeaux-demenageur.fr
→ Canonical incorrect
```
**Impact** : Google indexe mauvaise URL

#### Bug #4 : Canonical inconsistant
```
Page A canonical → https://site.fr/page/
Page B lien vers → https://site.fr/page (sans slash)
```
**Impact** : Signaux SEO dilués

---

### ✅ Règles strictes

**1. Helper centralisé UNIQUEMENT** :

```typescript
// ✅ TOUJOURS utiliser le helper
import { getCanonicalUrl } from '@/lib/canonical-helper';

export const metadata: Metadata = {
  alternates: {
    canonical: getCanonicalUrl('partenaires'),
  }
};
```

**2. JAMAIS construire canonical manuellement** :

```typescript
❌ canonical: `${env.SITE_URL}/partenaires/`
❌ canonical: `https://devis-demenageur-nice.fr/page/`
✅ canonical: getCanonicalUrl('partenaires')
```

**3. Trailing slash PARTOUT** :

- URLs internes : `href="/blog/prix/"`
- Links : `<Link href="/contact/">`
- Canonicals : Automatique via helper

**4. Tester après toute modification** :

```bash
# Vérifier canonical dans HTML
curl -s https://devis-demenageur-nice.fr/quartiers-nice/ | grep canonical

# Attendu :
<link rel="canonical" href="https://devis-demenageur-nice.fr/quartiers-nice/"/>
```

---

### 🛑 RED FLAGS - STOP immédiatement

**Si tu vois ça dans une demande** :

```
🚨 "Modifier getCanonicalUrl()"
🚨 "Changer la logique des canonicals"
🚨 "Retirer le trailing slash"
🚨 "Construire canonical manuellement"
```

**Action Cursor** :
```
⚠️ STOP - Modification Canonical

Les canonicals sont BUSINESS CRITICAL.
Mauvais canonical = Perte de ranking = Perte d'€€€

Avant de continuer :
1. Comprends-tu l'impact SEO ?
2. As-tu une très bonne raison ?
3. As-tu prévu de tester sur GSC ?

Cette modification doit être validée par Guillaume.
Continue ? (Oui/Non)
```

---

## 🟡 ZONE À RISQUE #4 : Dockerfile & Déploiement

### 📊 Impact : MOYEN (Bugs déploiement)

**Bug** : Configuration CapRover incorrecte → Site affiche mauvaises données

---

### 🐛 Problèmes récurrents

#### Problème #1 : SITE_URL incorrect dans Dockerfile

```dockerfile
# Nice Dockerfile
ARG SITE_URL=https://devis-demenageur-nice.fr/  ✅ Correct

# Mais si copié dans Lyon sans changer :
ARG SITE_URL=https://devis-demenageur-nice.fr/  ❌ BUG !
→ Lyon affiche données de Nice
```

#### Problème #2 : Dockerfile désynchronisé

```
Nice Dockerfile : 60 lignes, cache invalidation, timestamps
Bordeaux Dockerfile : 55 lignes, pas de timestamps
→ Comportements différents
```

#### Problème #3 : ENV variable manquante CapRover

```
CapRover app dd-nice :
- SITE_URL non défini
→ Fallback vers default Dockerfile (mauvaise ville possible)
```

---

### ✅ Règles strictes

**1. Modifier Dockerfile = Via template UNIQUEMENT** :

```bash
# ❌ NE JAMAIS FAIRE
vim sites/nice/Dockerfile

# ✅ FAIRE
vim .templates/Dockerfile.template
./scripts/sync/sync-config-files.sh
```

**Raison** : Garantit que les 11 Dockerfiles restent identiques

**2. SITE_URL DOIT être cohérent** :

```
Dockerfile ARG SITE_URL
  ↓
DOIT correspondre à
  ↓
cityData.ts siteUrl
  ↓
DOIT correspondre à
  ↓
CapRover ENV SITE_URL
```

**Si incohérence** → Site affiche mauvaises données

**3. Tester déploiement** :

```bash
# Après modif Dockerfile
1. Build local : docker build -t test-nice sites/nice/
2. Run local : docker run -p 3000:3000 -e SITE_URL=... test-nice
3. Test : curl http://localhost:3000/ | grep "Nice"
4. Si OK → Push
```

---

### 🔍 Comment détecter

**Avant de modifier Dockerfile** :

```
□ Ai-je modifié .templates/Dockerfile.template ?
  → Si NON, STOP (ne jamais modifier direct)
  
□ Ai-je run sync-config-files.sh ?
  → Si NON, les 11 villes sont désynchronisées
  
□ SITE_URL est-il cohérent partout ?
  → Vérifier Dockerfile vs cityData.ts vs CapRover
```

---

## 🟠 ZONE À RISQUE #5 : Blog Cross-Contamination

### 📊 Impact : CRITIQUE (UX + SEO)

**Bug** : Site ville A affiche blog de ville B

### 🐛 Cause root

**`lib/blog.ts` utilise `resolveTenantSlug()`** :

```typescript
function resolveTenantSlug(): string {
  // 1. Essaie SITE_SLUG (env variable)
  const fromEnv = process.env.SITE_SLUG;
  if (CITY_SLUGS.includes(fromEnv)) return fromEnv;
  
  // 2. Parse SITE_URL
  const url = new URL(env.SITE_URL);
  const host = url.hostname;
  
  // 3. Cherche ville dans hostname
  const found = CITY_SLUGS.find(slug => host.includes(slug));
  if (found) return found;
  
  // 4. Fallback Toulouse
  return 'toulouse';
}
```

**Si SITE_URL est incorrect** → Résout mauvaise ville → Charge mauvais blog

---

### 🚨 Scénarios à risque

#### Scénario #1 : Variable ENV manquante
```
CapRover dd-nice : SITE_URL non défini
→ Fallback Dockerfile : SITE_URL=https://...-nice.fr/
→ Mais si Dockerfile mal synchro...
→ Nice charge blog Toulouse
```

#### Scénario #2 : Dockerfile copié sans changer SITE_URL
```
1. Cursor copie Nice Dockerfile → Lyon
2. Cursor oublie de changer SITE_URL
3. Lyon Dockerfile : ARG SITE_URL=https://...-nice.fr/
4. → Lyon affiche blog Nice
```

#### Scénario #3 : cityData.ts incorrect
```
cityData.nice.siteUrl = "https://mauvaise-url.fr"
→ Fonction resolveTenantSlug() ne trouve pas "nice" dans URL
→ Fallback Toulouse
→ Nice affiche blog Toulouse
```

---

### ✅ Prévention

**Checklist OBLIGATOIRE avant finaliser tâche** :

```
Si j'ai touché à :
- Dockerfile
- lib/env.ts
- lib/cityData.ts
- lib/blog.ts

ALORS :
□ SITE_URL cohérent partout ?
  - Dockerfile ARG
  - cityData.ts siteUrl
  - CapRover ENV

□ Testé localement ?
  - Site charge son propre blog
  - Pas de blog d'une autre ville

□ Testé en prod (si déployé) ?
  - curl https://site.fr/blog/ | grep "Nice" (ville attendue)
```

---

## 🟡 ZONE À RISQUE #6 : Internal Linking Cassé

### 📊 Impact : SEO MOYEN/ÉLEVÉ

**Bug** : Liens internes pointent vers 404

### 🐛 Causes

#### Cause #1 : Catégorie incorrecte
```markdown
❌ [Article](/blog/demenagement/article-slug/)
Mais article est dans /blog/prix/
→ 404
```

#### Cause #2 : Slug incorrect
```markdown
❌ [Article](/blog/prix/prix-demenagement-nice/)
Mais slug réel : prix-demenagement-nice-2025
→ 404
```

#### Cause #3 : Trailing slash inconsistant
```markdown
❌ [Article](/blog/prix/article)    ← Sans slash
Page canonical : /blog/prix/article/  ← Avec slash
→ URLs différentes, signaux SEO dilués
```

---

### ✅ Règles

**1. TOUJOURS trailing slash dans liens** :

```markdown
✅ [Article](/blog/prix/article/)
✅ [Contact](/contact/)
✅ [Service](/services/demenagement-standard-nice/)
```

**2. Vérifier slug/catégorie avant de linker** :

```typescript
// Avant de créer un lien, vérifier que l'article existe
const articleExists = await checkArticleExists('/blog/prix/article/');
if (!articleExists) {
  console.warn('⚠️ Article introuvable, lien cassé !');
}
```

**3. Tester les liens après modification** :

```bash
# Analyser 404s
node scripts/analysis/analyze-404.mjs

# Si nouveaux 404s → Liens cassés
```

---

## 🟡 ZONE À RISQUE #7 : Metadata Dynamiques

### 📊 Impact : SEO MOYEN

**Bug** : Metadata hardcodées au lieu de dynamiques

### 🐛 Exemple

```typescript
// ❌ Page services/contact avec metadata hardcodée
export const metadata: Metadata = {
  title: "Contact — Déménagement Lille",
  description: "Contactez Moverz à Lille..."
};

// Copié dans sites/toulouse/ sans changer
→ Toulouse affiche "Lille" dans title
```

---

### ✅ Solution

```typescript
// ✅ Metadata dynamique
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';

const city = getCityDataFromUrl(env.SITE_URL);

export const metadata: Metadata = {
  title: `Contact — Déménagement ${city.nameCapitalized}`,
  description: `Contactez Moverz à ${city.nameCapitalized}...`,
};
```

---

## 🟢 ZONE À RISQUE #8 : Organisation Fichiers

### 📊 Impact : FAIBLE (Encombrement)

**Bug** : Fichiers créés n'importe où, racine polluée

### 🐛 Exemples réels

```
/ (racine projet)
├── 404-analysis.json              ❌ Devrait être dans .cursor/archives/
├── VERIFICATION-ARTICLES.json     ❌ Devrait être dans .cursor/tasks/
├── .fix-snippet.ts                ❌ Fichier temporaire à supprimer
└── scripts-audit-report.csv       ❌ Devrait être dans .cursor/archives/
```

---

### ✅ Règles de rangement

| Type de fichier | Où le mettre |
|-----------------|--------------|
| Config projet | Racine `/` (package.json, tsconfig, etc.) |
| Analyse temporaire | `.cursor/archives/analyses/` |
| Livrable de tâche | `.cursor/tasks/[PX]-TASK-XXX/` |
| Script | `scripts/{categorie}/` |
| Documentation tâche | `.cursor/tasks/[PX]-TASK-XXX/` |
| Fichier temporaire | **SUPPRIMER** ou .gitignore |

---

### 🔍 Checklist création fichier

**Avant de créer un fichier, Cursor DOIT** :

```
□ Quel est le type de ce fichier ?
  - Config → Racine
  - Analyse → .cursor/archives/analyses/
  - Livrable tâche → .cursor/tasks/TASK-XXX/
  - Script → scripts/
  - Temporaire → Ne pas créer (ou .gitignore)

□ Est-ce que ça pollue la racine ?
  - Si OUI → Trouver meilleur emplacement

□ Est-ce que c'est temporaire ?
  - Si OUI → .gitignore ou ne pas créer
```

---

## 📋 RÉCAPITULATIF - Zones à Surveiller

### 🔴 CRITIQUE (Business impact)
1. **Villes hardcodées** → Toujours cityData dynamique
2. **Sync multi-sites oublié** → Scripts sync + test 2+ villes
3. **Canonicals cassés** → Helper uniquement, jamais manuel

### 🟠 IMPORTANT (SEO impact)
4. **Dockerfile inconsistant** → Via template + sync
5. **Blog cross-contamination** → SITE_URL cohérent partout
6. **Internal linking cassé** → Trailing slash + vérifier slugs

### 🟡 NORMAL (Organisation)
7. **Metadata hardcodées** → cityData dynamique
8. **Fichiers mal rangés** → Respecter structure

---

## 🎯 Pour Cursor : Checklist Avant Commit

```
AVANT de finaliser une tâche, vérifier :

□ Ai-je hardcodé une ville ?
  → Chercher "Lille", "Nice", "Lyon" dans mon code

□ Ai-je modifié lib/ ou components/ ?
  → Ai-je synché sur les 11 sites ?

□ Ai-je touché aux canonicals ?
  → Ai-je utilisé getCanonicalUrl() uniquement ?

□ Ai-je modifié Dockerfile ?
  → Ai-je utilisé le template + sync ?

□ Ai-je créé des fichiers ?
  → Sont-ils au bon endroit ?

□ Ai-je testé sur 2+ villes ?
  → Nice + Lyon minimum

Si 1+ réponse problématique :
→ STOP et corriger avant de commit
```

---

*Créé le : 2025-11-02*  
*Basé sur analyse bugs récurrents TASK-006, TASK-012, projet 404*

