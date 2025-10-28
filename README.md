# 🏗️ Moverz Multi-Sites - Système de Génération

Système de génération automatique de sites de déménagement par ville.

## 📁 Structure

```
moverz_main/
├── moverz-template/        # Template Next.js + scripts de génération
│   ├── src/                # Code source du template
│   ├── data/               # Fichiers de données par ville (JSON)
│   ├── scripts/            # Scripts de génération
│   └── package.json        # Dépendances
├── sites/                  # Sites générés
│   ├── bordeaux/           # Site Bordeaux (Next.js)
│   ├── lille/              # Site Lille (Next.js)
│   ├── strasbourg/         # Site Strasbourg (Next.js)
│   └── [autres villes]/    # Autres sites
└── scripts/                # Scripts utilitaires monorepo
    └── check-nextconfig.sh # Validation des configs Next.js
```

## 🚀 Lancer un Site en Dev

### ⚠️ IMPORTANT : Vérification Avant Lancement

**Toujours vérifier la cohérence des configs avant de lancer un site :**

```bash
./scripts/check-nextconfig.sh
```

Ce script vérifie que :
- Les sites avec `"type": "module"` dans `package.json` utilisent bien `next.config.mjs`
- Les autres sites utilisent `next.config.js` ou `next.config.cjs`

### Lancer un Site

```bash
cd sites/strasbourg   # ou n'importe quel site
npm install           # si node_modules n'existe pas
npm run dev           # défaut: port 3000
npm run dev -- -p 4000   # port spécifique
```

**Exemples :**
```bash
# Strasbourg sur port 4000
cd sites/strasbourg && npm run dev -- -p 4000

# Lille sur port 4001
cd sites/lille && npm run dev -- -p 4001
```

## 🎯 Sites Existants

| Ville | Status | Config | Notes |
|-------|--------|--------|-------|
| **Bordeaux** | ✅ Complet | next.config.js | Pas de type:module |
| **Lille** | ✅ Complet | next.config.mjs | ✅ Standardisé |
| **Lyon** | ✅ Complet | next.config.mjs | ✅ Standardisé |
| **Marseille** | ✅ Complet | next.config.mjs | ✅ Standardisé |
| **Montpellier** | ✅ Complet | next.config.mjs | ✅ Standardisé |
| **Nantes** | ✅ Complet | next.config.mjs | ✅ Standardisé |
| **Nice** | ✅ Complet | next.config.mjs | ✅ Standardisé |
| **Rennes** | ✅ Complet | next.config.mjs | ✅ Standardisé |
| **Rouen** | ✅ Complet | next.config.mjs | ✅ Standardisé |
| **Strasbourg** | ✅ Complet | next.config.mjs | ✅ Standardisé |
| **Toulouse** | ✅ Complet | next.config.mjs | ✅ Standardisé |

## 🔧 Technologies

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **Handlebars** - Templating pour génération
- **Zod** - Validation des données

## 📚 Documentation

- **`ARCHITECTURE.md`** - ⭐ **Architecture complète multi-sites (LIRE EN PREMIER)**
- **`scripts/README.md`** - ⭐ **Guide complet des scripts de synchronisation**
- `DEPLOY.md` - Guide de déploiement rapide
- `BUILD.md` - Résolution problèmes de build
- `TROUBLESHOOTING.md` - Dépannage général
- `CONTEXT.md` - Contexte pour AI/développeurs
- `SITES.md` - État et URLs des 11 sites

## 🛠️ Scripts de Synchronisation

### 1. Synchroniser Composants UX
```bash
# Propage les modifications de /components/ vers les 11 sites
./scripts/sync-components.sh

# Synchronise : Hero, HowItWorks, StickyCTA, globals.css, etc.
# Vérification MD5 automatique
```

### 2. Synchroniser Configs Techniques
```bash
# Propage les modifications de .templates/ vers les 11 sites
./scripts/sync-config-files.sh

# Synchronise : tsconfig.json, Dockerfile, .eslintrc.json
```

### 3. Déployer Tous les Sites
```bash
# Push vers les 11 repos GitHub + déclenche rebuilds CapRover
./scripts/push-all-sites-to-github.sh
```

**Voir `scripts/README.md` pour la documentation complète.**

## 🐛 Troubleshooting

### Erreur : "module is not defined in ES module scope"

**Cause :** Le fichier `next.config.js` ou `next.config.cjs` est utilisé avec `"type": "module"` dans `package.json`.

**Solution :**
```bash
cd sites/[ville]
mv next.config.cjs next.config.mjs
sed -i '' 's/module\.exports/export default/' next.config.mjs
```

### Erreur : "Invalid src prop ... hostname not configured"

**Cause :** Configuration images manquante ou incorrecte dans `next.config.mjs`.

**Solution :** Vérifier que `next.config.mjs` contient :
```javascript
images: {
  remotePatterns: [{
    protocol: 'https',
    hostname: 'images.unsplash.com',
    pathname: '/**',
  }],
  formats: ['image/avif', 'image/webp'],
}
```

### Le serveur ne démarre pas

1. Supprimer les caches :
```bash
cd sites/[ville]
rm -rf .next node_modules/.cache
```

2. Vérifier la config :
```bash
./scripts/check-nextconfig.sh
```

3. Relancer :
```bash
npm run dev
```

## 🚀 Déploiement vers Production

Voir **`ARCHITECTURE.md`** pour la procédure complète de déploiement.

**Résumé rapide :**
```bash
# 1. Commit monorepo
git add . && git commit -m "feat: ..." && git push origin main

# 2. Push vers dépôts individuels
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  cd "sites/$city"
  git add . && git commit -m "feat: ..." && git push origin main
  cd ../..
done

# 3. CapRover rebuild automatique (~10 min par site)
```

---

**Version :** 4.0 (Multi-sites avec déploiement CapRover)  
**Dernière mise à jour :** 28 Octobre 2025
