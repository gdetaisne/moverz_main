# 🔍 RAPPORT INCONSISTANCES - Audit Structure 11 Villes

**Date** : 01 novembre 2025  
**Tâche** : TASK-404-01  
**Analyste** : Cursor + Guillaume

---

## 📊 RÉSUMÉ EXÉCUTIF

**Total articles** : 1044  
**Total villes** : 11  
**Inconsistances critiques** : **1** (affecte 169 articles)  
**Inconsistances moyennes** : 3  
**Inconsistances mineures** : 1

**Villes nécessitant corrections** : 2 (Marseille, Lyon)  
**Villes OK** : 9

---

## 🔴 INCONSISTANCES CRITIQUES

### #1 : cleanSlug() Copier-Collé Bugué (Marseille + Lyon)

**Sévérité** : 🔴 CRITIQUE  
**Villes affectées** : Marseille (70 articles), Lyon (99 articles)  
**Total impact** : 169 articles

#### Problème

Les fichiers `sites/marseille/lib/blog.ts` et `sites/lyon/lib/blog.ts` contiennent des patterns `cleanSlug()` copier-collés depuis Bordeaux SANS adaptation :

```typescript
// sites/marseille/lib/blog.ts
const cleanPatterns = [
  { from: /^demenagement-etudiant-bordeaux-/, to: '' },  // ❌ Devrait être "marseille"
  { from: /^demenagement-entreprise-bordeaux-/, to: '' }, // ❌ Devrait être "marseille"
  { from: /-bordeaux-/, to: '-' },                       // ❌ Devrait être "marseille"
  // ...
];
```

**Conséquence** :
- Slugs Marseille et Lyon ne sont PAS nettoyés correctement
- Exemple : `demenagement-etudiant-marseille-guide` reste intact au lieu d'être nettoyé
- Peut créer URLs trop longues ou incohérentes

#### Solution

**TASK-404-02** : Remplacer patterns :
```typescript
// Marseille
{ from: /^demenagement-etudiant-bordeaux-/, to: '' }
→ { from: /^demenagement-etudiant-marseille-/, to: '' }

// Lyon  
{ from: /^demenagement-etudiant-bordeaux-/, to: '' }
→ { from: /^demenagement-etudiant-lyon-/, to: '' }
```

**Effort** : 15 min (chercher-remplacer automatique)

---

## 🟠 INCONSISTANCES MOYENNES

### #2 : Structure Catégories Hétérogène

**Sévérité** : 🟠 MOYEN  
**Villes affectées** : Marseille, Strasbourg, Rennes (3 catégories) vs 8 autres villes (11 catégories)

#### Problème

Deux structures différentes coexistent :

**Type A** : 3 catégories (Marseille, Strasbourg, Rennes)
```
content/blog/
  ├── piliers/          (guides complets)
  ├── satellites/       (articles SEO)
  └── general/          (autres)
```

**Type B** : 11 catégories (8 autres villes)
```
content/blog/
  ├── demenagement-etudiant/
  ├── demenagement-entreprise/
  ├── garde-meuble/
  ├── ... (8 autres)
```

**Conséquence** :
- Granularité différente (3 vs 11)
- Maintenance différente
- Peut perturber scripts globaux

#### Solution

**ACCEPTABLE** : Choix architectural voulu (pas un bug)

**Si besoin harmonisation** : Migrer Type A → Type B (effort ~5h/ville)  
**Mais** : Pas nécessaire pour TASK-404 (ne casse rien)

---

### #3 : Dossiers ≠ Catégories URL (Toulouse)

**Sévérité** : 🟠 MOYEN  
**Villes affectées** : Toulouse

#### Problème

Toulouse a seulement 2 dossiers :
```
content/blog/
  ├── piliers/
  └── satellites/
```

Mais `CATEGORY_MAPPING` définit 15+ catégories :
```typescript
const CATEGORY_MAPPING = {
  'demenagement-economique': 'pas-cher',
  'demenagement-etudiant': 'etudiant',
  'demenagement-entreprise': 'entreprise',
  // ... 12 autres
};
```

**Comment ça fonctionne** :
- Frontmatter `category` détermine l'URL
- Dossier sert seulement à organiser fichiers
- Exemple : `piliers/demenageur-toulouse.md` avec frontmatter `category: demenageur` → URL `/blog/demenageur/slug`

**Conséquence** :
- Confusion initiale (dossier ≠ URL)
- Nécessite comprendre frontmatter pour trouver articles

#### Solution

**ACCEPTABLE** : Architecture choisie (frontmatter > dossiers)

**Documentation** : Ajouter README dans `content/blog/` expliquant :
```markdown
# Structure Blog Toulouse

**IMPORTANT** : La catégorie URL est déterminée par le frontmatter `category`, 
PAS par le nom du dossier.

Dossiers = Organisation interne (piliers vs satellites)
Catégories = URLs publiques (voir CATEGORY_MAPPING)
```

---

### #4 : Accents dans CATEGORY_MAPPING

**Sévérité** : 🟠 MOYEN  
**Villes affectées** : Toulouse, Marseille, Lyon

#### Problème

Certains CATEGORY_MAPPING ont variantes avec accents :
```typescript
const CATEGORY_MAPPING = {
  'déménagement-etudiant': 'etudiant',        // ❌ Avec accent
  'demenagement-etudiant': 'etudiant',        // ✅ Sans accent
  'Déménagement entreprise': 'entreprise',    // ❌ Accent + majuscule
};
```

**Conséquence** :
- Accents dans URLs peuvent créer problèmes encoding
- Analyse GPT mentionne 200 URLs avec accents mal encodés
- Inconsistence (certaines villes ont accents, d'autres non)

#### Solution

**TASK-404-02** : Retirer TOUTES variantes avec accents :
```typescript
// GARDER SEULEMENT
const CATEGORY_MAPPING = {
  'demenagement-etudiant': 'etudiant',
  'demenagement-entreprise': 'entreprise',
  // ... sans accents
};
```

**Effort** : 30 min (nettoyage 11 fichiers)

---

## 🟡 INCONSISTANCES MINEURES

### #5 : CATEGORY_MAPPING['satellites'] = null (Nice)

**Sévérité** : 🟡 MINEUR  
**Villes affectées** : Nice

#### Problème

```typescript
// sites/nice/lib/blog.ts
const CATEGORY_MAPPING = {
  'satellites': null,  // ⚠️ null au lieu d'une catégorie
  // ... autres
};
```

**Conséquence** :
- Articles dans dossier `satellites/` n'ont pas de catégorie par défaut
- DOIT avoir frontmatter `category` sinon article invisible

**Solution actuelle** : Tous articles satellites Nice ont frontmatter `category` → OK

**Solution permanente** :
```typescript
'satellites': 'conseils',  // ou autre catégorie par défaut
```

**Effort** : 2 min

---

## 📋 ARTICLES VRAIMENT MANQUANTS

### Distribution par ville

| Ville | Articles manquants | % du total ville |
|-------|-------------------|------------------|
| Rouen | 34 | 35.8% |
| Montpellier | 33 | 22.4% |
| Lyon | 18 | 15.4% |
| Bordeaux | 7 | 6.5% |
| Toulouse | 6 | 6.1% |
| Lille | 4 | 3.5% |
| Strasbourg | 2 | 2.1% |
| **TOTAL** | **104** | **9.7%** |

**Insight** : Rouen et Montpellier concentrent 64% des articles manquants (67/104)

**Liste complète** : Voir `VERIFICATION-ARTICLES.json` → `results.vraimentManquants`

---

## ✅ RECOMMANDATIONS PAR PRIORITÉ

### Priorité P0 (CRITIQUE) : À faire dans TASK-404-02

1. **Fix cleanSlug() Marseille et Lyon** (15 min)
   - Remplacer tous patterns `bordeaux` par `marseille`/`lyon`
   - Tester avec 5 articles/ville
   - Vérifier URLs ne changent pas (ou créer redirections si changent)

2. **Retirer accents CATEGORY_MAPPING** (30 min)
   - Supprimer variantes avec accents
   - Garder seulement versions sans accents
   - Valider avec build

### Priorité P1 (IMPORTANT) : À faire dans TASK-404-02

3. **Fix CATEGORY_MAPPING['satellites'] Nice** (2 min)
   - Changer `null` → `'conseils'`
   - Ou autre catégorie par défaut appropriée

### Priorité P2 (OPTIONNEL) : Post-404

4. **Documenter structure Toulouse** (15 min)
   - Ajouter README expliquant frontmatter > dossiers
   - Documenter choix architectural

5. **Harmoniser 3 vs 11 catégories** (5h/ville si nécessaire)
   - Seulement si besoin futur
   - Marseille, Strasbourg, Rennes → 11 catégories
   - Mais PAS urgent (fonctionne bien actuellement)

---

## 📊 VALIDATION FINALE

### Checklist audit TASK-404-01

- [x] cleanSlug() audité (11 villes)
- [x] CATEGORY_MAPPING audité (11 villes)
- [x] Incohérences identifiées (5 au total)
- [x] Solutions proposées pour chaque
- [x] Mapping complet exporté (JSON)
- [x] Articles manquants validés (104)

### Livrables créés

- [x] `MAPPING-STRUCTURE-11-VILLES.json` (mapping complet)
- [x] `RAPPORT-INCONSISTANCES.md` (ce document)
- [x] `audit-cleanslug-all.txt` (raw audit)
- [x] `audit-category-mapping-all.txt` (raw audit)

### Prochaine étape

**TASK-404-02 : Harmonisation Technique** (1-2h)
- Corriger les 3 inconsistances P0/P1
- Tester validation
- Commit + deploy

---

**FIN DU RAPPORT**

*Ce rapport sert de base pour TASK-404-02.*

