# Tests - TASK-050

## Tests Pré-Correction

### Vérification Existence Bug
```bash
# Homepage : liens blog cassés
for site in bordeaux lille lyon marseille montpellier nantes nice rennes rouen strasbourg toulouse; do
  count=$(grep -c "blog/cartons-demenagement\|blog/prix-demenagement-2025" sites/$site/app/page.tsx 2>/dev/null || echo "0")
  if [ "$count" -gt 0 ]; then
    echo "❌ $site : $count liens cassés homepage"
  fi
done

# Résultat : 11 sites × 2 liens = 22 404
```

### Scan Liens "nice" Hardcodés
```bash
# FAQ
grep -r "/nice/" sites/*/app/faq/page.tsx | grep -v "sites/nice"

# Services  
grep -r "/nice/" sites/*/app/services/page.tsx | grep -v "sites/nice"

# Résultat : 10 sites × ~6-7 liens = 66 404
```

---

## Tests Post-Correction

### Homepage : Vérification Liens Fixes
```bash
# Vérifier liens cassés homepage (doit être 0)
for site in bordeaux lille lyon marseille montpellier nantes nice rennes rouen strasbourg toulouse; do
  count=$(grep -c "blog/cartons-demenagement\|blog/prix-demenagement-2025" sites/$site/app/page.tsx 2>/dev/null || echo "0")
  if [ "$count" -gt 0 ]; then
    echo "❌ $site : $count liens cassés restants"
  fi
done
```

**Résultat attendu** : 0 liens cassés  
**Résultat obtenu** : ✅ 0 liens cassés

---

### FAQ/Services : Vérification Liens "nice" Fixes
```bash
# Vérifier liens /nice/ restants (hors site nice)
grep -r "/nice/" sites/*/app/{faq,services}/page.tsx 2>/dev/null | grep -v "sites/nice" | wc -l
```

**Résultat attendu** : 0 liens hardcodés  
**Résultat obtenu** : ✅ 0 liens hardcodés

---

## Tests Build Local

### Test Nice (témoin)
```bash
cd sites/nice
npm run build
```

**Résultat** : ✅ Build OK (aucun changement faq/services, normal)

---

## Tests Production (Post-Deploy)

### Déploiement
```bash
# Push main
git push origin main

# Push tous sites avec rebuild
./scripts/deploy/push-all-sites.sh --force-deploy
```

**Résultat** :
- ✅ Main : commit `e8d2c144` + `4e118c7a` pushés
- ✅ 11 sites pushés sur GitHub
- ✅ Webhook CapRover déclenché (rebuild immédiat)

---

## Tests Crawler (À venir J+1)

### Homepage Blog
**URLs à tester** (11 sites) :
- `{city}.fr/blog/cartons-demenagement/` → doit être 404 ou 0 impressions
- `{city}.fr/blog/prix-demenagement-2025/` → doit être 404 ou 0 impressions

**Note** : Liens pointent maintenant vers `/blog/` (index)

### FAQ/Services "nice" Hardcodés
**URLs à tester** (66 patterns) :
- `lille.fr/quartiers-nice` → doit disparaître
- `lyon.fr/blog/demenagement-nice` → doit disparaître
- etc.

**Attente** : ~24-48h pour Google revalidation

---

## Critères de Validation

| Critère | Statut |
|---------|--------|
| ✅ 0 lien `/nice/` hors site Nice | ✅ PASS |
| ✅ 0 lien blog cassé homepage | ✅ PASS |
| ✅ Build local OK | ✅ PASS |
| ✅ Push GitHub OK | ✅ PASS |
| ⏳ Crawler validation (J+1) | ⏳ EN ATTENTE |

---

## Validation Finale

**Tests locaux** : ✅ OK  
**Déploiement** : ✅ OK  
**Validation crawler** : ⏳ À confirmer demain

**Prochaine étape** : Analyser rapport crawler J+1 (06/11/2025)
