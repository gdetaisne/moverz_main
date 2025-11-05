# Commits - TASK-050

## Main Monorepo

### `e8d2c144` - fix(TASK-050): Corriger tous liens nice hardcodés (66 404)
**Date** : 05/11/2025 13:31  
**Branche** : `main`

**Problème Lucie commit 7ae8f94** :
- FAQ: liens internes `/nice/` hardcodés (40 404)
- Services: liens internes `/nice/` hardcodés (26 404)

**Solution** :
- Dynamiser tous liens `/nice/` → `/{city}/`
- Remplacer 'nice'/'Nice' → ville dynamique
- Remplacer 'niçois' → adjectif ville

**Fichiers modifiés** : 20
- `sites/{city}/app/faq/page.tsx` (10 sites)
- `sites/{city}/app/services/page.tsx` (10 sites)

**Impact** : 66 404 résolus (10 sites × ~6-7 liens)

---

### `4e118c7a` - fix(homepage): Corriger liens blog cassés (22 404)
**Date** : 05/11/2025 13:30  
**Branche** : `main`

**Problème Lucie homepage** :
- `/blog/cartons-demenagement/` → 404 (slug n'existe pas)
- `/blog/prix-demenagement-2025/` → 404 (slug n'existe pas)

**Solution** :
- Pointer vers `/blog/` (index, toujours existe)
- Alternative future : créer articles ou pointer vers articles existants

**Fichiers modifiés** : 11
- `sites/{city}/app/page.tsx` (11 sites)

**Impact** : 22 404 résolus (11 sites × 2 liens homepage)

---

## Sites Individuels

### Commits Auto-générés (`push-all-sites.sh`)
**Date** : 05/11/2025 13:31-13:32  
**Message** : "feat: Update {city} 2025-11-05 13:31"

**Sites déployés** :
1. ✅ Marseille - `8555b2c`
2. ✅ Lyon - `8a515d9`
3. ✅ Montpellier - `d20329b`
4. ✅ Bordeaux - `f2d3dd2`
5. ✅ Nantes - `4a45899`
6. ✅ Lille - `6aa5dca`
7. ✅ Nice - (aucun changement faq/services, homepage uniquement)
8. ✅ Strasbourg - `4becbf4`
9. ✅ Rouen - `e1a747a`
10. ✅ Rennes - `a861489`
11. ✅ Toulouse - `4e808ce`

**Mode** : `--force-deploy` (rebuild CapRover immédiat via webhook GitHub)

---

## Scripts Utilisés

### `fix_hardcoded_nice_links.js`
**But** : Corriger liens "nice" hardcodés dans FAQ et Services

**Logique** :
- Map ville → adjectif
- Remplacer `/nice/` → `/{city}/`
- Remplacer `nice`/`Nice` → ville/Ville
- Remplacer `niçois` → adjectif approprié

**Résultat** : 60 occurrences corrigées (10 sites, Nice exclu)

### `fix_homepage_blog_links.js`
**But** : Corriger liens blog génériques homepage

**Logique** :
- Identifier liens cassés (regex pattern)
- Remplacer par `/blog/` (safe, toujours existe)

**Résultat** : 22 liens corrigés (11 sites)

---

## Repos GitHub

**Main Monorepo** :  
https://github.com/gdetaisne/moverz_main

**Sites Individuels** :
- https://github.com/gdetaisne/dd-marseille
- https://github.com/gdetaisne/dd-lyon
- https://github.com/gdetaisne/dd-montpellier
- https://github.com/gdetaisne/dd-bordeaux
- https://github.com/gdetaisne/dd-nantes
- https://github.com/gdetaisne/dd-lille
- https://github.com/gdetaisne/dd-nice
- https://github.com/gdetaisne/dd-strasbourg
- https://github.com/gdetaisne/dd-rouen
- https://github.com/gdetaisne/dd-rennes
- https://github.com/gdetaisne/dd-toulouse

---

**Total commits** : 13 (2 main + 11 sites)  
**Statut** : ✅ Tous pushés sur GitHub
