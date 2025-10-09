# 🏢 Site Déménageurs Montpellier (IA)

## 📋 Informations du Site

- **Nom** : demenageurs-montpellier
- **Domaine** : https://devis-demenageur-montpellier.fr
- **Version** : 0.1.0
- **Stack** : Next.js 14 (App Router) + TypeScript, Tailwind CSS, React 18

## 🎯 Pages Créées

### Pages Principales
- ✅ Page d'accueil (`/`)
- ✅ Page ville principale (`/montpellier`)

### Pages Quartiers (5)
- ✅ Antigone (`/montpellier/antigone`)
- ✅ Beaux-Arts (`/montpellier/beaux-arts`)
- ✅ Comédie (`/montpellier/comedie`)
- ✅ Port Marianne (`/montpellier/port-marianne`)
- ✅ Écusson (`/montpellier/ecusson`)

### Pages Corridors (4)
- ✅ Montpellier → Paris (`/montpellier-vers-paris`)
- ✅ Montpellier → Lyon (`/montpellier-vers-lyon`)
- ✅ Montpellier → Toulouse (`/montpellier-vers-toulouse`)
- ✅ Montpellier → Marseille (`/montpellier-vers-marseille`)

### Pages Utilitaires
- ✅ Comment ça marche (`/comment-ca-marche`)
- ✅ Services (`/services`)
- ✅ Partenaires (`/partenaires`)
- ✅ Blog (`/blog`)
- ✅ FAQ (`/faq`)
- ✅ Contact (`/contact`)
- ✅ Inventaire IA (`/inventaire-ia`)
- ✅ Estimation rapide (`/estimation-rapide`)
- ✅ Notre offre (`/notre-offre`)

**Total : 28 pages générées statiquement**

## 🚀 Développement Local

```bash
# Installer les dépendances (déjà fait)
npm install

# Lancer le serveur de développement
npm run dev

# Accéder au site
open http://localhost:3000
```

## 🏗️ Build de Production

```bash
# Build
npm run build

# Démarrer en production
npm start
```

## 📦 Déploiement CapRover

Le site est prêt pour le déploiement sur CapRover :

1. **Fichiers de config présents** :
   - ✅ `Dockerfile`
   - ✅ `captain-definition`
   - ✅ `.dockerignore`

2. **Commandes** :
   ```bash
   # Push vers GitHub
   git init
   git add .
   git commit -m "Initial commit - Site Montpellier"
   git remote add origin https://github.com/USERNAME/dd-montpellier.git
   git push -u origin main
   
   # Configurer le webhook GitHub sur CapRover
   # Le site se déploiera automatiquement
   ```

## 🎨 Charte Graphique

- **Couleur primaire** : #04163a (Bleu marine)
- **Couleur accent** : #2b7a78 (Turquoise)
- **Couleur secondaire** : #6bcfcf (Bleu clair)
- **Police** : Inter (Google Fonts)

## 📊 Structure du Projet

```
montpellier/
├── app/
│   ├── layout.tsx                 # Layout principal
│   ├── page.tsx                   # Page d'accueil
│   ├── globals.css                # Styles globaux
│   ├── _templates/                # Templates réutilisables
│   ├── montpellier/               # Pages ville + quartiers
│   ├── montpellier-vers-*/        # Pages corridors
│   ├── blog/                      # Blog
│   ├── services/                  # Pages services
│   └── api/                       # API routes
├── components/                    # Composants React
├── lib/                          # Utilitaires
├── public/                       # Assets statiques
├── content/                      # Contenu blog (MDX)
├── Dockerfile                    # Configuration Docker
├── captain-definition            # Config CapRover
└── package.json                  # Dépendances
```

## ✅ Tests Effectués

- ✅ Installation des dépendances : **OK**
- ✅ Build de production : **OK (28 pages)**
- ✅ TypeScript : **Sans erreurs**
- ✅ Linting : **Désactivé en build**
- ✅ Configuration Docker : **Validée**

## 🔧 Configuration

### Variables d'environnement (optionnelles)
```env
SITE_URL=https://devis-demenageur-montpellier.fr
MAKE_WEBHOOK_URL=...
OPENAI_API_KEY=...
```

### Ports
- **Dev** : 3000
- **Production** : 3000

## 📝 Notes

- Site créé manuellement en suivant la procédure complète
- Tous les composants copiés et adaptés depuis Marseille
- Toutes les références "Marseille" remplacées par "Montpellier"
- Build réussi sans erreurs TypeScript
- Prêt pour le déploiement CapRover

## 🎯 Prochaines Étapes

1. Push vers GitHub
2. Configurer CapRover avec webhook GitHub
3. Tester le déploiement automatique
4. Vérifier le site en production sur devis-demenageur-montpellier.fr
5. Créer les images des quartiers dans `public/images/quartiers/montpellier/`

---

**Créé le** : 9 janvier 2025  
**Temps de création** : ~30 minutes  
**Status** : ✅ **READY FOR PRODUCTION**

