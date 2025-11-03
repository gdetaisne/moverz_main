# Context - TASK-027 Clean Redirections

**Date** : 03 novembre 2025

---

## 🎯 POURQUOI CETTE TÂCHE ?

### Déclencheur

**État des lieux redirections** demandé par Guillaume (03/11/2025)

**Constat** :
- 11 sites avec redirections 301 hétérogènes
- Nice : 107 redirections vs Toulouse : 16
- Patterns incohérents entre villes
- Dette technique croissante

---

## 📊 CONTEXTE BUSINESS

### Architecture Multi-Sites

**11 sites Next.js indépendants** :
```
sites/
├── nice/           → devis-demenageur-nice.fr
├── marseille/      → devis-demenageur-marseille.fr
├── lyon/           → devis-demenageur-lyon.fr
├── toulouse/       → devis-demenageur-toulouse.fr (toulousain)
├── lille/          → devis-demenageur-lille.fr
├── bordeaux/       → www.bordeaux-demenageur.fr (EXCEPTION)
├── nantes/         → devis-demenageur-nantes.fr
├── strasbourg/     → devis-demenageur-strasbourg.fr
├── montpellier/    → devis-demenageur-montpellier.fr
├── rennes/         → devis-demenageur-rennes.fr
└── rouen/          → devis-demenageur-rouen.fr
```

**Chaque site** :
- Build indépendant
- Déploiement CapRover individuel
- `next.config.mjs` propre avec redirections 301

---

## 🔍 HISTORIQUE REDIRECTIONS

### Phase 1 : Satellites génériques (Oct 2024)

**Problème** : Articles créés sans suffixe ville
```
/blog/satellites/cartons-gratuits-ou-trouver
```

**Solution** : Redirections ville par ville
```javascript
{ 
  source: '/blog/satellites/cartons-gratuits-ou-trouver', 
  destination: '/blog/satellites/cartons-gratuits-ou-trouver-nice/', 
  permanent: true 
}
```

**Ajouté** : Progressivement, ville par ville (pas de sync)

---

### Phase 2 : Catégories vides (30 Oct 2025)

**Problème** : Catégories blog créées mais jamais remplies
```
/blog/etudiant → 404
/blog/urgent → 404
```

**Solution** : Redirections vers `/blog/`
```javascript
{ source: '/blog/etudiant', destination: '/blog/', permanent: true }
```

**Ajouté** : Sur 11 villes (fix CSV 404)

---

### Phase 3 : Projet 404 - Phase 1 (03 Nov 2025)

**Problème** : 513 erreurs 404 détectées par scan

**Actions** :
1. Ajout redirections majuscules (Strasbourg, Nantes, Marseille)
2. Ajout redirections cross-ville Toulouse (Nice, Marseille uniquement)
3. Ajout redirections BATCH/PILIER (Marseille, Toulouse uniquement)
4. Ajout redirections quartiers Bordeaux (Nice, Marseille, Toulouse)

**Résultat** : 323/513 liens corrigés (-63%)

**Problème créé** : Incohérence croissante entre villes

---

## 🚨 PROBLÈMES IDENTIFIÉS

### Problème #1 : Incohérence Quantitative

| Ville | Redirections | Raison |
|-------|--------------|--------|
| Nice | 107 | Ville pilote (tous patterns) |
| Marseille | 82 | Ajouts récents (catégories accentuées) |
| Lille | ~80 | Focus satellites |
| Lyon | ~10 | Oublié lors ajouts récents |
| Toulouse | 16 | Incomplet + bugs |

**Impact** :
- Villes moins maintenues = Plus de 404s
- Utilisateur Lyon voit bugs corrigés ailleurs
- Maintenance coûteuse (refaire 11 fois)

---

### Problème #2 : Redirections Hardcodées

**Exemple actuel** :
```javascript
// Nice
{ source: '/blog/satellites/article', destination: '/blog/satellites/article-nice/', permanent: true }

// Lyon
{ source: '/blog/satellites/article', destination: '/blog/satellites/article-lyon/', permanent: true }
```

**Impossible de** :
- Sync automatique (destinations différentes)
- Template centralisé (ville hardcodée)

**Si copié-collé Nice → Lyon sans changer** :
```javascript
// ❌ BUG
{ source: '/blog/satellites/article', destination: '/blog/satellites/article-nice/', permanent: true }
// Lyon redirige vers Nice !
```

---

### Problème #3 : Pas de Centralisation

**Actuellement** :
- 11 fichiers `next.config.mjs` séparés
- Modification = 11 fichiers à éditer manuellement
- Oublis fréquents (Lyon, Toulouse)

**Workflow actuel** :
```
1. Fix bug → Nice
2. Test Nice OK
3. "Oh merde, faut copier sur 10 autres villes"
4. Copier manuellement (2h)
5. Oublier Lyon
6. Bug découvert sur Lyon 3 semaines plus tard
7. Re-corriger Lyon
```

**Temps gaspillé** : ~30% maintenance redirections

---

### Problème #4 : Bugs Critiques

**Toulouse trailing slash loops** :
```javascript
{ source: '/mentions-legales/', destination: '/mentions-legales/', permanent: true }
```

**Impact** : Loop potentiel (même source/destination)

**Patterns manquants** :
- BATCH/PILIER : 9/11 villes sans redirections
- Cross-ville Toulouse : 9/11 villes exposées
- Quartiers Bordeaux : 8/11 villes exposées

---

## 🎯 OBJECTIFS TÂCHE

### Objectif #1 : Corriger Bugs Critiques

**Urgent** :
- ✅ Corriger loops Toulouse
- ✅ Ajouter redirections BATCH/PILIER manquantes (9 villes)

**Impact** : Éviter 404s Google cache + loops

---

### Objectif #2 : Harmoniser Patterns

**Important** :
- ✅ Tous les patterns présents sur 11 villes
- ✅ Cohérence quantitative (chaque ville ~80-120 redirections)

**Impact** : Expérience utilisateur cohérente

---

### Objectif #3 : Faciliter Maintenance Future

**Amélioration** :
- ✅ Template centralisé (optionnel)
- ✅ Documentation complète
- ✅ Script validation (optionnel)

**Impact** : Économie temps maintenance future

---

## 📋 PATTERNS REDIRECTIONS

### Pattern #1 : Satellites Génériques → Ville

**Présent** : 11/11 villes ✅

**Exemple** :
```javascript
{ 
  source: '/blog/satellites/cartons-gratuits-ou-trouver', 
  destination: '/blog/satellites/cartons-gratuits-ou-trouver-nice/', 
  permanent: true 
}
```

**Raison** : Articles créés sans suffixe ville (bug IA)

**Count** : 30-80 par ville (selon nombre satellites)

---

### Pattern #2 : Catégories Vides → /blog/

**Présent** : 11/11 villes ✅

**Exemple** :
```javascript
{ source: '/blog/etudiant', destination: '/blog/', permanent: true }
{ source: '/blog/urgent', destination: '/blog/', permanent: true }
```

**Raison** : Catégories créées mais jamais remplies

**Count** : 3-4 par ville

---

### Pattern #3 : Cross-Ville Toulouse

**Présent** : 2/11 villes ⚠️ (Nice, Marseille)

**Exemple** :
```javascript
{ source: '/Toulouse/capitole', destination: '/quartiers-nice/', permanent: true }
{ source: '/devis-demenagement-toulouse/', destination: '/estimation-rapide/', permanent: true }
```

**Raison** : Bug templates (Toulouse hardcodée dans templates)

**Count** : 10-15 par ville

**TODO** : Ajouter dans 9 villes manquantes

---

### Pattern #4 : Quartiers Bordeaux Cross-Ville

**Présent** : 3/11 villes ⚠️ (Nice, Marseille, Toulouse)

**Exemple** :
```javascript
{ source: '/nice/chartrons', destination: '/quartiers-nice/', permanent: true }
{ source: '/nice/cauderan', destination: '/quartiers-nice/', permanent: true }
```

**Raison** : Bug templates (quartiers Bordeaux copiés partout)

**Count** : 7-9 par ville

**TODO** : Ajouter dans 8 villes manquantes

---

### Pattern #5 : Fichiers BATCH/PILIER

**Présent** : 2/11 villes ❌ (Marseille, Toulouse)

**Exemple** :
```javascript
{ source: '/blog/satellites/BATCH-:path*', destination: '/blog/', permanent: true }
{ source: '/blog/satellites/PILIER-:path*', destination: '/blog/', permanent: true }
```

**Raison** : Fichiers temporaires supprimés, Google les a indexés

**Count** : 6 wildcards par ville

**TODO** : Ajouter dans 9 villes manquantes

---

### Pattern #6 : Majuscules URLs

**Présent** : 3/11 villes ⚠️ (Strasbourg, Marseille, Nantes)

**Exemple** :
```javascript
{ source: '/quartiers-Marseille', destination: '/quartiers-marseille/', permanent: true }
{ source: '/Strasbourg-vers-Paris', destination: '/strasbourg-vers-paris/', permanent: true }
```

**Raison** : Case-sensitivity Linux (CapRover)

**Count** : 1-5 par ville

**TODO** : Vérifier si nécessaire autres villes

---

### Pattern #7 : Piliers Catégories

**Présent** : Lyon, Nice

**Exemple** :
```javascript
{ 
  source: '/blog/aide-au-demenagement/...', 
  destination: '/blog/aide-au-demenagement-lyon/...', 
  permanent: true 
}
```

**Raison** : Changement structure blog (catégories → ville-spécifiques)

**Count** : 10-18 par ville

---

### Pattern #8 : Anciennes URLs

**Présent** : 11/11 villes ✅

**Exemple** :
```javascript
{ source: '/estimation-demenagement-nice/', destination: '/estimation-rapide/', permanent: true }
{ source: '/devis-demenagement-nice/', destination: '/estimation-rapide/', permanent: true }
```

**Count** : 2-3 par ville

---

## 🔄 WORKFLOW ACTUEL MAINTENANCE

**Quand bug 404 découvert** :

```
1. Identifier pattern (ex: BATCH files)
   ↓
2. Corriger dans 1 ville (ex: Nice)
   ↓
3. Tester Nice OK
   ↓
4. Copier-coller dans 10 autres villes
   ↓ (2h de copier-coller manuel)
5. Risque d'oubli (Lyon, Toulouse)
   ↓
6. Bug réapparaît ailleurs 3 semaines plus tard
   ↓
7. Recommencer
```

**Temps gaspillé** : 2-3h par pattern × 10 patterns = 20-30h

---

## 💡 POURQUOI MAINTENANT ?

### Timing Stratégique

**Projet 404 en cours** :
- 323/513 liens corrigés
- 190 liens restants
- Redirections = outil principal correction

**Dette technique** :
- Incohérence croissante
- Maintenance coûteuse
- Risque erreurs humaines

**Opportunité** :
- Momentum projet 404
- Documentation fraîche (état des lieux fait)
- Guillaume disponible

---

## 🎯 IMPACT ATTENDU

### Court terme (Quick Fix)

**Après 2-3h** :
- ✅ 11 villes harmonisées
- ✅ Bugs critiques corrigés
- ✅ Patterns cohérents

**Mesurable** :
- Redirections Toulouse : 16 → 80+
- Redirections Lyon : 10 → 80+
- Coverage BATCH/PILIER : 2/11 → 11/11

---

### Long terme (Refactoring)

**Après 6-8h** :
- ✅ Template centralisé
- ✅ Maintenance 10x plus rapide
- ✅ Impossible d'oublier une ville

**Économie temps** :
- Fix pattern : 2-3h → 15 min
- Tests : 11 villes → automatisé
- Oublis : Fréquents → Impossible

**ROI** : ~20h économisées sur prochains 12 mois

---

## 📖 RÉFÉRENCES

**Conversations** :
- 03/11/2025 : État des lieux redirections (analyse détaillée)

**Tâches liées** :
- TASK-404-01 : Audit structure (patterns 404 identifiés)
- TASK-404-CORRECTIONS-PATTERNS : Ajouts redirections Phase 1

**Documentation** :
- `.cursor/PRINCIPES-SACRES.md` : SEO first
- `.cursor/ZONES-DE-RISQUE.md` : Zones critiques
- `.cursor/PROJET-404-ETAT-ACTUEL.md` : État projet 404

---

**Créé le** : 03 novembre 2025  
**Contexte complet** : ✅ Documenté

