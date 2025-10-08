# 🚀 Démarrage Rapide - Créer un Site en 15 Minutes

## ⚡ Workflow Ultra-Rapide

### Option 1 : Ville Française Standard

```bash
# 1. Aller dans le template
cd moverz-template

# 2. Créer le fichier de données de base
./create-site.sh "Lyon" "https://www.lyon-demenageur.fr"

# 3. Éditer data/lyon.json (voir exemple bordeaux.json)
# Remplir avec les vraies données de la ville

# 4. Générer le site
node scripts/generate-site.js lyon

# 5. Tester
cd ../sites/lyon
npm install
npm run dev
```

Site disponible sur `http://localhost:3000`

---

## 📝 Données Minimales Requises

Pour générer un site fonctionnel, vous devez avoir :

### A. Informations de Base
- Nom de la ville
- Région
- Codes postaux
- Population (approximative)
- Email de contact
- Domaine web

### B. Quartiers (minimum 3-5)
- Nom du quartier
- Code postal
- Description courte
- Contraintes spécifiques

### C. Prix Indicatifs
- Studio : 350-650€
- T2 : 550-950€
- T3 : 750-1250€
- T4 : 950-1600€

*(Adapter selon la région)*

---

## 🔍 Où Trouver les Données ?

### Wikipedia
- Population
- Région
- Codes postaux
- Histoire de la ville

### Site Officiel de la Ville
- Quartiers principaux
- Zones desservies
- Contraintes urbaines

### Sites de Déménageurs Locaux
- Prix moyens par type de logement
- Contraintes spécifiques
- Zones difficiles d'accès

### Google Maps
- Noms des quartiers
- Zones piétonnes
- Accès difficiles

---

## ✅ Checklist Express

Avant de générer le site :

- [ ] `city_name` : Nom correct de la ville
- [ ] `citySlug` : En minuscule, sans accents (ex: "saint-etienne")
- [ ] `region` : Région administrative
- [ ] `contactEmail` : Format contact@ville-demenageur.fr
- [ ] `domain` : URL complète avec https://
- [ ] `quartiers` : Au moins 3 quartiers avec données réelles
- [ ] `pricing` : Prix cohérents avec la région

---

## 🐛 Problèmes Courants

### Erreur : "City data not found"
➡️ Vérifiez que `data/ville.json` existe et que le slug est correct

### Erreur : Port déjà utilisé
```bash
# Tuer le processus sur le port 3000
lsof -ti:3000 | xargs kill -9
```

### Erreur : Module not found
```bash
# Réinstaller les dépendances
cd sites/ville
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 Exemple : Créer Lyon en 10 Minutes

```bash
# 1. Setup
cd moverz-template
./create-site.sh "Lyon" "https://www.lyon-demenageur.fr"

# 2. Éditer data/lyon.json
# Copier la structure de bordeaux.json
# Remplacer avec les données de Lyon :
#   - Quartiers : Vieux Lyon, Croix-Rousse, Presqu'île, Part-Dieu
#   - Prix : Similaires à Bordeaux
#   - Contraintes : Collines, vieille ville, traboules

# 3. Générer
node scripts/generate-site.js lyon

# 4. Tester
cd ../sites/lyon && npm install && npm run dev
```

✅ Site prêt !

---

## 🎯 Prochaines Étapes

Une fois le site généré et testé :

1. **Build de production**
   ```bash
   npm run build
   npm run start
   ```

2. **Vérifier le contenu**
   - Toutes les pages fonctionnent
   - Pas de données factices
   - Images présentes

3. **Préparer le déploiement**
   - Créer un repo GitHub
   - Configurer les variables d'environnement
   - Déployer sur CapRover/Vercel

---

**Temps estimé par site : 15-30 minutes**  
*(Selon la complexité des données à collecter)*

