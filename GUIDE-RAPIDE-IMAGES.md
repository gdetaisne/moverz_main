# 🚀 GUIDE RAPIDE : Télécharger les 50 images de quartiers

**Durée totale : 5 minutes**

---

## ⚡ Étapes

### 1️⃣ Créer un compte Unsplash (2 min)

1. Va sur **https://unsplash.com/developers**
2. Clique sur **"Register as a developer"** (si pas déjà fait)
3. Clique sur **"New Application"**
4. Accepte les conditions
5. Remplis le formulaire :
   - **Application name** : `Moverz Images`
   - **Description** : `Download images for moving platform`
6. **📋 COPIE ta clé "Access Key"** (elle ressemble à `abc123xyz789...`)

---

### 2️⃣ Tester le script (30 sec)

```bash
cd /Users/guillaumestehelin/moverz_main

# Test sans télécharger (pour vérifier que ça marche)
DRY_RUN=true UNSPLASH_ACCESS_KEY=ta_clé_ici node scripts/download-quartiers-images.cjs
```

Tu devrais voir :
```
🔍 MODE DRY RUN activé (aucun téléchargement réel)
📊 Total: 50 images à traiter
...
🔗 [DRY RUN] https://images.unsplash.com/...
   By Photographer Name
```

---

### 3️⃣ Télécharger les images (2-3 min)

```bash
# Téléchargement réel des 50 images
UNSPLASH_ACCESS_KEY=ta_clé_ici node scripts/download-quartiers-images.cjs
```

Le script va :
- ✅ Chercher automatiquement les images sur Unsplash
- ✅ Les télécharger en 1600x900px
- ✅ Les placer dans les bons dossiers
- ✅ Générer les attributions légales

**Résultat attendu :**
```
🏙️  LILLE (5 quartiers)
🔍 [lille/centre.jpg] Recherche: "Lille Grand Place France architecture"...
⬇️  Téléchargement...
✅ [lille/centre.jpg] Téléchargé avec succès
   📸 By John Doe - https://unsplash.com/photos/xxxxx

... (x50)

📊 RÉSUMÉ FINAL
Total traité:     50
✅ Succès:        50
❌ Échecs:        0
⏭️  Déjà présentes: 0
```

---

## 📁 Résultat

Les images seront placées ici :

```
sites/lille/public/images/quartiers/lille/centre.jpg
sites/lille/public/images/quartiers/lille/lomme.jpg
sites/lyon/public/images/quartiers/lyon/confluence.jpg
sites/lyon/public/images/quartiers/lyon/vieux-lyon.jpg
sites/marseille/public/images/quartiers/marseille/panier.jpg
... (50 images au total)
```

Chaque dossier aura aussi un fichier `ATTRIBUTIONS.txt` avec les crédits photos.

---

## 🎯 Commande complète (copier-coller)

```bash
# Depuis la racine du projet
cd /Users/guillaumestehelin/moverz_main

# Télécharger TOUTES les images (remplace ta_clé_ici)
UNSPLASH_ACCESS_KEY=ta_clé_ici node scripts/download-quartiers-images.cjs
```

---

## ✅ Vérification rapide

Après le téléchargement, vérifie quelques images :

```bash
# Voir les images téléchargées
ls -lh sites/lyon/public/images/quartiers/lyon/
ls -lh sites/marseille/public/images/quartiers/marseille/
ls -lh sites/nice/public/images/quartiers/nice/

# Ouvrir une image pour vérifier
open sites/lyon/public/images/quartiers/lyon/vieux-lyon.jpg
```

---

## 🔄 Relancer si besoin

Le script **skip automatiquement** les images déjà présentes.  
Tu peux le relancer sans risque si certaines ont échoué.

---

## 📋 Liste complète des 50 images

<details>
<summary>Cliquer pour voir la liste détaillée</summary>

### Lille (5)
- ✅ centre.jpg
- ✅ lomme.jpg
- ✅ moulins.jpg
- ✅ vieux-lille.jpg
- ✅ wazemmes.jpg

### Lyon (5)
- ✅ confluence.jpg
- ✅ croix-rousse.jpg
- ✅ part-dieu.jpg
- ✅ presquile.jpg
- ✅ vieux-lyon.jpg

### Marseille (5)
- ✅ endoume.jpg
- ✅ joliette.jpg
- ✅ panier.jpg
- ✅ plaine.jpg
- ✅ vieux-port.jpg

### Montpellier (5)
- ✅ antigone.jpg
- ✅ beaux-arts.jpg
- ✅ comedie.jpg
- ✅ ecusson.jpg
- ✅ port-marianne.jpg

### Nantes (5)
- ✅ beaulieu.jpg
- ✅ centre-ville.jpg
- ✅ dervallieres.jpg
- ✅ ile-nantes.jpg
- ✅ malakoff.jpg

### Nice (5)
- ✅ cimiez.jpg
- ✅ liberation.jpg
- ✅ port.jpg
- ✅ promenade-anglais.jpg
- ✅ vieux-nice.jpg

### Rennes (5)
- ✅ beaulieu.jpg
- ✅ centre-ville.jpg
- ✅ cleunay.jpg
- ✅ thabor.jpg
- ✅ villejean.jpg

### Rouen (5)
- ✅ centre-ville.jpg
- ✅ coteaux-sud.jpg
- ✅ joli-mai.jpg
- ✅ saint-marc.jpg
- ✅ saint-sever.jpg

### Strasbourg (5)
- ✅ cronenbourg.jpg
- ✅ esplanade.jpg
- ✅ grande-ile.jpg
- ✅ hautepierre.jpg
- ✅ neudorf.jpg

### Toulouse (5)
- ✅ capitole.jpg
- ✅ carmes.jpg
- ✅ compans.jpg
- ✅ jean-jaures.jpg
- ✅ saint-cyprien.jpg

</details>

---

## 🆘 Problèmes ?

### ❌ "UNSPLASH_ACCESS_KEY manquante"
→ Vérifie que tu as bien copié ta clé API

### ❌ "Rate limit exceeded"
→ Attends 1 heure (limite gratuite : 50 req/h)

### ❌ Certaines images ne correspondent pas
→ Normal, les recherches Unsplash ne sont pas parfaites  
→ Tu peux remplacer manuellement les images insatisfaisantes

---

**C'est tout ! Les 50 images devraient être téléchargées en ~3 minutes.** 🎉

Documentation complète : `scripts/README-IMAGES.md`

