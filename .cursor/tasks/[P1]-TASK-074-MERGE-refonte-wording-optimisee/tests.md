# Tests - TASK-074-MERGE

## Tests Locaux

*À effectuer après Phase 2*

### Nice Local
- [ ] Build réussi : `cd sites/nice && npm run build`
- [ ] Dev OK : `npm run dev`
- [ ] Wording correct affiché
- [ ] CTA unifié présent
- [ ] Pas de ville hardcodée

### Lyon Local
- [ ] Build réussi
- [ ] Wording correct
- [ ] cityData dynamique

### Marseille Local
- [ ] Build réussi
- [ ] Wording correct
- [ ] cityData dynamique

---

## Tests Production

*À effectuer après Phase 5 (deploy)*

### Nice Production
- [ ] URL : https://devis-demenageur-nice.fr/
- [ ] Wording correct affiché
- [ ] Metadata correctes
- [ ] Aucune régression

### Lyon Production
- [ ] URL : https://devis-demenageur-lyon.fr/
- [ ] Wording correct affiché
- [ ] Metadata correctes
- [ ] Aucune régression

### Marseille Production
- [ ] URL : https://devis-demenageur-marseille.fr/
- [ ] Wording correct affiché
- [ ] Metadata correctes
- [ ] Aucune régression

---

## Commandes Tests

```bash
# Build local
cd sites/nice && npm run build
cd sites/lyon && npm run build
cd sites/marseille && npm run build

# Tests production (curl)
curl -s https://devis-demenageur-nice.fr/ | grep "nouveau-wording"
curl -s https://devis-demenageur-lyon.fr/ | grep "nouveau-wording"
curl -s https://devis-demenageur-marseille.fr/ | grep "nouveau-wording"
```

---

**Validation double obligatoire** : Local + Production



