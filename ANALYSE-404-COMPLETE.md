# 🚨 ANALYSE EXHAUSTIVE DES 404 - PROJET MOVERZ

**Date**: 28 Octobre 2025  
**Analysé par**: Script automatisé `scripts/analyze-404.mjs`  
**Données brutes**: `404-analysis.json`

---

## 📊 RÉSUMÉ EXÉCUTIF

### Chiffres Clés
- **🔴 Total de liens cassés**: 2 970
- **📝 Total d'articles**: 1 047
- **⚠️ Taux moyen**: 2.84 liens cassés par article

### Distribution par Ville

| Ville | Articles | 404s | Fichiers affectés | Taux/article |
|-------|----------|------|-------------------|--------------|
| 🔴 **Rouen** | 37 | **179** | 26 | **4.84** |
| 🔴 **Lyon** | 99 | **467** | 89 | **4.72** |
| 🔴 **Lille** | 111 | **401** | 101 | **3.61** |
| 🟠 Strasbourg | 38 | 124 | 32 | 3.26 |
| 🟠 Nice | 119 | 355 | 98 | 2.98 |
| 🟠 Rennes | 113 | 332 | 92 | 2.94 |
| 🟡 Marseille | 70 | 173 | 54 | 2.47 |
| 🟡 Bordeaux | 102 | 230 | 86 | 2.25 |
| 🟡 Montpellier | 114 | 238 | 111 | 2.09 |
| 🟢 Nantes | 151 | 299 | 70 | 1.98 |
| 🟢 Toulouse | 93 | 172 | 82 | 1.85 |

---

## 🏷️ CATÉGORISATION PAR TYPE DE PROBLÈME

### 1️⃣ PRÉFIXES VILLE EN DOUBLE (1 164 erreurs - 39.2%)

**Problème**: Liens contenant le nom de la ville dans le slug  
**Exemple**: `/blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet`  
**Devrait être**: `/blog/garde-meuble-marseille/guide-complet`

#### Distribution par ville
```
Nice        : 295 liens (25.3%)
Lille       : 252 liens (21.7%)
Nantes      : 197 liens (16.9%)
Lyon        : 174 liens (15.0%)
Rouen       : 120 liens (10.3%)
Autres      : 126 liens (10.8%)
```

#### Exemples concrets
```markdown
❌ /blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet
✅ /blog/garde-meuble-marseille/guide-complet

❌ /blog/demenagement-pas-cher-nice/demenagement-pas-cher-nice-guide
✅ /blog/demenagement-pas-cher-nice/guide

❌ /blog/location-camion-lille/location-camion-demenagement-lille-guide
✅ /blog/location-camion-lille/guide
```

**🔧 Solution**: Automatisable à 100% via script de nettoyage de slug  
**⏱️ Temps estimé**: 30 minutes  
**✅ Priorité**: HAUTE

---

### 2️⃣ ARTICLES MANQUANTS (1 618 erreurs - 54.5%)

**Problème**: Liens vers des articles qui n'existent pas physiquement dans `content/blog/`

#### Sous-catégories

##### A) Satellites manquants (1 030 erreurs - 63.7%)
Articles satellites référencés mais jamais créés

**Top catégories affectées**:
```
demenagement-rennes      : 285 erreurs
demenagement-marseille   : 144 erreurs
demenagement-strasbourg  :  83 erreurs
demenageur-lyon          :  81 erreurs
```

**Top URLs à créer** (haute fréquence):
```
 90x  [rennes] /blog/demenagement-rennes/demenageur-rennes
 60x  [marseille] /blog/demenagement-marseille/prix-demenagement-marseille
 45x  [marseille] /blog/demenagement-marseille/demenageur-marseille
 40x  [rennes] /blog/demenagement-rennes/demenagement-piano-rennes
 36x  [lyon] /blog/demenageur-lyon/meilleurs-demenageurs-lyon
```

##### B) Guides/Piliers manquants (586 erreurs - 36.2%)
Articles de type guide complet ou pilier manquants

**Exemples**:
```
❌ /blog/demenagement-marseille/aide-au-demenagement-marseille
   → Référencé 15x, n'existe pas

❌ /blog/devis/guide
   → Référencé 33x, n'existe pas (Bordeaux)

❌ /blog/garde-meuble-rennes/garde-meuble-rennes-guide-complet
   → Référencé 31x, n'existe pas
```

**🔧 Solution**: 
- Créer les 10-15 articles les plus référencés (impact 30%)
- Rediriger les autres vers articles piliers existants
- Supprimer les liens non pertinents

**⏱️ Temps estimé**: 2-3 jours (nécessite validation éditoriale)  
**✅ Priorité**: MOYENNE

---

### 3️⃣ SLUGS INCORRECTS (188 erreurs - 6.3%)

**Problème**: Format d'URL invalide, manque catégorie ou slug incomplet

#### Patterns détectés

##### A) Format court (134 erreurs)
```
❌ /blog/demenagement-international-toulouse
✅ /blog/international/demenagement-international-toulouse-guide

❌ /blog/garde-meuble-toulouse
✅ /blog/garde-meuble/garde-meuble-toulouse-guide

❌ /blog/demenageur-toulouse
✅ /blog/demenageur/demenageur-toulouse-guide
```

##### B) Autres formats invalides (54 erreurs)
Cas variés à traiter manuellement

**🔧 Solution**: Script de réécriture d'URL avec mapping catégorie  
**⏱️ Temps estimé**: 1 heure  
**✅ Priorité**: HAUTE

---

## 📁 FICHIERS LES PLUS PROBLÉMATIQUES

Les articles avec le plus de liens cassés:

```
53x  demenageur-toulouse.md (undefined)
26x  garde-meuble-rouen-guide-complet.md (undefined)
23x  demenageur-rouen-guide-complet.md (undefined)
23x  location-camion-demenagement-rouen-guide-complet.md (undefined)
20x  demenageur-rouen-pas-cher-guide.md (undefined)
20x  prix-demenagement-rouen-guide-complet.md (undefined)
19x  demenageur-montpellier.md (undefined)
18x  faq-demenagement-international-lyon.md (undefined)
18x  faq-garde-meuble-lyon.md (undefined)
18x  demenageur-rennes.md (undefined)
```

**⚠️ Action**: Auditer ces fichiers en priorité

---

## 🎯 PLAN D'ACTION DÉTAILLÉ

### Phase 1: Quick Wins (Automatisable) ⚡
**Impact**: ~1 352 erreurs résolues (45.5%)  
**Durée**: 2 heures

#### Tâche 1.1: Nettoyer les préfixes ville (1 164 liens)
```bash
# Script à créer: scripts/fix-prefix-ville.mjs
# Actions:
# - Détecter pattern: /-{ville}-guide-complet$/
# - Remplacer par: /guide-complet
# - Appliquer à toutes les villes
```

**Commande**:
```bash
node scripts/fix-prefix-ville.mjs --dry-run  # Preview
node scripts/fix-prefix-ville.mjs --apply    # Apply
```

#### Tâche 1.2: Corriger les slugs courts (134 liens)
```bash
# Script: scripts/fix-short-slugs.mjs
# Mapping:
#   /blog/{theme}-{ville} → /blog/{category}/{theme}-{ville}-guide
```

#### Tâche 1.3: Corriger autres slugs (54 liens)
Traitement cas par cas avec assistance IA

---

### Phase 2: Validation Manuelle 🔍
**Impact**: ~800 erreurs résolues (26.9%)  
**Durée**: 3-5 jours

#### Tâche 2.1: Créer top 15 articles manquants
Créer les articles référencés 20+ fois:

1. `[rennes] demenageur-rennes` (90 refs)
2. `[marseille] prix-demenagement-marseille` (60 refs)
3. `[marseille] demenageur-marseille` (45 refs)
4. ... (voir liste complète dans `404-analysis.json`)

**Template**: Utiliser le template de génération automatique

#### Tâche 2.2: Mapper les redirections
Pour articles à ne pas créer, rediriger vers pilier existant

**Exemple**:
```
/blog/satellites/article-specifique-123 
  → /blog/garde-meuble/guide-complet
```

#### Tâche 2.3: Nettoyer les liens obsolètes
Supprimer les liens vers contenus non pertinents

---

### Phase 3: Nettoyage Final 🧹
**Impact**: 100% résolu  
**Durée**: 2 jours

#### Tâche 3.1: Traiter les cas restants (~818 liens)
- Analyse manuelle fichier par fichier
- Décision au cas par cas

#### Tâche 3.2: Validation globale
```bash
node scripts/analyze-404.mjs
# Objectif: 0 erreur
```

#### Tâche 3.3: Documentation
- Documenter les règles de nommage
- Créer guide de contribution
- Mettre à jour ARCHITECTURE.md

---

## 🔒 PRÉVENTION FUTURE

### 1. Hook Pre-Commit
```bash
# .husky/pre-commit
#!/bin/sh
node scripts/check-blog-links.js
if [ $? -ne 0 ]; then
  echo "❌ Liens cassés détectés. Commit annulé."
  exit 1
fi
```

### 2. CI/CD Check
```yaml
# .github/workflows/check-links.yml
name: Check Internal Links
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: node scripts/analyze-404.mjs
      - run: |
          if [ $(jq '.summary.totalBrokenLinks' 404-analysis.json) -gt 0 ]; then
            exit 1
          fi
```

### 3. Template de Génération
Améliorer le template pour générer des slugs validés:

```javascript
// Template avec validation
const generateSlug = (theme, city) => {
  const slug = `${theme}-${city}`;
  
  // Vérifier que l'article cible existe
  if (!articleExists(slug)) {
    console.warn(`⚠️ Lien vers article inexistant: ${slug}`);
    return fallbackToPillar(theme, city);
  }
  
  return slug;
};
```

### 4. Règles de Nommage Strictes
```markdown
# RÈGLES DE NOMMAGE DES ARTICLES

## Format
/blog/{category}/{slug}

## Catégories valides
- etudiant
- entreprise
- piano
- international
- longue-distance
- pas-cher
- urgent
- devis
- garde-meuble
- prix

## Slug
- Pas de préfixe ville en double
- Format: {theme}-{details}
- Exemple: guide-complet, faq, tarifs-2025

## ❌ Interdit
- /blog/demenagement-marseille-marseille-guide
- /blog/garde-meuble-{ville}/garde-meuble-{ville}-guide

## ✅ Correct
- /blog/garde-meuble-{ville}/guide-complet
- /blog/international-{ville}/faq
```

---

## 📞 NEXT STEPS

### Immédiat (aujourd'hui)
1. ✅ Analyser les 404 (FAIT)
2. ⏳ Valider le plan d'action
3. ⏳ Créer script `fix-prefix-ville.mjs`

### Cette semaine
1. ⏳ Exécuter Phase 1 (Quick Wins)
2. ⏳ Vérifier impact (-45% de 404)
3. ⏳ Identifier les 15 articles prioritaires

### Semaine prochaine
1. ⏳ Créer les articles prioritaires
2. ⏳ Mettre en place validation CI/CD
3. ⏳ Documenter les règles

---

## 📎 FICHIERS GÉNÉRÉS

- `404-analysis.json` - Données brutes complètes
- `RAPPORT-404-EXHAUSTIF.md` - Rapport détaillé
- `ANALYSE-404-COMPLETE.md` - Ce fichier (synthèse exécutive)

---

**🤖 Rapport généré automatiquement - Dernière mise à jour: 28 Octobre 2025**

