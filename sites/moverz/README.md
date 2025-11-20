# Moverz Hub — Site Vitrine National

Site vitrine principal de Moverz qui sert de hub pour les 11 sites locaux de déménagement.

## 🎯 Spécificités

- **Hub national** : Pas de ville spécifique (contrairement aux sites locaux)
- **Pas de cityData** : Tout le code est adapté pour fonctionner sans données de ville
- **Redirection** : Les CTAs redirigent vers `/choisir-ville/` puis vers les sites locaux
- **11 villes** : Nice, Lyon, Marseille, Toulouse, Bordeaux, Lille, Strasbourg, Nantes, Rennes, Rouen, Montpellier

## 🚀 Démarrage

```bash
# Installation
npm install

# Créer .env.local
cp .env.local.example .env.local

# Développement (port 3040)
npm run dev

# Build production
npm run build

# Démarrer en production
npm start
```

## 📁 Structure

```
/app                    # Pages Next.js (App Router)
  /choisir-ville/      # Sélecteur de ville (redirige vers sites locaux)
  /villes/             # Liste des 11 villes
  /comment-ca-marche/  # Process détaillé
  /notre-offre/        # Garanties & différenciation
  /faq/                # Questions générales
  /contact/            # Support
  /a-propos/           # Équipe, mission
  /mentions-legales/   # Légal
  /politique-confidentialite/
  /cgu/
  /cgv/

/components             # Composants React
  Hero.tsx             # Hero sans cityData, CTA vers /choisir-ville/
  CitiesGrid.tsx       # Grille des 11 villes
  HowItWorks.tsx       # Process 3 étapes
  ValueTriad.tsx       # 4 garanties
  ComparisonSection.tsx
  ProofStrip.tsx
  Testimonials.tsx
  FAQAccordion.tsx
  StickyCTA.tsx        # CTA flottant adapté

/lib                    # Utilitaires
  cities.ts            # Liste des 11 villes avec URLs
  env.ts               # Config environnement
  canonical-helper.ts  # Helpers SEO
  reviews.ts           # Avis clients
  utils.ts
```

## 🔗 CTAs et Redirections

**Important** : Tous les CTAs pointent vers `/choisir-ville/` (et non `/devis-gratuits/` comme sur les sites locaux).

La page `/choisir-ville/` permet ensuite de sélectionner une ville et redirige vers :
- `https://devis-demenageur-nice.fr/devis-gratuits/`
- `https://devis-demenageur-lyon.fr/devis-gratuits/`
- etc.

## 🌐 URLs des 11 sites locaux

| Ville | URL |
|-------|-----|
| Nice | https://devis-demenageur-nice.fr |
| Lyon | https://devis-demenageur-lyon.fr |
| Marseille | https://devis-demenageur-marseille.fr |
| **Toulouse** | https://devis-demenageur-toulousain.fr ⚠️ |
| **Bordeaux** | https://www.bordeaux-demenageur.fr ⚠️ |
| Lille | https://devis-demenageur-lille.fr |
| Strasbourg | https://devis-demenageur-strasbourg.fr |
| Nantes | https://devis-demenageur-nantes.fr |
| Rennes | https://devis-demenageur-rennes.fr |
| Rouen | https://devis-demenageur-rouen.fr |
| Montpellier | https://devis-demenageur-montpellier.fr |

⚠️ Attention aux exceptions (Toulouse = toulousain, Bordeaux = ordre inversé + www)

## 🚢 Déploiement

Le site est déployé sur CapRover via Docker.

### Prérequis
- Repo GitHub : `gdetaisne/moverz-hub`
- App CapRover : `moverz-hub`
- Domaine : `moverz.fr`

### Variables d'environnement CapRover
```
SITE_URL=https://moverz.fr
NODE_ENV=production
PORT=3000
```

### Commandes
```bash
# Build local
docker build -t moverz-hub .

# Push vers GitHub (déclenche CapRover)
git push origin main
```

## 📊 SEO

- **Canonical** : https://moverz.fr/
- **Title** : Comparateur Déménagement — Devis Comparables | Moverz
- **Description** : Comparez 5+ devis de déménageurs contrôlés (solvabilité + 0 litige). IA analyse → devis comparables.
- **Keywords** : comparateur déménagement, devis déménageurs, déménagement France

## 🎨 Design

Design Stripe-like copié depuis les sites locaux (Nice, Lyon, Marseille) :
- Halos lumineux et gradients
- Animations subtiles (fade-up, hover effects)
- Cartes avec effet 3D au hover
- CTAs avec shimmer effect

## 🔐 Sécurité

- Headers de sécurité (X-Frame-Options, X-Content-Type-Options, etc.)
- HTTPS obligatoire en production
- Variables d'environnement pour secrets
- Pas de données sensibles en dur

## 📝 License

Propriétaire — GSLV (Moverz)

