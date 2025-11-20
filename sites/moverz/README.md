# 🚚 Moverz.fr — Hub Central Déménagement par IA

**Plateforme de déménagement révolutionnaire utilisant l'intelligence artificielle pour générer des devis comparables sans visite technique.**

---

## 🎯 Concept

**Moverz.fr** est le hub central qui redirige vers 11 sites dédiés par ville. Chaque site local est optimisé pour le référencement SEO local et génère des devis comparables grâce à l'IA.

### Processus utilisateur

1. **±30 minutes** : L'utilisateur prépare ses photos (3 à 5 par pièce)
2. **±2 minutes** : Notre IA analyse les photos et génère une estimation précise
3. **±7 jours ouvrés** : L'utilisateur reçoit jusqu'à 5 devis comparables de déménageurs vérifiés

### Double cible

- **Particuliers** : Devis gratuits sans visite technique
- **Professionnels** : Plateforme SaaS d'estimation pour déménageurs

---

## 🏗️ Architecture Multi-Sites

Moverz est composé de **12 sites Next.js indépendants** :

- **1 hub national** : `moverz.fr` (ce site)
- **11 sites locaux** : Un par grande ville française

### 🌍 Sites locaux couverts

| Ville | URL Production |
|-------|----------------|
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

⚠️ **Exceptions** : Toulouse = "toulousain", Bordeaux = ordre inversé + www

---

## 💡 Proposition de Valeur

### 4 Garanties Moverz

1. **🛡️ 5+ déménageurs contrôlés**
   - Solidité financière vérifiée
   - Historique litiges analysé (0 litige exigé)
   - Assurances professionnelles validées

2. **📊 Devis vraiment comparables**
   - L'IA crée UN inventaire unique
   - Tous les pros chiffrent le même volume
   - Élimination des écarts d'interprétation

3. **💰 100% gratuit, sans engagement**
   - Service totalement gratuit pour les particuliers
   - Aucun frais caché
   - Modèle B2B : on facture les déménageurs

4. **🚫 Sans harcèlement téléphonique**
   - Dossier anonyme jusqu'à votre choix
   - Communication par email uniquement
   - Vous décidez qui contacter et quand

---

## 🔄 Parcours Utilisateur

### Sur moverz.fr (hub national)

1. L'utilisateur arrive sur la homepage
2. Il clique sur **"Comparez 5+ devis gratuitement"**
3. Il est redirigé vers `/choisir-ville/`
4. Il sélectionne sa ville
5. Redirection vers le site local : `https://devis-demenageur-[ville].fr/devis-gratuits/`

### Sur le site local (ex: Nice)

1. Formulaire multi-étapes `/devis-gratuits/`
2. Upload de photos (3-5 par pièce)
3. IA analyse et génère l'inventaire
4. Envoi aux 5+ déménageurs contrôlés
5. Réception des devis sous 7 jours
6. Page de remerciement `/devis-gratuits/merci/`

---

## 📁 Structure du Projet

```
moverz/                      # Ce site (hub national)
├── app/                     # Pages Next.js App Router
│   ├── page.tsx            # Homepage (sans cityData)
│   ├── choisir-ville/      # Sélecteur de ville → redirige vers sites locaux
│   ├── villes/             # Liste des 11 villes
│   ├── notre-offre/        # 4 garanties détaillées
│   ├── comment-ca-marche/  # Process en 3 étapes
│   ├── faq/                # Questions générales
│   ├── contact/            # Support
│   ├── a-propos/           # Mission, équipe
│   └── [pages légales]/    # Mentions, CGU, CGV, Confidentialité
│
├── components/             # Composants React réutilisables
│   ├── Hero.tsx           # Hero adapté : CTA vers /choisir-ville/
│   ├── CitiesGrid.tsx     # Grille des 11 villes (nouveau)
│   ├── HowItWorks.tsx     # Process 3 étapes
│   ├── ValueTriad.tsx     # 4 garanties (nouveau contenu)
│   ├── ComparisonSection.tsx
│   ├── ProofStrip.tsx     # Social proof (stats)
│   ├── Testimonials.tsx   # Avis clients
│   ├── FAQAccordion.tsx
│   └── StickyCTA.tsx      # CTA flottant adapté
│
├── lib/                    # Utilitaires
│   ├── cities.ts          # ⭐ Liste des 11 villes avec URLs
│   ├── env.ts             # Config env (SITE_URL, PORT)
│   ├── canonical-helper.ts # SEO helpers
│   ├── reviews.ts         # Avis clients génériques
│   └── utils.ts
│
├── public/                 # Assets statiques
│   ├── logo.png
│   ├── favicon.ico
│   └── og-image.jpg
│
├── Dockerfile              # Build Docker pour CapRover
├── captain-definition      # Config CapRover
├── next.config.mjs         # Config Next.js + redirections
├── tailwind.config.ts      # Config Tailwind
└── package.json
```

---

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 20+
- npm ou yarn

### Installation

```bash
# Cloner le repo
git clone https://github.com/gdetaisne/moverz-hub.git
cd moverz-hub

# Installer les dépendances
npm install

# Créer le fichier .env.local
cp .env.local.example .env.local
# Éditer .env.local et définir SITE_URL=https://moverz.fr
```

### Développement

```bash
# Lancer le serveur de dev (port 3040 par défaut)
npm run dev

# Accéder au site
open http://localhost:3040
```

### Build Production

```bash
# Build
npm run build

# Démarrer en production
npm start
```

---

## 🎨 Design System

### Inspiré de Stripe

- **Halos lumineux** : Gradients radiaux subtils en arrière-plan
- **Animations fluides** : Fade-up, hover effects, shimmer sur CTAs
- **Cartes 3D** : Effet tilt subtil au hover (testimonials)
- **Typographie** : Inter (Google Fonts)
- **Palette** :
  - Brand : `#04163a` (bleu nuit)
  - Accent : `#2b7a78` (vert sarcelle)
  - Secondary : `#6BCFCF` (cyan clair)

### Composants Réutilisables

Tous les composants sont copiés depuis les sites locaux (Nice, Lyon, Marseille) et **adaptés** pour ne plus utiliser `cityData`.

---

## 🔗 CTAs et Redirections

### Important : Différence Hub vs Sites Locaux

| Aspect | Sites Locaux | moverz.fr (hub) |
|--------|-------------|-----------------|
| CTA principal | `/devis-gratuits/` | `/choisir-ville/` |
| Tunnel conversion | Dans le site | Sur site local |
| cityData | Dynamique (Nice, Lyon...) | ❌ Aucun |
| SEO | Local (ville) | National (France) |

### Flow de redirection

1. **Homepage moverz.fr** → CTA "Comparez 5+ devis"
2. **Page `/choisir-ville/`** → Sélecteur de ville
3. **Redirection** → `https://devis-demenageur-[ville].fr/devis-gratuits/`
4. **Tunnel conversion** → Sur le site local
5. **Page merci** → `https://devis-demenageur-[ville].fr/devis-gratuits/merci/`

---

## 📊 SEO & Métadonnées

### Homepage (moverz.fr)

- **Title** : `Comparateur Déménagement — Devis Comparables | Moverz`
- **Description** : `Comparez 5+ devis de déménageurs contrôlés (solvabilité + 0 litige) sur toute la France. IA analyse → devis comparables. 100% gratuit, sans harcèlement téléphonique.`
- **Keywords** : comparateur déménagement, devis déménageurs, déménagement France, comparateur devis, déménageurs contrôlés
- **Canonical** : `https://moverz.fr/`

### Open Graph

```typescript
openGraph: {
  title: "Moverz — Comparateur Déménagement Intelligent",
  description: "Enfin des devis comparables : 5+ pros contrôlés chiffrent LE MÊME inventaire IA",
  url: "https://moverz.fr/",
  siteName: "Moverz",
  images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  type: "website",
}
```

---

## 🚢 Déploiement

### Environnement

Le site est déployé sur **CapRover** (VPS Hostinger, datacenter Paris).

### Variables d'Environnement

```env
# Production
SITE_URL=https://moverz.fr
NODE_ENV=production
PORT=3000

# Optionnel
OPENAI_API_KEY=sk-...
NEXT_TELEMETRY_DISABLED=1
```

### Workflow Git → CapRover

1. **Push vers GitHub** : `git push origin main`
2. **CapRover détecte** le push (webhook)
3. **Build Docker** automatique
4. **Déploiement** sur `moverz.fr`

### Build Manuel

```bash
# Build l'image Docker
docker build --build-arg SITE_URL=https://moverz.fr -t moverz-hub .

# Test en local
docker run -p 3000:3000 -e SITE_URL=https://moverz.fr moverz-hub

# Push vers registry (si besoin)
docker tag moverz-hub registry.example.com/moverz-hub
docker push registry.example.com/moverz-hub
```

---

## 🔐 Sécurité & Conformité

### RGPD

- ✅ Politique de confidentialité (`/politique-confidentialite/`)
- ✅ CGU/CGV (`/cgu/`, `/cgv/`)
- ✅ Mentions légales (`/mentions-legales/`)
- ✅ Consentement cookies (à implémenter)

### Données Utilisateurs

- **Anonymisation** : Le dossier reste anonyme jusqu'à ce que l'utilisateur choisisse un déménageur
- **Pas de spam** : Aucun partage de coordonnées sans consentement
- **Stockage** : Données hébergées en France (Hostinger Paris)

### Headers de Sécurité

Configurés dans `next.config.mjs` :
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: ...`

---

## 🧪 Tests & Qualité

### Checklist Pré-Déploiement

- [ ] Build sans erreurs : `npm run build`
- [ ] Navigation fluide entre toutes les pages
- [ ] Liens vers les 11 sites locaux fonctionnels
- [ ] CTAs pointent vers `/choisir-ville/`
- [ ] Responsive mobile/tablet/desktop
- [ ] SEO metadata sur toutes les pages
- [ ] Images optimisées (WebP, lazy loading)
- [ ] Lighthouse score > 90

### Commandes Utiles

```bash
# Linter
npm run lint

# Type-checking
npx tsc --noEmit

# Analyse bundle
npm run build && npx @next/bundle-analyzer
```

---

## 📞 Support & Contribution

### Contact

- **Email** : gdetaisne@gmail.com
- **GSLV** : 5 rue Jean Coyttar, 17290 Thairé, France
- **SIRET** : 914 499 876 00011

### Workflow Git

```bash
# Créer une branche feature
git checkout -b feature/nouvelle-page

# Commit
git add .
git commit -m "feat: ajout page nouvelle-page"

# Push et PR
git push origin feature/nouvelle-page
```

---

## 📝 License

**Propriétaire** — GSLV (Moverz)

Tous droits réservés. Ce code est la propriété exclusive de GSLV et ne peut être utilisé, copié, modifié ou distribué sans autorisation écrite préalable.

---

## 🗺️ Roadmap

### ✅ Phase 1 : MVP (Terminé)
- [x] Hub national moverz.fr
- [x] 11 sites locaux opérationnels
- [x] Tunnel de conversion `/devis-gratuits/`
- [x] IA d'estimation de volume

### 🚧 Phase 2 : En cours
- [ ] Espace client (suivi devis)
- [ ] Intégration paiement acompte
- [ ] Plateforme SaaS pour déménageurs
- [ ] Mobile app (React Native)

### 🔮 Phase 3 : Futur
- [ ] Expansion européenne (UK, DE, ES)
- [ ] IA génératrice d'inventaire vocal
- [ ] Marketplace accessoires déménagement
- [ ] Programme de fidélité

---

**Dernière mise à jour** : 2025-01-20
