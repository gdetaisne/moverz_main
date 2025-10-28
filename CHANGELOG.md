# 📝 Changelog

## [4.0.0] - 2025-10-28

### 🎉 Refonte Complète Architecture Multi-Sites

#### ✨ Nouveautés

- **Hero animé avec IA** : Animation progressive (photos → analyse IA → devis) avec badges "Propulsé par Moverz IA"
- **Composants unifiés** : Hero, HowItWorks, PricingPreview, StickyCTA identiques sur tous les sites
- **CSS unifié** : `.btn-primary`, `.btn-secondary`, `.btn-accent`, `card-glass`, `bg-hero`
- **Blog tenant-aware** : `lib/blog.ts` résout dynamiquement la ville via `SITE_SLUG` ou `SITE_URL`
- **Testimonials localisés** : Quartiers corrects par ville (ex: Capitole pour Toulouse, Vieux-Port pour Marseille)

#### 🔧 Améliorations

- **Images non optimisées** : `unoptimized: true` dans `next.config.mjs` pour éviter erreurs 400 Unsplash
- **Build CapRover robuste** : `ignoreBuildErrors: true` + `ignoreDuringBuilds: true`
- **Dockerfile unifié** : Copie systématique de `content/` et `public/`
- **NeighborhoodsTeaser** : CTA "Ajouter votre quartier" + grid responsive
- **StickyCTA** : Apparition à 40% de scroll au lieu de 20%

#### 📚 Documentation

- **`ARCHITECTURE.md`** : Structure complète du monorepo, workflow dev→prod, règles de synchronisation
- **`DEPLOY.md`** : Guide de déploiement avec cas d'usage courants (modifier un composant, ajouter un article, etc.)
- **`README.md`** : Mis à jour avec liens vers la nouvelle documentation

#### 🐛 Corrections

- **Testimonials Toulouse** : Chartrons/Caudéran/Saint-Pierre (Bordeaux) → Capitole/Saint-Cyprien/Carmes (Toulouse)
- **Blog mélangé** : Suppression des fallbacks cross-ville dans `lib/blog.ts`
- **Images 404** : Centralisation des images quartiers dans `/public/images/quartiers/{ville}/`
- **Hero incohérent** : Synchronisation du Hero root vers tous les sites

#### 🚀 Déploiements

- **11 sites déployés** sur CapRover via webhooks GitHub
- **Commits individuels** pour chaque ville (Marseille `5c39a50`, Toulouse `e5e7d88`, etc.)

---

## [3.0.0] - 2025-10-11

### Standardisation Next.js

- Migration `next.config.js` → `next.config.mjs` pour tous les sites
- Ajout `"type": "module"` dans `package.json`
- Script `check-nextconfig.sh` pour validation automatique

---

## [2.0.0] - 2025-09

### Génération Multi-Sites

- Système de génération automatique via `moverz-template/`
- Support de 11 villes : Marseille, Toulouse, Lyon, Bordeaux, Nantes, Lille, Nice, Strasbourg, Rouen, Rennes, Montpellier
- Structure monorepo avec `sites/{ville}/`

---

## [1.0.0] - 2025-08

### Version Initiale

- Site Toulouse standalone
- Next.js 14 + TypeScript + Tailwind CSS
- Composants de base : Hero, HowItWorks, Pricing

---

**Format :** Basé sur [Keep a Changelog](https://keepachangelog.com/)  
**Versioning :** [Semantic Versioning](https://semver.org/)

