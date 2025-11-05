# Tests - TASK-050

**Tâche** : Fix Liens "nice" Hardcodés

---

## 🧪 TESTS PRÉ-CORRECTION

### Test 1 : Détection Bug
```bash
grep -r "quartiers-nice" sites/lille/app/
# Résultat : 2 occurrences (faq + services)
```

✅ Bug confirmé

---

### Test 2 : Étendue
```bash
grep -r "quartiers-nice\|demenagement-nice" sites/*/app/{faq,services}/ | wc -l
# Résultat : 33 occurrences (22 fichiers)
```

✅ 22 fichiers affectés

---

## 🧪 TESTS POST-CORRECTION (À EFFECTUER)

### Test 1 : Vérification Grep
```bash
# Vérifier 0 occurrence "nice" hardcodé (sauf site Nice)
for ville in bordeaux lille lyon marseille montpellier nantes rennes rouen strasbourg toulouse; do
  count=$(grep -r "quartiers-nice\|demenagement-nice" sites/$ville/app/{faq,services}/ 2>/dev/null | wc -l)
  if [ "$count" -gt 0 ]; then
    echo "❌ $ville : $count occurrences restantes"
  else
    echo "✅ $ville : OK"
  fi
done
```

**Attendu** : 10/10 sites ✅ OK

---

### Test 2 : Build Local
```bash
cd sites/lille && npm run build
```

**Attendu** : Build réussi sans erreur

---

### Test 3 : Vérification Liens Dynamiques
```bash
# Vérifier présence city.slug dans liens
grep "city.slug" sites/lille/app/faq/page.tsx
grep "city.slug" sites/lille/app/services/page.tsx
```

**Attendu** : 3 occurrences (1 faq + 2 services)

---

## 🧪 TESTS POST-PROD (J+1)

### Test 1 : URLs Résolues (Sample)
```bash
curl -I https://devis-demenageur-lille.fr/quartiers-lille/
# Attendu : 200 OK

curl -I https://devis-demenageur-lille.fr/blog/demenagement-lille/
# Attendu : 200 OK

curl -I https://devis-demenageur-lille.fr/quartiers-nice/
# Attendu : 404 (plus de lien interne vers cette URL)
```

---

### Test 2 : Google Search Console (J+7)
- [ ] Vérifier 404 disparaissent
- [ ] 72 URLs → 0 URLs

---

## 📊 RÉSULTATS ATTENDUS

| Test | Avant | Après | Status |
|------|-------|-------|--------|
| **Grep "nice" hardcodé** | 33 occurrences | 0 | ⏳ |
| **Build local** | N/A | ✅ OK | ⏳ |
| **URLs 404** | 72 | 0 | ⏳ |
| **GSC propre** | Non | Oui | ⏳ (J+7) |

---

**Tests effectués** : 0/6  
**Tests réussis** : 0/6  
**Tests en attente** : 6/6

