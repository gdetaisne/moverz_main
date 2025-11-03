# TASK-012 : Correction Global Villes Hardcodées

**Type** : Bugfix / Refactor  
**Priorité** : P1  
**Temps estimé** : ~3-4h (dont 85% fait)  
**Assigné à** : Lucie (Associée)  
**Démarrée le** : 30-31 octobre 2025  
**Statut** : 🔄 EN COURS (85% fait, tests à valider)

---

## 🎯 Objectif

Corriger villes hardcodées dans le code (ex: "Lille" en dur dans code Bordeaux). Problème de copier/coller lors création sites. Impact SEO et UX (mauvaises infos affichées).

---

## ⚠️ Problèmes Identifiés

- **Bug Lille hardcodé** : Dans pages services/contact autres villes
- **Quartiers Bordeaux** : Hardcodés dans code Strasbourg
- **Emails** : contact@ville-incorrecte.fr en dur
- **URLs** : Domaines hardcodés au lieu d'utiliser cityData

---

## ✅ Changements Apportés (85%)

- Metadata dynamiques services + contact (11 villes)
- Correction bug Lille hardcodé
- Fix quartiers Bordeaux dans autres sites
- Remplacement emails par contact@domaine.fr (11 villes)
- Correction URL Bordeaux cityData
- Footer résolution villes SITE_URL

### Commits GitHub
- [x] #c43c0391 : Metadata dynamiques + Bug Lille hardcodé corrigé (11 villes)
- [x] #c10e79f2 : Remplacement emails par contact@domaine.fr (11 villes)
- [x] #8c353a42 : Sync cityData.ts URL Bordeaux correcte
- [x] #dfe0ae7a : Corrige URL Bordeaux + doc URLs production
- [x] #af07421b : Fix footer résolution villes + SITE_URL Montpellier

---

## 📋 Ce qui Reste (15%)

### Sites à tester
- [ ] 2+ villes : Vérifier pas de ville hardcodée
- [ ] Vérifier metadata dynamiques correctes
- [ ] Vérifier emails corrects par ville

### Definition of Done
- [x] 1. Code corrigé et documenté (11 villes)
- [x] 2. Sur GitHub main (5 commits)
- [ ] 3. Testé sur 2+ sites (zéro hardcodé)

---

## 🧪 Tests à Faire

```bash
# Vérifier pas de "Lille" hardcodé ailleurs que Lille
grep -r "Déménagement à Lille" sites/*/app --include="*.tsx" | grep -v "sites/lille"

# Vérifier emails corrects
for city in marseille toulouse lyon; do
  echo "=== $city ==="
  grep -r "contact@" sites/$city/app --include="*.tsx"
done
```

---

**Temps restant** : ~30-45 min

