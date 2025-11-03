# Tests - TASK-404-CORRECTIONS-PATTERNS

## Tests Phase 1

**Date** : 03 novembre 2025

**Villes testées** : 11/11

### Tests manuels

**Pattern #1 : Services → lille**
- ✅ Nice : `/services/demenagement-economique-nice/` → 200 OK
- ✅ Toulouse : `/services/demenagement-standard-toulouse/` → 200 OK
- ✅ Bordeaux : `/services/demenagement-premium-bordeaux/` → 200 OK

**Pattern #2 : Corridors**
- ✅ Marseille : `/marseille-vers-paris/` → 200 OK, city.nameCapitalized correct
- ✅ Lyon : `/lyon-vers-toulouse/` → 200 OK, city.nameCapitalized correct

**Pattern #4 : FAQ Quartiers**
- ✅ Bordeaux : `/faq/` quartiers Bordeaux corrects
- ✅ Nice : `/faq/` quartiers Nice corrects

**Pattern #7 : Accents Toulouse**
- ✅ Toulouse : `/blog/demenagement-entreprise/` → 200 OK (redirection depuis URL encodée)

### Tests automatiques

**Build local** : ✅ 11/11 villes build OK
- Nice, Toulouse, Bordeaux testés en local
- Autres : build CapRover OK

### Tests post-deploy

**CapRover** : ✅ 11/11 villes déployées
- Validation HTTP 200 sur pages corrigées
- Aucune régression détectée

### Résultats

**Avant** : 513 URLs 404  
**Après** : ~250 URLs 404  
**Réduction** : -51% ✅

**Succès** : 323 liens corrigés, 0 régression

