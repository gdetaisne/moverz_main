# ⚠️ WARNING - NE PAS MODIFIER DIRECTEMENT CE SITE

## 🚨 Règle Absolue

**Ce site fait partie d'un système multi-sites (11 sites)**

**NE JAMAIS modifier directement les fichiers suivants** :

```
❌ sites/{ville}/tsconfig.json
❌ sites/{ville}/Dockerfile
❌ sites/{ville}/.dockerignore
❌ sites/{ville}/.eslintrc.json
❌ sites/{ville}/components/Hero.tsx
❌ sites/{ville}/components/HowItWorks.tsx
❌ sites/{ville}/components/StickyCTA.tsx
❌ sites/{ville}/components/PricingPreview.tsx
❌ sites/{ville}/components/NeighborhoodsIndex.tsx
❌ sites/{ville}/components/CtaPrimary.tsx
❌ sites/{ville}/components/LeadForm.tsx
❌ sites/{ville}/app/globals.css
```

## ✅ Workflow Correct

### Pour modifier une config technique

```bash
# 1. Éditer le template
code .templates/tsconfig.json
# ou
code .templates/Dockerfile.template

# 2. Synchroniser vers tous les sites
./scripts/sync-config-files.sh

# 3. Valider
./scripts/validate-consistency.sh

# 4. Commit et déployer
git add -A && git commit -m "fix(config): ..."
./scripts/push-all-sites-to-github.sh
```

### Pour modifier un composant UX

```bash
# 1. Éditer le template
code components/Hero.tsx
# ou
code app/globals.css

# 2. Synchroniser vers tous les sites
./scripts/sync-components.sh

# 3. Valider
./scripts/validate-consistency.sh

# 4. Commit et déployer
git add -A && git commit -m "feat(hero): ..."
./scripts/push-all-sites-to-github.sh
```

## 📝 Fichiers que VOUS POUVEZ modifier directement

```
✅ sites/{ville}/components/Testimonials.tsx      (quartiers locaux)
✅ sites/{ville}/components/NeighborhoodsTeaser.tsx (liste quartiers)
✅ sites/{ville}/app/layout.tsx                   (metadata spécifique)
✅ sites/{ville}/content/blog/*.md                (articles blog)
✅ sites/{ville}/public/robots.txt                (si URL spécifique)
✅ sites/{ville}/.env.local                       (variables d'env)
```

## 🔍 Vérifier la cohérence

Avant chaque commit :

```bash
./scripts/validate-consistency.sh
```

Si erreurs détectées :
- ✅ Suivre les instructions du script
- ✅ Corriger via les templates + sync
- ❌ Ne PAS commit les modifications directes

## 💡 Pourquoi cette règle ?

**Problème** : Modifier 1 site directement
- ❌ Crée des incohérences entre les 11 sites
- ❌ Sera écrasé au prochain sync
- ❌ Rend impossible la maintenance
- ❌ Cause des bugs en production (ex: images manquantes)

**Solution** : Template + Sync
- ✅ 11 sites toujours identiques
- ✅ Modifications propagées automatiquement
- ✅ Cohérence garantie (vérification MD5)
- ✅ Un seul endroit à maintenir

---

**📚 Documentation complète** : voir `/ARCHITECTURE.md`, `/scripts/README.md`

**🆘 En cas de doute** : `./scripts/validate-consistency.sh`

