# 🏗️ ARCHITECTURE MULTI-SITES - Guide Technique Complet

**Pour Cursor** : Comprendre l'architecture avant de modifier du code.

---

## 📊 VUE D'ENSEMBLE

### Vous avez 11 sites Next.js indépendants

```
moverz_main-2/ (Monorepo)
├── sites/
│   ├── nice/          ← Site Next.js complet
│   ├── lyon/          ← Site Next.js complet
│   ├── marseille/     ← Site Next.js complet
│   ├── toulouse/      ← Site Next.js complet
│   ├── bordeaux/      ← Site Next.js complet
│   ├── lille/         ← Site Next.js complet
│   ├── nantes/        ← Site Next.js complet
│   ├── strasbourg/    ← Site Next.js complet
│   ├── rennes/        ← Site Next.js complet
│   ├── rouen/         ← Site Next.js complet
│   └── montpellier/   ← Site Next.js complet
│
├── components/        ← Template source (copié vers sites/)
├── lib/               ← Libs source (copié vers sites/)
├── scripts/           ← Scripts utilitaires
└── .templates/        ← Templates configs (Dockerfile, etc.)
```

---

## 🔄 ARCHITECTURE : Duplication avec Sync Manuel

### ⚠️ IMPORTANT : Ce n'est PAS un vrai monorepo

**Monorepo classique** :
```typescript
// App import depuis package partagé
import { cityData } from '@moverz/shared-lib';
```

**Votre architecture** :
```typescript
// Chaque site a SA PROPRE COPIE de cityData
import { cityData } from '@/lib/cityData';  // Fichier local dans sites/nice/lib/
```

---

### 📁 Structure d'un site (exemple Nice)

```
sites/nice/
├── app/                       ← Pages Next.js (spécifiques Nice)
│   ├── page.tsx              (homepage)
│   ├── blog/[category]/      (blog Nice)
│   ├── services/             (services Nice)
│   └── quartiers-nice/       (quartiers Nice)
│
├── components/                ← Composants UI (COPIÉS depuis /components/)
│   ├── Hero.tsx              (identique 11 villes)
│   ├── LeadForm.tsx          (identique 11 villes)
│   └── ...
│
├── lib/                       ← Logique métier (COPIÉS depuis /lib/)
│   ├── cityData.ts           ⚠️ COPIE (contient 11 villes)
│   ├── canonical-helper.ts   ⚠️ COPIE
│   ├── blog.ts               ⚠️ COPIE (résout ville via SITE_URL)
│   ├── env.ts                (config env Nice)
│   └── ...
│
├── content/                   ← Contenu blog (SPÉCIFIQUE Nice)
│   └── blog/
│       ├── prix/             (articles Nice)
│       ├── garde-meuble/     (articles Nice)
│       └── satellites/       (60 satellites Nice)
│
├── public/                    ← Images (SPÉCIFIQUES Nice)
│   └── images/quartiers/nice/
│
├── Dockerfile                 ← Config Docker (COPIÉ via template)
├── captain-definition         ← Config CapRover
├── package.json               ← Dependencies (similaire 11 villes)
└── next.config.js             ← Config Next.js
```

---

## 🔄 WORKFLOW : Comment les Sites Restent Synchronisés

### 1️⃣ **Code Partagé (lib/, components/)**

**Source de vérité** :
- `/components/` → Composants template
- `/lib/` → Libs template
- `/.templates/` → Configs (Dockerfile, tsconfig, etc.)

**Distribution** : MANUELLE via scripts

```bash
# Modifier Hero.tsx dans template
vim components/Hero.tsx

# Synchroniser sur les 11 sites
./scripts/sync/sync-components.sh

# Résultat : sites/*/components/Hero.tsx tous identiques
```

**⚠️ PROBLÈME** :
- Si Cursor modifie `sites/nice/components/Hero.tsx` directement
- Et oublie de sync
- → 10 autres sites ont ancienne version

---

### 2️⃣ **Code Spécifique (app/, content/)**

**Chaque ville a son propre** :
- Pages (`app/`)
- Contenu blog (`content/blog/`)
- Images (`public/images/`)

**Pas de sync** : Chaque ville est indépendante

---

### 3️⃣ **Déploiement CapRover**

```
GitHub Repo (moverz_main)
    ↓
CapRover lit captain-definition
    ↓
11 Apps CapRover :
- dd-nice      → sites/nice/captain-definition → sites/nice/Dockerfile
- dd-lyon      → sites/lyon/captain-definition → sites/lyon/Dockerfile
- dd-marseille → sites/marseille/captain-definition → sites/marseille/Dockerfile
- ... (8 autres)
    ↓
11 Containers Docker indépendants
    ↓
11 Domaines :
- https://devis-demenageur-nice.fr
- https://devis-demenageur-lyon.fr
- https://www.bordeaux-demenageur.fr
- ... (8 autres)
```

**⚠️ CHAQUE APP** :
- Build indépendant
- Variables ENV propres (SITE_URL différent)
- Container indépendant
- Domaine propre

---

## 🎯 RÉSOLUTION DE VILLE (Comment ça marche)

### Chaîne de résolution

```
1. SITE_URL (variable ENV)
   ↓
2. getCityDataFromUrl(SITE_URL)
   ↓
3. Parse hostname → Extrait ville
   ↓
4. Retourne cityData[ville]
   ↓
5. App utilise city.nameCapitalized, city.slug, etc.
```

### Exemple concret (Nice)

```typescript
// 1. Dockerfile ou CapRover ENV
SITE_URL=https://devis-demenageur-nice.fr/

// 2. lib/env.ts valide et expose
env.SITE_URL = "https://devis-demenageur-nice.fr/"

// 3. getCityDataFromUrl() parse
hostname = "devis-demenageur-nice.fr"
match = hostname.match(/demenageur[s]?[-_]([a-z]+)/)
→ Trouve "nice"

// 4. Retourne cityData.nice
{
  slug: 'nice',
  name: 'Nice',
  nameCapitalized: 'Nice',
  siteUrl: 'https://devis-demenageur-nice.fr',
  coordinates: { ... },
  neighborhoods: [ ... ],
  ...
}

// 5. App utilise
title: `Déménagement ${city.nameCapitalized}`
→ "Déménagement Nice"
```

---

## 🚨 POINTS DE DÉFAILLANCE (Où ça casse)

### Point #1 : SITE_URL incorrect

```
CapRover dd-nice : SITE_URL=https://devis-demenageur-lyon.fr/  ❌

→ getCityDataFromUrl() trouve "lyon" dans l'URL
→ Nice utilise cityData.lyon
→ Nice affiche "Déménagement Lyon"
→ Nice charge content/blog/ de Lyon ❌❌❌
```

**Prévention** :
- Vérifier SITE_URL cohérent dans Dockerfile + CapRover ENV
- Tester : `curl https://site.fr/ | grep "Nice"` (ville attendue)

---

### Point #2 : cityData.ts siteUrl incorrect

```typescript
// cityData.ts
bordeaux: {
  siteUrl: 'https://www.bordeaux-demenageur.fr',  ❌
}

// Mais domaine réel :
https://www.bordeaux-demenageur.fr

→ Canonical pointe vers URL inexistante
→ Sitemap avec mauvaise URL
→ Schema.org avec mauvaise URL
```

**Prévention** :
- cityData.ts siteUrl DOIT correspondre au domaine réel
- Vérifier dans CapRover quelle est l'URL réelle

---

### Point #3 : Sync oublié

```
Jour 1 : Fix bug dans sites/nice/lib/cityData.ts
Jour 2 : Même bug découvert dans Lyon (sync oublié)
→ Perte de temps
```

**Prévention** :
- Checklist avant finaliser tâche
- Scripts sync systématiques

---

## 📋 WORKFLOW MODIFICATION DE CODE

### Scénario 1 : Modifier Code Partagé (lib/, components/)

```
1. Identifier ce que tu modifies
   □ Est-ce dans lib/ ou components/ ?
   
2. Choisir où modifier
   Option A : Template source (recommandé)
   - /components/Hero.tsx
   - /lib/cityData.ts
   
   Option B : Dans 1 site
   - sites/nice/components/Hero.tsx
   
3. Faire la modification
   
4. ⚠️ SYNC OBLIGATOIRE
   - Run ./scripts/sync/sync-components.sh
   - OU copie manuelle 11x
   
5. Tester sur 2+ villes
   - Nice : Modification OK ?
   - Lyon : Modification OK ?
   
6. Commit
   - Message : "fix(lib): Description (11 villes)"
   
7. Push
```

---

### Scénario 2 : Modifier Code Spécifique (1 ville)

```
1. Identifier la ville concernée
   Ex : Ajouter article blog Nice
   
2. Modifier dans sites/nice/ uniquement
   - sites/nice/content/blog/prix/article.md
   
3. Tester Nice uniquement
   
4. Commit
   - Message : "feat(nice): Nouvel article prix"
   
5. Push
```

---

### Scénario 3 : Modifier Dockerfile

```
1. ⚠️ NE JAMAIS modifier sites/{ville}/Dockerfile directement
   
2. Modifier le template
   - .templates/Dockerfile.template
   
3. Sync sur les 11 sites
   - ./scripts/sync/sync-config-files.sh
   
4. Vérifier homogénéité
   - Script affiche MD5 hashes
   - Doivent être identiques (sauf SITE_URL)
   
5. Commit
   - Message : "fix(docker): Description (11 villes via template)"
   
6. Push
```

---

## 🔍 DÉTECTER DÉSYNCHRONISATION

### Vérifier si sites synchronisés

```bash
# Vérifier cityData.ts
for city in nice lyon marseille; do
  echo "=== $city ==="
  md5 sites/$city/lib/cityData.ts
done

# Si MD5 différents → Désynchronisés

# Vérifier components
./scripts/sync/sync-components.sh
# Affiche si versions différentes
```

---

## 🎯 RÈGLES D'OR POUR CURSOR

### Règle #1 : Identifier le Type de Modification

**Question** : "Est-ce partagé ou spécifique ?"

```
Fichier dans lib/ ou components/ ?
→ PARTAGÉ : Penser 11 villes

Fichier dans app/ ou content/ ?
→ SPÉCIFIQUE : 1 ville seulement
```

---

### Règle #2 : Workflow Adapté

**Si PARTAGÉ** :
```
Modifier → Sync 11 sites → Tester 2+ villes → Commit "11 villes"
```

**Si SPÉCIFIQUE** :
```
Modifier → Tester 1 ville → Commit "ville X"
```

---

### Règle #3 : Jamais Hardcoder

**TOUJOURS** :
```typescript
import { getCityDataFromUrl } from '@/lib/cityData';
const city = getCityDataFromUrl(env.SITE_URL);

// Utiliser city.nameCapitalized, city.slug, etc.
```

---

### Règle #4 : Tester Multi-Sites

**Minimum 2 villes** :
- Ville modifiée (ex: Nice)
- Ville différente (ex: Lyon)

**Pourquoi** :
- Détecter hardcoded values
- Vérifier cityData fonctionne
- Confirmer sync OK

---

## 🚀 DÉPLOIEMENT

### Architecture CapRover

```
1 Repo GitHub : gdetaisne/moverz_main
    ↓
11 Apps CapRover : dd-nice, dd-lyon, dd-marseille, etc.
    ↓
Chaque app :
- Lit captain-definition dans sites/{ville}/
- Build Dockerfile avec ARG SITE_URL spécifique
- Deploy container indépendant
- Route vers domaine (devis-demenageur-{ville}.fr)
```

### Variables ENV critiques

**Chaque app CapRover DOIT avoir** :

```
NODE_ENV=production
SITE_URL=https://devis-demenageur-{ville}.fr/
PORT=3000
NEXT_TELEMETRY_DISABLED=1
```

**⚠️ Si SITE_URL incorrect** :
- App résout mauvaise ville
- Affiche données d'une autre ville
- Charge mauvais blog

### captain-definition

```json
{
  "schemaVersion": 2,
  "dockerfilePath": "./Dockerfile"
}
```

**CapRover utilise** :
- Path : `sites/{ville}/captain-definition`
- Build depuis : `sites/{ville}/` (working directory)

---

## 📦 STRUCTURE FICHIER PAR TYPE

### Fichiers PARTAGÉS (identiques 11 villes)

**DOIVENT être synchros** :

| Fichier | Source | Sync via |
|---------|--------|----------|
| `lib/cityData.ts` | `/lib/` | Copie manuelle |
| `lib/canonical-helper.ts` | `/lib/` | Copie manuelle |
| `lib/blog.ts` | `/lib/` | Copie manuelle |
| `lib/env.ts` | `/lib/` | Copie manuelle |
| `components/Hero.tsx` | `/components/` | `sync-components.sh` |
| `components/LeadForm.tsx` | `/components/` | `sync-components.sh` |
| `app/globals.css` | `/app/` | `sync-components.sh` |
| `Dockerfile` | `/.templates/Dockerfile.template` | `sync-config-files.sh` |
| `tsconfig.json` | `/.templates/` | `sync-config-files.sh` |
| `.eslintrc.json` | `/.templates/` | `sync-config-files.sh` |

**⚠️ DANGER** : Modifier dans 1 site sans sync → 10 sites désynchronisés

---

### Fichiers SPÉCIFIQUES (différents par ville)

**NE PAS sync** :

| Fichier | Pourquoi spécifique |
|---------|---------------------|
| `content/blog/*.md` | Contenu unique par ville |
| `app/` pages métier | Parfois customisées |
| `public/images/quartiers/{ville}/` | Images locales |
| `lib/faqs-locales.ts` | FAQ spécifiques |
| `CHECKLIST-PRODUCTION.md` | Notes ville |
| `refonte-wording.md` | Notes ville |

---

## 🔧 SCRIPTS DISPONIBLES

### Synchronisation

| Script | Usage | Fichiers synchés |
|--------|-------|------------------|
| `./scripts/sync/sync-components.sh` | Sync composants UI | Hero, LeadForm, globals.css |
| `./scripts/sync/sync-config-files.sh` | Sync configs | Dockerfile, tsconfig, eslint |

### Déploiement

| Script | Usage |
|--------|-------|
| `./scripts/deploy/push-all-sites-to-github.sh` | Push les 11 sites |
| `./scripts/deploy/redeploy-all-sites.sh` | Redéployer tout |

### Analyse

| Script | Usage |
|--------|-------|
| `./scripts/analysis/analyze-404.mjs` | Analyser 404s |
| `./scripts/seo/seo-head-qa.ts` | QA SEO metadata |

---

## ⚠️ PIÈGES COURANTS

### Piège #1 : Modifier Direct au Lieu de Template

```bash
❌ vim sites/nice/Dockerfile
   Cursor modifie Nice uniquement
   → 10 autres villes ont ancienne version

✅ vim .templates/Dockerfile.template
   ./scripts/sync/sync-config-files.sh
   → Les 11 villes synchros
```

---

### Piège #2 : Oublier le Sync

```bash
❌ Workflow Cursor habituel :
   1. Fix bug dans sites/nice/lib/cityData.ts
   2. Test Nice OK
   3. Commit + push
   4. FIN
   → 10 sites ont toujours le bug

✅ Workflow CORRECT :
   1. Fix bug dans sites/nice/lib/cityData.ts
   2. Test Nice OK
   3. Copier manuellement vers 10 autres sites
   4. Test Lyon OK
   5. Commit "11 villes"
   6. Push
```

---

### Piège #3 : Tester 1 Seule Ville

```bash
❌ Test seulement Nice
   Bug hardcodé "Nice" non détecté
   → Lyon affiche "Nice"

✅ Test Nice + Lyon
   Bug hardcodé détecté immédiatement
```

---

## 🎯 BEST PRACTICES POUR CURSOR

### 1. Avant de modifier lib/ ou components/

```
⚠️ ALERTE : Code Partagé Détecté

Tu t'apprêtes à modifier un fichier partagé entre les 11 villes.

Actions requises après modification :
1. Copier sur les 10 autres sites
2. Run script sync (si applicable)
3. Tester sur 2+ villes
4. Commit avec message "11 villes"

Continue ? (Oui/Non)
```

---

### 2. Après modification, avant commit

```
📋 Checklist Multi-Sites

□ Code modifié :
  - sites/nice/lib/cityData.ts

□ Type : Partagé (lib/)

□ Actions effectuées :
  - [ ] Copié sur 10 autres sites ?
  - [ ] Script sync run ?
  - [ ] Testé Nice + Lyon ?

□ Commit message :
  ✅ "fix(lib): Description (11 villes)"
  ❌ "fix: Description"

Prêt à commit ? (Oui/Non)
```

---

### 3. Utiliser cityData PARTOUT

```typescript
// ❌ JAMAIS faire ça
const cityName = "Nice";
const url = "https://devis-demenageur-nice.fr";

// ✅ TOUJOURS faire ça
import { getCityDataFromUrl } from '@/lib/cityData';
import { env } from '@/lib/env';

const city = getCityDataFromUrl(env.SITE_URL);
const cityName = city.nameCapitalized;  // "Nice"
const url = city.siteUrl;  // "https://devis-demenageur-nice.fr"
```

---

## 📊 MAPPING COMPLET : Où Chaque Donnée Vient

| Donnée | Source | Résolution |
|--------|--------|------------|
| Nom ville | `cityData.{ville}.nameCapitalized` | Via SITE_URL |
| Slug ville | `cityData.{ville}.slug` | Via SITE_URL |
| Domaine | `cityData.{ville}.siteUrl` | Via SITE_URL |
| Quartiers | `cityData.{ville}.neighborhoods` | Via SITE_URL |
| Coordonnées | `cityData.{ville}.coordinates` | Via SITE_URL |
| Blog articles | `content/blog/*.md` (local au site) | resolveTenantSlug() |
| Canonical | `getCanonicalUrl(path)` | Via SITE_URL → cityData |

**Point unique de vérité** : `SITE_URL` (variable ENV)

---

## 🚀 MIGRATION FUTURE (Optionnelle)

### Problème actuel

❌ Duplication 11x  
❌ Sync manuel requis  
❌ Risque désynchronisation élevé  
❌ Maintenance 11x plus coûteuse

### Solution idéale : Turborepo

```
apps/
├── nice/      ← App (seulement pages + content)
└── lyon/      ← App (seulement pages + content)

packages/
├── shared/    ← cityData, helpers (1 SEULE VERSION)
└── ui/        ← Components (1 SEULE VERSION)
```

**Gain** :
- Modification → Affecte automatiquement les 11 apps
- Zéro sync manuel
- Impossible d'oublier
- Maintenance divisée par 10

**Effort** : ~10-15h migration one-time

**Priorité** : À considérer après projet 404

---

## ✅ CHECKLIST POUR CURSOR

**À chaque modification, vérifier** :

```
□ Type de fichier ?
  - Partagé (lib/components) → Penser 11 villes
  - Spécifique (app/content) → 1 ville OK

□ Ville hardcodée ?
  - Chercher "Nice", "Lille", "Lyon" dans code
  - Remplacer par city.nameCapitalized

□ Sync effectué ?
  - Si lib/components modifié → Sync 11 sites

□ Test multi-sites ?
  - 2+ villes testées minimum

□ Commit message clair ?
  - Mentionner "11 villes" si partagé
```

---

**Architecture comprise = Bugs évités** 🚀

---

*Créé le : 2025-11-02*  
*Basé sur analyse complète de l'architecture réelle*

