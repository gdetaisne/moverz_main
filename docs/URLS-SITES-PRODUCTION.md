# URLs Sites Production — Source de Vérité

**Date**: 30 octobre 2025  
**Objectif**: Documenter les URLs réelles de production vs configuration

---

## 🔴 PROBLÈME IDENTIFIÉ

### Bordeaux a 2 URLs différentes

**Dans le code** (`lib/cityData.ts` ligne 118):
```typescript
siteUrl: 'https://devis-demenageur-bordeaux.fr'
```

**Site réel en production**:
```
https://www.bordeaux-demenageur.fr/
```

**Impact**:
- Canonical incorrect dans `<head>`
- Sitemap généré avec mauvaise URL
- Schema Organization avec mauvaise URL
- OG:url incorrect

---

## 📋 URLs Configurées (lib/cityData.ts)

| Ville | URL dans cityData.ts | Format |
|-------|---------------------|---------|
| Marseille | `https://devis-demenageur-marseille.fr` | devis-demenageur-{ville} |
| Toulouse | `https://devis-demenageur-toulousain.fr` | devis-demenageur-{ville} |
| Lyon | `https://devis-demenageur-lyon.fr` | devis-demenageur-{ville} |
| **Bordeaux** | ❌ `https://devis-demenageur-bordeaux.fr` | **FAUX** |
| Nantes | `https://devis-demenageur-nantes.fr` | devis-demenageur-{ville} |
| Lille | `https://devis-demenageur-lille.fr` | devis-demenageur-{ville} |
| Nice | `https://devis-demenageur-nice.fr` | devis-demenageur-{ville} |
| Rennes | `https://devis-demenageur-rennes.fr` | devis-demenageur-{ville} |
| Rouen | `https://devis-demenageur-rouen.fr` | devis-demenageur-{ville} |
| Strasbourg | `https://devis-demenageur-strasbourg.fr` | devis-demenageur-{ville} |
| Montpellier | `https://devis-demenageur-montpellier.fr` | devis-demenageur-{ville} |

---

## ✅ URLs Production Réelles (À VÉRIFIER)

**Bordeaux confirmé**:
```
✅ https://www.bordeaux-demenageur.fr/
```

**Autres villes** (à confirmer):
- [ ] Marseille: https://devis-demenageur-marseille.fr ?
- [ ] Toulouse: https://devis-demenageur-toulousain.fr ?
- [ ] Lyon: https://devis-demenageur-lyon.fr ?
- [ ] Nantes: https://devis-demenageur-nantes.fr ?
- [ ] Lille: https://devis-demenageur-lille.fr ?
- [ ] Nice: https://devis-demenageur-nice.fr ?
- [ ] Rennes: https://devis-demenageur-rennes.fr ?
- [ ] Rouen: https://devis-demenageur-rouen.fr ?
- [ ] Strasbourg: https://devis-demenageur-strasbourg.fr ?
- [ ] Montpellier: https://devis-demenageur-montpellier.fr ?

---

## 🔧 CORRECTION APPLIQUÉE

**Fichier**: `lib/cityData.ts` ligne 118

**Avant**:
```typescript
siteUrl: 'https://devis-demenageur-bordeaux.fr',
```

**Après**:
```typescript
siteUrl: 'https://www.bordeaux-demenageur.fr',
```

---

## ⚠️ ACTIONS REQUISES

### 1. Vérifier les 10 autres URLs

**Commandes à exécuter** (par l'utilisateur ou via CapRover dashboard):

```bash
curl -I https://devis-demenageur-marseille.fr
curl -I https://devis-demenageur-toulouse.fr
curl -I https://devis-demenageur-lyon.fr
# ... etc pour les 10 autres
```

**Si URLs incorrectes**, les corriger dans `lib/cityData.ts`.

---

### 2. Vérifier variables SITE_URL CapRover

**Pour chaque app dd-{ville}**:
1. Aller dans CapRover Dashboard
2. App dd-{ville} → Configurations de l'App → Variables d'environnement
3. Vérifier `SITE_URL` correspond à `cityData.ts`

**Si incohérence**: Soit corriger CapRover, soit corriger `cityData.ts`.

---

### 3. Rebuild tous les sites après correction

**Une fois URLs correctes** dans `cityData.ts`:

```bash
# Commit + push monorepo
git add lib/cityData.ts
git commit -m "fix(config): Corrige URL Bordeaux (www.bordeaux-demenageur.fr)"
git push origin main

# Sync vers sites
/tmp/sync-lib-to-sites.sh

# Push sites (déclenche rebuild avec bonnes URLs)
for city in bordeaux lille lyon marseille montpellier nantes nice rennes rouen strasbourg toulouse; do
  (cd sites/$city && git add lib/cityData.ts && git commit -m "fix: URL production correcte" && git push origin main)
done
```

---

## 📊 IMPACT URLs INCORRECTES

Si `cityData.ts` a mauvaise URL:

**SEO critical**:
- ❌ Canonical pointe vers URL inexistante
- ❌ Sitemap généré avec mauvaise URL
- ❌ Google indexe mauvaise URL
- ❌ Schema Organization URL incorrecte
- ❌ OG:url incorrect (partage réseaux sociaux)

**User Experience**:
- ❌ Links internes cassés (si relative paths)
- ❌ RSS feeds incorrects

---

## 🎯 CHECKLIST VALIDATION

Pour valider qu'une URL est correcte:

1. **Tester l'URL en direct**:
   ```bash
   curl -I https://www.bordeaux-demenageur.fr/
   ```
   → Doit retourner `200 OK`

2. **Vérifier dans le code source du site**:
   ```bash
   curl -sS https://www.bordeaux-demenageur.fr/ | grep canonical
   ```
   → Doit afficher `<link rel="canonical" href="https://www.bordeaux-demenageur.fr"/>`

3. **Vérifier OG:url**:
   ```bash
   curl -sS https://www.bordeaux-demenageur.fr/ | grep "og:url"
   ```
   → Doit matcher l'URL réelle

---

## 📝 PROCHAINES ÉTAPES

1. **Utilisateur confirme les 10 autres URLs production**
2. On corrige `lib/cityData.ts` pour toutes les URLs incorrectes
3. On rebuild tous les sites
4. On valide canonical/sitemap/schema sur chaque site

---

**Version**: 1.0  
**Auteur**: Diagnostic URLs production  
**Urgence**: **Critique** (canonical incorrect = SEO impact majeur)

