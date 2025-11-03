# TASK-026 : Créer Montpellier/Nice avec Structure Blog Optimale SEO

**Date création** : 03 novembre 2025  
**Priorité** : P2 (Important moyen terme)  
**Assigné** : Guillaume  
**Temps estimé** : 8-10h par ville (16-20h total pour 2 villes)

---

## 🎯 OBJECTIF

Créer les blogs Montpellier et Nice avec **structure d'URLs optimale SEO** dès le départ, pour éviter les erreurs de Bordeaux/Lille et maximiser le ranking Google.

**Référence** : Structure C (score 9/10) définie dans `ANALYSE-SEO-STRUCTURES-URLS.md`

---

## 📊 CONTEXTE

### Problèmes villes actuelles

**Bordeaux** (Structure longue) :
```
❌ /blog/demenagement-pas-cher-bordeaux/demenagement-pas-cher-bordeaux-guide/
   → 75-85 caractères (pénalisé Google)
   → Redondance excessive
   → CTR SERPs -15%
```

**Lille** (Structure fourre-tout) :
```
❌ /blog/demenagement-lille/demenageur-lille-expert/
   → Catégorie générique
   → Pas de silo thématique
   → Autorité diluée
```

### Structure optimale (Montpellier/Nice)

```
✅ /blog/demenageur/demenageur-montpellier-expert/
✅ /blog/pas-cher/demenagement-pas-cher-montpellier-guide/
✅ /blog/garde-meuble/garde-meuble-montpellier-guide/
✅ /blog/prix/prix-demenagement-montpellier-guide/
   → 45-52 caractères (optimal)
   → Silos thématiques clairs
   → CTR SERPs +150%
```

---

## 🎨 ARCHITECTURE CIBLE

### Structure dossiers

```
sites/montpellier/content/blog/
├── demenageur/              # Catégorie courte
│   ├── demenageur-montpellier-expert.md
│   └── ...
├── pas-cher/
│   ├── demenagement-pas-cher-montpellier-guide.md
│   └── astuces-pas-cher-montpellier.md
├── garde-meuble/
│   ├── garde-meuble-montpellier-guide.md
│   └── prix-garde-meuble-montpellier.md
├── prix/
│   ├── prix-demenagement-montpellier-guide.md
│   └── devis-demenagement-montpellier.md
├── entreprise/
│   ├── demenagement-entreprise-montpellier-guide.md
│   └── ...
├── international/
│   ├── demenagement-international-montpellier-guide.md
│   └── ...
├── etudiant/
│   ├── demenagement-etudiant-montpellier-guide.md
│   └── ...
├── piano/
│   ├── demenagement-piano-montpellier-guide.md
│   └── ...
├── urgent/
│   ├── demenagement-urgent-montpellier-guide.md
│   └── ...
├── location-camion/
│   ├── location-camion-montpellier-guide.md
│   └── ...
└── satellites/              # Articles transverses
    ├── checklist-demenagement-montpellier.md
    └── ...
```

### Catégories standard (10 principales)

| Catégorie | Mot-clé principal | Volume recherche | Difficulté |
|-----------|-------------------|------------------|------------|
| `demenageur` | "déménageur {ville}" | 2900/mois | Moyenne |
| `pas-cher` | "déménagement pas cher {ville}" | 1600/mois | Facile |
| `garde-meuble` | "garde meuble {ville}" | 880/mois | Facile |
| `prix` | "prix déménagement {ville}" | 720/mois | Moyenne |
| `entreprise` | "déménagement entreprise {ville}" | 480/mois | Moyenne |
| `international` | "déménagement international {ville}" | 320/mois | Difficile |
| `etudiant` | "déménagement étudiant {ville}" | 260/mois | Facile |
| `piano` | "déménagement piano {ville}" | 170/mois | Facile |
| `urgent` | "déménagement urgent {ville}" | 140/mois | Moyenne |
| `location-camion` | "location camion {ville}" | 590/mois | Facile |

**Total volume** : ~8000 recherches/mois par ville

---

## 📝 TEMPLATE FRONTMATTER

### Guide pilier

```markdown
---
title: "Déménageur Montpellier : Devis Gratuit | Service Expert 2025"
meta_title: "Déménageur Montpellier : Devis Gratuit | Service Expert 2025"
meta_description: "Déménageur professionnel à Montpellier. Devis gratuit en 2 min, équipe experte, tarifs transparents. 500+ déménagements réussis."
h1: "Votre Déménageur Expert à Montpellier"
slug: "demenageur-montpellier-expert"
category: "demenageur"                    # ✅ Catégorie COURTE (pas "demenagement-montpellier")
type: "pilier"
keywords:
  - "déménageur montpellier"
  - "déménagement montpellier"
  - "société déménagement montpellier"
  - "devis déménagement montpellier"
publishedAt: "2025-11-04"
author: "Équipe Moverz Montpellier"
featured: true
---
```

### Article satellite

```markdown
---
title: "Prix Déménageur Montpellier 2025 : Tarifs & Budget Réel"
meta_title: "Prix Déménageur Montpellier 2025 : 450-1800€ (T2-T4)"
meta_description: "Prix déménageur Montpellier : T2 = 450-850€, T3 = 750-1300€, T4 = 1200-1800€. Comparatif détaillé + astuces économies 2025."
slug: "prix-demenageur-montpellier-2025"
category: "demenageur"                    # ✅ Même catégorie que pilier
type: "satellite"
pilier_parent: "demenageur-montpellier-expert"
keywords:
  - "prix déménageur montpellier"
  - "tarif déménagement montpellier"
  - "coût déménageur montpellier"
publishedAt: "2025-11-04"
author: "Équipe Moverz Montpellier"
featured: false
---
```

---

## 🔧 MODIFICATIONS TECHNIQUES

### 1. `lib/blog.ts` - Vérifier mapping catégories

Ajouter/vérifier dans `CATEGORY_MAPPING` :

```typescript
const CATEGORY_MAPPING = {
  // ✅ Catégories courtes (nouvelles villes)
  'demenageur': 'demenageur',
  'pas-cher': 'pas-cher',
  'garde-meuble': 'garde-meuble',
  'prix': 'prix',
  'entreprise': 'entreprise',
  'international': 'international',
  'etudiant': 'etudiant',
  'piano': 'piano',
  'urgent': 'urgent',
  'location-camion': 'location-camion',
  'satellites': 'conseils',
  
  // ⚠️ Legacy (anciennes villes - ne pas utiliser pour nouvelles)
  'demenagement-pas-cher-bordeaux': 'pas-cher',
  'demenagement-lille': 'demenagement-lille',
  // ...
};
```

### 2. Slug cleaning - Adapter pour nouvelles villes

```typescript
function cleanSlug(originalSlug: string, category: string): string {
  let cleanSlug = originalSlug;
  
  // ✅ Patterns Montpellier/Nice (ville à la fin uniquement)
  const cleanPatterns = [
    // Retirer redondances catégorie
    { from: /^demenageur-montpellier-/, to: 'demenageur-montpellier-' },
    { from: /^demenagement-pas-cher-montpellier-/, to: 'pas-cher-montpellier-' },
    // ... autres patterns
  ];
  
  cleanPatterns.forEach(pattern => {
    cleanSlug = cleanSlug.replace(pattern.from, pattern.to);
  });
  
  return cleanSlug;
}
```

### 3. Vérifier routing Next.js

Routes à tester :
```
/blog/demenageur/
/blog/demenageur/demenageur-montpellier-expert/
/blog/pas-cher/
/blog/pas-cher/demenagement-pas-cher-montpellier-guide/
```

---

## ✅ CHECKLIST COMPLÈTE

### Phase 1 : Préparation (1h)

- [ ] Lire `ANALYSE-SEO-STRUCTURES-URLS.md` (comprendre structure optimale)
- [ ] Vérifier `lib/blog.ts` catégories mapping
- [ ] Créer structure dossiers `sites/montpellier/content/blog/`
- [ ] Créer templates frontmatter (piliers + satellites)

### Phase 2 : Contenu Montpellier (6-8h)

**Guides piliers** (1h chacun) :
- [ ] `demenageur/demenageur-montpellier-expert.md`
- [ ] `pas-cher/demenagement-pas-cher-montpellier-guide.md`
- [ ] `garde-meuble/garde-meuble-montpellier-guide.md`
- [ ] `prix/prix-demenagement-montpellier-guide.md`
- [ ] `entreprise/demenagement-entreprise-montpellier-guide.md`
- [ ] `international/demenagement-international-montpellier-guide.md`

**Articles satellites** (30 min chacun) :
- [ ] `demenageur/prix-demenageur-montpellier-2025.md`
- [ ] `pas-cher/astuces-demenagement-pas-cher-montpellier.md`
- [ ] `garde-meuble/prix-garde-meuble-montpellier.md`
- [ ] `prix/devis-demenagement-montpellier.md`
- [ ] ... (10-15 satellites total)

### Phase 3 : Validation Technique (1h)

- [ ] Build local : `cd sites/montpellier && npm run build`
- [ ] Vérifier URLs générées : `/blog/{category}/{slug}/`
- [ ] Tester liens internes (aucun 404)
- [ ] Vérifier canonical URLs
- [ ] Tester metadata (title, description)

### Phase 4 : SEO Checks (30 min)

- [ ] URLs < 60 caractères ✅
- [ ] Catégories thématiques claires ✅
- [ ] Mots-clés dans slugs ✅
- [ ] Structure en silo ✅
- [ ] Liens internes cohérents ✅

### Phase 5 : Déploiement (30 min)

- [ ] Commit GitHub monorepo
- [ ] Push repo `moverz-montpellier`
- [ ] Déploiement CapRover
- [ ] Vérifier site live
- [ ] Test URLs production

### Phase 6 : Répéter pour Nice (8-10h)

- [ ] Dupliquer structure
- [ ] Adapter contenu Nice
- [ ] Tests techniques
- [ ] Déploiement

---

## 📈 CRITÈRES DE SUCCÈS

### Techniques

✅ Toutes URLs < 60 caractères  
✅ Structure dossier = catégorie frontmatter  
✅ 0 lien interne 404  
✅ Build sans erreur  
✅ Metadata complète  

### SEO

✅ 10 catégories thématiques créées  
✅ Silos cohérents (piliers + satellites par catégorie)  
✅ Ville dans slug uniquement (pas dans catégorie)  
✅ Mots-clés principaux couverts  
✅ Structure scalable (réutilisable pour autres villes)

### Business

✅ 6+ guides piliers par ville  
✅ 10-15 satellites par ville  
✅ Maillage interne optimisé  
✅ Prêt pour indexation Google

---

## 🎯 RÉSULTATS ATTENDUS

### Ranking projeté (3-6 mois post-lancement)

| Mot-clé | Montpellier (Structure optimale) | Bordeaux actuel (Comparaison) |
|---------|----------------------------------|-------------------------------|
| "déménageur montpellier" | Position 8-12 (page 1) | Position 15-20 (page 2) |
| "déménagement pas cher montpellier" | Position 5-10 (page 1) | Position 12-18 (page 2) |
| "garde meuble montpellier" | Position 6-12 (page 1) | Position 18-25 (page 2-3) |

### Trafic organique estimé

**Montpellier** (structure optimale) :
- Mois 1 : ~50 visites/mois
- Mois 3 : ~300 visites/mois
- Mois 6 : ~800-1200 visites/mois

**Bordeaux** (structure actuelle - référence) :
- Mois 6 : ~400-600 visites/mois

**Gain projeté : +100-150%** grâce à structure optimale

---

## 📁 FICHIERS LIVRABLES

```
.cursor/tasks/[P2]-TASK-026-blog-structure-optimale/
├── README.md (ce fichier)
├── context.md (pourquoi structure optimale)
├── progress.md (journal de création)
├── commits.md (SHA GitHub)
├── tests.md (validation technique + SEO)
├── decisions.md (choix techniques)
├── TEMPLATE-PILIER.md (template réutilisable)
├── TEMPLATE-SATELLITE.md (template réutilisable)
├── CATEGORIES-STANDARD.md (liste 10 catégories)
└── MONTPELLIER-URLS-FINALES.md (inventaire URLs créées)
```

---

## ⚠️ POINTS VIGILANCE

### 1. Cohérence dossier = catégorie

```markdown
# ✅ BON
Dossier : pas-cher/
Fichier : demenagement-pas-cher-montpellier-guide.md
Frontmatter : category: "pas-cher"
URL : /blog/pas-cher/demenagement-pas-cher-montpellier-guide/

# ❌ MAUVAIS (erreur Lille)
Dossier : demenageur-montpellier/
Frontmatter : category: "demenagement-montpellier"
URL : /blog/demenagement-montpellier/... (pas ce qu'on veut)
```

### 2. Slug contient ville (pas catégorie)

```markdown
# ✅ BON
slug: "demenageur-montpellier-expert"
→ Ville dans slug = signal local

# ❌ MAUVAIS
slug: "expert" 
→ Pas de localisation
```

### 3. Maillage interne

Tous les liens internes doivent pointer vers `/blog/{category}/{slug}/` :

```markdown
# ✅ BON
[guide déménageur](/blog/demenageur/demenageur-montpellier-expert)

# ❌ MAUVAIS (erreur Lille)
[guide déménageur](/blog/demenageur-montpellier/demenageur-montpellier-expert)
```

### 4. Tester avant déploiement

Toujours builder localement pour vérifier :
```bash
cd sites/montpellier
npm run build
npm run start
# Tester tous les liens manuellement
```

---

## 🚀 PROCHAINES ÉTAPES

Une fois Montpellier/Nice créés avec structure optimale :

1. **Monitoring 3-6 mois** : Comparer analytics vs Bordeaux/Lille
2. **Validation ROI** : Si Montpellier >> Bordeaux, structure optimale prouvée
3. **Migration anciennes villes** : Décision de migrer Bordeaux/Lille (avec redirections)

---

## 📚 RÉFÉRENCES

- **Analyse SEO complète** : `ANALYSE-SEO-STRUCTURES-URLS.md`
- **Principes sacrés** : `.cursor/PRINCIPES-SACRES.md`
- **Architecture multi-sites** : `.cursor/ARCHITECTURE-MULTISITES.md`
- **Backlinko URL study** : https://backlinko.com/search-engine-ranking
- **Ahrefs silos SEO** : https://ahrefs.com/blog/website-structure/

---

**Status** : 📋 TODO (pas encore démarré)  
**Bloquants** : Aucun (prêt à démarrer)  
**Dépendances** : Aucune


