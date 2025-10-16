# 📸 Guide de Téléchargement des Images Quartiers

Ce guide explique comment télécharger automatiquement les 50 images de quartiers manquantes pour les sites Moverz.

---

## 🚀 Quick Start (5 minutes)

### Étape 1 : Obtenir une clé API Unsplash (gratuit)

1. Allez sur https://unsplash.com/developers
2. Créez un compte (si pas déjà fait)
3. Cliquez sur **"New Application"**
4. Acceptez les conditions
5. Remplissez le formulaire :
   - **Application name** : `Moverz Images`
   - **Description** : `Automated image download for real estate moving platform`
6. **Copiez votre "Access Key"** (commence par `xxxxxxxxxxxxxxxxxxx`)

⚠️ **Rate limits gratuits** : 50 requêtes/heure (largement suffisant)

---

### Étape 2 : Lancer le script

```bash
# Depuis la racine du projet
cd /Users/guillaumestehelin/moverz_main

# Test dry-run (pour vérifier, ne télécharge rien)
DRY_RUN=true UNSPLASH_ACCESS_KEY=votre_clé node scripts/download-quartiers-images.cjs

# Téléchargement réel (50 images, ~2 minutes)
UNSPLASH_ACCESS_KEY=votre_clé node scripts/download-quartiers-images.cjs
```

**Ou créer un fichier `.env`** à la racine :

```bash
# Dans /Users/guillaumestehelin/moverz_main/.env
UNSPLASH_ACCESS_KEY=votre_clé_ici
```

Puis lancer simplement :

```bash
node scripts/download-quartiers-images.cjs
```

---

## 📊 Ce que fait le script

1. ✅ **Recherche** automatiquement les images par quartier sur Unsplash
2. ✅ **Télécharge** en format optimisé (1600x900px, crop automatique)
3. ✅ **Place** les images aux bons endroits :
   ```
   sites/lille/public/images/quartiers/lille/centre.jpg
   sites/lyon/public/images/quartiers/lyon/confluence.jpg
   sites/marseille/public/images/quartiers/marseille/panier.jpg
   ...
   ```
4. ✅ **Génère** les attributions requises (fichier `ATTRIBUTIONS.txt`)
5. ✅ **Skip** les images déjà présentes (relançable sans risque)
6. ✅ **Respecte** les rate limits Unsplash (délai 2s entre chaque)

---

## 📸 Images téléchargées

### Total : 50 images

| Ville | Quartiers | Statut |
|-------|-----------|--------|
| **Lille** | centre, lomme, moulins, vieux-lille, wazemmes | ⏳ À télécharger |
| **Lyon** | confluence, croix-rousse, part-dieu, presquile, vieux-lyon | ⏳ À télécharger |
| **Marseille** | endoume, joliette, panier, plaine, vieux-port | ⏳ À télécharger |
| **Montpellier** | antigone, beaux-arts, comedie, ecusson, port-marianne | ⏳ À télécharger |
| **Nantes** | beaulieu, centre-ville, dervallieres, ile-nantes, malakoff | ⏳ À télécharger |
| **Nice** | cimiez, liberation, port, promenade-anglais, vieux-nice | ⏳ À télécharger |
| **Rennes** | beaulieu, centre-ville, cleunay, thabor, villejean | ⏳ À télécharger |
| **Rouen** | centre-ville, coteaux-sud, joli-mai, saint-marc, saint-sever | ⏳ À télécharger |
| **Strasbourg** | cronenbourg, esplanade, grande-ile, hautepierre, neudorf | ⏳ À télécharger |
| **Toulouse** | capitole, carmes, compans, jean-jaures, saint-cyprien | ⏳ À télécharger |

---

## 🔧 Options avancées

### Mode Dry-Run (test sans télécharger)

```bash
DRY_RUN=true UNSPLASH_ACCESS_KEY=votre_clé node scripts/download-quartiers-images.cjs
```

Affiche les URLs trouvées et les auteurs sans télécharger.

### Télécharger une seule ville

Modifiez le script temporairement :

```javascript
// Ligne ~280 dans download-quartiers-images.cjs
// Remplacer:
for (const [ville, quartiers] of Object.entries(QUARTIERS_MAP)) {

// Par:
const villesToProcess = { lyon: QUARTIERS_MAP.lyon }; // ou marseille, nice, etc.
for (const [ville, quartiers] of Object.entries(villesToProcess)) {
```

---

## 📋 Troubleshooting

### ❌ Erreur "UNSPLASH_ACCESS_KEY manquante"
→ Vérifiez que la clé est bien définie :
```bash
echo $UNSPLASH_ACCESS_KEY
```

### ❌ Erreur "Rate limit exceeded"
→ Attendez 1 heure ou utilisez une autre clé API

### ❌ Certaines images ne correspondent pas au quartier
→ Les recherches Unsplash sont optimisées mais pas parfaites.  
→ Vous pouvez remplacer manuellement les images insatisfaisantes.  
→ Ou ajuster les requêtes dans le tableau `QUARTIERS_MAP`.

### ✅ Le script peut être relancé sans risque
→ Il skip automatiquement les images déjà présentes

---

## 📝 Attributions (légal)

Les attributions sont **automatiquement générées** dans :
```
sites/[ville]/public/images/quartiers/[ville]/ATTRIBUTIONS.txt
```

Format :
```
centre.jpg
  Photo by John Doe (https://unsplash.com/@johndoe)
  https://unsplash.com/photos/xxxxx
  via Unsplash
```

**Obligation légale Unsplash** : Conserver ces attributions et les afficher si possible sur le site (ou dans les métadonnées).

---

## 🎨 Qualité des images

- **Dimensions** : 1600x900px (ratio 16:9)
- **Crop** : Automatique via Unsplash
- **Qualité** : 80% (bon compromis poids/qualité)
- **Poids moyen** : 150-300KB par image

**Total estimé** : ~10-15 MB pour les 50 images

---

## 🔄 Après le téléchargement

1. ✅ Vérifier visuellement quelques images
2. ✅ Tester les pages quartiers en local
3. ✅ Commit + push vers les repos des sites
4. ✅ Vérifier en production

---

## 🆘 Besoin d'aide ?

- **Script ne fonctionne pas** : Vérifier Node.js installé (`node --version`)
- **Images de mauvaise qualité** : Modifier les requêtes dans `QUARTIERS_MAP`
- **Besoin d'autres dimensions** : Modifier `w=1600&h=900` dans la fonction `searchUnsplashPhoto`

---

**Durée totale estimée** : 2-3 minutes pour télécharger les 50 images 🚀

