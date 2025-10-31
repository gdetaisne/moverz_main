# 🚀 Guide Déploiement CapRover — 8 Villes

**Date:** 31 octobre 2025  
**Status:** 📋 Migration code terminée, déploiement CapRover à faire

---

## 🎯 Objectif

Déployer les **8 villes restantes** dans CapRover pour activer les canonicals avec trailing slash en production.

**Villes à déployer:** Lyon, Bordeaux, Nantes, Strasbourg, Lille, Rennes, Montpellier, Rouen

---

## ✅ Villes Déjà Validées

| Ville | URL | Status |
|-------|-----|--------|
| Marseille | `devis-demenageur-marseille.fr/` | ✅ Produit OK |
| Nice | `devis-demenageur-nice.fr/` | ✅ Produit OK |
| Toulouse | `devis-demenageur-toulousain.fr/` | ✅ Produit OK |

---

## 🔄 Apps à Déployer dans CapRover

| # | App CapRover | URL Production | Priorité |
|---|--------------|----------------|----------|
| 1 | **dd-lyon** | `devis-demenageur-lyon.fr` | ⭐⭐⭐ |
| 2 | **dd-bordeaux** | `www.bordeaux-demenageur.fr` | ⭐⭐ |
| 3 | **dd-nantes** | `devis-demenageur-nantes.fr` | ⭐⭐ |
| 4 | **dd-strasbourg** | `devis-demenageur-strasbourg.fr` | ⭐⭐ |
| 5 | **dd-lille** | `devis-demenageur-lille.fr` | ⭐⭐ |
| 6 | **dd-rennes** | `devis-demenageur-rennes.fr` | ⭐ |
| 7 | **dd-montpellier** | `devis-demenageur-montpellier.fr` | ⭐ |
| 8 | **dd-rouen** | `devis-demenageur-rouen.fr` | ⭐ |

---

## 📋 Procédure Déploiement (Par App)

### Étape 1: Ouvrir l'App
1. Aller sur CapRover UI
2. Cliquer sur "Toutes les apps"
3. Cliquer sur l'app (ex: `dd-lyon`)

### Étape 2: Déclencher le Build
1. Onglet "**Deployment**"
2. Vérifier que le **Branch** = `main` ✅
3. Cliquer sur "**Force Rebuild**"
4. Attendre le build (~5-10 min)

### Étape 3: Vérifier le Build
**Surveiller les logs en temps réel:**

✅ **Build réussi si vous voyez:**
```
✓ Compiled successfully
✓ Generating static pages (XX/XX)
Build has succeeded!
Successfully built...
Successfully tagged...
```

❌ **Build échoué si vous voyez:**
```
Variables invalides: SITE_URL: Invalid URL
Build has failed!
```
→ Vérifier `.caproverenv` dans le repo

### Étape 4: Test Rapide
**Une fois déployé:**
```bash
curl -s https://devis-demenageur-<ville>.fr | grep canonical
```

**Attendu:**
```html
<link rel="canonical" href="https://devis-demenageur-<ville>.fr/"
```

---

## 🎯 Ordre de Déploiement Recommandé

### Batch 1: Priorité Haute (⭐⭐⭐)
1. **dd-lyon** → Tester → Si OK, continuer

### Batch 2: Priorité Moyenne (⭐⭐)
2. **dd-bordeaux** (cas spécial www.)
3. **dd-nantes**
4. **dd-strasbourg**
5. **dd-lille**

### Batch 3: Priorité Basse (⭐)
6. **dd-rennes**
7. **dd-montpellier**
8. **dd-rouen**

**Stratégie:** Déployer et tester batch par batch

---

## 🧪 Script de Test Automatique

**Après tous les déploiements:**

```bash
./scripts/test-all-canonicals.sh
```

**Ce script teste automatiquement:**
- ✅ Canonical homepage (11 villes)
- ✅ Open Graph URL
- ✅ Redirections 308
- ✅ Rapport success/failed

**Résultat attendu:**
```
📊 RÉSULTATS:
   ✅ Succès: 11/11
   ❌ Échecs: 0/11

🎉 TOUTES LES VILLES VALIDÉES ! 🎉
```

---

## 🚨 Troubleshooting

### Problème 1: Build Échoue (SITE_URL Invalid)
**Symptôme:**
```
Variables invalides: SITE_URL: Invalid URL
```

**Solution:**
1. Vérifier que `.caproverenv` existe dans le repo
2. Vérifier contenu:
   ```
   SITE_URL=https://devis-demenageur-<ville>.fr/
   NODE_ENV=production
   NEXT_TELEMETRY_DISABLED=1
   ```
3. Re-push si nécessaire
4. Force Rebuild

### Problème 2: Canonical Sans Slash
**Symptôme:**
```html
<link rel="canonical" href="https://...fr"/>  <!-- Pas de / -->
```

**Solution:**
1. Vérifier `lib/seo-builders.ts` contient:
   ```typescript
   alternates: {
     canonical: siteUrlWithSlash,
   },
   ```
2. Vérifier `next.config.mjs` contient:
   ```javascript
   trailingSlash: true,
   ```
3. Re-push et redéployer

### Problème 3: Canonical Absent
**Symptôme:**
Pas de `<link rel="canonical">` dans le HTML

**Solution:**
Même que Problème 2 (vérifier `alternates.canonical`)

### Problème 4: Redirections Pas 308
**Symptôme:**
```
HTTP/2 200  <!-- Au lieu de 308 -->
```

**Solution:**
Vérifier `next.config.mjs` a `trailingSlash: true`

---

## 📊 Checklist Complète

### Code & Git
- [x] 11 villes modifiées
- [x] Template Marseille appliqué partout
- [x] 14 commits créés
- [x] 22 repos pushés (11 villes × 2)
- [x] Documentation complète (10 docs)

### CapRover Déploiement
- [x] Marseille déployé ✅
- [x] Nice déployé ✅
- [x] Toulouse déployé ✅
- [ ] Lyon à déployer
- [ ] Bordeaux à déployer
- [ ] Nantes à déployer
- [ ] Strasbourg à déployer
- [ ] Lille à déployer
- [ ] Rennes à déployer
- [ ] Montpellier à déployer
- [ ] Rouen à déployer

### Tests Production
- [x] Marseille testé ✅
- [x] Nice testé ✅
- [x] Toulouse testé ✅
- [ ] Lyon à tester
- [ ] Bordeaux à tester
- [ ] Nantes à tester
- [ ] Strasbourg à tester
- [ ] Lille à tester
- [ ] Rennes à tester
- [ ] Montpellier à tester
- [ ] Rouen à tester

---

## ⏱️ Timeline Estimée

| Étape | Temps | Total Cumulé |
|-------|-------|--------------|
| Déploiement Lyon | 10 min | 10 min |
| Test Lyon | 2 min | 12 min |
| Déploiement Bordeaux | 10 min | 22 min |
| Test Bordeaux | 2 min | 24 min |
| Déploiement Nantes-Lille (batch) | 40 min | 64 min (~1h) |
| Tests batch | 8 min | 72 min |
| Déploiement Rennes-Rouen (batch) | 30 min | 102 min (~1h40) |
| Tests batch | 6 min | 108 min |
| **Test automatique complet** | 5 min | **~2h total** |

---

## 🎯 Action Immédiate

**Commencer par Lyon** (priorité haute):

1. CapRover → dd-lyon
2. Deployment → Force Rebuild
3. Attendre 10 min
4. Test: `curl -s https://devis-demenageur-lyon.fr | grep canonical`
5. Attendu: `href="https://devis-demenageur-lyon.fr/"`

**Si Lyon ✅ → Continuer avec les 7 autres**

---

## 📚 Documentation

- `MIGRATION-CANONICALS-COMPLETE.md` — Rapport final migration
- `scripts/test-all-canonicals.sh` — Script test automatique
- `MARSEILLE-MIGRATION-SUCCESS.md` — Template référence
- `GUIDE-DEPLOIEMENT-CAPROVER.md` (ce fichier)

---

**Auteur:** IA Assistant  
**Date:** 31 octobre 2025  
**Status:** 📋 **PRÊT POUR DÉPLOIEMENT CAPROVER**

