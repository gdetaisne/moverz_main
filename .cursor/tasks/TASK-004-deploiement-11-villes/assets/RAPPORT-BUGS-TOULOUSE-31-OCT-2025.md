# 🐛 Rapport des Bugs - Site Toulouse
## Date : 31 Octobre 2025

---

## 📊 RÉSUMÉ EXÉCUTIF

**Statut** : Toulouse a **multiples bugs critiques** de configuration

| Métrique | Valeur | Statut |
|----------|--------|--------|
| **Articles** | 93 | ✅ Bon |
| **Liens cassés** | 92 | 🔴 Critique |
| **Bugs trouvés** | 3 majeurs | 🔴 Critique |
| **Bugs corrigés** | 3/3 | ✅ Complété |
| **Validation** | ⚠️ Requiert test local | 🟡 En attente |

---

## 🐛 BUG #1 : RÉFÉRENCE À ROUEN DANS blog.ts ✅ CORRIGÉ

### Détection
**Fichier** : `sites/toulouse/lib/blog.ts` ligne 99

**Code buggé** :
```typescript
const monorepoDir = path.join(process.cwd(), 'sites/rouen/content/blog');
```

### Impact
- Toulouse chargeait potentiellement le blog de Rouen
- Risque de contenu incorrect affiché

### Correction Appliquée
```typescript
const monorepoDir = path.join(process.cwd(), 'sites/toulouse/content/blog');
```

✅ **Statut** : Corrigé

---

## 🐛 BUG #2 : PATTERNS CLEANSLUG POUR BORDEAUX ✅ CORRIGÉ

### Détection
**Fichier** : `sites/toulouse/lib/blog.ts` lignes 70-91

**Code buggé** :
```typescript
{ from: /^demenagement-etudiant-bordeaux-/, to: '' },
{ from: /^demenagement-entreprise-bordeaux-/, to: '' },
// ... tous les patterns disent "bordeaux" au lieu de "toulouse"
```

### Impact
- La fonction cleanSlug() ne nettoyait RIEN sur les slugs de Toulouse
- Les slugs restaient intacts au lieu d'être optimisés

### Correction Appliquée
Remplacement de **tous** les patterns "bordeaux" par "toulouse"

✅ **Statut** : Corrigé

---

## 🐛 BUG #3 : MAPPING CATÉGORIES INCOMPLET ✅ CORRIGÉ

### Détection
**Fichier** : `sites/toulouse/lib/blog.ts` lignes 6-35

**Problème** : Le CATEGORY_MAPPING ne contenait pas toutes les catégories du frontmatter

**Catégories manquantes** :
- `aide-deménagement` (avec accent) → maintenant mappé vers `aide`
- `déménagement-entreprise` (avec accent) → maintenant mappé vers `entreprise`
- `déménageur-professionnel` → maintenant mappé vers `demenageur`
- `prix-déménagement` (avec accent) → maintenant mappé vers `prix`

### Impact
- Les catégories avec accents n'étaient pas normalisées
- URLs incohérentes

### Correction Appliquée
Ajout de toutes les variantes avec accents dans le mapping

✅ **Statut** : Corrigé

---

## ⚠️ PROBLÈME #4 : INCOHÉRENCE STRUCTURE PILIERS

### Détection
Les articles piliers ont une structure différente des autres sites :

**Dossier** : `piliers/`
**Frontmatter catégories** : Chacune différente
- aide-au-demenagement-toulouse.md → category: "aide-deménagement"
- demenagement-d-entreprise-toulouse.md → category: "deménagement-entreprise"
- demenagement-international-toulouse.md → category: "international"
- etc.

### Impact
- Le script `analyze-404.mjs` ne peut pas valider correctement les URLs
- Il utilise le nom du DOSSIER ("piliers") au lieu du frontmatter ("international", etc.)

### Solutions Possibles

**Option A** : Modifier analyze-404.mjs pour lire le frontmatter (complexe)

**Option B** : Uniformiser les catégories frontmatter des piliers vers "piliers"

**Option C** : Déplacer les piliers dans des dossiers correspondant à leur catégorie

**Option D** : Tester le site en local pour valider quelles URLs fonctionnent vraiment

🟡 **Statut** : En attente de décision

---

## 🔍 ANALYSE DES 92 LIENS CASSÉS

### Répartition

| Type | Nombre | % |
|------|--------|---|
| **Articles fantômes** | ~6-10 | ~10% |
| **Liens vers piliers** | ~82-86 | ~90% |

### Articles Fantômes (À Supprimer)

Liens vers des articles qui n'existent pas dans `demenageur-toulouse.md` :

```markdown
- /blog/satellites/demenagement-immediat-24h-toulouse
- /blog/satellites/demenagement-instantane-24h-toulouse
- /blog/satellites/demenagement-eclair-24h-toulouse
- /blog/satellites/demenagement-ultra-rapide-24h-toulouse
- ... et autres variantes
```

**Recommandation** : Supprimer ces liens (contenu redondant)

### Liens vers Piliers (État Actuel)

**Format actuel** (après corrections v3) :
```markdown
/blog/aide/aide-au-demenagement-toulouse
/blog/entreprise/demenagement-d-entreprise-toulouse
/blog/international/demenagement-international-toulouse
/blog/pas-cher/demenagement-pas-cher-toulouse
/blog/piano/demenagement-piano-toulouse
/blog/demenageur/demenageur-toulouse
/blog/garde-meuble/garde-meuble-toulouse
/blog/location-camion/location-camion-demenagement-toulouse
/blog/etudiant/petit-demenagement-toulouse
/blog/prix/prix-demenagement-toulouse
```

**Question** : Est-ce le bon format ?

🟡 **Statut** : Nécessite validation en local

---

## 🎯 PLAN D'ACTION RECOMMANDÉ

### Phase 1 : Validation (URGENT) ⚡

**Objectif** : Confirmer les URLs réelles générées par Next.js

**Actions** :
1. Démarrer le site Toulouse en local :
   ```bash
   cd sites/toulouse
   npm install
   npm run dev -- -p 3003
   ```

2. Tester les URLs des piliers dans le navigateur :
   ```
   http://localhost:3003/blog/aide/aide-au-demenagement-toulouse
   http://localhost:3003/blog/international/demenagement-international-toulouse
   http://localhost:3003/blog/demenageur/demenageur-toulouse
   etc.
   ```

3. Noter quelles URLs **fonctionnent vraiment**

4. Documenter le pattern exact

**Temps estimé** : 15 minutes

---

### Phase 2 : Corrections Finales

**Selon résultats de la Phase 1** :

**Scénario A** : Les URLs actuelles fonctionnent
- → Modifier analyze-404.mjs pour Toulouse
- → Supprimer les liens fantômes
- → Valider

**Scénario B** : Les URLs ne fonctionnent pas
- → Identifier le bon pattern
- → Créer script de correction v4
- → Appliquer et tester

**Temps estimé** : 30-60 minutes

---

### Phase 3 : Documentation

1. Mettre à jour README.md du blog
2. Documenter les conventions d'URLs
3. Créer guide de contribution

**Temps estimé** : 30 minutes

---

## 📝 CORRECTIONS DÉJÀ APPLIQUÉES

### Fichiers Modifiés

1. ✅ `sites/toulouse/lib/blog.ts` (ligne 99) - rouen → toulouse
2. ✅ `sites/toulouse/lib/blog.ts` (lignes 70-91) - bordeaux → toulouse
3. ✅ `sites/toulouse/lib/blog.ts` (lignes 6-35) - mapping catégories enrichi
4. ✅ `scripts/analyze-404.mjs` (ligne 62) - ajout configuration Toulouse
5. ✅ `sites/toulouse/content/blog/**/*.md` - liens corrigés (v3)

### Scripts Créés

1. ✅ `scripts/fix-toulouse-links.sh` (v1 - obsolète)
2. ✅ `scripts/fix-toulouse-links-v2.sh` (v2 - obsolète)
3. ✅ `scripts/fix-toulouse-links-v3-final.sh` (v3 - actuel)

---

## 🔬 BUGS TROUVÉS SUR D'AUTRES SITES

### Bug blog.ts (rouen) sur 9 sites

**Sites impactés** :
- Toulouse ✅ Corrigé
- Strasbourg ✅ Corrigé
- Rennes ✅ Corrigé
- Nantes ✅ Corrigé
- Montpellier ✅ Corrigé
- Marseille ✅ Corrigé
- Lyon ✅ Corrigé
- Lille ✅ Corrigé
- Bordeaux ✅ Corrigé

**Sites corrects** :
- Nice ✅ Déjà correct
- Rouen ✅ Déjà correct

---

## 💡 LEÇONS APPRISES

### Problèmes de Copier-Coller

**Bugs trouvés** :
1. Référence à "rouen" dans blog.ts (9 sites)
2. Patterns "bordeaux" dans cleanSlug (Toulouse)
3. Configuration manquante dans analyze-404.mjs

**Recommandation** : Créer un système de templates dynamiques

### Incohérences de Configuration

**Problème** : Chaque site a une configuration légèrement différente
- Marseille : Catégories dans les noms de dossiers
- Nice : Catégories standardisées
- Toulouse : Catégories dans le frontmatter avec dossier "piliers"

**Recommandation** : Standardiser l'approche sur tous les sites

---

## 🎓 PROCHAINES ÉTAPES IMMÉDIATES

### 1. TESTER EN LOCAL (15 min) ⭐ PRIORITÉ MAX

```bash
cd sites/toulouse
npm install
npm run dev -- -p 3003
```

Ouvrir dans le navigateur et tester les URLs des piliers.

### 2. DOCUMENTER LES RÉSULTATS (5 min)

Noter dans un fichier quelles URLs fonctionnent.

### 3. CORRIGER SI NÉCESSAIRE (30 min)

Selon les résultats du test.

### 4. VALIDER (5 min)

Relancer l'analyse 404 et confirmer 0 erreurs.

---

## 📊 ÉTAT FINAL

| Tâche | Statut |
|-------|--------|
| ✅ Bug #1 corrigé (rouen) | Complété |
| ✅ Bug #2 corrigé (bordeaux patterns) | Complété |
| ✅ Bug #3 corrigé (mapping catégories) | Complété |
| ✅ Liens mis à jour (v3) | Complété |
| ⏳ Test local requis | En attente |
| ⏳ Validation finale | En attente |
| ⏳ Documentation | En attente |

---

## 🏁 CONCLUSION

**Toulouse a 3 bugs majeurs de configuration** qui ont tous été corrigés :
1. ✅ Référence à Rouen
2. ✅ Patterns pour Bordeaux
3. ✅ Mapping catégories incomplet

**Mais** : La validation finale nécessite un **test en local** pour confirmer que les URLs générées correspondent aux liens corrigés.

**Temps total investi** : ~3h d'analyse et corrections
**Temps restant estimé** : ~1h pour validation et documentation

---

**Analyste** : Claude Sonnet 4.5  
**Date** : 31 Octobre 2025  
**Statut** : Corrections appliquées, validation en attente  
**Prochaine action** : Test local pour valider les URLs

