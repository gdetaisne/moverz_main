# ⚠️ PRINCIPES SACRÉS - NON NÉGOCIABLES

**LECTURE OBLIGATOIRE pour Cursor à chaque nouveau chat**

---

## 🎯 OBJECTIF ULTIME : LEAD GENERATION

**Tout ce qui suit sert cet objectif unique.**

### Business Model
```
Trafic SEO → Pages optimisées → Formulaire devis → Leads → €€€
```

**Si le SEO est cassé → 0 trafic → 0 leads → 0 business**

**Donc toute décision technique DOIT prioriser le SEO.**

---

## 🏆 PRINCIPE #1 : SEO FIRST (NON NÉGOCIABLE)

### ⚠️ Comprendre l'impact business

**Mauvais SEO = Perte d'argent directe**

- Canonical incorrect → Duplicate content → Pénalité Google → -50% trafic
- URL cassée (404) → Page non indexée → 0 trafic sur cette page
- Metadata incorrect → CTR faible → Moins de clics → Moins de leads
- Internal linking cassé → Crawl budget gaspillé → Pages non découvertes

### 🚫 INTERDICTIONS ABSOLUES

**JAMAIS faire ces actions sans comprendre l'impact SEO** :

❌ **Modifier une URL** (slug, path, canonical)  
❌ **Toucher aux canonicals** (même "petit fix")  
❌ **Casser l'internal linking** (liens entre articles)  
❌ **Modifier les metadata** (title, description) sans raison  
❌ **Créer duplicate content** (même contenu sur 2 URLs)  
❌ **Supprimer une page** sans redirection 301  
❌ **Changer la structure /blog/** (catégories, slugs)

### ✅ RÈGLES D'OR SEO

1. **Trailing slash PARTOUT** : `/page/` (jamais `/page`)
2. **Canonicals TOUJOURS corrects** : Pointe vers URL exacte de la page
3. **1 URL = 1 contenu unique** : Pas de duplication
4. **Redirections 301** : Si changement URL (jamais supprimer sans rediriger)
5. **Internal links** : Toujours valides, jamais cassés

### 🛑 RED FLAGS - STOP ET DEMANDER

**Si tu vois ça dans une demande utilisateur, STOP immédiatement** :

```
🚨 "Modifier les canonicals..."
🚨 "Changer les URLs de..."
🚨 "Supprimer la page..."
🚨 "Fusionner deux articles..."
🚨 "Changer la structure du blog..."
```

**Action Cursor** :
```
⚠️ STOP - Impact SEO Critique

Cette modification touche aux [canonicals/URLs/structure].
Impact potentiel sur le SEO = business critical.

Avant de continuer, je dois comprendre :
1. Pourquoi cette modification ?
2. Impact SEO analysé ?
3. Redirections 301 prévues si nécessaire ?
4. Tests prévus post-modification ?

Veux-tu continuer ? (Oui/Non)
```

---

## 🌐 URLs PRODUCTION - EXCEPTIONS CRITIQUES

### ⚠️ NE JAMAIS INVENTER LES URLs

**Pattern standard** (9 sites) :
```
https://devis-demenageur-{ville}.fr/
```

**EXCEPTIONS** (2 sites - À MÉMORISER) :
- **Bordeaux** : `https://www.bordeaux-demenageur.fr/` (www + ordre inversé)
- **Toulouse** : `https://devis-demenageur-toulousain.fr/` (adjectif toulousain)

**Source de vérité** : `.cursor/URLS-PRODUCTION.md`

**⚠️ RÈGLE** : Avant tout test en prod, consulter `.cursor/URLS-PRODUCTION.md`. Ne JAMAIS extrapoler les URLs.

---

## 🌍 PRINCIPE #2 : ARCHITECTURE MULTI-SITES (11 VILLES)

### ⚠️ Comprendre l'architecture

**VOUS AVEZ 11 SITES INDÉPENDANTS** :

```
sites/
├── nice/      ← Site Next.js complet
├── lyon/      ← Site Next.js complet
├── marseille/ ← Site Next.js complet
└── ... (8 autres)
```

**Chaque site = Application Next.js complète**

- Build indépendant
- Déploiement indépendant (container Docker)
- **Repo GitHub individuel** : `dd-marseille`, `dd-lyon`, etc.

### ⚠️ DOMAINES (ATTENTION EXCEPTION BORDEAUX)

**10 villes** : Pattern standard
- `devis-demenageur-marseille.fr`
- `devis-demenageur-lyon.fr`
- `devis-demenageur-toulouse.fr` (toulousain)
- `devis-demenageur-nice.fr`
- `devis-demenageur-lille.fr`
- `devis-demenageur-nantes.fr`
- `devis-demenageur-strasbourg.fr`
- `devis-demenageur-rouen.fr`
- `devis-demenageur-rennes.fr`
- `devis-demenageur-montpellier.fr`

**1 ville** : ⚠️ EXCEPTION
- `www.bordeaux-demenageur.fr` (PAS devis-demenageur-bordeaux.fr !)

### 🚨 WORKFLOW DEPLOY COMPLET (CRITIQUE)

**⚠️ Pour que CapRover déploie, il faut :**

1️⃣ **Push monorepo** (documentation/historique) :
```bash
git add sites/*/[fichiers-modifiés]
git commit -m "fix: description"
git push origin main
```

2️⃣ **Push repos individuels** (déclencheur CapRover) :
```bash
bash scripts/deploy/push-to-all-site-repos.sh
# Push chaque ville vers https://github.com/gdetaisne/dd-$city
# CapRover webhook détecte → Redeploy automatique
```

**❌ ERREUR FRÉQUENTE** : Oublier étape 2 → Aucun déploiement !

**✅ TOUJOURS faire les 2 étapes** pour tout changement code sites/
- Content indépendant (`content/blog/`)
- Mais **code DUPLIQUÉ** (lib/, components/)

---

### 🚫 ANTI-PATTERN ACTUEL

**Code partagé (lib/, components/) est COPIÉ dans chaque site**

```
cityData.ts existe 12x :
- /lib/cityData.ts (source ?)
- /sites/nice/lib/cityData.ts (copie)
- /sites/lyon/lib/cityData.ts (copie)
- ... (9 autres copies)
```

**Sync = MANUEL via scripts** :
- `./scripts/sync-config-files.sh`
- `./scripts/sync-components.sh`

---

### ✅ RÈGLE ABSOLUE : PENSER 11 VILLES

**Chaque modification de code partagé DOIT être répliquée sur 11 sites**

#### Checklist OBLIGATOIRE avant commit :

```
□ Ai-je modifié lib/ ou components/ ?
  
  SI OUI :
  □ Ai-je copié sur les 11 sites ?
  □ Ai-je run le script sync approprié ?
  □ Ai-je vérifié sur 2+ sites que ça fonctionne ?
  
  SI NON :
  □ C'est OK, modification spécifique à 1 ville
```

#### Fichiers partagés (TOUJOURS sync sur 11 sites) :

- `lib/cityData.ts`
- `lib/canonical-helper.ts`
- `lib/blog.ts`
- `lib/env.ts`
- `components/Hero.tsx`
- `components/HowItWorks.tsx`
- `components/PricingPreview.tsx`
- `components/StickyCTA.tsx`
- `components/LeadForm.tsx`
- `app/globals.css`
- Dockerfile (via template)
- Config files (tsconfig, eslint, etc.)

#### Fichiers spécifiques (PAS de sync) :

- `content/blog/*.md` (contenu par ville)
- `app/` pages spécifiques
- `public/images/` (images par ville)

---

### 🚨 ERREURS INTERDITES

#### ❌ **Erreur #1 : Modifier 1 site, oublier les 10 autres**

**Symptôme** :
```
Nice : Bug fixé ✅
Lyon : Bug toujours présent ❌
Marseille : Bug toujours présent ❌
... (8 autres avec le bug)
```

**Cursor DOIT** :
- Avant de finaliser la tâche
- Vérifier si fichier modifié est dans lib/ ou components/
- Si OUI → Demander : "Ai-je synché sur les 11 sites ?"

---

#### ❌ **Erreur #2 : Hardcoder une ville**

**INTERDIT** :
```typescript
❌ title: "Déménagement à Lille"
❌ canonical: getCanonicalUrl('quartiers-lille')
❌ description: "...à Marseille..."
❌ const ville = "Nice"
❌ if (city === "lyon") { ... }
```

**OBLIGATOIRE** :
```typescript
✅ import { getCityDataFromUrl } from '@/lib/cityData';
✅ const city = getCityDataFromUrl(env.SITE_URL);
✅ title: `Déménagement à ${city.nameCapitalized}`
✅ canonical: getCanonicalUrl(`quartiers-${city.slug}`)
✅ description: `...à ${city.nameCapitalized}...`
```

**Cursor DOIT** :
- Scanner le code pour hardcoded city names
- Si trouvé → STOP et signaler
- Proposer version dynamique avec `city.nameCapitalized`

---

#### ❌ **Erreur #3 : Copier-coller sans adapter cityData**

**Ce qui arrive** :
```
1. Cursor voit un fichier dans sites/nice/
2. Cursor copie dans sites/lyon/
3. Cursor oublie de changer les références ville-spécifiques
4. → Lyon affiche "Nice" partout
```

**RÈGLE** :
Après tout copier-coller entre villes :
```
□ Ai-je cherché "nice" dans le nouveau fichier ? (si copié depuis Nice)
□ Ai-je remplacé par "lyon" / city.slug / city.nameCapitalized ?
□ Ai-je testé que ça fonctionne ?
```

---

## 🔧 PRINCIPE #3 : MAINTENABILITÉ

### Code propre et généralisable

**Toujours privilégier** :
- ✅ DRY (Don't Repeat Yourself)
- ✅ Données dynamiques (cityData)
- ✅ Helpers réutilisables
- ✅ Code testable

**Éviter** :
- ❌ Hardcoded values
- ❌ Copier-coller sans abstraction
- ❌ Code spécifique là où ça devrait être générique

---

### Organisation des fichiers

**INTERDIT** de créer des fichiers n'importe où.

#### Racine du projet = SEULEMENT configs essentielles

**À la racine `/`** :
- ✅ package.json, tsconfig.json, next.config.mjs
- ❌ Fichiers d'analyse (→ `.cursor/archives/analyses/`)
- ❌ Fichiers temporaires (→ supprimer)
- ❌ Scripts temporaires (→ supprimer)

#### Documentation des tâches = `.cursor/tasks/`

**Livrables de tâches** :
- ✅ `.cursor/tasks/[PX]-TASK-XXX/fichier.json`
- ❌ `/fichier.json` à la racine

#### Scripts = `scripts/`

**Scripts par catégorie** :
- `scripts/sync/` (synchronisation)
- `scripts/deploy/` (déploiement)
- `scripts/seo/` (SEO QA)
- `scripts/analysis/` (analyses)

---

## 🚫 RÉCAPITULATIF INTERDICTIONS

### **JAMAIS faire sans demander confirmation** :

1. ❌ Modifier canonical/URL/metadata
2. ❌ Hardcoder une ville dans le code
3. ❌ Modifier 1 seul site sans sync les 10 autres (pour code partagé)
4. ❌ Toucher au Dockerfile sans comprendre
5. ❌ Supprimer une page sans redirection 301
6. ❌ Casser l'internal linking
7. ❌ Créer fichiers hors structure (racine polluée)
8. ❌ Copier-coller entre villes sans adapter cityData

### **TOUJOURS faire** :

1. ✅ Utiliser cityData dynamique (city.nameCapitalized, city.slug, etc.)
2. ✅ Tester sur 2+ sites minimum
3. ✅ Vérifier sync si modification lib/components
4. ✅ Penser "11 villes" par défaut
5. ✅ Documenter les décisions dans decisions.md
6. ✅ Ranger les fichiers au bon endroit

---

## 💡 MENTAL MODEL POUR CURSOR

**Avant CHAQUE modification de code, demande-toi** :

```
1. Est-ce que je touche au SEO ?
   → Si OUI : Comprendre impact + demander confirmation

2. Est-ce que je touche à du code partagé (lib/, components/) ?
   → Si OUI : Penser 11 villes + sync

3. Est-ce que je hardcode une ville ?
   → Si OUI : STOP, utiliser cityData dynamique

4. Est-ce que je crée un fichier ?
   → Où le ranger ? (.cursor/tasks/, scripts/, ou autre ?)
```

**Si 1+ réponse problématique → STOP et demander à Guillaume**

---

## 🎯 RÉSUMÉ EN 3 POINTS

1. **SEO = BUSINESS** → Ne jamais casser sans comprendre
2. **11 VILLES** → Toujours penser duplication + sync
3. **MAINTENABILITÉ** → Code propre, dynamique, testé

---

**Ces principes sont ABSOLUMENT NON NÉGOCIABLES.**

**Cursor doit les appliquer systématiquement avant toute modification de code.**

---

*Créé le : 2025-11-02*  
*Mise à jour : Jamais (principes immuables)*

