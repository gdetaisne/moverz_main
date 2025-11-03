# Tests - Corrections 404 Blog Toulouse

**Date création** : 03 novembre 2025

---

## 🧪 TESTS PRÉ-CORRECTION

```bash
# Tester URLs accentuées
curl -I https://devis-demenageur-toulousain.fr/blog/déménagement-économique/demenagement-pas-cher-toulouse/

# Tester URLs encodées
curl -I https://devis-demenageur-toulousain.fr/blog/dem%C3%A9nagement-economique/demenagement-pas-cher-toulouse/

# Tester URLs sans accents
curl -I https://devis-demenageur-toulousain.fr/blog/demenagement-economique/demenagement-pas-cher-toulouse/
```

- [ ] Noter quelle URL fonctionne

---

## 🧪 VÉRIFICATION REDIRECTIONS

```bash
cat sites/toulouse/next.config.mjs | grep -A50 "redirects"
```

- [ ] Redirections présentes
- [ ] Couvrent toutes catégories accentuées

---

## 🧪 TESTS POST-CORRECTION

- [ ] 13 liens résolus
- [ ] Deploy OK

