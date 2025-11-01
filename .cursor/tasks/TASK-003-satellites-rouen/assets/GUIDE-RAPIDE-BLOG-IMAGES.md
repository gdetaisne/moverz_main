# 📝 GUIDE RAPIDE : Images de Blog (Piliers)

**Durée totale : 8-10 minutes**

---

## 🎯 **Ce que fait le script**

Télécharge **143 images de blog** pour les 11 sites Moverz :

### **📚 10 Piliers de Blog** (110 images)
- `cover-etudiant.jpg` - Déménagement Étudiant 🎓
- `cover-entreprise.jpg` - Déménagement Entreprise 🏢  
- `cover-prix.jpg` - Prix & Tarifs 💰
- `cover-devis.jpg` - Devis Déménagement 📋
- `cover-pas-cher.jpg` - Déménagement Économique 💡
- `cover-urgent.jpg` - Déménagement Urgent ⚡
- `cover-longue-distance.jpg` - Longue Distance 🚛
- `cover-garde-meuble.jpg` - Garde-Meuble 📦
- `cover-international.jpg` - International 🌍
- `cover-piano.jpg` - Déménagement Piano 🎹

### **🎨 3 Covers Spécifiques** (33 images)
- `cover-guide.jpg` - Guide déménagement
- `cover-quartiers.jpg` - Quartiers
- `cover-estimation.jpg` - Estimation volume

**Total : 11 villes × 13 images = 143 images**

---

## ⚡ **Commandes**

### **1. Test (dry-run)**
```bash
cd /Users/guillaumestehelin/moverz_main

DRY_RUN=true UNSPLASH_ACCESS_KEY=2TYM5tT_zbvrA6S03eLKaJvBoY35dghmrAHC5xY5GII node scripts/download-blog-images.cjs
```

### **2. Téléchargement réel**
```bash
UNSPLASH_ACCESS_KEY=2TYM5tT_zbvrA6S03eLKaJvBoY35dghmrAHC5xY5GII node scripts/download-blog-images.cjs
```

---

## 📁 **Résultat**

Les images seront placées ici :

```
sites/bordeaux/public/images/blog/
├── cover-etudiant.jpg
├── cover-entreprise.jpg
├── cover-prix.jpg
├── cover-devis.jpg
├── cover-pas-cher.jpg
├── cover-urgent.jpg
├── cover-longue-distance.jpg
├── cover-garde-meuble.jpg
├── cover-international.jpg
├── cover-piano.jpg
├── cover-guide.jpg
├── cover-quartiers.jpg
├── cover-estimation.jpg
└── ATTRIBUTIONS.txt

... (x11 villes)
```

---

## 🎨 **Exemples d'images**

- **Étudiant** : Campus, jeunes, budget serré
- **Entreprise** : Bureaux, professionnel, corporate
- **Prix** : Calculatrice, euros, budget
- **Urgent** : Rapidité, urgence, express
- **Piano** : Instrument, transport délicat
- **International** : Carte du monde, voyage
- **Garde-meuble** : Stockage, entrepôt, cartons

---

## ⏱️ **Durée estimée**

- **143 images** × 2 secondes = **~5 minutes**
- **+ délais API** = **8-10 minutes total**

---

## 🚀 **Commande complète (copier-coller)**

```bash
# Depuis la racine du projet
cd /Users/guillaumestehelin/moverz_main

# Télécharger TOUTES les images de blog
UNSPLASH_ACCESS_KEY=2TYM5tT_zbvrA6S03eLKaJvBoY35dghmrAHC5xY5GII node scripts/download-blog-images.cjs
```

---

## ✅ **Vérification**

```bash
# Compter les images téléchargées
find sites -name "cover-*.jpg" -path "*/blog/*" | wc -l

# Voir quelques exemples
ls -la sites/lyon/public/images/blog/
ls -la sites/marseille/public/images/blog/
```

**Résultat attendu : 143 images** 🎉

---

## 📋 **Liste complète des 143 images**

<details>
<summary>Cliquer pour voir la liste détaillée</summary>

### Bordeaux (13 images)
- ✅ cover-etudiant.jpg
- ✅ cover-entreprise.jpg  
- ✅ cover-prix.jpg
- ✅ cover-devis.jpg
- ✅ cover-pas-cher.jpg
- ✅ cover-urgent.jpg
- ✅ cover-longue-distance.jpg
- ✅ cover-garde-meuble.jpg
- ✅ cover-international.jpg
- ✅ cover-piano.jpg
- ✅ cover-guide.jpg
- ✅ cover-quartiers.jpg
- ✅ cover-estimation.jpg

### Lille (13 images)
- ✅ cover-etudiant.jpg
- ✅ cover-entreprise.jpg
- ... (même liste)

### Lyon (13 images)
- ✅ cover-etudiant.jpg
- ✅ cover-entreprise.jpg
- ... (même liste)

### Marseille (13 images)
- ✅ cover-etudiant.jpg
- ✅ cover-entreprise.jpg
- ... (même liste)

### Montpellier (13 images)
- ✅ cover-etudiant.jpg
- ✅ cover-entreprise.jpg
- ... (même liste)

### Nantes (13 images)
- ✅ cover-etudiant.jpg
- ✅ cover-entreprise.jpg
- ... (même liste)

### Nice (13 images)
- ✅ cover-etudiant.jpg
- ✅ cover-entreprise.jpg
- ... (même liste)

### Rennes (13 images)
- ✅ cover-etudiant.jpg
- ✅ cover-entreprise.jpg
- ... (même liste)

### Rouen (13 images)
- ✅ cover-etudiant.jpg
- ✅ cover-entreprise.jpg
- ... (même liste)

### Strasbourg (13 images)
- ✅ cover-etudiant.jpg
- ✅ cover-entreprise.jpg
- ... (même liste)

### Toulouse (13 images)
- ✅ cover-etudiant.jpg
- ✅ cover-entreprise.jpg
- ... (même liste)

</details>

---

**Prêt à lancer ? Les 143 images de blog seront téléchargées en ~10 minutes !** 🚀
