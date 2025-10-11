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

- `moverz-template/PROCEDURE_CREATION_SITE.md` - Procédure détaillée
- `moverz-template/TEMPLATE_DONNEES.md` - Structure des données
- `moverz-template/TROUBLESHOOTING.md` - Résolution de problèmes
- `scripts/check-nextconfig.sh` - Validation des configs

## 🛠️ Scripts Utilitaires

### Validation des Configurations

```bash
# Vérifier tous les sites
./scripts/check-nextconfig.sh
```

**Sortie attendue :**
```
✅ Tous les sites sont cohérents
```

Si un site a un problème, le script affichera :
```
❌ lille: type:module mais utilise .cjs ou .js → DOIT être .mjs
```

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

---

**Version :** 3.0 (Standardisé - Octobre 2025)  
**Dernière mise à jour :** 11 Octobre 2025
