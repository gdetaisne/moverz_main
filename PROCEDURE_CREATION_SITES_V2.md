# 🏗️ PROCÉDURE DE CRÉATION DE SITES V2 - Production Ready

## 📋 **PRÉREQUIS**

### Infrastructure validée
- ✅ **Apps CapRover** : Configurées et testées
- ✅ **Repositories GitHub** : Créés et configurés
- ✅ **Webhooks** : Fonctionnels
- ✅ **Domaines** : Pointant vers les apps CapRover

### Template validé
- ✅ **Assets intégrés** : favicon, manifest, images par défaut
- ✅ **Composants fonctionnels** : LocalPage, CorridorPage, Header, Footer
- ✅ **Configuration Next.js** : Optimisée pour CapRover
- ✅ **Script de génération** : Avec validation intégrée

---

## 🚀 **PROCÉDURE COMPLÈTE**

### Étape 1 : Nettoyage (si nécessaire)
```bash
# Supprimer tous les sites existants
rm -rf sites/*
rm -rf temp-repos/*

# Nettoyer les repos GitHub (optionnel)
# Via interface GitHub ou API
```

### Étape 2 : Génération des sites
```bash
cd moverz-template

# Générer tous les sites
for city in marseille lyon toulouse nice nantes strasbourg lille rennes rouen bordeaux; do
    echo "🏗️ Génération de $city..."
    node scripts/generate-site-robust-fixed.js $city
done
```

### Étape 3 : Validation des sites générés
```bash
# Tester chaque site
for city in marseille lyon toulouse nice nantes strasbourg lille rennes rouen bordeaux; do
    echo "🧪 Test de $city..."
    cd sites/$city
    
    # Test de build
    npm run build
    
    # Test des assets
    echo "Vérification des assets..."
    ls -la public/favicon.ico
    ls -la public/manifest.json
    
    cd ../..
done
```

### Étape 4 : Préparation des repos GitHub
```bash
# Créer les repos temporaires
mkdir -p temp-repos

for city in marseille lyon toulouse nice nantes strasbourg lille rennes rouen bordeaux; do
    echo "📁 Préparation du repo $city..."
    
    # Copier le site
    cp -r sites/$city temp-repos/dd-$city
    
    # Initialiser git
    cd temp-repos/dd-$city
    git init
    git add .
    git commit -m "Initial commit - Site $city généré"
    cd ../..
done
```

### Étape 5 : Push vers GitHub
```bash
# Utiliser le script de création de repos
./create-github-repos.sh

# Ou push manuel si repos existent
for city in marseille lyon toulouse nice nantes strasbourg lille rennes rouen bordeaux; do
    echo "📤 Push de $city..."
    cd temp-repos/dd-$city
    
    git remote add origin https://github.com/guillaumestehelin/dd-$city.git
    git push -u origin main
    
    cd ../..
done
```

### Étape 6 : Déploiement CapRover
```bash
# Les webhooks se déclenchent automatiquement
# Vérifier les logs dans CapRover

echo "🎯 Sites déployés automatiquement via webhooks :"
echo "  - https://devis-demenageur-marseille.fr"
echo "  - https://devis-demenageur-lyon.fr"
echo "  - https://devis-demenageur-toulouse.fr"
echo "  - https://devis-demenageur-nice.fr"
echo "  - https://devis-demenageur-nantes.fr"
echo "  - https://devis-demenageur-strasbourg.fr"
echo "  - https://devis-demenageur-lille.fr"
echo "  - https://devis-demenageur-rennes.fr"
echo "  - https://devis-demenageur-rouen.fr"
echo "  - https://bordeaux-demenageur.fr"
```

---

## 🧪 **TESTS DE VALIDATION**

### Test local (avant push)
```bash
# Pour chaque site
cd sites/[city]
npm run build
npm run start

# Tester l'accès
curl http://localhost:3000
curl http://localhost:3000/favicon.ico
curl http://localhost:3000/manifest.json

# Vérifier le design
open http://localhost:3000
```

### Test de production (après déploiement)
```bash
# Pour chaque domaine
curl https://devis-demenageur-[city].fr
curl https://devis-demenageur-[city].fr/favicon.ico
curl https://devis-demenageur-[city].fr/manifest.json

# Vérifier le design
open https://devis-demenageur-[city].fr
```

### Checklist de validation
- [ ] **Build local** : `npm run build` réussi
- [ ] **Assets statiques** : favicon, manifest accessibles
- [ ] **Design** : CSS chargé, couleurs correctes
- [ ] **Navigation** : Liens cliquables
- [ ] **Variables résolues** : Pas de `{{{{` dans le code
- [ ] **Déploiement** : Site accessible sur le domaine
- [ ] **Performance** : Temps de chargement acceptable

---

## 🔧 **CONFIGURATIONS VALIDÉES**

### captain-definition
```json
{
  "schemaVersion": 2,
  "dockerfilePath": "./Dockerfile"
}
```

### Dockerfile
```dockerfile
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./

FROM base AS deps
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . ./
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:18-alpine AS runner
RUN apk add --no-cache dumb-init && \\
    addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]
```

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
```

### package.json
```json
{
  "name": "demenageurs-[city]",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

---

## 🚨 **DÉPANNAGE**

### Problème : Build échoué
```bash
# Vérifier les erreurs
npm run build

# Solutions courantes :
# - Variables Handlebars non résolues → Vérifier le script de génération
# - Composants manquants → Vérifier la copie des _templates
# - Erreurs de syntaxe → Vérifier les fichiers générés
```

### Problème : Assets 404
```bash
# Vérifier la présence des fichiers
ls -la public/favicon.ico
ls -la public/manifest.json

# Vérifier le Dockerfile
cat Dockerfile | grep public
```

### Problème : Déploiement CapRover échoué
```bash
# Vérifier les logs CapRover
# Solutions courantes :
# - Dockerfile incorrect → Utiliser la version validée
# - next.config.js manquant → Ajouter output: 'standalone'
# - package.json incorrect → Ajouter type: "module"
```

---

## 📊 **MÉTRIQUES DE SUCCÈS**

### Objectifs de qualité
- ✅ **100% des sites** se buildent sans erreur
- ✅ **100% des sites** se déploient sur CapRover
- ✅ **100% des sites** ont leurs assets accessibles
- ✅ **100% des sites** ont un design correct
- ✅ **Temps de déploiement** < 5 minutes par site

### Monitoring
- **Build time** : < 3 minutes
- **Deploy time** : < 2 minutes  
- **Page load time** : < 2 secondes
- **Assets load time** : < 1 seconde

---

*Procédure validée le $(date) - Basée sur l'expérience Lille*

