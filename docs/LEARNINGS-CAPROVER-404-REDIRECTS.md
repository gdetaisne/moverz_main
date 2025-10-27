# 📚 LEARNINGS : Déploiement CapRover + Redirections 404

**Date :** 27 octobre 2025  
**Objectif :** Déployer redirections 301 sur les 11 sites Moverz via CapRover

---

## 🎯 CONTEXTE

### Problème Initial
- **508 vues 404/semaine** sur l'ensemble des sites Moverz
- Sources principales : `/blog` (150 vues), `/estimation-rapide` (20 vues), `/inventaire-ia` (10 vues)
- **Impact SEO négatif** et mauvaise expérience utilisateur

### Solution Implémentée
- Redirections 301 permanentes (SEO-friendly)
- `/blog` → `/actualites`
- `/estimation-rapide` → `/devis`
- `/inventaire-ia` → `/analyse-ia`

---

## 🚨 ERREURS RENCONTRÉES ET SOLUTIONS

### ❌ Erreur 1 : Redirections dans le mauvais fichier

**Problème :**
```
Modification de next.config.mjs à la RACINE du monorepo
Mais CapRover build depuis sites/[ville]/
→ Redirections non déployées
```

**Cause :**
- Architecture CapRover : chaque app pointe vers `sites/[ville]/` via `Captain Definition Path`
- Le `next.config.mjs` racine n'est PAS utilisé par CapRover

**Solution :**
```bash
# Copier les redirections dans CHAQUE site
sites/bordeaux/next.config.js
sites/lille/next.config.mjs
sites/lyon/next.config.mjs
# ... etc (11 sites)
```

**Learning :**
> ✅ **Dans une architecture monorepo + CapRover, toujours modifier les fichiers DANS sites/[ville]/, pas à la racine**

---

### ❌ Erreur 2 : Captain Definition not found

**Problème :**
```
Deploy failed!
Error: Captain Definition file does not exist!
```

**Cause :**
- Les repos satellites (`dd-strasbourg`, etc.) contiennent TOUT le monorepo
- Mais `captain-definition` est dans `sites/strasbourg/captain-definition`
- CapRover cherche `captain-definition` **à la racine** du repo

**Solutions tentées (échecs) :**
1. ❌ Configurer "Captain Definition Path" dans CapRover UI
2. ❌ Créer un `captain-definition` unique à la racine (ne marche pas pour 11 sites différents)

**Solution finale (correcte) :**
```bash
# Pour CHAQUE repo satellite, copier les fichiers du site à la racine
cp sites/strasbourg/package.json package.json
cp -r sites/strasbourg/app .
cp -r sites/strasbourg/components .
cp -r sites/strasbourg/lib .
cp -r sites/strasbourg/public .
cp -r sites/strasbourg/content .
cp sites/strasbourg/captain-definition captain-definition
cp sites/strasbourg/Dockerfile Dockerfile
cp sites/strasbourg/next.config.mjs next.config.mjs
# ... etc
```

**Learning :**
> ✅ **Architecture CapRover pour monorepo : chaque repo satellite doit avoir la structure du site À LA RACINE, pas dans sites/[ville]/**

---

### ❌ Erreur 3 : module is not defined in ES module scope

**Problème :**
```
ReferenceError: module is not defined in ES module scope
next.config.js:91 → module.exports
package.json → "type": "module"
```

**Cause :**
- **Bordeaux** utilise `next.config.js` avec `module.exports` (CommonJS)
- Mais son `package.json` déclare `"type": "module"` (ES modules)
- Incompatibilité : CommonJS dans un contexte ES module

**Solution :**
```bash
# Option 1 : Renommer en .cjs
mv next.config.js next.config.cjs

# Option 2 : Convertir en .mjs avec export default
mv next.config.js next.config.mjs
# Puis remplacer module.exports par export default
```

**Learning :**
> ✅ **Avec `"type": "module"` dans package.json, utiliser UNIQUEMENT .mjs (export default) ou .cjs (module.exports), JAMAIS .js**

---

### ❌ Erreur 4 : Script de préparation copie tous les fichiers .js

**Problème :**
```bash
cp sites/$site/*.js .  # Copie TOUS les .js
# → Copie d'anciens fichiers .js obsolètes si le site utilise .mjs
```

**Cause :**
- Le script `prepare-satellite-repos.sh` copie `*.js` aveuglément
- Si un site a migré vers `.mjs`, il peut rester d'anciens `.js` obsolètes
- Ces vieux fichiers cassent le build

**Solution :**
```bash
# Copier UNIQUEMENT le fichier de config actif
if [ -f "sites/$site/next.config.mjs" ]; then
  cp sites/$site/next.config.mjs .
elif [ -f "sites/$site/next.config.cjs" ]; then
  cp sites/$site/next.config.cjs .
elif [ -f "sites/$site/next.config.js" ]; then
  # Vérifier si package.json a "type": "module"
  if grep -q '"type": "module"' sites/$site/package.json; then
    # Convertir en .mjs
    cp sites/$site/next.config.js next.config.mjs
    sed -i '' 's/module\.exports/export default/g' next.config.mjs
  else
    cp sites/$site/next.config.js .
  fi
fi
```

**Learning :**
> ✅ **Lors de la copie de fichiers de config, vérifier la cohérence avec package.json et copier UNIQUEMENT le fichier actif**

---

## 📋 ARCHITECTURE VALIDÉE

### Structure Repos Satellites

**AVANT (ne marchait pas) :**
```
dd-strasbourg/
├── sites/
│   └── strasbourg/
│       ├── app/
│       ├── components/
│       ├── captain-definition  ← CapRover cherche à la racine
│       ├── Dockerfile
│       └── next.config.mjs
└── (reste du monorepo)
```

**APRÈS (fonctionne) :**
```
dd-strasbourg/
├── captain-definition  ← À LA RACINE
├── Dockerfile  ← À LA RACINE
├── package.json  ← À LA RACINE (du site)
├── next.config.mjs  ← À LA RACINE
├── app/  ← À LA RACINE
├── components/  ← À LA RACINE
├── lib/  ← À LA RACINE
├── public/  ← À LA RACINE
├── content/  ← À LA RACINE
└── sites/  ← Reste du monorepo (non utilisé par CapRover)
```

---

## ✅ PROCÉDURE FINALE VALIDÉE

### Étape 1 : Modifier les fichiers dans sites/[ville]

```bash
# Ajouter redirections dans CHAQUE site
sites/bordeaux/next.config.js
sites/lille/next.config.mjs
sites/lyon/next.config.mjs
# ... etc (11 sites)
```

### Étape 2 : Commit et push vers moverz_main

```bash
git add sites/*/next.config.*
git commit -m "fix: Ajout redirections 301 dans tous les sites"
git push origin main
```

### Étape 3 : Préparer les repos satellites

```bash
./scripts/prepare-satellite-repos.sh
# Copie les fichiers de chaque site à la racine de son repo satellite
```

### Étape 4 : Force rebuild dans CapRover

**Pour chaque app (dd-strasbourg, dd-toulouse, etc.) :**
1. CapRover Dashboard → App
2. Onglet "Deployment"
3. Cliquer "Force Build"
4. Attendre 5-10 minutes
5. Vérifier les logs

---

## 🎯 COMMANDES UTILES

### Vérifier la cohérence package.json / next.config

```bash
# Vérifier si un site utilise "type": "module"
grep -r '"type": "module"' sites/*/package.json

# Vérifier quel fichier next.config existe
ls sites/*/next.config.*
```

### Tester les redirections après déploiement

```bash
curl -I https://devis-demenageur-strasbourg.fr/blog
# Attendu : HTTP 308 Permanent Redirect
# Location: /actualites
```

### Push vers tous les repos satellites

```bash
./scripts/push-to-all-site-repos.sh
```

### Préparer tous les repos satellites

```bash
./scripts/prepare-satellite-repos.sh
```

---

## 📊 RÉSULTATS

### Fichiers Modifiés
- 11 fichiers `next.config.*` (1 par site)
- 11 repos satellites restructurés
- ~470 lignes ajoutées (redirections)

### Impact Attendu
- **-35% de vues 404** à court terme (180 vues évitées)
- **-90% de vues 404** à 30 jours (< 50 vues/semaine)
- Amélioration SEO (301 permanent)
- Meilleure UX

---

## 🔍 CHECKLIST DE VÉRIFICATION

**Avant le commit :**
- [ ] Redirections ajoutées dans `sites/[ville]/next.config.*`
- [ ] Cohérence `package.json` ("type": "module") ↔ `.mjs`
- [ ] Pas de fichiers `.js` obsolètes si migration vers `.mjs`

**Avant le push satellite :**
- [ ] Fichiers copiés à la racine du repo satellite
- [ ] `captain-definition` à la racine
- [ ] `Dockerfile` à la racine
- [ ] `package.json` du site à la racine
- [ ] `app/`, `components/`, etc. à la racine

**Après le rebuild :**
- [ ] Build CapRover réussi (logs verts)
- [ ] Site accessible
- [ ] Redirections fonctionnelles (curl -I)
- [ ] Code HTTP 308 Permanent Redirect

---

## 🚨 PIÈGES À ÉVITER

### ❌ Ne PAS faire

1. **Modifier next.config.mjs à la racine du monorepo**
   - CapRover ne l'utilise pas
   - Modifier dans `sites/[ville]/`

2. **Configurer "Captain Definition Path" dans CapRover**
   - Ne marche pas avec les repos satellites
   - Copier les fichiers à la racine à la place

3. **Utiliser `*.js` avec `"type": "module"`**
   - Utiliser `.mjs` ou `.cjs`

4. **Oublier de copier content/ et public/**
   - Le build échouera (pages 404, images manquantes)

5. **Push vers moverz_main sans préparer les satellites**
   - CapRover ne verra pas les changements
   - Toujours faire `prepare-satellite-repos.sh` après

---

## 📚 RÉFÉRENCES

**Documentation créée :**
- `CHECKLIST-SEO-404.md` : Guide complet en français
- `QUICK-START-404.md` : Déploiement rapide
- `GUIDE-INTEGRATION-REDIRECTS.md` : Intégration technique
- `RAPPORT-404-SOLUTION-COMPLETE.md` : Rapport exécutif
- `scripts/prepare-satellite-repos.sh` : Script de préparation

**Documentation existante :**
- `docs/archives/procedures/PROCEDURE-DEPLOIEMENT-CAPROVER-CORRIGEE.md`
- `docs/archives/CONFIG_CAPROVER.md`
- `docs/archives/LEÇONS_CAPROVER_VALIDÉES.md`

---

## ✅ CONCLUSION

**Ce qui fonctionne :**
1. Modifier les fichiers dans `sites/[ville]/`
2. Commit + push vers `moverz_main`
3. Exécuter `prepare-satellite-repos.sh`
4. Force rebuild dans CapRover

**Temps total :** ~30 minutes pour 11 sites

**Impact :** Redirections 301 déployées sur tous les sites Moverz 🚀

---

**Créé le 27 octobre 2025**  
**Validé par : Lucie Stehelin de Taisne**

