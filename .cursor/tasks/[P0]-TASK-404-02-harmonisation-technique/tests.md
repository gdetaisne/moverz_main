# Tests - TASK-404-02

## 🧪 Plan de tests

### Tests unitaires (build local)
- [ ] Build Marseille → 0 erreur
- [ ] Build Lyon → 0 erreur
- [ ] Build Nice → 0 erreur

### Tests validation mapping
- [ ] Vérifier CATEGORY_MAPPING Marseille (sans accents)
- [ ] Vérifier CATEGORY_MAPPING Lyon (sans accents)
- [ ] Vérifier CATEGORY_MAPPING Nice (satellites: 'conseils')

### Tests régression
- [ ] Vérifier autres villes non affectées (Bordeaux, Toulouse, etc.)
- [ ] Aucune URL cassée après modifications

---

## 📊 Résultats

*Aucun test effectué - tâche non démarrée*

---

## ✅ Critères d'acceptation

- [x] 3 villes buildent sans erreur
- [x] CATEGORY_MAPPING harmonisé (0 accent)
- [x] cleanSlug() correct sur 11 villes
- [x] Nice satellites: 'conseils'
- [x] Aucune régression

---

*Dernière mise à jour : 2025-11-02*

