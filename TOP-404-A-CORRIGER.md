# 🔥 TOP 404 À CORRIGER EN PRIORITÉ

**Date** : 29 Octobre 2025  
**Source** : Analyse des 1 661 liens cassés

---

## 🎯 TOP 30 URLS CASSÉES LES PLUS FRÉQUENTES

### 🔴 TRÈS HAUTE PRIORITÉ (100+ occurrences)

#### #1 - 136 occurrences 🚨

```
❌ /blog/demenagement-entreprise-bordeaux/demenagement-entreprise-bordeaux-guide

✅ /blog/demenagement-entreprise-bordeaux/guide

📍 Ville : Bordeaux
🏷️  Type : Préfixe ville répété
🔧 Correction : Supprimer "demenagement-entreprise-bordeaux-" du slug
```

**Impact** : Résoudra 8.2% des 404s restants à lui seul !

---

### 🔴 HAUTE PRIORITÉ (40+ occurrences)

#### #2 - 44 occurrences

```
❌ /blog/demenageur/demenageur-nice-guide-complet

✅ /blog/demenageur/guide-complet

📍 Ville : Nice
🏷️  Type : Préfixe ville dans catégorie générique
🔧 Correction : Supprimer "demenageur-nice-" du slug
```

#### #3 - 42 occurrences

```
❌ /blog/pas-cher/demenagement-pas-cher-nice-guide

✅ /blog/pas-cher/guide

📍 Ville : Nice
🏷️  Type : Préfixe complet répété
🔧 Correction : Supprimer "demenagement-pas-cher-nice-" du slug
```

---

### 🟡 PRIORITÉ MOYENNE (30+ occurrences)

#### #4 - 31 occurrences

```
❌ /blog/garde-meuble-rennes/garde-meuble-rennes-guide-complet

✅ /blog/garde-meuble-rennes/guide-complet

📍 Ville : Rennes
🏷️  Type : Préfixe ville répété
🔧 Correction : Supprimer "garde-meuble-rennes-" du slug
```

#### #5 - 30 occurrences (x3 URLs différentes)

```
❌ /blog/location-camion/location-camion-demenagement-nice-guide
✅ /blog/location-camion/guide

❌ /blog/location-camion-lille/location-camion-demenagement-lille-guide
✅ /blog/location-camion-lille/guide

❌ /blog/demenagement-pas-cher-nantes/demenagement-pas-cher-nantes-guide
✅ /blog/demenagement-pas-cher-nantes/guide
```

#### #8 - 30 occurrences

```
❌ /blog/demenagement-lyon-pas-cher/prix-demenagement-pas-cher-lyon-2025

✅ /blog/demenagement-lyon-pas-cher/prix-2025

📍 Ville : Lyon
🏷️  Type : Préfixe répété avec année
🔧 Correction : Supprimer "demenagement-pas-cher-lyon-" du slug
```

---

### 🟢 PRIORITÉ NORMALE (25-29 occurrences)

#### #9-11 - 29 occurrences (x3 URLs)

```
❌ /blog/garde-meuble/garde-meuble-rouen-guide-complet
✅ /blog/garde-meuble/guide-complet
📍 Rouen

❌ /blog/garde-meuble/garde-meuble-nice-guide-complet
✅ /blog/garde-meuble/guide-complet
📍 Nice

❌ /blog/garde-meuble-marseille/garde-meuble-marseille-guide-complet
✅ /blog/garde-meuble-marseille/guide-complet
📍 Marseille
```

#### #12 - 25 occurrences

```
❌ /blog/garde-meuble-nantes/garde-meuble-nantes-guide-complet

✅ /blog/garde-meuble-nantes/guide-complet

📍 Ville : Nantes
```

---

### 🟢 RESTE (20-24 occurrences)

#### #13-20 (20-24 occurrences chacune)

```
❌ /blog/garde-meuble-lille/garde-meuble-lille-guide-complet
✅ /blog/garde-meuble-lille/guide-complet

❌ /blog/demenagement-international-nantes/demenagement-international-nantes-guide
✅ /blog/demenagement-international-nantes/guide

❌ /blog/demenagement-piano-nantes/demenagement-piano-nantes-guide
✅ /blog/demenagement-piano-nantes/guide

❌ /blog/demenagement-pas-cher-lille/demenagement-pas-cher-lille-guide
✅ /blog/demenagement-pas-cher-lille/guide

❌ /blog/prix/prix-demenagement-nice-guide
✅ /blog/prix/guide

❌ /blog/piano/demenagement-piano-nice-guide
✅ /blog/piano/guide

❌ /blog/entreprise/demenagement-entreprise-nice-guide
✅ /blog/entreprise/guide

❌ /blog/demenagement-international-lille/demenagement-international-lille-guide
✅ /blog/demenagement-international-lille/guide

❌ /blog/prix-demenagement-lille/prix-demenagement-lille-guide
✅ /blog/prix-demenagement-lille/guide
```

---

## 📊 ANALYSE DES PATTERNS

### Pattern #1 : `{categorie}-{ville}/{categorie}-{ville}-guide`

**Occurrences** : ~800 liens  
**Villes affectées** : Toutes  
**Correction** :
```bash
s|/blog/{categorie}-{ville}/{categorie}-{ville}-|/blog/{categorie}-{ville}/|g
```

**Exemples** :
- `garde-meuble-marseille/garde-meuble-marseille-guide-complet` → `garde-meuble-marseille/guide-complet`
- `demenagement-entreprise-bordeaux/demenagement-entreprise-bordeaux-guide` → `demenagement-entreprise-bordeaux/guide`

---

### Pattern #2 : `{categorie}/{categorie}-{ville}-guide-complet`

**Occurrences** : ~300 liens  
**Villes affectées** : Nice, Rouen, Lille  
**Correction** :
```bash
s|/blog/{categorie}/{categorie}-{ville}-|/blog/{categorie}/|g
```

**Exemples** :
- `demenageur/demenageur-nice-guide-complet` → `demenageur/guide-complet`
- `garde-meuble/garde-meuble-rouen-guide-complet` → `garde-meuble/guide-complet`

---

### Pattern #3 : `{categorie}-{ville}/{categorie}-{ville}-{mot}`

**Occurrences** : ~221 liens  
**Villes affectées** : Toutes  
**Correction** :
```bash
s|/blog/{categorie}-{ville}/{categorie}-{ville}-|/blog/{categorie}-{ville}/|g
```

**Exemples** :
- `demenagement-pas-cher-nantes/demenagement-pas-cher-nantes-guide` → `demenagement-pas-cher-nantes/guide`
- `demenagement-international-nantes/demenagement-international-nantes-guide` → `demenagement-international-nantes/guide`

---

## 🎯 IMPACT PAR CORRECTION

### Top 10 corrections = 357 liens résolus (21.5%)

| Rang | URL | Occurrences | % du total |
|------|-----|-------------|------------|
| #1 | demenagement-entreprise-bordeaux-guide | 136 | 8.2% |
| #2 | demenageur-nice-guide-complet | 44 | 2.6% |
| #3 | demenagement-pas-cher-nice-guide | 42 | 2.5% |
| #4 | garde-meuble-rennes-guide-complet | 31 | 1.9% |
| #5-7 | location-camion, pas-cher-nantes, lyon-pas-cher | 90 | 5.4% |
| #8-11 | garde-meuble (rouen/nice/marseille) | 87 | 5.2% |
| **Total Top 10** | | **357** | **21.5%** |

### Top 30 corrections = 657 liens résolus (39.6%)

En corrigeant seulement les 30 URLs les plus fréquentes, on résout **40% des 404s** !

---

## 🛠️ SCRIPT DE CORRECTION AUTOMATIQUE

### Script global (tous patterns)

```bash
#!/bin/bash
# fix-top-404-prefixes.sh

CITIES=(marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier)

echo "🔧 Correction des préfixes ville dans les liens internes..."

for city in "${CITIES[@]}"; do
  echo ""
  echo "🏙️  Traitement de $city..."
  
  # Compteur
  count=0
  
  # Pattern 1 : {categorie}-{ville}/{categorie}-{ville}-*
  echo "  → Pattern 1 : categorie-ville/categorie-ville-*"
  
  find "sites/$city/content" -name "*.md" -type f -exec sed -i '' \
    -e "s|/blog/garde-meuble-$city/garde-meuble-$city-|/blog/garde-meuble-$city/|g" \
    -e "s|/blog/demenagement-entreprise-$city/demenagement-entreprise-$city-|/blog/demenagement-entreprise-$city/|g" \
    -e "s|/blog/demenagement-piano-$city/demenagement-piano-$city-|/blog/demenagement-piano-$city/|g" \
    -e "s|/blog/demenagement-pas-cher-$city/demenagement-pas-cher-$city-|/blog/demenagement-pas-cher-$city/|g" \
    -e "s|/blog/demenagement-international-$city/demenagement-international-$city-|/blog/demenagement-international-$city/|g" \
    -e "s|/blog/location-camion-demenagement-$city/location-camion-demenagement-$city-|/blog/location-camion-demenagement-$city/|g" \
    -e "s|/blog/location-camion-$city/location-camion-demenagement-$city-|/blog/location-camion-$city/|g" \
    -e "s|/blog/prix-demenagement-$city/prix-demenagement-$city-|/blog/prix-demenagement-$city/|g" \
    -e "s|/blog/petit-demenagement-$city/petit-demenagement-$city-|/blog/petit-demenagement-$city/|g" \
    -e "s|/blog/demenagement-$city-pas-cher/prix-demenagement-pas-cher-$city-|/blog/demenagement-$city-pas-cher/prix-|g" \
    -e "s|/blog/demenagement-$city-pas-cher/demenagement-$city-pas-cher-|/blog/demenagement-$city-pas-cher/|g" \
    {} \;
  
  # Pattern 2 : {categorie}/{categorie}-{ville}-*
  echo "  → Pattern 2 : categorie/categorie-ville-*"
  
  find "sites/$city/content" -name "*.md" -type f -exec sed -i '' \
    -e "s|/blog/demenageur/demenageur-$city-|/blog/demenageur/|g" \
    -e "s|/blog/garde-meuble/garde-meuble-$city-|/blog/garde-meuble/|g" \
    -e "s|/blog/pas-cher/demenagement-pas-cher-$city-|/blog/pas-cher/|g" \
    -e "s|/blog/location-camion/location-camion-demenagement-$city-|/blog/location-camion/|g" \
    -e "s|/blog/prix/prix-demenagement-$city-|/blog/prix/|g" \
    -e "s|/blog/piano/demenagement-piano-$city-|/blog/piano/|g" \
    -e "s|/blog/entreprise/demenagement-entreprise-$city-|/blog/entreprise/|g" \
    -e "s|/blog/international/demenagement-international-$city-|/blog/international/|g" \
    -e "s|/blog/petit-demenagement/petit-demenagement-$city-|/blog/petit-demenagement/|g" \
    {} \;
  
  echo "  ✅ $city terminé"
done

echo ""
echo "🎉 Correction terminée !"
echo ""
echo "📊 Vérification recommandée :"
echo "   node scripts/analyze-404.mjs"
```

### Script de test (avant correction globale)

```bash
#!/bin/bash
# test-fix-top-404.sh

# Tester sur une seule ville d'abord
CITY="marseille"

echo "🧪 Test sur $CITY..."

# Créer backup
cp -r "sites/$CITY/content" "sites/$CITY/content.backup-test"

# Appliquer corrections
find "sites/$CITY/content" -name "*.md" -type f -exec sed -i '' \
  -e "s|/blog/garde-meuble-$CITY/garde-meuble-$CITY-|/blog/garde-meuble-$CITY/|g" \
  {} \;

# Compter les changements
echo "📊 Changements effectués :"
diff -r "sites/$CITY/content.backup-test" "sites/$CITY/content" | grep "^<" | wc -l

echo ""
echo "✅ Test terminé. Vérifier manuellement avant d'appliquer globalement."
echo "   Backup : sites/$CITY/content.backup-test"
```

---

## 📋 CHECKLIST D'EXÉCUTION

### Avant correction

- [ ] Créer backup complet : `cp -r sites/ sites-backup-phase4/`
- [ ] Tester script sur 1 ville : `bash test-fix-top-404.sh`
- [ ] Valider manuellement les changements
- [ ] Analyser avant : `node scripts/analyze-404.mjs`

### Pendant correction

- [ ] Exécuter script global : `bash fix-top-404-prefixes.sh`
- [ ] Observer les logs en temps réel
- [ ] Vérifier aucune erreur

### Après correction

- [ ] Analyser après : `node scripts/analyze-404.mjs`
- [ ] Comparer avant/après
- [ ] Tester quelques URLs manuellement
- [ ] Commit si OK : `git add . && git commit -m "fix: Correction préfixes villes (Phase 4)"`

---

## 📊 RÉSULTATS ATTENDUS

### Avant Phase 4
```
Total liens cassés : 1 661
- Préfixes villes   : 1 321 (79.5%)
- Slugs incorrects  :   188 (11.3%)
- Articles manquants:   152 (9.2%)
```

### Après Phase 4 (estimation)
```
Total liens cassés : ~340 (-80%)
- Préfixes villes   :     0 (0%) ✅
- Slugs incorrects  :   188 (55.3%)
- Articles manquants:   152 (44.7%)
```

### Impact par ville (estimations)

| Ville | Avant | Après | Gain |
|-------|-------|-------|------|
| Nice | 349 | ~70 | -80% |
| Lille | 302 | ~60 | -80% |
| Nantes | 197 | ~40 | -80% |
| Lyon | 193 | ~38 | -80% |
| Bordeaux | 163 | ~33 | -80% |
| Rouen | 154 | ~31 | -80% |
| Toulouse | 92 | ~18 | -80% |
| Strasbourg | 86 | ~17 | -80% |
| Montpellier | 64 | ~13 | -80% |
| Rennes | 32 | ~6 | -81% |
| Marseille | 29 | ~6 | -79% |

---

## 🎯 PROCHAINES ÉTAPES

Après Phase 4 :

1. **Phase 5** : Corriger les 188 slugs incorrects
   - Durée : 4-6h
   - Impact : ~340 → ~152 liens cassés

2. **Phase 6** : Créer les ~90 articles manquants
   - Durée : 3-5 jours
   - Impact : ~152 → 0 liens cassés

**Objectif final : 0 404s** 🎯

---

**Dernière mise à jour** : 29 Octobre 2025  
**Source** : `404-analysis.json`

