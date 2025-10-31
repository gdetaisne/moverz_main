# Vérification URLs Production — Résultats Complets

**Date**: 30 octobre 2025  
**Tests**: 11 sites, 2 checks par site (HTTP + Canonical)

---

## ✅ Résultats Tests HTTP (200 OK)

| Ville | URL Production | Statut |
|-------|---------------|--------|
| Bordeaux | https://www.bordeaux-demenageur.fr | ✅ 200 OK |
| Nice | https://devis-demenageur-nice.fr | ✅ 200 OK |
| Lyon | https://devis-demenageur-lyon.fr | ✅ 200 OK |
| Lille | https://devis-demenageur-lille.fr | ✅ 200 OK |
| Marseille | https://devis-demenageur-marseille.fr | ✅ 200 OK |
| Toulouse | https://devis-demenageur-toulousain.fr | ✅ 200 OK |
| Nantes | https://devis-demenageur-nantes.fr | ✅ 200 OK |
| Rennes | https://devis-demenageur-rennes.fr | ✅ 200 OK |
| Rouen | https://devis-demenageur-rouen.fr | ✅ 200 OK |
| Strasbourg | https://devis-demenageur-strasbourg.fr | ✅ 200 OK |
| Montpellier | https://devis-demenageur-montpellier.fr | ✅ 200 OK |

**Résultat**: 11/11 sites accessibles ✅

---

## 🔍 Résultats Tests Canonical

| Ville | Canonical Actuel | Match URL Prod | Statut |
|-------|-----------------|----------------|--------|
| **Bordeaux** | `https://devis-demenageur-bordeaux.fr` | ❌ **NON** | ⏳ Rebuild en cours |
| Nice | `https://devis-demenageur-nice.fr` | ✅ OUI | ✅ OK |
| Lyon | `https://devis-demenageur-lyon.fr` | ✅ OUI | ✅ OK |
| Lille | `https://devis-demenageur-lille.fr` | ✅ OUI | ✅ OK |
| Marseille | `https://devis-demenageur-marseille.fr` | ✅ OUI | ✅ OK |
| Toulouse | `https://devis-demenageur-toulousain.fr` | ✅ OUI | ✅ OK |
| Nantes | `https://devis-demenageur-nantes.fr` | ✅ OUI | ✅ OK |
| Rennes | `https://devis-demenageur-rennes.fr` | ✅ OUI | ✅ OK |
| Rouen | `https://devis-demenageur-rouen.fr` | ✅ OUI | ✅ OK |
| Strasbourg | `https://devis-demenageur-strasbourg.fr` | ✅ OUI | ✅ OK |
| Montpellier | `https://devis-demenageur-montpellier.fr` | ✅ OUI | ✅ OK |

**Résultat**: 10/11 OK, 1 en cours de correction (Bordeaux) ⏳

---

## 🔴 Problème Bordeaux Identifié

### Situation

**URL Production Réelle**:
```
https://www.bordeaux-demenageur.fr
```

**Canonical Actuel (avant rebuild)**:
```
https://devis-demenageur-bordeaux.fr  ❌
```

**Cause**: `lib/cityData.ts` contenait la mauvaise URL avant correction.

---

### Corrections Appliquées

**1. Code corrigé** (`lib/cityData.ts` ligne 118):
```typescript
// Avant
siteUrl: 'https://devis-demenageur-bordeaux.fr',

// Après
siteUrl: 'https://www.bordeaux-demenageur.fr',
```

**2. Push déclenché**:
- ✅ Commit monorepo: `dfe0ae7`
- ✅ Push site Bordeaux: `0c0b5cd`
- ⏳ Rebuild CapRover dd-bordeaux en cours

---

### Impact Avant Correction

**SEO Critical**:
- ❌ Canonical pointait vers URL inexistante `devis-demenageur-bordeaux.fr`
- ❌ Sitemap généré avec mauvaise URL
- ❌ Schema Organization URL incorrecte
- ❌ OG:url incorrect (partages sociaux)

**Durée du problème**: Depuis le lancement du site (date inconnue).

**Impact Google**:
- Confusion canonical (Google ne sait pas quelle URL indexer)
- Potentiel duplicate content si les 2 URLs répondent
- Link juice dilué

---

## ✅ Vérification Post-Rebuild (À FAIRE)

**Une fois dd-bordeaux rebuildé** (15-20 min), re-tester:

```bash
curl -sS https://www.bordeaux-demenageur.fr/ | grep canonical
```

**Attendu**:
```html
<link rel="canonical" href="https://www.bordeaux-demenageur.fr"/>
```

---

## 📊 Configuration Finale Validée

**Format URLs par ville**:

| Ville | Format URL | Exemple |
|-------|-----------|---------|
| Bordeaux | `www.{ville}-demenageur.fr` | www.bordeaux-demenageur.fr |
| Autres (×10) | `devis-demenageur-{ville}.fr` | devis-demenageur-nice.fr |
| Toulouse | `devis-demenageur-{ville}ain.fr` | devis-demenageur-toulousain.fr |

**Tous validés** ✅

---

## 🎯 Actions Complétées

- [x] Test HTTP 200 OK (11/11 sites)
- [x] Vérification canonical (10/11 OK)
- [x] Identification problème Bordeaux
- [x] Correction `lib/cityData.ts`
- [x] Push monorepo + site Bordeaux
- [x] Rebuild déclenché
- [ ] Vérification post-rebuild Bordeaux (J+1)

---

## 📋 Checklist Validation Finale (J+1)

**Bordeaux uniquement** (les 10 autres OK):

1. **Canonical correct**:
   ```bash
   curl -sS https://www.bordeaux-demenageur.fr/ | grep canonical
   ```
   → Doit afficher `https://www.bordeaux-demenageur.fr`

2. **Schema Organization URL correcte**:
   ```bash
   curl -sS https://www.bordeaux-demenageur.fr/ | grep -A 5 '"@type":"Organization"' | grep url
   ```
   → Doit contenir `www.bordeaux-demenageur.fr`

3. **OG:url correct**:
   ```bash
   curl -sS https://www.bordeaux-demenageur.fr/ | grep 'og:url'
   ```
   → Doit afficher `www.bordeaux-demenageur.fr`

4. **Sitemap référence bonne URL**:
   ```bash
   curl -sS https://www.bordeaux-demenageur.fr/sitemap.xml | head -20
   ```
   → Doit contenir `www.bordeaux-demenageur.fr`

---

## 🚀 Prochaines Étapes SEO (après validation Bordeaux)

1. **GSC**: Soumettre sitemap Bordeaux (nouvelle URL)
2. **Redirections**: Vérifier si `devis-demenageur-bordeaux.fr` redirige vers `www.bordeaux-demenageur.fr` (éviter duplicate)
3. **Rich Results Test**: Valider Organization + LocalBusiness + logo
4. **Meta descriptions**: Optimiser wording (étape suivante, après URLs propres)

---

**Version**: 1.0  
**Auteur**: Vérification complète URLs production  
**Statut**: 10/11 validés, 1 en cours (Bordeaux rebuild 15-20 min)

