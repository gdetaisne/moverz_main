# 📋 Décisions Techniques

**Historique des choix architecturaux et stratégiques**  
**Dernière mise à jour** : 28 Octobre 2025

---

## 2025-10-28 : Migration Bordeaux vers bordeaux-demenageur.fr

### Contexte
Le site Bordeaux était initialement configuré sur `devis-demenageur-bordeaux.fr` mais a été déployé sur CapRover avec le domaine `bordeaux-demenageur.fr`.

### Problème
- Incohérence entre config code (devis-demenageur-bordeaux.fr) et domaine live (bordeaux-demenageur.fr)
- Risque SEO : canonical, robots.txt, sitemaps pointaient vers mauvaise URL
- App CapRover nommée `moverz-bordeaux` au lieu du pattern standard `dd-bordeaux`

### Options considérées

**Option 1 : Garder devis-demenageur-bordeaux.fr**
- ✅ Cohérent avec autres sites
- ✅ Pattern uniforme
- ❌ Nécessite acheter nouveau domaine
- ❌ Reconfigurer CapRover

**Option 2 : Migrer vers bordeaux-demenageur.fr** ✅ **CHOISI**
- ✅ Domaine déjà acheté et configuré
- ✅ Format plus naturel ("bordeaux-demenageur")
- ✅ CapRover déjà configuré
- ⚠️ Exception au pattern standard (documentée)

### Décision
**Adopter bordeaux-demenageur.fr avec www.**

### Modifications effectuées
```bash
# Config mise à jour
SITE_URL=https://www.bordeaux-demenageur.fr
metadataBase: new URL("https://www.bordeaux-demenageur.fr")
robots.txt Host: https://www.bordeaux-demenageur.fr
```

### Impact
- Site Bordeaux a un format d'URL différent (documenté dans SITES.md)
- Conserve le `www.` (contrairement aux autres sites)
- App CapRover reste `moverz-bordeaux`

### Documentation
- SITES.md : Section "Spécificités par ville > Bordeaux"
- CONTEXT.md : Note sur les exceptions d'URL

---

## 2025-10-28 : Désactivation Next.js Image Optimizer

### Contexte
Images Unsplash ne s'affichaient pas en production sur CapRover (erreur 400).

### Problème
Next.js Image Optimizer tente d'optimiser les images externes, mais Unsplash bloque ces requêtes depuis certains serveurs.

### Options considérées

**Option 1 : CDN custom avec cache Unsplash**
- ✅ Performance optimale
- ❌ Coût infrastructure
- ❌ Complexité maintenance
- ❌ Temps de mise en œuvre : 2-3 jours

**Option 2 : Télécharger images en local**
- ✅ Contrôle total
- ✅ Pas de dépendance externe
- ❌ ~50 images × 11 sites = 550 fichiers à gérer
- ❌ Temps de mise en œuvre : 1 jour

**Option 3 : Désactiver optimizer** ✅ **CHOISI**
- ✅ Solution immédiate (30 min)
- ✅ Fonctionne partout
- ⚠️ Performance légèrement inférieure
- ✅ Simple à maintenir

### Décision
**`unoptimized: true` dans next.config.mjs**

### Code
```javascript
// next.config.mjs
images: {
  unoptimized: true,  // Désactive optimization côté serveur
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      pathname: '/**',
    }
  ],
}
```

### Trade-offs
- **Pour** : Fonctionne immédiatement, simple, fiable
- **Contre** : Pas de formats next-gen (AVIF/WebP) auto, pas de resize auto
- **Acceptable** : Oui, images Unsplash déjà optimisées à la source

### Migration future
Si charge > 10k visiteurs/jour, envisager :
1. Télécharger top 20 images les plus affichées
2. Les héberger en local
3. Activer optimizer pour ces images

---

## 2025-10-28 : Blog Multi-Tenant dans content/<ville>/

### Contexte
Le blog était initialement centralisé dans un seul dossier `content/blog/`.

### Problème
- Confusion SEO : tous les articles mélangés
- Difficulté à isoler le contenu par ville
- Risque de contenu dupliqué/croisé

### Options considérées

**Option 1 : Blog centralisé avec tag ville**
- ✅ Un seul dossier à gérer
- ❌ Complexité de filtrage
- ❌ Risque SEO (duplicate content)
- ❌ Pas de vraie isolation

**Option 2 : Blog par site dans sites/<ville>/content/** 
- ✅ Isolation parfaite
- ❌ Duplication complète du contenu
- ❌ 11 copies à maintenir
- ❌ Difficile à synchroniser

**Option 3 : Blog dans content/<ville>/ (monorepo root)** ✅ **CHOISI**
- ✅ Isolation par ville
- ✅ Un seul endroit dans le monorepo
- ✅ Facile à synchroniser avec script
- ✅ SEO optimal (contenu vraiment distinct)

### Décision
**Structure `content/<ville>/blog/` + logique tenant-aware dans `lib/blog.ts`**

### Code
```typescript
// lib/blog.ts
const currentSlug = env.SITE_SLUG || 'marseille'
const blogPath = path.join(process.cwd(), '../../content', currentSlug, 'blog')
```

### Workflow
```bash
# 1. Créer contenu dans content/<ville>/blog/
# 2. Tester en local avec SITE_SLUG=<ville>
# 3. Push monorepo
# 4. Script sync vers sites/<ville>/content/blog/
# 5. Push repos individuels → CapRover
```

### Avantages réalisés
- Isolation SEO parfaite
- Contenu spécifique par ville
- Facile à gérer depuis monorepo
- Pas de risque de contamination cross-ville

---

## 2025-10-28 : Canonical URLs sans www.

### Contexte
Certains sites avaient `www.` dans robots.txt mais pas dans `metadataBase`.

### Problème
- Google Search Console avertissements
- Risque de duplicate content (avec/sans www.)
- Incohérence SEO

### Décision
**Standard : SANS www. (sauf exception Bordeaux)**

### Justification
- Plus simple (pas de redirection nécessaire)
- Standard moderne (la plupart des nouveaux sites sans www.)
- Moins de caractères → meilleur branding
- Exception Bordeaux : domaine déjà configuré avec www.

### Règle
```
✅ Standard : https://devis-demenageur-<ville>.fr
⚠️  Exception : https://www.bordeaux-demenageur.fr (Bordeaux uniquement)
```

---

## 2025-10-28 : ESLint Anti-Imports Cross-Ville

### Contexte
Risque de copier/coller du code d'un site à l'autre avec mauvais imports.

### Problème
```typescript
// ❌ Import depuis un autre site
import { Hero } from '../../marseille/components/Hero'
```

### Décision
**Règle ESLint `no-restricted-imports`**

### Code
```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          {
            "group": ["**/sites/*/", "../*/sites/*"],
            "message": "❌ Imports cross-ville interdits ! Utiliser les composants locaux."
          }
        ]
      }
    ]
  }
}
```

### Impact
- Erreur de build si import cross-ville détecté
- Force isolation stricte des sites
- Prévient bugs difficiles à tracer

---

## 2025-10-27 : Tokens CSS Standardisés

### Contexte
Chaque site avait ses propres classes CSS custom, incohérence visuelle.

### Problème
- Styles légèrement différents entre sites
- Duplication de code CSS
- Difficile à maintenir

### Décision
**Tokens CSS partagés dans globals.css**

### Tokens définis
```css
.btn-primary    /* CTA principal (orange gradient) */
.btn-secondary  /* CTA secondaire (outline) */
.btn-accent     /* CTA sticky (bleu) */
.card-glass     /* Carte glassmorphism */
.bg-hero        /* Gradient hero animé */
```

### Avantages
- Cohérence visuelle entre tous les sites
- Un seul endroit à modifier pour changer un style
- Moins de CSS dupliqué
- Maintenabilité ++

---

## 2025-10-27 : Structure Monorepo vs Multi-Repo

### Contexte
Besoin de gérer 11 sites similaires mais distincts.

### Options considérées

**Option 1 : 11 repos totalement indépendants**
- ❌ Duplication extrême
- ❌ Synchronisation manuelle impossible
- ❌ Bugs répétés 11 fois

**Option 2 : Un seul repo avec sous-dossiers** ✅ **CHOISI**
- ✅ Modifications globales faciles
- ✅ Partage de composants possible
- ✅ Histoire Git unifiée
- ⚠️ Déploiement plus complexe

**Option 3 : Workspaces Turborepo**
- ✅ Outils avancés (cache, parallel builds)
- ❌ Overhead de configuration
- ❌ Courbe d'apprentissage

### Décision
**Monorepo simple + repos individuels pour déploiement**

### Architecture
```
moverz_main/              # Monorepo principal (source de vérité)
  sites/
    marseille/            # Aussi un repo Git indépendant
    toulouse/
    ...

→ Modifications dans monorepo
→ Push vers repos individuels via script
→ CapRover watch les repos individuels
```

### Workflow
1. Développement dans monorepo
2. `./scripts/push-all-sites-to-github.sh`
3. Webhooks GitHub → CapRover builds
4. Sites live

---

## 2025-10-27 : CapRover pour Déploiement

### Contexte
Besoin de déployer 11 sites Next.js en production.

### Options considérées

**Option 1 : Vercel**
- ✅ Simple, optimisé Next.js
- ❌ Coût : ~$20/site/mois = $220/mois
- ❌ Vendor lock-in

**Option 2 : Docker VPS classique**
- ✅ Contrôle total
- ❌ DevOps complexe (nginx, SSL, CI/CD)
- ❌ Maintenance ++

**Option 3 : CapRover** ✅ **CHOISI**
- ✅ Heroku-like, self-hosted
- ✅ Webhooks GitHub auto
- ✅ SSL Let's Encrypt auto
- ✅ Coût : $40/mois VPS pour 11 sites
- ✅ Interface web simple

### Décision
**CapRover sur VPS dédié**

### Configuration
- VPS 8GB RAM, 4 CPU
- CapRover 1.x
- 1 app par ville (dd-marseille, dd-toulouse...)
- Webhook GitHub → Build automatique
- SSL auto via Let's Encrypt

---

## 2025-10-28 : Harmonisation Configs Build (tsconfig, Dockerfile)

### Contexte
Build CapRover échouait de manière aléatoire selon les sites. Nantes bloqué avec `Cannot read file '/tsconfig.json'`.

### Problème
**Configurations incohérentes entre les 11 sites** :
- 11 `tsconfig.json` différents (certains avec `"extends": "../../tsconfig.json"` invalide dans Docker)
- 11 `Dockerfile` différents avec timestamps dynamiques
- 11 `.dockerignore` similaires mais pas identiques
- Aucun moyen de garantir l'homogénéité

**Impact** :
- Toulouse : ✅ Build OK
- Nantes : ❌ Build fail (extends invalide)
- Autres : ⚠️ Risque aléatoire

### Options considérées

**Option 1 : Workspace Monorepo (Turborepo/Nx)**
- ✅ Configs partagées par design
- ❌ Migration complexe (~3-5 jours)
- ❌ Overhead de config
- ❌ Courbe d'apprentissage

**Option 2 : Validation CI/CD**
- ✅ Détecte divergences
- ❌ Ne corrige pas automatiquement
- ❌ Build échoue en prod avant détection

**Option 3 : Templates canoniques + Script sync** ✅ **CHOISI**
- ✅ Solution immédiate (2h)
- ✅ Source de vérité unique (`.templates/`)
- ✅ Script de sync automatique
- ✅ Vérification MD5 intégrée
- ⚠️ Nécessite discipline (sync avant modifs)

### Décision
**Architecture avec `.templates/` + `sync-config-files.sh`**

### Structure
```
.templates/                      # Source de vérité
├── tsconfig.json               # Config TS autonome
├── Dockerfile.template         # Multi-stage avec {{CITY}}
├── .dockerignore               # Exclusions standard
└── .eslintrc.json              # Règles communes

scripts/
└── sync-config-files.sh        # Déploie templates → sites/*

sites/
└── <ville>/
    ├── tsconfig.json           # Copie depuis template
    ├── Dockerfile              # Généré depuis template
    ├── .dockerignore           # Copie depuis template
    └── .eslintrc.json          # Copie depuis template
```

### Fichiers Canoniques

**tsconfig.json** :
- ❌ Plus de `"extends"` (invalide dans Docker)
- ✅ Autonome avec `baseUrl: "."`
- ✅ `paths: { "@/*": ["./"] }`

**Dockerfile** :
- ✅ Multi-stage (base → deps → builder → runner)
- ✅ Node 20 Alpine
- ✅ User `nextjs` non-root
- ✅ dumb-init process manager
- ✅ Copie `content/` (blog)

**Workflow** :
```bash
# 1. Modifier template
vi .templates/tsconfig.json

# 2. Synchroniser
./scripts/sync-config-files.sh

# 3. Vérifier
# → Affiche MD5 de tous les sites (doivent être identiques)

# 4. Deploy
./scripts/push-all-sites-to-github.sh
```

### Trade-offs
- **Pour** : Simple, rapide, vérifiable, pas de refactoring massif
- **Contre** : Nécessite discipline (ne pas modifier sites/* directement)
- **Acceptable** : Oui, documenté dans BUILD.md + CONTEXT.md

### Validation
```bash
# Tous les tsconfig.json identiques
for city in marseille toulouse lyon bordeaux nantes lille nice strasbourg rouen rennes montpellier; do
  md5 -q "sites/$city/tsconfig.json"
done | uniq -c
# → Affiche: 11 <même hash>

# Test build Nantes (qui échouait)
cd sites/nantes && npm run build
# → ✅ Success
```

### Documentation
- **BUILD.md** : Guide complet build + troubleshooting
- **TROUBLESHOOTING.md** : Problème #0 ajouté
- **CONTEXT.md** : Règle "ne jamais modifier sites/* directement"

### Résultats
- ✅ 11 sites avec configs identiques
- ✅ Nantes build réussi
- ✅ Script sync réutilisable
- ✅ Prévention automatique divergences futures

---

## Template pour Nouvelles Décisions

```markdown
## YYYY-MM-DD : Titre de la Décision

### Contexte
[Description du problème ou besoin]

### Problème
[Détails techniques du problème]

### Options considérées

**Option 1 : Nom**
- ✅ Avantages
- ❌ Inconvénients

**Option 2 : Nom** ✅ **CHOISI**
- ✅ Avantages
- ⚠️ Trade-offs acceptables

### Décision
[Résumé de la décision prise]

### Code/Configuration
[Exemples de code si applicable]

### Trade-offs
[Ce qu'on perd vs ce qu'on gagne]

### Impact
[Conséquences sur le projet]
```

---

**💡 Pourquoi ce fichier ?**

Ce fichier trace les **POURQUOI** derrière les décisions techniques. Quand quelqu'un (ou une IA) se demande "pourquoi c'est fait comme ça ?", la réponse est ici avec le contexte complet.

**Principe** : Toute décision non-évidente doit être documentée pour éviter de refaire les mêmes débats 6 mois plus tard.

