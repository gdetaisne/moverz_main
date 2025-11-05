# 🚀 Scripts de Déploiement - Mode d'Emploi

## 📋 Vue d'ensemble

3 scripts pour gérer le workflow de déploiement :

```bash
./scripts/deploy/push-main.sh              # Push monorepo principal
./scripts/deploy/push-all-sites.sh         # Push tous les sites (11 villes)
./scripts/deploy/push-site.sh <ville>      # Push un seul site
```

---

## 1️⃣ Push Monorepo Principal

**Usage** :
```bash
./scripts/deploy/push-main.sh
```

**Fait quoi** :
- Commit automatique si changements détectés
- Push vers `origin main` du monorepo
- Message auto : `"feat: Update [date]"`

**Quand l'utiliser** :
- Après modifs dans `.cursor/`, `lib/`, `components/`, `scripts/`
- Avant de push les sites individuels

---

## 2️⃣ Push Tous les Sites

**Usage** :
```bash
# Déploiement normal (GitHub webhook → CapRover auto)
./scripts/deploy/push-all-sites.sh

# Déploiement forcé (rebuild CapRover immédiat)
./scripts/deploy/push-all-sites.sh --force-deploy
```

**Fait quoi** :
- Init `.git` dans `sites/<ville>` si absent
- Commit + push vers `https://github.com/gdetaisne/dd-<ville>`
- Si `--force-deploy` → Trigger rebuild CapRover via API

**Quand l'utiliser** :
- Après sync multi-sites (`sync-components.sh`, `sync-config-files.sh`)
- Après modifs globales (metadata, SEO, components)
- `--force-deploy` si tu veux rebuild immédiat sans attendre webhook

**Durée** :
- Push GitHub : ~2-3 min pour 11 sites
- Déploiement CapRover : ~3-5 min par site (~45 min total)

---

## 3️⃣ Push Un Seul Site

**Usage** :
```bash
# Déploiement normal
./scripts/deploy/push-site.sh bordeaux

# Déploiement forcé
./scripts/deploy/push-site.sh bordeaux --force-deploy
```

**Fait quoi** :
- Init `.git` dans `sites/<ville>` si absent
- Commit + push vers `https://github.com/gdetaisne/dd-<ville>`
- Si `--force-deploy` → Trigger rebuild CapRover via API

**Quand l'utiliser** :
- Après modifs spécifiques à une ville
- Test rapide d'une correction
- `--force-deploy` si besoin rebuild immédiat

**Villes disponibles** :
`marseille`, `lyon`, `montpellier`, `bordeaux`, `nantes`, `lille`, `nice`, `strasbourg`, `rouen`, `rennes`, `toulouse`

---

## 🔧 Configuration CapRover (optionnel)

Pour utiliser `--force-deploy`, exporte ton token CapRover :

```bash
export CAPROVER_TOKEN="ton_token_ici"
```

**Comment obtenir le token** :
1. Va sur https://captain.moverz.fr (ou ton URL CapRover)
2. Settings → Access Token
3. Copie le token

**Sans token** : Le script push vers GitHub uniquement (webhook CapRover prendra le relai automatiquement)

---

## 📊 Workflow Complet Recommandé

### Après modifications globales (lib/, components/, etc.)

```bash
# 1. Push monorepo principal
./scripts/deploy/push-main.sh

# 2. Push tous les sites
./scripts/deploy/push-all-sites.sh

# 3. Attendre déploiement (~45 min) OU forcer rebuild immédiat
./scripts/deploy/push-all-sites.sh --force-deploy
```

### Après modification spécifique (ex: fix Bordeaux)

```bash
# 1. Push monorepo principal
./scripts/deploy/push-main.sh

# 2. Push Bordeaux seulement
./scripts/deploy/push-site.sh bordeaux --force-deploy

# 3. Vérifier en prod (~3-5 min)
# https://www.bordeaux-demenageur.fr
```

---

## ⚠️ Notes Importantes

1. **Toujours push main AVANT les sites** (pour traçabilité)
2. **Architecture monorepo** : Chaque `sites/<ville>/` a son propre `.git/` pointant vers `dd-<ville>`
3. **Force deploy** : Utilise seulement si tu veux rebuild immédiat (sinon webhook GitHub suffit)
4. **Vérification post-deploy** : Attendre 3-5 min puis vérifier site en prod

---

## 🆘 Dépannage

**Erreur "not a git repository"** :
→ Normal si premier push. Le script init automatiquement.

**Erreur "rejected"** :
→ Pull d'abord : `cd sites/<ville> && git pull --rebase origin main`

**CapRover ne rebuild pas** :
→ Vérifie webhook GitHub dans Settings du repo `dd-<ville>`
→ Ou utilise `--force-deploy`

**"CAPROVER_TOKEN non défini"** :
→ Pas grave. Push GitHub fait, CapRover prendra relai via webhook.

