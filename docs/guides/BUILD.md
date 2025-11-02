# 🏗️ Guide de Build Multi-Sites

**Garantir des builds CapRover homogènes et fiables**  
**Dernière mise à jour** : 28 Octobre 2025

---

## 🎯 Problème Résolu

### Symptôme Initial
```
Error: error TS5083: Cannot read file '/tsconfig.json'.
Build has failed!
```

### Cause Racine
**Fichiers de configuration incohérents entre les sites**

- 11 `tsconfig.json` différents
- 11 `Dockerfile` différents  
- Certains sites avec `"extends": "../../tsconfig.json"` (path invalide dans Docker)
- Timestamps dynamiques dans Dockerfile causant des MD5 différents

### Impact
- **Toulouse** : ✅ Build OK
- **Nantes** : ❌ Build fail (tsconfig avec extends invalide)
- **Autres sites** : ⚠️ Risque aléatoire selon config

---

## ✅ Solution Implémentée

### Architecture

```
moverz_main-8/
├── .templates/              # Source de vérité unique
│   ├── tsconfig.json       # Config TypeScript canonique
│   ├── Dockerfile.template # Dockerfile avec {{CITY}} placeholder
│   ├── .dockerignore       # Exclusions Docker
│   └── .eslintrc.json      # Règles ESLint
│
├── sites/
│   ├── marseille/
│   │   ├── tsconfig.json   # Copie depuis .templates/
│   │   ├── Dockerfile      # Généré depuis template
│   │   ├── .dockerignore   # Copie depuis .templates/
│   │   └── .eslintrc.json  # Copie depuis .templates/
│   ├── toulouse/
│   └── ...
│
└── scripts/
    └── sync-config-files.sh # Script de synchronisation
```

### Fichiers Canoniques

#### 1. tsconfig.json
**Caractéristiques** :
- ✅ Autonome (pas de `extends`)
- ✅ Chemins relatifs uniquement (`baseUrl: "."`)
- ✅ Plugins Next.js
- ✅ Strict mode

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "preserve",
    "strict": true,
    "noEmit": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "plugins": [{ "name": "next" }],
    "allowJs": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "**/*.mdx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

#### 2. Dockerfile
**Caractéristiques** :
- ✅ Multi-stage build (base → deps → builder → runner)
- ✅ Node 20 Alpine
- ✅ Sécurité : user `nextjs` non-root
- ✅ dumb-init pour process management
- ✅ Copie du dossier `content/` (blog)

**Structure** :
```dockerfile
FROM node:20-alpine AS base
# → Install dependencies

FROM base AS deps
# → npm install

FROM base AS builder
# → npm run build

FROM node:20-alpine AS runner
# → Production runtime
```

#### 3. .dockerignore
**Exclusions** :
```
node_modules
.next/cache
.git
.env*
.DS_Store
**/*.mdx           # Ignore sources MDX (compilé dans build)
content/           # Sera copié depuis builder
scripts/
dev.log
README.md
```

#### 4. .eslintrc.json
**Règles** :
```json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": [{
          "group": ["**/sites/*/", "../*/sites/*"],
          "message": "❌ Imports cross-ville interdits"
        }]
      }
    ]
  }
}
```

---

## 🔄 Workflow de Synchronisation

### Automatique (Recommandé)

```bash
# Synchronise .templates/ → sites/*/
./scripts/sync-config-files.sh
```

**Sortie** :
```
🔄 SYNC CONFIG FILES - Moverz Multi-Sites
========================================

📋 Synchronisation des fichiers...

⏳ tsconfig.json...
✅ tsconfig.json synchronisé
⏳ Dockerfile...
✅ Dockerfile synchronisé
⏳ .dockerignore...
✅ .dockerignore synchronisé
⏳ .eslintrc.json...
✅ .eslintrc.json synchronisé

🔍 Vérification de l'homogénéité...

📄 tsconfig.json:
  11 <hash identique>

📄 Dockerfile (hors header):
  11 <hash identique>

✅ Synchronisation terminée!
```

### Manuel (Modification de .templates/)

```bash
# 1. Modifier le template
vi .templates/tsconfig.json

# 2. Synchroniser vers tous les sites
./scripts/sync-config-files.sh

# 3. Tester un build local
cd sites/marseille && npm run build

# 4. Commit et push
git add .templates/ sites/*/tsconfig.json sites/*/Dockerfile
git commit -m "fix: update tsconfig canonical"
git push origin main

# 5. Déployer vers CapRover
./scripts/push-all-sites-to-github.sh
```

---

## 🧪 Validation du Build

### Test Local Complet

```bash
#!/bin/bash
# test-all-builds.sh

for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  echo "🏗️  Testing $city..."
  cd "sites/$city"
  
  # Clean
  rm -rf .next node_modules
  
  # Install
  npm install > /dev/null 2>&1
  
  # Build
  if npm run build > build.log 2>&1; then
    echo "   ✅ Build success"
  else
    echo "   ❌ Build failed"
    tail -20 build.log
    exit 1
  fi
  
  cd ../..
done

echo "✅ All builds successful!"
```

### Test CapRover Sans Commit

```bash
# Utiliser docker build en local pour tester Dockerfile
cd sites/nantes
docker build -t test-nantes .

# Si succès, le build CapRover fonctionnera
```

### Checklist Pré-Déploiement

- [ ] `./scripts/sync-config-files.sh` exécuté
- [ ] Vérification : tous les MD5 identiques
- [ ] Test build local : `cd sites/nantes && npm run build`
- [ ] Test Docker local (optionnel) : `docker build .`
- [ ] Commit monorepo
- [ ] Push sites individuels : `./scripts/push-all-sites-to-github.sh`
- [ ] Surveiller logs CapRover : https://caprover.moverz.io

---

## 🚨 Erreurs Courantes

### Erreur 1 : `Cannot read file '/tsconfig.json'`

**Cause** : tsconfig.json avec `"extends": "../../tsconfig.json"`

**Solution** :
```bash
./scripts/sync-config-files.sh
```

### Erreur 2 : `Module not found: Can't resolve '@/components/...'`

**Cause** : `paths` incorrect dans tsconfig.json

**Solution** :
Vérifier que tsconfig.json contient :
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Erreur 3 : Build réussit en local mais échoue sur CapRover

**Cause** : Différences environnement (Node version, .dockerignore)

**Solution** :
```bash
# Tester avec Docker en local
cd sites/<ville>
docker build -t test .

# Vérifier Node version
grep "FROM node" Dockerfile
# Doit être: FROM node:20-alpine
```

### Erreur 4 : `npm ERR! missing script: build`

**Cause** : package.json manquant ou incorrect

**Solution** :
```bash
# Vérifier package.json
cat sites/<ville>/package.json | grep '"build"'

# Doit contenir:
# "scripts": {
#   "build": "next build",
#   ...
# }
```

---

## 📊 Monitoring des Builds

### CapRover Dashboard

1. **Accéder** : https://caprover.moverz.io
2. **Apps** → `dd-<ville>`
3. **Deployment** → View Logs
4. **Chercher** :
   - `✓ Compiled successfully` → Build OK
   - `Error:` → Build failed
   - `npm ERR!` → Dépendance manquante

### Logs en Direct

```bash
# Via API CapRover (nécessite token)
curl -H "x-captain-auth: $CAPROVER_TOKEN" \
  https://caprover.moverz.io/api/v2/user/apps/logs/dd-nantes
```

### Temps de Build Typiques

| Étape | Durée |
|-------|-------|
| Install dependencies | 60-90s |
| Build Next.js | 90-120s |
| Create image | 20-30s |
| Deploy | 10-15s |
| **Total** | **~3-5 min** |

---

## 🔧 Maintenance

### Mise à Jour Node Version

```bash
# 1. Modifier le template
vi .templates/Dockerfile.template
# FROM node:20-alpine → FROM node:22-alpine (2 occurrences)

# 2. Sync
./scripts/sync-config-files.sh

# 3. Test
cd sites/marseille && docker build .

# 4. Deploy
./scripts/push-all-sites-to-github.sh
```

### Ajout d'une Nouvelle Règle ESLint

```bash
# 1. Modifier
vi .templates/.eslintrc.json

# 2. Sync
./scripts/sync-config-files.sh

# 3. Test
cd sites/marseille && npm run lint

# 4. Commit
git add .templates/.eslintrc.json sites/*/.eslintrc.json
git commit -m "feat(lint): add new rule"
```

### Ajout d'un Nouveau Site

```bash
# 1. Copier structure
cp -r sites/marseille sites/nouvelleville

# 2. Sync configs
./scripts/sync-config-files.sh

# 3. Adapter package.json, layout.tsx, etc.
# (voir SITES.md section "Ajouter une Nouvelle Ville")
```

---

## 📚 Ressources

- **SITES.md** : Liste des sites + configs spécifiques
- **CONTEXT.md** : Règles de développement
- **TROUBLESHOOTING.md** : Problèmes courants
- **DECISIONS.md** : Pourquoi ces choix techniques

---

## ✅ Critères de Succès

Un build est considéré comme **réussi** si :

1. ✅ Compile sans erreurs TypeScript
2. ✅ Build Next.js termine (`✓ Compiled successfully`)
3. ✅ Image Docker créée (<200MB)
4. ✅ Container démarre sur port 3000
5. ✅ Health check répond (`curl http://localhost:3000`)
6. ✅ Site accessible en production après déploiement

---

**💡 Règle d'Or** : Si un site build et pas un autre → problème de config. Lancer `./scripts/sync-config-files.sh` en premier réflexe !

