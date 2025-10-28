# 🛠️ Scripts de Gestion Multi-Sites

**Automatisation de la synchronisation et du déploiement**  
**Dernière mise à jour** : 29 Octobre 2025

---

## 📋 Vue d'Ensemble

### Architecture de Synchronisation

```
Template Root                Scripts                Sites (11 villes)
├── .templates/         → sync-config-files.sh  → sites/*/tsconfig.json
│   ├── tsconfig.json                             sites/*/Dockerfile
│   ├── Dockerfile.template                       sites/*/.dockerignore
│   └── .eslintrc.json                            sites/*/.eslintrc.json
│
├── components/         → sync-components.sh    → sites/*/components/
│   ├── Hero.tsx                                  sites/*/app/globals.css
│   ├── HowItWorks.tsx
│   └── ...
│
└── content/           → push-all-sites-to-     → Repos GitHub individuels
    └── {ville}/blog/    github.sh               (dd-marseille, dd-toulouse...)
```

---

## 🔧 Scripts Disponibles

### 1. `sync-config-files.sh` - Synchronisation Configs Techniques

**Rôle** : Garantir l'homogénéité des configurations de build entre les 11 sites.

**Source** : `.templates/` (source de vérité unique)

**Cibles** :
- `tsconfig.json` - Config TypeScript (autonome, sans extends)
- `Dockerfile` - Build Docker avec génération {{CITY}}
- `.dockerignore` - Exclusions Docker
- `.eslintrc.json` - Règles ESLint + anti-imports cross-ville

**Usage** :
```bash
./scripts/sync-config-files.sh

# Sortie attendue :
# ✅ tsconfig.json synchronisé × 11 sites
# ✅ Dockerfile synchronisé × 11 sites
# ✅ .dockerignore synchronisé × 11 sites
# ✅ .eslintrc.json synchronisé × 11 sites
```

**Quand l'utiliser** :
- Après modification de `.templates/*`
- Avant un déploiement si builds incohérents
- Si erreur `Cannot read file '/tsconfig.json'`

**Vérification** :
```bash
# Tous les tsconfig doivent avoir le même MD5
md5 -q sites/*/tsconfig.json | sort -u | wc -l
# → Doit retourner "1"
```

---

### 2. `sync-components.sh` ⭐ - Synchronisation Composants UX

**Rôle** : Propager les modifications de composants partagés depuis le template vers les 11 sites.

**Source** : `/components/` + `/app/globals.css` (template root)

**Composants synchronisés** :
- `Hero.tsx` - Hero animé avec IA
- `HowItWorks.tsx` - Section "Comment ça marche" avec dual CTAs
- `PricingPreview.tsx` - Aperçu tarifs
- `StickyCTA.tsx` - CTA flottant sticky
- `NeighborhoodsIndex.tsx` - Index des quartiers
- `CtaPrimary.tsx` - CTA principal
- `LeadForm.tsx` - Formulaire de contact
- `app/globals.css` - Styles globaux + animations (keyframes)

**Usage** :
```bash
./scripts/sync-components.sh

# Sortie attendue :
# 📦 marseille
#    ✅ Hero.tsx synchronisé
#    ✅ HowItWorks.tsx synchronisé
#    ...
#    ✅ globals.css synchronisé
# 
# 🔍 VÉRIFICATION MD5
# ✅ Hero.tsx : Tous identiques
# ✅ globals.css : Tous identiques
```

**Quand l'utiliser** :
- Après modification de `/components/Hero.tsx`, `HowItWorks.tsx`, etc.
- Après ajout de classes CSS dans `/app/globals.css`
- Après ajout d'animations (@keyframes)
- Avant chaque commit touchant les composants partagés

**Vérification** :
```bash
# Vérifier manuellement un composant
diff components/Hero.tsx sites/toulouse/components/Hero.tsx
# → Aucune différence attendue
```

**⚠️ Composants NON synchronisés** (spécifiques par ville) :
- `Testimonials.tsx` - Témoignages avec quartiers locaux
- `NeighborhoodsTeaser.tsx` - Liste des quartiers par ville
- `QuartierTemplate.tsx` - Template pages quartiers

---

### 3. `push-all-sites-to-github.sh` - Déploiement Global

**Rôle** : Déployer tous les sites vers leurs repos GitHub individuels et déclencher les rebuilds CapRover.

**Processus** :
1. Synchronise `content/{ville}/blog/` → `sites/{ville}/content/blog/`
2. Commit dans chaque repo Git local (`sites/{ville}/.git`)
3. Push vers GitHub (`dd-marseille`, `dd-toulouse`, etc.)
4. CapRover détecte le push (webhook) → Rebuild automatique

**Usage** :
```bash
./scripts/push-all-sites-to-github.sh

# Sortie attendue :
# 📦 marseille
#    🔄 Sync content/marseille/blog
#    📤 Push vers GitHub...
#    ✅ Poussé avec succès
# 
# ...× 11 sites
# 
# ✅ TOUS LES SITES ONT ÉTÉ POUSSÉS SUR GITHUB !
```

**Quand l'utiliser** :
- Après `sync-components.sh` pour déployer les changements
- Après ajout/modification d'articles blog
- Pour forcer un redéploiement complet

**Délai déploiement** : 3-5 min par site (~10-15 min total pour voir tous les sites live)

**Liens repos GitHub** :
- https://github.com/gdetaisne/dd-marseille
- https://github.com/gdetaisne/dd-toulouse
- https://github.com/gdetaisne/dd-lyon
- ... (11 repos total)

---

## 🔄 Workflows Standards

### Workflow 1 : Modifier un Composant Partagé

```bash
# 1. Éditer le template
code components/Hero.tsx

# 2. Synchroniser
./scripts/sync-components.sh

# 3. Commit monorepo
git add components/Hero.tsx sites/*/components/Hero.tsx
git commit -m "feat(hero): amélioration UX"
git push origin main

# 4. Déployer
./scripts/push-all-sites-to-github.sh
```

### Workflow 2 : Modifier une Config Technique

```bash
# 1. Éditer le template
code .templates/tsconfig.json

# 2. Synchroniser
./scripts/sync-config-files.sh

# 3. Commit monorepo
git add .templates/tsconfig.json sites/*/tsconfig.json
git commit -m "fix(build): amélioration tsconfig"
git push origin main

# 4. Déployer
./scripts/push-all-sites-to-github.sh
```

### Workflow 3 : Modifier le CSS Global

```bash
# 1. Éditer le CSS
code app/globals.css

# 2. Synchroniser (inclus globals.css automatiquement)
./scripts/sync-components.sh

# 3. Commit et déployer
git add app/globals.css sites/*/app/globals.css
git commit -m "style: ajout animation fade-in"
git push origin main
./scripts/push-all-sites-to-github.sh
```

### Workflow 4 : Ajouter un Article Blog

```bash
# 1. Créer l'article
code content/marseille/blog/satellites/nouvel-article.md

# 2. Déployer (sync blog automatique)
git add content/marseille/blog/
git commit -m "content(marseille): nouvel article"
git push origin main
./scripts/push-all-sites-to-github.sh
```

---

## 🎯 Commandes Utiles

### Vérifications Pré-Déploiement

```bash
# Vérifier homogénéité tsconfig
md5 -q sites/*/tsconfig.json | sort -u | wc -l
# → Doit retourner "1"

# Vérifier homogénéité Hero.tsx
md5 -q components/Hero.tsx sites/*/components/Hero.tsx | sort -u | wc -l
# → Doit retourner "1"

# Vérifier statut Git tous les sites
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  echo "=== $city ==="
  cd "sites/$city" && git status --short && cd ../..
done
```

### Tests Locaux

```bash
# Tester un build
cd sites/marseille && npm run build

# Lancer en dev
cd sites/toulouse && npm run dev -- -p 3021

# Vérifier les ports utilisés (voir SITES.md)
```

---

## 🐛 Troubleshooting

### Erreur : "Cannot read file '/tsconfig.json'"

```bash
# Solution
./scripts/sync-config-files.sh
cd sites/nantes && npm run build
```

### Composants désynchronisés

```bash
# Vérifier les différences
diff components/Hero.tsx sites/toulouse/components/Hero.tsx

# Resynchroniser
./scripts/sync-components.sh
```

### Script échoue "Permission denied"

```bash
# Rendre exécutables
chmod +x scripts/*.sh
```

### Push GitHub échoue

```bash
# Vérifier les remotes
cd sites/marseille
git remote -v
# → origin https://github.com/gdetaisne/dd-marseille.git
```

---

## 📚 Documentation Complémentaire

- **ARCHITECTURE.md** - Vue d'ensemble système multi-sites
- **BUILD.md** - Guide complet problèmes de build
- **DEPLOY.md** - Guide déploiement rapide
- **TROUBLESHOOTING.md** - Résolution problèmes courants

---

**Version** : 1.0  
**Auteur** : Équipe Moverz  
**Dernière mise à jour** : 29 Octobre 2025

