# Commits - TASK-404-blog-lille

**Date** : 03 novembre 2025  
**Durée** : 1h30

---

## 📦 Commits Monorepo

### Commit Principal

**SHA** : `58053c4`  
**Message** :
```
fix(lille): correct 183 broken blog internal links

Pattern #5A: Fix folder mismatch (folder ≠ frontmatter category)

All corrections: /{folder}/ → /demenagement-lille/
- demenageur-lille → demenagement-lille (58 links)
- location-camion-lille → demenagement-lille (33 links)
- garde-meuble-lille → demenagement-lille (32 links)
- prix-demenagement-lille → demenagement-lille (24 links)
- aide-demenagement-lille → demenagement-lille (12 links)
- demenagement-pas-cher-lille → demenagement-lille (37 links)
- demenagement-international-lille → demenagement-lille (21 links)
- petit-demenagement-lille → demenagement-lille (19 links)
- demenagement-piano-lille → demenagement-lille (17 links)

Files: 88 modified
SEO impact: 183 internal 404s fixed
Method: Manual step-by-step (test + sed pattern by pattern)
```

**Stats** :
- 88 fichiers modifiés
- 183 insertions
- 343 deletions (anciens liens cassés)

---

## 📦 Commits Lille Individuel

### Commit Sync

**SHA** : `c973717`  
**Message** : `sync: update lille from monorepo`  
**Repo** : `https://github.com/gdetaisne/dd-lille`

**Stats** :
- 88 fichiers modifiés
- 183 insertions
- 183 deletions

---

## 🚀 Déploiement

**CapRover** :
- Webhook déclenché : ✅
- Build time : 3-5 min
- Site : `devis-demenageur-lille.fr`

---

## ✅ Validation

**Tests production** (post-deploy) :
- [ ] `/blog/demenagement-lille/demenageur-lille-expert/` → 200 OK
- [ ] `/blog/demenagement-lille/garde-meuble-lille-guide/` → 200 OK
- [ ] `/blog/demenagement-lille/prix-demenagement-lille-guide/` → 200 OK
- [ ] `/blog/demenagement-lille/location-camion-demenagement-lille-guide/` → 200 OK
- [ ] `/blog/demenagement-lille/demenagement-pas-cher-lille-guide/` → 200 OK

---

**Créé par** : Cursor AI  
**Date** : 03/11/2025
