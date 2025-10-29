# 🛠️ Scripts de Résolution des 404s

Guide rapide des scripts disponibles pour résoudre les 2,970 liens cassés.

---

## 📋 SCRIPTS PRINCIPAUX

### 1. `analyze-404.mjs` - Analyse de base
**Usage**: Détecte tous les liens cassés dans tous les sites

```bash
node scripts/analyze-404.mjs
```

**Sortie**: 
- Console: Résumé par ville + catégorisation
- Fichier: `404-analysis.json` (données complètes)

**Quand l'utiliser**: 
- ✅ Avant de commencer
- ✅ Après chaque phase de correction
- ✅ Pour valider les résultats

---

### 2. `validate-404-progress.sh` - Suivi de progression
**Usage**: Affiche l'état actuel + progression + recommandations

```bash
bash scripts/validate-404-progress.sh
```

**Sortie**:
- État actuel (nb de 404s)
- Progression globale avec barre visuelle
- Top 5 villes problématiques
- Prochaines actions recommandées
- Historique d'évolution

**Quand l'utiliser**:
- ✅ Régulièrement (recommandé: tous les lundis)
- ✅ Après chaque phase
- ✅ Pour suivre la progression

**Prérequis**: `jq` installé (`brew install jq`)

---

### 3. `phase1-fix-ville-prefixes.sh` - Phase 1
**Usage**: Corrige automatiquement les préfixes ville répétés

```bash
bash scripts/phase1-fix-ville-prefixes.sh
```

**Ce qu'il fait**:
- Crée backup automatique dans `backups/links-YYYYMMDD-HHMMSS/`
- Corrige tous les patterns pour les 11 villes:
  - `garde-meuble-{ville}/garde-meuble-{ville}-*` → `garde-meuble-{ville}/*`
  - `demenagement-{ville}/demenagement-{ville}-*` → `demenagement-{ville}/*`
  - Et 15+ autres patterns
- Affiche progression par ville

**Résultat attendu**: 2,970 → ~1,806 404s (-39%)

**Durée**: 5-10 minutes d'exécution

**Quand l'utiliser**: 
- ✅ Phase 1 (première action recommandée)
- ✅ Une seule fois

---

### 4. `analyze-missing-articles-detailed.mjs` - Phase 3
**Usage**: Analyse fine des articles "manquants"

```bash
node scripts/analyze-missing-articles-detailed.mjs
```

**Ce qu'il fait**:
1. Lit `404-analysis.json`
2. Pour chaque URL "manquante":
   - Cherche dans autres catégories
   - Détecte variations de slug
   - Calcule similarité (Levenshtein)
3. Classe en 6 types:
   - Exact match
   - Mauvaise catégorie
   - Variation de slug
   - Correspondance floue
   - Vraiment manquant
   - Format invalide

**Sortie**:
- Console: Résumé + Top 10 articles à créer
- `missing-articles-detailed.json`: Analyse complète
- `scripts/phase4-fix-wrong-categories.sh`: Script auto-généré

**Quand l'utiliser**: 
- ✅ Phase 3 (après Phase 1-2)
- ✅ Une fois pour générer le script Phase 4

---

### 5. `phase4-fix-wrong-categories.sh` - Phase 4
**Usage**: Applique les corrections automatiques identifiées en Phase 3

```bash
bash scripts/phase4-fix-wrong-categories.sh
```

**⚠️ IMPORTANT**: Ce script est **auto-généré** par `analyze-missing-articles-detailed.mjs`

**Ce qu'il fait**:
- Crée backup automatique
- Corrige catégories incorrectes (~153 URLs)
- Corrige variations de slug (~50 URLs)
- Affiche progression

**Résultat attendu**: 1,618 → ~40 404s (-97%)

**Quand l'utiliser**: 
- ✅ Phase 4 (après Phase 3)
- ✅ Une fois après génération

---

## 📊 WORKFLOW RECOMMANDÉ

### Étape 1: Diagnostic
```bash
# Voir l'état actuel
bash scripts/validate-404-progress.sh
```

### Étape 2: Phase 1 (Préfixes)
```bash
# Exécuter corrections préfixes
bash scripts/phase1-fix-ville-prefixes.sh

# Valider
node scripts/analyze-404.mjs
bash scripts/validate-404-progress.sh
```

### Étape 3: Phase 3 (Analyse fine)
```bash
# Analyser articles manquants
node scripts/analyze-missing-articles-detailed.mjs

# Vérifier rapport
cat missing-articles-detailed.json | jq '.trulyMissing | length'
```

### Étape 4: Phase 4 (Corrections auto)
```bash
# Exécuter corrections automatiques
bash scripts/phase4-fix-wrong-categories.sh

# Valider
node scripts/analyze-404.mjs
bash scripts/validate-404-progress.sh
```

### Étape 5: Phase 5 (Création contenu)
```bash
# Lister articles à créer (par priorité)
jq -r '.trulyMissing | sort_by(-.frequency)[] | "\(.city) - \(.url) (\(.frequency)x)"' \
  missing-articles-detailed.json

# Créer les articles manuellement
# ...

# Valider régulièrement
node scripts/analyze-404.mjs
```

### Étape 6: Validation finale
```bash
# Dernière vérification
bash scripts/validate-404-progress.sh

# Devrait afficher: 0 liens cassés ✅
```

---

## 📁 FICHIERS GÉNÉRÉS

| Fichier | Créé par | Description |
|---------|----------|-------------|
| `404-analysis.json` | `analyze-404.mjs` | Données brutes de l'analyse |
| `missing-articles-detailed.json` | `analyze-missing-articles-detailed.mjs` | Analyse fine des articles |
| `phase4-fix-wrong-categories.sh` | `analyze-missing-articles-detailed.mjs` | Script de correction auto-généré |
| `404-progress-history.json` | `validate-404-progress.sh` | Historique d'évolution |
| `backups/links-*/` | Scripts Phase 1, 4 | Backups automatiques |

---

## 🔧 AUTRES SCRIPTS (PRÉ-EXISTANTS)

### Scripts de correction existants

| Script | Description |
|--------|-------------|
| `phase1-fix-blog-ts.sh` | Corrige `lib/blog.ts` (déjà commenté) |
| `phase2-fix-categories.mjs` | Correction catégories (version alternative) |
| `phase3-fix-slug-variations.mjs` | Correction slugs (version alternative) |
| `verify-real-missing-articles.mjs` | Vérification articles (version ancienne) |

**Note**: Les nouveaux scripts (`phase1-fix-ville-prefixes.sh` et `analyze-missing-articles-detailed.mjs`) sont recommandés car plus complets.

---

## 🚨 DÉPANNAGE

### "Permission denied"
```bash
chmod +x scripts/*.sh scripts/*.mjs
```

### "jq: command not found"
```bash
brew install jq
```

### Restaurer un backup
```bash
# Lister backups disponibles
ls -lh backups/

# Restaurer un backup spécifique
cp -R backups/links-20251029-120000/* sites/
```

### Script Phase 4 introuvable
```bash
# Le script est auto-généré par Phase 3
node scripts/analyze-missing-articles-detailed.mjs

# Vérifier qu'il est créé
ls -lh scripts/phase4-fix-wrong-categories.sh
```

---

## 📖 DOCUMENTATION

- **Guide complet**: `../GUIDE-RESOLUTION-404.md`
- **Résumé exécutif**: `../RESUME-404-EXECUTIF.md`
- **Analyse détaillée**: `../ANALYSE-404-EXHAUSTIVE-2025-10-29.md`

---

## ⚡ COMMANDES RAPIDES

```bash
# État actuel + recommandations
bash scripts/validate-404-progress.sh

# Phase 1 (immédiat)
bash scripts/phase1-fix-ville-prefixes.sh

# Validation après Phase 1
node scripts/analyze-404.mjs

# Phase 3 (analyse fine)
node scripts/analyze-missing-articles-detailed.mjs

# Phase 4 (corrections auto)
bash scripts/phase4-fix-wrong-categories.sh

# Suivi continu
bash scripts/validate-404-progress.sh
```

---

## 📊 ORDRE D'EXÉCUTION

```
1. validate-404-progress.sh       → Diagnostic
          ↓
2. phase1-fix-ville-prefixes.sh   → Correction préfixes (-39%)
          ↓
3. analyze-404.mjs                → Validation Phase 1
          ↓
4. analyze-missing-articles-detailed.mjs  → Analyse fine
          ↓
5. phase4-fix-wrong-categories.sh → Corrections auto (-97%)
          ↓
6. analyze-404.mjs                → Validation Phase 4
          ↓
7. [Création manuelle ~40 articles]
          ↓
8. validate-404-progress.sh       → Validation finale (0 404)
```

---

**Questions?** Consultez le [guide complet](../GUIDE-RESOLUTION-404.md)

