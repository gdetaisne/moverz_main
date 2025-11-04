# Tests - Corrections 404 Blog Nantes

**Date création** : 03 novembre 2025

---

## 🧪 TESTS PRÉ-CORRECTION

```bash
curl -I https://devis-demenageur-nantes.fr/blog/demenagement-nantes/demenageur-nantes-guide/
curl -I https://devis-demenageur-nantes.fr/blog/demenagement-nantes/garde-meuble-nantes-guide/
curl -I https://devis-demenageur-nantes.fr/blog/demenagement-nantes/prix-demenagement-nantes-guide/
```

- [ ] 3 URLs = 200 OK ✅

---

## 🧪 TESTS POST-CORRECTION

```bash
cd sites/nantes/content/blog
grep -r "](/blog/demenageur-nantes/" . --include="*.md" | wc -l  # → 0
grep -r "](/blog/garde-meuble-nantes/" . --include="*.md" | wc -l  # → 0
# ... tous patterns = 0
```

- [ ] Tous patterns = 0 ✅
- [ ] Git diff propre
- [ ] Deploy OK



