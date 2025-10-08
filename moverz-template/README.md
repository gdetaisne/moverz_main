# Moverz Template

Template de base pour la génération de sites de déménagement multi-villes.

## 🚀 Démarrage rapide

### 1. Lancer le template
```bash
npm run dev
```
Le template sera disponible sur `http://localhost:4002`

### 2. Générer un nouveau site
```bash
# Générer un site pour une ville
node scripts/generate-site-handlebars.js <city-slug>

# Exemple
node scripts/generate-site-handlebars.js bordeaux
```

### 3. Tester le template
```bash
node scripts/test-template.js
```

## 📁 Structure

```
moverz-template/
├── src/
│   ├── app/                 # Pages Next.js
│   ├── components/          # Composants React
│   └── lib/                 # Utilitaires
├── data/                    # Données des villes (JSON)
├── scripts/                 # Scripts de génération
└── public/                  # Assets statiques
```

## 🔧 Configuration

- **Next.js 14.2.33** - Framework React
- **Tailwind CSS** - Styling
- **TypeScript** - Typage
- **Handlebars** - Templating pour la génération

## 📝 Utilisation

1. **Template** : Version simplifiée pour démonstration
2. **Génération** : Scripts qui créent des sites complets
3. **Données** : Fichiers JSON avec les données de chaque ville

## 🌐 Sites générés

Les sites générés sont disponibles dans le dossier `../sites/` :
- `bordeaux` : http://localhost:4000
- `toulouse` : http://localhost:4001
- etc.

## ⚠️ Notes importantes

- Le template ne contient **PAS** de variables Handlebars
- Les variables Handlebars sont uniquement dans les scripts de génération
- Chaque site généré est un projet Next.js indépendant
- Les données doivent être **RÉELLES** et **PRÉCISES**