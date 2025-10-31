# 🔍 Diagnostic Nice - 308 Redirections

**Date:** 31 octobre 2025  
**Build:** `a71c49fe73b2` (img-captain-dd-nice:latest)  
**Commit attendu:** `322d549` (fix: Correction exhaustive ALL missing canonicals)

---

## 📊 Situation Actuelle

### Tests Post-Déploiement
- **Total:** 41 tests
- **Réussis:** 30 (73.2%)  
- **Échecs:** 11 (26.8%)

### Amélioration depuis avant-déploiement
- **Avant:** 42% (11/26)
- **Après:** 73.2% (30/41)  
- **Progrès:** +31%

---

## ❌ Problème: 11 pages retournent 308

### Pages concernées:

**Services détaillés (3):**
- `/services/demenagement-economique-nice/` → 308
- `/services/demenagement-standard-nice/` → 308
- `/services/demenagement-premium-nice/` → 308

**Quartiers (3):**
- `/nice/vieux-nice/` → 308
- `/nice/liberation/` → 308
- `/nice/cimiez/` → 308

**Corridors (2):**
- `/nice-vers-paris/` → 308
- `/nice-vers-lyon/` → 308

**Pages légales (3):**
- `/cgv/` → 308
- `/mentions-legales/` → 308
- `/politique-confidentialite/` → 308

---

## 🔍 Vérifications Effectuées

### ✅ Fichiers Existent en Local
```bash
Services:     3 fichiers ✅
Quartiers:    6 fichiers ✅
Corridors:    6 fichiers ✅
Légales:      3 fichiers ✅
```

### ✅ Git Status
```bash
Branch: main
Status: up to date with origin/main
Commit: 322d549 (fix: Correction exhaustive ALL missing canonicals)
Working tree: clean
```

### ✅ Commit Remote
```bash
Local hash:  322d549be5ef17f861fcf756c8fdc790c7372ccb
Remote hash: 322d549be5ef17f861fcf756c8fdc790c7372ccb
→ Identiques ✅
```

---

## 🤔 Hypothèses

### Hypothèse 1: Cache Docker CapRover
**Probabilité:** 🔴 HAUTE

CapRover utilise un cache Docker qui peut avoir gardé l'ancienne structure de fichiers.

**Indices:**
- Build réussi: `Successfully built a71c49fe73b2`
- Mais pages retournent 308 comme si elles n'existaient pas

**Solution:** Force Rebuild avec cache invalidé

---

### Hypothèse 2: Commit Déployé ≠ Commit Actuel
**Probabilité:** 🟡 MOYENNE

CapRover a peut-être déployé un commit plus ancien.

**Vérification nécessaire:**
- Regarder les logs de build CapRover
- Chercher `CAPROVER_GIT_COMMIT_SHA` dans les logs
- Comparer avec `322d549`

---

### Hypothèse 3: .dockerignore exclut ces fichiers
**Probabilité:** 🟢 FAIBLE

Un `.dockerignore` mal configuré pourrait exclure ces dossiers.

**Vérification:**
```bash
cd sites/nice
cat .dockerignore
```

**Note:** Peu probable car d'autres pages fonctionnent.

---

### Hypothèse 4: Structure Next.js App Router
**Probabilité:** 🟢 FAIBLE

Next.js avec `trailingSlash: true` redirige automatiquement si les pages n'existent pas dans le build.

**Comportement observé:**
- Pages qui EXISTENT en code → retournent 200
- Pages qui N'EXISTENT PAS dans le build → retournent 308

**Conclusion:** Les pages ne sont pas dans le build Docker.

---

## ✅ Ce qui FONCTIONNE

**Pages 100% opérationnelles (30 tests):**
- ✅ Homepage
- ✅ Services (page principale)
- ✅ Contact (contenu "Nice" correct!)
- ✅ Partenaires
- ✅ Comment ça marche
- ✅ Blog Index
- ✅ CGU
- ✅ Inventaire IA (contenu "Nice" correct!)
- ✅ Estimation Rapide (contenu "Nice" correct!)
- ✅ Notre Offre (contenu "Nice" correct!)
- ✅ FAQ (contenu "Nice" correct!)
- ✅ Nice → Marseille (corridor fonctionnel)

**Preuve que le déploiement a pris CERTAINES corrections:**
- ✅ Contenu "Nice" au lieu de "Lille" → Templates génériques appliqués
- ✅ Canonicals avec trailing slash
- ✅ Nouvelles pages (inventaire-ia/layout.tsx, estimation-rapide/layout.tsx)

---

## 🎯 Actions Recommandées

### Action 1: Vérifier Hash Commit Déployé (PRIORITÉ 1)
**Objectif:** Confirmer quel commit CapRover a réellement déployé

**Procédure:**
1. Ouvrir CapRover → dd-nice → Déploiement
2. Afficher les logs de build complets
3. Chercher `CAPROVER_GIT_COMMIT_SHA` ou hash Git
4. Comparer avec `322d549`

---

### Action 2: Force Rebuild avec Cache Invalidé (PRIORITÉ 1)
**Objectif:** Forcer CapRover à reconstruire TOUT sans cache

**Procédure:**
1. CapRover → dd-nice → Déploiement
2. Cliquer "Force Rebuild"
3. Attendre build complet (5-10 min)
4. Relancer audit

**Commande test après rebuild:**
```bash
python3 /tmp/audit-nice-post-deploy.py
```

**Attendu:** 41/41 tests passés (100%)

---

### Action 3: Vérifier .dockerignore (PRIORITÉ 2)
**Objectif:** S'assurer qu'aucun fichier n'est exclu du build

**Commande:**
```bash
cd /Users/guillaumestehelin/moverz_main-1/sites/nice
cat .dockerignore
```

**Vérifier que ces patterns NE sont PAS présents:**
```
app/services/
app/nice/
app/nice-vers-*/
app/cgv/
app/mentions-legales/
app/politique-confidentialite/
```

---

### Action 4: Tester Manuellement Build Local (PRIORITÉ 3)
**Objectif:** Vérifier que le build Next.js fonctionne en local

**Commandes:**
```bash
cd /Users/guillaumestehelin/moverz_main-1/sites/nice
npm run build
npm run start
```

**Tests:**
```bash
curl -I http://localhost:3000/services/demenagement-economique-nice/
curl -I http://localhost:3000/nice/vieux-nice/
curl -I http://localhost:3000/cgv/
```

**Attendu:** HTTP 200 pour toutes

---

## 📊 Récapitulatif Comparatif

| Aspect | Local | Production | Status |
|--------|-------|------------|--------|
| Commit | `322d549` | `?` (à vérifier) | ⚠️ |
| Fichiers services | ✅ 3 | ❌ 0 (308) | 🔴 |
| Fichiers quartiers | ✅ 6 | ❌ 3 (308) | 🔴 |
| Fichiers corridors | ✅ 6 | ✅ 1 / ❌ 2 (308) | 🟡 |
| Fichiers légales | ✅ 3 | ✅ 1 / ❌ 2 (308) | 🟡 |
| Templates génériques | ✅ Oui | ✅ Oui | ✅ |
| Canonicals | ✅ Oui | ✅ Oui | ✅ |

---

## 🎯 Diagnostic Final

**CAUSE PROBABLE:**  
Le build Docker CapRover n'a pas inclus tous les fichiers du commit `322d549`, probablement à cause d'un cache Docker.

**PREUVE:**
- Fichiers existent en local ✅
- Commit pushé sur GitHub ✅
- Certaines corrections appliquées (templates génériques) ✅
- Mais 11 pages manquent (308) ❌

**SOLUTION:**  
Force Rebuild CapRover avec invalidation du cache.

---

## 🔄 Prochaines Étapes

1. ✅ Vérifier hash commit dans logs CapRover
2. ✅ Force Rebuild dd-nice
3. ✅ Attendre 5-10 min
4. ✅ Relancer audit (`python3 /tmp/audit-nice-post-deploy.py`)
5. ✅ Attendu: 100% tests passés

---

**Auteur:** IA Assistant  
**Date:** 31 octobre 2025  
**Status:** ⏳ **EN ATTENTE FORCE REBUILD**

