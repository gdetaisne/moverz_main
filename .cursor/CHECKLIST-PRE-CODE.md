# ✅ CHECKLIST PRÉ-CODE - Obligatoire Avant Toute Modification

**Pour Cursor** : VÉRIFIER cette checklist AVANT d'écrire du code.

**Objectif** : Prévenir les bugs récurrents (villes hardcodées, SEO cassé, sync oublié).

---

## 🎯 CHECKLIST COMPLÈTE

### ✅ ÉTAPE 1 : Comprendre la Demande

```
□ Qu'est-ce que je dois faire exactement ?
□ Quels fichiers vais-je modifier ?
□ Est-ce du code partagé (lib/components) ou spécifique (app/content) ?
□ Combien de villes sont affectées ? (1 ou 11)
```

---

### ✅ ÉTAPE 2 : Impact SEO

**Si je touche à un de ces éléments** :

```
□ URLs (slugs, paths, routing)
□ Canonicals (getCanonicalUrl, metadata)
□ Metadata (title, description, og:)
□ Internal links (href entre pages)
□ Structure blog (/blog/categorie/)
□ Redirections (middleware, next.config)
□ Sitemap (sitemap.ts)
```

**ALORS STOP et demander** :
```
⚠️ Impact SEO Détecté

Cette modification touche à [URLs/Canonicals/Metadata/etc.].

Avant de continuer :
1. Comprends-tu l'impact business (trafic/leads) ?
2. As-tu une bonne raison de modifier ça ?
3. As-tu prévu de tester après ?
4. Guillaume est-il au courant ?

Continue ? (Oui/Non)
```

---

### ✅ ÉTAPE 3 : Multi-Sites (11 Villes)

**Si je modifie un fichier dans `sites/{ville}/`** :

```
□ Le fichier est-il dans lib/ ou components/ ?
  
  SI OUI (fichier partagé) :
  □ Ai-je prévu de copier sur les 10 autres sites ?
  □ Existe-t-il un script sync pour ce fichier ?
  □ Ai-je prévu de tester sur 2+ villes ?
  
  SI NON (fichier spécifique) :
  □ C'est OK, modification 1 ville seulement
```

**Fichiers PARTAGÉS** (doivent être sync sur 11 villes) :
- `lib/*.ts` (cityData, canonical-helper, blog, env, etc.)
- `components/*.tsx` (Hero, LeadForm, StickyCTA, etc.)
- `app/globals.css`
- `Dockerfile`
- Configs (tsconfig.json, .eslintrc.json, etc.)

**Fichiers SPÉCIFIQUES** (1 ville seulement) :
- `content/blog/*.md`
- `app/` pages métier (parfois)
- `public/images/`

---

### ✅ ÉTAPE 4 : Ville Hardcodée ?

**Scanner le code que je m'apprête à écrire** :

```
□ Est-ce que j'ai écrit "Nice" en dur ?
□ Est-ce que j'ai écrit "Lille" en dur ?
□ Est-ce que j'ai écrit "Lyon" en dur ?
□ Est-ce que j'ai écrit "Marseille" en dur ?
□ Est-ce que j'ai écrit un nom de quartier spécifique ?
  (Chartrons, Vieux-Port, Capitole, etc.)

SI OUI à 1+ question :
→ STOP, remplacer par cityData dynamique
```

**Pattern à éviter** :
```typescript
❌ title: "Déménagement à Lille"
❌ const ville = "Nice"
❌ if (city === "lyon") { ... }
❌ canonical: getCanonicalUrl('quartiers-lille')
❌ href="/marseille/"
```

**Pattern correct** :
```typescript
✅ import { getCityDataFromUrl } from '@/lib/cityData';
✅ const city = getCityDataFromUrl(env.SITE_URL);
✅ title: `Déménagement à ${city.nameCapitalized}`
✅ canonical: getCanonicalUrl(`quartiers-${city.slug}`)
✅ href={`/${city.slug}/`}
```

---

### ✅ ÉTAPE 5 : Copier-Coller Entre Villes ?

**Si je copie du code depuis ville A vers ville B** :

```
□ Ai-je cherché toutes références à ville A ?
  grep -r "nice\|Nice" nouveau-fichier.tsx
  
□ Ai-je remplacé par ville B ou cityData dynamique ?
  
□ Ai-je vérifié les quartiers ?
  (Pas de quartiers ville A dans ville B)
  
□ Ai-je vérifié les examples/descriptions ?
  ("Vieux-Port" → quartier Marseille, pas applicable à Lyon)
```

---

### ✅ ÉTAPE 6 : Organisation Fichiers

**Si je crée un nouveau fichier** :

```
□ Quel est le type de ce fichier ?
  - Config projet → Racine /
  - Analyse temporaire → .cursor/archives/analyses/
  - Livrable tâche → .cursor/tasks/TASK-XXX/
  - Script → scripts/{categorie}/
  - Temporaire → NE PAS CRÉER (ou .gitignore)

□ Est-ce que ça pollue la racine ?
  SI OUI → Trouver meilleur emplacement

□ Est-ce temporaire ?
  SI OUI → .gitignore ou ne pas créer
```

---

### ✅ ÉTAPE 7 : Tests Prévus

```
□ Ai-je prévu de tester après modification ?

Pour code partagé (lib/components) :
  □ Test sur ville modifiée (ex: Nice)
  □ Test sur ville différente (ex: Lyon)
  □ Minimum 2 villes

Pour code spécifique :
  □ Test sur ville concernée uniquement

Pour SEO (canonical/metadata) :
  □ Test curl | grep canonical
  □ Test Google Rich Results
  □ Test Search Console (48h après)
```

---

## 🚨 RED FLAGS - Questions à Poser

**Si je détecte un de ces patterns dans la demande** :

### 🔴 RED FLAG #1 : "Modifier canonical"

```
Demande utilisateur : "Modifier getCanonicalUrl() pour..."

⚠️ STOP - Canonical = SEO Critical

Questions avant de continuer :
1. Pourquoi modifier le helper canonical ?
2. Impact sur les 1407 pages déjà migrées ?
3. Tests prévus après modification ?
4. Guillaume est au courant ?

Veux-tu vraiment continuer ? (Oui/Non)
```

---

### 🟠 RED FLAG #2 : "Créer composant dans 1 seule ville"

```
Demande : "Créer nouveau composant Banner.tsx dans Nice"

⚠️ Question - Code Partagé ou Spécifique ?

Ce composant sera-t-il utilisé sur les 11 villes ?

A) Oui → Créer dans /components/ puis sync
B) Non → Créer dans sites/nice/components/ uniquement

Quelle option ? (A/B)
```

---

### 🟠 RED FLAG #3 : "Fix bug dans Nice"

```
Demande : "Corriger bug dans sites/nice/lib/cityData.ts"

⚠️ Alerte - Fichier Partagé

cityData.ts est partagé entre les 11 villes.

Ce bug existe probablement dans les 10 autres sites aussi.

Plan proposé :
1. Fix dans Nice
2. Test Nice OK
3. Copier fix sur les 10 autres sites
4. Test Lyon OK
5. Commit "11 villes"

Valider ce plan ? (Oui/Non)
```

---

### 🟡 RED FLAG #4 : "Supprimer page/article"

```
Demande : "Supprimer l'article /blog/prix/ancien-article/"

⚠️ STOP - SEO Impact

Supprimer une page = 404 = Perte SEO.

Actions requises :
1. Créer redirection 301 vers article similaire
2. Mettre à jour internal links
3. Tester redirection fonctionne

Plan :
- Redirection 301 : /ancien-article/ → /nouvel-article/
- Fichier : next.config.js ou middleware

Continue avec redirections ? (Oui/Non)
```

---

## 📋 CHECKLIST RÉSUMÉE (Quick Reference)

**Avant CHAQUE modification de code** :

```
🎯 Impact SEO ?
   → Si OUI : STOP et demander

🌍 Multi-sites (11 villes) ?
   → Si fichier partagé : Prévoir sync

🚫 Ville hardcodée ?
   → Toujours utiliser cityData

📁 Nouveau fichier ?
   → Où le ranger ?

🧪 Tests prévus ?
   → 2+ villes si partagé
```

**Si 1+ problème détecté** → STOP et demander confirmation

---

## 🎯 WORKFLOW COMPLET

```
1. Lire demande utilisateur
   ↓
2. ✅ CHECKLIST PRÉ-CODE (ce document)
   ↓
3. Si RED FLAG détecté
   ↓ Non                ↓ Oui
   Continue          STOP → Demander confirmation
   ↓                     ↓
4. Écrire code       Attendre réponse
   ↓                     ↓
5. Tester            Si OK → Continue
   ↓
6. ✅ CHECKLIST POST-CODE
   - Sync effectué ?
   - Tests passés ?
   - Commit message OK ?
   ↓
7. Commit + Push
   ↓
8. Finaliser tâche
```

---

## 💡 EXEMPLES CONCRETS

### Exemple 1 : Fix Bug Simple

**Demande** : "Corriger typo dans Hero.tsx"

**Checklist** :
```
□ Impact SEO ? → Non (juste typo)
□ Multi-sites ? → Oui (Hero.tsx partagé)
  □ Prévu sync ? → Oui, via sync-components.sh
□ Ville hardcodée ? → Non
□ Tests prévus ? → Oui, Nice + Lyon
```

**Action** : Continue, mais pense sync après

---

### Exemple 2 : Ajouter Article Blog

**Demande** : "Créer article /blog/prix/nouveau-article-nice.md"

**Checklist** :
```
□ Impact SEO ? → Oui (nouvelle page à indexer)
  □ Canonical prévu ? → Oui, automatique
  □ Internal links ? → Ajouter dans autres articles
□ Multi-sites ? → Non (content/ spécifique Nice)
□ Tests prévus ? → Oui, Nice uniquement
```

**Action** : Continue

---

### Exemple 3 : Modifier Dockerfile

**Demande** : "Ajouter ENV variable dans Dockerfile"

**Checklist** :
```
□ Multi-sites ? → Oui (11 Dockerfiles)
  □ Via template ? → OUI OBLIGATOIRE
  
Plan :
1. Modifier .templates/Dockerfile.template
2. Run ./scripts/sync/sync-config-files.sh
3. Vérifier MD5 identiques
4. Commit "11 villes via template"
```

**Action** : Continue avec template

---

## 🚫 ANTI-PATTERNS À ÉVITER

```
❌ Modifier direct sans checklist
❌ "Ça va, c'est juste un petit fix" (sans vérifier impact)
❌ Tester 1 seule ville (Nice) pour code partagé
❌ Commit sans mentionner "11 villes" si partagé
❌ Créer fichiers temporaires à la racine
❌ Copier-coller entre villes sans adapter
```

---

**Cette checklist est OBLIGATOIRE avant toute modification.**

**Cursor doit la suivre systématiquement, même pour "petits fixes".**

---

*Créé le : 2025-11-02*  
*Checklist validée contre bugs récurrents P1-006-SEO-migration-canonicals-100%, P1-012-SEO-villes-hardcodees-50%, 404*

