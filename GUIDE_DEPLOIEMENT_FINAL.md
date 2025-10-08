# 🚀 Guide de Déploiement Final

## 📋 Prérequis

✅ **Vérifications effectuées :**
- Tous les sites ont des partenaires locaux corrects
- Toutes les zones desservies sont correctes
- Tous les fichiers CapRover sont présents (Dockerfile, captain-definition, next.config.js)

## 🎯 Sites à Déployer

| Ville | Repo GitHub | App CapRover | Domaine |
|-------|-------------|--------------|---------|
| Strasbourg | dd-strasbourg | dd-strasbourg | devis-demenageur-strasbourg.fr |
| Rouen | dd-rouen | dd-rouen | devis-demenageur-rouen.fr |
| Lyon | dd-lyon | dd-lyon | devis-demenageur-lyon.fr |
| Marseille | dd-marseille | dd-marseille | devis-demenageur-marseille.fr |
| Toulouse | dd-toulouse | dd-toulouse | devis-demenageur-toulouse.fr |
| Nice | dd-nice | dd-nice | devis-demenageur-nice.fr |
| Nantes | dd-nantes | dd-nantes | devis-demenageur-nantes.fr |
| Lille | dd-lille | dd-lille | devis-demenageur-lille.fr |
| Rennes | dd-rennes | dd-rennes | devis-demenageur-rennes.fr |

## 🚀 Procédure de Déploiement

### Étape 1 : Export du Token GitHub

```bash
export GITHUB_TOKEN='your_github_token_here'
```

### Étape 2 : Lancer le Déploiement

```bash
cd /Users/guillaumestehelin/moverz_main
./deploy-all-sites.sh
```

### Étape 3 : Surveiller les Builds CapRover

- Aller sur votre dashboard CapRover
- Surveiller les builds de chaque app
- Attendre 2-3 minutes par site pour le build

### Étape 4 : Vérifier les Déploiements

Une fois les builds terminés, vérifier chaque site :

```bash
# Strasbourg
curl -I https://devis-demenageur-strasbourg.fr

# Rouen
curl -I https://devis-demenageur-rouen.fr

# Lyon
curl -I https://devis-demenageur-lyon.fr

# Marseille
curl -I https://devis-demenageur-marseille.fr

# Toulouse
curl -I https://devis-demenageur-toulouse.fr

# Nice
curl -I https://devis-demenageur-nice.fr

# Nantes
curl -I https://devis-demenageur-nantes.fr

# Lille
curl -I https://devis-demenageur-lille.fr

# Rennes
curl -I https://devis-demenageur-rennes.fr
```

## 🔧 Configuration CapRover

### Apps créées sur CapRover

Assurez-vous que toutes les apps suivantes sont créées sur CapRover :

- ✅ dd-strasbourg
- ✅ dd-rouen
- ✅ dd-lyon
- ✅ dd-marseille
- ✅ dd-toulouse
- ✅ dd-nice
- ✅ dd-nantes
- ✅ dd-lille
- ✅ dd-rennes

### Webhooks GitHub

Chaque repo doit avoir un webhook pointant vers :
```
https://captain.your-server.com/api/v2/user/apps/webhooks/triggerbuild?namespace=captain&token=YOUR_TOKEN
```

## 🎯 Points de Validation

Pour chaque site, vérifier :

### 1. Design & Layout
- ✅ Header avec logo et navigation
- ✅ Footer avec liens corrects
- ✅ Couleurs et styles Tailwind appliqués

### 2. Contenu Local
- ✅ Zones desservies = quartiers de la ville
- ✅ Partenaires = déménageurs locaux
- ✅ Textes adaptés (terrain strasbourgeois, rouennais, etc.)

### 3. Pages Fonctionnelles
- ✅ Page d'accueil
- ✅ Page partenaires
- ✅ Pages quartiers
- ✅ Page services
- ✅ Page contact

## 🐛 Dépannage

### Problème : Build CapRover échoue

```bash
# Vérifier les logs CapRover
# Aller dans Apps > [nom-app] > Deployment > View Logs

# Problèmes courants :
# - Erreur de build Node.js → Vérifier package.json
# - Erreur PostCSS → Vérifier postcss.config.js
# - Erreur Tailwind → Vérifier tailwind.config.ts
```

### Problème : Site ne se charge pas

```bash
# Vérifier que l'app est bien démarrée
# Aller dans Apps > [nom-app] > Ensure that your app is running

# Vérifier les logs runtime
# Apps > [nom-app] > App Logs
```

### Problème : Design cassé

```bash
# Vérifier que globals.css est bien importé
# Vérifier que Tailwind est bien configuré
# Vérifier les imports dans layout.tsx
```

## 📊 Suivi Post-Déploiement

### Checklist pour chaque site :

- [ ] Site accessible via le domaine
- [ ] Header visible avec navigation
- [ ] Footer visible avec liens
- [ ] Page partenaires affiche des partenaires locaux
- [ ] Dropdown "Zones desservies" affiche les bons quartiers
- [ ] Pages quartiers accessibles et avec contenu local
- [ ] Images chargées correctement
- [ ] Pas d'erreurs dans la console navigateur

## 🎉 Validation Finale

Une fois tous les sites déployés et vérifiés :

1. Tester chaque site manuellement
2. Vérifier les dropdowns de zones desservies
3. Vérifier la page partenaires
4. Vérifier une page quartier
5. Vérifier le design global

Si tout est OK → 🚀 **DÉPLOIEMENT RÉUSSI !**


