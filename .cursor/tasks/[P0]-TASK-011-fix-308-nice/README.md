# TASK-011 : Fix 308 Redirections Nice + Deployment

**Type** : Bugfix / Deployment  
**Priorité** : P0  
**Temps estimé** : ~2h (dont 90% fait)  
**Assigné à** : Guillaume  
**Démarrée le** : 31 octobre 2025  
**Statut** : 🔄 EN COURS (90% fait, tests deployment à valider)

---

## 🎯 Objectif

Résoudre 11 pages Nice retournant 308 au lieu de 200 après déploiement (services, quartiers, corridors, pages légales). Problème de cache Docker CapRover ou commit déployé différent.

---

## 📊 Diagnostic

### Tests initiaux
- Tests : 30/41 réussis (73.2%) vs 42% avant
- 11 pages → 308 au lieu de 200
- Fichiers existent en local ✅
- Commit remote = local ✅
- Hypothèse : Cache Docker

---

## ✅ Travail Effectué (90%)

### Changements apportés
- Diagnostic complet effectué
- Solutions identifiées (force rebuild, invalidation cache)
- Fix deployment (SITE_URL, Dockerfile, .caproverenv)

### Commits GitHub
- [x] #615682ad : Fix captain-definition + Dockerfile Nice SITE_URL
- [x] #e008dfa8 : Ajout .caproverenv Nice avec SITE_URL
- [x] #1291630d : Correction SITE_URL env.ts Nice
- [x] #92e01c15 : Invalider cache Docker + ENV SITE_URL base stage
- [x] #b2f587c3 : Force invalidation cache Docker timestamp unique

---

## 📋 Ce qui Reste (10%)

### Sites à tester
- [ ] Nice : Vérifier 11 pages retournent 200 (pas 308)
- [ ] Valider déploiement CapRover OK

### Definition of Done
- [ ] 1. Fix appliqué et documenté
- [x] 2. Sur GitHub main (5 commits)
- [ ] 3. Testé live Nice - 11 pages → 200 OK

---

## 🧪 Tests à Faire

```bash
# Tester les 11 pages problématiques
curl -I https://devis-demenageur-nice.fr/services/demenagement-standard-nice/
curl -I https://devis-demenageur-nice.fr/quartiers-nice/
curl -I https://devis-demenageur-nice.fr/nice-vers-paris/
# ... (8 autres)

# Attendu : HTTP/2 200 (pas 308)
```

---

**Prochaine étape** : Tests deployment après redéploiement CapRover

**Temps restant** : ~30 min

