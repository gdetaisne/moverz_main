# 🔧 Guide de Dépannage

**Pour : Développeurs, DevOps, Support**  
**Projet** : Moverz Multi-Sites  
**Dernière mise à jour** : 28 Octobre 2025

---

## 🚨 Problèmes Fréquents

### 0. Build échoue sur CapRover (tsconfig.json introuvable)

#### Symptômes
```
Error: error TS5083: Cannot read file '/tsconfig.json'.
Build has failed!
```

#### Cause
**Fichiers de configuration incohérents entre les sites**
- tsconfig.json avec `"extends": "../../tsconfig.json"` (invalide dans Docker)
- Dockerfile différents entre sites
- Configs désynchronisées

#### Solution

**A. Synchroniser les configs (SOLUTION RAPIDE)**
```bash
# Depuis la racine du monorepo
./scripts/sync-config-files.sh

# Vérifier
cd sites/nantes && npm run build

# Si OK, push vers CapRover
cd ../..
./scripts/push-all-sites-to-github.sh
```

**B. Vérifier manuellement**
```bash
# Vérifier tsconfig.json n'a pas de "extends"
grep "extends" sites/nantes/tsconfig.json
# → Ne doit rien retourner

# Vérifier MD5 des configs
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  hash=$(md5 -q "sites/$city/tsconfig.json")
  echo "$city: $hash"
done | uniq -c
# → Doit afficher "11 <même hash>"
```

**C. Guide complet : BUILD.md**

**Prévention** :
- ⚠️ Ne JAMAIS modifier tsconfig.json d'un site individuellement
- ✅ Modifier `.templates/tsconfig.json` puis sync
- ✅ Exécuter `./scripts/sync-config-files.sh` après chaque modif

---

### 1. Le site ne démarre pas en local

#### Symptômes
```bash
$ npm run dev
Error: Cannot find module 'next'
```

#### Causes possibles
- Dépendances non installées
- Mauvais répertoire de travail
- Version Node incompatible

#### Solutions

**A. Vérifier et installer les dépendances**
```bash
cd sites/<ville>
rm -rf node_modules package-lock.json
npm install
npm run dev -- -p 302X
```

**B. Vérifier la version Node**
```bash
node -v
# Doit afficher v24.x.x

# Si différent, utiliser nvm
nvm use 24
# ou
nvm install 24
nvm use 24
```

**C. Vérifier le répertoire**
```bash
pwd
# Doit afficher : /Users/.../moverz_main-8/sites/<ville>

ls -la
# Doit contenir : package.json, app/, components/, public/
```

---

### 2. Blog vide (aucun article affiché)

#### Symptômes
- `/blog` affiche "Aucun article trouvé"
- Liste vide en dev

#### Causes
- Contenu blog au mauvais endroit
- `SITE_SLUG` incorrect
- Frontmatter invalide

#### Solutions

**A. Vérifier l'emplacement du contenu**
```bash
# Le contenu DOIT être dans content/<ville>/blog/
ls content/<ville>/blog/

# Si vide, copier depuis sites/<ville>/content/blog/
cp -r sites/<ville>/content/blog/* content/<ville>/blog/
```

**B. Vérifier SITE_SLUG**
```bash
# Dans .env.local
grep SITE_SLUG sites/<ville>/.env.local

# Doit correspondre au nom du dossier
# Exemple : SITE_SLUG=marseille pour sites/marseille/
```

**C. Vérifier le frontmatter des articles**
```markdown
---
title: "Titre Article"           # ✅ Obligatoire
description: "Description"       # ✅ Obligatoire
date: "2025-10-28"               # ✅ Obligatoire (format YYYY-MM-DD)
category: "demenagement"         # ✅ Obligatoire
author: "Équipe Moverz"          # ⚠️ Optionnel
---
```

**D. Logs de debug**
```typescript
// Ajouter temporairement dans lib/blog.ts
console.log('🔍 SITE_SLUG:', currentSlug)
console.log('🔍 Blog path:', blogPath)
console.log('🔍 Articles found:', posts.length)
```

---

### 3. Images cassées en production

#### Symptômes
- Images Unsplash ne s'affichent pas
- Console : `Failed to load resource: 400`
- Placeholder gris

#### Cause
Next.js Image Optimizer bloqué par Unsplash

#### Solution

**Vérifier `next.config.mjs`**
```javascript
// DOIT contenir :
images: {
  unoptimized: true,  // ✅ OBLIGATOIRE
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      pathname: '/**',
    }
  ],
}
```

**Si déjà présent et toujours cassé :**
```bash
# Rebuild complet
npm run build
# Vérifier les logs pour erreurs
```

---

### 4. Erreur 500 après modification

#### Symptômes
```
Application error: a server-side exception has occurred
```

#### Causes fréquentes
- Import cross-ville
- Chemin invalide
- Variable env manquante

#### Solutions

**A. Vérifier les imports**
```typescript
// ❌ INTERDIT
import { Hero } from '../../marseille/components/Hero'

// ✅ CORRECT
import { Hero } from '@/components/Hero'
```

**B. Vérifier les chemins de fichiers**
```bash
# Tester l'existence
ls -la sites/<ville>/components/Hero.tsx

# Vérifier tsconfig.json paths
cat sites/<ville>/tsconfig.json | grep "@/*"
```

**C. Vérifier les variables d'env**
```bash
# Lister toutes les vars
cat sites/<ville>/.env.local

# Vérifier les obligatoires
grep -E "(SITE_SLUG|SITE_URL|DATABASE_URL)" .env.local
```

**D. Consulter les logs détaillés**
```bash
# En dev
npm run dev
# → Affiche la stack trace complète dans le terminal

# En prod (CapRover)
# Se connecter au dashboard → Logs
```

---

### 5. Build échoue sur CapRover

#### Symptômes
- Webhook GitHub déclenché
- Build fail dans CapRover
- Site inaccessible

#### Causes
- Erreur lint non détectée en local
- Variable env manquante en prod
- Dépendance manquante dans package.json

#### Solutions

**A. Reproduire le build en local**
```bash
cd sites/<ville>

# Nettoyer
rm -rf .next node_modules

# Reinstall + build
npm install
npm run build

# Si erreur, corriger avant de push
```

**B. Vérifier les logs CapRover**
```
1. Se connecter à https://caprover.moverz.io
2. Apps → dd-<ville>
3. Deployment → View Logs
4. Chercher "ERROR" ou "FAILED"
```

**C. Vérifier les variables d'env CapRover**
```
1. Dashboard CapRover
2. Apps → dd-<ville>
3. App Configs → Environment Variables
4. Vérifier SITE_SLUG, SITE_URL, DATABASE_URL...
```

**D. Forcer un rebuild**
```bash
# Commit vide pour déclencher webhook
cd sites/<ville>
git commit --allow-empty -m "chore: force rebuild"
git push origin main
```

---

### 6. Canonical URL / robots.txt incohérents

#### Symptômes
- Google Search Console avertissements
- Canonical pointe vers www. mais site sans www.

#### Solution

**Vérifier la cohérence**
```bash
# 1. Dans app/layout.tsx
grep metadataBase sites/<ville>/app/layout.tsx
# → metadataBase: new URL("https://devis-demenageur-<ville>.fr")

# 2. Dans public/robots.txt
grep Host sites/<ville>/public/robots.txt
# → Host: https://devis-demenageur-<ville>.fr

# ⚠️ DOIVENT être identiques (sans www.)
```

**Correction automatique**
```bash
# Supprimer www. de robots.txt
sed -i '' 's|https://www\.|https://|g' sites/<ville>/public/robots.txt
```

---

### 7. Témoignages affichent mauvais quartiers

#### Symptômes
- Site Toulouse affiche "Vieux-Port" (Marseille)
- Incohérence géographique

#### Cause
Copie d'un autre site sans adaptation

#### Solution

```typescript
// sites/<ville>/components/Testimonials.tsx

// Référence des quartiers par ville : voir SITES.md

// Exemple Toulouse :
const testimonials = [
  {
    name: "Marie D.",
    location: "Capitole",        // ✅ Quartier Toulouse
    text: "..."
  },
  {
    name: "Jean M.",
    location: "Saint-Cyprien",   // ✅ Quartier Toulouse
    text: "..."
  }
]

// ❌ NE PAS mettre : Vieux-Port, Panier (Marseille)
```

---

### 8. Push-all-sites-to-github.sh échoue

#### Symptômes
```bash
$ ./scripts/push-all-sites-to-github.sh
Pas de repo Git configuré
```

#### Causes
- Pas dans un repo Git
- Remote origin manquant

#### Solutions

**A. Vérifier l'état des repos**
```bash
for city in marseille toulouse lyon bordeaux nantes; do
  echo "=== $city ==="
  cd sites/$city
  git remote -v
  cd ../..
done
```

**B. Réinitialiser un repo manquant**
```bash
cd sites/<ville>

# Si pas de .git/
git init
git remote add origin https://github.com/gdetaisne/dd-<ville>.git

# Premier push
git add .
git commit -m "feat: sync depuis monorepo"
git push -u origin main
```

**C. Push manuel si script échoue**
```bash
# Pour chaque site
cd sites/<ville>
git add .
git commit -m "fix: description"
git push origin main
cd ../..
```

---

### 9. Conflit de merge sur lib/blog.ts

#### Symptômes
```bash
<<<<<<< HEAD
// Version locale
=======
// Version remote
>>>>>>> commit-hash
```

#### Solution

**Toujours garder la version multi-tenant**
```typescript
// ✅ Version correcte (tenant-aware)
import { env } from '@/lib/env-validation'

const currentSlug = env.SITE_SLUG || 'marseille'
const blogPath = path.join(process.cwd(), '../../content', currentSlug, 'blog')

// ❌ Ancienne version (centralisée)
const blogPath = path.join(process.cwd(), 'content/blog')
```

**Résoudre le conflit**
```bash
# Accepter notre version (--ours)
git checkout --ours lib/blog.ts
git add lib/blog.ts
git commit -m "fix: keep multi-tenant blog logic"
```

---

### 10. Port déjà utilisé

#### Symptômes
```bash
Error: listen EADDRINUSE: address already in use :::3020
```

#### Solution

**A. Identifier le processus**
```bash
lsof -ti:3020
# Affiche le PID
```

**B. Tuer le processus**
```bash
kill -9 $(lsof -ti:3020)
```

**C. Relancer**
```bash
npm run dev -- -p 3020
```

**D. Utiliser un autre port**
```bash
# Voir SITES.md pour les ports assignés
npm run dev -- -p 3099  # Port libre
```

---

## 🔍 Commandes de Diagnostic

### Santé globale des sites

```bash
#!/bin/bash
# health-check.sh

for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "🔍 $city"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  
  # Repo GitHub
  cd "sites/$city"
  echo "📦 Git remote:"
  git remote -v | head -1
  
  # Contenu blog
  blog_count=$(find "../../content/$city/blog" -name "*.md" 2>/dev/null | wc -l | xargs)
  echo "📝 Articles: $blog_count"
  
  # .env.local
  if [ -f ".env.local" ]; then
    slug=$(grep SITE_SLUG .env.local | cut -d'=' -f2)
    url=$(grep SITE_URL .env.local | cut -d'=' -f2)
    echo "🔧 SITE_SLUG: $slug"
    echo "🌐 SITE_URL: $url"
  else
    echo "⚠️  .env.local manquant"
  fi
  
  # robots.txt
  if [ -f "public/robots.txt" ]; then
    host=$(grep "Host:" public/robots.txt | awk '{print $2}')
    echo "🤖 robots.txt Host: $host"
  fi
  
  cd ../..
  echo ""
done
```

### Vérifier cohérence canonical

```bash
#!/bin/bash
# check-canonical.sh

for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  cd "sites/$city"
  
  # Extraire metadataBase
  metadata=$(grep -A1 "metadataBase" app/layout.tsx | grep "URL" | sed 's/.*"\(.*\)".*/\1/')
  
  # Extraire Host robots.txt
  robots_host=$(grep "Host:" public/robots.txt | awk '{print $2}')
  
  if [ "$metadata" != "$robots_host" ]; then
    echo "❌ $city : INCOHÉRENT"
    echo "   Layout : $metadata"
    echo "   Robots : $robots_host"
  else
    echo "✅ $city : OK ($metadata)"
  fi
  
  cd ../..
done
```

### Test de build rapide

```bash
#!/bin/bash
# quick-build-test.sh

cd sites/$1
echo "🏗️  Building $1..."
npm run build 2>&1 | tee build.log

if grep -q "Error" build.log; then
  echo "❌ Build failed"
  grep -A5 "Error" build.log
  exit 1
else
  echo "✅ Build success"
  exit 0
fi
```

---

## 📞 Support Escalation

### Niveau 1 : Self-service
1. Consulter ce fichier (TROUBLESHOOTING.md)
2. Vérifier CONTEXT.md pour règles projet
3. Consulter SITES.md pour config spécifique

### Niveau 2 : Logs & Diagnostics
1. Exécuter scripts de diagnostic ci-dessus
2. Copier logs complets (build + runtime)
3. Vérifier CapRover dashboard

### Niveau 3 : Contact Support
- **Email** : guillaume@moverz.io
- **Joindre** :
  - Message d'erreur complet
  - Résultat des commandes de diagnostic
  - Logs CapRover (si applicable)
  - Derniers commits effectués

---

## 🆘 Procédures d'Urgence

### Site en production cassé

```bash
# 1. Identifier le commit fautif
cd sites/<ville>
git log --oneline -10

# 2. Rollback au commit précédent
git revert HEAD
git push origin main
# → Déclenche automatiquement rebuild CapRover

# 3. Vérifier après ~10-15 min
curl -I https://devis-demenageur-<ville>.fr
```

### Base de données inaccessible

```bash
# 1. Vérifier connexion
psql $DATABASE_URL

# 2. Si échec, vérifier que le service tourne
# 3. Vérifier les credentials dans .env

# 4. En dernier recours, redémarrer Postgres
sudo systemctl restart postgresql
```

### Tous les sites en panne

```bash
# Cause probable : CapRover down

# 1. Vérifier le serveur CapRover
ssh user@caprover.moverz.io
sudo systemctl status caprover

# 2. Redémarrer si nécessaire
sudo systemctl restart caprover

# 3. Vérifier les logs
sudo journalctl -u caprover -f
```

---

**💡 Astuce** : Bookmark ce fichier et consultez-le AVANT de chercher ailleurs. 90% des problèmes sont déjà documentés ici !

