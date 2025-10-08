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
└── sites/                  # Sites générés
    ├── bordeaux/           # Site Bordeaux (Next.js)
    ├── thaire-daunis/      # Site Thaire-Daunis (Next.js)
    └── [futures villes]/   # Prochains sites
```

## 🚀 Créer un Nouveau Site

### 1️⃣ Préparer les Données

Créer un fichier `moverz-template/data/[ville].json` avec les données réelles :

```bash
cd moverz-template
./create-site.sh "Ville" "https://www.ville-demenageur.fr"
```

Puis éditer `data/ville.json` avec :
- Informations de la ville (nom, région, codes postaux)
- Quartiers principaux (noms, contraintes, prix)
- Destinations populaires
- Partenaires locaux
- Témoignages

**Voir `data/bordeaux.json` comme exemple de référence.**

### 2️⃣ Générer le Site

```bash
cd moverz-template
node scripts/generate-site.js ville
```

Le site sera créé dans `sites/ville/`

### 3️⃣ Tester le Site

```bash
cd ../sites/ville
npm install
npm run dev
```

Site disponible sur `http://localhost:3000`

### 4️⃣ Builder pour Production

```bash
npm run build
npm run start
```

## 📋 Checklist de Création

- [ ] Données réelles collectées (Wikipedia, site officiel de la ville)
- [ ] Fichier JSON créé avec toutes les informations
- [ ] Site généré sans erreurs
- [ ] Test en développement OK
- [ ] Contenu vérifié (pas de données factices)
- [ ] Build de production réussi
- [ ] Prêt pour déploiement

## 🎯 Sites Existants

| Ville | Status | URL Dev | Notes |
|-------|--------|---------|-------|
| **Bordeaux** | ✅ Complet | localhost:3000 | Site de référence |
| **Thaire-Daunis** | ✅ Complet | localhost:3000 | Site village |

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

## 🎯 Prochaines Villes

Sites à créer :
- [ ] Lyon
- [ ] Marseille
- [ ] Toulouse
- [ ] Nice
- [ ] Nantes
- [ ] Strasbourg
- [ ] Montpellier
- [ ] Lille
- [ ] Rennes

---

**Version :** 2.0 (Nettoyé et optimisé)  
**Dernière mise à jour :** 8 Octobre 2025


