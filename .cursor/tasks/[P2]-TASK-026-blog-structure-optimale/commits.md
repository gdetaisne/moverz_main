# Commits - TASK-026 : Blog Structure Optimale

**Date création** : 03 novembre 2025

---

## 📋 STATUT : Pas encore de commits

Cette task n'a pas encore démarré.

---

## 🔄 COMMITS PRÉVUS

### Montpellier

**Commit 1** : Structure initiale
```
feat(montpellier): create blog structure with optimal SEO categories

- Add 10 thematic categories (demenageur, pas-cher, garde-meuble, etc.)
- Folder structure: content/blog/{category}/
- Templates: piliers + satellites
```

**Commit 2** : Contenu piliers
```
feat(montpellier): add 6 main pillar guides

- demenageur/demenageur-montpellier-expert.md
- pas-cher/demenagement-pas-cher-montpellier-guide.md
- garde-meuble/garde-meuble-montpellier-guide.md
- prix/prix-demenagement-montpellier-guide.md
- entreprise/demenagement-entreprise-montpellier-guide.md
- international/demenagement-international-montpellier-guide.md

URLs: /blog/{category}/{slug}/ (45-52 chars)
```

**Commit 3** : Articles satellites
```
feat(montpellier): add 10-15 satellite articles

- Internal linking optimized
- Category silos complete
- 0 broken links
```

**Commit 4** : Déploiement
```
chore(montpellier): deploy to production

- Build validated
- URLs tested
- SEO metadata complete
- Ready for Google indexing
```

### Nice

**Commit 5-8** : Répétition structure Nice
```
(Même pattern que Montpellier)
```

---

## 📊 À DOCUMENTER

Pour chaque commit :
- [ ] SHA complet
- [ ] Date/heure
- [ ] Fichiers modifiés (liste)
- [ ] Tests validation
- [ ] Déploiement sites concernés

---

**Format** :

```markdown
### Commit : [Titre]

**SHA** : abc123def456...
**Date** : DD/MM/YYYY HH:MM
**Branches** :
- Monorepo : main
- Sites individuels : montpellier/main

**Fichiers modifiés** :
- sites/montpellier/content/blog/demenageur/...
- sites/montpellier/lib/blog.ts (si modifs)

**Tests** :
- ✅ Build local OK
- ✅ URLs générées validées
- ✅ Liens internes OK
- ✅ Metadata complète

**Déploiement** :
- ✅ CapRover montpellier.moverz.fr
- ✅ Site live vérifié
```



