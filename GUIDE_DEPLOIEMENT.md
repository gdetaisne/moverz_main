# 🚀 GUIDE DE DÉPLOIEMENT - Sites Moverz

**Date** : 8 octobre 2025  
**Objectif** : Déployer les 10 sites en production

---

## 📊 **STATUT ACTUEL**

### ✅ **Sites Prêts (Localhost)** :
1. Bordeaux - http://localhost:4001
2. Marseille - http://localhost:4002
3. Lyon - http://localhost:4003
4. Toulouse - http://localhost:4004
5. Nice - http://localhost:4005
6. Nantes - http://localhost:4006
7. Strasbourg - http://localhost:4007
8. Lille - http://localhost:4008
9. Rennes - http://localhost:4009
10. Rouen - http://localhost:4010

---

## 🎯 **OPTIONS DE DÉPLOIEMENT**

### **Option 1 : CapRover (Recommandée selon PROCEDURE)**

#### **Avantages** :
- ✅ Auto-scaling
- ✅ SSL automatique
- ✅ Déploiement depuis GitHub
- ✅ Dashboard de monitoring
- ✅ Économique (VPS unique)

#### **Architecture** :
```
GitHub Repos (10 repos)
    ↓
CapRover (VPS)
    ↓
10 Apps (1 par ville)
    ↓
Domaines personnalisés
```

#### **Prérequis** :
- [ ] Serveur VPS (minimum 2GB RAM)
- [ ] CapRover installé
- [ ] 10 repos GitHub (1 par site)
- [ ] Domaines configurés

---

### **Option 2 : Vercel (Plus Simple)**

#### **Avantages** :
- ✅ Déploiement ultra-rapide
- ✅ SSL automatique
- ✅ CDN global
- ✅ Intégration Next.js native
- ✅ Free tier généreux

#### **Architecture** :
```
GitHub Repos (10 repos)
    ↓
Vercel (Serverless)
    ↓
10 Projects (1 par ville)
    ↓
Domaines personnalisés
```

#### **Prérequis** :
- [ ] Compte Vercel (gratuit)
- [ ] 10 repos GitHub (1 par site)
- [ ] Domaines configurés

---

### **Option 3 : Netlify**

Similaire à Vercel, bonne alternative.

---

## 📋 **PROCÉDURE RECOMMANDÉE : VERCEL (La Plus Simple)**

### **🔥 POURQUOI VERCEL ?**

1. **Intégration Next.js native** : Créé par la team Next.js
2. **Déploiement automatique** : Push → Deploy en 2 minutes
3. **Gratuit pour votre usage** : 100GB bande passante/mois
4. **SSL automatique** : Certificats Let's Encrypt gratuits
5. **Domaines personnalisés** : Configuration simple

---

## 🚀 **ÉTAPE PAR ÉTAPE : DÉPLOIEMENT VERCEL**

### **Étape 1 : Préparation GitHub (Une fois)**

```bash
cd /Users/guillaumestehelin/moverz_main

# Créer un repo pour chaque site
for site in bordeaux marseille lyon toulouse nice nantes strasbourg lille rennes rouen; do
  cd sites/$site
  
  # Initialiser git si pas déjà fait
  git init
  git add .
  git commit -m "Initial commit - Site $site"
  
  # Créer le repo sur GitHub (via CLI ou interface web)
  # gh repo create moverz-$site --public --source=. --push
  
  cd ../..
done
```

**⚠️ IMPORTANT** : Chaque site = 1 repo GitHub séparé

---

### **Étape 2 : Configuration Vercel (Par Site)**

#### **2.1 Via Interface Web (Plus Simple)** :

1. **Connexion** : https://vercel.com → Se connecter avec GitHub
2. **Import** : 
   - Cliquer "Add New Project"
   - Sélectionner le repo `moverz-bordeaux`
   - Framework Preset : **Next.js** (détecté auto)
3. **Configuration** :
   ```
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```
4. **Variables d'environnement** :
   ```
   NODE_ENV=production
   NEXT_TELEMETRY_DISABLED=1
   ```
5. **Deploy** : Cliquer "Deploy"

#### **2.2 Via CLI Vercel (Plus Rapide)** :

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer chaque site
cd sites/bordeaux
vercel --prod

# Suivre les instructions :
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? moverz-bordeaux
# - Directory? ./
# - Override settings? No
```

---

### **Étape 3 : Configuration des Domaines**

#### **3.1 Dans Vercel Dashboard** :

Pour chaque site :
1. **Project Settings** → **Domains**
2. **Add Domain** : `bordeaux-demenageur.fr`
3. **Configure DNS** :
   ```
   Type: A
   Name: @
   Value: 76.76.21.21 (IP Vercel)
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

#### **3.2 Chez votre Registrar (OVH, Gandi, etc.)** :

```
# Exemple pour bordeaux-demenageur.fr
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

---

### **Étape 4 : Vérification Post-Déploiement**

#### **Checklist par Site** :
- [ ] Site accessible sur `https://[domaine]`
- [ ] SSL actif (cadenas vert)
- [ ] Toutes les pages fonctionnent
- [ ] Images chargent correctement
- [ ] Formulaires de contact OK
- [ ] Performance > 90 (PageSpeed)

---

## 🔧 **CONFIGURATION NEXT.JS POUR PRODUCTION**

### **Fichiers à Vérifier/Modifier** :

#### **1. `next.config.js`**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Pour Docker/CapRover
  // OU
  // output: 'export', // Pour Vercel/Netlify
  
  images: {
    unoptimized: true, // Si export statique
  },
  
  // Domaine de production
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? 'https://www.bordeaux-demenageur.fr' 
    : '',
}

module.exports = nextConfig
```

#### **2. `src/app/layout.tsx`**

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://www.bordeaux-demenageur.fr'), // ⚠️ CHANGER PAR SITE
  // ...
  robots: 'index, follow', // ⚠️ ACTIVER L'INDEXATION
}
```

#### **3. `public/robots.txt`**

```txt
User-agent: *
Allow: /

Sitemap: https://www.bordeaux-demenageur.fr/sitemap.xml
```

---

## 📦 **SCRIPT D'AUTOMATISATION**

### **deploy-all.sh** (À créer)

```bash
#!/bin/bash

echo "🚀 Déploiement de tous les sites sur Vercel..."

sites=(
  "bordeaux:bordeaux-demenageur.fr"
  "marseille:devis-demenageur-marseille.fr"
  "lyon:devis-demenageur-lyon.fr"
  "toulouse:devis-demenageur-toulousain.fr"
  "nice:devis-demenageur-nice.fr"
  "nantes:devis-demenageur-nantes.fr"
  "strasbourg:devis-demenageur-strasbourg.fr"
  "lille:devis-demenageur-lille.fr"
  "rennes:devis-demenageur-rennes.fr"
  "rouen:devis-demenageur-rouen.fr"
)

for site_info in "${sites[@]}"; do
  IFS=':' read -r site domain <<< "$site_info"
  
  echo ""
  echo "📍 Déploiement de $site..."
  cd "/Users/guillaumestehelin/moverz_main/sites/$site"
  
  # Vérifier que le build fonctionne
  npm run build
  
  if [ $? -eq 0 ]; then
    echo "✅ Build OK pour $site"
    
    # Déployer sur Vercel
    vercel --prod --yes
    
    echo "✅ $site déployé : https://$domain"
  else
    echo "❌ Build FAILED pour $site"
  fi
done

echo ""
echo "🎉 Déploiement terminé !"
```

---

## 🧪 **TESTS PRÉ-DÉPLOIEMENT**

### **Par Site** :

```bash
cd sites/bordeaux

# 1. Build de production
npm run build

# 2. Test local du build
npm run start

# 3. Ouvrir http://localhost:3000
# 4. Vérifier :
#    - Toutes les pages chargent
#    - Pas d'erreurs console
#    - Images OK
#    - Formulaires OK
```

---

## 📊 **MONITORING POST-DÉPLOIEMENT**

### **Outils Gratuits** :

1. **Vercel Analytics** : Inclus, automatique
2. **Google Search Console** : Pour SEO
3. **PageSpeed Insights** : Performance
4. **UptimeRobot** : Monitoring uptime (gratuit)

---

## ⚠️ **CHECKLIST AVANT DÉPLOIEMENT**

### **Par Site** :

- [ ] ✅ Build réussit localement (`npm run build`)
- [ ] ✅ Pas d'erreurs dans les logs
- [ ] ✅ Toutes les pages accessibles
- [ ] ✅ Variables d'environnement configurées
- [ ] ✅ Domaine acheté et prêt
- [ ] ✅ DNS configuré
- [ ] ✅ `metadataBase` mis à jour avec bon domaine
- [ ] ✅ `robots.txt` permet l'indexation
- [ ] ✅ Images optimisées
- [ ] ✅ Contact email configuré

---

## 🎯 **ORDRE DE DÉPLOIEMENT RECOMMANDÉ**

### **Phase 1 : Site Pilote (1 jour)**
1. **Bordeaux** : Déployer et valider complètement

### **Phase 2 : Batch 1 (1 jour)**
2. Marseille
3. Lyon
4. Toulouse

### **Phase 3 : Batch 2 (1 jour)**
5. Nice
6. Nantes
7. Strasbourg

### **Phase 4 : Batch 3 (1 jour)**
8. Lille
9. Rennes
10. Rouen

**Total : 4 jours pour 10 sites**

---

## 💰 **COÛTS ESTIMÉS**

### **Option Vercel (Recommandée)** :
- **Plan Hobby** : 0€/mois (suffisant pour démarrer)
- **Plan Pro** : 20€/mois (si besoin de plus de bande passante)
- **Domaines** : ~10€/an × 10 = 100€/an

**Total : 0-240€/an**

### **Option CapRover** :
- **VPS Hetzner** : 5-10€/mois
- **Domaines** : 100€/an

**Total : 160-220€/an**

---

## 🆘 **SUPPORT ET DÉPANNAGE**

### **Erreurs Courantes** :

#### **1. Build Failed**
```bash
# Vérifier les logs
npm run build

# Nettoyer le cache
rm -rf .next node_modules
npm install
npm run build
```

#### **2. Images ne chargent pas**
```javascript
// next.config.js
images: {
  unoptimized: true,
  domains: ['www.bordeaux-demenageur.fr'],
}
```

#### **3. Erreur 500 en production**
```bash
# Vérifier les variables d'environnement
# Vérifier les logs Vercel
vercel logs
```

---

## 📝 **PROCHAINES ÉTAPES**

1. ✅ **Choisir la plateforme** : Vercel ou CapRover ?
2. ✅ **Préparer les repos GitHub** : 1 repo par site
3. ✅ **Configurer le premier site** : Bordeaux en pilote
4. ✅ **Valider le processus** : Tests complets
5. ✅ **Déployer les 9 autres** : Par batch

---

## 🎉 **C'EST PARTI !**

**Tu préfères quelle option ?**
- **Option 1 : Vercel** (Simple, Gratuit, Rapide) ← **RECOMMANDÉE**
- **Option 2 : CapRover** (Plus de contrôle, VPS unique)

**Dis-moi et on commence ! 🚀**

