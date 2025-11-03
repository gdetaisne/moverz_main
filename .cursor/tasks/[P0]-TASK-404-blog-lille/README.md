# TASK : Corriger 404s Blog Lille

**Date création** : 03 novembre 2025  
**Priorité** : P0  
**Ville** : Lille  
**Assigné** : Chat Cursor indépendant  
**Temps estimé** : 1h30-2h

---

## 🎯 OBJECTIF

Corriger **~70 liens internes 404** dans le blog Lille.

**Pattern** : Mismatch dossier ≠ catégorie frontmatter

---

## 🏗️ ARCHITECTURE LILLE

### Structure actuelle

**Dossiers** :
```
content/blog/
├── demenageur-lille/
├── location-camion-lille/
├── garde-meuble-lille/
├── prix-demenagement-lille/
├── aide-demenagement-lille/
├── demenagement-international-lille/
├── demenagement-pas-cher-lille/
├── demenagement-entreprise-lille/
├── demenagement-piano-lille/
├── petit-demenagement-lille/
└── satellites/
```

**Catégories frontmatter** :
```markdown
TOUS les guides ont : category: "demenagement-lille"
```

**URLs réelles générées** :
```
✅ /blog/demenagement-lille/demenageur-lille-expert/
✅ /blog/demenagement-lille/garde-meuble-lille-guide-complet/
✅ /blog/demenagement-lille/prix-demenagement-lille-guide/
```

**Liens markdown cassés** :
```
❌ /blog/demenageur-lille/demenageur-lille-expert
❌ /blog/garde-meuble-lille/garde-meuble-lille-guide-complet
❌ /blog/location-camion-lille/location-camion-demenagement-lille-guide
```

**→ Problème** : Liens pointent vers dossier, mais URLs utilisent catégorie frontmatter

---

## 🚨 ERREURS À NE PAS REPRODUIRE

**⚠️ LIRE OBLIGATOIREMENT** : `.cursor/tasks/[P0]-TASK-404-CORRECTIONS-PATTERNS/ERREURS-APPRISES-BORDEAUX.md`

### Erreur #1 : Ne PAS assumer le mapping

**AVANT toute correction** :
1. Vérifier `sites/lille/lib/blog.ts` → `CATEGORY_MAPPING`
2. Tester 3 URLs en production
3. Confirmer architecture

### Erreur #2 : Tester en production OBLIGATOIRE

```bash
# Tester URL guide principal
curl -I https://devis-demenageur-lille.fr/blog/demenagement-lille/demenageur-lille-expert/
→ Doit être 200 OK

# Tester URL fausse (dossier)
curl -I https://devis-demenageur-lille.fr/blog/demenageur-lille/demenageur-lille-expert/
→ Doit être 404
```

### Erreur #3 : Faire 1 correction test avant masse

**Workflow** :
1. Corriger 1 fichier manuellement
2. Git diff
3. Valider
4. Tester URL
5. ALORS corriger les autres

---

## 🔧 MAPPING LILLE

### Guides principaux

| Fichier | Dossier | Catégorie frontmatter | Slug | URL réelle |
|---------|---------|----------------------|------|------------|
| demenageur-lille-expert.md | `demenageur-lille/` | `demenagement-lille` | `demenageur-lille-expert` | `/blog/demenagement-lille/demenageur-lille-expert/` |
| location-camion-demenagement-lille-guide.md | `location-camion-demenagement-lille/` | `demenagement-lille` | `location-camion-demenagement-lille-guide` | `/blog/demenagement-lille/location-camion-demenagement-lille-guide/` |
| garde-meuble-lille-guide-complet.md | `garde-meuble-lille/` | `demenagement-lille` | `garde-meuble-lille-guide-complet` | `/blog/demenagement-lille/garde-meuble-lille-guide-complet/` |
| prix-demenagement-lille-guide.md | `prix-demenagement-lille/` | `demenagement-lille` | `prix-demenagement-lille-guide` | `/blog/demenagement-lille/prix-demenagement-lille-guide/` |
| demenagement-international-lille-guide.md | `demenagement-international-lille/` | `demenagement-lille` | `demenagement-international-lille-guide` | `/blog/demenagement-lille/demenagement-international-lille-guide/` |
| demenagement-pas-cher-lille-guide.md | `demenagement-pas-cher-lille/` | `demenagement-lille` | `demenagement-pas-cher-lille-guide` | `/blog/demenagement-lille/demenagement-pas-cher-lille-guide/` |
| petit-demenagement-lille-guide.md | `petit-demenagement-lille/` | `demenagement-lille` | `petit-demenagement-lille-guide` | `/blog/demenagement-lille/petit-demenagement-lille-guide/` |

### Patterns de liens cassés

| Lien cassé | URL correcte |
|------------|--------------|
| `/blog/demenageur-lille/{slug}` | `/blog/demenagement-lille/{slug}` |
| `/blog/location-camion-lille/{slug}` | `/blog/demenagement-lille/{slug}` |
| `/blog/garde-meuble-lille/{slug}` | `/blog/demenagement-lille/{slug}` |
| `/blog/prix-demenagement-lille/{slug}` | `/blog/demenagement-lille/{slug}` |
| `/blog/demenagement-international-lille/{slug}` | `/blog/demenagement-lille/{slug}` |
| `/blog/demenagement-pas-cher-lille/{slug}` | `/blog/demenagement-lille/{slug}` |
| `/blog/petit-demenagement-lille/{slug}` | `/blog/demenagement-lille/{slug}` |
| `/blog/aide-demenagement-lille/{slug}` | `/blog/demenagement-lille/{slug}` |

**→ Toutes les catégories → `demenagement-lille`**

---

## ✅ CHECKLIST COMPLÈTE

### Phase 1 : Préparation (15 min)

- [ ] Lire `ERREURS-APPRISES-BORDEAUX.md` (10 min)
- [ ] Analyser `sites/lille/lib/blog.ts` → CATEGORY_MAPPING
- [ ] Lister tous les dossiers : `ls -d sites/lille/content/blog/*/`
- [ ] Extraire catégories frontmatter uniques
- [ ] **Confirmer** : Tous les guides ont `category: "demenagement-lille"`

### Phase 2 : Tests Production (10 min)

```bash
# Tester 5 URLs
curl -I https://devis-demenageur-lille.fr/blog/demenagement-lille/demenageur-lille-expert/
curl -I https://devis-demenageur-lille.fr/blog/demenagement-lille/garde-meuble-lille-guide-complet/
curl -I https://devis-demenageur-lille.fr/blog/demenagement-lille/prix-demenagement-lille-guide/
curl -I https://devis-demenageur-lille.fr/blog/demenagement-lille/location-camion-demenagement-lille-guide/
curl -I https://devis-demenageur-lille.fr/blog/demenagement-lille/demenagement-pas-cher-lille-guide/

→ Toutes DOIVENT être 200 OK
```

- [ ] URL 1 : 200 OK ✅
- [ ] URL 2 : 200 OK ✅
- [ ] URL 3 : 200 OK ✅
- [ ] URL 4 : 200 OK ✅
- [ ] URL 5 : 200 OK ✅

**Si 1 seule URL n'est pas 200 → STOP et analyser plus**

### Phase 3 : Audit Liens Cassés (10 min)

```bash
cd sites/lille/content/blog

# Pattern 1 : demenageur-lille/
grep -r "](/blog/demenageur-lille/" . --include="*.md" | wc -l

# Pattern 2 : location-camion-lille/
grep -r "](/blog/location-camion-lille/" . --include="*.md" | wc -l

# Pattern 3 : garde-meuble-lille/
grep -r "](/blog/garde-meuble-lille/" . --include="*.md" | wc -l

# Pattern 4 : prix-demenagement-lille/
grep -r "](/blog/prix-demenagement-lille/" . --include="*.md" | wc -l

# ... autres patterns
```

- [ ] Documenter nombre de liens par pattern
- [ ] Total estimé : ~70 liens

### Phase 4 : Correction Test (15 min)

**Corriger 1 SEUL fichier pour tester** :

```bash
# Trouver 1 fichier avec lien cassé
grep -r "](/blog/demenageur-lille/" sites/lille/content/blog --include="*.md" -l | head -1

# Ouvrir avec Cursor
# Corriger manuellement : /blog/demenageur-lille/ → /blog/demenagement-lille/
# Sauvegarder
```

- [ ] Git diff vérifié
- [ ] Correction a du sens
- [ ] Aucun autre changement involontaire

### Phase 5 : Validation Test (5 min)

```bash
# Vérifier que l'URL corrigée existe
# (Même si pas encore déployé, vérifier cohérence)

# Exemple :
# Lien corrigé : /blog/demenagement-lille/demenageur-lille-expert
# URL production : https://devis-demenageur-lille.fr/blog/demenagement-lille/demenageur-lille-expert/
# → Doit être 200 OK
```

- [ ] URL corrigée validée
- [ ] Approche confirmée bonne

### Phase 6 : Correction Masse (30-45 min)

**Pattern par pattern** :

```bash
cd sites/lille/content/blog

# Pattern 1
for file in $(grep -r "](/blog/demenageur-lille/" . --include="*.md" -l); do
  sed -i '' 's|](/blog/demenageur-lille/|](/blog/demenagement-lille/|g' "$file"
  echo "✅ $file"
done

# Vérifier 0 restant
grep -r "](/blog/demenageur-lille/" . --include="*.md" | wc -l
→ Doit être 0

# Pattern 2
for file in $(grep -r "](/blog/location-camion-lille/" . --include="*.md" -l); do
  sed -i '' 's|](/blog/location-camion-lille/|](/blog/demenagement-lille/|g' "$file"
  echo "✅ $file"
done

grep -r "](/blog/location-camion-lille/" . --include="*.md" | wc -l
→ Doit être 0

# ... Répéter pour chaque pattern
```

- [ ] Pattern 1 : demenageur-lille → demenagement-lille
- [ ] Pattern 2 : location-camion-lille → demenagement-lille
- [ ] Pattern 3 : garde-meuble-lille → demenagement-lille
- [ ] Pattern 4 : prix-demenagement-lille → demenagement-lille
- [ ] Pattern 5 : aide-demenagement-lille → demenagement-lille
- [ ] Pattern 6 : demenagement-international-lille → demenagement-lille
- [ ] Pattern 7 : demenagement-pas-cher-lille → demenagement-lille
- [ ] Pattern 8 : demenagement-entreprise-lille → demenagement-lille
- [ ] Pattern 9 : petit-demenagement-lille → demenagement-lille

### Phase 7 : Vérification Finale (10 min)

```bash
# Vérifier TOUS les patterns à 0
cd sites/lille/content/blog

grep -r "](/blog/demenageur-lille/" . --include="*.md" | wc -l
grep -r "](/blog/location-camion-lille/" . --include="*.md" | wc -l
grep -r "](/blog/garde-meuble-lille/" . --include="*.md" | wc -l
# ... etc

→ TOUS doivent être 0
```

- [ ] Tous patterns = 0 ✅
- [ ] Git diff propre
- [ ] Aucun changement involontaire

### Phase 8 : Commit & Deploy (10 min)

```bash
cd /Users/guillaumestehelin/moverz_main-2

# Commit monorepo
git add sites/lille/content/blog/
git commit -m "fix(lille): correct ~70 broken blog links

Pattern #5A: Fix dossier mismatch (dossier ≠ catégorie)

All corrections: /{dossier}/ → /demenagement-lille/
- demenageur-lille → demenagement-lille
- location-camion-lille → demenagement-lille
- garde-meuble-lille → demenagement-lille
- ... (9 patterns total)

Files: ~XX modified
SEO impact: ~70 internal 404s fixed"

git push origin main

# Push Lille individuel
cd sites/lille
git add content/blog/
git commit -m "fix: correct ~70 broken blog links"
git push origin main
```

- [ ] Commit monorepo : SHA documenté
- [ ] Push Lille : SHA documenté
- [ ] CapRover déploiement déclenché

### Phase 9 : Validation Post-Deploy (10 min)

```bash
# Attendre 3-5 min (CapRover)
# Tester 5 URLs en production

curl -I https://devis-demenageur-lille.fr/blog/demenagement-lille/demenageur-lille-expert/
curl -I https://devis-demenageur-lille.fr/blog/demenagement-lille/garde-meuble-lille-guide-complet/
curl -I https://devis-demenageur-lille.fr/blog/demenagement-lille/prix-demenagement-lille-guide/
curl -I https://devis-demenageur-lille.fr/blog/demenagement-lille/location-camion-demenagement-lille-guide/
curl -I https://devis-demenageur-lille.fr/blog/demenagement-lille/demenagement-pas-cher-lille-guide/

→ Toutes DOIVENT être 200 OK
```

- [ ] Toutes URLs 200 OK ✅
- [ ] Site live accessible
- [ ] Aucune régression

---

## 🔍 EXEMPLES CONCRETS

### Exemple correction 1

**Fichier** : `satellites/aide-demenagement-particuliers-lille.md`  
**Ligne 22** :
```markdown
AVANT : Consultez notre [guide déménagement Lille](/blog/demenageur-lille/demenageur-lille-expert).
APRÈS : Consultez notre [guide déménagement Lille](/blog/demenagement-lille/demenageur-lille-expert).
```

### Exemple correction 2

**Fichier** : `satellites/diy-demenagement-lille-budget-mini.md`  
**Lien cassé** :
```markdown
AVANT : [location camion](/blog/location-camion-lille/location-camion-demenagement-lille-guide)
APRÈS : [location camion](/blog/demenagement-lille/location-camion-demenagement-lille-guide)
```

---

## ⚠️ POINTS VIGILANCE

### 1. CATEGORY_MAPPING peut contenir pièges

**Vérifier** :
```typescript
const CATEGORY_MAPPING = {
  'demenagement-lille': 'demenagement-lille',  // ← Pas de transformation
  // Ou absente → catégorie = catégorie frontmatter
};
```

**Si mapping absent** → cleanCategory = catégorie frontmatter (inchangé)

### 2. Ne pas confondre dossier et catégorie

```
❌ FAUX : Utiliser le nom du dossier pour l'URL
✅ JUSTE : Utiliser la catégorie frontmatter
```

### 3. Trailing slashes

**URLs Next.js ont TOUJOURS trailing slash** :
```
✅ /blog/demenagement-lille/demenageur-lille-expert/
❌ /blog/demenagement-lille/demenageur-lille-expert (pas de /)
```

**Mais dans markdown** : Lien SANS trailing slash
```markdown
✅ [guide](/blog/demenagement-lille/demenageur-lille-expert)
❌ [guide](/blog/demenagement-lille/demenageur-lille-expert/) (avec /)
```

---

## 📋 LIVRABLES

- [ ] README.md (ce fichier)
- [ ] commits.md (SHA monorepo + Lille)
- [ ] tests.md (URLs testées production)
- [ ] MAPPING-LIENS-LILLE.md (liste complète liens corrigés)
- [ ] progress.md (journal corrections)

---

## 🚀 COMMANDES RAPIDES

### Analyse rapide
```bash
cd /Users/guillaumestehelin/moverz_main-2/sites/lille/content/blog
grep -r "](/blog/demenageur-lille/" . --include="*.md" | wc -l
grep -r "](/blog/location-camion-lille/" . --include="*.md" | wc -l
grep -r "](/blog/garde-meuble-lille/" . --include="*.md" | wc -l
```

### Test production
```bash
curl -I https://devis-demenageur-lille.fr/blog/demenagement-lille/demenageur-lille-expert/
curl -I https://devis-demenageur-lille.fr/blog/demenageur-lille/demenageur-lille-expert/
```

### Correction pattern
```bash
cd sites/lille/content/blog
for file in $(grep -r "](/blog/demenageur-lille/" . --include="*.md" -l); do
  sed -i '' 's|](/blog/demenageur-lille/|](/blog/demenagement-lille/|g' "$file"
  echo "✅ $file"
done
```

---

## 📚 RÉFÉRENCES

- **Erreurs Bordeaux** : `ERREURS-APPRISES-BORDEAUX.md` ⭐⭐⭐
- **Architecture** : Ce README
- **Exemple réussi** : Bordeaux (SHA `8f719a0`)

---

**Status** : ⚠️ INCOMPLET - ERREUR À CORRIGER  
**Bloquants** : Revert en cours + Validation architecture nécessaire  
**Dépendances** : Comprendre vraie architecture Lille

