# 🌐 État des Sites Multi-Villes

**Dernière mise à jour** : 28 Octobre 2025

## 📊 Vue d'ensemble

| Ville | URL Production | Repo GitHub | Port Local | Status | Dernière maj |
|-------|----------------|-------------|------------|--------|--------------|
| **Marseille** | [devis-demenageur-marseille.fr](https://devis-demenageur-marseille.fr) | [dd-marseille](https://github.com/gdetaisne/dd-marseille) | 3020 | ✅ Live | 28/10/25 |
| **Toulouse** | [devis-demenageur-toulousain.fr](https://devis-demenageur-toulousain.fr) | [dd-toulouse](https://github.com/gdetaisne/dd-toulouse) | 3022 | ✅ Live | 28/10/25 |
| **Lyon** | [devis-demenageur-lyon.fr](https://devis-demenageur-lyon.fr) | [dd-lyon](https://github.com/gdetaisne/dd-lyon) | 3023 | ✅ Live | 28/10/25 |
| **Bordeaux** | [bordeaux-demenageur.fr](https://www.bordeaux-demenageur.fr) | [dd-bordeaux](https://github.com/gdetaisne/dd-bordeaux) | 3024 | ✅ Live | 28/10/25 |
| **Nantes** | [devis-demenageur-nantes.fr](https://devis-demenageur-nantes.fr) | [dd-nantes](https://github.com/gdetaisne/dd-nantes) | 3025 | ✅ Live | 28/10/25 |
| **Lille** | [devis-demenageur-lille.fr](https://devis-demenageur-lille.fr) | [dd-lille](https://github.com/gdetaisne/dd-lille) | 3026 | ✅ Live | 28/10/25 |
| **Nice** | [devis-demenageur-nice.fr](https://devis-demenageur-nice.fr) | [dd-nice](https://github.com/gdetaisne/dd-nice) | 3027 | ✅ Live | 28/10/25 |
| **Strasbourg** | [devis-demenageur-strasbourg.fr](https://devis-demenageur-strasbourg.fr) | [dd-strasbourg](https://github.com/gdetaisne/dd-strasbourg) | 3028 | ✅ Live | 28/10/25 |
| **Rouen** | [devis-demenageur-rouen.fr](https://devis-demenageur-rouen.fr) | [dd-rouen](https://github.com/gdetaisne/dd-rouen) | 3029 | ✅ Live | 28/10/25 |
| **Rennes** | [devis-demenageur-rennes.fr](https://devis-demenageur-rennes.fr) | [dd-rennes](https://github.com/gdetaisne/dd-rennes) | 3030 | ✅ Live | 28/10/25 |
| **Montpellier** | [devis-demenageur-montpellier.fr](https://devis-demenageur-montpellier.fr) | [dd-montpellier](https://github.com/gdetaisne/dd-montpellier) | 3031 | ✅ Live | 28/10/25 |

---

## 🔧 Configuration par Site

### Variables d'environnement

Chaque site nécessite ces variables dans `.env.local` :

```bash
# Identité du site
SITE_SLUG=<ville>                                    # marseille, toulouse, lyon...
SITE_URL=https://devis-demenageur-<ville>.fr         # URL canonique

# Base de données (partagée)
DATABASE_URL=postgresql://user:pass@localhost:5432/demenagement_app

# Services
AI_SERVICE_URL=http://localhost:8000                 # Mock IA
CORS_ORIGIN=http://localhost:302X                    # Port local du site

# Auth (dev)
JWT_SECRET=dev-secret-change-in-prod
JWT_EXPIRES_IN=7d

# Serveur
PORT=302X                                             # Voir tableau ports ci-dessus
NODE_ENV=development
```

### ⚠️ Spécificités par ville

#### Toulouse
```bash
SITE_URL=https://devis-demenageur-toulousain.fr  # ⚠️ "toulousain" pas "toulouse"
```
**Raison** : Branding marketing spécifique

#### Bordeaux
```bash
SITE_URL=https://www.bordeaux-demenageur.fr      # ⚠️ Format inversé + www.
```
**Raison** : Nom de domaine spécifique (bordeaux-demenageur vs devis-demenageur-bordeaux)  
**CapRover App** : `moverz-bordeaux`

#### Lyon
```typescript
// app/layout.tsx utilise env.SITE_URL au lieu de hardcodé
metadataBase: new URL(env.SITE_URL),
```

---

## 🚀 Commandes Rapides

### Démarrer un site en local

```bash
# Méthode 1 : Depuis la racine (recommandé)
cd sites/<ville>
npm run dev -- -p <PORT>

# Méthode 2 : Variable d'env
SITE_SLUG=<ville> npm run dev -- -p <PORT>

# Exemples
cd sites/marseille && npm run dev -- -p 3020
cd sites/toulouse && npm run dev -- -p 3022
```

### Tester le blog

```bash
# 1. S'assurer que le contenu existe
ls content/<ville>/blog/

# 2. Démarrer le site
cd sites/<ville> && npm run dev -- -p <PORT>

# 3. Visiter
open http://localhost:<PORT>/blog
```

### Push un seul site

```bash
cd sites/<ville>
git add .
git commit -m "fix: description"
git push origin main
# ⚠️ Déclenche automatiquement le webhook CapRover
```

### Push tous les sites

```bash
# Depuis la racine du monorepo
./scripts/push-all-sites-to-github.sh
```

---

## 🏗️ Ajouter une Nouvelle Ville

### Checklist complète

1. **Créer le dossier site**
```bash
cp -r sites/marseille sites/<nouvelle-ville>
cd sites/<nouvelle-ville>
```

2. **Adapter les fichiers de config**
- [ ] `package.json` : Changer le `name`
- [ ] `app/layout.tsx` : Mettre à jour `title`, `description`, `metadataBase`
- [ ] `public/robots.txt` : Mettre à jour `Host` et `Sitemap`
- [ ] `next-sitemap.config.js` : Mettre à jour `siteUrl`
- [ ] `.env.local` : Créer avec `SITE_SLUG` et `SITE_URL`

3. **Créer le contenu blog**
```bash
mkdir -p content/<nouvelle-ville>/blog
cp content/marseille/blog/README.md content/<nouvelle-ville>/blog/
```

4. **Adapter les composants localisés**
- [ ] `components/NeighborhoodsTeaser.tsx` : Quartiers locaux
- [ ] `components/Testimonials.tsx` : Témoignages avec quartiers corrects
- [ ] `components/Hero.tsx` : Textes spécifiques à la ville

5. **Créer le repo GitHub**
```bash
cd sites/<nouvelle-ville>
git init
git remote add origin https://github.com/gdetaisne/dd-<nouvelle-ville>.git
git add .
git commit -m "feat: initialisation site <nouvelle-ville>"
git push -u origin main
```

6. **Configurer CapRover**
- Créer app `dd-<nouvelle-ville>`
- Lier au repo GitHub (webhook automatique)
- Variables d'env production
- Premier déploiement

7. **Ajouter au monorepo**
- [ ] Mettre à jour `SITES.md` (ce fichier)
- [ ] Tester en local
- [ ] Push monorepo

---

## 📍 Quartiers Principaux par Ville

### Marseille
Vieux-Port, Panier, Castellane, Endoume, Joliette, Plaine, Prado, Canebière

### Toulouse
Capitole, Saint-Cyprien, Carmes, Minimes, Purpan, Rangueil, Jeanne d'Arc

### Lyon
Presqu'île, Vieux Lyon, Part-Dieu, Croix-Rousse, Confluence, Guillotière

### Bordeaux
Chartrons, Saint-Pierre, Bastide, Victoire, Grand-Parc, Caudéran

### Nantes
Bouffay, Île de Nantes, Doulon, Beaujoire, Procé, Hauts-Pavés

### Lille
Vieux-Lille, Wazemmes, République, Fives, Moulins, Vauban

### Nice
Vieux-Nice, Port, Libération, Cimiez, Carabacel, Riquier

### Strasbourg
Grande-Île, Neudorf, Cronenbourg, Koenigshoffen, Robertsau

### Rouen
Centre Historique, Saint-Sever, Madrillet, Grammont, Sapins

### Rennes
Centre, Thabor, Maurepas, Villejean, Cleunay, Brequigny

### Montpellier
Écusson, Antigone, Près d'Arènes, Beaux-Arts, Port-Marianne

---

## 🔍 Vérification Santé des Sites

### Script de diagnostic

```bash
#!/bin/bash
# check-sites-health.sh

for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  echo "🔍 $city"
  
  # Vérifier repo GitHub
  cd "sites/$city"
  git remote -v | grep origin
  
  # Vérifier contenu blog
  blog_count=$(find "../../content/$city/blog" -name "*.md" 2>/dev/null | wc -l)
  echo "   📝 Articles blog: $blog_count"
  
  # Vérifier .env.local
  if [ -f ".env.local" ]; then
    echo "   ✅ .env.local présent"
  else
    echo "   ⚠️  .env.local manquant"
  fi
  
  cd ../..
  echo ""
done
```

---

## 📞 Contacts & Liens Utiles

- **CapRover Dashboard** : https://caprover.moverz.io
- **Monorepo GitHub** : https://github.com/gdetaisne/moverz_main
- **Documentation** : `ARCHITECTURE.md`, `DEPLOY.md`, `CHANGELOG.md`
- **Support** : guillaume@moverz.io

---

**💡 Astuce** : Bookmark ce fichier dans votre éditeur pour accès rapide aux URLs et ports !

