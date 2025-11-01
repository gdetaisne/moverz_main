# 🚀 Guide de Déploiement Rapide

## 📝 Cas d'usage courants

### 1️⃣ Modifier un composant partagé (ex: Hero)

```bash
# 1. Éditer le composant root
code components/Hero.tsx

# 2. Synchroniser automatiquement vers les 11 sites
./scripts/sync-components.sh
# → Copie Hero.tsx + vérifie MD5

# 3. Commit monorepo
git add components/Hero.tsx sites/*/components/Hero.tsx
git commit -m "feat(hero): amélioration animation"
git push origin main

# 4. Déployer automatiquement vers les 11 repos
./scripts/push-all-sites-to-github.sh
# → Commit + push + déclenche rebuilds CapRover
```

**Délai :** ~10-15 min pour voir les changements live.

**Composants synchronisés** : Hero, HowItWorks, StickyCTA, PricingPreview, NeighborhoodsIndex, CtaPrimary, LeadForm, globals.css

---

### 2️⃣ Modifier un composant local (ex: Testimonials Toulouse)

```bash
# 1. Éditer le fichier local
code sites/toulouse/components/Testimonials.tsx

# 2. Commit monorepo
git add sites/toulouse/components/Testimonials.tsx
git commit -m "fix(toulouse): quartiers corrects dans Testimonials"
git push origin main

# 3. Push vers le dépôt Toulouse
cd sites/toulouse
git add components/Testimonials.tsx
git commit -m "fix: quartiers corrects dans Testimonials"
git push origin main
cd ../..
```

**Délai :** ~5-10 min pour voir les changements live.

---

### 3️⃣ Ajouter un nouvel article de blog (ex: Marseille)

```bash
# 1. Créer l'article dans le monorepo
mkdir -p content/marseille/blog/nouveaux-articles
code content/marseille/blog/nouveaux-articles/mon-article.md

# 2. Synchroniser vers le site
mkdir -p sites/marseille/content/blog/nouveaux-articles
cp content/marseille/blog/nouveaux-articles/mon-article.md \
   sites/marseille/content/blog/nouveaux-articles/

# 3. Commit monorepo
git add content/marseille/blog/ sites/marseille/content/blog/
git commit -m "content(marseille): nouvel article"
git push origin main

# 4. Push vers le dépôt Marseille
cd sites/marseille
git add content/blog/
git commit -m "content: nouvel article"
git push origin main
cd ../..
```

**Délai :** ~5-10 min pour voir l'article live.

---

### 4️⃣ Modifier le CSS global

```bash
# 1. Éditer le CSS root
code app/globals.css

# 2. Synchroniser automatiquement (inclus dans sync-components.sh)
./scripts/sync-components.sh
# → Copie globals.css + tous les composants partagés

# 3. Commit monorepo
git add app/globals.css sites/*/app/globals.css
git commit -m "style: amélioration btn-primary + keyframes"
git push origin main

# 4. Déployer automatiquement
./scripts/push-all-sites-to-github.sh
```

**Note** : `sync-components.sh` synchronise TOUJOURS `globals.css` en plus des composants.

---

### 5️⃣ Forcer un rebuild sans changement de code

**Cas :** Rebuild échoué, ou besoin de redéployer sans modifier le code.

```bash
# Ajouter un commentaire vide pour forcer le commit
cd sites/marseille
echo "# Force rebuild $(date)" >> README.md
git add README.md
git commit -m "chore: force rebuild"
git push origin main
cd ../..
```

**Alternative :** Trigger manual rebuild depuis le dashboard CapRover.

---

## 🧪 Checklist Pre-Push

Avant chaque push, vérifier :

```bash
# ✅ Build local OK ?
cd sites/marseille && npm run build

# ✅ Fichiers critiques présents ?
ls -la public/logo.png
ls -la content/blog/
ls -la components/Hero.tsx

# ✅ Dockerfile copie content/ et public/ ?
grep "COPY.*content" Dockerfile
grep "COPY.*public" Dockerfile
```

---

## 🚨 Que faire si un build CapRover échoue ?

### 1. Vérifier les logs CapRover
- Aller dans le dashboard CapRover
- Cliquer sur l'app concernée (ex: `dd-marseille`)
- Onglet "App Logs" → chercher les erreurs

### 2. Erreurs fréquentes

#### "Module not found"
```bash
# Vérifier que node_modules existe
cd sites/marseille
rm -rf node_modules .next
npm install
npm run build
```

#### "ENOENT: no such file or directory, scandir 'content/blog'"
```bash
# Vérifier que content/blog existe
ls -la sites/marseille/content/blog/

# Si manquant, copier depuis le monorepo
cp -r content/marseille/blog/ sites/marseille/content/blog/
```

#### "Invalid src prop ... hostname not configured"
```javascript
// Vérifier next.config.mjs
images: {
  unoptimized: true,  // ⚠️ CRITIQUE pour Unsplash
  remotePatterns: [{
    protocol: 'https',
    hostname: 'images.unsplash.com',
    pathname: '/**',
  }],
}
```

---

## 📊 Statut des Déploiements

| Ville | Dernier Commit | Status | URL Live |
|-------|---------------|--------|----------|
| Marseille | `5c39a50` | ✅ Live | https://devis-demenageur-marseille.fr/ |
| Toulouse | `e5e7d88` | ✅ Live | https://devis-demenageur-toulousain.fr/ |
| Lyon | `d93aeba` | ✅ Live | https://devis-demenageur-lyon.fr/ |
| Bordeaux | `bfc2ac2` | ✅ Live | https://devis-demenageur-bordeaux.fr/ |
| Nantes | `8d702db` | ✅ Live | https://devis-demenageur-nantes.fr/ |
| Lille | `e637785` | ✅ Live | https://devis-demenageur-lille.fr/ |
| Nice | `f0c08b5` | ✅ Live | https://devis-demenageur-nice.fr/ |
| Strasbourg | `a36f59a` | ✅ Live | https://devis-demenageur-strasbourg.fr/ |
| Rouen | `6bbdf47` | ✅ Live | https://devis-demenageur-rouen.fr/ |
| Rennes | `4e44214` | ✅ Live | https://devis-demenageur-rennes.fr/ |
| Montpellier | `4080756` | ✅ Live | https://devis-demenageur-montpellier.fr/ |

---

## 🎯 Commandes Utiles

```bash
# Vérifier le statut Git de tous les sites
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  echo "=== $city ==="
  cd "sites/$city"
  git status --short
  cd ../..
done

# Voir les derniers commits de tous les sites
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  echo "=== $city ==="
  cd "sites/$city"
  git log --oneline -1
  cd ../..
done

# Tester le build de tous les sites (⚠️ LONG)
for city in marseille toulouse lyon; do
  echo "🧪 Testing $city..."
  cd "sites/$city"
  npm run build 2>&1 | tail -5
  cd ../..
done
```

---

**Version :** 1.0  
**Dernière mise à jour :** 28 Octobre 2025

