# CI Anti-404 — Guide d'utilisation

## 🎯 Objectif

Prévenir toute réintroduction de 404 sur les 11 sites via validation automatique des commits.

---

## 🔒 Protections mises en place

### 1. GitHub Actions (CI automatique)

**Workflow** : `.github/workflows/check-content-links.yml`

**Déclenchement** :
- Pull Request modifiant `sites/*/content/**` ou `content/**`
- Push sur `main` modifiant ces chemins

**Jobs** :

1. **check-forbidden-patterns**
   - Bloque patterns interdits :
     - `](/demenagement/[a-z0-9-]+)` 
     - `](/blog/[a-z0-9-]+/guide/?)`
   - Fail immédiat si détecté dans diff
   - Affiche exemples corrects

2. **check-internal-links**
   - Valide liens Markdown internes (Nice, Bordeaux)
   - Vérifie existence approximative des cibles
   - Avertissement si lien suspect

3. **build-smoke-test**
   - Build Next.js sur Bordeaux
   - Fail si erreurs TypeScript/build
   - Validation rapide (~2-3 min)

**Durée totale** : ~3-5 min

---

### 2. Script push-all-sites-to-github.sh sécurisé

**Protections** :
- ✅ RSYNC DÉSACTIVÉ par défaut (`ALLOW_CONTENT_SYNC=0`)
- ✅ Flag `--dry-run` (simulation sans push)
- ✅ Flag `--sites=ville1,ville2` (push ciblé)

**Exemples d'usage** :

```bash
# Push tous les sites SANS rsync (recommandé)
./scripts/deploy/push-all-sites-to-github.sh

# Simulation (aucun push réel)
./scripts/deploy/push-all-sites-to-github.sh --dry-run

# Push seulement Nice et Bordeaux
./scripts/deploy/push-all-sites-to-github.sh --sites=nice,bordeaux

# Push avec rsync (RISQUÉ - seulement si tu es sûr)
ALLOW_CONTENT_SYNC=1 ./scripts/deploy/push-all-sites-to-github.sh
```

---

### 3. CODEOWNERS (Review obligatoire)

**Fichier** : `.github/CODEOWNERS`

**Zones protégées** :
- `sites/**` → Review Guillaume requise
- `content/**` → Review Guillaume requise
- `scripts/deploy/**` → Review Guillaume requise
- `.github/workflows/**` → Review Guillaume requise

**Effet** :
- Pull Request sur ces zones = approbation Guillaume obligatoire
- Push direct sur main = bloqué (si branch protection activée)

---

## ⚙️ Configuration GitHub requise (manuelle)

### Activer branch protection sur `main`

1. Va sur https://github.com/gdetaisne/moverz_main/settings/branches
2. Clique "Add rule" ou édite la règle `main`
3. Active :
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1)
   - ✅ Require status checks to pass before merging
     - Cherche : `check-forbidden-patterns`, `build-smoke-test`
   - ✅ Require conversation resolution before merging
   - ✅ Include administrators (pour forcer Guillaume aussi)
4. Save changes

**Effet** :
- Commits directs sur main = impossibles
- Passage obligatoire par PR + CI green + review

---

## 🧪 Tester les protections

### Test 1 : CI bloque pattern interdit

```bash
# Créer branche test
git checkout -b test-ci-block

# Ajouter un pattern interdit
echo "[Lien cassé](/demenagement/test)" >> sites/nice/content/blog/test.md
git add sites/nice/content/blog/test.md
git commit -m "test: pattern interdit"
git push origin test-ci-block

# Créer PR sur GitHub
# → CI doit FAIL avec message "Pattern interdit détecté"
```

### Test 2 : Dry-run script

```bash
./scripts/deploy/push-all-sites-to-github.sh --dry-run
# → Doit afficher "MODE DRY-RUN" et ne rien pousser
```

### Test 3 : Push ciblé

```bash
./scripts/deploy/push-all-sites-to-github.sh --sites=nice --dry-run
# → Doit lister seulement Nice
```

---

## 📖 Bonnes pratiques

### ✅ À FAIRE

- Toujours passer par PR pour `sites/**` et `content/**`
- Vérifier CI green avant merge
- Tester en local (`npm run build`) avant push
- Utiliser `--dry-run` pour validation avant push réel
- Déploiement progressif : 1-2 villes → scan → reste

### ❌ À NE PAS FAIRE

- ❌ Push direct sur main (si branch protection active)
- ❌ Activer `ALLOW_CONTENT_SYNC=1` sans validation préalable
- ❌ Modifier en masse `sites/*/content/**` sans review
- ❌ Ignorer warnings CI ("c'est juste un warning")
- ❌ Déployer 11 sites sans test 2 villes pilote

---

## 🚨 En cas de faux positif CI

Si CI bloque à tort :

1. Vérifier le pattern détecté
2. Si vraiment légitime, documenter pourquoi
3. Merge avec override (admin seulement)
4. Créer issue pour affiner règle CI

---

## 📊 Monitoring

**Post-déploiement** :
- Scanner 404 sur 2 villes pilote (Nice, Bordeaux)
- Comparer avant/après
- Si >5 404 nouvelles détectées → rollback immédiat

**Outils** :
- Google Search Console (suivi 404 quotidien)
- `linkinator` local : `npx linkinator https://devis-demenageur-nice.fr --recurse`
- `scripts/analysis/analyze-404.mjs` (après correction bugs chemins)

---

## 📞 Support

Si problème avec CI ou scripts :
- Doc complète : `.cursor/tasks/[P1]-TASK-048-ci-anti-404/README.md`
- Logs CI : GitHub Actions tabs
- Contact : Guillaume


