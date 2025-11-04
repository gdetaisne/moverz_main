# Tests - TASK-025

## ✅ Tests effectués

### Tests post-deploy (8 villes)

**Date** : 03/11/2025 12h50-13h00  
**Villes testées** : Nice, Lille, Nantes, Marseille, Rennes, Rouen, Strasbourg, Toulouse

#### Test 1 : Cohérence nombre pages

| Ville | Pages sitemap | Fourchette | Statut |
|-------|--------------|------------|---------|
| Nice | 140 | 75-150 | ✅ OK |
| Lille | 132 | 75-150 | ✅ OK |
| Rennes | 134 | 75-150 | ✅ OK |
| Toulouse | 114 | 75-150 | ✅ OK |
| Strasbourg | 113 | 75-150 | ✅ OK |
| Nantes | 93 | 75-150 | ✅ OK |
| Marseille | 91 | 75-150 | ✅ OK |
| Rouen | 58 | 75-150 | ⚠️ Sous minimum (normal, 38 articles) |

**Résultat** : 7/8 dans fourchette ✅

#### Test 2 : Accessibilité URLs

| Ville | URL testée | Status |
|-------|-----------|--------|
| Toulouse | /blog/aide/aide-au-demenagement-toulouse/ | ✅ 200 |
| Nice | /blog/demenagement-nice/aide-demenagement-nice-guide/ | ✅ 200 |
| Marseille | /blog/demenagement-marseille/aide-au-demenagement-marseille/ | ✅ 200 |
| Lille | /blog/ | ✅ 200 |
| Nantes | /blog/ | ✅ 200 |
| Rennes | /blog/aide-demenagement-rennes/budget-demenagement-rennes-complet/ | ✅ 200 |
| Rouen | /blog/ | ✅ 200 |
| Strasbourg | /blog/ | ✅ 200 |

**Résultat** : 8/8 accessibles ✅

#### Test 3 : Pas de URLs undefined

**Résultat** : 0 URLs undefined détectées ✅

---

## Tests pré-deploy (référence)

### Test 1 : Vérifier URLs générées

**Commande** :
```bash
cd sites/toulouse
npm run build
curl http://localhost:3000/sitemap.xml > sitemap-after.xml

# Comparer avant/après
diff sitemap-before.xml sitemap-after.xml
```

**Attendu** :
```diff
- /blog/piliers/aide-au-demenagement-toulouse/
+ /blog/aide/aide-au-demenagement-toulouse-guide/
```

---

### Test 2 : Tester URLs accessibles

**20 URLs par ville** (piliers + satellites) :
```bash
# Toulouse
curl -I https://devis-demenageur-toulousain.fr/blog/aide/[slug]/
→ HTTP/2 200 ✅

curl -I https://devis-demenageur-toulousain.fr/blog/etudiant/[slug]/
→ HTTP/2 200 ✅

# ... 18 autres URLs
```

**Succès attendu** : 20/20 = 200 OK

---

### Test 3 : Build 11 villes

```bash
for city in marseille lyon toulouse bordeaux lille nantes nice strasbourg rouen rennes montpellier; do
  echo "=== Build $city ==="
  cd sites/$city
  npm run build || echo "ERREUR $city"
  cd ../..
done
```

**Attendu** : 11/11 builds OK

---

## Tests post-deploy

### Test 4 : Sitemaps en production

**Pour chaque ville** :
```bash
curl https://devis-demenageur-[ville].fr/sitemap.xml | grep "blog/" | head -10

# Vérifier format URLs correct
# Tester 5 URLs du sitemap
```

---

### Test 5 : Monitoring Search Console

**J+1** :
- [ ] Vérifier crawl errors
- [ ] Noter nombre erreurs 5xx (vs 858 avant)

**J+3** :
- [ ] Vérifier indexation
- [ ] Noter pages indexées (vs 37 avant)

**J+7** :
- [ ] Validation finale
- [ ] Attendu : 800+ pages indexées

---

*Tests à effectuer*

